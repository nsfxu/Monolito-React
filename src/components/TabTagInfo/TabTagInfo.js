import React, { useRef, useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';

import propTypes from 'prop-types';
import { TextField, Typography } from '@mui/material';

const DEFAULT_STATE = {
    displayColorPicker: false,
    displayTextColorPicker: false,
    color: '#565B61',
    textColor: 'white'
};

/* eslint-disable */
// eslint-disable-next-line
const TabTagInfo = ({ selected_tag }) => {
    const name = useRef();
    const [state, setState] = useState(DEFAULT_STATE);

    useEffect(async () => {
        if (!selected_tag) {
            return;
        }
        const temp_state = { ...state };

        let tag_color = '#565B61';
        let tag_textColor = 'white';

        if (selected_tag.style) {
            tag_color = JSON.parse(selected_tag.style).color;
            tag_textColor = JSON.parse(selected_tag.style).textColor;
        }

        temp_state.color = tag_color;
        temp_state.textColor = tag_textColor;

        setState(temp_state);

        console.log(selected_tag);
    }, [selected_tag]);

    //#region COLOR PICKER FUNCS

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
        // updateHasUnsavedData();
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
        // updateHasUnsavedData();
    };

    //#endregion

    const tag_name_style = {
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
            <section className="flex flex-column ma3">
                <div className="pl2 pb3">
                    <Typography variant="h6">Etiqueta selecionada</Typography>
                </div>

                <div>
                    <TextField
                        label="Nome da Etiqueta"
                        defaultValue={selected_tag.name}
                        inputRef={name}
                        sx={tag_name_style}
                        // onKeyUp={() => updateHasUnsavedData()}
                    />
                </div>

                {/* Cor da tag */}
                <div className="flex flex-row justify-start align-center pt3 pl2 pb3">
                    <Typography variant="h6">Cor da raia</Typography>
                    <div>
                        <div style={styles.swatch} onClick={handleClick}>
                            <div
                                style={styles.color}
                                className="flex justify-center items-center h-100"
                            >
                                <Typography
                                    variant="body1"
                                    sx={{ color: state.textColor }}
                                >
                                    {selected_tag.name}
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

                {/* Cor do texto da tag */}
                <div className="flex flex-row justify-start align-center pt1 pl2 pb3">
                    <Typography variant="h6">Cor do texto da tag</Typography>
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
            </section>
        </>
    );
};

TabTagInfo.propTypes = {
    selected_tag: propTypes.object
};

export default TabTagInfo;
