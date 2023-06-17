import React, { useRef, useState } from 'react';
import propTypes from 'prop-types';
/* eslint-disable */
// eslint-disable-next-line
import {
    Avatar,
    Button,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import {
    addUserToBoard,
    deleteUserFromBoard
} from '../../services/board-service';
import { findByUsername } from '../../services/user-service';

const TabMemberConfig = ({ board_id, participants, updateParticipants }) => {
    const username = useRef();

    const [found_user, setFoundUser] = useState(null);
    const [permission_id, setPermissionId] = useState(2);

    const titleStyle = {
        input: { color: '#F2F7F2', height: '50px', fontSize: '22px' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderStyle: 'solid',
                borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
                borderStyle: 'solid',
                borderColor: '#F2F7F2'
            }
        }
    };

    const searchUser = async () => {
        if (!username.current) {
            return;
        }

        const response = await findByUsername(username.current.value);

        if (response.error) {
            setFoundUser(response.error);
        }

        if (response.result && !response.error) {
            const user = response.result;

            let user_exists = false;
            participants.map((this_participant) => {
                console.log(this_participant);

                if (this_participant.id_user == user.id_user) {
                    user_exists = true;
                }
            });

            response.result.user_exists = user_exists;

            setFoundUser(response.result);
        }
    };

    const addCurrentUserToBoard = async () => {
        const response = await addUserToBoard(
            found_user.id_user,
            board_id,
            permission_id
        );

        const temp_participants = [...participants];

        found_user.id_permission = permission_id;

        temp_participants.push(found_user);

        await updateParticipants(temp_participants);
        setFoundUser(null);
        username.current.value = '';
    };

    const updateUserPermission = async (id_user, id_permission) => {
        console.log(id_user, id_permission);
    };

    const removeUserFromBoard = async (id_user) => {
        const response = await deleteUserFromBoard(board_id, id_user);

        if (response.result == 'User deleted.') {
            let removed_participant = participants.map((participant) => {
                if (participant.id_user == id_user) {
                    return participant;
                }
            });

            const temp_participants = [...participants];

            const pos = temp_participants.indexOf(removed_participant);

            temp_participants.splice(pos, 1);

            updateParticipants(temp_participants);
        }

        console.log(response);
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        let validated_name = name.toUpperCase().split(' ');

        if (validated_name.length > 1) {
            validated_name = `${name.toUpperCase().split(' ')[0][0]}${
                name.toUpperCase().split(' ')[1][0]
            }`;
        } else {
            validated_name = name.toUpperCase().split(' ')[0][0];
        }

        return {
            sx: {
                bgcolor: stringToColor(name)
            },
            children: validated_name
        };
    }

    const selectStyle = {
        height: '30px',
        label: { color: '#ff0000' },
        marginLeft: '25px',
        color: 'white',
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'lightgrey'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
        },
        '.MuiSvgIcon-root ': {
            fill: 'white !important'
        }
    };

    return (
        <>
            <section className="flex flex-column ma3 h-100">
                <div>
                    <Typography variant="h6">Membros</Typography>
                </div>
                <div className="ba mt4 flex flex-column pa3">
                    {participants.map((this_participant, index) => (
                        <div className="flex flex-row" key={index}>
                            <Avatar {...stringAvatar(this_participant.name)} />

                            <div className="flex flex-column pl2 pb2 w-100">
                                <Typography variant="body1">
                                    {this_participant.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: 'lightgrey' }}
                                >
                                    @{this_participant.username}
                                </Typography>
                                <Typography variant="body1">
                                    Permissão:
                                    {this_participant.id_permission == 1 &&
                                        ' Admin'}
                                    {this_participant.id_permission == 2 &&
                                        ' Usuário'}
                                    {this_participant.id_permission == 3 &&
                                        ' Convidado'}
                                </Typography>

                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                            removeUserFromBoard(
                                                this_participant.id_user
                                            )
                                        }
                                    >
                                        Remover do quadro
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            updateUserPermission(
                                                this_participant.id_user,
                                                1
                                            )
                                        }
                                    >
                                        Admin
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            updateUserPermission(
                                                this_participant.id_user,
                                                2
                                            )
                                        }
                                    >
                                        Usuário
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            updateUserPermission(
                                                this_participant.id_user,
                                                3
                                            )
                                        }
                                    >
                                        Convidado
                                    </Button>
                                </Stack>
                                <div className="flex flex-row w-100 h-25 mt3"></div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr className="w-100 mt4"></hr>

                <div>
                    <Typography variant="h6">Adicionar membros</Typography>
                </div>
                <div className="flex flex-column">
                    <TextField
                        fullWidth
                        margin="normal"
                        name="name"
                        type="text"
                        variant="outlined"
                        placeholder="Nome de usuário"
                        sx={titleStyle}
                        inputRef={username}
                    />
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => searchUser()}
                    >
                        Pesquisar usuário
                    </Button>
                </div>

                {found_user && found_user == 'User not found' && (
                    <p>Usuário não encontrado</p>
                )}

                {found_user && found_user != 'User not found' && (
                    <div className="ba mt4 flex flex-row pa3">
                        <Avatar {...stringAvatar(found_user.name)} />
                        <div className="flex flex-column pl2 pb2">
                            <Typography variant="body1">
                                {found_user.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: 'lightgrey' }}
                            >
                                @{found_user.username}
                            </Typography>
                            {found_user.user_exists ? (
                                <p>Esse usuário já existe no board atual</p>
                            ) : (
                                <div className="flex flex-row w-100 h-25 mt3">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => addCurrentUserToBoard()}
                                    >
                                        Adicionar usuário como
                                    </Button>
                                    <Select
                                        sx={selectStyle}
                                        value={permission_id}
                                        onChange={(val) => {
                                            setPermissionId(val.target.value);
                                        }}
                                    >
                                        <MenuItem value={1}>Admin</MenuItem>
                                        <MenuItem value={2}>Usuário</MenuItem>
                                        <MenuItem value={3}>Convidado</MenuItem>
                                    </Select>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

TabMemberConfig.propTypes = {
    board_id: propTypes.number,
    participants: propTypes.array,
    updateParticipants: propTypes.func
};

export default TabMemberConfig;
