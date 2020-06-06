import { extract } from './configer';

/**
 * Get code that applied props to the given component
 * 
 * @param {String} name
 * @param {Object} props
 */
function applyPropsCode(name, props) {
  if(props.length === 0) {
    return `<${name}/>`;
  }
  let code = `<${name}\n`;
  props.forEach(e => {
    const value = typeof e.value === "string"? `${JSON.stringify(e.value)}` : `{${JSON.stringify(e.value)}}`;
    code += `  ${e.name}=${value}\n`
  });
  return code + `/>`;
}

/**
 * Get names and values fields from the given props
 * object and return a proper props object, for example,
 * `[{ name: 'disabled', value: true }]` will be resolved to
 * `{ disabled: true }`
 * 
 * @param {Object} props
 */
function resolveProps(props) {
  let resolvedProps = {};
  props.forEach(e => {
    resolvedProps[e.name] = e.value;
  });
  return resolvedProps;
}

/**
 * Get the name of the component from the component config, if it
 * is not provided, try to get it from the function name or class name.
 * 
 * @param {Object} config 
 */
function getComponentName(config) {
  return extract(config, "name", config.component? config.component.name : "");
}

/**
 * Get the last segment from the url, for example `google.com/tab/example` will
 * return `example`
 * @param {String} url 
 */
function getLastSegmentUrl(url) {
  return url.split('/').pop();
}

export {
  applyPropsCode,
  resolveProps,
  getComponentName,
  getLastSegmentUrl,
};