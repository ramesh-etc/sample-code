import { makeStyles } from "tss-react/mui";
import { appColor } from "../../utils/tools";

const useStyles = makeStyles()((theme) => ({
    paper: {
        flexGrow: 1,
        // maxWidth: '75%',
        maxHeight: '58px',
        boxShadow: 'none',
        // '& .MuiButtonBase-root-MuiTab-root': {
        //     color: appColor
        // },
        // '@global': {
        //     '& .MuiButtonBase-root-MuiTab-root.Mui-selected': {
        //         color: appColor
        //     },
        //     '& .MuiButtonBase-root': {
        //         width: '135px'
        //     },
        //     '.MuiButtonBase-root > span': {
        //         fontFamily: 'Avenir-Bold'
        //     },
        //     '& .MuiTabs-indicator': {
        //         backgroundColor: appColor
        //     }
        // }
    },
    tabs: {
        '& .MuiTabs-indicator': {
            backgroundColor: appColor
        },
        '& .MuiButtonBase-root.MuiTab-root': {
            // color: spanColor,
            // color: '#8F9DB6',
            color: '#6D7689',
            fontFamily: 'Poppins-Medium',
            transition: 'color 0.2s ease-in-out',
            textTransform: 'capitalize',
            // '&:hover': {
            //     color: 'green)',
            // },
            '&.Mui-selected': {
                color: appColor,
                fontFamily: 'Poppins-SemiBold'
            },
        },
    },
    categoryChildren: {
        marginTop: '25px'
    }
}));

export default useStyles;