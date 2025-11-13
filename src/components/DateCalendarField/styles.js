

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
            padding: theme.spacing(1.5, 3),
            color: spanColor,
            fontSize: '14px'
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
    },
    datePicker: {
        // color: "red",
        maxHeight: '215px',
        width: '210px',
        overflow: 'unset',
        '& .MuiPickersCalendarHeader-root': {
            minHeight: 'fit-content',
            maxHeight: 'fit-content',
            margin: 0,
            marginTop: 10
        },
        '& .MuiPickersCalendarHeader-label': {
            fontSize: '14px'
        },
        '& .MuiDayCalendar-weekDayLabel': {
            width: 25,
            height: 25
        },
        '& .MuiPickersDay-root': {
            width: 25,
            height: 25
        },
        '& .MuiYearCalendar-root': {
            width: '210px',
            maxHeight: '215px',
            'button': {
                fontSize: '14px'
            }
        },
        '& .MuiDateCalendar-root': {
            maxHeight: '215px',
            width: '210px'
        },
        '& .MuiPickersCalendarHeader-root': {
            padding: ' 0px 12px'
        },
        '& .MuiPickersArrowSwitcher-button': {
            padding: '2px',
            marginRight: 0
        },
        '& .MuiPickersCalendarHeader-switchViewButton': {
            padding: 2
        },
        '& .MuiDayCalendar-slideTransition': {
            minHeight: '200px',
        },
        '& .MuiPickersCalendarHeader-labelContainer': {
            overflow: 'unset'
        },
        '& .MuiPickersArrowSwitcher-spacer': {
            width: 10
        },
        fontFamily: 'Poppins-Regular'
    },
    popper: {
        color: "green",
        '& .MuiPaper-root-MuiPickersPopper-paper': {
            "& .MuiPickersSlideTransition-root-MuiDayCalendar-slideTransition": {
                border: '1px solid red'
            }
        }
    }
}));


export default useStyles;