/**
 * settings
 */

import actions from "./actions";
import constants from "./constants";
import sagas from "./sagas";
import selectors from "./selectors";
import remotes from "./remotes";
import reducer from "./reducers";

/**
 * @param {string} name 
 */
export default function settings(name) {

    const actualConstants = constants(name);
    const actualActions = actions(actualConstants);
    const actualRemotes = remotes(name);
    const actualReducer = reducer(actualConstants, name);
    const actualSelectors = selectors(name);
    let actualSagas = sagas(actualConstants, actualActions, actualRemotes, actualSelectors, name);

    return {
        name,
        actions: Object.assign({}, actualActions),
        constants: Object.assign({}, actualConstants),
        reducer: actualReducer,
        saga: actualSagas,
        selectors: Object.assign({}, actualSelectors),
        remotes: Object.assign({}, actualRemotes)
    };
}
