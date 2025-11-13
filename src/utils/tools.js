


import store2 from "store2";

export const appColor = '#385C9F';
export const btnColor = '#385C9F';
export const btnShadowColor = '0px 0px 25px 0px rgba(56, 92, 159, 0.41)';
export const menuBtnShadowColor = '0px 0px 8px 0px #A0B7E2 inset,0px 0px 7px 0px #153165';
export const outlinedBtnShdowColor = '0px 0px 8px 0px #CDDFFF inset, 0px 0px 4px 0px #00000026';
export const spanColor = '#2D3F62';
export const tableDataColor = '#4E586C';
// export const btnColor = '#FFAA01';
// export const btnShadowColor = '0px 0px 25px 0px rgba(45, 207, 193, 0.41)';
// export const menuBtnShadowColor = '0px 0px 8px 0px #89DCD5 inset, 0px 0px 7px 0px #30B5A9';
// export const outlinedBtnShdowColor = '0px 0px 8px 0px #C7FFFA inset, 0px 0px 4px 0px rgba(0, 0, 0, 0.15)';
// export const spanColor = '#344055';
// export const tableDataColor = '#3E4651';

export const dateFormat = "MM/DD/YYYY"

export const RecordsData = Array.from(Array(10), (x, index) => Object.assign({}, { id: index + 1 }));

export function getDefaultHeaders() {
    return {
        offset: 0,
        limit: 25,
        search: false,
        // filter: false,
        // sort: false,
        page: 1
    }
}

/**
 *capitalize only the first letter and others are lower case of the string. 
 * @param {string} string 
 */
export function capitalizeFirstLetterOnly(string) {
    return string && string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() || string;
}

/**
 * 
 * @param {string} string 
 */
export function capitalizeFirstWord(string) {
    return string.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

export function normalize(field) {

    return (val) => {
        if (field.value == "no_of_email_repeat") {
            return val.replace(/\D/g, '');
        } else if (field.value == "message_interval") {
            let value = val.replace(/\D/g, '');
            value = parseInt(value, 10);
            return (Number(val) > 10) ? val.substring(0, val.length - 1) : value;
        }
        else {
            return val
        }
        // if (field.type === 'phone') {
        //     // let value = val.replace(/[^\d\(\)\-]/g, '');
        //     // return field.max && val.length > field.max ? val.substring(0, field.max) : value;
        //     let value = val.includes('+1') && val.replace('+1', '') || val;
        //     return field.max && val.length > field.max ? val.substring(0, field.max) : value;
        // } else {
        //     return field.dollar && val.match(/^[-+]?[0-9]+\.[0-9]+[0-9]$/) ? parseFloat(val).toFixed(2) : field.max && val.length > field.max ? val.substring(0, field.max) : val;
        // }
    }
}

export const getInitialValue = (columns, record) => {
    const initialFormValues = (columns || []).reduce((acc, column) => {
        acc[column.value] = (record?.[column?.value] && record[column.value]) || '';
        return acc;
    }, {});
    return initialFormValues;
}

export const getInitialValueAsBoolean = (columns, record) => {
    const initialFormValues = (columns || []).reduce((acc, column) => {
        acc[column.value] = record?.[column?.value] ? true : false;
        return acc;
    }, {});
    return initialFormValues;
}

/**
 * Visibility Listener Function
 * @param {object} param0 
 */
export function visibility({ callback, clearSessionTimeout, ...props }) {
    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    document.addEventListener(visibilityChange, () => {
        if (document[hidden]) {
            callback();
        } else {
            clearSessionTimeout();
        }
    }, false);

}

/**
 * callback Set Timeout Function
 * @param {function} fn 
 * @param {number} duration 
 */
export function Timer(fn, duration) {
    return setTimeout(fn, duration);
}

/**
* 
* @param {function} fn 
* @param {string} name 
* @param {boolean} val 
*/
export function Localize(callback, name, val) {
    store2.set(name, val);
    callback();
}


export function isPresentInArray(list, ele) {
    if (!list || !ele) {
        return false
    }
    for (let i of list) {
        if ((typeof i == 'string') && (typeof ele == 'string')) {
            if ((i?.toLowerCase()?.trim()) == (ele?.toLowerCase()?.trim())) {
                return true;
            }
        }
        else {
            if (i == ele) {
                return true;
            }
        }
    }

    return false;
}


export const disableOnSubmitForm = ['SettingsForm_'];