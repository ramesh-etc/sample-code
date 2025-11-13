
/**
 * Categories Page
 */

import React from "react";
import { Grid, Tabs, Tab, Paper, useMediaQuery } from "@mui/material";
import useStyles from "./styles";
// import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useTheme } from "@mui/system";

const TabComponent = (props) => {
    const { name, parentPath, categories, paperStyle, variant, tabStyle, chileRouteStyle, containerStyle, children, selectedTab, setSelectedTab, handleTabs } = props;
    const { classes } = useStyles();
    // const location = useLocation();
    // const navigate = useNavigate();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));


    return <Grid container id={name} sx={containerStyle || {}}>
        <Grid item xs={12}>
            <Paper square className={classes.paper} sx={paperStyle || {}}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabs}
                    className={classes.tabs}
                    // variant={md ? "fullWidth" : "standard"}
                    variant={variant || "fullWidth"}
                    scrollButtons={false}
                    // variant={'fullWidth'}
                    sx={tabStyle || {}}
                    indicatorColor="primary"
                    textColor="primary">
                    {(categories || []).map((category, index) => <Tab key={index} label={category && category.title} />)}
                </Tabs>
            </Paper>
        </Grid>
        <Grid item xs={12} className={classes.categoryChildren} sx={chileRouteStyle || {}}>
            {children}
        </Grid>
    </Grid>
}

export default TabComponent;