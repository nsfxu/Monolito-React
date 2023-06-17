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

const createSwinlane = async (id_board, name, style) => {
    try {
        const { data } = await api.post(`/swinlane/create`, {
            id_board: id_board,
            name: name,
            style: style
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

const updateSwinlane = async (id_swinlane, name, style) => {
    try {
        const { data } = await api.put(`/swinlane/${id_swinlane}`, {
            name: name,
            style: style
        });
        return data;
    } catch (err) {
        return false;
    }
};

const updateOrder = async (id_board, swinlanes) => {
    try {
        const { data } = await api.put(`/swinlane/order/${id_board}`, {
            swinlanes: swinlanes
        });
        return data;
    } catch (err) {
        return false;
    }
};

export { createSwinlane, deleteSwinlane, updateSwinlane, updateOrder };
