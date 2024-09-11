import React from 'react';
import I18n from '../../Translation/components/I18n.jsx';
import {i18nLabels} from '../../../utils/translationUtils';
import {formFieldValidationRegexes} from '../../../utils/regexUtils';
import {DEFAULT_COUNTRY_OPTIONS} from '../../../utils/enums.js';

const isDateValid = (day, month, year) => {
	const date = new Date(year, month - 1, day);
	return date.getDate() === parseInt(day);
};
const isFutureDate = (day, month, year) => {
	const date = new Date(year, month - 1, day);
	return date.getTime() <= new Date().getTime();
};

const isStringSpecialChar = symbol => value => value === symbol ;
export const isHyphen = isStringSpecialChar('-') ;

export const isRequired = rules => !!(rules?.find(r => r.name === 'required'));

export const required = value => {
	if (Array.isArray(value)) {
		value = value[1];
	}
	if(typeof value === 'object'){
		value = value?.value;
	}
	return value && (typeof value !== 'string' || value.trim().length) ? undefined : <I18n text={i18nLabels.MANDATORY_FIELD_MESSAGE} />;
};
export const maxLength = max => value => value && value.length > max ? <I18n text={i18nLabels.MAX_LENGTH_EXCEEDED} params={[max]} /> : undefined;
export const maxLength30 = maxLength(30);
export const maxLength20 = maxLength(20);
export const birthdate = value => {
	const matches = value.match(formFieldValidationRegexes.BIRTHDATE);
	if (!matches) return <I18n text={i18nLabels.BIRTHDATE_ERROR} />;
	if (!isDateValid(matches[1], matches[2], matches[3])) return <I18n
		text={i18nLabels.BIRTHDATE_ERROR} />;
	if (!isFutureDate(matches[1], matches[2], matches[3])) return <I18n
		text={i18nLabels.BIRTHDATE_ERROR} />;
};
export const email = value => formFieldValidationRegexes.EMAIL.test(value) ? undefined : <I18n text={i18nLabels.EMAIL_ERROR} />;
export const emailMismatch = () => <I18n text={i18nLabels.EMAIL_MISMATCH} />;
export const passwordMismatch = () => <I18n text={i18nLabels.PASSWORD_MISMATCH} />;
export const voucher = value => {
	if (!value) {
		return <I18n text={i18nLabels.VOUCHER_ERROR} />;
	}
};

export const kvnr = value => {
	if (!value) return null;

	if (!value.match(formFieldValidationRegexes.KVNR)) return <I18n text={i18nLabels.KVNR_ERROR} />;

	let kvnr = value;
	kvnr = kvnr.replace('A', '01');
	kvnr = kvnr.replace('B', '02');
	kvnr = kvnr.replace('C', '03');
	kvnr = kvnr.replace('D', '04');
	kvnr = kvnr.replace('E', '05');
	kvnr = kvnr.replace('F', '06');
	kvnr = kvnr.replace('G', '07');
	kvnr = kvnr.replace('H', '08');
	kvnr = kvnr.replace('I', '09');
	kvnr = kvnr.replace('J', '10');
	kvnr = kvnr.replace('K', '11');
	kvnr = kvnr.replace('L', '12');
	kvnr = kvnr.replace('M', '13');
	kvnr = kvnr.replace('N', '14');
	kvnr = kvnr.replace('O', '15');
	kvnr = kvnr.replace('P', '16');
	kvnr = kvnr.replace('Q', '17');
	kvnr = kvnr.replace('R', '18');
	kvnr = kvnr.replace('S', '19');
	kvnr = kvnr.replace('T', '20');
	kvnr = kvnr.replace('U', '21');
	kvnr = kvnr.replace('V', '22');
	kvnr = kvnr.replace('W', '23');
	kvnr = kvnr.replace('X', '24');
	kvnr = kvnr.replace('Y', '25');
	kvnr = kvnr.replace('Z', '26');
	let sum = 0;
	const numDigits = kvnr.length - 1;
	const cle = kvnr[parseInt(numDigits)];
	for (let i = 0; i < numDigits; i++) {
		let digit = kvnr[i];
		if (i % 2 != 0) {
			digit = digit * 2;
		}
		sum = sum + parseInt(digit > 9 ? digit - 9 : digit);
	}

	if (sum % 10 != parseInt(cle)) {
		return <I18n text={i18nLabels.KVNR_ERROR} />;
	}
};

export const phone = value => {
	if (!value || !value[1]) return null;
	const [, number, {iso2: countryCode}] = value;
	const values = countryCode === DEFAULT_COUNTRY_OPTIONS[0].country_code ? number.match(formFieldValidationRegexes.PHONEGERMANY) : number.match(formFieldValidationRegexes.PHONEOTHERCOUNTRIES);
	if (!values) return <I18n text={i18nLabels.LANDLINE_ERROR} />;
};

export const mobilePhone = value => {
	if (!value || !value[1]) return null;
	const [, number, {iso2: countryCode}] = value;
	const values = countryCode === DEFAULT_COUNTRY_OPTIONS[0].country_code ? number.match(formFieldValidationRegexes.MOBILEPHONEGERMANY) : number.match(formFieldValidationRegexes.MOBILEPHONEOTHERCOUNTRIES);
	if (!values) return <I18n text={i18nLabels.MOBILE_PHONE_ERROR} />;
};

export const mobilePhoneValidation = value => {
	if (!value || !value[1]) 
		return null;
	const [, number, {iso2: countryCode}] = value;
	let values;
	if(countryCode === DEFAULT_COUNTRY_OPTIONS[0].country_code && !formFieldValidationRegexes.NEWMOBILEPHONEGERMANY.test(number)){
		return <I18n text={i18nLabels.GERMANY_MOBILE_PHONE_ERROR} />;
	}else{
		values = number.match(formFieldValidationRegexes.GLOBALMOBILEPHONE);
	}
	if (!values){
		return <I18n text={i18nLabels.MOBILE_PHONE_ERROR} />;
	}
};

export const newLandlinePhone = value => {
	if (!value || !value[1]) 
		return null;
	const [, number] = value;
	let values = number.match(formFieldValidationRegexes.GLOBALMOBILEPHONE);
	if (!values){
		return <I18n text={i18nLabels.LANDLINE_ERROR} />;
	}
};

export const otpText = value => {
	const [number] = value;
	const values =  number.match(formFieldValidationRegexes.NUMBERONLY);
	if (!values) return <I18n text={i18nLabels.OTP_FIELD_ERROR} />;
};

export const isQuantityRequired = (value, allValues) => {
	const selectedValues = Object.keys(allValues).filter(valueFilter => valueFilter !== 'returnReason');
	if (selectedValues.length < 1 && !value) return <I18n text={i18nLabels.MANDATORY_FIELD_MESSAGE} />;
};

export const regexDynamicMatch = (value, allValues, props, name) => {
	let errors = ''

	const regexDynamic = new RegExp(props[name +"ValidationRegex"], 'g');
	if (!regexDynamic.test(value)) {
		errors = props[name + "ErrorText"];
	}

	return errors;
}

export const customerNumber = (value) => {
	if (!value) return null;
	if (!value.match(formFieldValidationRegexes.CUSTOMERNUMBER)) return <I18n text={i18nLabels.OFFLINE_TO_ONLINE_CUSTOMER_NUM_VAL_ERROR} />;
}