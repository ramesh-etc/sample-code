

import { makeStyles } from 'tss-react/mui';
import { spanColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({

    label: {
        fontSize: '15px',
        color: spanColor,
        marginLeft: '18px',
        fontWeight: 'normal',
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: "50px",
            border: "1px solid #E7E7E7 !important",
            background: "#FFF",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
            padding: "12px 24px",

        },

        // "&.MuiInputBase-input:": {
        //     padding: "10px 55px"
        // },
        '& .MuiAutocomplete-input': {
            color: spanColor,
            fontSize: '14px',
            padding: '0px !important',
            "&::placeholder": {
                fontWeight: 400,
                color: '#CBDAD7',
                opacity: "1 !important",
                // color: "red"
            },
        },
        // '& :after': {
        //     border: "1px solid #E7E7E7 !important",
        // },
        // '& :before': {
        //     border: "1px solid #E7E7E7 !important",
        // },
        input: {
            // padding: "12px 24px",
            color: spanColor,
            fontSize: '14px'
        }
    },
    inputs: {
        // fontWeight: 600,
        "&::placeholder": {
            fontWeight: 400,
            color: '#CBDAD7',
            opacity: "1 !important",
            // color: "red"
        },
    },
    inputRoot: {
        color: 'red', // Customize the color here
    },
    error: {
        fontSize: '12px',
        color: 'red',
        marginLeft: '18px',
        lineHeight: '15px',
        display: 'block'
    },
    amountField: {
        boxSizing: 'border-box',
    },
    errorContainer: {
        height: '1em',
        // marginBottom: '0.5em',
    },
    customisedAutoComplete: {
        color: 'red'
    },
    customTextField: {
        "& input::placeholder": {
            fontSize: "20px",
            color: 'red'
        }
    }
}));


export default useStyles;