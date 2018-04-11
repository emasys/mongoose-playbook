import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from '../components/Home';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
