import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {required, otpText} from '../../utils/validationRules';

const OtpTextField = (props) => (
	<TextField {...props} />
);

OtpTextField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	defaultMaxLength: PropTypes.string
};

OtpTextField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [required, otpText],
	name: 'otpText',
	label: i18nLabels.OTP_ENTER_LABEL,
	defaultMaxLength: '6'
};

export default OtpTextField;