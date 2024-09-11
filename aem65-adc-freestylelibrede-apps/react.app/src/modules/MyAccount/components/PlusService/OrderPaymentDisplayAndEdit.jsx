import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import {initializeCustomerPaymentTokenRequest} from '../../../Payment/redux/actions/payment.action.js';
import {paymentMapping} from '../../../Payment/components/PaymentMapping.js';
import {getUrlParameter} from '../../../../utils/getParams';
import AddNewPaymentMethod from './AddNewPaymentMethod.jsx';
import {getAvailablePaymentMethodsRequest} from '../../../Payment/redux/actions/get_available_payment_methods.action';
import {splitAddressAndNumber} from '../../../../utils/regexUtils';
import {dottedToDashed} from '../../../../utils/dateUtils';
import I18n from '../../../Translation/components/I18n';
import {ORDER_TYPES, DELIVERY_TYPE, PAYMENT_TYPES, MAGENTO_PAYMENT_TYPES} from '../../../../utils/enums';
import CardGrid from '../../../Generic/components/CardGrid/CardGrid';
import {openModalAction} from '../../../Modal/redux/actions';
import {verifyAddressRequest} from '../../../Address/redux/actions/verify_address.actions';
import { setSalution } from '../../../../utils/addressUtils';

const mapStateToProps = (state,props) => {
	const {paymentTokens, payonCheckoutId, error} = state.paymentModuleReducer.PaymentReducer;
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const paymentMethodsReducer = props.order?.orderType === ORDER_TYPES.RX ? state.addressModuleReducer.AddressReducer : state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;
	const {RSSerror, methods, isLoading} = paymentMethodsReducer;
	return {paymentTokens, payonCheckoutId, error, methods, dictionary, RSSerror, isLoading};
};

const mapDispatchToProps = {
	initializeCustomerPaymentToken: initializeCustomerPaymentTokenRequest,
	getAvailablePaymentMethodsRequest,
	openModalAction,
	verifyAddressRequest
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class OrderPaymentDisplayAndEdit extends Component {
		static propTypes = {
			initializeCustomerPaymentToken: PropTypes.func,
			paymentTokens: PropTypes.array,
			isLoading: PropTypes.bool,
			payonCheckoutId: PropTypes.string,
			checkboxes: PropTypes.array,
			order: PropTypes.object,
			customer: PropTypes.object,
			showPayonWidget: PropTypes.bool,
			dictionary: PropTypes.object,
			methods: PropTypes.array,
			getAvailablePaymentMethodsRequest: PropTypes.func,
			confirmationPage: PropTypes.string,
			error: PropTypes.number,
			RSSerror: PropTypes.string,
			openModalAction: PropTypes.func,
			updateAddress: PropTypes.func,
			verifyAddressRequest: PropTypes.func,
			isPaymentMismatch: PropTypes.bool
		};

		state = {
			expandedIndex: null,
			loadingIndex: null,
			paymentMethod: null,
			paymentMethodToken: null,
			isOpenInvoiceClicked: false,
			isSavedPaymentClicked: false,
			isSubmitDisabled: true,
			methods: [],
			headingText:null,
			methodUpdate: null
		};

		componentDidMount() {
			const {showPayonWidget, isPaymentMismatch, methods, order} = this.props;
			if(!showPayonWidget) {
				if (order?.orderType === ORDER_TYPES.RX) {
					this.addressCheck();
				} else {
					this.getAvailablePaymentMethods();
				}
			}else {
				this.setState({
					methods: methods,
					headingText: isPaymentMismatch? i18nLabels.PAYMENT_MISMATCH: i18nLabels.NO_PAYMENT_MISMATCH,
				});
			}
		}

		componentDidUpdate(prevProps, prevState) {
			const {payonCheckoutId, methods, openModalAction, isLoading, RSSerror} = this.props;
			const {paymentMethod} = this.state;

			if (methods !== prevProps.methods && isLoading === false && prevProps.isLoading) {
				if (methods?.length > 0) {
					this.setState({
						methods
					});
				} else if (methods.length == 0) {
					openModalAction({
						contentID: 'noPaymentMethodsAvailableModal',
						heading: i18nLabels.UNABLE_TO_UPDATE_ADDRESS_HEADING
					});
				}
			}

			if (RSSerror !== prevProps.RSSerror) {
				openModalAction({
					contentID: 'noPaymentMethodsAvailableModal',
					heading: i18nLabels.UNABLE_TO_UPDATE_ADDRESS_HEADING
				});
			}

			if (payonCheckoutId && prevProps.payonCheckoutId !== payonCheckoutId) {
				this.setState({
					expandedIndex: this.state.loadingIndex,
					loadingIndex: null,
				});
			}

			if (paymentMethod === PAYMENT_TYPES.OPEN_INVOICE && paymentMethod !== prevState.paymentMethod) {
				this.setState({
					expandedIndex: this.state.loadingIndex,
					loadingIndex: null,
				});
			}
		}

		propsDidChange(prevProps) {
			return (this.props.methods !== prevProps.methods) || (this.props.RSSerror !== prevProps.RSSerror);
		}

		addressCheck = () => {
			const {verifyAddressRequest, order, customer} = this.props;
			const billingStreetAndNumber = splitAddressAndNumber(order?.billingAddress?.street);
			const shippingStreetAndNumber = splitAddressAndNumber(order?.deliveryAddress?.street);
			verifyAddressRequest({
				address: {
					street: billingStreetAndNumber.street,
					streetNumber: billingStreetAndNumber.streetNumber,
					zipcode: order.billingAddress.zipCode,
					city: order.billingAddress.city,
					country: order.billingAddress.countryCode
				},
				billingAddress: {
					lastName: order.billingAddress.lastName,
					firstName: order.billingAddress.firstName,
					street: billingStreetAndNumber.street,
					streetNumber: billingStreetAndNumber.streetNumber,
					zipcode: order.billingAddress.zipCode,
					city: order.billingAddress.city,
					country: order.billingAddress.countryCode
				},
				shippingAddress: {
					lastName: order.deliveryAddress.lastName,
					firstName: order.deliveryAddress.firstName,
					street: shippingStreetAndNumber.street,
					streetNumber: shippingStreetAndNumber.streetNumber,
					zipcode: order.deliveryAddress.zipCode,
					city: order.deliveryAddress.city,
					country: order.deliveryAddress.countryCode
				},
				user: {
					firstName: customer.firstname,
					lastName: customer.lastname,
					birthday: dottedToDashed(customer.dob),
					email: customer.email,
					salutation: `${customer.prefix.toUpperCase()}`
				},
				AddressStatus: {
					isShipping: false,
					isBilling: false
				},
				isOrderUpdate: true,
				section: 'account'
			});
		};

		getAvailablePaymentMethods = () => {
			const {
				customer,
				order,
				getAvailablePaymentMethodsRequest
			} = this.props;
			const payload = this.constructPayload(customer, order);
			getAvailablePaymentMethodsRequest(payload);
		};

		constructPayload = (customer, order) => {
			const {dictionary} = this.props;
			const streetAndNumberBillingAddress = splitAddressAndNumber(order?.billingAddress?.street);
			const streetAndNumberShippingAddress = splitAddressAndNumber(order?.deliveryAddress?.street);

			return {
				orderType: order.orderType === ORDER_TYPES.RX ? ORDER_TYPES.WEBRX : order.orderType,
				products: {
					grossTotal: `${order.priceBreakdown.price}`,
					total: `${order.priceBreakdown.totalPrice}`,
					deliveryType: DELIVERY_TYPE.NORMAL
				},
				user: {
					firstName: customer.firstname,
					lastName: customer.lastname,
					salutation: setSalution(customer, dictionary),
					birthday: dottedToDashed(customer.dob),
					mail: customer.email,
				},
				billingAddress: {
					lastName: order.billingAddress.lastName,
					firstName: order.billingAddress.firstName,
					street: streetAndNumberBillingAddress.street,
					streetNumber: streetAndNumberBillingAddress.streetNumber,
					zipcode: order.billingAddress.zipCode,
					city: order.billingAddress.city,
					country: order.billingAddress.countryCode
				},
				shippingAddress: {
					lastName: order.deliveryAddress.lastName,
					firstName: order.deliveryAddress.firstName,
					street: streetAndNumberShippingAddress.street,
					streetNumber: streetAndNumberShippingAddress.streetNumber,
					zipcode: order.deliveryAddress.zipCode,
					city: order.deliveryAddress.city,
					country: order.deliveryAddress.countryCode
				},
				isOrderUpdate: true
			};
		};

		getConfirmedCheckoutId = () => {
			const id = getUrlParameter('id');
			const resourcePath = getUrlParameter('resourcePath');
			return !resourcePath || resourcePath.indexOf('checkouts') === -1
				? undefined
				: id;
		};

		toggleOption = (index) => {
			const {initializeCustomerPaymentToken,order} = this.props;
			const isExpanded = this.state.expandedIndex === index;

			if (!isExpanded) {
				const paymentMethod = this.getMappedPaymentMethods()[index].magentoId;
				const orderId = order?.orderType === ORDER_TYPES.RX ? order?.rxmc : order?.orderId;
				const orderUpdateType = order?.orderType === ORDER_TYPES.RX ? ORDER_TYPES.RX : ORDER_TYPES.CPS;
				if (paymentMethod === MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN) {
					this.setState({
						expandedIndex: index,
						paymentMethod: paymentMethod,
						paymentMethodToken: null,
						isSavedPaymentClicked: false,
						isSubmitDisabled: true
					});
				} else if (paymentMethod !== PAYMENT_TYPES.OPEN_INVOICE && paymentMethod !== MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN) {
					initializeCustomerPaymentToken({
						paymentMethod: paymentMethod,
						orderUpdateType: orderUpdateType,
						orderId: orderId,
						paymentMethodToken: ''
					});
					this.setState({
						loadingIndex: index,
						paymentMethod: paymentMethod
					});
				} else {
					this.setState({
						loadingIndex: index,
						paymentMethod: paymentMethod,
						isOpenInvoiceClicked: false
					});
				}
			}
		};

		getMappedPaymentMethods = () => {
			const {methods} = this.state;
			return paymentMapping.filter(p => p.orderUpdateOnly || methods.find(m => m === p.rsId));
		};

		markFormAsDirty = () => {
			this.setState({isOpenInvoiceClicked: true});
			const openInvoiceForm = document.getElementById('adc-payment__openinvoice');
            openInvoiceForm?.submit();
		};

		markSavedFormAsDirty = () => {
			this.setState({isSavedPaymentClicked: true});
			const savedPaymentsForm = document.getElementById('adc-payment__saved-payments');
            savedPaymentsForm?.submit();
		};

		setSavedPaymentMethod = (token,method) => {
			const{initializeCustomerPaymentToken,order} = this.props;
			const paymentMethod = MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN;
			const orderId = order?.orderType === ORDER_TYPES.RX ? order?.rxmc : order?.orderId;
			const orderUpdateType = order?.orderType === ORDER_TYPES.RX ? ORDER_TYPES.RX : ORDER_TYPES.CPS;
			this.setState({
				isSubmitDisabled: false,
				paymentMethodToken: token,
				loadingIndex: 0,
				expandedIndex: null,
				methodUpdate: method
			});
			if(method === MAGENTO_PAYMENT_TYPES.PAYPAL){
				this.setState({
					isSubmitDisabled: false,
					paymentMethodToken: token,
					loadingIndex: null,
					expandedIndex: null,
					methodUpdate: method
				});
			}
			if(method !== MAGENTO_PAYMENT_TYPES.PAYPAL){
			initializeCustomerPaymentToken({
				paymentMethod: paymentMethod,
				orderUpdateType: orderUpdateType,
				orderId: orderId,
				paymentMethodToken: token
			});
		    }
		};

		render() {
			const {
				isLoading,
				paymentTokens,
				checkboxes,
				order,
				confirmationPage,
				error,
				updateAddress,
				showPayonWidget,
				isPaymentMismatch
			} = this.props;
			const {
				expandedIndex,
				loadingIndex,
				isOpenInvoiceClicked,
				paymentMethod,
				paymentMethodToken,
				methods,
				isSavedPaymentClicked,
				isSubmitDisabled,
				headingText,
				methodUpdate
			} = this.state;
			const mappedPaymentMethods = this.getMappedPaymentMethods();
			const canBeSaved = expandedIndex !== null ? mappedPaymentMethods[expandedIndex]?.canBeSaved : false;
			const isPayon = expandedIndex !== null ? mappedPaymentMethods[expandedIndex]?.payon : false;
			const availableSavedPM = paymentTokens?.filter((pt) => mappedPaymentMethods?.find((pm) => pt.method === pm.magentoId));
			return (
				<div>
					<if condition={isLoading}>
						<div className={'m-4'}>
							<LoadingIndicator isOverlay/>
						</div>
					</if>
					<elseif condition={methods.length}>
						<CardGrid columns={12}>
							<AddNewPaymentMethod
								width={12}
								expandedIndex={expandedIndex}
								loadingIndex={loadingIndex}
								isPayon={isPayon}
								order={order}
								showPayonWidget={showPayonWidget}
								headingText={headingText}
								confirmationPage={confirmationPage}
								paymentMethod={paymentMethod}
								paymentTokens={availableSavedPM}
								paymentMethodToken={paymentMethodToken}
								setSavedPaymentMethod={this.setSavedPaymentMethod}
								isOpenInvoiceClicked={isOpenInvoiceClicked}
								updateAddress={updateAddress}
								paymentMapping={mappedPaymentMethods}
								toggleOption={this.toggleOption}
								markFormAsDirty={this.markFormAsDirty}
								checkboxes={checkboxes}
								canBeSaved={canBeSaved}
								error={error}
								isPaymentMismatch={isPaymentMismatch}
								isSavedPaymentClicked={isSavedPaymentClicked}
								markSavedFormAsDirty={this.markSavedFormAsDirty}
								isSubmitDisabled={isSubmitDisabled}
								methodUpdate={methodUpdate}
							/>
							<if condition={error}>
								<span className="adc-form-group--error">
									<I18n text={'magento_error_code_' + error}/>
								</span>
							</if>
						</CardGrid>
					</elseif>
				</div>
			);
		}
	}
);