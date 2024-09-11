import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartListHeader from './CartListHeader';
import CartRow from './CartRow';
import CartPricingOverview from './CartPricingOverview';
import {getProductsRequest} from '../../../Product/redux/actions/get_products.action';
import {optional, optionalArray} from '../../../../utils/optional';
import PropTypes from 'prop-types';


const mapStateToProps = state => {
	const {cartDetails, loading} = state.cartModuleReducer.GetCustomerCartReducer;
	const {cartId} = state.cartModuleReducer.GetCustomerCartIdReducer;
	const {products} = state.productModuleReducer.GetProductsReducer;
	return {cartId, cartDetails, loading, products};
};

const mapDispatchToProps = {
	getProductsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class CartList extends Component {
	static propTypes = {
		getProductsRequest: PropTypes.func,
		products: PropTypes.object,
		cartDetails: PropTypes.shape({
			items: PropTypes.array
		}),
		qtyColHeading: PropTypes.string,
		priceColHeading: PropTypes.string,
		productColHeading: PropTypes.string
	};
	state = {
		currentProductSku: ''
	};

	componentDidMount() {
		this.props.getProductsRequest();
	}
	getCartItems = () => this.props.cartDetails?.items?.map(item => ({
		...item,
		qty: item.qty > item.product.max_sale_qty ? item.product.max_sale_qty : item.qty,
		details: this.props.products[item.product.sku]
	}));

	cancelDeleteCartItem = () => {
		this.setState({
			currentProductSku: ''
		});
	};

	productRemoveWarningHandler = (sku) => {
		this.setState({
			currentProductSku: sku
		});
	};

	getCartDetails = () => optional(this.props.cartDetails);
	getCartPrices = () => optional(this.getCartDetails()?.prices);
	getSelectedShippingMethod = () => optional(this.getCartDetails()?.selected_shipping_method);
	getAppliedTaxes = () => optional(optionalArray(this.getCartPrices()?.applied_taxes)[0]);

	getCartshippingPrice = () => this.getSelectedShippingMethod()?.amount?.value || 0;
	getCartshippingLabel = () => this.getSelectedShippingMethod()?.carrier_title || '';
	getCartEstimatedVATPrice = () => this.getAppliedTaxes()?.amount?.value || 0;

	getCartTotalPrice = () => this.getCartPrices()?.grand_total?.value || 0;

	render() {
		const {
			qtyColHeading,
			priceColHeading,
			productColHeading,
			cartDetails
		} = this.props;
		const {currentProductSku} = this.state;
		const taxValue = cartDetails?.prices?.applied_taxes?.[0]?.tax_value || '0';
		const AllCartRows = this.getCartItems()?.map(cartItem =>
			<CartRow
				key={cartItem.id}
				id={cartItem.id}
				quantity={cartItem.qty?.isNaN ? parseInt(cartItem.qty) : cartItem.qty}
				name={cartItem.product?.name}
				sku={cartItem.product?.sku}
				uom={cartItem.product?.uom}
				isSubscription={cartItem.product?.is_subscription}
				price={cartItem.item_price?.value || 0}
				image={cartItem.details?.productImage?.[0]}
				pdpLink={cartItem.details?.productUrl}
				qtyOrderMsg={cartItem.details?.QuantyOrderMsg}
				min_sale_qty={cartItem.product?.min_sale_qty || 0}
				max_sale_qty={cartItem.product?.max_sale_qty || 99}
				productRemoveWarningHandler={this.productRemoveWarningHandler}
				removeMessage={'remove_from_cart_warning'}
				currentProductSku={currentProductSku}
				cancelDeleteCartItem={this.cancelDeleteCartItem}
				priceColHeading={priceColHeading}
				deliveryDate={cartItem.delivery_date}
				bundle={cartItem.bundle_options[0]}
				qtyColHeading={qtyColHeading}
				taxValue={taxValue}
			/>);
		return (
			<div className="row justify-content-center bg-white align-items-center adc-cartlist__margin">
				<div className="col-10 px-2 px-md-0">
					<CartListHeader
						productColHeading={productColHeading}
						qtyColHeading={qtyColHeading}
						priceColHeading={priceColHeading}
						taxValue={taxValue}
					/>
					<div>
						{AllCartRows}
					</div>
					<CartPricingOverview
						shippingPrice={this.getCartshippingPrice()}
						totalWithVatPrice={this.getCartTotalPrice()}
						EstimatedVATPrice={this.getCartEstimatedVATPrice()}
						shippingLabel={this.getCartshippingLabel()}
						isShippingAddressSet={cartDetails?.shipping_address?.city !== null}
					/>
				</div>
			</div>
		);
	}
});