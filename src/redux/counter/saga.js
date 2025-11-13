import {
  delay, put, takeEvery
} from 'redux-saga/effects';
import { counterActions } from './slice';

export function* watchIncrementAsync() {
  yield delay(1000);
  yield put(counterActions.increment());
}

export function* watchDecrementAsync() {
  yield delay(1000);
  yield put(counterActions.decrement());
}

export function* watchIncrementByAmountAsync(
  action,
) {
  try {
    if (typeof action.payload !== 'number') {
      throw new Error('Invalid parameter');
    }
    yield delay(1000);
    yield put(counterActions.incrementByAmount(action.payload));
    yield put(counterActions.incrementByAmountAsyncSuccess());
  } catch (error) {
    yield put(counterActions.incrementByAmountAsyncFailure());
  }
}

export function* watchCounterSagas() {
  yield takeEvery(counterActions.incrementAsync, watchIncrementAsync);
  yield takeEvery(counterActions.decrementAsync, watchDecrementAsync);
  yield takeEvery(
    counterActions.incrementByAmountAsync,
    watchIncrementByAmountAsync,
  );
}

const counterSagas = watchCounterSagas;

export default counterSagas;
