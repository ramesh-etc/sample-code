
import React from "react";
import { Grid, Button, useMediaQuery } from "@mui/material";
import { Field, reduxForm } from 'redux-form';
import { ImplementationFor } from "../../../components/EditRecordForm/utils";
import useStyles from "./styles";
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from "@mui/system";
import validate from "../../../utils/validation";
import { normalize } from "../../../utils/tools";

const SettingsForm = (props) => {
    const { handleSubmit, btnload, destroy, fields, name, isCurrentEditForm, handleCancel, submitBtnLabel, submitBtn } = props;
    const { classes } = useStyles();

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lgup = useMediaQuery(theme.breakpoints.up('lg'));
    const xlup = useMediaQuery(theme.breakpoints.up('xl'));

    React.useEffect(() => {
        return () => destroy();
    }, []);

    return <form onSubmit={handleSubmit}>

        <Grid container
            // xs={12}
            className={classes.fieldContainer}
        >
            {(fields || []).map((field, index) => {
                const InputComponent = ImplementationFor[field.type];
                return <Grid key={index}
                    className={classes.fieldItems}
                    // xs={12}
                    // md={5}
                    // sm={5.8}
                    sx={{
                        // maxWidth: '55%'
                        alignSelf: field.type == 'checkbox' ? "center" : "flex-start",
                        marginRight: (index % 2 != 0 || sm) ? '0px' : '30px',
                        marginLeft: ((index % 2 == 0 || index % 3 == 0) && xlup) ? '30px' : '0px'
                    }}>
                    <Field
                        key={index}
                        name={field.value}
                        label={field.label}
                        component={InputComponent}
                        placeholder={field.placeholder}
                        options={field.options}
                        disabled={!isCurrentEditForm}
                        noBorder={!isCurrentEditForm}
                        normalize={normalize(field)}
                        {...field}
                    />
                </Grid>
            })}

        </Grid>
        {isCurrentEditForm ? <Grid sx={{
            paddingTop: '12px',
            display: 'flex'
        }}
        // xs={12}
        >
            {submitBtn && typeof submitBtn === 'function' ? React.createElement(submitBtn, Object.assign({}, { ...props, classes })) : <LoadingButton
                className={classes.loadingButton}
                loading={btnload}
                type='submit'
                // fullWidth
                variant='contained'
                color='primary'
            >
                {`${submitBtnLabel}`}
            </LoadingButton>}
            <Button
                className={classes.cancelbtn}
                type='button'
                variant='contained'
                color='primary'
                onClick={handleCancel}
            >
                Cancel
            </Button>
        </Grid> : null}
    </form>
}

export default reduxForm({
    form: 'settings_Form',
    validate,
    enableReinitialize: true,
    touchOnChange: true,
})(SettingsForm);
