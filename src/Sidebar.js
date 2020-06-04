import React from 'react';
import { Link } from 'react-router-dom';
import { getComponentName } from './tool';
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const mql = window.matchMedia(`(min-width: 768px)`);

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      topExpand: false,
    }
  }

  componentDidMount() {
    mql.addEventListener("change", this.onMediaQueryChange);
    this.setState({ top: !mql.matches });
  }

  componentWillUnmount() {
    mql.removeEventListener("change", this.onMediaQueryChange);
  }

  onMediaQueryChange = () => {
    this.setState({ top: !mql.matches });
  }

  render() {
    
    const { components, url } = this.props;
    if(this.state.top) {
      return (
        <div className="topbar-wrapper">
          <div className="topbar-search-wrapper">
            <input type="text" className="form-control" placeholder="Search..."/>
            <button
              type="button"
              className="btn btn-default topbar-expand-button"
              onClick={() => this.setState({ topExpand: !this.state.topExpand })}
            >
              <FontAwesomeIcon icon={faBars} size="lg"/>
            </button>
          </div>
          <Collapse in={this.state.topExpand}>
            <div className="topbar-content">
            {
              components.map((e, i) => {
              const name = getComponentName(e);
                return (
                  <div className="row sidebar-list-item" key={i}>
                    <Link className="sidebar-item-link" to={`/${url}/${name.toLowerCase()}`}>{name}</Link>
                  </div>
                )
                })
              }
            </div>
          </Collapse>
        </div>
      )
    }
    return (
      <div className="container-fluid">
        <div className="row sidebar-search-wrapper">
          <input type="text" className="form-control" placeholder="Search..."/>
        </div>
        {
          components.map((e, i) => {
            const name = getComponentName(e);
            return (
              <div className="row sidebar-list-item" key={i}>
                <Link className="sidebar-item-link" to={`/${url}/${name.toLowerCase()}`}>{name}</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}