

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
            padding: "0px",

        },

        "&.MuiInputBase-input:": {
            padding: "10px 55px"
        },
        '&.MuiSelect-outlined': {
            padding: theme.spacing(1.5, 3),
        },
        '& :after': {
            border: "1px solid #E7E7E7 !important",
        },
        '& :before': {
            border: "1px solid #E7E7E7 !important",
        },
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
    amountField: {
        boxSizing: 'border-box',
    },

    fieldCotainer: {
        marginRight: '15px'
    },
    lastFieldContainer: {
        marginRight: '0px'
    }
}));


export default useStyles;