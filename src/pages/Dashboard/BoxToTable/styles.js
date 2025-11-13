import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    btn: {
        padding: '0px',
        lineHeight: 1,
        fontSize: '14px',
        fontFamily: 'Poppins-Regular',
        // color: '#425166',
        // color: '#3CD856',
        color: '#02a21d',
        [theme.breakpoints.up('xl')]: {
            fontSize: '16px',
        },
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'transparent'
        }
    },
}));

export default useStyles;