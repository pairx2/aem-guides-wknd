import React from 'react';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';

const simpleRenderField = ({input, options, meta: {touched, error}}) => (
	options.map((option) => {
		const id = `${input.name}-${option.value}`;
		return (
			<div key={`${input.name}-${option.value}`} className={'adc-radio d-flex ' + (touched && (error && 'adc-form-group__input-radio-group__label--error'))}>
				<input
					{...input}
					id={id}
					type='radio'
					name={input.name}
					className="mr-4"
					value={option.value}
				/>
				<label htmlFor={id} className="adc-radio__label mb-3 flex-grow-1">
					<span className="d-inline-block w-100">
						<I18n text={option.label}/>
					</span>
				</label>
			</div>
		);
	})
);

const horizontalRenderField = ({input, isDisabled,options, meta: {touched, error}, input: {value}}) => (
	options.map((option) => {
		const id = `${input.name}-${option.value}`;
		return (
			<label
				key={`${input.name}-${option.value}`}
				className={`btn btn-primary${isDisabled && value !== option.value ?'-disabled':''} adc-form-group__input-radio-group__label bg-white ${value === option.value ? 'active' : ''} ` + (touched && (error && ' adc-form-group__input-radio-group__label--error'))}
				htmlFor={id}
			>
				<input
					{...input}
					id={id}
					type='radio'
					name={input.name}
					className="d-none"
					value={option.value}
					disabled={isDisabled}
				/> <I18n text={option.label}/>
			</label>
		);
	})
);

horizontalRenderField.propTypes = {
	options: PropTypes.array,
	selectedOption: PropTypes.string,
	handleClick: PropTypes.func
};

const verticalRenderField = ({input, options, meta: {touched, error}, input: {value}}) => (
	<div className="adc-shipping-options large">
		{options.map((option) => {
			const id = `${input.name}-${option.value}`;
			return (
				<div key={`${input.name}-${option.value}`} className={'adc-tabs position-relative mb-3'}>
					<label className={`adc-tabs__label d-block m-0 px-3 py-3 ${value === option.value ? 'active' : ''} ${(touched && (error && 'adc-form-group__input-radio-group__label--error'))}`} htmlFor={id}>
						<input
							{...input}
							id={id}
							type='radio'
							name={input.name}
							className="d-none"
							value={option.value}
						/> <I18n text={option.label} />
					</label>
					<Icon image={'formcheck-success-white adc-tabs__blue-circle position-absolute'}
						  size={Icon.SIZE.MEDIUM}
						  style={Icon.STYLE.BLUE}
					/>
				</div>
			);
		})}
	</div>
);

verticalRenderField.propTypes = {
	options: PropTypes.array,
	selectedOption: PropTypes.string,
	handleClick: PropTypes.func
};

const RadioButtonReduxField = ({name, options, validationRules, type,isDisabled}) => {
	return (
		<Field
			name={name}
			validate={validationRules}
			props={{options}}
			component={type}
			isDisabled={isDisabled}
		/>
	);
};

export const RADIO_BUTTON_TYPES = {
	SIMPLE: simpleRenderField,
	HORIZONTAL: horizontalRenderField,
	VERTICAL: verticalRenderField
};

RadioButtonReduxField.propTypes = {
	validationRules: PropTypes.array,
	name: PropTypes.string,
	options: PropTypes.array,
	type: PropTypes.func,
	isDisabled: PropTypes.bool
};

RadioButtonReduxField.defaultProps = {
	validationRules: null,
	type: RADIO_BUTTON_TYPES.HORIZONTAL
};

export default RadioButtonReduxField;