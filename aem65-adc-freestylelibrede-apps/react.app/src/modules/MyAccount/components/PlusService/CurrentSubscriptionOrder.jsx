import React, {Component} from 'react';
import {connect} from 'react-redux';
import OrderCost from '../CurrentOrderOverview/OrderCost';
import {PaymentInformation} from '../CurrentOrderOverview/PaymentInformation';
import PropTypes from 'prop-types';
import translate, {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import CurrentOrderDetails from '../CurrentOrderOverview/CurrentOrderDetails';
import {openModalAction} from '../../../Modal/redux/actions';
import OrderDeliveryDetails from '../CurrentOrderOverview/OrderDeliveryDetails';
import {openReactivationFormRequest} from '../../redux/actions/orders.action';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Icon from '../../../Generic/components/Icon/Icon';
import {Card, CardContent, CardAction} from '../../../Generic/components/Card/Card';
import AddressInformation from '../AddressInformation/AddressInformation';
import Link from '../../../Generic/components/Link/Link';
import {SUBSCRIPTION_STATUS, ORDER_TYPES} from '../../../../utils/enums';
import {resetPaymentReducer} from '../../../MyAccount/redux/actions/update_payment_method.action';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';
import Col from '../../../Generic/components/Container/Col';
import {resetAddressEditor} from '../../redux/actions/update_order.action';


const mapStateToProps = state => {
	const {loading: isLoading, errorCodes} = state.cartModuleReducer.GetCustomerCartReducer;
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {deliveryDate} = state.myAccountModuleReducer.DeliveryDateUpdateReducer;
	const {isOrderUpdated, updatedOrderType, error: updateError, loading: isOrderLoading} = state.myAccountModuleReducer.OrderUpdateReducer;
	const {error: paymentMethodUpdateError, addressAndPaymentUpdateError: addressAndPaymentUpdateError, isPaymentMethodUpdated, updatedOrder,isAddressAndPaymentMethodUpdated} = state.myAccountModuleReducer.UpdatePaymentMethodReducer;
	return {isLoading, errorCodes, customer, updatedOrderType, isOrderUpdated, updateError, isOrderLoading, addressAndPaymentUpdateError, isAddressAndPaymentMethodUpdated, deliveryDate, paymentMethodUpdateError, isPaymentMethodUpdated, updatedOrder};
};

const mapDispatchToProps = {
	openModalAction,
	openReactivationForm: openReactivationFormRequest,
	resetPaymentReducer,
	resetAddressEditor
};

export default connect(mapStateToProps, mapDispatchToProps)(class CurrentSubscriptionOrder extends Component {
	static propTypes = {
		openModalAction: PropTypes.func,
		openReactivationForm: PropTypes.func,
		editSubscription: PropTypes.func,
		editAddress: PropTypes.func,
		order: PropTypes.object,
		orderServiceStatus: PropTypes.string,
		products: PropTypes.object,
		dictionary: PropTypes.object,
		customer: PropTypes.object,
		confirmationPath: PropTypes.string,
		deliveryDate: PropTypes.string,
		isPaymentMethodUpdated: PropTypes.bool,
		isAddressAndPaymentMethodUpdated: PropTypes.bool,
		paymentMethodUpdateError: PropTypes.string,
		addressAndPaymentUpdateError: PropTypes.string,
		resetPaymentReducer: PropTypes.func,
		resetAddressEditor: PropTypes.func,
		updatedOrder: PropTypes.string,
		deactivateSubscription: PropTypes.func,
		deleteSubscription: PropTypes.func,
		isOrderUpdated: PropTypes.bool,
		updateError: PropTypes.object,
		updatedOrderType: PropTypes.string
	};

	openChangeDeliveryDateModal = () => {
		const {dictionary, customer, order, confirmationPath, openModalAction} = this.props;
		const {productOriginalDateOfNextShipment, productDateOfNextShipment, productOriginalDateFrom, productDueDateWindow, deliverableNumber, productSKU} = order.productData?.[0];
		const productDeliverable = [{
			sku: productSKU,
			deliverable_id: deliverableNumber
		}];
		openModalAction({
			heading: translate(dictionary, i18nLabels.PERSONALIZED_CHOOSE_NEW_DELIVERY_DATE, [customer.firstname]),
			contentID: 'changeDeliveryDateModal',
			props: {
				order: order,
				productOriginalDateOfNextShipment: productOriginalDateOfNextShipment,
				productDateOfNextShipment: productDateOfNextShipment,
				productDueDateWindow: productDueDateWindow,
				productOriginalDateFrom: productOriginalDateFrom,
				confirmationPath: confirmationPath,
				productDeliverable: productDeliverable
			}
		});
	};

	reactivateSubscription = () => {
		const {openReactivationForm, editSubscription} = this.props;
		openReactivationForm();
		editSubscription();
	};

	render() {
		const {order, orderServiceStatus, products, dictionary, updatedOrderType, isOrderUpdated, addressAndPaymentUpdateError, updateError, deactivateSubscription, deleteSubscription, customer, editSubscription, editAddress, deliveryDate, isPaymentMethodUpdated, isAddressAndPaymentMethodUpdated, paymentMethodUpdateError, resetPaymentReducer, resetAddressEditor, updatedOrder} = this.props;
		return (
			<Card title={i18nLabels.OVERVIEW}  customerId={customer?.user_id} className={customer?.user_id ? 'customer-id-section' : ''}>
				<CardContent>
					<if condition={isPaymentMethodUpdated && ORDER_TYPES[updatedOrder] === order.orderType && orderServiceStatus === SUBSCRIPTION_STATUS.ACTIVE}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.BLUE} description={i18nLabels.UPDATE_PAYMENT_SUCCESS} canClose onCloseAction={resetPaymentReducer}/>
					</if>
					<elseif condition={isAddressAndPaymentMethodUpdated && ORDER_TYPES[updatedOrder] === order.orderType && orderServiceStatus === SUBSCRIPTION_STATUS.ACTIVE}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.BLUE} description={i18nLabels.UPDATE_ORDER_SUCCESS} canClose onCloseAction={resetPaymentReducer}/>
					</elseif>
					<elseif condition={paymentMethodUpdateError && !addressAndPaymentUpdateError && ORDER_TYPES[updatedOrder] === order.orderType && orderServiceStatus === SUBSCRIPTION_STATUS.ACTIVE}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.UPDATE_PAYMENT_FAILURE} canClose onCloseAction={resetPaymentReducer}/>
					</elseif>
					<elseif condition={isOrderUpdated && updatedOrderType === order.orderType && orderServiceStatus === SUBSCRIPTION_STATUS.ACTIVE}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.BLUE} description={i18nLabels.UPDATE_ADDRESS_SUCCESS} canClose onCloseAction={resetAddressEditor}/>
					</elseif>
					<elseif condition={updateError && updatedOrderType === order.orderType && orderServiceStatus === SUBSCRIPTION_STATUS.ACTIVE}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.UPDATE_ADDRESS_FAILURE} canClose onCloseAction={resetAddressEditor}/>
					</elseif>
					<elseif condition={addressAndPaymentUpdateError && paymentMethodUpdateError && ORDER_TYPES[updatedOrder] === order.orderType && orderServiceStatus === SUBSCRIPTION_STATUS.ACTIVE}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.UPDATE_ORDER_FAILURE} canClose onCloseAction={resetPaymentReducer}/>
					</elseif>
					<div className={'row'}>
						<div className={'col-12 col-lg-6'}>
							<CurrentOrderDetails order={order} products={products} dictionary={dictionary} orderServiceStatus={orderServiceStatus} isPlusService/>
							<if condition={orderServiceStatus === SUBSCRIPTION_STATUS.INACTIVE}>
								<section>
									<div className="d-flex mt-4 justify-content-center align-items-center">
										<div className="mr-4 mt-3">
											<Icon image={'large-x-circle-orange'} size={Icon.SIZE.LARGER} />
										</div>
										<div className="w-75 adc-plus-service__error-msg">
											<I18n text={i18nLabels.X_YOUR_PLUS_SERVICE_IS_DEACTIVATED} params={[`${customer.firstname} ${customer.lastname}`]}/>
										</div>
									</div>
									<Button
										action={this.reactivateSubscription}
										className={'my-4'}
										type={BUTTON_OPTIONS.TYPE.BUTTON}
										ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
										hasNoMargin
										isFullWidth
										label={i18nLabels.REACTIVATE}
									/>
								</section>
							</if>
							<else>
								<OrderDeliveryDetails
									order={order}
									openChangeDeliveryDateModal={this.openChangeDeliveryDateModal}
									deliveryDate={deliveryDate}
									isPlusService
								/>
							</else>
						</div>
						<div className={'col-12 col-lg-6'}>
							<if condition={order.currentAddress}>
								<div className='d-flex'>
									<h6 className="flex-grow-1 current-o-heading ">
										<I18n text={i18nLabels.DELIVERY_ADDRESS_HEADING} suffix={':'}/>
									</h6>
									<if condition={orderServiceStatus !== SUBSCRIPTION_STATUS.CANCELLED} >
										<div className="pl-2">
											<Link action={() => editAddress('shipping')}
												icon={'edit-icon'}
												label={i18nLabels.CHANGE}
											/>
										</div>
									</if>
								</div>
								<AddressInformation
									prefix={order.currentAddress.salutation}
									firstname={order.currentAddress.firstName}
									lastname={order.currentAddress.lastName}
									street={order.currentAddress.street}
									additionalAddress={order.currentAddress.streetNumber}
									city={order.currentAddress.city}
									postcode={order.currentAddress.zipCode}
									country={order.currentAddress.country}
								/>
							</if>
							<if condition={order.billingAddress}>
								<div className='d-flex'>
									<h6 className="flex-grow-1 current-o-heading ">
										<I18n text={i18nLabels.BILLING_ADDRESS_HEADING} suffix={':'}/>
									</h6>
									<if condition={orderServiceStatus !== SUBSCRIPTION_STATUS.CANCELLED}>
										<div className="pl-2">
											<Link action={() => editAddress('billing')}
												icon={'edit-icon'}
												label={i18nLabels.CHANGE}
											/>
										</div>
									</if>
								</div>
								<AddressInformation
									prefix={order.billingAddress.salutation}
									firstname={order.billingAddress.firstName}
									lastname={order.billingAddress.lastName}
									street={order.billingAddress.street}
									additionalAddress={order.billingAddress.streetNumber}
									city={order.billingAddress.city}
									postcode={order.billingAddress.zipCode}
									country={order.billingAddress.country}
								/>
							</if>
							<if condition={orderServiceStatus === SUBSCRIPTION_STATUS.ACTIVE}>
								<div className="pl-2 marginL-83">
									<Link action={editSubscription} icon={'edit-icon'} label={i18nLabels.CHANGE}/>
								</div>
							</if>
							<PaymentInformation order={order}/>
							<OrderCost order={order} isPlusService/>
						</div>
					</div>
				</CardContent>
				<CardAction>
					<Col width={12} className={'text-right p-0'}>
						<if condition={orderServiceStatus === SUBSCRIPTION_STATUS.ACTIVE}>
							<Link label={i18nLabels.DEACTIVATE_PLUS_SERVICE} icon={'large-x-blue'} action={deactivateSubscription} className={'pt-0'}/>
						</if>
						<Link label={i18nLabels.DELETE_PLUS_SERVICE} icon={'trash_blue'} action={deleteSubscription}/>
					</Col>
				</CardAction>
			</Card>
		);
	}
});
