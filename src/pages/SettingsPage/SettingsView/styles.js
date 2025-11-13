
import { makeStyles } from "tss-react/mui";
import { spanColor, tableDataColor } from "../../../utils/tools";

const useStyles = makeStyles()((theme) => ({
    fieldContainer: {
        marginTop: '26px',
        gap: "18px"
    },
    label: {
        fontSize: '16px',
        color: tableDataColor,
    },
    value: {
        // padding: theme.spacing(1.5, 3),
        color: spanColor,
        fontSize: '16px',
        whiteSpace: 'pre-wrap' //Cleared issue of more space in name collapsed into single space
    },
    labelValueContainer: {
        alignItems: 'center'
    },
    labelContanier: {
        padding: '5px 0px',
        paddingLeft: '10px',
        flexBasis: '25%',
        maxWidth: '25%',
        [`${theme.breakpoints.down('sm')}`]: {
            flexBasis: '47%',
            maxWidth: '47%'
        },
        [`${theme.breakpoints.down('md')}`]: {
            flexBasis: '47%',
            maxWidth: '47%'
        },
        [`${theme.breakpoints.up('xl')}`]: {
            flexBasis: '20%',
            maxWidth: '20%'
        },
    },
    valueContainer: {
        padding: '0.5% 1% 0.5% 2%',
        // backgroundColor: '#F0F2F7',
        flexBasis: '50%',
        maxWidth: '50%',
        [`${theme.breakpoints.down('sm')}`]: {
            flexBasis: '47%',
            maxWidth: '47%'
        },
        [`${theme.breakpoints.down('md')}`]: {
            flexBasis: '47%',
            maxWidth: '47%'
        },
        [`${theme.breakpoints.up('xl')}`]: {
            flexBasis: '50%',
            maxWidth: '50%'
        },
        "& p": {
            color: '#7E899D',
        },
        borderRadius: '5px'
    },
    img: {
        width: '100%',
        // width: '100px',
        maxHeight: '100px',
        objectFit: 'contain',
        borderRadius: '5px'
    }
}));

export default useStyles;