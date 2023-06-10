import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';

import { Tab, Tabs, Box } from '@mui/material';

import TabPanel from '../TabPanel';
import TabColumnConfig from '../TabColumnConfig/TabColumnConfig';
import TabSwinlaneConfig from '../TabSwinlaneConfig/TabSwinlaneConfig';

/* eslint-disable */
// eslint-disable-next-line
const ConfigBoardModal = ({
    board_id,
    board_info,
    closeModal,
    updateWithNewBoardInfo
}) => {
    const [value, setValue] = useState(0);
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const updateNewBoardColumns = (new_board_columns) => {
        board_info.columns = new_board_columns;
        updateWithNewBoardInfo(board_info);
    };


    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`
        };
    }

    return (
        <section>
            <button
                onClick={() => {
                    closeModal();
                }}
            >
                Fechar
            </button>
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    height: '550'
                }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                >
                    <Tab label="Colunas/Subcolunas" {...a11yProps(0)} />
                    <Tab label="Raias" {...a11yProps(1)} />
                    <Tab label="Etiquetas" {...a11yProps(2)} />
                    <Tab label="Membros" {...a11yProps(3)} />
                    <Tab label="Quadro" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <TabColumnConfig
                        board_id={board_id}
                        board_columns={board_info.columns}
                        board_swinlanes={board_info.swinlanes}
                        updateNewBoardColumns={updateNewBoardColumns}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TabSwinlaneConfig board_swinlanes={board_info.swinlanes} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Membros
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Board
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                    Item Seven
                </TabPanel>
            </Box>
        </section>
    );
};

ConfigBoardModal.propTypes = {
    board_id: propTypes.number,
    board_info: propTypes.object,
    closeModal: propTypes.func,
    updateWithNewBoardInfo: propTypes.func
};

export default ConfigBoardModal;
