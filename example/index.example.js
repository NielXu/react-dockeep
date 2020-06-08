import React from 'react';
import ReactDOM from 'react-dom';
import Doc from '../src/index';
import { Redirect } from 'react-router-dom';
import { InputGroupConfig } from './InputGroup.example';
import { ModalConfig } from './Modal.example';
import { TopbarConfig } from './Topbar.example';

const CONFIG = {
  components: [
    InputGroupConfig,
    ModalConfig,
    TopbarConfig,
  ]
}

function renderExample() {
  ReactDOM.render(
    <React.StrictMode>
      <Doc config={CONFIG}>
        <Redirect to="/doc"/>
      </Doc>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

export { renderExample };