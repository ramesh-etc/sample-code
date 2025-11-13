/**
 * 
 * Custom Input Field
 * 
 */

import React, { useState } from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import useStyles from './styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchField(props) {
    const { preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
        headersData,
        onChangeData } = props;

    const [value, setValue] = React.useState();
    const { search } = headersData || {};
    const [showClearIcon, setShowClearIcon] = useState(search || value ? "flex" : "none");

    const { classes } = useStyles();

    const handleClick = () => {
        setValue('');
        if (headersData?.search) {
            onChangeData({ offset: 0, limit: 25, search: false, sort: false, page: 1 });
        }
    }

    return (
        <Grid container sx={{
            flexDirection: 'column'
        }}>
            <Grid item xs={12} className={classes.formControl}>
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
                        InputProps={{
                            classes: { input: classes.inputs },
                            className: classes.amountField,
                            placeholder: 'Search here...',
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        disabled={!value}
                                        onClick={() => {
                                            if (value) {
                                                onChangeData({ offset: 0, limit: 25, search: value, sort: false, page: 1 });
                                            }
                                        }} size='small'>
                                        <SearchIcon sx={{
                                            fontSize: '20px'
                                        }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (search || value) && (
                                <InputAdornment
                                    position="end"
                                    style={{ display: showClearIcon }}

                                >
                                    <IconButton onClick={handleClick} size='small'>
                                        <ClearIcon sx={{
                                            fontSize: '20px'
                                        }} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        className={classes.textField}
                        value={value === '' || value ? value : search || ''}
                        onChange={e => {
                            setValue(e.target.value);
                            setShowClearIcon(e.target.value === "" ? "none" : "flex");
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                onChangeData({ offset: 0, limit: 25, search: value, sort: false, page: 1 });
                                setValue(false);

                            }
                        }}
                        // value={fieldValue}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                height: 35,
                                border: '1px solid #E7E7E7',
                                paddingLeft: '7px',
                                paddingRight: '7px',
                                border: 'none !important',
                                // boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
                                background: '#F4F4F9',
                                ':hover': {

                                    // boxShadow: '-1px 1px 4px 4px #E7E7E7'
                                },
                                ':focus-within': { border: 'none !important' }
                            },
                            '& .MuiOutlinedInput-root.Mui-disabled': {
                                ':hover': {
                                    border: 'none !important',
                                    boxShadow: 'none'
                                }
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            },
                            '& p': {
                                textAlign: 'center'
                            },
                            '& .MuiInputAdornment-root': {
                                // paddingLeft: '8px'
                            }
                        }}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </Grid>
    )

}