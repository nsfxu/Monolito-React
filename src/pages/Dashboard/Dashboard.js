/* eslint-disable */
// eslint-disable-next-line
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const Dashboard = () => {
    const history = useHistory();

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');

        if (!loggedUser) {
            history.push('/login');
        }

        console.log(JSON.parse(loggedUser));
    }, []);

    return (
        <div className="ph1 ph4-m ph5-ns pb5 flex flex-row w-100 h-100">
            <h1>Dashboard</h1>
        </div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
