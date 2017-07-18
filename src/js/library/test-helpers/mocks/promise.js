export let getPromiseMock = (value) => {
  let promises = [];
  let promiseErrors = [];
  let promise = {
    then: (fn) => {
      console.log("then", fn);
      promises.push(fn);
      return {
        catch: (errFn) => promiseErrors.push(errFn)
      };
    }
  };
  let flush = () => promises.map(callback => {
    console.log("fn", callback);
    callback(value);
  });
  return {
    promise,
    flush
  };
};