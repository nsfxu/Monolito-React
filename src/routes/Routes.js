import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RoutesPath from '../constants/routes-path';

import HomePage from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={RoutesPath.HOME.PATH} component={HomePage} />
            <Route exact path={RoutesPath.LOGIN.PATH} component={Login} />
            <Route exact path={RoutesPath.REGISTER.PATH} component={Register} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
