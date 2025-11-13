import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    settingrecords: [],
    settingrecord: {},
    settingLoading: false,
    settingError: false,
    settingSuccess: false,
    totalPageCount: false,
    totalPageItems: -1,
    current_page: 1,
    headers: {
        offset: 0,
        limit: 25,
        search: false,
        filter: false,
        // sort: false,
        page: 1
    },
};

/**
 * @param {object} constants 
 * @param {string} name 
 */
export default function reducer(constants, name, additionalConstants = {}) {
    const {
        LOAD_SETTINGS_SUCCESS,
        LOAD_SETTINGS_ERROR,
        LOAD_SETTINGS_LOADING,
        CLEAR_SETTINGS_ERROR,
        UPDATE_SETTINGS_SUCCESS,
        UPDATE_SETTINGS_ERROR
    } = constants;

    const dashboardReducer = createReducer(initialState, {
        [LOAD_SETTINGS_SUCCESS]: (state, action) => {
            state.settingLoading = false;
            state.settingError = false;
            state.settingSuccess = false;
            state.settingrecord = action.payload.records
        },
        [LOAD_SETTINGS_LOADING]: (state, action) => {
            state.settingLoading = { [name]: true };
        },
        [LOAD_SETTINGS_ERROR]: (state, action) => {
            state.settingLoading = false;
            state.settingError = action.payload.error;
            state.settingSuccess = false;
        },
        [CLEAR_SETTINGS_ERROR]: (state, action) => {
            state.settingLoading = false;
            state.settingError = false;
            state.settingSuccess = false;
        },
        [UPDATE_SETTINGS_SUCCESS]: (state, action) => {
            state.settingLoading = false;
            state.settingError = false;
            state.settingSuccess = action.payload.success;
            // state.settingrecord = action.payload.records
        },
        [UPDATE_SETTINGS_ERROR]: (state, action) => {
            state.settingLoading = false;
            state.settingError = action.payload.error;
            state.settingSuccess = false;
        },
    })
    return dashboardReducer;
}