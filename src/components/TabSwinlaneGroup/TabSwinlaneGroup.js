import React from 'react';
import propTypes from 'prop-types';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TabColumn from '../TabColumn';

/* eslint-disable */
// eslint-disable-next-line
const TabSwinlaneGroup = ({ all_columns, index, provided, snapshot }) => {
    const grid = 8;

    const getItemGroupStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',

        display: 'flex',
        padding: grid,
        overflow: 'auto'
    });

    const onDragEnd = (result) => {
        console.log(result);
    };

    return (
        <Draggable
            key={`swinlane-group`}
            draggableId={`swinlane-group`}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemGroupStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    // onClick={() => {
                    //     setSelectedColumn(`${column.id}`);
                    // }}
                >
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable
                            droppableId="rowSwinlaneGroup"
                            direction="horizontal"
                        >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                    {...provided.droppableProps}
                                >
                                    {all_columns.map((column, index) => (
                                        <Draggable
                                            key={`${column.id}`}
                                            draggableId={`${column.id}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps
                                                            .style
                                                    )}
                                                    // onClick={() => {
                                                    //     setSelectedColumn(
                                                    //         `${column.id}`
                                                    //     );
                                                    // }}
                                                >
                                                    <TabColumn
                                                        column_info={column}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
        </Draggable>
    );
};

TabSwinlaneGroup.propTypes = {
    all_columns: propTypes.any
};

export default TabSwinlaneGroup;
