import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import { hasSubColumns } from '../../utils/column-utils';

import Card from '../Card';
import SubColumn from '../SubColumn';
import ColumnHeader from '../ColumnHeader/ColumnHeader';

/* eslint-disable */
// eslint-disable-next-line
const NormalColumn = ({ this_column, tags, openModal, addNewSubColumn }) => {
    return (
        <div
            className="ba w-100"
            style={{
                backgroundColor: '#1e272e'
            }}
        >
                    <ColumnHeader this_column={this_column} openModal={openModal} addNewSubColumn={addNewSubColumn} />

            <div className="h-100">
                {hasSubColumns(this_column.groups) ? (
                    <div className="flex flex-row items-start justify-center h-100">
                        {this_column.groups?.map((group) => (
                            <SubColumn
                                parentColumnId={this_column.id}
                                title={group.name}
                                groupId={group.id}
                                key={group.id}
                                data={group.cards}
                                tagsArr={tags}
                            />
                        ))}
                    </div>
                ) : (
                    <Droppable droppableId={`${this_column.id}`}>
                        {(provided) => (
                            <ul
                                className="flex flex-column items-center list w-100 h-100 pl3 pr3"
                                style={{
                                    minWidth: '240px',
                                    backgroundColor: 'red'
                                }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this_column.groups[0].cards.map(
                                    (card, index) => {
                                        return (
                                            <Draggable
                                                key={`${index}${card.id}`}
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
                                                            tagsArr={tags}
                                                        />
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    }
                                )}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                )}
            </div>
        </div>
    );
};

NormalColumn.propTypes = {
    this_column: propTypes.any,
    tags: propTypes.array,
    openModal: propTypes.func,
    addNewSubColumn: propTypes.func
};

export default NormalColumn;
