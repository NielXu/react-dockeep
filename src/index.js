import React from 'react';
import Layout from './Layout';
import { addComponentConfig } from './configer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

export default function Doc({ children, config, url="doc" }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={`/${url}`} render={() => <Layout url={url} config={config}/>}/>
        <Route render={() => children}/>
      </Switch>
    </BrowserRouter>
  )
}

export {
  addComponentConfig,
};