/*
 *
 *  actions
 *
 */
import { createAction } from "@reduxjs/toolkit";

export default function actions(constants) {
    const {
        LOAD_DASHBOARD,
        LOAD_DASHBOARD_SUCCESS,
        LOAD_DASHBOARD_ERROR,
        LOAD_DASHBOARD_LOADING,
        CLEAR_DASHBOARD_ERROR,
        // LOAD_DASHBOARD_RECORDS,
        // LOAD_DASHBOARD_RECORDS_SUCCESS,
        // LOAD_DASHBOARD_RECORDS_ERROR,
        SET_FILTER_OBJ,
        // SET_DASHBOARD_FILTER_OBJ,
        GET_SUMMARY,
        GET_SUMMARY_SUCCESS,
        GET_SUMMARY_ERROR,
        COLLECTED_REPORT_FOR_DATE,
        COLLECTED_REPORT_FOR_DATE_SUCCESS,
        COLLECTED_REPORT_FOR_DATE_ERROR,
        CLEAR_COLLECTED_REPORT,
        SET_HEADER,
        UPDATE_REPORT_DETAILS,
        UPDATE_REPORT_DETAILS_SUCCESS,
        UPDATE_REPORT_DETAILS_ERROR,
        SET_INITIAL_HEADER
    } = constants;

    const loadDashboard = createAction(LOAD_DASHBOARD);
    const loadDashboardSuccess = createAction(LOAD_DASHBOARD_SUCCESS);
    const loadDashboardError = createAction(LOAD_DASHBOARD_ERROR);
    const loadDashboardLoading = createAction(LOAD_DASHBOARD_LOADING);
    const clearDashboardError = createAction(CLEAR_DASHBOARD_ERROR);
    // const loadDashboardRecords = createAction(LOAD_DASHBOARD_RECORDS);
    // const loadDashboardRecordsSuccess = createAction(LOAD_DASHBOARD_RECORDS_SUCCESS);
    // const loadDashboardRecordsError = createAction(LOAD_DASHBOARD_RECORDS_ERROR);
    const setFilterObj = createAction(SET_FILTER_OBJ);
    // const setDashboardFilterObj = createAction(SET_DASHBOARD_FILTER_OBJ);
    const getSummary = createAction(GET_SUMMARY);
    const getSummarySuccess = createAction(GET_SUMMARY_SUCCESS);
    const getSummaryError = createAction(GET_SUMMARY_ERROR);
    const collectedReportForDate = createAction(COLLECTED_REPORT_FOR_DATE);
    const collectedReportForDateSuccess = createAction(COLLECTED_REPORT_FOR_DATE_SUCCESS);
    const collectedReportForDateError = createAction(COLLECTED_REPORT_FOR_DATE_ERROR);
    const clearCollectedReport = createAction(CLEAR_COLLECTED_REPORT);
    const setHeader = createAction(SET_HEADER);
    const updateReportDetails = createAction(UPDATE_REPORT_DETAILS);
    const updateReportDetailSuccess = createAction(UPDATE_REPORT_DETAILS_SUCCESS);
    const updateReportDetailError = createAction(UPDATE_REPORT_DETAILS_ERROR);
    const setInitialHeaders = createAction(SET_INITIAL_HEADER);

    return {
        loadDashboard,
        loadDashboardSuccess,
        loadDashboardError,
        loadDashboardLoading,
        clearDashboardError,
        setFilterObj,
        getSummary,
        getSummarySuccess,
        getSummaryError,
        collectedReportForDate,
        collectedReportForDateSuccess,
        collectedReportForDateError,
        clearCollectedReport,
        setHeader,
        updateReportDetails,
        updateReportDetailSuccess,
        updateReportDetailError,
        setInitialHeaders
        // setDashboardFilterObj
        // loadDashboardRecords,
        // loadDashboardRecordsSuccess,
        // loadDashboardRecordsError
    }
}