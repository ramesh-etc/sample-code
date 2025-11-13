import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { ImplementationFor } from '../../EditRecordForm/utils';
import { Grid, Typography, Button, DialogActions, Dialog, DialogContent, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import validate from '../../../utils/validation';
import Error from '../../Error';
import AlertDialog from '../../AlertDialog';
import { useTheme } from "@mui/system";
import { useMediaQuery } from '@mui/material';
import { normalize } from '../../../utils/tools';
import useStyles from './styles';

/**
 * 
 * @param {object} props 
 * @returns 
 */

function EditOrCreateForm(props) {
    const { title, handleSubmit, submitting, children, fields, metaData, className, style, btnLabel, onClose, submiterror, show, confirmMessage, pristine, footerStyle, destroy, disableContainer, disableCancelBtn, enableScroll, removeCancel, clearNotifications, updateError, btnLoad, submitButtonView, create, edit, sectionSplit } = props;

    const { classes } = useStyles();
    const [showModal, setModalOpen] = useState(false);
    const [containerHeight, setContainerHeight] = useState(window.innerHeight);

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));

    const closeModal = () => {
        setModalOpen(false);
        if (onClose)
            onClose();
    }

    useEffect(() => {
        const handler = () => {
            setContainerHeight(window.innerHeight);
        }
        // Call the handler once to set the initial width
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    useEffect(() => {
        return () => destroy();
    }, []);

    return (<Grid container={disableContainer ? false : true} className={className} style={style}>
        {children && children(() => setModalOpen(!showModal))}
        <React.Fragment>
            <Dialog
                open={showModal || show || false}
                // onClose={closeModal}
                // scroll={"body"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                // className={classes.paperScrollBody}
                classes={{
                    paper: classes.paperScrollBody
                }}
                slotProps={{ backdrop: { sx: { background: 'rgb(0, 0, 0, 0.7)' } } }}
            >
                <form onSubmit={handleSubmit} noValidate>

                    <DialogTitle id="scroll-dialog-title">

                        <Grid container className={classes.header} justify="space-between">
                            <Grid item>
                                <Typography component="span" className={classes.title}>{title || ''}</Typography>
                            </Grid>
                            <Grid item
                                className={classes.closeIconContainer}
                            >
                                {!disableCancelBtn ? <CloseIcon onClick={closeModal} className={classes.closeIcon} /> : null}
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    {/* <Divider /> */}
                    <DialogContent
                        dividers={true}
                        sx={{
                            // maxHeight: xl ? '415px' : 'auto',
                            // maxHeight: '415px',
                            maxHeight: `${containerHeight - 150}px`,
                            // backgroundColor: 'rgb(248, 248, 251)',
                            display: 'flex',
                            flexDirection: 'column',
                            // gap: '16px',
                            padding: '16px',
                        }}>

                        {/* <Grid container className={classes.body}>
                            <Grid item xs={12} className={enableScroll ? enableScroll : null}> */}
                        <Grid container
                            name="fieldContainer"
                            // spacing={3}
                            sx={{
                                margin: '0px',
                                // gap: '16px',
                                padding: '0px',
                                // justifyContent: 'center'
                                // padding: sm ? '0 0%' : md ? '5% 5%' : lg ? '5% 5%' : '3% 3%',
                                // padding: sm ? '0 0%' : '3% 3%'
                            }}
                        >
                            {(fields || []).map((field, index) => {
                                const InputComponent = ImplementationFor[field.type];
                                const checkBoxClasses = {
                                    // ...(field.type == 'upload' && { disableSubmit: (e) => setShowDisable(e) })
                                    ...(field.type == 'checkbox' && { containerClass: classes.checkBoxContainer })
                                }
                                return <Grid key={index}
                                    item
                                    sx={{
                                        minWidth: lg ? '100%' : '48%',
                                        maxWidth: lg ? '100%' : '48%',
                                        marginLeft: !(index % 2) || lg ? '6px' : '15px',
                                        alignSelf: 'center',
                                        flex: 1,
                                        display: field.type == "checkbox" ? 'flex' : 'block'
                                    }}
                                // xs={12}
                                // md={sectionSplit || 12}
                                // style={field.style || null}
                                // sx={{
                                //     flex: 1
                                // }}
                                >
                                    {field.type !== 'fieldArray' ?
                                        <Field
                                            name={field.value}
                                            label={field.label}
                                            // type="text"
                                            metaData={metaData}
                                            component={InputComponent}
                                            required={field.required}
                                            // normalize={normalize(field)}
                                            disabled={edit && field.disableOptons && field.disableOptons.edit || field.disabled}
                                            {...field}
                                            {...checkBoxClasses}
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
                        {/* </Grid> */}
                        {updateError ? <Grid
                            item
                            className={classes.error}>
                            <Error
                                errorMessage={updateError}
                                severity={'error'}
                                onClose={clearNotifications}
                            />
                        </Grid> : null}
                        {/* </Grid> */}

                    </DialogContent>

                    <DialogActions className={classes.dialogActions}>
                        <Grid container justifyContent={removeCancel ? "center" : "flex-end"} style={footerStyle} className={classes.footer}>
                            {submitButtonView ?
                                React.createElement(submitButtonView, props) :
                                confirmMessage ? <AlertDialog
                                    description={confirmMessage}
                                    onConfirmPopUpClose={true}
                                    btnLabel1='OK'>
                                    {(open) =>
                                        <LoadingButton
                                            type="button"
                                            loading={submitting}
                                            disabled={pristine || submitting}
                                            variant="contained"
                                            color="primary"
                                            onClick={open}
                                            className={classes.submitBtn}>
                                            Create
                                        </LoadingButton>}
                                </AlertDialog> :
                                    <LoadingButton
                                        loading={submitting || btnLoad}
                                        type="submit"
                                        disabled={pristine || submitting}
                                        variant="contained"
                                        color="primary"
                                        className={classes.submitBtn}>
                                        {btnLabel || "Update"}
                                    </LoadingButton>}
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                className={classes.cancelBtn}
                                onClick={() => closeModal()}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    </Grid >
    );
}

export default reduxForm({
    form: 'edit_or_create_record_form',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    validate,
    touchOnChange: true,
    destroyOnUnmount: true,
})(EditOrCreateForm);