import { makeStyles } from 'tss-react/mui';
import { spanColor } from '../../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    paper: {
        borderRadius: "20px",
        background: "#F7F7FA",
        boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.20)",
        // padding: '25px',
        minWidth: '40%',
        outline: 'none',
        maxWidth: '80%',
        margin: '0px',
        // maxHeight: '550px',
        minHeight: "fit-content",
        maxHeight: 'calc(100% - 15px)',
        overflow: 'unset'
        // width: '25%'
    },
    dialogueCon: {
        // padding: '20px'
        // position:'relative',
        // width:'100%',
        // minHeight:'400px',
        // overflowX:'hidden',
        // overflowY:'scroll',
        // '& ::-webkit-scrollbar':{
        //     display:'none'
        // }
    },
    popupHeader: {
        justifyContent: 'space-between',
        display: 'flex',
        padding: "13px 27px 0px",
        alignItems: 'center'
        // position: 'fixed',
        // border: '1px solid #d7d7d7',
        // padding: '5px',
        // width: '40%',
        // height: '89px',
        // overflow: 'hidden',
        // borderRadius: '7px',
        // zIndex:'2',
        // background:'#fff',
        // paddingLeft:'18px',
        // paddingBottom:'11px',
    },
    img: {
        width: '25px',
        cursor: 'pointer'
    },
    title: {
        margin: '0px',
        color: spanColor,
        fontSize: '20px',
        fontFamily: "Poppins-SemiBold"
    },
    smallText: {
        margin: '0px',
        color: '#6D7689',
        fontSize: '13px',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        // position: 'relative',
        // marginTop: '-2%',
        // color: 'gray',
    },
    headerlabel: {
        fontFamily: 'Poppins-SemiBold',
        // color: '#6D7689',
    },
    // closeBtn: {
    //     position: 'absolute',
    //     top: '18%',
    //     right: '4%',
    //     padding: '10px',
    //     textAlign: 'center',
    //     fontSize: '22px',
    //     background: 'transparent',
    //     border: '0px solid transparent',
    //     color: 'gray',

    // },
    popupCon: {
        // padding: "0px 25px",
        // padding: '0px 5px',
        // position: 'absolute',
        // marginTop: '16%',
        // marginLeft: '3%',
        // height: 'auto',
        // width: "72%",
        // padding: '5px',
    },
    rows: {
        "& > div": {
            marginBottom: '13px',
            wordBreak: 'break-word'
        },
        "& > :last-child": {
            marginBottom: '0px',
        },
        // padding: "13px 0px",
        // margin: '0px 20px'
        // position: 'relative',
        // marginTop: '-10px',
        // width: '100%',
        // height: 'auto',
        // padding: '22px',
        // display: 'grid',
        // gridTemplateColumns: 'auto auto auto',
        // gap: '4px',
        // fontSize: '16px',
        // fontWeight: '300',
    },
    dataRow: {
        display: 'flex',
        // justifyContent: 'space-between'
    },
    data: {

        display: 'flex'
    },
    colon: {
        flexBasis: '3%',
        color: spanColor,
        marginRight: '5px'
    },
    label: {
        flexBasis: '35%',
        minWidth: '35%',
        color: spanColor
    },
    value: {
        flexBasis: '62%',
        color: '#6D7689',
        textTransform: 'capitalize'
    },
    imginfo: {
        marginLeft: '5px',
        width: '20px'
    },
    detailContainer: {
        "& span": {
            fontSize: '14px',
        }
    },
    historiesDetailContainer: {
        display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        "& span": {
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
        }
    }
}));

export default useStyles;