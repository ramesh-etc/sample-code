import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor, outlinedBtnShdowColor, spanColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({
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
        marginLeft: '15px !important',
        '&:hover': {
            background: "#FFF",
        }
    },
    description: {
        color: spanColor,
    },
    gridHeader: {
        textAlign: 'center',
        margin: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        maxWidth: '600px',
        maxHeight: '400px',
        overflow: 'auto',
        fontFamily: 'Poppins-Medium'
    },
    paper: {
        minHeight: '150px',
        borderRadius: "20px",
        background: "#F7F7FA",
        boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.20)",
        padding: '3%'
    },
    dialogContent: {
        margin: '0px',
        padding: '20px'
    },
    dialogActions: {
        margin: '0px',
        justifyContent: 'center'
    }
}));


export default useStyles;