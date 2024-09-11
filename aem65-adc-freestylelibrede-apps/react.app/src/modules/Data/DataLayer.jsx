import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCustomerRequest} from '../MyAccount/redux/actions/customer.action';
import {fetchDictionaryRequest} from '../Translation/redux/actions/translation.actions';
import {getProductsRequest} from '../Product/redux/actions/get_products.action';
import {getCurrentOrdersRequest, getOrdersRequest} from '../MyAccount/redux/actions/get_orders.action';
import {getProductPriceRequest} from '../Product/redux/actions/get_product_price.action';

const mapStateToProps = state => {
	const {customer: customerData} = state.myAccountModuleReducer.GetCustomerReducer;
	const {dictionary: dictionaryData} = state.translationModuleReducer.translationReducer;
	const {products: productsData} = state.productModuleReducer.GetProductsReducer;
	const {orders: ordersData, currentOrders: currentOrdersData} = state.myAccountModuleReducer.GetOrdersReducer;
	const {productPrices: productPricesData} = state.productModuleReducer.getProductPricesReducer;
	return {customerData, dictionaryData, productsData, ordersData, currentOrdersData, productPricesData};
};

const mapDispatchToProps = {
	getCustomerRequest,
	fetchDictionaryRequest,
	getProductsRequest,
	getOrdersRequest,
	getCurrentOrdersRequest,
	getProductPriceRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class DataLayer extends Component {
	static propTypes = {
		customer: PropTypes.any,
		dictionary: PropTypes.any,
		products: PropTypes.any,
		orders: PropTypes.any,
		currentOrders: PropTypes.any,
		productPrices: PropTypes.any,
		productSku: PropTypes.string,
		customerData: PropTypes.object,
		dictionaryData: PropTypes.object,
		productsData: PropTypes.object,
		ordersData: PropTypes.object,
		currentOrdersData: PropTypes.object,
		productPricesData: PropTypes.object,
		getCustomerRequest: PropTypes.func,
		fetchDictionaryRequest: PropTypes.func,
		getProductsRequest: PropTypes.func,
		getOrdersRequest: PropTypes.func,
		getCurrentOrdersRequest: PropTypes.func,
		getProductPriceRequest: PropTypes.func
	};

	componentDidMount() {
		const {customer, dictionary, products, orders, currentOrders, productPrices, productSku,
			customerData, dictionaryData, productsData, ordersData, currentOrdersData, productPricesData} = this.props;
		customer && !customerData && this.props.getCustomerRequest();
		dictionary && !dictionaryData && this.props.fetchDictionaryRequest();
		orders && !ordersData && this.props.getOrdersRequest();
		currentOrders && !currentOrdersData && this.props.getCurrentOrdersRequest();
		products && !productsData && this.props.getProductsRequest();
		productPrices && productSku && !productPricesData && this.props.getProductPriceRequest(productSku);
	}

	render() {
		const {children, customerData, dictionaryData, productsData, ordersData, currentOrdersData, productPricesData} = this.props;
		return (
			React.Children.map(children, child =>
				React.cloneElement(child, {
					customer: customerData,
					dictionary: dictionaryData,
					products: productsData,
					orders: ordersData,
					currentOrders: currentOrdersData,
					productPrices: productPricesData
				})
			)
		);
	}
});