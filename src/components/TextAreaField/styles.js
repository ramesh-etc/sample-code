

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
        },
        '& :after': {
            border: "1px solid #E7E7E7 !important",
        },
        '& :before': {
            border: "1px solid #E7E7E7 !important",
        },
        input: {
            padding: theme.spacing(1.5, 3),
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
    fieldContainer: {
        // padding: '3px'
    }
}));


export default useStyles;