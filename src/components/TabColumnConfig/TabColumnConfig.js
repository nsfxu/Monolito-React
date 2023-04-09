import React, { useState } from 'react';
import propTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import TabColumn from '../TabColumn';
import TabColumnInfo from '../TabColumnInfo';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnConfig = ({ board_columns }) => {
    const [temp_columns, setTempColumns] = useState(board_columns);
    const [selected_column, setSelectedColumn] = useState(false);

    const grid = 8;

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
            {temp_columns && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId="columnConfigTab"
                        direction="horizontal"
                    >
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
                                                onClick={() => {
                                                    setSelectedColumn(
                                                        `${column.id}`
                                                    );
                                                }}
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
            )}
            {selected_column ? (
                <TabColumnInfo
                    selected_column={selected_column}
                    board_columns={board_columns}
                />
            ) : (
                'Clique em uma coluna para alterar as configurações dela.'
            )}
        </>
    );
};

TabColumnConfig.propTypes = {
    board_columns: propTypes.array
};

export default TabColumnConfig;
