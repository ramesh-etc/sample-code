

import React from "react";
import { Typography, Grid, Button, useMediaQuery } from "@mui/material";
import useStyles from "./styles";
import { useTheme } from "@mui/system";
import Skeleton from '@mui/material/Skeleton';

const SettingsView = (props) => {
    const { fields, record, metaData, loading } = props;
    const { classes } = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const columValue = (column, row) => {

        switch (column.type) {
            case 'upload':
                return column.html && column.html(row, metaData) || (
                    <img
                        src={row[column.value] || process.env.REACT_APP_EMPTY_LOGO_URL}
                        role="presentation"
                        className={classes.img}
                    />
                );
            case 'checkbox':
                return column.html && column.html(row, metaData) || <Typography className={classes.value}>{row[column.value] || "-"}</Typography>;
            case 'multiCheckBox':
                const showValue = (column?.options || []).filter(col => row[col.value]);
                const showString = (showValue || []).map(e => e.label).join(", ")

                return column.html && column.html(row, metaData) || <Typography className={classes.value}>{showString || "-"}</Typography>;
            case 'select':
                return column.html && column.html(row, metaData) || <Typography className={classes.value}>{row[column.value]}</Typography>;
            case 'textarea':
                return column.html && column.html(row, metaData) || <Typography className={classes.value}>{row[column.value] != null && row[column.value] != '' ? lineBreak(row[column.value]) : '-'}</Typography>;
            default:
                return column.html && column.html(row, metaData) || <Typography className={classes.value}>{row[column.value] != null && row[column.value] != '' ? row[column.value] : column.value == "session_timeout" ? 3600 : '-'}</Typography>;
        }
    };

    return <Grid container
        // xs={12}
        className={classes.fieldContainer}
    >
        {(fields || []).map((field, index) => {
            return <Grid
                key={`${field.value}_${index}`}
                container
                sx={{
                    gap: '10px',
                    alignItems: field.type == 'upload' || field.type == 'checkbox' ? "flex-start" : "center"
                }}
            // className={classes.labelValueContainer}
            >
                <Grid item
                    // xs={5.7}
                    // sm={5}
                    // lg={3}
                    className={classes.labelContanier}
                >
                    <Typography className={classes.label}>{field.label}</Typography>
                </Grid>
                <Grid
                    // xs={5.7}
                    // sm={6}
                    // lg={7}
                    sx={field.type == 'upload' ? {
                        display: 'flex',
                        // justifyContent: 'center',
                        // flex: 1,
                        backgroundColor: 'transparent',
                        flexBasis: `${sm ? "30%" : "15%"} !important`,
                        maxWidth: '200px !important'
                    } : {
                        backgroundColor: loading ? 'transparent' : '#F0F2F7'
                    }}
                    className={classes.valueContainer}
                >
                    {loading ? <Skeleton animation="wave" /> : columValue(field, record)}

                </Grid>
            </Grid>

        })}
    </Grid>
}

export default SettingsView;