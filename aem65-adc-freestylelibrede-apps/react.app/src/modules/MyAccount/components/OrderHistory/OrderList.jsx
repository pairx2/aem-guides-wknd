import React from 'react';
import Order from './Order';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';

const OrderList = ({orders, dictionary, products, checkoutPage}) => {
	return orders ?
		(orders.map(order =>
			<Order key={`order_${order.index}`} dictionary={dictionary} products={products} order={order} checkoutPage={checkoutPage}/>
		))
		:
		<h4><I18n text={i18nLabels.NO_CURRENT_ORDER}/></h4>;

};

OrderList.propTypes = {
	orders: PropTypes.array,
	dictionary: PropTypes.object,
	products: PropTypes.object,
	checkoutPage: PropTypes.string
};

export default OrderList;