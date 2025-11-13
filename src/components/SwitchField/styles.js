import { makeStyles } from "tss-react/mui";
import { appColor, btnColor } from "../../utils/tools";

const useStyles = makeStyles()((theme) => ({
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
  },
  switch_thumb: {
    '& :before': {
      color: '#fff',
    },
    "&.Mui-checked": {
      color: "#385C9F !important"
    }
  },
  switch: {
    marginLeft: '10px',
    "& .MuiSwitch-thumb": {
      color: "#fff"
      // transform: "translateX(25px) !important"
    },
    "& .Mui-checked": {
      "& .MuiSwitch-thumb": {
        color: "#385C9F"
        // transform: "translateX(25px) !important"
      },
      "& .MuiSwitch-track": {
        backgroundColor: "#000 !important"
      }
    }
  },
  // switch_track: {
  //   // backgroundColor: "#f50057 !important",
  // },
  // switch_base: {
  //   // color: "#f50057 !important",
  //   "&.Mui-disabled": {
  //     // color: "#e886a9 !important"
  //   },
  //   "&.Mui-checked": {
  //     // color: "#95cc97 !important"
  //   },
  //   "&.Mui-checked + .MuiSwitch-track": {
  //     // backgroundColor: "#4CAF50 !important",
  //   }
  // },
  // switch_primary: {
  //   "&.Mui-checked": {
  //     color: "#4CAF50 !important",
  //   },
  //   "&.Mui-checked + .MuiSwitch-track": {
  //     // backgroundColor: "#4CAF50 !important",
  //   },
  // },
  formControlLabel: {
    // flexDirection: 'row'
    justifyContent: 'flex-end'
  }
}));


export default useStyles;
