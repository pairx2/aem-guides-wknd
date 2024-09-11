import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import {ORDER_TYPES} from '../../../../utils/enums';
import {getOrderImagesPath} from '../../../../utils/orderUtils';

const getProductDetails = (order, products) => {
	return products && products[getProductSKU(order)];
};

const getProductSKU = (order) => {
	const {orderType, currentProducts, productData, serviceData} = order;
	return orderType === ORDER_TYPES.CPO ? (currentProducts || productData)?.[0].productSKU : serviceData?.[0]?.serviceSKU;
};

const SubscriptionDetails = ({order}) => {
	return (
		<div className={'order-item'}>
			<div className="row align-items-center">
				<div className={'col-4'}>
					<div className="text-center">
						<img className="adc-order-hist__image img-fluid"
						src={getOrderImagesPath(getProductSKU(order))}
						alt={order.orderTitle}/>
					</div>
				</div>
				<div className={'col-8'}>
					<div className="order-item__content">
						<h5><I18n text={order.orderSubtype || order.orderTitle}/></h5>
					</div>
				</div>
				<p className={'col-12 mt-4'}><I18n text={i18nLabels.PLUS_SERVICE_END_INFORMATION}/></p>
			</div>
		</div>

	);
};
SubscriptionDetails.propTypes = {
	order: PropTypes.shape({
		orderId: PropTypes.string,
		orderTitle: PropTypes.string,
		orderType: PropTypes.string,
		productData: PropTypes.array,
		orderDate: PropTypes.number,
		orderSubtype: PropTypes.string
	}),
	products: PropTypes.object
};

SubscriptionDetails.defaultProps = {};

export default SubscriptionDetails;