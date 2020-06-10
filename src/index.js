import React from 'react';
import Layout from './Layout';
import { addComponentConfig } from './configer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { renderExample } from '../example/index.example';
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

// Local examples
if(process.env.NODE_ENV === 'local') {
  renderExample();
}

export {
  addComponentConfig,
};