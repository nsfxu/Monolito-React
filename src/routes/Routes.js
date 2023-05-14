import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RoutesPath from '../constants/routes-path';

import HomePage from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Logout from '../pages/Logout';
import Board from '../pages/Board';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={RoutesPath.HOME.PATH} component={HomePage} />
            <Route exact path={RoutesPath.LOGIN.PATH} component={Login} />
            <Route exact path={RoutesPath.REGISTER.PATH} component={Register} />
            <Route exact path={RoutesPath.DASHBOARD.PATH} component={Dashboard} />
            <Route exact path={RoutesPath.LOGOUT.PATH} component={Logout} />
            <Route exact path={RoutesPath.BOARD.PATH} component={Board} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
