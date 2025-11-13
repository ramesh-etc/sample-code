
import { call, take, put, race, select, all, delay, takeLatest, takeEvery } from 'redux-saga/effects';
import { selectUser } from '../app/selectors';
import history from '../../utils/history';
import {
    DEFAULT_DASHBOARD_LOAD_RECORD_ERROR,
    DEFAUT_REPORT_SUMMARY_ERROR,
    DEFAULT_COLLECTED_REPORT_DATE_ERROR,
    DEFAULT_UPDATE_REPORT_DETAIL_ERROR
} from './errorConstants';
import { verifySession as verifySessionAction } from '../app/actions';
import store2 from 'store2';


export default function sagas(constants, actions, remotes, selectors, entityUrl, additionalSaga) {

    const {
        LOAD_DASHBOARD,
        GET_SUMMARY,
        GET_SUMMARY_SUCCESS,
        GET_SUMMARY_ERROR,
        COLLECTED_REPORT_FOR_DATE,
        COLLECTED_REPORT_FOR_DATE_SUCCESS,
        COLLECTED_REPORT_FOR_DATE_ERROR,
        UPDATE_REPORT_DETAILS,
        UPDATE_REPORT_DETAILS_SUCCESS,
        UPDATE_REPORT_DETAILS_ERROR
        // LOAD_DASHBOARD_RECORDS,
        // LOAD_DASHBOARD_RECORDS_SUCCESS,
        // LOAD_DASHBOARD_RECORDS_ERROR
    } = constants;

    const {
        loadDashboard,
        loadDashboardSuccess,
        loadDashboardError,
        loadDashboardLoading,
        getSummary,
        getSummarySuccess,
        getSummaryError,
        collectedReportForDate,
        collectedReportForDateSuccess,
        collectedReportForDateError,
        updateReportDetails,
        updateReportDetailSuccess,
        updateReportDetailError,
        setHeader,
        // loadDashboardRecords,
        // loadDashboardRecordsSuccess,
        // loadDashboardRecordsError
    } = actions;

    const {
        loadRecord,
        getSummaryApi,
        collectedReportForDateApi,
        updateReportDetailApi
    } = remotes;

    const {
        selectRecord,
        selectRecords,
        // selectUpdateTimestamp,
        selectHeaders,
        selectSummary,
        selectCollectedreport
        // selectTotalPageCount
    } = selectors;




    function* loadDashboardSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            //   const load = yield race({
            //     explicitLoad: take(LOAD_RECORDS),
            //   });
            const action = yield take(LOAD_DASHBOARD);
            const { record } = action.payload;

            try {
                let result;
                yield put(loadDashboardLoading());
                result = yield call(loadRecord, record);

                if (result) {
                    yield put(loadDashboardSuccess({ records: result }));
                } else {
                    yield put(loadDashboardError({ error: DEFAULT_DASHBOARD_LOAD_RECORD_ERROR }));
                }
            } catch (error) {
                const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_DASHBOARD_LOAD_RECORD_ERROR;
                yield put(loadDashboardError({ error: Err }));
            }
            // }
            //   }
        }
    }

    function* getSummarySaga() {
        while (true) { // eslint-disable-line no-constant-condition
            const action = yield take(GET_SUMMARY);
            const { record, parentFn } = action.payload;

            try {
                let result;
                result = yield call(getSummaryApi, record);

                if (result) {
                    yield put(getSummarySuccess({ records: result }));
                    if (parentFn) {
                        parentFn();
                    }
                } else {
                    yield put(getSummaryError({
                        error: DEFAUT_REPORT_SUMMARY_ERROR
                    }));
                }
            } catch (error) {
                const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAUT_REPORT_SUMMARY_ERROR;
                yield put(getSummaryError({ error: Err }));
            }
        }
    }

    // function* loadCollectedInvoiceForDateSaga() {
    //     while (true) { // eslint-disable-line no-constant-condition
    //         const action = yield takeLatest(COLLECTED_REPORT_FOR_DATE);
    //         const { record, closeStepper, stepChange } = action.payload;
    function* loadCollectedInvoiceForDateSaga(action) {
        const { record, closeStepper, stepChange } = action.payload;

        try {
            const headers = yield select(selectHeaders());
            let result;
            result = yield call(collectedReportForDateApi, headers, record);

            if (result) {
                yield put(collectedReportForDateSuccess({
                    records: result?.response || [],
                    total_pages: result?.total_pages || false,
                    total_items: result?.total_items || false,
                    current_page: result?.current_page || false,
                }));
                // if (result?.response?.length) {
                if (result?.response?.length && result?.current_page && result?.total_pages && (result?.current_page != result?.total_pages && result?.hasMore)) {
                    yield put(setHeader({ record: { offset: (headers.offset + 1) + headers.limit, page: headers.page + 1, limit: 25 } }));
                    yield put(collectedReportForDate({ record: record, closeStepper: closeStepper, stepChange: stepChange }));
                } else {
                    const summary = yield select(selectSummary());
                    const collectedreport = yield select(selectCollectedreport());
                    if (stepChange) {
                        stepChange({ summary, collectedreport, record });
                    }
                }
                // } else {

                // }
            } else {
                yield put(collectedReportForDateError({
                    error: DEFAULT_COLLECTED_REPORT_DATE_ERROR
                }));
                if (closeStepper) {
                    closeStepper();
                }
            }
        } catch (error) {
            const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_COLLECTED_REPORT_DATE_ERROR;
            yield put(collectedReportForDateError({ error: Err }));
            if (closeStepper) {
                closeStepper();
            }
        }
        // }
    }

    function* updateReportDetailSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            const action = yield take(UPDATE_REPORT_DETAILS);
            const { record, closeStepper, loader } = action.payload;

            try {
                let result;
                result = yield call(updateReportDetailApi, record);

                if (result) {
                    yield put(updateReportDetailSuccess({
                        records: result
                    }));
                } else {
                    yield put(updateReportDetailError({
                        error: DEFAULT_UPDATE_REPORT_DETAIL_ERROR
                    }));
                }
            } catch (error) {
                const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : DEFAULT_UPDATE_REPORT_DETAIL_ERROR;
                yield put(updateReportDetailError({ error: Err }));
            } finally {
                if (closeStepper) {
                    closeStepper();
                }
            }
        }
    }

    function* watchLoadCollectedInvoiceForDateSaga() {
        yield takeEvery(COLLECTED_REPORT_FOR_DATE, loadCollectedInvoiceForDateSaga);
    }

    return function* recordsSaga() {
        yield all([
            loadDashboardSaga(),
            getSummarySaga(),
            watchLoadCollectedInvoiceForDateSaga(),
            updateReportDetailSaga(),
        ])
    }

}