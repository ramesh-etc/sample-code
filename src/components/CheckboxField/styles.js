

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
    formControlLabel: {
        margin: 0,
        //--------for home page sign up checkbox changes------//
        "& > span": {
            padding: '0px',
            paddingRight: '5px!important'
        },
        "& > svg": {
            color: '#E7E7E7',
            width: '2em',
            height: '2em',
            border: '1px solid #E7E7E7',
        },
        "& .MuiSvgIcon-root": {
            fontSize: '1.7em'
        }
        //-----------------
    },
    textSize: {
        fontSize: '14px',
    },
    error: {
        fontSize: '12px',
        color: 'red',
        marginLeft: '2px',
        lineHeight: '15px',
        display: 'block'
    },
    errorContainer: {
        height: '1em',
    }
}));


export default useStyles;