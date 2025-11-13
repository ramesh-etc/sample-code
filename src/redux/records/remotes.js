/**
 * records - remotes
 */

import api from '../../utils/api';

function objectToQueryString(obj) {
    const queryParams = [];

    // for (const key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //         const value = obj[key];

    //         // Skip properties with false or undefined values
    //         if (value === false || value === undefined) {
    //             continue;
    //         }

    //         // Convert boolean values to string "true" or "false"
    //         const stringValue = typeof value === 'boolean' ? value.toString() : value;

    //         // Encode key and value and add to the query parameters array
    //         queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(stringValue)}`);
    //     }
    // }
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

    // const queryString = Object.keys(params)
    //     .map((key) => {
    //         const value = params[key];

    //         if (typeof value === 'object') {
    //             return Object.keys(value)
    //                 .map((nestedKey) => `${key}[${nestedKey}]=${encodeURIComponent(value[nestedKey])}`)
    //                 .join('&');
    //         }

    //         return `${key}=${encodeURIComponent(value)}`;
    //     })
    //     .join('&');
    // console.log("queryString = ", queryString);
    // return queryString;
}


/*
* @param {string} name 
* @param {object} remotesBlock 
*/
export default function (name) {
    let constantName = name;

    function loadRecords(queryParams) {
        return api.get(`/${`${constantName}`}`).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    /**
     * 
     * @param {object} headers 
     * @param {string} role 
     * @returns 
     */
    function loadRecordsWithHeader(headers) {

        // const searchParams = new URLSearchParams();
        // const params = Object.keys(headers).forEach(key => searchParams.append(key, headers[key]));
        const params = objectToQueryString(headers);

        const url = (constantName === 'invoices' || constantName === 'patientsInvoice') ? 'rest/invoices' : constantName === 'users' ? 'rest/users' : constantName === 'report' ? 'rest/reports/getAllgeneratedReports' :
            // constantName == 'partialPayInvoices' ? 'rest/invoices/getAllPartiallyPaidInvoiceData' :
            (constantName === 'hospitalUsers' || constantName == 'adminUsers') ? 'rest/users/getAllUser' : constantName == "hospitals" ? 'rest/hospitals' : constantName == "docs" ? 'rest/documents' : constantName == "adminDocs" ? 'rest/document/adminGetAll' : constantName == "uploadHistory" ? 'rest/invoice-admin/getAllUploadeHistories' : constantName;
        return api.get(`/${url}?${params}`).then((response) => response).catch((error) => Promise.reject(error));
    }

    /**
     * 
     * @param {integer} id 
     * @param {string} queryParams
     * @returns 
     */
    function loadRecord(id) {
        const url = (constantName === 'users' || constantName === 'adminUsers' || constantName === 'hospitalUsers') ? `rest/users/getOne/${id}` : constantName === 'hospitals' ? `rest/hospitals/${id}` : constantName === 'invoices' ? `rest/invoices/getOne/${id}` : `/${constantName}/${id}`;
        return api.get(url).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    /**
     * 
     * @param {object} record 
     * @returns 
     */
    function createRecord(record) {
        const url = (constantName === 'users' || constantName === 'adminUsers' || constantName === 'hospitalUsers') ? 'rest/users' : constantName === 'invoices' ? '/patients/importPatients' : constantName === 'hospitals' ? 'rest/hospitals' : constantName === 'docs' ? 'rest/documents' : `/${constantName}`;
        return api.post(url, record).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    /**
     * 
     * @param {object} record 
     * @returns 
     */
    function updateRecord(record) {
        const url = (constantName === 'users' || constantName === 'adminUsers' || constantName === 'hospitalUsers') ? 'rest/users' : constantName === 'hospitals' ? `rest/hospitals` : constantName === 'invoices' ? 'rest/invoices' : `/${constantName}`;
        return api.put(`/${url}/${record.id}`, record).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    /**
     * 
     * @param {integer} id 
     * @returns 
     */
    function deleteRecord(id) {
        const url = (constantName === 'users' || constantName === 'adminUsers' || constantName === 'hospitalUsers') ? `rest/users/${id}` : constantName === 'report' ? `rest/reports/${id}` : constantName === 'hospitals' ? `rest/hospitals/${id}` : constantName === 'docs' ? `rest/documents/${id}` : `/${constantName}/${id}`;
        return api.delete(url).catch((error) => Promise.reject(error));
    }

    /**
     * 
     * @param {object} headers 
     * @param {string} role 
     * @returns 
     */
    function loadRecordsWithInputAPI(headers, record) {

        // const searchParams = new URLSearchParams();
        // const params = Object.keys(headers).forEach(key => searchParams.append(key, headers[key]));
        const params = objectToQueryString(headers);
        const url = constantName === 'collectedInvoices' ? 'rest/invoices/getAllCollectedInvoiceData' : constantName;
        return api.post(`/${url}?${params}`, record).then((response) => response).catch((error) => Promise.reject(error));
    }

    /**
     * 
     * @param {object} record 
     * @returns 
     */
    function loadActionAPI(record) {
        const url = constantName === 'invoices' ? 'rest/invoice-reminder/sms' : `/${constantName}`;
        return api.post(`/${url}`, record).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    return {
        loadRecords,
        loadRecordsWithHeader,
        loadRecord,
        createRecord,
        updateRecord,
        deleteRecord,
        loadRecordsWithInputAPI,
        loadActionAPI
    }
}