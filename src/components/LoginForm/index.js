/**
 * 
 * Login Form
 * 
 */


import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { loginSchema } from './schema';
import Form from './Form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearSignupRecord } from '../../redux/app/actions';
import { getFormValues } from 'redux-form';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function LoginForm(props) {
    const {
        locationState = {},
        errorMessage,
        clearCache,
        btnload,
        setBtnLoad,
        onSubmit,
    } = props;
    const dispatch = useAppDispatch();
    const fields = (loginSchema().columns).filter(_ => _.editRecord);
    // const selector = useAppSelector(state => getFormValues('login_Form')(state));

    useEffect(() => {
        dispatch(clearSignupRecord());
    }, [])

    const handleSubmit = (e) => {
        setBtnLoad(true);
        onSubmit(e);
    }

    return (
        <Form
            onSubmit={handleSubmit}
            fields={fields}
            btnload={btnload}
            locationState={locationState}
            errorMessage={errorMessage}
            clearCache={clearCache}
        />
    )
}

export default LoginForm;