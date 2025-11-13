

import React from "react";
import { Dialog, } from "@mui/material";
import CustomisedSnackBar from "../CustomisedSnackBar";
import useStyles from "./styles";

const CommonDialog = (props) => {
    const { open, children, onCloseError, alertStyle, errormessage, paperClass } = props;
    const { classes } = useStyles();

    return <Dialog
        open={open || false}
        // onClose={closeModal}
        // scroll={"scroll"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={{
            paper: paperClass || classes.paper,
            // scrollPaper: classes.topScrollPaper,
            // paperScrollBody: classes.topPaperScrollBody,
        }}
        slotProps={{ backdrop: { sx: { background: 'rgb(0, 0, 0, 0.7)' } } }}
    >
        {children}
        {errormessage ? <CustomisedSnackBar
            message={errormessage}
            open={errormessage}
            onClose={onCloseError}
            autoCloseDuration
            alertStyle={alertStyle}
            severity={'error'}
        /> : null}
    </Dialog>
}

export default CommonDialog;