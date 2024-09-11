import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {required} from '../../utils/validationRules';
import TypeaheadField from '../GenericFields/TypeaheadField';
import {suggestCityRequest} from '../../../Address/redux/actions/typeahead_address.action';
import {DEFAULT_COUNTRY_OPTIONS} from '../../../../utils/enums';

const mapStateToProps = state => {
	const {suggestions} = state.addressModuleReducer.TypeaheadReducer.cities;
	return {options: suggestions};
};

const mapDispatchToProps = {
	suggestCityRequest
};

const CityField = (props) => {

	const getNewSuggestions = (value) => {
		props.suggestCityRequest({countryCode: DEFAULT_COUNTRY_OPTIONS[0].country_code, prefix: value, zipcode: props.postcode});
	};

	return (props.showTypeahead ? <TypeaheadField {...props} getSuggestions={getNewSuggestions} /> : <TextField {...props} />);
};

CityField.propTypes = {
	hasValidateIcon: PropTypes.bool,
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	showTypeahead: PropTypes.bool,
	postcode: PropTypes.string,
	suggestCityRequest: PropTypes.func,
	autocomplete: PropTypes.string,
};

CityField.defaultProps = {
	hasValidateIcon: true,
	validationRules: [required],
	name: 'city',
	label: i18nLabels.CITY_LABEL,
	placeholder: i18nLabels.CITY_HINT,
	showTypeahead: false,
	autocomplete: 'off'
};

export default connect(mapStateToProps, mapDispatchToProps)(CityField);
