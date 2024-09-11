import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent} from '../../../../Generic/components/Card/Card';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../../utils/translationUtils';
import ReturnInstructions from './ReturnInstructions';
import ReturnForm from './ReturnForm';
import {getOrderReturnRequest, getOrderReturnRmaDetailsRequest} from '../../../redux/actions/orders.action';

const mapStateToProps = state => {
	const {loading: isLoading, returnId, error, customerReturnInfo, orderId} = state.myAccountModuleReducer.OrderReturnReducer;
	const {orders} = state.myAccountModuleReducer.GetOrdersReducer;
	return {isLoading, returnId, error, customerReturnInfo, orderId, orders};
};

const mapDispatchToProps = {
	getOrderReturnRequest,
	getOrderReturnRmaDetailsRequest
};
export default connect(mapStateToProps, mapDispatchToProps)(class ReturnArticle extends Component {
	static propTypes = {
		close: PropTypes.func,
		delivery: PropTypes.object,
		orderDetails: PropTypes.shape({
			orderId: PropTypes.string,
			orderDate: PropTypes.number
		}),
		products: PropTypes.object,
		productData: PropTypes.array,
		returnText: PropTypes.string,
		getOrderReturnRequest: PropTypes.func,
		getOrderReturnRmaDetailsRequest: PropTypes.func,
		returnId: PropTypes.string,
		isLargeEnough: PropTypes.bool,
		isLoading: PropTypes.bool,
		error: PropTypes.string,
		orders: PropTypes.object,
		orderHistoryType: PropTypes.string,
		orcEnable: PropTypes.bool,
		countryCode: PropTypes.string,
		languageCode: PropTypes.string
	};

	state = {
		showInstructions: false,
		showOrcWidget: false
	};

	getReturnReceipt = () => {
		const shipment = {
			return_id: this.props.returnId,
			order_number: this.props.orderDetails?.orderId
		};
		this.props.getOrderReturnRmaDetailsRequest(shipment);
	}

	submitReturnForm = (values) => {
		const orderId = this.props.orderDetails?.orderId;
		const returnDetails = this.props.delivery;
		const orcEnable = this.props.orcEnable;
		
		if ( orcEnable && values?.returnReason === "OrcR01") {
			this.setState({showOrcWidget: true});
		} else {
			const shipments = [];
			Object.keys(values).forEach((shipment) => {
				shipment !== 'returnReason' && shipments.push({'id': shipment, 'quantity': parseInt(values[shipment])});
			});
			const returnOrderPayload = {
				'requestReason': values.returnReason,
				'deliveryNumber': returnDetails.deliveryNumber || '',
				'shipments': shipments,
			};
			this.props.getOrderReturnRequest(returnOrderPayload, orderId);
			this.setState({showInstructions: true});
		}
	};

	goBackFromArvto= () =>{
		this.setState({showOrcWidget: false});
	}

	backToOrderHistory = () => {
		this.props.close();
		this.setState({showInstructions: false});
	};

	render() {
		const {delivery, orderDetails, products, productData, returnText, isLargeEnough, isLoading, returnId, error, orders,orderHistoryType, orcEnable, countryCode, languageCode} = this.props;
		const {showInstructions, showOrcWidget} = this.state;
		const returnDetails = orders[orderHistoryType]?.orderList?.find(order => order.orderId === orderDetails.orderId)?.returnDetails;
		const deliveryAddressDetails = orders[orderHistoryType]?.orderList?.find(order => order.orderId === orderDetails.orderId)?.deliveryAddress;
		
		return (
			<Card title={showInstructions ? i18nLabels.FINISH_RETURN : i18nLabels.RETURN_ORDER}>
				<CardContent>
					<if condition={showInstructions}>
						<ReturnInstructions
							close={this.backToOrderHistory}
							isLoading={isLoading}
							returnId={returnId}
							error={error}
							getReturnReceipt={this.getReturnReceipt}
						/>
					</if>
					<else>
						<ReturnForm
							close={this.backToOrderHistory}
							delivery={delivery}
							orderDetails={orderDetails}
							products={products}
							productData={productData}
							submitForm={this.submitForm}
							returnText={returnText}
							onSubmit={this.submitReturnForm}
							isLargeEnough={isLargeEnough}
							returnDetails={returnDetails}
							orcEnable={orcEnable}
							showOrcWidget={showOrcWidget}
							deliveryAddressDetails={deliveryAddressDetails}
							countryCode={countryCode}
							languageCode={languageCode}
							goBackFromArvto={this.goBackFromArvto}
						/>	
					</else>
				</CardContent>
			</Card>
		);
	}
});