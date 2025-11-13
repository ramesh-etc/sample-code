
import React from "react";
import { Grid, Typography, Button, useMediaQuery, InputAdornment } from "@mui/material";
import { Field, reduxForm } from 'redux-form';
import { ImplementationFor } from "../../../components/EditRecordForm/utils";
import useStyles from "./styles";
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from "@mui/system";
import validate from "../../../utils/validation";
// import EditIcon from '@mui/icons-material/Edit';
// import Icons from "../../../components/Icons";

const Form = (props) => {
    const { handleSubmit, btnload, destroy, fields, name, isCurrentEditForm, handleCancel, submitBtnLabel, submitBtn, label, reset } = props;
    const { classes } = useStyles();

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lgup = useMediaQuery(theme.breakpoints.up('lg'));
    const xlup = useMediaQuery(theme.breakpoints.up('xl'));

    React.useEffect(() => {
        return () => destroy();
    }, []);

    const inputStyle =
    {
        '& .MuiOutlinedInput-root': {
            borderRadius: '5px',
            // height: 50,
            padding: '5px',
            border: 'none',
            boxShadow: 'none',
            ':hover': {
                border: 'none',
                // boxShadow: '-1px 1px 4px 4px #E7E7E7'
            },
            ':focus-within': { border: 'none' }
        },
        '& .MuiOutlinedInput-root.Mui-disabled': {
            ':hover': {
                border: 'none',
                boxShadow: 'none'
            }
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        }
    };

    return <form onSubmit={handleSubmit}>
        <Grid className={classes.formContainer}>
            {(fields || []).map((field, index) => {
                const InputComponent = ImplementationFor[field.type];

                const dynamicClass = {
                    ...(field.value && ["inv_subj", "welcome_inv_subj"].includes(field.value) ? {
                        dynamicClass: classes.subjectField,
                        inputStyle: inputStyle,
                        customClassContiner: classes.fieldContainer,
                        errorContainer: classes.errorContainer,
                        adorments: {
                            startAdornment:
                                (<InputAdornment position="start">
                                    <Typography variant="bodySpan1" sx={{ fontSize: '14px', width: '65px', fontFamily: 'Poppins-SemiBold' }}>Subject:</Typography>
                                </InputAdornment>)
                        }
                    }
                        : ["inv_msg", "welcome_inv_msg"].includes(field.value) ? {
                            dynamicClass: classes.messageContentField,
                            inputStyle: inputStyle,
                            multiline: true,
                            rows: 5,
                            maxRows: 5,
                            customClassContiner: classes.fieldContainer,
                            errorContainer: classes.errorContainer,
                            adorments: {
                                startAdornment:
                                    (<InputAdornment position="start">
                                        <Typography variant="bodySpan1" sx={{ fontSize: '14px', width: '65px', fontFamily: 'Poppins-SemiBold' }}>Message:</Typography>
                                    </InputAdornment>)
                            },
                            // staticText: <Typography variant="bodySpan1" className={classes.staticText}>{"Welcome {first_name} {last_name}, \n"}</Typography>
                        }
                            : {})
                }
                return <Grid key={index}
                // className={classes.fieldItems}
                >
                    <Field
                        key={index}
                        name={field.value}
                        label={field.label}
                        component={InputComponent}
                        placeholder={field.placeholder}
                        options={field.options}
                        {...dynamicClass}
                        // inputStyle={inputStyle}
                        // dynamicClass={dynamicClass?.containerClass}
                        disabled={!isCurrentEditForm}
                        // noBorder={!isCurrentEditForm}
                        {...field}
                    />
                </Grid>
            })}
            {isCurrentEditForm ? <Grid sx={{
                paddingTop: '12px',
                display: 'flex'
            }}
            // xs={12}
            >
                {submitBtn && typeof submitBtn === 'function' ? React.createElement(submitBtn, Object.assign({}, { ...props, classes })) : <LoadingButton
                    className={classes.loadingButton}
                    loading={btnload}
                    type='submit'
                    // fullWidth
                    variant='contained'
                    color='primary'
                >
                    {`${submitBtnLabel}`}
                </LoadingButton>}
                <Button
                    className={classes.cancelbtn}
                    type='button'
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        handleCancel();
                        reset();
                    }}
                >
                    Cancel
                </Button>
            </Grid> : null}
        </Grid>
    </form>

}

export default reduxForm({
    form: 'message_Form',
    validate,
    enableReinitialize: true,
    touchOnChange: true,
})(Form);
