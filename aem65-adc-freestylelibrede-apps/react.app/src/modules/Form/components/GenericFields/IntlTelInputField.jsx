import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import IntlTelInput from 'react-intl-tel-input';
import {Field} from 'redux-form';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import '../../../../../node_modules/react-intl-tel-input/dist/main.css';
import {numberWithPlusAndSpacesOnly} from '../../../../utils/formUtils';
import {useTranslation} from '../../../../utils/translationUtils';
import {COUNTRY_OPTIONS} from '../../../../utils/enums';

const INPUT_FILED_NAME = {
	MOBILE_PHONE : 'mobile_phone'
};

const NUMBER_TYPE = {
	MOBILE : 'MOBILE',
	FIXED_LINE: 'FIXED_LINE'
};

export const IntlTelInputRenderField = ({input, label, placeholder, isRequired, defaultMaxLength, defaultValue, defaultCountry, hasValidateIcon, meta: {touched, error}}) => {
	const translatedPlaceholder = useTranslation(placeholder);
	const [maxLength, setMaxLength] = useState(defaultMaxLength);
	const inputRef =useRef(null);

	useEffect(() => {
		setMaxLength(defaultMaxLength);
		if (inputRef.current) {
			const numberInputField= inputRef.current.querySelector('input');
			if (input?.value?.length > 0) {
				numberInputField.setSelectionRange(input?.value?.length,input?.value?.length);
			}
			
		}

	}, [input.value]);

	const onChange = (...args) => {
		input.onChange(args);
	};

	const onBlur = (...args) => {
		input.onBlur(args);
	};

	const onSelectFlag = () => {
		input.value = '';
		setMaxLength(defaultMaxLength);
	};

	const inputFieldCondition = input.value == undefined ? '' : input.value;
	return (<>
		<label className="adc-form-group__label" htmlFor={input.name}>
			<I18n text={label} suffix={isRequired ? '*' : undefined}/>
		</label>
		<div className="p-relative" ref={inputRef}>
			<IntlTelInput
				telInputProps={{
					maxLength: maxLength
				}}
				preferredCountries={[]} // To remove the countries at the top of the list. defaults to United States and United Kingdom.
				onlyCountries={COUNTRY_OPTIONS.map(country => country.value.toLowerCase())}
				fieldName={input.name}
				onPhoneNumberChange={onChange}
				onPhoneNumberBlur={onBlur}
				value={Array.isArray(input.value) ? input.value[1] : inputFieldCondition}
				defaultValue={defaultValue}
				onSelectFlag={onSelectFlag}
				placeholder={translatedPlaceholder}
				numberType={input.name === INPUT_FILED_NAME.MOBILE_PHONE ? NUMBER_TYPE.MOBILE : NUMBER_TYPE.FIXED_LINE}
				defaultCountry={defaultCountry}
				formatOnInit={false}
				inputClassName={`form-control adc-form-group__input ${touched && error ? 'adc-form-group__input--error' : ''}`}
			/>
			{hasValidateIcon && touched && !error && input.value &&
			<Icon image={'tick-green'} className="adc-icon--inline-right"/>}
		</div>
		{touched && error && <span className="adc-error adc-form-group--error">{error}</span>}
	</>);
};

const IntlTelInputField = ({name, label, isRequired, validationRules, defaultMaxLength, defaultValue, defaultCountry, hasValidateIcon, placeholder}) => {
	return (
		<div className="adc-form-group mb-3">
			<Field
				name={name}
				label={label}
				format={numberWithPlusAndSpacesOnly}
				defaultValue={defaultValue}
				defaultCountry={defaultCountry}
				isRequired={isRequired}
				validate={validationRules}
				hasValidateIcon={hasValidateIcon}
				defaultMaxLength={defaultMaxLength}
				component={IntlTelInputRenderField}
				placeholder={placeholder}
			/>
		</div>
	);
};
IntlTelInputField.propTypes = {
	name: PropTypes.string,
	validationRules: PropTypes.array,
	label: PropTypes.string,
	isRequired: PropTypes.bool,
	hasValidateIcon: PropTypes.bool,
	defaultMaxLength: PropTypes.string,
	defaultValue:PropTypes.string,
	defaultCountry: PropTypes.string,
	placeholder: PropTypes.string
};

IntlTelInputRenderField.propTypes = {
	label: PropTypes.string,
	hasValidateIcon: PropTypes.bool,
	isRequired: PropTypes.bool,
	defaultMaxLength: PropTypes.string,
	defaultValue:PropTypes.string,
	defaultCountry: PropTypes.string,
	placeholder: PropTypes.string
};

export default IntlTelInputField;
