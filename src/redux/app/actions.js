/*
 *
 * Session actions
 *
 */

import {
    LOG_IN,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    VERIFY_SESSION_LOADING,

    LOG_OUT,
    LOG_OUT_SUCCESS,
    LOG_OUT_ERROR,

    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,

    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,

    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,

    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,

    LOAD_APP_VERSION,
    LOAD_APP_VERSION_SUCCESS,
    LOAD_APP_VERSION_ERROR,

    CLEAR_CACHE,

    VERIFY_SESSION,
    VERIFY_SESSION_SUCCESS,
    VERIFY_SESSION_ERROR,

    UPDATE_VERSION,
    UPDATE_VERSION_SUCCESS,
    UPDATE_VERSION_ERROR,

    SESSION_TOKEN,
    SESSION_TOKEN_SUCCESS,
    SESSION_TOKEN_ERROR,

    SESSION_LOGIN,
    SESSION_LOGIN_SUCCESS,
    SESSION_LOGIN_ERROR,

    SESSION_ROUTE_CHANGE,
    SESSION_EXPAND,

    SESSION_TIMEOUT,
    SESSION_TIMEOUT_SUCCESS,
    SESSION_TIMEOUT_ERROR,

    SESSION_CLEAR_TIMEOUT,
    SESSION_CLEAR_TIMEOUT_SUCCESS,
    SESSION_CLEAR_TIMEOUT_ERROR,

    SET_SIGN_UP_RECORD,
    CLEAR_SIGN_UP_RECORD,
    SHOW_CUSTOM_ERROR_MESSAGE,

    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_ERROR,

    RESEND_OTP,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_ERROR,
} from './constants';
import { createAction } from '@reduxjs/toolkit';

export const logIn = createAction(LOG_IN);
export const logInSuccess = createAction(LOG_IN_SUCCESS);
export const logInError = createAction(LOG_IN_ERROR);

export const logOut = createAction(LOG_OUT);
export const logOutSuccess = createAction(LOG_OUT_SUCCESS);
export const logOutError = createAction(LOG_OUT_ERROR);

export const loadAppVersion = createAction(LOAD_APP_VERSION);
export const loadAppVersionSuccess = createAction(LOAD_APP_VERSION_SUCCESS);
export const loadAppVersionError = createAction(LOAD_APP_VERSION_ERROR);

export const updateVersion = createAction(UPDATE_VERSION);
export const updateVersionSuccess = createAction(UPDATE_VERSION_SUCCESS);
export const updateVersionError = createAction(UPDATE_VERSION_ERROR);

export const clearCache = createAction(CLEAR_CACHE);

export const verifySession = createAction(VERIFY_SESSION);
export const verifySessionSuccess = createAction(VERIFY_SESSION_SUCCESS);
export const verifySessionError = createAction(VERIFY_SESSION_ERROR);
export const verfiySessionLoading = createAction(VERIFY_SESSION_LOADING);

export const sessionToken = createAction(SESSION_TOKEN);
export const sessionTokenSuccess = createAction(SESSION_TOKEN_SUCCESS);
export const sessionTokenError = createAction(SESSION_TOKEN_ERROR);

export const sessionLogin = createAction(SESSION_LOGIN);
export const sessionLoginSuccess = createAction(SESSION_LOGIN_SUCCESS);
export const sessionLoginError = createAction(SESSION_LOGIN_ERROR);

export const sessionTimeout = createAction(SESSION_TIMEOUT);
export const sessionTimeoutSuccess = createAction(SESSION_TIMEOUT_SUCCESS);
export const sessionTimeoutError = createAction(SESSION_TIMEOUT_ERROR);

export const sessionClearTimeout = createAction(SESSION_CLEAR_TIMEOUT);
export const sessionClearTimeoutSuccess = createAction(SESSION_CLEAR_TIMEOUT_SUCCESS);
export const sessionClearTimeoutError = createAction(SESSION_CLEAR_TIMEOUT_ERROR);

export const sessionRouteChange = createAction(SESSION_ROUTE_CHANGE);
export const sessionExpand = createAction(SESSION_EXPAND);

export const signUp = createAction(SIGN_UP);
export const signUpSuccess = createAction(SIGN_UP_SUCCESS);
export const signUpError = createAction(SIGN_UP_ERROR);
export const setSignupRecord = createAction(SET_SIGN_UP_RECORD);
export const clearSignupRecord = createAction(CLEAR_SIGN_UP_RECORD);

export const verifyOtp = createAction(VERIFY_OTP);
export const verifyOtpSuccess = createAction(VERIFY_OTP_SUCCESS);
export const verifyOtpError = createAction(VERIFY_OTP_ERROR);

export const resendOtp = createAction(RESEND_OTP);
export const resendOtpSuccess = createAction(RESEND_OTP_SUCCESS);
export const resendOtpError = createAction(RESEND_OTP_ERROR);

export const forgotPassword = createAction(FORGOT_PASSWORD);
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);
export const forgotPasswordError = createAction(FORGOT_PASSWORD_ERROR);

export const resetPassword = createAction(RESET_PASSWORD);
export const resetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);
export const resetPasswordError = createAction(RESET_PASSWORD_ERROR);

export const changePassword = createAction(CHANGE_PASSWORD);
export const changePasswordSuccess = createAction(CHANGE_PASSWORD_SUCCESS);
export const changePasswordError = createAction(CHANGE_PASSWORD_ERROR);

export const showCustomeMessage = createAction(SHOW_CUSTOM_ERROR_MESSAGE);

export default {
    logIn,
    logInSuccess,
    logInError,

    logOut,
    logOutSuccess,
    logOutError,

    loadAppVersion,
    loadAppVersionSuccess,
    loadAppVersionError,

    updateVersion,
    updateVersionSuccess,
    updateVersionError,

    clearCache,

    verifySession,
    verifySessionSuccess,
    verifySessionError,
    verfiySessionLoading,

    sessionToken,
    sessionTokenSuccess,
    sessionTokenError,

    sessionLogin,
    sessionLoginSuccess,
    sessionLoginError,

    sessionTimeout,
    sessionTimeoutSuccess,
    sessionTimeoutError,

    sessionClearTimeout,
    sessionClearTimeoutSuccess,
    sessionClearTimeoutError,

    sessionRouteChange,
    sessionExpand,

    signUp,
    signUpSuccess,
    signUpError,
    setSignupRecord,
    clearSignupRecord,

    forgotPassword,
    forgotPasswordSuccess,
    forgotPasswordError,

    resetPassword,
    resetPasswordSuccess,
    resetPasswordError,

    changePassword,
    changePasswordSuccess,
    changePasswordError,

    showCustomeMessage,

    verifyOtp,
    verifyOtpSuccess,
    verifyOtpError,

    resendOtp,
    resendOtpSuccess,
    resendOtpError
}