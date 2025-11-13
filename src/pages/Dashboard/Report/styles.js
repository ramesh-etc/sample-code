import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor, spanColor } from '../../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    btnText: {
        color: spanColor,
        fontFamily: 'Poppins-Regular',
        fontSize: "13px",
        marginRight: '5px'
    },
    iconBtn: {
        padding: '0px'
    },
    btn: {
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
        }
    }
}))

export default useStyles;