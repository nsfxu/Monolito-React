/* eslint-disable */
// eslint-disable-next-line
const getSubColumnId = (name, subColumns) => {
    const selected_column = subColumns.find((column) => column.name === name);

    console.log(selected_column.id);

    return selected_column.id;
};

const getIndexOfDraggableId = (cards, draggableId) =>
    cards.findIndex((card) => {
        return (card.id == draggableId);
    });

export { getSubColumnId, getIndexOfDraggableId };
