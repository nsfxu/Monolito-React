import api from '../factory/api';

/* eslint-disable */
// eslint-disable-next-line
const updateCardTags = async (id_card, all_tags_ids) => {
    try {
        const { data } = await api.put(`tags/card/${id_card}`, {
            all_tags_ids: all_tags_ids
        });
        return data;
    } catch (err) {
        return false;
    }
};

export { updateCardTags };
