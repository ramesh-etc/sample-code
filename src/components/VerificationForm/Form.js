/**
 * 
 * Login Form
 * 
 */


import React, { useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './styles';
import { ImplementationFor } from '../EditRecordForm/utils';
// import EzpayTekLogo from '../../images/EzTekPAY.svg';
// import { useTheme } from "@mui/system";
import ErrorMessage from '../Error';
import { Field, reduxForm } from 'redux-form';
import CustomisedSnackBar from '../CustomisedSnackBar';
import { useAppDispatch } from '../../redux/hooks';
import HomePageLogo from '../HomePageLogo';
import validate from '../../utils/validation';
import Spinner from '../Spinner';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function Form(props) {
    const { handleSubmit, errorMessage, clearCache, btnload, setBtnLoad, locationState, destroy, fields, customMessage, successMessage } = props;
    const [pageLoader, setPageLoader] = React.useState(false);
    // const theme = useTheme();
    // const sm = useMediaQuery(theme.breakpoints.down('sm'));
    // const lg = useMediaQuery(theme.breakpoints.down('lg'));
    // const xl = useMediaQuery(theme.breakpoints.up('xl'));
    const dispatch = useAppDispatch();

    const { classes } = useStyles();

    useEffect(() => {
        return () => destroy();
    }, []);

    const otpSendButton = (link = () => { }) => <Grid
        sx={{
            height: '10%'
        }}
    >
        <Typography variant='subTitle2' sx={{
            fontSize: '15px',

        }}>
            Didn’t receive the code? &nbsp;
        </Typography>
        <Button
            className={classes.linkColorBtn}
            onClick={() => {
                setPageLoader(true);
                link();
            }}
        >
            Send again
        </Button>
    </Grid>;

    return (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container
                sx={{
                    gap: '24px',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                <Grid item xs={12}>
                    <Grid
                        sx={{
                            textAlign: 'center'
                        }}>
                        <Typography variant='subTitle2' sx={{
                            fontSize: '14px',
                            width: "100%",
                            textAlign: "center",
                            fontWeight: 600,
                            fontFamily: 'Poppins-SemiBold'
                        }}>Phone and Email Verification
                        </Typography>
                        <Grid
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <Typography variant='subTitle2' sx={{
                                fontSize: '14px',
                                width: "100%",
                            }}>Secure your account for further authorizations to start using EzTekPAY
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item
                    xs={12}
                    className={classes.formContainer}
                    sx={{
                        // padding: sm ? '0' : lg ? '0 10%' : '0 18%',
                        // padding: sm ? '0' : lg || xl ? '0 10%' : '0 14%',
                        // display: 'flex',
                        // flexDirection: 'column',
                        // gap: '17px'
                    }}
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
                                // helperText={otpSendButton(() => dispatch(field.action({ error: 'This feature is currently not functional' })))}
                                helperText={otpSendButton(() => dispatch(field.action({ record: { sms: field.value == "sms_otp", email: field.value == "email_otp" }, setLoadingAction: () => setPageLoader(false) })))}
                            />
                        </Grid>
                    })}

                    <Grid sx={{
                        paddingTop: '12px'
                    }}>
                        <LoadingButton
                            className={classes.loadingButton}
                            loading={btnload}
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >Sign Up
                        </LoadingButton>
                    </Grid>

                    {(errorMessage || successMessage) ?
                        <Grid name="errorItem"
                            sx={{
                                marginTop: '15px',
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
                        </Grid>
                        : null}
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
                {pageLoader ? <Spinner style={{
                    position: "absolute",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    // position: "fixed",
                    overflowY: "scroll",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }} /> : null}
            </Grid>
        </form>

    )
}

export default reduxForm({
    form: 'verifyOtp_Form',
    validate,
    enableReinitialize: true,
    touchOnChange: true,
})(Form);