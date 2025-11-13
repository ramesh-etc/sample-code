
import React from 'react';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useStyles from './styles';
import { InputLabel, TextField, Grid, Typography, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
import moment from 'moment';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import de from 'date-fns/locale/de';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/en-gb';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { spanColor } from '../../utils/tools';


const DateField = (props) => {
    const { input, label, autoFocus, disabled, required, labelStyle, placeholder, disableFuture, meta: { touched, error, warning } } = props;
    const { id, name, value, onChange } = input;
    const { classes } = useStyles();

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
                    sx={{
                        // padding: '3px'
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='en-gb'>
                        <DesktopDatePicker
                            //   label="Filled picker"
                            className={classes.datePicker}
                            disableFuture={disableFuture}
                            // components={{ SwitchViewButton: null }}
                            // componentProps={{
                            //     switchViewButton: { sx: { display: 'none' } }
                            // }}
                            // showToolbar={true}
                            // PopperProps={{
                            //     sx: { '&.MuiPickersPopper-root': { border: '4px solid red' }, },
                            // }}
                            // slots={{
                            //     // Override default <ActionBar /> with a custom one
                            //     actionBar: null,
                            // }}
                            // popperProps={{
                            //     sx: {
                            //         '& .MuiPickersPopper-paper': {
                            //             color: 'red',
                            //             '& .MuiDayCalendar-slideTransition': {
                            //                 color: 'red'
                            //             }
                            //         }
                            //     }
                            // }}
                            slotProps={{
                                popper: { className: classes.popper },
                                textField: {
                                    size: 'outlined', // don't need this anymore so feel free to remove
                                    sx: {
                                        '> .MuiOutlinedInput-root': {
                                            borderRadius: '25px',
                                            height: 50,
                                            border: '1px solid #E7E7E7',
                                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
                                            ':hover': {
                                                // border: '0.5px solid #E7E7E7 !important',
                                                // boxShadow: '-1px 1px 4px 4px #E7E7E7'
                                            },
                                            ':focus-within': { border: '0.5px solid #E7E7E7 !important' },
                                            // '& :after': {
                                            //     border: "1px solid #E7E7E7 !important",
                                            // },
                                            // '& :before': {
                                            //     border: "1px solid #E7E7E7 !important",
                                            // },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '& .MuiInputAdornment-root': {
                                                margin: 0
                                            },
                                            input: {
                                                // padding: theme.spacing(1.5, 3),
                                                color: spanColor,
                                                fontSize: '14px'
                                            }
                                        },
                                        '& .MuiOutlinedInput-root.Mui-disabled': {
                                            ':hover': {
                                                // border: '1px solid #E7E7E7 !important',
                                                // boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
                                            }
                                        },
                                    }
                                },

                            }}
                            onChange={(val) => onChange(val)}
                            value={value && moment(value) || moment()}
                            format="MM/DD/YYYY"
                        // disabled={disabled}
                        // slotProps={{ textField: { variant: 'outlined' } }}
                        // slotProps={{
                        //     field: (params) => (<TextField
                        //         {...params}
                        //         fullWidth
                        //         InputLabelProps={{
                        //             shrink: true,
                        //         }}
                        //         type={props.type}
                        //         InputProps={{
                        //             classes: { input: classes.inputs },
                        //             className: classes.amountField,
                        //             placeholder: placeholder,
                        //         }}
                        //         name={name}
                        //         className={classes.textField}
                        //         // defaultValue={input?.value || ''}
                        //         // {...InputChange}
                        //         sx={{
                        //             '& .MuiOutlinedInput-root': {
                        //                 borderRadius: '7px',
                        //                 height: 50,
                        //                 border: '1px solid #E7E7E7',
                        //                 boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
                        //                 ':hover': {
                        //                     border: '0.5px solid #E7E7E7 !important',
                        //                     // boxShadow: '-1px 1px 4px 4px #E7E7E7'
                        //                 },
                        //                 ':focus-within': { border: '0.5px solid #E7E7E7 !important' }
                        //             },
                        //             '& .MuiOutlinedInput-root.Mui-disabled': {
                        //                 ':hover': {
                        //                     border: '1px solid #E7E7E7 !important',
                        //                     boxShadow: 'none'
                        //                 }
                        //             },
                        //             '& .MuiOutlinedInput-notchedOutline': {
                        //                 border: 'none'
                        //             },
                        //             '& p': {
                        //                 textAlign: 'center'
                        //             }
                        //         }}
                        //         variant="outlined"
                        //         helperText={props?.helperText}
                        //     />)
                        // }}
                        // renderInput={(params) => <TextField className={classes.textField} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            {props?.helperText ? null : <Grid className={classes.errorContainer}>
                {touched && ((error && <span className={classes.error}>{error}</span>) || (warning && <span>{warning}</span>))}
            </Grid>}
        </Grid>
    )
}

export default DateField;