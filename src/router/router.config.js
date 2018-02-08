import React from 'react';
import { Route } from 'react-router-dom';
import Home from '@homeView/Home';  // eslint-disable-line
// import Login from '@homeView/login';  // eslint-disable-line
import Test from '@views/test'; // eslint-disable-line

export default () => [
  <Route path="/home" component={Home} key="Home" />,
  <Route path="/test" component={Test} key="test" />,
];
