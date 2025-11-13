
import React from 'react';
import moment from 'moment';
import { AsYouType } from 'libphonenumber-js';
import { dateFormat, tableDataColor } from '../utils/tools';
import CSVIcon from '../images/icons/CsvFile.svg';
import { IconButton, Tooltip } from '@mui/material';
import Info from '../images/icons/info.svg';

function schema() {
    function users(record = {}) {
        return {
            columns: [
                {
                    id: 1,
                    value: 'name',
                    label: 'Name',
                    editRecord: true,
                    viewMode: true,
                    visible: true,
                    mandatory: true,
                    // sort: true,
                    type: 'input'
                },
                {
                    id: 2,
                    value: 'email',
                    label: 'Email',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true,
                },
                {
                    id: 3,
                    value: 'password',
                    label: 'Password',
                    editRecord: true,
                    viewRecord: false,
                    viewMode: true,
                    visible: false,
                    type: 'password',
                    mandatory: {
                        create: true
                    }
                },
                {
                    id: 4,
                    value: 'phone_number',
                    label: 'Phone Number',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    width: '120px',
                    type: 'phone',
                    html: (row) => <>{row.phone_number && new AsYouType('US').input(row.phone_number) || row.phone_number}</>,
                    mandatory: true,
                },
                // {
                //     id: 5,
                //     value: 'role',
                //     label: 'Role',
                //     editRecord: true,
                //     viewRecord: true,
                //     viewMode: true,
                //     visible: true,
                //     type: 'select',
                //     mandatory: true,
                //     options: [
                //         {
                //             label: 'Customer',
                //             value: 'customer'
                //         },
                //     ]
                // },
                // {
                //     id: 6,
                //     value: 'is_admin',
                //     label: 'Admin',
                //     editRecord: false,
                //     viewRecord: true,
                //     viewMode: false,
                //     visible: true,
                //     // sort: true,
                //     visible: true,
                //     html: (row) => row['is_admin'] ? 'Yes' : 'No',
                //     type: 'checkbox'
                // },
                {
                    id: 5,
                    value: 'role',
                    label: 'User Type',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'select',
                    mandatory: true,
                    info: 'Normal user can only do uploads, Admin user can access to all features',
                    html: (row, rowValue) => <span style={{ textTransform: 'capitalize' }}>{rowValue == "admin" ? 'Admin' : rowValue == "fileUploader" ? 'Normal User' : rowValue == "customer" ? "Admin" : rowValue}</span>,
                    options: [
                        {
                            label: 'Admin',
                            value: 'admin'
                        },
                        {
                            label: 'Normal User',
                            value: 'fileUploader'
                        },
                    ]
                },
                // {
                //     id: 7,
                //     value: 'is_admin',
                //     label: 'Make a user an Admin',
                //     editRecord: true,
                //     viewRecord: false,
                //     viewMode: false,
                //     visible: false,
                //     width: "100px",
                //     visible: false,
                //     type: 'checkbox'
                // },
                {
                    id: 8,
                    value: 'action',
                    label: 'Actions',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    // sort: true,
                    visible: true,
                    edit: true,
                    delete: true,
                    width: "75px",
                    type: 'action'
                },
                // {
                //     id: 8,
                //     value: 'email_notification',
                //     label: 'Email Notification',
                //     editRecord: true,
                //     viewRecord: true,
                //     viewMode: true,
                //     visible: true,
                //     type: 'checkbox'
                // }
            ],
        }
    }

    function adminUsers(record = {}) {
        return {
            columns: [
                {
                    id: 1,
                    value: 'name',
                    label: 'Name',
                    editRecord: true,
                    viewMode: true,
                    visible: true,
                    mandatory: true,
                    sort: true,
                    sortColumn: 'name',
                    type: 'input'
                },
                {
                    id: 2,
                    value: 'createdAt',
                    label: 'Created Date',
                    editRecord: false,
                    viewMode: true,
                    visible: true,
                    mandatory: true,
                    sort: true,
                    sortColumn: 'createdAt',
                    html: (row) => <span style={{
                        // color: tableDataColor,
                        // fontFamily: 'Poppins-Medium',

                    }}>{row['createdAt'] && moment(row['createdAt']).format(dateFormat) || ''}</span>,
                    type: 'input'
                },
                {
                    id: 3,
                    value: 'email',
                    label: 'Email',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    sort: true,
                    sortColumn: 'email',
                    mandatory: true,
                },
                // {
                //     id: 4,
                //     value: 'phone_number',
                //     label: 'Phone Number',
                //     editRecord: true,
                //     viewRecord: true,
                //     viewMode: true,
                //     visible: true,
                //     width: '120px',
                //     type: 'phone',
                //     html: (row) => <>{row.phone_number && new AsYouType('US').input(row.phone_number) || row.phone_number}</>,
                //     mandatory: true,
                // },
                {
                    id: 4,
                    value: 'password',
                    label: 'Password',
                    editRecord: true,
                    viewRecord: false,
                    viewMode: true,
                    visible: false,
                    type: 'password',
                    mandatory: {
                        create: true
                    }
                },
                {
                    id: 5,
                    value: 'action',
                    label: 'Actions',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    // sort: true,
                    visible: true,
                    edit: true,
                    delete: true,
                    type: 'action'
                },
            ],
        }
    }

    function hospitalUsers(record = {}) {
        return {
            columns: [
                {
                    id: 1,
                    value: 'hospital_name',
                    label: 'Provider Name',
                    editRecord: false,
                    viewMode: true,
                    visible: true,
                    options: 'hospitalUsersOptions',
                    disableOptons: {
                        edit: true
                    },
                    mandatory: true,
                    sort: true,
                    sortColumn: 'hospital_name',
                    type: 'autoComplete'
                },
                {
                    id: 2,
                    value: 'hospital_id',
                    label: 'Provider Name',
                    editRecord: true,
                    viewMode: false,
                    visible: false,
                    options: 'hospitalUsersOptions',
                    disableOptons: {
                        edit: true
                    },
                    mandatory: true,
                    type: 'autoComplete'
                },
                {
                    id: 3,
                    value: 'name',
                    label: 'Name',
                    editRecord: true,
                    viewMode: true,
                    visible: true,
                    mandatory: true,
                    sort: true,
                    sortColumn: 'name',
                    type: 'input'
                },
                {
                    id: 4,
                    value: 'createdAt',
                    label: 'Created Date',
                    editRecord: false,
                    viewMode: true,
                    visible: true,
                    mandatory: true,
                    sort: true,
                    sortColumn: 'createdAt',
                    html: (row) => <span style={{
                        // color: tableDataColor,
                        // fontFamily: 'Poppins-Medium',

                    }}>{row['createdAt'] && moment(row['createdAt']).format(dateFormat) || ''}</span>,
                    type: 'input'
                },
                {
                    id: 5,
                    value: 'email',
                    label: 'Email',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    sort: true,
                    sortColumn: 'email',
                    type: 'input',
                    mandatory: true,
                },
                {
                    id: 6,
                    value: 'password',
                    label: 'Password',
                    editRecord: true,
                    viewRecord: false,
                    viewMode: true,
                    visible: false,
                    type: 'password',
                    mandatory: {
                        create: true
                    }
                },
                {
                    id: 7,
                    value: 'phone_number',
                    label: 'Phone Number',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    width: '120px',
                    type: 'phone',
                    html: (row) => <>{row.phone_number && new AsYouType('US').input(row.phone_number) || row.phone_number}</>,
                    mandatory: true,
                },
                // {
                //     id: 8,
                //     value: 'is_admin',
                //     label: 'Admin',
                //     editRecord: false,
                //     viewRecord: true,
                //     viewMode: false,
                //     visible: true,
                //     // sort: true,
                //     visible: true,
                //     sort: true,
                //     sortColumn: 'is_admin',
                //     html: (row) => row['is_admin'] ? 'Yes' : 'No',
                //     type: 'checkbox'
                // },
                // {
                //     id: 8,
                //     value: 'is_admin',
                //     label: 'Make a user an Admin',
                //     editRecord: true,
                //     viewRecord: false,
                //     viewMode: false,
                //     visible: false,
                //     width: "100px",
                //     visible: false,
                //     type: 'checkbox'
                // },
                {
                    id: 8,
                    value: 'role',
                    label: 'User Type',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'select',
                    mandatory: true,
                    info: 'Normal user can only do uploads, Admin user can access to all features',
                    html: (row, rowValue) => <span style={{ textTransform: 'capitalize' }}>{rowValue == "admin" ? 'Admin' : rowValue == "fileUploader" ? 'Normal User' : rowValue == "customer" ? "Admin" : rowValue}</span>,
                    options: [
                        {
                            label: 'Admin',
                            value: 'admin'
                        },
                        {
                            label: 'Normal User',
                            value: 'fileUploader'
                        },
                    ]
                },
                {
                    id: 9,
                    value: 'action',
                    label: 'Actions',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    // sort: true,
                    visible: true,
                    edit: true,
                    delete: true,
                    type: 'action'
                },
                // {
                //     id: 8,
                //     value: 'email_notification',
                //     label: 'Email Notification',
                //     editRecord: true,
                //     viewRecord: true,
                //     viewMode: true,
                //     visible: true,
                //     type: 'checkbox'
                // }
            ],
        }
    }

    function patients(record = {}) {
        return {
            columns: [
                {
                    id: 1,
                    value: 'patient_name',
                    label: 'Name',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    width: '100px',
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.patient_name ? row.patient_name : ''}</span>,
                    mandatory: true
                }, {
                    id: 2,
                    value: 'first_name',
                    label: 'First Name',
                    editRecord: false,
                    editable: true,
                    viewRecord: false,
                    viewMode: true,
                    visible: false,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.first_name ? row.first_name : ''}</span>,
                    mandatory: true
                },
                {
                    id: 3,
                    value: 'last_name',
                    label: 'Last Name',
                    editRecord: false,
                    editable: true,
                    viewRecord: false,
                    viewMode: true,
                    visible: false,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.last_name ? row.last_name : ''}</span>,
                    mandatory: true
                },
                {
                    id: 4,
                    value: 'patient_phone',
                    label: 'Phone',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'phone',
                    width: '100px',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium',

                    }}>{row.patient_phone && new AsYouType('US').input(row.patient_phone) || row.patient_phone}</span>,
                    mandatory: true
                },
                {
                    id: 5,
                    value: 'date_of_birth',
                    label: 'Date of Birth',
                    editRecord: false,
                    editable: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    placeholder: dateFormat,
                    type: 'input',
                    width: '100px',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row['date_of_birth'] ? moment.utc(row['date_of_birth']).format(dateFormat) : ''}</span>,
                    mandatory: true
                },
                {
                    id: 6,
                    value: 'phone_number',
                    label: 'Phone',
                    editRecord: false,
                    editable: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: false,
                    type: 'phone',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium',

                    }}>{row.phone_number && new AsYouType('US').input(row.phone_number) || row.phone_number}</span>,
                    // mandatory: true
                },
                {
                    id: 7,
                    value: 'patient_email',
                    label: 'Email',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    width: '220px',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.patient_email ? row.patient_email : ''}</span>,
                },
                {
                    id: 8,
                    value: 'email',
                    label: 'Email',
                    editRecord: false,
                    editable: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: false,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.patient_email ? row.patient_email : ''}</span>,
                },
                {
                    id: 9,
                    value: 'invoice_date',
                    label: 'Service Date',
                    editRecord: false,
                    editable: true,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    placeholder: dateFormat,
                    width: '100px',
                    sort: true,
                    sortColumn: 'ia.invoice_date',
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row['invoice_date'] ? moment.utc(row['invoice_date']).format(dateFormat) : ''}</span>,
                    mandatory: true
                },
                {
                    id: 10,
                    value: 'invoice_number',
                    label: 'Account #',
                    editRecord: false,
                    editable: true,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    disabled: true,
                    width: '100px',
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.invoice_number ? row.invoice_number : ''}</span>,
                    mandatory: true
                },
                {
                    id: 11,
                    value: 'invoice_amount',
                    label: 'Account Balance',
                    editRecord: false,
                    editable: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    html: (row) => {
                        return <span style={{
                            color: tableDataColor,
                            fontFamily: 'Poppins-Medium'
                        }} name='invoice_amount1'>
                            {`$${row.invoice_amount ? row.invoice_amount : 0}`}
                        </span>
                    },
                    type: 'input'
                },
                // {
                //     id: 7,
                //     value: 'pending_amount',
                //     label: 'Account Balance',
                //     editRecord: false,
                //     viewRecord: true,
                //     viewMode: false,
                //     visible: true,
                //     sort: true,
                //     sortColumn: 'ia.pending_amount',
                //     visible: true,
                //     html: (row) => {
                //         return <span style={{
                //             color: tableDataColor,
                //             fontFamily: 'Poppins-Medium'
                //         }}>
                //             {`$${row.pending_amount ? row.pending_amount : 0}`}
                //         </span>
                //     },
                //     type: 'input'
                // },
                // {
                //     id: 7,
                //     value: 'invoice_amount',
                //     label: 'Account Balance',
                //     editRecord: false,
                //     viewRecord: true,
                //     viewMode: false,
                //     visible: true,
                //     // sort: true,
                //     // sortColumn: 'ia.invoice_amount',
                //     visible: true,
                //     // html: (row) => {
                //     //     return <span style={{
                //     //         color: tableDataColor,
                //     //         fontFamily: 'Poppins-Medium'
                //     //     }}>
                //     //         {`$${row.invoice_amount ? row.invoice_amount : 0}`}
                //     //     </span>
                //     // },
                //     type: 'input'
                // },
                {
                    id: 12,
                    value: 'collection_start_date',
                    label: 'Start Date',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    sort: true,
                    sortColumn: 'ia.collection_start_date',
                    width: '100px',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium',

                    }}>{row['collection_start_date'] && moment(row['collection_start_date']).format(`${dateFormat} hh:mm:ss A`) || ''}</span>,
                    type: 'input'
                },
                {
                    id: 13,
                    value: 'message_status',
                    label: 'Message Status',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    type: 'detailView',
                    innercolumn: {
                        sms_histories: [
                            {
                                label: 'Phone Number',
                                value: 'destination',
                                html: (row) => row?.destination && new AsYouType('US').input(row?.destination.replaceAll("+1", "")) || row?.destination
                            },
                            {
                                label: 'Status',
                                value: 'status',
                                html: (row, classes) => <>{row?.status == "QUEUED" ? 'Not Sent' :
                                    row?.status == 'SUCCESS' ? "Sent" :
                                        row?.status == 'FAILURE' ? "Failed" : ""}
                                    {row?.provider_response ? <Tooltip
                                        title={row?.provider_response || ""}
                                        placement="top"
                                        followCursor
                                    >
                                        <img src={Info} alt="infopng" className={classes?.imginfo || {}} />
                                    </Tooltip> : null}
                                </>
                            },
                            {
                                label: 'Sent At',
                                value: 'sms_sent_at',
                                html: (row) => moment(row?.sms_sent_at).format(`${dateFormat} hh:mm:ss A`)
                            },
                            {
                                label: 'Type',
                                value: 'type',
                            },
                        ],

                        email_histories: [
                            {
                                label: 'Email',
                                value: 'destination',
                                html: (row) => <span style={{ textTransform: 'none', color: 'inherit' }}>{row?.destination}</span>
                            },
                            {
                                label: 'Status',
                                value: 'status',
                                html: (row, classes) => <>{row?.status == "QUEUED" ? 'Not Sent' :
                                    row?.status == 'SUCCESS' ? "Sent" :
                                        row?.status == 'FAILURE' ? "Failed" : ""}
                                    {row?.provider_response ? <Tooltip
                                        title={row?.provider_response || ""}
                                        placement="top"
                                        followCursor
                                    >
                                        <img src={Info} alt="infopng" className={classes?.imginfo || {}} />
                                    </Tooltip> : null}
                                </>
                            },
                            {
                                label: 'Sent At',
                                value: 'email_sent_at',
                                html: (row) => moment(row?.email_sent_at).format(`${dateFormat} hh:mm:ss A`)
                            },
                            {
                                label: 'Type',
                                value: 'type',
                            },
                        ],
                    }
                    // html: (row) => row?.message_status && row?.message_status == 'sent' ? <span style={{
                    //     color: '#2DC146', fontFamily: 'Poppins-SemiBold'
                    // }}>Sent</span> : row?.message_status && row?.message_status == 'not_sent' ? <span style={{
                    //     color: '#F03249', fontFamily: 'Poppins-SemiBold'
                    // }}>Not Sent</span> : <span style={{
                    //     color: '#F03249', fontFamily: 'Poppins-SemiBold'
                    // }}>Failed</span>
                },
                {
                    id: 14,
                    value: 'collection_status',
                    label: 'Payment Status',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    type: 'input',
                    html: (row) => row?.collection_status && row?.collection_status == 'paid_in_full' ? <span style={{
                        color: '#2DC146', fontFamily: 'Poppins-SemiBold'
                    }}>Paid</span> : <span style={{
                        color: '#F03249', fontFamily: 'Poppins-SemiBold'
                    }}>Pending</span>
                },
                {
                    id: 15,
                    value: 'patient_import',
                    label: 'new accounts',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: false,
                    visible: false,
                    type: 'upload',
                    contentType: ['.xls', '.xlsx', '.csv'],
                    checkFirstLast: true,
                    // contentType: '.xls, .xlsx, .csv',
                    errorType: true,
                    upload: true,
                    viewFiles: true,
                    removeButton: true,
                    max: 1
                },
                {
                    id: 16,
                    value: 'sendMessage',
                    label: 'Send Message',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    // sort: true,
                    visible: true,
                    loadAction: true,
                    edit: false,
                    delete: false,
                    type: 'action',
                    action: {
                        modalForm: true,
                        iconType: 'SMS',
                        formName: 'messageSend',
                        btnLabel: 'Send',
                        enableSubmitBtn: true,
                        initial: {
                            sendMessageField: JSON.stringify({
                                email: true,
                                sms: true
                            })
                        },
                        fields: ({ hospitalDetails = [], row = {} }) => {
                            // const hospitalDetails = user?.hospitalDetails || [];
                            return [
                                {
                                    id: 3,
                                    value: 'sendMessageField',
                                    label: hospitalDetails[0]?.send_reminder ? 'Do you want to send a message now (in addition to the scheduled messages and follow ups) ?' : `Do you want to send the ${(row?.patient_email && !(row?.patient_email && row?.patient_phone)) ? "email" : "message"} now?`,
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    labelStyle: {
                                        marginLeft: "10px !important",
                                        whiteSpace: 'break-spaces',
                                        overflow: 'unset'
                                    },
                                    fieldSetStyle: {
                                        justifyContent: 'center'
                                    },
                                    removeproperty: true,
                                    type: 'multiCheckBox',
                                    options: (row?.patient_email && row?.patient_phone) ? [
                                        {
                                            label: 'Email',
                                            value: 'email'
                                        },
                                        {
                                            label: 'SMS',
                                            value: 'sms'
                                        }
                                    ] : [],
                                    mandatory: true
                                }
                            ]
                        }
                    }
                },
                {
                    id: 17,
                    value: 'link_opened',
                    label: 'Link Opened',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    type: 'input',
                    html: (row) => row?.link_opened && row?.link_opened == '1' ? <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <span style={{
                            fontSize: row?.link_opened_at ? '12px' : '14px',
                            color: tableDataColor,
                            fontFamily: 'Poppins-SemiBold'
                        }}>Yes</span>
                        {row?.link_opened_at ? <span style={{
                            fontSize: '10px'
                        }}>{moment(row['link_opened_at']).format(`MM/DD/YY hh:mm:ss A`)}</span> : null}
                    </div>
                        : <span style={{
                            color: tableDataColor,
                            fontFamily: 'Poppins-SemiBold'
                        }}>No</span>
                },
                {
                    id: 18,
                    value: 'action',
                    label: 'Edit',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    // sort: true,
                    visible: true,
                    edit: true,
                    delete: false,
                    width: "50px",
                    type: 'action'
                },
            ],

        }
    }

    function invoices(record = {}) {
        return {
            columns: [
                {
                    id: 1,
                    value: 'name',
                    label: 'Name',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.name ? row.name : (row?.last_name && row?.first_name) ? `${row?.last_name}, ${row?.first_name}` : (row?.last_name || row?.first_name) ? `${row?.last_name || row?.first_name}` : ''}</span>,
                    mandatory: true
                },
                {
                    id: 2,
                    value: 'phone_number',
                    label: 'Phone',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'phone',
                    width: '120px',
                    html: (row) => {
                        return <span style={{
                            color: tableDataColor,
                            fontFamily: 'Poppins-Medium',

                        }}>{row.phone_number && new AsYouType('US').input(row.phone_number.toString()) || ""}</span>
                    },
                    mandatory: true
                },
                {
                    id: 3,
                    value: 'date_of_birth',
                    label: 'Date of Birth',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    placeholder: dateFormat,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row['date_of_birth'] ? moment.utc(row['date_of_birth']).format(dateFormat) : ''}</span>,
                    mandatory: true
                },
                {
                    id: 4,
                    value: 'email',
                    label: 'Email',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row?.email ? row.email : row?.Email ? row.Email : ''}</span>,
                },
                {
                    id: 5,
                    value: 'invoice_date',
                    label: 'Service Date',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row['invoice_date'] ? moment.utc(row['invoice_date']).format(dateFormat) : ''}</span>,
                    mandatory: true
                },
                {
                    id: 6,
                    value: 'invoice_number',
                    label: 'Account #',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.invoice_number ? row.invoice_number : ''}</span>,
                    mandatory: true
                },
                {
                    id: 7,
                    value: 'invoice_amount',
                    label: 'Account Balance',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    visible: true,
                    html: (row, rowValue, dummy) => {
                        const makeNumber = typeof rowValue?.invoice_amount == "string" ? rowValue?.invoice_amount.replace('$', "") : (rowValue?.invoice_amount || 0);
                        const roundedUp = Math.round(makeNumber * Math.pow(10, 2)) / Math.pow(10, 2);

                        return <span
                            style={{
                                color: tableDataColor,
                                fontFamily: 'Poppins-Medium'
                            }}
                            name='invoice_amount2'
                        >
                            {row.invoice_amount ? `$${roundedUp}` : ""}
                        </span>
                    },
                    type: 'input'
                },
                // {
                //     id: 7,
                //     value: 'invoice_amount',
                //     label: 'Account Balance',
                //     editRecord: false,
                //     viewRecord: true,
                //     viewMode: false,
                //     visible: true,
                //     // sort: true,
                //     // sortColumn: 'ia.invoice_amount',
                //     visible: true,
                //     // html: (row) => {
                //     //     return <span style={{
                //     //         color: tableDataColor,
                //     //         fontFamily: 'Poppins-Medium'
                //     //     }}>
                //     //         {`$${row.invoice_amount ? row.invoice_amount : 0}`}
                //     //     </span>
                //     // },
                //     type: 'input'
                // },
            ],

        }
    }

    function collectedInvoices(record = {}) {
        return {
            columns: [
                {
                    id: 1,
                    value: 'patient_name',
                    label: 'Name',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.patient_name ? row.patient_name : ''}</span>,
                    mandatory: true
                },
                {
                    id: 2,
                    value: 'phone_number',
                    label: 'Phone',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'phone',
                    width: '120px',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium',

                    }}>{row.phone_number && new AsYouType('US').input(row.phone_number) || row.phone_number}</span>,
                    mandatory: true
                },
                {
                    id: 3,
                    value: 'date_of_birth',
                    label: 'Date of Birth',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    placeholder: dateFormat,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row['date_of_birth'] ? moment.utc(row['date_of_birth']).format(dateFormat) : ''}</span>,
                    mandatory: true
                },
                {
                    id: 4,
                    value: 'email',
                    label: 'Email',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.email ? row.email : ''}</span>,
                },
                {
                    id: 5,
                    value: 'invoice_date',
                    label: 'Service Date',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row['invoice_date'] ? moment.utc(row['invoice_date']).format(dateFormat) : ''}</span>,
                    mandatory: true
                },
                {
                    id: 6,
                    value: 'invoice_number',
                    label: 'Account #',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium'
                    }}>{row.invoice_number ? row.invoice_number : ''}</span>,
                    mandatory: true
                },
                {
                    id: 7,
                    value: 'invoice_amount',
                    label: 'Account Balance',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    html: (row) => {
                        return <span style={{
                            color: tableDataColor,
                            fontFamily: 'Poppins-Medium'
                        }}>
                            {`$${row.invoice_amount ? row.invoice_amount : 0}`}
                        </span>
                    },
                    type: 'input'
                },
                {
                    id: 8,
                    value: 'collected_date',
                    // label: 'Collected Date',
                    label: 'Date Paid',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    width: '140px',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        fontFamily: 'Poppins-Medium',

                    }}>{row['collected_date'] && moment(row['collected_date']).format(`${dateFormat} hh:mm:ss A`) || ''}</span>,
                    type: 'input'
                },
                {
                    id: 9,
                    value: 'message_status',
                    label: 'Message Status',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    type: 'detailView',
                    innercolumn: {
                        sms_histories: [
                            {
                                label: 'Phone Number',
                                value: 'destination',
                                html: (row) => row?.destination && new AsYouType('US').input(row?.destination.replaceAll("+1", "")) || row?.destination
                            },
                            {
                                label: 'Status',
                                value: 'status',
                                html: (row, classes) => <>{row?.status == "QUEUED" ? 'Not Sent' :
                                    row?.status == 'SUCCESS' ? "Sent" :
                                        row?.status == 'FAILURE' ? "Failed" : ""}
                                    {row?.provider_response ? <Tooltip
                                        title={row?.provider_response || ""}
                                        placement="top"
                                        followCursor
                                    >
                                        <img src={Info} alt="infopng" className={classes?.imginfo || {}} />
                                    </Tooltip> : null}
                                </>
                            },
                            {
                                label: 'Sent At',
                                value: 'sms_sent_at',
                                html: (row) => moment(row?.sms_sent_at).format(`${dateFormat} hh:mm:ss A`)
                            },
                            {
                                label: 'Type',
                                value: 'type',
                            },
                        ],

                        email_histories: [
                            {
                                label: 'Email',
                                value: 'destination',
                                html: (row) => <span style={{ textTransform: 'none', color: 'inherit' }}>{row?.destination}</span>
                            },
                            {
                                label: 'Status',
                                value: 'status',
                                html: (row, classes) => <>{row?.status == "QUEUED" ? 'Not Sent' :
                                    row?.status == 'SUCCESS' ? "Sent" :
                                        row?.status == 'FAILURE' ? "Failed" : ""}
                                    {row?.provider_response ? <Tooltip
                                        title={row?.provider_response || ""}
                                        placement="top"
                                        followCursor
                                    >
                                        <img src={Info} alt="infopng" className={classes?.imginfo || {}} />
                                    </Tooltip> : null}
                                </>
                            },
                            {
                                label: 'Sent At',
                                value: 'email_sent_at',
                                html: (row) => moment(row?.email_sent_at).format(`${dateFormat} hh:mm:ss A`)
                            },
                            {
                                label: 'Type',
                                value: 'type',
                            },
                        ],
                    }
                    // html: (row) => row?.message_status && row?.message_status == 'sent' ? <span style={{
                    //     color: '#2DC146', fontFamily: 'Poppins-SemiBold'
                    // }}>Sent</span> : row?.message_status && row?.message_status == 'not_sent' ? <span style={{
                    //     color: '#F03249', fontFamily: 'Poppins-SemiBold'
                    // }}>Not Sent</span> : <span style={{
                    //     color: '#F03249', fontFamily: 'Poppins-SemiBold'
                    // }}>Failed</span>
                },
                {
                    id: 10,
                    value: 'collection_status',
                    label: 'Payment Status',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: false,
                    visible: true,
                    type: 'input',
                    html: (row) => row?.collection_status && row?.collection_status == 'paid_in_full' ? <span style={{
                        color: '#2DC146', fontFamily: 'Poppins-SemiBold'
                    }}>Paid</span> : <span style={{
                        color: '#F03249', fontFamily: 'Poppins-SemiBold'
                    }}>Pending</span>
                },
            ],

        }
    }

    function hospitals() {
        return {
            columns: [
                {
                    id: 1,
                    value: 'name',
                    label: 'Provider Name',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    sort: true,
                    sortColumn: 'ha.name',
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 2,
                    value: 'createdAt',
                    label: 'Created Date',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    sort: true,
                    sortColumn: 'ha.createdAt',
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        // fontFamily: 'Poppins-Medium'
                    }}>{row['createdAt'] ? moment(row['createdAt']).format(dateFormat) : ''}</span>,
                    mandatory: true
                },
                {
                    id: 3,
                    label: 'Phone Number',
                    value: 'phone_number',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'phone',
                    html: (row) => <span style={{
                        // color: tableDataColor,
                        // fontFamily: 'Poppins-Medium',

                    }}>{row.phone_number && new AsYouType('US').input(row.phone_number) || row.phone_number}</span>,
                    mandatory: true
                },
                {
                    id: 4,
                    value: 'address',
                    label: 'Address',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 5,
                    value: 'city',
                    label: 'City',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 6,
                    value: 'state',
                    label: 'State',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 7,
                    value: 'zip_code',
                    label: 'ZIP Code',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    // width: '30px',
                    html: (row) => <div
                        style={{
                            wordBreak: 'break-word',
                            maxWidth: '50px'
                        }}
                    >{row.zip_code}</div>,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 8,
                    value: 'contact_person',
                    label: 'Contact Person',
                    editRecord: true,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 9,
                    value: 'action',
                    label: 'Actions',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    // sort: true,
                    visible: true,
                    edit: true,
                    delete: true,
                    type: 'action'
                },
            ]
        }
    }

    function hospitalProfile() {
        return {
            columns: [
                {
                    schemaId: 1,
                    label: 'Provider Profile',
                    create: true,
                    edit: true,
                    view: true,
                    action: 'provider',
                    value: 'provider',
                    // filter: (record) => Object.assign({}, { ...record }, { phone: record.phone && new AsYouType('US').input(record.phone) || record.phone, fax: record.fax && new AsYouType('US').input(record.fax) || record.fax }),
                    confirmMessage: "Changes you make to Provider Profile will apply for all users in your provider. Do you want to continue?",
                    columns: [
                        {
                            id: 1,
                            value: 'name',
                            label: 'Provider Name',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            // sort: true,
                            // sortColumn: 'ha.name',
                            type: 'input',
                            mandatory: true
                        },
                        {
                            id: 2,
                            label: 'Phone Number',
                            value: 'phone_number',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            type: 'phone',
                            html: (row) => <span style={{ color: '#7E899D' }}>{row.phone_number && new AsYouType('US').input(row.phone_number) || row.phone_number || "-"}</span>,
                            mandatory: true
                        },
                        {
                            id: 3,
                            value: 'address',
                            label: 'Address',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            type: 'input',
                            mandatory: true
                        },
                        {
                            id: 4,
                            value: 'city',
                            label: 'City',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            type: 'input',
                            mandatory: true
                        },
                        {
                            id: 5,
                            value: 'state',
                            label: 'State',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            type: 'input',
                            mandatory: true
                        },
                        {
                            id: 6,
                            value: 'zip_code',
                            label: 'ZIP Code',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            // width: '30px',
                            html: (row) => <span style={{ color: '#7E899D' }}>{row.zip_code || "-"}</span>,
                            type: 'input',
                            mandatory: true
                        },
                        {
                            id: 7,
                            value: 'contact_person',
                            label: 'Contact Person',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            type: 'input',
                            mandatory: true
                        },


                        {
                            id: 8,
                            value: 'logo_file',
                            label: 'Logo (for account)',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: false,
                            visible: true,
                            upload: true,
                            contentType: ['.jpg', '.jpeg', '.png'],
                            // contentType: ['image/*'],
                            type: 'upload',
                            upload: true,
                            viewFiles: true,
                            removeButton: true,
                            labelShow: true
                            // contentType: ['.xls', '.xlsx', '.csv'],
                        },
                        {
                            id: 9,
                            value: 'send_reminder',
                            label: 'Automatic Scheduled Messages',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            type: 'switch',
                            html: (row) => <span style={{ color: '#7E899D' }}>{row?.send_reminder ? "ON" : "OFF"}</span>,
                            // mandatory: true
                        },

                        {
                            id: 10,
                            name: 'invoice_columns',
                            value: 'invoice_columns',
                            label: 'Invoice Columns',
                            editRecord: true,
                            viewRecord: false,
                            viewMode: false,
                            visible: false,
                            html: (row) => <button disabled={true}> Update Invoice Columns </button>,
                            columns: [
                                {
                                    id: 1,
                                    value: 'first_name',
                                    label: 'First Name',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                },
                                {
                                    id: 2,
                                    value: 'last_name',
                                    label: 'Last Name',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                },
                                {
                                    id: 3,
                                    value: 'invoice_number',
                                    label: 'Invoice Number',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                },
                                {
                                    id: 4,
                                    value: 'date_of_birth',
                                    label: 'Date Of Birth',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                },
                                {
                                    id: 5,
                                    value: 'invoice_amount',
                                    label: 'Amount',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                },
                                {
                                    id: 6,
                                    value: 'phone_number',
                                    label: 'Phone Number',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                },
                                {
                                    id: 7,
                                    value: 'email',
                                    label: 'Email',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                },
                                {
                                    id: 8,
                                    value: 'address',
                                    label: 'Address',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                },
                            ]
                        }
                    ]
                },
                // {
                //     schemaId: 2,
                //     label: 'Reminder',
                //     create: true,
                //     edit: true,
                //     view: true,
                //     action: 'provider',
                //     value: 'reminderSettings',
                //     // filter: (record) => Object.assign({}, { ...record }, { phone: record.phone && new AsYouType('US').input(record.phone) || record.phone, fax: record.fax && new AsYouType('US').input(record.fax) || record.fax }),
                //     confirmMessage: "Do you want to update?",
                //     columns: [
                //         {
                //             id: 1,
                //             value: 'send_reminder',
                //             label: 'Automatic Scheduled Messages',
                //             editRecord: true,
                //             viewRecord: true,
                //             viewMode: true,
                //             visible: true,
                //             type: 'checkbox',
                //             html: (row) => <span style={{ color: '#7E899D' }}>{row?.send_reminder ? "Enabled" : "Disabled"}</span>,
                //             // mandatory: true
                //         },
                //     ]
                // }
            ]
        }
    }

    function reminderSettings() {


        return {
            columns: [
                {
                    schemaId: 1,
                    label: 'Messaging',
                    create: true,
                    edit: true,
                    view: true,
                    action: 'reminders',
                    value: 'messaging',
                    // filter: (record) => Object.assign({}, { ...record }, { phone: record.phone && new AsYouType('US').input(record.phone) || record.phone, fax: record.fax && new AsYouType('US').input(record.fax) || record.fax }),
                    confirmMessage: "Do you want to update?",
                    columns: [
                        {
                            id: 1,
                            value: 'no_of_email_repeat',
                            label: 'Number of repeats',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            // sort: true,
                            // sortColumn: 'ha.name',
                            type: 'input',
                            mandatory: true
                        },
                        {
                            id: 2,
                            value: 'message_interval',
                            label: 'Interval between repeats (In days)',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            type: 'input',
                            mandatory: true
                        },
                        {
                            id: 3,
                            value: 'send_msg_at',
                            label: 'Send messages at',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            type: 'select',
                            html: (row) => <span style={{ color: '#7E899D' }}>{row?.send_msg_at == "15:00:00" ? '9 AM CT' : row?.send_msg_at == "18:00:00" ? '12 PM CT' : row?.send_msg_at == "22:00:00" ? '4 PM CT' : ""}</span>,
                            options: [
                                {
                                    label: '9 AM CT',
                                    value: '15:00:00'
                                },
                                {
                                    label: '12 PM CT',
                                    value: '18:00:00'
                                },
                                {
                                    label: '4 PM CT',
                                    value: '22:00:00'
                                },
                            ],
                            mandatory: true
                        },
                        {
                            id: 3,
                            value: 'send_payment_reciept',
                            label: 'Send payment receipt',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            // html: (row) => <span>{}</span>,
                            type: 'multiCheckBox',
                            options: [
                                {
                                    label: 'Email',
                                    value: 'email_receipts'
                                },
                                {
                                    label: 'SMS',
                                    value: 'sms_receipts'
                                }
                            ],
                            mandatory: true
                        },
                        // {
                        //     id: 4,
                        //     value: 'send_until_paid',
                        //     label: 'Repeat until payment',
                        //     editRecord: true,
                        //     viewRecord: true,
                        //     viewMode: true,
                        //     visible: true,
                        //     type: 'checkbox',
                        //     mandatory: true
                        // },
                    ]
                },

                {
                    schemaId: 2,
                    label: '',
                    create: true,
                    edit: true,
                    view: true,
                    action: 'reminders',
                    value: 'template_defaults',
                    // filter: (record) => Object.assign({}, { ...record }, { phone: record.phone && new AsYouType('US').input(record.phone) || record.phone, fax: record.fax && new AsYouType('US').input(record.fax) || record.fax }),
                    columns: [
                        {
                            formSchemaId: 1,
                            label: 'Welcome Email',
                            // label: "<need_to_show_the_title>",
                            create: true,
                            edit: true,
                            view: true,
                            value: 'email_single_invloice',
                            // action: 'template_defaults',
                            // filter: (record) => Object.assign({}, { ...record }, { phone: record.phone && new AsYouType('US').input(record.phone) || record.phone, fax: record.fax && new AsYouType('US').input(record.fax) || record.fax }),
                            confirmMessage: "Do you want to update?",

                            columns: [
                                {
                                    id: 1,
                                    value: 'welcome_inv_subj',
                                    label: '',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                    mandatory: true
                                },
                                {
                                    id: 2,
                                    value: 'welcome_inv_msg',
                                    label: '',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'textarea',
                                    // type: 'input',
                                    mandatory: true
                                },

                            ]
                        },
                        {
                            formSchemaId: 2,
                            label: 'Reminder Email',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            value: 'email_multiple_invloice',
                            confirmMessage: "Do you want to update?",
                            columns: [
                                {
                                    id: 1,
                                    value: 'inv_subj',
                                    label: '',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'input',
                                    // size: 'small',
                                    mandatory: true
                                },
                                {
                                    id: 2,
                                    value: 'inv_msg',
                                    label: '',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'textarea',
                                    // type: 'input',
                                    mandatory: true
                                },
                            ]
                        },

                        {
                            formSchemaId: 3,
                            label: 'Welcome Text Message',

                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            value: 'message_multiple_invloice',
                            confirmMessage: "Do you want to update?",
                            columns: [
                                {
                                    id: 1,
                                    value: 'welcome_inv_msg',
                                    label: '',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'textarea',
                                    // type: 'input',
                                    mandatory: true
                                },
                            ]
                        },
                        {
                            formSchemaId: 4,
                            label: 'Reminder Text Message',
                            create: true,
                            edit: true,
                            view: true,
                            value: 'message_single_invloice',
                            // action: 'template_defaults',
                            // filter: (record) => Object.assign({}, { ...record }, { phone: record.phone && new AsYouType('US').input(record.phone) || record.phone, fax: record.fax && new AsYouType('US').input(record.fax) || record.fax }),
                            confirmMessage: "Do you want to update?",

                            columns: [
                                {
                                    id: 1,
                                    value: 'inv_msg',
                                    label: '',
                                    editRecord: true,
                                    viewRecord: true,
                                    viewMode: true,
                                    visible: true,
                                    type: 'textarea',
                                    // type: 'input',
                                    mandatory: true
                                },
                            ]
                        },
                    ]
                },
            ]
        }
    }

    function hipaaSettings() {
        return {
            columns: [
                {
                    schemaId: 1,
                    label: 'HIPAA Compliance',
                    create: true,
                    edit: true,
                    view: true,
                    action: 'hipaa',
                    value: 'hipaa',
                    // filter: (record) => Object.assign({}, { ...record }, { phone: record.phone && new AsYouType('US').input(record.phone) || record.phone, fax: record.fax && new AsYouType('US').input(record.fax) || record.fax }),
                    confirmMessage: "Do you want to update?",
                    columns: [
                        {
                            id: 1,
                            value: 'session_timeout',
                            label: 'Session Expiration Timeout (in seconds)',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: true,
                            visible: true,
                            // sort: true,
                            // sortColumn: 'ha.name',
                            type: 'number',
                            mandatory: true
                        },
                    ]
                },

            ]
        }
    }

    function appVersionSettings() {
        return {
            columns: [
                {
                    schemaId: 1,
                    label: 'App Version',
                    create: true,
                    edit: true,
                    view: true,
                    action: 'version',
                    value: 'version',
                    // filter: (record) => Object.assign({}, { ...record }, { phone: record.phone && new AsYouType('US').input(record.phone) || record.phone, fax: record.fax && new AsYouType('US').input(record.fax) || record.fax }),
                    confirmMessage: "Changing the version will reset the cache data for all Users. Do you want to continue?",
                    columns: [
                        {
                            id: 1,
                            value: 'version',
                            label: 'Version',
                            editRecord: true,
                            viewRecord: true,
                            viewMode: false,
                            visible: false,
                            mandatory: false,
                            type: 'number'
                        }
                    ]
                },

            ]
        }
    }

    function docs() {
        return {
            columns: [
                {
                    id: 1,
                    value: 'name',
                    label: 'File Name',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 2,
                    value: 'uploaded_at',
                    label: 'Uploaded Date',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    sort: true,
                    sortColumn: 'uploaded_at',
                    html: (row, value) => {
                        return <span>
                            {row['uploaded_at'] && moment(row['uploaded_at']).format(`${dateFormat} hh:mm:ss A`) || ''}
                        </span>
                    },
                    mandatory: true
                },
                {
                    id: 3,
                    value: 'public_url',
                    label: 'Files',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true,
                    html: (row, value) => {
                        return <IconButton
                            onClick={() => {
                                window.open(value || "", '_self')
                            }}>
                            <img src={CSVIcon} alt='csv svg icon' />
                        </IconButton>
                    },
                },
                {
                    id: 4,
                    value: 'action',
                    label: 'Action',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    edit: false,
                    delete: true,
                    width: '60px',
                    type: 'action'
                },
                {
                    id: 5,
                    value: 'doc_file',
                    label: 'files',
                    editRecord: true,
                    viewRecord: false,
                    viewMode: false,
                    visible: false,
                    type: 'upload',
                    contentType: ['.xls', '.xlsx', '.csv'],
                    upload: true,
                    checkFirstLast: true,
                    multiple: true,
                    max: 10,
                    errorType: true,
                    removeButton: true
                },
            ]
        }
    }

    function adminDocs() {
        return {
            columns: [
                {
                    id: 1,
                    value: 'hospital_name',
                    label: 'Provider Name',
                    editRecord: false,
                    viewMode: true,
                    visible: true,
                    options: 'hospitalUsersOptions',
                    disableOptons: {
                        edit: true
                    },
                    mandatory: true,
                    sort: true,
                    sortColumn: 'hospital_name',
                    type: 'autoComplete'
                },
                {
                    id: 2,
                    value: 'name',
                    label: 'File Name',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 3,
                    value: 'uploaded_at',
                    label: 'Uploaded Date',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    sort: true,
                    sortColumn: 'uploaded_at',
                    html: (row, value) => {
                        return <span>
                            {row['uploaded_at'] && moment(row['uploaded_at']).format(`${dateFormat} hh:mm:ss A`) || ''}
                        </span>
                    },
                    mandatory: true
                },
                {
                    id: 4,
                    value: 'public_url',
                    label: 'Files',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true,
                    html: (row, value) => {
                        return <IconButton
                            onClick={() => {
                                window.open(value || "", '_self')
                            }}>
                            <img src={CSVIcon} alt='csv svg icon' />
                        </IconButton>
                    },
                },
                // {
                //     id: 5,
                //     value: 'action',
                //     label: 'Action',
                //     editRecord: false,
                //     viewRecord: true,
                //     viewMode: true,
                //     visible: true,
                //     edit: false,
                //     delete: true,
                //     width: '60px',
                //     type: 'action'
                // },
                // {
                //     id: 6,
                //     value: 'doc_file',
                //     label: '',
                //     editRecord: true,
                //     viewRecord: false,
                //     viewMode: false,
                //     visible: false,
                //     type: 'upload',
                //     contentType: ['.xls', '.xlsx', '.csv'],
                //     upload: true,
                //     checkFirstLast: true,
                //     multiple: true,
                //     max: 10,
                //     errorType: true,
                //     removeButton: true
                // },
            ]
        }
    }

    function userSettings() {
        return {
            section: [
                {
                    schemaId: 1,
                    name: 'Change Password',
                    create: true,
                    edit: true,
                    view: true,
                    value: 'changePassword',
                    message: 'Password must be changed every 90 days',
                    btnLabel: "Update",
                    onSubmitClose: true,
                    confirmButton: false,
                    enableSubmitBtn: true,
                    confirmMessage: '',
                    disableMessage: '',
                    columns: [
                        {
                            id: 1,
                            value: 'password',
                            label: 'Password',
                            editRecord: true,
                            viewRecord: false,
                            viewMode: false,
                            visible: false,
                            type: 'password',
                            mandatory: true
                        },
                        {
                            id: 2,
                            value: 'new_password',
                            label: 'Confirm Password',
                            editRecord: true,
                            viewRecord: false,
                            viewMode: false,
                            visible: false,
                            type: 'password',
                            mandatory: true
                        }
                    ]
                },
            ]
        }
    }

    function login() {
        return {
            columns: [
                {
                    id: 1,
                    value: 'identifier',
                    label: 'EMAIL',
                    editRecord: true,
                    viewRecord: false,
                    viewMode: false,
                    visible: false,
                    mandatory: true,
                    disabled: true,
                    type: 'input',
                },
                {
                    id: 2,
                    value: 'secret',
                    label: 'PASSWORD',
                    editRecord: true,
                    viewRecord: false,
                    viewMode: false,
                    visible: false,
                    mandatory: true,
                    type: 'password'
                }
            ]
        }
    }

    function userMenuSettings() {
        return {
            section: [
                {
                    schemaId: 1,
                    name: 'Change Password',
                    create: true,
                    edit: true,
                    view: true,
                    value: 'changePassword',
                    message: 'Password must be changed every 90 days',
                    btnLabel: "Update",
                    onSubmitClose: false,
                    confirmButton: false,
                    enableSubmitBtn: true,
                    disableMessage: '',
                    title: 'Change Password',
                    columns: [
                        {
                            id: 1,
                            value: 'password',
                            label: 'Password',
                            editRecord: true,
                            viewRecord: false,
                            viewMode: false,
                            visible: false,
                            type: 'password',
                            mandatory: true
                        },
                        {
                            id: 2,
                            value: 'new_password',
                            label: 'Confirm Password',
                            editRecord: true,
                            viewRecord: false,
                            viewMode: false,
                            visible: false,
                            type: 'password',
                            mandatory: true
                        }
                    ]
                },
            ]
        }
    }

    function changePassword() {
        return {
            columns: [
                {
                    id: 1,
                    value: 'password',
                    label: 'Password',
                    editRecord: true,
                    viewRecord: false,
                    viewMode: false,
                    visible: false,
                    type: 'password',
                    mandatory: true
                },
                {
                    id: 2,
                    value: 'new_password',
                    label: 'Confirm Password',
                    editRecord: true,
                    viewRecord: false,
                    viewMode: false,
                    visible: false,
                    type: 'password',
                    mandatory: true
                }
            ]
        }
    }

    function uploadHistory() {
        return {
            columns: [
                {
                    id: 1,
                    value: 'provider',
                    label: 'Provider Name',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 2,
                    value: 'date_of_upload',
                    label: 'Date of Upload',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    html: (row) => <span style={{
                        color: tableDataColor,
                        // fontFamily: 'Poppins-Medium'
                    }}>{row['date_of_upload'] ? moment(row['date_of_upload']).format(dateFormat) : ''}</span>,
                    mandatory: true
                },
                {
                    id: 3,
                    label: 'Invoices',
                    value: 'invoices',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 4,
                    value: 'user_name',
                    label: 'User Name',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 5,
                    value: 'uploaded_by',
                    label: 'Uploaded By',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
                {
                    id: 6,
                    value: 'uploaded_file',
                    label: 'Uploaded File',
                    editRecord: false,
                    viewRecord: true,
                    viewMode: true,
                    visible: true,
                    type: 'input',
                    mandatory: true
                },
            ]
        }
    }

    function invoiceFilter() {
        return {
            columns: [
                {
                    id: 1,
                    value: 'message_status',
                    label: '',
                    type: 'select',
                    default: 'message_status_all',
                    options: [
                        {
                            label: 'Message Status: All',
                            value: 'message_status_all',
                            default: true
                        },
                        {
                            label: 'Sent',
                            value: 'sent'
                        },
                        {
                            label: 'Not Sent',
                            value: 'not_sent'
                        },
                        {
                            label: 'Failed',
                            value: 'failed'
                        }
                    ]
                },
                {
                    id: 2,
                    value: 'collection_status',
                    label: '',
                    type: 'select',
                    default: 'collection_status_all',
                    options: [
                        {
                            label: 'Payment Status: All',
                            value: 'collection_status_all',
                            default: true
                        },
                        {
                            label: 'Paid',
                            value: 'paid_in_full'
                        },
                        {
                            label: 'Pending',
                            value: 'pending'
                        }
                    ]
                }
            ]
        }
    }

    function uploadHistoryFilter() {
        return {
            columns: [
                {
                    id: 1,
                    value: 'date',
                    label: '',
                    type: 'input',
                    placeholder: 'YYYY-MM-DD'
                }
            ]
        }
    }


    return {
        users,
        adminUsers,
        hospitalUsers,
        patients,
        invoices,
        collectedInvoices,
        hospitals,
        hospitalProfile,
        reminderSettings,
        hipaaSettings,
        appVersionSettings,
        docs,
        adminDocs,
        userSettings,
        login,
        userMenuSettings,
        changePassword,
        uploadHistory,
        invoiceFilter,
        uploadHistoryFilter
    }
}
export default schema;