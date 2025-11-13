
export const forgetPasswordSchema = () => {
    return {
        columns: [
            {
                id: 1,
                value: 'email',
                label: '',
                placeholder: 'Enter your email',
                editRecord: true,
                viewRecord: true,
                viewMode: true,
                visible: true,
                type: 'input',
                mandatory: true,
            }
        ]
    }
}