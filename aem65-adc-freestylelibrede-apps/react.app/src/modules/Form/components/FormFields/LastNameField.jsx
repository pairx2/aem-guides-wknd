import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {maxLength30, required} from '../../utils/validationRules';

const LastNameField = (props) => (
	<TextField {...props} />
);

LastNameField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	autocomplete: PropTypes.string,
};

LastNameField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [required, maxLength30],
	name: 'lastName',
	label: i18nLabels.LASTNAME_LABEL,
	placeholder: i18nLabels.LASTNAME_HINT,
	autocomplete: 'off'
};

export default LastNameField;
