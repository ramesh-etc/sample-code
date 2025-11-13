

import { makeStyles } from 'tss-react/mui';
import { appColor, spanColor } from '../../utils/tools';

const useStyles = makeStyles()((theme) => ({
  progress: {
    height: '100px',
    width: '100px'
  },
  circle: {
    borderRadius: '50%',
    border: `1px solid ${appColor}`,
    width: '110px',
    height: '110px',
    boxShadow: theme.shadows[2],
    position: 'absolute',
    opacity: '0',
    top: '0',
    animation: `$scaleIn 4s infinite cubic-bezier(.36, .11, .89, .32)`,
  },
  '@keyframes scaleIn': {
    "from": {
      transform: 'scale(.5, .5)',
      opacity: '.5'
    },
    "to": {
      transform: 'scale(1.5, 1.5)',
      opacity: '0'
    }

  },
  container: {
    justifyContent: 'center',
    textAlign: 'center',
    // marginTop: '15px',
    outline: 'none',
    position: 'relative'
  },
  container1: {
    justifyContent: 'center',

    // marginTop: '25px',
    outline: 'none',
    position: 'relative',
    // cursor: 'pointer'
  },
  uploadInSettings: {
    display: 'flex',
    outline: 'none',
    position: 'relative',
    width: 'fit-content'
  },
  upload: {
    boxShadow: 'none',
    width: '110px',
    height: '110px',
    zIndex: '100',
    padding: '5px',
    outline: 'none',
    display: 'inline-block',
    borderRadius: '100%',
    position: 'relative'
  },
  icon: {
    color: appColor,
    position: 'relative',
    display: 'flex',
    width: '100%',
    fontSize: '50px'
  },
  button: {
    fontWeight: 'bold',
    borderRadius: '28px',
    textTransform: 'none',
    fontFamily: 'Poppins-Regular',
    marginTop: '10px',
    outline: 'none'
  },
  animate: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  image: {
    // width: '100px',
    maxHeight: '100px',
    objectFit: 'contain',
    // width: '35%',
    width: '20vh',
    display: 'inline-block',
    // borderRadius: '100%'
  },
  percentage: {
    color: appColor,
    fontWeight: 'bold',
    fontSize: '18px'
  },
  template: {
    color: 'gray',
    cursor: 'pointer',
    fontSize: '0.84rem'
  },
  description: {
    color: appColor
  },
  gridContainer: {
    justifyContent: 'center'
  },
  customAlertRoot: {
    alignItems: 'center'
  },
  label: {
    fontSize: '15px',
    color: spanColor,
    marginLeft: '18px',
    fontWeight: 'normal',
  }
}));


export default useStyles;