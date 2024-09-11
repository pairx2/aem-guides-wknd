import React from 'react';
import PropTypes from 'prop-types';
import RequiredFieldsDisclaimer from '../../Form/components/RequiredFieldsDisclaimer';
import {isRxCheckoutPageType} from '../../../utils/pageTypeUtils';
import I18n from '../../Translation/components/I18n';
import {ORDER_TYPES, TAB_NAMES, ORDER_TYPES_STATUS, SUBSCRIPTION_STATUS, MAGENTO_PAYMENT_TYPES} from '../../../utils/enums';
import {i18nLabels} from '../../../utils/translationUtils';
import {connect} from 'react-redux';

const PaymentCheckboxes = ({checkboxes, methodUpdate, orderTypeCheck, isPayon, canAutoSavePayment, order, paymentMethodToken, paymentMethod,choosenDeliveryDate}) => {
	const hasRequiredFields = checkboxes?.find(c => c.required);
	const checkboxList = checkboxes.map((c, index) => ({...c, id: index+1}))

	return <div id="adc-payment__checkboxes" className={isPayon ? 'd-none' : ''}>
		{checkboxList?.map((value, index) =>
			<div className="row adc-payment__checkbox" key={value.id}>
				<div className="submit-checkout__checkbox">
					<label className="checkbox-container">
						<div dangerouslySetInnerHTML={{__html: value.text}}/>
						<input type="checkbox" required={value.required}
							   name={`customParameters[SHOPPER_checkbox${index}]`}
							   className="checkbox-container__input" value="true"/>
						<span className="checkbox-container__checkmark"/>
					</label>
				</div>
			</div>
		)}
		{canAutoSavePayment && <I18n text={i18nLabels.PAYMENT_METHOD_WILL_BE_SAVED}/>}
		<input type="hidden" name="customParameters[SHOPPER_isReimbursementOrder]" value={isRxCheckoutPageType()}/>
		<if condition={paymentMethodToken && methodUpdate == MAGENTO_PAYMENT_TYPES.PAYPAL && orderTypeCheck != false}>
			<input type="hidden" name="payonToken" value={paymentMethodToken}/>
		</if>
		<if condition={!isPayon}>
			<input type="hidden" name="isOpenInvoice" value="true"/>
			<if condition={order}>
				<input type="hidden" name="orderId" value={order.rxmc || order.orderId}/>
				<input type="hidden" name="orderType" value={order.orderType === ORDER_TYPES.RX ? ORDER_TYPES_STATUS.RX : ORDER_TYPES_STATUS.CPS}/>
				<input type="hidden" name="paymentMethod" value={paymentMethod}/>
				<if condition={order.orderType === ORDER_TYPES.CPS && order?.serviceData?.[0]?.serviceStatus === SUBSCRIPTION_STATUS.INACTIVE}>
					<input type="hidden" name="choosenDeliveryDate" value={choosenDeliveryDate?.getTime()}/>
					<input type="hidden" name="currentSubscriptionOrderStatus" value={order?.serviceData?.[0]?.serviceStatus}/>
				</if>
				<input type="hidden" name="paymentMethodToken" value={paymentMethodToken}/>
				<input type="hidden" name="tabName" value={order.orderType === ORDER_TYPES.RX ? TAB_NAMES.REIMBURSEMENT : TAB_NAMES.PLUS_SERVICE}/>
			</if>
		</if>
		<if condition={hasRequiredFields}>
			<RequiredFieldsDisclaimer/>
		</if>
	</div>;
};

PaymentCheckboxes.propTypes = {
	checkboxes: PropTypes.array.isRequired,
	isPayon: PropTypes.bool,
	canAutoSavePayment: PropTypes.bool,
	order: PropTypes.object,
	choosenDeliveryDate: PropTypes.string,
	paymentMethodToken: PropTypes.string,
	paymentMethod: PropTypes.string
};
const mapStateToProps  = state => {
	const {choosenDeliveryDate} = state.myAccountModuleReducer.OrdersReducer;
	return {choosenDeliveryDate};
};

export default connect(mapStateToProps, null)(PaymentCheckboxes);