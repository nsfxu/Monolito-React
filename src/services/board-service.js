import api from '../factory/api';

const getBoardInfo = async (id) => {
    try {
        const { data } = await api.get(`/board/${id}`);
        return data;
    } catch (err) {
        return false;
    }
};

export { getBoardInfo };
