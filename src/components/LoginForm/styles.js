

import { makeStyles } from 'tss-react/mui';
import { appColor, btnColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    form: {
        width: '100%'
    },
    submit: {
        // margin: theme.spacing(4, 0, 2),
        backgroundColor: appColor,
        textTransform: 'none',
        "&:hover": {
            backgroundColor: appColor,
        }
    },
    loadingButton: {
        // margin: theme.spacing(4, 0, 2),
        width: '100%',
        padding: theme.spacing(1.5, 2),
        fontSize: '14px',
        // fontWeight: '300',
        fontFamily: 'Poppins-SemiBold',
        lineHeight: '1.5',
        height: '50px',
        borderRadius: "50px",
        backgroundColor: btnColor,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
        textTransform: 'capitalize',
        "& .MuiLoadingButton-loadingIndicator": {
            color: "#FFF"
        },
        // "& .Mui-disabled": {
        //     backgroundColor: btnColor,
        // }
    },
    marginTopMedium: {
        // marginTop: theme.spacing(4),
    },
    div: {
        textAlign: 'center',
        // marginTop: theme.spacing(1.3),
    },
    lockIcon: {
        width: '20px',
        height: '20px',
        marginRight: '4px',
    },
    linkColor: {
        color: appColor,
        textDecoration: 'none',
        fontFamily: 'Poppins-SemiBold'
        // fontWeight: 600
    },
    outlineContainer: {
        padding: theme.spacing(3)
    },
    formContainer: {
        // padding: theme.spacing(3),
        // paddingBottom: theme.spacing(1),
        flexBasis: '100%',
        padding: '0',
        [theme.breakpoints.up('md')]: {
            flexBasis: '100%',
            padding: '0 10.5%',
        },
        // [theme.breakpoints.up('xl')]: {
        //     flexBasis: '97%',
        //     padding: '0 10%',
        // },
        [theme.breakpoints.between('lg', 'xl')]: {
            flexBasis: '100%',
            padding: '0 14%',
        },
        // [theme.breakpoints.up('lg')]: {
        //     flexBasis: '100%',
        //     padding: '0 10%',
        // },


        // padding: sm ? '0' : lg || xl ? '0 10%' : '0 14%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '15px'
    }
}));

export default useStyles;