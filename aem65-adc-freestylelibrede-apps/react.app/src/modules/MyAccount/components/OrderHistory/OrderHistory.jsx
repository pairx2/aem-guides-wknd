import React, {Component} from 'react';
import {connect} from 'react-redux';
import OrderList from './OrderList';
import OrderPagination from './OrderPagination';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import Row from '../../../Generic/components/Container/Row';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import {getOrdersRequest} from '../../redux/actions/get_orders.action';
import {fetchDictionaryRequest} from '../../../Translation/redux/actions/translation.actions';
import {getProductsRequest} from '../../../Product/redux/actions/get_products.action';
import PropTypes from 'prop-types';
import ReturnArticle from './Return/ReturnArticle';
import {closeReturnFormRequest} from '../../redux/actions/orders.action';
import {openModalAction} from '../../../Modal/redux/actions';
import {i18nLabels} from '../../../../utils/translationUtils';


const mapStateToProps = state => {
	const {ordersByPageNumber:orders, totalPages, loadingOrders:isLoadingOrders} = state.myAccountModuleReducer.GetOrdersReducer;
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const {products} = state.productModuleReducer.GetProductsReducer;
	const {isOpen: isReturnFlow, delivery, orderDetails, productData, isInvoiceErrorModalOpen,returnOrderType} = state.myAccountModuleReducer.OrdersReducer;
	return {orders, totalPages, isLoadingOrders, dictionary, products, isReturnFlow, delivery, orderDetails, productData, isInvoiceErrorModalOpen,returnOrderType};
};

const mapDispatchToProps = {
	getOrdersRequest,
	fetchDictionaryRequest,
	getProductsRequest,
	closeReturnFormRequest,
	openModalAction
};

export default connect(mapStateToProps, mapDispatchToProps)(class OrderHistory extends Component {

	static propTypes = {
		fetchDictionaryRequest: PropTypes.func,
		getProductsRequest: PropTypes.func,
		getOrdersRequest: PropTypes.func,
		closeReturnFormRequest: PropTypes.func,
		openModalAction: PropTypes.func,
		checkoutPage: PropTypes.string,
		returnText: PropTypes.string,
		heading: PropTypes.string,
		dictionary: PropTypes.object,
		orders: PropTypes.object,
		products: PropTypes.object,
		isReturnFlow: PropTypes.bool,
		isLoadingOrders: PropTypes.bool,
		isInvoiceErrorModalOpen: PropTypes.bool,
		productData: PropTypes.object,
		delivery: PropTypes.object,
		orderDetails: PropTypes.object,
		responsiveness: PropTypes.object,
		nrOfResults: PropTypes.number,
		orderHistoryType: PropTypes.string,
		returnOrderType: PropTypes.string,
		orcEnable: PropTypes.bool,
		countryCode: PropTypes.string,
		languageCode: PropTypes.string
	};

	state = {
		currentPagination: 1,
		paginationScrollHeight: 0
	};

	componentDidMount() {
		const {nrOfResults,orderHistoryType,getOrdersRequest, fetchDictionaryRequest, getProductsRequest} = this.props;
		getOrdersRequest({limit:nrOfResults,orderHistoryType:orderHistoryType});
		fetchDictionaryRequest();
		getProductsRequest();
		this.ref = React.createRef();
	}

	componentDidUpdate(prevProps) {
		const {isReturnFlow, isInvoiceErrorModalOpen, openModalAction} = this.props;
		if (prevProps.isReturnFlow !== isReturnFlow) {
			this.ref.current.scrollIntoView();
		}
		if (!prevProps.isInvoiceErrorModalOpen && isInvoiceErrorModalOpen) {
			openModalAction({
				heading: i18nLabels.DOWNLOAD_INVOICE_ERROR_HEADING,
				contentID: 'downloadInvoiceErrorModal'
			});
		}
	}

	setPagination = (page) => {
		const {nrOfResults,orderHistoryType, getOrdersRequest} = this.props;
		const element = document.getElementById(`orderHistory-${orderHistoryType}`);
		window.scroll(0, window.pageYOffset - element?.getBoundingClientRect()?.height);
		this.setState({
			currentPagination: page
		}, () => {
			getOrdersRequest({limit:nrOfResults, pageNumber:page, orderHistoryType:orderHistoryType});
		});
	};

	isLargeEnough = () => {
		const {responsiveness} = this.props;
		return !responsiveness || !responsiveness.default || responsiveness.default >= 10;
	};

	render() {
		const {heading, returnText, checkoutPage, nrOfResults, isLoadingOrders, returnOrderType, dictionary, products, orders, isReturnFlow, delivery, orderDetails, productData, closeReturnFormRequest,orderHistoryType,orcEnable, countryCode, languageCode} = this.props;
		const {currentPagination} = this.state;
		return (
			<div ref={this.ref} id = {`orderHistory-${orderHistoryType}`}>
				<if condition={isReturnFlow && orderHistoryType === returnOrderType}>
					<ReturnArticle close={closeReturnFormRequest} returnText={returnText} productData={productData}
								   delivery={delivery} orderHistoryType={orderHistoryType} orderDetails={orderDetails} products={products} isLargeEnough={this.isLargeEnough()} orcEnable={orcEnable} countryCode={countryCode} languageCode={languageCode} />
				</if>
				<else>
					<Card title={heading}>
						<CardContent>
							<if condition={isLoadingOrders}>
								<Row className={'justify-content-center'}>
									<LoadingIndicator/>
								</Row>
							</if>
							<else>
								<OrderList
									dictionary={dictionary}
									orders={orders?.[orderHistoryType]?.orderList}
									products={products}
									checkoutPage={checkoutPage}
								/>
							</else>
							<if condition={orders?.[orderHistoryType]?.orderList?.length >0}>
								<OrderPagination
									setPagination={this.setPagination}
									currentPagination={currentPagination}
									itemsCountPerPage={nrOfResults}
									totalItemsCount={orders?.[orderHistoryType]?.header?.totalResults || 0}
								/>
							</if>
						</CardContent>
					</Card>
				</else>
			</div>
		);
	}
});