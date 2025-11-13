import React, { useEffect } from "react";
import { ImplementationFor } from "../../../components/EditRecordForm/utils";
import { Grid } from "@mui/material";
import { Field, FieldArray, reduxForm } from "redux-form";
import useStyles from "./styles";
import LoadingButton from '@mui/lab/LoadingButton';
// import validate from "../../../utils/validation";
import { normalize } from "../../../utils/tools";
import { formValueSelector } from "redux-form";
import { connect } from 'react-redux';

function Form(props) {
    const { title, handleSubmit, submitting, fields, metaData, className, style, btnLabel, submiterror, show, confirmButton, confirmMessage, pristine, invalid, onSubmitClose, footerStyle, destroy, disableContainer, enableSubmitBtn, disableCancelBtn, progress, footerBtn, confirmPopUpClose, paperClassName, enableScroll, page, disableCancelButton, footerCancelBtn, disableSubmitBtn, alertOnSubmitClose, form, onSubmitbtn, AlertBtnLabel1, AlertBtnLabel2, submitBtn, loading, removeCancel, reset, dispatch, valueBasedDisable, clearError, sectionSplit, fieldContainer } = props;
    const { classes } = useStyles();
    // const [showModal, setModalOpen] = useState(false);

    // const theme = useTheme();
    // const md = useMediaQuery(theme.breakpoints.up('md'));
    // const sm = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => {
        return () => destroy();
    }, []);

    return <>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container className={fieldContainer || {}}>
                {(fields || []).map((field, index) => {
                    const InputComponent = ImplementationFor[field.type];
                    return <Grid
                        key={index}

                        // item xs={12}
                        // md={sectionSplit || 12}
                        style={field.style || null}>
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
                                customLabelClass={classes.customLabelClass}
                                fieldHeight={37}
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
            <Grid container sx={{
                justifyContent: 'flex-end'
            }}>
                {submitBtn && typeof submitBtn === 'function' ? React.createElement(submitBtn, Object.assign({}, { ...props, classes })) :
                    !disableSubmitBtn && onSubmitbtn ? <LoadingButton
                        type="button"
                        variant="contained"
                        color="primary"
                        // disabled={!enableSubmitBtn && (pristine || invalid)}
                        className={classes.submitBtn}
                        loading={(submitting || progress)}
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
                            // disabled={!enableSubmitBtn && (pristine || invalid || valueBasedDisable)}
                            className={classes.submitBtn}
                            loading={(submitting || progress || loading)}
                        // onClick={!invalid && onSubmitClose ? closeModal : null}
                        >
                            {btnLabel || 'submit'}
                        </LoadingButton> : true}
            </Grid>
        </form>
    </>
}

// export default reduxForm({
//     form: 'filter_box',
//     enableReinitialize: true,
//     validate,
//     touchOnChange: true,
//     destroyOnUnmount: true,
//     // forceUnregisterOnUnmount: true
// })(Form);

Form = reduxForm({
    form: 'filter_box',
    enableReinitialize: true,
    // validate,
    touchOnChange: true,
})(Form);

const selector = formValueSelector('filter_box'); // <-- same as form name
Form = connect((state, props) => {
    const { fields } = props;
    // can select values individually
    const hasValues = (fields || []).reduce((acc, column) => {
        acc[column.value] = selector(state, column.value);
        return acc;
    }, {});

    return {
        hasValues,
    }
})(Form)

export default Form;