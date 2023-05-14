import React, { useState } from 'react';
import propTypes from 'prop-types';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Button, Divider, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import TabColumn from '../TabColumn';

/* eslint-disable */
// eslint-disable-next-line
const TabSwinlaneConfig = ({
    board_swinlanes,
    board_next_swinlane_id,
    returnNextColumnId
}) => {
    const [temp_swinlanes, setTempSwinlanes] = useState(board_swinlanes);

    const grid = 8;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }));

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

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            temp_swinlanes,
            result.source.index,
            result.destination.index
        );

        setTempSwinlanes(items);
    };

    return (
        <div className='flex flex-column pa2'>
            <div className='self-start pb3'>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        // onClick={() => {
                        //     openCustomModal(CREATE_COLUMN);
                        // }}
                    >
                        Criar raia
                    </Button>
                    <Button
                        variant="contained"
                        // disabled={has_unsaved_data}
                        // onClick={() => saveNewColumnOrder()}
                    >
                        Salvar ordem
                    </Button>
                </Stack>
            </div>
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="swinlaneConfigTab">
                        {(provided, snapshot) => (
                            <Stack
                                direction="column"
                                divider={
                                    <Divider
                                        orientation="horizontal"
                                        flexItem
                                    />
                                }
                                spacing={3}
                                className="list flex flex-column w-100 pl3 pr4 pa3"
                                style={{ backgroundColor: 'lightgray' }}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {temp_swinlanes &&
                                    temp_swinlanes.map((swinlane, index) => (
                                        <Draggable
                                            key={swinlane.id}
                                            draggableId={`${swinlane.id}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <Item
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps
                                                            .style
                                                    )}
                                                    // onClick={() => {
                                                    //     setSelectedColumn(
                                                    //         `${column.id}`
                                                    //     );
                                                    // }}
                                                >
                                                    <TabColumn
                                                        column_info={swinlane}
                                                    />
                                                </Item>
                                            )}
                                        </Draggable>
                                    ))}
                            </Stack>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

TabSwinlaneConfig.propTypes = {
    board_swinlanes: propTypes.array,
    board_next_swinlane_id: propTypes.number,
    returnNextColumnId: propTypes.func
};

export default TabSwinlaneConfig;
