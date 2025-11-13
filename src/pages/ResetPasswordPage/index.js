

import React from "react";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import SlideslowForms from "../../components/SlideslowForms";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCache } from "../../redux/app/actions";
import useStyles from "./styles";
import { resetPassword } from "../../redux/app/actions";
import { setAuthToken } from "../../utils/api";
// import CustomisedSnackBar from "../../components/CustomisedSnackBar";
import HomePageLogo from "../../components/HomePageLogo";
import { useTheme } from "@mui/system";

const ResetPasswordPage = () => {
    const [containerHeight, setContainerHeight] = React.useState(window.innerHeight);
    const [btnload, setBtnLoad] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const error = useAppSelector((state) => state?.authentication?.error);
    // const metaData = useAppSelector((state) => state?.authentication?.metaData);
    // const loading = useAppSelector((state) => state?.authentication?.loading);
    const success = useAppSelector((state) => state?.authentication?.success);
    // const signupdata = useAppSelector((state) => state?.authentication?.signupdata);
    const customerror = useAppSelector((state) => state?.authentication?.customerror);
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));

    const dispatch = useAppDispatch();
    const { classes } = useStyles();

    const { state = {} } = location;
    const locationState = state;
    const pageType = location.pathname.includes("reset-password") ? 'reset' : false;
    const { form,
        identifier, secret, user_from
    } = state || {};
    const formState = form || pageType || 'reset';

    let err = null;

    if ((error && error.login && error.login.response
        && error.login.response.data && error.login.response.data.error) || (error[formState])) {
        const data = (error && error.login && error.login.response && error.login.response.data) || error[formState];

        if ((typeof data.error === 'string') || (typeof data === 'string')) {
            err = data && data['error'] || data;
        } else {
            err = data['error'] && data['error'][Object.keys(data.error)[0]] && data['error'][Object.keys(data.error)[0]][0] || data?.response?.data?.error;
            if (typeof err == 'object') {
                err = JSON.stringify(err);
            }
        }

    }

    let customeErr = null;

    if (customerror && customerror[formState]) {
        customeErr = customerror[formState]
    }

    React.useEffect(() => {
        const handler = () => {
            setContainerHeight(window.innerHeight);
            // setWidth(getOffset('auto-play-container'));
        }
        // Call the handler once to set the initial width
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    const clearSessionCache = () => {
        dispatch(clearCache());
    }

    const handleSubmit = (data) => {
        setAuthToken(`JWT ${searchParams.get("token")}`);
        const newObj = Object.assign({}, { record: data, form: 'reset_Password_Form', setLoadingAction: () => setBtnLoad(false) });
        dispatch(resetPassword(newObj));
    }

    return <Grid container component="main" className={classes.root}>
        <SlideslowForms
            containerHeight={containerHeight}
        >
            {success && !success.reset ? <ResetPasswordForm
                errorMessage={err}
                clearCache={clearSessionCache}
                btnload={btnload}
                setBtnLoad={setBtnLoad}
                onSubmit={handleSubmit}
                customMessage={customeErr}
            /> : null}
            {success && success.reset ?
                <Grid container
                    sx={{
                        gap: '24px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <HomePageLogo />
                    <Grid item xs={12}>
                        <Grid
                            sx={{
                                textAlign: 'center'
                            }}>
                            <Typography variant='subTitle2' sx={{
                                fontSize: '16px',
                                textAlign: 'center',
                                fontFamily: 'Poppins-SemiBold',
                            }}>
                                {success && success.reset}
                            </Typography>

                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12} className={classes.section}>
                        <Typography component="h1" variant="h5">
                            {success && success.reset}
                        </Typography>
                    </Grid> */}
                    <Grid item
                        xs={12}
                        sx={{
                            // padding: sm ? '0' : lg ? '0 10%' : '0 18%',
                            padding: sm ? '0' : lg || xl ? '0 10%' : '0 14%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Button
                            className={classes.loadingButton}
                            fullWidth
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                navigate('/', { state: Object.assign({}, { ...locationState }, { form: 'login' }) })
                            }}
                        >
                            Log In
                        </Button>
                    </Grid>
                </Grid>
                : null}
        </SlideslowForms>
        {/* {successMessage ? <CustomisedSnackBar
            message={successMessage}
            open={successMessage}
            onClose={clearSessionCache}
            autoCloseDuration
            alertStyle={{
            backgroundColor: '#2DC146',
                color: '#fff',
                fontSize: '16px'
            }}
            severity={'success'}
        /> : null} */}
    </Grid>
}

export default ResetPasswordPage;