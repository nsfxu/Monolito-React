/* eslint-disable */
// eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react';

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
    TextField,
    Chip,
    Button
} from '@mui/material';

import { hasSubColumns } from '../../utils/column-utils';

import { updateCardTags } from '../../services/tags-services';
import { deleteCard, updateCard } from '../../services/card-service';

const ShowCard = ({
    cardObj,
    participants,
    swinlanes,
    status,
    tagsArr,
    closeModal,
    getInfoByBoardId
}) => {
    const title = useRef();
    const description = useRef();

    const [id, setId] = useState(cardObj.id);
    const [id_column, setIdColumn] = useState(null);
    const [id_group, setIdGroup] = useState(cardObj.id_group);
    const [id_user, setIdUser] = useState(cardObj.id_user);
    const [lane_id, setLaneId] = useState(cardObj.laneId);
    let current_tags = [];

    const [columns, setColumns] = useState([]);

    const [selected_column, setSelectedColumn] = useState([]);
    const [selected_tags, setSelectedTags] = useState(null);

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
        tagsArr.map((this_tag) => {
            if (cardObj.id_tags && cardObj.id_tags.length > 0) {
                cardObj.id_tags.map((current_tag) => {
                    if (current_tag == this_tag.id) {
                        current_tags.push(this_tag);
                    }
                });
            }
        });

        console.log(current_tags, tagsArr);
        setSelectedTags(current_tags);
    }, [cardObj, tagsArr]);

    const validateInputs = async () => {
        if (!title.current.value) {
            toast('Preencha o título do card.');
            return;
        }

        if (!id_column) {
            toast('Selecione a coluna para o card.');
            return;
        }

        let temp_subcolumn = id_group;

        if (!hasSubColumns(selected_column.groups) || !id_group) {
            temp_subcolumn = selected_column.groups[0].id;
        }

        let temp_swinlane = swinlane;

        if (selected_column.showSwinLanes && !temp_swinlane) {
            temp_swinlane = swinlanesArr[0].id;
        }

        let temp_id_tags = [];
        selected_tags.map((this_tag) => temp_id_tags.push(this_tag.id));

        const tags_result = await updateCardTags(id, temp_id_tags);
        const card_result = await updateCard(
            id,
            title.current.value,
            description.current.value,
            id_user,
            temp_subcolumn,
            temp_swinlane,
            null
        );

        console.log(card_result);

        await getInfoByBoardId();
    };

    const handleChangeIdUser = (event) => {
        const {
            target: { value }
        } = event;
        setIdUser(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
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

    const handleChangeSwinlane = (e) => {
        const new_swinlane_id = e.target.value;

        setLaneId(new_swinlane_id);
    };

    const deleteCurrentCard = async () => {
        const delete_result = await deleteCard(cardObj.id);

        // esse botão não está funcionando em swinlanes com subcolunas
        // testar com swinlanes normais e com colunas com subcolunas
        // boa sorte

        console.log(delete_result);

        await getInfoByBoardId();
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
                            value={id_user}
                            onChange={handleChangeIdUser}
                            input={<OutlinedInput label="Responsável" />}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value={1}>Sem responsável</MenuItem>
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

                {/* Swinlane */}
                {selected_column && selected_column.showSwinLanes && (
                    <div>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel sx={inputSelectStyles}>Raia</InputLabel>

                            <Select
                                fullWidth
                                sx={selectStyle}
                                value={lane_id ? lane_id : ''}
                                onChange={handleChangeSwinlane}
                                defaultValue={lane_id}
                                input={<OutlinedInput label="Raia" />}
                                MenuProps={MenuProps}
                            >
                                {swinlanes?.map((swinlane, index) => (
                                    <MenuItem value={swinlane.id} key={index}>
                                        {swinlane.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )}

                {/* Tags */}
                {selected_tags && (
                    <div>
                        <Autocomplete
                            multiple
                            options={tagsArr}
                            getOptionLabel={(tag) => tag.name}
                            defaultValue={selected_tags}
                            onChange={(event, value) => {
                                setSelectedTags(value);
                            }}
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
                        ></Autocomplete>
                    </div>
                )}

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
                            Atualizar card
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={(e) => {
                                e.preventDefault();
                                deleteCurrentCard();
                            }}
                        >
                            Excluir card
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

ShowCard.propTypes = {
    cardObj: propTypes.object,
    participants: propTypes.array,
    tagsArr: propTypes.array
};

export default ShowCard;
