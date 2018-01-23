import { objectToArrayWithKeyValue, keyValueArrayToObject } from "./array";

export let getValueFromPath = (object, path) => {
  return path.split("/")
    .reduce((obj, key) => obj && obj[key], object);
};

export let filter = (object, condition) => {
  let objectList = objectToArrayWithKeyValue(object);
  let filteredList = objectList.filter(condition);
  return keyValueArrayToObject(filteredList);
};