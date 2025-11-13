/**
 * 
 * Custom Input Field
 * 
 */

import React from 'react';
import { InputLabel, Grid, Typography, useMediaQuery } from '@mui/material';
import useStyles from './styles';
import { useTheme } from "@mui/system";

export default function TextAreaField(props) {
    const { input, label, placeholder, autoFocus, type, disabled, prefix, style, variant, multiline, rows, maxRows, className, errorStyle, defaultBlur, labelStyle, noBorder, inputStyle, dynamicClass, size, customClassContiner, errorContainer, adorments, meta: { touched, error, warning } } = props;

    const { classes } = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const { name, value, onChange } = input;

    const InputChange = defaultBlur ? Object.assign({}, {
        onBlur: (e) => onChange(e.target.value),
        defaultValue: value || ''
    }) : Object.assign({}, {
        onChange: (e) => onChange(e.target.value),
        value: value || ''
    });

    return (
        <Grid container sx={{
            flexDirection: 'column'
        }}>
            <Grid item xs={12} className={classes.formControl}>
                {label ? <InputLabel
                    shrink={false}
                    htmlFor={name}
                >
                    <Typography className={classes.label} sx={labelStyle}>{label}&nbsp;{props?.helperText ? touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>)) : null}</Typography>

                </InputLabel> : null}
                <Grid
                    className={customClassContiner || classes.fieldContainer}
                >
                    {props?.staticText || null}
                    <textarea
                        // fullWidth
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        // autoComplete='off'
                        // size={size}
                        // multiline={multiline}
                        rows={rows}
                        // maxRows={maxRows}
                        // minRows={maxRows}
                        type={props.type}
                        // InputProps={Object.assign({
                        //     classes: { input: classes.inputs },
                        //     className: classes.amountField,
                        //     placeholder: placeholder,

                        // }, { ...adorments })}
                        disabled={noBorder || disabled}
                        // inputProps={{
                        //     autocomplete: 'new-password',
                        // }}
                        name={name}
                        className={dynamicClass || classes.textField}
                        // defaultValue={input?.value || ''}
                        {...InputChange}

                    />
                </Grid>
            </Grid>
            {props?.helperText ? null : <Grid className={errorContainer || classes.errorContainer}>
                {touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>))}
            </Grid>}
        </Grid>
    )

}