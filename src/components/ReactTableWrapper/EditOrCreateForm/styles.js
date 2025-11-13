

import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor, outlinedBtnShdowColor } from '../../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperScrollBody: {
        minWidth: '25%',
        outline: 'none',
        // maxWidth: '60% !important',
        maxWidth: '60%',
        [`${theme.breakpoints.up('xl')}`]: {
            maxWidth: '60% !important',
        },
        [`${theme.breakpoints.down('lg')}`]: {
            maxWidth: '60% !important',
        },
        [`${theme.breakpoints.down('sm')}`]: {
            maxWidth: '90% !important',
        },
        maxHeight: 'calc(100% - 10px)',
        borderRadius: "20px",
        // border: "1px solid #F8F9FA",
        // background: "#FFF",
        // boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
        margin: '0px',
    },
    // paper: {
    //     backgroundColor: theme.palette.background.paper,
    //     border: 'none',
    //     boxShadow: theme.shadows[5],
    //     // padding: '25px',
    //     minWidth: '40%',
    //     outline: 'none',
    //     maxWidth: '80%',
    //     margin: '0px',
    //     // maxHeight: '550px',
    //     // maxHeight: 'calc(100% - 15px)',
    //     // overflow: 'unset'
    //     // width: '25%'
    // },
    topScrollPaper: {
        alignItems: 'flex-start',
    },
    topPaperScrollBody: {
        verticalAlign: 'middle',
    },
    body: {
        // marginTop: '25px',
        // marginBottom: '25px',
        justifyContent: 'center',
        backgroundColor: '#fff',
        // borderRadius: "20px",
        // border: "1px solid rgb(248, 249, 250)",
        // background: "rgb(255, 255, 255)",
        // boxShadow: "rgba(238, 238, 238, 0.5) ",
        borderRadius: "20px",
        border: "1px solid #F8F9FA",
        background: "#FFF",
        boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
        padding: '16px',
        [`${theme.breakpoints.down('sm')}`]: {
            padding: '12px',
        },
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    closeIconContainer: {
        position: 'absolute',
        right: 0,
        display: 'flex'
    },
    footer: {
        // borderTop: '1px solid lightgray',
        // padding: '10px 0px'
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: '20px',
    },
    closeIcon: {
        cursor: 'pointer'
    },
    error: {
        marginTop: '10px'
    },
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
        marginRight: '15px',
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
        marginRight: '15px',
        '&:hover': {
            background: "#FFF",
        }
    },
    checkBoxContainer: {
        display: 'flex'
    },
    dialogActions: {
        padding: '15px 8px'
    }
}));


export default useStyles;