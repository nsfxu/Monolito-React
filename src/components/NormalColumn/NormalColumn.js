import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';

import { Grid } from '@mui/material';

import { hasSubColumns } from '../../utils/column-utils';

import SubColumn from '../SubColumn';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import CardColumnList from '../CardColumnList';

/* eslint-disable */
// eslint-disable-next-line
const NormalColumn = ({ this_column, tags }) => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{
                backgroundColor: '#1e272e'
            }}
        >
            <Grid item className="w-100 br">
                <ColumnHeader this_column={this_column} />
            </Grid>

            <Grid item className="h-100 br">
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
            </Grid>
        </Grid>
    );
};

NormalColumn.propTypes = {
    this_column: propTypes.any,
    tags: propTypes.array
};

export default NormalColumn;
