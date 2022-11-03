import React from 'react';
import propTypes from 'prop-types';

import { BsFillGrid3X2GapFill } from 'react-icons/bs';

/* eslint-disable */
// eslint-disable-next-line
const LaneOption = ({ object }) => {
    return (
        <div className="flex flex-row ba b--gray b--dashed pa2 mt3">
            <div className="flex justify-start align-center br b--gray pr1">
                <BsFillGrid3X2GapFill />
            </div>
            <div className="flex justify-start align-center pl2">
                {object.name}
            </div>
        </div>
    );
};

LaneOption.propTypes = {
    object: propTypes.object
};

export default LaneOption;
