/* eslint-disable */
// eslint-disable-next-line
const findSubColumnByName = (object, subColumnName) =>
    object.subColumns.find((sub_column) => sub_column.name === subColumnName);

const findColumnByName = (object, columnName) =>
    object.columns.find((column) => column.name === columnName);

const removeObjectByPosition = (object, pos) => object.data.splice(pos, 1);

const addObjectIntoPosition = (object, pos, item) =>
    object.data.splice(pos, 0, item);

export { findColumnByName, findSubColumnByName, removeObjectByPosition, addObjectIntoPosition };
