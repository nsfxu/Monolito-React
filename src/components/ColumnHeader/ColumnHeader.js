import React from 'react';

import propTypes from 'prop-types';

import { Button } from '@mui/material';

/* eslint-disable */
// eslint-disable-next-line
const ColumnHeader = ({ this_column, openModal }) => {
    return (
        <div
            className="bb flex flex-column justify-center items-center"
            style={{ minHeight: '13.3em' }}
        >
            <div>
                <h3>{this_column.name}</h3>
            </div>
            <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                    e.preventDefault();
                    openModal(this_column);
                }}
            >
                Criar card
            </Button>
        </div>
    );
};

ColumnHeader.propTypes = {
    this_column: propTypes.any,
    openModal: propTypes.func
};

export default ColumnHeader;
