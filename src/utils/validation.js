
import { isPossiblePhoneNumber } from "libphonenumber-js";

const validate = (values, props) => {
    const requiredFields = props.fields.reduce((a, el) => {
        if ((el.mandatory && typeof el.mandatory === 'boolean') || (el.mandatory && typeof el.mandatory === 'object' && ((el.mandatory.create && props.form.indexOf('create') > -1) || (el.mandatory.edit && props.form.indexOf('edit') > -1)))) {
            a.push(el.value)
        }
        return a;
    }, []);

    const errors = {}

    const sequence = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678)+/ig

    const identical = /^(?!.*(.)\1\1.*).*$/igm

    const commonNames = ["123456", "password", "123456789", "12345678", "12345",
        "111111", "1234567", "sunshine", "qwerty", "iloveyou", "princess", "admin", "welcome",
        "666666", "abc123", "football", "123123", "monkey", "654321", "!@#$%^&amp;*", "charlie",
        "aa123456", "donald", "password1", "qwerty123"
    ]

    const phoneFields = props.fields.filter(s => s.type == "phone").map(e => Object.assign({}, { value: e.value, max: e.max }));

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });

    phoneFields.forEach(field => {
        // if (values[field.value] && requiredFields.includes(field.value) && values[field.value].includes('+1') && values[field.value].replace('+1') == "") {
        //     errors[field.value] = 'Required'
        // }
        // else
        if (values[field.value]) {
            if (!isPossiblePhoneNumber(values[field.value])) {
                errors[field.value] = 'Invalid Phone Number'
            }
        }
    })


    if (values.name && values.name.length < 4) {
        errors.name = 'The name must be at least 4 characters.'
    }

    if (values.case_title && values.case_title.length < 4) {
        errors.case_title = 'The case title must be at least 4 characters.'
    }

    if (values.objection_title && values.objection_title.trim().length < 2) {
        errors.objection_title = 'The objection title must be at least 2 characters.'
    }

    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)
    ) {
        errors.email = 'Invalid Email'
    }

    if (values.password && values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
    }

    if (values.password && values.password.length >= 8 && !/^(?=.*[\d#?!@$%^&*-]).{8,}$/i.test(values.password)) {
        errors.password = 'Must contain at least one numeric or special character '
    }

    if (values.password && sequence.test(values.password) || !identical.test(values.password)) {
        errors.password = 'Avoid consecutive sequential and identical characters'
    }

    commonNames.forEach(field => {
        if (values.password == field) {
            errors.password = "Password is easily guessable"
        }
    })

    if (values.password && values.new_password && values.new_password != values.password) {
        errors.new_password = 'Password Mismatch'
    }

    if (values.address && values.address.length < 4) {
        errors.address = 'The address must be at least 4 characters.';
    }

    if (values.dob) {
        errors.dob = dateValidation(values.dob);
    }

    if (values.invoice_date && dateValidation1(values.invoice_date)) {
        errors.invoice_date = dateValidation1(values.invoice_date);
    }

    if (values.date_of_birth && dateValidation1(values.date_of_birth)) {
        errors.date_of_birth = dateValidation1(values.date_of_birth);
    }

    if ((typeof values.invoice_amount == "number" && !values.invoice_amount) || (typeof values.invoice_amount == "string" && values.invoice_amount == "0")) {
        errors.invoice_amount = "Account Balance should be non zero";
    }

    return errors
}

const dateValidation = (val) => {
    var date = val;
    var result = '';
    if (!isNaN(Date.parse(date))) {

    } else {
        result = 'Invalid date'
    }
    return result
}

const dateValidation1 = (val) => {
    var date = val;
    var result = '';
    var splittedDate = date && date.includes('/') && date.split('/');
    if (!isNaN(Date.parse(date)) && splittedDate.length == 3) {
        if (splittedDate[2].length > 4 || splittedDate[2].length < 4) {
            result = 'Invalid date'
        }
    } else {
        result = 'Invalid date'
    }
    return result
}

const jsonValidation = (val) => {
    var result = '';
    try {
        JSON.parse(val);
    } catch (error) {
        result = 'Invalid json format';
    }
    return result;
}

export default validate;
