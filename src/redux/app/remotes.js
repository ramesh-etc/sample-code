import api from '../../utils/api'
const CryptoJS = require("crypto-js");
const base64 = require('base-64');

export function verifySession() {
    return api
        .get(`/users/me`)
        .then(response => {
            if (!response.data || (response.data && response.data.error)) {
                return Promise.reject('Session Timout');
            }
            const { data = {} } = response;
            const { is_admin, role } = data;

            let Record = Object.assign({}, { ...data });

            if (data && data.signature && data.signature != '') {
                const bytes = CryptoJS.AES.decrypt(data.signature, data.id);
                let signature = bytes.toString(CryptoJS.enc.Utf8);
                Record.signature = base64.decode(signature);
            }

            if (role != 'superAdmin' && role == "customer") {
                return Object.assign({}, { ...Record }, { routes: 'admin' })
            } else {
                return Object.assign({}, { ...Record }, { routes: role })
            }
        })
        .catch(error => Promise.reject(error));
}

/**
 * @param {string} email 
 * @param {string} password 
 * @param {object} queryParams 
 * @param {boolean} sessionLogin 
 */
export function logInAPI(email, password, queryParams, sessionLogin) {
    return api
        .post(`/login`, { email, password, reactivation_token: queryParams && queryParams.reactivation || false, session: sessionLogin || false })
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

/**
 * @param {object} record 
 */
export function loadAppVersionApi(record) {
    return api
        .get(`/rest/version-history`, record)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

/**
 * @param {object} record 
 */
export function updateVersionApi(record) {
    return api
        .put(`/rest/version-history`, record)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

/**
 * @param {object} record 
 */
export function sessionToken(record) {
    return api
        .post(`/rest/users/session`, record)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

/**
 * @param {object} record 
 */
export function signUpApi(record) {
    return api
        .post(`/users/signup`, record)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

/**
 * @param {object} record 
 */
export function forgotPasswordApi(record) {
    return api
        .post(`/users/forget-password`, record)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

/**
* @param {object} record 
*/
export function resetPasswordApi(record) {
    return api
        .post(`/users/reset-password`, record)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

/**
 * @param {object} record 
 */
export function changePasswordApi(record) {
    return api
        .post(`/rest/users/changePassword`, record)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

/**
 * 
 * @param {object} record 
 */
export function verfyOtpApi(record) {
    return api.post('/rest/users/validateOTPForSignup', record).then(response => { return response.data }).catch(error => Promise.reject(error));
}

/**
 * 
 * @param {object} record 
 */
export function resendOtpApi(record) {
    return api.post('/rest/users/sendNotificationAgain', record).then(response => { return response.data }).catch(error => Promise.reject(error));
}
