/**
 * 
 * Login Form
 * 
 */


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './styles';
import ErrorMessage from '../Error';
import { ImplementationFor } from '../EditRecordForm/utils';
// import EzpayTekLogo from '../../images/EzTekPAY.svg';
import { useTheme } from "@mui/system";
import { Field, reduxForm } from 'redux-form';
import HomePageLogo from '../HomePageLogo';

const validate = (values, props) => {
    const errors = {};
    const { fields } = props;
    const requiredFields = fields.filter(s => s.mandatory).map(e => e.value)
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })

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
        // initial,
        submitting,
        destroy
    } = props;

    const { classes } = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));

    useEffect(() => {
        return () => destroy();
    }, []);

    return (
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

                <Grid item
                    // xs={12}
                    sx={{
                        // padding: sm ? '0' : '0 18%',

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
                    <Grid
                        sx={{
                            textAlign: 'center'
                        }}>
                        <Typography variant='subTitle2' sx={{
                            fontSize: '15px',

                        }}>
                            Forgot password?&nbsp;
                            <Link
                                to="/"
                                state={{ form: 'forgot' }}
                                // to={{
                                //     pathname: '/',
                                //     state: Object.assign({}, { ...locationState }, { form: 'forgot' })
                                // }}
                                className={classes.linkColor}>
                                Click here to Reset
                            </Link></Typography>
                    </Grid>
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
                        >Log In
                        </LoadingButton>
                    </Grid>

                    {errorMessage &&
                        <Grid sx={{
                            textAlign: 'center'
                        }}
                            xs={12}>
                            <ErrorMessage errorMessage={errorMessage} onClose={clearCache} />
                        </Grid> || null}

                    <Grid sx={{
                        textAlign: 'center',
                        display: 'block'
                    }} xs={12}>
                        <Typography variant='subTitle2' sx={{
                            fontSize: '15px',

                        }}>
                            Don&apos;t have an account?&nbsp;
                            <Link to="/" state={{ form: 'signup1' }}
                                className={classes.linkColor}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
        </form>
    )
}

export default reduxForm({
    form: 'login_Form',
    enableReinitialize: true,
    validate,
    touchOnChange: true,
})(Form);