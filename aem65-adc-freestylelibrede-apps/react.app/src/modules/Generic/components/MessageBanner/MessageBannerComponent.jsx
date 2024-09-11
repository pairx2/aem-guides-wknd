import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MessageBanner from './MessageBanner';
import { getUrlParameter } from '../../../../utils/getParams';
import { i18nLabels } from '../../../../utils/translationUtils';
import { confirmNewsLetterSubscriptionRequest } from '../../../NewsletterSignup/redux/actions/subscribe_to_newsletter.action';
import { BANNER_STATUS, MESSAGE_BANNER_TYPE, BOOLEAN_STRING, CARRIER_RETURNED, REFUND_WIDGET_MIN_DATE } from '../../../../utils/enums';
import { updateGhostOrderRequest } from '../../../MyAccount/redux/actions/get_ghost_orders.action';

const mapStateToProps = state => {
	const { error, confirmationStatus } = state.newsletterReducer.SubscribeToNewsletterReducer;
	const { orders } = state.myAccountModuleReducer.GetOrdersReducer;
	const { ghostOrders } = state.myAccountModuleReducer.GetGhostOrdersReducer;
	const { customer } = state.myAccountModuleReducer.GetCustomerReducer;
	return { error, confirmationStatus, orders, ghostOrders, customer };
};

const mapDispatchToProps = {
	confirmNewsletterSubscription: confirmNewsLetterSubscriptionRequest,
	updateGhostOrderRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class MessageBannerComponent extends Component {
	static propTypes = {
		confirmNewsletterSubscription: PropTypes.func,
		updateGhostOrderRequest: PropTypes.func,
		type: PropTypes.string,
		confirmationStatus: PropTypes.any,
		orders: PropTypes.object,
		ghostOrders: PropTypes.array,
		customer: PropTypes.object,
		invoiceMessageBannerDate: PropTypes.any
	};

	componentDidMount() {
		const { type } = this.props;
		type === MESSAGE_BANNER_TYPE.NEWSLETTER && this.confirmUser();
	}

	confirmUser = () => {
		const confirmationDetails = this.getConfirmationDetails();
		if (confirmationDetails) {
			this.props.confirmNewsletterSubscription(confirmationDetails);
		}
	};

	getConfirmationDetails = () => {
		const key = getUrlParameter('key');
		if (key) return { key };
	};

	isRXFailure = () => {
		const rxNotSupported = getUrlParameter('rxNotSupported');
		return rxNotSupported === BOOLEAN_STRING.TRUE;
	};

	getinvoiceDetails = () => {
		const orderAll = this.props.orders;
		const invoiceDetails = [];
		Object.entries(orderAll).forEach(([orderType, orderData]) => {
			if (orderType && orderData.orderList && orderData.orderList.length > 0) {
				for (const order of orderData.orderList) {
					const deliveryDetailsArr = order.deliveryDetails;
					for (const deliveryDetail of deliveryDetailsArr) {
						const invoiceIdDetailsArr = deliveryDetail.invoiceIdDetails;
							invoiceIdDetailsArr?.map(status => invoiceDetails?.push(status));
					}
				}
			}
		});
		return invoiceDetails;
	}

	getdeliveryDetails = () => {
		const orderAll = this.props.orders;
		const deliveryDetails = [];
		Object.entries(orderAll).forEach(([orderType, orderData]) => {
			if (orderType && orderData.orderList && orderData.orderList.length > 0) {
				for (const order of orderData.orderList) {
					const deliveryDetailsArr = order.deliveryDetails;
						deliveryDetailsArr?.map(status => deliveryDetails?.push(status));
				}
			}
		});
		return deliveryDetails;
	}

	getPrescriptionStatus = () => this.props.customer?.prescription_reminder_sent;

	onCloseActionForGhostOrderBanners = (rxmc, status) => {
		this.props.updateGhostOrderRequest({rxmc: rxmc, status: status});
	};
	doBannerRequired = (type, status) => BANNER_STATUS[type].indexOf(status) > -1;

	render() {
		const {type, confirmationStatus, ghostOrders,invoiceMessageBannerDate} = this.props;
		const invoiceDate = new Date(invoiceMessageBannerDate);
		const invoiceBanner = this.getinvoiceDetails()?.filter(invoice => (this.doBannerRequired('INVOICE', invoice.invoiceStatus) && invoice.invoiceDate > invoiceDate?.getTime() ) || (BANNER_STATUS.INVOICE_FORWARD_AGENCY === invoice.invoiceStatus )).map((invoice) => {
			if (this.doBannerRequired('INVOICE', invoice.invoiceStatus) && invoice.invoiceDate > invoiceDate?.getTime() ) {
				return <MessageBanner className={'mb-1'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.DUNNING_STATUS} canClose key={'invoice_status_' + invoice.invoiceId} />
			}
			else if (BANNER_STATUS.INVOICE_FORWARD_AGENCY === invoice.invoiceStatus ) {
				return <MessageBanner className={'mb-1'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.INVOICE_STATUS_FORWARDED} canClose key={'invoice_status_' + invoice.invoiceId} />
			}
		});
		return (
			<>
				<if condition={!type || type === MESSAGE_BANNER_TYPE.DEFAULT}>
					<MessageBanner {...this.props}/>
				</if>
				<elseif condition={type === MESSAGE_BANNER_TYPE.NEWSLETTER}>
					<if condition={confirmationStatus === true}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.CONFIRMATION_NEWSLETTER_SUCCESS} canClose/>
					</if>
					<elseif condition={confirmationStatus === false}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.CONFIRMATION_NEWSLETTER_FAILURE} canClose/>
					</elseif>
				</elseif>
				<elseif condition={type === MESSAGE_BANNER_TYPE.RX_NOT_SUPPORTED}>
					<if condition={this.isRXFailure()}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.REIMBURSEMENT_NOT_SUPPORTED} canClose/>
					</if>
				</elseif>
				<elseif condition={type === MESSAGE_BANNER_TYPE.INVOICE_STATUS}>
					{invoiceBanner.map((item, index)=> 
					<if condition= {index === 0} key={item.key}>
						{item}
							</if>
					)}
				</elseif>
				<elseif condition={type === MESSAGE_BANNER_TYPE.GHOST_ORDER}>
					{ghostOrders.map((ghostOrder) =>
						<if key={`ghost_condition_${ghostOrder.id}`} condition = {BANNER_STATUS.GHOST_STATUS[ghostOrder.status_code] && !ghostOrder.donot_display_banner}>
							<MessageBanner className={'mb-1'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={BANNER_STATUS.GHOST_STATUS[ghostOrder.status_code]} canClose onCloseAction={() => this.onCloseActionForGhostOrderBanners(ghostOrder.rxmc, ghostOrder.status_code)} key={'ghost_order_' + ghostOrder.id}/>
						</if>
					)}
				</elseif>
				<elseif condition={type === MESSAGE_BANNER_TYPE.REAL_ORDER}>
					{this.getdeliveryDetails().map((delivery) =>
						<>
							<if condition = {BANNER_STATUS.PAYMENT_PENDING === delivery.deliveryStatus}>
								<MessageBanner className={'mb-1'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.ORDER_PENDING} canClose key={'delivery_status_' + delivery.deliveryId}/>
							</if>
							<elseif condition = {delivery?.returnDetails?.filter(res => (res?.csStatus).toLowerCase() == CARRIER_RETURNED && res?.returnRequestDate >= REFUND_WIDGET_MIN_DATE).length > 0}> 
								<MessageBanner className={'mb-1'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.CARRIER_RETURN_BANNER_MESSAGE} params={[delivery.deliveryOrderId]} canClose key={'delivery_status_' + delivery.deliveryId}/>
							</elseif>
						</>
					)}
				</elseif>
				<elseif condition={type === MESSAGE_BANNER_TYPE.PRESCRIPTION_REMINDER}>
					<if condition = {this.getPrescriptionStatus() === true}>
						<MessageBanner className={'mb-1'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.PRESCRIPTION_REMINDER} canClose/>
					</if>
				</elseif>
			</>
		);
	}
});