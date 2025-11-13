/**
 * 
 * Auto Complete Field
 * 
 */


import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import useStyles from './styles';
import { TextField, Grid, InputLabel, Typography } from '@mui/material';

export default function AutoCompleteField(props) {// eslint-disable-line
    const { input, label, placeholder, metaData, options, disabled, style, labelStyle, meta: { touched, error, warning } } = props;
    const { classes } = useStyles();

    const { id, name, value, onChange } = input;// eslint-disable-line
    const isPreDefinedSet = Array.isArray(options);
    const Options = isPreDefinedSet ? options : metaData[options] || [];

    return (
        <Grid container sx={{
            flexDirection: 'column'
        }}>
            <Grid item xs={12} className={classes.formControl}>
                {label ? <InputLabel
                    shrink={false}
                    htmlFor={name}
                >
                    <Typography className={classes.label} sx={labelStyle}>{label}</Typography>
                </InputLabel> : null}
                <Grid
                    sx={{
                        // padding: '3px'
                    }}
                >
                    {/* <FormControl className={classes.formControl}> */}
                    <Autocomplete
                        id={id}
                        name={name}
                        options={Options}
                        getOptionLabel={(option) => option.label || ''}
                        value={value && Options.find(_ => _.value.toString() === value.toString()) || null}
                        autoComplete
                        // includeInputInList
                        disabled={disabled}
                        // className={classes.fieldColor}
                        classes={{
                            input: classes.inputs,
                        }}
                        onChange={(e, target) => target && target.value && onChange(target.value) || value}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                className={classes.textField}
                                // classes={{ root: classes.customTextField }}
                                // label={label}
                                placeholder={placeholder}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type={props.type}
                                // InputProps={{
                                //     ...params.InputProps,
                                //     classes: {
                                //         root: classes.inputRoot,
                                //     },
                                // }}

                                // InputProps={{
                                //     classes: { input: classes.inputs },
                                //     // placeholder: props.placeholder
                                // }}
                                // SelectProps={{
                                //     style: {
                                //         padding: 10
                                //     }
                                // }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {

                                        borderRadius: '50px',
                                        height: 50,
                                        border: '1px solid #E7E7E7',
                                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",

                                        ':hover': {
                                            border: '0.5px solid #E7E7E7 !important',
                                            // boxShadow: '-1px 1px 4px 4px #E7E7E7'
                                        },
                                        ':focus-within': { border: '0.5px solid #E7E7E7 !important' }
                                    },
                                    '& .MuiOutlinedInput-root.Mui-disabled': {
                                        ':hover': {
                                            border: '1px solid #E7E7E7 !important',
                                            boxShadow: 'none'
                                        }
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    }
                                }}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            {props?.helperText ? null : <Grid className={classes.errorContainer}>
                {touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>))}
            </Grid>}
        </Grid>
    )
}

