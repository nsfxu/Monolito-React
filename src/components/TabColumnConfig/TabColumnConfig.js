import React, { useState } from 'react';
import propTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// import { Box, Typography } from '@mui/material';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnConfig = ({ board_columns }) => {
    const [temp_columns, setTempColumns] = useState(board_columns);

    console.log(temp_columns);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            temp_columns,
            result.source.index,
            result.destination.index
        );

        setTempColumns(items);
    };

    const grid = 8;

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

    return (
        <>
            {temp_columns ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="columnConfigTab" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {temp_columns.map((column, index) => (
                                    <Draggable
                                        key={column.id}
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
                                            >
                                                {column.name}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                'Carregando...'
            )}
        </>
    );
};

TabColumnConfig.propTypes = {
    board_columns: propTypes.array
};

export default TabColumnConfig;
