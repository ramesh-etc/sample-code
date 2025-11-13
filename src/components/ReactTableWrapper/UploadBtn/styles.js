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
    dialogContent: {
        maxHeight: '415px',
        backgroundColor: 'rgb(248, 248, 251)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
    }
})
);

export default useStyles;