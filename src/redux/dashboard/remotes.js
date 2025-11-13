/**
 * records - remotes
 */

import api from '../../utils/api';

/*
* @param {string} name 
* @param {object} remotesBlock 
*/
export default function (name) {
    let constantName = name;

    function objectToQueryString(obj) {
        const queryParams = [];

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];

                // Skip properties with false or undefined values
                if (value === false || value === undefined) {
                    continue;
                }

                // Convert boolean values to string "true" or "false"
                const stringValue = typeof value === 'boolean' ? value.toString() : value;

                // Encode key and value and add to the query parameters array
                queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(stringValue));
            }
        }

        // Join the query parameters array with "&" to create the final query string
        return queryParams.join('&');
    }

    function loadRecord(record) {
        return api.post(`/rest/invoices/getAllDashbordData`, record).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    function getSummaryApi(record) {
        return api.post(`/rest/reports/getAllReportData`, record).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    function collectedReportForDateApi(params, record) {
        const queryString = objectToQueryString(params);
        return api.post(`/rest/reports/getCollectedInvoiceDataForReport?${queryString}`, record).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    function updateReportDetailApi(record) {
        return api.post(`/rest/reports/updateReportDetails`, record).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    return {
        loadRecord,
        getSummaryApi,
        collectedReportForDateApi,
        updateReportDetailApi
    }
}