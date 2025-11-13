import { Grid } from "@mui/material";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
// import { useAppDispatch } from "../../redux/hooks";
import TableWrapper from '../../components/TableWrapper';

function RecordsPage(props) {

    const { actions, name, columns, parentPath, view, edit, create, upload, filters, initialFilter } = props;
    const { recordsActions, aditionalActions, } = actions;
    const { recordColumns, aditionalColumns, recordFilterColumns } = columns;
    const { recordsActions: recordName, aditionalActions: aditionalName } = name;
    const location = useLocation();
    const { pathname } = location;
    const childActivated = pathname !== `${parentPath}`;
    return <Grid container sx={{
        flexDirection: 'column',
        overflow: 'auto'
    }}>
        {/* <Outlet /> */}
        {
            // childActivated ?
            // <Outlet />
            // :
            <Grid>
                <TableWrapper
                    actions={recordsActions}
                    name={recordName}
                    columns={recordColumns}
                    parentPath={parentPath}
                    view={view}
                    create={create}
                    upload={upload}
                    filters={filters}
                    recordFilterColumns={recordFilterColumns}
                    initialFilter={initialFilter}
                />
            </Grid>}
    </Grid>
}
export default RecordsPage;
