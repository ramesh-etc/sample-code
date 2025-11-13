/**
 * 
 * Login Form
 * 
 */


import React from 'react';
import { Grid } from '@mui/material';
import { forgetPasswordSchema } from './schema'
import Form from './Form';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function ForgetPasswordForm(props) {
    const {

        locationState = {},
        errorMessage,
        clearCache,
        btnload,
        setBtnLoad,
        onSubmit,
        customMessage,
        successMessage
    } = props;

    const fields = (forgetPasswordSchema().columns).filter(_ => _.editRecord);

    const handleSubmit = (e) => {
        setBtnLoad(true);
        onSubmit(e);
    }

    return (
        <Form
            onSubmit={handleSubmit}
            fields={fields}
            form={'forget_Password_Form'}
            btnload={btnload}
            setBtnLoad={setBtnLoad}
            locationState={locationState}
            errorMessage={errorMessage}
            clearCache={clearCache}
            customMessage={customMessage}
            successMessage={successMessage}
        />
    )
}

export default ForgetPasswordForm;