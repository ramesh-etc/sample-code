export const loginSchema = () => {
    return {
        columns: [
            {
                id: 1,
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
                id: 2,
                value: 'password',
                label: 'Password',
                placeholder: '&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;',//medium dots
                // placeholder: '&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;',//big dots
                // placeholder: '.........',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'password',
                mandatory: true
            },
        ]
    }
}