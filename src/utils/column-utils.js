/* eslint-disable */
// eslint-disable-next-line
const findById = (object, Id) =>
    object.find((item) => item.id == Id);

const findColumnById = (object, columnId) =>
    object.columns.find((column) => column.id == columnId);

const findSubColumnById = (object, subColumnId) =>
    object.groups.find((sub_column) => sub_column.id == subColumnId);

const removeObjectByPosition = (object, pos) => object.cards.splice(pos, 1);

const addObjectIntoPosition = (object, pos, item) =>
    object.cards.splice(pos, 0, item);

const hasSubColumns = (groups) => 
    groups.length > 1;

export {
    findById,
    findColumnById,
    findSubColumnById,
    removeObjectByPosition,
    addObjectIntoPosition,
    hasSubColumns
};
