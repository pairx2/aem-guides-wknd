import {useTranslation} from '../../../utils/translationUtils';
import I18n from '../../Translation/components/I18n';
import Icon from '../../Generic/components/Icon/Icon';
import PropTypes from 'prop-types';
import React from 'react';

const RenderField = ({input, label, type, placeholder, hasValidateIcon, isRequired, isDisabled, maxLength, labelClassName, autocomplete, meta: {touched, error}}) => {
	const translatedPlaceholder = useTranslation(placeholder);
	return (<>
		<label className={"adc-form-group__label "+ labelClassName} htmlFor={input.name}>
			<I18n text={label} suffix={isRequired? '*' : undefined}/>
		</label>
		<div className="p-relative">
			<input {...input}
				autoComplete={autocomplete}
				   type={type}
				   className={`form-control adc-form-group__input ${touched && error ? 'adc-form-group__input--error' : ''}`}
				   id={input.name}
				   placeholder={translatedPlaceholder}
				   name={input.name}
				   value={input.value || ''}
				   disabled={isDisabled}
				   maxLength={maxLength}/>
			{hasValidateIcon && touched && !error && input.value && <Icon image={'tick-green'} className="adc-icon--inline-right"/>}
		</div>
		{touched && error && <span className="adc-error adc-form-group--error">{error}</span>}
	</>);
};

RenderField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	isRequired: PropTypes.bool,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	autocomplete: PropTypes.string,
	maxLength: PropTypes.number,
	isDisabled:PropTypes.bool,
};

export default RenderField;