import {formFieldValidationRegexes} from  './regexUtils';
import {COUNTRY_OPTIONS,COUNTRY_ISD_CODE_COMBINATIONS_PLUS} from './enums';
import {fetchFraudDomainRequest} from '../modules/Form/redux/actions/form.actions';
import {useDispatch, useSelector} from 'react-redux';

export const numberOnly = (_value) => {
	if (!_value) return;
	const [,number] = _value;
	if (!number?.replace(/\s/g, '').match(formFieldValidationRegexes.NUMBERONLY)) {
		return '';
	} else {
		return _value;
	}
};

const numberWithPlusAndZero = (number1) =>{
	if(number1.startsWith('+')){	
		for(let isdCode of COUNTRY_ISD_CODE_COMBINATIONS_PLUS){
			if(number1.startsWith(isdCode)){
				number1 = number1.replace(isdCode,'');
				return '0'+number1.trim();
			}
		}
		if(number1.startsWith('+0'))
			return number1.replace('+0','0');
	}
}

export const numberWithPlusAndSpacesOnly = (_value) => {
	if (!_value) return;
	const [,number] = _value;
	let number1 = number.toString();
	if(typeof _value == 'string'){
		number1 = _value.toString();
	}
	
	if (!number?.replace(/\s/g, '').match(formFieldValidationRegexes.NUMBERWITHPLUSANDSPACESONLY)) {
		return '';
	} else {
		if(numberWithPlusAndZero(number1)) {
			return numberWithPlusAndZero(number1);
		}
		if(number1.startsWith('00')){
			number1 = number1.replace('00','0');
			return number1.trim();
		}
		if(number1.length > 0 && !number1.startsWith('0') && !number1.startsWith('+')){
			return '0'+number1.trim();
		}
		return number1;
	}
};

export const useFraudDomain = () => {
	useDispatch(fetchFraudDomainRequest());
	const {fraudDomain} = useSelector(state => state.formModuleReducer.formReducer);
	return fraudDomain;
};

export const getNumberFromString = (value) => {
	if (!value) return;
	const number = value?.split(' ');
	if (!number) return;
	const codeVal = COUNTRY_OPTIONS.filter(country => country.code == number[0]);
	const countryCode = codeVal?.[0]?.value?.toLowerCase();
	const nationalNumber = number?.[2] ? number?.[1]+number?.[2] : number?.[1];
	return {countryCode, nationalNumber};
};