import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme, { containerHeight }) => ({
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
        maxHeight: 'calc(100% - 15px)',
        overflow: 'unset'
        // width: '25%'
    },
    body: {
        flexDirection: 'column',
        padding: '15px'
    },
    img: {
        width: '25px',
        cursor: 'pointer'
    },
    imgContainer: {
        textAlign: 'end',
        flexBasis: 0,
        marginBottom: '15px',
        minHeight: '25px'
    },
    customTable: {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        overflow: 'auto',
        '#title': {
            minWidth: '35%',
            flexBasis: '35%'
        },
        '#searchContainer': {
            // maxWidth: '60%',
            flexBasis: '60%'
        },
        '#searchGridContainer': {
            justifyContent: 'flex-start'
        },
        '#searchGrid': {
            maxWidth: '70%',
            flexBasis: '70%'
        }
    },
    tableContent: {
        width: '100%',
        overflow: 'auto',
        height: `${containerHeight - 90}px`
    }
}));

export default useStyles;