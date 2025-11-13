
import React from "react";
import EditOrCreateForm from "../EditOrCreateForm";
import useStyles from "./styles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Grid, Button } from '@mui/material';

const CreateBtn = (props) => {
    const { name, recordColumns, metaData, createRecord, clearNotifications, editRecordMetaData } = props;
    const [modalopen, setModalopen] = React.useState(false);
    const [btnLoad, setBtnLoad] = React.useState(false);
    // const [containerHeight, setContainerHeight] = React.useState(getOffset('dashboardBoxContainer'));
    // const selectors = useAppSelector(state => state[name]);
    const updateErrorSelector = useAppSelector(state => state[name]?.updateError) || "";
    const editMetaData = useAppSelector(state => state[name]?.editMetaData) || {};
    const dispatch = useAppDispatch();
    // const record = selectors?.record || {};
    const updateError = updateErrorSelector && typeof updateErrorSelector != 'string' && (updateErrorSelector[`create_record_${name}`]) || "";

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
    } else if (name == 'docs') {
        deleteName = "Doc"
    }

    const handleCreate = (values, dispatch, props) => {
        setBtnLoad(true);
        let submitRecord = { ...values };
        // if ((
        //     // name === 'users' ||
        //     name === 'adminUsers' || name === 'hospitalUsers') && !submitRecord.is_admin) {
        //     submitRecord = { ...submitRecord, is_admin: false };
        // }
        if ((name === 'users' || name === 'hospitals' || name === 'adminUsers' || name === 'hospitalUsers') && submitRecord.phone_number && submitRecord.phone_number.includes('+1')) {
            submitRecord = { ...submitRecord, phone_number: submitRecord.phone_number.replace("+1", "") };
        }

        if ((name === 'users' || name === 'hospitals' || name === 'adminUsers' || name === 'hospitalUsers')) {
            submitRecord = { ...submitRecord, email_notification: true };
        }
        // if (name === 'hospitalUsers'
        //     // || name === 'users' 
        // ) {
        //     submitRecord = { ...submitRecord, role: "customer" };
        // }
        if (name === 'adminUsers') {
            submitRecord = { ...submitRecord, role: "superAdmin" };
        }
        // if (name === 'hospitals' && submitRecord.phone_number && submitRecord.phone_number.includes('+1')) {
        //     submitRecord = { ...submitRecord, phone_number: submitRecord.phone_number.replace("+1", "") };
        // }

        dispatch(createRecord({ record: submitRecord, form: props?.form, loaderFn: () => setBtnLoad(false), parentFn: () => setModalopen(false) }));
    }

    return <>
        <Button
            className={classes.createbtn}
            onClick={() => {
                editRecordMetaData({ parentFn: () => setModalopen(true) });
                // dispatch(editRecordMetaData({ parentFn: () => setModalopen(true) }));
                // setModalopen(true);
            }}
        >
            {`Add ${showName}`}
        </Button>
        {modalopen ? <EditOrCreateForm
            show={modalopen}
            onClose={() => setModalopen(false)}
            title={`
            Add ${showName}`}
            fields={recordColumns.filter(_ => _.editRecord)}
            form={`create_record_${name}`}
            onSubmit={handleCreate.bind(this)}
            // onSubmitClose
            btnLabel="Create"
            metaData={editMetaData}
            disableContainer
            updateError={updateError}
            removeCancel={true}
            btnLoad={btnLoad}
            clearNotifications={() => dispatch(clearNotifications())}
            create={true}
        // sectionSplit={5.7}
        /> : null}
    </>
}

export default CreateBtn;