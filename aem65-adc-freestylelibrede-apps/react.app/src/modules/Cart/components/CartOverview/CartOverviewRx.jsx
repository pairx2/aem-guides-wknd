import React from 'react';
import PropsTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';

const CartOverviewRx = ({informationMessage, informationMessageHeading}) => {
	return (
		<div className="adc-rx-cart">
			<div className="adc-cartoverview__item adc-cart-summary pb-4 border-bottom">
				<div className="row">
					<div className="col-7"><I18n text={i18nLabels.RX_TITLE}/></div>
					<div className="col-5 text-right"><I18n text={i18nLabels.RX_COST}/></div>
				</div>

				<div className="row">
					<div className="col-7"><I18n text={i18nLabels.RX_SHIPPING_TYPE}/></div>
					<div className="col-5 text-right"><I18n text={i18nLabels.RX_SHIPPING_COST}/></div>
				</div>

				<div className="row">
					<div className="col-7"><I18n text={i18nLabels.RX_COPAY_LABEL}/></div>
					<div className="col-5 text-right"><I18n text={i18nLabels.RX_COPAY_COST}/></div>
				</div>

				<div className="row adc-cart-summary__cart-total mt-2">
					<div className="col-7"><I18n text={i18nLabels.TOTAL_WITH_TAX_LABEL}/></div>
					<div className="col-5 text-right"><I18n text={i18nLabels.RX_TOTAL_WITH_TAX}/></div>
				</div>

				<div className="row adc-cart-summary__vat-detail">
					<div className="col-7"><I18n text={i18nLabels.TAX_LABEL}/></div>
					<div className="col-5 text-right"><I18n text={i18nLabels.RX_TAX}/></div>
				</div>
			</div>
			<div className={'py-4'}>
				<h5 className={'adc-title--blue'}>{informationMessageHeading}</h5>
				<div dangerouslySetInnerHTML={{__html: informationMessage}}/>
			</div>

		</div>
	);
};
CartOverviewRx.propTypes = {
	informationMessageHeading: PropsTypes.string,
	informationMessage: PropsTypes.string
};
export default CartOverviewRx;