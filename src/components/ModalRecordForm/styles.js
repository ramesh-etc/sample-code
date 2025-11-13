

import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor, outlinedBtnShdowColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[5],
        padding: '25px',
        minWidth: '40%',
        outline: 'none',
        maxWidth: '80%',
        maxHeight: 'calc(100% - 15px)',
        borderRadius: '20px',
        margin: "0px"
        // width: '25%'
    },
    body: {
        marginTop: '25px',
        // marginBottom: '25px',
        justifyContent: 'center'
    },
    // body1: {
    //     marginTop: '15px',
    //     // marginBottom: '25px'
    // },
    footer: {
        // borderTop: '1px solid lightgray',
        paddingTop: '25px',
        justifyContent: 'center'
    },
    // button: {
    //     fontWeight: 'bold',
    //     borderRadius: '28px',
    //     textTransform: 'none',
    //     fontFamily: 'Poppins-SemiBold',
    //     marginTop: '25px',
    //     outline: 'none',
    //     textTransform: 'capitalize',
    //     marginRight: '25px'
    // },
    submitBtn: {
        height: '35px',
        borderRadius: "45px",
        background: appColor,
        boxShadow: btnShadowColor,
        textTransform: 'capitalize',
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
        padding: '6px 16px',
        fontSize: '16px',
        // marginRight: '15px',
        '&:hover': {
            background: appColor,
        }
    },
    cancelBtn: {
        height: '35px',
        borderRadius: "45px",
        border: `1px solid ${appColor}`,
        background: "#FFF",
        boxShadow: outlinedBtnShdowColor,
        textTransform: 'capitalize',
        fontFamily: 'Poppins-SemiBold',
        color: appColor,
        padding: '6px 16px',
        fontSize: '16px',
        marginLeft: '25px !important',
        '&:hover': {
            background: "#FFF",
        }
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: '22px',
    },
    message: {
        fontFamily: 'Poppins-Regular',
        fontSize: '16px',
        paddingTop: '18px',
    },
    messageRegular: {
        fontSize: '16px',
        paddingTop: '18px',
    },
    closeIcon: {
        cursor: 'pointer'
    },
    messageGrid: {
        paddingTop: '10px'
    },
    error: {
        marginTop: '10px'
    },
    note: {
        fontSize: '16px',
    },
    details: {
        padding: '10px',
        whiteSpace: 'pre-wrap'
    }
}));


export default useStyles;