
import { makeStyles } from "tss-react/mui";
import { appColor, btnShadowColor, outlinedBtnShdowColor } from "../../../utils/tools";

const useStyles = makeStyles()((theme) => ({
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0px 10px'
    },
    title: {
        fontSize: '20px',
        fontFamily: 'Poppins-SemiBold'
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
        marginTop: '26px',
        // alignItems: 'center'
    },
    fieldItems: {
        flexBasis: '40%',
        maxWidth: '40%',

        [`${theme.breakpoints.down('md') || theme.breakpoints.down('lg')}`]: {
            flexBasis: '47%',
            maxWidth: '47%'
        },
        [`${theme.breakpoints.down('sm')}`]: {
            flexBasis: '100%',
            maxWidth: '100%'
        },
        [`${theme.breakpoints.up('xl')}`]: {
            flexBasis: '27%',
            maxWidth: '27%'
        },
    }
}));

export default useStyles;