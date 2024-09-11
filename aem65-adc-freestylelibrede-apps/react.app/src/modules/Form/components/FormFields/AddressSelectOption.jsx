import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import I18n from '../../../Translation/components/I18n';

const AddressSelectOption = ({name, address: {street, streetNumber, zipcode, city}, value, label}) => (
	<>
		<Field
			name={name}
			className="adc-option__input d-none"
			type="radio"
			value={value}
			id={value}
			component="input"
		/>
		<label className="adc-option__label" htmlFor={value}>
			<h6 className="font-weight-bold d-inline-block w-100"><I18n text={label}/></h6>
			<div className="d-inline-block w-100">{street} {streetNumber}</div>
			<div className="d-inline-block w-100">{zipcode} {city}</div>
		</label>
	</>
);

AddressSelectOption.propTypes = {
	name: PropTypes.string,
	address: PropTypes.shape({
		street: PropTypes.string,
		streetNumber: PropTypes.string,
		zipcode: PropTypes.string,
		city: PropTypes.string,
	}).isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string
};

AddressSelectOption.defaultProps = {
	name: 'addressChoice',
};

export default AddressSelectOption;
