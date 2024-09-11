import React from 'react';
import {i18nLabels} from '../../../utils/translationUtils';
import I18n from '../../Translation/components/I18n';
import PropTypes from 'prop-types';

const RequiredFieldsDisclaimer = ({label}) => {
	return (
		<div className="text-right">
			<label className="adc-form-group__label-required-field"><I18n text={label} prefix={'* '}/>
			</label>
		</div>

	);
};

RequiredFieldsDisclaimer.propTypes = {
	label: PropTypes.string
};

RequiredFieldsDisclaimer.defaultProps = {
	label: i18nLabels.MANDATORY_FIELD
};

export default RequiredFieldsDisclaimer;