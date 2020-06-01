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

export {
  applyPropsCode,
  resolveProps,
};