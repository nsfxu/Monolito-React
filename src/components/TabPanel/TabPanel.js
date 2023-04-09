import React from 'react';
import propTypes from 'prop-types';

/* eslint-disable */
// eslint-disable-next-line
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            className='w-100 h-auto ml1 pt3'
            style={{ backgroundColor: '#f1f1f1' }}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
};

TabPanel.propTypes = {
    children: propTypes.node,
    index: propTypes.number.isRequired,
    value: propTypes.number.isRequired
};

export default TabPanel;
