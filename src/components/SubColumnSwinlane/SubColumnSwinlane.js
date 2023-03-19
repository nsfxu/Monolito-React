import React from 'react';

// import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

// import Card from '../Card';

/* eslint-disable */
// eslint-disable-next-line
const SubColumnSwinlane = ({
    parentColumnId,
    all_swinlanes,
    all_groups,
    swinlane_id,
    groupId,
    title,
    data,
    tagsArr
}) => {
    return (
        <div className="w-100 h-100 flex flex-column items-start justify-center ma3">
            <header className="self-center">
                <h3 className="ma0 pa0">{title}</h3>
            </header>
            {/* <section className="w-100 h-100">
                {data && (
                    <Droppable
                        droppableId={`${parentColumnId};${groupId}-${swinlane_id}`}
                    >
                        {(provided) => (
                            <ul
                                className="list pl1 pr1 pb2 w-100 h-100 flex flex-column items-start"
                                style={{
                                    minWidth: '240px'
                                }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {data.map((card, index) => {
                                    console.log(card.laneId, swinlane_id)
                                    if (card.laneId == swinlane_id)
                                        return (
                                            <Draggable
                                                key={card.id}
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
            </section> */}
        </div>
    );
};

SubColumnSwinlane.propTypes = {
    parentColumnId: propTypes.number,
    all_swinlanes: propTypes.any,
    all_groups: propTypes.any,
    swinlane_id: propTypes.number,
    groupId: propTypes.number,
    title: propTypes.string,
    data: propTypes.any,
    tagsArr: propTypes.array
};

export default SubColumnSwinlane;
