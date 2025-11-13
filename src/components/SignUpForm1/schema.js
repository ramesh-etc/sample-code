
export const signupuser = () => {
    return {
        columns: [
            {
                id: 1,
                value: 'name',
                label: 'User Name',
                placeholder: 'Sample Name',
                editRecord: true,
                viewRecord: true,
                viewMode: true,
                visible: true,
                type: 'input',
                mandatory: true
            },
            {
                id: 2,
                value: 'email',
                label: 'Email',
                placeholder: 'eztekpay@gmail.com',
                editRecord: true,
                viewRecord: true,
                viewMode: true,
                visible: true,
                type: 'input',
                mandatory: true
            },
            {
                id: 3,
                value: 'phone_number',
                label: 'Phone Number',
                placeholder: '(765) 576-7656',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'phone',
                max: 14,
                mandatory: true
            },
            {
                id: 4,
                value: 'password',
                label: 'Password',
                // placeholder: '.........',
                placeholder: '&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;',//medium dots
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'password',
                mandatory: true
            },
            {
                id: 5,
                value: 'confirm_password',
                label: 'Confirm Password',
                // placeholder: '.........',
                placeholder: '&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;',//medium dots
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'password',
                mandatory: true
            }
        ],

    }
}

export const signuphospital = () => {
    return {
        columns: [
            {
                id: 1,
                value: 'hospital_name',
                label: 'Provider Name',
                placeholder: 'UC San Diego Health',
                editRecord: true,
                viewRecord: true,
                viewMode: true,
                visible: true,
                type: 'input',
                mandatory: true
            },
            {
                id: 2,
                value: 'hospital_phone_number',
                label: 'Phone Number',
                placeholder: '(765) 576-7656',
                editRecord: true,
                viewRecord: true,
                viewMode: true,
                visible: true,
                type: 'phone',
                max: 14,
                mandatory: true
            },
            {
                id: 3,
                value: 'address',
                label: 'Address',
                placeholder: 'Street Address',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'input',
                mandatory: true
            },
            {
                id: 4,
                value: 'city',
                label: 'City',
                placeholder: 'San Diego',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'input',
                mandatory: true
            },
            {
                id: 5,
                value: 'state',
                label: 'State',
                placeholder: 'CA',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'input',
                mandatory: true
            },
            {
                id: 6,
                value: 'zip_code',
                label: 'Zip Code',
                placeholder: '92122',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'input',
                mandatory: true
            },
            {
                id: 7,
                value: 'contact_person',
                label: 'Contact Person',
                placeholder: 'John david',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'input',
                mandatory: true
            },
            {
                id: 8,
                value: 'terms_of_service',
                label: 'Terms of Service',
                placeholder: '',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'checkbox',
                mandatory: true
            },
            {
                id: 9,
                value: 'privacy_policy',
                label: 'Privacy Policy',
                placeholder: '',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'checkbox',
                mandatory: true
            }
        ],

    }
}
