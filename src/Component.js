import React from 'react';
import { shallowValidate, extract } from './configer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { applyPropsCode, resolveProps } from './tool';
import theme from "prism-react-renderer/themes/github";
import './Component.css';

const COMPONENT_CONFIG_REQUIRES = ["component", "name"];
const COMPONENT_PROPS_DOC_REQUIRES = ["name", "required"];
const COMPONENT_PROPS_REQUIRES = ["name", "value"];

export default class Component extends React.Component {
  constructor(props) {
    super(props);

    // validation
    const { config } = props;
    const validation = shallowValidate(config, COMPONENT_CONFIG_REQUIRES);
    if(validation) {
      this.state = {
        error: `Config missing key: ${validation}`,
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
    const name = extract(config, "name");
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

  onPropsInputChange = (index, e) => {
    const props = this.state.props;
    this.setState({
      props: [
        ...props.slice(0, index),
        {...props[index], value: e.target.value},
        ...props.slice(index+1)
      ],
    });
  }

  onPropsToggle = (index, value) => {
    const props = this.state.props;
    this.setState({
      props: [
        ...props.slice(0, index),
        {...props[index], value: value},
        ...props.slice(index+1)
      ],
    });
  }

  /**
   * Render each example property, with input field that allow user to test different properties
   */
  renderProps() {
    const props = this.state.props;
    return (
      <div className="component-props-container">
        {
          props.map((e, i) => {
            const validation = shallowValidate(e, COMPONENT_PROPS_REQUIRES);
            if(validation) {
              return <div>Props config missing key: {validation}</div>
            }
            // name
            const name = extract(e, "name");
            // value
            let value = extract(e, "value");
            const valueType = typeof value;
            const warn = (valueType !== "string" && valueType !== "number" && valueType !== "boolean")?
              `Warn: CView currently only supports string, number and boolean type as prop value, the detected type of the given value is: ${valueType}`
              : "";
            value = valueType === "object"? JSON.stringify(value) : value;
            // editable
            const editable = extract(e, "editable", false);

            return (
              <div className="props-input-container">
                <div className="input-group" key={i}>
                  {valueType === "boolean"? (
                    <>
                      <span className="input-group-text" id="basic-addon1" style={{ marginRight: 20 }}>{name}</span>
                      <div class="form-check form-check-inline">
                        <input disabled={!editable} class="form-check-input" type="checkbox" value="option1" checked={value === true} onChange={()=>this.onPropsToggle(i, true)}/>
                        <label class="form-check-label" for="inlineCheckbox1">true</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input disabled={!editable} class="form-check-input" type="checkbox" value="option2" checked={value === false} onChange={()=>this.onPropsToggle(i, false)}/>
                        <label class="form-check-label" for="inlineCheckbox2">false</label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">{name}</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={value}
                        disabled={!editable || warn}
                        onChange={(e)=>this.onPropsInputChange(i, e)}
                      />
                    </>
                  )}
                </div>
                {warn && <div className="props-input-warn">{warn}</div>}
              </div>
            )
          })
        }
      </div>
    )
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
                return <div>PropsDoc config missing key: {validation}</div>
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

  renderComponent() {
    const Component = this.state.component;
    const props = this.state.props;
    return (
      <div className="component-box">
        {
          isStateless(Component)?
          Component(resolveProps(props))
            : <Component {...resolveProps(props)}/>
        }
      </div>
    )
  }

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
      return <div className="component-wrapper">{this.state.error}</div>
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

function isStateless(Component) {
  return !Component.prototype.render;
}