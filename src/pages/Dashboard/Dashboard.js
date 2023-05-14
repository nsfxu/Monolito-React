/* eslint-disable */
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Box } from '@mui/material';

import Navbar from '../../components/Navbar/Navbar';
import BoardList from '../../components/BoardList/BoardList';

const Dashboard = () => {
    const history = useHistory();
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');

        if (!loggedUser) {
            history.push('/login');
        }

        setUser(JSON.parse(loggedUser));
    }, []);

    return (
        <div className="flex flex-column w-100 h-100">
            {user && (
                <>
                    <div>
                        <Navbar userObject={user} />
                    </div>
                    <div className="pt5 ph1 ph5-m ph6-ns pb6">
                        <h1>Quadros</h1>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#35393C'
                            }}
                            className="br2 pa5"
                        >
                            <BoardList userObject={user} />
                        </Box>
                    </div>
                </>
            )}
        </div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
