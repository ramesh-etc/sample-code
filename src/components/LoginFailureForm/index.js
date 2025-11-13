import React, { useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import ErrorMessage from '../Error';
import { LoadingButton } from '@mui/lab';
import HomePageLogo from '../HomePageLogo';
import CustomisedSnackBar from '../CustomisedSnackBar';

/**
 * 
 * @param {object} props 
 * @returns 
 */
const LoginFailureForm = (props) => {

    const { handleSubmit, errorMessage, clearCache, btnload, setBtnLoad, locationState, destroy, fields, customMessage, successMessage } = props;
    const { classes } = useStyles();
    const { identifier } = locationState || {};
    const navigate = useNavigate();

    useEffect(() => {
        return () => destroy();
    }, []);

    return (
        <form onSubmit={handleSubmit} className={classes.form} noValidate >
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
                        Too Many Attempts
                    </Typography>
                    <Grid
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <Typography variant='subTitle2' sx={{
                            fontSize: '14px',
                            width: "100%",
                            color: "#6D7689"
                        }}>
                            Your account is locked due to too many attempts. We sent you a reactivation link to your email address <span style={{ color: "#2D3F62" }}>{identifier}</span>
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
                    <Grid>
                        <LoadingButton
                            className={classes.loadingButton}
                            loading={btnload}
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Resend
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
                            Not you?&nbsp;
                            <Button
                                className={classes.linkColorBtn}
                                onClick={() => {
                                    navigate('/', { state: Object.assign({}, { ...locationState }, { form: 'login' }) })
                                }}
                            >
                                Click here
                            </Button>
                        </Typography>
                    </Grid>
                    {errorMessage &&
                        <Grid name="errorItem" sx={{
                            textAlign: 'center'
                        }}>

                            {errorMessage && <ErrorMessage
                                errorMessage={"Email Sent."}
                                onClose={clearCache}
                                severity={"success"}
                            /> || null}
                            {/* <ErrorMessage
                                errorMessage={errorMessage || successMessage}
                                onClose={clearCache}
                                severity={successMessage ? "success" : "error"}
                                alertClassName={successMessage ? {
                                    root: classes.successMessage,
                                } : {
                                    root: classes.errorMessage,
                                }}
                            /> */}
                        </Grid> || null}

                </Grid>
            </Grid>



            {/* <Grid container spacing={2} className={classes.container} >
                <Grid item xs={12} >
                    <img src={require(`images/home/logo1.png`)} style={{ width: "273px" }} />

                    <Grid container style={{ marginTop: "50px" }}>

                        <Grid item xs={12} >
                            <Grid style={{ marginTop: "50px" }}>
                                <Typography variant="h4" >
                                    Too Many Attempts
                                </Typography>
                                <Typography variant='body2'><br />
                                    Your account is locked due to too many attempts. We sent you a reactivation link to your email address {identifier}
                                </Typography>
                                <LoadingButton
                                    type="submit"
                                    className={classes.signupBtn}
                                    loading={submitting}
                                >
                                    Resend
                                </LoadingButton>
                            </Grid>
                            <Grid item xs style={{ marginTop: "15px" }}>
                                <Typography variant='body2'>
                                    Not you?
                                    <Link
                                        to={{
                                            pathname: '/',
                                            state: Object.assign({}, { ...locationState }, { form: 'login' })
                                        }}
                                        className={classes.linkColor}  >
                                        Click here
                                    </Link>
                                </Typography>
                                {/* {errorMessage && <Success successMessage={"Email Sent."} style={{ marginTop: '35px' }} onClose={clearCache} /> || null} 
                               
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}

        </form>
    )
}

export default reduxForm({
    form: 'loginFailure',
    touchOnChange: true,
})(LoginFailureForm);
