
import { showCustomeMessage, resendOtp } from '../../redux/app/actions';

export const verifySchema = () => {
    return {
        columns: [
            {
                id: 1,
                value: 'sms_otp',
                label: 'Phone Verification Code',
                placeholder: '000000',
                editRecord: true,
                viewRecord: true,
                viewMode: true,
                visible: true,
                type: 'input',
                mandatory: true,
                action: resendOtp
            },
            {
                id: 2,
                value: 'email_otp',
                label: 'Email Verification Code',
                placeholder: '000000',
                editRecord: true,
                viewRecord: false,
                viewMode: false,
                visible: false,
                type: 'input',
                mandatory: true,
                action: resendOtp
            },
        ]
    }
}