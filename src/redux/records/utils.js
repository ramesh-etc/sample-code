

/**
 * @param {object} records 
 * @param {string} name 
 */
export default function mapRecords(records, name) {
    switch (name) {
        default:
            return records;
    }
}

/**
* @param {entityUrl} string 
*/
export function showNameFn(entityUrl, saga) {
    let showMessage = entityUrl;
    if (entityUrl == "invoices") {
        showMessage = "Account"
    } else if (entityUrl == "users") {
        showMessage = "User"
    } else if (entityUrl == 'adminUsers') {
        showMessage = "EzTekPAY User"
    } else if (entityUrl == 'hospitalUsers') {
        showMessage = "Provider User"
    } else if (entityUrl == 'hospitals') {
        showMessage = "Provider"
    } else if (entityUrl == 'docs') {
        showMessage = "File"
    }
    return showMessage;
}
