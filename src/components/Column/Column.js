import React, { useState } from 'react';
import Modal from 'react-modal';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import { AddCircleOutline, ViewColumn } from '@mui/icons-material';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import ModalStyles from '../../constants/modal-styles';

import Card from '../Card';
import CreateCard from '../CreateCard';
import SubColumn from '../SubColumn';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({ title, data, subColumns, addNewCard, addNewSubColumn }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="w-100 ba" style={{ backgroundColor: '#1e272e' }}>
                <div className="bb flex flex-column justify-center items-center">
                    <div>
                        <h1>{title}</h1>
                    </div>
                    <div className="w-100 h-100 flex flex-row flex-wrap justify-center mb3">
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
                                startIcon={<AddCircleOutline />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal();
                                }}
                            >
                                Adicionar card
                            </Button>
                            <Button
                                variant="contained"
                                size="medium"
                                startIcon={<ViewColumn />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    addNewSubColumn(title);
                                }}
                            >
                                Criar sub-coluna
                            </Button>
                        </Stack>
                    </div>
                </div>

                {subColumns.length > 0 ? (
                    <div className="flex flex-row items-start justify-center">
                        {subColumns?.map((obj) => (
                            <SubColumn
                                title={obj.name}
                                parentColumn={title}
                                key={obj.id}
                                data={obj.data}
                            />
                        ))}
                    </div>
                ) : (
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
                                                    className="ba b--white-20 bw1 mt3"
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
                )}
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
    subColumns: propTypes.array,
    addNewCard: propTypes.func,
    addNewSubColumn: propTypes.func
};

export default Column;
