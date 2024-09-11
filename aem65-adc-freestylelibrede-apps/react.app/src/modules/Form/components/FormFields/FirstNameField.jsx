import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {maxLength30, required} from '../../utils/validationRules';

const FirstNameField = (props) => (
	<TextField {...props} />
);

FirstNameField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	autocomplete: PropTypes.string,
};

FirstNameField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [required, maxLength30],
	name: 'firstName',
	label: i18nLabels.FIRSTNAME_LABEL,
	placeholder: i18nLabels.FIRSTNAME_HINT,
	autocomplete: 'off'
};

export default FirstNameField;
