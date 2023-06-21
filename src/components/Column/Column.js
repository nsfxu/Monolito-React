import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Modal from 'react-modal';

import propTypes from 'prop-types';

import { Grid } from '@mui/material';

import ModalStyles from '../../constants/modal-styles';

import CreateCard from '../CreateCard';
import NormalColumn from '../NormalColumn';
import SwinlaneHeader from '../SwinlaneHeader';

import { createCard } from '../../services/card-service';

import {
    findColumnById,
    addObjectIntoPosition
} from '../../utils/column-utils';
import { updateCardTags } from '../../services/tags-services';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({
    toast,
    current_user_permission,
    board_info,
    columns,
    swinlanes,
    status,
    participants,
    tags,
    toggleSwinlane,
    updateBoardInfo,
    getInfoByBoardId
}) => {
    const [swinlane_columns, setSwinlaneColumns] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    let isSwinlaneGroupShown = false;

    useEffect(() => {
        separateColumns();
    }, [columns]);

    const separateColumns = () => {
        const temp_swinlane_columns = [];

        if (columns.length > 0) {
            columns.map((column) => {
                column.showSwinLanes && temp_swinlane_columns.push(column);
            });
        }

        setSwinlaneColumns(temp_swinlane_columns);
    };

    const openModal = () => {
        if (current_user_permission == 3) {
            toast('Convidados não podem criar cards.');
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addNewCard = async (currentColumn, new_card) => {
        const items = board_info;

        const response = await createCard(
            new_card.title,
            new_card.description,
            new_card.expectedDate,
            new_card.groupId,
            new_card.person,
            new_card.laneId
        );

        if (response.error) {
            toast('Aconteceu algum erro ao adicionar o card');

            return;
        }

        const card_object = {
            id: response.result.id_card,
            id_group: new_card.groupId,
            name: new_card.title,
            description: new_card.description,
            creationDate: new_card.creationDate,
            expectedDate: new_card.expectedDate
                ? dayjs(new_card.expectedDate).format('DD/MM/YYYY')
                : null,
            id_tags: new_card.tags,
            id_user: new_card.person,
            laneId: new_card.laneId
        };

        console.log(card_object);

        const tag_result = await updateCardTags(card_object.id, new_card.tags);

        if (currentColumn.showSwinLanes) {
            card_object.laneId = new_card.laneId;
        }

        const column_to_add = findColumnById(items, new_card.columnId);

        if (new_card.groupId) {
            const groupIndex = column_to_add.groups.findIndex((group) => {
                return group.id == new_card.groupId;
            });

            addObjectIntoPosition(
                column_to_add.groups[parseInt(groupIndex)],
                0,
                card_object
            );
        } else {
            addObjectIntoPosition(column_to_add.groups[0], 0, card_object);
        }

        // forceUpdate();
        toast('Card criado com sucesso.');
        updateBoardInfo(items);
    };

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                style={{
                    flexWrap: 'nowrap',
                    width: '100%'
                }}
            >
                {columns &&
                    columns.map((column, index) => (
                        <Grid item key={index}>
                            {column.showSwinLanes ? (
                                <>
                                    {!isSwinlaneGroupShown && (
                                        <>
                                            <SwinlaneHeader
                                                toast={toast}
                                                current_user_permission={current_user_permission}
                                                columns={swinlane_columns}
                                                all_swinlanes={swinlanes}
                                                tags={tags}
                                                swinlanes={swinlanes}
                                                status={columns}
                                                participants={participants}
                                                openModal={openModal}
                                                toggleSwinlane={toggleSwinlane}
                                                getInfoByBoardId={
                                                    getInfoByBoardId
                                                }
                                            />
                                            {(isSwinlaneGroupShown = true)}
                                        </>
                                    )}
                                </>
                            ) : (
                                <NormalColumn
                                    key={index}
                                    toast={toast}
                                    current_user_permission={current_user_permission}
                                    this_column={column}
                                    tags={tags}
                                    swinlanes={swinlanes}
                                    status={columns}
                                    participants={participants}
                                    openModal={openModal}
                                    getInfoByBoardId={getInfoByBoardId}
                                />
                            )}
                        </Grid>
                    ))}
            </Grid>
            <Modal
                isOpen={isModalOpen}
                style={ModalStyles.createCard}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
            >
                <CreateCard
                    board_info={board_info}
                    columns={columns}
                    participants={participants}
                    statusArr={status}
                    tagsArr={tags}
                    swinlanesArr={swinlanes}
                    closeModal={closeModal}
                    addNewCard={addNewCard}
                    toast={toast}
                />
            </Modal>
        </>
    );
};

Column.propTypes = {
    board_info: propTypes.object,
    columns: propTypes.array,
    swinlanes: propTypes.array,
    status: propTypes.array,
    participants: propTypes.array,
    tags: propTypes.array,
    addNewSubColumn: propTypes.func,
    toggleSwinlane: propTypes.func,
    updateBoardInfo: propTypes.func
};

export default Column;
