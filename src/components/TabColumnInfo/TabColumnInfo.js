import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';

import { Box, Button, Stack, TextField } from '@mui/material';

import { findById } from '../../utils/column-utils';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnInfo = ({ selected_column, board_columns }) => {
    const [current_column, setCurrentColumn] = useState(undefined);
    const [has_unsaved_data, setHasUnsavedData] = useState(true);

    const name = useRef();

    useEffect(async () => {
        await setCurrentColumn(undefined);
        setCurrentColumn(findById(board_columns, selected_column));
    }, [selected_column]);

    const saveColumnInfo = () => {
        const this_name = name.current.value;

        current_column.name =
            this_name && this_name != current_column.name
                ? this_name
                : current_column.name;
    };

    const updateHasUnsavedData = async () => {
        if (name.current.value != current_column.name) {
            await setHasUnsavedData(false);

            return;
        }

        await setHasUnsavedData(true);
    };

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
                    <TextField
                        label="Nome da coluna"
                        defaultValue={current_column.name}
                        inputRef={name}
                        onKeyUp={() => updateHasUnsavedData()}
                    />

                    <Stack direction="row" spacing={2} className="pl2">
                        <Button
                            variant="contained"
                            color="success"
                            disabled={has_unsaved_data}
                            onClick={() => saveColumnInfo()}
                        >
                            Salvar
                        </Button>

                        <Button variant="outlined" color="error">
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