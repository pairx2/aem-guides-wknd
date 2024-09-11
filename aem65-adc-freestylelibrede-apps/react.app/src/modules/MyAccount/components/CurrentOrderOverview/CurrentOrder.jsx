import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardAction} from '../../../Generic/components/Card/Card';
import CancelOrder from './CancelOrder';
import {CancelOrderConfirmation} from './CancelOrderConfirmation';
import {OrderCancelled} from './OrderCancelled';
import OrderCost from './OrderCost';
import AddressInformation from '../AddressInformation/AddressInformation';
import {PaymentInformation} from './PaymentInformation';
import PropTypes from 'prop-types';
import translate, {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import CurrentOrderDetails from './CurrentOrderDetails';
import {openModalAction} from '../../../Modal/redux/actions';
import Link from '../../../Generic/components/Link/Link';
import OrderDeliveryDetails from './OrderDeliveryDetails';
import {DELIVERY_STATUSES, ORDER_TYPES, ADDRESS_TYPE, TAB_NAMES, PAYMENT_TYPES} from '../../../../utils/enums';
import {addMultipleProductsRequest, addProductRequest} from '../../../Cart/redux/actions/cart.action';
import {downloadInvoiceRequest} from '../../../MyAccount/redux/actions/orders.action';
import OrderPaymentDisplayAndEdit from '../../../MyAccount/components/PlusService/OrderPaymentDisplayAndEdit.jsx';
import Icon from '../../../Generic/components/Icon/Icon';
import Col from '../../../Generic/components/Container/Col';
import {resetPaymentReducer} from '../../../MyAccount/redux/actions/update_payment_method.action';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';
import {resetAddressEditor} from '../../redux/actions/update_order.action';

const mapStateToProps = state => {
	const {error: paymentMethodUpdateError, addressAndPaymentUpdateError: isAddressAndPaymentUpdateError, isPaymentMethodUpdated, updatedOrder, isAddressAndPaymentMethodUpdated} = state.myAccountModuleReducer.UpdatePaymentMethodReducer;
	const {loading: isLoading, errorCodes} = state.cartModuleReducer.GetCustomerCartReducer;
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {deliveryDate} = state.myAccountModuleReducer.DeliveryDateUpdateReducer;
	const {isOrderUpdated, updatedOrderType, error: updateError, loading: isOrderLoading} = state.myAccountModuleReducer.OrderUpdateReducer;
	const { ghostOrders } = state.myAccountModuleReducer.GetGhostOrdersReducer;
	return {isLoading, errorCodes, customer, updatedOrderType, deliveryDate, isOrderUpdated, updateError, isAddressAndPaymentUpdateError, isOrderLoading, isPaymentMethodUpdated, isAddressAndPaymentMethodUpdated, paymentMethodUpdateError, updatedOrder, ghostOrders};
};

const mapDispatchToProps = {
	openModalAction,
	addProductToCart: addProductRequest,
	addMultipleProductsToCart: addMultipleProductsRequest,
	getInvoice: downloadInvoiceRequest,
	resetPaymentReducer
};

export default connect(mapStateToProps, mapDispatchToProps)(class CurrentOrder extends Component {
	static propTypes = {
		openModalAction: PropTypes.func,
		order: PropTypes.object,
		currentOrderHeading: PropTypes.string,
		products: PropTypes.object,
		dictionary: PropTypes.object,
		customer: PropTypes.object,
		editAddress: PropTypes.func,
		addProductToCart: PropTypes.func,
		addMultipleProductsToCart: PropTypes.func,
		errorCodes: PropTypes.array,
		checkoutPage: PropTypes.string,
		isLoading: PropTypes.bool,
		getInvoice: PropTypes.func,
		isAccountOverviewTab: PropTypes.bool,
		myOrderUrl: PropTypes.string,
		confirmationPath: PropTypes.string,
		checkboxes: PropTypes.array,
		deliveryDate: PropTypes.string,
		isPaymentMethodUpdated: PropTypes.bool,
		paymentMethodUpdateError: PropTypes.string,
		isAddressAndPaymentUpdateError: PropTypes.bool,
		resetPaymentReducer: PropTypes.func,
		updatedOrder: PropTypes.string,
		isAddressAndPaymentMethodUpdated:PropTypes.bool,
		isOrderUpdated: PropTypes.bool,
		updateError: PropTypes.object,
		updatedOrderType: PropTypes.string,
		ghostOrders: PropTypes.array
	};

	state = {
		showCancelForm: false,
		showCancelConfirmation: false,
		togglePaymentEditing: false,
		isReOrdering: false
	};

	componentDidUpdate(prevProps) {
		const {isLoading, errorCodes} = this.props;
		if (this.state.isReOrdering && prevProps.isLoading && !isLoading) {
			const {checkoutPage} = this.props;
			this.setState({
				isReOrdering: false
			});
			if (errorCodes?.length > 0) {
				const {openModalAction} = this.props;
				openModalAction({
					heading: i18nLabels.ADD_TO_CART_ERROR_HEADING,
					contentID: 'addToCartErrorModal',
					props: {
						errorCodes: errorCodes
					}
				});
			} else if (checkoutPage) {
				window.location.href = checkoutPage;
			}
		}
	}

	openChangeDeliveryDateModal = () => {
		const {dictionary, customer, order, openModalAction} = this.props;
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
				productOriginalDateFrom: productOriginalDateFrom,
				productDueDateWindow: productDueDateWindow,
				productDeliverable: productDeliverable
			}
		});
	};

	openCancelForm = (open) => {
		this.setState({
			showCancelForm: open
		});
	};

	cancelOrder = () => {
		this.setState({
			showCancelConfirmation: true,
			cancelled: true
		});
	};

	reOrder = () => {
		const {order: {serviceData, productData}, addProductToCart, addMultipleProductsToCart} = this.props;
		if (serviceData?.[0]?.serviceSKU) {
			addProductToCart({
				sku: serviceData?.[0]?.serviceSKU,
				qty: 1,
				startDate: new Date()
			});
		} else {
			addMultipleProductsToCart({
				products: productData && productData.map(product => ({
					sku: product.productSKU,
					qty: product.productQuantity
				}))
			});
		}
		this.setState({
			cancelled: false,
			orderStatus: DELIVERY_STATUSES.IN_PROGRESS,
			isReOrdering: true
		});
	};

	closeCancelConfirmation = () => {
		this.setState({
			showCancelConfirmation: false,
			showCancelForm: false
		});
	};

	changeDeliveryAddress = () => {
		const {editAddress, order} = this.props;
		window.location.hash = `#${TAB_NAMES.MY_ORDERS}`;
		editAddress(ADDRESS_TYPE.SHIPPING, true, order);
	}

	getTitle = () => {
		if(this.state.showCancelForm) 
			return 'Diese Bestellung stornieren';
		else 
			return this.state.cancelled ? 'Diese Bestellung ist storniert' : this.props.currentOrderHeading;
	}

	editPaymentMethod = (togglePaymentEditing) => {
		this.setState({
			togglePaymentEditing
		});
		sessionStorage.removeItem('newAddressFromOrderUpdate');
		sessionStorage.removeItem('isAddressAndPaymentUpdate');
		sessionStorage.removeItem('customerEmail');
		localStorage.removeItem('showPayonWidget');
		this.ref?.current.scrollIntoView();
	};

	render() {
		const {showCancelForm, showCancelConfirmation, cancelled, orderStatus, togglePaymentEditing} = this.state;
		const {order, customer, products, dictionary, isOrderUpdated, updatedOrderType, updateError, isAddressAndPaymentUpdateError, editAddress, getInvoice, isAccountOverviewTab, myOrderUrl, confirmationPath, checkboxes, deliveryDate, isPaymentMethodUpdated, isAddressAndPaymentMethodUpdated, paymentMethodUpdateError, order: {orderType}, resetPaymentReducer, updatedOrder, ghostOrders} = this.props;
		const composedOrder = orderStatus ? {
			...order,
			orderStatus: orderStatus
		} : order;
		const cancelMyOrderView = !isAccountOverviewTab ? 'col-12 col-lg-4' : 'col-12 col-lg-12';
		const cancelMyOrderDetailView = !isAccountOverviewTab ? 'col-12 col-lg-8' : 'col-12 col-lg-12';
		const cancelMyOrderMobileView = !isAccountOverviewTab ? 'col-lg-6 col-md-12' : 'col-md-12';
		return (
			<div ref={this.ref}>
				<Card title={this.getTitle()} customerId={customer?.user_id} className={customer?.user_id ? 'customer-id-section' : ''}>
					<CardContent>
						<if condition={isPaymentMethodUpdated && ORDER_TYPES[updatedOrder] === order.orderType}>
							<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.BLUE} description={i18nLabels.UPDATE_PAYMENT_SUCCESS} canClose onCloseAction={resetPaymentReducer}/>
						</if>
						<elseif condition={isAddressAndPaymentMethodUpdated && ORDER_TYPES[updatedOrder] === order.orderType}>
							<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.BLUE} description={i18nLabels.UPDATE_ORDER_SUCCESS} canClose onCloseAction={resetPaymentReducer}/>
						</elseif>
						<elseif condition={paymentMethodUpdateError && !isAddressAndPaymentUpdateError && ORDER_TYPES[updatedOrder] === order.orderType}>
							<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.UPDATE_PAYMENT_FAILURE} canClose onCloseAction={resetPaymentReducer}/>
						</elseif>
						<elseif condition={isOrderUpdated && updatedOrderType === order.orderType}>
							<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.BLUE} description={i18nLabels.UPDATE_ADDRESS_SUCCESS} canClose onCloseAction={resetAddressEditor}/>
						</elseif>
						<elseif condition={updateError && updatedOrderType === order.orderType}>
							<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.UPDATE_ADDRESS_FAILURE} canClose onCloseAction={resetAddressEditor}/>
						</elseif>
						<elseif condition={isAddressAndPaymentUpdateError && paymentMethodUpdateError && ORDER_TYPES[updatedOrder] === order.orderType}>
							<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.UPDATE_ORDER_FAILURE} canClose onCloseAction={resetAddressEditor}/>
						</elseif>
						<div className={'row' + (showCancelConfirmation ? ' align-items-center' : '')}>
							<if condition={showCancelForm}>
								<if condition={showCancelConfirmation}>
									<CancelOrderConfirmation closeCancelConfirmation={this.closeCancelConfirmation} isAccountOverviewTab={isAccountOverviewTab}/>
								</if>
								<else>
									<CancelOrder order={composedOrder} cancelOrder={this.cancelOrder} openCancelForm={this.openCancelForm}  products={products} dictionary={dictionary} isAccountOverviewTab={isAccountOverviewTab}/>
								</else>
							</if>
							<else>
								<div className={cancelled ? cancelMyOrderDetailView : cancelMyOrderMobileView}>
									<CurrentOrderDetails order={composedOrder} products={products} dictionary={dictionary} isCancelled={cancelled} isAccountOverviewTab={isAccountOverviewTab}/>
									<if condition={!cancelled && orderType !== ORDER_TYPES.RX}>
										<OrderDeliveryDetails
											order={composedOrder}
											openChangeDeliveryDateModal={this.openChangeDeliveryDateModal}
											changeDeliveryAddress={this.changeDeliveryAddress}
											deliveryDate={deliveryDate}
											isAccountOverviewTab={isAccountOverviewTab}
										/>
									</if>
								</div>
								<div className={cancelled ? cancelMyOrderView : cancelMyOrderMobileView}>
									<if condition={cancelled}>
										<OrderCancelled order={composedOrder} reOrder={this.reOrder}/>
									</if>
									<else>
										<if condition={togglePaymentEditing}>
											<div className={'col'}>
												<OrderPaymentDisplayAndEdit order={order} customer={customer} confirmationPage={confirmationPath} checkboxes={checkboxes}/>
											</div>
										</if>
										<else>
											<if condition={order.currentAddress}>
												<div className='d-flex'>
													<h6 className="flex-grow-1 current-o-heading">
														<I18n text={i18nLabels.DELIVERY_ADDRESS_HEADING} suffix={':'}/>
													</h6>
													<if condition={order.orderType === ORDER_TYPES.RX && !isAccountOverviewTab}>
														<Link action={() => editAddress('shipping')}
															icon={'edit-icon'}
															label={i18nLabels.CHANGE}
														/>
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
													<h6 className="flex-grow-1 current-o-heading">
														<I18n text={i18nLabels.BILLING_ADDRESS_HEADING} suffix={':'}/>
													</h6>
													<if condition={order.orderType === ORDER_TYPES.RX && !isAccountOverviewTab}>
														<Link action={() => editAddress('billing')}
															icon={'edit-icon'}
															label={i18nLabels.CHANGE}
														/>
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
											<if condition={order.orderType === ORDER_TYPES.RX && !isAccountOverviewTab}>
												<div className='text-right'>
													<Link
														icon={'edit-icon'}
														label={i18nLabels.CHANGE}
														action={() => this.editPaymentMethod(true)}
													/>
												</div>
											</if>
											<if condition={composedOrder?.paymentDetails?.paymentMethodType !== PAYMENT_TYPES.FREE && composedOrder?.paymentDetails?.paymentMethodType !== null}>
												<PaymentInformation order={composedOrder}/>
											</if>
											<OrderCost ghostOrders={ghostOrders} order={composedOrder} openCancelForm={this.openCancelForm} getInvoice={getInvoice}/>
										</else>
									</else>
								</div>
							</else>
						</div>
					</CardContent>
					<if condition={isAccountOverviewTab || togglePaymentEditing}>
						<CardAction>
							<if condition={isAccountOverviewTab}>
								<Link href={myOrderUrl}
									icon={'arrow-right-thin'}
									label={i18nLabels.DETAILS}
								/>
							</if>
							<if condition={togglePaymentEditing}>
								<Col width={12} className={'text-left'}>
									<Link action={() => this.editPaymentMethod(false)}
										icon={'arrow-left'}
										label={i18nLabels.BACK_TO_ORDER_OVERVIEW_CTA}
										iconPosition={Icon.POSITION.LEFT}
										hasNoMargin
									/>
								</Col>
							</if>
						</CardAction>
					</if>
				</Card>
			</div>
		);
	}
});