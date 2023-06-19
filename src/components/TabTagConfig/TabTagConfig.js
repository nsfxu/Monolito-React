import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
/* eslint-disable */
// eslint-disable-next-line
import { Button, Chip, Stack } from '@mui/material';

import Modal from 'react-modal';
import ModalStyles from '../../constants/modal-styles';

import TabTagInfo from '../TabTagInfo/TabTagInfo';
import CreateTag from '../CreateTag';
import { createTag, deleteTag } from '../../services/tags-services';

const CREATE_TAG = 'CreateTag';

const TabTagConfig = ({ board_id, board_tags, updateNewBoardTags }) => {
    const [temp_tags, setTempTags] = useState(board_tags);
    const [selected_tag, setSelectedTag] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal_type, setModalType] = useState(null);
    const [modal_style, setModalStyle] = useState(null);

    //#region Modal stuff

    const openCustomModal = (modal) => {
        if (modal === CREATE_TAG) {
            setModalType(modal);
            setModalStyle(ModalStyles.createTag);
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
            case CREATE_TAG:
                const default_style = {
                    backgroundColor: '#565B61',
                    color: '#FFFFFF'
                };

                const tag_response = await createTag(
                    board_id,
                    result,
                    default_style
                );

                if (tag_response.error) {
                    return;
                }

                const new_tag = {
                    id: tag_response.result.id,
                    name: result,
                    style: JSON.stringify(default_style)
                };

                board_tags.push(new_tag);

                await updateNewBoardTags(board_tags);
                await setTempTags(board_tags);

                break;

            default:
                return;
        }
    };

    //#endregion

    const setSelectedTagById = (this_id) => {
        console.log(this_id);

        board_tags.map((tag) => {
            if (tag.id == this_id) {
                setSelectedTag(tag);

                return;
            }
        });
    };

    const updateTagsInfo = (this_tag, name, style) => {
        const temp_tags = [...board_tags];

        temp_tags.map((tag) => {
            if (tag.id == this_tag) {
                tag.name = name;
                tag.style = JSON.stringify(style);

                return;
            }
        });

        updateNewBoardTags(temp_tags);
    };

    const deleteThisTag = async (obj) => {
        const pos = board_tags.indexOf(obj);
        const removed_tag = board_tags.splice(pos, 1);

        if (removed_tag.length > 0) {
            await deleteTag(removed_tag[0].id);
            updateNewBoardTags(board_tags);
        }
    };

    useEffect(() => {
        if (selected_tag) {
            console.log(selected_tag);
        }
    }, [selected_tag]);

    console.log(temp_tags);
    return (
        <>
            <section className="flex flex-column ma3 h-100">
                <h2>Etiquetas</h2>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            openCustomModal(CREATE_TAG);
                        }}
                    >
                        Criar Etiqueta
                    </Button>
                </Stack>
                <div className="flex flex-row flex-wrap ba pa3 mt2 w-100">
                    {board_tags &&
                        board_tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag.name}
                                onClick={async () => {
                                    await setSelectedTag(null);
                                    setSelectedTagById(tag.id);
                                }}
                                sx={tag.style ? JSON.parse(tag.style) : ''}
                            />
                        ))}
                </div>
                <div className="bt mt3">
                    {selected_tag ? (
                        <TabTagInfo
                            selected_tag={selected_tag}
                            updateTagsInfo={updateTagsInfo}
                            deleteThisTag={deleteThisTag}
                        />
                    ) : (
                        <p>Selecione uma etiqueta para editar</p>
                    )}
                </div>
            </section>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modal_style}
                appElement={document.getElementById('root')}
            >
                {modal_type === 'CreateTag' && (
                    <CreateTag
                        returnResult={getModalResult}
                        modal_type={modal_type}
                        closeModal={closeModal}
                    />
                )}
            </Modal>
        </>
    );
};

TabTagConfig.propTypes = {
    board_tags: propTypes.array
};

export default TabTagConfig;
