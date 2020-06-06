import React from 'react';
import { Link } from 'react-router-dom';
import { getComponentName, getLastSegmentUrl } from './tool';
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Container, Row } from 'react-bootstrap';
import './Sidebar.css';

const mql = window.matchMedia(`(min-width: 768px)`);

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      topExpand: false,
      search: "",
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

  onSearchChanged = (e) => {
    this.setState({ search: e.target.value });
  }

  isLinkSelected = (name) => {
    return name.toLowerCase() === getLastSegmentUrl(window.location.pathname);
  }

  render() {
    let { components, url } = this.props;
    if(this.state.search) {
      const match = this.state.search.toLowerCase();
      components = components.filter(e => {
        const name = getComponentName(e).toLowerCase();
        return name.indexOf(match) >= 0;
      });
    }
    if(this.state.top) {
      return (
        <div className="topbar-wrapper">
          <div className="topbar-search-wrapper">
            <input type="text" className="form-control" placeholder="Search..." onChange={this.onSearchChanged} value={this.state.search}/>
            <button
              type="button"
              className="btn btn-default topbar-expand-button"
              onClick={() => this.setState({ topExpand: !this.state.topExpand })}
            >
              <FontAwesomeIcon icon={faBars} size="lg"/>
            </button>
          </div>
          <Collapse in={this.state.topExpand || this.state.search}>
            <div className="topbar-content">
            {
              components.map((e, i) => {
              const name = getComponentName(e);
                return (
                  <Row className="sidebar-list-item" key={name}>
                    <Link
                      className={this.isLinkSelected(name)? "sidebar-item-active-link" : "sidebar-item-link"}
                      to={`/${url}/${name.toLowerCase()}`}
                      onClick={() => this.setState({ search: "" })}
                    >
                        {name}
                    </Link>
                  </Row>
                )
                })
              }
            </div>
          </Collapse>
        </div>
      )
    }
    return (
      <Container fluid>
        <Row className="sidebar-search-wrapper">
          <input type="text" className="form-control" placeholder="Search..." onChange={this.onSearchChanged} value={this.state.search}/>
        </Row>
        {
          components.map((e, i) => {
            const name = getComponentName(e);
            return (
              <Row className="sidebar-list-item" key={name}>
                <Link
                  className={this.isLinkSelected(name)? "sidebar-item-active-link" : "sidebar-item-link"}
                  to={`/${url}/${name.toLowerCase()}`}
                  onClick={() => this.setState({ search: "" })}
                >
                  {name}
                </Link>
              </Row>
            )
          })
        }
      </Container>
    )
  }
}