import React from 'react';
import PropTypes from 'prop-types';
import IntlTelInputField from '../../../Form/components/GenericFields/IntlTelInputField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {isRequired, newLandlinePhone} from '../../utils/validationRules';
import {DEFAULT_COUNTRY_OPTIONS} from '../../../../utils/enums';

const PhoneField = ({name, label, placeholder, validationRules, defaultMaxLength, defaultValue, defaultCountry, hasValidateIcon, autocomplete}) => {
	return(
		<IntlTelInputField
			name={name}
			label={label}
			defaultValue={defaultValue}
			defaultCountry={defaultCountry}
			placeholder={placeholder}
			validationRules={validationRules}
			defaultMaxLength={defaultMaxLength}
			isRequired={isRequired(validationRules)}
			hasValidateIcon={hasValidateIcon}
			autocomplete={autocomplete}
		/>
	);
};

PhoneField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	validationRules: PropTypes.array,
	defaultMaxLength: PropTypes.string,
	autocomplete: PropTypes.string,
	defaultValue: PropTypes.string,
	defaultCountry: PropTypes.string
};

PhoneField.defaultProps = {
	hasValidateIcon: true,
	name: 'landline_phone',
	label: i18nLabels.PHONE_LABEL,
	placeholder: i18nLabels.PHONE_HINT,
	validationRules: [newLandlinePhone],
	defaultCountry: DEFAULT_COUNTRY_OPTIONS[0].country_code,
	autocomplete: 'off'
};

export default PhoneField;
