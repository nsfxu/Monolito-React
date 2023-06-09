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

const updateColumn = async (id_column, name, show_swinlane) => {
    try {
        const { data } = await api.put(`/column/${id_column}`, {
            name: name,
            show_swinlane: show_swinlane
        });
        return data;
    } catch (err) {
        return false;
    }
};

const updateOrder = async (id_board, columns) => {
    try {
        const { data } = await api.put(`/column/order/${id_board}`, {
            columns: columns
        });
        return data;
    } catch (err) {
        return false;
    }
};

export { createColumn, updateColumn, updateOrder };
