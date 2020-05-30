import React from 'react';
import Component from './Component';

export default class Router extends React.Component {
  constructor(props) {
    super(props);
    
    const components = props.components;

    let routeMap = [];
    components.forEach(e => {
      routeMap.push({
        name: e.name.toLowerCase(),
        config: e,
      });
    });

    this.state = {
      routeMap: routeMap,
    };
  }

  renderRoute() {
    const { side } = this.props;
    if(!side) {
      return <Component config={this.state.routeMap[0].config}/>
    }
    let route;
    this.state.routeMap.forEach(e => {
      if(e.name === side) {
        route = e;
      }
    });
    return <Component config={route.config}/>
  }

  render() {
    return (
      <>
        {this.renderRoute()}
      </>
    );
  }
}