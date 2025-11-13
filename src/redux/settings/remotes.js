/**
 * remotes
 */

import api from '../../utils/api';

/*
* @param {string} name 
* @param {object} remotesBlock 
*/
export default function (name) {
    const constantName = name;

    /**
     * 
     * @param {object} record 
     * @returns 
     */
    function loadSettingsApi(record) {
        const url = constantName === 'provider' ? `/rest/hospitals/${record?.id}` : constantName === 'reminders' ? `/rest/reminder-settings` : constantName === 'hipaa' ? `/rest/settings/getSettings` : `/${constantName}/${record?.id}`;

        return api.get(url).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    /**
     * 
     * @param {object} record 
     * @returns 
     */
    function updateSettingsApi(record) {
        const url = (constantName === 'provider') ? `/rest/hospitals/${record.id}` : constantName === 'reminders' ? `/rest/reminder-settings` : constantName === 'hipaa' ? `/rest/settings/setSettings` : `/${constantName}`;
        return api.put(`${url}`, record).then((response) => response.data).catch((error) => Promise.reject(error));
    }

    return {
        loadSettingsApi,
        updateSettingsApi
    }
}