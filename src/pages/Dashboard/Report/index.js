

import React, { useState } from "react";
import useStyles from "./styles";
import { Button } from "@mui/material";
// import ReportSvg from '../../../images/dashboard/Report.svg';
import ReportTable from "./ReportTable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { dateFormat, getDefaultHeaders } from "../../../utils/tools";
import sample from "../PdfCreator";
import EzTekPAYLogo from '../../../images/EzTekPAY.svg';
import { getUploadUrlforGeneratedReport } from "../../../redux/upload/remotes";
import { uploadFile } from "../../../utils/api";
import moment from "moment";

const Report = (props) => {
    const { fields, submiterror, setFilterObj, filterObj, reportActions, reportName, parentPath, getSummary, collectedReportForDate, setHeader, updateReportDetails, clearCollectedReport, customError, deleteReports } = props;

    const [showModal, setShowModal] = useState(false);
    const [btnLoad, setBtnLoad] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [openStepper, setOpenStepper] = React.useState(false);

    const { classes } = useStyles();
    const dispatch = useAppDispatch();
    // const totalPageCount = useAppSelector((state) => state?.dashboard?.totalPageCount) || false;
    // const totalPageItems = useAppSelector((state) => state?.dashboard?.totalPageItems) || -1;
    // const current_page = useAppSelector((state) => state?.dashboard?.current_page) || 1;
    // const headers = useAppSelector((state) => state?.dashboard?.headers) || getDefaultHeaders();
    // const summary = useAppSelector((state) => state?.dashboard?.summary) || {};
    // const collectedreport = useAppSelector((state) => state?.dashboard?.collectedreport) || [];

    const hospital = useAppSelector((state) => state?.authentication?.hospital);
    const hospital_name = (hospital[0] && hospital[0].name || "").replace(/ /g, '-');

    const { loadRecords, setHeadersData, clearErrors, setDefaultHeadersData } = reportActions || {};

    const dataFromDate = moment(filterObj?.fromDate || new Date()).format('YYYY-MM-DD');
    const dataToDate = moment(filterObj?.toDate || new Date()).format('YYYY-MM-DD');

    var c1 = document.createElement('canvas');
    var base64String1 = "";
    var img1 = document.getElementById('EzTekPAYLogo');
    if (img1) {

        c1.height = img1.naturalHeight;
        c1.width = img1.naturalWidth;
        var ctx1 = c1.getContext('2d');

        ctx1.drawImage(img1, 0, 0, c1.width, c1.height);
        base64String1 = c1.toDataURL();
    }

    // useEffect(() => {
    //     if (collectedreport.length) {
    //         if (current_page != totalPageCount) {
    //             dispatch(setHeader({ record: { offset: (headers.offset + 1) + headers.limit, page: headers.page + 1, limit: 25 } }));
    //             dispatch(collectedReportForDate({
    //                 record: {
    //                     fromDate: dataFromDate,
    //                     toDate: dataToDate
    //                 },
    //                 closeStepper: () => {
    //                     setActiveStep(0);
    //                     setOpenStepper(false);
    //                 }
    //             }));
    //         } else if (current_page == totalPageCount) {
    //             generateReport({ data: { logo: base64String1, collectedreport: collectedreport, summary: summary } })
    //         }
    //     }
    // }, [collectedreport, current_page, totalPageCount])



    const getPdfBlob = async (pdf, record, downloadUrl) => {

        try {
            const blob = await new Promise((resolve) => {
                pdf.getBlob((blob) => {
                    resolve(blob);
                });
            });
            setActiveStep(2);
            let fromDate = moment(record?.fromDate || new Date()).format('YYYY-MM-DD');
            let toDate = moment(record?.toDate || new Date()).format('YYYY-MM-DD');
            const report_name = `${fromDate}-to-${toDate}-${hospital_name}-EzTekPay-Report.pdf`;

            const result = await getUploadUrlforGeneratedReport(report_name, "application/pdf");
            const { uploadURL, s3_file_key } = result || {};

            if (uploadURL) {
                await uploadFile(uploadURL, blob, "application/pdf");
                dispatch(updateReportDetails({
                    record: {
                        "start_date": fromDate,
                        "end_date": toDate,
                        "s3_file_key": s3_file_key,
                        "name": report_name
                    },
                    closeStepper: () => {
                        downloadUrl();
                        setOpenStepper(false);
                        dispatch(setDefaultHeadersData({ record: getDefaultHeaders() }));
                        dispatch(loadRecords());
                    }
                }));
            }
        } catch (err) {
            const error = err?.message ? err?.message : "Failed to Create pdf";
            dispatch(customError({ error: error }));
            setActiveStep(0);
            setOpenStepper(false);
        }
    }

    // const generateReport = ({ data }) => {
    //     setOpenStepper(true);
    //     setActiveStep(1);
    //     const { logo, collectedreport, summary } = data;
    //     const pdf = sample({ logo: logo, collectedreport: [...collectedreport, ...collectedreport, ...collectedreport, ...collectedreport, ...collectedreport, ...collectedreport, ...collectedreport], summary: summary });
    //     getPdfBlob(pdf);
    // }

    const retrivingRecords = ({ data }) => {
        dispatch(collectedReportForDate({
            record: data?.record || {
                fromDate: moment(new Date()).format(dateFormat),
                toDate: moment(new Date()).format(dateFormat)
            },
            closeStepper: () => {
                setActiveStep(0);
                setOpenStepper(false);
            },
            stepChange: ({ summary, collectedreport, record }) => {
                setOpenStepper(true);
                setActiveStep(1);
                const pdfObj = sample({
                    logo: base64String1,
                    collectedreport: collectedreport,
                    fromDate: moment(record?.fromDate || new Date()).format('YYYY-MM-DD'),
                    toDate: moment(record?.toDate || new Date()).format('YYYY-MM-DD'),
                    hospital_name: hospital_name,
                    // collectedreport: [...collectedreport, ...collectedreport, ...collectedreport, ...collectedreport, ...collectedreport, ...collectedreport, ...collectedreport],
                    summary: summary,
                    record: record
                });
                getPdfBlob(pdfObj.pdf, record, pdfObj.downloadUrl);
            }
        }))
    }

    const handleFilter = (data) => {
        dispatch(setFilterObj({
            record: {
                fromDate: data?.record?.fromDate || new Date(),
                toDate: data?.record?.toDate || new Date(),
            }
        }));
        dispatch(clearCollectedReport());
        setOpenStepper(true);
        setActiveStep(0);
        dispatch(getSummary({
            record: data?.record || {
                fromDate: moment(new Date()).format(dateFormat),
                toDate: moment(new Date()).format(dateFormat)
            }, parentFn: () => retrivingRecords({ data: data })
        }));
        dispatch(setHeader({ record: getDefaultHeaders() }));


    }

    return <>
        {/* <Typography
            variant="bodySpan2"
            className={classes.btnText}
        >
            Generate Report
        </Typography>
        <IconButton
            className={classes.iconBtn}
            onClick={() => setShowModal(true)}
        >
            <img src={ReportSvg} alt='Report svg' />
        </IconButton> */}
        <Button
            className={classes.btn}
            onClick={() => setShowModal(true)}
        >
            Report
        </Button>
        {showModal ?
            <ReportTable
                open={showModal}
                onClose={() => setShowModal(false)}
                reportActions={reportActions}
                btnLoad={btnLoad}
                fields={fields}
                filterObj={filterObj}
                setFilterObj={setFilterObj}
                handleFilter={handleFilter}
                reportName={reportName}
                submiterror={submiterror}
                parentPath={parentPath}
                activeStep={activeStep}
                openStepper={openStepper}
                clearCollectedReport={clearCollectedReport}
                customError={customError}
                deleteReports={deleteReports}
            />
            : null}
        <img src={EzTekPAYLogo} alt='Eztekpaylogo svg' style={{ display: 'none' }} id='EzTekPAYLogo' />
    </>
}

export default Report;