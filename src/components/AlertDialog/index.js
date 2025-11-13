/**
 * 
 * Alert Dialog
 * 
 */

import React, { useState } from 'react';
import { Grid, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Styles from './styles';
import LoadingButton from '@mui/lab/LoadingButton';

export default function AlertDialog({ title, children, btnLabel1, btnLabel2, description, onConfirm, onConfirmPopUpClose, openDialog, closeDialog, heading, footerBtn, page, alertOnClose, btnLoad, containerClass }) {

  const { classes } = Styles();
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    if (closeDialog) {
      closeDialog();
    }
  }

  const confirm = () => {
    if (onConfirm) {
      onConfirm();
    }

    if (onConfirmPopUpClose) {
      close();
    }
  }


  return (<Grid className={containerClass || classes.dummy}>
    {children && children(() => setOpen(!open))}
    <Dialog
      open={open || openDialog || false}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: classes.paper
      }}
    >
      {title && <DialogTitle id="alert-dialog-title" >{title}</DialogTitle>}
      {typeof heading === 'function' && heading() || heading && <Grid className={classes.gridHeader}>
        <Typography variant="h6" gutterBottom component="span"><b>{heading || ''}</b></Typography>
      </Grid> || null}
      <DialogContent className={classes.dialogContent}>
        <DialogContentText id="alert-dialog-description" className={classes.description}>
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {footerBtn && typeof footerBtn === 'function' ? React.createElement(footerBtn) : btnLabel1 ? <LoadingButton
          onClick={confirm}
          color="primary"
          type='button'
          variant="contained"
          autoFocus
          className={classes.submitBtn}
          loading={btnLoad}
        >
          {btnLabel1}
        </LoadingButton> : null}
        {btnLabel2 ? <Button onClick={alertOnClose && typeof alertOnClose === 'function' ? alertOnClose : close} color="primary" className={classes.cancelBtn}>
          {btnLabel2}
        </Button> : null}

      </DialogActions>
    </Dialog>
  </Grid>);
}