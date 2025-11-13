/**
 * 
 * Edit Record Form
 * 
 */

import React, { useEffect } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImplementationFor } from './utils';
import { Grid, Button, useMediaQuery } from '@mui/material';
import useStyles from './styles';
import validate from '../../utils/validation';
// import ButtonSpinner from 'components/ButtonSpinner';
import LoadingButton from '@mui/lab/LoadingButton';
// import { normalize, disableOnSubmitForm } from '../../utils/tools';
import AlertDialog from '../AlertDialog';
import Error from '../Error';
import { useTheme } from "@mui/system";


/**
 * 
 * @param {object} props 
 * @returns 
 */
function EditRecordForm(props) {

    const { classes } = useStyles();
    const { handleSubmit, pristine, submitting, fields, path, error, metaData, locationState, confirmButton, confirmMessage, btnLabel, invalid, destroy, spinner, cancelBtn, updateBtn, submitBtn, enableSubmitBtn, form, AlertBtnLabel1, AlertBtnLabel2, noNeedCancel, parentPath, labelStyle } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));


    useEffect(() => {
        return () => destroy();
    }, []);

    const cancel = () => {
        navigate(`${parentPath}`, { state: location.state })
    }

    return (<div>
        <form onSubmit={handleSubmit} className={classes.form} noValidate >
            <Grid container
                // spacing={3}
                sx={{
                    padding: '10px 0',
                    gap: '10px',
                    width: sm ? '100%' : md ? '80%' : lg ? '50%' : '35%'
                }}
            >
                {(fields || []).map((field, index) => {
                    const InputComponent = ImplementationFor[field.type];
                    const myFieldWithoutLabel = (({ label, ...rest }) => rest)(field);

                    return <Grid key={index} item xs={12} style={field.style || null}>
                        <Grid container sx={{
                            alignItems: 'center',

                        }}>
                            <Field
                                name={field.value}
                                // label={field.label}
                                type={field.type}
                                metaData={metaData}
                                component={InputComponent}
                                disabled={field.disableOptons && field.disableOptons.create}
                                labelStyle={labelStyle}
                                {...field}
                            />
                        </Grid>
                    </Grid>
                })}
                <Grid item xs={12}>
                    {error && <Error errorMessage={error} /> || ''}
                </Grid>
            </Grid>
            <Grid className={classes.footer}>
                {submitBtn && typeof submitBtn === 'function' ? React.createElement(submitBtn, Object.assign({}, { ...props, classes })) : confirmButton ? <AlertDialog
                    description={confirmMessage}
                    onConfirm={() => handleSubmit()}
                    onConfirmPopUpClose={true}
                    btnLabel1={AlertBtnLabel1 || 'Yes'}
                    btnLabel2={AlertBtnLabel2 || 'No'} >
                    {(open) =>
                        <LoadingButton
                            loading={(submitting || spinner)}
                            type="button"
                            disabled={!enableSubmitBtn && (pristine || submitting) || !enableSubmitBtn && (!pristine && invalid)}
                            variant="contained"
                            onClick={!invalid ? open : null}
                            color="primary"
                            className={classes.submitBtn}
                        >{btnLabel || 'submit'}</LoadingButton>}
                </AlertDialog> :
                    <LoadingButton
                        loading={(submitting || spinner)}
                        type="submit"
                        disabled={!enableSubmitBtn && (pristine || submitting) || !enableSubmitBtn && (!pristine && invalid)}
                        variant="contained"
                        color="primary"
                        className={updateBtn ? updateBtn : classes.submitBtn}
                    >
                        {btnLabel || 'Update'}
                    </LoadingButton>}
                {!noNeedCancel ? (cancelBtn && React.createElement(cancelBtn) ||
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className={classes.cancelBtn}
                        onClick={cancel}
                    >
                        Cancel
                    </Button>
                ) : null}
            </Grid>
        </form>
    </div>)

}


export default reduxForm({
    form: 'edit_record',
    enableReinitialize: true,
    validate,
    touchOnChange: true,
})(EditRecordForm);