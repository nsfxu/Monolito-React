import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Button, Stack } from '@mui/material';

import TabColumnInfo from '../TabColumnInfo';
import TabColumnItem from '../TabColumnItem/TabColumnItem';
import TabSwinlaneGroup from '../TabSwinlaneGroup/TabSwinlaneGroup';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnConfig = ({ board_columns, board_swinlanes }) => {
    const [temp_columns, setTempColumns] = useState(board_columns);
    const [temp_swinlanes, setTempSwinlanes] = useState(board_swinlanes);
    const [swinlane_columns, setSwinlaneColumns] = useState([]);

    const [selected_column, setSelectedColumn] = useState(false);

    const grid = 8;

    useEffect(() => {
        separateColumns();
    }, [board_columns]);

    const separateColumns = () => {
        const temp_swinlane_columns = [];

        if (board_columns.length > 0) {
            board_columns.map((column) => {
                column.showSwinLanes && temp_swinlane_columns.push(column);
            });
        }

        setTempColumns(createNewTempColumn());
        setSwinlaneColumns(temp_swinlane_columns);
    };

    const createNewTempColumn = () => {
        let new_temp_column = [];
        let hasAlreadySelected = false;

        temp_columns.map((column, index) => {
            if (column.showSwinLanes) {
                if (!hasAlreadySelected) {
                    new_temp_column.push('swinlane_group');
                    hasAlreadySelected = true;
                }
            } else {
                new_temp_column.push(column);
            }
        });

        return new_temp_column;
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        console.log(result);
        if (!result.destination) {
            return;
        }

        const items = reorder(
            temp_columns,
            result.source.index,
            result.destination.index
        );

        console.log(temp_columns);

        setTempColumns(items);
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        display: 'flex',
        padding: grid,
        overflow: 'auto'
    });

    return (
        <>
            <div className="flex flex-column pa2">
                <div className="self-start pb3">
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained">Criar grupo de raia</Button>
                        <Button variant="contained">Criar coluna</Button>
                    </Stack>
                </div>

                <div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable
                            droppableId="columnConfigTab"
                            direction="horizontal"
                        >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                    {...provided.droppableProps}
                                >
                                    {temp_columns &&
                                        temp_columns.map((column, index) => (
                                            <React.Fragment key={index}>
                                                {column == 'swinlane_group' ? (
                                                    <>
                                                        <TabSwinlaneGroup
                                                            all_columns={
                                                                swinlane_columns
                                                            }
                                                            index={index}
                                                            provided={provided}
                                                            snapshot={snapshot}
                                                        />
                                                    </>
                                                ) : (
                                                    <TabColumnItem
                                                        column={column}
                                                        index={index}
                                                        provided={provided}
                                                        snapshot={snapshot}
                                                        getItemStyle={
                                                            getItemStyle
                                                        }
                                                        setSelectedColumn={
                                                            setSelectedColumn
                                                        }
                                                    />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>

            <hr></hr>
            {selected_column ? (
                <TabColumnInfo
                    selected_column={selected_column}
                    board_columns={board_columns}
                />
            ) : (
                'Clique em um item para editar suas propriedades.'
            )}
        </>
    );
};

TabColumnConfig.propTypes = {
    board_columns: propTypes.array,
    board_swinlanes: propTypes.array
};

export default TabColumnConfig;
