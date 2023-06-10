import React, { useState } from 'react';
import propTypes from 'prop-types';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Button, Divider, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import CreateSwinlane from '../CreateSwinlane';

import TabColumn from '../TabColumn';

const CREATE_SWINLANE = 'CreateSwinlane';

/* eslint-disable */
// eslint-disable-next-line
const TabSwinlaneConfig = ({ board_swinlanes }) => {
    const [temp_swinlanes, setTempSwinlanes] = useState(board_swinlanes);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal_type, setModalType] = useState(null);
    const [modal_style, setModalStyle] = useState(null);

    //#region Modal stuff

    const openCustomModal = (modal) => {
        if (modal === CREATE_SWINLANE) {
            setModalType(modal);
            setModalStyle(ModalStyles.createSwinlane);
        }

        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getModalResult = async (result, modal_type) => {
        switch (modal_type) {
            case CREATE_SWINLANE:
                console.log(result);
                // const column_response = await createColumn(board_id, result);

                // if (column_response.error) {
                //     return;
                // }

                // const new_column = {
                //     id: column_response.result.id_column,
                //     name: result,
                //     groups: [
                //         {
                //             id: column_response.result.id_group,
                //             name: 'Doing',
                //             cards: []
                //         }
                //     ],
                //     showSwinLanes: false
                // };

                // board_columns.push(new_column);

                // await updateNewBoardColumns(board_columns);
                // await separateColumns();

                break;

            default:
                return;
        }
    };

    //#endregion

    const grid = 8;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }));

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    });

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
            temp_swinlanes,
            result.source.index,
            result.destination.index
        );

        setTempSwinlanes(items);
    };

    return (
        <>
            <div className="flex flex-column pa2">
                <div className="self-start pb3">
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                openCustomModal(CREATE_SWINLANE);
                            }}
                        >
                            Criar raia
                        </Button>
                        <Button
                            variant="contained"
                            // disabled={has_unsaved_data}
                            // onClick={() => saveNewColumnOrder()}
                        >
                            Salvar ordem
                        </Button>
                    </Stack>
                </div>
                <div>
                    {temp_swinlanes.length > 0 ? (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="swinlaneConfigTab">
                                {(provided, snapshot) => (
                                    <Stack
                                        direction="column"
                                        divider={
                                            <Divider
                                                orientation="horizontal"
                                                flexItem
                                            />
                                        }
                                        spacing={3}
                                        className="list flex flex-column w-100 pl3 pr4 pa3"
                                        style={{ backgroundColor: 'lightgray' }}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {temp_swinlanes.map(
                                            (swinlane, index) => (
                                                <Draggable
                                                    key={swinlane.id}
                                                    draggableId={`${swinlane.id}`}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <Item
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided
                                                                    .draggableProps
                                                                    .style
                                                            )}
                                                            // onClick={() => {
                                                            //     setSelectedColumn(
                                                            //         `${column.id}`
                                                            //     );
                                                            // }}
                                                        >
                                                            <TabColumn
                                                                column_info={
                                                                    swinlane
                                                                }
                                                            />
                                                        </Item>
                                                    )}
                                                </Draggable>
                                            )
                                        )}
                                    </Stack>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : (
                        <p>Você ainda não tem uma raia feita.</p>
                    )}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modal_style}
                appElement={document.getElementById('root')}
            >
                {modal_type === 'CreateSwinlane' && (
                    <CreateSwinlane
                        returnResult={getModalResult}
                        modal_type={modal_type}
                        closeModal={closeModal}
                    />
                )}
            </Modal>
        </>
    );
};

TabSwinlaneConfig.propTypes = {
    board_swinlanes: propTypes.array
};

export default TabSwinlaneConfig;
