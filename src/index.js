import React from 'react';
import Layout from './Layout';
import { initConfiger, addConfig } from './configer';
import 'bootstrap/dist/css/bootstrap.css';

export default function({ children, config, url="cview" }) {
  if(window.location.pathname === `/${url}`) {
    return <Layout config={config}/>
  }
  return (
    <div>
      {children}
    </div>
  )
}

export { initConfiger, addConfig };