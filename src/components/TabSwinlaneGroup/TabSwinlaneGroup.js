import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import TabColumn from '../TabColumn';

/* eslint-disable */
// eslint-disable-next-line
const TabSwinlaneGroup = ({ all_columns, index }) => {
    const [swinlane_columns, setSwinlaneColumns] = useState([]);
    const grid = 8;

    useEffect(() => {
        separateColumns();
    }, [all_columns]);

    useEffect(() => {
        console.log(swinlane_columns);
    }, [swinlane_columns]);

    const separateColumns = () => {
        const temp_swinlane_columns = [];

        if (all_columns.length > 0) {
            all_columns.map((column) => {
                column.showSwinLanes && temp_swinlane_columns.push(column);
            });
        }

        setSwinlaneColumns(temp_swinlane_columns);
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightblue' : 'lightgrey',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightgreen' : 'grey',

        display: 'flex',
        padding: grid,
        overflow: 'auto'
    });

    return (
        <>
            {swinlane_columns && (
                <Droppable
                    droppableId="droppableSwinlaneGroup"
                    type={`${index}`}
                    direction="horizontal"
                >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {swinlane_columns.map((column, index) => (
                                <Draggable
                                    key={`swinlane-${column.id}`}
                                    draggableId={`swinlane-${column.id}`}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <TabColumn column_info={column} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )}
        </>
    );
};

TabSwinlaneGroup.propTypes = {
    all_columns: propTypes.any
};

export default TabSwinlaneGroup;
