/**
 * 
 * Login Form
 * 
 */


import React from 'react';
import { Grid } from '@mui/material';
import { verifySchema } from './schema'
import Form from './Form';
import { getInitialValue } from '../../utils/tools';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function VerificationForm(props) {
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

    const fields = (verifySchema().columns).filter(_ => _.editRecord);
    let initial = Object.assign({}, getInitialValue(fields), {});

    const handleSubmit = (e) => {
        setBtnLoad(true);
        onSubmit(e);
    }

    return (
        <Form
            onSubmit={handleSubmit}
            initial={initial}
            fields={fields}
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

export default VerificationForm;