import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardContent, CardAction } from '../../../Generic/components/Card/Card';
import CardEmptyContent from '../../../Generic/components/CardEmptyContent/CardEmptyContent';
import { i18nLabels } from '../../../../utils/translationUtils';
import {
	addNewAddressRequest,
	updateEditedAddressID,
	updateOrderAddressRequest
} from '../../redux/actions/customer.action';
import { hideEditForm, prePopulateForm } from '../../redux/actions/form_pre_populate.action';
import { ADDRESS_CHECK_ERROR, ADDRESS_CHECK_SUCCESS } from '../../../Address/api/addressVerification.api';
import { empty } from '../../../../utils/default';
import { For } from '../../../Generic/components/Logic/LogicalComponents';
import AddressSelectOption from '../../../Address/components/AddressSelectOption/AddressSelectOption';
import { splitAddressAndNumber } from '../../../../utils/regexUtils';
import { verifyAddressRequest } from '../../../Address/redux/actions/verify_address.actions';
import { updateAddressRequest } from '../../../Address/redux/actions/update_address.action';
import { openModalAction } from '../../../Modal/redux/actions';
import { deleteAddressRequest } from '../../../Address/redux/actions/delete_address.action';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import AddressEdit from '../../../Address/components/AddressEdit/AddressEdit';
import { createAddressRequest } from '../../../Address/redux/actions/create_address.action';
import { dottedToDashed } from '../../../../utils/dateUtils';
import I18n from '../../../Translation/components/I18n';
import AddressDisplay from '../../../Address/components/AddressCheckout/AddressDisplay';
import Link from '../../../Generic/components/Link/Link';
import Col from '../../../Generic/components/Container/Col';
import Icon from '../../../Generic/components/Icon/Icon';
import { DEFAULT_COUNTRY_OPTIONS, ADDRESS_TYPE } from '../../../../utils/enums';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';

const mapStateToProps = state => {
	const { showEditForm } = state.myAccountModuleReducer.PrePoulateFormReducer;
	const { customer, addressID, maxAddressError } = state.myAccountModuleReducer.GetCustomerReducer;
	const { values: updatedAddresses } = state.form.addressEdit || empty.object;
	const {errorAddressChange: errorAddress } = state.addressModuleReducer.AddressReducer;
	const { verificationStatus, address: verifiedAddress, rssResultCode, isVerified, isBlacklisted } = state.addressModuleReducer.AddressReducer.addresses.account;
	return {
		customer, addressID, showEditForm, maxAddressError, verificationStatus, rssResultCode, isVerified, isBlacklisted, verifiedAddress, updatedAddresses
		, errorAddress
	};
};

const mapDispatchToProps = {
	updateEditedAddressID,
	addNewAddressRequest,
	updateOrderAddressRequest,
	prePopulateForm,
	hideEditForm,
	verifyAddressRequest,
	updateAddress: updateAddressRequest,
	createAddress: createAddressRequest,
	openModalAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class AccountAddress extends Component {
		state = {
			isEditing: false,
			isAddressEditView: false,
			allAddresses: []
		};
		static propTypes = {
			//check types of props
			heading: PropTypes.string,
			noAddressHeading: PropTypes.string,
			noAddressImage: PropTypes.string,
			verificationStatus: PropTypes.string,
			updateAddress: PropTypes.func,
			createAddress: PropTypes.func,
			hideEditForm: PropTypes.func,
			verifyAddressRequest: PropTypes.func,
			openModalAction: PropTypes.func,
			verifiedAddress: PropTypes.shape({}),
			customer: PropTypes.shape({
				addresses: PropTypes.array,
				email: PropTypes.string,
				dob: PropTypes.string
			}),
			updatedAddresses: PropTypes.object,
			rssResultCode: PropTypes.string,
			isVerified: PropTypes.bool,
			isBlacklisted: PropTypes.bool,
			errorAddress: PropTypes.number
		};

		componentDidUpdate(prevProps) {
			const { updatedAddresses, verificationStatus, verifiedAddress, hideEditForm, customer } = this.props;
			if (this.propsDidChange(prevProps)) {
				if (verificationStatus !== prevProps.verificationStatus && verificationStatus === ADDRESS_CHECK_SUCCESS) {
					const {currentEditedAddressId} = this.state;
					updatedAddresses && currentEditedAddressId && this.submitAddress(updatedAddresses["_"+currentEditedAddressId], verifiedAddress);
				} else if (verificationStatus === ADDRESS_CHECK_ERROR) {
					//TODO
				}
				hideEditForm();
			}

			if (prevProps.customer.addresses != customer.addresses) {
				this.setState({
					allAddresses: []
				}, () => {
					this.setState({
						updatedAddressList: true,
						allAddresses: this.sortAddresses(customer.addresses)
					});
				});
			}
		}

		propsDidChange(prevProps) {
			//check if the necessary props have actually updated
			const { customer, verificationStatus } = this.props;
			return (customer?.addresses?.length !== prevProps.customer?.addresses?.length) || (verificationStatus !== prevProps.verificationStatus);
		}

		addressFormInitialValues = (address) => {
			const { updatedAddresses, customer } = this.props;
			const data = {
				...updatedAddresses,
				["_"+address?.id]: {
					...address,
					default_shipping: address.default_shipping,
					country_name: {
						'label': address.address_label === ADDRESS_TYPE.SHIPPING ? DEFAULT_COUNTRY_OPTIONS[0].label : address.country_name,
						'value': address.address_label === ADDRESS_TYPE.SHIPPING ? DEFAULT_COUNTRY_OPTIONS[0].value : address.country_id
					},
					address_label: address.address_label || ADDRESS_TYPE.BILLING

				}
			};
			if(address?.id === -1 && customer?.landline_phone) {
				data["_"+address?.id].telephone = customer?.landline_phone;
			}
			return data;
		};

		addressType = (address) => {
			let isShipping = false;
			let isBilling = false;
			if (address?.address_label === ADDRESS_TYPE.SHIPPING) {
				isShipping = true;
			} else if (address?.address_label === ADDRESS_TYPE.BILLING) {
				isBilling = true;
			}
			return { isShipping, isBilling };
		}

		saveAddress = (id) => {
			const {verifyAddressRequest, customer: {dob, email, addresses}, updatedAddresses} = this.props;
			const address = updatedAddresses?.["_" + id];
			const {street, postcode, city, firstname, lastname, prefix,country_name} = address;
			const shippingAddresses = addresses?.find(address => address.default_shipping);
			const billingAddresses = addresses?.find(address => address.default_billing);
			const streetAndNumber = splitAddressAndNumber(street?.[0]);
			const billingStreetAndNumber = splitAddressAndNumber(billingAddresses?.street?.[0]);
			const shippingStreetAndNumber = splitAddressAndNumber(shippingAddresses?.street?.[0]);
			this.setState({
				currentEditedAddressId: id
			});
			const { isShipping, isBilling } = this.addressType(address);
			verifyAddressRequest({
				address: {
					street: streetAndNumber.street,
					streetNumber: streetAndNumber.streetNumber,
					zipcode: postcode,
					city: city,
					country: country_name.value
				},
				user: {
					lastName: lastname,
					firstName: firstname,
					birthday: dottedToDashed(dob),
					email: email,
					salutation: `${prefix?.toUpperCase()}`
				},
				billingAddress: {
					lastName: billingAddresses?.lastname || lastname,
					firstName: billingAddresses?.firstname || firstname,
					street: billingStreetAndNumber?.street || streetAndNumber?.street,
					streetNumber: billingStreetAndNumber?.streetNumber || streetAndNumber?.streetNumber,
					zipcode: billingAddresses?.postcode || postcode,
					city: billingAddresses?.city || city,
					country: billingAddresses?.country_id || country_name.value
				},
				shippingAddress: {
					lastName: shippingAddresses?.lastname || lastname,
					firstName: shippingAddresses?.firstname || firstname,
					street: shippingStreetAndNumber?.street || streetAndNumber?.street,
					streetNumber: shippingStreetAndNumber?.streetNumber || streetAndNumber?.streetNumber,
					zipcode: shippingAddresses?.postcode || postcode,
					city: shippingAddresses?.city || city,
					country: shippingAddresses?.country_id || country_name.value
				},
				AddressStatus: {
					isShipping,
					isBilling
				},
				section: 'account'
			});
		};

		deleteAddress = (id) => {
			const { openModalAction } = this.props;
			openModalAction({
				contentID: 'deleteAccountAddressConfirmationModal',
				heading: 'remove_address_modal_heading',
				props: {
					onConfirmAction: deleteAddressRequest({ id: id })
				}
			});
		};

		submitAddress = (updatedAddress, address) => {
			if (!updatedAddress || !address) return;
			const { updateAddress, createAddress, rssResultCode, isVerified, isBlacklisted } = this.props;
			const addressFields = {
				...updatedAddress,
				rss_result_code: rssResultCode,
				country_id: address.country || updatedAddress.country_name.value,
				missing_verification: !isVerified,
				is_blacklisted: isBlacklisted,
				default_shipping: updatedAddress?.address_label === ADDRESS_TYPE.SHIPPING ? !!updatedAddress?.default_shipping : false,
				default_billing: updatedAddress?.address_label === ADDRESS_TYPE.BILLING ? !!updatedAddress?.default_billing : false,
				street: updatedAddress.street.length > 1
					? [
						address.street + ' ' + address.streetNumber,
						updatedAddress.street[1]
					]
					: [address.street + ' ' + address.streetNumber],
				postcode: address.zipcode,
				city: address.city
			};
			if (updatedAddress.id <= 0) {
				createAddress(addressFields)
				this.cancelNewAddress();
			} else {
				updateAddress({ ...addressFields, id: updatedAddress.address_id || updatedAddress.id });
			}
		};

		createNewAddress = () => {
			this.setState({
				newAddress: {
					id: -1
				}
			});
		};

		cancelNewAddress = () => {
			this.setState({
				newAddress: null
			});
		};

		saveNewAddress = () => this.saveAddress(-1);

		compareAddress = (firstAddress, secondAddress) => {
			if (firstAddress.default_shipping && secondAddress.default_shipping) return 0;
			if (firstAddress.default_shipping) return -1;
			if (secondAddress.default_shipping) return 1;
		};

		sortAddresses = (addresses) => {
			let allAddress, shippingAddresses, billingAddresses = [];
			let isEmptyAddressLabel = addresses.find(address => address.address_label == '');
			if ((addresses.length && addresses.length == 1) || isEmptyAddressLabel) {
				allAddress = [...addresses]
			} else {
				shippingAddresses = addresses.filter(address => address.address_label == ADDRESS_TYPE.SHIPPING);
				billingAddresses = addresses.filter(address => address.address_label == ADDRESS_TYPE.BILLING);
		
				let filteredShippingAddress = this.setDefaultAddresses(shippingAddresses, ADDRESS_TYPE.SHIPPING);
				let filteredBillingAddress = this.setDefaultAddresses(billingAddresses, ADDRESS_TYPE.BILLING);
		
				allAddress = [...filteredShippingAddress, ...filteredBillingAddress];
			}
		
			return allAddress;
		};

		setDefaultAddresses = (addresses, type) => {
			let allAddresses = [];
			if (addresses.length > 1) {
				let defaultAddress = addresses.find(address => address[type == ADDRESS_TYPE.SHIPPING ? 'default_shipping' : 'default_billing']);
				allAddresses = addresses.filter(address => !address[type == ADDRESS_TYPE.SHIPPING ? 'default_shipping' : 'default_billing']);
				allAddresses.unshift(defaultAddress);
			} else {
				allAddresses = [...addresses];
			}
			return allAddresses;
		}

		addressEditView = (flag) => {
			this.setState({
				isAddressEditView: flag,
				allAddresses: this.sortAddresses(this.props.customer.addresses)
			});
		}

		render() {
			const { heading, noAddressHeading, noAddressImage, customer: { addresses }, errorAddress } = this.props;
			const { newAddress, isAddressEditView, allAddresses } = this.state;
			const defaultAddresses = addresses?.filter(address => address.default_billing || address.default_shipping);
			const hasOnlyOneAddress = addresses.length === 1;
			return (
				<div className="adc-my-account-address">
					<if condition={isAddressEditView}>
						<Card title={heading}>
							<CardContent>
							<if condition={errorAddress}>
								<div className="mt-1">
									<span className="adc-form-group--error mt-4">
										<I18n text={'magento_error_code_' + errorAddress} />
									</span>
								</div>
							</if>
								<if condition={newAddress}>

									<AddressEdit
										addressId={newAddress.id}
										initialValues={this.addressFormInitialValues(newAddress)}
										informationalMessage={null}
										onSubmit={this.saveNewAddress}
										cancelEdit={this.cancelNewAddress}
										canSave
										canSaveAsDefault
									/>
								</if>
								<else>
									<if condition={addresses.length > 0}>
										<CardAction>
											<Col width={12} className={'text-right'}>
												<Link action={() => this.addressEditView(false)}
													icon={'arrow-left'}
													label={i18nLabels.BACK}
													iconPosition={Icon.POSITION.LEFT}
													hasNoMargin
												/>
											</Col>
										</CardAction>
										<For array={allAddresses}>
											{(address, i) =>
												<AddressSelectOption
													key={i}
													address={address}
													saveAddress={this.saveAddress}
													deleteAddress={(!address.default_shipping && !address.default_billing) && this.deleteAddress}
													initialValues={this.addressFormInitialValues(address)}
													clearNewAddress={this.clearNewAddress}
													canSaveAsDefault
													createNewAddress={this.createNewAddress}
													hasOnlyOneAddress={hasOnlyOneAddress}
												/>
											}
										</For>
										<MessageBanner className={'mt-3 mb-3 custom-warning-msg'} icon={MessageBanner.ICON.ALERT} color={MessageBanner.COLOR.YELLOW} description={i18nLabels.ALERT_EDIT_ADDRESS_MESSAGE} />
										<div className="pb-3">
											<Button
												action={this.createNewAddress}
												type={BUTTON_OPTIONS.TYPE.BUTTON}
												className={'mt-5'}
												ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
												isFullWidth
												hasNoMargin
												label={i18nLabels.ADD_ANOTHER_ADDRESS}
											/>
										</div>
									</if>
									<else>
										<CardEmptyContent
											heading={noAddressHeading}
											subHeading={i18nLabels.NO_ADDRESS_MESSAGE}
											image={noAddressImage}
											message={i18nLabels.SECURE_DATA_MESSAGE}
											icon={'lock-gray'}
											iconClasses={'d-inline-block mr-2 align-middle'}
										/>
										<MessageBanner className={'mt-3 mb-3 custom-warning-msg'} icon={MessageBanner.ICON.ALERT} color={MessageBanner.COLOR.YELLOW} description={i18nLabels.ALERT_EDIT_ADDRESS_MESSAGE} />
										<Button
											action={this.createNewAddress}
											type={BUTTON_OPTIONS.TYPE.BUTTON}
											className={'mt-5'}
											ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
											isFullWidth
											hasNoMargin
											label={i18nLabels.CREATE_NEW_ADDRESS}
										/>
									</else>
								</else>
							</CardContent>
						</Card>
					</if>
					<else>
						<Card title={i18nLabels.DELIVERY_AND_BILLING_ADDRESS_HEADING}>
							<CardContent>
								<For array={defaultAddresses}>
									{(address, i) =>
										<>
											<if condition={defaultAddresses.length > 1}>
												<div className='font-weight-bold mt-3'>
													<I18n text={address.default_billing ? i18nLabels.BILLING_ADDRESS_HEADING : i18nLabels.DELIVERY_ADDRESS_HEADING} />
												</div>
											</if>
											<AddressDisplay
												key={i}
												address={address}
											/>
										</>
									}
								</For>
							</CardContent>
							<CardAction>
								<Link label={i18nLabels.OPEN_ADDRESS_BOOK} icon={'arrow-right'} action={() => this.addressEditView(true)} />
							</CardAction>
						</Card>
					</else>
				</div>
			);
		}
	}
);