import React from 'react';
import Component from './Component';
import { Switch, Route, Redirect } from 'react-router-dom';

export default class Router extends React.Component {
  constructor(props) {
    super(props);

    let routeMap = [];
    this.props.components.forEach(e => {
      routeMap.push({
        name: e.name.toLowerCase(),
        config: e,
      });
    });

    this.state = {
      routeMap: routeMap,
    };
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/cview" render={()=><Redirect to={`/cview/${this.state.routeMap[0].name}`}/>}/>
          {
            this.state.routeMap.map(e => {
              return <Route key={e.name} exact path={`/cview/${e.name}`} render={()=><Component config={e.config}/>}/>
            })
          }
        </Switch>
      </>
    );
  }
}