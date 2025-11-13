import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => ({
    root: {
        height: '100vh',
        flexGrow: 1
    },
    component: {
        padding: '4%',
        [theme.breakpoints.down('md')]: {
            padding: '7%',
        },
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    leftSideItem: {
        padding: '4%',
        [theme.breakpoints.down('md')]: {
            padding: '7%',
        },
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    FormPage: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        backgroundColor: 'grey',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    },
    img: {
        width: '65%'
        // "@media (min-width: 960px)": {
        //     width: '350px'
        // },
        // // "@media (min-width: 1024px)": {
        // //     width: '350px',
        // // },
        // // "@media (min-width: 1280px)": {
        // //     width: '380px',
        // // },
        // "@media (min-width: 1536px)": {
        //     width: '460px',
        // },
    }
}));


export default useStyles;
