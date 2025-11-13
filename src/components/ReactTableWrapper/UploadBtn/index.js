import React, { useEffect } from "react";
import UploadCloud from '../../../images/icons/UploadCloud.svg';
import useStyles from './styles';
import { Button, useMediaQuery } from '@mui/material';
import ModalRecordForm from '../ModalRecordForm';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import ReactTanstackTable from '../../ReactTanstackTable';
// import ReactTableWrapper from "..";
import { useTheme } from "@mui/system";
import { appColor } from "../../../utils/tools";
// import { getFormValues } from "redux-form";
import AdditionRecords from "../AdditionalRecords";

const UploadBtn = (props) => {
    const { uploadName, upload, name, aditionalName, additionalActions, recordColumns, parentRecordFn, aditionalColumns, clearInitial, clearNotifications, clearRecord, metaData, tableName, createRecord } = props;
    const [modalopen, setModalopen] = React.useState(false);
    const [btnLoad, setBtnLoad] = React.useState(false);
    const [showTable, setShowTable] = React.useState(false);
    const [selectedTable, setSelectedTable] = React.useState(false);
    // const [containerHeight, setContainerHeight] = React.useState(getOffset('dashboardBoxContainer'));
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    // const { loadRecords } = aditionalActions || {};
    const selectors = useAppSelector(state => state[name]);
    const selectors2 = useAppSelector(state => state[aditionalName]);
    // const formselector = useAppSelector(state => getFormValues(`createdDate_${name}`)(state));
    const user = useAppSelector((state) => state?.authentication?.user);

    const dispatch = useAppDispatch();

    const { message_interval, reminder_time, reminder_repeats } = user || {};
    const sendMessageAt = user?.reminder_time == "15:00:00" ? '9 AM CT' : user?.reminder_time == "18:00:00" ? '12 PM CT' : user?.reminder_time == "22:00:00" ? '4 PM CT' : "";

    const record = selectors?.record || {};
    const initial = selectors?.initial || {};
    // const uploadError = record?.invoices_skipped ? `${record?.invoices_skipped} ${record?.invoices_skipped == 1 ? "duplicate" : "duplicates"} skipped` : "";
    const updateError = selectors?.updateError && typeof selectors?.updateError != 'string' && (selectors?.updateError?.createdDate_invoices) || "";
    // const failedString = record?.failed_data ? `${record?.failed_data.length} ${record?.failed_data.length == 1 ? "record" : "records"} failed` : "";
    const uploadError = (record?.invoices_skipped || record?.failed_data?.length) ? `${(record?.invoices_skipped || 0) + (record?.failed_data?.length || 0)} ${((record?.invoices_skipped || 0) + (record?.failed_data?.length || 0)) == 1 ? "account" : "accounts"} skipped` : false;
    const defaultRecords = {
        ...(record?.invoices_skipped && { duplicates: record?.skipped_data }),
        ...((record?.failed_data && record?.failed_data?.length) && { failed: record?.failed_data }),
    }
    // const uploaded = record?.invoices_created ? `You have added ${record?.invoices_created} ${record?.invoices_created == 1 ? "account" : "accounts"}. <br/>
    // EzTekPAY will send the initial email to these accounts in the next 15 minutes. After the initial email, EzTekPAY will follow up these customers using SMS and email once in 3 days.
    // ` : "";
    const uploaded = record?.invoices_created ? `You have added ${record?.invoices_created} ${record?.invoices_created == 1 ? "account" : "accounts"}.<br/>EzTekPAY will send the initial email and SMS to these accounts at ${sendMessageAt}. After the initial message, EzTekPAY will follow up these customers using email and SMS once in ${message_interval || ""} days at ${sendMessageAt} up to ${reminder_repeats || ""} times.` : "";
    const updated = record?.invoices_updated ? `You have updated ${record?.invoices_updated} ${record?.invoices_updated == 1 ? "account" : "accounts"}.` : "";

    // const errorMessage = typeof selectors?.updateError != 'string' && (updateError?.upload_form) || updateError;
    const formselectors = useAppSelector(state => state["form"]);
    const { records = [], headers, loading, totalPageCount, totalPageItems } = selectors2 || {};

    const { classes } = useStyles();

    useEffect(() => {
        dispatch(clearRecord());
        setShowTable(false);
    }, [])

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setContainerHeight(getOffset('dashboardBoxContainer'));
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // useEffect(() => {

    //     let timeoutId;
    //     if (upload) {
    //         if (uploadError) {
    //             clearTimeout(timeoutId);
    //         }
    //         else if (Object.keys(initial).length) {
    //             timeoutId = setTimeout(() => {
    //                 if (!uploadError && !showTable) {
    //                     console.log("entere345 = ", showTable);
    //                     setModalopen(false);
    //                     if (parentRecordFn) {
    //                         parentRecordFn();
    //                     }
    //                 }
    //             }, 2500);
    //         }
    //     }
    //     return () => clearTimeout(timeoutId);
    // }, [uploadError, showTable, initial])
    // const handleCreatedDate = (data, dispatch, { form }) => {
    //     setBtnLoad(true);

    //     let parentFn = () => {
    //         setModalopen(false);
    //         if (parentRecordFn) {
    //             parentRecordFn();
    //         }
    //     }
    //     dispatch(createRecord({
    //         record: data.patient_import,
    //         // parentFn: parentFn,
    //         loaderFn: () => {
    //             setBtnLoad(false);
    //         },
    //         form: form
    //     }));

    // }

    const handleUpload = (data, dispatch, { form }) => {
        setBtnLoad(true);
        let parentFn = (successRecord) => {
            let timeoutId;
            // if (name == "invoices") {
            //     if (successRecord && successRecord?.invoices_updated && !successRecord?.invoices_created && !successRecord?.invoices_skipped) {
            //         timeoutId = setTimeout(() => {
            //             setModalopen(false);
            //             if (parentRecordFn) {
            //                 parentRecordFn();
            //             }
            //         }, 2500);
            //     } else {
            //         clearTimeout(timeoutId);
            //     }
            // } else
            if (name == "docs") {
                setModalopen(false);
            }
        }
        dispatch(createRecord({
            record: data?.patient_import || data?.doc_file,
            parentFn: parentFn,
            loaderFn: () => {
                setBtnLoad(false);
            },
            form: form
        }));

    }

    const closeAlert = {
        ...(updateError && { clearNotifications: () => dispatch(clearNotifications()) })
    }

    return (<>
        {upload ? <Button
            className={classes.createbtn}
            onClick={() => {
                setModalopen(true);
                dispatch(clearRecord());
                dispatch(clearInitial());
            }}
            // outlined
            startIcon={<img src={UploadCloud} alt='upload' />}
        >
            {`Upload ${uploadName}`}
        </Button> : null}


        {upload && modalopen ? <ModalRecordForm
            initialValues={Object.assign({}, name == "docs" ? {} : { patient_import: Object.keys(initial).length ? initial : '' })}
            show={modalopen}
            onClose={() => {
                setModalopen(false);
                dispatch(clearInitial());
                dispatch(clearRecord());
                if (parentRecordFn && (uploadError || uploaded || updated)) {
                    parentRecordFn();
                }
                setShowTable(false);
            }}
            title={showTable ? (selectedTable || "") : (uploaded) ? "" : `Upload ${uploadName}`}
            fields={recordColumns.map(field => {
                if (field.editRecord && field.type === 'upload') {
                    return {
                        ...field,
                        onChange: () => {
                            setShowTable(false);
                            dispatch(clearRecord());
                        },
                        removeText: uploadError || uploaded || updated
                    };
                }
                return field;
            }).filter(_ => _.editRecord)}
            form={`createdDate_${name}`}
            onSubmit={handleUpload.bind(this)}
            divider={true}
            dialogContentClass={classes.dialogContent}
            // onSubmitClose
            btnLabel="Upload"
            metaData={metaData}
            disableContainer
            className={classes.flexDiv}
            sumiterrorAction={uploadError}//uploadError
            removeCancel={true}
            paperStyle={uploaded && !showTable ? {
                maxWidth: '50%',

            } : name == "docs" ? { maxWidth: sm ? '95%' : '50%', } : {}}
            // style={{
            //     width: '100%',
            //     maxWidth: '100vw',
            //     maxHeight: '100%',
            //     position: 'fixed',
            //     top: '50%',
            //     left: '0',
            //     transform: 'translate(0, -50%)',
            //     overflowY: 'auto'
            // }}
            submiterrorActionComp={<Button
                sx={{
                    backgroundColor: 'transparent !important',
                    height: 'auto',
                    textTransform: 'capitalize',
                    color: appColor,
                    boxShadow: 'none  !important',
                    border: 'none  !important',
                    padding: 0
                }}
                size="small"
                onClick={() => {
                    setShowTable(true);
                }}

            >
                View Details
            </Button>}
            showTable={showTable}
            // tableComp={<ReactTanstackTable
            //     records={record?.skipped_data || []}
            //     columns={typeof aditionalColumns == 'function' ? aditionalColumns().columns : aditionalColumns}
            //     tableName={`${tableName}`}
            //     name={tableName}
            //     // locationState={location.state}
            //     headersData={headers}
            //     totalPageCount={totalPageCount}
            //     totalPageItems={totalPageItems}
            //     noHeader={true}
            //     headerStyle={{ fontSize: '12px' }}
            //     bodyStyle={{ fontSize: '12px' }}
            // />}
            tableComp={<AdditionRecords
                // records={record?.skipped_data || []}
                // columns={typeof aditionalColumns == 'function' ? aditionalColumns().columns : aditionalColumns}
                // tableName={`${tableName}`}
                // name={tableName}
                // // locationState={location.state}
                // headersData={headers}
                // totalPageCount={totalPageCount}
                // totalPageItems={totalPageItems}
                // noHeader={true}
                // headerStyle={{ fontSize: '12px' }}
                // bodyStyle={{ fontSize: '12px' }}
                additionalActions={additionalActions}
                defaultRecords={defaultRecords}
                setSelectedTable={setSelectedTable}
            />}
            uploadError={(!showTable && uploadError)}
            updateError={updateError}
            loading={btnLoad}
            notes={!showTable && uploaded ? uploaded : ''}
            showActions={!showTable && !uploaded}
            showFields={!showTable && !uploaded}
            updatedNotes={!showTable && updated ? updated : ""}
            valueBasedDisable={!(formselectors?.[`createdDate_${name}`] && formselectors?.[`createdDate_${name}`].values && (name == "docs" && formselectors?.[`createdDate_${name}`].values.doc_file || name == "invoices" && formselectors?.[`createdDate_${name}`].values.patient_import))}
            fieldChange={() => {
                setShowTable(false);
                dispatch(clearRecord());
            }}
            {...closeAlert}
        />
            : null}
    </>)
}

export default UploadBtn;