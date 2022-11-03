import React, { useState } from 'react';
import Modal from 'react-modal';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import ModalStyles from '../../constants/modal-styles';

import Card from '../Card';
import CreateCard from '../CreateCard';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({ title, data, addNewCard }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="w-100 ba bw1" style={{ backgroundColor: 'yellow' }}>
                <div className="bb flex flex-column justify-center items-center">
                    <h1>{title}</h1>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            openModal();
                        }}
                    >
                        Adicionar card
                    </button>
                </div>
                <Droppable droppableId={title}>
                    {(provided) => (
                        <ul
                            className="list pl3 pr3 pb2 h-100"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {data.map((obj, index) => {
                                return (
                                    <Draggable
                                        key={obj.id}
                                        draggableId={`${obj.id}`}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="ba bw1 mt3"
                                            >
                                                <Card object={obj} />
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
            <Modal
                isOpen={isModalOpen}
                style={ModalStyles.create}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
            >
                <CreateCard addNewCard={addNewCard} currentColumn={title} />
            </Modal>
        </>
    );
};

Column.propTypes = {
    title: propTypes.string,
    data: propTypes.any,
    addNewCard: propTypes.func
};

export default Column;
