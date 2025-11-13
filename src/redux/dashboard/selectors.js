import { createSelector } from "@reduxjs/toolkit";

/**
 * @param {string} name 
 */
export default function selectors(name) {
    const selectDomain = () => (state) => state[name] || false;

    const selectDashboardRecord = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.dashboardrecord || {},
    );

    const selectDashboardSuccess = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.dashboardSuccess || false,
    );

    const selectDashboardError = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.dashboardError || false,
    );

    const selectHeaders = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.headers || false,
    );

    const selectSummary = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.summary || {},
    );

    const selectCollectedreport = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.collectedreport || {},
    );

    return {
        selectDomain,
        selectDashboardRecord,
        selectDashboardSuccess,
        selectDashboardError,
        selectHeaders,
        selectSummary,
        selectCollectedreport
    };
}