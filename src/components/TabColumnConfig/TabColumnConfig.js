import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Button, Stack, Typography } from '@mui/material';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import {
    createColumn,
    deleteColumn,
    updateOrder
} from '../../services/column-service';

import TabColumnInfo from '../TabColumnInfo';
import TabColumnItem from '../TabColumnItem/TabColumnItem';
import TabSwinlaneGroup from '../TabSwinlaneGroup/TabSwinlaneGroup';
import { validateIfArrAreEqual } from '../../utils/column-utils';

import CreateColumnSubColumn from '../CreateColumnSubColumn/CreateColumnSubColumn';

const CREATE_COLUMN = 'CreateColumn';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnConfig = ({
    board_id,
    board_columns,
    board_swinlanes,
    updateNewBoardColumns
}) => {
    const [temp_columns, setTempColumns] = useState(board_columns);
    const [temp_swinlanes, setTempSwinlanes] = useState(board_swinlanes);
    const [swinlane_columns, setSwinlaneColumns] = useState([]);

    const [selected_column, setSelectedColumn] = useState(false);
    const [has_unsaved_data, setHasUnsavedData] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal_type, setModalType] = useState(null);
    const [modal_style, setModalStyle] = useState(null);

    const grid = 8;

    useEffect(() => {
        separateColumns();
    }, [board_columns]);

    useEffect(() => {
        updateHasUnsavedData();
    }, [temp_columns, swinlane_columns]);

    //#region Modal stuff

    const openCustomModal = (modal) => {
        if (modal === CREATE_COLUMN) {
            setModalType(modal);
            setModalStyle(ModalStyles.createColumn);
        }

        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //#endregion

    const getResults = (result) => {
        setSwinlaneColumns(result);
    };

    const updateHasUnsavedData = async () => {
        const current_result = getFinalColumnResult();

        await setHasUnsavedData(
            validateIfArrAreEqual(current_result, board_columns)
        );
    };

    const getNewOrderForApi = () => {
        let result = [];

        temp_columns?.map((column) => {
            if (column == 'swinlane_group') {
                swinlane_columns.map((column) => {
                    result.push({
                        id: column.id,
                        name: column.name,
                        swinlane: 'swinlane'
                    });
                });
            } else {
                result.push({ id: column.id, name: column.name });
            }
        });

        return result;
    };

    const getFinalColumnResult = () => {
        let result = [];

        temp_columns?.map((column) => {
            if (column == 'swinlane_group') {
                swinlane_columns.map((column) => {
                    result.push(column);
                });
            } else {
                result.push(column);
            }
        });

        return result;
    };

    const saveNewColumnOrder = async () => {
        const new_order = getNewOrderForApi();
        const new_order_board = getFinalColumnResult();

        await updateOrder(board_id, new_order);
        updateNewBoardColumns(new_order_board);
    };

    const separateColumns = async () => {
        let temp_swinlane_columns = [];

        if (board_columns?.length > 0) {
            board_columns?.map((column) => {
                column.showSwinLanes && temp_swinlane_columns.push(column);
            });
        }

        await setTempColumns(createNewTempColumn());
        await setSwinlaneColumns(temp_swinlane_columns);
    };

    const createNewTempColumn = () => {
        let new_temp_column = [];
        let hasAlreadySelected = false;

        board_columns?.map((column) => {
            if (column.showSwinLanes) {
                if (!hasAlreadySelected) {
                    new_temp_column.push('swinlane_group');
                    hasAlreadySelected = true;
                }
            } else {
                new_temp_column.push(column);
            }
        });

        return new_temp_column;
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            temp_columns,
            result.source.index,
            result.destination.index
        );

        setTempColumns(items);
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 4,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgrey' : '#565B61',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : '#35393C',
        display: 'flex',
        padding: grid,
        overflow: 'auto'
    });

    const getModalResult = async (result, modal_type) => {
        switch (modal_type) {
            case CREATE_COLUMN:
                const column_response = await createColumn(board_id, result);

                if (column_response.error) {
                    return;
                }

                const new_column = {
                    id: column_response.result.id_column,
                    name: result,
                    groups: [
                        {
                            id: column_response.result.id_group,
                            name: 'Doing',
                            cards: []
                        }
                    ],
                    showSwinLanes: false
                };

                board_columns.push(new_column);

                await updateNewBoardColumns(board_columns);
                await separateColumns();

                break;

            default:
                return;
        }
    };

    const deleteColumnByPos = async (pos) => {
        const removed_column = board_columns.splice(pos, 1);
        await deleteColumn(removed_column[0].id);

        await updateNewBoardColumns(board_columns);
        await separateColumns();
    };

    const updateThisColumn = async (column) => {
        const temp_columns = [...board_columns];

        temp_columns.map((this_column) => {
            if (this_column.id == column.id) {
                this_column = column;
            }
        });

        updateNewBoardColumns(temp_columns);
    };

    return (
        <>
            <section className="ma3 h-100">
                <div className="flex flex-column">
                    <div>
                        <Typography variant="h6" className="pb3">
                            Ordem das colunas
                        </Typography>
                    </div>
                    <div className="self-start pb3">
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    openCustomModal(CREATE_COLUMN);
                                }}
                            >
                                Criar coluna
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                disabled={has_unsaved_data}
                                onClick={() => saveNewColumnOrder()}
                            >
                                Salvar ordem
                            </Button>
                        </Stack>
                    </div>

                    <div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable
                                droppableId="columnConfigTab"
                                direction="horizontal"
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(
                                            snapshot.isDraggingOver
                                        )}
                                        {...provided.droppableProps}
                                    >
                                        {temp_columns &&
                                            temp_columns.map(
                                                (column, index) => (
                                                    <React.Fragment key={index}>
                                                        {column ==
                                                        'swinlane_group' ? (
                                                            <>
                                                                <TabSwinlaneGroup
                                                                    all_columns={
                                                                        swinlane_columns
                                                                    }
                                                                    index={
                                                                        index
                                                                    }
                                                                    sendBackResult={
                                                                        getResults
                                                                    }
                                                                    setSelectedColumn={
                                                                        setSelectedColumn
                                                                    }
                                                                />
                                                            </>
                                                        ) : (
                                                            <TabColumnItem
                                                                column={column}
                                                                index={index}
                                                                getItemStyle={
                                                                    getItemStyle
                                                                }
                                                                setSelectedColumn={
                                                                    setSelectedColumn
                                                                }
                                                            />
                                                        )}
                                                    </React.Fragment>
                                                )
                                            )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>

                <hr className="mt3 mb3"></hr>

                {selected_column ? (
                    <TabColumnInfo
                        selected_column={selected_column}
                        deleteColumnByPos={deleteColumnByPos}
                        board_columns={board_columns}
                        board_swinlanes={board_swinlanes}
                        returnUpdatedColumn={updateThisColumn}
                    />
                ) : (
                    'Clique em um item para editar suas propriedades.'
                )}
            </section>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modal_style}
                appElement={document.getElementById('root')}
            >
                {modal_type === 'CreateColumn' && (
                    <CreateColumnSubColumn
                        returnResult={getModalResult}
                        modal_type={modal_type}
                        closeModal={closeModal}
                    />
                )}
            </Modal>
        </>
    );
};

TabColumnConfig.propTypes = {
    board_id: propTypes.number,
    board_columns: propTypes.array,
    board_swinlanes: propTypes.array,
    updateNewBoardColumns: propTypes.func
};

export default TabColumnConfig;
