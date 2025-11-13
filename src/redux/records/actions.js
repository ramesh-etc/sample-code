/*
 *
 *  actions
 *
 */
import { createAction } from "@reduxjs/toolkit";

export default function actions(constants) {
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
        CUSTOM_MESSAGE,
        CLEAR_CUSTOM_MESSAGE,
        CLEAR_NOTIFICATIONS,
        CLEAR_INITIAL,
        SET_INITIAL,
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
        LOAD_ACTION,
        LOAD_ACTION_SUCCESS,
        LOAD_ACTION_ERROR
    } = constants;

    const loadRecord = createAction(LOAD_RECORD);
    const loadRecordStartLoad = createAction(LOAD_RECORD_STARTLOAD);
    const loadRecordSuccess = createAction(LOAD_RECORD_SUCCESS);
    const loadRecordError = createAction(LOAD_RECORD_ERROR);
    const loadRecords = createAction(LOAD_RECORDS);
    const loadRecordsSuccess = createAction(LOAD_RECORDS_SUCCESS);
    const loadRecordsError = createAction(LOAD_RECORDS_ERROR);
    const createRecord = createAction(CREATE_RECORD);
    const createRecordSuccess = createAction(CREATE_RECORD_SUCCESS);
    const createRecordError = createAction(CREATE_RECORD_ERROR);
    const updateRecord = createAction(UPDATE_RECORD);
    const updateRecordSuccess = createAction(UPDATE_RECORD_SUCCESS);
    const updateRecordError = createAction(UPDATE_RECORD_ERROR);
    const deleteRecord = createAction(DELETE_RECORD);
    const deleteRecordSuccess = createAction(DELETE_RECORD_SUCCESS);
    const deleteRecordError = createAction(DELETE_RECORD_ERROR);
    const setHeadersData = createAction(SET_HEADERS_DATA);
    const loadRecordsMetaData = createAction(LOAD_RECORDS_META_DATA);
    const loadRecordsMetaDataSuccess = createAction(LOAD_RECORDS_META_DATA_SUCCESS);
    const loadRecordsMetaDataError = createAction(LOAD_RECORDS_META_DATA_ERROR);
    const clearRecord = createAction(CLEAR_RECORD);
    const customMessage = createAction(CUSTOM_MESSAGE);
    const clearCustomMessage = createAction(CLEAR_CUSTOM_MESSAGE);
    const clearNotifications = createAction(CLEAR_NOTIFICATIONS);
    const clearInitial = createAction(CLEAR_INITIAL);
    const setInitial = createAction(SET_INITIAL);
    const clearErrors = createAction(CLEAR_ERRORS);
    const loadRecordsWithInput = createAction(LOAD_RECORDS_WITH_INPUT);
    const loadRecordsWithInputSuccess = createAction(LOAD_RECORDS_WITH_INPUT_SUCCESS);
    const loadRecordsWithInputError = createAction(LOAD_RECORDS_WITH_INPUT_ERROR);
    const setFilterObj = createAction(SET_FILTER_OBJ);
    const setDashboardFilterObj = createAction(SET_DASHBOARD_FILTER_OBJ);
    const editRecordMetaData = createAction(EDIT_RECORDS_META_DATA);
    const editRecordMetaDataSuccess = createAction(EDIT_RECORDS_META_DATA_SUCCESS);
    const editRecordMetaDataError = createAction(EDIT_RECORDS_META_DATA_ERROR);
    const setDefaultHeadersData = createAction(SET_DEFAULT_HEADERS_DATA);
    const loadAction = createAction(LOAD_ACTION);
    const loadActionSuccess = createAction(LOAD_ACTION_SUCCESS);
    const loadActionError = createAction(LOAD_ACTION_ERROR);

    return {
        loadRecord,
        loadRecordStartLoad,
        loadRecordSuccess,
        loadRecordError,
        loadRecords,
        loadRecordsSuccess,
        loadRecordsError,
        createRecord,
        createRecordSuccess,
        createRecordError,
        updateRecord,
        updateRecordSuccess,
        updateRecordError,
        deleteRecord,
        deleteRecordSuccess,
        deleteRecordError,
        setHeadersData,
        loadRecordsMetaData,
        loadRecordsMetaDataSuccess,
        loadRecordsMetaDataError,
        clearRecord,
        customMessage,
        clearCustomMessage,
        clearNotifications,
        setInitial,
        clearInitial,
        clearErrors,
        loadRecordsWithInput,
        loadRecordsWithInputSuccess,
        loadRecordsWithInputError,
        setFilterObj,
        setDashboardFilterObj,
        editRecordMetaData,
        editRecordMetaDataSuccess,
        editRecordMetaDataError,
        setDefaultHeadersData,
        loadAction,
        loadActionSuccess,
        loadActionError
    }
}
