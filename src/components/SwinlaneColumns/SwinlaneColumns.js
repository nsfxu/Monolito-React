import React from 'react';

import propTypes from 'prop-types';

import SwinlaneHeader from '../SwinlaneHeader';

/* eslint-disable */
// eslint-disable-next-line
const SwinlaneColumns = ({
    swinlane_columns,
    tags,
    all_swinlanes,
    toggleSwinlane
}) => {
    return (
        <>
            {
                <SwinlaneHeader
                    columns={swinlane_columns}
                    all_swinlanes={all_swinlanes}
                    tags={tags}
                    toggleSwinlane={toggleSwinlane}
                />
            }
        </>
    );
};

SwinlaneColumns.propTypes = {
    swinlane_columns: propTypes.array,
    tags: propTypes.array,
    all_swinlanes: propTypes.array,
    toggleSwinlane: propTypes.func
};

export default SwinlaneColumns;
