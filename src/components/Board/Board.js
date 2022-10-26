import React, { useState, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from '../Column/Column';

/* eslint-disable */
// eslint-disable-next-line
const Board = () => {
    const data = {
        columns: [
            {
                name: 'To-Do',
                count: 2,
                data: [
                    {
                        id: 1,
                        name: 'Monolith',
                        description: 'description lorem ipsum dolor asi amet',
                        tags: [{ id: 1, text: 'Tester' }]
                    },
                    {
                        id: 2,
                        name: 'Merc',
                        description: '123',
                        tags: [{ id: 1, text: 'Oi' }]
                    }
                ]
            },
            {
                name: 'Doing',
                count: 2,
                data: [
                    {
                        id: 4,
                        name: 'Loner',
                        description: '',
                        tags: []
                    },
                    {
                        id: 3,
                        name: 'Bandit',
                        description: '',
                        tags: [{ id: 1, text: 'Tester' }]
                    }
                ]
            },
            {
                name: 'Done',
                count: 1,
                data: [{ id: 5, name: 'Ecolog', description: '', tags: [] }]
            }
        ],
        next_id: 6
    };

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [board_info, updateBoardInfo] = useState(data);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = board_info;
        const source_column_name = result.source.droppableId;
        const destination_column_name = result.destination.droppableId;
        const source_pos_id = result.source.index;
        const destination_pos_id = result.destination.index;

        const column_to_delete = items.columns.find(
            (column) => column.name === source_column_name
        );

        column_to_delete.count--;
        const removed_item = column_to_delete.data.splice(source_pos_id, 1);

        const column_to_add = items.columns.find(
            (column) => column.name === destination_column_name
        );

        column_to_add.count++;
        column_to_add.data.splice(destination_pos_id, 0, removed_item[0]);

        updateBoardInfo(items);
    };

    const addNewCard = (
        columnName,
        title,
        description,
        person,
        status,
        tags
    ) => {
        const items = board_info;
        const column_to_add = items.columns.find(
            (column) => column.name === columnName
        );

        column_to_add.count++;
        column_to_add.data.push({ id: items.next_id, name: title, description: description });
        items.next_id++;

        forceUpdate();
        updateBoardInfo(items);
    };

    return (
        <div className="ba bw w-100 pr4" style={{ backgroundColor: 'red' }}>
            <h1>Board</h1>
            {board_info && (
                <div className="flex flex-row w-75">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        {board_info.columns.map((column, index) => (
                            <Column
                                title={column.name}
                                data={column.data}
                                key={index}
                                addNewCard={addNewCard}
                            />
                        ))}
                    </DragDropContext>
                </div>
            )}
        </div>
    );
};

Board.propTypes = {};

export default Board;
