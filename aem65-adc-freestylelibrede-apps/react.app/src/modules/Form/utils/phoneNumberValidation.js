import React from 'react';
import I18n from '../../Translation/components/I18n.jsx';
import {i18nLabels} from '../../../utils/translationUtils';

const phoneNumberValidation = values => {
	const errors = {};
	const hasValidLandlineNumber = Array.isArray(values.landline_phone) ? values.landline_phone[1] : values.landline_phone;
	const hasValidMobilePhoneNumber = Array.isArray(values.mobile_phone) ? values.mobile_phone[1] : values.mobile_phone;

	if (!hasValidLandlineNumber && !hasValidMobilePhoneNumber) {
		errors.landline_phone = <I18n text={i18nLabels.MANDATORY_PHONE_FIELD}/>;
		errors.mobile_phone = <I18n text={i18nLabels.MANDATORY_PHONE_FIELD}/>;
	}

	return errors;
};

export default phoneNumberValidation;
