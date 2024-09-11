import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import {mobilePhoneValidation, isRequired} from '../../utils/validationRules';
import IntlTelInputField from '../../../Form/components/GenericFields/IntlTelInputField';
import {DEFAULT_COUNTRY_OPTIONS} from '../../../../utils/enums';

const MobilePhoneField = ({name, label, placeholder, hasValidateIcon, defaultMaxLength, defaultValue, defaultCountry, validationRules, autocomplete}) => {
	return (
		<IntlTelInputField
			name={name}
			label={label}
			defaultValue={defaultValue}
			defaultCountry={defaultCountry}
			placeholder={placeholder}
			validationRules={validationRules}
			defaultMaxLength={defaultMaxLength}
			hasValidateIcon={hasValidateIcon}
			autocomplete={autocomplete}
			isRequired={isRequired(validationRules)}
		/>
	);
};

MobilePhoneField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	autocomplete: PropTypes.string,
	defaultMaxLength: PropTypes.string,
	defaultValue: PropTypes.string,
	defaultCountry: PropTypes.string
};
MobilePhoneField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [mobilePhoneValidation],
	name: 'mobile_phone',
	label: i18nLabels.MOBILE_PHONE_LABEL,
	placeholder: i18nLabels.MOBILE_PHONE_HINT,
	autocomplete: 'off',
	defaultCountry: DEFAULT_COUNTRY_OPTIONS[0].country_code,
};

export default MobilePhoneField;