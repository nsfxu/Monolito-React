import React, { useState, useEffect, useRef, useCallback } from 'react';
import propTypes from 'prop-types';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { findById } from '../../utils/column-utils';

/* eslint-disable */
// eslint-disable-next-line
const TabSwinlaneInfo = ({ selected_swinlane, board_swinlanes }) => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [current_swinlane, setCurrentSwinlane] = useState(undefined);
    const [has_unsaved_data, setHasUnsavedData] = useState(true);

    const name = useRef();

    useEffect(async () => {
        await setCurrentSwinlane(undefined);

        updateHasUnsavedData();

        await setCurrentSwinlane(findById(board_swinlanes, selected_swinlane));
    }, [selected_swinlane]);

    useEffect(async () => {
        if (!current_swinlane) {
            return;
        }
        console.log(current_swinlane);
    }, [current_swinlane]);

    const saveSwinlaneInfo = async () => {
        const this_name = name.current ? name.current.value : null;

        console.log(this_name);
    };

    const updateHasUnsavedData = async () => {
        // validades if the name is the same
        if (
            name &&
            name.current &&
            name.current.value != current_swinlane.name
        ) {
            await setHasUnsavedData(false);

            return;
        }

        await setHasUnsavedData(true);
    };

    const swinlane_name_style = {
        '.MuiInputLabel-root': {
            color: 'white !important'
        },
        input: {
            color: '#F2F7F2',
            height: '50px',
            fontSize: '18px'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderStyle: 'solid',
                borderColor: 'lightgrey !important'
            },
            '&.Mui-focused fieldset': {
                borderStyle: 'solid'
                // borderColor: '#F2F7F2'
            }
        }
    };

    return (
        <>
            {current_swinlane && (
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete="off"
                    className="flex flex-column pl3 pt2 pr3"
                >
                    <section className="flex flex-column mb2">
                        <div>
                            <Typography variant="h6" className="pl2 pb2">
                                Raia selecionada
                            </Typography>
                        </div>

                        <TextField
                            label="Raia da coluna"
                            defaultValue={current_swinlane.name}
                            inputRef={name}
                            sx={swinlane_name_style}
                            onKeyUp={() => updateHasUnsavedData()}
                        />

                        <Stack
                            direction="row"
                            spacing={2}
                            className="pb2 pt2 pl2"
                        >
                            <Button
                                variant="contained"
                                color="success"
                                disabled={has_unsaved_data}
                                onClick={() => saveSwinlaneInfo()}
                            >
                                Salvar raia
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                className="w-20"
                                onClick={() => {
                                    console.log('implementar');
                                }}
                            >
                                Remover raia
                            </Button>
                        </Stack>
                    </section>
                </Box>
            )}
        </>
    );
};

TabSwinlaneInfo.propTypes = {
    selected_swinlanes: propTypes.string,
    board_swinlanes: propTypes.array
    // deleteSwinlane: propTypes.func
};

export default TabSwinlaneInfo;
