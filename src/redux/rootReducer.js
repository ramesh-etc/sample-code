import { counterReducer } from './counter/slice';
import appreducers from './app/reducers';

const rootReducer = {
  counter: counterReducer,
  authentication: appreducers,
};

export default rootReducer;
