import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SketchPicker } from 'react-color';
/* eslint-disable */
// eslint-disable-next-line
import propTypes from 'prop-types';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { findById } from '../../utils/column-utils';
import { updateSwinlane } from '../../services/swinlane-service';

const TabSwinlaneInfo = ({
    selected_swinlane,
    board_swinlanes,
    deleteThisSwinlane
}) => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [current_swinlane, setCurrentSwinlane] = useState(undefined);
    const [has_unsaved_data, setHasUnsavedData] = useState(true);

    const name = useRef();
    const [state, setState] = useState({
        displayColorPicker: false,
        displayTextColorPicker: false,
        color: '#565B61',
        textColor: 'white'
    });

    useEffect(async () => {
        await setCurrentSwinlane(undefined);

        updateHasUnsavedData();

        await setCurrentSwinlane(findById(board_swinlanes, selected_swinlane));
    }, [selected_swinlane]);

    useEffect(async () => {
        if (!current_swinlane) {
            return;
        }
        const temp_state = { ...state };
        let swinlane_color = '#565B61';

        if (current_swinlane.style) {
            swinlane_color = JSON.parse(current_swinlane.style).color;
        }

        temp_state.color = swinlane_color;
        setState(temp_state);

        console.log(current_swinlane);
    }, [current_swinlane]);

    const saveSwinlaneInfo = async () => {
        const this_name = name.current ? name.current.value : null;
        const this_color = state.color ? state.color : '#565B61';
        const this_textColor = state.textColor ? state.textColor : 'white';

        const style_json = { color: this_color, textColor: this_textColor };

        const response = await updateSwinlane(
            selected_swinlane,
            this_name,
            style_json
        );
        // const response = (selected_swinlane, this_name, style_json);

        console.log(response);
    };

    const updateHasUnsavedData = async () => {
        const current_color = current_swinlane.style
            ? JSON.parse(current_swinlane.style).color
            : '#565B61';

        // validades if the name is the same
        if (
            name &&
            name.current &&
            name.current.value != current_swinlane.name
        ) {
            await setHasUnsavedData(false);

            return;
        }

        // validates if the color its the same
        if (state.color != current_color) {
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

        temp_state.color = color.hex;

        setState(temp_state);
        updateHasUnsavedData();
    };

    const handleTextClick = () => {
        const temp_state = { ...state };

        temp_state.displayTextColorPicker = !state.displayTextColorPicker;

        setState(temp_state);
    };

    const handleTextClose = () => {
        const temp_state = { ...state };

        temp_state.displayTextColorPicker = false;

        setState(temp_state);
    };

    const handleTextChange = (color) => {
        const temp_state = { ...state };

        temp_state.textColor = color.hex;

        setState(temp_state);
        updateHasUnsavedData();
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
        textColor: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: state ? `${state.textColor}` : '#white'
        },
        textSwatch: {
            marginTop: '5px',
            marginLeft: '20px',
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer'
        },
        color: {
            width: '350px',
            height: '35px',
            borderRadius: '2px',
            background: state ? `${state.color}` : '#33A599'
        },
        swatch: {
            marginLeft: '20px',
            // padding: '3px',
            background: state ? `${state.color}` : '#33A599',
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

                        {/* Cor da raia */}
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
                                        <Typography
                                            variant="body1"
                                            sx={{ color: state.textColor }}
                                        >
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

                        {/* Cor do texto raia */}
                        <div className="flex flex-row justify-start align-center pt3 pl2 pb3">
                            <Typography variant="h6">
                                Cor do texto raia
                            </Typography>
                            <div>
                                <div
                                    style={styles.textSwatch}
                                    onClick={handleTextClick}
                                >
                                    <div style={styles.textColor} />
                                </div>
                                {state.displayTextColorPicker ? (
                                    <div style={styles.popover}>
                                        <div
                                            style={styles.cover}
                                            onClick={handleTextClose}
                                        />
                                        <SketchPicker
                                            color={state.textColor}
                                            onChange={handleTextChange}
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
