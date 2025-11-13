
/**
 * 
 * Checkbox Field
 * 
 */

import React from 'react';
import { FormControlLabel, FormControl, Grid, Typography, InputLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import useStyles from './styles';
//  import { useTheme } from "@mui/system";
// import useMediaQuery from '@mui/material/useMediaQuery';
import UnCheckBox from '../../images/icons/unCheckBox.svg';
import CheckedBox from '../../images/icons/checkedBox.svg';

export default function MultiCheckboxField(props) {
    const { input, options, label, labelStyle, fieldSetStyle, containerClass, removeproperty, meta: { touched, error, warning }, disabled } = props;
    const { classes } = useStyles();
    const isPreDefinedSet = Array.isArray(options);
    let inputValue = (input && input.value != "" && Object.keys(JSON.parse(input.value)).length > 0 && input.value) || "";
    // const theme = useTheme();
    //    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    const { name, value, onChange } = input;
    const handleChange = (val, checked) => {
        const changeValue = inputValue != "" && JSON.parse(inputValue) || {}
        if (checked) {
            changeValue[val] = true
        } else if (removeproperty) {
            delete changeValue[val];
        } else {
            changeValue[val] = false
        }
        if (Object.keys(changeValue).length == 0) {
            input.onChange("")
        } else {
            input.onChange(JSON.stringify(changeValue))
        }
        //  }
    }

    return (<Grid className={containerClass || classes.dummy}>
        {label ? <InputLabel
            shrink={false}
            htmlFor={name}
        >
            <Typography className={classes.label} sx={labelStyle}>{label}&nbsp;{props?.helperText ? touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>)) : null}</Typography>

        </InputLabel> : null}
        <FormControl component="fieldset" sx={fieldSetStyle || {}} className={classes.fieldSet} error={touched && !!error}>

            {isPreDefinedSet ? (options || []).map((opt, index) =>// eslint-disable-line
                <>
                    {/* //  <Grid container key={index} className={classes.checkContainer}> */}
                    <Grid item style={{ marginRight: '10px' }}>
                        <FormControlLabel
                            className={classes.formControlLabel}
                            control={
                                <Checkbox
                                    name={input.name}
                                    checkedIcon={<img src={CheckedBox} alt="uncheckbox" style={{ width: '27px' }} />}
                                    icon={<img src={UnCheckBox} alt="uncheckbox" style={{ width: '27px' }} />}
                                    checked={input.value && JSON.parse(input.value)[opt.value] || false}
                                    //    defaultChecked={input.value && JSON.parse(input.value)[opt.value] || ''}
                                    //    className={classes.checkBox}
                                    disabled={disabled}
                                    onChange={(e) => handleChange(opt.value, e.target.checked)} />
                            }
                            labelPlacement="right"
                            label={<span
                                className={classes.textSize}
                                dangerouslySetInnerHTML={{ __html: opt?.label }} />}
                        //    label={<span className={classes.textSize} dangerouslySetInnerHTML={{ __html: '' }} />}
                        //    className={classes.checkboxLabel}
                        />
                    </Grid>
                    {/* <Grid item style={{ maxWidth: xs ? '85%' : '92%' }}>
             <div style={{ display: 'inline-block' }}><span className={classes.checkLabel}>{opt.label}</span></div>
           </Grid> */}
                    {/* </Grid> */}
                </>
            )
                : null}
            {<Grid
                className={classes.errorContainer}
            >
                {/* <ErrorMessage component="div" name={field.name} className={classes.error} /> */}
                {touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>))}
            </Grid>}
        </FormControl>
    </Grid>)
}