

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useStyles from "./boxTableStyles";
import { getDefaultHeaders, RecordsData } from "../../../utils/tools";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ReactTableWrapper from "../../../components/ReactTableWrapper";
import Close from '../../../images/icons/Close.svg';
import CommonDialog from "../../../components/CommonDialog";

const BoxTable = (props) => {
    const { open, onClose, tableActions, name, columns = [], parentPath, filterName, changedFilter } = props;

    const { loadRecordsWithInput, setHeadersData, clearErrors, setDefaultHeadersData } = tableActions || {};
    const [containerHeight, setContainerHeight] = useState(window.innerHeight);
    const records = useAppSelector(state => state[filterName]?.withInputRecords) || [];
    const headers = useAppSelector(state => state[filterName]?.headers) || getDefaultHeaders();
    const loading = useAppSelector(state => state[filterName]?.withInputLoading) || false;
    const totalPageCount = useAppSelector(state => state[filterName]?.totalPageCount) || false;
    const totalPageItems = useAppSelector(state => state[filterName]?.totalPageItems) || false;
    const error = useAppSelector(state => state[filterName]?.error) || false;
    const errormessage = typeof error == 'string' ? error : typeof error == 'object' ? error?.error : error
    const filterObj = useAppSelector((state) => state[filterName]?.filterObj) || { fromDate: new Date(), toDate: new Date() };
    const dataFromDate = moment(filterObj?.fromDate || new Date()).format('YYYY-MM-DD');
    const dataToDate = moment(filterObj?.toDate || new Date()).format('YYYY-MM-DD');
    // const checkFromDate = moment(filterObj?.fromDate || new Date()).isSame(moment(), 'day');
    // const checkToDate = moment(filterObj?.toDate || new Date()).isSame(moment(), 'day');
    const dispatch = useAppDispatch();
    const { classes } = useStyles({ containerHeight: containerHeight });
    // const filterObj1 = useAppSelector((state) => state[filterName]);

    useEffect(() => {
        const handler = () => {
            setContainerHeight(window.innerHeight);
        }
        // Call the handler once to set the initial width
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    useEffect(() => {
        if (tableActions) {
            dispatch(setDefaultHeadersData({ record: getDefaultHeaders() }));
            // dispatch(loadRecordsWithInput({ inputObj: Object.assign({}, { fromDate: dataFromDate, toDate: dataToDate }) }));
            if (changedFilter == "Date Range") {
                dispatch(loadRecordsWithInput({ inputObj: {} }));
            } else {
                dispatch(loadRecordsWithInput({ inputObj: Object.assign({}, { fromDate: dataFromDate, toDate: dataToDate }) }));
            }
        }
    }, [filterName]);

    const handlePageData = (data) => {
        dispatch(setHeadersData({ record: data }));
        if (changedFilter == "Date Range") {
            dispatch(loadRecordsWithInput({ inputObj: {} }));
        } else {
            dispatch(loadRecordsWithInput({ inputObj: Object.assign({}, { fromDate: dataFromDate, toDate: dataToDate }) }));
        }
    }

    return <CommonDialog
        open={open}
        errormessage={errormessage}
        onCloseError={() => dispatch(clearErrors())}
        alertStyle={{
            backgroundColor: '#F03249',
            color: '#fff',
            fontSize: '16px'
        }}
        paperClass={classes.paper}
    >
        <Grid container className={classes.body}>
            <Grid
                className={classes.imgContainer}
            >
                {/* <CloseIcon onClick={onClose} className={classes.closeIcon} /> */}
                <img src={Close} alt='Close.svg' className={classes.img} onClick={onClose} />
            </Grid>
            <Grid className={classes.tableContent}>
                <ReactTableWrapper
                    records={loading ? RecordsData : records}
                    columns={typeof columns == 'function' ? columns(user).columns : columns}
                    tableName={`${filterName} List`}
                    path={parentPath}
                    name={filterName}
                    totalPageCount={totalPageCount}
                    totalPageItems={totalPageItems}
                    onChangeData={handlePageData}
                    headersData={headers}
                    loading={loading}
                    tableClassName={classes.customTable}
                    sticky={true}
                    recordActions={tableActions}
                    noSearch={true}
                />
            </Grid>
        </Grid>

    </CommonDialog>
}

export default BoxTable;