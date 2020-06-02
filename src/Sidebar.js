import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar(props) {
  const { components, url } = props;
  return (
    <div className="sidebar-wrapper">
      {
        components.map((e, i) => {
          return (
            <div className="sidebar-list-item" key={i}>
              <Link className="sidebar-item-link" to={`/${url}/${e.name.toLowerCase()}`}>{e.name}</Link>
            </div>
          )
        })
      }
    </div>
  )
}