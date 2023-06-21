import React, { useState, useEffect, useRef, useCallback } from 'react';
import propTypes from 'prop-types';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography
} from '@mui/material';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import { updateColumn } from '../../services/column-service';
import {
    createGroup,
    deleteGroup,
    updateGroup
} from '../../services/group-service';

import {
    findById,
    hasSubColumns,
    validateIfArrAreEqual
} from '../../utils/column-utils';

import TabColumnItem from '../TabColumnItem/TabColumnItem';
import CreateColumnSubColumn from '../CreateColumnSubColumn/CreateColumnSubColumn';

const CREATE_SUBCOLUMN = 'CreateSubColumn';

/* eslint-disable */
// eslint-disable-next-line
const TabColumnInfo = ({
    selected_column,
    deleteColumnByPos,
    board_columns,
    board_swinlanes
}) => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [current_column, setCurrentColumn] = useState(undefined);
    const [has_subcolumn, setHasSubcolumn] = useState(false);

    const [current_subcolumn, setCurrentSubColumn] = useState(undefined);
    const [selected_subcolumn, setSelectedSubColumn] = useState(false);
    const [temp_subcolumns, setTempSubColumns] = useState([]);

    const [has_unsaved_data_column, setHasUnsavedDataColumn] = useState(true);
    const [has_unsaved_data_group, setHasUnsavedDataGroup] = useState(true);

    const [isNotHidden, setIsNotHidden] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal_type, setModalType] = useState(null);
    const [modal_style, setModalStyle] = useState(null);

    const grid = 8;

    const name = useRef();
    const wip_limit = useRef();
    const subcolumn_name = useRef();
    const show_swin_lane = useRef();
    const show_wip = useRef();

    useEffect(async () => {
        await setCurrentColumn(undefined);
        await setTempSubColumns([]);
        await setSelectedSubColumn(false);

        updateHasUnsavedDataGroup();
        updateHasUnsavedDataColumn();

        await setCurrentColumn(findById(board_columns, selected_column));
    }, [selected_column]);

    useEffect(async () => {
        if (!selected_subcolumn) {
            return;
        }
        await setCurrentSubColumn(undefined);

        setCurrentSubColumn(
            findById(current_column.groups, selected_subcolumn)
        );
    }, [selected_subcolumn]);

    useEffect(async () => {
        if (!current_column) {
            return;
        }
        console.log(current_column);

        if (current_column.showWip) {
            setIsNotHidden(true);
        }

        await setHasSubcolumn(hasSubColumns(current_column.groups));

        if (hasSubColumns(current_column.groups)) {
            await setTempSubColumns(current_column.groups);
            forceUpdate();
        }
    }, [current_column]);

    useEffect(async () => {
        if (!temp_subcolumns && temp_subcolumns.length < 2) {
            return;
        }

        updateHasUnsavedDataGroup();
    }, [temp_subcolumns]);

    //#region Modal stuff

    const openCustomModal = (modal) => {
        if (modal === CREATE_SUBCOLUMN) {
            setModalType(modal);
            setModalStyle(ModalStyles.createSubcolumn);
        }

        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //#endregion

    const saveColumnInfo = async () => {
        const this_name = name.current ? name.current.value : null;

        current_column.name =
            this_name && this_name != current_column.name
                ? this_name
                : current_column.name;

        current_column.showSwinLanes =
            show_swin_lane.current &&
            show_swin_lane.current.checked != current_column.showSwinLanes
                ? show_swin_lane.current.checked
                : current_column.showSwinLanes;

        if (board_swinlanes.length == 0) {
            current_column.showSwinLanes = false;
        }

        await updateColumn(
            selected_column,
            current_column.name,
            current_column.showSwinLanes
        );

        await setCurrentColumn(findById(board_columns, selected_column));
        await updateHasUnsavedDataColumn();
    };

    const saveSubColumnInfo = async () => {
        const this_subcolumn_name = subcolumn_name.current
            ? subcolumn_name.current.value
            : null;

        if (this_subcolumn_name) {
            current_subcolumn.name =
                this_subcolumn_name &&
                this_subcolumn_name != current_subcolumn.name
                    ? this_subcolumn_name
                    : current_subcolumn.name;
            await updateGroup(current_subcolumn.id, current_subcolumn.name);
        }

        if (has_subcolumn) {
            current_column.groups = temp_subcolumns
                ? temp_subcolumns
                : current_column.groups;
        }

        await setCurrentColumn(findById(board_columns, selected_column));
        await updateHasUnsavedDataGroup();
    };

    const removeCurrentSubColumn = async (obj) => {
        await deleteGroup(obj.id);
        const pos = current_column.groups.indexOf(obj);

        current_column.groups.splice(pos, 1);

        await setHasSubcolumn(hasSubColumns(current_column.groups));
        await setTempSubColumns([]);
        await setTempSubColumns(current_column.groups);
    };

    const updateHasUnsavedDataColumn = async () => {
        // validates if the name is the same
        if (name.current && name.current.value != current_column.name) {
            await setHasUnsavedDataColumn(false);

            return;
        }

        // valide if show_swinlane changed
        if (
            show_swin_lane.current &&
            show_swin_lane.current.checked != current_column.showSwinLanes
        ) {
            await setHasUnsavedDataColumn(false);

            return;
        }

        // valide if show_wip changed
        if (
            show_wip.current &&
            show_wip.current.checked != current_column.showWip
        ) {
            await setHasUnsavedDataColumn(false);

            return;
        }

        // valide if wip_limit changed
        if (
            wip_limit.current &&
            wip_limit.current.value != current_column.wip_limit
        ) {
            await setHasUnsavedDataColumn(false);

            return;
        }

        await setHasUnsavedDataColumn(true);
    };

    const updateHasUnsavedDataGroup = async () => {
        // validates if the order of the groups is the same
        if (has_subcolumn) {
            const current_selected_column_groups = findById(
                board_columns,
                selected_column
            ).groups;

            if (
                !temp_subcolumns ||
                !validateIfArrAreEqual(
                    current_selected_column_groups,
                    temp_subcolumns
                )
            ) {
                await setHasUnsavedDataGroup(false);
                return;
            }
        }

        // validades if the name is the same
        if (
            subcolumn_name.current &&
            subcolumn_name.current.value != current_subcolumn.name
        ) {
            await setHasUnsavedDataGroup(false);

            return;
        }

        await setHasUnsavedDataGroup(true);
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 3,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgrey' : '#565B61',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : '#35393C',
        display: 'flex',
        padding: grid,
        overflow: 'auto'
    });

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            temp_subcolumns,
            result.source.index,
            result.destination.index
        );

        setTempSubColumns(items);
    };

    const getModalResult = async (result, modal_type) => {
        switch (modal_type) {
            case CREATE_SUBCOLUMN:
                const response = await createGroup(selected_column, result);

                current_column.groups.push({
                    id: response.result.id_group,
                    name: result,
                    cards: []
                });

                await setHasSubcolumn(hasSubColumns(current_column.groups));
                await setTempSubColumns([]);
                await setTempSubColumns(current_column.groups);
                break;

            default:
                return;
        }
    };

    const deleteCurrentColumn = () => {
        deleteColumnByPos(board_columns.indexOf(current_column));
    };

    const column_name_style = {
        '.MuiInputLabel-root': {
            color: 'white !important'
        },
        input: {
            color: '#F2F7F2',
            height: '50px',
            fontSize: '18px'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderStyle: 'solid',
                borderColor: 'lightgrey !important'
            },
            '&.Mui-focused fieldset': {
                borderStyle: 'solid'
                // borderColor: '#F2F7F2'
            }
        }
    };

    return (
        <>
            {current_column && (
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete="off"
                    className="flex flex-column pl3 pt2 pr3"
                >
                    <section className="flex flex-column mb2">
                        <div>
                            <Typography variant="h6" className="pl2 pb2">
                                Coluna selecionada
                            </Typography>
                        </div>

                        <TextField
                            label="Nome da coluna"
                            defaultValue={current_column.name}
                            inputRef={name}
                            sx={column_name_style}
                            onKeyUp={() => updateHasUnsavedDataColumn()}
                        />

                        {board_swinlanes.length > 0 && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        inputRef={show_swin_lane}
                                        sx={{ color: 'white' }}
                                        color="default"
                                        defaultChecked={
                                            current_column.showSwinLanes
                                        }
                                        onClick={(e) =>
                                            updateHasUnsavedDataColumn()
                                        }
                                    />
                                }
                                label="Mostrar com raias"
                                className="pl2"
                            />
                        )}

                        {current_column.showWip && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        inputRef={show_wip}
                                        sx={{ color: 'white' }}
                                        color="default"
                                        defaultChecked={current_column.showWip}
                                        onClick={(e) => {
                                            setIsNotHidden(e.target.checked);
                                            updateHasUnsavedDataColumn();
                                        }}
                                    />
                                }
                                label="Mostrar WIP"
                                className="pl2"
                            />
                        )}

                        {isNotHidden && (
                            <TextField
                                type="number"
                                defaultValue={
                                    current_column.wip_limit
                                        ? current_column.wip_limit
                                        : 0
                                }
                                label="Limite"
                                sx={column_name_style}
                                inputRef={wip_limit}
                                onChange={() => updateHasUnsavedDataColumn()}
                            />
                        )}

                        <Stack
                            direction="row"
                            spacing={2}
                            className="pb2 pt2 pl2"
                        >
                            <Button
                                variant="contained"
                                color="success"
                                disabled={has_unsaved_data_column}
                                onClick={() => saveColumnInfo()}
                            >
                                Salvar coluna
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                className="w-20"
                                onClick={() => {
                                    deleteCurrentColumn();
                                }}
                            >
                                Remover coluna
                            </Button>
                        </Stack>
                    </section>

                    <section className="bt b--silver pt3">
                        <div className="flex flex-column">
                            <div>
                                <Typography variant="h6" className="pl2">
                                    Ordem das subcolunas
                                </Typography>
                            </div>

                            <Stack
                                direction="row"
                                spacing={2}
                                className="pt3 pb3 pl2"
                            >
                                <Button
                                    variant="contained"
                                    color="success"
                                    className="w-25"
                                    onClick={() => {
                                        openCustomModal(CREATE_SUBCOLUMN);
                                    }}
                                >
                                    Adicionar subcoluna
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    className="w-25"
                                    disabled={
                                        !selected_subcolumn || !has_subcolumn
                                    }
                                    onClick={() =>
                                        removeCurrentSubColumn(
                                            current_subcolumn
                                        )
                                    }
                                >
                                    Remover subcoluna
                                </Button>
                            </Stack>

                            {has_subcolumn && temp_subcolumns && (
                                <div className="pl2">
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable
                                            droppableId="subcolumnDroppable"
                                            direction="horizontal"
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    style={getListStyle(
                                                        snapshot.isDraggingOver
                                                    )}
                                                    {...provided.droppableProps}
                                                >
                                                    {temp_subcolumns.map(
                                                        (group, index) => (
                                                            <TabColumnItem
                                                                column={group}
                                                                index={index}
                                                                key={index}
                                                                getItemStyle={
                                                                    getItemStyle
                                                                }
                                                                setSelectedColumn={
                                                                    setSelectedSubColumn
                                                                }
                                                            />
                                                        )
                                                    )}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </div>
                            )}

                            <hr className="mt3 mb3 w-100"></hr>

                            <div>
                                <Typography variant="h6" className="pl2">
                                    Subcoluna selecionada
                                </Typography>
                            </div>

                            {has_subcolumn && current_subcolumn && (
                                <div className="flex flex-column pt3">
                                    <TextField
                                        label="Nome da subcoluna"
                                        defaultValue={current_subcolumn.name}
                                        inputRef={subcolumn_name}
                                        sx={column_name_style}
                                        onKeyUp={() =>
                                            updateHasUnsavedDataGroup()
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        <Stack direction="row" spacing={2} className="pt3 pb3">
                            <Button
                                variant="contained"
                                color="success"
                                disabled={has_unsaved_data_group}
                                onClick={() => saveSubColumnInfo()}
                            >
                                Salvar subcoluna
                            </Button>
                        </Stack>
                    </section>
                </Box>
            )}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modal_style}
                appElement={document.getElementById('root')}
            >
                {modal_type === 'CreateSubColumn' && (
                    <CreateColumnSubColumn
                        returnResult={getModalResult}
                        modal_type={modal_type}
                        closeModal={closeModal}
                    />
                )}
            </Modal>
        </>
    );
};

TabColumnInfo.propTypes = {
    selected_column: propTypes.string,
    board_columns: propTypes.array,
    deleteColumnByPos: propTypes.func
};

export default TabColumnInfo;
