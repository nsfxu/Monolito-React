import React from 'react';

// import { Droppable, Draggable } from 'react-beautiful-dnd';

import propTypes from 'prop-types';
import { ListItemButton, ListItemText } from '@mui/material';

// import Card from '../Card';

/* eslint-disable */
// eslint-disable-next-line
const SubColumnSwinlane = ({
    parentColumnId,
    all_swinlanes,
    all_groups,
    tagsArr,
    is_first_column,
    toggleSwinlane
}) => {

    return all_swinlanes.map((swinlane, index) => (
        <div key={index}>
            <ListItemButton
                sx={{ backgroundColor: 'cyan' }}
                style={{ minHeight: '3em' }}
                onClick={() => {
                    toggleSwinlane(swinlane.id);
                }}
            >
                {is_first_column && (
                    <ListItemText primary={swinlane.name}></ListItemText>
                )}
            </ListItemButton>
        </div>
    ));
};

SubColumnSwinlane.propTypes = {
    parentColumnId: propTypes.number,
    all_swinlanes: propTypes.any,
    title: propTypes.string,
    tagsArr: propTypes.array,
    is_first_column: propTypes.bool,
    toggleSwinlane: propTypes.func
};

export default SubColumnSwinlane;
