/**
 * 
 * SignUp Form
 * 
 */


import React from 'react';
// import { Grid } from '@mui/material';
import { signuphospital, signupuser } from './schema';
import Form from './Form';
// import { connect } from 'react-redux'
// import { submit } from 'redux-form'
// import { useAppDispatch } from '../../redux/hooks';
// import { setSignupRecord } from '../../redux/app/actions';
import { getInitialValue } from '../../utils/tools';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function SignUpForm1(props) {
    const { errorMessage, clearCache, btnload, setBtnLoad, locationState, initialValues,
        onSubmit } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    // const dispatch = useAppDispatch();

    const fields = signupuser().columns;
    const field1 = getInitialValue(signupuser().columns.filter(_ => _.editRecord));
    // const field2 = getInitialValue(signuphospital().columns.filter(_ => _.editRecord));

    const handleSubmit = (e) => {
        onSubmit(e);
    }

    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={Object.assign({}, field1, initialValues)}
            fields={fields}
            field1={signupuser().columns.filter(_ => _.editRecord)}
            field2={signuphospital().columns.filter(_ => _.editRecord)}
            btnload={btnload}
            locationState={locationState}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            errorMessage={errorMessage}
            clearCache={clearCache}
        />
    )
}


export default SignUpForm1;