export const ERR = 0;

let config;

/**
 * Initialize the configer, this should be
 * called only once when the app started
 * 
 * @optional `cols` Number of columns per row, default is 2
 * @optional `components` Initial components
 */
function initConfiger(cols=2, components=[]) {
  config = {
    cols: cols,
    components,
  };
}

/**
 * Add a config to the configer
 * 
 * @require `component` The component
 * @optional `props` Props applied to the component, default is empty
 * @optional `description` Description of the component, default is 'No description'
 */
function addConfig(component, props={}, description="No description") {
  if(!config) {
    return ERR;
  }
  config.components.push({
    component: component,
    description: description,
    props: props,
  });
}

/**
 * Get the config
 */
function getConfig() {
  if(!config) {
    return ERR;
  }
  return config;
}

/**
 * Shallow validate the object, only validate
 * the first keys, i.e. the nested object keys
 * will not be validated.
 * 
 * @require `config` The config object
 * @require `keys` An array of required keys
 * 
 * @return The first missing key, or not returning anything
 */
function shallowValidate(config, keys) {
  for(let i=0;i<keys.length;i++) {
    const key = keys[i];
    if(!_hasKey(config, key)) {
      return key;
    }
  }
}

/**
 * Extract a value from the config, or return `ERR` code
 * if the config has no such key and option value is not
 * given.
 * 
 * @require `config` The config object
 * @require `key`
 * 
 * @optional `option` Option will be used if key not found
 * 
 * @return value if it exists, or option is it is given, `ERR` otherwise
 */
function extract(config, key, option) {
  if(!_hasKey(config, key)) {
    return option !== undefined? option : ERR;
  }
  return config[key];
}

/**
 * Check if config has key
 * 
 * @require `config` The config object
 * @require `key`
 * 
 * @return true if yes, false otherwise
 */
function _hasKey(config, key) {
  return config.hasOwnProperty(key);
}

export {
  extract,
  shallowValidate,
  initConfiger,
  addConfig,
  getConfig
};