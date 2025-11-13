/**
 * 
 * Login Form
 * 
 */


import React, { useEffect } from 'react';
import { Grid, Button, Typography, useMediaQuery } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './styles';
import { ImplementationFor } from '../EditRecordForm/utils';
// import EzpayTekLogo from '../../images/EzTekPAY.svg';
import { useTheme } from "@mui/system";
import ErrorMessage from '../Error';
import { Field, reduxForm } from 'redux-form';
import CustomisedSnackBar from '../CustomisedSnackBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HomePageLogo from '../HomePageLogo';

const validate = (values) => {

    const errors = {}

    const sequence = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678)+/ig

    const identical = /^(?!.*(.)\1\1.*).*$/igm

    const commonNames = ["123456", "password", "123456789", "12345678", "12345",
        "111111", "1234567", "sunshine", "qwerty", "iloveyou", "princess", "admin", "welcome",
        "666666", "abc123", "football", "123123", "monkey", "654321", "!@#$%^&amp;*", "charlie",
        "aa123456", "donald", "password1", "qwerty123"
    ]

    const requiredFields = ['new_password', 'confirm_password'];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })

    if (values.new_password && values.new_password.length < 8) {
        errors.new_password = 'Password must be at least 8 characters'
    }

    if (values.new_password && values.new_password.length >= 8 && !/^(?=.*[\d#?!@$%^&*-]).{8,}$/i.test(values.new_password)) {
        errors.new_password = 'Must contain at least one numeric or special character '
    }

    if (values.new_password && sequence.test(values.new_password) || !identical.test(values.new_password)) {
        errors.new_password = 'Avoid consecutive sequential and identical characters'
    }

    commonNames.forEach(field => {
        if (values.new_password == field) {
            errors.new_password = "Password is easily guessable"
        }
    })

    if (values.new_password && values.confirm_password && values.confirm_password != values.new_password) {
        errors.confirm_password = 'Password Mismatch'
    }

    return errors
}

/**
 * 
 * @param {object} props 
 * @returns 
 */
function Form(props) {
    const { handleSubmit, errorMessage, clearCache, btnload, destroy, fields, customMessage, successMessage } = props;
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { classes } = useStyles();

    useEffect(() => {
        return () => destroy();
    }, []);

    return (
        <Grid sx={{
        }}>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Grid container
                    sx={{
                        gap: '24px',
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
                    <Grid item xs={12}
                        className={classes.formContainer}
                    >
                        <Grid
                            sx={{
                                textAlign: 'center'
                            }}>
                            <Typography variant='subTitle2' sx={{
                                fontSize: '16px',
                                textAlign: 'center',
                                fontFamily: 'Poppins-SemiBold',
                            }}>
                                {`Reset Password for ${searchParams.get("email")}`}
                            </Typography>

                        </Grid>
                    </Grid>
                    <Grid item
                        xs={12}
                        sx={{
                            // // padding: sm ? '0' : lg ? '0 10%' : '0 18%',
                            // padding: sm ? '0' : lg || xl ? '0 10%' : '0 14%',
                            // display: 'flex',
                            // flexDirection: 'column',
                            // gap: '12px',
                            // marginTop: '15px'
                        }}
                        className={classes.formContainer}
                    >
                        {(fields || []).map((field, index) => {
                            const InputComponent = ImplementationFor[field.type];
                            return <Grid key={index} sx={{
                            }}>
                                <Field
                                    key={index}
                                    name={field.value}
                                    label={field.label}
                                    component={InputComponent}
                                    placeholder={field.placeholder}
                                    options={field.options}
                                />
                            </Grid>
                        })}

                        <Grid>
                            <LoadingButton
                                className={classes.loadingButton}
                                loading={btnload}
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                            >
                                Reset Password
                            </LoadingButton>
                        </Grid>
                        {errorMessage &&
                            <Grid sx={{
                                textAlign: 'center'
                            }}>
                                <ErrorMessage
                                    errorMessage={errorMessage || successMessage}
                                    // onClose={clearCache}
                                    severity={successMessage ? "success" : "error"}
                                    alertClassName={successMessage ? {
                                        root: classes.successMessage,
                                    } : {
                                        root: classes.errorMessage,
                                    }}
                                />
                            </Grid> || null}
                        {customMessage ? <CustomisedSnackBar
                            message={customMessage}
                            open={customMessage}
                            onClose={() => clearCache()}
                            autoCloseDuration
                            alertStyle={{
                                backgroundColor: '#F03249',
                                color: '#fff',
                                fontSize: '14px'
                            }}
                            severity={'error'}
                        /> : null}
                    </Grid>
                </Grid>
            </form>
        </Grid>

    )
}

export default reduxForm({
    form: 'reset_Password_Form',
    validate,
    enableReinitialize: true,
    touchOnChange: true,
})(Form);