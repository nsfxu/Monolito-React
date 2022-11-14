import React from 'react';
// import Modal from 'react-modal';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import Card from '../Card';

/* eslint-disable */
// eslint-disable-next-line
const SubColumn = ({ title, parentColumn, data }) => {
    return (
        <div className="ba w-100 h-100 flex flex-column items-start justify-center ma2">
            <header className='self-center'>
                <h3>{title}</h3>
            </header>
            <section className="w-100 h-100">
                {data && (
                    <Droppable droppableId={`${title};${parentColumn}`}>
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
                                                    className="bw1 mt3"
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
            </section>
        </div>
    );
};

SubColumn.propTypes = {
    title: propTypes.string,
    parentColumn: propTypes.string,
    data: propTypes.any
};

export default SubColumn;
