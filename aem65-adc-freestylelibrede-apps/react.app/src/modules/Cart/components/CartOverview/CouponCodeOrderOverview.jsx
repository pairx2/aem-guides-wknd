import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {removeCouponFromCartRequest} from '../../redux/actions/cart.action';
import {i18nLabels} from '../../../../utils/translationUtils';
import {formatPrice} from '../../../../utils/pricingUtils';
import Link from '../../../Generic/components/Link/Link';
import Icon from '../../../Generic/components/Icon/Icon';

const mapDispatchToProps = {
	removeCouponFromCart: removeCouponFromCartRequest
};

const CouponCodeOrderOverview = ({couponCode, couponValue, removeCouponFromCart}) => {
	return (
		<div className="adc-coupon-code__para mt-5">
			<div className="row">
				<div className="col-9 d-flex">
					<Link action={() => removeCouponFromCart()}
						className='c-pointer'
						hasNoLinkClass
						iconPosition={Icon.POSITION.LEFT}
						icon={'trash_blue'}
					/>
					<span className='mt-1'>
						<I18n text={i18nLabels.COUPON_CODE_IN_CART_OVERVIEW} params={[couponCode]}/>
					</span>
				</div>
				<div className="col-3 text-right p-0">
					<span
						className="adc-coupon-code__para--highlight px-2 py-1 mr-2">{`${formatPrice(couponValue)}`}</span>
				</div>
			</div>
		</div>
	);
};

CouponCodeOrderOverview.propTypes = {
	couponCode: PropTypes.string,
	couponValue: PropTypes.number,
	removeCouponFromCart: PropTypes.func,
};
export default connect(null, mapDispatchToProps)(CouponCodeOrderOverview);