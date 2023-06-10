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

const createSwinlane = async (id_board, name, styles) => {
    try {
        const { data } = await api.post(`/swinlane/create`, {
            id_board: id_board,
            name: name,
            styles: styles
        });
        return data;
    } catch (err) {
        return false;
    }
};

const deleteSwinlane = async (id_swinlane) => {
    try {
        const { data } = await api.delete(`/swinlane/${id_swinlane}`);
        return data;
    } catch (err) {
        return false;
    }
};

const updateGroup = async (id_group, name) => {
    try {
        const { data } = await api.put(`/group/${id_group}`, {
            name: name
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

export { createSwinlane, deleteSwinlane, updateGroup, updateOrder };
