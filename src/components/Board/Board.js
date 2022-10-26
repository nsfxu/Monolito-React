import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from '../Column/Column';

/* eslint-disable */
// eslint-disable-next-line
const Board = () => {
    const title = 'Board';

    const data = {
        columns: [
            {
                name: 'To-Do',
                data: [
                    { id: 1, name: 'Monolith' },
                    { id: 2, name: 'Merc' }
                ]
            },
            {
                name: 'Doing',
                data: [
                    { id: 4, name: 'Loner' },
                    { id: 3, name: 'Bandit' }
                ]
            },
            {
                name: 'Done',
                data: [{ id: 5, name: 'Ecolog' }]
            }
        ]
    };

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

        const removed_item = column_to_delete.data.splice(source_pos_id, 1);

        const column_to_add = items.columns.find(
            (column) => column.name === destination_column_name
        );

        column_to_add.data.splice(destination_pos_id, 0, removed_item[0]);

        updateBoardInfo(items);
    };

    return (
        <div className="ba bw w-100 pr4" style={{ backgroundColor: 'red' }}>
            <h1>{title}</h1>
            <div className="flex flex-row w-75">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    {board_info.columns.map((column, index) => (
                        <Column
                            title={column.name}
                            data={column.data}
                            key={index}
                            handleOnDragEnd={handleOnDragEnd}
                        />
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};

Board.propTypes = {};

export default Board;
