

import { makeStyles } from 'tss-react/mui';
import { spanColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({

    // label: {
    //     fontSize: '15px',
    //     color: spanColor,
    //     marginLeft: '18px',
    //     fontWeight: 'normal',
    // },
    // textField: {
    //     '& .MuiOutlinedInput-root': {
    //         borderRadius: "50px",
    //         border: "1px solid #E7E7E7 !important",
    //         background: "#FFF",
    //         boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
    //     },
    //     '& :after': {
    //         // border: "1px solid #E7E7E7 !important",
    //     },
    //     '& :before': {
    //         // border: "1px solid #E7E7E7 !important",
    //     },
    //     input: {
    //         padding: theme.spacing(1.5, 3),
    //         color: spanColor,
    //         fontSize: '14px'
    //     }
    // },
    inputs: {
        // fontWeight: 600,
        padding: theme.spacing(0),
        color: spanColor,
        fontSize: '14px',
        "&::placeholder": {
            // fontWeight: 400,
            color: '#737791',
            opacity: "1 !important",
            // color: "red"
        },
    },
    // error: {
    //     fontSize: '12px',
    //     color: 'red',
    //     marginLeft: '18px',
    //     lineHeight: '15px'
    // },
    // amountField: {
    //     boxSizing: 'border-box',
    // },
    // errorContainer: {
    //     height: '1em',
    // }
}));


export default useStyles;