import React, { useState } from 'react';

import {
    Card as MUICard,
    CardHeader,
    CardContent,
    Avatar,
    Stack,
    Chip
} from '@mui/material';

import { red, blueGrey } from '@mui/material/colors';

import propTypes from 'prop-types';

import Modal from 'react-modal';
import ShowCard from '../ShowCard';

/* eslint-disable */
// eslint-disable-next-line
const Card = ({ object }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <MUICard
                sx={{ maxWidth: 240, bgcolor: blueGrey[900] }}
                variant="outlined"
                onClick={() => openModal()}
            >
                <CardHeader
                    sx={{ color: '#f9f9f9' }}
                    avatar={
                        <Avatar
                            sx={{ bgcolor: red[500], width: 32, height: 32 }}
                            aria-label="recipe"
                        >
                            GF
                        </Avatar>
                    }
                    title={object.name}
                />
                <CardContent>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label="primary"
                            color="primary"
                            variant="outlined"
                            size="small"
                        />
                        <Chip
                            size="small"
                            label="success"
                            color="success"
                            variant="outlined"
                        />
                    </Stack>
                </CardContent>
            </MUICard>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
            >
                <ShowCard object={object} />
            </Modal>
        </>
    );
};

Card.propTypes = {
    object: propTypes.object
};

export default Card;
