import React from 'react';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import {getFormattedDate} from '../../../../utils/dateUtils';
import {getStatus} from '../../../../utils/orderUtils';
import Icon from '../../../Generic/components/Icon/Icon';

const DeliveryStatus = ({deliveryDetails, text, orderServiceStatus, order}) => {
	const getDeliveryDate = () => {
		let updatedDeliveryDate = '';
		if (order?.productData?.[0]?.productDateOfNextShipment) {
			updatedDeliveryDate = getFormattedDate(order?.productData?.[0]?.productDateOfNextShipment);
		} else {
			updatedDeliveryDate = getFormattedDate(order?.productData?.[0]?.productOriginalDateFrom);
		}
		return updatedDeliveryDate;
	};
	return (
		<div className='delivery-item'>
			<h6 className={'mb-4'}>
				<I18n text={text} suffix={':'}/>
			</h6>
			<div className='d-flex justify-content-between align-items-center adc-title--border-bottom mb-3'>
				<p className="m-0">{getDeliveryDate() || deliveryDetails?.estimatedDeliveryDate}</p>
				<div className="delivery-item--status ml-4">
					<p className="m-0 d-flex align-items-center">
						<I18n text={orderServiceStatus}/>
						<Icon image={getStatus(deliveryDetails?.deliveryStatus)} className={'ml-2'}/>
					</p>
				</div>
			</div>
		</div>
	);
};

DeliveryStatus.propTypes = {
	deliveryDetails: PropTypes.object,
	text: PropTypes.string,
	orderServiceStatus: PropTypes.string,
	order: PropTypes.object
};

export default DeliveryStatus;
