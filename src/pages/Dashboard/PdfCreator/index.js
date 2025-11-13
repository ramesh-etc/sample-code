
import React from 'react';
// import htmlToPdfmake from 'html-to-pdfmake';
// import { createPdf } from 'pdfmake/build/pdfmake.min';
// import PdfPrinter from 'pdfmake';
// import pdfmake from 'pdfmake';
// import vfs
// import '../../../fonts/Poppins-Bold_1.ttf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { poppinsRegular, poppinsBold, PoppinsSemiBold } from '../../../utils/pdfFonts';
import pdfDefinition from './pdfDefinition';
import { summaryColumn, collectedReportColumn, newAccountsAdded, accountsFullyProcessed } from "./schema";
import moment from 'moment';
import { AsYouType } from 'libphonenumber-js';
import { dateFormat } from '../../../utils/tools';

// Register fonts
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// var fonts = {
//     Poppins: {
//         normal: 'Poppins-Regular_1.ttf',
//         bold: 'Poppins-Bold_1.ttf',
//         semiBold: 'Poppins-SemiBold 10.ttf'
//     }
// };
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//base64 start here
pdfMake.vfs["Poppins-Regular.ttf"] = poppinsRegular;
pdfMake.vfs["Poppins-Bold_1.ttf"] = poppinsBold;
pdfMake.vfs["Poppins-SemiBold 10.ttf"] = PoppinsSemiBold;

pdfMake.fonts = {
    Poppins: {
        normal: "Poppins-Regular.ttf",
        bold: 'Poppins-Bold_1.ttf',
        semiBold: 'Poppins-SemiBold 10.ttf'
    }
};

const convertObjectToArray = (obj1, obj2, style) => { //obj1 == 'respone from api' obj2 == 'column from schema
    // var resultArray = obj2.map(item => ({
    //     ...item,
    //     value: obj1[item.name]
    // }));
    // const res = (resultArray || []).map((obj, i) => {
    //     const arr = [
    //         { text: `${obj.label}:`, style },
    //         { text: obj.value, style },
    //     ];
    //     return arr;
    // });
    const res = obj2.map(item => [
        { text: `${item.label}:`, style },
        {
            text: (item.name == "start_date" || item.name == "end_date") ?
                (obj1[item.name] && moment(obj1[item.name] || new Date()).format(dateFormat)) || moment(new Date()).format(dateFormat)
                : (item.name == "total_amount_collected" || item.name == "total_amount_non_collectible" || item.name == "uploaded_invoice_amount_total") ?
                    (obj1[item.name] && `$${obj1[item.name]}`) || '$0' : (item.name == "total_invoices_collected" || item.name == "uploaded_invoice_count") ? ((obj1[item.name] && obj1[item.name]) || '0') : (obj1[item.name] && obj1[item.name]) || '-', style
        },
    ]);

    return res;
};

const headerForCollectedInvoice = (fields, style) => {
    return (fields || []).map(obj => {
        return {
            text: obj.label, style
        }
    })
}

const collectedInvoiceTable = (fields, data, headingStyle, style) => {
    let arr = [headerForCollectedInvoice(fields, headingStyle)];
    (data || []).map((dataObj, i) => {
        const arrField = (fields || []).map(obj => {
            return {
                text: obj.name === 'invoice_amount' ? `$${dataObj[obj.name]}` : obj.name === 'invoice_date' || obj.name === 'collected_date' ? moment.utc(dataObj[obj.name] || new Date()).format(dateFormat) : obj.name === 'phone_number' ? (dataObj[obj.name] && new AsYouType('US').input(dataObj[obj.name])) || dataObj[obj.name] : dataObj[obj.name], style
            }
        });
        arr.push(arrField);
    })

    return arr;
}

// var html = htmlToPdfmake(`
// <div>
// <table>
//      <tr>
//          <th valign="center" class="alignSelf">Name</th>
//          <th valign="center" class="alignSelf">Phone</th>
//          <th valign="center" class="alignSelf">Service Date</th>
//          <th valign="center" class="alignSelf">Account #</th>
//          <th valign="center" class="alignSelf">Inoive Amount</th>
//          <th valign="center" class="alignSelf">Collected Date</th>
//      </tr>
//      <tr>
//          <td style="text-align: center;">Selva 699</td>
//          <td style="text-align: center;">(940) 207-5863</td>
//          <td style="text-align: center;">01/03/23</td>
//          <td style="text-align: center;">SEL2648205</td>
//          <td style="text-align: center;">$7</td>
//          <td style="text-align: center;">01/11/24</td>
//      </tr>
//      <tr>
//          <td style="text-align: center;">Selva 699</td>
//          <td style="text-align: center;">(940) 207-5863</td>
//          <td style="text-align: center;">01/03/23</td>
//          <td style="text-align: center;">SEL2648205</td>
//          <td style="text-align: center;">$7</td>
//          <td style="text-align: center;">01/11/24</td>
//      </tr>
//      <tr>
//          <td style="text-align: center;">Selva 699</td>
//          <td style="text-align: center;">(940) 207-5863</td>
//          <td style="text-align: center;">01/03/23</td>
//          <td style="text-align: center;">SEL2648205</td>
//          <td style="text-align: center;">$7</td>
//          <td style="text-align: center;">01/11/24</td>
//      </tr>
//      <tr>
//          <td style="text-align: center;">Selva 699</td>
//          <td style="text-align: center;">(940) 207-5863</td>
//          <td style="text-align: center;">01/03/23</td>
//          <td style="text-align: center;">SEL2648205</td>
//          <td style="text-align: center;">$7</td>
//          <td style="text-align: center;">01/11/24</td>
//      </tr>
//  </table>
// </div>


// `);

export default function sample(props) {
    // var printer = new PdfPrinter(fonts);
    const { summary, collectedreport, fromDate, toDate, hospital_name, ...rest } = props;
    const summaryFields = summaryColumn().columns;
    let summaryArr = convertObjectToArray(summary?.response || {}, summaryFields, "summaryContent");
    const newAccountsAddedFields = newAccountsAdded().columns;
    let newAccountsAddedArr = convertObjectToArray(summary?.response || {}, newAccountsAddedFields, "summaryContent");
    const accountsFullyProcessedFields = accountsFullyProcessed().columns;
    let accountsFullyProcessedArr = convertObjectToArray(summary?.response || {}, accountsFullyProcessedFields, "summaryContent");
    const collectedInvoiceFields = collectedReportColumn().columns;
    let collectedInvoices = collectedInvoiceTable(collectedInvoiceFields, collectedreport, "tableheading", "invoiceCollectedContent");

    const docDefinition = pdfDefinition({
        summary: summaryArr,
        mewAccountsAddedSummary: newAccountsAddedArr,
        accountsFullyProcessedSummary: accountsFullyProcessedArr,
        collectedInvoices: collectedInvoices,
        collectedreport: collectedreport,
        fromDate: fromDate,
        toDate: toDate,
        // html: html,
        ...rest
    });
    var pdfGenerator = pdfMake.createPdf(docDefinition);
    const filename = `${fromDate}-to-${toDate}-${hospital_name}-EzTekPay-Report.pdf`;
    // pdfGenerator.download(filename);
    // pdfGenerator.open({}, window.open('', '_blank'));


    return {
        pdf: pdfGenerator,
        downloadUrl: () => pdfGenerator.download(filename)
    }
    // createPdf(docDefinition, fonts).open({}, window.open('', '_blank'));
}