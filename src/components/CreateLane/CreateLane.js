import React from 'react';
import propTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import LaneOption from '../LaneOption';

/* eslint-disable */
// eslint-disable-next-line
const CreateLane = ({ current_lanes }) => {
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

    };

    return (
        <section>
            <form className="pa4 pb0 pt2 black-80">
                {/* Title */}
                <div>
                    <label className="f6 b db mb2">Nome da raia</label>
                    <input
                        className="input-reset ba b--black-20 pa2 mb2 db w-100"
                        type="text"
                    />
                </div>

                <div className="mt3">
                    <input
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                        type="submit"
                        value="Criar coluna"
                        onClick={(e) => {
                            e.preventDefault();
                            validateInputs();
                        }}
                    />
                </div>
            </form>
            {current_lanes && (
                <div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="lanes">
                            {(provided) => (
                                <ul
                                    className="list"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {current_lanes.map((lane, index) => (
                                        <Draggable
                                            key={lane.id}
                                            draggableId={`${lane.id}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <LaneOption
                                                        key={lane.id}
                                                        object={lane}
                                                    />
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
        </section>
    );
};

CreateLane.propTypes = {
    current_lanes: propTypes.array
};

export default CreateLane;
