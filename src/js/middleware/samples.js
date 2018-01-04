export const samples = store => next => {
  return action => {
    switch(action.type) {
      default:
        return next(action);
    }
  }
};