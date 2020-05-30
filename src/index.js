import React from 'react';
import Layout from './Layout';
import { initConfiger, addConfig } from './configer';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

export default function({ children, config, url="cview" }) {
  if(window.location.pathname.match(new RegExp(`/${url}`)) || window.location.pathname.match(new RegExp(`/${url}/.*`))) {
    return <Layout config={config}/>
  }
  return (
    <div className="full-wrapper">
      {children}
    </div>
  )
}

export { initConfiger, addConfig };