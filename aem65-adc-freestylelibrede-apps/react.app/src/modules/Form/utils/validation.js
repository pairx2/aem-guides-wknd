import React from 'react';
import I18n from '../../Translation/components/I18n.jsx';
import {formFields} from './fieldsTobeValidated';

export const validate = (values, props) => {
	const errors = {};
	if (formFields[props?.form]) {
		Object.values(formFields[props.form]).forEach(field => {
			if (!values[field]) {
				errors[field] = <I18n text={`${field}_error`}/>;
			}
		});
	}
	return errors;
};