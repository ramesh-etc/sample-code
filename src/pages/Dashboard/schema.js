
import React from "react";
import moment from "moment";
import PdfIcon from '../../images/dashboard/pdf_icon.svg';
import { getPublicUrlForGeneratedReport } from "../../redux/upload/remotes";
import { IconButton } from "@mui/material";
import Collected from '../../images/dashboard/Collected.svg';
import Pending1 from '../../images/dashboard/Pending1.svg';
import { dateFormat, tableDataColor } from "../../utils/tools";
// import Partial from '../../images/dashboard/Partial.svg';

export const completeCollection = () => {
    return {
        columns: [
            {
                id: 1,
                name: 'collected_invoice_count',
                label: 'Total # Accounts',
                table: true
            },
            {
                id: 2,
                name: 'collected_total_amount',
                label: 'Total $ Paid',
            },
            {
                id: 3,
                name: 'avg_days_to_process',
                label: 'Average Days to Process',
            },
            {
                id: 4,
                name: 'average_texts_sent',
                label: 'Average # of Texts',
            },
        ]
    }
}

// export const partialPayCollection = () => {
//     return {
//         columns: [
//             {
//                 id: 1,
//                 name: 'partial_pay_invoice_count',
//                 label: 'Total # Accounts',
//                 table: true
//             },
//             {
//                 id: 2,
//                 name: 'partially_paid_total_amount',
//                 label: 'Total $ Amount',
//             },
//             {
//                 id: 3,
//                 name: 'partially_avg_days_to_process',
//                 label: 'Average Days to Process',
//             },
//             {
//                 id: 4,
//                 name: 'partially_average_emails_sent',
//                 label: 'Average # of Texts',
//             },
//         ]
//     }
// }

export const pendingCollection = () => {
    return {
        columns: [
            {
                id: 1,
                name: 'pending_invoice_count',
                label: 'Total # Accounts'
            },
            {
                id: 2,
                name: 'pending_total_amount',
                label: 'Total $ Owed',
            },
            {
                id: 3,
                name: 'overAll_text_sent',
                label: 'Text sent',
            },
            {
                id: 4,
                name: 'overAll_text_sent',
                label: 'Text delivered',
            },
            {
                id: 5,
                name: 'link_opened_count',
                label: 'Link opened',
            }
        ]
    }
}

export const dashboardBoxColumns = () => {
    return {
        columns: [
            {
                id: 1,
                title: 'Account(s) Processed',
                cardColor: '#DCFCE7',
                columns: completeCollection().columns,
                leftTitleIcon: <img src={Collected} alt="collected icon" />,
                rightIcon: true,
                rightFilter: true,
                loading: true
            },
            // {
            //     id: 2,
            //     title: 'Account(s) Partially Processed',
            //     cardColor: '#FFF4DE',
            //     columns: partialPayCollection().columns,
            //     leftTitleIcon: <img src={Partial} alt="pending icon" />,
            // },
            {
                id: 3,
                title: 'Account(s) Pending',
                cardColor: '#FFE2E5',
                columns: pendingCollection().columns,
                leftTitleIcon: <img src={Pending1} alt="pending icon" />,
            }
        ]
    }
}

export const dashboardFilter = (props) => {
    const { fromDate, toDate } = props;
    return {
        columns: [
            {
                id: 1,
                value: 'fromDate',
                label: 'From Date',
                type: 'dateCalendar',
                editRecord: true,
                disableFuture: true,
                maxDate: moment(toDate)
            },
            {
                id: 2,
                value: 'toDate',
                label: 'To Date',
                type: 'dateCalendar',
                disableFuture: true,
                editRecord: true,
                minDate: moment(fromDate)
            }
        ]
    }
}

export const reportColumns = (props) => {

    const { generateError, dispatch, fromDate, toDate } = props;

    return {
        columns: [

            {
                id: 1,
                value: 'name',
                label: 'Previously Generated Reports',
                editRecord: false,
                viewRecord: true,
                viewMode: false,
                visible: true,
                html: (row) => <span style={{
                    color: tableDataColor,
                    fontFamily: 'Poppins-Medium',
                }}>
                    {row['name'] && row['name'].replace('-EzTekPay-Report.pdf', "") || ''}
                </span>,
                type: 'input',
            },
            {
                id: 2,
                value: 'generated_date',
                label: 'Generated Date',
                editRecord: false,
                viewRecord: true,
                viewMode: false,
                visible: true,
                type: 'input',
                width: '140px',
                html: (row) => <span style={{
                    color: tableDataColor,
                    fontFamily: 'Poppins-Medium',

                }}>{row['generated_date'] && moment(row['generated_date']).format(`${dateFormat} hh:mm:ss A`) || ''}</span>,
            },
            {
                id: 3,
                value: 'fromDate',
                label: 'From Date',
                editRecord: true,
                viewRecord: true,
                viewMode: false,
                visible: false,
                type: 'dateCalendar',
                maxDate: moment(toDate),
                disableFuture: true
            },
            {
                id: 4,
                value: 'toDate',
                label: 'To Date',
                editRecord: true,
                viewRecord: true,
                viewMode: false,
                visible: false,
                type: 'dateCalendar',
                minDate: moment(fromDate),
                disableFuture: true
            },
            {
                id: 5,
                value: 'start_date',
                label: 'Start Date',
                editRecord: false,
                viewRecord: true,
                viewMode: false,
                visible: true,
                type: 'dateCalendar',
                disableFuture: true,
                html: (row) => <span style={{
                    color: tableDataColor,
                    fontFamily: 'Poppins-Medium',

                }}>{row['start_date'] && moment(row['start_date']).format(dateFormat) || ''}</span>,
            },
            {
                id: 6,
                value: 'end_date',
                label: 'End Date',
                editRecord: false,
                viewRecord: true,
                viewMode: false,
                visible: true,
                type: 'dateCalendar',
                disableFuture: true,
                html: (row) => <span style={{
                    color: tableDataColor,
                    fontFamily: 'Poppins-Medium',

                }}>{row['end_date'] && moment(row['end_date']).format(dateFormat) || ''}</span>,
            },
            {
                id: 7,
                value: 's3_file_key',
                label: 'View',
                editRecord: false,
                viewRecord: true,
                viewMode: false,
                visible: true,
                type: 'input',
                // sort: true,
                // sortColumn: 'ia.collection_start_date',
                // width: '140px',
                html: (row, value) => {
                    return <span style={{
                        // color: tableDataColor,
                        // fontFamily: 'Poppins-Medium',

                    }}>
                        <IconButton
                            onClick={async () => {
                                if (row['s3_file_key']) {
                                    await getPublicUrlForGeneratedReport({ s3_file_key: value })
                                        .then(res => {
                                            window.open(res.response, '_blank')
                                        })
                                        .catch(error => {
                                            const Err = error.response && error.response.data && error.response.data.error && typeof error.response.data.error === 'string' ? error.response.data.error : "Failed to get public url";
                                            dispatch(generateError({ error: Err }));
                                        })
                                }
                            }}>
                            <img src={PdfIcon} alt='pdf svg icon' />
                        </IconButton>
                        {/* {
                        // row['s3_file_key'] && row['s3_file_key'] || ''
                    } */}
                    </span>
                },
            },
            {
                id: 8,
                value: 'action',
                label: 'Action',
                editRecord: false,
                viewRecord: true,
                viewMode: true,
                visible: true,
                // sort: true,
                edit: false,
                delete: true,
                type: 'action'
            }
        ]
    }
}