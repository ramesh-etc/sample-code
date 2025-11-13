import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/system';
import StepConnector, {
    stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIcon } from '@mui/material';
import { appColor } from '../../utils/tools';

const steps = ['1', '2'];

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


export default function HorizontalLinearStepper(props) {
    const {
        activeStep,
        // setActiveStep
    } = props;

    return (
        <Box sx={{
            width: '30%'
        }}>
            <Stepper activeStep={activeStep} alternativeLabel
                connector={<ColorlibConnector />}
            >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}
                            // className={classes.step}
                            sx={{
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: appColor, // circle color (COMPLETED)
                                    fontWeight: 700,
                                    fontSize: '25px'
                                },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: appColor, // circle color (ACTIVE)
                                    fontWeight: 700,
                                    fontSize: '25px'
                                },
                                '& .MuiStepLabel-root .Mui-disabled': {
                                    color: '#E2E2E2 !important', // circle color (ACTIVE)
                                    fontWeight: 700,
                                    fontSize: '25px'
                                },
                                '& .MuiStepLabel-root .Mui-disabled Svg': {
                                    color: '#E2E2E2 !important', // circle color (ACTIVE)
                                    fontWeight: 700,
                                    fontSize: '25px'
                                },
                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                {
                                    color: 'common.white', // Just text label (ACTIVE)
                                    fontWeight: 700,
                                    padding: '5px'
                                },
                                '& .MuiStepLabel-label.Mui-disabled.MuiStepLabel-alternativeLabel':
                                {
                                    color: '#8D8D8D', // Just text label (ACTIVE) #E2E2E2
                                    fontWeight: 700,
                                    padding: '5px'
                                },
                                '& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text': {
                                    fill: '#8D8D8D', // circle's number (DISABLED)
                                    fontWeight: 600
                                },
                            }}
                        >
                            <StepLabel {...labelProps}
                                StepIconComponent={(props) => (
                                    <StepIcon
                                        sx={{
                                            color: props?.active || props?.completed ? appColor : '#E2E2E2'
                                        }}
                                        {...props}
                                        icon={props.icon}
                                        active={props.active || props.completed}
                                        completed={false}
                                    />
                                )}
                            ></StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
}
