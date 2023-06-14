import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import {
    Card as MUICard,
    CardHeader,
    CardContent,
    Avatar,
    Stack,
    Chip,
    Select,
    MenuItem,
    Typography
} from '@mui/material';

import { blueGrey } from '@mui/material/colors';

import Modal from 'react-modal';
import ShowCard from '../ShowCard';

import ModalStyles from '../../constants/modal-styles';
import { updateCardGroup } from '../../services/card-service';

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
    object.id == 13 ? console.log(object, status) : '';

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [cardTags, setCardTags] = useState([]);
    const [responsibleName, setResponsibleName] = useState('');
    const [id_column, setIdColumn] = useState(null);

    useEffect(() => {
        getAllCardTags();
    }, [tagsArr]);

    useEffect(() => {
        if (!participants || !participants.length > 0 || !object) return;
        const this_card_user = participants.find(
            (user) => object.id_user == user.id_user
        );

        if (object.id_user == 1 || !this_card_user.name) {
            setResponsibleName('?');

            return;
        }

        setResponsibleName(this_card_user.name);
    }, [participants, object]);

    useEffect(() => {
        if (cardTags.length > 0) {
            console.log(cardTags);
        }
    }, [cardTags]);

    useEffect(() => {
        if (status) {
            status.map((column) => {
                column.groups.map((group) => {
                    if (group.id == object.id_group) {
                        setIdColumn(column.id);
                    }
                });
            });
        }
    }, [status]);

    const getAllCardTags = () => {
        let tempTagsArr = [];
        const card_tags = object.id_tags;

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

    const handleChangeColumn = async (e) => {
        const new_column_id = e.target.value;

        let temp_swinlane = null;
        let id_first_group = null;

        status.map((column) => {
            if (column.id == new_column_id) {
                if (column.showSwinLanes && swinlanes.length > 0) {
                    temp_swinlane = swinlanes[0].id;
                }

                id_first_group = column.groups[0].id;

                return;
            }
        });

        if (id_first_group) {
            const card_response = await updateCardGroup(
                object.id,
                0,
                0,
                id_first_group,
                temp_swinlane
            );
        }
        setIdColumn(new_column_id);

        getInfoByBoardId();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const selectStyle = {
        height: '30px',
        label: { color: '#ff0000' },
        color: 'white',
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'lightgrey'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
        },
        '.MuiSvgIcon-root ': {
            fill: 'white !important'
        }
    };

    return (
        <>
            <MUICard
                sx={{ maxWidth: 240, minWidth: 240, bgcolor: blueGrey[900] }}
                variant="outlined"
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
                    onClick={() => openModal()}
                />
                <CardContent>
                    <Stack
                        direction="column"
                        spacing={3}
                        className="w-100 h-100"
                    >
                        <div>
                            {id_column && (
                                <Select
                                    sx={selectStyle}
                                    value={id_column}
                                    className="w-100"
                                    onChange={handleChangeColumn}
                                >
                                    {status?.map(({ id, name }, index) => (
                                        <MenuItem value={id} key={index}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </div>
                        <div>
                            <Typography
                                variant="body2"
                                style={{ color: 'white' }}
                            >
                                Data de criação: {object.creationDate}
                            </Typography>
                        </div>
                        {cardTags && cardTags.length > 0 && (
                            <div>
                                <Stack
                                    direction="row"
                                    spacing={0}
                                    sx={{ flexWrap: 'wrap', gap: 1 }}
                                >
                                    {cardTags.length > 0 &&
                                        cardTags.map(({ id, name, style }) => (
                                            <Chip
                                                key={id}
                                                label={name}
                                                // size={size}
                                                // variant={variant}
                                                sx={JSON.parse(style)}
                                            />
                                        ))}
                                </Stack>
                            </div>
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
