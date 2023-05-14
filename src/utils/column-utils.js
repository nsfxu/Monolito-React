/* eslint-disable */
// eslint-disable-next-line
const findById = (object, Id) => object.find((item) => item.id == Id);

const findColumnById = (object, columnId) =>
    object.columns.find((column) => column.id == columnId);

const findSubColumnById = (object, subColumnId) =>
    object.groups.find((sub_column) => sub_column.id == subColumnId);

const removeObjectByPosition = (object, pos) => object.cards.splice(pos, 1);

const addObjectIntoPosition = (object, pos, item) =>
    object.cards.splice(pos, 0, item);

const hasSubColumns = (groups) => groups?.length > 1;

const validateIfArrAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (var i = 0; i < arr1.length; i++) {
        var obj1 = arr1[i];
        var obj2 = arr2[i];

        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }

        for (var prop in obj1) {
            if (obj1.hasOwnProperty(prop)) {
                if (obj1[prop] !== obj2[prop]) {
                    return false;
                }
            }
        }
    }

    return true;
};

export {
    findById,
    findColumnById,
    findSubColumnById,
    removeObjectByPosition,
    addObjectIntoPosition,
    hasSubColumns,
    validateIfArrAreEqual
};
