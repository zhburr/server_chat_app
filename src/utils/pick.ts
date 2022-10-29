export const pick = <T extends {}>(object: T, keys: Array<keyof T>) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as T);
};
