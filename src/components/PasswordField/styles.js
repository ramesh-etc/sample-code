

import { makeStyles } from 'tss-react/mui';
import { spanColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({

  label: {
    fontSize: '15px',
    color: spanColor,
    marginLeft: '18px',
    fontWeight: 'normal',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: "50px",
      border: "1px solid #E7E7E7 !important",
      background: "#FFF",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
    },
    '& :after': {
      border: "1px solid #E7E7E7 !important",
    },
    '& :before': {
      border: "1px solid #E7E7E7 !important",
    },
    input: {
      // padding: '10px 15px',
      padding: theme.spacing(1.5, 3),
      color: spanColor,
      fontSize: '14px',
      '&::placeholder': {
        textOverflow: 'ellipsis !important',
        color: '#CBDAD7',
        fontSize: '16px',
        // fontSize: '2em',
        // marginBottom: '15px !important'
        // padding: '0px',
        // fontWeight: 'bold',
        // verticalAlign: 'middle',
        // lineHeight: '7em !important',
        height: '1.4375em',
        // height: '1em'
      }
    }
  },
  inputs: {
    // fontWeight: 600,
    "&::placeholder": {
      fontWeight: 400,
      color: '#CBDAD7',
      opacity: "1 !important",
      // color: "red"
    },
  },
  error: {
    fontSize: '12px',
    color: 'red',
    marginLeft: '18px',

    lineHeight: '15px',
    display: 'block'
  },
  amountField: {
    boxSizing: 'border-box',
  },
  errorContainer: {
    height: '1em',
    // marginBottom: '0.5em',
  }
}));


export default useStyles;