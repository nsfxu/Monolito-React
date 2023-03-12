import React, { useState } from 'react';
import Modal from 'react-modal';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import { Stack, Button, Divider } from '@mui/material';
import { hasSubColumns } from '../../utils/column-utils';

import ModalStyles from '../../constants/modal-styles';

import Card from '../Card';
import CreateCard from '../CreateCard';
import SubColumn from '../SubColumn';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({
    columnId,
    title,
    groups,
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

    return (
        <>
            <div
                className="ba w-100"
                style={{
                    backgroundColor: '#1e272e'
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
                    {/* if this component receive more than 1 groups of columns then create subcolumns */}
                    {hasSubColumns(groups) ? (
                        <div className="flex flex-row items-start justify-center h-100">
                            {groups?.map((group) => (
                                <SubColumn
                                    parentColumnId={columnId}
                                    title={group.name}
                                    cardId={group.id}
                                    key={group.id}
                                    data={group.cards}
                                    tagsArr={tags}
                                />
                            ))}
                        </div>
                    ) : (
                        <Droppable droppableId={`${columnId}`}>
                            {(provided) => (
                                <ul
                                    className="flex flex-column items-center list w-100 h-100 pl3 pr3"
                                    style={{
                                        minWidth: '240px'
                                    }}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {groups[0].cards.map((card, index) => {
                                        return (
                                            <Draggable
                                                key={`${index}${card.id}`}
                                                draggableId={`${card.id}`}
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
                                                            object={card}
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
    columnId: propTypes.number,
    title: propTypes.string,
    grousp: propTypes.any,
    status: propTypes.array,
    tags: propTypes.array,
    addNewCard: propTypes.func,
    addNewSubColumn: propTypes.func
};

export default Column;
