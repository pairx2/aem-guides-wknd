import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartOverviewSubHeading from './CartOverviewSubHeading';
import CartOverviewRow from './CartOverviewRow';
import {getProductsRequest} from '../../../Product/redux/actions/get_products.action';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
	const {cartDetails, loading} = state.cartModuleReducer.GetCustomerCartReducer;
	const {products} = state.productModuleReducer.GetProductsReducer;
	return {cartDetails, loading, products};
};

const mapDispatchToProps = {
	getProductsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class CartItemsDisplay extends Component {
	static propTypes = {
		getProductsRequest: PropTypes.func,
		cartDetails: PropTypes.shape({
			items: PropTypes.array
		}),
		products: PropTypes.object,
		productHeading: PropTypes.string
	};

	componentDidMount() {
		this.props.getProductsRequest();
	}

	getCartItems = () => this.props.cartDetails?.items?.map(item => ({
		...item,
		qty: item.qty > item.product.max_sale_qty ? item.product.max_sale_qty : item.qty,
		details: this.props.products?.[item.product.sku]
	}));

	render() {
		const {productHeading} = this.props;
		const allCartOverviewRow = this.getCartItems().map((cartItem, i) =>
			<CartOverviewRow
				key={cartItem.id}
				quantity={cartItem.qty?.isNaN ? parseInt(cartItem.qty) : cartItem.qty}
				name={cartItem.product?.name || ''}
				sku={cartItem.product?.sku || ''}
				price={cartItem.price?.value || 0}
				itemTotalPrice={cartItem.item_price?.value || 0}
				image={cartItem.details?.productImage?.[0]}
				pdpLink={cartItem.details?.productUrl}
			/>
		);
		return (
			<>
				<CartOverviewSubHeading productHeading={productHeading}/>
				{allCartOverviewRow}
			</>
		);
	}
});