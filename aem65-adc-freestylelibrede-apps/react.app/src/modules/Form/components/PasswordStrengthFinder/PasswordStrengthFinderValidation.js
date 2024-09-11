import {formFieldValidationRegexes} from '../../../../utils/regexUtils';

export const validatePasswordLength = password => password.length >= 8;
export const validatePasswordSymbol = password => !!password.match(formFieldValidationRegexes.PASSWORD.CONTAINS_SPECIAL_CHAR);
export const validatePasswordCharacter = password => !!password.match(formFieldValidationRegexes.PASSWORD.CONTAINS_LOWER_CHAR) && !!password.match(formFieldValidationRegexes.PASSWORD.CONTAINS_UPPER_CHAR);
export const validatePasswordNumber = password => !!password.match(formFieldValidationRegexes.PASSWORD.CONTAIN_NUMBER);

export const validatePassword = (password) => {
	return (validatePasswordLength(password) &&
		validatePasswordSymbol(password) &&
		validatePasswordCharacter(password) &&
		validatePasswordNumber(password));
};