
import CustomInput from '../CustomInput';
import PasswordField from '../PasswordField';
import CheckboxField from '../CheckboxField';
import SelectField from '../SelectField';
import PhoneNumberField from '../PhoneNumberField/index';
import FileUpload from '../FileUpload';
import DateField from '../DateField';
import DateCalendarField from '../DateCalendarField';
import AutoCompleteField from '../AutoCompleteField';
import TextAreaField from '../TextAreaField';
import MultiCheckboxField from '../MultiCheckBoxField';
import SwitchField from '../SwitchField';

export const ImplementationFor = {
    input: CustomInput,
    number: CustomInput,
    password: PasswordField,
    select: SelectField,
    checkbox: CheckboxField,
    phone: PhoneNumberField,
    upload: FileUpload,
    date: DateField,
    dateCalendar: DateCalendarField,
    autoComplete: AutoCompleteField,
    textarea: TextAreaField,
    multiCheckBox: MultiCheckboxField,
    switch: SwitchField
};
