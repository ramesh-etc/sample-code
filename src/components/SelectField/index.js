/**
 * 
 * Select Field
 * 
 */

import React from 'react';
import useStyles from './styles';
import { InputLabel, MenuItem, TextField, Grid, Typography, Tooltip } from '@mui/material';
import { spanColor } from '../../utils/tools';
import Info from '../../images/icons/info.svg';

export default function SelectField(props) {
    const { input, label, required, metaData, options, variant, disabled, children, style, labelStyle, noBorder, info, inputStyle, customClassContiner, noError, meta: { touched, error, warning } } = props;

    const { classes } = useStyles();
    const { name, value } = input;
    const isPreDefinedSet = Array.isArray(options);

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
                    <Typography
                        className={classes.label}
                        sx={labelStyle}
                        component="span"
                    >
                        {label}
                    </Typography>
                    {info && <Tooltip
                        title={info}
                        placement="top"
                        followCursor
                    >
                        <img src={Info} alt="infopng" className={classes.imginfo} />
                    </Tooltip>}
                </InputLabel> : null}
                <Grid
                    className={customClassContiner || classes.fieldContainer}
                >
                    <TextField
                        id="standard-select-currency"
                        select
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type={props.type}
                        InputProps={{
                            classes: { input: classes.inputs },
                            placeholder: props.placeholder
                        }}
                        SelectProps={{
                            style: {
                                padding: 10
                            }
                        }}
                        name={name}
                        disabled={disabled || noBorder}
                        required={required}
                        labelId={`${name}-id`}
                        value={value}
                        // MenuProps={MenuProps}
                        onChange={(e) => input.onChange(e.target.value)}
                        className={classes.textField}
                        sx={inputStyle || {
                            '& .MuiOutlinedInput-root': {

                                borderRadius: '50px',
                                height: 50,
                                color: spanColor,
                                border: noBorder ? 'none' : '1px solid #E7E7E7',
                                boxShadow: noBorder ? 'none' : "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
                                '&.MuiSelect-select': {
                                    padding: '12px 24px',
                                },
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
                            }
                        }}
                        variant="outlined"
                    >
                        {(typeof options === 'string' && metaData[options] === undefined) ? <MenuItem value="">No options</MenuItem> : isPreDefinedSet ? (options || []).map((opt, index) => <MenuItem
                            key={index} disabled={opt.disabled || false} value={opt && opt.value || opt}>{opt && opt.label || opt}</MenuItem>) : (typeof options === 'string' && Object.keys(metaData[options]).length === 0) ? <MenuItem value="">No options</MenuItem> : (metaData[options] || []).map((opt, index) => <MenuItem key={index} disabled={opt.disabled || false} value={opt && opt.value != null
                                && opt.value || opt}>{opt && opt.label != null && opt.label || opt}</MenuItem>)
                        }

                    </TextField>
                </Grid>
            </Grid>
            {(props?.helperText || noError) ? null : <Grid className={classes.errorContainer}>
                {touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>))}
            </Grid>}
        </Grid>
    )
}

