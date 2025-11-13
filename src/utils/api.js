import axios from 'axios';
// import constants from '../common/apiConstants';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/test/',
    timeout: 40000,
    headers: { Accept: 'application/json' },
});

export function setAuthToken(authToken) {
    api.defaults.headers.common['Authorization'] = authToken;
}

export default api;
// To share cookies to cross site domain, change to true.
// axiosClient.defaults.withCredentials = false;

// export default axiosClient;

export function uploadFile(uploadUrl, data, contentType) {
    return axios.put(uploadUrl, data, {
        headers: {
            Accept: 'application/json',
            'Content-Type': contentType,
        },
    }).then((response) => response.data);
}
