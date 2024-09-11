import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';

const AdditionalAddressField = (props) => (
	<TextField {...props} />
);

AdditionalAddressField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	autocomplete: PropTypes.string
};

AdditionalAddressField.defaultProps = {
	hasValidateIcon: false,
	validationRules: null,
	name: 'additionalAddress',
	label: i18nLabels.ADDITIONAL_ADDRESS_LABEL,
	placeholder: i18nLabels.ADDITIONAL_ADDRESS_HINT,
	autocomplete: 'off'
};

export default AdditionalAddressField;
