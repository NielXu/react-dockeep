import React from 'react';
import { shallowValidate, extract, getConfig, ERR, mergeConfig } from './configer';
import './Layout.css';
import Sidebar from './Sidebar.js';
import Router from './Router';
import Error from './Error';
import { Container, Row, Col } from 'react-bootstrap';
import { getComponentName } from './tool';

const CONFIG_REQUIRES = ["components"];
const COMPONENT_CONFIG_REQUIRES = ["component"];

const mql = window.matchMedia(`(min-width: 768px)`);

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
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
    let { config, url } = this.props;
    if(!config) {
      // If no config provided from prop, use config stored in configer
      config = getConfig();
    }
    else {
      // Otherwise, merge the config from prop and the one stored in configer
      config = mergeConfig(config, getConfig());
    }
  
    // Shallow validate the config
    const validation = shallowValidate(config, CONFIG_REQUIRES);
    if(validation) {
      return <Error
              trace={config}
              message={`Config missing key: ${validation}`}
            />
    }
  
    // Extract components from config
    const components = extract(config, "components");
    // Check name duplications
    let names = new Set();
    for(let i=0;i<components.length;i++) {
      const comp = components[i];
      const name = getComponentName(comp);
      const compValidation = shallowValidate(comp, COMPONENT_CONFIG_REQUIRES);
      if(compValidation) {
        return <Error
                  trace={comp}
                  message={`Config missing key: ${compValidation}`}
              />
      }
      if(names.has(name)) {
        return <Error
                  trace={comp}
                  message={`Duplicated component name: ${name}`}
              />
      }
      names.add(name);
    }

    return (
      <Container fluid className="height-wrapper">
        <Row className="height-wrapper">
          <Col md="2" className={this.state.top? "sidebar-wrapper" : "sidebar-height-wrapper"}>
            <Sidebar url={url} components={components}/>
          </Col>
          <Col className="main-wrapper">
            <Router url={url} components={components}/>
          </Col>
        </Row>
      </Container>
    )
  }
}
