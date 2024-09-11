import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {Title} from '../../../Generic/components/Title/Title';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {formatPrice} from '../../../../utils/pricingUtils';

export const OrderCancelled = ({order, reOrder}) => {
	return (
		<div className="cancelled-item mt-3 mt-lg-0">
			<div className="d-flex justify-content-end mb-4">
				<p className="m-0 d-flex align-items-center"><span className="mr-2"><I18n text={i18nLabels.CANCELLED}/></span>
					<i className="adc-icon adc-icon--md adc-icon--error"/>
				</p>
			</div>
			<div className="d-flex justify-content-between mt-2">
				<p><I18n text={i18nLabels.TOTAL_LABEL}/></p>
				<Title size={Title.SIZE.H6} text={`${formatPrice(order.priceBreakdown.totalPrice || 0)}`}
					   color={Title.COLOR.BLACK}/>
			</div>
			<div className="delivery-buttons">
				<div className="row my-4">
					<div className="col-12 mb-3">
						<Button
							action={reOrder}
							type={BUTTON_OPTIONS.TYPE.BUTTON}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							isFullWidth
							hasNoMargin
							label={i18nLabels.RE_ORDER}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

OrderCancelled.propTypes = {
	order: PropTypes.object,
	reOrder: PropTypes.func
};