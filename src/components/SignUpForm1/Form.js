/**
 * 
 * Login Form
 * 
 */


import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, useMediaQuery } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './styles';
import { useTheme } from "@mui/system";
import HorizontalLinearStepper from '../Stepper'
import { ImplementationFor } from '../EditRecordForm/utils';
import ErrorMessage from '../Error';
// import EzpayTekLogo from '../../images/EzTekPAY.svg';
import { useAppDispatch } from '../../redux/hooks';
import { clearSignupRecord, setSignupRecord } from '../../redux/app/actions';
import { Field, reduxForm } from 'redux-form';
import { isPossiblePhoneNumber } from 'react-phone-number-input/input';
import HomePageLogo from '../HomePageLogo';

const validate = (values, props) => {
    const errors = {};
    const { fields } = props;
    const requiredFields = fields.filter(s => s.mandatory).map(e => e.value);
    const phoneFields = fields.filter(s => s.type == "phone").map(e => Object.assign({}, { value: e.value, max: e.max }));
    const sequence = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678)+/ig

    const identical = /^(?!.*(.)\1\1.*).*$/igm

    const commonNames = ["123456", "password", "123456789", "12345678", "12345",
        "111111", "1234567", "sunshine", "qwerty", "iloveyou", "princess", "admin", "welcome",
        "666666", "abc123", "football", "123123", "monkey", "654321", "!@#$%^&amp;*", "charlie",
        "aa123456", "donald", "password1", "qwerty123"
    ];

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

    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)
    ) {
        errors.email = 'Invalid Email'
    }

    if (values.password && values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
    }

    if (values.password && values.password.length >= 8 && !/^(?=.*[\d#?!@$%^&*-]).{8,}$/i.test(values.password)) {
        errors.password = 'Must contain at least one numeric or special character '
    }

    if (values.password && sequence.test(values.password) || !identical.test(values.password)) {
        errors.password = 'Avoid consecutive sequential and identical characters'
    }

    commonNames.forEach(field => {
        if (values.password == field) {
            errors.password = "Password is easily guessable"
        }
    })

    if (values.password && values.confirm_password && values.confirm_password != values.password) {
        errors.confirm_password = 'Password Mismatch'
    }
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
        activeStep,
        setActiveStep,
        destroy,
        submitting,
        hasValues,
    } = props;

    const { classes } = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));
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
                            // fontWeight: 600,
                            textAlign: 'center',
                            fontFamily: 'Poppins-SemiBold'
                        }}>Please enter your User Info</Typography>
                    </Grid> : null}
                </Grid>

                <Grid item
                    xs={12}
                    sx={{
                        // padding: sm ? '0' : '0 18%',
                        // padding: sm ? '0' : lg || xl ? '0 10%' : '0 14%',
                        // // maxWidth: '420px',
                        // display: 'flex',
                        // flexDirection: 'column',
                        // gap: '12px'
                    }}
                    className={classes.formContainer}
                >
                    {(fields || []).map((field, index) => {
                        const InputComponent = ImplementationFor[field.type];
                        return activeStep == 0 ?
                            <Grid key={index} sx={{
                                // paddingBottom: '1em',
                                marginBottom: '0.5em'
                            }}>
                                <Field
                                    key={index}
                                    name={field.value}
                                    label={field.label}
                                    component={InputComponent}
                                    {...field}
                                    placeholder={field.placeholder}
                                    options={field.options}
                                // normalize={normalize(field)}
                                />
                            </Grid>
                            : null
                    })}


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

export default reduxForm({
    form: 'signup_Form1',
    enableReinitialize: true,
    validate,
    touchOnChange: true,
})(Form);;