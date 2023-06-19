import React, { useRef, useEffect } from 'react';
import propTypes from 'prop-types';

import { Stack, Typography, TextField, Button } from '@mui/material';

import {
    getBoardInformation,
    updateBoardInfo
} from '../../services/board-service';

/* eslint-disable */
// eslint-disable-next-line
const TabBoardConfig = ({ board_id }) => {
    const name = useRef();
    const description = useRef();

    useEffect(async () => {
        const temp_info = await getBoardInformation(board_id);

        if (temp_info.result) {
            const result = temp_info.result;

            name.current.value = result.name;
            description.current.value = result.description;
        }
    }, [board_id]);

    const updateThisBoardInfo = async () => {
        if (!name.current.value) {
            toast('Preencha o nome do quadro.');
            return;
        }

        const response = await updateBoardInfo(
            board_id,
            name.current.value,
            description.current.value
        );
    };

    const inputStyle = {
        input: { color: '#F2F7F2', height: '45px' },
        label: { color: 'grey', fontSize: '22px' },
        '& label.Mui-focused': {
            color: '#F0F0F0'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#F0F0F0'
        }
    };

    const multiStyle = {
        input: { color: 'red', height: '45px' },
        label: { color: 'grey', fontSize: '22px' },
        textareaStyle: { color: '#F2F7F2' },
        '& label.Mui-focused': {
            color: '#F0F0F0'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#F0F0F0'
        }
    };

    return (
        <>
            <section className="ma3 flex flex-column">
                <Typography variant="h6">Informações do quadro</Typography>
                <Stack spacing={3}>
                    {/* Name */}
                    <div>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="name"
                            label="Nome do board"
                            type="text"
                            id="name"
                            variant="standard"
                            sx={inputStyle}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputRef={name}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <TextField
                            fullWidth
                            multiline
                            margin="normal"
                            id="description"
                            label="Descrição"
                            name="description"
                            rows={10}
                            variant="standard"
                            sx={multiStyle}
                            inputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputRef={description}
                        />
                    </div>
                </Stack>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        updateThisBoardInfo();
                    }}
                >
                    Atualizar
                </Button>
            </section>
        </>
    );
};

TabBoardConfig.propTypes = {
    column_info: propTypes.object
};

export default TabBoardConfig;
