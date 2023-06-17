import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SketchPicker } from 'react-color';

import propTypes from 'prop-types';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { findById } from '../../utils/column-utils';

/* eslint-disable */
// eslint-disable-next-line
const TabSwinlaneInfo = ({
    selected_swinlane,
    board_swinlanes,
    deleteThisSwinlane
}) => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [current_swinlane, setCurrentSwinlane] = useState(undefined);
    const [has_unsaved_data, setHasUnsavedData] = useState(true);
    const [state, setState] = useState(null);
    const name = useRef();

    useEffect(() => {
        if (state) {
            return;
        }

        const temp_state = {
            displayColorPicker: false,
            color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1'
            }
        };

        setState(temp_state);
    }, [state]);

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

    const deleteCurrentSwinlane = () => {
        deleteThisSwinlane(board_swinlanes.indexOf(current_swinlane));
    };

    const handleClick = () => {
        const temp_state = { ...state };

        temp_state.displayColorPicker = !state.displayColorPicker;

        setState(temp_state);
    };

    const handleClose = () => {
        const temp_state = { ...state };

        temp_state.displayColorPicker = false;

        setState(temp_state);
    };

    const handleChange = (color) => {
        const temp_state = { ...state };

        temp_state.color = color.rgb;

        console.log(temp_state.color);

        setState(temp_state);
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

    const styles = {
        color: {
            width: '350px',
            height: '35px',
            borderRadius: '2px',
            background: state
                ? `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`
                : '0, 0, 0, 255'
        },
        swatch: {
            marginLeft: '20px',
            // padding: '3px',
            ackground: state
                ? `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`
                : '0, 0, 0, 255',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer'
        },
        popover: {
            position: 'absolute',
            zIndex: '2'
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
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
                        <div className="flex flex-row justify-start align-center pt3 pl2 pb3">
                            <Typography variant="h6">Cor da raia</Typography>
                            <div>
                                <div
                                    style={styles.swatch}
                                    onClick={handleClick}
                                >
                                    <div
                                        style={styles.color}
                                        className="flex justify-center items-center h-100"
                                    >
                                        <Typography variant="body1">
                                            {current_swinlane.name}
                                        </Typography>
                                    </div>
                                </div>
                                {state.displayColorPicker ? (
                                    <div style={styles.popover}>
                                        <div
                                            style={styles.cover}
                                            onClick={handleClose}
                                        />
                                        <SketchPicker
                                            color={state.color}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>

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
                                    deleteCurrentSwinlane();
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
