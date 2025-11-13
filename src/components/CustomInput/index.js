/**
 * 
 * Custom Input Field
 * 
 */

import React from 'react';
import { InputLabel, TextField, Grid, Typography, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
import useStyles from './styles';
// import { useTheme } from "@mui/system";

export default function CustomInput(props) {
    const { input, label, placeholder, autoFocus, type, disabled, prefix, style, variant, multiline, rows, maxRows, className, errorStyle, defaultBlur, labelStyle, noBorder, inputStyle, dynamicClass, size, customClassContiner, errorContainer, adorments, onKeyDown, noError, meta: { touched, error, warning } } = props;

    const { classes } = useStyles();
    // const theme = useTheme();
    // const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const { name, value, onChange } = input;

    const InputChange = defaultBlur ? Object.assign({}, {
        onBlur: (e) => onChange(e.target.value),
        defaultValue: value || ''
    }) : Object.assign({}, {
        onChange: (e) => onChange(e.target.value),
        value: value || ''
    });

    const keysPress = { ...(onKeyDown && { onKeyDown: onKeyDown }) }

    return (
        <Grid container sx={{
            flexDirection: 'column'
        }}>
            <Grid item xs={12} className={classes.formControl}>
                {label ? <InputLabel
                    shrink={false}
                    htmlFor={name}
                    className={classes.inputLabel}
                >
                    <Typography className={classes.label} sx={labelStyle}>{label}
                        {/* &nbsp;{props?.helperText ? touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>)) : null} */}
                    </Typography>
                    {props?.helperText ? touched && ((error && <span className={classes.helperText}>{error}</span>) || (warning && <span>{warning}</span>)) : null}
                </InputLabel> : null}
                <Grid
                    className={customClassContiner || classes.fieldContainer}
                >
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete='off'
                        // size={size}
                        multiline={multiline}
                        rows={rows}
                        maxRows={maxRows}
                        minRows={1}
                        type={props.type}
                        InputProps={Object.assign({
                            classes: { input: classes.inputs },
                            className: classes.amountField,
                            placeholder: placeholder,

                        }, { ...adorments })}
                        disabled={noBorder || disabled}
                        inputProps={{
                            autocomplete: 'new-password',
                            ...(onKeyDown && {
                                form: {
                                    autocomplete: 'off',
                                }
                            }),
                        }}
                        name={name}
                        className={dynamicClass || classes.textField}
                        // defaultValue={input?.value || ''}
                        {...InputChange}
                        sx={inputStyle || {
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '7px',
                                height: 50,
                                border: noBorder ? 'none' : '1px solid #E7E7E7',
                                boxShadow: noBorder ? 'none' : "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
                                ':hover': {
                                    border: noBorder ? 'none' : '0.5px solid #E7E7E7 !important',
                                    // boxShadow: '-1px 1px 4px 4px #E7E7E7'
                                },
                                ':focus-within': { border: noBorder ? 'none' : '0.5px solid #E7E7E7 !important' }
                            },
                            '& .MuiOutlinedInput-root.Mui-disabled': {
                                ':hover': {
                                    border: noBorder ? 'none' : '1px solid #E7E7E7 !important',
                                    boxShadow: 'none'
                                }
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            },
                            '& p': {
                                textAlign: 'center'
                            }
                        }}
                        variant={variant || "outlined"}
                        helperText={props?.helperText}
                        {...keysPress}
                    />
                </Grid>
            </Grid>
            {(props?.helperText || noError) ? null : <Grid className={errorContainer || classes.errorContainer}>
                {touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>))}
            </Grid>}
        </Grid>
    )

}