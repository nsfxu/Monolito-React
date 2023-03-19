import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';
import {
    Stack,
    Button,
    Divider,
    Collapse,
    ListItemButton,
    ListItemText
} from '@mui/material';

import Card from '../Card';

/* eslint-disable */
// eslint-disable-next-line
const SwinlaneHeader = ({ columns, all_swinlanes, tags, toggleSwinlane }) => {
    const renderSwinlane = (this_column, swinlane_id) => {
        return (
            <Droppable droppableId={`${this_column.id}-${swinlane_id}`}>
                {(provided) => (
                    <ul
                        className="flex flex-column items-center list w-100 h-auto pl3 pr3"
                        style={{
                            minWidth: '240px',
                            backgroundColor: 'red'
                        }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {this_column.groups[0].cards.map((card, index) => {
                            if (card.laneId == swinlane_id)
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
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        );
    };

    return (
        <>
            {columns.map((this_column, index) => (
                <>
                    <div
                        key={index}
                        className="ba w-100"
                        style={{
                            backgroundColor: '#1e272e',
                            minWidth: '240px'
                        }}
                    >
                        <div className="bb flex flex-column justify-center items-center">
                            <h3>{this_column.name}</h3>
                            <div className="w-100 h-100 flex flex-row flex-wrap justify-center mb3">
                                <Stack
                                    direction="column"
                                    divider={
                                        <Divider
                                            orientation="vertical"
                                            flexItem
                                        />
                                    }
                                    spacing={1}
                                >
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // openModal(this_column.id);
                                        }}
                                    >
                                        Criar card
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // addNewSubColumn(this_column.id);
                                        }}
                                    >
                                        Criar sub-coluna
                                    </Button>
                                </Stack>
                            </div>
                        </div>

                        <div className="h-100">
                            {all_swinlanes.map((swinlane, index) => (
                                <>
                                    <ListItemButton
                                        key={index}
                                        sx={{ backgroundColor: 'cyan' }}
                                        onClick={() => {
                                            toggleSwinlane(swinlane.id);
                                        }}
                                    >
                                        <ListItemText
                                            primary={swinlane.name}
                                        ></ListItemText>
                                    </ListItemButton>
                                    <Collapse in={swinlane.expanded}>
                                        {renderSwinlane(
                                            this_column,
                                            swinlane.id
                                        )}
                                    </Collapse>
                                </>
                            ))}
                        </div>
                    </div>
                </>
            ))}
        </>
    );
};

SwinlaneHeader.propTypes = {
    columns: propTypes.array,
    all_swinlanes: propTypes.array,
    tags: propTypes.array,
    toggleSwinlane: propTypes.func
};

export default SwinlaneHeader;
