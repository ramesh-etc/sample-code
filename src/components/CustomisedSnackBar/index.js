import React from "react";
import { Alert, Snackbar, Slide } from "@mui/material";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const CustomisedSnackBar = (props) => {
    const { open, handleClose, message, severity, onClose, autoCloseDelay, autoCloseDuration, alertStyle = {} } = props;

    const snackbarProps = {
        ...(onClose && { onClose: onClose }),
        TransitionComponent: SlideTransition,
        ...(autoCloseDelay && { autoHideDuration: autoCloseDelay }),
        ...(autoCloseDuration && { autoHideDuration: 4000 })
    };

    return <Snackbar
        open={open}
        onClose={handleClose}
        {...snackbarProps}
        // message={message}
        key={message}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
    // disableWindowBlurListener={true}
    >
        <Alert
            // onClose={() => dispatch({ type: ActionType.REMOVE, payload: e.id })}
            severity={severity}
            sx={Object.assign(alertStyle, { width: '100%' })}>
            {message}
        </Alert>
    </Snackbar>
}

export default CustomisedSnackBar;