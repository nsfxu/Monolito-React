import React, { useState } from 'react';
import Modal from 'react-modal';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import { Stack, Button, Divider } from '@mui/material';

import ModalStyles from '../../constants/modal-styles';

import Card from '../Card';
import CreateCard from '../CreateCard';
import SubColumn from '../SubColumn';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({
    title,
    data,
    subColumns,
    status,
    tags,
    addNewCard,
    addNewSubColumn
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const returnMaxWidth = () => {
        if (subColumns.length > 0) {
            return '32rem';
        }

        return '20rem';
    };

    return (
        <>
            <div
                className="ba w-100"
                style={{
                    backgroundColor: '#1e272e',
                    maxWidth: returnMaxWidth(),
                    minWidth: returnMaxWidth()
                }}
            >
                <div className="bb flex flex-column justify-center items-center">
                    <div>
                        <h3>{title}</h3>
                    </div>
                    <div className="w-100 h-100 flex flex-row flex-wrap justify-center mb3">
                        <Stack
                            direction="column"
                            divider={
                                <Divider orientation="vertical" flexItem />
                            }
                            spacing={1}
                        >
                            <Button
                                variant="contained"
                                size="small"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal();
                                }}
                            >
                                Criar
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
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

                <div className="h-100">
                    {subColumns.length > 0 ? (
                        <div className="flex flex-row items-start justify-center h-100">
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
                                    className="list pb2 h-100 w-100 flex flex-column items-start"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {data.map((obj, index) => {
                                        return (
                                            <Draggable
                                                key={`${index}${obj.id}`}
                                                draggableId={`${obj.id}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bw1 mt3"
                                                    >
                                                        <Card
                                                            object={obj}
                                                            tagsArr={tags}
                                                        />
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
            </div>
            <Modal
                isOpen={isModalOpen}
                style={ModalStyles.create}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
            >
                <CreateCard
                    addNewCard={addNewCard}
                    currentColumn={title}
                    statusArr={status}
                    tagsArr={tags}
                />
            </Modal>
        </>
    );
};

Column.propTypes = {
    title: propTypes.string,
    data: propTypes.any,
    status: propTypes.array,
    tags: propTypes.array,
    subColumns: propTypes.array,
    addNewCard: propTypes.func,
    addNewSubColumn: propTypes.func
};

export default Column;
