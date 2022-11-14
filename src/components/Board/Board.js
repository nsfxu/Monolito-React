import React, { useState, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { ViewColumn, HorizontalRule } from '@mui/icons-material';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import { TEST_DATA } from '../../constants/board-test-data';

import {
    findColumnByName,
    findSubColumnByName,
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

    //#region functions

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
        sourceIsSubColumn
    ) => {
        const source_pos_id = result.source.index;
        const destination_pos_id = result.destination.index;

        const destination_subcolumn = destinationIsSubColumn
            ? result.destination.droppableId.split(';')[0]
            : null;
        const destination_column = destinationIsSubColumn
            ? result.destination.droppableId.split(';')[1]
            : result.destination.droppableId;

        const source_subcolumn = sourceIsSubColumn
            ? result.source.droppableId.split(';')[0]
            : null;
        const source_column = sourceIsSubColumn
            ? result.source.droppableId.split(';')[1]
            : result.source.droppableId;

        if (destinationIsSubColumn && sourceIsSubColumn) {
            if (source_column === destination_column) {
                handleWhenSourceIsDestination(
                    items,
                    source_column,
                    source_subcolumn,
                    destination_subcolumn,
                    destination_pos_id,
                    source_pos_id
                );

                return;
            }

            handleWhenSourceIsntDestination(
                items,
                source_column,
                source_subcolumn,
                destination_column,
                destination_subcolumn,
                source_pos_id,
                destination_pos_id
            );

            return;
        }

        if (sourceIsSubColumn) {
            handleWhenSourceIsSubColumn(
                items,
                source_column,
                source_subcolumn,
                destination_column,
                source_pos_id,
                destination_pos_id
            );

            return;
        }

        if (destinationIsSubColumn) {
            handleWhenDestinationIsSubColumn(
                items,
                source_column,
                destination_column,
                destination_subcolumn,
                destination_pos_id,
                source_pos_id
            );

            return;
        }
    };

    const handleWhenSourceIsSubColumn = (
        items,
        source_column,
        source_subcolumn,
        destination_column,
        source_pos_id,
        destination_pos_id
    ) => {
        const column_to_delete = findColumnByName(items, source_column);

        const subcolumn_to_delete = findSubColumnByName(
            column_to_delete,
            source_subcolumn
        );

        column_to_delete.count--;
        const removed_item = removeObjectByPosition(
            subcolumn_to_delete,
            source_pos_id
        );

        const column_to_add = findColumnByName(items, destination_column);

        column_to_add.count++;
        addObjectIntoPosition(
            column_to_add,
            destination_pos_id,
            removed_item[0]
        );
    };

    const handleWhenDestinationIsSubColumn = (
        items,
        source_column,
        destination_column,
        destination_subcolumn,
        destination_pos_id,
        source_pos_id
    ) => {
        const column_to_delete = findColumnByName(items, source_column);

        column_to_delete.count--;
        const removed_item = removeObjectByPosition(
            column_to_delete,
            source_pos_id
        );

        const column_to_add = findColumnByName(items, destination_column);

        const subcolumn_to_add = findSubColumnByName(
            column_to_add,
            destination_subcolumn
        );

        column_to_add.count++;
        addObjectIntoPosition(
            subcolumn_to_add,
            destination_pos_id,
            removed_item[0]
        );
    };

    const handleWhenSourceIsDestination = (
        items,
        source_column,
        source_subcolumn,
        destination_subcolumn,
        destination_pos_id,
        source_pos_id
    ) => {
        const selected_column = findColumnByName(items, source_column);

        const selected_subcolumn = findSubColumnByName(
            selected_column,
            source_subcolumn
        );

        const removed_item = removeObjectByPosition(
            selected_subcolumn,
            source_pos_id
        );

        const subcolumn_to_add = findSubColumnByName(
            selected_column,
            destination_subcolumn
        );

        addObjectIntoPosition(
            subcolumn_to_add,
            destination_pos_id,
            removed_item[0]
        );
    };

    const handleWhenSourceIsntDestination = (
        items,
        source_column,
        source_subcolumn,
        destination_column,
        destination_subcolumn,
        source_pos_id,
        destination_pos_id
    ) => {
        const column_to_delete = findColumnByName(items, source_column);

        const subcolumn_to_delete = findSubColumnByName(
            column_to_delete,
            source_subcolumn
        );

        column_to_delete.count--;
        const removed_item = removeObjectByPosition(
            subcolumn_to_delete,
            source_pos_id
        );

        const column_to_add = findColumnByName(items, destination_column);

        const subcolumn_to_add = findSubColumnByName(
            column_to_add,
            destination_subcolumn
        );

        column_to_add.count++;
        addObjectIntoPosition(
            subcolumn_to_add,
            destination_pos_id,
            removed_item[0]
        );
    };

    const handleOnDragEnd = (result) => {
        console.clear();
        console.log(result);
        if (!result.destination) return;

        const items = board_info;

        const destinationIsSubColumn =
            result.destination.droppableId.includes(';');
        const sourceIsSubColumn = result.source.droppableId.includes(';');

        if (destinationIsSubColumn || sourceIsSubColumn) {
            checkHowToHandle(
                items,
                result,
                destinationIsSubColumn,
                sourceIsSubColumn
            );

            return;
        }

        const source_column_name = result.source.droppableId;
        const destination_column_name = result.destination.droppableId;
        const source_pos_id = result.source.index;
        const destination_pos_id = result.destination.index;

        const column_to_delete = items.columns.find(
            (column) => column.name === source_column_name
        );

        column_to_delete.count--;
        const removed_item = column_to_delete.data.splice(source_pos_id, 1);

        const column_to_add = items.columns.find(
            (column) => column.name === destination_column_name
        );

        column_to_add.count++;
        column_to_add.data.splice(destination_pos_id, 0, removed_item[0]);

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
            id: items.nextId,
            name: title,
            description: description
        };

        const column_to_add = findColumnByName(items, columnName);
        column_to_add.count++;

        if (column_to_add.subColumns.length > 0) {
            const subcolumn_to_add = column_to_add.subColumns[0];

            addObjectIntoPosition(subcolumn_to_add, 0, card_object);
        } else {
            addObjectIntoPosition(column_to_add, 0, card_object);
        }
        items.nextId++;

        forceUpdate();
        toast('Default notis!');
        updateBoardInfo(items);
    };

    const addNewColumn = (name) => {
        const items = board_info;

        items.columns.push({ name: name, count: 0, data: [], subColumns: [] });
        updateBoardInfo(items);
        toast('Default notis!');
    };

    const addNewSubColumn = (columnName) => {
        const items = board_info;

        const column_to_add = items.columns.find(
            (column) => column.name === columnName
        );

        column_to_add.subColumns = [
            { id: 0, name: 'Commited', data: [] },
            { id: 1, name: 'Done', data: [] }
        ];

        assignAllCardsToSubColumn(column_to_add);

        forceUpdate();
    };

    const assignAllCardsToSubColumn = (column_to_add) => {
        column_to_add.data.map((card) => {
            column_to_add.subColumns[0].data.push(card);
        });
        column_to_add.data = [];
    };

    // #endregion

    return (
        <>
            <div className="ba bw w-100 mt6 flex flex-column items-center">
                <div className="w-100 h-100 flex flex-row ma3 pl3 justify-start">
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                    >
                        <Button
                            variant="contained"
                            size="medium"
                            startIcon={<ViewColumn />}
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
                            startIcon={<HorizontalRule />}
                            onClick={(e) => {
                                openCustomModal(CREATE_LANE);
                                e.preventDefault();
                            }}
                        >
                            Criar raias
                        </Button>
                    </Stack>
                </div>

                <div className="w-100 h-100">
                    {board_info && (
                        <div className="flex flex-row w-100">
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                {board_info.columns.map((column, index) => (
                                    <Column
                                        title={column.name}
                                        data={column.data}
                                        subColumns={column.subColumns}
                                        key={index}
                                        addNewCard={addNewCard}
                                        addNewSubColumn={addNewSubColumn}
                                    />
                                ))}
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
