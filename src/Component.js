import React from 'react';
import { ERR, shallowValidate, extract } from './configer';
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

  resolveProps = (props) => {
    let resolvedProps = {};
    props.forEach(e => {
      resolvedProps[e.name] = e.value;
    });
    return resolvedProps;
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
            const warn = (valueType !== "string" && valueType !== "number")?
              `Warn: CView currently only supports string and number type as prop value, the detected type of the given value is: ${valueType}`
              : "";
            value = valueType === "object"? JSON.stringify(value) : value;
            // editable
            const editable = extract(e, "editable", false);

            return (
              <div className="props-input-container">
                <div className="input-group" key={i}>
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
        {
          propsDoc.map((e, i) => {
            const validation = shallowValidate(e, COMPONENT_PROPS_DOC_REQUIRES);
            if(validation) {
              return <div>PropsDoc config missing key: {validation}</div>
            }
            const name = extract(e, "name");
            const required = extract(e, "required");
            const doc = extract(e, "doc", "");
            const type = extract(e, "type", "any");
            return (
              <div className="component-props-doc-row" key={i}>
                <span className={required? "badge badge-primary" : "badge badge-secondary"}>
                  {name} ({required? "required": "optional"}) <span className="badge badge-light">{type}</span>
                </span>
                <div className="component-props-doc">{doc}</div>
              </div>
            )
          })
        }
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
          Component(this.resolveProps(props))
            : <Component {...this.resolveProps(props)}/>
        }
      </div>
    )
  }

  renderExample() {
    return (
      <div>
        <h1>Example</h1>
        {this.renderComponent()}
        {this.renderProps()}
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