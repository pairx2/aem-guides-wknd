import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {isRequired} from '../../utils/validationRules';
import RenderField from '../RenderField';

const SimpleDateField = ({name, type, label, placeholder, hasValidateIcon, validationRules, maxLength, isDisabled}) => {
	const normalize = (val, prevVal) => {
		if (isNaN(parseInt(val[val.length - 1], 10))) {
			return val.slice(0, -1);
		}
		if (prevVal && (prevVal.length >= val.length)) {
			return val;
		}
		if (val.length === 2 || val.length === 5) {
			val += '.';
		}
		if (val.length >= 10) {
			return val.slice(0, 10);
		}
		return val;
	};
	return (
		<div className="adc-form-group mb-3">
			<Field
				name={name}
				label={label}
				placeholder={placeholder}
				hasValidateIcon={hasValidateIcon}
				type={type}
				validate={validationRules}
				isRequired={isRequired(validationRules)}
				component={RenderField}
				normalize={normalize}
				maxLength={maxLength}
				isDisabled = {isDisabled}
				autocomplete={'off'}
			/>
		</div>
	);

};

SimpleDateField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	type: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	maxLength: PropTypes.number,
	isDisabled: PropTypes.bool
};

SimpleDateField.defaultProps = {
	hasValidateIcon: false,
	validationRules: null,
	type: 'text',
	maxLength: 10,
	isDisabled: false
};

export default SimpleDateField;
