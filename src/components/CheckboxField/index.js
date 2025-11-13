
/**
 * 
 * Checkbox Field
 * 
 */

import React from 'react';
import { FormControlLabel, Checkbox, Grid } from '@mui/material';
import useStyles from './styles';
import UnCheckBox from '../../images/icons/unCheckBox.svg';
import CheckedBox from '../../images/icons/checkedBox.svg';

export default function CheckboxField(props) {
    const { input, id, label, required, styles, note, warning, labelStyle, containerClass, meta: { touched, error } } = props;

    const { classes } = useStyles();

    // const checkboxProps = {
    //     ...(props?.checkedIcon && { checkedIcon: props.checkedIcon }),
    //     ...(props?.uncheckedIcon && { icon: props.uncheckedIcon }),
    // };

    const { onChange, name } = input;

    return (<Grid className={containerClass}>
        <FormControlLabel className={classes.formControlLabel}
            control={<Checkbox
                id={props?.id}
                size="small"
                // sx={props.styles ? props.styles : { color: "grey" }}
                checked={input.value || false}
                onChange={(e) => input.onChange(e.target.checked)}
                name={name}
                checkedIcon={<img src={CheckedBox} alt="uncheckbox" style={{ width: '27px' }} />}
                icon={<img src={UnCheckBox} alt="uncheckbox" style={{ width: '27px' }} />}
            // {...checkboxProps}
            />}
            label={<span
                className={classes.textSize}
                dangerouslySetInnerHTML={{ __html: props?.label }} />}
        />
        {<Grid
            className={classes.errorContainer}
        >
            {/* <ErrorMessage component="div" name={field.name} className={classes.error} /> */}
            {touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>))}
        </Grid>}
    </Grid>)
}