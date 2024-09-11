import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';

const NoResults = ({query}) => {
	return (
		<div className="bg-white p-4 mt-4">
			<i className="adc-icon adc-icon--xl adc-icon--my-orders float-left"/>
			<h4 className="mt-3 ml-5 pl-5">
				<I18n text={query?.length > 0 ? i18nLabels.NOTHING_FOUND_FOR_SEARCHTERM : i18nLabels.NOTHING_FOUND} params={[query]}/>
			</h4>
		</div>
	);
};

NoResults.propTypes = {
	query: PropTypes.string
};

export default NoResults;