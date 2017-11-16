export let getPromiseMock = (value) => {
  let promises = [];
  let promiseErrors = [];
  let promise = {
    then: (fn) => {
      promises.push(fn);
      return {
        catch: (errFn) => promiseErrors.push(errFn)
      };
    }
  };
  let flush = () => promises.map(callback => {
    callback(value);
  });
  let flushErrors = () => promiseErrors.map(callback => {
    callback(value);
  });
  return {
    promise,
    flush,
    flushErrors
  };
};