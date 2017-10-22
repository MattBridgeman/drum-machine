export const track = store => next => {
	return action => {
    return next(action);
  }
};