
/**
 * Categories Page
 */

import React, { useEffect } from "react";
import { Grid, Tabs, Tab, Paper, useMediaQuery } from "@mui/material";
import useStyles from "./styles";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useTheme } from "@mui/system";

const CategoriesPage = (props) => {
    const { name, parentPath, categories, paperStyle, variant, tabStyle, chileRouteStyle, containerStyle } = props;
    const { classes } = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const selectedTab = location && location.pathname && (categories || []).findIndex(_ => location.pathname.indexOf(`${parentPath}/${_.path}`) > -1) || 0;
    const pathname = location && location.pathname || false;

    useEffect(() => {
        if (selectedTab === -1 && categories && categories.length > 0 && categories[0].path) {
            navigate(`${parentPath}/${categories[0].path}`, { state: location.state });
        }
    }, [selectedTab]);

    const handleTabs = (e, tabIndex) => {
        const category = categories.find((s, i) => i === tabIndex);
        if (category)
            // history.push({ pathname: `${path}/${category.path}`, state: location.state });
            navigate(`${parentPath}/${category.path}`, { state: location.state });
    }

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
                    {(categories || []).map((category, index) => <Tab key={index} label={category && category.data && category.data.title} />)}
                </Tabs>
            </Paper>
        </Grid>
        <Grid item xs={12} className={classes.categoryChildren} sx={chileRouteStyle || {}}>
            <Outlet />
        </Grid>
    </Grid>
}

export default CategoriesPage;