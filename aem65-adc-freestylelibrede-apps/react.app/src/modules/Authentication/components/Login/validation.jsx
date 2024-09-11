import React from 'react';
import I18n from '../../../Translation/components/I18n';
import {formFieldValidationRegexes} from '../../../../utils/regexUtils';

export const validate = (values) => {
	const errors = {};
	const {password, email} = values;

	if (!password) {
		errors.password = <I18n text={'mandatory_field_message'}/>;
	}

	if (!email) {
		errors.email = <I18n text={'mandatory_field_message'}/>;
	} else if (!formFieldValidationRegexes.EMAIL.test(email)) {
		errors.email = <I18n text={'email_error'}/>;
	}
	return errors;
};