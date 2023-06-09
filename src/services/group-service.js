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

const createGroup = async (id_column, name) => {
    try {
        const { data } = await api.post(`/group/create`, {
            id_column: id_column,
            name: name
        });
        return data;
    } catch (err) {
        return false;
    }
};

const deleteGroup = async (id_group) => {
    try {
        const { data } = await api.delete(`/group/${id_group}`);
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

export { createGroup, deleteGroup, updateGroup, updateOrder };
