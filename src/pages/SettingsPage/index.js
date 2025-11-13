

import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import SettingBox from "./SettingBox";
import useStyles from "./styles";

const SettingsPage = (props) => {

    const { actions, columns, name, parentPath, boxStyle } = props;
    const [settings_Form, setSettings_Form] = React.useState(false);
    const { classes } = useStyles();
    const settingsColumns = columns.settingsColumns().columns;

    return <Grid className={classes.boxContainer} sx={boxStyle || {}}>

        {
            settingsColumns.map((col, index) => {
                let showLabel = col?.value;
                if (col?.value == "messaging") {
                    showLabel = col?.label
                } else if (col?.value == "reminderSettings") {
                    showLabel = col?.label
                } else if (col?.value == "hipaa") {
                    showLabel = col?.label
                } else if (col?.value == "version") {
                    showLabel = col?.label
                }
                return (<>
                    {col.value != 'template_defaults' ? <Grid
                        key={index}
                        name={`${index}_${col.label}`}
                        className={classes.titleContainer}
                        sx={{ marginTop: index > 0 ? "26px" : "0px" }}
                    >
                        <Typography
                            className={classes.title}>
                            {col.label}
                        </Typography>
                        {(settings_Form != index + 1) ? <Button
                            variant="contained"
                            color="primary"
                            type='button'
                            className={classes.loadingButton}
                            onClick={() => setSettings_Form(col.schemaId)}
                        >
                            {`Edit ${showLabel}`}
                        </Button> : null}
                    </Grid> : null}
                    <SettingBox
                        key={`${col.name}-${index}`}
                        label={col.label}
                        value={col.value}
                        actionName={col.action}
                        actions={actions}
                        columns={col.columns}
                        confirmMessage={col?.confirmMessage}
                        parentPath={parentPath}
                        formNumber={index + 1}
                        settings_Form={settings_Form}
                        setSettings_Form={setSettings_Form}
                    />
                </>)
            })
        }
    </Grid>
}

export default SettingsPage;