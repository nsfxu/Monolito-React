import React from 'react';

import propTypes from 'prop-types';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

import Card from '../Card';
import CardColumnList from '../CardColumnList';

/* eslint-disable */
// eslint-disable-next-line
const SubColumnSwinlane = ({
    toast,
    current_user_permission,
    parentColumnId,
    all_swinlanes,
    all_groups,
    tagsArr,
    swinlanes,
    status,
    participants,
    is_first_column,
    toggleSwinlane,
    getInfoByBoardId
}) => {
    const renderDroppable = (current_group, swinlane_id, swinlane_expanded) => {
        if (swinlane_expanded) {
            return (
                current_group.cards && (
                    <Droppable
                        droppableId={`${parentColumnId};${current_group.id}-${swinlane_id}`}
                    >
                        {(provided) => (
                            <CardColumnList
                                toast={toast}
                                current_user_permission={
                                    current_user_permission
                                }
                                cards={current_group.cards}
                                tagsArr={tagsArr}
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
                )
            );
        }
        return (
            <ul
                className="list pl1 pr1 pb2 w-100 h-auto flex flex-column items-start"
                style={{
                    minWidth: '240px',
                    minHeight: '10em',
                    backgroundColor: 'gray'
                }}
            >
                {current_group.cards.map((card, index) => {
                    if (card.laneId == swinlane_id) {
                        return (
                            <li className="bw1 mt3" key={index}>
                                <Card
                                    toast={toast}
                                    current_user_permission={
                                        current_user_permission
                                    }
                                    object={card}
                                    tagsArr={tagsArr}
                                    swinlanes={swinlanes}
                                    status={status}
                                    getInfoByBoardId={getInfoByBoardId}
                                />
                            </li>
                        );
                    }
                })}
            </ul>
        );
    };

    const renderSubColumn = (swinlane_id, swinlane_expanded) => {
        return all_groups?.map((current_group, index) => (
            <div
                className="w-100 h-auto flex flex-column items-start justify-center ma3"
                key={index}
            >
                <header className="self-center">
                    <h3 className="ma0 pa0">{current_group.name}</h3>
                </header>
                <section>
                    {renderDroppable(
                        current_group,
                        swinlane_id,
                        swinlane_expanded
                    )}
                </section>
            </div>
        ));
    };

    return all_swinlanes.map((swinlane, index) => (
        <div key={index}>
            <ListItemButton
                sx={{backgroundColor: swinlane.style
                    ? JSON.parse(swinlane.style).color
                    : '#565B61'
                    
                }}
                style={{ minHeight: '3em' }}
                className="w-100"
                onClick={() => {
                    toggleSwinlane(swinlane.id);
                }}
            >
                {is_first_column && (
                    <ListItemText
                        sx={{
                            color: swinlane.style
                                ? JSON.parse(swinlane.style).textColor
                                : '#565B61'
                        }}
                        primary={swinlane.name}
                    ></ListItemText>
                )}
            </ListItemButton>
            <Collapse in={swinlane.expanded} className="w-100">
                <div className="flex flex-row items-start justify-center">
                    {renderSubColumn(swinlane.id, swinlane.expanded)}
                </div>
            </Collapse>
        </div>
    ));
};

SubColumnSwinlane.propTypes = {
    parentColumnId: propTypes.number,
    all_swinlanes: propTypes.any,
    title: propTypes.string,
    tagsArr: propTypes.array,
    participants: propTypes.array,
    is_first_column: propTypes.bool,
    toggleSwinlane: propTypes.func
};

export default SubColumnSwinlane;
