import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {required} from '../../utils/validationRules';
import TypeaheadField from '../GenericFields/TypeaheadField';
import {suggestZipCodeRequest} from '../../../Address/redux/actions/typeahead_address.action';
import {DEFAULT_COUNTRY_OPTIONS} from '../../../../utils/enums';

const mapStateToProps = state => {
	const {suggestions} = state.addressModuleReducer.TypeaheadReducer.zipcodes;
	return {options: suggestions};
};

const mapDispatchToProps = {
	suggestZipCodeRequest
};


const PostCodeField = (props) => {

	const getNewSuggestions = (value) => {
		props.suggestZipCodeRequest({countryCode: DEFAULT_COUNTRY_OPTIONS[0].country_code, prefix: value});
	};

	return (props.showTypeahead ? <TypeaheadField {...props} getSuggestions={getNewSuggestions} /> : <TextField {...props} />);
};

PostCodeField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	showTypeahead: PropTypes.bool,
	suggestZipCodeRequest: PropTypes.func,
	autocomplete: PropTypes.string,
};

PostCodeField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [required],
	name: 'postcode',
	label: i18nLabels.POSTCODE_LABEL,
	placeholder: i18nLabels.POSTCODE_HINT,
	showTypeahead: false,
	autocomplete: 'off'
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCodeField);
