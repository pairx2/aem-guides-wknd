import React from 'react';
import Delivery from './Delivery';
import PropTypes from 'prop-types';

const DeliveryList = ({productData, orderId, deliveries, getFormattedDate, returnArticle, getReturnReceipt, orderDate, getInvoice, returnId, rmaLabels, isOrderLoading, commercialReturnGracePeriod, zipCode}) => {
	return deliveries && deliveries.map((delivery, index) =>
		<Delivery
			key={delivery.deliveryId}
			getFormattedDate={getFormattedDate}
			index={index}
			orderId={orderId}
			orderDate={orderDate}
			delivery={delivery}
			returnArticle={returnArticle}
			getReturnReceipt={getReturnReceipt}
			getInvoice={getInvoice}
			returnId={returnId}
			rmaLabels={rmaLabels}
			isOrderLoading={isOrderLoading}
			productData={productData}
			commercialReturnGracePeriod={commercialReturnGracePeriod}
			zipCode={zipCode}
		/>
	);
};

DeliveryList.propTypes = {
	orderId: PropTypes.string,
	deliveries: PropTypes.array,
	getFormattedDate: PropTypes.func,
	returnArticle: PropTypes.func,
	orderDate: PropTypes.number,
	getInvoice: PropTypes.func,
	getReturnReceipt:PropTypes.func,
	returnId: PropTypes.string,
	rmaLabels: PropTypes.object,
	isOrderLoading: PropTypes.bool,
	productData: PropTypes.array,
	commercialReturnGracePeriod: PropTypes.number
};

export default DeliveryList;