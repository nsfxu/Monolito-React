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

const updateBoardInfo = async (id_board, name, description) => {
    try {
        const { data } = await api.put(`/board/${id_board}`, {
            name: name,
            description: description
        });
        return data;
    } catch (err) {
        return false;
    }
};

const getBoardInformation = async (id) => {
    try {
        const { data } = await api.get(`/board/info/${id}`);
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

const deleteBoard = async (id_board) => {
    try {
        const { data } = await api.delete(`/board/${id_board}`);
        return data;
    } catch (err) {
        return false;
    }
};

const addUserToBoard = async (id_user, id_board, id_permission) => {
    try {
        const { data } = await api.post(`/board/${id_board}/users/${id_user}`, {
            permission_id: id_permission
        });
        return data;
    } catch (err) {
        return false;
    }
};

const updateUserPermission = async (id_user, id_board, id_permission) => {
    try {
        const { data } = await api.put(`/board/${id_board}/users/${id_user}`, {
            permission_id: id_permission
        });
        return data;
    } catch (err) {
        return false;
    }
};

const deleteUserFromBoard = async (id_board, id_user) => {
    try {
        const { data } = await api.delete(
            `/board/${id_board}/users/${id_user}`
        );
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

export {
    deleteBoard,
    getBoardInfo,
    getBoardInformation,
    getBoardParticipants,
    createBoard,
    updateBoardInfo,
    addUserToBoard,
    updateUserPermission,
    deleteUserFromBoard
};
