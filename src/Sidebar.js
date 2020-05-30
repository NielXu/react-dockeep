import React from 'react';
import './Sidebar.css';

export default function Sidebar(props) {
  const { components, onSelect } = props;
  return (
    <div className="sidebar-wrapper">
      {
        components.map((e, i) => {
          return (
            <div className="sidebar-list-item" key={i} onClick={()=>onSelect(e.name)}>
              {e.name}
            </div>
          )
        })
      }
    </div>
  )
}