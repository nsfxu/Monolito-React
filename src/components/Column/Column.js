import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import propTypes from 'prop-types';

import ModalStyles from '../../constants/modal-styles';

import CreateCard from '../CreateCard';
import NormalColumn from '../NormalColumn';
import SwinlaneColumns from '../SwinlaneColumns';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({ columns, swinlanes, status, tags, addNewCard, addNewSubColumn, toggleSwinlane }) => {
    const [normal_columns, setNormalColumns] = useState([]);
    const [swinlane_columns, setSwinlaneColumns] = useState([]);
    const [columnToAddCard, setColumnToAddCard] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        separateColumns();
    }, [columns]);

    const separateColumns = () => {
        const temp_swinlane_columns = [];
        const temp_normal_columns = [];

        if (columns.length > 0) {
            columns.map((column) => {
                column.showSwinLanes
                    ? temp_swinlane_columns.push(column)
                    : temp_normal_columns.push(column);
            });
        }

        setNormalColumns(temp_normal_columns);
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
            {normal_columns.map((column, index) => (
                <NormalColumn
                    key={index}
                    this_column={column}
                    tags={tags}
                    openModal={openModal}
                    addNewSubColumn={addNewSubColumn}
                />
            ))}

            {swinlane_columns && (
                <SwinlaneColumns swinlane_columns={swinlane_columns} tags={tags} all_swinlanes={swinlanes} toggleSwinlane={toggleSwinlane} />
            )}

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
