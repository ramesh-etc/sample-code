import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor, outlinedBtnShdowColor, tableDataColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    totalContainer: {
        gap: '16px',
        flexDirection: 'column',
        // overflow: 'auto',

    },
    tableContainer: {
        borderRadius: "20px",
        border: "1px solid #F8F9FA",
        background: "#FFF",
        boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
        // padding: '15px 0px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    row: {
        borderBottom: "1px solid rgba(151, 151, 151, 0.30)",
        // background: "#F8FCFF"
    },
    tableHeaderData: {
        padding: '15px',
        color: tableDataColor,
        fontFamily: 'Poppins-SemiBold',
        textTransform: 'capitalize',
        fontSize: '14px',
        textAlign: 'start'
    },
    tableBodyData: {
        padding: '15px',
        fontSize: '14px'
    },
    paginationContainer: {
        marginTop: '16px',
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    toggleGroup: {
        color: '#6B7280',
        borderRadius: "6px",
        background: "#FFF",
        boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.03)",
        border: 'none',
        // '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
        //     borderRight: '0px !important',
        // },
        // '&.MuiToggleButtonGroup-root-toggleGroup .MuiToggleButtonGroup-grouped:not(:last-of-type)': {
        //     borderRight: "0px !important"
        // },
        // '&:not(:last-of-type)': {
        //     border: `1px solid red`,
        //     borderRadius: 4,
        //     '&:hover': {
        //         boxShadow: 'none',
        //         backgroundColor: 'transparent',
        //         border: `2px solid blue`,
        //     },
        // },
    },
    toggleBtn: {
        // "& span": {
        fontSize: '14px',
        minWidth: '40px',
        maxHeight: '35px',
        fontFamily: 'Poppins-Regular',
        color: '#4B5563',
        textTransform: 'capitalize',
        backgroundColor: '#fff',
        border: 'none !important',
        boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.03)",
        '&.MuiToggleButton-root.Mui-selected': {
            backgroundColor: '#fff',
            fontFamily: 'Poppins-Bold',
            color: appColor,
        },
        '&.MuiToggleButton-root.Mui-disabled': {
            backgroundColor: '#fff',
            color: '#6B7280',
        },
        '&:not(:last-of-type)': {
            // borderRight: '0px !important',
        },
        // borderRight: 'none',
    },
    toggleBtnNumber: {
        // "& span": {
        fontSize: '14px',
        maxWidth: '40px',
        minWidth: '40px',
        maxHeight: '35px',
        fontFamily: 'Poppins-Regular',
        color: '#4B5563',
        backgroundColor: '#fff',
        // borderRight: '0px !important',
        border: 'none',
        boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.03)",

        '&.MuiToggleButton-root.Mui-selected': {
            backgroundColor: '#fff',
            fontFamily: 'Poppins-Bold',
            color: appColor,
            "&:hover": {
                backgroundColor: `${theme.palette.action.hover} !important`
            },
        },
        '&.MuiToggleButton-root.Mui-disabled': {
            backgroundColor: '#fff',
            color: '#6B7280',
        },
        // '&:not(:last-of-type)': {
        //     border: `1px solid red`,
        //     borderRadius: 4,
        //     '&:hover': {
        //         boxShadow: 'none',
        //         backgroundColor: 'transparent',
        //         border: `2px solid blue`,
        //     },
        // },
        // borderRight: 'none',
        // }
    },
})
);

export default useStyles;