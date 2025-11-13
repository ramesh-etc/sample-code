import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import {
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
// import { createInjectorsEnhancer } from "redux-injectors";
// import history from '../utils/history';
// import { routerMiddleware } from 'react-router-redux';
// import { routerReducer } from 'react-router-redux';
import { createReduxHistoryContext, reachify } from "redux-first-history";
import { createWouterHook } from "redux-first-history/wouter";
import { createBrowserHistory } from 'history';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  //other options if needed 
});
import createReducer from './reducers';

function createSagaInjector(runSaga, rootSaga) {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();

  const isInjected = key => injectedSagas.has(key);

  const injectSaga = (key, saga) => {
    // We won't run saga if it is already injected
    if (isInjected(key)) return;

    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(saga);

    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task);
  };

  // Inject the root saga as it a staticlly loaded file,
  injectSaga('root', rootSaga);

  return injectSaga;
}

// export function createReducer(injectedReducers = {}) {
//   const basicReducer = combineReducers({
//     ...injectedReducers,
//     ...rootReducer,
//     // routerReducer
//     // other non-injected reducers can go here...
//   });


//   return basicReducer;
// }

const configureAppStore = (initialState = {}) => {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  //sagaMiddleware.runSaga(rootSaga, history);
  const { run: runSaga } = sagaMiddleware;

  const middleware = [
    sagaMiddleware,
    routerMiddleware
  ];
  // const enhancers = [
  //   createInjectorsEnhancer({
  //     createReducer,
  //     runSaga: sagaMiddleware.run
  //   })
  // ];

  const store = configureStore({
    reducer: createReducer(),
    // enhancers: (defaultEnhancers) => [...enhancers, ...defaultEnhancers],
    middleware: (gDM) => gDM({
      serializableCheck: false
    }).concat([...middleware]),
    preloadedState: initialState,
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: {
      shouldHotReload: false
    }
  });

  //sagaMiddleware.run(rootSaga);

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {};
  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
};

export const store = configureAppStore();
export const history = createReduxHistory(store);
//if you use @reach/router 
export const reachHistory = reachify(history);
//if you use wouter
export const wouterUseLocation = createWouterHook(history);
