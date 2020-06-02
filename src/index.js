import React from 'react';
import Layout from './Layout';
import { initConfiger, addConfig } from './configer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

export default function({ children, config, url="cview" }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={`/${url}`} render={() => <Layout url={url} config={config}/>}/>
        <Route render={() => children}/>
      </Switch>
    </BrowserRouter>
  )
}

export { initConfiger, addConfig };