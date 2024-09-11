import React from 'react';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {isRequired} from '../../utils/validationRules';
import {useTranslation} from '../../../../utils/translationUtils';

const renderField = (
	{
		input,
		label,
		placeholder,
		options,
		isDisabled,
		isRequired,
		renderOptionLabelsWithoutTranslation,
		meta: {touched, error}
	}) => (
	<>
		{
			label &&
			<label className="adc-product-details__label-title ml-3">
			<I18n text={label} suffix={isRequired? ' *' : undefined}/>
			</label>
		}
		<div className="adc-product-details__select-style">
			<select {...input} disabled={isDisabled} required={isRequired}>
				{
					placeholder &&
					<option value='' disabled hidden>{useTranslation(placeholder)}</option>
				}
				{
					options.map(option =>
						<option key={option.value} value={option.value}>
							{renderOptionLabelsWithoutTranslation ? option.label : useTranslation(option.label)}
						</option>)
				}
			</select>
		</div>
		{
			touched && (error && <span className="adc-error adc-form-group--error">{error}</span>)
		}
	</>
);

renderField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.any
	})),
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	isDisabled: PropTypes.bool,
	isRequired: PropTypes.bool,
	renderOptionLabelsWithoutTranslation: PropTypes.bool
};


const SelectField = (
	{
		name,
		label,
		placeholder,
		options,
		onChange,
		onFocus,
		isDisabled,
		validationRules,
		renderOptionLabelsWithoutTranslation}) => (
	<Field
		name={name}
		label={label}
		placeholder={placeholder}
		required={isRequired(validationRules)}
		options={options}
		validate={validationRules}
		component={renderField}
		onChange={onChange}
		onFocus={onFocus}
		disabled={isDisabled}
		renderOptionLabelsWithoutTranslation={renderOptionLabelsWithoutTranslation}
	/>
);

SelectField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.any
	})),
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	isDisabled: PropTypes.bool,
	validationRules: PropTypes.array,
	renderOptionLabelsWithoutTranslation: PropTypes.bool
};

export default SelectField;