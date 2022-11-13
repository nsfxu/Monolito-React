import React, { useState, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import { TEST_DATA } from '../../constants/board-test-data';

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

    const getSubColumnId = (name, subColumns) => {
        const selected_column = subColumns.find(
            (column) => column.name === name
        );

        console.log(selected_column.id);

        return selected_column.id;
    };

    const handleOnDragEndSubColumn = (
        items,
        result,
        destinationIsSubColumn,
        sourceIsSubColumn
    ) => {
        const source_pos_id = result.source.index;
        const destination_pos_id = result.destination.index;
        const card_id = result.draggableId;

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
            // for cards changes inside the same column
            if (source_column === destination_column) {
                const selected_column = items.columns.find(
                    (column) => column.name === source_column
                );

                const selected_subcolumn = selected_column.subColumns.find(
                    (sub_column) => sub_column.name === source_subcolumn
                );

                const removed_item = selected_subcolumn.data.splice(
                    source_pos_id,
                    1
                );

                const subcolumn_to_add = selected_column.subColumns.find(
                    (sub_column) => sub_column.name === destination_subcolumn
                );

                subcolumn_to_add.data.splice(
                    destination_pos_id,
                    0,
                    removed_item[0]
                );

                return;
            }

            // for card changes to another column with subcolumns
            const column_to_delete = items.columns.find(
                (column) => column.name === source_column
            );

            const subcolumn_to_delete = column_to_delete.subColumns.find(
                (subcolumn) => subcolumn.name === source_subcolumn
            );

            column_to_delete.count--;
            const removed_item = subcolumn_to_delete.data.splice(
                source_pos_id,
                1
            );

            const column_to_add = items.columns.find(
                (column) => column.name === destination_column
            );

            const subcolumn_to_add = column_to_add.subColumns.find(
                (subcolumn) => subcolumn.name === destination_subcolumn
            );

            column_to_add.count++;
            subcolumn_to_add.data.splice(
                destination_pos_id,
                0,
                removed_item[0]
            );

            return;
        }

        if (sourceIsSubColumn) {
            const column_to_delete = items.columns.find(
                (column) => column.name === source_column
            );

            const subcolumn_to_delete = column_to_delete.subColumns.find(
                (subcolumn) => subcolumn.name === source_subcolumn
            );

            column_to_delete.count--;
            const removed_item = subcolumn_to_delete.data.splice(
                source_pos_id,
                1
            );

            const column_to_add = items.columns.find(
                (column) => column.name === destination_column
            );

            column_to_add.count++;
            column_to_add.data.splice(destination_pos_id, 0, removed_item[0]);

            return;
        }

        if (destinationIsSubColumn) {
            const column_to_delete = items.columns.find(
                (column) => column.name === source_column
            );

            column_to_delete.count--;
            const removed_item = column_to_delete.data.splice(source_pos_id, 1);

            const column_to_add = items.columns.find(
                (column) => column.name === destination_column
            );

            const subcolumn_to_add = column_to_add.subColumns.find(
                (subcolumn) => subcolumn.name === destination_subcolumn
            );

            column_to_add.count++;
            subcolumn_to_add.data.splice(destination_pos_id, 0, removed_item[0]);
        }
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
            handleOnDragEndSubColumn(
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
        const column_to_add = items.columns.find(
            (column) => column.name === columnName
        );

        column_to_add.count++;
        column_to_add.data.push({
            id: items.nextId,
            name: title,
            description: description
        });
        items.nextId++;

        forceUpdate();
        toast('Default notis!');
        updateBoardInfo(items);
    };

    const addNewColumn = (name) => {
        const items = board_info;

        items.columns.push({ name: name, count: 0, data: [] });
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

    return (
        <>
            <div className="ba bw w-100 pr4" style={{ backgroundColor: 'red' }}>
                <h1>Board</h1>
                {/* Criar coluna */}
                <button
                    onClick={(e) => {
                        openCustomModal(CREATE_COLUMN);
                        e.preventDefault();
                    }}
                >
                    Adicionar coluna
                </button>
                {/* Criar raia */}
                <button
                    onClick={(e) => {
                        openCustomModal(CREATE_LANE);
                        e.preventDefault();
                    }}
                >
                    Criar raias
                </button>

                {board_info && (
                    <div className="flex flex-row w-75">
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
