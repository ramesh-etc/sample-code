import React, { useEffect, useState, } from "react";
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ImplementationForm } from "./utils";
import Spinner from "../../components/Spinner";
import useStyles from "./styles";
import { logIn, signUp, clearCache, setSignupRecord, forgotPassword, verifyOtp, loadAppVersion } from "../../redux/app/actions";
// import GroupLogo from '../../images/GroupLogo.svg';
// import FrameLine from '../../images/FrameLine.svg';
// import FrameRound from '../../images/FrameRound.svg';
// import Diamond from '../../images/DiamondHome.svg';
// import Slideshow from "./SlideShow";
import { omit } from 'lodash';
import SlideslowForms from "../../components/SlideslowForms";
import { useClearCache } from "react-clear-cache";
import store2 from "store2";
// import CustomisedSnackBar from "../../components/CustomisedSnackBar";

// function getOffset(id) {
//     if (!id) {
//         return false;
//     }
//     const main = document.getElementById(id);
//     return main && main.offsetWidth || 0;
// }

export default function LoginPage() {
    const { classes } = useStyles();
    const queryParams = useParams();
    const theme = useTheme();
    const xl = useMediaQuery(theme.breakpoints.up('lg'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const sm = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageType = location.pathname.includes("signin") ? 'login' : location.pathname.includes("login") ? 'login' : location.pathname.includes("signup1") ? 'signup1' : location.pathname.includes("signup2") ? 'signup2' : location.pathname.includes("forgot") ? 'forgot' : location.pathname.includes("verifyOtp") ? 'verifyOtp' : location.pathname.includes("loginFailure") ? 'loginFailure' : false;
    const { state = {} } = location;
    const { form,
        identifier, secret, user_from
    } = state || {};

    const formState = form || pageType || 'login';
    const Component = formState && ImplementationForm[formState];
    const [pageLoader, setPageLoader] = useState(false);
    // const [containerWidth, setWidth] = useState(getOffset('auto-play-container'));
    const [containerHeight, setContainerHeight] = useState(window.innerHeight);
    const [btnload, setBtnLoad] = useState(false);

    const error = useAppSelector((state) => state?.authentication?.error);
    const metaData = useAppSelector((state) => state?.authentication?.metaData);
    const loading = useAppSelector((state) => state?.authentication?.loading);
    const success = useAppSelector((state) => state?.authentication?.success);
    const signupdata = useAppSelector((state) => state?.authentication?.signupdata);
    const customerror = useAppSelector((state) => state?.authentication?.customerror);
    const appVersion = useAppSelector((state) => state?.authentication?.appVersion);
    const user = useAppSelector((state) => state?.authentication?.user);
    const { version } = user || {};
    const dispatch = useAppDispatch();

    const { emptyCacheStorage } = useClearCache({ auto: true });
    const storeVersion = store2.get('version');
    if ((!version && appVersion && storeVersion && appVersion !== storeVersion) || (appVersion && !version && !storeVersion)) {
        store2.set('version', appVersion);
        emptyCacheStorage();
    }

    useEffect(() => {
        const handler = () => {
            setContainerHeight(window.innerHeight);
            // setWidth(getOffset('auto-play-container'));
        }
        // Call the handler once to set the initial width
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    useEffect(() => {
        // let mounted = true;
        dispatch(loadAppVersion());
        // return () => mounted = false;
    }, []);

    useEffect(() => {
        dispatch(clearCache());
    }, [formState]);

    let err = null;
    let successMessage = null;

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

    if ((success && success.login && success.login.response
        && success.login.response.data && success.login.response.data.success) || (success[formState])) {
        const data = (success && success.login && success.login.response && success.login.response.data) || success[formState];

        if ((typeof data.success === 'string') || (typeof data === 'string')) {
            successMessage = data && data['success'] || data;
        } else {
            successMessage = data['success'] && data['success'][Object.keys(data.success)[0]] && data['error'][Object.keys(data.success)[0]][0] || data?.response?.data?.success;
            if (typeof successMessage == 'object') {
                successMessage = JSON.stringify(successMessage);
            }
        }

    }

    let customeErr = null;

    if (customerror && customerror[formState]) {
        customeErr = customerror[formState]
    }

    const initialValues = state?.form === 'signup1' || state?.form === 'signup2' ? signupdata : {};

    const handleSubmit = async (data) => {
        if (formState === 'login') {
            setBtnLoad(true);
            await dispatch(logIn(Object.assign({}, { identifier: data.email, secret: data.password, queryParams: Object.assign({}, queryParams, { reactivation: searchParams.get("reactivation") || false }), form: 'login_Form', setLoadingAction: () => setBtnLoad(false) })));
        }
        else if (formState === 'signup2') {
            const keysToRemove = ['confirm_password', 'privacy_policy', 'terms_of_service'];
            setBtnLoad(true);
            // Use omit to create a new object without the specified keys
            const newObject = omit(data, keysToRemove);
            await dispatch(signUp({ record: newObject, form: 'signup_Form', setLoadingAction: () => setBtnLoad(false) }));
        } else if (formState === 'verifyOtp') {
            // const loginObj = Object.assign({}, { identifier: signupdata?.email, secret: signupdata?.password, queryParams: queryParams, form: 'verifyOtp_Form', setLoadingAction: () => setBtnLoad(false) });
            // await dispatch(logIn(loginObj));
            const verifyObj = { record: Object.assign({}, data, { hospital_id: signupdata?.hospital_id }), queryParams: queryParams, form: 'verifyOtp_Form', setLoadingAction: () => setBtnLoad(false), form: 'verifyOtp_Form' };
            await dispatch(verifyOtp(verifyObj));
        } else if (formState === 'forgot') {
            const loginObj = Object.assign({}, { record: data, form: 'forget_Password_Form', setLoadingAction: () => setBtnLoad(false) });
            await dispatch(forgotPassword(loginObj));
        } else if (formState == 'signup1') {
            dispatch(setSignupRecord({ record: data }));
            navigate('/', { state: Object.assign({}, { ...location.state }, { form: 'signup2' }) })
        } else if (formState === 'loginFailure' && identifier && secret) {
            setBtnLoad(true);
            const loginObj = Object.assign({}, { identifier: identifier, secret: secret, queryParams: Object.assign({}, queryParams, { reactivation: searchParams.get("reactivation") || false }), form: 'loginFailureForm', setLoadingAction: () => setBtnLoad(false) });
            await dispatch(logIn(loginObj));
        }
    }

    const clearSessionCache = () => {
        dispatch(clearCache());
    }

    if (pageLoader) {
        return <Spinner loading={true} showHeight />
    }

    return <Grid container component="main" className={classes.root}>
        <SlideslowForms
            containerHeight={containerHeight}
        >
            {formState &&
                <React.Fragment>
                    <Component
                        initialValues={initialValues}
                        form={`${formState}_Form`}
                        onSubmit={handleSubmit}
                        errorMessage={err}
                        clearCache={clearSessionCache}
                        success={success}
                        locationState={state}
                        metaData={metaData}
                        loading={loading}
                        formState={formState}
                        btnload={btnload}
                        setBtnLoad={setBtnLoad}
                        customMessage={customeErr}
                        successMessage={successMessage}
                    />
                    {/* <Box mt={5}>
                            <Copyright textColor={formState === 'requestDemo' ? '#ffff' : '#000'} />
                        </Box> */}
                </React.Fragment> || null}
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
