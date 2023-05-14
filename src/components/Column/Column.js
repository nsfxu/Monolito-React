import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import propTypes from 'prop-types';

import { Grid } from '@mui/material';

import ModalStyles from '../../constants/modal-styles';

import CreateCard from '../CreateCard';
import NormalColumn from '../NormalColumn';
import SwinlaneHeader from '../SwinlaneHeader';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({
    columns,
    swinlanes,
    status,
    tags,
    addNewCard,
    toggleSwinlane
}) => {
    const [swinlane_columns, setSwinlaneColumns] = useState([]);
    const [columnToAddCard, setColumnToAddCard] = useState(null);

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

    const openModal = (columnName) => {
        setColumnToAddCard(columnName);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {columns &&
                    columns.map((column, index) => (
                        <Grid item key={index}>
                            {column.showSwinLanes ? (
                                <>
                                    {!isSwinlaneGroupShown && (
                                        <>
                                            <SwinlaneHeader
                                                columns={swinlane_columns}
                                                all_swinlanes={swinlanes}
                                                tags={tags}
                                                openModal={openModal}
                                                toggleSwinlane={toggleSwinlane}
                                            />
                                            {(isSwinlaneGroupShown = true)}
                                        </>
                                    )}
                                </>
                            ) : (
                                <NormalColumn
                                    key={index}
                                    this_column={column}
                                    tags={tags}
                                    openModal={openModal}
                                />
                            )}
                        </Grid>
                    ))}
            </Grid>
            <Modal
                isOpen={isModalOpen}
                style={ModalStyles.create}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
            >
                <CreateCard
                    addNewCard={addNewCard}
                    currentColumn={columnToAddCard}
                    statusArr={status}
                    tagsArr={tags}
                    swinlanesArr={swinlanes}
                />
            </Modal>
        </>
    );
};

Column.propTypes = {
    columns: propTypes.array,
    swinlanes: propTypes.array,
    status: propTypes.array,
    tags: propTypes.array,
    addNewCard: propTypes.func,
    addNewSubColumn: propTypes.func,
    toggleSwinlane: propTypes.func
};

export default Column;
