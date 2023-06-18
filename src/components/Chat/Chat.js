/* eslint-disable */
// eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react';
import propTypes from 'prop-types';

const Chat = ({ id, user, socket }) => {
    const comment = useRef();

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

        await socket.emit('send_message', messageData);

        console.log(messageData);
    };
    return (
        <>
            <h2>Comentários</h2>
            <section id="comments"></section>
            <section id="input">
                <input
                    type="text"
                    placeholder="Digite seu comentario"
                    ref={comment}
                ></input>
                <button onClick={() => sendComment()}>Enviar</button>
            </section>
        </>
    );
};

Chat.propTypes = {
    id: propTypes.number,
    user: propTypes.object,
    socket: propTypes.any
};

export default Chat;
