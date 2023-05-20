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
    id_card,
    name,
    description,
    // style,
    id_group,
    id_user,
    id_swinlane
) => {
    try {
        const { data } = await api.post(`/card/create`, {
            id_card: id_card,
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

export { updateCardGroup, createCard };
