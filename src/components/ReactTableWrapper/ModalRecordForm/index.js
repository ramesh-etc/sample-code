/**
 * 
 *  Modal Record Form
 * 
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { ImplementationFor } from '../../EditRecordForm/utils';
import { Grid, Typography, Button, DialogActions, Dialog, DialogContent, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Error from '../../Error';
import AlertDialog from '../../AlertDialog';
import { useTheme } from "@mui/system";
import { useMediaQuery } from '@mui/material';
import { normalize } from '../../../utils/tools';
import useStyles from './styles';
// import history from 'utils/history';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function ModalRecordForm(props) {
    const { title,
        message,
        handleSubmit,
        submitting,
        children,
        fields,
        metaData,
        className,
        // style,
        btnLabel,
        onClose,
        show,
        confirmButton,
        confirmMessage,
        pristine,
        invalid,
        onSubmitClose,
        footerStyle,
        destroy,
        notes,
        disableContainer,
        onSubmitbtn,
        enableSubmitBtn,
        disableCancelBtn,
        confirmPopUpClose,
        disableCancelButton,
        footerCancelBtn,
        disableSubmitBtn,
        alertOnSubmitClose,
        AlertBtnLabel1,
        AlertBtnLabel2,
        submitBtn,
        loading,
        sumiterrorAction,
        submiterrorActionComp,
        showTable,
        tableComp,
        removeCancel,
        valueBasedDisable,
        clearNotifications,
        // fieldChange,
        uploadError,
        updateError,
        paperStyle,
        updatedNotes,
        noTitleContainer,
        divider,
        dialogContentClass,
        showActions,
        showFields,
        bodyClass
    } = props;

    const { classes } = useStyles();
    const [showModal, setModalOpen] = useState(false);
    // const [showDisable, setShowDisable] = useState(false);

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const closeModal = () => {
        setModalOpen(false);
        if (onClose)
            onClose();
    }

    useEffect(() => {
        // dispatch(reset('modalRecord'));
        // destroy('modalRecord');
        return () => destroy();
    }, []);

    return <React.Fragment>
        {children && children(() => setModalOpen(!showModal))}
        <Dialog
            open={showModal || show || false}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            classes={{
                paper: classes.paper,
            }}
            PaperProps={{
                style: paperStyle || {},
            }}
            slotProps={{ backdrop: { sx: { background: 'rgb(0, 0, 0, 0.7)' } } }}
        >
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                {!noTitleContainer ? <DialogTitle
                    id="scroll-dialog-title"
                >
                    <Grid
                        container
                        className={classes.header}
                        justify="space-between"
                    >
                        <Grid
                            item
                            xs={10}
                        >
                            <Typography
                                component="span"
                                className={classes.title}
                            >
                                {title || ''}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={2}
                            style={{ textAlign: 'end', display: 'flex', justifyContent: 'flex-end' }}
                        >
                            {!disableCancelBtn ? <CloseIcon
                                onClick={closeModal}
                                className={classes.closeIcon}
                            /> : null}
                        </Grid>
                    </Grid>
                </DialogTitle> : null}
                <DialogContent
                    dividers={divider}
                    sx={{
                        // overflowY: sm ? 'unset' : 'auto'
                    }}
                    className={dialogContentClass || classes.dialogContent}
                >
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            gap: '16px',
                            overflowY: sm ? 'auto' : 'unset',
                            backgroundColor: !showTable ? '#fff' : 'transparent',
                            padding: !showTable ? '16px' : '0px',
                            border: !showTable ? "1px solid rgb(248, 249, 250)" : "none",
                            borderRadius: !showTable ? "20px" : '0px',
                            boxShadow: !showTable ? "rgba(238, 238, 238, 0.5) " : "none",
                        }}
                        className={bodyClass || classes.body}
                    >

                        {showFields ?
                            <Grid
                                item
                            // xs={12}
                            >
                                <Grid
                                    container
                                    sx={{
                                        margin: '0px'
                                    }}
                                >
                                    {(fields || []).map((field, index) => {
                                        const InputComponent = ImplementationFor[field.type];
                                        // const disableFunc = {
                                        //     // ...(field.type == 'upload' && { disableSubmit: (e) => setShowDisable(e) })
                                        //     ...(field.type == 'upload' && { onChange: fieldChange, removeText: uploadError || notes || updated })
                                        // }
                                        return <Grid
                                            key={index}
                                            item
                                            style={field.style || null}
                                        >
                                            {field.type !== 'fieldArray' ?
                                                <Field
                                                    name={field.value}
                                                    label={field.label}
                                                    component={InputComponent}
                                                    required={field.required}
                                                    normalize={normalize(field)}
                                                    disabled={field.disableOptons && field.disableOptons.edit}
                                                    // removeText={uploadError || notes || updated}
                                                    {...field}
                                                // {...disableFunc}
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
                            </Grid> : null}

                        {notes ?
                            <Grid
                                item
                                className={classes.notes}
                            >
                                <Typography
                                    component="span"
                                    className={classes.note}
                                    dangerouslySetInnerHTML={{
                                        __html: notes
                                    }}
                                />
                            </Grid>
                            : null}

                        {updatedNotes ?
                            <Grid
                                item
                                className={classes.notes}
                            >
                                <Typography
                                    component="span"
                                    className={classes.note}
                                    dangerouslySetInnerHTML={{
                                        __html: updatedNotes
                                    }}
                                />
                            </Grid> : null}
                        {uploadError ? <Grid
                            item
                            // xs={12}
                            className={classes.error}>
                            {/* <span> */}
                            <Error
                                alertClassName={{
                                    root: classes.customAlertRoot,
                                    message: classes.customMessageStyle,
                                    action: classes.customActionStyle,
                                    icon: classes.customIconStyle,
                                }}
                                icon={false}
                                errorMessage={uploadError}
                                severity={'info'}
                                action={sumiterrorAction}
                                actionComp={submiterrorActionComp}
                            />
                            {/* </span> */}
                        </Grid> : null}

                        {updateError ? <Grid
                            item
                            // xs={12}
                            className={classes.error}>
                            {/* <span> */}
                            <Error
                                errorMessage={updateError}
                                // severity={sumiterrorAction && 'info' || 'error'}
                                severity={'error'}
                                // action={sumiterrorAction}
                                // actionComp={submiterrorActionComp}
                                onClose={clearNotifications}
                            />
                            {/* </span> */}
                        </Grid> : null}
                        {/* </Grid> */}
                        {showTable ? tableComp : null}

                    </Grid>

                </DialogContent>
                {showActions ? <DialogActions className={classes.dialogActions}>
                    <Grid container justifyContent={removeCancel ? "center" : "flex-end"} sx={footerStyle} className={classes.footer}>
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
                                    loading={(submitting || loading)}
                                    className={classes.button}>
                                    {btnLabel || 'submit'}
                                </LoadingButton>}
                            </AlertDialog> :
                            submitBtn && typeof submitBtn === 'function' ? React.createElement(submitBtn, Object.assign({}, { ...props, classes })) :
                                !disableSubmitBtn && onSubmitbtn ? <LoadingButton
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    disabled={!enableSubmitBtn && (pristine || invalid)}
                                    className={classes.button}
                                    loading={(submitting || loading)}
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
                                        className={classes.button}
                                        loading={(submitting || loading)}
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
                </DialogActions> : null}
            </form>
        </Dialog>
    </React.Fragment >
}

export default reduxForm({
    form: 'upload_form',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    // validate,
    touchOnChange: true,
    destroyOnUnmount: true,
    // forceUnregisterOnUnmount: true
})(ModalRecordForm);