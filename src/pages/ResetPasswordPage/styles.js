import { makeStyles } from "tss-react/mui";
import { appColor, btnColor } from "../../utils/tools";

const useStyles = makeStyles()((theme) => ({
    root: {
        height: '100vh',
        flexGrow: 1
    },
    linkColorBtn: {
        color: appColor,
        backgroundColor: 'transparent !important',
        textTransform: 'capitalize',
        border: 'none',
        boxShadow: 'none',
        fontFamily: 'Poppins-SemiBold',
        // fontWeight: 600,
        padding: '0px',
        fontSize: '15px'
    },
    loadingButton: {
        // margin: theme.spacing(4, 0, 2),
        width: '100%',
        padding: theme.spacing(1.5, 2),
        fontSize: '14px',
        // fontWeight: '300',
        fontFamily: 'Poppins-SemiBold',
        lineHeight: '1.5',
        height: '50px',
        borderRadius: "50px",
        backgroundColor: btnColor,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
        textTransform: 'capitalize',
        "& .MuiLoadingButton-loadingIndicator": {
            color: "#FFF"
        },
        // "& .Mui-disabled": {
        //     backgroundColor: btnColor,
        // }
    },
}));

export default useStyles;