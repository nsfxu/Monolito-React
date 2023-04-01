import React from 'react';

import propTypes from 'prop-types';

import { Stack, Button, Divider } from '@mui/material';

/* eslint-disable */
// eslint-disable-next-line
const ColumnHeader = ({ this_column, openModal, addNewSubColumn }) => {
    return (
        <div
            className="bb flex flex-column justify-center items-center"
            style={{ minHeight: '13.3em' }}
        >
            <div>
                <h3>{this_column.name}</h3>
            </div>
            <div className="w-100 h-100 flex flex-row flex-wrap justify-center mb3">
                <Stack
                    direction="column"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                >
                    <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            openModal(this_column.id);
                        }}
                    >
                        Criar card
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            addNewSubColumn(this_column.id);
                        }}
                    >
                        Criar sub-coluna
                    </Button>
                </Stack>
            </div>
        </div>
    );
};

ColumnHeader.propTypes = {
    this_column: propTypes.any,
    openModal: propTypes.func,
    addNewSubColumn: propTypes.func
};

export default ColumnHeader;
