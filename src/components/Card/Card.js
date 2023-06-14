import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import {
    Card as MUICard,
    CardHeader,
    CardContent,
    Avatar,
    Stack,
    Chip
} from '@mui/material';

import { blueGrey } from '@mui/material/colors';

import Modal from 'react-modal';
import ShowCard from '../ShowCard';

import ModalStyles from '../../constants/modal-styles';

/* eslint-disable */
// eslint-disable-next-line
const Card = ({
    object,
    tagsArr,
    swinlanes,
    status,
    participants,
    getInfoByBoardId
}) => {
    // console.log(object);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardTags, setCardTags] = useState([]);
    const [responsibleName, setResponsibleName] = useState('');

    useEffect(() => {
        getAllCardTags();
    }, [tagsArr]);

    useEffect(() => {
        if (!participants.length > 0 || !object) return;
        const this_card_user = participants.find(
            (user) => object.id_user == user.id_user
        );

        if (object.id_user == 1 || !this_card_user.name) {
            setResponsibleName('?');

            return;
        }

        setResponsibleName(this_card_user.name);
    }, [participants, object]);

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
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        let validated_name = name.toUpperCase().split(' ');

        if (validated_name.length > 1) {
            validated_name = `${name.toUpperCase().split(' ')[0][0]}${
                name.toUpperCase().split(' ')[1][0]
            }`;
        } else {
            validated_name = name.toUpperCase().split(' ')[0][0];
        }

        return {
            sx: {
                bgcolor: stringToColor(name),
                width: 32,
                height: 32
            },
            children: validated_name
        };
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <MUICard
                sx={{ maxWidth: 240, minWidth: 240, bgcolor: blueGrey[900] }}
                variant="outlined"
                onClick={() => openModal()}
            >
                <CardHeader
                    sx={{ color: '#f9f9f9' }}
                    avatar={
                        <Avatar
                            {...stringAvatar(responsibleName)}
                            aria-label="recipe"
                        />
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
                style={ModalStyles.createCard}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
            >
                <ShowCard
                    cardObj={object}
                    participants={participants}
                    swinlanes={swinlanes}
                    status={status}
                    tagsArr={tagsArr}
                    closeModal={closeModal}
                    getInfoByBoardId={getInfoByBoardId}
                />
            </Modal>
        </>
    );
};

Card.propTypes = {
    object: propTypes.object,
    tagsArr: propTypes.array,
    participants: propTypes.array
};

export default Card;
