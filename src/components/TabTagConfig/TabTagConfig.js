import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Button, Chip, Stack } from '@mui/material';
import TabTagInfo from '../TabTagInfo/TabTagInfo';

/* eslint-disable */
// eslint-disable-next-line
const TabTagConfig = ({ board_tags, updateNewBoardTags }) => {
    const [temp_tags, setTempTags] = useState(board_tags);
    const [selected_tag, setSelectedTag] = useState(null);

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
                    <Button color="success" variant="contained">
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
                                sx={JSON.parse(tag.style)}
                            />
                        ))}
                </div>
                <div className="bt mt3">
                    {selected_tag ? (
                        <TabTagInfo
                            selected_tag={selected_tag}
                            updateTagsInfo={updateTagsInfo}
                        />
                    ) : (
                        <p>Selecione uma etiqueta para editar</p>
                    )}
                </div>
            </section>
        </>
    );
};

TabTagConfig.propTypes = {
    board_tags: propTypes.array
};

export default TabTagConfig;
