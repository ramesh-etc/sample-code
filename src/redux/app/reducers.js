import {
    LOG_IN,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT,
    LOG_OUT_SUCCESS,
    LOG_OUT_ERROR,
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
    LOAD_APP_VERSION,
    LOAD_APP_VERSION_SUCCESS,
    LOAD_APP_VERSION_ERROR,
    UPDATE_VERSION,
    UPDATE_VERSION_SUCCESS,
    UPDATE_VERSION_ERROR,
    CLEAR_CACHE,
    VERIFY_SESSION,
    VERIFY_SESSION_SUCCESS,
    VERIFY_SESSION_ERROR,
    VERIFY_SESSION_LOADING,
    SESSION_TOKEN,
    SESSION_TOKEN_SUCCESS,
    SESSION_TOKEN_ERROR,
    SESSION_LOGIN_SUCCESS,
    SESSION_LOGIN_ERROR,
    SESSION_ROUTE_CHANGE,
    SESSION_EXPAND,
    SESSION_TIMEOUT_SUCCESS,
    SESSION_TIMEOUT_ERROR,
    SESSION_CLEAR_TIMEOUT_SUCCESS,
    SESSION_CLEAR_TIMEOUT_ERROR,
    SET_SIGN_UP_RECORD,
    CLEAR_SIGN_UP_RECORD,
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_SUCCESS,
    SHOW_CUSTOM_ERROR_MESSAGE,
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_ERROR,

    RESEND_OTP,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_ERROR,
} from './constants';
import { createReducer } from '@reduxjs/toolkit';

const initialState = { customerror: {}, error: {}, success: {}, activeSession: 1, secret: false, version: '1.0', expand: false, timeout: false, loading: false, metaData: {}, appVersion: false, signupdata: {}, stepper: false, key: 0, authUser: false, hospital: [] };

/**
 * @param {object} state 
 * @param {object} action 
 */

const appreducers = createReducer(initialState, {
    [LOG_IN_SUCCESS]: (state, action) => {
        state.loggedIn = true;
        // state.user = action.payload.user;
        state.secret = action.payload.token;
        state.error = {};
        state.success = {};
        state.loading = false;
    },
    [LOG_IN_ERROR]: (state, action) => {
        state.loggedIn = false;
        state.user = false;
        state.secret = false;
        state.error = { login: action.payload.error };
        state.success = {};
        state.loading = false;
    },
    [SIGN_UP_SUCCESS]: (state, action) => {
        state.loggedIn = true;
        // state.user = action.payload.user;
        // state.secret = action.payload.token;
        state.error = {};
        state.success = {};
        state.loading = false;
    },
    [SIGN_UP_ERROR]: (state, action) => {
        state.loggedIn = false;
        state.user = false;
        state.secret = false;
        state.error = { signup2: action.payload.error };
        state.success = {};
        state.loading = false;
    },
    [LOG_OUT_SUCCESS]: (state, action) => {
        state.loggedIn = false;
        state.user = false;
        state.secret = false;
        state.error = {};
        state.success = {};
        state.loading = false;
    },
    [LOG_OUT_ERROR]: (state, action) => {
        state.error = { logout: action.payload.error };
        state.success = {};
        state.loading = false;
    },
    [LOAD_APP_VERSION_SUCCESS]: (state, action) => {
        state.loading = false;
        state.success = {};
        state.error = {};
        state.appVersion = action.payload.appVersion;
    },
    [LOAD_APP_VERSION_ERROR]: (state, action) => {
        state.error = { appVersion: action.payload.error };
        state.success = {};
        state.loading = false;
    },
    [UPDATE_VERSION_SUCCESS]: (state, action) => {
        state.loading = false;
        state.success = {};
        state.error = {};
        state.user.version = action.payload.appVersion;
    },
    [UPDATE_VERSION_ERROR]: (state, action) => {
        state.error = { appVersion: action.payload.error };
        state.success = {};
        state.loading = false;
    },
    [SESSION_TOKEN_ERROR]: (state, action) => {
        state.error = { [action.payload.form]: action.payload.error }
        state.success = {};
        state.loading = false;
    },
    [SESSION_TOKEN_SUCCESS]: (state, action) => {
        state.secret = action.payload.token;
        state.error = {};
        state.success = {};
        state.loading = false;
    },
    [VERIFY_SESSION_LOADING]: (state, action) => {
        state.loading = true;
    },
    [VERIFY_SESSION_SUCCESS]: (state, action) => {
        state.loggedIn = true;
        state.user = action.payload.user;
        state.hospital = action.payload.hospital;
        state.loading = false;
    },
    [VERIFY_SESSION_ERROR]: (state, action) => {
        state.loggedIn = false;
        state.user = false;
        state.secret = false;
        state.error = { login: action?.payload?.error };
        state.success = {};
        state.loading = false;
    },
    [SESSION_LOGIN_SUCCESS]: (state, action) => {
        state.error = {};
        state.success = {};
        state.activeSession = action?.payload?.duration;
        // state.loading = false;
    },
    [SESSION_LOGIN_ERROR]: (state, action) => {
        state.error = { [action?.payload?.form]: action?.payload?.error || false }
        state.success = {};
        state.loading = false;
    },
    [SESSION_EXPAND]: (state, action) => {
        state.expand = action.payload.expand;
        state.loading = false;
    },
    [SESSION_TIMEOUT_SUCCESS]: (state, action) => {
        state.error = {};
        state.success = {};
        state.timeout = action.payload.timeout;
        state.loading = false;
    },
    [SESSION_CLEAR_TIMEOUT_SUCCESS]: (state, action) => {
        state.error = {};
        state.success = {};
        state.timeout = false;
        state.loading = false;
    },
    [SESSION_CLEAR_TIMEOUT_ERROR]: (state, action) => {
        state.error = { [action.payload?.form]: action.payload?.error }
        state.success = {};
        state.loading = false;
    },
    [SESSION_TIMEOUT_ERROR]: (state, action) => {
        state.error = { [action.payload?.form]: action.payload?.error }
        state.success = {};
        state.loading = false;
    },
    [SET_SIGN_UP_RECORD]: (state, action) => {
        state.signupdata = Object.assign({}, state.signupdata, action.payload?.record);
    },
    [CLEAR_SIGN_UP_RECORD]: (state, action) => {
        state.signupdata = {};
    },
    [CLEAR_CACHE]: (state, action) => {
        state.error = {};
        state.success = {};
        state.loading = false;
        state.customerror = {};
    },
    [FORGOT_PASSWORD_ERROR]: (state, action) => {
        state.error = { forgot: action.payload.error }
        state.success = {};
        state.loading = false;
    },
    [FORGOT_PASSWORD_SUCCESS]: (state, action) => {
        state.error = {}
        state.success = { forgot: action.payload.success };
        state.loading = false;
    },
    [RESET_PASSWORD_ERROR]: (state, action) => {
        state.error = { reset: action.payload.error }
        state.success = {};
        state.loading = false;
    },
    [RESET_PASSWORD_SUCCESS]: (state, action) => {
        state.error = {}
        state.success = { reset: action.payload.success };
        state.loading = false;
    },
    [CHANGE_PASSWORD_ERROR]: (state, action) => {
        state.error = action.payload.error;
        state.success = {};
        state.loading = false;
    },
    [CHANGE_PASSWORD_SUCCESS]: (state, action) => {
        state.error = {}
        state.success = action.payload.success;
        state.loading = false;
    },
    [SHOW_CUSTOM_ERROR_MESSAGE]: (state, action) => {
        state.customerror = { verifyOtp: action.payload.error };
        state.success = {};
        state.loading = false;
    },
    [VERIFY_OTP_ERROR]: (state, action) => {
        state.error = { verifyOtp: action.payload.error }
        state.success = {};
        state.loading = false;
    },
    [VERIFY_OTP_SUCCESS]: (state, action) => {
        state.error = {}
        state.success = { verifyOtp: action.payload.success };
        state.loading = false;
    },
    [RESEND_OTP_ERROR]: (state, action) => {
        state.error = { verifyOtp: action.payload.error }
        state.success = {};
        state.loading = false;
    },
    [RESEND_OTP_SUCCESS]: (state, action) => {
        state.error = {}
        state.success = { verifyOtp: action.payload.success };
        state.loading = false;
    },
});

export default appreducers;