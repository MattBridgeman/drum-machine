import { combineReducers } from 'redux';
import drumMachine from './drum.machine.reducers';

const rootReducer = combineReducers({
  drumMachine
});

export default rootReducer;