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

import {
    updateCardGroup,
    updateCardGroupV2
} from '../../services/card-service';
import {
    getBoardInfo,
    getBoardParticipants
} from '../../services/board-service';

const CONFIG_BOARD = 'ConfigBoard';

const Board = (props) => {
    const history = useHistory();

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [board_id, setBoardId] = useState(undefined);
    const [board_info, updateBoardInfo] = useState(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal_type, setModalType] = useState(null);
    const [modal_style, setModalStyle] = useState(null);

    const [participants, setParticipants] = useState([]);
    const [status, setStatus] = useState([]);
    const [tags, setTags] = useState([{}]);

    const [user, setUser] = useState(undefined);
    const [current_user_permission, setCurrentUserPermission] = useState(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');

        if (!loggedUser) {
            history.push('/login');
        }

        setUser(JSON.parse(loggedUser));
    }, []);

    useEffect(async () => {
        if (props.location.state && !board_id) {
            await setBoardId(props.location.state);

            return;
        }

        history.push('/dashboard');
    }, [props]);

    useEffect(async () => {
        if (board_id) {
            await getInfoByBoardId();
        }
    }, [board_id]);

    useEffect(() => {
        if (board_info) {
            getAllColumns();
            getAllTags();
            insertAllCardTags();
            forceUpdate();
            console.log(board_info);
        }
    }, [board_info]);

    useEffect(() => {
        if (participants.length > 0 && user) {
            participants.map((this_part) => {
                if (this_part.id_user == user.id_user) {
                    setCurrentUserPermission(this_part.id_permission);
                }
            });
            console.log(participants, user);
        }
    }, [participants, user]);

    //#region functions

    const getInfoByBoardId = async () => {
        const db_board_data = await getBoardInfo(board_id);

        await updateBoardInfo({ ...db_board_data.result });
        await getAllParticipants(board_id);
    };

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

    const insertAllCardTags = () => {
        if (board_info.columns.length == 0) {
            return;
        }

        board_info.columns.map((this_column) => {
            if (this_column.groups.length > 0) {
                this_column.groups.map((this_group) => {
                    if (this_group.cards.length > 0) {
                        this_group.cards.map((this_card) => {
                            board_info.card_tags.map((ct) => {
                                if (this_card.id == ct.id_card)
                                    this_card.id_tags = JSON.parse(ct.tags);
                                else this_card.id_tags = [];
                            });
                        });
                    }
                });
            }
        });
    };

    const getAllParticipants = async (id_board) => {
        const response = await getBoardParticipants(id_board);

        if (response.result) {
            await setParticipants(response.result);
        }
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

    const handleWhenSourceIsSubColumn = async (
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

        removed_item[0].id_group = column_to_add.groups[0].id;

        getAllCardPos(
            column_to_add.groups[0],
            removed_item[0],
            removed_item[0].laneId
        );

        // updateCardGroup(
        //     removed_item[0].id,
        //     destination_pos_id,
        //     source_pos_id,
        //     column_to_add.groups[0].id,
        //     removed_item[0].laneId
        // );
    };

    const handleWhenDestinationIsSubColumn = async (
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

        await addObjectIntoPosition(
            subcolumn_to_add,
            destination_pos_id,
            removed_item[0]
        );

        removed_item[0].id_group = subcolumn_to_add.id;

        getAllCardPos(
            subcolumn_to_add,
            removed_item[0],
            removed_item[0].laneId
        );

        // updateCardGroup(
        //     removed_item[0].id,
        //     destination_pos_id,
        //     source_pos_id,
        //     subcolumn_to_add.id,
        //     removed_item[0].laneId
        // );
    };

    const handleWhenSourceIsDestination = async (
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

        await addObjectIntoPosition(
            subcolumn_to_add,
            destination_pos_id,
            removed_item[0]
        );

        getAllCardPos(
            subcolumn_to_add,
            removed_item[0],
            removed_item[0].laneId
        );

        // if (source_subcolumn_id != destination_subcolumn_id) {
        //     getAllCardPos(
        //         subcolumn_to_add,
        //         removed_item[0],
        //         removed_item[0].laneId
        //     );
        // } else {
        //     getAllCardPos(subcolumn_to_add, null, removed_item[0].laneId);
        // }

        // updateCardGroup(
        //     removed_item[0].id,
        //     destination_pos_id,
        //     source_pos_id,
        //     subcolumn_to_add.id,
        //     removed_item[0].laneId
        // );
    };

    const handleWhenSourceIsntDestination = async (
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

        removed_item[0].id_group = subcolumn_to_add.id;

        addObjectIntoPosition(
            subcolumn_to_add,
            destination_pos_id,
            removed_item[0]
        );

        getAllCardPos(
            subcolumn_to_add,
            removed_item[0],
            removed_item[0].laneId
        );

        // updateCardGroup(
        //     removed_item[0].id,
        //     destination_pos_id,
        //     source_pos_id,
        //     subcolumn_to_add.id,
        //     removed_item[0].laneId
        // );
    };

    const handleOnDragEnd = (result) => {
        if (current_user_permission == 3) {
            toast(
                'Você não pode alterar a posição desse card por ser um convidado.'
            );
            return;
        }
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

        // update group_id
        removed_item[0].id_group = column_to_add.groups[0].id;

        column_to_add.groups[0].cards.splice(
            destination_pos_id,
            0,
            removed_item[0]
        );

        if (source_column_id != destination_column_id) {
            getAllCardPos(column_to_add.groups[0], removed_item[0], null);
        } else {
            getAllCardPos(column_to_add.groups[0], null, null);
        }

        // updateCurrentCardGroup(
        //     removed_item[0].id,
        //     destination_pos_id,
        //     source_pos_id,
        //     column_to_add.groups[0].id,
        //     removed_item[0].laneId
        // );

        updateBoardInfo(items);
    };

    const getAllCardPos = async (group, this_card, laneId) => {
        const id_group = group.id;
        let cardObj = null;

        if (this_card) {
            cardObj = {
                id_card: this_card.id,
                id_swinlane: laneId ? laneId : null
            };
        }

        const cardArr = [...group.cards];
        const apiObj = [];

        if (cardArr.length > 0) {
            cardArr.map((this_card, index) => {
                apiObj.push({ id_card: this_card.id, order: index });
            });
        }
        const response = await updateCardGroupV2(id_group, cardObj, apiObj);
        console.log(response);

        getInfoByBoardId();
        // const temp_board = { ...board_info };
        // await updateBoardInfo(null);
        // await updateBoardInfo(temp_board);
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

    const updateParticipants = async (new_participant) => {
        await setParticipants(new_participant);
    };

    // #endregion

    return (
        <>
            {user && board_info && current_user_permission && (
                <>
                    <Navbar userObject={user} />
                    <div className="flex flex-column items-center mt5 ml5 bw">
                        <div className="ma3 pl3 w-100">
                            <Stack
                                direction="row"
                                divider={
                                    <Divider orientation="vertical" flexItem />
                                }
                                spacing={2}
                            >
                                {current_user_permission == 1 && (
                                    <>
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
                                    </>
                                )}
                            </Stack>
                        </div>

                        {board_info && participants && (
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Column
                                    toast={toast}
                                    current_user_permission={
                                        current_user_permission
                                    }
                                    board_info={board_info}
                                    columns={board_info.columns}
                                    swinlanes={board_info.swinlanes}
                                    participants={participants}
                                    status={status}
                                    tags={tags}
                                    toggleSwinlane={toggleSwinlane}
                                    updateBoardInfo={updateBoardInfo}
                                    getInfoByBoardId={getInfoByBoardId}
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
                        board_id={board_id}
                        board_info={board_info}
                        participants={participants}
                        closeModal={closeModal}
                        updateWithNewBoardInfo={updateWithNewBoardInfo}
                        updateParticipants={updateParticipants}
                    />
                )}
            </Modal>
            <ToastContainer />
        </>
    );
};

Board.propTypes = {};

export default Board;
