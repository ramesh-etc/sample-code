import { createSelector } from "@reduxjs/toolkit";

/**
 * @param {string} name 
 */
export default function selectors(name) {
    const selectDomain = () => (state) => state[name] || false;

    const selectSettingRecord = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.dashboardrecord || {},
    );

    const selectSettingSuccess = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.dashboardSuccess || false,
    );

    const selectSettingError = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.dashboardError || false,
    );

    return {
        selectDomain,
        selectSettingRecord,
        selectSettingSuccess,
        selectSettingError
    };
}