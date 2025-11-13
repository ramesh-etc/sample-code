
/***
 *
 * Phone Number Field
 *
 */


import React, { forwardRef } from 'react';
import { TextField, Grid, Typography, InputLabel } from '@mui/material';
import useStyles from './styles';
// import { AsYouType } from 'libphonenumber-js';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input/input';

export const PhoneField = forwardRef((props, ref) => {
    const { onChange, name, placeholder, value, max, ...other } = props;
    const handleKeyDown = (e) => {
        if (value && !isPossiblePhoneNumber(value)) {
            // Prevent further input by stopping the propagation of the key event
            e.preventDefault();
        }
    };

    return <PhoneInput
        name={name}
        ref={ref}
        placeholder={placeholder}
        country="US"
        onChange={(value) => onChange({ target: { value } })}
        value={value}
        onKeyDown={handleKeyDown}
        maxLength={value.replace("+1", "").charAt(0) == "0" ? 10 : !isPossiblePhoneNumber(value) ? 16 : value.length}
        autocomplete='off'
        {...other} />
})
PhoneField.displayName = 'PhoneField';

export default function PhoneNumberField(props) {
    const { input, label, autoFocus, type, disabled, prefix, variant, className, errorStyle, labelStyle, noBorder, meta: { touched, error, warning }, max } = props;
    const { classes } = useStyles();
    // const phoneType = new AsYouType('US');
    const { name, value, onChange } = input;
    return (
        <Grid container sx={{
            flexDirection: 'column'
        }}>
            <Grid item xs={12} className={classes.formControl}>
                {label ? <InputLabel
                    shrink={false}
                    htmlFor={name}
                >
                    <Typography className={classes.label} sx={labelStyle}>{props?.label}</Typography>
                </InputLabel> : null}
                <Grid
                    sx={{
                        // padding: '3px'
                    }}
                >
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type={props.type}
                        name={name}
                        onChange={(e) => {
                            onChange(e.target?.value || "")
                        }}
                        disabled={noBorder}
                        value={value && value || ''}
                        // value={value && phoneType.input(value) || ''}
                        // defaultValue={field?.value || ''}
                        InputProps={{
                            classes: { input: classes.inputs },
                            placeholder: props.placeholder,
                            inputComponent: PhoneField,
                            name: name,
                            international: true,
                            defaultCountry: "US",

                        }}
                        autocomplete='off'
                        inputProps={{
                            autocomplete: 'new-password',
                            // form: {
                            //     autocomplete: 'off',
                            // },
                        }}
                        className={classes.textField}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '7px',
                                height: 50,
                                border: noBorder ? 'none' : '1px solid #E7E7E7',
                                boxShadow: noBorder ? 'none' : "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
                                ':hover': {
                                    border: noBorder ? 'none' : '0.5px solid #E7E7E7 !important',
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
                            }
                        }}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Grid className={classes.errorContainer}>
                {touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>))}
            </Grid>
        </Grid>
    )
}
