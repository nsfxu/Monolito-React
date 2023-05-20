import React, { useEffect, useRef, useState } from 'react';

import propTypes from 'prop-types';

import {
    Autocomplete,
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField
} from '@mui/material';

import { hasSubColumns } from '../../utils/column-utils';

/* eslint-disable */
// eslint-disable-next-line
const CreateCard = ({
    addNewCard,
    columns,
    participants,
    statusArr,
    tagsArr,
    swinlanesArr,
    closeModal
}) => {
    const title = useRef();
    const description = useRef();

    const [personName, setPersonName] = useState(null);
    const [column, setColumn] = useState(null);
    const [subcolumn, setSubcolumn] = useState(null);
    const [swinlane, setSwinlane] = useState(null);

    const [selected_tags, setSelectedTags] = useState(null);
    const [selected_column, setSelectedColumn] = useState([]);

    const validateInputs = async () => {
        if (title.current.value && personName && column) {
            let temp_subcolumn = subcolumn;

            if (!hasSubColumns(selected_column.groups) || !subcolumn) {
                temp_subcolumn = selected_column.groups[0].id;
            }

            addNewCard(selected_column, {
                title: title.current.value,
                description: description.current.value,
                person: personName,
                columnId: column,
                groupId: temp_subcolumn,
                laneId: swinlane,
                tags: selected_tags
            });
        }
    };

    useEffect(() => {
        if (columns) {
            const found_column = columns.find(
                (this_column) => this_column.id == column
            );

            if (found_column) {
                setSelectedColumn(found_column);
            }
        }
    }, [column]);

    const updateTags = (tagsArr) => {
        let temp_tags = [];

        tagsArr?.map((tag) => temp_tags.push(tag.id_tag));

        setSelectedTags([...temp_tags]);
    };

    const handleChangeSwinlane = (event) => {
        const {
            target: { value }
        } = event;
        setSwinlane(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    const handleChangeSubcolumn = (event) => {
        const {
            target: { value }
        } = event;
        setSubcolumn(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    const handleChangeColumn = (event) => {
        const {
            target: { value }
        } = event;
        setColumn(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    const handleChangePerson = (event) => {
        const {
            target: { value }
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
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

    const inputTagStyle = {
        input: { color: '#F2F7F2', height: '55px' },
        label: { color: 'grey', fontSize: '22px' },
        '& label.Mui-focused': {
            color: '#F0F0F0'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#F0F0F0'
        }
    };

    const selectStyle = {
        label: { color: '#ff0000' },
        color: 'white',
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#grey'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F0F0F0'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F0F0F0'
        },
        '.MuiSvgIcon-root ': {
            fill: 'grey !important'
        }
    };

    const inputSelectStyles = {
        color: 'grey',
        fontSize: '14px',
        '&.Mui-focused': {
            color: 'white',
            fontSize: '16px'
        }
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
                color: 'white',
                backgroundColor: '#35393C'
            }
        }
    };

    const chipStyle = {
        color: 'white',
        backgroundColor: '#35393F'
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

                {/* Person */}
                <div>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel sx={inputSelectStyles}>
                            Responsável
                        </InputLabel>

                        <Select
                            fullWidth
                            sx={selectStyle}
                            value={personName ? personName : ''}
                            onChange={handleChangePerson}
                            input={<OutlinedInput label="Responsável" />}
                            MenuProps={MenuProps}
                        >
                            {participants?.map((participant, index) => (
                                <MenuItem
                                    value={participant.id_user}
                                    key={index}
                                >
                                    {participant.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Column */}
                <div>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel sx={inputSelectStyles}>Coluna</InputLabel>

                        <Select
                            fullWidth
                            sx={selectStyle}
                            value={column ? column : ''}
                            onChange={handleChangeColumn}
                            defaultValue={0}
                            input={<OutlinedInput label="Coluna" />}
                            MenuProps={MenuProps}
                        >
                            {statusArr?.map((status, index) => (
                                <MenuItem value={status.id} key={index}>
                                    {status.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Subcolumns */}
                {selected_column && hasSubColumns(selected_column.groups) && (
                    <div>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel sx={inputSelectStyles}>
                                Subcoluna
                            </InputLabel>

                            <Select
                                fullWidth
                                sx={selectStyle}
                                value={subcolumn ? subcolumn : ''}
                                onChange={handleChangeSubcolumn}
                                defaultValue={0}
                                input={<OutlinedInput label="Subcoluna" />}
                                MenuProps={MenuProps}
                            >
                                {selected_column.groups?.map((group, index) => (
                                    <MenuItem value={group.id} key={index}>
                                        {group.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )}

                {/* Swinlane */}
                {selected_column && selected_column.showSwinLanes && (
                    <div>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel sx={inputSelectStyles}>Raia</InputLabel>

                            <Select
                                fullWidth
                                sx={selectStyle}
                                value={swinlane ? swinlane : ''}
                                onChange={handleChangeSwinlane}
                                defaultValue={0}
                                input={<OutlinedInput label="Raia" />}
                                MenuProps={MenuProps}
                            >
                                {swinlanesArr?.map((swinlane, index) => (
                                    <MenuItem value={swinlane.id} key={index}>
                                        {swinlane.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )}

                {/* Tags */}
                <div>
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        options={tagsArr}
                        onChange={(event, value) => updateTags(value)}
                        getOptionLabel={(tag) => tag.name}
                        renderTags={(values, tagProps) =>
                            values.map((option, index) => (
                                <Chip
                                    sx={chipStyle}
                                    variant="outlined"
                                    label={option.name}
                                    {...tagProps({ index })}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tags"
                                sx={inputTagStyle}
                                variant="standard"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    ></Autocomplete>
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
                            Criar CARD
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

CreateCard.propTypes = {
    addNewCard: propTypes.func,
    columns: propTypes.array,
    participants: propTypes.array,
    statusArr: propTypes.array,
    tagsArr: propTypes.array,
    swinlanesArr: propTypes.array,
    closeModal: propTypes.func
};

export default CreateCard;
