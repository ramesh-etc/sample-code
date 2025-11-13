import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor, spanColor } from '../../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    row: {
        borderBottom: "1px solid rgba(151, 151, 151, 0.30)",
        // background: "#F8FCFF"
    },
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
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    tableTitle: {
        fontFamily: 'Poppins-SemiBold',
        color: spanColor,
    }
})
);

export default useStyles;