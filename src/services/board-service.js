import api from '../factory/api';

const getBoardInfo = async (id) => {
    try {
        const { data } = await api.get(`/board/${id}`);
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

export { getBoardInfo, getBoardParticipants };
