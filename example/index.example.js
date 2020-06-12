import React from 'react';
import ReactDOM from 'react-dom';
import Doc, { addComponentConfig } from '../src/index';
import { Redirect } from 'react-router-dom';
import { InputGroupConfig } from './InputGroup.example';
import { ModalConfig } from './Modal.example';
import { TopbarConfig } from './Topbar.example';

/**
 * Either pass config using prop
 */
const CONFIG = {
  components: [
    ModalConfig,
    TopbarConfig,
  ]
}

/**
 * Or use function to add them
 */
addComponentConfig(InputGroupConfig);

ReactDOM.render(
  <React.StrictMode>
    <Doc config={CONFIG}>
      <Redirect to="/doc"/>
    </Doc>
  </React.StrictMode>,
  document.getElementById('root')
);
