
import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import TextField from '../../Form/components/GenericFields/TextField';
import EmailField, {fraudDomains} from '../../Form/components/FormFields/EmailField';
import SelectFieldWithSearch from '../../Form/components/GenericFields/SelectFieldWithSearch';
import BirthDateField from '../../Form/components/FormFields/BirthDateField';
import 'react-datepicker/dist/react-datepicker.css'
import { required,email } from '../../Form/utils/validationRules';
import RecaptchaField from '../../Form/components/GenericFields/RecaptchaField';
import I18n from '../../Translation/components/I18n';
import { i18nLabels } from '../../../utils/translationUtils';
import { structureValue } from '../utils/plusServiceFiledCheck';
import { RECAPTCHA_VALIDATION_ERROR_CODE } from '../../../utils/enums';
const mapStateToProps = state => {
    const { values: fieldsPlusValues } = state.form.fieldsPlus || {};
    return { fieldsPlusValues }
};
const validate = (value,props) => {
    const { fields, values: fieldsPlusValues } = props;
    const valueRequired = fieldsPlusValues ? structureValue('requiredDate', fields, fieldsPlusValues).toLowerCase().includes("datum") : false
    const errors ={};
    const requiedFlag= fields.find(e => e.fieldId === "terminationTime")?.required;
    if ( requiedFlag && valueRequired && !value.terminationTime) {
       errors.terminationTime= <I18n text={'mandatory_field_message'}/>;
    }
   return errors
}

const RenderDatePicker = ({name, field, valueRequired, input, error}) => {
    return (<>
        <div className='plus-cancellation'>
            <div class="adc-form-group mb-3">
                <label class="adc-form-group__label" htmlFor={name}>{field.required && valueRequired ? field.fieldName + "*" : field.fieldName}</label>
                <div class="adc-form-group plus-cancellation">
                    <DatePicker
                        name={field.fieldId}
                        label={field.fieldName}
                        placeholderText={field.fieldplaceholder}
                        disabled={!valueRequired}
                        minDate={new Date()}
                        dateFormat="dd.MM.yyyy"
                        className="form-control adc-form-group__input"
                        autoOk={true}
                        selected={valueRequired ? input.value : ""}
                        onChange={(e) => input.onChange(e)} disabledKeyboardNavigation>
                        
                    </DatePicker>
                    {(error && <span className="adc-error adc-form-group--error">{error}</span>)}
                </div>
            </div>
        </div>
    </>)
}

const renderField = ({ input, field, fieldProp, fields, meta: { touched, error } }) => {
    const { fieldType } = field
    const name = field.fieldName.split('(')[0].trim();
    const propsValue = {
        hasValidateIcon: field.required,
        validationRules: field.required ? [required] : [],
        name: name,
        label: field.fieldName,
        placeholder: field.fieldplaceholder,
        autocomplete: 'off',
        maxLength: field.textLimit,
    };

    if (fieldType === "text-field") {
        return <TextField {...propsValue} />
    } else if (fieldType === "email-field") {
        return <EmailField name={name} validationRules={[required, email,fraudDomains]}/>
    } else if (fieldType === "dropdown-field") {
        const dropOprtions = field.options.map(option => ({ label: option.option, value: option.value }));

        return <>        <div className="adc-form-group">
            <SelectFieldWithSearch className={"adc-form-group__label"}
                options={dropOprtions}
                name={name}
                label={field.fieldName}
                placeholder={field.fieldplaceholder}
                validationRules={field.required ? [required] : []}
            />
        </div></>


    } else if (fieldType === "date-field") {
        if (field.fieldId === "terminationTime") {
            const valueRequired = fieldProp ? structureValue('requiredDate', fields, fieldProp).toLowerCase().includes("datum") : false;
            return <>
                <RenderDatePicker name={name} field={field} valueRequired={valueRequired} input={input} error={error} />
            </>
        }
        if (field.fieldId === "dob") {
            return <>
                <BirthDateField isDisabled={false} name={name} label={field.fieldName} placeholder={field.fieldplaceholder} />
            </>
        }

    }
    return false;
};

const FieldsPlus = ({ valid, handleSubmit, fields, cta, callDate, selectedDate, isCalendarOpen, handleChange, handleConfirm, toggleCalendar, plusServiceCancellationResponce, disclaimerText, fieldsPlusValues, enablecaptcha, plusServiceCancellationErrorMessage ,  errorCode}) => {
    return (
        <div>
            {fields.map(field => (
                <div key={field.fieldName}>
                    <Field
                        name={field.fieldId}
                        label={field.fieldName}
                        component={renderField}
                        field={field}
                        fieldProp={fieldsPlusValues}
                        fields={fields}
                    />
                </div>
            ))}
            <p className="adc-registration--required mt-3 mb-4 text-right">
                <I18n text={i18nLabels.MANDATORY_FIELD} prefix={'* '} />
            </p>
            <div dangerouslySetInnerHTML={{ __html: disclaimerText }}></div>
            <div className={'mt-5'}>
                <if condition={enablecaptcha === true}>
                    <RecaptchaField />
                </if>
            </div>
            <if condition={plusServiceCancellationResponce === "fails" && errorCode !== RECAPTCHA_VALIDATION_ERROR_CODE}>
                <p id="plusCancellationErrorMessage" className='plus-cancellation-error'>
                    {plusServiceCancellationErrorMessage}
                </p>
            </if>
            <if condition={plusServiceCancellationResponce === "fails" && errorCode === RECAPTCHA_VALIDATION_ERROR_CODE}>
                <p id="plusCancellationErrorMessage" className='plus-cancellation-error'>
                   <I18n text={i18nLabels.RECAPTCHA_VALIDATION_ERROR}/>
                </p>
            </if>
            <button disabled={!valid}
                className={'adc-button mt-3 mb-4 ml-0 mr-0 adc-button--block adc-button-' + cta.type}
                onClick={handleSubmit}>{cta.text}
            </button>
        </div>
    )
};

export default reduxForm({
    form: 'fieldsPlus',
    destroyOnUnmount: false,
    validate
})(connect(mapStateToProps)(FieldsPlus));
