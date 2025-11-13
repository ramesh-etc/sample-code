import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    tabelContainer: {
        // borderRadius: "20px",
        // border: "1px solid #F8F9FA",
        // background: "#FFF",
        // boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
        // padding: '15px 0px',
        // overflow: 'auto'
    },
    createbtn: {
        borderRadius: '45px',
        background: appColor,
        boxShadow: btnShadowColor,
        fontFamily: 'Poppins-Regular',
        textTransform: 'capitalize',
        color: '#fff'
    },
    link: {
        textDecoration: 'none',
        color: '#fff'
    },
    tabelParentContainer: {
        [`${theme.breakpoints.down('lg')}`]: {
            overflow: 'auto'
        },
    }
}));

export default useStyles;