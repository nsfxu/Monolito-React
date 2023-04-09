import React from 'react';
import propTypes from 'prop-types';

/* eslint-disable */
// eslint-disable-next-line
const TabColumn = ({ column_info }) => {
    return (
        <>
            <header>{column_info.name}</header>
        </>
    );
};

TabColumn.propTypes = {
    column_info: propTypes.object
};

export default TabColumn;
