import React from 'react';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import PropTypes from 'prop-types';

const CartOverviewSubHeading = ({productHeading}) => {
	return (
		<div className="row">
			<div className="col-3 col-md-4 ">
				<h6 className="adc-title adc-title--black ">{productHeading || <I18n text={i18nLabels.PRODUCT}/>}</h6>
			</div>
			<div className="col-3 col-md-2 pl-4 pl-md-0">
				<h6 className="adc-title adc-title--black "><I18n text={i18nLabels.PRICE}/></h6>
			</div>
			<div className="col-3 col-md-2 adc-cartoverview__quantity-padding pl-sm-5">
				<h6 className="adc-title adc-title--black "><I18n text={i18nLabels.QUANTITY}/></h6>
			</div>
			<div className="col-3 col-md-4">
				<h6 className="adc-title adc-title--black  text-right"><I18n
					text={i18nLabels.TOTAL_PRICE}/></h6>
			</div>
		</div>
	);
};
CartOverviewSubHeading.propTypes = {
	productHeading: PropTypes.string
};
export default CartOverviewSubHeading;