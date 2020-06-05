import React from 'react';
import { Button, Modal as ReactModal } from 'react-bootstrap';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }

  render() {
    const { header, body, footer } = this.props;
    return (
      <div>
        <Button onClick={() => this.setState({ show: true })}>
          Click to open
        </Button>
        <ReactModal show={this.state.show} onHide={() => this.setState({ show: false })}>
          {header && <ReactModal.Header>{header}</ReactModal.Header>}
          <ReactModal.Body>
            {body}
          </ReactModal.Body>
          {footer && <ReactModal.Footer>{footer}</ReactModal.Footer>}
        </ReactModal>
      </div>
    )
  }
}

export default Modal;

export const ModalConfig = {
  component: Modal,
  description: "Wrapped the Modal component from React Bootstrap",
  props: [
    {
      name: "header",
      value: "",
      default: "",
      doc: "The header of the Modal, header will not be displayed if this is not given",
      type: "string"
    },
    {
      name: "body",
      value: "Hello World",
      required: true,
      doc: "Body of the modal",
      type: "string"
    },
    {
      name: "footer",
      value: "",
      default: "",
      doc: "The footer of the Modal, footer will not be displayed if this is not given",
      type: "string"
    },
  ]
}