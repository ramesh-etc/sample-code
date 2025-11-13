/**
 * uploads - remotes
 */

import api from '../../utils/api';

/**
 * @param {string} file_name 
 * @param {string} content_type 
 */
export function getPatientCSVSignature(file_name, content_type) {
    return api.post(`/rest/patients/getUploadUrlPatientImport`, Object.assign({}, { file_name, content_type })).then((response) => response.data).catch((error) => Promise.reject(error));
}

export function getUploadUrlforGeneratedReport(file_name, content_type) {
    return api.post(`/reports/getUploadUrlForReport`, Object.assign({}, { file_name, content_type })).then((response) => response.data).catch((error) => Promise.reject(error));
}

export function getPublicUrlForGeneratedReport(record) {
    return api.post(`/rest/reports/getPublicUrlForReport`, record).then((response) => response.data).catch((error) => Promise.reject(error));
}

export function getUploadUrlForHospitalLogo(file_name, content_type) {
    return api.post(`/hospitals/getUploadUrl`, Object.assign({}, { file_name, content_type })).then((response) => response.data).catch((error) => Promise.reject(error));
}

export function getUploadUrlForDocuments(file_name, content_type) {
    return api.post(`/rest/documents/getUploadUrl`, Object.assign({}, { file_name, content_type })).then((response) => response.data).catch((error) => Promise.reject(error));
}

const remotes = {
    getPatientCSVSignature,
    getUploadUrlforGeneratedReport,
    getPublicUrlForGeneratedReport,
    getUploadUrlForHospitalLogo,
    getUploadUrlForDocuments
}

export default remotes;