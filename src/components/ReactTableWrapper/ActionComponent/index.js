
import React from "react";
import EditOrCreateForm from "../EditOrCreateForm";
import useStyles from "./styles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Grid, Button, IconButton } from '@mui/material';
// import EditIcon from '../../../images/icons/Edit.svg';
import Icons from "../../Icons";
// import MessageIcon from '../../../images/icons/sms.svg';
import TrashIcon from '../../../images/icons/Trash.svg';
import AlertDialog from "../../AlertDialog";
import { differenceWith, isEqual, fromPairs } from 'lodash';
import moment from "moment";
import { getInitialValue, getInitialValueAsBoolean } from "../../../utils/tools";
import { dateFormat } from "../../../utils/tools";
import { LoadingButton } from "@mui/lab";
import ModalRecordForm from "../ModalRecordForm";
import { getFormValues } from "redux-form";
import CustomisedSnackBar from "../../CustomisedSnackBar";
import Spinner from "../../Spinner";

const ActionComponent = (props) => {
    const { name, recordColumns, metaData, updateRecord, clearNotifications, rowId, loadRecord, deleteRecord, editing, deleting, editRecordMetaData, row, column, loadAction, index, } = props;

    const [modalopen, setModalopen] = React.useState(false);
    const [btnLoad, setBtnLoad] = React.useState(false);
    const [actionModal, setActionModal] = React.useState(false);
    // const selectors = useAppSelector(state => state[name]);
    const hospitalDetails = useAppSelector((state) => state?.authentication?.hospital) || [];
    const updateErrorSelector = useAppSelector(state => state[name]?.updateError) || "";
    const updateSuccessSelector = useAppSelector(state => state[name]?.updateSuccess) || "";
    const editMetaData = useAppSelector(state => state[name]?.editMetaData) || {};
    const updateLoader = useAppSelector((state) => state[name]?.updateLoader) || false;
    const dispatch = useAppDispatch();
    // const record = selectors?.record || {};

    const formselector = useAppSelector(state => getFormValues(`action_${column?.action?.formName}_${index}`)(state));
    const record = useAppSelector(state => state[name]?.record) || {};
    // const progress = useAppSelector(state => state[name]?.progress) || false;
    const fields = (typeof recordColumns === 'function' ? recordColumns() : recordColumns).filter(_ => name === 'invoices' ? _.editable : _.editRecord);

    const actionFields = (column?.action?.fields && typeof (column?.action?.fields) == "function") ? (column?.action?.fields({
        hospitalDetails: hospitalDetails,
        row: row
    }) || []).filter(_ => _?.editRecord) : (column?.action?.fields || []).filter(_ => _?.editRecord);

    const updateError = (updateErrorSelector && typeof updateErrorSelector != 'string' && updateErrorSelector[`edit_record_${name}`]) || (typeof updateErrorSelector == 'string' && updateErrorSelector) || "";

    const updateErrorWithAction = (updateErrorSelector && typeof updateErrorSelector != 'string' && updateErrorSelector[`action_${column?.action?.formName}_${index}`]) || (typeof updateErrorSelector == 'string' && updateErrorSelector) || "";

    const updateSuccess = updateSuccessSelector && typeof updateSuccessSelector != 'string' && (updateSuccessSelector[`edit_record_${name}`] || updateSuccessSelector[`action_${column?.action?.formName}_${index}`]) || (typeof updateSuccessSelector == 'string' && updateSuccessSelector) || "";

    // const updateError = selectors?.updateError && typeof selectors?.updateError != 'string' && (selectors?.updateError[`edit_record_${name}`]) || "";
    const initialRecords = (name === 'users' || name === 'hospitals' || name === 'adminUsers' || name === 'hospitalUsers') ? Object.assign({}, getInitialValue(fields, record), {
        phone_number: record?.phone_number && (!record?.phone_number.includes('+1') && `+1${record.phone_number}` || `${record.phone_number}`) || "",
        id: record.id,
        role: record?.role == "customer" ? "admin" : record?.role
    }) :
        (name === 'invoices') ? Object.assign({}, getInitialValue(fields, record), {
            phone_number: record?.phone_number && (!record?.phone_number.includes('+1') && `+1${record.phone_number}` || `${record.phone_number}`) || "",
            id: record.id,
            invoice_date: record['invoice_date'] ? moment.utc(record['invoice_date']).format(dateFormat) : '',
            invoice_amount: record?.invoice_amount ? Math.round((record?.invoice_amount.toString()).replace('$', "") * Math.pow(10, 2)) / Math.pow(10, 2) : "",
            date_of_birth: record['date_of_birth'] ? moment.utc(record['date_of_birth']).format(dateFormat) : '',
        }) :
            record || {};

    const { classes } = useStyles();

    let showName = name;
    if (name == "users") {
        showName = "User"
    } else if (name == 'adminUsers') {
        showName = "EzTekPAY User"
    } else if (name == 'hospitalUsers') {
        showName = "Provider User"
    } else if (name == 'hospitals') {
        showName = "Provider"
    } else if (name == 'invoices') {
        showName = "Account"
    } else if (name == 'invoices') {
        showName = "Account"
    } else if (name == 'docs') {
        showName = "Doc"
    }

    let deleteName = name;
    if (name == "users") {
        deleteName = "user"
    } else if (name == 'adminUsers') {
        deleteName = "EzTekPAY User"
    } else if (name == 'hospitalUsers') {
        deleteName = "Provider User"
    } else if (name == 'hospitals') {
        deleteName = "Provider"
    } else if (name == 'invoices') {
        deleteName = "Account"
    } else if (name == 'docs') {
        deleteName = "file"
    }

    let confirmMessage = `Do you want to delete this ${deleteName}?`;

    let actionMessage = (id) => `Do you want to send the message now?`;

    const editPageRecordFetch = async () => {
        if (rowId && loadRecord) {
            await dispatch(editRecordMetaData());
            await dispatch(loadRecord({
                id: rowId, parentFn: () => {
                    setModalopen(`edit_record_${name}_${index}`);
                }
            }));
        }
    }

    const handleEdit = (values, dispatch, props) => {
        setBtnLoad(true);
        let submitRecord = { ...values };
        // Find the differences between object1 and object2

        // if ((
        //     // name === 'users' ||
        //     name === 'adminUsers' || name === 'hospitalUsers') && !submitRecord.is_admin) {
        //     submitRecord = { ...submitRecord, is_admin: false };
        // }
        if ((name === 'users' || name === 'hospitals' || name === 'adminUsers' || name === 'hospitalUsers' || name === 'invoices') && submitRecord.phone_number && submitRecord.phone_number.includes('+1')) {
            submitRecord = { ...submitRecord, phone_number: submitRecord.phone_number.replace("+1", "") };
        }
        // if (name === 'hospitalUsers'
        //     || name === 'users' 
        // ) {
        //     submitRecord = { ...submitRecord, role: "customer" };
        // }
        if (name === 'adminUsers') {
            submitRecord = { ...submitRecord, role: "superAdmin" };
        }
        // if (name === 'hospitals' && submitRecord.phone_number && submitRecord.phone_number.includes('+1')) {
        //     submitRecord = { ...submitRecord, phone_number: submitRecord.phone_number.replace("+1", "") };
        // }
        if (name === 'users' || name === 'hospitalUsers' || name === 'adminUsers') {
            const differences = differenceWith(
                Object.entries(submitRecord),
                Object.entries(record),
                isEqual
            );

            // const password = { ...(submitRecord.password ? { password: submitRecord.password } : {}) }
            // Create a new object with the changes found in object2
            let changesObject = fromPairs(differences);
            changesObject = { ...changesObject, id: submitRecord.id };
            // If you want to remove the password key if its value is an empty string
            if (changesObject.password === '') {
                delete changesObject.password;
            }
            // setBtnLoad(false);
            dispatch(updateRecord({ record: changesObject, form: props?.form, loaderFn: () => setBtnLoad(false), parentFn: () => setModalopen(false) }));
        } else {
            dispatch(updateRecord({ record: submitRecord, form: props?.form, loaderFn: () => setBtnLoad(false), parentFn: () => setModalopen(false) }));
        }
    }

    const handleDelete = () => {
        setBtnLoad(true);
        dispatch(deleteRecord({ id: rowId, loaderFn: () => setBtnLoad(false), parentFn: () => setModalopen(false) }));
    }

    const loadActions = (data, dispatch, props) => {

        setBtnLoad(true);
        const input = data?.sendMessageField ? JSON.parse(data.sendMessageField) : {};
        let payload = { id: rowId, ...input };
        if (data?.sendMessageField && (!payload?.email || !row?.patient_email)) {
            payload = Object.assign({}, payload, { email: false });
        }
        if (data?.sendMessageField && (!payload?.sms || !row?.patient_phone)) {
            payload = Object.assign({}, payload, { sms: false });
        }
        dispatch(loadAction({ record: payload, form: props?.form, loaderFn: () => setBtnLoad(false), parentFn: () => setModalopen(false) }));
    }

    const disabledBtn = name === 'invoices' && row?.collection_status && row?.collection_status == 'paid_in_full' ? true : false;

    return <Grid
        key={`${index}_${name}`}
        container
        sx={{
            flexFlow: 'row',
            // justifyContent: 'center'
        }}
    >
        {column?.loadAction ?
            <IconButton
                className={classes.createbtn}
                onClick={() => setActionModal(true)}
                disabled={disabledBtn}
                classes={{ disabled: classes.disabledButton }}
                btnLabel={column?.action?.btnLabel}
                loading={btnLoad}
                enableSubmitBtn={true}
            >
                <Icons type={column?.action?.iconType || 'SMS'} className={classes.smsIcon} color="rgba(0, 0, 0, 0.54)" />
            </IconButton>
            : null}

        {editing ?
            // <Grid>

            <IconButton
                className={classes.createbtn}
                onClick={() => {
                    editPageRecordFetch();
                    // setModalopen(true);
                    // onClick(rowId, setModalopen)
                }}
                disabled={disabledBtn}
                classes={{ disabled: classes.disabledButton }}
            >
                {/* <img src={EditIcon} alt='Edit Svg' /> */}
                <Icons type='edit' className={classes.editIcon} />
            </IconButton>
            // {/* </Grid> */}
            : null}
        {deleting ?
            // <Grid>
            <AlertDialog
                description={confirmMessage}
                onConfirm={handleDelete}
                btnLoad={btnLoad}
                btnLabel2={'Cancel'}
                btnLabel1='Delete'>
                {(open) =>
                    <IconButton
                        className={classes.createbtn}
                        onClick={() => open()}
                        disabled={disabledBtn}
                    >
                        <img src={TrashIcon} alt='Trash Svg' />
                    </IconButton>}
            </AlertDialog>
            // </Grid>
            : null}

        {modalopen ? <EditOrCreateForm
            initialValues={Object.assign({}, { ...initialRecords }, (name === 'users' || name === 'adminUsers' || name === 'hospitalUsers') ? { password: '' } : {})}
            show={modalopen}
            onClose={() => setModalopen(false)}
            title={`
            Edit ${showName}`}
            fields={fields}
            form={`edit_record_${name}`}
            onSubmit={handleEdit.bind(this)}
            btnLabel="Update"
            metaData={editMetaData}
            disableContainer
            updateError={updateError}
            removeCancel={true}
            btnLoad={btnLoad}
            clearNotifications={() => dispatch(clearNotifications())}
            edit={true}
        // sectionSplit={5}
        /> : null}

        {
            actionModal ?
                <ModalRecordForm
                    initialValues={Object.assign({}, getInitialValue((actionFields || []), (column?.action?.initial || row)))}
                    show={actionModal}
                    onClose={() => setActionModal(false)}
                    noTitleContainer={true}
                    divider={false}
                    fields={actionFields}
                    form={`action_${column?.action?.formName}_${index}`}
                    onSubmit={loadActions}
                    showFields={true}
                    showActions={true}
                    btnLabel={`${column?.action?.btnLabel}` || 'submit'}
                    enableSubmitBtn={true}
                    bodyClass={classes.actionBody}
                    dialogContentClass={(row?.patient_email && row?.patient_phone) ? classes.dialogContent : classes.dialogContentWithoutInput}
                    footerStyle={{ padding: '0px 20px 20px 20px !important', justifyContent: 'center' }}
                    paperStyle={{
                        minWidth: 'auto',
                        maxWidth: '40%'
                    }}
                    submitBtn={(props) => {
                        const { handleSubmit, pristine, invalid, submitting, progress } = props;
                        return <LoadingButton
                            type="button"
                            variant="contained"
                            onClick={handleSubmit}
                            color="primary"
                            loading={btnLoad}
                            disabled={!formselector.sendMessageField}
                            className={classes.loadingButton}>
                            {`${column?.action?.btnLabel}` || 'submit'}
                        </LoadingButton>
                    }}
                />
                : null
        }
        {(updateSuccess || updateErrorWithAction) ? <CustomisedSnackBar
            message={updateSuccess || updateErrorWithAction}
            open={updateSuccess || updateErrorWithAction}
            onClose={() => dispatch(clearNotifications())}
            autoCloseDuration
            alertStyle={updateErrorWithAction ? {
                backgroundColor: '#F03249',
                color: '#fff',
                fontSize: '16px'
            } : {
                backgroundColor: '#2DC146',
                color: '#fff',
                fontSize: '16px'
            }}
            severity={updateSuccess ? 'success' : 'error'}
        /> : null}
        {updateLoader ? <Spinner style={{
            // position: "absolute",
            height: "100%",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            overflowY: "scroll",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }} /> : null}
    </Grid>
}

export default ActionComponent;