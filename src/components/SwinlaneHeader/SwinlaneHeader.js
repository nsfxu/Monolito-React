import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';

import { hasSubColumns } from '../../utils/column-utils';

import Card from '../Card';
import SubColumnSwinlane from '../SubColumnSwinlane/SubColumnSwinlane';
import ColumnHeader from '../ColumnHeader/ColumnHeader';

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
    const renderColumn = (swinlane, this_column, swinlane_id) => {
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
                        backgroundColor: '#1e272e'
                    }}
                >
                    <ColumnHeader this_column={this_column} openModal={openModal} addNewSubColumn={addNewSubColumn} />

                    <div>
                        {hasSubColumns(this_column.groups) ? (
                            <SubColumnSwinlane
                                parentColumnId={this_column.id}
                                all_swinlanes={all_swinlanes}
                                all_groups={this_column.groups}
                                tagsArr={tags}
                                is_first_column={is_first_column}
                                toggleSwinlane={toggleSwinlane}
                            />
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
                                    {renderColumn(
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
