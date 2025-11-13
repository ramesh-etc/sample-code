import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    step: {
        // "& :completed": {
        //     color: "#2DCFC1"
        // },
        // "& :active": {
        //     color: "#2DCFC1"
        // },
        // "& :disabled": {
        //     color: "red"
        // },
    },
    // active: {
    //     fill: "#2DCFC1",
    // }, //needed so that the &$active tag works
    // completed: {
    //     fill: "#2DCFC1",
    // },
    // disabled: {
    //     color: '#8D8D8D !important',
    //     // fill: ''
    // },
    // text: {
    //     color: '#8D8D8D !important',
    // }
}));

export default useStyles;