import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from '../components/Home/container';
import SignUp from '../components/Auth/containers';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/todos" component={Home} />
        <Route path="*" component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
