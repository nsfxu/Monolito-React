import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import propTypes from 'prop-types';

import ModalStyles from '../../constants/modal-styles';

import CreateCard from '../CreateCard';
import NormalColumn from '../NormalColumn';

/* eslint-disable */
// eslint-disable-next-line
const Column = ({ columns, status, tags, addNewCard, addNewSubColumn }) => {
    const [normal_columns, setNormalColumns] = useState([]);
    const [swinlane_columns, setSwinlaneColumns] = useState([]);
    const [columnToAddCard, setColumnToAddCard] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        separateColumns();
    }, [columns]);

    useEffect(() => {
        console.log(swinlane_columns);
    }, [swinlane_columns]);

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

    const handleChange = (panel) => {
        setExpanded(panel);
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
    columns: propTypes.any,
    status: propTypes.array,
    tags: propTypes.array,
    addNewCard: propTypes.func,
    addNewSubColumn: propTypes.func
};

export default Column;
