import React from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import Card from '../Card';

/* eslint-disable */
// eslint-disable-next-line
const SubColumn = ({ parentColumnId, cardId, title, data, tagsArr }) => {
    return (
        <div className="w-100 h-100 flex flex-column items-start justify-center ma3">
            <header className="self-center">
                <h3 className="ma0 pa0">{title}</h3>
            </header>
            <section className="w-100 h-100">
                {data && (
                    <Droppable droppableId={`${parentColumnId};${cardId}`}>
                        {(provided) => (
                            <ul
                                className="list pl1 pr1 pb2 w-100 h-100 flex flex-column items-start"
                                style={{
                                    minWidth: '240px'
                                }}
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
                                                    className="bw1 mt3"
                                                >
                                                    <Card
                                                        object={obj}
                                                        tagsArr={tagsArr}
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
            </section>
        </div>
    );
};

SubColumn.propTypes = {
    parentColumnId: propTypes.number,
    cardId: propTypes.number,
    title: propTypes.string,
    data: propTypes.any,
    tagsArr: propTypes.array
};

export default SubColumn;
