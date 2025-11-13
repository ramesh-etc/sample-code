import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ReactTableWrapper from "../ReactTableWrapper";
import { Grid } from "@mui/material";
import { RecordsData } from "../../utils/tools";
import useStyles from "./styles";
import { useLocation } from "react-router-dom";
import { getDefaultHeaders } from "../../utils/tools";
import CustomisedSnackBar from "../CustomisedSnackBar";

const TableWrapper = (props) => {
    const { actions, name, columns, parentPath, view, create, upload, filters, parentRecordFn, additionalActions, aditionalName, aditionalColumns, recordFilterColumns, initialFilter } = props;
    const location = useLocation();
    const { classes } = useStyles();
    const user = useAppSelector(state => state?.authentication?.user);
    const { loadRecords, setHeadersData, createRecord, clearRecord, clearNotifications, clearInitial, updateRecord, deleteRecord, loadRecord, clearErrors, loadRecordsMetaData, setDefaultHeadersData } = actions || {};
    const records = useAppSelector(state => state[name]?.records) || [];
    const headers = useAppSelector(state => state[name]?.headers) || getDefaultHeaders();
    const loading = useAppSelector(state => state[name]?.loading) || false;
    // const updateLoader = useAppSelector(state => state[name]?.updateLoader) || false;
    const totalPageCount = useAppSelector(state => state[name]?.totalPageCount) || false;
    const totalPageItems = useAppSelector(state => state[name]?.totalPageItems) || false;
    const error = useAppSelector(state => state[name]?.error) || false;
    const errormessage = typeof error == 'string' ? error : typeof error == 'object' ? error?.error : error;
    const success = useAppSelector(state => state[name]?.success) || false;
    const successmessage = typeof success == 'string' ? success : typeof success == 'object' ? success?.success : success;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(clearNotifications());
        dispatch(setDefaultHeadersData({ record: getDefaultHeaders() }));
        dispatch(loadRecords());
    }, [name]);

    const handlePageData = (data) => {
        dispatch(setHeadersData({ record: data }));
        dispatch(loadRecords());
    }

    const loadAfterCreate = () => {
        dispatch(setDefaultHeadersData({ record: getDefaultHeaders() }));
        dispatch(loadRecords());
    }

    const parentFn = () => {
        if (parentRecordFn) {
            parentRecordFn();
        }
        loadAfterCreate();
    }

    const createName = name == 'objetions' ? 'Objection' : name == 'users' ? 'User' : name;

    const handleCreate = ({ data, loaderFn, closePopup }) => {
        // dispatch(createRecord({
        //     record: data,
        //     parentFn: () => {
        //         closePopup();

        //     }, loaderFn: loaderFn,
        //     closePopup: () => {
        //         closePopup();
        //     }
        // }));
    }

    return <Grid name="TableWrapper" sx={{
        overflow: 'auto'
    }}>
        <ReactTableWrapper
            records={loading ? RecordsData : records}
            columns={typeof columns == 'function' ? columns(user).columns : columns}
            tableName={`${name} List`}
            path={parentPath}
            name={name}
            locationState={location.state}
            view={view}
            create={create}
            upload={upload}
            filters={filters}
            createName={createName}
            parentPath={parentPath}
            totalPageCount={totalPageCount}
            totalPageItems={totalPageItems}
            onChangeData={handlePageData}
            headersData={headers}
            loading={loading}
            parentRecordFn={parentFn}
            handleCreate={handleCreate}
            // clearRecord={clearRecord}
            // createRecord={createRecord}
            additionalActions={additionalActions}
            aditionalName={aditionalName}
            // clearNotifications={clearNotifications}
            aditionalColumns={aditionalColumns}
            // clearInitial={clearInitial}
            recordActions={actions}
            recordFilterColumns={recordFilterColumns}
            initialFilter={initialFilter}
        // deleteRecord={deleteRecord}
        // updateRecord={updateRecord}
        // loadRecord={loadRecord}
        // updateLoader={updateLoader}
        />
        {errormessage || successmessage ? <CustomisedSnackBar
            message={errormessage || successmessage}
            open={errormessage || successmessage}
            onClose={() => dispatch(clearErrors())}
            autoCloseDuration
            alertStyle={errormessage ? {
                backgroundColor: '#F03249',
                color: '#fff',
                fontSize: '16px'
            } : {
                backgroundColor: '#2DC146',
                color: '#fff',
                fontSize: '16px'
            }}
            severity={successmessage ? 'success' : 'error'}
        /> : null}
    </Grid>
}

export default TableWrapper;