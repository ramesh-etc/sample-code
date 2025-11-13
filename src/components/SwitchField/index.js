/***
 *
 * Switch Field
 *
 */

import React from 'react';
import { Switch, FormGroup, FormControlLabel, Grid } from '@mui/material';
import useStyles from './styles';

export default function SwitchField({ input, label, style, errorStyle, meta: { touched, error, warning } }) {

  const { value, onChange } = input;
  const { classes } = useStyles();

  return (<div style={style || {}}>
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={value || false}
            onChange={e => onChange(e.target.checked)}
            color="primary"
            className={classes.switch}
          // classes={{
          //   // track: classes.switch_track,
          //   thumb: classes.switch_thumb,
          //   // switchBase: classes.switch_base,
          //   // colorPrimary: classes.switch_primary,
          // }}
          />
        }
        className={classes.formControlLabel}
        label={label}
        labelPlacement="start"
      />
    </FormGroup>
    <Grid className={classes.errorContainer}>
      {touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>))}
    </Grid>
  </div>);
}
