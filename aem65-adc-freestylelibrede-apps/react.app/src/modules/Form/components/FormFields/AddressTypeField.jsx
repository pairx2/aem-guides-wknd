import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';

const AddressTypeField = (props) => (
	<TextField {...props} />
);

AddressTypeField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
};

AddressTypeField.defaultProps = {
	hasValidateIcon: false,
	validationRules: null,
	name: 'addressType',
	label: i18nLabels.ADDRESS_TYPE_LABEL,
	placeholder: i18nLabels.ADDRESS_TYPE_HINT
};

export default AddressTypeField;
