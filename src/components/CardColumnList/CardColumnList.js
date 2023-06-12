import React from 'react';
import propTypes from 'prop-types';

import { Draggable } from 'react-beautiful-dnd';

import Card from '../Card';

/* eslint-disable */
// eslint-disable-next-line
const CardColumnList = ({
    cards,
    tagsArr,
    swinlanes,
    status,
    participants,
    provided,
    swinlane,
    getInfoByBoardId
}) => {
    const renderDraggableCards = (card, index) => {
        return (
            <Draggable key={card.id} draggableId={`${card.id}`} index={index}>
                {(provided) => (
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bw1 mt3"
                    >
                        <Card
                            object={card}
                            tagsArr={tagsArr}
                            swinlanes={swinlanes}
                            status={status}
                            participants={participants}
                            getInfoByBoardId={getInfoByBoardId}
                        />
                    </li>
                )}
            </Draggable>
        );
    };

    return (
        <ul
            className="list pl1 pr1 pb2 w-100 h-auto flex flex-column items-start"
            style={{
                minWidth: '240px',
                minHeight: '10em',
                backgroundColor: 'red'
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
        >
            {cards?.map((card, index) => {
                if (swinlane.is_swinlane == false)
                    return renderDraggableCards(card, index);

                if (swinlane.is_swinlane && card.laneId == swinlane.id)
                    return renderDraggableCards(card, index);
            })}
            {provided.placeholder}
        </ul>
    );
};

CardColumnList.propTypes = {
    cards: propTypes.array,
    tagsArr: propTypes.array,
    swinlanes: propTypes.array,
    status: propTypes.array,
    participants: propTypes.array,
    provided: propTypes.any,
    swinlane_id: propTypes.any
};

export default CardColumnList;
