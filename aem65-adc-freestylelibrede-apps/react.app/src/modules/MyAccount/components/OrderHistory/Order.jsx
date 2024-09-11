import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeliveryList from './DeliveryList';
import I18n from '../../../Translation/components/I18n';
import PaymentDetails from './PaymentDetails';
import DeliveryDetails from './DeliveryDetails';
import translate, {i18nLabels} from '../../../../utils/translationUtils';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';
import {getOrderReturnRmaDetailsRequest, openReturnFormRequest} from '../../redux/actions/orders.action';
import {downloadInvoiceRequest} from '../../redux/actions/orders.action';
import {getFormattedDate} from '../../../../utils/dateUtils';
import {ORDER_TYPES, ORDER_TYPES_STATUS, PAYMENT_TYPES} from '../../../../utils/enums';
import {getOrderDescriptionLabel, getOrderImagesPath} from '../../../../utils/orderUtils';
import { For } from '../../../Generic/components/Logic/LogicalComponents';

const mapStateToProps = state => {
	const {customerReturnInfo, rmaLabels, loading: isOrderLoading} = state.myAccountModuleReducer.OrderReturnReducer || {};
	const {commercialReturnGracePeriod} = state.myAccountModuleReducer.GetOrdersReducer;
	const { ghostOrders } = state.myAccountModuleReducer.GetGhostOrdersReducer;
	return {customerReturnInfo, rmaLabels, isOrderLoading, commercialReturnGracePeriod, ghostOrders};
};

const mapDispatchToProps = {
	getInvoice: downloadInvoiceRequest,
	getOrderReturnRmaDetailsRequest,
	openReturnFormRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class Order extends Component {
	static propTypes = {
		order: PropTypes.object,
		products: PropTypes.object,
		dictionary: PropTypes.object,
		getInvoice: PropTypes.func,
		openReturnFormRequest: PropTypes.func,
		getOrderReturnRmaDetailsRequest:PropTypes.func,
		customerReturnInfo: PropTypes.object,
		rmaLabels: PropTypes.object,
		isOrderLoading: PropTypes.bool,
		commercialReturnGracePeriod: PropTypes.number,
		productData: PropTypes.array,
		ghostOrders: PropTypes.array
	};

	state = {
		showDetails: false
	};

	getReturnReceipt = (returnId, downloadDocAsImg) => {
		const {order: {orderId, deliveryDetails}, customerReturnInfo} = this.props;
		const shipment = {
			return_id: customerReturnInfo[orderId]?.return_id || returnId,
			order_number: orderId,
			deliveryOrderId: deliveryDetails?.[0]?.deliveryOrderId
		};
		this.props.getOrderReturnRmaDetailsRequest(shipment, downloadDocAsImg);
	}

	getOrderDescription = () => {
		const {order, dictionary} = this.props;
		return getOrderDescriptionLabel(order, dictionary, false);
	};


	getProductImage = () => {
		const productSkuObj = this.getProductSKUs();
		const { products } = this.props;
		const ImageArray = [];
		for( let item of productSkuObj){
			ImageArray.push(products[item]?.productImage?.[0]);
		}
		return ImageArray;
	};

	getProductSKUs = () => {
		const {order: {productData}} = this.props;
		const SKUs = [];
		for(let item of productData){
			if (!SKUs.includes(item?.productSKU)) {
				SKUs.push(item?.productSKU);
			}
		}
		return SKUs;
	}

	toggleDetails = () => {
		this.setState({
			showDetails: !this.state.showDetails
		});
	};

	returnArticle = (productData, delivery, orderDetails,orderType) => {
		const {openReturnFormRequest} = this.props;
		switch(orderType) {
			case ORDER_TYPES.CPS:
				orderType = ORDER_TYPES_STATUS.CPS;
				break;
			case ORDER_TYPES.RX:
				orderType = ORDER_TYPES_STATUS.RX;
				break;
			case ORDER_TYPES.CPO:
				orderType = ORDER_TYPES_STATUS.CP;
		}
		openReturnFormRequest({
			productData,
			delivery,
			orderDetails,
			orderType
		});
	};

	render() {
		const {showDetails} = this.state;
		const {
			order: {
				orderTitle, orderType, orderSubtype, orderDate, orderId, priceBreakdown, deliveryDetails , deliveryAddress, paymentDetails, serviceData, productData
				, rxmc}, getInvoice, customerReturnInfo, rmaLabels, isOrderLoading, commercialReturnGracePeriod, ghostOrders
		} = this.props;
		return (
			<div className="row mt-4">
				<div className="col-12 col-md-4 col-lg-3 text-center text-lg-left row justify-content-center">
					
				<if condition={this.getProductSKUs().length > 0}>
							<For array={this.getProductSKUs()}>
								{(sku, i) =>
									<img className="adc-order-hist__image img-fluid" src={getOrderImagesPath(sku)}
										alt={sku}/>
									}
							</For>
						</if>
				</div>
				<div className="col-12 col-md-8 col-lg-5 col-xl-5">
					<p className="adc-order-hist__desc-date m-0 lspacing-point3"><I18n text={i18nLabels.ORDER_DATE_LABEL}/> {getFormattedDate(orderDate)}</p>
					<p className="adc-order-hist__desc-prod-id mb-1">
						<if condition={orderType === ORDER_TYPES.RX}>
							<I18n text={i18nLabels.RECEIPT_NUMBER_LABEL}/> {rxmc}
						</if>
						<else>
							<I18n text={i18nLabels.ORDER_ID_LABEL}/> {orderId}
						</else>
					</p>
					<h5 className="mb-4"><I18n text={orderSubtype || orderTitle}/></h5>
					<p className="m-0" dangerouslySetInnerHTML={{__html: this.getOrderDescription()}}/>
				</div>
				<div className="col-12 col-md-4 col-lg-3"/>
				<div className="col-12 col-md-8 col-lg-9 offset-md-3">
					<if condition={deliveryDetails && deliveryDetails.length > 0}>
						<div className="row mb-2">
							<div className="col-12 col-lg-11 pr-lg-0 pr">
								<div className="adc-account-order-hist__detail mt-2 text-right">
									<Link
										action={this.toggleDetails}
										icon={showDetails ? 'arrow-up-blue' : 'arrow-down-blue'}
										label={i18nLabels.DETAILS}
									/>
								</div>
							</div>
						</div>
					</if>
					{showDetails &&
					<>
						<DeliveryList
							getFormattedDate={getFormattedDate}
							orderId={orderId}
							orderDate={orderDate}
							deliveries={deliveryDetails}
							returnArticle={(delivery, orderDetails) => this.returnArticle(productData, delivery, orderDetails,orderType)}
							getInvoice={getInvoice}
							returnId={customerReturnInfo?.[orderId]?.return_id}
							getReturnReceipt={this.getReturnReceipt}
							rmaLabels={rmaLabels}
							isOrderLoading={isOrderLoading}
							productData={productData}
							commercialReturnGracePeriod={commercialReturnGracePeriod}
							zipCode={deliveryAddress?.zipCode}
						/>
						<DeliveryDetails
							deliveryAddress={deliveryDetails && deliveryDetails[0]?.deliveryAddress || this.props.order?.deliveryAddress}
							totalPrice={priceBreakdown?.totalPrice || 0}
							priceBreakdown={priceBreakdown}
							orderType={orderType}
							deliveries={deliveryDetails}/>
						<if condition={paymentDetails?.paymentMethodType !== PAYMENT_TYPES.FREE && paymentDetails?.paymentMethodType !== null}>
							<PaymentDetails
								paymentDetails={paymentDetails}
								orderType={orderType}
								serviceData={serviceData}
								productData={productData}
								ghostOrders={ghostOrders}
							/>
						</if>
					</>
					}
				</div>
				<div className="col-12">
					<hr className="adc-border-hr-light m-0"/>
				</div>
			</div>
		);
	}
});