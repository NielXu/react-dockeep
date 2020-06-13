export const ERR = 0;

let config = {};

/**
 * Merge two configs into one and return the result, the
 * original configs will not be affected
 * 
 * @param {Object} confa 
 * @param {Object} confb 
 */
function mergeConfig(confa, confb) {
  let confc = {};
  if(_hasKey(confa, 'components')) {
    if(!_hasKey(confc, 'components')) {
      confc = { components: [] }
    }
    confa.components.forEach(e => {
      confc.components.push(e);
    });
  }
  if(_hasKey(confb, 'components')) {
    if(!_hasKey(confc, 'components')) {
      confc = { components: [] }
    }
    confb.components.forEach(e => {
      confc.components.push(e);
    });
  }
  return confc;
}

/**
 * Add a component config to the configer
 * 
 * @param {Object} componentConfig The config object
 */
function addComponentConfig(componentConfig) {
  if(!_hasKey(config, 'components')) {
    config = { components: [] }
  }
  config.components.push(componentConfig);
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
  
  addComponentConfig,
  getConfig,
  mergeConfig,
};