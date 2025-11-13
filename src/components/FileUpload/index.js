/**
 * 
 *  File Upload
 * 
 */

import React, { useCallback, useState, useRef } from 'react';
import * as XLSX from 'xlsx';
// import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import PublishIcon from '@mui/icons-material/Publish';
import DoneIcon from '@mui/icons-material/Done';
import useStyles from './styles';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import ProgressProvider from '../ProgressProvider';
import 'react-circular-progressbar/dist/styles.css';
import { Grid, Button, Paper, Typography } from '@mui/material';
import ErrorMessage from '../Error';
import remotes from '../../redux/upload/remotes';
import { capitalizeFirstLetterOnly, capitalizeFirstWord, dateForma, isPresentInArray } from '../../utils/tools';
import { getContentType, FilesList, extensionsToMimeTypes, FileNameShow } from './utils';
import Icons from '../Icons';
import { appColor } from '../../utils/tools';
import { useAppSelector } from '../../redux/hooks';
// import moment from 'moment';
// import { read, utils } from "xlsx";

function FileUpload(props) {
    const { input, contentType = '*', label, upload, multiple, max, secret, viewFiles, meta: { touched, error, warning }, errorType, removeButton, removeText, checkFirstLast, labelShow, noBorder } = props;

    const [uploadFiles, setuploadFiles] = useState(false);
    const [uploadError, setuploadError] = useState(false);
    const [uploadPercentage, setPercentage] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(1);
    const [totalFiles, setTotalFiles] = useState(false);
    const [lastDroppedFile, setlastDroppedFile] = useState(false);
    const [multipleFiles, setMultipleFiles] = useState([]);
    const hospital = useAppSelector((state) => state?.authentication?.hospital) || [];
    const hospital_name = hospital[0]?.name;

    const inputRef = useRef(false);
    const labelValue = capitalizeFirstWord(label);
    const accept = contentType;

    const uploadToBucket = ({ fileName, fileContentType, files, index }) => {
        const ajax = new XMLHttpRequest();
        const Upload = input.name == 'logo_file' ? remotes.getUploadUrlForHospitalLogo : input?.name == "doc_file" ? remotes.getUploadUrlForDocuments : remotes.getPatientCSVSignature;
        const fileNameForAPI = (fileName && ((input.name == 'logo_file' || input?.name == "doc_file") ? fileName.substring(0, fileName.lastIndexOf('.')) + "_" + Date.now() + fileName.substring(fileName.lastIndexOf('.')) : fileName)) || "";

        Upload(fileNameForAPI, fileContentType)
            .then((result) => {
                const { upload_url: uploadURL, public_url, s3_file_key } = result;

                if (uploadURL) {
                    if (!multiple || (multiple && index == 0)) {
                        setPercentage(10);
                    }
                    ajax.upload.addEventListener("progress", (e) => {
                        return setPercentage(multiple ? parseInt((((e.loaded / e.total) + index) / files.length) * 100) : Math.round((e.loaded / e.total) * 100))
                    }, false);
                    ajax.addEventListener("load", () => {
                        const inputVal = input.name == 'logo_file' ? Object.assign({}, { public_url: public_url, key: s3_file_key }) : input.name == 'doc_file' ? Object.assign({}, { name: fileName, file_key: s3_file_key }) : Object.assign({}, { key: s3_file_key });

                        const inputValue = { name: fileName };
                        if (index === 0) {
                            inputRef.current = [inputVal];
                            setMultipleFiles([inputValue]);
                        } else {
                            inputRef.current.push(inputVal);
                            setMultipleFiles(prev => [...prev, inputValue]);
                        }
                        if ((files.length - 1) === index) {
                            input.onChange(multiple ? inputRef.current : inputRef.current[0]);
                            inputRef.current = false;
                            setUploadedFile(1);
                            setPercentage(multiple ? parseInt(((index + 1) / files.length) * 100) : false);
                            setTotalFiles(false);
                        } else {
                            setUploadedFile(index + 2);
                            setPercentage(multiple ? parseInt(((index + 1) / files.length) * 100) : false);
                            onUpload(files, index + 1);
                        }
                        if (ajax.status >= 200 && ajax.status < 300) {
                            // Request was successful
                            console.log("Upload successful");
                        } else {
                            // Request encountered an HTTP error
                            console.log(`HTTP error: ${ajax.status}`);
                            setuploadError('Upload Failed');
                        }
                    }, false);
                    ajax.addEventListener("error", () => setuploadError('Upload Failed'), false);
                    ajax.addEventListener("abort", () => setuploadError('Upload Failed'), false);
                    ajax.open("PUT", uploadURL, true);
                    ajax.setRequestHeader("Content-Type", fileContentType);
                    ajax.send(files[index]);
                    ajax.onerror = function () {
                        // This will be triggered for network errors, including CORS issues
                        console.log("An error occurred during the request.");
                        setPercentage(false);
                        setuploadError('Upload Failed');
                    };
                } else {
                    setuploadError('Upload Failed');
                }
            })
            .catch((err) => {
                console.log("err = ",);
                setuploadError(`File upload failed. Please check the file ${fileName} and try again.`);
            });
    }


    const onUpload = (files, index) => {
        if (!files || files.length <= index) {
            return false;
        }

        const fileName = files[index].name;
        const fileContentType = getContentType(fileName);
        const extension = fileName && fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase() || '';
        if (input?.name == "patient_import" && ['xls', 'xlsx', 'xlsb', 'xlsm', 'csv'].includes(extension) && checkFirstLast) {

            console.log('Hospital Name :', hospital_name);
            let keysShouldbePresent, keysShouldbePresentExpPhone, keysShouldbePresentExpEmail;

            if (hospital_name?.toLowerCase()?.includes(('alta'))) {
                keysShouldbePresentExpPhone = ["patient first name", "patient last name", 'patient email',
                    'patient dob', 'invoice number', 'balance', 'billeddate'
                ];
                keysShouldbePresentExpEmail = ["patient first name", "patient last name", 'patient phone',
                    'patient dob', 'invoice number', 'balance', 'billeddate'
                ];

            } else {
                keysShouldbePresent = ["first_name", "last_name", "email", "phone_number", "invoice_number", "invoice_amount", "invoice_date", "date_of_birth"];
            }

            let notPresentKeys = [];

            const readFileAsync = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const fileContent = event.target.result;
                        // const workbook = XLSX.read(fileContent, { type: 'binary', cellDates: true, dateNF: "mm/dd/yyyy" });
                        const workbook = XLSX.read(fileContent, { type: 'binary' });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const json = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: "" });
                        resolve(json);
                    };

                    reader.readAsBinaryString(file);
                    reader.onerror = (error) => {
                        reject(error);
                    };
                });
            };

            const promises = files.map(file => readFileAsync(file));

            Promise.all(promises)
                .then(results => {
                    // Combine the arrays from all files (if needed)

                    const uploadedJson = (results && results[0] || []).flat();

                    const totalUploadedJson = (results || []).flat();
                    // const hasInvalidEmail = totalUploadedJson.some(values => {
                    //     const email = values?.email?.trim(); // Trim whitespace from email
                    //     return email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email);
                    // });

                    // const hasInvalidPhone = totalUploadedJson.some(values => values.phone_number && values.phone_number.length != 10);
                    // const hasInvalidDateofBirthFormat = totalUploadedJson.some(values => {
                    //     return values.date_of_birth && !moment(values.date_of_birth, dateFormat, true).isValid()
                    // });
                    // const hasInvalidDateofInvoiceFormat = totalUploadedJson.some(values => values.invoice_date && !moment(values.invoice_date, dateFormat, true).isValid());
                    if (hospital_name?.toLowerCase()?.includes(('alta'))) {
                        let isEmail = isPresentInArray(Object.keys(uploadedJson[0]), "patient email");
                        if (isEmail) {
                            keysShouldbePresentExpPhone.forEach(key => {
                                if (!uploadedJson.some(obj => Object.keys(obj).some(objKey => objKey && objKey.toLowerCase().trim() === key?.toLowerCase()?.trim()))) {
                                    notPresentKeys.push(key);
                                }
                            });
                        }
                        else {
                            keysShouldbePresentExpEmail.forEach(key => {
                                if (!uploadedJson.some(obj => Object.keys(obj).some(objKey => objKey && objKey.toLowerCase().trim() === key?.toLowerCase()?.trim()))) {
                                    notPresentKeys.push(key);
                                }
                            });
                        }
                    }
                    else {
                        keysShouldbePresent.forEach(key => {
                            if (!uploadedJson.some(obj => Object.keys(obj).some(objKey => objKey && objKey.toLowerCase().trim() === key))) {
                                notPresentKeys.push(key);
                            }
                        });
                    };

                    if (results.length > 10001) {
                        setuploadError(<p>
                            The file you have uploaded has exceeded the limit of 10,000 records. Please split the file into segments of 10,000 records each and try uploading again.
                        </p>);
                    }
                    else if (notPresentKeys.length) {
                        setuploadError(<p>Missing column {notPresentKeys.length == 1 ? "name is" : "names are"} {notPresentKeys.join(', ')}. <br /> Please add these {notPresentKeys.length == 1 ? "column" : "columns"} to the CSV file and upload again.</p>);
                    }
                    // else if (hasInvalidEmail) {
                    //     setuploadError(<p>Invalid emails are not allowed.</p>);
                    // }
                    // else if (hasInvalidDateofBirthFormat) {
                    //     setuploadError(<p>Invalid date of birth are not allowed. Please check whether the date is in the correct format({dateFormat}) or invalid date.</p>);
                    // }
                    // else if (hasInvalidDateofInvoiceFormat) {
                    //     setuploadError(<p>Invalid service Date are not allowed. Please check whether the date is in the correct format({dateFormat}) or invalid date.</p>);
                    // }
                    // else if (hasInvalidPhone) {
                    //     setuploadError(<p>Phone number should be 10 digits.</p>);
                    // }
                    else {
                        uploadToBucket({ fileName: fileName, fileContentType: fileContentType, files: files, index: index });
                    }

                })
                .catch(error => {
                    console.error("Error reading files:", error);
                    setuploadError('Error reading files');
                });

        } else {
            uploadToBucket({ fileName: fileName, fileContentType: fileContentType, files: files, index: index });
        }
    }

    const onDrop = useCallback((uploadedFiles) => {
        let acceptedFiles = uploadedFiles.map(file => {

            return new File([file], file.name.replace(/[^a-zA-Z.0-9-_\s+]/g, ""), { type: file.type, lastModified: file.lastModified })
        });

        setlastDroppedFile(acceptedFiles);
        setuploadFiles(false);
        setuploadError(false);
        setPercentage(false);
        setUploadedFile(1);
        setTotalFiles(false);
        setMultipleFiles(false);
        input.onChange(false);
        inputRef.current = false;
        if (acceptedFiles && acceptedFiles.length) {
            if (acceptedFiles.every(file => file && file.size === 0)) {
                setuploadError(`You cannot upload the 0 kb files.`);
                return;
            }
        }

        acceptedFiles = acceptedFiles.filter(file => file && file.size !== 0);
        if (max && acceptedFiles && max < acceptedFiles.length) {
            errorType ? setuploadError(`You cannot upload more than ${max} summary files`) : setuploadError(`If you need to upload more than ${max} files, do it in batches of upto ${max}`);
        } else if (upload) {
            inputRef.current = [];
            setTotalFiles(acceptedFiles.length);
            onUpload(acceptedFiles, 0);
        } else {
            setuploadFiles(acceptedFiles);
            setTimeout(() => input.onChange(acceptedFiles), 1000);
        }
    }, [setuploadFiles, onUpload, setuploadError, upload, input, uploadFiles]);

    const onDropRejected = useCallback((error) => {
        setuploadError(error[0].errors[0].message);
    }, []);

    const handleFileDelete = (fileIndex) => {
        const Files = input.value && input.value.length > 0 && input.value.filter((e, i) => i !== fileIndex) || [];
        if (Files && Array.isArray(Files) && Files.length > 0) {
            setuploadFiles(Files);
            input.onChange(Files);
        } else {
            setuploadFiles(false);
            input.onChange(false);
        }
    }

    const mimeTypeObject = extensionsToMimeTypes(accept);

    const { getRootProps, open, getInputProps
    } = useDropzone({
        onDrop,
        // accept: {
        //     'text/csv': [
        //         '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
        //     ],
        //     // 'text/csv': ['.csv'],
        //     'application/vnd.ms-excel': ['.xls'],
        //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
        // },
        accept: mimeTypeObject,
        multiple, onDropRejected,
        useFsAccessApi: false,
        noClick: (removeText || noBorder)
    });
    // { 'text/csv': ['.csv'], 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }
    const { classes } = useStyles();

    const fileContentType = getContentType(typeof input.value == 'string' ? input.value : (input?.value?.key || ''));

    return <Grid container style={{ width: noBorder ? 'min-content' : '100%' }}>
        {
            labelShow ? <Grid item xs={12} sx={{ marginBottom: ((Array.isArray(contentType) && contentType.every(value => value.includes('image'))) || fileContentType.indexOf('image')) > -1 ? "5px" : "0px" }}>
                <Typography className={classes.label}>{labelValue}</Typography>
            </Grid> : null
        }
        {(input.value && ((Array.isArray(contentType) && contentType.every(value => value.includes('image'))) || fileContentType.indexOf('image')) > -1) ?
            <Grid
                // item
                // xs={12}

                {...getRootProps({ className: 'dropzone' })}
                className={classes.uploadInSettings}
                sx={{
                    cursor: (!removeText && !noBorder) ? 'pointer' : 'unset',
                    textAlign: labelShow ? 'start' : 'center',
                }}
            >
                <input {...getInputProps()} />
                <img src={typeof input.value == 'object' ? input.value?.public_url : input.value} className={classes.image} />
            </Grid> :
            <Grid
                item
                xs={12}
                name="uploadimage"
                {...(getRootProps({ className: 'dropzone' }))}
                className={classes.container1}
                sx={{
                    cursor: (!removeText && !noBorder) ? 'pointer' : 'unset',
                    textAlign: labelShow ? 'start' : 'center',
                }}
            >
                <input
                    {...getInputProps()}
                // {...(!removeText ? getInputProps() : {})}
                // style={!removeText ? {} : { display: 'none' }}
                />
                <Paper className={classes.upload}>
                    <ProgressProvider values={input.value ? [100] : uploadFiles && !uploadError ? [0, 50, 100] : [0]}>
                        {percentage => {
                            return (<CircularProgressbarWithChildren
                                value={uploadPercentage || percentage}
                                className={classes.progress}
                                styles={buildStyles({
                                    pathColor: appColor,
                                    pathTransition:
                                        percentage === 0
                                            ? "none"
                                            : "stroke-dashoffset 0.5s ease 0s"
                                })}>
                                {(uploadPercentage || percentage) && !input.value ? <div className={classes.percentage}>{uploadPercentage || percentage}%</div> : input.value && upload ? <DoneIcon className={classes.icon} /> : <PublishIcon className={classes.icon} />}
                            </CircularProgressbarWithChildren>)
                        }}
                    </ProgressProvider>
                </Paper>
                <Grid className={classes.animate}>
                    <div className={classes.circle} style={{ animationDelay: '0s' }} />
                    <div className={classes.circle} style={{ animationDelay: '1s' }} />
                    <div className={classes.circle} style={{ animationDelay: '2s' }} />
                </Grid>
            </Grid>}
        {!labelShow ?
            <Grid item xs={12} className={classes.container}>
                {/* <Grid container className={classes.container} justify="center" direction="column"> */}
                {!input.value ? <Grid sx={{ marginTop: '15px' }}><Typography component="span">{uploadPercentage || inputRef.current ? null : `Drag ${label === 'MODIFIED TEMPLATE' ? labelValue : label === 'files' ? 'files or folders' : label} to upload`}</Typography></Grid> : null}
                {input.value && removeButton && !removeText && lastDroppedFile && !multiple ?
                    <FileNameShow files={lastDroppedFile} style={{ marginTop: '15px' }} /> : !inputRef.current && input.value && !removeButton ?
                        <Typography component="span">
                            <Button type="button" variant="contained" color="primary" onClick={open} className={classes.button}>
                                {input.value && `Change ${label}` || `Choose ${labelValue}`}
                            </Button>
                        </Typography> :
                        multipleFiles.length && multiple ?
                            <FileNameShow files={lastDroppedFile} multiple={multiple} multipleFiles={multipleFiles} style={{ marginTop: '15px' }} /> :
                            null}
                {input.value && !upload && viewFiles ? <FilesList
                    style={{ justifyContent: 'center', marginTop: '18px' }}
                    onDelete={handleFileDelete}
                    files={input.value}>
                    {(openModal) =>
                        <Typography onClick={openModal} component="span" variant="subtitle2" className={classes.template}>
                            {`View ${labelValue} To Upload:`} <Icons type="Description" className={classes.description} />
                        </Typography>}
                </FilesList> : null}
                {/* </Grid> */}
            </Grid>
            : null}
        {(uploadError || (touched && (error || warning))) && ((!uploadFiles && !uploadPercentage) || multiple) && uploadedFile ? <Grid container className={classes.container}>
            <ErrorMessage errorMessage={uploadError || error || warning}
                alertClassName={{
                    root: classes.customAlertRoot,
                }}
            />
        </Grid> : null}
    </Grid>
}

// FileUpload.propTypes = {
//     children: PropTypes.func,
//     accept: PropTypes.string,
// };

export default FileUpload;