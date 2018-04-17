import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from '../components/Home/container';
import DnD from '../playgound/index';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dnd" component={DnD} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
