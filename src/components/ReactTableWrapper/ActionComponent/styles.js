import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor } from '../../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    disabledButton: {
        opacity: 0.5
    },
    createbtn: {
        borderRadius: '50%',
        // padding: '8px',
        // backgroundColor: 'transparent'
    },
    loadAction: {
        borderRadius: '50%',
        padding: '8px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)"
        }
    },
    smsIcon: {
        fontSize: '24px',
        color: "rgba(0, 0, 0, 0.54)",

    },
    editIcon: {
        fontSize: '24px',
    },
    actionBody: {
        padding: '0px',
        border: 'none'
    },
    dialogContent: {
        padding: '20px 20px 11px 20px'
    },
    dialogContentWithoutInput: {
        padding: '20px 20px 0px 20px'
    },
    loadingButton: {
        minWidth: '100px',
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
    },
})
);

export default useStyles;