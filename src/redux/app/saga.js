import {
    delay, put, takeEvery, call, all, take, takeLatest, fork, select
    // , type Effect, type ForkEffect
} from 'redux-saga/effects';
import { setAuthToken } from '../../utils/api';
import history from '../../utils/history';
import store2 from 'store2';
import {
    DEFAULT_SESSION_TOKEN_ERROR,
    DEFAULT_SIGN_UP_ERROR,
    DEFAULT_LOGIN_ERROR,
    DEFAULT_FORGOT_PASSWORD_ERROR,
    DEFAULT_RESET_PASSWORD_ERROR,
    DEFAULT_CHANGE_PASSWORD_ERROR,
    DEFAULT_SESSION_TIMEOUT_ERROR,
    DEFAULT_SESSION_CLEAR_TIMEOUT_ERROR,
    DEFAULT_VERIFY_OTP_ERROR,
    DEFAULT_RESEND_OTP_ERROR,
    DEFAULT_LOAD_VERSION_ERROR,
    DEFAULT_UPDATE_VERSION_ERROR
} from './errorConstants';

import { LOCATION_CHANGE, push } from "redux-first-history";
import { omit } from 'lodash';
import { Localize, Timer } from '../../utils/tools';

import {
    logInAPI,
    loadAppVersionApi,
    updateVersionApi,
    verifySession,
    sessionToken,
    signUpApi,
    forgotPasswordApi,
    resetPasswordApi,
    changePasswordApi,
    verfyOtpApi,
    resendOtpApi
} from './remotes';

import {
    logIn,
    logInSuccess,
    logInError,
    logOut as logOutAction,
    logOutSuccess,
    logOutError,
    signUp,
    signUpSuccess,
    signUpError,
    loadAppVersion,
    loadAppVersionSuccess,
    loadAppVersionError,
    updateVersion,
    updateVersionSuccess,
    updateVersionError,
    verifySession as verifySessionAction,
    verifySessionSuccess,
    verifySessionError,
    verfiySessionLoading,
    sessionToken as sessionTokenAction,
    sessionTokenSuccess,
    sessionTokenError,
    sessionTimeout,
    sessionTimeoutSuccess,
    sessionTimeoutError,
    sessionLoginSuccess,
    sessionLoginError,
    sessionRouteChange,
    setSignupRecord,
    clearSignupRecord,
    forgotPasswordSuccess,
    forgotPasswordError,
    resetPasswordSuccess,
    resetPasswordError,
    changePasswordSuccess,
    changePasswordError,
    sessionClearTimeoutSuccess,
    sessionClearTimeoutError,
    verifyOtp,
    verifyOtpSuccess,
    verifyOtpError,
    resendOtp,
    resendOtpSuccess,
    resendOtpError
} from './actions';

import {
    LOG_IN,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT,
    LOG_OUT_SUCCESS,
    LOG_OUT_ERROR,
    SIGN_UP,
    LOAD_APP_VERSION,
    LOAD_APP_VERSION_SUCCESS,
    LOAD_APP_VERSION_ERROR,
    UPDATE_VERSION,
    UPDATE_VERSION_SUCCESS,
    UPDATE_VERSION_ERROR,
    VERIFY_SESSION,
    SESSION_TOKEN,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    SESSION_LOGIN,
    CHANGE_PASSWORD,
    SESSION_TIMEOUT,
    SESSION_TIMEOUT_SUCCESS,
    SESSION_TIMEOUT_ERROR,
    SESSION_CLEAR_TIMEOUT,
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_ERROR,
    RESEND_OTP,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_ERROR,
} from './constants';

import { selectUser, selectLoggedIn, selectsignupUserData, selectActiveSession, selectTimeout } from './selectors';

const CryptoJS = require("crypto-js");
// const base64 = require('base-64');

export function* verifyInitialSessionSaga() {
    const secret = store2.get('secret');
    const activeSession = store2.get('activeSession');
    const location = window.location && window.location.pathname || '/';
    const searchParams = history && history.location && history.location.search;
    if (secret && !['/reset-password/'].includes(location)) {
        try {
            setAuthToken(secret);
            store2.set('secret', secret);
            const user = yield call(verifySession);
            const hospital = user?.hospitalDetails || [];
            user.hospitalDetails = [];
            yield put(verifySessionSuccess({ user: user, hospital: hospital }));
            yield put(sessionTokenAction({ record: user }));
            if (activeSession != null) {
                yield put(sessionLoginSuccess({ duration: activeSession }));
            }
        } catch (error) {
            store2.remove('secret');
            store2.remove('activeSession');
            yield put(verifySessionError({ error: DEFAULT_SESSION_TOKEN_ERROR }));
            // history.push({ pathname: process.env.PUBLIC_PATH || '/' });
            yield put(push(process.env.PUBLIC_PATH || '/'));
        }
    } else {
        try {
            const loggedIn = yield select(selectLoggedIn());
            if (!activeSession && !loggedIn && !['/login', '/signin', '/signup', '/forgot', '/reset-password/', '/respond/', '/verifyOtp'].includes(location)) {
                // history.push({ pathname: process.env.PUBLIC_PATH || '/' });
                yield put(push(process.env.PUBLIC_PATH || '/'));
            }

            yield put(logOutSuccess());
        } catch (error) {
            yield put(logOutError(error));
        } finally {
            store2.remove('activeSession');
            store2.remove('secret');
        }
    }
}

export function* verifySessionSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(VERIFY_SESSION);
        const { secret } = action.payload
        // const { loggedIn, user: record } = useAppSelector((state) => state?.authentication);
        const loggedIn = yield select(selectLoggedIn());

        if (secret) {
            try {
                yield put(verfiySessionLoading());
                setAuthToken(secret);
                const user = yield call(verifySession);
                const hospital = user?.hospitalDetails || [];
                user.hospitalDetails = [];
                yield put(verifySessionSuccess({ user: user, hospital: hospital }));
            } catch (error) {
                const session_error = error.response && error.response.data && error.response.data && error.response.data.error || DEFAULT_SESSION_TOKEN_ERROR;
                if (loggedIn && session_error === "invalid auth token") {
                    const record = yield select(selectUser());
                    yield put(sessionTokenAction({ record: record }));
                    // yield put(sessionLoginSuccess(0));
                    // store2.set('activeSession', 0);
                }
            }
        }
    }
}

export function* sessionTokenSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(SESSION_TOKEN);
        const { record = {}, respondCase, integration, model = false } = action.payload;
        const path = history && history.location.pathname;

        if (record) {
            try {
                const result = yield call(sessionToken, record);
                if (result) {
                    // Decrypt
                    var bytes = CryptoJS.AES.decrypt(result.authToken, record.id);
                    var secret = bytes.toString(CryptoJS.enc.Utf8);

                    setAuthToken(secret);
                    store2.set('secret', secret);
                    yield put(sessionTokenSuccess(Object.assign({}, { token: secret })));
                    // history.push({ pathname: process.env.PUBLIC_PATH || '/', state: Object.assign({}, { ...history.location.state }) });
                }
            } catch (error) {
                const Err = error.response && error.response.data && error.response.data.error || DEFAULT_SESSION_TOKEN_ERROR;
                yield put(sessionTokenError(Object.assign({}, { form: 'sessionTimeout', error: Err })));
            }
        }
    }
}

export function* loginSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(LOG_IN);
        //   yield put(startSubmit(form));

        const { identifier, secret, queryParams, form, setLoadingAction } = action.payload;
        try {
            const result = yield call(logInAPI, identifier, secret, queryParams);
            store2.set('login_platform', 'default');
            if (result && result.user && !result.authToken) {
                yield (put(setSignupRecord({ record: Object.assign({}, { hospital_id: result?.hospital_id, email: identifier, password: secret }) })));
                // history.push({ pathname: process.env.PUBLIC_PATH || '/', state: Object.assign({}, { ...history.location.state }, { form: 'verifyOtp', identifier, secret }) });
                yield put(push(process.env.PUBLIC_PATH || '/', Object.assign({}, { ...history.location.state }, { form: 'verifyOtp', identifier, secret })));
            } else {
                store2.set('secret', result.authToken);
                setAuthToken(result.authToken);
                yield put(logInSuccess(
                    {
                        user: Object.assign({}, result.user, { routes: result.user && result.user.role || false, token: result.authToken }),
                        token: result.authToken
                    }));
                yield put(verifySessionAction({ secret: result.authToken }));
                // history.push({ pathname: process.env.PUBLIC_PATH || '/', state: Object.assign({}, { ...history.location.state }) });
                yield put(push(process.env.PUBLIC_PATH || '/', Object.assign({}, { ...history.location.state })));
            }
        } catch (error) {
            const login_attemptsError = error.response && error.response.data && error.response.data || DEFAULT_LOGIN_ERROR;
            if (typeof login_attemptsError == 'string') {
                yield put(logInError({ error: login_attemptsError }));
            } else {
                yield put(logInError({ error: error }));
            }

            // ------------------- For Login Failure form redirection --------------
            const login_attempts = error.response && error.response.data && error.response.data.login_attempts || false;
            if (login_attempts && login_attempts >= 3 && form != 'loginFailureForm') {
                // history.push({ pathname: process.env.PUBLIC_PATH || '/', state: { form: 'loginFailure', identifier, secret } });
                yield put(push(process.env.PUBLIC_PATH || '/', { form: 'loginFailure', identifier, secret }));
            } else {
                //---------------For not redirect to Login Failure Form---------------------
                store2.remove('secret');
                store2.remove('activeSession');

            }
        } finally {
            // yield put(stopSubmit(form));
            if (setLoadingAction) {
                yield call(setLoadingAction);
            }
        }
    }
}

export function* logOutSaga() {
    yield takeLatest(LOG_OUT, function* updater() {
        try {
            // const logout_url = (process.env.ENV === 'production') ? `https://www.eztekpay.com` : (process.env.ENV === 'staging') ? `https://staging.eztekpay.com` : 'http://localhost:3001';
            // if (['production', 'staging'].includes(process.env.ENV)) {
            //     yield put(logOutSuccess());
            //     window.location.href = logout_url;
            // } else {
            //     yield put(logOutSuccess());
            //     history.push(process.env.PUBLIC_PATH || '/');
            // }

            if (['production', 'staging'].includes(process.env.ENV)) {
                yield put(logOutSuccess());
                // window.location.href = logout_url;
            } else {
                yield put(logOutSuccess());
                // history.push({ pathname: process.env.PUBLIC_PATH || '/' });
                yield put(push(process.env.PUBLIC_PATH || '/'));
                // yield put(sessionRouteChange({ pathname: process.env.PUBLIC_PATH || '/' }));
            }
        } catch (error) {
            yield put(logOutError({ error: error }));
        } finally {
            store2.remove('secret');
            store2.remove('activeSession');
        }
    })
}

export function* signUpSaga() {
    yield takeLatest(SIGN_UP, function* updater(action) {

        const { record, form, setLoadingAction } = action.payload;

        if (record) {
            //yield put(startSubmit(form));
            const signupData = yield select(selectsignupUserData());
            const mergedData = Object.assign({}, signupData, record);
            const keysToRemove = ['confirm_password', 'privacy_policy', 'terms_of_service'];

            // Use omit to create a new object without the specified keys
            const newObject = omit(mergedData, keysToRemove);
            const finalOutput = Object.assign({}, newObject, { phone_number: mergedData.phone_number.replace("+1", ""), hospital_phone_number: mergedData.hospital_phone_number.replace("+1", "") })
            try {
                const result = yield call(signUpApi, finalOutput);
                if (result) {
                    // setAuthToken(result.authToken);
                    // store2.set('secret', result.authToken);

                    yield (put(setSignupRecord({ record: Object.assign({}, mergedData, result) })))
                    // const user = yield call(verifySession);
                    // if (user) {
                    //    // yield put(verifySessionSuccess({ user: user }));
                    //     store2.set('secret', result.authToken);
                    //     // store2.set('getting_started', true);
                    //     // store2.set('login_platform', 'default');
                    //     //yield put(stopSubmit(form));
                    // history.push({ pathname: '/verifyOtp', state: { form: 'verifyOtp', secret: result.authToken, user: result } });
                    yield put(push('/', { form: 'verifyOtp', secret: result.authToken, user: result }));
                    // }
                } else {
                    //yield put(stopSubmit(form));
                    // yield put(getStripeIndentError(DEFAULT_GET_STRIPE_INDENT_ERROR));
                    yield put(signUpError({ error: DEFAULT_SIGN_UP_ERROR }));
                }
            } catch (error) {
                //yield put(stopSubmit(form));
                yield put(signUpError({ error: error }));
            } finally {
                if (setLoadingAction) {
                    yield call(setLoadingAction);
                }
            }
        }
    })
}

export function* forgotPasswordSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(FORGOT_PASSWORD);
        const { record, form, setLoadingAction } = action.payload;

        try {
            const result = yield call(forgotPasswordApi, record);
            if (result) {
                yield put(forgotPasswordSuccess({ success: result.message }));
            } else {
                yield put(forgotPasswordError({ error: DEFAULT_FORGOT_PASSWORD_ERROR }));
            }
        } catch (error) {
            const forgot_password_error = error.response && error.response.data && error.response.data.error || DEFAULT_FORGOT_PASSWORD_ERROR;
            yield put(forgotPasswordError({ error: forgot_password_error }));
        } finally {
            // yield put(stopSubmit(form));
            if (setLoadingAction) {
                yield call(setLoadingAction);
            }
        }
    }
}

export function* resetPasswordSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(RESET_PASSWORD);
        const { record, form, setLoadingAction } = action.payload;

        try {
            const result = yield call(resetPasswordApi, record);
            if (result) {
                yield put(resetPasswordSuccess({ success: result.message }))
            } else {
                yield put(resetPasswordError({ error: DEFAULT_RESET_PASSWORD_ERROR }));
            }
        } catch (error) {
            const Error = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_RESET_PASSWORD_ERROR;
            yield put(resetPasswordError({ error: Error && Error === 'invalid auth token' && 'Reset password link is expired. Please try resetting the password again.' || Error }));
        } finally {
            // yield put(stopSubmit(form));
            if (setLoadingAction) {
                yield call(setLoadingAction);
            }
        }
    }
}


export function* changePasswordSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(CHANGE_PASSWORD);
        const { record = {}, form, setLoadingAction, parentFn } = action.payload;

        try {
            const { password, new_password } = record;
            const secret = store2.get('secret');
            if (password && password.length < 8) {
                yield put(changePasswordError({ error: { [form]: 'Password must be at least 8 characters' } }));
            } else if (password && new_password && password != new_password) {
                yield put(changePasswordError({ error: { [form]: 'Password Mismatch' } }));
            } else {
                const result = yield call(changePasswordApi, record);
                if (result) {
                    yield put(changePasswordSuccess({ success: result.message }));
                    yield put(verifySessionAction({ secret: secret }));
                    if (parentFn) {
                        yield call(parentFn);
                    }
                } else {
                    yield put(changePasswordError({ error: { [form]: DEFAULT_CHANGE_PASSWORD_ERROR } }));
                }
            }
        } catch (error) {
            const Error = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_CHANGE_PASSWORD_ERROR;
            yield put(changePasswordError({ error: { [form]: Error } }));
        } finally {
            if (setLoadingAction) {
                yield call(setLoadingAction);
            }
        }
    }
}

export function* loadAppVersionSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(LOAD_APP_VERSION);
        if (action) {
            try {
                let result = yield call(loadAppVersionApi);
                if (result) {
                    yield put(loadAppVersionSuccess(Object.assign({}, { appVersion: result.version })));
                }
            } catch (e) {
                yield put(loadAppVersionError({ error: DEFAULT_LOAD_VERSION_ERROR }));
            }
        }
    }
}

export function* updateVersionSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(UPDATE_VERSION);
        const { record = {}, form, setLoadingAction } = action.payload;
        try {
            const result = yield call(updateVersionApi, record);
            if (result) {
                yield put(updateVersionSuccess({ appVersion: record && record.version }))
            } else {
                yield put(updateVersionError({ error: DEFAULT_UPDATE_VERSION_ERROR }));
            }
        } catch (error) {
            yield put(updateVersionError({ error: DEFAULT_UPDATE_VERSION_ERROR }));
        } finally {
            if (setLoadingAction) {
                yield call(setLoadingAction);
            }
        }
    }
}

export function* sessionTimeoutSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(SESSION_TIMEOUT);
        const { dispatch } = action.payload;
        try {
            const user = yield select(selectUser());
            const activeSession = yield select(selectActiveSession());
            if (user && user.session_timeout && activeSession && user.role && user.role !== "superAdmin") {
                const timeout = yield call(Timer, () => Localize(() => dispatch(sessionLoginSuccess({ duration: 0 })), 'activeSession', 0), (parseInt(user.session_timeout) * 1000));
                yield put(sessionTimeoutSuccess({ timeout: timeout }));
            }
        } catch (error) {
            yield put(sessionTimeoutError({ form: 'sessionTimeout', error: DEFAULT_SESSION_TIMEOUT_ERROR }));
        }
    }
}

export function* sessionClearTimeoutSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        yield take(SESSION_CLEAR_TIMEOUT);

        try {
            const sessionTimeout = yield select(selectTimeout());
            if (sessionTimeout) {
                clearTimeout(sessionTimeout);
                yield put(sessionClearTimeoutSuccess());
            }
        } catch (error) {
            yield put(sessionClearTimeoutError({ form: 'sessionTimeout', error: DEFAULT_SESSION_CLEAR_TIMEOUT_ERROR }));
        }
    }
}

export function* sessionLoginSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(SESSION_LOGIN);
        const { identifier, secret, form, setLoadingAction } = action.payload;
        try {
            let result;

            result = yield call(logInAPI, identifier, secret, false, true);

            if (result) {
                setAuthToken(result.authToken);
                yield put(verifySessionAction({ secret: result.authToken }));
                store2.set('secret', result.authToken);
                store2.set('activeSession', 1);
                yield put(sessionLoginSuccess({ duration: 1 }));

            }
        } catch (error) {
            const login_attempts = error.response && error.response.data && error.response.data.login_attempts || false;
            if (login_attempts && login_attempts >= 3 && form != 'loginFailureForm') {
                yield put(logOutSuccess());
                yield put(push(process.env.PUBLIC_PATH || '/'));
                // history.push({ pathname: process.env.PUBLIC_PATH || '/' });
                store2.remove('secret');
                store2.remove('activeSession');
            } else {
                const Err = login_attempts === 1 ? `Wrong Password. You have 2 left attempts` : login_attempts === 2 ? `Wrong Password. You have 1 left attempt` : 'Something Went Wrong!';
                yield put(sessionLoginError({ form: form, error: Err }));
            }
        } finally {
            if (setLoadingAction) {
                yield call(setLoadingAction);
            }
        }
    }
}

export function* verifyOtpSaga() {
    while (true) {
        const action = yield take(VERIFY_OTP);
        const { record, form, setLoadingAction, queryParams } = action.payload;

        try {
            const signupData = yield select(selectsignupUserData());
            const result = yield call(verfyOtpApi, record);
            // store2.set('secret', result.authToken);
            // setAuthToken(result.authToken);

            // yield put(verifyOtpSuccess(Object.assign({}, result.user, { routes: result.user && result.user.role || false }), result.authToken));
            // yield put(verifySessionAction(result.authToken));
            // history.push({ pathname: process.env.PUBLIC_PATH || '/', state: Object.assign({}, { ...history.location.state }) });
            if (result) {
                yield put(logIn({ identifier: signupData?.email, secret: signupData?.password, queryParams: queryParams, form: 'login_Form', setLoadingAction: setLoadingAction }));
            } else {
                yield put(verifyOtpError({ error: DEFAULT_VERIFY_OTP_ERROR }));
                if (setLoadingAction) {
                    yield call(setLoadingAction);
                }
            }
        } catch (error) {
            const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_VERIFY_OTP_ERROR;
            yield put(verifyOtpError({ error: Err }));
            if (setLoadingAction) {
                yield call(setLoadingAction);
            }
        } finally {
            // if (setLoadingAction) {
            //     yield call(setLoadingAction);
            // }
        }
    }
}


export function* resendOtpSaga() {
    while (true) {
        // eslint-disable-line no-constant-condition
        const action = yield take(RESEND_OTP);
        const { record, form, setLoadingAction } = action.payload;

        try {
            const signupData = yield select(selectsignupUserData());
            const result = yield call(resendOtpApi, Object.assign(record, { hospital_id: signupData?.hospital_id }));
            if (result) {
                yield put(resendOtpSuccess({ success: result?.message || `Verification code sent through ${record?.email ? "Email" : record?.sms ? "SMS" : "mail"} successfully` }));
            } else {
                yield put(resendOtpError({ error: DEFAULT_RESEND_OTP_ERROR }));
            }
        } catch (error) {
            const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_RESEND_OTP_ERROR;
            yield put(resendOtpError({ error: Err }));
        } finally {
            if (setLoadingAction) {
                yield call(setLoadingAction);
            }
        }
    }
}

// export function* locationChange() {
//     yield takeEvery(LOCATION_CHANGE, function* updater(action) {
//         // console.log("entered router action");
//     }
//     )
// }

// export function* routerSaga() {
//     while (true) {
//       // eslint-disable-line no-constant-condition
//       yield take(ROUTER);
//       const secret = store2.get('secret');
//       const token = yield select(selectToken());

//       const loggedIn = yield select(selectLoggedIn());
//       if (secret || token) {
//         try {
//           const user = yield select(selectUser());
//           if(user && (user.role == 'superAdmin' || user.role == 'manager')){
//             yield put(dashboardClearFilterAction(true));
//           }
//           setAuthToken(secret || token);
//           yield call(verifySession);
//         } catch (error) {
//           const session_error = error.response && error.response.data && error.response.data && error.response.data.error || DEFAULT_SESSION_TOKEN_ERROR;
//           if (loggedIn && session_error === "invalid auth token") {
//             const record = yield select(selectUser());
//             yield put(sessionTokenAction(record));
//           }
//         }
//       }
//     }
//   }

export function* authonticationSagas() {
    yield all([
        verifyInitialSessionSaga(),
        verifySessionSaga(),
        sessionTokenSaga(),
        loginSaga(),
        logOutSaga(),
        signUpSaga(),
        forgotPasswordSaga(),
        resetPasswordSaga(),
        changePasswordSaga(),
        loadAppVersionSaga(),
        updateVersionSaga(),
        sessionTimeoutSaga(),
        sessionClearTimeoutSaga(),
        sessionLoginSaga(),
        verifyOtpSaga(),
        resendOtpSaga(),
        // locationChange()
    ]);
}

export default authonticationSagas;