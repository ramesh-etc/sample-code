
import { makeStyles } from "tss-react/mui";
import { spanColor } from "../../utils/tools";

const useStyles = makeStyles()((theme) => ({
    filterPopper: {
        maxWidth: 'auto'
    },
    btnClass: {
        borderRadius: "33px",
        border: `1px solid #3CD856`,
        background: "#FFF !important",
        boxShadow: "0px 0px 8px 0px #C5FFD9 inset, 0px 0px 4px 0px #B4F0BE",
        color: '#425166',
        textTransform: 'none',
        fontSize: '12px',
        padding: '4px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textWrap: 'wrap',
        // marginLeft: '15px',
        minWidth: 'unset'
    },
    beforeWelcome: {
        fontFamily: 'Poppins-SemiBold',
        color: spanColor,
        fontSize: '20px',
        [`${theme.breakpoints.up('xl')}`]: {
            fontSize: '23px',
        },
    },
    userName: {
        textTransform: 'capitalize',
        fontFamily: 'Poppins-SemiBold',
        color: spanColor,
        fontSize: '20px',
        [`${theme.breakpoints.up('xl')}`]: {
            fontSize: '23px',
        },
    },
    wavingHand: {
        width: '20px'
    }
}))

export default useStyles;