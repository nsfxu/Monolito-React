/* eslint-disable */
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Modal from 'react-modal';
import { createBoard } from '../../services/board-service';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { Box } from '@mui/material';

import Navbar from '../../components/Navbar/Navbar';
import BoardList from '../../components/BoardList/BoardList';

import ModalStyles from '../../constants/modal-styles';
import CreateBoard from '../../components/CreateBoard';

const Dashboard = () => {
    const history = useHistory();
    const [user, setUser] = useState(undefined);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');

        if (!loggedUser) {
            history.push('/login');
        }

        setUser(JSON.parse(loggedUser));
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const requestCreateBoard = async (name, description) => {
        const response = await createBoard(user.id_user, name, description);

        if (!response.error) {
            window.location.reload(true);
        }
    };

    return (
        <>
            <div className="flex flex-column w-100 h-100">
                {user && (
                    <>
                        <div>
                            <Navbar userObject={user} />
                        </div>
                        <div className="pt5 ph1 ph5-m ph6-ns pb6">
                            <h1>Quadros</h1>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#35393C'
                                }}
                                className="br2 pa5"
                            >
                                <BoardList
                                    userObject={user}
                                    openModal={openModal}
                                />
                            </Box>
                        </div>
                    </>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                style={ModalStyles.createCard}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
            >
                <CreateBoard
                    closeModal={closeModal}
                    requestCreateBoard={requestCreateBoard}
                    toast={toast}
                />
            </Modal>
            <ToastContainer />
        </>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
