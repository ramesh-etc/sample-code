

import { makeStyles } from 'tss-react/mui';
import { appColor, btnShadowColor, outlinedBtnShdowColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(4)
    },
    forms: {
        width: '100%',
        marginTop: '5px'
    },
    submitBtn: {
        height: '35px',
        borderRadius: "45px",
        background: appColor,
        boxShadow: btnShadowColor,
        textTransform: 'capitalize',
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
        padding: '6px 16px',
        fontSize: '16px',
        marginRight: '15px',
        '&:hover': {
            background: appColor,
        }
    },
    cancelBtn: {
        height: '35px',
        borderRadius: "45px",
        border: `1px solid ${appColor}`,
        background: "#FFF",
        boxShadow: outlinedBtnShdowColor,
        textTransform: 'capitalize',
        fontFamily: 'Poppins-SemiBold',
        color: appColor,
        padding: '6px 16px',
        fontSize: '16px',
        marginRight: '15px',
        '&:hover': {
            background: "#FFF",
        }
    },
    footer: {
        display: 'flex',
        // justifyContent: 'center'
    }
}));


// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;