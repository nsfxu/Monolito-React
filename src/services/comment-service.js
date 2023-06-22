import api from '../factory/api';

/* eslint-disable */
// eslint-disable-next-line
const getCommentsByCardId = async (id) => {
    try {
        const { data } = await api.get(`/comments/card/${id}`);
        return data;
    } catch (err) {
        return false;
    }
};

const createComment = async (id_card, id_user, message) => {
    try {
        const { data } = await api.post(`/comments/card/${id_card}`, {
            id_user: id_user,
            message: message
        });
        return data;
    } catch (err) {
        return false;
    }
};

export { createComment, getCommentsByCardId };
