/**
 * 
 * Error
 * 
 */

import React, { useEffect } from 'react';
import { Alert, Grid } from '@mui/material';

const ErrorMessage = ({ style, errorMessage, onClose, action, actionComp, severity, alertstyle = {}, alertClassName, icon }) => {

    useEffect(() => {
        if (onClose) {
            setTimeout(onClose, 4000);
        }
    }, []);

    const alertProps = {
        ...(action && { action: actionComp }),
        ...(!icon && { icon: icon })
    }

    return (<Grid sx={style || {}}>
        {errorMessage != null ? <Alert
            // className={alertClassName}
            classes={alertClassName}
            sx={alertstyle || {
                alignItems: 'center'
            }}
            severity={severity || "error"}
            variant="filled"
            {...alertProps}
        >
            {errorMessage}
        </Alert> : null}
    </Grid>);
}

export default ErrorMessage;