import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Chip } from '@mui/material';

/* eslint-disable */
// eslint-disable-next-line
const TabTagConfig = ({ board_tags }) => {
    const [temp_tags, setTempTags] = useState(board_tags);
    const [selected_tag, setSelectedTag] = useState(null);

    console.log(temp_tags);
    return (
        <>
            <section className="flex flex-column ma3 h-100">
                <h2>Tags</h2>
                <div className="flex flex-row flex-wrap ba pa3 w-100">
                    {board_tags &&
                        board_tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag.name}
                                onClick={() => console.log(tag.id)}
                                sx={JSON.parse(tag.style)}
                            />
                        ))}
                </div>
            </section>
        </>
    );
};

TabTagConfig.propTypes = {
    board_tags: propTypes.array
};

export default TabTagConfig;
