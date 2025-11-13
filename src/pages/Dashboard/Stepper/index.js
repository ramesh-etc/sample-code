import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/system';
import StepConnector, {
    stepConnectorClasses,
} from '@mui/material/StepConnector';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography } from '@mui/material';
import { appColor } from '../../../utils/tools';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        // top: 22,
        left: "calc(-50% + 12px)",
        right: "calc(50% + 12px)"
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: appColor
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: appColor
        },
    },
    [`&.${stepConnectorClasses.disabled}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#E2E2E2  !important'
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 1,
        border: 1,
        width: '100%',
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#E2E2E2  !important',
        borderRadius: 1,
    },
}));

const steps = ['Retrieving Records', 'Processing Data', 'Generating Report'];

export default function HorizontalStepperWithError(props) {
    const {
        activeStep,
        // setActiveStep
    } = props;

    // const isStepFailed = (step) => {
    //     return step === 1;
    // };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
                {steps.map((label, index) => {
                    const labelProps = {};
                    // if (isStepFailed(index)) {
                    //     labelProps.optional = (
                    //         <Typography variant="caption" color="error">
                    //             Alert message
                    //         </Typography>
                    //     );
                    //     labelProps.error = true;
                    // }
                    const stepProps = {};
                    return (
                        <Step key={label} {...stepProps}
                            // className={classes.step}
                            sx={{
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: appColor, // circle color (COMPLETED)
                                    fontFamily: 'Poppins-Bold',
                                    // fontWeight: 700,
                                    // fontSize: '25px'
                                },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: `${appColor} !important`, // circle color (ACTIVE)
                                    fontFamily: 'Poppins-Bold',

                                    '& .MuiCircularProgress-root': {
                                        color: appColor,
                                        width: '25px  !important',
                                        height: '25px  !important',


                                    },
                                    "& .progressBox": {
                                        backgroundColor: '#fff',
                                        borderRadius: '50px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    },
                                    "& .progressText": {
                                        color: appColor,
                                        fontSize: '12px',
                                        position: 'absolute',

                                    }
                                    // fontWeight: 700,
                                    // fontSize: '25px'
                                },
                                '& .MuiStepLabel-root .Mui-disabled': {
                                    color: '#E2E2E2 !important', // circle color (ACTIVE)
                                    fontFamily: 'Poppins-Bold',
                                    // fontWeight: 700,
                                    // fontSize: '25px'
                                },
                                '& .MuiStepLabel-root .Mui-disabled Svg': {
                                    color: '#E2E2E2 !important', // circle color (ACTIVE)
                                    fontFamily: 'Poppins-Bold',
                                    // fontWeight: 700,
                                    // fontSize: '25px'
                                },
                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                {
                                    color: 'common.white', // Just text label (ACTIVE)
                                    fontFamily: 'Poppins-Bold',
                                    // fontWeight: 700,
                                    // padding: '5px'
                                },
                                '& .MuiStepLabel-label.Mui-disabled.MuiStepLabel-alternativeLabel':
                                {
                                    color: '#8D8D8D !important', // Just text label (ACTIVE) #E2E2E2
                                    fontFamily: 'Poppins-Bold',
                                    // fontWeight: 700,
                                    padding: '5px'
                                },
                                '& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text': {
                                    fill: '#8D8D8D', // circle's number (DISABLED)
                                    fontFamily: 'Poppins-SemiBold',
                                    // fontWeight: 600
                                },
                            }}
                        >
                            <StepLabel
                                icon={index === activeStep ? <Box className={"progressBox"}>
                                    <CircularProgress />
                                    <Typography className={"progressText"}>{index + 1}</Typography>
                                </Box> : label.step}
                                {...labelProps}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
}