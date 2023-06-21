import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';

import { hasSubColumns } from '../../utils/column-utils';

import Card from '../Card';
import SubColumnSwinlane from '../SubColumnSwinlane/SubColumnSwinlane';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import CardColumnList from '../CardColumnList';

/* eslint-disable */
// eslint-disable-next-line
const SwinlaneHeader = ({
    toast,
    current_user_permission,
    columns,
    all_swinlanes,
    tags,
    swinlanes,
    status,
    participants,
    toggleSwinlane,
    openModal,
    getInfoByBoardId
}) => {
    const renderDroppable = (this_column, swinlane_id, swinlane_expanded) => {
        if (swinlane_expanded) {
            return (
                <Droppable droppableId={`${this_column.id}-${swinlane_id}`}>
                    {(provided) => (
                        <CardColumnList
                            toast={toast}
                            current_user_permission={current_user_permission}
                            cards={this_column.groups[0].cards}
                            tagsArr={tags}
                            swinlanes={swinlanes}
                            status={status}
                            participants={participants}
                            provided={provided}
                            swinlane={{
                                is_swinlane: true,
                                id: swinlane_id
                            }}
                            getInfoByBoardId={getInfoByBoardId}
                        />
                    )}
                </Droppable>
            );
        }

        return (
            <ul
                className="flex flex-column items-center list w-100 h-auto pl3 pr3 pb3"
                style={{
                    minWidth: '240px',
                    minHeight: '170px'
                }}
            >
                {this_column.groups[0].cards.map((card, index) => {
                    if (card.laneId == swinlane_id)
                        return (
                            <li className="bw1 mt3" key={index}>
                                <Card
                                    toast={toast}
                                    current_user_permission={
                                        current_user_permission
                                    }
                                    object={card}
                                    tagsArr={tags}
                                    swinlanes={swinlanes}
                                    status={status}
                                    participants={participants}
                                    getInfoByBoardId={getInfoByBoardId}
                                />
                            </li>
                        );
                })}
            </ul>
        );
    };

    const renderColumn = (swinlane, this_column, swinlane_id) => {
        return (
            <Collapse in={swinlane.expanded} className="w-100">
                {renderDroppable(this_column, swinlane_id, swinlane.expanded)}
            </Collapse>
        );
    };

    let is_first_column = true;

    return (
        <div className="flex">
            {columns.map((this_column, index) => (
                <div
                    key={index}
                    className="ba w-100"
                    style={{
                        backgroundColor: '#1e272e'
                    }}
                >
                    <ColumnHeader
                        this_column={this_column}
                        openModal={openModal}
                    />

                    <div>
                        {hasSubColumns(this_column.groups) ? (
                            <SubColumnSwinlane
                                toast={toast}
                                current_user_permission={
                                    current_user_permission
                                }
                                parentColumnId={this_column.id}
                                all_swinlanes={all_swinlanes}
                                all_groups={this_column.groups}
                                tagsArr={tags}
                                swinlanes={swinlanes}
                                status={status}
                                participants={participants}
                                is_first_column={is_first_column}
                                toggleSwinlane={toggleSwinlane}
                                getInfoByBoardId={getInfoByBoardId}
                            />
                        ) : (
                            all_swinlanes.map((swinlane, index) => (
                                <div key={index}>
                                    <ListItemButton
                                        sx={{
                                            backgroundColor: swinlane.style
                                                ? JSON.parse(swinlane.style)
                                                      .color
                                                : '#565B61'
                                        }}
                                        style={{ minHeight: '3em' }}
                                        onClick={() => {
                                            toggleSwinlane(swinlane.id);
                                        }}
                                    >
                                        {is_first_column && (
                                            <ListItemText
                                                color={
                                                    swinlane.style
                                                        ? JSON.parse(
                                                              swinlane.style
                                                          ).textColor
                                                        : 'white'
                                                }
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
        </div>
    );
};

SwinlaneHeader.propTypes = {
    columns: propTypes.array,
    all_swinlanes: propTypes.array,
    tags: propTypes.array,
    participants: propTypes.array,
    toggleSwinlane: propTypes.func,
    openModal: propTypes.func,
    addNewSubColumn: propTypes.func
};

export default SwinlaneHeader;
