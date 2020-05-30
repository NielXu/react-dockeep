import React from 'react';
import { shallowValidate, extract, getConfig, ERR } from './configer';
import './Layout.css';
import Sidebar from './Sidebar.js';
import Component from './Component';
import Router from './Router';

const CONFIG_REQUIRES = ["components"];

function renderGrid(components, index, colPerRow) {
  let comps = components.slice(index, index + colPerRow);
  const colWidth = Math.floor(12 / colPerRow);
  return (
    <>
      {
        comps.map((e, i) => {
          return <Component config={e}/>
        })
      }
    </>
  );
}

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: "",
    };
  }

  onSidebarSelect = (name) => {
    this.setState({ side: name.toLowerCase() });
  }

  render() {
    const { config } = this.props;
    if(!config) {
      if(getConfig() === ERR) {
        return <div>Invalid config provided</div>
      }
      else {
        config = getConfig();
      }
    }
  
    // Shallow validate the config
    const validation = shallowValidate(config, CONFIG_REQUIRES);
    if(validation) {
      return <div>Config missing key: {validation}</div>
    }
  
    // Extract values
    const components = extract(config, "components");
  
    return (
      <div className="layout-wrapper full-wrapper">
        <Sidebar components={components} onSelect={this.onSidebarSelect}/>
        <Router components={components} side={this.state.side}/>
      </div>
    )
  }
}
