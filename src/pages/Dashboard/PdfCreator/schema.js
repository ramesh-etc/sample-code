
export const summaryColumn = () => {
    return {
        columns: [
            {
                name: 'start_date',
                label: 'Start date',
            },
            {
                name: 'end_date',
                label: 'End date',
            },
            {
                name: 'total_invoices_collected',
                label: 'Total invoices collected',
            },
            {
                name: 'total_amount_collected',
                label: 'Total amount collected',
            },
            {
                name: 'total_invoices_non_collectible',
                label: 'Total invoices non-collectible',
            },
            {
                name: 'total_amount_non_collectible',
                label: 'Total amount non-collectible',
            },
        ]
    }
}

export const newAccountsAdded = () => {
    return {
        columns: [
            {
                name: 'uploaded_invoice_count',
                label: 'Total # Accounts',
            },
            {
                name: 'uploaded_invoice_amount_total',
                label: 'Total $ Amount',
            }
        ]
    }
}

export const accountsFullyProcessed = () => {
    return {
        columns: [
            {
                name: 'total_invoices_collected',
                label: 'Total # Accounts',
            },
            {
                name: 'total_amount_collected',
                label: 'Total $ Amount',
            }
        ]
    }
}

export const collectedReportColumn = () => {
    return {
        columns: [
            {
                name: 'name',
                label: 'Name',
            },
            {
                name: 'phone_number',
                label: 'Phone',
            },
            {
                name: 'invoice_date',
                label: 'Service Date',
            },
            {
                name: 'invoice_number',
                label: 'Account #',
            },
            {
                name: 'invoice_amount',
                label: 'Account Balance',
            },
            {
                name: 'collected_date',
                // label: 'Collected Date',
                label:'Date Paid',
            },
        ]
    }
}