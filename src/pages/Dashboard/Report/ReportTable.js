
import React, { useState, useEffect } from "react";
import useStyles from "./reportTableStyles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CommonDialog from "../../../components/CommonDialog";
import Close from '../../../images/icons/Close.svg';
import DateFilter from "../DateFilter";
import { appColor, getDefaultHeaders } from "../../../utils/tools";
import { RecordsData } from "../../../utils/tools";
import ReactTableWrapper from "../../../components/ReactTableWrapper";
import { IconButton, Grid } from "@mui/material";
// import sample from "../PdfCreator";

import TransitionsModal from "./Modal";

const ReportTable = (props) => {
    const { open, onClose, reportActions, btnLoad, fields, filterObj, setFilterObj, reportName, parentPath, submiterror, handleFilter, activeStep, openStepper, clearCollectedReport, customError, deleteReports } = props;

    const [containerHeight, setContainerHeight] = useState(window.innerHeight);

    const dispatch = useAppDispatch();
    const { classes } = useStyles({ containerHeight: containerHeight });

    const { loadRecords, setHeadersData, clearErrors, setDefaultHeadersData } = reportActions || {};

    const records = useAppSelector(state => state[reportName]?.records) || [];
    const headers = useAppSelector(state => state[reportName]?.headers) || getDefaultHeaders();
    const loading = useAppSelector(state => state[reportName]?.loading) || false;
    const totalPageCount = useAppSelector(state => state[reportName]?.totalPageCount) || false;
    const totalPageItems = useAppSelector(state => state[reportName]?.totalPageItems) || false;
    const error = useAppSelector(state => state[reportName]?.error) || false;
    const errormessage = typeof error == 'string' ? error : typeof error == 'object' ? error?.error : error;

    // const dataFromDate = moment(filterObj?.fromDate || new Date()).format('YYYY-MM-DD');
    // const dataToDate = moment(filterObj?.toDate || new Date()).format('YYYY-MM-DD');
    // const checkFromDate = moment(filterObj?.fromDate || new Date()).isSame(moment(), 'day');
    // const checkToDate = moment(filterObj?.toDate || new Date()).isSame(moment(), 'day');

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
        if (reportActions) {
            dispatch(setDefaultHeadersData({ record: getDefaultHeaders() }));
            dispatch(loadRecords());
            dispatch(clearCollectedReport());
        }
    }, [reportName]);

    const handlePageData = (data) => {
        dispatch(setHeadersData({ record: data }));
        dispatch(loadRecords());
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
                <IconButton
                    className={classes.iconBtn}
                >
                    <img src={Close} alt='Close.svg' className={classes.img} onClick={onClose} />
                </IconButton>
            </Grid>
            {/* <Button onClick={() => sample({ logo: base64String1 })}>
                sample pdf
            </Button> */}

            {/* <Grid
            // className={classes.formcontent}
            >
                <DateFilter
                    fields={fields.filter(_ => _.editRecord)}
                    submiterror={submiterror}
                    btnLabel={'Generate'}
                    loading={btnLoad}
                    title={'Generate Report'}
                    form={'report_filter'}
                    sectionSplit={5}
                    paperClassName={classes.filterPopper}
                    handleFilter={handleFilter}
                    setFilterObj={setFilterObj}
                    filterObj={filterObj}
                    btnColor={appColor}
                    btnClass={classes.btnClass}
                    onSubmitClose={true}
                    btnContent={<span>Generate Report</span>}
                />
            </Grid> */}

            <Grid
                className={classes.tableContent}
            >
                <ReactTableWrapper
                    records={loading ? RecordsData : records}
                    columns={(typeof fields === 'function' ? fields({ generateError: customError, dispatch: dispatch }).columns : fields)}
                    tableName={`${reportName} List`}
                    path={parentPath}
                    name={reportName}
                    totalPageCount={totalPageCount}
                    totalPageItems={totalPageItems}
                    onChangeData={handlePageData}
                    headersData={headers}
                    loading={loading}
                    tableClassName={classes.customTable}
                    sticky={true}
                    deleteRecord={deleteReports}
                    recordActions={reportActions}
                    tableCreateBtn={<DateFilter
                        fields={(props) => fields(Object.assign({}, { ...props }, { generateError: customError, dispatch: dispatch }))}
                        submiterror={submiterror}
                        btnLabel={'Generate'}
                        loading={btnLoad}
                        title={'Generate Report'}
                        form={'report_filter'}
                        sectionSplit={5}
                        paperClassName={classes.filterPopper}
                        handleFilter={handleFilter}
                        setFilterObj={setFilterObj}
                        filterObj={filterObj}
                        btnColor={appColor}
                        btnClass={classes.btnClass}
                        onSubmitClose={true}
                        btnContent={"Generate Report"}
                    />}
                    create={true}
                    noSearch={true}
                />
            </Grid>

            <TransitionsModal
                open={openStepper}
                activeStep={activeStep}
            />
        </Grid>

    </CommonDialog>
}

export default ReportTable;