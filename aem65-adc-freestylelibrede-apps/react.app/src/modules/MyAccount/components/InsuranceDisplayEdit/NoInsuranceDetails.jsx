import React from 'react';
import {i18nLabels} from '../../../../utils/translationUtils';
import Icon from '../../../Generic/components/Icon/Icon';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';

const NoInsuranceDetails = ({noInsuranceDescription, noInsuranceHeading, noInsuranceIcon, secureDataMessage, editInsuranceInfo}) => {
	return (
		<section>
			<div className="w-100 d-inline-block mt-3">
				<Icon
					image={noInsuranceIcon}
					size={Icon.SIZE.XXL}
				/>
			</div>
			<div className="w-100 d-inline-block adc-generic-widget--font-medium-bold">
				{noInsuranceHeading}
			</div>
			<p className="w-100 d-inline-block adc-generic-widget--text mt-2 mb-0">
				{noInsuranceDescription}
			</p>
			<div className="row mt-3">
				<div className="col-1">
					<Icon image={'lock-gray'} size={Icon.SIZE.MEDIUM} />
				</div>
				<div className="col-10 col-md-11">
					<p className={'text-small'}>{secureDataMessage}</p>
				</div>
			</div>
			<div className="w-100 d-inline-block text-right border-top-grey mt-4 pt-3">
				<Link
					action={editInsuranceInfo}
					icon={'arrow-forth-blue'}
					label={i18nLabels.REGISTER_NOW}
				/>
			</div>
		</section>
	);
};

NoInsuranceDetails.propTypes = {
	noInsuranceDescription: PropTypes.string,
	noInsuranceHeading: PropTypes.string,
	noInsuranceIcon: PropTypes.string,
	secureDataMessage: PropTypes.string,
	editInsuranceInfo: PropTypes.func
};

export default NoInsuranceDetails;