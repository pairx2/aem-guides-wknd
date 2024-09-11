import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AddressDisplay from '../AddressCheckout/AddressDisplay';
import {i18nLabels} from '../../../../utils/translationUtils';
import AddressEdit from '../AddressEdit/AddressEdit';
import Link from '../../../Generic/components/Link/Link';
import {isCheckoutPageType, isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';

const mapStateToProps = state => {
	const {isLoading} = state.addressModuleReducer.AddressReducer;
	const {cartDetails} = state.cartModuleReducer.GetCustomerCartReducer;
	return {isLoading, cartDetails};
};


export default connect(mapStateToProps, null)(class AddressSelectOption extends Component {
	static propTypes = {
		address: PropTypes.shape({
			id: PropTypes.number,
			addresstype: PropTypes.string,
			prefix: PropTypes.string,
			firstname: PropTypes.string,
			lastname: PropTypes.string,
			street: PropTypes.array,
			postcode: PropTypes.string,
			city: PropTypes.string,
			isNew: PropTypes.bool,
			default_shipping: PropTypes.bool,
			default_billing: PropTypes.bool,

		}),
		setAddress: PropTypes.func,
		saveAddress: PropTypes.func,
		deleteAddress: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.bool
		]),
		isLoading: PropTypes.bool,
		canSaveAsDefault: PropTypes.bool,
		isShipping: PropTypes.bool,
		initialValues: PropTypes.object,
		hasOnlyOneAddress: PropTypes.bool,
		key: PropTypes.string,
		cartDetails: PropTypes.object
	};
	static defaultProps = {
		address: {}
	};
	state = {
		editing: this.props.address.isNew
	};

	componentDidUpdate(prevProps) {
		if (prevProps.isLoading === true && prevProps.isLoading !== this.props.isLoading) {
			this.cancelEditMode();
		}
	}

	setEditMode = () => {
		this.setState({editing: true});
	};

	cancelEditMode = () => {
		this.setState({editing: false});
	};

	setAddress = () => {
		const {address, setAddress} = this.props;
		setAddress(address, 'useThisAddressChosen');
	};

	saveAddress = () => {
		const {address: {id}, saveAddress} = this.props;
		saveAddress(id);
	};

	deleteAddress = () => {
		const {address: {id}, deleteAddress} = this.props;
		deleteAddress(id);
	};

	defaultAddresses = (address) => {
		const { cartDetails } = this.props;
		let defaultShippingAddress, defaultBillingAddress;
		if(isRxCheckoutPageType() || isCheckoutPageType()){
			if(cartDetails?.shipping_address?.address_id === address?.id && cartDetails?.shipping_address?.address_id === cartDetails?.billing_address?.address_id){
				defaultBillingAddress= true;
				defaultShippingAddress= true;
			} else if(cartDetails?.shipping_address?.address_id === address?.id){
				defaultShippingAddress= true;
			} else if(cartDetails?.billing_address?.address_id === address?.id){
				defaultBillingAddress= true;
			}
		}
		return { defaultShippingAddress, defaultBillingAddress };
	}

	render() {
		const {key, address, initialValues, isLoading, canSaveAsDefault, deleteAddress, setAddress, saveAddress, isShipping, hasOnlyOneAddress} = this.props;
		const {editing} = this.state;
		let defaultLabel;
		if(address?.default_shipping && !address?.default_billing) {
			defaultLabel = i18nLabels.DELIVERY_ADDRESS_HEADING;
		} else if (address?.default_billing && !address?.default_shipping){
			defaultLabel = i18nLabels.BILLING_ADDRESS_HEADING;
		}

		let {defaultShippingAddress, defaultBillingAddress} = this.defaultAddresses(address);
		
		return <>
			<if condition={editing}>
				<AddressEdit
					isShipping={isShipping}
					addressId={address.id}
					initialValues={initialValues}
					informationalMessage={null}
					onSubmit={this.saveAddress}
					cancelEdit={this.cancelEditMode}
					canSave={!isLoading}
					isDisabled={(!address.default_shipping && address.default_billing || (address.default_shipping && !address.default_billing))}
					canSaveAsDefault={canSaveAsDefault}
					hasOnlyOneAddress={hasOnlyOneAddress}
				/>
			</if>
			<else>
				<AddressDisplay key={key} address={address} defaultLabel={defaultLabel}/>
				<div key={key} className={`adc-card__action mt-3 py-2 text-right ${(address.default_shipping && address.default_billing) ? '' : 'adc-title--border-bottom'}`}>
					<if condition={!(address.default_shipping && address.default_billing) && saveAddress}>
						<Link
							action={this.setEditMode}
							icon={'edit-icon'}
							label={i18nLabels.EDIT}
						/>
					</if>
					<if condition={deleteAddress}>
						<Link
							action={this.deleteAddress}
							icon={'trash_blue'}
							label={i18nLabels.DELETE}
						/>
					</if>
					<elseif condition={setAddress && (isShipping ? !defaultShippingAddress : !defaultBillingAddress)}>
						<Link
							action={this.setAddress}
							icon={'tick-blue'}
							label={i18nLabels.USE_THIS_ADDRESS}
						/>
					</elseif>

				</div>
			</else>
		</>;
	}
});