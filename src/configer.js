export const ERR = 0;

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

export { extract, shallowValidate };