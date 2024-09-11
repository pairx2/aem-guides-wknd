import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {required, voucher} from '../../utils/validationRules';

const VoucherField = (props) => (
	<TextField {...props} />
);

VoucherField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
};

VoucherField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [required, voucher],
	name: 'voucher',
	label: i18nLabels.VOUCHER_LABEL,
	placeholder: i18nLabels.VOUCHER_HINT
};

export default VoucherField;