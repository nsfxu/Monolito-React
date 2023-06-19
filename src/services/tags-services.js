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

const createTag = async (id_board, name, style) => {
    try {
        const { data } = await api.post(`/tags/create`, {
            id_board: id_board,
            name: name,
            style: style
        });
        return data;
    } catch (err) {
        return false;
    }
};

const deleteTag = async (id_tag) => {
    try {
        const { data } = await api.delete(`/tags/${id_tag}`);
        return data;
    } catch (err) {
        return false;
    }
};

const updateTag = async (id_tag, name, style) => {
    try {
        const { data } = await api.put(`/tags/${id_tag}`, {
            name: name,
            style: JSON.stringify(style)
        });
        return data;
    } catch (err) {
        return false;
    }
};

export { updateCardTags, createTag, deleteTag, updateTag };
