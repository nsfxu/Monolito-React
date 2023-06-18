/* eslint-disable */
// eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import { Avatar, Button, TextField, Typography } from '@mui/material';
import { createComment } from '../../services/comment-service';

const Chat = ({ id, user, socket, messages, getNewMessages }) => {
    const comment = useRef();

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            updateComment(data);
        });
    }, [socket]);

    const sendComment = async () => {
        const message = comment.current.value;

        if (message.length == 0) {
            return;
        }

        const now =
            new Date(Date.now()).getHours() +
            ':' +
            new Date(Date.now()).getMinutes();

        const messageData = {
            card_id: id,
            username: user.username,
            name: user.name,
            message: message,
            time: now
        };

        const should_emit_message = sendCommentToDB(message);

        if (should_emit_message) {
            updateComment(messageData);
            await socket.emit('send_message', messageData);
        }

        console.log(messageData);
    };

    const sendCommentToDB = async (message) => {
        const response = await createComment(id, user.id_user, message);

        if (response.result.affectedRows == 0) {
            return false;
        }

        return true;
    };

    const updateComment = async () => {
        getNewMessages();
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

    return (
        <>
            <h2>Comentários</h2>
            <section id="comments">
                {messages &&
                    messages.map((this_messages, index) => (
                        <div
                            className="flex flex-row ma4 pa2 ml0 w-100 ba"
                            key={index}
                        >
                            <Avatar {...stringAvatar(this_messages.name)} />
                            <div className="flex flex-column pl2 w-100">
                                <div className="flex flex-row">
                                    <Typography variant="body1" className="pr1">
                                        {this_messages.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'lightgrey' }}
                                    >
                                        @{this_messages.username}
                                    </Typography>
                                </div>
                                <Typography variant="body2">
                                    {this_messages.message}
                                </Typography>
                            </div>
                        </div>
                    ))}
            </section>
            <hr></hr>
            <h2>Enviar um comentário</h2>
            <section id="input">
                <TextField
                    fullWidth
                    multiline
                    margin="normal"
                    id="comment"
                    label="Comentário"
                    name="comment"
                    rows={10}
                    variant="standard"
                    sx={multiStyle}
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
                    inputRef={comment}
                />

                <Button
                    variant="contained"
                    color="success"
                    onClick={() => sendComment()}
                >
                    Enviar
                </Button>
            </section>
        </>
    );
};

Chat.propTypes = {
    id: propTypes.number,
    user: propTypes.object,
    socket: propTypes.any,
    messages: propTypes.array,
    getNewMessages: propTypes.func
};

export default Chat;
