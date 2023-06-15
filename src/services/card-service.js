import api from '../factory/api';

/* eslint-disable */
// eslint-disable-next-line
const updateCardGroup = async (
    id_card,
    new_order,
    old_order,
    id_group,
    id_swinlane
) => {
    console.log(id_card, new_order, old_order, id_group, id_swinlane);
    try {
        const { data } = await api.put(`/card/${id_card}`, {
            new_order: new_order,
            old_order: old_order,
            id_group: id_group,
            id_swinlane: id_swinlane
        });
        return data;
    } catch (err) {
        return false;
    }
};

const createCard = async (
    name,
    description,
    // style,
    id_group,
    id_user,
    id_swinlane
) => {
    try {
        const { data } = await api.post(`/card/create`, {
            name: name,
            description: description,
            style: null,
            id_group: id_group,
            id_user: id_user,
            id_swinlane: id_swinlane
        });
        return data;
    } catch (err) {
        return false;
    }
};

const updateCard = async (
    id,
    name,
    description,
    id_user,
    id_group,
    id_swinlane,
    style
) => {
    try {
        const { data } = await api.put(`/card/edit/${id}`, {
            name: name,
            description: description,
            id_user: id_user,
            id_group: id_group,
            id_swinlane: id_swinlane,
            style: style
        });

        return data;
    } catch (err) {
        return false;
    }
};

const updateCardExpectedDate = async (id, expectedDate) => {
    try {
        const { data } = await api.put(`/card/edit/expected/${id}`, {
            expectedDate: expectedDate
        });

        return data;
    } catch (err) {
        return false;
    }
};

const deleteCard = async (id_card) => {
    try {
        const { data } = await api.delete(`/card/${id_card}`);
        return data;
    } catch (err) {
        return false;
    }
};

export {
    updateCardGroup,
    updateCard,
    createCard,
    deleteCard,
    updateCardExpectedDate
};
