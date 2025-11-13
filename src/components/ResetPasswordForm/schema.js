
export const resetPasswordSchema = () => {
    return {
        columns: [
            {
                id: 1,
                value: 'new_password',
                label: 'Passwrd',
                placeholder: '&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;',
                editRecord: true,
                viewRecord: true,
                viewMode: true,
                visible: true,
                type: 'password',
                mandatory: true,
            },
            {
                id: 2,
                value: 'confirm_password',
                label: 'Confirm Password',
                placeholder: '&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;',
                editRecord: true,
                viewRecord: true,
                viewMode: true,
                visible: true,
                type: 'password',
                mandatory: true,
            }
        ]
    }
}