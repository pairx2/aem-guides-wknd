import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {kvnr, required} from '../../utils/validationRules';

const KVNRField = (props) => (
	<TextField {...props} />
);

KVNRField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	autocomplete: PropTypes.string
};

KVNRField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [required, kvnr],
	name: 'kvnr',
	label: i18nLabels.KVNR_LABEL,
	placeholder: i18nLabels.KVNR_HINT,
	autocomplete: 'off'
};

export default KVNRField;
