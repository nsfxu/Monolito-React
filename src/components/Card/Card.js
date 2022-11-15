import React, { useEffect, useState } from 'react';

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
const Card = ({ object, tagsArr }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardTags, setCardTags] = useState([]);

    useEffect(() => {
        getAllCardTags();
    }, [tagsArr]);

    const getAllCardTags = () => {
        let tempTagsArr = [];
        const card_tags = object.tags;

        if (tagsArr && card_tags && card_tags.length > 0) {
            card_tags?.map((id) => {
                tagsArr.map((tag) => {
                    tag.id === id && tempTagsArr.push(tag);
                });
            });
        }

        setCardTags(tempTagsArr);
        console.log(tempTagsArr);
    };

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
                    <Stack
                        direction="row"
                        spacing={0}
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                        {cardTags.length > 0 &&
                            cardTags.map(
                                ({
                                    id,
                                    label,
                                    size,
                                    variant,
                                    textColor,
                                    bgColor,
                                    borderColor
                                }) => (
                                    <Chip
                                        key={id}
                                        label={label}
                                        size={size}
                                        variant={variant}
                                        sx={{
                                            color: textColor,
                                            backgroundColor: bgColor,
                                            borderColor: borderColor
                                        }}
                                    />
                                )
                            )}
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
    object: propTypes.object,
    tagsArr: propTypes.array
};

export default Card;
