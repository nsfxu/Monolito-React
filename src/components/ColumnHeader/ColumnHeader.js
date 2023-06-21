import React, { useState, useEffect } from 'react';
/* eslint-disable */
// eslint-disable-next-line
import propTypes from 'prop-types';

import { Button, Stack, Typography } from '@mui/material';

const titleColor = 'white';
const normalWip = 'white';
const warningWip = 'yellow';
const dangerWip = 'red';

const ColumnHeader = ({ this_column, openModal }) => {
    const [cardCount, setCardCount] = useState(0);
    const [wipColor, setWipColor] = useState(normalWip);

    useEffect(async () => {
        if (!this_column.showWip) {
            return;
        }

        let count = 0;

        if (this_column.groups.length > 0) {
            this_column.groups.map((groups) => (count += groups.cards.length));
        }

        await setCardCount(count);
    }, [this_column]);

    useEffect(async () => {
        if (!this_column.showWip) {
            return;
        }
        const result = this_column.wip_limit - cardCount;

        if (result <= 0) {
            await setWipColor(dangerWip);
        } else if (result > 0 && result <= 2) {
            await setWipColor(warningWip);
        } else {
            await setWipColor(normalWip);
        }
    }, [cardCount]);

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
                        <Typography variant="h6" sx={{ color: wipColor }}>
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
