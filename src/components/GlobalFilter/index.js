/**
 * 
 * Custom Input Field
 * 
 */

import React, { useState } from 'react';
import {
    // TextField,
    Grid,
    // useMediaQuery,
    // MenuItem
} from '@mui/material';
import useStyles from './styles';
import { spanColor } from '../../utils/tools';
// import { useTheme } from "@mui/system";
// import { getDefaultHeaders } from '../../utils/tools';
import { ImplementationFor } from '../EditRecordForm/utils';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { useAppSelector } from '../../redux/hooks';

export default function GlobalFilter(props) {
    const {
        // preGlobalFilteredRows,
        // globalFilter,
        // setGlobalFilter,
        name,
        headersData,
        onChangeData,
        fields } = props;

    const filter1Data = [
        {
            label: 'Message Status: All',
            value: 'message_status_all',
            default: true
        },
        {
            label: 'Sent',
            value: 'sent'
        },
        {
            label: 'Not Sent',
            value: 'not_sent'
        }
    ];
    const filter1Name = 'message_status';

    const filter2Data = [
        {
            label: 'Payment Status: All',
            value: 'collection_status_all',
            default: true
        },
        {
            label: 'Paid',
            value: 'paid_in_full'
        },
        {
            label: 'Pending',
            value: 'pending'
        }
    ];
    const filter2Name = 'collection_status';

    const [filter1Value, setFilter1Value] = useState(filter1Data.find(e => e?.default)?.value || '');
    const [filter2Value, setFilter2Value] = useState(filter2Data.find(e => e?.default)?.value || '');

    const { classes } = useStyles();
    // const theme = useTheme();
    // const sm = useMediaQuery(theme.breakpoints.down('sm'));


    // function removeObjectKey(obj, keyToRemove) {
    //     // Check if the object has the specified key
    //     if (keyToRemove in obj) {
    //         // Create a copy of the object to avoid mutating the original object
    //         const updatedObject = { ...obj };

    //         // Remove the specified key from the copy
    //         delete updatedObject[keyToRemove];

    //         // Return the updated object
    //         return updatedObject;
    //     }

    //     // If the key is not present, return the original object
    //     return obj;
    // }

    const getInitialValue = (columns) => {
        const initialFormValues = (columns || []).reduce((acc, column) => {
            acc[column.value] = (column?.default && column?.default) || '';
            return acc;
        }, {});
        return initialFormValues;
    }

    return (
        <FilterForm
            initialValues={getInitialValue(fields)}
            fields={fields}
            form={`global_filter_${name}`}
            onChangeData={onChangeData}
            headersData={headersData}
            name={name}
        />
        // <Grid container sx={{
        //     // flexDirection: 'column',
        //     flexFlow: 'row'
        // }}>

        // {/* <Grid item className={classes.formControl}>
        //     <Grid
        //         sx={{
        //             // padding: '3px',
        //             marginRight: '15px'
        //         }}
        //     >
        //         <TextField
        //             // fullWidth
        //             name={"filter1"}
        //             InputLabelProps={{
        //                 shrink: true,
        //             }}
        //             select
        //             type={props.type}
        //             InputProps={{
        //                 classes: { input: classes.inputs },
        //                 className: classes.amountField,
        //             }}
        //             className={classes.textField}
        //             value={filter1Value}
        //             onChange={e => {

        //                 setFilter1Value(e.target.value);
        //                 if (e.target.value && e.target.value.includes("all")) {
        //                     // const removed = removeObjectKey(headersData, `filter[${filter1Name}]`);
        //                     // onChangeData(Object.assign({}, { [`filter[${filter1Name}]`]: "", search: headersData.search }));
        //                     onChangeData({ offset: 0, limit: 25, orderBy: false, orderType: false, page: 1, [`filter[${filter1Name}]`]: false, search: headersData.search })
        //                 } else {
        //                     // onChangeData(Object.assign({}, { [`filter[${filter1Name}]`]: e.target.value, search: headersData.search }));
        //                     onChangeData({ offset: 0, limit: 25, orderBy: false, orderType: false, page: 1, [`filter[${filter1Name}]`]: e.target.value, search: headersData.search })
        //                 }
        //             }}
        //             sx={{
        //                 '& .MuiOutlinedInput-root': {
        //                     borderRadius: '20px',
        //                     height: 35,
        //                     width: 200,
        //                     color: spanColor,
        //                     border: '1px solid #E7E7E7',
        //                     background: '#F4F4F9',
        //                     fontSize: '14px',
        //                     fontFamily: 'Poppins-Regular',
        //                     // padding: '6px 16px',
        //                     ':focus-within': { border: '1px solid #E7E7E7 !important' }
        //                 },
        //                 '& .MuiOutlinedInput-root.Mui-disabled': {
        //                     ':hover': {
        //                         border: '1px solid #E7E7E7 !important',
        //                         boxShadow: 'none'
        //                     }
        //                 },
        //                 '& .MuiOutlinedInput-notchedOutline': {
        //                     border: 'none'
        //                 },
        //                 '& p': {
        //                     textAlign: 'center'
        //                 },
        //                 '& .MuiInputAdornment-root': {
        //                     // paddingLeft: '8px'
        //                 }
        //             }}
        //             variant="outlined"
        //         >
        //             {filter1Data.map((option) => (
        //                 <MenuItem key={option.value} value={option.value} sx={{
        //                     fontSize: '14px',
        //                     fontFamily: 'Poppins-Regular',
        //                 }}>
        //                     {option.label}
        //                 </MenuItem>
        //             ))}
        //         </TextField>
        //     </Grid>
        // </Grid>

        // <Grid item className={classes.formControl}>
        //     <Grid
        //         sx={{
        //             // padding: '3px'
        //         }}
        //     >
        //         <TextField
        //             // fullWidth
        //             name={"filter2"}
        //             InputLabelProps={{
        //                 shrink: true,
        //             }}
        //             select
        //             type={props.type}
        //             InputProps={{
        //                 classes: { input: classes.inputs },
        //                 className: classes.amountField,
        //             }}
        //             className={classes.textField}
        //             value={filter2Value}
        //             onChange={e => {
        //                 setFilter2Value(e.target.value);
        //                 if (e.target.value && e.target.value.includes("all")) {
        //                     // onChangeData(Object.assign({}, { [`filter[${filter2Name}]`]: "", search: headersData.search }));
        //                     onChangeData({ offset: 0, limit: 25, orderBy: false, orderType: false, page: 1, [`filter[${filter2Name}]`]: false, search: headersData.search })
        //                 } else {
        //                     // onChangeData(Object.assign({}, { [`filter[${filter2Name}]`]: e.target.value, search: headersData.search }));
        //                     onChangeData({ offset: 0, limit: 25, orderBy: false, orderType: false, page: 1, [`filter[${filter2Name}]`]: e.target.value, search: headersData.search })
        //                 }
        //             }}
        //             sx={{
        //                 '& .MuiOutlinedInput-root': {
        //                     borderRadius: '20px',
        //                     height: 35,
        //                     width: 200,
        //                     color: spanColor,
        //                     border: '1px solid #E7E7E7',
        //                     background: '#F4F4F9',
        //                     fontSize: '14px',
        //                     fontFamily: 'Poppins-Regular',
        //                     ':focus-within': { border: '1px solid #E7E7E7 !important' }
        //                 },
        //                 '& .MuiOutlinedInput-root.Mui-disabled': {
        //                     ':hover': {
        //                         border: '1px solid #E7E7E7 !important',
        //                         boxShadow: 'none'
        //                     }
        //                 },
        //                 '& .MuiOutlinedInput-notchedOutline': {
        //                     border: 'none'
        //                 },
        //                 '& p': {
        //                     textAlign: 'center'
        //                 },
        //                 '& .MuiInputAdornment-root': {
        //                     // paddingLeft: '8px'
        //                 }
        //             }}
        //             variant="outlined"
        //         >
        //             {filter2Data.map((option) => (
        //                 <MenuItem key={option.value} value={option.value} sx={{
        //                     fontSize: '14px',
        //                     fontFamily: 'Poppins-Regular',
        //                 }}>
        //                     {option.label}
        //                 </MenuItem>
        //             ))}
        //         </TextField>
        //     </Grid>
        // </Grid> */}
        // {/* </Grid> */}
    )

}

export let FilterForm = React.memo(function FilterForm(props) {
    const { fields, onChangeData, headersData, name } = props;
    const { classes } = useStyles();
    // const formselectors = useAppSelector(state => state["form"]);
    const selector = useAppSelector(state => getFormValues(`global_filter_${name}`)(state));

    return <form><Grid container sx={{
        // flexDirection: 'column',
        flexFlow: 'row'
    }}>

        {(fields || []).map((field, index) => {
            const InputComponent = ImplementationFor[field.type];

            return <Field
                key={index}
                name={field.value}
                // label={field.label}
                type={field.type}
                component={InputComponent}
                disabled={field.disableOptons && field.disableOptons.create}
                {...field}
                customClassContiner={(index == fields.length - 1) ? classes.lastFieldContainer : classes.fieldCotainer}
                noError={true}
                onKeyDown={(event) => {
                    if ((event.keyCode === 13 || event.key === "Enter") && headersData?.[field.value] != selector?.[field.value]) {
                        onChangeData({ offset: 0, limit: 25, orderBy: false, orderType: false, page: 1, [`${field.value}`]: selector?.[field.value], search: headersData.search })
                    }

                }}
                onChange={(val) => {

                    if (field.type == "select") {
                        if (val && val.includes("all")) {
                            // const removed = removeObjectKey(headersData, `filter[${filter1Name}]`);
                            // onChangeData(Object.assign({}, { [`filter[${filter1Name}]`]: "", search: headersData.search }));
                            onChangeData({ offset: 0, limit: 25, orderBy: false, orderType: false, page: 1, [`filter[${field.value}]`]: false, search: headersData.search })
                        } else {
                            // onChangeData(Object.assign({}, { [`filter[${filter1Name}]`]: e.target.value, search: headersData.search }));
                            onChangeData({ offset: 0, limit: 25, orderBy: false, orderType: false, page: 1, [`filter[${field.value}]`]: val, search: headersData.search })
                        }
                    }
                }}
                inputStyle={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        height: 35,
                        width: 200,
                        color: spanColor,
                        border: '1px solid #E7E7E7',
                        background: '#F4F4F9',
                        fontSize: '14px',
                        fontFamily: 'Poppins-Regular',
                        padding: '0px !important',
                        ':focus-within': { border: '1px solid #E7E7E7 !important' }
                    },
                    '& .MuiSelect-select': {
                        textOverflow: 'unset !important',
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled': {
                        ':hover': {
                            border: '1px solid #E7E7E7 !important',
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
            />

        })}

    </Grid>
    </form>
})

FilterForm = reduxForm({
    form: 'global_filter',
    enableReinitialize: true,
    // destroyOnUnmount: false,
    touchOnChange: true,
})(FilterForm);