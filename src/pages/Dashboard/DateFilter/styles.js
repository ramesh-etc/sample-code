import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[5],
        padding: '25px',
        minWidth: '40%',
        outline: 'none',
        maxWidth: '80%'
        // width: '25%'
    },
    body: {
        marginTop: '25px',
        marginBottom: '25px',
        justifyContent: 'center'
    },
    fieldContainer: {
        flexFlow: 'row',
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column',
        },
        "& >:not(:last-child)": {
            marginRight: '10px',
        }

    },
    customLabelClass: {
        marginBottom: '7px'
    },
    img: {
        width: '25px',
        cursor: 'pointer'
    },
    imgContainer: {
        textAlign: 'end',
        flexBasis: 0,
        // marginBottom: '15px',
        minHeight: '25px',
        alignSelf: 'flex-end'
    },
    menuItem: {
        flexDirection: 'column',
        '&:hover': {
            backgroundColor: '#fff'
        },
    }
}))

export default useStyles;