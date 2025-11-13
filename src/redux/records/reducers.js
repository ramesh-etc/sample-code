import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    records: [],
    record: {},
    recordsMetaData: {},
    editMetaData: {},
    loading: false,
    updateLoader: false,
    // pageLoader: false,
    pageError: false,
    updateError: false,
    error: false,
    success: false,
    updateSuccess: false,
    progress: false,
    lastUpdate: null,
    totalPageCount: false,
    totalPageItems: -1,
    headers: {
        offset: 0,
        limit: 25,
        search: false,
        filter: false,
        // sort: false,
        page: 1
    },
    initial: {},
    filter: { state: 'AZ' },
    withInputLoading: false,
    withInputRecords: [],
    filterObj: { fromDate: new Date(), toDate: new Date() },
};

/**
 * @param {object} constants 
 * @param {string} name 
 */
export default function reducer(constants, name, additionalConstants = {}) {

    const {
        LOAD_RECORD,
        LOAD_RECORD_STARTLOAD,
        LOAD_RECORD_SUCCESS,
        LOAD_RECORD_ERROR,
        LOAD_RECORDS,
        LOAD_RECORDS_SUCCESS,
        LOAD_RECORDS_ERROR,
        CREATE_RECORD,
        CREATE_RECORD_SUCCESS,
        CREATE_RECORD_ERROR,
        UPDATE_RECORD,
        UPDATE_RECORD_SUCCESS,
        UPDATE_RECORD_ERROR,
        DELETE_RECORD,
        DELETE_RECORD_SUCCESS,
        DELETE_RECORD_ERROR,
        SET_HEADERS_DATA,
        LOAD_RECORDS_META_DATA,
        LOAD_RECORDS_META_DATA_SUCCESS,
        LOAD_RECORDS_META_DATA_ERROR,
        CLEAR_RECORD,
        CLEAR_NOTIFICATIONS,
        SET_INITIAL,
        CLEAR_INITIAL,
        CLEAR_ERRORS,
        LOAD_RECORDS_WITH_INPUT,
        LOAD_RECORDS_WITH_INPUT_SUCCESS,
        LOAD_RECORDS_WITH_INPUT_ERROR,
        SET_FILTER_OBJ,
        SET_DASHBOARD_FILTER_OBJ,
        EDIT_RECORDS_META_DATA,
        EDIT_RECORDS_META_DATA_SUCCESS,
        EDIT_RECORDS_META_DATA_ERROR,
        SET_DEFAULT_HEADERS_DATA,
        LOAD_ACTION_SUCCESS,
        LOAD_ACTION_ERROR
    } = constants;

    const recordReducer = createReducer(initialState, {
        [LOAD_RECORDS]: (state, action) => {
            state.loading = true;
            state.error = false;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        },
        [LOAD_RECORD]: (state, action) => {
            state.updateLoader = true;
            state.pageError = false;
            state.error = false;
            state.success = false;
            state.progress = false;
        },
        [LOAD_RECORDS_WITH_INPUT]: (state, action) => {
            state.withInputLoading = true;
            state.error = false;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        },
        [LOAD_RECORDS_WITH_INPUT_SUCCESS]: (state, action) => {
            state.withInputRecords = action.payload.records;
            state.lastUpdate = Math.floor(Date.now() / 1000);
            state.totalPageCount = parseInt(action.payload.total_pages);
            state.totalPageItems = parseInt(action.payload.total_items);
            state.withInputLoading = false;
            state.error = false;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        },
        [LOAD_RECORDS_WITH_INPUT_ERROR]: (state, action) => {
            state.withInputLoading = false;
            state.error = action.payload.error;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        },
        [LOAD_RECORD_SUCCESS]: (state, action) => {
            state.record = (state?.record?.id === action.payload.record?.id) ? Object.assign({}, state.record, action.payload.record) : Object.assign({}, action.payload.record);
            state.recordsMetaData = Object.assign({}, state.recordsMetaData, action.payload.recordsMetaData);
            state.pageError = false;
            state.updateLoader = false;
            state.error = false;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        },
        [LOAD_RECORDS_SUCCESS]: (state, action) => {
            state.records = action.payload.records;
            state.lastUpdate = Math.floor(Date.now() / 1000);
            state.totalPageCount = parseInt(action.payload.total_pages);
            state.totalPageItems = parseInt(action.payload.total_items);
            state.loading = false;
            state.error = false;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        },
        [UPDATE_RECORD_ERROR]: (state, action) => {
            state.loading = false;
            // state.error = false;
            state.updateError = action.payload.error;
            state.updateSuccess = false;
            // state.success = false;
            state.progress = false;
        }, [DELETE_RECORD_ERROR]: (state, action) => {
            state.loading = false;
            state.updateError = action.payload.error;
            state.updateSuccess = false;
            // state.error = false;
            // state.success = false;
            state.progress = false;
        }, [LOAD_RECORDS_ERROR]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        }, [LOAD_RECORD_ERROR]: (state, action) => {
            state.loading = false;
            state.updateLoader = false;
            state.pageError = true;
            state.error = false;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        }, [CREATE_RECORD_ERROR]: (state, action) => {
            state.loading = false;
            // state.updateLoader = false;
            state.pageError = false;
            state.error = false;
            state.updateError = action.payload.error;
            state.success = false;
            state.progress = false;
        }, [CREATE_RECORD_SUCCESS]: (state, action) => {

            state.record = action.payload.record;

            state.loading = false;
            state.error = false;
            state.updateError = false;
            state.success = action.payload.success;
            state.progress = false;
        }, [UPDATE_RECORD_SUCCESS]: (state, action) => {
            // state.records = state.records.find(r => action.payload.record.id === r.id) ? state.records.map((r) => action.payload.record.id === r.id ? Object.assign({}, r, action.payload.record) : Object.assign({}, r)) : state.records.concat([Object.assign({}, action.payload.record)]);
            state.record = Object.assign({}, state.record, action.payload.record);
            state.loading = false;
            // state.error = false;
            state.updateError = false;
            state.updateSuccess = action.payload.success;
            state.progress = false;
        },
        [DELETE_RECORD_SUCCESS]: (state, action) => {
            state.records = state.records.filter((r, i) => r.id !== action.payload.id);
            state.loading = false;
            // state.error = false;
            state.updateError = false;
            state.updateSuccess = action.payload.success;
            state.progress = false;
        },
        // [DELETE_RECORD]: (state, action) => {
        //     state.loading = false;
        //     state.error = false;
        //     state.updateError = false;
        //     state.success = action.payload.success;
        //     state.progress = false;
        // },
        [SET_HEADERS_DATA]: (state, action) => {
            state.headers = Object.assign({}, state.headers, action.payload.record);
            // state.headers = Object.assign({}, action.payload.record);
        },
        [SET_DEFAULT_HEADERS_DATA]: (state, action) => {
            state.headers = Object.assign({}, action.payload.record);
        },
        [LOAD_RECORDS_META_DATA_SUCCESS]: (state, action) => {

            state.recordsMetaData = Object.assign({}, state.recordsMetaData, action.payload.recordsMetaData);
            state.error = false;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        },
        [LOAD_RECORDS_META_DATA_ERROR]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.updateError = action.payload.error;
            state.success = false;
            state.progress = false;
        },
        [CLEAR_RECORD]: (state, action) => {
            state.record = {};
            state.updateError = false;
        },
        [CLEAR_NOTIFICATIONS]: (state, action) => {
            state.updateError = false;
            state.updateSuccess = false;
        },
        [SET_INITIAL]: (state, action) => {
            state.initial = action.payload.initial;
        },
        [CLEAR_INITIAL]: (state, action) => {
            state.initial = {};
        },
        [CLEAR_ERRORS]: (state, action) => {
            state.error = false;
            state.success = false;
            state.progress = false;
        },
        [SET_FILTER_OBJ]: (state, action) => {
            state.filterObj = action.payload.record
        },
        // [SET_DASHBOARD_FILTER_OBJ]: (state, action) => {
        //     state.reportFilterObj = action.payload.record
        // }
        [EDIT_RECORDS_META_DATA_SUCCESS]: (state, action) => {

            state.editMetaData = Object.assign({}, state.editMetaData, action.payload.recordsMetaData);
            state.error = false;
            state.updateError = false;
            state.success = false;
            state.progress = false;
        },
        [EDIT_RECORDS_META_DATA_ERROR]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.updateError = action.payload.error;
            state.success = false;
            state.progress = false;
        },
        // [EDIT_RECORDS_META_DATA]: (state, action) => {
        //     console.log("actionentered = ", action);
        // },
        [LOAD_ACTION_SUCCESS]: (state, action) => {
            state.updateSuccess = action.payload.success;
            state.updateError = false;
        },
        [LOAD_ACTION_ERROR]: (state, action) => {
            state.updateSuccess = false;
            state.updateError = action.payload.error;
        }
    });

    return recordReducer;
}
