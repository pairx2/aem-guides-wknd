import React, {Component} from 'react';
import {connect} from 'react-redux';
import CurrentOrder from './CurrentOrder';
import NoCurrentOrder from './NoCurrentOrder';
import {getCurrentOrdersRequest} from '../../redux/actions/get_orders.action';
import PropTypes from 'prop-types';
import {getProductsRequest} from '../../../Product/redux/actions/get_products.action';
import {fetchDictionaryRequest} from '../../../Translation/redux/actions/translation.actions';
import {DELIVERY_STATUSES} from '../../../../utils/enums';
import AddressEditor from './AddressEditor';
import ReturnArticle from '../OrderHistory/Return/ReturnArticle';
import {closeCurrentOrderReturnFormRequest} from '../../redux/actions/orders.action';

const mapStateToProps = state => {
	const {orders, currentOrders} = state.myAccountModuleReducer.GetOrdersReducer;
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {products} = state.productModuleReducer.GetProductsReducer;
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const {isCurrentOrderReturnFlow: isReturnFlow, delivery, orderDetails, productData} = state.myAccountModuleReducer.OrdersReducer;
	return {orders, currentOrders, customer, products, dictionary, isReturnFlow, delivery, orderDetails, productData};
};

const mapDispatchToProps = {
	getCurrentOrders: getCurrentOrdersRequest,
	getProductsRequest,
	fetchDictionaryRequest,
	closeCurrentOrderReturnFormRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class CurrentOrderOverview extends Component {
	static propTypes = {
		getCurrentOrders: PropTypes.func,
		getProductsRequest: PropTypes.func,
		fetchDictionaryRequest: PropTypes.func,
		products: PropTypes.object,
		orders: PropTypes.object,
		currentOrders: PropTypes.object,
		customer: PropTypes.shape({
			id: PropTypes.number
		}),
		currentOrderHeading: PropTypes.string,
		emptyHeading: PropTypes.string,
		emptyInfoText: PropTypes.string,
		orderRecipeStyle: PropTypes.string,
		orderRecipeLink: PropTypes.string,
		orderShopStyle: PropTypes.string,
		dictionary: PropTypes.object,
		checkoutPage: PropTypes.string,
		orderShopLink: PropTypes.string,
		isReturnFlow: PropTypes.bool,
		productData: PropTypes.object,
		delivery: PropTypes.object,
		orderDetails: PropTypes.object,
		returnText: PropTypes.string,
		responsiveness: PropTypes.object,
		isAccountOverviewTab: PropTypes.bool,
		accountPagePath: PropTypes.string,
		accountPageTab: PropTypes.string,
		confirmationPath: PropTypes.string,
		checkboxes: PropTypes.array,
		closeCurrentOrderReturnFormRequest: PropTypes.func,
		orderType: PropTypes.string,
		tabName: PropTypes.string,
		hideNoOrderSection: PropTypes.bool
	};

	state = {
		isEditing: false,
		currentOrder: {},
		addressType: ''
	};

	componentDidMount() {
		this.props.getProductsRequest();
		this.props.fetchDictionaryRequest();
		this.ref = React.createRef();
		window.addEventListener('hashchange', this.tabChanged, false);
	}

	componentDidUpdate(prevProps) {
		const {orders, customer, getCurrentOrders,orderType} = this.props;
		if (orders[orderType]?.orderList?.length && customer.id
			&& (prevProps.customer.id !== customer.id || prevProps.orders[orderType]?.orderList?.length !== orders[orderType]?.orderList?.length)) {
			getCurrentOrders(orderType);
		}
	}

	tabChanged = () => {
		this.setState({
			isEditing: false
		});
	};

	toggleEditing = (type, isEditing, currentOrder) => {
		this.setState({
			addressType: type,
			isEditing,
			currentOrder
		});
		this.ref.current.scrollIntoView();
		sessionStorage.removeItem('newAddressFromOrderUpdate');
		sessionStorage.removeItem('isAddressAndPaymentUpdate');
		sessionStorage.removeItem('customerEmail');
		localStorage.removeItem('showPayonWidget');
	};
	isLargeEnough = () => {
		const {responsiveness} = this.props;
		return !responsiveness || !responsiveness.default || responsiveness.default >= 10;
	};

	render() {
		const {currentOrderHeading, emptyHeading, emptyInfoText, orderRecipeStyle, orderRecipeLink, orderShopStyle, orderShopLink, products, dictionary, currentOrders, checkoutPage,
			isReturnFlow, delivery, orderDetails, productData, returnText, tabName, isAccountOverviewTab, accountPagePath, accountPageTab, confirmationPath, checkboxes, 
			closeCurrentOrderReturnFormRequest, orderType, hideNoOrderSection} = this.props;
		const {isEditing, currentOrder, addressType} = this.state;
		const myOrderUrl = `${accountPagePath}#${accountPageTab}`;
		const currentOrderByType =  currentOrders?.[orderType];
		const currentOrderDeliveryDetails = currentOrderByType?.deliveryDetails?.[0];
		return (
			<div ref={this.ref}>
				<if condition={isReturnFlow}>
					<ReturnArticle close={closeCurrentOrderReturnFormRequest} returnText={returnText} productData={productData}
								   delivery={delivery} orderHistoryType={orderType} orderDetails={orderDetails} products={products} isLargeEnough={this.isLargeEnough()}/>
				</if>
				<elseif condition={isEditing}>
					<AddressEditor order={currentOrder}
						confirmationPath={confirmationPath}
						checkboxes={checkboxes}
						addressType={addressType} close={() => this.toggleEditing(false)}/>
				</elseif>
				<elseif condition={currentOrderByType}>
					<CurrentOrder
						editAddress={(type) => this.toggleEditing(type, true, currentOrderByType)}
						order={{
							...currentOrderByType,
							currentDeliveryDetails: currentOrderDeliveryDetails,
							currentAddress: currentOrderDeliveryDetails?.deliveryAddress || currentOrderByType?.deliveryAddress,
							currentProducts: currentOrderDeliveryDetails?.products,
							currentDeliveryDate: currentOrderDeliveryDetails?.estimatedDeliveryDate,
							currentTrackingNr: currentOrderDeliveryDetails?.deliveryTrackingNr,
							orderStatus: currentOrderDeliveryDetails?.deliveryStatus || DELIVERY_STATUSES.CREATED
						}}
						currentOrderHeading={currentOrderHeading}
						products={products}
						tabName={tabName}
						dictionary={dictionary}
						checkoutPage={checkoutPage}
						isAccountOverviewTab={isAccountOverviewTab}
						myOrderUrl={myOrderUrl}
						confirmationPath={confirmationPath}
						checkboxes={checkboxes}
					/>
				</elseif>
				<elseif condition={!hideNoOrderSection}>
					<NoCurrentOrder
						currentOrderHeading={currentOrderHeading}
						emptyHeading={emptyHeading}
						emptyInfoText={emptyInfoText}
						orderRecipeStyle={orderRecipeStyle}
						orderRecipeLink={orderRecipeLink}
						orderShopStyle={orderShopStyle}
						orderShopLink={orderShopLink}
						isAccountOverviewTab={isAccountOverviewTab}
					/>
				</elseif>
			</div>);
	}
});