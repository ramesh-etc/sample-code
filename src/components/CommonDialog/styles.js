import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
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
}));

export default useStyles;