import React from 'react';
import propTypes from 'prop-types';

import { Draggable } from 'react-beautiful-dnd';

import TabColumn from '../TabColumn';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnItem = ({
    column,
    index,
    provided,
    snapshot,
    getItemStyle,
    setSelectedColumn
}) => {
    return (
        <Draggable key={column.id} draggableId={`${column.id}`} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    onClick={() => {
                        setSelectedColumn(`${column.id}`);
                    }}
                >
                    <TabColumn column_info={column} />
                </div>
            )}
        </Draggable>
    );
};

TabColumnItem.propTypes = {
    column: propTypes.any,
    index: propTypes.number,
    provided: propTypes.any,
    snapshot: propTypes.any,
    getItemStyle: propTypes.func,
    setSelectedColumn: propTypes.func
};

export default TabColumnItem;
