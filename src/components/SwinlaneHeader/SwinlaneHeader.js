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

import { hasSubColumns } from '../../utils/column-utils';

import Card from '../Card';
// import SubColumnSwinlane from '../SubColumnSwinlane/SubColumnSwinlane';

/* eslint-disable */
// eslint-disable-next-line
const SwinlaneHeader = ({
    columns,
    all_swinlanes,
    tags,
    toggleSwinlane,
    openModal,
    addNewSubColumn
}) => {
    const renderSwinlane = (swinlane, this_column, swinlane_id) => {
        return (
            <Collapse in={swinlane.expanded} className="w-100">
                <Droppable droppableId={`${this_column.id}-${swinlane_id}`}>
                    {(provided) => (
                        <ul
                            className="flex flex-column items-center list w-100 h-auto pl3 pr3 pb3"
                            style={{
                                minWidth: '240px',
                                minHeight: '170px',
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
            </Collapse>
        );
    };

    let is_first_column = true;

    return (
        <>
            {columns.map((this_column, index) => (
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
                                    <Divider orientation="vertical" flexItem />
                                }
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
                                    {this_column.groups?.map(
                                        (current_group) => (
                                            <header className="flex justify-center w-50">
                                                <h3 className="">
                                                    {current_group.name}
                                                </h3>
                                            </header>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-100">
                        {hasSubColumns(this_column.groups) ? (
                            <div className="flex flex-row items-start justify-center">
                                {/* <SubColumnSwinlane
                                    parentColumnId={this_column.id}
                                    all_swinlanes={all_swinlanes}
                                    all_groups={this_column.groups}
                                    title={group.name}
                                    groupId={group.id}
                                    key={group.id}
                                    data={group.cards}
                                    tagsArr={tags}
                                /> */}
                                e
                            </div>
                        ) : (
                            all_swinlanes.map((swinlane, index) => (
                                <div key={index}>
                                    <ListItemButton
                                        sx={{ backgroundColor: 'cyan' }}
                                        style={{ minHeight: '3em' }}
                                        onClick={() => {
                                            toggleSwinlane(swinlane.id);
                                        }}
                                    >
                                        {is_first_column && (
                                            <ListItemText
                                                primary={swinlane.name}
                                            ></ListItemText>
                                        )}
                                    </ListItemButton>
                                    {renderSwinlane(
                                        swinlane,
                                        this_column,
                                        swinlane.id
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {is_first_column
                        ? (is_first_column = false)
                        : is_first_column}
                </div>
            ))}
        </>
    );
};

SwinlaneHeader.propTypes = {
    columns: propTypes.array,
    all_swinlanes: propTypes.array,
    tags: propTypes.array,
    toggleSwinlane: propTypes.func,
    openModal: propTypes.func,
    addNewSubColumn: propTypes.func
};

export default SwinlaneHeader;
