import React from 'react';
import PropTypes from 'prop-types';

import DateField from '../GenericFields/SimpleDateField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {birthdate, required} from '../../utils/validationRules';

const BirthDateField = (props) => (
	<DateField {...props} />
);

BirthDateField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	autocomplete: PropTypes.string,
	isDisabled: PropTypes.bool
};

BirthDateField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [required, birthdate],
	name: 'birthDate',
	label: i18nLabels.BIRTHDATE_LABEL,
	placeholder: i18nLabels.BIRTHDATE_HINT,
	autocomplete: 'off',
	isDisabled: false
};

export default BirthDateField;
