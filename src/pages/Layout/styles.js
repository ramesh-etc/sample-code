import { styled } from '@mui/system';
import { ListItem } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { appColor, spanColor } from '../../utils/tools';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    root: {
        "&$selected": {
            backgroundColor: "black"
        },
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: '#2C2C2F',
        },
        "&.MuiListItem-root.Mui-selected": {
            backgroundColor: "black"
        },
        "&.MuiListItem-button": {
            minHeight: '48px'
        },
        '@global': {
            ".MuiListItemText-root": {
                marginLeft: '20px',
                marginTop: '8px'
            }
        }
    },
    selected: {}
})
);

export const useStyles = makeStyles()((theme, { drawerWidth }) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        background: '#393a3d',

    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        background: "#FFF",
        boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
        zIndex: '999',
        position: 'fixed',
        overflow: 'hidden'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        color: appColor,
    },
    menuIcon: {
        position: "fixed",
        transform: "translate(50px, 18px)",
        backgroundColor: "#e8e8e8",
        width: "20px",
        height: "20px",
        zIndex: '100',
        top: '0px',
        left: '0px',
        '&:hover': {
            backgroundColor: '#e8e8e8',
        }
    },
    mobileMenuIcon: {
        position: "fixed",
        transform: "translate(190px, 18px)",
        backgroundColor: "#e8e8e8",
        width: "20px",
        height: "20px",
        zIndex: '100',
        top: '0px',
        left: '0px',
        '&:hover': {
            backgroundColor: '#e8e8e8',
        }
    },
    // necessary for content to be below app bar
    toolbar: {
        // ...theme.mixins.toolbar,
        textAlign: 'center',
        minHeight: '48px !important',
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            minHeight: "38px !important",
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: "56px !important",
        },
    },
    drawerPaper: {
        width: drawerWidth,
        boxShadow: "0px 12px 23px 0px rgba(133, 133, 133, 0.25)",
        background: appColor,
        color: '#F1F1F1',
        overflow: 'auto',
        "&::-webkit-scrollbar": {
            width: 0
        },
        borderRight: '0px'
    },
    drawerPaperFixed: {
        width: 200,
        background: appColor,
        boxShadow: "0px 12px 23px 0px rgba(133, 133, 133, 0.25)",
        color: '#F1F1F1',
        overflow: 'auto',
        "&::-webkit-scrollbar": {
            width: 0
        },
        borderRight: '0px'
    },
    content: {
        flexGrow: 1,
        height: '100%',
        // overflow: 'hidden',
        // marginLeft: drawerWidth,
        [`${theme.breakpoints.down('sm')}`]: {
            marginLeft: '0px',
        },
        [`${theme.breakpoints.down('lg')}`]: {
            overflow: 'hidden'
        },
        padding: theme.spacing(2),
        paddingTop: `calc(48px + ${theme.spacing(2)})`,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            paddingTop: `calc(38px + ${theme.spacing(2)})`
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: `calc(56px + ${theme.spacing(2)})`
        },
        backgroundColor: '#F8F8FB'
        // paddingTop: `calc(56px + ${theme.spacing(3)})`,
        // '@media(min-width: 600px)': {

        // },
        // '@media(min-width: 0px)': {
        //     '@media (orientation: landscape)': {

        //     }
        // }
    },
    login: {
        flexGrow: 1,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        marginTop: '40px',
        padding: '0px 5px'
    },
    link: {
        textDecoration: 'none',
        color: '#F1F1F1'
    },
    settings: {
        position: 'relative',
        color: '#A6A6A9',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logout: {
        marginLeft: '12px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: '4px'
    },
    separator: {
        height: '1px',
        background: 'gray',
        margin: '10px 5%',
        opacity: '0.6'
    },
    logo: {
        width: '80px',
        height: '80px',
        // width: '100%',
        // height: '100%',
        borderRadius: '100%',
        objectFit: 'contain',
        margin: '30px 0px',
        marginTop: '10px',
        cursor: 'pointer',
        boxShadow: "0px 0px 7px 0px #153165",
        backgroundColor: '#fff'
    },
    mobileLogo: {
        width: '40px',
        height: '40px',
        // width: '35%',
        objectFit: 'contain',
        borderRadius: '100%',
        margin: '80px 0px 20px',
        cursor: 'pointer',
        boxShadow: "0px 0px 7px 0px #153165",
        backgroundColor: '#fff'
    },
    svg: {
        width: '25px',
        height: '25px'
    },
    changePasswordForm: {
        display: 'contents'
    },
    esquiretekLogo: {
        width: '80px',
        height: '78px',
        borderRadius: '100%',
        margin: '30px 0px',
        marginTop: '10px'
    },
    settingForm: {
        display: 'contents'
    },
    beta: {
        background: appColor,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '3px',
        marginLeft: '7px',
        height: '20px',
        '& > h6': {
            fontSize: '12px',
            color: 'white',
            fontFamily: 'Avenir-Heavy'
        }
    },
    signatureForm: {
        display: 'contents'
    },
    signture: {
        marginRight: '12px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    customisedlist: {
        // backgroundColor: appColor,
        // boxShadow: "0px 12px 23px 0px rgba(133, 133, 133, 0.25)",
        height: '90%',
        display: "flex",
        flexDirection: "column",
        paddingTop: "12px",
        // alignItems: "center",
        gap: '5px',
        // paddingBottom: '30px',
        // alignSelf: 'flex-end',
        // justifyContent: 'space-between',
        fontFamily: 'Poppins-Regular',
        '&.MuiListItemButton-root': {
            backgroundColor: "transparent",

        },
        '& .Mui-selected': {
            backgroundColor: "#fff !important",
        },
        li: {
            backgroundColor: "transparent !important",
        }
    },
    settingsmenu: {
        display: 'flex',
        alignItems: 'center'
    },
    settingsMenuButton: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none',
        textTransform: 'capitalize'
    },
    settingsMenuItem: {
        '& .MuiListItemIcon-root': {
            minWidth: "35px",
        },
        '&:hover': {
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: appColor,
                fontSize: "17px",
            },
        },
    },
    appBarTitle: {
        color: spanColor,
        fontSize: '23px',
        fontFamily: 'Poppins-Regular',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        },
        textTransform: 'capitalize',
    },
    // modalPaper: {
    //     overflow: 'auto',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // }
}));
