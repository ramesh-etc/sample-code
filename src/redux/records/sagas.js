
/*
 *
 *  sagas
 *
 */

import { call, take, put, race, select, all, delay, takeLatest } from 'redux-saga/effects';
import { selectUser } from '../app/selectors';
import history from '../../utils/history';
import {
    DEFAULT_CREATE_RECORD_ERROR,
    DEFAULT_UPDATE_RECORD_ERROR,
    DEFAULT_DELETE_RECORD_ERROR,
    DEFAULT_LOAD_RECORDS_ERROR,
    DEFAULT_LOAD_META_ERROR
} from './errorConstants';
import validation from './validation';
import appRemotes from './remotes';
import { verifySession as verifySessionAction } from '../app/actions';
import store2 from 'store2';
import { showNameFn } from './utils';
// import { startSubmit, stopSubmit } from 'redux-form';

const loadRecordsWithHeaderPage = ['invoices', 'users', 'report', 'hospitalUsers', 'adminUsers', 'hospitals', 'docs', 'adminDocs', 'uploadHistory'];

export default function sagas(constants, actions, remotes, selectors, entityUrl, additionalSaga) {

    const {
        LOAD_RECORD,
        LOAD_RECORDS,
        CREATE_RECORD,
        UPDATE_RECORD,
        DELETE_RECORD,
        LOAD_RECORDS_META_DATA,
        LOAD_RECORDS_WITH_INPUT,
        LOAD_RECORDS_WITH_INPUT_SUCCESS,
        LOAD_RECORDS_WITH_INPUT_ERROR,
        EDIT_RECORDS_META_DATA,
        EDIT_RECORDS_META_DATA_SUCCESS,
        EDIT_RECORDS_META_DATA_ERROR,
        LOAD_ACTION,
        LOAD_ACTION_SUCCESS,
        LOAD_ACTION_ERROR
    } = constants;

    const {
        loadRecord: loadRecordAction,
        loadRecordStartLoad,
        loadRecordSuccess,
        loadRecordError,
        loadRecords: loadRecordsAction,
        loadRecordsSuccess,
        loadRecordsError,
        createRecordSuccess,
        createRecordError,
        updateRecordSuccess,
        updateRecordError,
        deleteRecordSuccess,
        deleteRecordError,
        loadRecordsMetaDataSuccess,
        loadRecordsMetaDataError,
        setInitial,
        loadRecordsWithInput,
        loadRecordsWithInputSuccess,
        loadRecordsWithInputError,
        editRecordMetaData,
        editRecordMetaDataSuccess,
        editRecordMetaDataError,
        loadAction,
        loadActionSuccess,
        loadActionError
    } = actions;

    const {
        loadRecord,
        loadRecords,
        loadRecordsWithHeader,
        createRecord,
        updateRecord,
        deleteRecord,
        loadRecordsWithInputAPI,
        loadActionAPI
    } = remotes;

    const {
        selectProgress,
        // selectUpdateTimestamp,
        selectHeaders,
        // selectTotalPageCount
    } = selectors;




    function* loadRecordsSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            //   const load = yield race({
            //     explicitLoad: take(LOAD_RECORDS),
            //   });
            const action = yield take(LOAD_RECORDS);

            // const { explicitLoad } = action.payload;
            const { invalidateCache, queryParams, showSuccess } = action.payload || {};

            //   yield put(loadRecordsMetaData());// Calling Dropdown API's

            // if (explicitLoad) {
            // if (!invalidateCache && (lastLoad && (lastLoad - currentTimestamp) > VALID_CACHE_DIFF)) {
            //   yield put(loadRecordsCacheHit());
            // } else {
            try {
                const headers = { ...yield select(selectHeaders()) };
                let result;
                if (entityUrl == 'adminUsers') {
                    headers.type = "admin"
                } else if (entityUrl == 'hospitalUsers') {
                    headers.type = "hospital"
                }
                result = loadRecordsWithHeaderPage.includes(entityUrl) ? yield call(loadRecordsWithHeader, headers) : yield call(loadRecords);
                if (result && (loadRecordsWithHeaderPage.includes(entityUrl))) {
                    yield put(loadRecordsSuccess({
                        records: result.data && result.data.response || [],
                        total_pages: result.data && result.data.total_pages || false,
                        total_items: result.data && result.data.total_items || false,
                        current_page: result.data && result.data.current_page || false,
                    }));
                } else if (result) {
                    yield put(loadRecordsSuccess({ records: result }));
                } else {
                    yield put(loadRecordsError({ error: DEFAULT_LOAD_RECORDS_ERROR }));
                }
            } catch (error) {
                const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_LOAD_RECORDS_ERROR;
                yield put(loadRecordsError({ error: Err }));
            } finally {
                if (showSuccess) {
                    yield put(showSuccess);
                }
            }
            // }
            //   }
        }
    }

    function* loadRecordSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            //   const loadRequest = yield race({
            //     request: take(LOAD_RECORD),
            //   });
            const action = yield take(LOAD_RECORD);

            const { id, queryParams, parentFn } = action.payload || {};

            if (action.payload) {
                // yield put(loadRecordStartLoad());
                // const { id, queryParams } = request;
                try {
                    const record = yield call(loadRecord, id, queryParams);

                    //   let recordsMetaData = {};

                    if (record) {
                        // Delays the dispatch of loadRecordSuccess untill the store is populated with an initial list of records.
                        // while (true) { // eslint-disable-line no-constant-condition
                        //   const recordsInStore = yield select(selectRecords());
                        //   if (recordsInStore && recordsInStore.length > 0) {
                        //     break;
                        //   }
                        //   yield delay(500);
                        // }
                        yield put(loadRecordSuccess({ record: record }));
                        if (parentFn) {
                            parentFn();
                        }
                    } else {
                        yield put(loadRecordError({ error: 'error' }));
                    }
                } catch (error) {
                    yield put(loadRecordError({ error: error }));
                }
            }
        }
    }

    function* createRecordSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            const action = yield take(CREATE_RECORD);
            const { record, parentFn, loaderFn, form } = action.payload || {};
            if (action) {
                // yield put(startSubmit(form));

                const redirectURL = entityUrl == 'users' ? `/users` : `/${entityUrl}`;
                const sessionUser = yield select(selectUser());

                try {
                    yield call(validation, record, Object.assign({}, { user: sessionUser }));
                    const result = yield call(createRecord, record);

                    let showMessage = showNameFn(entityUrl, "create");
                    let successMessage = entityUrl == "invoices" ? false : entityUrl == "docs" ? "Files Uploaded " : `${showMessage} created`;
                    if (result) {

                        // yield put(stopSubmit(form));
                        yield put(setInitial({ initial: record }));
                        if (entityUrl != 'invoices') {
                            yield put(loadRecordsAction({ invalidateCache: true, showSuccess: createRecordSuccess({ record: result, success: successMessage }) }));
                        }
                        // yield delay(1500);
                        if (entityUrl == 'invoices') {
                            yield put(createRecordSuccess({ record: result, success: successMessage }));
                        }
                        // if (loaderFn) {
                        //     loaderFn();
                        // }
                        if (parentFn) {
                            // yield delay(3000);
                            parentFn(result);
                        }
                        // if (entityUrl != 'invoices') {
                        //     history.push({ pathname: redirectURL, state: history.location.state });
                        // }

                    } else {
                        yield put(createRecordError({ error: { [form]: DEFAULT_CREATE_RECORD_ERROR } }));
                        // yield put(stopSubmit(form, { _error: DEFAULT_CREATE_RECORD_ERROR }));
                    }

                } catch (error) {
                    const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_CREATE_RECORD_ERROR;
                    yield put(createRecordError({ error: { [form]: Err } }));
                    // yield put(stopSubmit(form, { _error: Err }));
                } finally {
                    // yield put(stopSubmit(form));
                    if (loaderFn) {
                        loaderFn()
                    }
                }
            }
        }
    }

    function* editRecordSaga() {
        yield takeLatest(UPDATE_RECORD, function* updater(action) {
            const { record, form, loaderFn, parentFn } = action.payload;
            if (record) {
                // yield put(startSubmit(form));
                // const path = history && history.location.pathname;
                // const redirectURL = entityUrl == 'users' ? `/users` : `/${entityUrl}`;
                // const sessionUser = yield call(verifySessionApi);

                try {
                    //   yield call(validation, record, Object.assign({}, { user: sessionUser }));
                    const result = yield call(updateRecord, record);

                    if (result) {

                        let showMessage = showNameFn(entityUrl, "edit");
                        let successMessage = entityUrl == "patientsInvoice" ? false : `${showMessage} updated`;
                        yield put(loadRecordsAction({ invalidateCache: true, showSuccess: updateRecordSuccess({ record: result, success: { [form]: successMessage } }) }));
                        // yield delay(1500);
                        // yield put(updateRecordSuccess({ record: result, success: successMessage }));
                        // yield put(push({ pathname: redirectURL, state: history.location.state }));
                        // history.push({ pathname: redirectURL, state: history.location.state })
                        if (parentFn) {
                            // yield delay(3000);
                            parentFn(result);
                        }
                    } else {
                        yield put(updateRecordError({ error: { [form]: DEFAULT_UPDATE_RECORD_ERROR } }));
                        // yield put(stopSubmit(form, { _error: DEFAULT_UPDATE_RECORD_ERROR }));
                    }

                } catch (error) {
                    const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_UPDATE_RECORD_ERROR;
                    yield put(updateRecordError({ error: { [form]: Err } }));
                    //   yield put(stopSubmit(form, { _error: Err }));
                } finally {
                    // yield put(stopSubmit(form));
                    if (loaderFn) {
                        loaderFn()
                    }
                }
            }
        })
    }


    function* deleteRecordSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            // const { del } = yield race({
            //     del: take(DELETE_RECORD),
            // });
            const action = yield take(DELETE_RECORD);
            const { id, form, queryParams, parentFn, loaderFn } = action.payload || {};
            if (action) {
                // yield put(startSubmit(form));
                // const redirectURL = `/${entityUrl}`;
                let showMessage = showNameFn(entityUrl, "delete");

                let successMessage = `${showMessage} deleted`;

                try {
                    yield call(deleteRecord, id);

                    yield put(loadRecordsAction({ invalidateCache: true, showSuccess: deleteRecordSuccess({ id: id, success: successMessage }) }));
                    // yield delay(1500);
                    // yield put(deleteRecordSuccess({ id: id, success: successMessage }));
                    if (parentFn) {
                        parentFn();
                    }
                    // yield put(stopSubmit(form));
                    // if (entityUrl === 'rest/users') {
                    //     const secret = store2.get('secret');
                    //     yield put(verifySessionAction({ secret: secret }));
                    // }
                    // history.push({ pathname: redirectURL, state: history.location.state });
                    // if (entityUrl === 'rest/practice-template') {
                    //     yield put(loadRecordsAction({ invalidateCache: true, queryParams: queryParams }));
                    // } else if (entityUrl === 'rest/eztekpay/users' || entityUrl === 'rest/practice/users') {
                    //     const queryParams = entityUrl === 'rest/eztekpay/users' ? 'admin' : entityUrl === 'rest/practice/users' ? 'practice' : false;
                    //     yield put(loadRecordsAction({ invalidateCache: true, queryParams: queryParams }));
                    // }
                } catch (error) {
                    const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_DELETE_RECORD_ERROR;
                    yield put(deleteRecordError({ error: Err }));
                    // yield put(stopSubmit(form, { _error: Err }));
                } finally {
                    if (loaderFn) {
                        loaderFn();
                    }
                }
            }
        }
    }

    function* loadRecordsMetaDataSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            //   const loadMetaData = yield race({
            //     metaData: take(LOAD_RECORDS_META_DATA),
            //   });
            const action = yield take(LOAD_RECORDS_META_DATA)
            if (action) {
                try {

                    let recordsMetaData = {};
                    yield put(loadRecordsMetaDataSuccess(recordsMetaData));
                } catch (error) {
                    yield put(loadRecordsMetaDataError(error));
                }
            }
        }
    }

    function* loadRecordsWithInputSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            //   const load = yield race({
            //     explicitLoad: take(LOAD_RECORDS),
            //   });
            const action = yield take(LOAD_RECORDS_WITH_INPUT);

            // const { explicitLoad } = action.payload;
            const { inputObj } = action.payload || {};

            //   yield put(loadRecordsMetaData());// Calling Dropdown API's

            // if (explicitLoad) {
            // if (!invalidateCache && (lastLoad && (lastLoad - currentTimestamp) > VALID_CACHE_DIFF)) {
            //   yield put(loadRecordsCacheHit());
            // } else {
            try {
                const headers = yield select(selectHeaders());
                let result;
                // if (entityUrl == 'partialPayInvoices') {
                //     result = yield call(loadRecordsWithHeader, headers);
                // } else {
                result = yield call(loadRecordsWithInputAPI, headers, inputObj);
                // }

                if (result) {
                    yield put(loadRecordsWithInputSuccess({ records: result.data && result.data.response || [], total_pages: result.data && result.data.total_pages || false, total_items: result.data && result.data.total_items || false, current_page: result.data && result.data.current_page || false, }));
                } else {
                    yield put(loadRecordsWithInputError({ error: DEFAULT_LOAD_RECORDS_ERROR }));
                }
            } catch (error) {
                const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_LOAD_RECORDS_ERROR;
                yield put(loadRecordsWithInputError({ error: Err }));
            }
            // }
            //   }
        }
    }

    function* editRecordsMetaDataSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            const action = yield take(EDIT_RECORDS_META_DATA);
            const { parentFn } = action.payload || {};
            if (action) {
                try {
                    let recordsMetaData = {};
                    if (entityUrl === 'hospitalUsers') {
                        const hospitalUsersRemotes = yield call(appRemotes, 'rest/getAllHospitalNames');
                        const hospitalUsers = yield call(hospitalUsersRemotes.loadRecords);
                        const hospitalUsersOptions = (hospitalUsers || []).map(c => Object.assign({}, { label: c.name, value: c.id, id: c.id }));
                        recordsMetaData = { hospitalUsersOptions };
                    }
                    yield put(editRecordMetaDataSuccess({ recordsMetaData: recordsMetaData }));
                } catch (error) {
                    const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_LOAD_META_ERROR;
                    yield put(editRecordMetaDataError({ error: Err }));
                } finally {
                    if (parentFn) {
                        parentFn();
                    }
                }
            }
        }
    }

    function* loadActionSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            const action = yield take(LOAD_ACTION);
            const { record, form, loaderFn } = action.payload || {};
            if (action) {
                let errMessage = "";
                let successMessage = "";
                if (entityUrl == "invoices" && record?.sms && record?.email) {
                    errMessage = `Failed to sent Email and SMS`;
                    successMessage = "Sent Email and SMS";
                } else if (entityUrl == "invoices" && (record?.sms || record?.email)) {
                    errMessage = `Failed to sent ${record?.sms ? "SMS" : record?.email ? "Email" : ""}`;
                    successMessage = `Sent ${record?.sms ? "SMS" : record?.email ? "Email" : ""}`;
                }

                try {
                    const result = yield call(loadActionAPI, record);
                    if (result) {
                        // yield put(loadActionSuccess({ record: result, success: successMessage }));
                        if (entityUrl == 'invoices') {
                            yield put(loadRecordsAction({ invalidateCache: true, showSuccess: loadActionSuccess({ record: result, success: { [form]: successMessage } }) }));
                        }
                    } else {
                        yield put(loadActionError({ error: { [form]: errMessage } }));
                    }

                } catch (error) {
                    const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : errMessage;
                    yield put(loadActionError({ error: { [form]: Err } }));
                } finally {
                    // yield put(stopSubmit(form));
                    if (loaderFn) {
                        loaderFn()
                    }
                }
            }
        }
    }

    return function* recordsSaga() {
        yield all([
            loadRecordSaga(),
            loadRecordsSaga(),
            createRecordSaga(),
            editRecordSaga(),
            deleteRecordSaga(),
            loadRecordsMetaDataSaga(),
            loadRecordsWithInputSaga(),
            editRecordsMetaDataSaga(),
            loadActionSaga()
        ])
    }

}
