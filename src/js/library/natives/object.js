export let getValueFromPath = (object, path) => {
  return path.split("/")
    .reduce((obj, key) => obj[key], object);
};