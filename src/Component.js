import React from 'react';
import { shallowValidate, extract, ERR } from './configer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { applyPropsCode, getComponentName } from './tool';
import theme from "prism-react-renderer/themes/github";
import Error from './Error';
import './Component.css';

const COMPONENT_CONFIG_REQUIRES = ["component"];
const COMPONENT_PROPS_DOC_REQUIRES = ["name", "value", "required"];

export default class Component extends React.Component {
  constructor(props) {
    super(props);

    // validation
    const { config } = props;
    const validation = shallowValidate(config, COMPONENT_CONFIG_REQUIRES);
    if(validation) {
      this.state = {
        error: `Config missing key: ${validation}`,
        config: config,
      };
      return;
    }

    this.state = {...this.extractConfig(config)};
  }

  componentWillReceiveProps = (next) => {
    this.setState({ ...this.extractConfig(next.config) });
    window.scrollTo(0, 0);
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
    return {
      name: name,
      component: component,
      description: componentDesc,
      props: componentProps,
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
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </thead>
          <tbody>
            {propsDoc.map((e, i) => {
              const validation = shallowValidate(e, COMPONENT_PROPS_DOC_REQUIRES);
              if(validation) {
                return (
                  <tr scope="row">
                    <td colSpan="4"><Error message={`Config missing key: ${validation}`} trace={e}/></td>
                  </tr>
                )
              }
              const name = extract(e, "name");
              const required = extract(e, "required");
              const doc = extract(e, "doc", "");
              const type = extract(e, "type", "any");
              const def = extract(e, "default", null);
              return (
                <tr>
                  <td scope="row">{name} {required && <span class="badge badge-light" style={{ marginLeft: 15 }}>required</span>}</td>
                  <td scope="row">{type}</td>
                  <td scope="row">{def}</td>
                  <td scope="row">{doc}</td>
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
    return (
      <div>
        <h1>Example</h1>
        <LiveProvider code={applyPropsCode(name, props)} scope={{[name]: this.state.component}}>
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
