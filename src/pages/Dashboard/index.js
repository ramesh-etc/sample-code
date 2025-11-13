
import React, { useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { dashboardFilter, reportColumns, dashboardBoxColumns } from "./schema";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Wavinghand from '../../images/dashboard/waving-hand.svg';
import CardElement from "./CardElement";
import TableWrapper from "../../components/TableWrapper";
import CustomisedSnackBar from "../../components/CustomisedSnackBar";
// import Collected from '../../images/dashboard/Collected.svg';
// import Pending from '../../images/dashboard/Pending.svg';
// import Pending1 from '../../images/dashboard/Pending1.svg';
// import Partial from '../../images/dashboard/Partial.svg';
import { useTheme } from "@mui/system";
// import ModalRecordForm from "../../components/ModalRecordForm";
import useStyles from "./styles";
import DateFilter from "./DateFilter";
// import Report from "./Report";
// import { groupBy, flatMap } from 'lodash';
import { spanColor } from "../../utils/tools";
import CommonDialog from "../../components/CommonDialog";

export default function Dashboard(props) {

    const user = useAppSelector((state) => state?.authentication?.user);
    const { actions, columns, name, parentPath, upload, filters, boxActions } = props;
    const { recordsActions, dashboardActions, additionalActions, filterActions, reportActions } = actions;
    const { recordColumns, aditionalColumns, filterColumns, recordFilterColumns } = columns;
    const { recordsActions: recordName, additionalActions: aditionalName, filterActions: filterName, reportActions: reportName } = name;

    const theme = useTheme();
    const xl = useMediaQuery(theme.breakpoints.up('xl'));
    const xs1 = useMediaQuery(theme.breakpoints.up('xs'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const sm1 = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lgdown = useMediaQuery(theme.breakpoints.down('lg'));
    const { loadDashboard, clearDashboardError, getSummary, collectedReportForDate, clearCollectedReport, setHeader, updateReportDetails, loadDashboardError } = dashboardActions || {};

    const { setFilterObj: setReportFilterObj, deleteRecord: deleteReports } = reportActions || {};
    const dashboardRecord = useAppSelector((state) => state?.dashboard?.dashboardrecord) || {};
    const dashboardError = useAppSelector((state) => state?.dashboard?.dashboardError);
    const dashboardLoading = useAppSelector((state) => state?.dashboard?.dashboardLoading);

    const reportFilterObj = useAppSelector((state) => state[reportName]?.filterObj) || { fromDate: new Date(), toDate: new Date() };
    const dashboardFilterError = useAppSelector((state) => state[reportName]?.error) || false;

    const { setFilterObj } = filterActions || {};
    const filterObj = useAppSelector((state) => state[filterName]?.filterObj) || { fromDate: new Date(), toDate: new Date() };
    const filterError = useAppSelector((state) => state[filterName]?.error) || false;


    // const reportFilterObj = useAppSelector((state) => state?.dashboard?.reportFilterObj) || { fromDate: new Date(), toDate: new Date() };
    // const records = useAppSelector(state => state[recordName]?.records) || [];
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [btnLoad, setBtnLoad] = useState(false);
    const [changedFilter, setChangedFilter] = useState("Date Range");;
    const { classes } = useStyles();
    // const parentRef = useRef(null);
    // const childRef = useRef(null);
    // const [scrollPosition, setScrollPosition] = useState(0);
    // const { scrollX, scrollY } = useWindowScrollPositions()

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (parentRef?.current && childRef?.current) {
    //             const parentScrollTop = parentRef?.current.scrollTop;
    //             const childScrollTop = childRef?.current.offsetTop;

    //             // Calculate the scroll position of the child relative to the top of the parent
    //             const relativeScrollPosition = childScrollTop - parentScrollTop;
    //             setScrollPosition(relativeScrollPosition);
    //         }
    //     };

    //     if (parentRef?.current) {
    //         parentRef?.current?.addEventListener('scroll', handleScroll);
    //     }
    //     return () => {
    //         if (parentRef?.current) {
    //             parentRef?.current.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, []);

    useEffect(() => {
        dispatch(loadDashboard({ record: {} }));
    }, [])

    const parentRecordFn = () => {
        dispatch(loadDashboard({ record: {} }));
    }



    return (
        <Grid
            // ref={parentRef}

            sx={{
                height: '100%',
                flexDirection: 'column',
                display: 'flex',
                gap: theme.spacing(2),
            }}>
            <Grid
                // ref={childRef}
                id="dashboardBoxContainer"
                container
                sx={{
                    borderRadius: "20px",
                    border: "1px solid #F8F9FA",
                    background: "#FFF",
                    boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    // padding: (lgdown || records && records.length < 4) ? '25px' : scrollY >= 25 ? '15px' : xl ? '30px' : '25px',
                    // position: (lgdown || records && records.length < 4) ? 'unset' : 'sticky',
                    // top: (lgdown || records && records.length < 4) ? 'auto' : scrollY >= 25 ? xs1 ? `${(38)}px` : sm ? `${(56)}px` : 50 : 0,
                    // zIndex: (lgdown || records && records.length < 4) ? 0 : 1,
                    padding: (lgdown) ? '25px' : xl ? '30px' : '25px',
                    // position: (lgdown || records && records.length < 4) ? 'unset' : 'sticky',
                    // top: (lgdown || records && records.length < 4) ? 'auto' : scrollY >= 25 ? xs1 ? `${(38)}px` : sm ? `${(56)}px` : 50 : 0,
                    // zIndex: (lgdown || records && records.length < 4) ? 0 : 1,
                    transition: 'position 0.3s ease, padding 0.3s ease', // Add a smooth transition
                }}>
                {<Grid item xs={12} sx={{
                    margingBottom: '18px'
                }}>
                    {/* (!lgdown && scrollY < 25 || (lgdown || records && records.length < 4)) ? <Grid item xs={12} sx={{
                    margingBottom: '18px'
                }}> */}
                    <Grid container sx={{
                        justifyContent: 'space-between'
                    }}>
                        <Grid>
                            <Typography variant="bodySpan1" component='p' sx={{
                                fontSize: xl ? '23px' : '20px',
                                fontFamily: 'Poppins-SemiBold',
                                color: spanColor
                            }} className={classes.beforeWelcome}>
                                Hi, <span className={classes.userName}>{user?.name}</span>&nbsp;
                                <img src={Wavinghand} alt='handSlide' className={classes.wavingHand} />
                            </Typography>
                            <Typography variant="bodySpan2" sx={{
                                color: "#96A5B8",
                                fontFamily: 'Poppins-Regular',
                                fontSize: "14px"
                            }}>
                                Welcome back to EzTekPAY!
                            </Typography>
                        </Grid>
                        {/* <Grid sx={{
                            display: 'flex'
                        }}>
                            <Report
                                setFilterObj={setReportFilterObj}
                                filterObj={reportFilterObj}
                                submiterror={dashboardFilterError}
                                fields={reportColumns}
                                reportActions={reportActions}
                                reportName={reportName}
                                parentPath={parentPath}
                                getSummary={getSummary}
                                collectedReportForDate={collectedReportForDate}
                                setHeader={setHeader}
                                updateReportDetails={updateReportDetails}
                                clearCollectedReport={clearCollectedReport}
                                customError={loadDashboardError}
                                deleteReports={deleteReports}
                            />
                        </Grid> */}
                    </Grid>
                </Grid>}

                <Grid item xs={12}>
                    <Grid container sx={{
                        // gap: (lgdown || records && records.length < 4) ? '25px' : scrollY >= 25 ? '15px' : xl ? '30px' : '25px',
                        gap: (lgdown) ? '25px' : xl ? '30px' : '25px',
                    }}>
                        {
                            (dashboardBoxColumns().columns || []).map((col, i) => {

                                const boxData = boxActions[i];
                                // Use lodash to group elements based on the key (e.g., 'test1', 'test2')
                                //                                 const groupedByKeys = groupBy(boxActions, (item) => Object.keys(item)[0]);
                                //                                 console.log('groupedByKeys:', groupedByKeys);
                                //                                 // Extract the values to get the desired result
                                //                                 const boxActionData = flatMap(groupedByKeys[`box${i}`] || [], (item) => Object.values(item)[0]);
                                // const boxData = boxActionData[i];
                                //                                 console.log('test1:', boxData);

                                const { setFilterObj } = boxData?.actions || {};
                                const filterObj = useAppSelector((state) => state[boxData?.name]?.filterObj) || { fromDate: new Date(), toDate: new Date() };
                                const filterError = useAppSelector((state) => state[boxData?.name]?.error) || false;

                                const rightIcon = {
                                    ...(col.rightFilter && col.rightIcon && {
                                        rightTitleIcon: <DateFilter
                                            fields={dashboardFilter}
                                            submiterror={filterError}
                                            btnLabel={'filter'}
                                            loading={btnLoad}
                                            title={'Filter Account(s) Processed'}
                                            form={'filter_box'}
                                            sectionSplit={5}
                                            paperClassName={classes.filterPopper}
                                            handleFilter={(data) => {
                                                setChangedFilter(data?.record ? "Changed" : "Date Range");
                                                dispatch(setFilterObj({
                                                    record: {
                                                        fromDate: data?.record?.fromDate || new Date(),
                                                        toDate: data?.record?.toDate || new Date(),
                                                    }
                                                }))
                                                dispatch(loadDashboard({ record: data?.record || {} }))
                                            }}
                                            btnClass={classes.btnClass}
                                            // setFilterObj={setFilterObj}
                                            filterObj={filterObj}
                                            btnColor={'#3CD856'}
                                            onSubmitClose={true}
                                            filterName={boxData?.name}

                                        />
                                    })
                                }
                                return <Grid
                                    key={i}
                                    sx={{
                                        borderRadius: '16px',
                                        backgroundColor: col.cardColor,
                                        padding: xl ? '30px' : '20px',
                                        // flex: sm1 ? '1 1 auto' : 1
                                    }}
                                    item
                                    xs={12}
                                    md={4}
                                >
                                    <CardElement
                                        data={dashboardRecord}
                                        columns={col.columns}
                                        title={col.title}
                                        cardColor={col.cardColor}
                                        leftTitleIcon={col.leftTitleIcon}
                                        loading={dashboardLoading}
                                        // tableColumns={filterColumns}
                                        parentPath={parentPath}
                                        // recordsActions={filterActions}
                                        // filterName={filterName}
                                        changedFilter={changedFilter}
                                        boxData={boxData}
                                        {...rightIcon}
                                    />
                                </Grid>
                            }
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>

            <TableWrapper
                actions={recordsActions}
                name={recordName}
                columns={recordColumns}
                parentPath={parentPath}
                upload={upload}
                filters={filters}
                parentRecordFn={parentRecordFn}
                additionalActions={additionalActions}
                aditionalName={aditionalName}
                aditionalColumns={aditionalColumns}
                recordFilterColumns={recordFilterColumns}
            />
            {dashboardError ? <CustomisedSnackBar
                message={dashboardError}
                open={dashboardError}
                onClose={() => dispatch(clearDashboardError())}
                autoCloseDuration
                alertStyle={{
                    backgroundColor: '#F03249',
                    color: '#fff',
                    fontSize: '16px'
                }}
                severity={'error'}
            /> : null}

            {/* {showModal ? <ModalRecordForm
                fields={dashboardFilter().columns}
                show={showModal}
                onClose={() => setShowModal(false)}
                submiterror={dashboardError}
                btnLabel={'filter'}
                loading={btnLoad}
                title={'Filter Account(s) Processed'}
                form={'filter_dashboard_form'}
                sectionSplit={6}
                paperClassName={classes.filterPopper}
            /> : null} */}
        </Grid>
    );
}
