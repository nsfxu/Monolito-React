import React, { useState, useEffect } from 'react';

import propTypes from 'prop-types';

import { Button, Stack, Typography } from '@mui/material';

const titleColor = 'white';
/* eslint-disable */
// eslint-disable-next-line
const ColumnHeader = ({ this_column, openModal }) => {
    const [cardCount, setCardCount] = useState(0);

    useEffect(() => {}, [this_column]);

    console.log(this_column);
    return (
        <div
            className="bb flex flex-column justify-center items-center"
            style={{ minHeight: '13.3em' }}
        >
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <div>
                    <Typography variant="h5" sx={{ color: titleColor }}>
                        {this_column.name}
                    </Typography>
                </div>
                {this_column.showWip && (
                    <div>
                        <Typography variant="h6">
                            {cardCount}/{this_column.wip_limit}
                        </Typography>
                    </div>
                )}
                <div>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            openModal();
                        }}
                    >
                        Criar card
                    </Button>
                </div>
            </Stack>
        </div>
    );
};

ColumnHeader.propTypes = {
    this_column: propTypes.any,
    openModal: propTypes.func
};

export default ColumnHeader;
