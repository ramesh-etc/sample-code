import { createReducer } from "@reduxjs/toolkit";
import merge from 'lodash/merge';

const initialState = {
    dashboardrecords: [],
    dashboardrecord: {},
    dashboardLoading: false,
    dashboardError: false,
    dashboardSuccess: false,
    filterObj: { fromDate: new Date(), toDate: new Date() },
    // reportFilterObj: { fromDate: new Date(), toDate: new Date() },
    summary: {},
    collectedreport: [],
    totalPageCount: false,
    totalPageItems: -1,
    current_page: 1,
    headers: {
        offset: 0,
        limit: 25,
        search: false,
        filter: false,
        // sort: false,
        page: 1
    },
};

/**
 * @param {object} constants 
 * @param {string} name 
 */
export default function reducer(constants, name, additionalConstants = {}) {
    const {
        LOAD_DASHBOARD_SUCCESS,
        LOAD_DASHBOARD_ERROR,
        LOAD_DASHBOARD_LOADING,
        CLEAR_DASHBOARD_ERROR,
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

    const dashboardReducer = createReducer(initialState, {
        [LOAD_DASHBOARD_SUCCESS]: (state, action) => {
            state.dashboardLoading = false;
            state.dashboardError = false;
            state.dashboardSuccess = false;
            state.dashboardrecord = action.payload.records
        },
        [LOAD_DASHBOARD_LOADING]: (state, action) => {
            state.dashboardLoading = true;
        },
        [LOAD_DASHBOARD_ERROR]: (state, action) => {
            state.dashboardLoading = false;
            state.dashboardError = action.payload.error;
            state.dashboardSuccess = false;
        },
        [CLEAR_DASHBOARD_ERROR]: (state, action) => {
            state.dashboardLoading = false;
            state.dashboardError = false;
            state.dashboardSuccess = false;
        },
        [SET_FILTER_OBJ]: (state, action) => {
            state.filterObj = action.payload.record
        },
        // [SET_DASHBOARD_FILTER_OBJ]: (state, action) => {
        //     state.reportFilterObj = action.payload.record
        // }
        [GET_SUMMARY_SUCCESS]: (state, action) => {
            state.summary = action.payload.records;
        },
        [GET_SUMMARY_ERROR]: (state, action) => {
            state.dashboardError = action.payload.error;
        },
        [COLLECTED_REPORT_FOR_DATE_SUCCESS]: (state, action) => {
            state.collectedreport = [...state.collectedreport, ...action.payload.records];
            state.totalPageCount = parseInt(action.payload.total_pages);
            state.totalPageItems = parseInt(action.payload.total_items);
            state.current_page = parseInt(action.payload.current_page);
        },
        [COLLECTED_REPORT_FOR_DATE_ERROR]: (state, action) => {
            state.dashboardError = action.payload.error;
        },
        [CLEAR_COLLECTED_REPORT]: (state, action) => {
            state.collectedreport = [];
            state.summary = {};
        },
        [SET_HEADER]: (state, action) => {
            state.headers = Object.assign({}, state.headers, action.payload.record);
            // state.headers = Object.assign({}, action.payload.record);
        },
        [SET_INITIAL_HEADER]: (state, action) => {
            state.headers = Object.assign({}, action.payload.record);
        },
        [UPDATE_REPORT_DETAILS_ERROR]: (state, action) => {
            state.dashboardError = action.payload.error;
        }
    })
    return dashboardReducer;
}