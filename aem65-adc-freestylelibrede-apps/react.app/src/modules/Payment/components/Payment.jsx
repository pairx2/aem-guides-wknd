import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent } from '../../Generic/components/Card/Card';
import PropTypes from 'prop-types';
import { i18nLabels } from '../../../utils/translationUtils';
import { paymentMapping } from './PaymentMapping';
import PaymentOption from './PaymentOption';
import Carousel from '../../Carousel/components/Carousel';
import { getCheckoutIdRequest } from '../redux/actions/get_checkout_id.action';
import { getAvailablePaymentMethodsRequest } from '../redux/actions/get_available_payment_methods.action';
import MessageBanner from '../../Generic/components/MessageBanner/MessageBanner';
import Button, { BUTTON_OPTIONS } from '../../Generic/components/Button/Button';
import { isRxCheckoutPageType } from '../../../utils/pageTypeUtils';
import PaymentCheckboxes from './PaymentCheckboxes';
import Icon from '../../Generic/components/Icon/Icon';
import PaymentRedirect from './PaymentRedirect';
import { splitAddressAndNumber } from '../../../utils/regexUtils';
import LoadingIndicator from '../../Generic/components/Loading/LoadingIndicator';
import Row from '../../Generic/components/Container/Row';
import { Title } from '../../Generic/components/Title/Title';
import { dottedToDashed } from '../../../utils/dateUtils';
import { setBillingAddressOnCart, setShippingAddressOnCart } from '../../Cart/redux/actions/cart.action';
import { ORDER_TYPES, CARRIER_CODE, DELIVERY_TYPE, GENERIC_ERROR_CODES, RSP_NAME_OPTIONS, PAYMENT_ID, MAGENTO_PAYMENT_TYPES, PAYMENT_TYPES } from '../../../utils/enums';
import { verifyAddressRequest } from '../../Address/redux/actions/verify_address.actions';
import I18n from '../../Translation/components/I18n';
import { getCustomerPaymentTokensRequest } from '../redux/actions/payment.action';
import SavedPaymentMethod from '../../Payment/components/SavedPaymentMethod';
import PaymentHelper from './PaymentHelper';
import { getAvailablePaymentMethodsGraphqlRequest } from '../../Cart/redux/actions/get_available_payment_methods_graphql.action';
import { cartObject } from '../../../utils/paymentUtils';
import { setSalution } from '../../../utils/addressUtils';
const maxCheckoutIdAge = 5;
const minutes = 60000;

const mapStateToProps = state => {
	const { dictionary } = state.translationModuleReducer.translationReducer;
	const { customer, isMeasurementAvailable } = state.myAccountModuleReducer.GetCustomerReducer;
	const { sickfunds } = state.sickfundModuleReducer.SickfundReducer;
	const { isLoading: isPaymentTokensLoading, paymentTokens } = state.paymentModuleReducer.PaymentReducer;

	const cartReducer = isRxCheckoutPageType() ? state.cartModuleReducer.GhostCartReducer : state.cartModuleReducer.GetCustomerCartReducer;
	const { cartDetails, checkoutIdDate, warnings, rxmcExists, errorCodes } = cartReducer;
	const { paymentMethods, isLoading: isLoadingPaymentMethods, webShopMessage:unavailablePaymentOptionsMsg, isAllowSave: adcIsAllowSave } = state.cartModuleReducer.GetAvailablePaymentMethodsGraphqlReducer;

	const paymentMethodsReducer = isRxCheckoutPageType() ? state.addressModuleReducer.AddressReducer : state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;
	const { webShopMessage, methods, isLoading, isAllowSave } = paymentMethodsReducer;

	return {adcIsAllowSave, methods, sickfunds, isLoading, isLoadingPaymentMethods, cartDetails, paymentTokens, isPaymentTokensLoading, checkoutIdDate, customer, isMeasurementAvailable, dictionary, warnings, rxmcExists, isAllowSave, webShopMessage, errorCodes, paymentMethods, unavailablePaymentOptionsMsg };
};

const mapDispatchToProps = {
	getAvailablePaymentMethodsRequest,
	getCheckoutIdRequest,
	getCustomerPaymentTokens: getCustomerPaymentTokensRequest,
	verifyAddressRequest,
	setShippingAddressOnCart,
	setBillingAddressOnCart,
	getAvailablePaymentMethodsGraphqlRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class Payment extends Component {

	static propTypes = {
		checkboxes: PropTypes.array,
		confirmationPage: PropTypes.string,
		cartDetails: PropTypes.object,
		payonEndpoint: PropTypes.string,
		getAvailablePaymentMethodsRequest: PropTypes.func,
		getCheckoutIdRequest: PropTypes.func,
		checkoutIdDate: PropTypes.instanceOf(Date),
		methods: PropTypes.array,
		customer: PropTypes.object,
		isLoading: PropTypes.bool,
		isLoadingPaymentMethods: PropTypes.bool,
		sickfunds: PropTypes.array,
		dictionary: PropTypes.object,
		warnings: PropTypes.array,
		rxmcExists: PropTypes.number,
		verifyAddressRequest: PropTypes.func,
		setShippingAddressOnCart: PropTypes.func,
		setBillingAddressOnCart: PropTypes.func,
		isAllowSave: PropTypes.bool,
		adcIsAllowSave: PropTypes.bool,
		isMeasurementAvailable: PropTypes.bool,
		webShopMessage: PropTypes.string,
		errorCodes: PropTypes.array,
		getCustomerPaymentTokens: PropTypes.func,
		paymentTokens: PropTypes.array,
		isPaymentTokensLoading: PropTypes.bool,
		enableCreateOrderCall: PropTypes.bool,
		paymentMethods: PropTypes.shape({}),
		getAvailablePaymentMethodsGraphqlRequest: PropTypes.func,
		enableNewPaymentFlow: PropTypes.bool,
		unavailablePaymentOptionsMsg: PropTypes.string
	};

	state = {
		expandedIndex: null,
		loadingIndex: null,
		methodsAreLoaded: false,
		isOpenInvoiceClicked: false,
		paymentMethod: null,
		paymentMethodToken: null,
		isSubmitDisabled: true,
		methodUpdate: null,
		orderTypeCheck: null,
		prevtag: null
	};

	handleCallPaymentMethos = (payload) => {
		const { cartDetails, enableNewPaymentFlow, getAvailablePaymentMethodsRequest, getAvailablePaymentMethodsGraphqlRequest } = this.props;
		if (enableNewPaymentFlow) {
			const cartId = cartDetails?.id;
			getAvailablePaymentMethodsGraphqlRequest(cartObject(cartId));
		}
		else{
			getAvailablePaymentMethodsRequest(payload);
		}
	}

	componentDidUpdate = (prevProps) => {

		const { paymentMethods, cartDetails, checkoutIdDate, customer, isLoadingPaymentMethods, methods, isLoading, errorCodes, enableNewPaymentFlow } = this.props;
		localStorage.setItem('newPaymentFlow', enableNewPaymentFlow);
		if (cartDetails.id && cartDetails.billing_address?.city && cartDetails.selected_shipping_method?.carrier_code && customer.id) {
			if (cartDetails.selected_payment_method && checkoutIdDate !== prevProps.checkoutIdDate) {
				const mappedMethods = this.getMappedPaymentMethods(enableNewPaymentFlow ? paymentMethods : methods);
				const checkoutIdMethod = cartDetails?.selected_payment_method?.code;
				const expandedIndex = mappedMethods.findIndex(m => m.magentoId === checkoutIdMethod);
				this.setState({ expandedIndex: expandedIndex, loadingIndex: null });
				this.payonScriptInjection(prevProps, mappedMethods, checkoutIdMethod, expandedIndex)
			} else if (this.isRiskCheckRequired(prevProps)) {
				const payload = this.constructPayload(customer, cartDetails);
				isRxCheckoutPageType() ? this.paymentAddressCheck(customer, cartDetails) : this.handleCallPaymentMethos(payload);
			}
			this.setExpandedIndex(prevProps, checkoutIdDate, errorCodes);
		}
		this.setDefaultStates(prevProps, isLoading, isLoadingPaymentMethods);
		this.updatePayment(prevProps);
		this.updateAddress(prevProps);
	}
	setExpandedIndex = (prevProps, checkoutIdDate, errorCodes) =>{
		if (checkoutIdDate !== prevProps.checkoutIdDate && errorCodes && errorCodes.length > 0) {
			this.setState({ expandedIndex: null });
		}
	}
	setDefaultStates = (prevProps, isLoading, isLoadingPaymentMethods) =>{
		if ((isLoading === true && !prevProps.isLoading) || (isLoadingPaymentMethods === true && !prevProps.isLoadingPaymentMethods)) {
			this.setState({ expandedIndex: null, isOpenInvoiceClicked: false, paymentMethod: null });
		}
	}
	payonScriptInjection = (prevProps, mappedMethods, checkoutIdMethod, expandedIndex) =>{
		const { cartDetails, checkoutIdDate, payonEndpoint } = this.props;
		if (mappedMethods.find(m => m.magentoId === checkoutIdMethod)?.payon) {
			const checkoutId = cartDetails?.selected_payment_method?.payon_checkout_id;
			if (checkoutId && this.validateCheckoutId(checkoutIdDate, checkoutIdMethod, mappedMethods, expandedIndex)) {
				const prevTagId = prevProps?.cartDetails?.selected_payment_method?.payon_checkout_id;
				//remove exiting payon script
				if (prevTagId) {
					if (document.getElementById(prevTagId)) document.getElementById(prevTagId).remove();
				}
				const tag = document.createElement('script');
				tag.async = true;
				tag.src = `${payonEndpoint}/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
				tag.id = checkoutId;
				document.getElementsByTagName('body')[0].appendChild(tag);
			}
		}
	}
	updateAddress = (prevProps) =>{
		const { paymentMethods, cartDetails, isLoadingPaymentMethods, methods, isLoading, isAllowSave, adcIsAllowSave, enableNewPaymentFlow } = this.props;
		if (((isLoading === false && prevProps.isLoading) || (isLoadingPaymentMethods === false && prevProps.isLoadingPaymentMethods)) && !this.state.methodsAreLoaded) {
			this.setState({ methodsAreLoaded: true });
			const payMethodsDidupdate = enableNewPaymentFlow ? paymentMethods : methods;
			const isAllowSaveUpdated = enableNewPaymentFlow ? isAllowSave : adcIsAllowSave;
			if (isAllowSaveUpdated === true && prevProps.isAllowSaveUpdated !== isAllowSaveUpdated && payMethodsDidupdate.length > 0) {
				const defaultBillingAddress = cartDetails?.billing_address;
				const defaultShippingAddress = cartDetails?.shipping_address;
				defaultShippingAddress && this.props.setShippingAddressOnCart({ address: { ...defaultShippingAddress, id: defaultShippingAddress.address_id } });
				defaultBillingAddress && this.props.setBillingAddressOnCart({ address: { ...defaultBillingAddress, id: defaultBillingAddress.address_id } });
			}
		}
	}
	updatePayment = (prevProps) =>{
		const {isPaymentTokensLoading, paymentTokens} = this.props;
		if (isPaymentTokensLoading !== prevProps.isPaymentTokensLoading && paymentTokens) {
			this.setState({ loadingIndex: null });
			if (paymentTokens.length > 0 && isPaymentTokensLoading === false) {
				const paymentTokenFilter = paymentTokens.filter(item => item?.token !== '');
				if (paymentTokenFilter.length > 0) {
					this.setSavedPaymentMethod(paymentTokenFilter[0].token, paymentTokenFilter[0].method);
				}
			}
		}
	}
	isRiskCheckRequired = (prevProps) => {
		const { cartDetails } = this.props;
		let isRiskCheckRequired = false;
		//check for price or shipping method change
		if (prevProps?.cartDetails !== cartDetails && cartDetails?.items?.length) {
			if ((prevProps?.cartDetails?.prices?.grand_total?.value !== cartDetails?.prices?.grand_total?.value || prevProps?.cartDetails.selected_shipping_method?.carrier_code !== cartDetails.selected_shipping_method?.carrier_code) || (!this.state.methodsAreLoaded)) {
				isRiskCheckRequired = true;
			}
		}
		return isRiskCheckRequired;
	}
	defaultCartAddressDidChange = (prevProps, addressType) => {
		const { cartDetails } = this.props;
		return cartDetails?.[addressType]?.address_id !== prevProps.cartDetails?.[addressType]?.address_id;
	};
	isCPSOrder = () => {
		const { cartDetails } = this.props;
		return !!cartDetails?.items?.find(item => item?.product?.is_subscription);
	};
	isCPOrder = () => {
		const { cartDetails } = this.props;
		return !cartDetails?.items?.find(item => item?.product?.is_subscription);
	};
	paymentAddressCheck(customer, cartDetails) {
		const { enableNewPaymentFlow } = this.props;
		const streetAndNumber = splitAddressAndNumber(cartDetails.billing_address.street[0]);
		const billingStreetAndNumber = splitAddressAndNumber(cartDetails.billing_address.street[0]);
		const shippingStreetAndNumber = splitAddressAndNumber(cartDetails.shipping_address.street[0]);
		this.props.verifyAddressRequest({
			address: {
				street: streetAndNumber.street,
				streetNumber: streetAndNumber.streetNumber,
				zipcode: cartDetails.billing_address.postcode,
				city: cartDetails.billing_address.city,
				country: cartDetails.billing_address.country_id
			},
			billingAddress: {
				lastName: cartDetails.billing_address.lastname,
				firstName: cartDetails.billing_address.firstname,
				street: billingStreetAndNumber.street,
				streetNumber: billingStreetAndNumber.streetNumber,
				zipcode: cartDetails.billing_address.postcode,
				city: cartDetails.billing_address.city,
				country: cartDetails.billing_address.country_id
			},
			shippingAddress: {
				lastName: cartDetails.shipping_address.lastname,
				firstName: cartDetails.shipping_address.firstname,
				street: shippingStreetAndNumber.street,
				streetNumber: shippingStreetAndNumber.streetNumber,
				zipcode: cartDetails.shipping_address.postcode,
				city: cartDetails.shipping_address.city,
				country: cartDetails.shipping_address.country_id
			},
			AddressStatus: {
				isShipping: false,
				isBilling: false
			},
			user: {
				firstName: customer.firstname,
				lastName: customer.lastname,
				birthday: dottedToDashed(customer.dob),
				email: customer.email,
				salutation: `${customer.prefix.toUpperCase()}`
			},
			section: 'account'
		});
		if (enableNewPaymentFlow) {
			const cartId = cartDetails?.id;
			this.props.getAvailablePaymentMethodsGraphqlRequest(cartObject(cartId))
		}

	}
	setOrderType = () => {
		if (this.isCPSOrder()) return ORDER_TYPES.CPS;
		return ORDER_TYPES.CP;
	};
	constructPayload(customer, cartDetails) {
		const { dictionary } = this.props;
		const billingStreetAndNumber = splitAddressAndNumber(cartDetails.billing_address.street[0]);
		const shippingStreetAndNumber = splitAddressAndNumber(cartDetails.shipping_address.street[0]);
		return {
			orderType: this.setOrderType(),
			products: {
				items: cartDetails.items.map((value, index) =>
				({
					'-pos': `${index + 1}`,
					'ProductNumber': `${value.id}`,
					'ProductGroupId': '1',
					'UnitPrice': `${value.price.value}`,
					'UnitCount': `${value.qty}`,
					'Remarks': ''
				})),
				grossTotal: `${cartDetails.prices.grand_total.value}`,
				total: `${cartDetails.prices.subtotal_including_tax.value}`,
				deliveryType: cartDetails.selected_shipping_method?.carrier_code === CARRIER_CODE.FLATRATE ? DELIVERY_TYPE.NORMAL : DELIVERY_TYPE.EXPRESS
			},
			user: {
				id: customer.user_id,
				firstName: customer.firstname,
				lastName: customer.lastname,
				salutation: setSalution(customer, dictionary),
				birthday: dottedToDashed(customer.dob),
				mail: customer.email
			},
			billingAddress: {
				lastName: cartDetails.billing_address.lastname,
				firstName: cartDetails.billing_address.firstname,
				street: billingStreetAndNumber.street,
				streetNumber: billingStreetAndNumber.streetNumber,
				zipcode: cartDetails.billing_address.postcode,
				city: cartDetails.billing_address.city,
				country: cartDetails.billing_address.country_id
			},
			shippingAddress: {
				lastName: cartDetails.shipping_address.lastname,
				firstName: cartDetails.shipping_address.firstname,
				street: shippingStreetAndNumber.street,
				streetNumber: shippingStreetAndNumber.streetNumber,
				zipcode: cartDetails.shipping_address.postcode,
				city: cartDetails.shipping_address.city,
				country: cartDetails.shipping_address.country_id
			}
		};
	}

	toggleOption = (index) => {
		const { methods, getCustomerPaymentTokens, paymentMethods, enableNewPaymentFlow } = this.props;

		// making empty lastorder ID from session ADCDE-9829
		window.localStorage.setItem('lastOrderId', "");
		//unload exiting payon widget
		if (window.wpwl?.unload !== undefined) {
			window.wpwl.unload();
		}
		const mappedMethods = this.getMappedPaymentMethods(enableNewPaymentFlow ? paymentMethods : methods);
		const isExpanded = this.state.expandedIndex === index;
		if (!isExpanded) {
			const paymentMethod = mappedMethods[index]?.magentoId;
			if (paymentMethod == this.state.paymentMethod) {
				return false;
			}
			if (paymentMethod === MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN && this.savedPaymentMethod()) {
				getCustomerPaymentTokens();
				this.setState({
					expandedIndex: index,
					isSubmitDisabled: true,
				});
			} else {
				this.props.getCheckoutIdRequest({
					paymentMethod: paymentMethod,
					isSavePaymentMethod: paymentMethod === MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN || paymentMethod === PAYMENT_ID.FREE ? false : this.shouldSavePaymentMethod()
				});
			}
			this.setState({
				loadingIndex: index,
				paymentMethod: paymentMethod,
				paymentMethodToken: null
			});
		}
	};

	getMappedPaymentMethods = (methods) => {
		const { cartDetails, enableNewPaymentFlow } = this.props;

		const paymentAvailable = enableNewPaymentFlow ? methods?.find(m => (m === MAGENTO_PAYMENT_TYPES.PAYPAL || m === MAGENTO_PAYMENT_TYPES.CREDIT_CARD)) : methods?.find(m => (m === PAYMENT_ID.EP || m === PAYMENT_ID.CC));
		if (isRxCheckoutPageType() || (!isRxCheckoutPageType() && cartDetails?.prices?.grand_total?.value)) {
			return paymentMapping.filter(p => paymentAvailable && p.checkoutOnly || (enableNewPaymentFlow ? methods?.find(m => m === p.magentoId) : methods?.find(m => m === p.rsId)));
		} else {
			return paymentMapping.filter(p => p.magentoId === PAYMENT_ID.FREE);
		}
	};

	validateCheckoutId = (checkoutIdDate, checkoutIdMethod, mappedMethods, index) => {
		if (index === undefined || index === null || index < 0 || mappedMethods.length <= index || checkoutIdMethod === MAGENTO_PAYMENT_TYPES.OPEN_INVOICE) return false;

		return (checkoutIdDate ? new Date() <= new Date(checkoutIdDate).getTime() + maxCheckoutIdAge * minutes : false)
			&& (checkoutIdMethod === mappedMethods[index].magentoId);
	};

	markFormAsDirty = () => {
		this.setState({ isOpenInvoiceClicked: true });
	};

	setSavedPaymentMethod = (token, method) => {
		const { getCheckoutIdRequest } = this.props;
		const paymentMethod = MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN;
		if (paymentMethod == this.state.paymentMethod && token == this.state.paymentMethodToken) {
			return false;
		}
		const orderTypeCheck = this.shouldSavePaymentMethod();
		this.setState({
			paymentMethodToken: token,
			expandedIndex: null,
			loadingIndex: 0,
			methodUpdate: method,
			orderTypeCheck: orderTypeCheck
		});
		if (method === MAGENTO_PAYMENT_TYPES.PAYPAL && orderTypeCheck != false) {
			this.setState({
				paymentMethodToken: token,
				expandedIndex: null,
				loadingIndex: null,
				methodUpdate: method,
				orderTypeCheck: orderTypeCheck
			});
		}
		if (method !== MAGENTO_PAYMENT_TYPES.PAYPAL || orderTypeCheck == false) {
			// making empty lastorder ID from session ADCDE-9829
			window.localStorage.setItem('lastOrderId', "");
			//unload exiting payon widget
			if (window.wpwl !== undefined && window.wpwl.unload !== undefined) {
				window.wpwl.unload();
			}
			getCheckoutIdRequest({
				paymentMethod: paymentMethod,
				isSavePaymentMethod: paymentMethod === MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN || paymentMethod === PAYMENT_ID.FREE ? false : this.savedPaymentMethod(),
				paymentMethodToken: token
			});

		}
	};
	shouldSavePaymentMethod = () => this.isCPSOrder() || isRxCheckoutPageType();

	savedPaymentMethod = () => this.isCPOrder() || this.isCPSOrder() || isRxCheckoutPageType();

	getSickfundForCustomer = () => {
		const { customer, sickfunds } = this.props;
		return sickfunds.find(sickfund => sickfund.leadIKNumber === customer.payer_number);
	};
	validateInsuranceDetails = () => {
		const { customer, isMeasurementAvailable } = this.props;
		const sickfund = this.getSickfundForCustomer();
		if (isRxCheckoutPageType() && (customer?.payer_institution_name && customer?.health_insurance_number) && sickfund?.associatedRSPs?.[0]?.rspName === RSP_NAME_OPTIONS.CC) return i18nLabels.AOK_SPECIAL_CONTRACT_MESSAGE;
		else if (isRxCheckoutPageType() && !(customer?.payer_institution_name && customer?.health_insurance_number) && !isMeasurementAvailable) return i18nLabels.UPDATE_INSURANCE_AND_MEASUREMENT_DETAILS;
		else if (isRxCheckoutPageType() && !(customer?.payer_institution_name && customer?.health_insurance_number)) return i18nLabels.UPDATE_INSURANCE_DETAILS;
		else if (isRxCheckoutPageType() && !isMeasurementAvailable) return i18nLabels.UPDATE_MEASUREMENT_DETAILS;
		return undefined;
	}

	loadingIndicator = (enableNewPaymentFlow, isLoading, isLoadingPaymentMethods) => !enableNewPaymentFlow ? isLoading : isLoadingPaymentMethods;
	newWebShopMessage = (enableNewPaymentFlow, unavailablePaymentOptionsMsg, webShopMessage) => enableNewPaymentFlow ? unavailablePaymentOptionsMsg : webShopMessage;

	render() {

		const { confirmationPage, paymentMethods, checkboxes, cartDetails, paymentTokens, isPaymentTokensLoading, checkoutIdDate, methods, isLoadingPaymentMethods, isLoading, warnings, rxmcExists, webShopMessage, errorCodes, customer, enableCreateOrderCall, enableNewPaymentFlow, unavailablePaymentOptionsMsg } = this.props;
		const { expandedIndex, isOpenInvoiceClicked, methodsAreLoaded, loadingIndex, paymentMethod, paymentMethodToken, methodUpdate, orderTypeCheck } = this.state;
		const mappedPaymentMethods = this.getMappedPaymentMethods(enableNewPaymentFlow ? paymentMethods : methods);
		const payMethods = enableNewPaymentFlow ? paymentMethods : methods;
		const isPayon = expandedIndex !== null ? mappedPaymentMethods[expandedIndex]?.payon : false;
		const canBeSaved = expandedIndex !== null ? mappedPaymentMethods[expandedIndex]?.canBeSaved : false;
		const checkoutIdMethod = cartDetails?.selected_payment_method?.code;
		const isValidCheckoutId = this.validateCheckoutId(checkoutIdDate, checkoutIdMethod, mappedPaymentMethods, expandedIndex);
		const isInsuranceDetailsAvailable = customer?.id && this.validateInsuranceDetails();
		const IsErrorCodeGeneric = GENERIC_ERROR_CODES.indexOf(warnings?.[0]?.code) !== -1;
		const availableSavedPM = paymentTokens?.filter((pt) => mappedPaymentMethods?.find((pm) => pt.method === pm.magentoId) && pt.method !== MAGENTO_PAYMENT_TYPES.OPEN_INVOICE).map((paymethod, index) => ({ ...paymethod, id: index+1 }));
		return <>
			<if condition={warnings && warnings.length}>
				<Card title={i18nLabels.SOMETHING_IS_WRONG}>
					<CardContent>
						<MessageBanner icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={!IsErrorCodeGeneric ? 'magento_warning_message_' + warnings[0]?.code : warnings[0]?.message} />
					</CardContent>
				</Card>
			</if>
			<elseif condition={rxmcExists}>
				<MessageBanner icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={`magento_error_code_${rxmcExists}`} />
			</elseif>
			<elseif condition={isInsuranceDetailsAvailable}>
				<MessageBanner icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={isInsuranceDetailsAvailable} />
			</elseif>
			<else>
				<if condition={this.loadingIndicator(enableNewPaymentFlow, isLoading, isLoadingPaymentMethods)}>
					<Card title={i18nLabels.PAYMENT_METHOD_LABEL} className={'adc-payment'}>
						<CardContent>
							<Row className={'justify-content-center'}>
								<LoadingIndicator />
							</Row>
							<Row className={'justify-content-center'}>
								<Title size={Title.SIZE.H6} text={i18nLabels.PLEASE_WAIT} color={Title.COLOR.BLUE} />
							</Row>
						</CardContent>
					</Card>
				</if>
				<elseif condition={methodsAreLoaded}>
					<if condition={payMethods.length === 0}>
						<MessageBanner description={this.newWebShopMessage(enableNewPaymentFlow, unavailablePaymentOptionsMsg, webShopMessage) || i18nLabels.NO_PAYMENT_METHODS} color={MessageBanner.COLOR.BLUE} icon={MessageBanner.ICON.WARNING} />
					</if>
					<elseif condition={payMethods.length > 0}>
						<Card title={i18nLabels.PAYMENT_METHOD_LABEL} className={'adc-payment'}>
							<CardContent>
								<Title text={i18nLabels.CHOOSE_PAYMENT_METHOD}
									size={Title.SIZE.H6}
									color={Title.COLOR.BLACK}
									className={'adc-payment__title'}
									isCentered />
								<div className="adc-payment__payment-options">
									<Carousel itemsToShowDesktop={3} itemsToShowMobile={3} itemsToShowTablet={4} hasArrows scrollByDesktop={1}>
										{mappedPaymentMethods && mappedPaymentMethods.map((value, index) => <PaymentOption
											title={value.title} icon={value.icon}
											isExpanded={index === expandedIndex}
											isLoading={index === loadingIndex}
											index={index} key={value.id}
											toggleOption={this.toggleOption}
											error={errorCodes?.[0]}
											isWidgetLoading={null !== loadingIndex}
										/>
										)}
									</Carousel>
								</div>
								{errorCodes?.[0] &&
									<>
										<if condition={paymentMethod === MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN}>
											<p className={'adc-form-group--error mt-4'}>
												<I18n text={i18nLabels.NO_SAVED_PAYMENT_METHODS_YET} />
											</p>
										</if>
										<else>
											<p className={'adc-form-group--error mt-4'}>
												<I18n text={`magento_error_code_${errorCodes[0]}`} />
											</p>
										</else>
									</>
								}
								<if condition={paymentMethod === MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN && this.savedPaymentMethod()}>
									<form action={confirmationPage}>
										<if condition={availableSavedPM?.length > 0}>
											<div className={'adc-payment__saved-payments my-4'}>
												{availableSavedPM.map((pt) =>
													<SavedPaymentMethod key={pt.id} {...pt} isSelected={pt.token === paymentMethodToken} select={this.setSavedPaymentMethod} isWidgetLoading={null !== loadingIndex} />
												)}
											</div>
											<if condition={methodUpdate === MAGENTO_PAYMENT_TYPES.PAYPAL && orderTypeCheck != false}>
												<PaymentCheckboxes
													checkboxes={checkboxes}
													isPayon={false}
													paymentMethodToken={paymentMethodToken}
													methodUpdate={methodUpdate}
													orderTypeCheck={orderTypeCheck}
												/>
												<Button
													label={isRxCheckoutPageType() ? i18nLabels.RX_PAYMENT_CTA : i18nLabels.PAYMENT_CTA}
													ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
													type={BUTTON_OPTIONS.TYPE.SUBMIT}
													action={this.markFormAsDirty}
													isFullWidth
													hasNoMargin
													iconPosition={Icon.POSITION.LEFT}
													icon={'lock'}
													className={'call-Orderid-btn'} />
											</if>
										</if>
										<elseif condition={!isPaymentTokensLoading}>
											<p className={'adc-form-group--error mt-4'}>
												<I18n text={i18nLabels.NO_SAVED_PAYMENT_METHODS_YET} />
											</p>
										</elseif>
									</form>
									<if condition={enableCreateOrderCall}>
										<PaymentHelper isTriggerSaveOrderBeforePayment={true} cardID={cartDetails.id} />
									</if>
								</if>
								<if condition={isPayon && isValidCheckoutId && !errorCodes}>
									<div className={'adc-payment__payon'}>
										<PaymentCheckboxes checkboxes={checkboxes}
											isPayon={isPayon}
											canBeSaved={canBeSaved}
											isRxCheckoutPageType={isRxCheckoutPageType}
											canAutoSavePayment={paymentMethod === MAGENTO_PAYMENT_TYPES.SOFORT ? this.shouldSavePaymentMethod() : this.savedPaymentMethod()}
										/>
										<if condition={mappedPaymentMethods[expandedIndex].showRedirectNotice}>
											<PaymentRedirect title={mappedPaymentMethods[expandedIndex].title} />
										</if>
										<form action={confirmationPage} className="paymentWidgets"
											data-brands={mappedPaymentMethods[expandedIndex]?.id} />
										<if condition={enableCreateOrderCall}>
											<PaymentHelper isTriggerSaveOrderBeforePayment={true} cardID={cartDetails.id} />
										</if>
									</div>
								</if>
								<if condition={!isPayon && !errorCodes && (paymentMethod === PAYMENT_TYPES.OPEN_INVOICE || paymentMethod === PAYMENT_ID.FREE) && loadingIndex === null}>
									<form id="adc-payment__openinvoice"
										className={`adc-payment__form ${expandedIndex === null ? 'closed ' : ''}
										${isOpenInvoiceClicked ? 'dirty' : ''}`} action={confirmationPage}>
										<PaymentCheckboxes checkboxes={checkboxes} isPayon={isPayon} canAutoSavePayment={this.shouldSavePaymentMethod()} />
										<Button
											label={isRxCheckoutPageType() ? i18nLabels.RX_PAYMENT_CTA : i18nLabels.PAYMENT_CTA}
											ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
											type={BUTTON_OPTIONS.TYPE.SUBMIT}
											action={this.markFormAsDirty}
											isFullWidth
											hasNoMargin
											className={'wpwl-button'}
											icon={'lock'}
											iconPosition={Icon.POSITION.LEFT} />
									</form>
								</if>
							</CardContent>
						</Card>
					</elseif>
				</elseif>
			</else>
		</>;
	}
});
