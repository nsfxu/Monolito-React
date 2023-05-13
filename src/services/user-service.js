import api from '../factory/api';

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

export { loginUser, registerUser };
