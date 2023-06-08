import api from '../factory/api';

/* eslint-disable */
// eslint-disable-next-line
const getBoardInfo = async (id) => {
    try {
        const { data } = await api.get(`/board/${id}`);
        return data;
    } catch (err) {
        return false;
    }
};

const createBoard = async (id_user, name, description) => {
    try {
        const { data } = await api.post(`/board/create`, {
            id_user: id_user,
            name: name,
            description: description
        });
        return data;
    } catch (err) {
        return false;
    }
};

const getBoardParticipants = async (id) => {
    try {
        const { data } = await api.get(`/board/users/${id}`);
        return data;
    } catch (err) {
        return false;
    }
};

export { getBoardInfo, getBoardParticipants, createBoard };
