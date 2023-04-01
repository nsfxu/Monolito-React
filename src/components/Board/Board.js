import React, { useState, useCallback, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import { TEST_DATA } from '../../constants/board-test-data';

import {
    findColumnById,
    findSubColumnById,
    removeObjectByPosition,
    addObjectIntoPosition
} from '../../utils/column-utils';

import Column from '../Column/Column';
import CreateColumn from '../CreateColumn/CreateColumn';
import CreateLane from '../CreateLane';

const CREATE_COLUMN = 'CreateColumn';
const CREATE_LANE = 'CreateLane';

/* eslint-disable */
// eslint-disable-next-line
const Board = () => {
    const data = TEST_DATA;

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [board_info, updateBoardInfo] = useState(data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal_type, setModalType] = useState(null);
    const [modal_style, setModalStyle] = useState(null);

    const [status, setStatus] = useState([]);
    const [tags, setTags] = useState([{}]);

    useEffect(() => {
        getAllColumns();
        getAllTags();

        forceUpdate();
    }, [board_info]);

    //#region functions

    const toggleSwinlane = (swinlane_id) => {
        board_info.swinlanes.map((swinlane) => {
            if (swinlane.id == swinlane_id) {
                swinlane.expanded = !swinlane.expanded;
            }
        });

        forceUpdate();
    };

    const getAllTags = () => {
        setTags(board_info.tags);
    };

    const getAllColumns = () => {
        let columnInfo = [];

        board_info.columns.map((column) => {
            columnInfo.push({ id: column.id, name: column.name });
        });

        setStatus(columnInfo);
    };

    const openCustomModal = (modal) => {
        if (modal === CREATE_COLUMN) {
            setModalType(modal);
            setModalStyle(ModalStyles.createColumn);
        }

        if (modal === CREATE_LANE) {
            setModalType(modal);
            setModalStyle(ModalStyles.CreateLane);
        }

        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const checkHowToHandle = (
        items,
        result,
        destinationIsSubColumn,
        sourceIsSubColumn,
        destinationHasSwinlane,
        sourceHasSwinlane
    ) => {
        const source_pos_id = result.source.index;
        const destination_pos_id = result.destination.index;

        let destination_subcolumn_id = destinationIsSubColumn
            ? result.destination.droppableId.split(';')[1]
            : null;

        destination_subcolumn_id =
            destination_subcolumn_id && destinationHasSwinlane
                ? destination_subcolumn_id.split('-')[0]
                : destination_subcolumn_id;

        let destination_column_id = destinationIsSubColumn
            ? result.destination.droppableId.split(';')[0]
            : result.destination.droppableId;

        const destination_swinlane_id = destinationHasSwinlane
            ? result.destination.droppableId.split('-')[1]
            : null;

        destination_column_id = destinationHasSwinlane
            ? destination_column_id.split('-')[0]
            : destination_column_id;

        let source_subcolumn_id = sourceIsSubColumn
            ? result.source.droppableId.split(';')[1]
            : null;

        source_subcolumn_id =
            source_subcolumn_id && sourceHasSwinlane
                ? source_subcolumn_id.split('-')[0]
                : source_subcolumn_id;

        let source_column_id = sourceIsSubColumn
            ? result.source.droppableId.split(';')[0]
            : result.source.droppableId;

        const source_swinlane_id = sourceHasSwinlane
            ? result.source.droppableId.split('-')[1]
            : null;

        source_column_id = sourceHasSwinlane
            ? source_column_id.split('-')[0]
            : source_column_id;

        if (destinationIsSubColumn && sourceIsSubColumn) {
            if (source_column_id === destination_column_id) {
                handleWhenSourceIsDestination(
                    items,
                    source_column_id,
                    source_subcolumn_id,
                    destination_subcolumn_id,
                    destination_pos_id,
                    source_pos_id,
                    destinationHasSwinlane,
                    destination_swinlane_id
                );

                return;
            }

            handleWhenSourceIsntDestination(
                items,
                source_column_id,
                source_subcolumn_id,
                destination_column_id,
                destination_subcolumn_id,
                source_pos_id,
                destination_pos_id,
                destinationHasSwinlane,
                destination_swinlane_id
            );

            return;
        }

        if (sourceIsSubColumn) {
            handleWhenSourceIsSubColumn(
                items,
                source_column_id,
                source_subcolumn_id,
                destination_column_id,
                source_pos_id,
                destination_pos_id,
                destination_swinlane_id,
                destinationHasSwinlane,
                source_swinlane_id,
                sourceHasSwinlane
            );

            return;
        }

        if (destinationIsSubColumn) {
            handleWhenDestinationIsSubColumn(
                items,
                source_column_id,
                destination_column_id,
                destination_subcolumn_id,
                destination_pos_id,
                source_pos_id,
                destination_swinlane_id,
                destinationHasSwinlane,
                sourceHasSwinlane
            );

            return;
        }
    };

    const handleWhenSourceIsSubColumn = (
        items,
        source_column_id,
        source_subcolumn_id,
        destination_column_id,
        source_pos_id,
        destination_pos_id,
        destination_swinlane_id,
        destinationHasSwinlane,
        source_swinlane_id,
        sourceHasSwinlane
    ) => {
        const column_to_delete = findColumnById(items, source_column_id);

        const subcolumn_to_delete = findSubColumnById(
            column_to_delete,
            source_subcolumn_id
        );

        const removed_item = removeObjectByPosition(
            subcolumn_to_delete,
            source_pos_id
        );

        if (destinationHasSwinlane) {
            removed_item[0].laneId = parseInt(destination_swinlane_id);
        }

        const column_to_add = findColumnById(items, destination_column_id);

        addObjectIntoPosition(
            column_to_add.groups[0],
            destination_pos_id,
            removed_item[0]
        );
    };

    const handleWhenDestinationIsSubColumn = (
        items,
        source_column_id,
        destination_column_id,
        destination_subcolumn_id,
        destination_pos_id,
        source_pos_id,
        destination_swinlane_id,
        destinationHasSwinlane,
        sourceHasSwinlane
    ) => {
        const column_to_delete = findColumnById(items, source_column_id);

        const removed_item = removeObjectByPosition(
            column_to_delete.groups[0],
            source_pos_id
        );

        if (!destinationHasSwinlane && sourceHasSwinlane) {
            removed_item[0].laneId = null;
        }

        if (destinationHasSwinlane) {
            removed_item[0].laneId = parseInt(destination_swinlane_id);
        }

        const column_to_add = findColumnById(items, destination_column_id);

        const subcolumn_to_add = findSubColumnById(
            column_to_add,
            destination_subcolumn_id
        );

        addObjectIntoPosition(
            subcolumn_to_add,
            destination_pos_id,
            removed_item[0]
        );
    };

    const handleWhenSourceIsDestination = (
        items,
        source_column_id,
        source_subcolumn_id,
        destination_subcolumn_id,
        destination_pos_id,
        source_pos_id,
        destinationHasSwinlane,
        destination_swinlane_id
    ) => {
        const selected_column = findColumnById(items, source_column_id);

        const selected_subcolumn = findSubColumnById(
            selected_column,
            source_subcolumn_id
        );

        const removed_item = removeObjectByPosition(
            selected_subcolumn,
            source_pos_id
        );

        if (destinationHasSwinlane) {
            removed_item[0].laneId = parseInt(destination_swinlane_id);
        }

        const subcolumn_to_add = findSubColumnById(
            selected_column,
            destination_subcolumn_id
        );

        addObjectIntoPosition(
            subcolumn_to_add,
            destination_pos_id,
            removed_item[0]
        );
    };

    const handleWhenSourceIsntDestination = (
        items,
        source_column_id,
        source_subcolumn_id,
        destination_column_id,
        destination_subcolumn_id,
        source_pos_id,
        destination_pos_id,
        destinationHasSwinlane,
        destination_swinlane_id
    ) => {
        const column_to_delete = findColumnById(items, source_column_id);

        const subcolumn_to_delete = findSubColumnById(
            column_to_delete,
            source_subcolumn_id
        );

        const removed_item = removeObjectByPosition(
            subcolumn_to_delete,
            source_pos_id
        );

        if (destinationHasSwinlane) {
            removed_item[0].laneId = parseInt(destination_swinlane_id);
        }

        const column_to_add = findColumnById(items, destination_column_id);

        const subcolumn_to_add = findSubColumnById(
            column_to_add,
            destination_subcolumn_id
        );

        addObjectIntoPosition(
            subcolumn_to_add,
            destination_pos_id,
            removed_item[0]
        );
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = board_info;

        const destinationIsSubColumn =
            result.destination.droppableId.includes(';');
        const sourceIsSubColumn = result.source.droppableId.includes(';');

        const destinationHasSwinlane =
            result.destination.droppableId.includes('-');
        const sourceHasSwinlane = result.source.droppableId.includes('-');

        if (destinationIsSubColumn || sourceIsSubColumn) {
            checkHowToHandle(
                items,
                result,
                destinationIsSubColumn,
                sourceIsSubColumn,
                destinationHasSwinlane,
                sourceHasSwinlane
            );

            return;
        }

        const source_column_id = sourceHasSwinlane
            ? result.source.droppableId.split('-')[0]
            : result.source.droppableId;

        // const sourceSwinlaneId = sourceHasSwinlane
        //     ? result.source.droppableId.split('-')[1]
        //     : null;

        const destination_column_id = destinationHasSwinlane
            ? result.destination.droppableId.split('-')[0]
            : result.destination.droppableId;

        const destination_swinlane_id = destinationHasSwinlane
            ? result.destination.droppableId.split('-')[1]
            : null;

        const source_pos_id = result.source.index;
        const destination_pos_id = result.destination.index;

        const column_to_delete = items.columns.find(
            (column) => column.id == source_column_id
        );

        const removed_item = column_to_delete.groups[0].cards.splice(
            source_pos_id,
            1
        );

        if (destinationHasSwinlane) {
            removed_item[0].laneId = parseInt(destination_swinlane_id);
        }

        if (!destinationHasSwinlane && sourceHasSwinlane) {
            removed_item[0].laneId = null;
        }

        const column_to_add = items.columns.find(
            (column) => column.id == destination_column_id
        );

        column_to_add.groups[0].cards.splice(
            destination_pos_id,
            0,
            removed_item[0]
        );

        updateBoardInfo(items);
    };

    const addNewCard = (
        columnName,
        title,
        description,
        person,
        status,
        tags
    ) => {
        const items = board_info;

        const card_object = {
            id: items.nextCardId,
            name: title,
            description: description
        };

        const column_to_add = findColumnById(items, status);

        addObjectIntoPosition(column_to_add.groups[0], 0, card_object);
        items.nextCardId++;

        forceUpdate();
        toast('Card adicionado');
        updateBoardInfo(items);
    };

    const addNewColumn = (name) => {
        const items = board_info;

        items.columns.push({
            id: items.nextColumnId,
            name: name,
            groups: [{ id: items.nextGroupId, name: 'Doing', cards: [] }],
            showSwinLanes: false
        });

        items.nextColumnId++;
        items.nextGroupId++;

        updateBoardInfo(items);
        toast('Coluna criada');
    };

    const addNewSubColumn = (columnId) => {
        const items = board_info;

        const column_to_add = items.columns.find(
            (column) => column.id == columnId
        );

        column_to_add.groups.push({
            id: items.nextGroupId,
            name: 'Done',
            cards: []
        });
        items.nextGroupId++;

        forceUpdate();
        updateBoardInfo(items);
        toast('Subcoluna criada');
    };

    // #endregion

    return (
        <>
            <div className="ba bw mt6 flex flex-column items-center">
                <div className="ma3 pl3 w-100">
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                    >
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={(e) => {
                                openCustomModal(CREATE_COLUMN);
                                e.preventDefault();
                            }}
                        >
                            Adicionar coluna
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={(e) => {
                                openCustomModal(CREATE_LANE);
                                e.preventDefault();
                            }}
                        >
                            Criar raias
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={(e) => {
                                console.log(board_info);
                                e.preventDefault();
                            }}
                        >
                            DEBUG
                        </Button>
                    </Stack>
                </div>

                <div className="w-100 h-100 pl2 pr2">
                    {board_info && (
                        <div className="flex flex-row w-100">
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Column
                                    columns={board_info.columns}
                                    swinlanes={board_info.swinlanes}
                                    status={status}
                                    tags={tags}
                                    addNewCard={addNewCard}
                                    addNewSubColumn={addNewSubColumn}
                                    toggleSwinlane={toggleSwinlane}
                                />
                            </DragDropContext>
                        </div>
                    )}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modal_style}
                appElement={document.getElementById('root')}
            >
                {modal_type === 'CreateColumn' && (
                    <CreateColumn
                        addNewColumn={addNewColumn}
                        closeModal={closeModal}
                    />
                )}

                {modal_type === 'CreateLane' && (
                    <CreateLane current_lanes={data.lanes} />
                )}
            </Modal>
            <ToastContainer />
        </>
    );
};

Board.propTypes = {};

export default Board;
