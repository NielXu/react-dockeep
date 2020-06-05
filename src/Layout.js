import React from 'react';
import { shallowValidate, extract, getConfig, ERR } from './configer';
import './Layout.css';
import Sidebar from './Sidebar.js';
import Router from './Router';
import Error from './Error';
import { Container, Row, Col } from 'react-bootstrap';

const CONFIG_REQUIRES = ["components"];
const COMPONENT_CONFIG_REQUIRES = ["component"];

export default function Layout({ config, url }) {
  if(!config) {
    if(getConfig() === ERR) {
      return <Error
              message={`No config provided`}
            />
    }
    else {
      config = getConfig();
    }
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
  for(let i=0;i<components.length;i++) {
    const comp = components[i];
    const compValidation = shallowValidate(comp, COMPONENT_CONFIG_REQUIRES);
    if(compValidation) {
      return <Error
                trace={comp}
                message={`Config missing key: ${compValidation}`}
            />
    }
  }

  return (
    <Container fluid className="height-wrapper">
      <Row className="height-wrapper">
        <Col md="2" className="sidebar-wrapper">
          <Sidebar url={url} components={components}/>
        </Col>
        <Col>
          <Router url={url} components={components}/>
        </Col>
      </Row>
    </Container>
  )
}
