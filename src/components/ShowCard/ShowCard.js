import React, { useState, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import {
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
const ShowCard = ({ cardObj, participants, swinlanes, status, tagsArr }) => {
    console.log(cardObj);

    const title = useRef();
    const description = useRef();

    const [id, setId] = useState(cardObj.id);
    const [id_column, setIdColumn] = useState(null);
    const [id_group, setIdGroup] = useState(cardObj.id_group);
    const [id_user, setIdUser] = useState(cardObj.id_user);
    const [lane_id, setLaneId] = useState(cardObj.laneId);

    const [columns, setColumns] = useState([]);

    const [selected_column, setSelectedColumn] = useState([]);

    useEffect(() => {
        const temp_columns = [];

        if (status) {
            status.map((column) => {
                temp_columns.push({
                    id: column.id,
                    name: column.name,
                    showSwinLanes: column.showSwinLanes,
                    groups: column.groups
                });

                column.groups.map((group) => {
                    if (group.id == cardObj.id_group) {
                        setIdColumn(column.id);
                        setIdGroup(group.id);

                        setSelectedColumn({
                            id: column.id,
                            name: column.name,
                            showSwinLanes: column.showSwinLanes,
                            groups: column.groups
                        });
                    }
                });
            });

            setColumns(temp_columns);
        }
    }, [status]);

    useEffect(() => {
        console.log(selected_column);
    }, [selected_column]);

    const validateEdits = () => {
        // cardObj.name = name;
        // cardObj.description = description;
    };

    const handleChangeSubcolumn = (e) => {
        const new_group_id = e.target.value;

        setIdGroup(new_group_id);
    };

    const handleChangeColumn = (e) => {
        const new_column_id = e.target.value;

        setIdColumn(new_column_id);

        columns.map((column) => {
            if (new_column_id == column.id) {
                setSelectedColumn({
                    id: column.id,
                    name: column.name,
                    showSwinLanes: column.showSwinLanes,
                    groups: column.groups
                });

                if (hasSubColumns(column.groups)) {
                    setIdGroup(column.groups[0].id);
                }
            }
        });
    };

    const titleStyle = {
        input: { color: '#F2F7F2', height: '50px', fontSize: '22px' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderStyle: 'none',
                borderColor: 'none'
            },
            '&.Mui-focused fieldset': {
                borderStyle: 'solid',
                borderColor: '#F2F7F2'
            }
        }
    };

    const multiStyle = {
        label: { color: 'grey', fontSize: '22px' },
        textareaStyle: { color: '#F2F7F2' },
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

    return (
        <Box>
            {/* Title */}
            <div className="">
                <TextField
                    fullWidth
                    margin="normal"
                    name="title"
                    type="text"
                    id="title"
                    variant="outlined"
                    sx={titleStyle}
                    defaultValue={cardObj.name}
                    inputRef={title}
                />
            </div>

            <hr
                className="mt3 mb3 ml3 mr3"
                style={{ borderColor: 'grey' }}
            ></hr>

            <Stack spacing={3} className="pa3">
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
                        defaultValue={cardObj.description}
                        inputProps={{
                            style: {
                                color: 'white',
                                paddingTop: '10px',
                                border: '1px'
                            }
                        }}
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
                            defaultValue={cardObj.id_user}
                            // onChange={handleChangePerson}
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
                {selected_column && id_column && (
                    <div>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel sx={inputSelectStyles}>
                                Coluna
                            </InputLabel>

                            <Select
                                fullWidth
                                sx={selectStyle}
                                value={id_column}
                                onChange={handleChangeColumn}
                                defaultValue={selected_column.id}
                                input={<OutlinedInput label="Coluna" />}
                                MenuProps={MenuProps}
                            >
                                {columns?.map((column, index) => (
                                    <MenuItem value={column.id} key={index}>
                                        {column.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )}

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
                                value={id_group ? id_group : 0}
                                onChange={handleChangeSubcolumn}
                                defaultValue={id_group}
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

                {/* Tags */}
                <div>
                    <label className="f6 b db mb2">
                        Tags <span className="normal black-60">(optional)</span>
                    </label>
                    <input
                        className="input-reset ba b--black-20 pa2 mb2 db w-100"
                        type="text"
                    />
                </div>

                <div className="mt3">
                    <input
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                        type="submit"
                        value="Atualizar card"
                        onClick={(e) => {
                            e.preventDefault();
                            validateEdits();
                        }}
                    />
                </div>
            </Stack>
        </Box>
    );
};

ShowCard.propTypes = {
    cardObj: propTypes.object,
    participants: propTypes.array,
    tagsArr: propTypes.array
};

export default ShowCard;
