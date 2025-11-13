
import { call, take, put, race, select, all, delay, takeLatest, takeEvery } from 'redux-saga/effects';
import { verifySession as verifySessionAction } from '../app/actions';
import store2 from 'store2';

export default function sagas(constants, actions, remotes, selectors, entityUrl, additionalSaga) {

    const {
        LOAD_SETTINGS,
        UPDATE_SETTINGS
    } = constants;

    const {
        loadSettings,
        loadSettingsSuccess,
        loadSettingsError,
        loadSettingsLoading,
        updateSettingsSuccess,
        updateSettingsError
    } = actions;

    const {
        loadSettingsApi,
        updateSettingsApi
    } = remotes;

    const {

    } = selectors;




    function* loadSettnigsSaga() {
        while (true) { // eslint-disable-line no-constant-condition
            const action = yield take(LOAD_SETTINGS);
            const { record } = action.payload;
            const defaultLoadSettingsError = `Failed to load ${entityUrl}`;
            try {
                let result;
                yield put(loadSettingsLoading());
                result = yield call(loadSettingsApi, record);

                if (result) {
                    if (entityUrl == "hipaa" && typeof result?.session_timeout == "undefined") {
                        result.session_timeout = 3600;
                    }
                    // if (entityUrl == "reminders") {
                    //     const reminderObj = Object.assign({}, { ...result }, { ...(JSON.parse(result?.email_template)) }, { ...(JSON.parse(result?.msg_template)) });
                    //     console.log("reminderObj = ", reminderObj);
                    //     yield put(loadSettingsSuccess({ records: reminderObj }));
                    // } else {
                    yield put(loadSettingsSuccess({ records: result }));
                    // }

                } else {
                    yield put(loadSettingsError({ error: defaultLoadSettingsError }));
                }
            } catch (error) {
                const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : defaultLoadSettingsError;
                yield put(loadSettingsError({ error: Err }));
            }
        }
    }

    function* updateSettnigsSaga() {
        // while (true) { // eslint-disable-line no-constant-condition
        yield takeLatest(UPDATE_SETTINGS, function* updater(action) {
            // const action = yield take(UPDATE_SETTINGS);reminders
            const { record, loaderFn } = action.payload;
            const defaultUpdateSettingsError = `Failed to update ${entityUrl}`;
            const defaultUpdateSuccess = `${entityUrl == "provider" ? "Provider Profile" : entityUrl == "reminders" ? "Messaging" : entityUrl == "hipaa" ? "HIPAA Compliance" : entityUrl} updated`
            const secret = store2.get('secret');
            try {
                let result;
                result = yield call(updateSettingsApi, record);
                if (result) {
                    yield put(loadSettings({ record: { id: record.id } }));
                    yield delay(2000);
                    yield put(updateSettingsSuccess({ records: result, success: defaultUpdateSuccess }));

                    if (entityUrl == "provider") {
                        yield put(verifySessionAction({ secret: secret }));
                    }
                } else {
                    yield put(updateSettingsError({ error: defaultUpdateSettingsError }));
                }
            } catch (error) {
                const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : defaultUpdateSettingsError;
                yield put(updateSettingsError({ error: Err }));
            } finally {
                if (loaderFn) {
                    loaderFn();
                }
            }
        })
    }

    return function* recordsSaga() {
        yield all([
            loadSettnigsSaga(),
            updateSettnigsSaga()
        ])
    }

}