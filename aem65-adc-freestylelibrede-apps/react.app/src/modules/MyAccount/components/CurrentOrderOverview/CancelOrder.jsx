import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import CurrentOrderDetails from './CurrentOrderDetails';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {required} from '../../../Form/utils/validationRules';
import RadioButtonReduxField, {RADIO_BUTTON_TYPES} from '../../../Form/components/GenericFields/RadioButtonReduxField';
import {reduxForm} from 'redux-form';

const cancelOptions = [
	{
		value: 'wrong_article',
		label: i18nLabels.CANCEL_WRONG_ARTICLE
	},
	{
		value: 'ordered_twice',
		label: i18nLabels.CANCEL_ORDERED_TWICE
	},
	{
		value: 'miscellaneous',
		label: i18nLabels.MISCELLANEOUS
	}
];

const CancelOrder = ({order, cancelOrder, openCancelForm, products, dictionary, isAccountOverviewTab}) => {
	return (
		<>
			<div className={!isAccountOverviewTab ? 'col-12 col-lg-8' : 'col-md-12'}>
				<CurrentOrderDetails order={order} products={products} dictionary={dictionary} isCancelFlow/>
			</div>
			<div className={!isAccountOverviewTab ? 'col-12 col-lg-4' : 'col-md-12'}>
				<div className="checkbox-item mt-3 mt-lg-0">
					<h6 className="adc-title--black"><I18n text={i18nLabels.CANCEL_REASON} suffix={':'}/></h6>
					<RadioButtonReduxField
						name={order.orderId + '_cancelReason'}
						options={cancelOptions}
						validationRules={[required]}
						type={RADIO_BUTTON_TYPES.SIMPLE}
					/>
				</div>
			</div>
			<div className={!isAccountOverviewTab ? 'col-12 col-lg-8' : 'col-md-12'}>
				<div className="row my-4 delivery-buttons ">
					<div className={!isAccountOverviewTab ? 'col-12 col-lg-6 mb-3 mb-lg-0' : 'col-12 col-md-12 mb-3'}>
						<Button
							type={BUTTON_OPTIONS.TYPE.BUTTON}
							label={i18nLabels.CANCEL_ORDER_CTA_TEXT}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY} hasNoMargin isFullWidth
							action={cancelOrder}
						/>
					</div>
					<div className={!isAccountOverviewTab ? 'col-12 col-lg-6' : 'col-12 col-md-12'}>
						<Button
							type={BUTTON_OPTIONS.TYPE.BUTTON}
							label={i18nLabels.CANCEL_CTA}
							ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY} hasNoMargin isFullWidth
							action={() => openCancelForm(false)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

CancelOrder.propTypes = {
	order: PropTypes.object,
	cancelOrder: PropTypes.func,
	openCancelForm: PropTypes.func,
	products: PropTypes.object,
	dictionary: PropTypes.object,
	isAccountOverviewTab: PropTypes.bool
};

export default reduxForm({
	form: 'cancelOrderForm',
	destroyOnUnmount: true
})(CancelOrder);