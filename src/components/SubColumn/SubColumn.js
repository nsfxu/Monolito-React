import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import CardColumnList from '../CardColumnList';

/* eslint-disable */
// eslint-disable-next-line
const SubColumn = ({
    parentColumnId,
    groupId,
    title,
    data,
    tagsArr,
    swinlanes,
    status,
    participants,
    getInfoByBoardId
}) => {
    return (
        <div className="w-100 h-100 flex flex-column items-start justify-center ma3">
            <header className="self-center">
                <h3 className="ma0 pa0">{title}</h3>
            </header>
            <section className="w-100 h-100">
                {data && (
                    <Droppable droppableId={`${parentColumnId};${groupId}`}>
                        {(provided) => (
                            <CardColumnList
                                cards={data}
                                tagsArr={tagsArr}
                                swinlanes={swinlanes}
                                status={status}
                                participants={participants}
                                provided={provided}
                                swinlane={{
                                    is_swinlane: false,
                                    id: null
                                }}
                                getInfoByBoardId={getInfoByBoardId}
                            />
                        )}
                    </Droppable>
                )}
            </section>
        </div>
    );
};

SubColumn.propTypes = {
    parentColumnId: propTypes.number,
    groupId: propTypes.number,
    title: propTypes.string,
    data: propTypes.any,
    tagsArr: propTypes.array
};

export default SubColumn;
