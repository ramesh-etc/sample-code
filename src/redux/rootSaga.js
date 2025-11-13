import {
  all, fork, call
  // type AllEffect, type ForkEffect
} from 'redux-saga/effects';
import counterSagas from './counter/saga';
import authonticationSagas from './app/saga';

export default function* rootSaga() {
  yield all([
    fork(counterSagas),
    fork(authonticationSagas)
    // authonticationSagas
  ]);
}
