import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {required} from '../../utils/validationRules';

const PayerNumberField = (props) => (
	<TextField {...props} />
);

PayerNumberField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
};

PayerNumberField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [required],
	name: 'payer_number',
	label: i18nLabels.INSURANCE_NUMBER_LABEL,
	placeholder: i18nLabels.INSURANCE_NUMBER_HINT
};

export default PayerNumberField;
