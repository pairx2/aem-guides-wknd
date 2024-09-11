import React, {Component} from 'react';
import {connect} from 'react-redux';
import NoActivePlusService from './NoActivePlusService';
import ActivePlusService from './ActivePlusService';
import {getProductPriceRequest} from '../../../Product/redux/actions/get_product_price.action';
import PropTypes from 'prop-types';
import DataLayer from '../../../Data/DataLayer';
import translate, {i18nLabels} from '../../../../utils/translationUtils';
import {openModalAction} from '../../../Modal/redux/actions';
import {SUBSCRIPTION_STATUS} from '../../../../utils/enums';
import {updatePaymentMethodRequest, updateAddressAndPaymentMethodRequest} from '../../../MyAccount/redux/actions/update_payment_method.action';
import {getUrlParameter} from '../../../../utils/getParams';
import {openReactivationFormRequest} from '../../redux/actions/orders.action';
import {resetAddressEditor} from '../../redux/actions/update_order.action';
import {resetPaymentReducer} from '../../../MyAccount/redux/actions/update_payment_method.action';

const mapStateToProps = state => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const {orders} = state.myAccountModuleReducer.GetOrdersReducer;
	const {plusService: {isDeleted}, choosenDeliveryDate} = state.myAccountModuleReducer.OrdersReducer;
	const {productPrices} = state.productModuleReducer.getProductPricesReducer;
	const {canRedirect} = state.myAccountModuleReducer.UpdatePaymentMethodReducer;
	const {  loading :isPaymentUpdateLoading} = state.myAccountModuleReducer.UpdatePaymentMethodReducer;
	return {customer, dictionary, orders, isDeleted, productPrices, canRedirect, choosenDeliveryDate, isPaymentUpdateLoading};
};

const mapDispatchToProps = {
	getProductPriceRequest,
	openModalAction,
	resetAddressEditor,
	resetPaymentReducer,
	updatePaymentMethodRequest,
	openReactivationForm: openReactivationFormRequest,
	updateAddressAndPaymentMethodRequest
};

let choosenDeliveryDateFromUrl = null;

export default connect(mapStateToProps, mapDispatchToProps)(class PlusService extends Component {
	static propTypes = {
		getProductPriceRequest: PropTypes.func,
		openReactivationForm: PropTypes.func,
		openModalAction: PropTypes.func,
		resetPaymentReducer: PropTypes.func,
		resetAddressEditor: PropTypes.func,
		productSku: PropTypes.string,
		choosenDeliveryDate: PropTypes.string,
		subscriptionHeading: PropTypes.string,
		subscriptionImage: PropTypes.string,
		informationalHeading: PropTypes.string,
		informationalDesc: PropTypes.string,
		moreInfoPath: PropTypes.string,
		moreInfoStyle: PropTypes.string,
		informationalMessage: PropTypes.string,
		bookServicePath: PropTypes.string,
		privacyPolicyPath: PropTypes.string,
		termsAndConditionsPath: PropTypes.string,
		trainingMaterialsPath: PropTypes.string,
		productPrices: PropTypes.object,
		orders: PropTypes.object,
		dictionary: PropTypes.object,
		customer: PropTypes.object,
		isDeleted: PropTypes.bool,
		confirmationPath: PropTypes.string,
		checkboxes: PropTypes.array,
		tabName: PropTypes.string,
		updatePaymentMethodRequest: PropTypes.func,
		updateAddressAndPaymentMethodRequest: PropTypes.func,
		canRedirect: PropTypes.bool,
		informationalPriceSuperscript: PropTypes.string,
		isPaymentUpdateLoading: PropTypes.bool
	};

	componentDidMount() {
		const {productSku,productPrices,getProductPriceRequest,isPaymentUpdateLoading} = this.props;
		const orderId = getUrlParameter('orderId');
		const currentSubscriptionOrderStatus = getUrlParameter('currentSubscriptionOrderStatus');
		const choosenDeliveryDate = getUrlParameter('choosenDeliveryDate');
		const {openReactivationForm} = this.props;
		if (productSku && !productPrices[productSku]) {
			getProductPriceRequest(productSku);
		}
		if(orderId && !isPaymentUpdateLoading) this.updatePaymentMethod();
		if(currentSubscriptionOrderStatus === SUBSCRIPTION_STATUS.INACTIVE) openReactivationForm();
		if(choosenDeliveryDate) {
			choosenDeliveryDateFromUrl = new Date(parseInt(choosenDeliveryDate));
		} else choosenDeliveryDateFromUrl = null;
	}
	componentDidUpdate(prevProps) {
		const tabName = getUrlParameter('tabName');
		if (prevProps.canRedirect !== this.props.canRedirect && this.props.canRedirect) {
			history.pushState({}, null, `${window.location.pathname}`);
			document.querySelector(`a[href="#${tabName}"]`)?.click();
		}
	}

	getCurrentSubscriptionOrder = () => {
		return this.props.orders.CPS?.orderList?.filter(order => order.deliveryDetails !== null).sort((a, b) => b.orderDate - a.orderDate).find(order => order?.serviceData?.[0]?.serviceSKU && !order.isReimbursedOrder);
	};
	updatePaymentMethod = () => {
		const {updatePaymentMethodRequest} = this.props;
		const orderType = getUrlParameter('orderType');
		const paymentMethod = getUrlParameter('paymentMethod');
		const orderId = getUrlParameter('orderId');
		const checkoutId = getUrlParameter('id');
		const paymentMethodToken = getUrlParameter('paymentMethodToken');
		const isOpenInvoice = getUrlParameter('isOpenInvoice');
		const isAddressAndPaymentUpdate = JSON.parse(sessionStorage.getItem('isAddressAndPaymentUpdate'));
		const newAddressFromOrderUpdate = JSON.parse(sessionStorage.getItem('newAddressFromOrderUpdate'));
		const {address_id, address_type, isBlacklisted, isVerified,rssResultCode} = newAddressFromOrderUpdate || {};
		if(isAddressAndPaymentUpdate) {
			const payload = {
				address_type: address_type,
				address_id: address_id,
				rss_result_code: rssResultCode,
				is_blacklisted: isBlacklisted,
				is_verified: isVerified,
				code: paymentMethod,
				order_id: orderId,
				order_type: orderType,
				payon_checkout_id: checkoutId,
				payment_token: paymentMethodToken,
				isOpenInvoice: isOpenInvoice
			};
			this.updateAddressAndPayment(payload);
		} else {
			updatePaymentMethodRequest({
				code: paymentMethod,
				order_id: orderId,
				order_type: orderType,
				payon_checkout_id: checkoutId,
				payment_token: paymentMethodToken,
				isOpenInvoice: isOpenInvoice
			});
		}
	}

	updateAddressAndPayment = (payload) => {
		const {updateAddressAndPaymentMethodRequest} = this.props;
		updateAddressAndPaymentMethodRequest(payload);
		sessionStorage.removeItem('newAddressFromOrderUpdate');
		sessionStorage.removeItem('isAddressAndPaymentUpdate');
		sessionStorage.removeItem('customerEmail');
		localStorage.removeItem('showPayonWidget');
	}

	getCurrentSubscriptionOrderStatus = () => this.getCurrentSubscriptionOrder()?.serviceData?.[0]?.serviceStatus;

	deactivateSubscription = () => {
		const {dictionary, customer, resetAddressEditor, resetPaymentReducer, openModalAction} = this.props;
		const currentSubscriptionOrder = this.getCurrentSubscriptionOrder();

		resetAddressEditor();
		resetPaymentReducer();

		openModalAction({
			heading: translate(dictionary, i18nLabels.DEACTIVATE_PLUS_SERVICE_MODAL_HEADING, [customer?.firstname]),
			contentID: 'deactivatePlusServiceModal',
			props: {
				serviceToDate: currentSubscriptionOrder?.serviceData?.[0]?.serviceToDate,
				orderId:  currentSubscriptionOrder?.orderId
			}
		});
	};

	deleteSubscription = () => {
		const {dictionary, customer, openModalAction} = this.props;
		const currentSubscriptionOrder = this.getCurrentSubscriptionOrder();
		openModalAction({
			heading: translate(dictionary, i18nLabels.DELETE_PLUS_SERVICE_MODAL_HEADING, [customer?.firstname]),
			contentID: 'deletePlusServiceModal',
			props: {
				orderId:  currentSubscriptionOrder?.orderId
			}
		});
	};

	getSubscriptionFrequency = () => this.props.productPrices?.[this.props.productSku]?.cs_delivery_frequency;
	getSubscriptionPrice = () => this.props.productPrices?.[this.props.productSku]?.price;

	render() {
		const {subscriptionHeading, subscriptionImage, informationalHeading, informationalDesc, tabName, canRedirect, choosenDeliveryDate,
			moreInfoPath, moreInfoStyle, informationalMessage, bookServicePath, privacyPolicyPath, termsAndConditionPath, trainingMaterialsPath, isDeleted, confirmationPath, checkboxes,informationalPriceSuperscript} = this.props;

		const currentSubscriptionOrder = this.getCurrentSubscriptionOrder();
		const currentSubscriptionOrderStatus = this.getCurrentSubscriptionOrderStatus();
		const choosenDeliveryDateFromState = currentSubscriptionOrderStatus === SUBSCRIPTION_STATUS.INACTIVE ? choosenDeliveryDate : null;
		return (
			    <>
				<if condition={!isDeleted && currentSubscriptionOrder && currentSubscriptionOrderStatus !== SUBSCRIPTION_STATUS.CANCELLED}>
					<DataLayer orders products>
						<ActivePlusService
							order={currentSubscriptionOrder}
							canRedirect={canRedirect}
							choosenDeliveryDateFromUrl={choosenDeliveryDateFromUrl || choosenDeliveryDateFromState}
							orderServiceStatus={currentSubscriptionOrderStatus}
							privacyPolicyPath={privacyPolicyPath}
							termsAndConditionsPath={termsAndConditionPath}
							trainingMaterialsPath={trainingMaterialsPath}
							deactivateSubscription={this.deactivateSubscription}
							deleteSubscription={this.deleteSubscription}
							confirmationPath={confirmationPath}
							checkboxes={checkboxes}
							tabName={tabName}
						/>
					</DataLayer>
				</if>
				<else>
					<NoActivePlusService
						subscriptionHeading={subscriptionHeading}
						subscriptionImage={subscriptionImage}
						informationalHeading={informationalHeading}
						informationalDesc={informationalDesc}
						informationalMessage={informationalMessage}
						moreInfoPath={moreInfoPath}
						moreInfoStyle={moreInfoStyle}
						bookServicePath={bookServicePath}
						frequency={this.getSubscriptionFrequency()}
						price={this.getSubscriptionPrice()}
						informationalPriceSuperscript={informationalPriceSuperscript}
					/>
				</else>
		        </>
		);
	}
});
