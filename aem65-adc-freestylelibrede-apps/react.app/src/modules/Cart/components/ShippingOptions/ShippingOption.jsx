import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import {formatPrice} from '../../../../utils/pricingUtils';

const ShippingOption = ({carrier_title, carrier_code, method_code, value, shippingImg, isActive, isLoading, updateShippingOption}) => {
	return (
		<div className={'adc-tabs position-relative mb-3'}
			 onClick={() => updateShippingOption({carrierCode: carrier_code, methodCode: method_code})}>
			<if condition={isLoading}>
				<LoadingIndicator size={'small'} />
			</if>
			<label className={`adc-tabs__label d-block text-center m-0 ${isActive && 'active'}`}>
				{carrier_title}<span className="mx-3 adc-tabs__divider">{'|'}</span>
				<span>{formatPrice(value)}</span>
				<span className="ml-3 ml-lg-2 adc-tabs__logo-img d-inline-block align-middle">
					<Icon
						image={shippingImg}
					/>
				</span>
			</label>
			<Icon
				image={'formcheck-success-white adc-tabs__blue-circle position-absolute'}
				size={Icon.SIZE.MEDIUM}
				style={Icon.STYLE.BLUE}
			/>
		</div>
	);
};

ShippingOption.propTypes = {
	carrier_title: PropTypes.string,
	carrier_code: PropTypes.string,
	method_code: PropTypes.string,
	value: PropTypes.number,
	shippingImg: PropTypes.string,
	isActive: PropTypes.bool,
	updateShippingOption: PropTypes.func,
	isLoading: PropTypes.bool
};
export default ShippingOption;