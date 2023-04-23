import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import {
    findById,
    hasSubColumns,
    validateIfArrAreEqual
} from '../../utils/column-utils';

import TabColumnItem from '../TabColumnItem/TabColumnItem';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnInfo = ({ selected_column, board_columns }) => {
    const [current_column, setCurrentColumn] = useState(undefined);
    const [has_subcolumn, setHasSubcolumn] = useState(false);

    const [current_subcolumn, setCurrentSubColumn] = useState(undefined);
    const [selected_subcolumn, setSelectedSubColumn] = useState(false);
    const [temp_subcolumns, setTempSubColumns] = useState([]);

    const [has_unsaved_data, setHasUnsavedData] = useState(true);

    const grid = 8;

    const name = useRef();
    const subcolumn_name = useRef();

    useEffect(async () => {
        await setCurrentColumn(undefined);
        await setTempSubColumns([]);

        updateHasUnsavedData();

        setCurrentColumn(findById(board_columns, selected_column));
    }, [selected_column]);

    useEffect(async () => {
        if (!selected_subcolumn) {
            return;
        }

        await setCurrentSubColumn(undefined);

        setCurrentSubColumn(
            findById(current_column.groups, selected_subcolumn)
        );
    }, [selected_subcolumn]);

    useEffect(() => {
        if (!current_column) {
            return;
        }
        setHasSubcolumn(hasSubColumns(current_column.groups));
    }, [current_column]);

    useEffect(async () => {
        if (!has_subcolumn) {
            return;
        }

        await setTempSubColumns(current_column.groups);
    }, [has_subcolumn]);

    useEffect(async () => {
        if (!temp_subcolumns && temp_subcolumns.length < 2) {
            return;
        }

        updateHasUnsavedData();
    }, [temp_subcolumns]);

    const saveColumnInfo = async () => {
        const this_name = name.current.value;
        const this_subcolumn_name = subcolumn_name.current.value;

        current_column.name =
            this_name && this_name != current_column.name
                ? this_name
                : current_column.name;

        current_subcolumn.name =
            this_subcolumn_name && this_subcolumn_name != current_subcolumn.name
                ? this_subcolumn_name
                : current_subcolumn.name;

        current_column.groups = temp_subcolumns
            ? temp_subcolumns
            : current_column.groups;

        await setCurrentColumn(findById(board_columns, selected_column));
        await updateHasUnsavedData();
    };

    const updateHasUnsavedData = async () => {
        if (has_subcolumn) {
            const current_selected_column_groups = findById(
                board_columns,
                selected_column
            ).groups;

            if (
                !validateIfArrAreEqual(
                    current_selected_column_groups,
                    temp_subcolumns
                )
            ) {
                await setHasUnsavedData(false);
                return;
            }
        }

        if (name.current && name.current.value != current_column.name) {
            await setHasUnsavedData(false);

            return;
        }

        if (
            subcolumn_name.current &&
            subcolumn_name.current.value != current_subcolumn.name
        ) {
            await setHasUnsavedData(false);

            return;
        }

        await setHasUnsavedData(true);
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

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            temp_subcolumns,
            result.source.index,
            result.destination.index
        );

        setTempSubColumns(items);
    };

    return (
        <>
            {current_column && (
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete="off"
                    className="flex flex-column"
                >
                    <TextField
                        label="Nome da coluna"
                        defaultValue={current_column.name}
                        inputRef={name}
                        onKeyUp={() => updateHasUnsavedData()}
                    />

                    <div className="flex flex-column">
                        <div>
                            <Typography variant="h6" className="pl2">
                                Subcolunas
                            </Typography>
                        </div>
                        {has_subcolumn && temp_subcolumns && (
                            <div className="pl2">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable
                                        droppableId="subcolumnDroppable"
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
                                                {temp_subcolumns.map(
                                                    (group, index) => (
                                                        <TabColumnItem
                                                            column={group}
                                                            index={index}
                                                            key={index}
                                                            getItemStyle={
                                                                getItemStyle
                                                            }
                                                            setSelectedColumn={
                                                                setSelectedSubColumn
                                                            }
                                                        />
                                                    )
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        )}

                        {has_subcolumn && current_subcolumn && (
                            <div>
                                <hr></hr>
                                {console.log(current_subcolumn)}
                                <TextField
                                    label="Nome da subcoluna"
                                    defaultValue={current_subcolumn.name}
                                    inputRef={subcolumn_name}
                                    onKeyUp={() => updateHasUnsavedData()}
                                />
                            </div>
                        )}
                    </div>

                    <Stack direction="row" spacing={2} className="pl2 pt3 pb3">
                        <Button
                            variant="contained"
                            color="success"
                            disabled={has_unsaved_data}
                            onClick={() => saveColumnInfo()}
                        >
                            Salvar
                        </Button>

                        <Button variant="outlined" color="error">
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            )}
        </>
    );
};

TabColumnInfo.propTypes = {
    selected_column: propTypes.string,
    board_columns: propTypes.array
};

export default TabColumnInfo;
