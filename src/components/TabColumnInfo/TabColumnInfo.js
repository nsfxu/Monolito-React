import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import { Box, Button, Stack, TextField } from '@mui/material';

import { findById } from '../../utils/column-utils';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnInfo = ({ selected_column, board_columns }) => {
    const [current_column, setCurrentColumn] = useState(undefined);

    let has_unsaved_data = false;

    useEffect(async () => {
        await setCurrentColumn(undefined);
        setCurrentColumn(findById(board_columns, selected_column));

        console.log(current_column);
    }, [selected_column]);

    return (
        <>
            {current_column && (
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete="off"
                    className="flex flex-column"
                >
                    <p>{current_column.name}</p>
                    <TextField
                        label="Nome da coluna"
                        defaultValue={current_column.name}
                    />

                    <Stack direction="row" spacing={2} className="pl2">
                        <Button
                            variant="contained"
                            color="success"
                            disabled={has_unsaved_data}
                        >
                            Salvar
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            disabled={has_unsaved_data}
                        >
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            )}
        </>
    );
};

TabColumnInfo.propTypes = {
    selected_column: propTypes.string,
    board_columns: propTypes.array
};

export default TabColumnInfo;
