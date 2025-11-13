import { createReduxHistoryContext, reachify } from "redux-first-history";
import { createWouterHook } from "redux-first-history/wouter";
import { createBrowserHistory } from 'history';
import rootReducer from "./rootReducer";
import { combineReducers } from "@reduxjs/toolkit";
// import {
//     combineReducers,
//     applyMiddleware,
// } from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form';
import { LOG_OUT } from "./app/constants";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    //other options if needed 
});

// export function createReducer(injectedReducers = {}) {
//     const basicReducer = combineReducers({
//         ...injectedReducers,
//         ...rootReducer,
//         router: routerReducer,
//         form: formReducer
//         // other non-injected reducers can go here...
//     });


//     return basicReducer;
// }

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
function reducers(injectedReducers = {}) {
    const basicReducer = combineReducers({
        ...injectedReducers,
        ...rootReducer,
        router: routerReducer,
        form: formReducer
        // other non-injected reducers can go here...
    });

    return basicReducer;
}



/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
    const appReducer = (state, action) => {
        if (action.type === LOG_OUT) {
            state = {};
        }
        return reducers(asyncReducers)(state, action);
    }

    return appReducer;
}