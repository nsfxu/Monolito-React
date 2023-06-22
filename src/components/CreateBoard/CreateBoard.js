import React, { useRef } from 'react';
import propTypes from 'prop-types';

import { Box, Stack, TextField, Button } from '@mui/material';

/* eslint-disable */
// eslint-disable-next-line
const CreateBoard = ({ closeModal, requestCreateBoard, toast }) => {
    const title = useRef();
    const description = useRef();

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

    const validateInputs = async () => {
        if (!title.current.value) {
            toast('Preencha o título do board!');

            return;
        }

        await requestCreateBoard(
            title.current.value,
            description.current.value ? description.current.value : ''
        );
    };

    return (
        <Box>
            <Stack spacing={3} className="pa3">
                {/* Title */}
                <div>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="title"
                        label="Título"
                        type="text"
                        id="title"
                        variant="standard"
                        sx={inputStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputRef={title}
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
                        rows={5}
                        variant="standard"
                        sx={multiStyle}
                        inputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputRef={description}
                    />
                </div>

                <div className="mt3">
                    <Stack direction="row" spacing={3}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={(e) => {
                                e.preventDefault();
                                validateInputs();
                            }}
                        >
                            Criar Board
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => closeModal()}
                        >
                            Fechar
                        </Button>
                    </Stack>
                </div>
            </Stack>
        </Box>
    );
};

CreateBoard.propTypes = {
    closeModal: propTypes.func,
    requestCreateBoard: propTypes.func,
    toast: propTypes.func
};

export default CreateBoard;
