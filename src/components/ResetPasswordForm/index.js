/**
 * 
 * Login Form
 * 
 */


import React from 'react';
import { Grid } from '@mui/material';
import { resetPasswordSchema } from './schema'
import Form from './Form';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function ResetPasswordForm(props) {
    const {
        errorMessage,
        clearCache,
        btnload,
        setBtnLoad,
        onSubmit,
        customMessage,
        successMessage
    } = props;

    const fields = (resetPasswordSchema().columns).filter(_ => _.editRecord);

    const handleSubmit = (e) => {
        setBtnLoad(true);
        onSubmit(e);
    }

    return (
        <Grid sx={{
        }}>
            <Form
                onSubmit={handleSubmit}
                fields={fields}
                form={'reset_Password_Form'}
                btnload={btnload}
                errorMessage={errorMessage}
                clearCache={clearCache}
                customMessage={customMessage}
                successMessage={successMessage}
            />
        </Grid>
    )
}

export default ResetPasswordForm;