import React, { useEffect, useRef } from 'react';

import propTypes from 'prop-types';

import {
    Autocomplete,
    Box,
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
    currentColumn,
    participants,
    statusArr,
    tagsArr,
    swinlanesArr
}) => {
    const title = useRef();
    const description = useRef();
    const person = useRef();
    const status = useRef();
    const subcolumn = useRef();
    const swinlane = useRef();
    const tags = useRef();

    console.log(tagsArr);

    useEffect(() => {
        if (!currentColumn) {
            currentColumn.id = statusArr[0].id;
        }
    }, [currentColumn]);

    const validateInputs = () => {
        console.log(currentColumn, {
            title: title.current.value,
            description: description.current.value,
            person: person.current.value,
            status: status.current.value,
            groupId: subcolumn.current ? subcolumn.current.value : null,
            laneId: swinlane.current ? swinlane.current.value : null,
            tags: tags.current.value
        });
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
        input: { color: '#F2F7F2', height: '60px' },
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
                        <InputLabel
                            sx={{
                                color: 'grey',
                                fontSize: '14px',
                                '&.Mui-focused': {
                                    color: 'white',
                                    fontSize: '16px'
                                }
                            }}
                        >
                            Responsável
                        </InputLabel>
                        <Select
                            fullWidth
                            multiple
                            sx={selectStyle}
                            value={[]}
                            input={<OutlinedInput label="Responsável" />}
                            inputRef={person}
                            MenuProps={MenuProps}
                        >
                            {participants.map((participant, index) => (
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

                {/* Status */}
                <div>
                    <label>Status</label>
                    <select
                        className="input-reset ba b--black-20 pa2 mb2 db w-100"
                        ref={status}
                        defaultValue={currentColumn.id}
                    >
                        {statusArr?.map((status, index) => (
                            <option value={status.id} key={index}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subcolumns */}
                {hasSubColumns(currentColumn.groups) && (
                    <div>
                        <label>Subcoluna</label>
                        <select
                            className="input-reset ba b--black-20 pa2 mb2 db w-100"
                            ref={subcolumn}
                        >
                            {currentColumn.groups?.map((group, index) => (
                                <option value={group.id} key={index}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Swinlane */}
                {currentColumn.showSwinLanes && (
                    <div>
                        <label className="f6 b db mb2">Raia</label>
                        <select
                            className="input-reset ba b--black-20 pa2 mb2 db w-100"
                            ref={swinlane}
                        >
                            {swinlanesArr?.map((this_swinlane, index) => (
                                <option value={this_swinlane.id} key={index}>
                                    {this_swinlane.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Tags */}
                <div>
                    <Autocomplete
                        multiple
                        options={tagsArr}
                        getOptionLabel={(tag) => tag.name}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tags"
                                placeholder="Tags"
                                sx={inputTagStyle}
                                variant="standard"
                                inputRef={tags}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    ></Autocomplete>
                </div>

                <div className="mt3">
                    <input
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                        type="submit"
                        value="Criar card"
                        onClick={(e) => {
                            e.preventDefault();
                            validateInputs();
                        }}
                    />
                </div>
            </Stack>
        </Box>
    );
};

CreateCard.propTypes = {
    addNewCard: propTypes.func,
    currentColumn: propTypes.object,
    participants: propTypes.array,
    statusArr: propTypes.array,
    tagsArr: propTypes.array,
    swinlanes: propTypes.array
};

export default CreateCard;
