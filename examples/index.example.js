import React from 'react';
import ReactDOM from 'react-dom';
import CView from '../src/index';
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
      <CView config={CONFIG}>
        <Redirect to="/cview"/>
      </CView>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

export { renderExample };