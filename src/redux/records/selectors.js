import { createSelector } from "@reduxjs/toolkit";

/**
 * @param {string} name 
 */
export default function selectors(name) {
    const selectDomain = () => (state) => state[name] || false;

    const selectLoading = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.loading || false,
    );

    const selectProgress = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.progress || false,
    );

    const selectRecords = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.records && domain.records || [],
    );

    const selectRecord = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.record && domain.record || {}
    );

    const selectError = () => createSelector(
        selectDomain(),
        (domain) => domain && (domain.error || domain.pageError || false),
    );

    const selectSuccess = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.success || false,
    );

    const selectUpdateError = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.updateError || false,
    );

    const selectTotalPageCount = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.totalPageCount || false,
    );

    const selectHeaders = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.headers || {},
    );

    const selectPageLoader = () => createSelector(
        selectDomain(),
        (domain) => domain && domain.pageLoader || false
    );

    return {
        selectDomain,
        selectProgress,
        selectLoading,
        selectRecords,
        selectRecord,
        selectError,
        selectSuccess,
        selectUpdateError,
        selectTotalPageCount,
        selectHeaders,
        selectPageLoader,
    };
}