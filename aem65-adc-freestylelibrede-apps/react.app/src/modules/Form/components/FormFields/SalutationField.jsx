import React from 'react';
import PropTypes from 'prop-types';

import RadioButtonReduxField from '../GenericFields/RadioButtonReduxField';
import I18n from '../../../Translation/components/I18n';
import translate, {i18nLabels} from '../../../../utils/translationUtils';

import {isRequired, required, isHyphen} from '../../utils/validationRules';
import {connect} from 'react-redux';

const mapStateToProps = state =>  {
	const {dictionary} = state.translationModuleReducer.translationReducer;
	return {dictionary};
};

const SalutationField = ({name, options, validationRules, dictionary}) => {

	const genderOptions = [
		{
			value: translate(dictionary, i18nLabels.SALUTATION_MAN_LABEL),
			label: i18nLabels.SALUTATION_MAN_LABEL
		},
		{
			value: translate(dictionary, i18nLabels.SALUTATION_WOMAN_LABEL),
			label: i18nLabels.SALUTATION_WOMAN_LABEL
		},
		{
			value: translate(dictionary, i18nLabels.SALUTATION_OTHER_LABEL),
			label: i18nLabels.SALUTATION_OTHER_LABEL
		}
	];
	const isRequiredCondition = isRequired(validationRules) ? '*' : '';
	return (
		<div className="adc-form-group mb-3">
			<label className="adc-form-group__label mt-0">
				<I18n
					text={i18nLabels.SALUTATION_LABEL}
					suffix={validationRules ? isRequiredCondition : '*'}
				/>
			</label>
			<div className="btn-group adc-form-group__input-radio-group">
				<RadioButtonReduxField
					name={name}
					options={options || genderOptions}
					validationRules={validationRules}
				/>
			</div>
		</div>
	);
};

SalutationField.defaultProps = {
	validationRules: [required, isHyphen],
	name: 'prefix'
};

SalutationField.propTypes = {
	validationRules: PropTypes.array,
	name: PropTypes.string,
	options: PropTypes.array,
	dictionary: PropTypes.object
};

export default connect(mapStateToProps)(SalutationField);