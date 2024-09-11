import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';

const RadioButtonField = ({name, options, selectedValue, setSelectedValue, isUndetermined, undeterminedUomError}) => {
	const RADIO_ID_PREFIX = 'radio-button';
	let optionList = options.map((option, index) => ({...option, id: index + 1}));
	return (
		<div className="btn-group adc-product-tabtext mb-1">
			{optionList.map((option) =>
				<label
					className={`btn btn-primary adc-product-tabtext__label bg-white ${selectedValue === option.value && !isUndetermined ? 'active' : ''} ${undeterminedUomError ? 'adc-bordercolor-error' : ''}`}
					htmlFor={`${RADIO_ID_PREFIX}-${name}-${option.value}`}
					key={option.id}>
					<input type="radio"
							   className="d-none"
							   name={name}
							   value={option.value}
							   id={`${RADIO_ID_PREFIX}-${name}-${option.value}`}
							   onClick={() => setSelectedValue(option.value)}/> <I18n text={option.label}/>
				</label>
			)}
		</div>
	);
};

RadioButtonField.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.any.isRequired,
			label: PropTypes.string
		})
	),
	name: PropTypes.string,
	selectedValue: PropTypes.string,
	setSelectedValue: PropTypes.func,
	isUndetermined: PropTypes.bool,
	undeterminedUomError: PropTypes.string
};

RadioButtonField.defaultProps = {
	options: []
};

export default RadioButtonField;