import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';

import { Tab, Tabs, Box, Typography, Button } from '@mui/material';

import TabPanel from '../TabPanel';
import TabColumnConfig from '../TabColumnConfig/TabColumnConfig';
import TabSwinlaneConfig from '../TabSwinlaneConfig/TabSwinlaneConfig';
import TabMemberConfig from '../TabMemberConfig/TabMemberConfig';

const SECTION_TITLE_COLOR = 'white';
const TAB_PANEL_BACKGROUND = '#4D5156';
const TAB_PANEL_TEXT_COLOR = 'white';

/* eslint-disable */
// eslint-disable-next-line
const ConfigBoardModal = ({
    board_id,
    board_info,
    participants,
    closeModal,
    updateWithNewBoardInfo,
    updateParticipants
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

    const updateNewBoardSwinlanes = (new_board_swinlanes) => {
        board_info.swinlanes = new_board_swinlanes;
        updateWithNewBoardInfo(board_info);
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`
        };
    }

    return (
        <section className="flex flex-column ma3 h-100">
            <Typography variant="h4">Configurações do quadro</Typography>

            <hr className="mt3 mb3 w-100" style={{ borderColor: 'grey' }}></hr>

            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: '#43474C',
                    display: 'flex',
                    height: '980px'
                }}
                className="br1 h-100"
            >
                <Tabs
                    className="ml2"
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                >
                    <Tab
                        sx={{ color: SECTION_TITLE_COLOR }}
                        label="Colunas/Subcolunas"
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{ color: SECTION_TITLE_COLOR }}
                        label="Raias"
                        {...a11yProps(1)}
                    />
                    <Tab
                        sx={{ color: SECTION_TITLE_COLOR }}
                        label="Etiquetas"
                        {...a11yProps(2)}
                    />
                    <Tab
                        sx={{ color: SECTION_TITLE_COLOR }}
                        label="Membros"
                        {...a11yProps(3)}
                    />
                    <Tab
                        sx={{ color: SECTION_TITLE_COLOR }}
                        label="Quadro"
                        {...a11yProps(4)}
                    />
                </Tabs>
                <TabPanel
                    value={value}
                    index={0}
                    style={{
                        backgroundColor: TAB_PANEL_BACKGROUND,
                        color: TAB_PANEL_TEXT_COLOR
                    }}
                >
                    <TabColumnConfig
                        board_id={board_id}
                        board_columns={board_info.columns}
                        board_swinlanes={board_info.swinlanes}
                        updateNewBoardColumns={updateNewBoardColumns}
                    />
                </TabPanel>
                <TabPanel
                    value={value}
                    index={1}
                    style={{
                        backgroundColor: TAB_PANEL_BACKGROUND,
                        color: TAB_PANEL_TEXT_COLOR
                    }}
                >
                    <TabSwinlaneConfig
                        board_id={board_id}
                        board_swinlanes={board_info.swinlanes}
                        updateNewBoardSwinlanes={updateNewBoardSwinlanes}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Tags
                </TabPanel>
                <TabPanel
                    value={value}
                    index={3}
                    style={{
                        backgroundColor: TAB_PANEL_BACKGROUND,
                        color: TAB_PANEL_TEXT_COLOR
                    }}
                >
                    <TabMemberConfig
                        participants={participants}
                        updateParticipants={updateParticipants}
                    />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Board
                </TabPanel>
            </Box>

            <div className="pt3">
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        closeModal();
                    }}
                >
                    Fechar
                </Button>
            </div>
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
