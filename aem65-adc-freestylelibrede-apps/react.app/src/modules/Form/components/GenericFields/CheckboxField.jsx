import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import I18n from '../../../Translation/components/I18n';
import {isRequired} from '../../utils/validationRules';
import Icon from '../../../Generic/components/Icon/Icon';
const CHECKBOX_ID_PREFIX = 'checkbox_button';

const blueCheckboxRenderField = (params, containerClass) => ({input, label, isDisabled, required, hasRef, checkboxAlignment, iconClass, meta: {touched, error}}) => {
	const ref = hasRef ? React.createRef() : undefined;
	return (
		<label className={`checkbox-container adc-checkboxList__checkboxlabel ${containerClass} ${isDisabled ? 'disable' : ''}`} onMouseUp={(e) => { hasRef && e.target.tagName !== 'A' && ref.current.click(); }}>
			<if condition={checkboxAlignment==='right'}>
				<Icon className={"adc-edit-contact-details-style-icon"}
					image={!input.value ? iconClass+"-grey" : iconClass}
					size={Icon.SIZE.SMALLER}
				/>
				<div className={input.value ?'adc-edit-contact-details-padding-lable': 'adc-edit-contact-details-padding-lable adc-edit-contact-details-padding-lable-grey'}>
					<I18n text={label} params={params} suffix={required ? '*' : undefined} />
				</div>
				<input
					ref={ref}
					{...input}
					type='checkbox'
					checked={input.value}
					disabled={isDisabled}
					className="checkbox-container__input"
					id={`${CHECKBOX_ID_PREFIX}_${input.name}`}
					value={input.value}
					onChange={value => input.onChange(value, input.name)}
				/>
				<span className={'checkbox-container__checkmark-right ' + (touched && (error && ' checkbox-container__checkmark--error'))} />
			</if>
			<else>
				<input
					ref={ref}
					{...input}
					type='checkbox'
					checked={input.value}
					disabled={isDisabled}
					className="checkbox-container__input"
					id={`${CHECKBOX_ID_PREFIX}_${input.name}`}
					value={input.value}
					onChange={value => input.onChange(value, input.name)}
				/>
				<span
					className={'checkbox-container__checkmark ' + (touched && (error && ' checkbox-container__checkmark--error'))} />
				<I18n text={label} params={params} suffix={required ? '*' : undefined} />
			</else>
			
			{touched && (error && <span className="checkbox-container__error">{error}</span>)}
		</label>
	);
};

const whiteCheckboxRenderField = (params, containerClass) => ({input, label, isDisabled, required, hasRef, meta: {touched, error}}) => {
	const ref = hasRef ? React.createRef() : undefined;
	return (
		<div className={'custom-control custom-checkbox ' + containerClass}>
			<input
				ref={ref}
				{...input}
				type='checkbox'
				name={input.name}
				checked={input.value}
				disabled={isDisabled}
				className="custom-control-input"
				id={`${CHECKBOX_ID_PREFIX}_${input.name}`}
				value={input.value}
				onChange={value => input.onChange(value, input.name)}
			/>
			<label className="custom-control-label" onMouseUp={(e) => { hasRef && e.target.tagName !== 'A' && ref.current.click(); }}>
				<I18n text={label} params={params} suffix={required ? '*' : undefined} />
			</label>
			{touched && (error && <span className="checkbox-container__error">{error}</span>)}
		</div>
	);
};

export const CHECKBOX_TYPES = {
	BLUE: blueCheckboxRenderField,
	WHITE: whiteCheckboxRenderField
};

const CheckboxField = ({ name, label, validationRules, params, type, containerClass, format, normalize, isDisabled, hasRef, onChange, checkboxAlignment, iconClass }) => {
	return (
		<Field
			name={name}
			label={label}
			required={isRequired(validationRules)}
			validate={validationRules}
			component={type(params, containerClass)}
			format={format}
			normalize={normalize}
			isDisabled={isDisabled}
			hasRef={hasRef}
			onChange={onChange}
			checkboxAlignment={checkboxAlignment}
			iconClass={iconClass}
		/>
	);
};

CheckboxField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	params: PropTypes.array,
	containerClass: PropTypes.string,
	format: PropTypes.func,
	normalize: PropTypes.func,
	validationRules: PropTypes.array,
	isDisabled:PropTypes.bool,
	type: PropTypes.oneOf([...Object.values(CHECKBOX_TYPES)]),
	hasRef: PropTypes.bool,
	onChange: PropTypes.func
};

CheckboxField.defaultProps = {
	validationRules: null,
	type: CHECKBOX_TYPES.BLUE,
	format: (v) => v,
	normalize: (v) => v,
	hasRef: true
};

export default CheckboxField;