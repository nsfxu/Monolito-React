/* eslint-disable */
// eslint-disable-next-line
import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { DragDropContext } from 'react-beautiful-dnd';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import {
    findColumnById,
    findSubColumnById,
    removeObjectByPosition,
    addObjectIntoPosition
} from '../../utils/column-utils';

import Column from '../../components/Column';
import ConfigBoardModal from '../../components/ConfigBoardModal';
import Navbar from '../../components/Navbar/Navbar';
import { updateCardGroup } from '../../services/card-service';

const CONFIG_BOARD = 'ConfigBoard';

const Board = (props) => {
    const history = useHistory();

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [board_info, updateBoardInfo] = useState(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal_type, setModalType] = useState(null);
    const [modal_style, setModalStyle] = useState(null);

    const [status, setStatus] = useState([]);
    const [tags, setTags] = useState([{}]);

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');

        if (!loggedUser) {
            history.push('/login');
        }

        setUser(JSON.parse(loggedUser));
    }, []);

    useEffect(async () => {
        if (props.location.state) {
            await updateBoardInfo(props.location.state);

            return;
        }

        history.push('/dashboard');
    }, [props]);

    useEffect(() => {
        if (board_info) {
            getAllColumns();
            getAllTags();

            forceUpdate();
        }

        console.log(board_info);
    }, [board_info]);

    //#region functions

    const updateWithNewBoardInfo = async (board_info) => {
        await updateBoardInfo({
            columns: [],
            tags: [],
            swinlanes: [],
            nextCardId: 0,
            nextGroupId: 0,
            nextColumnId: 0
        });
        await updateBoardInfo(board_info);

        console.log(board_info);

        await getAllColumns();
        await getAllTags();

        forceUpdate();
    };

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
        if (modal === CONFIG_BOARD) {
            setModalType(modal);
            setModalStyle(ModalStyles.configBoard);
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
        destinationHasSwinlane
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

        updateCurrentCardGroup(
            removed_item[0].id,
            destination_pos_id,
            source_pos_id,
            column_to_add.groups[0].id,
            removed_item[0].laneId
        );

        updateBoardInfo(items);
    };

    const updateCurrentCardGroup = async (
        id_card,
        new_order,
        old_order,
        id_group,
        id_swinlane
    ) => {
        const response = await updateCardGroup(
            id_card,
            new_order,
            old_order,
            id_group,
            id_swinlane
        );

        console.log(response);
    };

    const addNewCard = (currentColumn, new_card) => {
        const items = board_info;

        const card_object = {
            id: items.nextCardId,
            name: new_card.title,
            description: new_card.description
        };

        if (currentColumn.showSwinLanes) {
            card_object.laneId = new_card.laneId;
        }

        const column_to_add = findColumnById(items, new_card.status);

        if (new_card.groupId) {
            const groupIndex = column_to_add.groups.findIndex((group) => {
                return group.id == new_card.groupId;
            });

            addObjectIntoPosition(
                column_to_add.groups[parseInt(groupIndex)],
                0,
                card_object
            );
        } else {
            addObjectIntoPosition(column_to_add.groups[0], 0, card_object);
        }

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
            {user && board_info && (
                <>
                    <Navbar userObject={user} />
                    <div className="flex flex-column items-center mt5 ml5 ba bw">
                        <div className="ma3 pl3 w-100">
                            <Stack
                                direction="row"
                                divider={
                                    <Divider orientation="vertical" flexItem />
                                }
                                spacing={2}
                            >
                                <Button
                                    variant="contained"
                                    size="medium"
                                    onClick={(e) => {
                                        openCustomModal(CONFIG_BOARD);
                                        e.preventDefault();
                                    }}
                                >
                                    Configurar quadro
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

                        {board_info && (
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Column
                                    columns={board_info.columns}
                                    swinlanes={board_info.swinlanes}
                                    status={status}
                                    tags={tags}
                                    addNewCard={addNewCard}
                                    toggleSwinlane={toggleSwinlane}
                                />
                            </DragDropContext>
                        )}
                    </div>
                </>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modal_style}
                appElement={document.getElementById('root')}
            >
                {modal_type === 'ConfigBoard' && (
                    <ConfigBoardModal
                        board_info={board_info}
                        closeModal={closeModal}
                        updateWithNewBoardInfo={updateWithNewBoardInfo}
                    />
                )}
            </Modal>
            <ToastContainer />
        </>
    );
};

Board.propTypes = {};

export default Board;
