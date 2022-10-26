import React from 'react';
import propTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '../Card';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({ title, data }) => {
    return (
        <div className="w-100 ba bw1" style={{ backgroundColor: 'yellow' }}>
            <div className="bb flex justify-center">
                <h1>{title}</h1>
            </div>
            <Droppable droppableId={title}>
                {(provided) => (
                    <ul
                        className="list pl3 pr3 pb2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {data.map(({ id, name }, index) => {
                            return (
                                <Draggable
                                    key={id}
                                    draggableId={`${id}`}
                                    index={index}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="ba bw1 mt3"
                                        >
                                            <Card title={name} />
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
    );
};

Column.propTypes = {
    title: propTypes.string,
    data: propTypes.any
};

export default Column;
