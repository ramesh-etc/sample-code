
import { makeStyles } from "tss-react/mui";
import { appColor, btnShadowColor } from "../../../utils/tools";

const useStyles = makeStyles()((theme) => ({
    boxContainer: {
        borderRadius: "20px",
        border: "1px solid #F8F9FA",
        background: "#FFF",
        boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
        padding: '26px',
    },
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
    submitBtnContainer: {

    }
}));

export default useStyles;
