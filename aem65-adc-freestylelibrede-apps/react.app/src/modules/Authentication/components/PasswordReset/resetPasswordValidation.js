import React from 'react';
import I18n from '../../../Translation/components/I18n.jsx';
import {i18nLabels} from '../../../../utils/translationUtils';
import {formFieldValidationRegexes} from '../../../../utils/regexUtils';
import {validatePassword} from '../../../Form/components/PasswordStrengthFinder/PasswordStrengthFinderValidation';

export const validate = (values) => {
	const errors = {};
	const {password, retypepassword, confirmCode} = values;

	if (!confirmCode) {
		errors.confirmCode = <I18n text={i18nLabels.MANDATORY_FIELD_MESSAGE}/>;
	}
	if (!password) {
		errors.password = <I18n text={i18nLabels.MANDATORY_FIELD_MESSAGE}/>;
	} else if (formFieldValidationRegexes.PASSWORD.VALID_CHAR.test(password)) {
		errors.password = <I18n text={i18nLabels.INVALID_CHAR_ERROR_MESSAGE}/>;
	} else if (!validatePassword(password)) {
		errors.password = <I18n text={i18nLabels.MANDATORY_FIELD_SUGGESTION}/>;
	}
	if (!retypepassword) {
		errors.retypepassword = <I18n text={i18nLabels.MANDATORY_FIELD_MESSAGE}/>;
	} else if (formFieldValidationRegexes.PASSWORD.VALID_CHAR.test(retypepassword)) {
		errors.retypepassword = <I18n text={i18nLabels.INVALID_CHAR_ERROR_MESSAGE}/>;
	} else if (password !== values.retypepassword) {
		errors.retypepassword = <I18n text={i18nLabels.PASSWORD_MISMATCH}/>;
	}

	return errors;
};
