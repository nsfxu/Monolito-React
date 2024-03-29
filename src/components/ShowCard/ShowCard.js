/* eslint-disable */
// eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react';

//#region SOCKET

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

//#endregion

import dayjs from 'dayjs';
import propTypes from 'prop-types';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
    Button,
    Typography
} from '@mui/material';

import { hasSubColumns } from '../../utils/column-utils';

import { updateCardTags } from '../../services/tags-services';
import { deleteCard, updateCard } from '../../services/card-service';
import { useHistory } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { getCommentsByCardId } from '../../services/comment-service';

const ShowCard = ({
    toast,
    current_user_permission,
    cardObj,
    participants,
    swinlanes,
    status,
    tagsArr,
    closeModal,
    getInfoByBoardId
}) => {
    console.log(current_user_permission);
    const [open, setOpen] = useState(false);

    const title = useRef();
    const description = useRef();

    const [id, setId] = useState(cardObj.id);
    const [id_column, setIdColumn] = useState(null);
    const [id_group, setIdGroup] = useState(cardObj.id_group);
    const [id_user, setIdUser] = useState(cardObj.id_user);
    const [lane_id, setLaneId] = useState(cardObj.laneId);
    const [expectedDate, setExpectedDate] = useState(null);

    let current_tags = [];

    const [columns, setColumns] = useState([]);

    const [selected_column, setSelectedColumn] = useState([]);
    const [selected_tags, setSelectedTags] = useState(null);

    const history = useHistory();
    const [user, setUser] = useState(undefined);
    const [messages, setMessages] = useState(undefined);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');

        if (!loggedUser) {
            history.push('/login');
        }

        setUser(JSON.parse(loggedUser));
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        socket.emit('join_room', id);
    }, [user]);

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

        setSelectedTags(current_tags);
    }, [cardObj, tagsArr]);

    useEffect(() => {
        if (cardObj.expectedDate) {
            const [day, month, year] = cardObj.expectedDate.split('/');

            setExpectedDate(dayjs(`${year}-${month}-${day}`));
        }
    }, [cardObj]);

    useEffect(async () => {
        if (!messages) {
            setMessages(await getMessages());
        }
    }, [messages]);

    const getMessages = async () => {
        const response = await getCommentsByCardId(id);

        if (response.result) {
            return response.result;
        }

        return [];
    };

    const getNewMessages = async () => {
        setMessages(await getMessages());
    };

    const validateInputs = async () => {
        if (current_user_permission == 3) {
            toast('Convidados não podem atualizar o card.');
            return;
        }

        if (!title.current.value) {
            toast('Preencha o título do card.');
            return;
        }

        if (!id_column) {
            toast('Selecione a coluna para o card.');
            return;
        }

        let temp_expected_date = null;

        if (expectedDate) {
            temp_expected_date = expectedDate;
            // temp_expected_date = dayjs(expectedDate).format('YYYY-MM-DD');
        }

        let temp_subcolumn = id_group;

        if (!hasSubColumns(selected_column.groups) || !id_group) {
            temp_subcolumn = selected_column.groups[0].id;
        }

        let temp_swinlane = lane_id;

        if (selected_column.showSwinLanes && !temp_swinlane) {
            temp_swinlane = swinlanesArr[0].id;
        }

        let temp_id_tags = [];
        selected_tags.map((this_tag) => temp_id_tags.push(this_tag.id));

        const tags_result = await updateCardTags(id, temp_id_tags);
        const card_result = await updateCard(
            id,
            title.current.value,
            description.current.value ? description.current.value : '',
            temp_expected_date,
            id_user,
            temp_subcolumn,
            temp_swinlane,
            null
        );

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
        if (current_user_permission == 3) {
            toast('Convidados não podem deletar o card.');
            return;
        }

        await deleteCard(cardObj.id);

        // resolvido, obrigado a todos os envolvidos

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

    function TypographyField(props) {
        const {
            setOpen,
            label,
            id,
            disabled,
            InputProps: { ref } = {},
            inputProps: { 'aria-label': ariaLabel } = {}
        } = props;

        return (
            <Typography
                className="pointer"
                id={id}
                disabled={disabled}
                ref={ref}
                aria-label={ariaLabel}
                onClick={() => setOpen?.((prev) => !prev)}
                variant="body1"
                style={{ color: 'white' }}
            >
                {label ?? 'Pick a date'}
            </Typography>
        );
    }

    function TypographyDatePicker(props) {
        const [open, setOpen] = React.useState(false);

        return (
            <DatePicker
                slots={{ field: TypographyField, ...props.slots }}
                slotProps={{
                    field: { setOpen },
                    actionBar: {
                        actions: ['clear']
                    }
                }}
                {...props}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            />
        );
    }

    return (
        <Box className="flex flex-row">
            <div className="br w-70">
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

                    {/* Expected Date */}
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TypographyDatePicker
                                label={`Data de expectativa: ${
                                    expectedDate == null
                                        ? 'Nenhuma'
                                        : expectedDate.format('DD/MM/YYYY')
                                }`}
                                value={expectedDate}
                                onChange={(newValue) =>
                                    setExpectedDate(newValue)
                                }
                            />
                        </LocalizationProvider>
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
                                    {selected_column.groups?.map(
                                        (group, index) => (
                                            <MenuItem
                                                value={group.id}
                                                key={index}
                                            >
                                                {group.name}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                    )}

                    {/* Swinlane */}
                    {selected_column && selected_column.showSwinLanes && (
                        <div>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel sx={inputSelectStyles}>
                                    Raia
                                </InputLabel>

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
                                        <MenuItem
                                            value={swinlane.id}
                                            key={index}
                                        >
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
                            {current_user_permission != 3 && (
                                <>
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
                                </>
                            )}

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
            </div>
            <div className="ma3 w-30">
                {messages && (
                    <Chat
                        id={id}
                        user={user}
                        socket={socket}
                        messages={messages}
                        getNewMessages={getNewMessages}
                    />
                )}
            </div>
        </Box>
    );
};

ShowCard.propTypes = {
    cardObj: propTypes.object,
    participants: propTypes.array,
    tagsArr: propTypes.array
};

export default ShowCard;
