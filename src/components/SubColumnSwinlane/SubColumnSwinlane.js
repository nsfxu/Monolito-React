import React from 'react';

import propTypes from 'prop-types';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Card from '../Card';

/* eslint-disable */
// eslint-disable-next-line
const SubColumnSwinlane = ({
    parentColumnId,
    all_swinlanes,
    all_groups,
    tagsArr,
    is_first_column,
    toggleSwinlane
}) => {
    let is_first_group = true;

    const renderDroppable = (current_group, swinlane_id, swinlane_expanded) => {
        if (swinlane_expanded) {
            return (
                current_group.cards && (
                    <Droppable
                        droppableId={`${parentColumnId};${current_group.id}-${swinlane_id}`}
                    >
                        {(provided) => (
                            <ul
                                className="list pl1 pr1 pb2 w-100 h-auto flex flex-column items-start"
                                style={{
                                    minWidth: '240px',
                                    minHeight: '10em',
                                    backgroundColor: 'red'
                                }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {current_group.cards.map((card, index) => {
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
                )
            );
        }
        return (
            <ul
                className="list pl1 pr1 pb2 w-100 h-auto flex flex-column items-start"
                style={{
                    minWidth: '240px',
                    minHeight: '10em',
                    backgroundColor: 'red'
                }}
            >
                {current_group.cards.map((card, index) => {
                    if (card.laneId == swinlane_id) {
                        return (
                            <li className="bw1 mt3" key={index}>
                                <Card object={card} tagsArr={tagsArr} />
                            </li>
                        );
                    }
                })}
            </ul>
        );
    };

    const renderSubColumn = (swinlane_id, swinlane_expanded) => {
        return all_groups?.map((current_group, index) => (
            <div
                className="w-100 h-auto flex flex-column items-start justify-center ma3"
                key={index}
            >
                {is_first_group && (
                    <header className="self-center">
                        <h3 className="ma0 pa0">{current_group.name}</h3>
                    </header>
                )}
                <section>
                    {renderDroppable(
                        current_group,
                        swinlane_id,
                        swinlane_expanded
                    )}
                </section>
            </div>
        ));
    };

    return all_swinlanes.map((swinlane, index) => (
        <div key={index}>
            <ListItemButton
                sx={{ backgroundColor: 'cyan' }}
                style={{ minHeight: '3em' }}
                className="w-100"
                onClick={() => {
                    toggleSwinlane(swinlane.id);
                }}
            >
                {is_first_column && (
                    <ListItemText primary={swinlane.name}></ListItemText>
                )}
            </ListItemButton>
            <Collapse in={swinlane.expanded} className="w-100">
                <div className="flex flex-row items-start justify-center">
                    {renderSubColumn(swinlane.id, swinlane.expanded)}
                </div>
            </Collapse>
            {is_first_column ? (is_first_group = false) : is_first_group}
        </div>
    ));
};

SubColumnSwinlane.propTypes = {
    parentColumnId: propTypes.number,
    all_swinlanes: propTypes.any,
    title: propTypes.string,
    tagsArr: propTypes.array,
    is_first_column: propTypes.bool,
    toggleSwinlane: propTypes.func
};

export default SubColumnSwinlane;
