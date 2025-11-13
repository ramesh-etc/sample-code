
/**
 * 
 * Spinner 
 * 
 */

import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import { Grid } from '@mui/material';
import { appColor } from '../../utils/tools';

/**
 * 
 * @param {object} props 
 * @returns 
 */
export default function Spinner(props) {

    return (<Grid container style={props.style} className={props.className}>
        {props && props.showHeight && <Grid item xs={12} style={{ height: '280px' }} /> || ''}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
            <ScaleLoader
                size={100}
                height={25}
                color={appColor}
                loading={true}
            />
        </Grid>
    </Grid>)
}