import React from 'react';
import I18n from '../../../Translation/components/I18n.jsx';
import {i18nLabels} from '../../../../utils/translationUtils';
import {validatePassword} from '../../../Form/components/PasswordStrengthFinder/PasswordStrengthFinderValidation';
import {formFieldValidationRegexes} from '../../../../utils/regexUtils.js';

const validate = values => {
	const errors = {};
	if (!values.password) {
		errors.password = <I18n text={i18nLabels.MANDATORY_FIELD}/>;
	} else if (formFieldValidationRegexes.PASSWORD.VALID_CHAR.test(values.password)) {
		errors.password = <I18n text={i18nLabels.INVALID_CHAR_ERROR_MESSAGE}/>;
	} else if (!validatePassword(values.password)) {
		errors.password = <I18n text={i18nLabels.MANDATORY_FIELD_SUGGESTION}/>;
	} 
	return errors;
};

export default validate;