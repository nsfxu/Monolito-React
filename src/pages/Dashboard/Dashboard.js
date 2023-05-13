/* eslint-disable */
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Navbar from '../../components/Navbar/Navbar';

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
        <div className="flex flex-column ph1 ph4-m ph5-ns pb5 w-100 h-100">
            {user && (
                <>
                    <div>
                        <Navbar userObject={user} />
                    </div>
                    <h1>Dashboard</h1>
                </>
            )}
        </div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
