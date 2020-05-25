import React from 'react';
import { shallowValidate, extract } from './configer';
import './Layout.css';
import Component from './Component';

const CONFIG_REQUIRES = ["components"];

function renderGrid(components, index, colPerRow) {
  let comps = components.slice(index, index + colPerRow);
  const colWidth = Math.floor(12 / colPerRow);
  return (
    <div className="row" key={index}>
      {
        comps.map((e, i) => {
          return <div key={i} className={`col-md-${colWidth} layout-cell`}><Component config={e}/></div>
        })
      }
    </div>
  );
}

export default function Layout({ config }) {
  if(!config) {
    return <div>Invalid config provided</div>
  }

  // Shallow validate the config
  const validation = shallowValidate(config, CONFIG_REQUIRES);
  if(validation) {
    return <div>Config missing key: {validation}</div>
  }

  // Extract values
  const colPerRow = extract(config, "cols", 2);
  const components = extract(config, "components");

  return (
    <div className="container-fluid">
      {
        components.map((e, i) => {
          return i%colPerRow === 0? renderGrid(components, i, colPerRow) : '';
        })
      }
    </div>
  )
}
