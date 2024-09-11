import React from 'react';
import PropTypes from 'prop-types';

import RadioButtonReduxField from '../GenericFields/RadioButtonReduxField';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';

import {isRequired, required} from '../../utils/validationRules';
import {ADDRESS_TYPE} from '../../../../utils/enums';


const AddressSelectField = ({name, validationRules,isDisabled}) => {

	const addressOptions = [
		{
			value: ADDRESS_TYPE.BILLING,
			label: i18nLabels.BILLING_ADDRESS_LABEL
		},
		{
			value: ADDRESS_TYPE.SHIPPING,
			label: i18nLabels.DELIVERY_ADDRESS_LABEL
		}
	];
	const isRequiredCondition = isRequired(validationRules) ? '*' : '';
	return (
		<div className="adc-form-group mb-3">
			<label className="adc-form-group__label mt-0">
				<I18n
					text={i18nLabels.ADDRESS_TYPE_LABEL}
					suffix={validationRules ? isRequiredCondition : '*'}
				/>
			</label>
			<div className="btn-group adc-form-group__input-radio-group">
				<RadioButtonReduxField
					name={name}
					options={addressOptions}
					validationRules={validationRules}
					isDisabled={isDisabled}
				/>
			</div>
		</div>
	);
};

AddressSelectField.defaultProps = {
	validationRules: [required],
	name:'address_label',
	isDisabled:false
};

AddressSelectField.propTypes = {
	validationRules: PropTypes.array,
	name: PropTypes.string,
	isDisabled: PropTypes.bool
};

export default AddressSelectField;