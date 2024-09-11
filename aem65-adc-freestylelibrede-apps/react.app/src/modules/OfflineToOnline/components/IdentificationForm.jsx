import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import TextField from '../../Form/components/GenericFields/TextField';
import { kvnr, customerNumber } from '../../Form/utils/validationRules';
import Button, { BUTTON_OPTIONS } from '../../Generic/components/Button/Button';
import FieldList from '../../Form/components/FieldList';
import BirthDateField from '../../Form/components/FormFields/BirthDateField';
import RecaptchaField from '../../Form/components/GenericFields/RecaptchaField';
import { i18nLabels } from '../../../utils/translationUtils';
import I18n from '../../Translation/components/I18n';
import {OfflineToOnlineIdentificationFormStart} from '../../../utils/adobeAnalyticsUtils';

const IdentificationForm = ({ handleSubmit, onSubmitIdentity, formFields, informationText }) => {
    
    const [formStart, setFormStart] = useState(false)

    const preSubmit = async (formData) => {
         await window?.grecaptcha?.enterprise?.execute().then(function (token){
			formData['recaptchaValue'] = token;
		});
        onSubmitIdentity(formData);
    }

    const handleEvent = () => {
		if(!formStart){
			OfflineToOnlineIdentificationFormStart();
			setFormStart(true)
		}
	}

    return (
        <form onClick={handleEvent} onSubmit={handleSubmit(preSubmit)}>
            <div className="adc-registration__left pb-2 pb-md-2 pb-lg-0 position-relative">
                <FieldList options={formFields} />
                <BirthDateField />
                <p className="registration-subheading-description mt-5">{informationText}</p>
                <div className="adc-form-group mb-3">
                    <TextField
                        label={i18nLabels.OFFLINE_TO_ONLINE_CUSTOMER_NUMBER_LABEL}
                        name="customerNumber"
                        placeholder={i18nLabels.OFFLINE_TO_ONLINE_CUSTOMER_NUMBER_PLACEHOLDER}
                        type="text"
                        className={'mt-1'}
                        validationRules={[customerNumber]}
                        labelClassName={"adc-arvato-widget-label-style"}
                    />
                </div>
                <div className="adc-form-group mb-3">
                    <TextField
                        label={i18nLabels.OFFLINE_TO_ONLINE_KVNR_NUMBER_LABEL}
                        name="kvnrNumber"
                        placeholder={i18nLabels.OFFLINE_TO_ONLINE_KVNR_NUMBER_PLACEHOLDER}
                        type="text"
                        className={'mt-1'}
                        validationRules={[kvnr]}
                        labelClassName={"adc-arvato-widget-label-style"}
                    />
                </div>
                <div className={'mt-4'}>
                    <RecaptchaField />
                </div>
                <div className="adc-registration--submit-btn">
                    <Button
                        label={i18nLabels.OFFLINE_TO_ONLINE_SUBMIT_BTN_LABEL}
                        ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
                        className={'float-left col-md-6'}
                        type={BUTTON_OPTIONS.TYPE.SUBMIT}
                        hasNoMargin
                        isFullWidth
                    />
                </div>
            </div>
           
        </form>
    );
};

IdentificationForm.propTypes = {
    handleSubmit: PropTypes.func
};

const validate = values => {
    const errors = {};
    if (!values.customerNumber && !values.kvnrNumber) {
        errors.customerNumber = <I18n text={i18nLabels.OFFLINE_TO_ONLINE_CUSTOMER_NUM_VAL_ERROR} />;
        errors.kvnrNumber = <I18n text={i18nLabels.OFFLINE_TO_ONLINE_KVNR_NUM_VAL_ERROR} />;
 
    }
    return errors;
}

export default reduxForm({
    form: 'IdentificationForm',
    validate
})(IdentificationForm);
