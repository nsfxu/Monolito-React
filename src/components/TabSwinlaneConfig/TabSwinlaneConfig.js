import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Button, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import CreateSwinlane from '../CreateSwinlane';

import TabColumn from '../TabColumn';
import {
    createSwinlane,
    deleteSwinlane,
    updateOrder
} from '../../services/swinlane-service';
import TabSwinlaneInfo from '../TabSwinlaneInfo/TabSwinlaneInfo';

const CREATE_SWINLANE = 'CreateSwinlane';

/* eslint-disable */
// eslint-disable-next-line
const TabSwinlaneConfig = ({
    board_id,
    board_swinlanes,
    updateNewBoardSwinlanes
}) => {
    const [temp_swinlanes, setTempSwinlanes] = useState(board_swinlanes);

    const [selected_swinlane, setSelectedSwinlane] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal_type, setModalType] = useState(null);
    const [modal_style, setModalStyle] = useState(null);

    //#region Modal stuff

    const openCustomModal = (modal) => {
        if (modal === CREATE_SWINLANE) {
            setModalType(modal);
            setModalStyle(ModalStyles.createSwinlane);
        }

        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getModalResult = async (result, modal_type) => {
        switch (modal_type) {
            case CREATE_SWINLANE:
                const swinlane_response = await createSwinlane(
                    board_id,
                    result
                );

                if (swinlane_response.error) {
                    return;
                }

                const new_swinlane = {
                    id: swinlane_response.result.id_swinlane,
                    name: result,
                    styles: swinlane_response.result.styles
                };

                board_swinlanes.push(new_swinlane);

                await updateNewBoardSwinlanes(board_swinlanes);
                await setTempSwinlanes(board_swinlanes);

                break;

            default:
                return;
        }
    };

    //#endregion

    useEffect(() => {
        console.log(selected_swinlane);
    }, [selected_swinlane]);

    const grid = 8;

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            temp_swinlanes,
            result.source.index,
            result.destination.index
        );

        setTempSwinlanes(items);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#565B61' : '#565B61',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'white',
        fontSize: '16px'
    }));

    const getItemStyle = (style, isDragging, draggableStyle) => {
        let default_item_color = '#565B61';
        let default_text_color = 'white';

        if (style) {
            const this_swinlane_style = JSON.parse(style);

            default_item_color = this_swinlane_style.color;
            default_text_color = this_swinlane_style.textColor;
        }

        return {
            // some basic styles to make the items look a bit nicer
            userSelect: 'none',
            padding: grid * 2,
            margin: `0 ${grid}px 0 0`,

            // change background colour if dragging
            background: isDragging ? 'lightgrey' : default_item_color,
            color: default_text_color,

            // styles we need to apply on draggables
            ...draggableStyle
        };
    };

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : '#35393C',
        display: 'flex',
        padding: grid,
        overflow: 'auto'
    });

    const getNewOrderForApi = () => {
        let result = [];

        temp_swinlanes?.map((swinlane) => {
            result.push({ id: swinlane.id, name: swinlane.name });
        });

        return result;
    };

    const getFinalColumnResult = () => {
        let result = [];

        temp_swinlanes?.map((swinlane) => {
            result.push(swinlane);
        });

        return result;
    };

    const saveNewSwinlaneOrder = async () => {
        const new_order = getNewOrderForApi();
        const new_order_swinlanes = getFinalColumnResult();

        await updateOrder(board_id, new_order);
        updateNewBoardSwinlanes(new_order_swinlanes);
    };

    const deleteThisSwinlane = async (pos) => {
        const removed_swinlane = board_swinlanes.splice(pos, 1);

        await deleteSwinlane(removed_swinlane[0].id);

        updateNewBoardSwinlanes(board_swinlanes);
    };

    return (
        <>
            <section className="flex flex-column ma3 h-100">
                <div>
                    <Typography variant="h6" className="pb3">
                        Ordem das raias
                    </Typography>
                </div>
                <div className="self-start pb3">
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                openCustomModal(CREATE_SWINLANE);
                            }}
                        >
                            Criar raia
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            // disabled={has_unsaved_data}
                            onClick={() => saveNewSwinlaneOrder()}
                        >
                            Salvar ordem
                        </Button>
                    </Stack>
                </div>
                <div>
                    {temp_swinlanes.length > 0 ? (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="swinlaneConfigTab">
                                {(provided, snapshot) => (
                                    <Stack
                                        direction="column"
                                        divider={
                                            <Divider
                                                orientation="horizontal"
                                                flexItem
                                            />
                                        }
                                        spacing={3}
                                        className="list flex flex-column w-100 pl3 pr4 pa3"
                                        style={getListStyle(
                                            snapshot.isDraggingOver
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {temp_swinlanes.map(
                                            (swinlane, index) => (
                                                <Draggable
                                                    key={swinlane.id}
                                                    draggableId={`${swinlane.id}`}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <Item
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                swinlane.style,
                                                                snapshot.isDragging,
                                                                provided
                                                                    .draggableProps
                                                                    .style
                                                            )}
                                                            onClick={() => {
                                                                setSelectedSwinlane(
                                                                    `${swinlane.id}`
                                                                );
                                                            }}
                                                        >
                                                            <TabColumn
                                                                column_info={
                                                                    swinlane
                                                                }
                                                            />
                                                            {
                                                                provided.placeholder
                                                            }
                                                        </Item>
                                                    )}
                                                </Draggable>
                                            )
                                        )}
                                        {provided.placeholder}
                                    </Stack>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : (
                        <p>Você ainda não tem uma raia feita.</p>
                    )}
                </div>

                <hr className="mt3 mb3 w-100"></hr>

                {selected_swinlane ? (
                    <TabSwinlaneInfo
                        selected_swinlane={selected_swinlane}
                        board_swinlanes={board_swinlanes}
                        deleteThisSwinlane={deleteThisSwinlane}
                    />
                ) : (
                    'Clique em um item para editar suas propriedades.'
                )}
            </section>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modal_style}
                appElement={document.getElementById('root')}
            >
                {modal_type === 'CreateSwinlane' && (
                    <CreateSwinlane
                        returnResult={getModalResult}
                        modal_type={modal_type}
                        closeModal={closeModal}
                    />
                )}
            </Modal>
        </>
    );
};

TabSwinlaneConfig.propTypes = {
    board_id: propTypes.number,
    board_swinlanes: propTypes.array,
    updateNewBoardSwinlanes: propTypes.func
};

export default TabSwinlaneConfig;
