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
import { useNavigate } from 'react-router-dom';
import HomePageLogo from '../HomePageLogo';
import validate from '../../utils/validation';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function Form(props) {
    const { handleSubmit, errorMessage, clearCache, btnload, setBtnLoad, locationState, destroy, fields, customMessage, successMessage } = props;
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));
    const navigate = useNavigate();

    const { classes } = useStyles();

    useEffect(() => {
        return () => destroy();
    }, []);

    return (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container
                sx={{
                    gap: '24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // padding: xl ? '0px 10%' : '0px'
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
                <Grid
                    // item xs={12}
                    sx={{
                        // padding: sm ? '0' : lg ? '0 10%' : '0 18%',
                        // padding: sm ? '0' : lg || xl ? '0 10%' : '0 14%',
                        // display: 'flex',
                        // flexGrow: 0,
                        // flexDirection: 'column',

                    }}
                    className={classes.formContainer}
                >
                    {/* <Grid
                            sx={{
                                textAlign: 'center'
                            }}> */}
                    <Typography variant='subTitle2' sx={{
                        fontSize: '16px',
                        textAlign: 'center',
                        fontFamily: 'Poppins-SemiBold',
                    }}>
                        Forgot Your Password?
                    </Typography>
                    <Grid
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <Typography variant='subTitle2' sx={{
                            fontSize: '14px',
                            width: "100%",
                        }}>
                            Enter your email address and we will send you a link to reset your password
                        </Typography>
                    </Grid>
                    {/* </Grid> */}
                </Grid>
                <Grid
                    // item
                    // xs={12}
                    // md={9}
                    sx={{
                        // padding: sm ? '0' : lg ? '0 10%' : '0 18%',
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
                            Request Reset
                        </LoadingButton>
                    </Grid>
                    <Grid
                        sx={{
                            textAlign: 'center',
                            // marginTop: '1em'
                        }}>
                        <Typography variant='subTitle2' sx={{
                            fontSize: '15px',

                        }}>
                            <Button
                                className={classes.linkColorBtn}
                                onClick={() => {
                                    navigate('/', { state: Object.assign({}, { ...locationState }, { form: 'login' }) })
                                }}
                            >
                                Back to Sign In
                            </Button>
                        </Typography>
                    </Grid>
                    {(errorMessage || successMessage) ?
                        <Grid name="errorItem" sx={{
                            textAlign: 'center'
                        }}>
                            <ErrorMessage
                                errorMessage={errorMessage || successMessage}
                                onClose={clearCache}
                                severity={successMessage ? "success" : "error"}
                                alertClassName={successMessage ? {
                                    root: classes.successMessage,
                                } : {
                                    root: classes.errorMessage,
                                }}
                            />
                        </Grid> : null}
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

    )
}

export default reduxForm({
    form: 'forget_Password_Form',
    validate,
    enableReinitialize: true,
    touchOnChange: true,
})(Form);