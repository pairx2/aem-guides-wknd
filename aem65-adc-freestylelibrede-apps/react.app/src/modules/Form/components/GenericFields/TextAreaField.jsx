import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {isRequired} from '../../utils/validationRules';
import {useTranslation} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';

const TextAreaField = ({name, label, placeholder, hasValidateIcon, type, format, onChange, onFocus, validationRules, rows}) => {
	return (
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
			rows={rows}
		/>
	);
};

TextAreaField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	format: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	rows: PropTypes.string
};

TextAreaField.defaultProps = {
	hasValidateIcon: false,
	validationRules: null,
	type: 'text',
};

export const RenderField = ({input, label, type, placeholder, hasValidateIcon, isRequired, maxLength, meta: {touched, error}, rows}) => {
	const translatedPlaceholder = useTranslation(placeholder);
	return (<div className="adc-form-group mb-3">
		<label className="adc-form-group__label" htmlFor={input.name}>
			<I18n text={label} suffix={isRequired ? '*' : undefined}/>
		</label>
		<div className="p-relative">
			<textarea {...input}
					  type={type}
					  className={`form-control adc-form-group__input ${touched && error ? 'adc-form-group__input--error' : ''}`}
					  id={input.name}
					  placeholder={translatedPlaceholder}
					  name={input.name}
					  maxLength={maxLength}
					  rows={rows}
			/>
			{hasValidateIcon && touched && !error && <Icon image={'tick-green'} className="adc-icon--inline-right"/>}
		</div>
		{touched && error && <span className="adc-error adc-form-group--error">{error}</span>}
	</div>);
};

RenderField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	isRequired: PropTypes.bool,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	maxLength: PropTypes.number,
	rows: PropTypes.string
};

RenderField.defaultProps = {
	rows: '1'
};

export default TextAreaField;
