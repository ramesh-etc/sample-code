/**
 * 
 * Login Form
 * 
 */


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './styles';
// import { useTheme } from "@mui/system";
import HorizontalLinearStepper from '../Stepper';
import CheckboxField from '../CheckboxField';
import { ImplementationFor } from '../EditRecordForm/utils';
import ErrorMessage from '../Error';
// import EzpayTekLogo from '../../images/EzTekPAY.svg';
import { useAppDispatch } from '../../redux/hooks';
import { clearSignupRecord, setSignupRecord } from '../../redux/app/actions';
// import UnCheckBox from '../../images/icons/unCheckBox.svg';
// import CheckedBox from '../../images/icons/checkedBox.svg';
import { Field, reduxForm } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { isPossiblePhoneNumber } from 'react-phone-number-input/input';
import HomePageLogo from '../HomePageLogo';

const validate = (values, props) => {
    const errors = {};
    const { field1, field2 } = props;
    const fields = [...field1, ...field2]
    const requiredFields = fields.filter(s => s.mandatory).map(e => e.value);
    const phoneFields = fields.filter(s => s.type == "phone").map(e => Object.assign({}, { value: e.value, max: e.max }));


    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    phoneFields.forEach(field => {
        if (values[field.value]) {
            if (!isPossiblePhoneNumber(values[field.value])) {
                errors[field.value] = 'Invalid Phone Number'
            }
        }
    })
    // }
    return errors;
};

/**
 * 
 * @param {object} props 
 * @returns 
 */
function Form(props) {
    const {
        handleSubmit,
        locationState = {},
        errorMessage,
        clearCache,
        btnload,
        setBtnLoad,
        fields,
        initialValues,
        activeStep,
        setActiveStep,
        destroy,
        submitting,
        hasValues,
    } = props;

    const { classes } = useStyles();
    // const theme = useTheme();
    // const sm = useMediaQuery(theme.breakpoints.down('sm'));
    // const lg = useMediaQuery(theme.breakpoints.down('lg'));
    // const xl = useMediaQuery(theme.breakpoints.up('xl'));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => destroy();
    }, []);

    return (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container
                sx={{
                    gap: '15px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                {/* <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <img src={EzpayTekLogo} style={{ width: '40%' }} />
                        <Typography
                            variant='subTitle2'
                            component={"div"}
                            sx={{
                                fontSize: '14px',
                                width: "100%",
                                textAlign: "center"
                            }}>A platform for digital recovery of small bills</Typography>
                    </Grid> */}
                <HomePageLogo />

                <Grid item sx={{
                    margin: '5px 0px'
                }}>
                    <Grid container
                        sx={{
                        }}>
                        <HorizontalLinearStepper
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} >
                    {activeStep == 0 ? <Grid
                        sx={{
                            textAlign: 'center'
                        }}>
                        <Typography variant='subTitle2' sx={{
                            fontSize: '16px',
                            textAlign: 'center',
                            fontFamily: 'Poppins-SemiBold'
                        }}>Please enter your User Info</Typography>
                    </Grid> : null}

                    {activeStep == 1 ? <Grid
                        sx={{
                            textAlign: 'center'
                        }}>
                        <Typography variant='subTitle2' sx={{
                            fontSize: '16px',
                            textAlign: 'center',
                            fontFamily: 'Poppins-SemiBold'
                        }}>Please enter your Provider Profile</Typography>
                    </Grid> : null}
                </Grid>

                <Grid item
                    xs={12}
                    sx={{
                        // padding: sm ? '0' : '0 18%',
                        // padding: sm ? '0' : lg || xl ? '0 10%' : '0 14%',
                        // display: 'flex',
                        // flexDirection: 'column',
                        // gap: '12px'
                    }}
                    className={classes.formContainer}
                >
                    {(fields || []).map((field, index) => {
                        const InputComponent = ImplementationFor[field.type];
                        return activeStep == 1 && index < 7 ? <Grid key={index} item sx={{
                            marginBottom: '0.5em'
                        }}>
                            <Field
                                key={index}
                                name={field.value}
                                label={field.label}
                                component={InputComponent}
                                placeholder={field.placeholder}
                                options={field.options}
                            />
                        </Grid> : null
                    })}

                    {activeStep == 1 ? <Grid
                        sx={{
                            textAlign: 'center',
                            lineHeight: '18px',
                            marginBottom: '1em'
                        }}>
                        <Typography variant='subTitle2' sx={{
                            fontSize: '14px',

                        }}>
                            I confirm that I have read and agreed to be bound by the applicable terms of:</Typography>
                    </Grid> : null}
                    {activeStep == 1 ? <Grid sx={{
                        marginBottom: '0.5em'
                    }}>
                        <Field
                            name="terms_of_service"
                            label='Terms of Service'
                            component={CheckboxField}
                            type="checkbox"
                            // checkedIcon={<img src={CheckedBox} alt="uncheckbox" style={{ width: '27px' }} />}
                            // uncheckedIcon={<img src={UnCheckBox} alt="uncheckbox" style={{ width: '27px' }} />}
                            style={{

                                padding: '0px',
                                paddingRight: '3px'
                            }}
                        />

                    </Grid> : null}

                    {activeStep == 1 ? <Grid sx={{
                        marginBottom: '0.5em'
                    }}>
                        <Field
                            name="privacy_policy"
                            label='Privacy Policy'
                            component={CheckboxField}
                            type="checkbox"
                        // checkedIcon={<img src={CheckedBox} alt="uncheckbox" style={{ width: '27px' }} />}
                        // uncheckedIcon={<img src={UnCheckBox} alt="uncheckbox" style={{ width: '27px' }} />}
                        />
                    </Grid> : null}

                    {activeStep == 1 ? <Grid
                        sx={{
                            textAlign: 'center',
                            marginBottom: '1em'
                        }}>
                        <Typography variant='subTitle2' sx={{
                            fontSize: '15px',

                        }}>
                            Need to change User Info? &nbsp;
                            <Button
                                className={classes.linkColorBtn}
                                onClick={() => {
                                    dispatch(setSignupRecord({
                                        record: hasValues
                                    }));
                                    // setActiveStep(0);
                                    navigate('/', { state: Object.assign({}, { ...locationState }, { form: 'signup1' }) })
                                }}
                            >
                                Click here
                            </Button>
                        </Typography>
                    </Grid> : null}

                    <Grid>

                        <LoadingButton
                            className={classes.loadingButton}
                            loading={btnload}
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >Next
                        </LoadingButton>
                    </Grid>
                </Grid>

                {errorMessage &&
                    <Grid sx={{
                        textAlign: 'center'
                    }}><ErrorMessage errorMessage={errorMessage} onClose={clearCache} />
                    </Grid> || null}

                <Grid item xs={12} sx={{
                    textAlign: 'center'
                }}>
                    <Typography variant='subTitle2' sx={{
                        fontSize: '15px',

                    }}>
                        Already have an account?&nbsp;
                        <Button
                            className={classes.linkColorBtn}
                            onClick={() => {
                                dispatch(clearSignupRecord());
                                navigate('/', { state: Object.assign({}, { ...locationState }, { form: 'login' }) })
                            }}
                        >
                            Log In
                        </Button>
                    </Typography>
                </Grid>

            </Grid>
        </form>
    )
}

Form = reduxForm({
    form: 'signup_Form2',
    enableReinitialize: true,
    validate,
    touchOnChange: true,
})(Form);

const selector = formValueSelector('signup_Form2'); // <-- same as form name
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