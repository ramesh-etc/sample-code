/**
 * 
 * Password Field
 * 
 */

import React, { useState } from 'react';
import { InputLabel, InputAdornment, IconButton, TextField, Grid, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useStyles from './styles';

export default function PasswordField(props) {
    const { input, label, required, autoCompleteOff, defaultBlur, labelStyle, noBorder, meta: { touched, error, warning } } = props;
    const { classes } = useStyles();
    const [showPassword, setshowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    }

    // const handleMouseDownPassword = (event) => {
    //     // event.preventDefault();
    // };

    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text || "";
        return textArea.value;
    }

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
                        type={showPassword ? "text" : "password"}
                        disabled={noBorder}
                        inputProps={{
                            autocomplete: 'new-password',
                            // form: {
                            //     autocomplete: 'off',
                            // },
                        }}
                        InputProps={{
                            classes: { input: classes.inputs },
                            placeholder: decodeHTMLEntities(props.placeholder) || "",
                            className: classes.amountField,
                            endAdornment:
                                (<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>)
                        }}
                        name={name}
                        className={classes.textField}
                        value={input?.value || ''}
                        {...InputChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '7px',
                                height: 50,
                                border: noBorder ? 'none' : '1px solid #E7E7E7',
                                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
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