
import React from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes, } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { btnColor, spanColor } from './utils/tools';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    button: {
        textTransform: 'none',
    },
    typography: {
        "fontFamily": "Poppins-Regular",
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
        color: spanColor,
        h5: {
            "fontFamily": "Poppins-SemiBold",
            "textTransform": "Capitalize"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    minWidth: 'max-content',
                    backgroundColor: btnColor,
                    borderRadius: "50px",
                    background: btnColor,
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
                    '&:hover': {
                        backgroundColor: btnColor,
                    }
                },
            },
        },
        // MuiOutlinedInput: {
        //     styleOverrides: {
        //         root: {
        //             "& .MuiOutlinedInput-notchedOutline": {
        //                 borderColor: "#E7E7E7",
        //             },
        //             "&:hover .MuiOutlinedInput-notchedOutline": {
        //                 borderRadius: "50px",
        //                 borderColor: "#E7E7E7",
        //                 borderWidth: 1
        //             },
        //             "&:focus .MuiOutlinedInput-notchedOutline": {
        //                 borderColor: "#E7E7E7",
        //             },
        //             "&:active .MuiOutlinedInput-notchedOutline": {
        //                 borderColor: "#E7E7E7",
        //             },
        //             "& .MuiOutlinedInput-colorSecondary": {
        //                 borderColor: "#E7E7E7",
        //             }

        //         }
        //     }
        // },
        MuiAlert: {
            styleOverrides: {
                standardSuccess: {
                    backgroundColor: 'green',
                    color: 'white',
                    '& .MuiAlert-icon': {
                        color: 'white'
                    }
                },
                standardError: {
                    backgroundColor: 'red',
                    color: 'white',
                    '& .MuiAlert-icon': {
                        color: 'white'
                    }
                },
                standardWarning: {
                    backgroundColor: 'orange',
                    color: 'white',
                    '& .MuiAlert-icon': {
                        color: 'white'
                    }
                },
                standardInfo: {
                    backgroundColor: 'grey',
                    color: 'white',
                    '& .MuiAlert-icon': {
                        color: 'white'
                    }
                },
                filledInfo: {
                    backgroundColor: 'grey', // Customize the background color for the info variant
                },

            },
        },
        MuiPickersLayout: {
            styleOverrides: {
                contentWrapper: {
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
                        width: '30px',
                        height: '30px'
                    },
                    '& .MuiPickersDay-root': {
                        width: '30px',
                        height: '30px'
                    },
                    '& .MuiYearCalendar-root': {
                        width: '270px',
                        maxHeight: '250px',
                        'button': {
                            fontSize: '14px'
                        }
                    },
                    '& .MuiDateCalendar-root': {
                        maxHeight: '250px',
                        width: '270px'
                    },
                    '& .MuiDayCalendar-slideTransition': {
                        minHeight: '200px',
                    },
                    fontFamily: 'Poppins-Regular'
                    // backgroundColor: 'red'
                },
            },
        },
    }
});


const MUITheme = ({ children }) => {

    return (
        <ThemeProvider theme={responsiveFontSizes(lightTheme)}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default MUITheme;