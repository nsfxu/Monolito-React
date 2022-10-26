import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({ title, data, handleOnDragEnd }) => {
    const [characters, updateCharacters] = useState(data);

    return (
        <div className="ba bw w-50 pr4" style={{ backgroundColor: 'yellow' }}>
            <h1>{title}</h1>
            <Droppable droppableId={title}>
                {(provided) => (
                    <ul
                        className="characters"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {characters.map(({ id, name }, index) => {
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
                                            className="ba bw1"
                                        >
                                            <p>{name}</p>
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

Column.propTypes = {};

export default Column;
