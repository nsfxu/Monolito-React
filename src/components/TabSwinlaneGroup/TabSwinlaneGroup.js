import React from 'react';
import propTypes from 'prop-types';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TabColumn from '../TabColumn';

/* eslint-disable */
// eslint-disable-next-line
const TabSwinlaneGroup = ({
    all_columns,
    index,
    sendBackResult,
    setSelectedColumn
}) => {
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
        background: isDragging ? 'lightgrey' : '#565B61',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : '#35393C',

        display: 'flex',
        padding: grid,
        overflow: 'auto'
    });

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
            all_columns,
            result.source.index,
            result.destination.index
        );

        sendBackResult(items);
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
                                    <div className="flex flex-column items-center">
                                        <div>
                                            <p>Grupo de raias</p>
                                        </div>
                                        <div className="flex flex-row">
                                            {all_columns.map(
                                                (column, index) => (
                                                    <Draggable
                                                        key={`${column.id}`}
                                                        draggableId={`${column.id}`}
                                                        index={index}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided
                                                                        .draggableProps
                                                                        .style
                                                                )}
                                                                onClick={() => {
                                                                    setSelectedColumn(
                                                                        `${column.id}`
                                                                    );
                                                                }}
                                                            >
                                                                <TabColumn
                                                                    column_info={
                                                                        column
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            )}
                                        </div>
                                    </div>
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
    all_columns: propTypes.any,
    index: propTypes.number,
    sendBackResult: propTypes.func,
    setSelectedColumn: propTypes.func
};

export default TabSwinlaneGroup;
