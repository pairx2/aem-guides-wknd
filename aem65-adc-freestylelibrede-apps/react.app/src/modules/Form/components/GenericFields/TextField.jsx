import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {isRequired} from '../../utils/validationRules';
import RenderField from '../RenderField';


const TextField = ({name, label, placeholder, hasValidateIcon, type, format, onChange, isDisabled, onFocus, validationRules, autocomplete, className, maxLength , labelClassName}) => {
	return (
		<div className={`adc-form-group mb-2  ${className}`}>
			<Field
				name={name}
				label={label}
				type={type}
				placeholder={placeholder}
				hasValidateIcon={hasValidateIcon}
				format={format}
				isRequired={isRequired(validationRules)}
				validate={validationRules}
				component={RenderField}
				onChange={onChange}
				onFocus={onFocus}
				autocomplete={autocomplete}
				isDisabled={isDisabled}
				maxLength={maxLength}
				labelClassName={labelClassName}
			/>
		</div>
	);
};

TextField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	autocomplete: PropTypes.string,
	format: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	isDisabled:PropTypes.bool,
	className: PropTypes.string
};

TextField.defaultProps = {
	hasValidateIcon: false,
	validationRules: null,
	autocomplete: 'off',
	type: 'text',
	isDisabled: false,
};

export default TextField;
