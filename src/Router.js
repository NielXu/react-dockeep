import React from 'react';
import Component from './Component';
import { getComponentName } from './tool';
import { Switch, Route, Redirect } from 'react-router-dom';

export default class Router extends React.Component {
  constructor(props) {
    super(props);

    let routeMap = [];
    this.props.components.forEach(e => {
      routeMap.push({
        name: getComponentName(e).toLowerCase(),
        config: e,
      });
    });

    this.state = {
      routeMap: routeMap,
    };
  }

  render() {
    const url = this.props.url;
    return (
      <>
        <Switch>
          <Route exact path={`/${url}`} render={()=><Redirect to={`/${url}/${this.state.routeMap[0].name}`}/>}/>
          {
            this.state.routeMap.map(e => {
              const name = getComponentName(e.config);
              return <Route key={name} exact path={`/${url}/${name}`} render={()=><Component config={e.config}/>}/>
            })
          }
        </Switch>
      </>
    );
  }
}