import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddressCheckoutCard from './AddressCheckoutCard';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import {i18nLabels} from '../../../../utils/translationUtils';
import {setBillingAddressOnCart, setShippingAddressOnCart} from '../../../Cart/redux/actions/cart.action';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';
import PropTypes from 'prop-types';


const mapStateToProps = state => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const cartReducer = isRxCheckoutPageType() ? state.cartModuleReducer.GhostCartReducer : state.cartModuleReducer.GetCustomerCartReducer;
	const {cartDetails} = cartReducer;
	return {customer, cartDetails};
};

const mapDispatchToProps = {
	setBillingAddressOnCart,
	setShippingAddressOnCart
};

export default connect(mapStateToProps, mapDispatchToProps)(class AddressCheckout extends Component {
	static propTypes = {
		setShippingAddressOnCart: PropTypes.func,
		setBillingAddressOnCart: PropTypes.func,
		informationalMessage: PropTypes.string,
		cartDetails: PropTypes.shape({
			id: PropTypes.string,
			shipping_address: PropTypes.object,
			billing_address: PropTypes.object,
		}),
		customer: PropTypes.shape({
			addresses: PropTypes.array
		}),
		enableNewPaymentFlow: PropTypes.bool
	};
	state = {
		addresses: [],
		newShippingAddress: null,
		newBillingAddress: null,
		//child state needs to be managed here, because one child can edit the state of a sibling
		shipping: {
			selecting: false,
			editing: false
		},
		billing: {
			selecting: false,
			editing: false
		}
	};
	componentDidUpdate(prevProps) {
		const {cartDetails, customer, setBillingAddressOnCart, setShippingAddressOnCart} = this.props;
		if (this.propsDidChange(prevProps)) {
			if (cartDetails.id && cartDetails.id !== prevProps.cartDetails.id) {
				const defaultBillingAddress = customer?.addresses?.find(address => address.default_billing);
				const defaultShippingAddress = customer?.addresses?.find(address => address.default_shipping);
				!cartDetails.shipping_address?.country_id && defaultShippingAddress && setShippingAddressOnCart({fetchCart: true, address: defaultShippingAddress});
				!cartDetails.billing_address?.country_id && defaultBillingAddress && setBillingAddressOnCart({fetchCart: true, address: defaultBillingAddress});
				if(cartDetails.billing_address?.address_id !== prevProps.cartDetails.billing_address?.address_id) {
					this.setState({
						newBillingAddress: null
					});
				}
			}
			this.setState({addresses: customer?.addresses});
		}
	}

	propsDidChange(prevProps) {
		const {customer, cartDetails} = this.props;
		return customer !== prevProps.customer || cartDetails !== prevProps.cartDetails;
	}

	setBillingModes = ({selecting, editing}) => {
		this.setState({
			billing: {
				...this.state,
				selecting: selecting,
				editing: editing
			}
		});
	};

	setShippingModes = ({selecting, editing}) => {
		this.setState({
			shipping: {
				...this.state,
				selecting: selecting,
				editing: editing
			}
		});
	};


	selectedShippingAddress = () => {
		const {cartDetails} = this.props;
		return cartDetails.shipping_address;
	};

	selectedBillingAddress = () => {
		const {cartDetails} = this.props;
		return cartDetails.billing_address;
	};

	createNewBillingAddress = () => {
		this.setState({
			newBillingAddress: {
				street: [],
				address_id: -1,
				id: -1,
			}
		});
	};

	createNewShippingAddress = () => {
		this.setState({
			newShippingAddress: {
				street: [],
				address_id: -2,
				id: -2,
			}
		});
	};

	clearNewBillingAddress = () => {
		this.setState({
			newBillingAddress: null
		});
	};

	clearNewShippingAddress = () => {
		this.setState({
			newShippingAddress: null
		});
	};

	shippingAddressEqualsBillingAddress = () => {
		const {cartDetails: {shipping_address, billing_address}} = this.props;
		if(shipping_address?.address_id === 0 && billing_address?.address_id === 0) {
			return shipping_address?.id === billing_address?.id;
		}
		return shipping_address?.address_id === billing_address?.address_id;
	};

	render() {
		const {informationalMessage, customer: {addresses: customerAddresses,is_lastorder_carrier_return: isLastOrderCarrierReturn}, enableNewPaymentFlow} = this.props;
		const {newShippingAddress, newBillingAddress, shipping} = this.state;
		return (
			<>
				<if condition={this.selectedShippingAddress() && this.selectedShippingAddress().country_id !== null}>
					<Card isLastOrderCarrierReturn={isLastOrderCarrierReturn}
						title={this.shippingAddressEqualsBillingAddress() && !shipping.selecting ? i18nLabels.DELIVERY_AND_BILLING_ADDRESS_HEADING : i18nLabels.DELIVERY_ADDRESS_HEADING}>
						<CardContent>
							<AddressCheckoutCard
								isShipping
								informationalMessage={informationalMessage}
								address={this.selectedShippingAddress()}
								selectableAddresses={customerAddresses}
								newAddress={newShippingAddress}
								createNewShippingAddress={this.createNewShippingAddress}
								createNewBillingAddress={this.createNewBillingAddress}
								clearNewShippingAddress={this.clearNewShippingAddress}
								clearNewBillingAddress={this.clearNewBillingAddress}
								isShippingEqualToBilling={this.shippingAddressEqualsBillingAddress()}
								setModes={this.setShippingModes}
								setBillingModes={this.setBillingModes}
								isEditing={this.state.shipping.editing}
								isSelecting={this.state.shipping.selecting}
								enableNewPaymentFlow={enableNewPaymentFlow}
							/>
						</CardContent>
					</Card>
				</if>
				<if condition={(this.selectedBillingAddress() && this.selectedBillingAddress().country_id !== null && !this.shippingAddressEqualsBillingAddress()) || newBillingAddress || this.state.billing.selecting}>
					<Card title={i18nLabels.BILLING_ADDRESS_HEADING}>
						<CardContent>
							<AddressCheckoutCard
								isBilling
								informationalMessage={informationalMessage}
								address={this.selectedBillingAddress()}
								selectableAddresses={customerAddresses}
								newAddress={newBillingAddress}
								createNewBillingAddress={this.createNewBillingAddress}
								clearNewBillingAddress={this.clearNewBillingAddress}
								setModes={this.setBillingModes}
								isEditing={this.state.billing.editing}
								isSelecting={this.state.billing.selecting}
								enableNewPaymentFlow={enableNewPaymentFlow}
							/>
						</CardContent>
					</Card>
				</if>
			</>
		);
	}
});