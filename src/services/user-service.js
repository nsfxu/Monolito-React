import api from '../factory/api';

/* eslint-disable */
// eslint-disable-next-line
const loginUser = async (userObject) => {
    try {
        const { data } = await api.post(`/user/login`, userObject);
        return data;
    } catch (err) {
        return false;
    }
};

const registerUser = async (userObject) => {
    try {
        const { data } = await api.post(`/user/create`, userObject);
        return data;
    } catch (err) {
        return false;
    }
};

const findByUsername = async (username) => {
    try {
        const { data } = await api.post(`/user/find`, { username: username });
        return data;
    } catch (err) {
        return false;
    }
};

const getUserBoards = async (id) => {
    try {
        const { data } = await api.get(`/user/boards/${id}`);
        return data;
    } catch (err) {
        return false;
    }
};

export { findByUsername, loginUser, registerUser, getUserBoards };
