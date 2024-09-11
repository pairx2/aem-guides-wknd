import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../Generic/components/Container/Row';
import Icon from '../../../Generic/components/Icon/Icon';
import I18n from '../../../Translation/components/I18n';
import {formatPrice} from '../../../../utils/pricingUtils';

const ShippingOption = ({carrier_title, carrier_code, value, shippingImg}) => {
	return (
		<Row className={'align-items-center'}>
			<div className='col-4 pl-4'>
				<Icon size={Icon.SIZE.LARGER} image={shippingImg}
				/>
			</div>
			<div className='col-4 border-right-grey'>
				<p className='mb-0'>{carrier_title}</p>
				<p><I18n text={'shipping_time_' + carrier_code}/></p>
			</div>
			<div className='col-4 pr-4 font-weight-bold'>
				{formatPrice(value)}
			</div>
		</Row>
	);
};

ShippingOption.propTypes = {
	carrier_title: PropTypes.string,
	carrier_code: PropTypes.string,
	value: PropTypes.number,
	shippingImg: PropTypes.string,
};

export default ShippingOption;