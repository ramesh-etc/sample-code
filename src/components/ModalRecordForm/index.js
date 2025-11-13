/**
 * 
 *  Modal Record Form
 * 
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { ImplementationFor } from '../EditRecordForm/utils';
import { Modal, Paper, Fade, Grid, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import validate from '../../utils/validation';
import Error from '../Error';
import AlertDialog from '../AlertDialog';
import { useTheme } from "@mui/system";
import { useMediaQuery } from '@mui/material';
import { normalize } from '../../utils/tools';
import useStyles from './styles';
// import history from 'utils/history';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function ModalRecordForm(props) {
    const { title, message, handleSubmit, submitting, children, fields, metaData, className, style, btnLabel, onOpen, onClose, submiterror, show, confirmButton, confirmMessage, pristine, invalid, onSubmitClose, footerStyle, destroy, disableContainer, enableSubmitBtn, disableCancelBtn, progress, footerBtn, confirmPopUpClose, paperClassName, enableScroll, page, disableCancelButton, footerCancelBtn, disableSubmitBtn, alertOnSubmitClose, form, onSubmitbtn, AlertBtnLabel1, AlertBtnLabel2, submitBtn, loading, removeCancel, reset, dispatch, valueBasedDisable, clearError, sectionSplit, paperClass, paperStyle } = props;

    const { classes } = useStyles();
    const [showModal, setModalOpen] = useState(false);

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const closeModal = () => {
        setModalOpen(false);
        if (onClose)
            onClose();
    }

    useEffect(() => {
        return () => destroy();
    }, []);

    return <Grid container={disableContainer ? false : true} className={className} sx={style}>
        {children && children(() => setModalOpen(!showModal))}
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showModal || show || false}
            className={classes.modal}
            // onClose={closeModal}
            // closeAfterTransition
            // BackdropComponent={Backdrop}
            // hideBackdrop
            // onRendered={onOpen}
            sx={{
                "& > .MuiBackdrop-root": {
                    // backdropFilter: "blur(2px)",
                    backgroundColor: "rgb(0, 0, 0, 0.7)"
                }
            }}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={showModal || show || false}>
                <Paper className={`${classes.paper} ${paperClassName}`} sx={sm ? { maxWidth: '90% !important' } : mdDown ? { maxWidth: '60% !important' } : xl ? { maxWidth: '30% !important' } : paperStyle || {}}>
                    <form onSubmit={handleSubmit} className={classes.form} noValidate>
                        <Grid container className={classes.header} justify="space-between">
                            <Grid item xs={10}>
                                <Typography component="span" className={classes.title}>{title || ''}</Typography>
                            </Grid>
                            <Grid item xs={2} style={{ textAlign: 'end' }}>
                                {!disableCancelBtn ? <CloseIcon onClick={closeModal} className={classes.closeIcon} /> : null}
                            </Grid>
                        </Grid>
                        {message ?
                            <Grid className={classes.messageGrid}>
                                <Typography component="span" className={classes.message}>{message || ''}</Typography>
                            </Grid> : null}
                        <Grid container className={classes.body}>

                            <Grid item xs={12} className={enableScroll ? enableScroll : null}>
                                <Grid container spacing={3}>
                                    {(fields || []).map((field, index) => {
                                        const InputComponent = ImplementationFor[field.type];
                                        return <Grid key={index} item xs={12} md={sectionSplit || 12} style={field.style || null}>
                                            {field.type !== 'fieldArray' ?
                                                <Field
                                                    name={field.value}
                                                    label={field.label}
                                                    // type="text"
                                                    // metaData={metaData}
                                                    component={InputComponent}
                                                    required={field.required}
                                                    normalize={normalize(field)}
                                                    disabled={field.disableOptons && field.disableOptons.edit}
                                                    {...field}
                                                /> :
                                                <FieldArray
                                                    name={field.value}
                                                    label={field.label}
                                                    type="text"
                                                    fieldArray={field.fieldArray}
                                                    metaData={metaData}
                                                    component={InputComponent}
                                                    required={field.required}
                                                    normalize={normalize(field)}
                                                    ImplementationFor={ImplementationFor}
                                                    disabled={field.disableOptons && field.disableOptons.edit}
                                                    {...field} />}
                                        </Grid>
                                    })}
                                </Grid>
                            </Grid>
                            {submiterror ? <Grid
                                className={classes.error}>
                                <Error
                                    errorMessage={submiterror}
                                    severity={'error'}
                                    onClose={clearError}
                                />
                            </Grid> : null}
                        </Grid>
                        <Grid container justifyContent={removeCancel ? "center" : "flex-end"} style={footerStyle} className={classes.footer}>
                            {!disableSubmitBtn && confirmButton ?
                                <AlertDialog
                                    description={confirmMessage}
                                    onConfirm={() => {
                                        handleSubmit();
                                        if (alertOnSubmitClose && onSubmitClose) {
                                            closeModal();
                                        }
                                    }}
                                    onConfirmPopUpClose={confirmPopUpClose}
                                    btnLabel1={AlertBtnLabel1 || 'Yes'}
                                    btnLabel2={AlertBtnLabel2 || 'No'} >
                                    {(open) => <LoadingButton
                                        type="button"
                                        variant="contained"
                                        onClick={open}
                                        disabled={!enableSubmitBtn && (pristine || invalid)}
                                        color="primary"
                                        loading={(submitting || progress || loading)}
                                        className={classes.submitBtn}>
                                        {btnLabel || 'submit'}
                                    </LoadingButton>}
                                </AlertDialog> :
                                submitBtn && typeof submitBtn === 'function' ? React.createElement(submitBtn, Object.assign({}, { ...props, classes })) :
                                    !disableSubmitBtn && onSubmitbtn ? <LoadingButton
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        disabled={!enableSubmitBtn && (pristine || invalid)}
                                        className={classes.submitBtn}
                                        loading={(submitting || progress || loading)}
                                        onClick={() => {
                                            handleSubmit();
                                            if (!invalid && onSubmitClose) {
                                                closeModal();
                                            }
                                        }}>
                                        {btnLabel || 'submit'}
                                    </LoadingButton> :
                                        !disableSubmitBtn ? <LoadingButton
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={!enableSubmitBtn && (pristine || invalid || valueBasedDisable)}
                                            className={classes.submitBtn}
                                            loading={(submitting || progress || loading)}
                                            onClick={!invalid && onSubmitClose ? closeModal : null}>
                                            {btnLabel || 'submit'}
                                        </LoadingButton> : true}
                            {(!disableCancelBtn && !disableCancelButton && !removeCancel) ? <Button
                                type="button"
                                variant="contained"
                                onClick={closeModal}
                                className={classes.cancelBtn}>
                                Cancel
                            </Button> : true}

                            {footerCancelBtn && typeof footerCancelBtn === 'function' && React.createElement(footerCancelBtn, classes) || null}
                        </Grid>
                    </form>
                </Paper>
            </Fade>
        </Modal>
    </Grid >
}

// ModalRecordForm.propTypes = {
//     title: PropTypes.string,
//     children: PropTypes.func,
//     handleSubmit: PropTypes.func,
//     error: PropTypes.string,
//     pristine: PropTypes.bool,
//     submitting: PropTypes.bool,
//     fields: PropTypes.array,
// };

export default reduxForm({
    form: 'modal_Record',
    enableReinitialize: true,
    validate,
    touchOnChange: true,
    destroyOnUnmount: true,
    // forceUnregisterOnUnmount: true
})(ModalRecordForm);