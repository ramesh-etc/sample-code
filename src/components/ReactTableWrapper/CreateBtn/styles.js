import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor } from '../../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    createbtn: {
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
    },
})
);

export default useStyles;