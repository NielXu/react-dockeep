import React from 'react';
import { Link } from 'react-router-dom';
import { getComponentName } from './tool';
import './Sidebar.css';

export default function Sidebar(props) {
  const { components, url } = props;
  return (
    <div className="sidebar-wrapper">
      {
        components.map((e, i) => {
          const name = getComponentName(e);
          return (
            <div className="sidebar-list-item" key={i}>
              <Link className="sidebar-item-link" to={`/${url}/${name.toLowerCase()}`}>{name}</Link>
            </div>
          )
        })
      }
    </div>
  )
}