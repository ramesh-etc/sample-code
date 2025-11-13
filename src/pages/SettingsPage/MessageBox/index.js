/**
 * 
 * Custom Input Field
 * 
 */

import React from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import useStyles from './styles';
// import { useTheme } from "@mui/system";
// import SettingsForm from '../SettingsForm';
// import { ImplementationFor } from '../../../components/EditRecordForm/utils';
// import { Field, reduxForm } from 'redux-form';
import Form from './Form';
import AlertDialog from '../../../components/AlertDialog';
import LoadingButton from '@mui/lab/LoadingButton';
import { getInitialValue } from '../../../utils/tools';
import Icons from "../../../components/Icons";
// import { reset } from 'redux-form';
// import { useAppDispatch } from '../../../redux/hooks';

export default function MessageBox(props) {
    const { fields, handleSubmit, btnLoad, record, message_Form, setMessage_Form } = props;
    const { classes } = useStyles();
    // const templateRecords = record?.template_defaults || {};
    // const dispatch = useAppDispatch();

    return (
        <Grid container className={classes.messageBoxContainer}>
            {(fields || []).map((items, i) => {

                const email_template = record?.email_template || "{}";
                const message_template = record?.msg_template || "{}";
                let initialRecords = Object.assign({}, getInitialValue(items?.columns, ["email_multiple_invloice", "email_single_invloice"].includes(items?.value) ? JSON.parse(email_template) : (["message_single_invloice", "message_multiple_invloice"].includes(items?.value) && record?.msg_template) ? JSON.parse(message_template) : {}));
                if (initialRecords?.inv_msg) {
                    const replacedText = initialRecords?.inv_msg.replace(`Welcome {first_name} {last_name}, \n`, '');
                    initialRecords = Object.assign({}, initialRecords, { inv_msg: replacedText });
                } else if (initialRecords?.multiple_inv_msg) {
                    const replacedText = initialRecords?.multiple_inv_msg.replace(`Welcome {first_name} {last_name}, \n`, '');
                    initialRecords = Object.assign({}, initialRecords, { multiple_inv_msg: replacedText });
                }

                return <Grid
                    // xs={12}
                    // md={5.8}
                    key={`${i}_${items?.label}`}
                    className={classes.messageBoxItem}
                >

                    <Grid className={classes.titleContainer}>
                        <Typography variant="bodySpan1" className={classes.boxLabel}>
                            {items?.label || ""}
                        </Typography>
                        {(message_Form != i + 1) ? <IconButton size="small" onClick={() => {
                            setMessage_Form(items?.formSchemaId || false);
                            // dispatch(reset(`message_form_${items?.value || ""}_${i}`));
                        }}>
                            <Icons type='edit' className={classes.icon} />
                        </IconButton> : null}
                    </Grid>
                    <Form
                        initialValues={initialRecords}
                        label={items?.label || ""}
                        form={`message_form_${items?.value || ""}_${i}`}
                        fields={items?.columns}
                        btnLoad={btnLoad}
                        onSubmit={handleSubmit}
                        handleCancel={() => setMessage_Form(false)}
                        isCurrentEditForm={message_Form == i + 1}
                        message_Form={message_Form}
                        setMessage_Form={setMessage_Form}
                        submitBtn={(props) => {
                            const { handleSubmit, pristine, invalid, submitting, progress } = props;
                            return <AlertDialog
                                description={items?.confirmMessage}
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
                                    {'save'}
                                </LoadingButton>}
                            </AlertDialog>
                        }}
                    />
                </Grid>
            })}
        </Grid>
    )

}