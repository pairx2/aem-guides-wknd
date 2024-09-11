import React from 'react';
import {useTranslation} from '../../../../utils/translationUtils';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';

export const RenderField = ({input, type, placeholder, onKeyDown}) => {
	const translatedPlaceholder = useTranslation(placeholder);
	return (
		<input {...input}
			   type={type}
			   className="form-control adc-search-field__input w-100"
			   id={input.name}
			   placeholder={translatedPlaceholder}
			   onKeyDown={onKeyDown}
			   name={input.name}/>
	);
};

RenderField.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	onKeyDown: PropTypes.func,
};

const SearchBarTextField = ({name, label, placeholder, hasValidateIcon, type, format, onChange, onKeyDown, onFocus}) => {
	return (
		<Field
			name={name}
			label={label}
			type={type}
			placeholder={placeholder}
			hasValidateIcon={hasValidateIcon}
			format={format}
			component={RenderField}
			onChange={onChange}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			autocomplete={'off'}
		/>
	);
};

SearchBarTextField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	hasValidateIcon: PropTypes.bool,
	type: PropTypes.string,
	format: PropTypes.func,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
	onFocus: PropTypes.func
};

export default SearchBarTextField;