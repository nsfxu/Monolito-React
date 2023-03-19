import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import { Stack, Button, Divider } from '@mui/material';
import { hasSubColumns } from '../../utils/column-utils';

import Card from '../Card';
import SubColumn from '../SubColumn';

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
            <div className="bb flex flex-column justify-center items-center">
                <div>
                    <h3>{this_column.name}</h3>
                </div>
                <div className="w-100 h-100 flex flex-row flex-wrap justify-center mb3">
                    <Stack
                        direction="column"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={1}
                    >
                        <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal(this_column.id);
                            }}
                        >
                            Criar card
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                                e.preventDefault();
                                addNewSubColumn(this_column.id);
                            }}
                        >
                            Criar sub-coluna
                        </Button>
                    </Stack>
                </div>
                <div className="w-100">
                    {hasSubColumns(this_column.groups) && (
                        <div className="flex">
                            {this_column.groups?.map((current_group) => (
                                <header className="flex justify-center w-50">
                                    <h3 className="">
                                        {current_group.name}
                                    </h3>
                                </header>
                            ))}
                        </div>
                    )}
                </div>
            </div>

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
