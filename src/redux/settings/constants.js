/*
 *
 *  constants
 *
 */

export default function constants(name) {
    const url = `eztekpay/${name}`;

    return {
        LOAD_SETTINGS: `${url}/LOAD_SETTINGS`,
        LOAD_SETTINGS_SUCCESS: `${url}/LOAD_SETTINGS_SUCCESS`,
        LOAD_SETTINGS_ERROR: `${url}/LOAD_SETTINGS_ERROR`,
        LOAD_SETTINGS_LOADING: `${url}/LOAD_SETTINGS_LOADING`,
        UPDATE_SETTINGS: `${url}/UPDATE_SETTINGS`,
        UPDATE_SETTINGS_SUCCESS: `${url}/UPDATE_SETTINGS_SUCCESS`,
        UPDATE_SETTINGS_ERROR: `${url}/UPDATE_SETTINGS_ERROR`,
        CLEAR_SETTINGS_ERROR: `${url}/CLEAR_SETTINGS_ERROR`,
    }
}