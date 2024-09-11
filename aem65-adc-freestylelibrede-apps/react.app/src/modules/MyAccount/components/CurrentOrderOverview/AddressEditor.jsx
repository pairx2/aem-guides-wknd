import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {openModalAction} from '../../../Modal/redux/actions';
import Link from '../../../Generic/components/Link/Link';
import {For} from '../../../Generic/components/Logic/LogicalComponents';
import {i18nLabels} from '../../../../utils/translationUtils';
import {dottedToDashed} from '../../../../utils/dateUtils';
import DeliveryAddress from './DeliveryAddress';
import AddressEdit from '../../../Address/components/AddressEdit/AddressEdit';
import {updateAddressRequest} from '../../../Address/redux/actions/update_address.action';
import {empty} from '../../../../utils/default';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import {splitAddressAndNumber} from '../../../../utils/regexUtils';
import {getAvailablePaymentMethodsRequest} from '../../../Payment/redux/actions/get_available_payment_methods.action';
import {paymentMapping} from '../../../Payment/components/PaymentMapping.js';
import {updateOrderRequest, resetAddressEditor} from '../../redux/actions/update_order.action';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import {verifyAddressRequest} from '../../../Address/redux/actions/verify_address.actions';
import {ADDRESS_CHECK_SUCCESS} from '../../../Address/api/addressVerification.api';
import {ORDER_TYPES, DEFAULT_COUNTRY_OPTIONS, ADDRESS_TYPE, PAYMENT_TYPES} from '../../../../utils/enums';
import {createAddressRequest} from '../../../Address/redux/actions/create_address.action';
import OrderPaymentDisplayAndEdit from '../PlusService/OrderPaymentDisplayAndEdit';
import { setSalution, setBillingAddress, setShippingAddress } from '../../../../utils/addressUtils';

const mapStateToProps = (state, props) => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {values: updatedAddresses} = state.form.addressEdit || empty.object;
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const {riskcheckAddress, isAllowSave} = state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;
	const {isOrderUpdated, loading: isOrderLoading} = state.myAccountModuleReducer.OrderUpdateReducer;
	const {verificationStatus, address: verifiedAddress} = state.addressModuleReducer.AddressReducer.addresses.account || empty.object;
	const addressResultsReducer = props.order.orderType === ORDER_TYPES.RX ? state.addressModuleReducer.AddressReducer.addresses.account : state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;
	const {rssResultCode, isBlacklisted, isVerified} = addressResultsReducer;
	const paymentMethodsReducer = props.order.orderType === ORDER_TYPES.RX ? state.addressModuleReducer.AddressReducer : state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;
	const {error, methods, isLoading} = paymentMethodsReducer;
	return {customer, updatedAddresses, dictionary, methods, isOrderUpdated, isOrderLoading, verificationStatus, verifiedAddress, rssResultCode, isBlacklisted, isVerified, error, riskcheckAddress, isAllowSave, isLoading};
};

const mapDispatchToProps = {
	openModalAction,
	updateOrderRequest,
	resetAddressEditor,
	getAvailablePaymentMethodsRequest,
	updateAddressRequest: updateAddressRequest,
	verifyAddressRequest,
	createAddress: createAddressRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class CurrentOrder extends Component {
	static propTypes = {
		close: PropTypes.func,
		openModalAction: PropTypes.func,
		customer: PropTypes.object,
		confirmationPath: PropTypes.string,
		checkboxes: PropTypes.array,
		updatedAddresses: PropTypes.object,
		addresses: PropTypes.object,
		dictionary: PropTypes.object,
		verificationStatus: PropTypes.string,
		verifiedAddress: PropTypes.shape({}),
		getAvailablePaymentMethodsRequest: PropTypes.func,
		methods: PropTypes.array,
		order: PropTypes.object,
		updateOrderRequest: PropTypes.func,
		isOrderUpdated: PropTypes.bool,
		addressType: PropTypes.string,
		resetAddressEditor: PropTypes.func,
		createAddress: PropTypes.func,
		isOrderLoading: PropTypes.bool,
		verifyAddressRequest: PropTypes.func,
		rssResultCode: PropTypes.string,
		isVerified: PropTypes.bool,
		isBlacklisted: PropTypes.bool,
		error: PropTypes.string,
		isAllowSave: PropTypes.bool,
		riskcheckAddress: PropTypes.object,
		isLoading: PropTypes.bool,
	};

	state = {
		editing: false,
		address: {},
		newAddress: {
			id: -1
		},
		showPayonWidget:false,
		showAddressEdit: true,
		currentAction: '',
		isPaymentMismatch:false,
		useThisAddressChosen: false
	};

	componentDidMount() {
		this.ref = React.createRef();
		this.props.resetAddressEditor();
		window.addEventListener('hashchange', this.tabChanged, false);
	}

	showPayonWidgetBasedOnMethods = (methods) => {
		this.setState({showPayonWidget: true});
		if (this.arePaymentMethodsAvailable(methods)) {
			this.setState({isPaymentMismatch:false});
		} else {
			this.setState({isPaymentMismatch:true});
		}
		this.ref?.current?.scrollIntoView();
	}
	updateAddress = (editedAddress, verfiedAddress) => {
		const {useThisAddressChosen, address} = this.state;
		const {isBlacklisted, isVerified, rssResultCode, customer: {email}, addressType} = this.props;
		if(useThisAddressChosen) {
			const newAddressObj = {
				isBlacklisted: isBlacklisted,
				isVerified: isVerified,
				rssResultCode: rssResultCode,
				address_id: address?.id,
				address_type: addressType
			};
			sessionStorage.setItem('newAddressFromOrderUpdate', JSON.stringify(newAddressObj));
			sessionStorage.setItem('isAddressAndPaymentUpdate', true);
			sessionStorage.setItem('customerEmail', email);
		} else if(editedAddress){
			this.createAddress(editedAddress, verfiedAddress);
		}
	};

	addressUpdateBasedOnStatus = (prevProps, currentEditedAddressId) => {
		const { methods, isAllowSave, order, verificationStatus, isLoading, updatedAddresses, verifiedAddress, riskcheckAddress} = this.props;
		if(order.orderType === ORDER_TYPES.RX){
			if ((verificationStatus !== prevProps.verificationStatus) && verificationStatus === ADDRESS_CHECK_SUCCESS) {
				this.updateAddress(updatedAddresses?.[currentEditedAddressId], verifiedAddress);
				this.showPayonWidgetBasedOnMethods(methods);
				this.props.resetAddressEditor();
			}
		} else {
			if (isAllowSave !== prevProps.isAllowSave) {
				if(!isLoading){
					this.updateAddress(updatedAddresses?.[currentEditedAddressId], riskcheckAddress);
					this.showPayonWidgetBasedOnMethods(methods);
				}
			}
		}
	}

	componentDidUpdate(prevProps) {
		const {methods, customer: {addresses, email}, isLoading, addressType, rssResultCode, isBlacklisted, isVerified} = this.props;
		const {currentEditedAddressId} = this.state;
		if (this.propsDidChange(prevProps)) {
			if (methods.length == 0 && !isLoading) {
				resetAddressEditor();
				this.showNoPaymentMethodsAvaiableModal();
			} else {
				localStorage.setItem('showPayonWidget',true);
				this.addressUpdateBasedOnStatus(prevProps, currentEditedAddressId);
			}
			if (addresses?.length !== prevProps.customer?.addresses?.length) {
				const newAddressFromOrderUpdate = addresses[addresses.length -1];
				const newAddressObj = {
					isBlacklisted: isBlacklisted,
					isVerified: isVerified,
					rssResultCode: rssResultCode,
					address_id: newAddressFromOrderUpdate?.id,
					address_type: addressType
				};
				sessionStorage.setItem('newAddressFromOrderUpdate', JSON.stringify(newAddressObj));
				sessionStorage.setItem('isAddressAndPaymentUpdate', true);
				sessionStorage.setItem('customerEmail', email);
			}
			if(this.props.isOrderUpdated !== prevProps.isOrderUpdated && this.props.isOrderUpdated) {
				this.props.close();
			}
		}
	}

	propsDidChange(prevProps) {
		const {customer, methods, verificationStatus, isOrderUpdated, isVerified} = this.props;
		return (customer?.addresses?.length !== prevProps.customer?.addresses?.length) ||
			(methods!== prevProps.methods) ||
			(verificationStatus !== prevProps.verificationStatus) ||
			(isOrderUpdated !== prevProps.isOrderUpdated) ||
			(isVerified !== prevProps.isVerified);
	}

	compareAddress = (firstAddress, secondAddress) => {
		if (firstAddress.default_shipping && secondAddress.default_shipping) return 0;
		if (firstAddress.default_shipping) return -1;
		if (secondAddress.default_shipping) return 1;
	};

	getRsid = (paymentMethodType) => {
		return paymentMapping.find(payment => payment.title.toLowerCase() === paymentMethodType.toLowerCase())?.rsId;
	};

	constructPayload(customer, order, address) {
		const {dictionary, order: {deliveryAddress, billingAddress}, addressType} = this.props;
		const streetAndNumber = splitAddressAndNumber(address.street[0]);
		const billingStreetAndNumber = splitAddressAndNumber(billingAddress.street);
		const shippingStreetAndNumber = splitAddressAndNumber(deliveryAddress.street);
		const isShipping = addressType === ADDRESS_TYPE.SHIPPING;
		const isBilling = addressType === ADDRESS_TYPE.BILLING;
		return {
			orderType: order.orderType === ORDER_TYPES.RX ? ORDER_TYPES.WEBRX : order.orderType,
			products: {
				paymentType: this.getRsid(order.paymentDetails.paymentMethodType),
				grossTotal: `${order.priceBreakdown.price}`,
				total: `${order.priceBreakdown.totalPrice}`
			},
			user: {
				id: customer.user_id,
				firstName: customer.firstname,
				lastName: customer.lastname,
				salutation: setSalution(customer, dictionary),
				birthday: dottedToDashed(customer.dob),
				mail: customer.email
			},
			billingAddress: setBillingAddress(isBilling, address, billingAddress, streetAndNumber, billingStreetAndNumber),
			shippingAddress: setShippingAddress(isShipping, address, deliveryAddress, streetAndNumber, shippingStreetAndNumber),
			AddressStatus: {
				isShipping,
				isBilling
			},
			isOrderUpdate: true
		};
	}

	arePaymentMethodsAvailable = (methods) => {
		const {order} = this.props;
		if (methods.length === 0) return;
		if (order.paymentDetails.paymentMethodType === PAYMENT_TYPES.OPEN_INVOICE) {
			return (methods.indexOf(paymentMapping.find(payment => (payment.magentoId.toLowerCase()) === order.paymentDetails.paymentMethodType.toLowerCase())?.rsId) != -1 );
		} else {
			return (methods.indexOf(paymentMapping.find(payment => (payment.title.toLowerCase()) === order.paymentDetails.paymentMethodType.toLowerCase())?.rsId) != -1 );
		}
	};

	setAddress = (isAllowSave, riskcheckAddress, verifiedAddress) => {
		if(isAllowSave && riskcheckAddress)
			return	riskcheckAddress;
		else if(verifiedAddress)
			return verifiedAddress;
		else return this.state.address;
	}

	updateOrder = () => {
		const {updateOrderRequest, order, isAllowSave, riskcheckAddress, verifiedAddress} = this.props;
		const address = this.setAddress(isAllowSave, riskcheckAddress, verifiedAddress);
		const {zipcode, city, street, streetNumber, country} = address;
		const {prefix, postcode, firstname, lastname, country_name} = this.state.address;
		const newAddressFromOrderUpdate = JSON.parse(sessionStorage.getItem('newAddressFromOrderUpdate'));
		const {address_id, address_type, isBlacklisted, isVerified, rssResultCode} = newAddressFromOrderUpdate || {};

		updateOrderRequest({
			order_id: order.orderType === ORDER_TYPES.RX ? order.rxmc : order.orderId,
			order_type: order.orderType,
			address_type: address_type,
			address_id: address_id,
			set_as_default: false,
			prefix: prefix,
			firstname: firstname,
			lastname: lastname,
			postcode: postcode || zipcode,
			country_id: country_name?.value || country,
			city: city,
			street: this.state.address?.street?.length > 1
				? [ street + ' ' + streetNumber,
					this.state.address.street[1]
				]
				: [street + ' ' + streetNumber],
			rssResultCode: rssResultCode,
			isBlacklisted: isBlacklisted,
			isVerified: isVerified
		});
		sessionStorage.removeItem('newAddressFromOrderUpdate');
		sessionStorage.removeItem('isAddressAndPaymentUpdate');
		sessionStorage.removeItem('customerEmail');
		localStorage.removeItem('showPayonWidget');
	};

	showNoPaymentMethodsAvaiableModal = () => {
		const {openModalAction} = this.props;
		openModalAction({
			contentID: 'noPaymentMethodsAvailableModal',
			heading: i18nLabels.UNABLE_TO_UPDATE_ADDRESS_HEADING
		});
	};

	addressFormInitialValues = (address) => {
		const {updatedAddresses,addressType} = this.props;
		return {
			...updatedAddresses,
			["_"+address?.id]: {
				...address,
				default_shipping: address.default_shipping,
				country_name: {
					'label':address.address_label === ADDRESS_TYPE.SHIPPING  ? DEFAULT_COUNTRY_OPTIONS[0].label : address?.country_name?.label || address?.country_name,
					'value':address.address_label === ADDRESS_TYPE.SHIPPING  ? DEFAULT_COUNTRY_OPTIONS[0].value : address?.country_name?.value || address?.country_id
				},
				address_label: address.address_label || addressType,

			},
		};
	};

	saveNewAddress = () => this.saveAddress(-1);

	saveAddress = (id) => {
		const {order, updatedAddresses} = this.props;
		const address = updatedAddresses ?.["_"+id];
		if (order.orderType === ORDER_TYPES.RX) {
			this.setState({
				address,
				currentEditedAddressId: "_"+id
			});
			this.addressCheck(address);
		} else {
			this.setState({
				address,
				currentEditedAddressId: "_"+id
			});
			this.riskCheck(address);
		}
	};

	useThisAddress = (address) => {
		const {order} = this.props;
		this.setState({
			address,
			currentEditedAddressId: address.id,
			useThisAddressChosen:true
		});
		if (order.orderType === ORDER_TYPES.RX) {
			this.addressCheck(address);
		} else {
			this.riskCheck(address);
		}
	};


	addressCheck = (address) => {
		const {verifyAddressRequest, customer: {dob, email}, order: {deliveryAddress, billingAddress}, addressType} = this.props;
		const {street, postcode, city, firstname, lastname, prefix, country_name, country_id} = address;
		const streetAndNumber = splitAddressAndNumber(street?.[0]);
		const billingStreetAndNumber = splitAddressAndNumber(billingAddress.street);
		const shippingStreetAndNumber = splitAddressAndNumber(deliveryAddress.street);
		verifyAddressRequest({
			address: {
				street: streetAndNumber.street,
				streetNumber: streetAndNumber.streetNumber,
				zipcode: postcode,
				city: city,
				country: country_name.value || country_id
			},
			user: {
				lastName: lastname,
				firstName: firstname,
				birthday: dottedToDashed(dob),
				email: email,
				salutation: `${prefix?.toUpperCase()}`
			},
			billingAddress: {
				lastName: billingAddress.lastName,
				firstName: billingAddress.firstName,
				street: billingStreetAndNumber.street,
				streetNumber: billingStreetAndNumber.streetNumber,
				zipcode: billingAddress.zipCode,
				city: billingAddress.city,
				country: billingAddress.country || billingAddress.countryCode
			},
			shippingAddress: {
				lastName: deliveryAddress.lastName,
				firstName: deliveryAddress.firstName,
				street: shippingStreetAndNumber.street,
				streetNumber: shippingStreetAndNumber.streetNumber,
				zipcode: deliveryAddress.zipCode,
				city: deliveryAddress.city,
				country: deliveryAddress.country || deliveryAddress.countryCode
			},
			AddressStatus: {
				isShipping: addressType === ADDRESS_TYPE.SHIPPING,
				isBilling: addressType === ADDRESS_TYPE.BILLING
			},
			isOrderUpdate: true,
			section: 'account'
		});
	}

	riskCheck = (address) => {
		const {customer, order, getAvailablePaymentMethodsRequest} = this.props;
		const payload = this.constructPayload(customer, order, address);
		this.setState({
			address
		});
		getAvailablePaymentMethodsRequest(payload);
	};

	createAddress = (updatedAddress, address) => {
		if(!updatedAddress || !address) return;
		const {createAddress, rssResultCode, isVerified, isBlacklisted} = this.props;
		const addressFields = {
			...updatedAddress,
			country_id: address.country || updatedAddress.country_name.value,
			rss_result_code: rssResultCode,
			missing_verification: !isVerified,
			is_blacklisted: isBlacklisted,
			default_shipping: !!updatedAddress.default_shipping,
			default_billing: !!updatedAddress.default_billing,
			street: updatedAddress?.street.length > 1
				? [
					address.street + ' ' + address.streetNumber,
					updatedAddress.street[1]
				]
				: [address.street + ' ' + address.streetNumber],
			postcode: address.zipcode,
			city: address.city
		};
		if (updatedAddress.id <= 0) {
			createAddress(addressFields);
		}
	};

	tabChanged = () => {
		this.setState({
			isEditing: false
		});
	};

	setTitle = (isEditing, addressType) => {
		if(isEditing) 
			return i18nLabels.PLEASE_UPDATE_ADDRESS;
		else if(addressType === ADDRESS_TYPE.SHIPPING)
			return i18nLabels.ADD_OR_EDIT_DELIVERY_ADDRESS;
		else return i18nLabels.ADD_OR_EDIT_BILLING_ADDRESS;
	}

	render() {
		const {close, error, methods, customer: {addresses}, order, customer, checkboxes, confirmationPath, isOrderLoading, addressType, isLoading} = this.props;
		const {newAddress, isEditing, isPaymentMismatch, showPayonWidget} = this.state;
		const accountAddresses = addressType === ADDRESS_TYPE.SHIPPING ? addresses?.filter(address => address.country_id === DEFAULT_COUNTRY_OPTIONS[0].value) : addresses;
		return (
			<div ref={this.ref}>
				<if condition={!showPayonWidget}>
					<Card title={this.setTitle(isEditing, addressType)}>
						<CardContent>
							{
								(isLoading || isOrderLoading) && <LoadingIndicator isOverlay/>
							}
							<Row>
								<Col className={'text-right'}>
									<Link action={close}
										label={i18nLabels.BACK_TO_ORDER_OVERVIEW_CTA}
										className={'text-right'}
									/>
								</Col>
								<Col>

									<h6>{addresses.length > 0 &&
									<I18n text={i18nLabels.ADDED_ADDRESSES_LABEL} suffix={':'}/>}</h6>
								</Col>
							</Row>

							<if condition={addresses.length > 0}>
								<div className={'row adc-title--border-bottom'}>
									<For array={accountAddresses} sort={this.compareAddress}>
										{(address, index) =>
											<DeliveryAddress
												address={address}
												selectAddress={(address) => this.useThisAddress(address)}
												index={index}
											/>
										}
									</For>
								</div>
							</if>
							<h6>
								<I18n text={addressType === ADDRESS_TYPE.SHIPPING ? i18nLabels.ADD_NEW_DELIVERY_ADDRESS_LABEL : i18nLabels.ADD_NEW_BILLING_ADDRESS_LABEL} suffix={':'}/>
							</h6>
							<AddressEdit
								addressId={newAddress.id}
								initialValues={this.addressFormInitialValues(newAddress)}
								informationalMessage={null}
								hasTwoColumns
								isDisabled
								addressType={addressType}
								onSubmit={this.saveNewAddress}
								cancelEdit={close}
								canSave
							/>
						</CardContent>
					</Card>
				</if>
				<elseif condition={showPayonWidget}>
					<Card title={i18nLabels.UPDATE_ADDRESS_FOR_ORDER_HEADING}>
						<CardContent>
							<Row>
								<Col className={'text-right'}>
									<Link action={close}
										label={i18nLabels.BACK_TO_ORDER_OVERVIEW_CTA}
										className={'text-right'}
									/>
								</Col>
								<Col lg={8} className='offset-lg-2'>
									<OrderPaymentDisplayAndEdit order={order} isLoading={isLoading} methods={methods} error={error}
										customer={customer} showPayonWidget={showPayonWidget} updateAddress={this.updateOrder} isPaymentMismatch={isPaymentMismatch} confirmationPage={confirmationPath} checkboxes={checkboxes}/>
								</Col>
							</Row>
						</CardContent>
					</Card>
				</elseif>
			</div>
		);
	}
});
