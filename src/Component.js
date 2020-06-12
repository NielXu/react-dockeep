import React from 'react';
import { shallowValidate, extract } from './configer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { applyPropsCode, getComponentName } from './tool';
import theme from "prism-react-renderer/themes/github";
import Error from './Error';
import './Component.css';

const COMPONENT_PROPS_DOC_REQUIRES = ["name", "value"];

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...this.extractConfig(this.props.config)};
  }

  extractConfig = (config) => {
    // Extract the name
    const name = getComponentName(config);
    // Extract the component
    const component = extract(config, "component");
    // Extract the description(optional)
    const componentDesc = extract(config, "description", "No description");
    // Extract the props(optional)
    const componentProps = extract(config, "props", []);
    // Extract the code(optional)
    const code = extract(config, "code", "");
    return {
      name: name,
      component: component,
      description: componentDesc,
      props: componentProps,
      code: code,
    }
  }

  /**
   * Render the description of the component
   */
  renderComponentDesc() {
    const { name, description } = this.state;
    return (
      <div className="title-desc-section">
        <h1>{name}</h1>
        <div className="component-desc">
          {description}
        </div>
      </div>
    )
  }

  /**
   * Render the documentation for each property
   */
  renderPropsDoc() {
    const propsDoc = this.state.props;
    if(propsDoc.length === 0) {
      return "";
    }
    return (
      <div className="component-props-doc-container">
        <h1>Props</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {propsDoc.map((e, i) => {
              const validation = shallowValidate(e, COMPONENT_PROPS_DOC_REQUIRES);
              if(validation) {
                return (
                  <tr key="error-msg">
                    <td colSpan="4"><Error message={`Config missing key: ${validation}`} trace={e}/></td>
                  </tr>
                )
              }
              const name = extract(e, "name");
              const required = extract(e, "required", false);
              const doc = extract(e, "doc", "");
              const type = extract(e, "type", "any");
              const def = extract(e, "default", null);
              return (
                <tr key={name}>
                  <td>{name} {required && <span className="badge badge-light" style={{ marginLeft: 15 }}>required</span>}</td>
                  <td>{type}</td>
                  <td>{def}</td>
                  <td>{doc}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  /**
   * Render the example of the component
   */
  renderExample() {
    const name = this.state.name;
    const props = this.state.props;
    const code = this.state.code;
    return (
      <div className="example-section">
        <h1>Example</h1>
        <LiveProvider
          code={code? code : applyPropsCode(name, props)}
          scope={{[name]: this.state.component}}
        >
          <LivePreview className="component-box"/>
          <LiveError className="component-error"/>
          <LiveEditor theme={theme} className="component-editor"/>
        </LiveProvider>
      </div>
    )
  }

  render() {
    if(this.state.error) {
      return <Error message={this.state.error} trace={this.state.config}/>
    }
    return (
      <div className="component-wrapper">
        {this.renderComponentDesc()}
        {this.renderPropsDoc()}
        {this.renderExample()}
      </div>
    )
  }
}
