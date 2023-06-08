import api from '../factory/api';

/* eslint-disable */
// eslint-disable-next-line
// const getBoardInfo = async (id) => {
//     try {
//         const { data } = await api.get(`/board/${id}`);
//         return data;
//     } catch (err) {
//         return false;
//     }
// };

const createColumn = async (id_board, name) => {
    try {
        const { data } = await api.post(`/column/create`, {
            id_board: id_board,
            name: name
        });
        return data;
    } catch (err) {
        return false;
    }
};

export { createColumn };
