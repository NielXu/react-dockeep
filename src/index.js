import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import { initConfiger, addConfig } from './configer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

export default function CView({ children, config, url="cview" }) {
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
  ReactDOM.render(
    <React.StrictMode>
      <CView>
        HELLO WORLD!
      </CView>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

export { initConfiger, addConfig };