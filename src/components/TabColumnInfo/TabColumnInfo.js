import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import { findById } from '../../utils/column-utils';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnInfo = ({ selected_column, board_columns }) => {
    const [current_column, setCurrentColumn] = useState(null);

    useEffect(() => {
        setCurrentColumn(findById(board_columns, selected_column));

        console.log(current_column);
    }, [selected_column]);

    return <>{current_column && <p>{current_column.name}</p>}</>;
};

TabColumnInfo.propTypes = {
    selected_column: propTypes.string,
    board_columns: propTypes.array
};

export default TabColumnInfo;
