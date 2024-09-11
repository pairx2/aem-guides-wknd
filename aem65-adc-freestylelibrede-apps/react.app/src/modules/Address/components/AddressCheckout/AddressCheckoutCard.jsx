import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { i18nLabels } from '../../../../utils/translationUtils';
import { clearForm } from '../../../MyAccount/redux/actions/form_pre_populate.action';
import AddressDisplay from './AddressDisplay';
import AddressEdit from '../AddressEdit/AddressEdit';
import AddressSelectOption from '../AddressSelectOption/AddressSelectOption';
import { verifyAddressRequest } from '../../redux/actions/verify_address.actions';
import { splitAddressAndNumber } from '../../../../utils/regexUtils';
import { ADDRESS_CHECK_SUCCESS, ADDRESS_CHECK_ERROR } from '../../api/addressVerification.api';
import { setBillingAddressOnCart, setShippingAddressOnCart } from '../../../Cart/redux/actions/cart.action';
import Link from '../../../Generic/components/Link/Link';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import { For } from '../../../Generic/components/Logic/LogicalComponents';
import { dottedToDashed } from '../../../../utils/dateUtils';
import { ORDER_TYPES, CARRIER_CODE, DELIVERY_TYPE, DEFAULT_COUNTRY_OPTIONS, ADDRESS_TYPE } from '../../../../utils/enums';
import { isRxCheckoutPageType } from '../../../../utils/pageTypeUtils';
import { getAvailablePaymentMethodsRequest } from '../../../Payment/redux/actions/get_available_payment_methods.action';
import { getAvailablePaymentMethodsGraphqlRequest, getAvailablePaymentMethodsGraphqlRequestFailure } from '../../../Cart/redux/actions/get_available_payment_methods_graphql.action';
import { cartObject } from '../../../../utils/paymentUtils';
import { setSalution } from '../../../../utils/addressUtils';
const mapStateToProps = state => {
	const { customer } = state.myAccountModuleReducer.GetCustomerReducer;
	const { values: updatedAddresses } = state.form.addressEdit || {};
	const { isLoading, webShopMessage: verifiedWebshopMessage, isAllowSave: verifiedAddressAllowSave } = state.addressModuleReducer.AddressReducer;
	const cartReducer = isRxCheckoutPageType() ? state.cartModuleReducer.GhostCartReducer : state.cartModuleReducer.GetCustomerCartReducer;
	const { cartDetails, loading: isCartLoading } = cartReducer;
	const { verificationStatus, address: verifiedAddress } = state.addressModuleReducer.AddressReducer.addresses.account;
	const { riskcheckAddress, isAllowSave, isLoading: isRiskcheckLoading, webShopMessage } = state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;
	const rssResultsReducer = isRxCheckoutPageType() ? state.addressModuleReducer.AddressReducer.addresses.account : state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;
	const { rssResultCode, isBlacklisted, isVerified, methods } = rssResultsReducer;
	const { paymentMethods } = state.cartModuleReducer.GetAvailablePaymentMethodsGraphqlReducer;
	return { rssResultCode, isBlacklisted, isVerified, updatedAddresses, isLoading, customer, isCartLoading, verificationStatus, verifiedAddress, cartDetails, riskcheckAddress, isAllowSave, isRiskcheckLoading, paymentMethods, methods, webShopMessage, verifiedAddressAllowSave, verifiedWebshopMessage };
};

const mapDispatchToProps = {
	clearForm,
	verifyAddressRequest,
	setShippingAddressOnCart,
	setBillingAddressOnCart,
	getAvailablePaymentMethodsRequest,
	getAvailablePaymentMethodsGraphqlRequest,
	getAvailablePaymentMethodsGraphqlRequestFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(class AddressCheckoutCard extends Component {
	static propTypes = {
		address: PropTypes.shape({
			addresstype: PropTypes.string,
			prefix: PropTypes.string,
			firstname: PropTypes.string,
			lastname: PropTypes.string,
			street: PropTypes.array,
			postcode: PropTypes.string,
			city: PropTypes.string,
			isNew: PropTypes.bool,
			id: PropTypes.number,
			address_id: PropTypes.number,
			country_id: PropTypes.string,
		}),
		verifiedAddress: PropTypes.object,
		informationalMessage: PropTypes.string,
		dob: PropTypes.string,
		email: PropTypes.string,
		isBilling: PropTypes.bool,
		isShipping: PropTypes.bool,
		isCartLoading: PropTypes.bool,
		isLoading: PropTypes.bool,
		isShippingEqualToBilling: PropTypes.bool,
		isEditing: PropTypes.bool,
		isSelecting: PropTypes.bool,
		setShippingAddressOnCart: PropTypes.func,
		setBillingAddressOnCart: PropTypes.func,
		verifyAddressRequest: PropTypes.func,
		createNewShippingAddress: PropTypes.func,
		createNewBillingAddress: PropTypes.func,
		clearNewShippingAddress: PropTypes.func,
		clearNewBillingAddress: PropTypes.func,
		setModes: PropTypes.func,
		setBillingModes: PropTypes.func,
		updatedAddresses: PropTypes.object,
		newAddress: PropTypes.object,
		customer: PropTypes.object,
		cartDetails: PropTypes.object,
		verificationStatus: PropTypes.string,
		selectableAddresses: PropTypes.array,
		dictionary: PropTypes.object,
		getAvailablePaymentMethodsRequest: PropTypes.func,
		riskcheckAddress: PropTypes.object,
		isAllowSave: PropTypes.bool,
		isRiskcheckLoading: PropTypes.bool,
		rssResultCode: PropTypes.string,
		isBlacklisted: PropTypes.bool,
		isVerified: PropTypes.bool,
		paymentMethods: PropTypes.shape({}),
		getAvailablePaymentMethodsGraphqlRequest: PropTypes.func,
		enableNewPaymentFlow: PropTypes.bool,
		methods: PropTypes.array,
		getAvailablePaymentMethodsGraphqlRequestFailure: PropTypes.func,
		webShopMessage: PropTypes.string,
		verifiedAddressAllowSave: PropTypes.bool,
		verifiedWebshopMessage: PropTypes.string
	};
	static defaultProps = {
		address: {},
		isBilling: false,
		isShipping: false
	};

	state = {
		currentEditedAddressId: undefined,
		useThisAddressChosen: false,
		chosenDefaultAddress: null,
		selecting: false,
		newAddresses: [],
		addressChange: false
	};

	handleNewPaymentGraphqlCall = () => {
		const { cartDetails } = this.props;
		const cartId = cartDetails?.id;
		getAvailablePaymentMethodsGraphqlRequest(cartObject(cartId));
	}

	disableEditMode = (prevProps, isLoading, isRiskcheckLoading) => {
		return (prevProps?.isLoading === true && prevProps?.isLoading !== isLoading) || (prevProps?.isRiskcheckLoading === true && prevProps?.isRiskcheckLoading !== isRiskcheckLoading);
	}
	disableSelectMode = (prevProps, isCartLoading) => {
		return prevProps?.isCartLoading === true && prevProps?.isCartLoading !== isCartLoading;
	}

	componentDidUpdate = (prevProps) => {
		const { isLoading, isCartLoading, verificationStatus, updatedAddresses, verifiedAddress, riskcheckAddress, isAllowSave, isRiskcheckLoading, cartDetails, getAvailablePaymentMethodsGraphqlRequest, enableNewPaymentFlow, getAvailablePaymentMethodsGraphqlRequestFailure, webShopMessage, verifiedAddressAllowSave, verifiedWebshopMessage } = this.props;
		const { currentEditedAddressId, addressChange } = this.state;
		if (this.disableEditMode(prevProps, isLoading, isRiskcheckLoading)) {
			this.cancelEditMode();
		}
		if (this.disableSelectMode(prevProps, isCartLoading)) {
			this.cancelSelectMode();
		}
		if (isRxCheckoutPageType() && (verificationStatus === ADDRESS_CHECK_SUCCESS && prevProps?.verificationStatus !== verificationStatus)) {
			this.updateAddresses(updatedAddresses?.["_"+currentEditedAddressId], verifiedAddress);
		}
		else if (isAllowSave && prevProps?.isAllowSave !== isAllowSave) {
			this.updateAddresses(updatedAddresses?.["_"+currentEditedAddressId], riskcheckAddress);
		}
		const varWebshopMessage = isRxCheckoutPageType() ? verifiedWebshopMessage : webShopMessage;
		const varIsAllowSave = isRxCheckoutPageType() ? verifiedAddressAllowSave : isAllowSave;
		const prevPropsWebshopMessage = isRxCheckoutPageType() ? prevProps?.verifiedWebshopMessage !== varWebshopMessage : prevProps?.webShopMessage !== varWebshopMessage;
		if ((prevProps?.cartDetails?.billing_address !== cartDetails?.billing_address || prevProps?.cartDetails?.shipping_address !== cartDetails?.shipping_address) && enableNewPaymentFlow) {
			const cartId = cartDetails?.id;
			getAvailablePaymentMethodsGraphqlRequest(cartObject(cartId));
		} else if (prevPropsWebshopMessage && varWebshopMessage && !varIsAllowSave && enableNewPaymentFlow && addressChange) {
			const error = { error: varWebshopMessage }
			getAvailablePaymentMethodsGraphqlRequestFailure(error)
		}
	};
	updateAddresses = (editedAddress, verfiedAddress) => {
		const { useThisAddressChosen, chosenDefaultAddress } = this.state;
		if (useThisAddressChosen && chosenDefaultAddress) {
			this.setDefaultCartAddress(chosenDefaultAddress);
		} else if (editedAddress) {
			this.submitAddress(editedAddress, verfiedAddress);
			this.clearNewAddress();
		}
	};
	submitAddress = (updatedAddress, address) => {
		if (!updatedAddress || !address) return;
		const { rssResultCode, isVerified, isBlacklisted } = this.props;
		const addressFields = {
			...updatedAddress,
			country_id: address?.country || updatedAddress?.country_name?.value,
			rss_result_code: rssResultCode,
			missing_verification: !isVerified,
			is_blacklisted: isBlacklisted,
			telephone: updatedAddress?.telephone || null,
			default_shipping: !!updatedAddress?.default_shipping,
			default_billing: !!updatedAddress?.default_billing,
			street: updatedAddress?.street?.length > 1
				? [
					address?.street + ' ' + address?.streetNumber,
					updatedAddress?.street[1]
				]
				: [address?.street + ' ' + address?.streetNumber],
			postcode: address?.zipcode,
			city: address?.city
		};
		if (updatedAddress?.id <= 0) {
			this.setDefaultCartAddress({ ...addressFields, id: null });
		}
	};
	setAddress = (address) => {
		const { isShipping, isBilling } = this.props;
		this.setState({
			useThisAddressChosen: true,
			chosenDefaultAddress: address,
			addressChange: true
		});
		if (isRxCheckoutPageType()) this.addressCheckVerification(isShipping, isBilling, address);
		else this.riskCheckVerification(isShipping, isBilling, address);
	};
	setDefaultCartAddress(address) {
		const { isShipping, setShippingAddressOnCart, isBilling, setBillingAddressOnCart } = this.props;
		this.setState({
			useThisAddressChosen: false,
			chosenDefaultAddress: null
		});
		if (isShipping) {
			setShippingAddressOnCart(
				{
					address: { ...address },
					fetchCart: true,
					saveToAccount: !address.id
				});
		} else if (isBilling) {
			setBillingAddressOnCart(
				{
					address: { ...address },
					fetchCart: true,
					saveToAccount: !address.id
				});
		}
	}
	addressFormInitialValues = (address) => {
		const { updatedAddresses, customer, isShipping } = this.props;
		address['address_label'] = isShipping ? ADDRESS_TYPE.SHIPPING : ADDRESS_TYPE.BILLING;
		const data = {
			...updatedAddresses,
			["_"+address?.id]: address
		};
		if (address?.id < 0) {
			data["_"+address?.id].country_name = {
				'label': address.address_label === ADDRESS_TYPE.SHIPPING ? DEFAULT_COUNTRY_OPTIONS[0].label : '',
				'value': address.address_label === ADDRESS_TYPE.SHIPPING ? DEFAULT_COUNTRY_OPTIONS[0].value : ''
			};
		}

		if (address?.id === -1 && customer?.landline_phone) data["_"+address?.id].telephone = customer?.landline_phone;
		return data;
	};

	cancelEditMode = () => {
		const { setModes } = this.props;
		setModes({
			editing: false,
		});

	};

	setSelectMode = () => {
		const { setModes, setBillingModes, isShipping, isShippingEqualToBilling } = this.props;
		setModes({
			editing: false,
			selecting: true
		});
		if (isShipping && isShippingEqualToBilling) {
			setBillingModes({
				editing: false,
				selecting: true
			});
		}
	};

	cancelSelectMode = () => {
		const { setModes } = this.props;
		setModes({
			selecting: false
		});
		this.setState({
			currentEditedAddressId: null,
		});
	};

	addressCheckVerification = (isShipping, isBilling, address = {}) => {
		const { verifyAddressRequest, customer: { dob, email }, cartDetails: { shipping_address, billing_address } } = this.props;
		const { street, postcode, city, firstname, lastname, prefix, country_name, country_id } = address;
		const streetAndNumber = splitAddressAndNumber(street?.[0]);
		const billingStreetAndNumber = splitAddressAndNumber(billing_address?.street[0]);
		const shippingStreetAndNumber = splitAddressAndNumber(shipping_address?.street[0]);
		verifyAddressRequest({
			address: {
				street: streetAndNumber.street,
				streetNumber: streetAndNumber.streetNumber,
				zipcode: postcode,
				city: city,
				country: country_name?.value || country_id
			},
			billingAddress: {
				lastName: billing_address?.lastname,
				firstName: billing_address?.firstname,
				street: billingStreetAndNumber.street,
				streetNumber: billingStreetAndNumber.streetNumber,
				zipcode: billing_address?.postcode,
				city: billing_address?.city,
				country: billing_address?.country_id
			},
			shippingAddress: {
				lastName: shipping_address?.lastname,
				firstName: shipping_address?.firstname,
				street: shippingStreetAndNumber.street,
				streetNumber: shippingStreetAndNumber.streetNumber,
				zipcode: shipping_address?.postcode,
				city: shipping_address?.city,
				country: shipping_address?.country_id
			},
			AddressStatus: {
				isShipping,
				isBilling
			},
			user: {
				lastName: lastname,
				firstName: firstname,
				birthday: dottedToDashed(dob),
				email: email,
				salutation: `${prefix?.toUpperCase()}`
			},
			section: 'account'
		});
		this.handleNewPaymentGraphqlCall();
	}

	isCPSOrder = () => {
		const { cartDetails } = this.props;
		return !!cartDetails?.items?.find(item => item?.product?.is_subscription);
	};

	setOrderType = () => {
		if (this.isCPSOrder()) return ORDER_TYPES.CPS;
		return ORDER_TYPES.CP;
	};

	createBillingAddressPayload = (addressParam) => {
		const createBillingAddressPayload = {
			lastName: addressParam?.lastname,
			firstName: addressParam?.firstname,
			street: addressParam?.street,
			streetNumber: addressParam?.streetNumber,
			zipcode: addressParam?.postcode,
			city: addressParam?.city,
			country: addressParam?.country_name?.value || addressParam?.country_id
		}

		return createBillingAddressPayload;
	}
	billingAddressValue = (address, isBilling) => {
		const { cartDetails } = this.props;
		const { street } = address;
		const streetAndNumber = splitAddressAndNumber(street?.[0]);
		const billingStreetAndNumber = splitAddressAndNumber(cartDetails?.billing_address?.street[0]);
		return isBilling ? this.createBillingAddressPayload({ ...address, ...streetAndNumber, }) : this.createBillingAddressPayload({ ...cartDetails?.billing_address, ...billingStreetAndNumber });
	}

	shippingAddressValue = (address, isShipping) => {
		const { cartDetails } = this.props;
		const { street } = address;
		const streetAndNumber = splitAddressAndNumber(street?.[0]);

		const shippingStreetAndNumber = splitAddressAndNumber(cartDetails?.shipping_address?.street[0]);
		return isShipping ? this.createBillingAddressPayload({ ...address, ...streetAndNumber }) : this.createBillingAddressPayload({ ...cartDetails?.shipping_address, ...shippingStreetAndNumber });
	}

	riskCheckVerification = (isShipping, isBilling, address = {}) => {
		const { getAvailablePaymentMethodsRequest, dictionary, customer, cartDetails } = this.props

		getAvailablePaymentMethodsRequest({
			orderType: this.setOrderType(),
			products: {
				items: cartDetails?.items.map((value, index) => ({
					'-pos': `${index + 1}`,
					'ProductNumber': `${value.id}`,
					'ProductGroupId': '1',
					'UnitPrice': `${value.price.value}`,
					'UnitCount': `${value.qty}`,
					'Remarks': ''
				})),
				grossTotal: `${cartDetails?.prices.grand_total?.value}`,
				total: `${cartDetails?.prices.subtotal_including_tax?.value}`,
				deliveryType: cartDetails.selected_shipping_method?.carrier_code === CARRIER_CODE.FLATRATE ? DELIVERY_TYPE.NORMAL : DELIVERY_TYPE.EXPRESS
			},
			user: {
				id: customer?.user_id,
				firstName: customer?.firstname,
				lastName: customer?.lastname,
				salutation: setSalution(customer, dictionary),
				birthday: dottedToDashed(customer?.dob),
				mail: customer?.email
			},
			billingAddress: this.billingAddressValue(address, isBilling),
			shippingAddress: this.shippingAddressValue(address, isShipping),
			AddressStatus: {
				isShipping
			},
		});

	}

	saveAddress = (id) => {
		this.setState({
			currentEditedAddressId: id,
			addressChange: true
		});
		const { updatedAddresses, isShipping, isBilling } = this.props;

		if (isRxCheckoutPageType()) this.addressCheckVerification(isShipping, isBilling, updatedAddresses?.["_"+id]);
		else this.riskCheckVerification(isShipping, isBilling, updatedAddresses?.["_"+id]);
	};

	backToAddressBook = () => {
		const { isShipping, clearNewBillingAddress, clearNewShippingAddress, verificationStatus, isAllowSave } = this.props;
		isShipping ? clearNewShippingAddress() : clearNewBillingAddress();
		//trigger risk/address check with default cart addresses to get payment methods
		if (verificationStatus === ADDRESS_CHECK_ERROR || isAllowSave === false) {
			//When risk/address check fails then onClick of back button, setting current Edited AddressId to null to prevent from getting new Address saved
			this.setState({ currentEditedAddressId: null, addressChange: true });
			if (isRxCheckoutPageType()) this.addressCheckVerification(false, false, {});
			else this.riskCheckVerification();
		}
	};

	clearNewAddress = () => {
		this.backToAddressBook();
		this.cancelSelectMode();
	};

	createNewAddress = () => {
		const { createNewBillingAddress, createNewShippingAddress } = this.props;
		this.willAddBilling() ? createNewBillingAddress() : createNewShippingAddress();
	};

	willAddBilling = () => !this.props.isShipping;

	render() {
		const { address, informationalMessage, isLoading, newAddress, selectableAddresses, isEditing, isSelecting, isShipping, isShippingEqualToBilling } = this.props;
		const accountAddresses = isShipping ? selectableAddresses?.filter(address => address.country_id === DEFAULT_COUNTRY_OPTIONS[0].value) : selectableAddresses;
		return (
			<>
				<if condition={isSelecting || newAddress}>
					<if condition={!newAddress}>
						<For array={accountAddresses}>
							{(address, i) =>
								<AddressSelectOption
									key={i}
									isShipping={isShipping}
									address={address}
									setAddress={this.setAddress}
									clearNewAddress={this.clearNewAddress}
								/>}
						</For>
					</if>
					<if condition={newAddress}>
						<AddressEdit
							isShipping={isShipping}
							addressId={newAddress?.id}
							initialValues={this.addressFormInitialValues(newAddress)}
							informationalMessage={informationalMessage}
							onSubmit={() => this.saveAddress(newAddress?.id)}
							cancelEdit={this.backToAddressBook}
							canSave={!isLoading}
							isDisabled
						/>
					</if>
					<if condition={isSelecting && !newAddress}>
						<Button
							action={this.createNewAddress}
							type={BUTTON_OPTIONS.TYPE.BUTTON}
							className={'mt-3'}
							ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
							isFullWidth
							hasNoMargin
							label={this.willAddBilling() && !isShippingEqualToBilling ? i18nLabels.ADD_BILLING_ADDRESS_CTA : i18nLabels.ADD_SHIPPING_ADDRESS_CTA}
						/>
					</if>
					<if condition={!newAddress}>
						<div className="pb-4">
							<Button
								action={this.clearNewAddress}
								type={BUTTON_OPTIONS.TYPE.BUTTON}
								className={'mt-3'}
								ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
								isFullWidth
								hasNoMargin
								label={i18nLabels.BACK_CTA_TEXT}
							/>
						</div>
					</if>
				</if>
				<if condition={!isEditing && !isSelecting && !newAddress}>
					<AddressDisplay address={address} />
					<div className={'adc-card__action mt-3 py-2 text-right'}>
						<Link action={this.setSelectMode}
							icon={'edit-icon'}
							label={i18nLabels.EDIT}
						/>
					</div>
				</if>
				
			</>
		);
	}
});
