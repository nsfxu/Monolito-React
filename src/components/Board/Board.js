import React, { useState, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import { TEST_DATA } from '../../constants/board-test-data';

import Column from '../Column/Column';
import CreateColumn from '../CreateColumn/CreateColumn';

const CREATE_COLUMN = 'CreateColumn';
const CREATE_LANE = 'CreateLane';

/* eslint-disable */
// eslint-disable-next-line
const Board = () => {
    const data = TEST_DATA;

    console.log(data);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [board_info, updateBoardInfo] = useState(data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal_type, setModalType] = useState(null);

    const openCustomModal = (modal) => {
        if (modal === CREATE_COLUMN) {
            setModalType(modal);
        }

        if (modal === CREATE_LANE) {
            setModalType(modal);
        }

        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = board_info;
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

    return (
        <>
            <div className="ba bw w-100 pr4" style={{ backgroundColor: 'red' }}>
                <h1>Board</h1>
                <button
                    onClick={(e) => {
                        openCustomModal(CREATE_COLUMN);
                        e.preventDefault();
                    }}
                >
                    Adicionar coluna
                </button>
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
                                    key={index}
                                    addNewCard={addNewCard}
                                />
                            ))}
                        </DragDropContext>
                    </div>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={ModalStyles.createColumn}
                appElement={document.getElementById('root')}
            >
                {modal_type === 'CreateColumn' && (
                    <CreateColumn
                        addNewColumn={addNewColumn}
                        closeModal={closeModal}
                    />
                )}

                {modal_type === 'CreateLane' && <h1>Criar lana</h1>}
            </Modal>
            <ToastContainer />
        </>
    );
};

Board.propTypes = {};

export default Board;
