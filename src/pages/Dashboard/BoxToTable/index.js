
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import useStyles from "./styles";
import BoxTable from "./BoxTable";

const BoxToTable = (props) => {
    const { showValue, columns, name, parentPath, recordsActions, filterName, changedFilter } = props;
    const { classes } = useStyles();
    const [showTable, setShowTable] = useState(false);

    return <>
        <IconButton
            type="button"
            variant="contained"
            size='small'
            className={classes.btn}
            onClick={(e) => showValue ? setShowTable(true) : e.preventDefault()}
        >
            {showValue}
        </IconButton>
        {showTable ? <BoxTable
            open={showTable}
            onClose={() => setShowTable(false)}
            tableActions={recordsActions}
            // name={'collectedInvoices'}
            columns={columns}
            parentPath={parentPath}
            filterName={filterName}
            changedFilter={changedFilter}
        /> : null}
        {/* {showTable ? <Suspense fallback={<Spinner showHeight />}>
            <LazyComp
                open={showTable}
                onClose={() => setShowTable(false)}
                tableActions={tableActions}
                name={'collectedInvoices'}
                columns={columns}
                parentPath={parentPath}
            />
        </Suspense> : null} */}
    </>
}

export default BoxToTable;