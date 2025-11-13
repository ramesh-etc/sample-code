
import React from "react";
// import { Button, Grid, Typography } from "@mui/material";
import useStyles from "./styles";
import SettingsForm from "../SettingsForm";
import SettingsView from "../SettingsView";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import LoadingButton from '@mui/lab/LoadingButton';
import AlertDialog from "../../../components/AlertDialog";
import CustomisedSnackBar from "../../../components/CustomisedSnackBar";
import MessageBox from "../MessageBox";
import { getInitialValue, getInitialValueAsBoolean } from "../../../utils/tools";
// import { differenceWith, isEqual, fromPairs } from 'lodash';
import { updateVersion } from "../../../redux/app/actions";

const SettingBox = (props) => {
    const { label, value, actions, actionName, columns, confirmMessage, parentPath, settings_Form, setSettings_Form, formNumber } = props;
    const { classes } = useStyles();
    const [btnLoad, setBtnLoad] = React.useState(false);
    const [message_Form, setMessage_Form] = React.useState(false);

    const dispatch = useAppDispatch();
    const settingrecord = useAppSelector((state) => state?.[actionName]?.settingrecord) || {};
    const settingSuccess = useAppSelector((state) => state?.[actionName]?.settingSuccess) || false;
    const settingError = useAppSelector((state) => state?.[actionName]?.settingError) || false;
    const settingLoading = useAppSelector((state) => state?.[actionName]?.settingLoading) || false;
    const user = useAppSelector((state) => state?.authentication?.user);
    const appVersion = useAppSelector((state) => state?.authentication?.appVersion) || 0;
    const { hospital_id } = user;
    const settingActions = actions[`${actionName}Actions`];
    const { loadSettings, updateSettings, clearSettingsError } = settingActions || {};
    const successMessage = typeof settingSuccess == 'string' ? settingSuccess : settingSuccess?.success || "";
    const errorMessage = typeof settingError == 'string' ? settingError : settingSuccess?.settingError || "";

    const fields = columns.filter(e => e.editRecord);
    const sendRecieptFields = fields.reduce((acc, field) => {
        if (field.value === 'send_payment_reciept') {
            return field;
        }
        return acc;
    }, {});
    const initialRecords = (value === 'provider') ?
        Object.assign({}, getInitialValue(fields, settingrecord), {
            phone_number: settingrecord?.phone_number && (!settingrecord?.phone_number.includes('+1') && `+1${settingrecord.phone_number}` || `${settingrecord.phone_number}`) || "",
            logo_file: settingrecord?.logo_file || process.env.REACT_APP_EMPTY_LOGO_URL,
            id: settingrecord.id,
            send_reminder: settingrecord?.send_reminder
        }) : (value === 'messaging') ?
            Object.assign({}, getInitialValue(fields, settingrecord), {
                send_payment_reciept: JSON.stringify(Object.assign({}, getInitialValueAsBoolean(sendRecieptFields.options, settingrecord)))
            }) : (value === 'version') ?
                Object.assign({}, getInitialValue(fields, { version: appVersion || user?.version })) : Object.assign({}, getInitialValue(fields, settingrecord)) || {};

    React.useEffect(() => {
        dispatch(clearSettingsError());
        if (actionName == "version") {
            setSettings_Form(false);
            // dispatch(loadAppVersion());
        } else {
            // if (actionName != 'template_defaults') {
            setSettings_Form(false);
            setMessage_Form(false);
            dispatch(loadSettings({ record: { id: hospital_id } }));
            // }
        }
    }, [actionName])

    const handleSubmit = (data, dispatch, props) => {
        setBtnLoad(true);
        let submitRecord = { ...data };
        // Find the differences between object1 and object2
        if (value === 'provider' && submitRecord.phone_number && submitRecord.phone_number.includes('+1')) {
            submitRecord = { ...submitRecord, phone_number: submitRecord.phone_number.replace("+1", "") };
        }
        if (value === 'provider' && submitRecord.logo_file == process.env.REACT_APP_EMPTY_LOGO_URL) {
            delete submitRecord.logo_file;
        }
        if (value === 'provider' && typeof submitRecord.logo_file == 'object') {
            submitRecord = { ...submitRecord, logo_file: submitRecord?.logo_file?.public_url }
        }

        if (actionName == "reminders") {
            if (value == "template_defaults" && (message_Form == 1 || message_Form == 2)) {
                // const editedTemplate = (data?.inv_msg && !data?.inv_msg.includes(`Welcome {first_name} {last_name},`)) ? Object.assign({}, data, { inv_msg: `Welcome {first_name} {last_name}, \n` + data?.inv_msg }) : (data?.multiple_inv_msg && !data?.multiple_inv_msg.includes(`Welcome {first_name} {last_name},`)) ? Object.assign({}, data, { multiple_inv_msg: `Welcome {first_name} {last_name}, \n` + data?.multiple_inv_msg }) : data;
                const enteredform = Object.assign({}, { ...(JSON.parse(settingrecord?.email_template)) }, { ...data });
                submitRecord = { email_template: JSON.stringify(enteredform) }
            } else if (value == "template_defaults" && (message_Form == 3 || message_Form == 4)) {
                // const editedTemplate = (data?.inv_msg && !data?.inv_msg.includes(`Welcome {first_name} {last_name},`)) ? Object.assign({}, data, { inv_msg: `Welcome {first_name} {last_name}, \n` + data?.inv_msg }) : (data?.multiple_inv_msg && !data?.multiple_inv_msg.includes(`Welcome {first_name} {last_name},`)) ? Object.assign({}, data, { multiple_inv_msg: `Welcome {first_name} {last_name}, \n` + data?.multiple_inv_msg }) : data;
                // const changedContent = JSON.stringify(data).replace(/\\\\n/g, '\\n');
                const changedContent = JSON.stringify(data);
                const enteredform = Object.assign({}, { ...(JSON.parse(settingrecord?.msg_template)) }, { ...(JSON.parse(changedContent)) });
                submitRecord = { msg_template: JSON.stringify(enteredform) }
            } else if (value === 'messaging') {
                let send_payment_reciept = submitRecord?.send_payment_reciept ? JSON.parse(submitRecord?.send_payment_reciept) : {};
                // send_payment_reciept = Object.fromEntries(
                //     Object.keys(send_payment_reciept).map(key => [key, send_payment_reciept[key] === 1])
                // );
                // send_payment_reciept = Object.keys(send_payment_reciept).reduce((acc, key) => {
                //     acc[key] = send_payment_reciept[key] ? 1 : 0;
                //     return acc;
                // }, {});
                const converted_send_payment_reciept = {};

                (sendRecieptFields?.options || []).forEach(item => {
                    //   const label = item.label;
                    const value = item?.value;

                    // Check if the value exists in sendreciept and is truthy
                    converted_send_payment_reciept[value] = send_payment_reciept[value] ? 1 : 0;
                });
                submitRecord = Object.assign(submitRecord, { ...converted_send_payment_reciept });
                delete submitRecord.send_payment_reciept;

            }


        }

        if (value != "provider") {
            submitRecord = Object.assign({}, { ...settingrecord }, { ...submitRecord });
        }
        // setBtnLoad(false);
        if (value == "version") {
            dispatch(updateVersion({
                record: submitRecord,
                setLoadingAction: () => {
                    setBtnLoad(false);
                    setMessage_Form(false);
                    setSettings_Form(false);
                }
            }));
        }
        else {
            dispatch(updateSettings({
                record: submitRecord,
                loaderFn: () => {
                    setBtnLoad(false);
                    if (actionName == "reminders") {
                        setMessage_Form(false);
                        setSettings_Form(false);
                    } else {
                        setSettings_Form(false);
                    }
                }
            }));
        }
    }

    let showLabel = value;
    if (value == "messaging") {
        showLabel = "Messaging"
    } else if (value == "reminderSettings") {
        showLabel = "Reminder"
    } else if (value == "hipaa" || value == 'version') {
        showLabel = ''
    }

    return <>
        {settings_Form == formNumber && value != 'template_defaults' ? <SettingsForm
            initialValues={initialRecords}
            name={label}
            form={`Settings_form_${value}`}
            fields={fields}
            btnLoad={btnLoad}
            onSubmit={handleSubmit}
            isCurrentEditForm={settings_Form == formNumber}
            handleCancel={() => setSettings_Form(false)}
            submitBtnLabel={`update ${showLabel}`}
            submitBtn={(props) => {
                const { handleSubmit, pristine, invalid, submitting, progress } = props;
                return <AlertDialog
                    description={confirmMessage}
                    onConfirm={() => {
                        handleSubmit();
                    }}
                    onConfirmPopUpClose={true}
                    btnLabel1={'Yes'}
                    btnLabel2={'No'}
                // containerClass={classes.submitBtnContainer}
                >
                    {(open) => <LoadingButton
                        type="button"
                        variant="contained"
                        onClick={open}
                        disabled={(pristine || invalid)}
                        color="primary"
                        loading={btnLoad}
                        className={classes.loadingButton}>
                        {`update ${showLabel}` || 'submit'}
                    </LoadingButton>}
                </AlertDialog>
            }}
        /> : null}
        {
            settings_Form != formNumber && value != 'template_defaults' ?

                <SettingsView
                    fields={columns.filter(e => e.editRecord)}
                    record={value == "version" ? initialRecords : settingrecord}
                    loading={typeof settingLoading == 'object' && settingLoading[actionName] ? settingLoading[actionName] : typeof settingLoading == 'boolean' ? settingLoading : false}
                />

                : null}
        {value == 'template_defaults' ? <MessageBox
            record={settingrecord || {}}
            name={label}
            fields={columns}
            btnLoad={btnLoad}
            handleSubmit={handleSubmit}
            message_Form={message_Form}
            setMessage_Form={setMessage_Form}
        // handleCancel={() => setSettings_Form(false)}
        // submitBtnLabel={`update ${actionName}`}
        // submitBtn={(props) => {
        //     const { handleSubmit, pristine, invalid, submitting, progress } = props;
        //     return <AlertDialog
        //         description={confirmMessage}
        //         onConfirm={() => {
        //             handleSubmit();
        //         }}
        //         onConfirmPopUpClose={true}
        //         btnLabel1={'Yes'}
        //         btnLabel2={'No'}
        //     // containerClass={classes.submitBtnContainer}
        //     >
        //         {(open) => <LoadingButton
        //             type="button"
        //             variant="contained"
        //             onClick={open}
        //             disabled={(pristine || invalid)}
        //             color="primary"
        //             loading={btnLoad}
        //             className={classes.loadingButton}>
        //             {`update ${actionName}` || 'submit'}
        //         </LoadingButton>}
        //     </AlertDialog>
        // }}
        /> : null}
        {successMessage || errorMessage ? <CustomisedSnackBar
            message={successMessage || errorMessage}
            open={successMessage || errorMessage}
            onClose={() => dispatch(clearSettingsError())}
            autoCloseDuration
            alertStyle={errorMessage ? {
                backgroundColor: '#F03249',
                color: '#fff',
                fontSize: '16px'
            } : {
                backgroundColor: '#2DC146',
                color: '#fff',
                fontSize: '16px'
            }}
            severity={successMessage ? 'success' : 'error'}
        /> : null}
    </>
}

export default SettingBox;