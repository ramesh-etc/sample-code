/*
 *
 *  actions
 *
 */
import { createAction } from "@reduxjs/toolkit";

export default function actions(constants) {
    const {
        LOAD_SETTINGS,
        LOAD_SETTINGS_SUCCESS,
        LOAD_SETTINGS_ERROR,
        LOAD_SETTINGS_LOADING,
        CLEAR_SETTINGS_ERROR,
        UPDATE_SETTINGS,
        UPDATE_SETTINGS_SUCCESS,
        UPDATE_SETTINGS_ERROR
    } = constants;

    const loadSettings = createAction(LOAD_SETTINGS);
    const loadSettingsSuccess = createAction(LOAD_SETTINGS_SUCCESS);
    const loadSettingsError = createAction(LOAD_SETTINGS_ERROR);
    const loadSettingsLoading = createAction(LOAD_SETTINGS_LOADING);
    const clearSettingsError = createAction(CLEAR_SETTINGS_ERROR);
    const updateSettings = createAction(UPDATE_SETTINGS);
    const updateSettingsSuccess = createAction(UPDATE_SETTINGS_SUCCESS);
    const updateSettingsError = createAction(UPDATE_SETTINGS_ERROR);

    return {
        loadSettings,
        loadSettingsSuccess,
        loadSettingsError,
        loadSettingsLoading,
        clearSettingsError,
        updateSettings,
        updateSettingsSuccess,
        updateSettingsError
    }
}