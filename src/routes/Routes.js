import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RoutesPath from '../constants/routes-path';

import HomePage from '../pages/Home';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={RoutesPath.HOME.PATH} component={HomePage} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
