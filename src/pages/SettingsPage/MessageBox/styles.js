import { makeStyles } from "tss-react/mui";
import { appColor, btnShadowColor, outlinedBtnShdowColor, spanColor } from "../../../utils/tools";

const useStyles = makeStyles()((theme) => ({
    messageBoxContainer: {
        marginTop: '26px',
        padding: '10px',
        gap: '20px'
    },
    formContainer: {
        marginTop: '20px',
    },
    messageBoxItem: {
        boxShadow: "0px 0px 3px 0px #00000040",
        borderRadius: '10px',
        padding: '20px',
        // flexGrow: 1,
        // flexBasis: '47%',
        // [`${theme.breakpoints.down('sm')}`]: {
        //     flexBasis: '100%', // Allow full width for smaller screens
        // },
        flex: '1 1 47%',
        [`${theme.breakpoints.down('md')}`]: {
            flex: '1 1 auto'
        }
    },
    boxLabel: {
        color: appColor,
        fontFamily: 'Poppins-SemiBold'
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subjectField: {

        '& .MuiOutlinedInput-root': {
            padding: '10px',
            borderRadius: "5px",
            border: "none",
            background: "#F1F3F8",
            boxShadow: "none",
        },
        input: {
            // padding: theme.spacing(1.5, 3),
            padding: '0px',

            background: "#F1F3F8",
            color: spanColor,
            fontSize: '14px'
        }
    },
    messageContentField: {
        width: '100%',
        background: "#F1F3F8",
        border: 'none',
        borderRadius: "5px",
        color: spanColor,
        fontSize: '14px',
        padding: '10px 10px 10px 85px',
        marginBottom: '10px',
        resize: "none",
        fontFamily: 'Poppins-Regular',
        '&:disabled': {
            opacity: "1",
            "-webkit-text-fill-color": "rgba(0, 0, 0, 0.38)"
        },
        '&:focus-visible': {
            outline: '0px'
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "5px",
            border: "none",
            background: "#F1F3F8",
            boxShadow: "none",
            color: spanColor,
            fontSize: '14px',
            padding: '10px',
        },
        input: {
            // padding: theme.spacing(1.5, 3),

            background: "#F1F3F8",

        }
    },
    staticText: {
        fontSize: '14px',
        padding: '10px 10px 0px 85px'
    },
    icon: {
        fontSize: '24px',
        color: appColor
    },
    loadingButton: {
        height: '35px',
        borderRadius: "45px",
        background: appColor,
        boxShadow: btnShadowColor,
        textTransform: 'capitalize',
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
        padding: '6px 16px',
        fontSize: '16px',
        '&:hover': {
            background: appColor,
        },
        marginRight: '15px'
    },
    cancelbtn: {
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
    fieldContainer: {
        background: "#F1F3F8",
        // padding: '3px 0px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
        "&::before": {
            content: "'Message:'",
            position: 'absolute',
            width: '85px',
            padding: '10px',
            fontSize: '14px',
            color: spanColor,
            fontFamily: 'Poppins-SemiBold'
        }
    },
    errorContainer: {
        height: '1em',
        '& span': {
            marginLeft: '10px'
        }
    }
}));

export default useStyles;