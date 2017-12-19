export const tracks = store => next => {
  
  return action => {
    return next(action);
  };
};