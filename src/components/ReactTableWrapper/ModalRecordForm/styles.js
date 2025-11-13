

import { makeStyles } from 'tss-react/mui';
import { appColor, outlinedBtnShdowColor } from '../../../utils/tools';

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
        // padding: '25px',
        minWidth: '40%',
        outline: 'none',
        maxWidth: '80%',
        margin: '0px',
        // maxHeight: '550px',
        maxHeight: 'calc(100% - 15px)',
        overflow: 'hidden',
        borderRadius: '20px'
        // width: '25%'
    },
    // topScrollPaper: {
    //     alignItems: 'flex-start',
    // },
    // topPaperScrollBody: {
    //     verticalAlign: 'middle',
    // },
    body: {
        // marginTop: '25px',
        // marginBottom: '25px',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
        // backgroundColor: '#fff',
        // borderRadius: "20px",
        // border: "1px solid rgb(248, 249, 250)",
        // background: "rgb(255, 255, 255)",
        // boxShadow: "rgba(238, 238, 238, 0.5) ",
        // padding: '16px'
    },
    body1: {
        marginTop: '15px',
        marginBottom: '25px'
    },
    header: {
        alignItems: 'center'
    },
    footer: {
        // borderTop: '1px solid lightgray',
        padding: '10px 0px'
    },
    button: {
        fontWeight: 'bold',
        borderRadius: '28px',
        textTransform: 'none',
        fontFamily: 'Poppins-SemiBold',
        // marginTop: '10px',
        outline: 'none',
        textTransform: 'capitalize',
        // marginRight: '12px'
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: '20px',
    },
    message: {
        fontFamily: 'Poppins-Bold',
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
        // marginTop: '10px'
    },
    note: {
        fontSize: '16px',
    },
    details: {
        padding: '10px',
        whiteSpace: 'pre-wrap'
    },
    alertClassName: {
        backgroundColor: "#fff !important",
        color: "rgba(0, 0, 0, 0.87)",
        "-webkit-transition": "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "35px",
        boxShadow: "none",
        border: "1px solid #adadad",
        fontSize: "0.875rem",
        lineHeight: 1.43,
        alignItems: 'center',
        "&.MuiAlert-icon": {
            marginRight: "12px",
            // padding: "7px 0px",
            color: "#adadad",
            padding: 0
        },
        "&.MuiAlert-message": {
            color: "#adadad"
        },
        "&.MuiAlert-action": {
            margin: 0,
            padding: 0,
            alignItems: 'center',
        },
        // "&.MuiButtonBase-root-MuiButton-root": {
        //     color: "#adadad"
        // },
    },
    customAlertRoot: {
        backgroundColor: "#fff !important",
        color: "rgba(0, 0, 0, 0.87)",
        "-webkit-transition": "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "35px",
        boxShadow: "none",
        border: "1px solid #adadad",
        fontSize: "0.875rem",
        lineHeight: 1.43,
        alignItems: 'center',
    },
    customMessageStyle: {
        margin: 0,
        padding: 0,
        // color: '#adadad'
        // color: spanColor
        color: '#918b8b'
    },
    customActionStyle: {
        margin: 0,
        padding: 0,
        alignItems: 'center',
        paddingLeft: '14px',
    },
    customIconStyle: {
        padding: 0,
        // color: '#adadad'
        // color: spanColor
        color: '#918b8b'
    },
    notes: {
        // padding: '0 15%',
        textAlign: 'center'
    },
    dialogActions: {
        padding: '0px'
    },
    cancelBtn: {
        minWidth: '100px',
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
        marginLeft: '20px !important',
        '&:hover': {
            background: "#FFF",
        }
    },
}));


export default useStyles;