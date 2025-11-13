
import React from "react";
import useStyles from "../styles";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { appColor } from "../../../utils/tools";

const TablePagination = (props) => {
    const { totalPageCount, tableProps, paginationtable } = props;
    const { classes } = useStyles();

    return totalPageCount != 0 && totalPageCount != 1 && paginationtable?.getRowModel()?.rows?.length ? <Grid className={classes.paginationContainer}>
        <ToggleButtonGroup
            exclusive
            size={'small'}
            aria-label="text alignment"
            className={classes.toggleGroup}
        >
            <ToggleButton
                value="left"
                aria-label="left aligned"
                disabled={!paginationtable?.getCanPreviousPage()}
                onClick={tableProps?.handlePreviousPage}
                className={classes.toggleBtn}
            >
                <KeyboardArrowLeftIcon size="small" sx={{
                    fontSize: '18px'
                }} />
                Back
            </ToggleButton>
            {(tableProps?.visiblePages || []).map((page, index, array) => (
                <ToggleButton
                    key={index}
                    value={array[index - 1] + 1 < page ? `${page}` : page}
                    aria-label="centered"
                    // selected={table.getState().pagination.pageIndex === page - 1}
                    selected={tableProps?.currentPageIndex === page - 1}
                    className={classes.toggleBtnNumber}
                    style={{
                        color: tableProps?.currentPageIndex === page - 1 ? appColor : '#6B7280',
                        fontFamily: 'Poppins-Bold'
                    }}
                    onClick={() => tableProps?.navigationBtn(page)}>
                    {/* <span> */}
                    {array[index - 1] + 1 < page ? `${page}` : page}
                    {/* </span> */}
                </ToggleButton>
            ))}
            <ToggleButton
                value="right"
                aria-label="right aligned"
                onClick={tableProps?.handleNextPage}
                disabled={!paginationtable?.getCanNextPage()}
                className={classes.toggleBtn}
            >
                Next
                <KeyboardArrowRightIcon size="small" sx={{
                    fontSize: '18px'
                }} />
            </ToggleButton>
        </ToggleButtonGroup>
    </Grid> : null
}

export default TablePagination;