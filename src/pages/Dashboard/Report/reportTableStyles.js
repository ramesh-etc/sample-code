import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor, spanColor } from '../../../utils/tools';

const useStyles = makeStyles()((theme, { containerHeight }) => ({
    paper: {
        borderRadius: "20px",
        background: "#F7F7FA",
        boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.20)",
        // padding: '25px',
        minWidth: '75%',
        outline: 'none',
        maxWidth: '80%',
        margin: '0px',
        // maxHeight: '550px',
        maxHeight: 'calc(100% - 15px)',
        overflow: 'unset',
    },
    body: {
        flexDirection: 'column',
        padding: '15px',
    },
    img: {
        width: '25px',
        cursor: 'pointer'
    },
    imgContainer: {
        textAlign: 'end',
        // flexBasis: 0,
        // marginBottom: '15px',
        // minHeight: '25px'
    },
    iconBtn: {
        padding: '0px'
    },
    formcontent: {
        padding: '10px',
        borderRadius: "20px",
        border: "1px solid #F8F9FA",
        background: "#FFF",
        boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)"
    },
    btnClass: {
        // borderRadius: "33px",
        // border: `1px solid #2DCFC1`,
        // background: "#FFF !important",
        // boxShadow: "0px 0px 8px 0px #C5FFD9 inset, 0px 0px 4px 0px #B4F0BE",
        // color: '#425166',
        // textTransform: 'none',
        // fontSize: '12px',
        // padding: '4px 10px',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // textWrap: 'wrap',
        // minWidth: 'unset'

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
    title: {
        color: spanColor,
        fontFamily: 'Poppins-SemiBold'
    },
    tableContent: {
        width: '100%',
        overflow: 'auto',
        maxHeight: `${containerHeight - 90}px`,
        marginTop: '10px'
    },
    customTable: {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        overflow: 'auto',
        zIndex: 1,
        // '#title': {
        //     minWidth: '35%',
        //     flexBasis: '35%'
        // },
        // '#searchContainer': {
        //     // maxWidth: '60%',
        //     flexBasis: '60%'
        // },
        // '#searchGridContainer': {
        //     justifyContent: 'flex-start'
        // },
        // '#searchGrid': {
        //     maxWidth: '70%',
        //     flexBasis: '70%'
        // }
    },
}))

export default useStyles;