import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import { hasSubColumns } from '../../utils/column-utils';

import SubColumn from '../SubColumn';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import CardColumnList from '../CardColumnList';

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
            <ColumnHeader
                this_column={this_column}
                openModal={openModal}
                addNewSubColumn={addNewSubColumn}
            />

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
                            <CardColumnList
                                cards={this_column.groups[0].cards}
                                tagsArr={tags}
                                provided={provided}
                                swinlane={{
                                    is_swinlane: false,
                                    id: null
                                }}
                            />
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
