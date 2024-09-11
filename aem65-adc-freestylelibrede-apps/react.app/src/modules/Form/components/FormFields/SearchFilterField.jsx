import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import CheckboxField, {CHECKBOX_TYPES} from '../GenericFields/CheckboxField';

const SearchFilterField = ({searchFilters, margin}) => {
	let searchFiltersList = searchFilters?.map((filter, index) => ({...filter, id: index + 1}))
	const filterList = searchFiltersList && searchFiltersList.map((filter, index) =>
		<CheckboxField
			key={filter.id}
			name={'filters.' + index}
			label={filter.label}
			type={CHECKBOX_TYPES.WHITE}
			containerClass="col-6 col-md-3 hand-cursor"
			format={v => v === filter.value}
			normalize={v => v ? filter.value : null}
		/>
	);
	return (
		filterList &&
		<div className={'adc-search-filter margin-fix container bg-grey   ' + margin}>
			<div className="px-lg-3 mt-4">
				<h6 className="adc-search-filter__title m-0">
					<I18n text={i18nLabels.SEARCH_FILTER_HEADING}/>
				</h6>
				<div className="row px-2">
					{filterList}
				</div>
			</div>
		</div>
	);
};
SearchFilterField.propTypes = {
	searchFilters: PropTypes.array
};
SearchFilterField.defaultProps = {
	searchFilters: []
};
export default SearchFilterField;