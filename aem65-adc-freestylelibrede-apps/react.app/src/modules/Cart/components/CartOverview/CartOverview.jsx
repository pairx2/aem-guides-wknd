import React from 'react';
import {connect} from 'react-redux';
import CartItemsDisplay from './CartItemsDisplay';
import CartOverviewPricing from './CartOverviewPricing';
import CartOverviewRx from './CartOverviewRx';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
	const {cartDetails} = state.cartModuleReducer.GetCustomerCartReducer;
	const {cartId} = state.cartModuleReducer.GetCustomerCartIdReducer;
	return {cartDetails, cartId};
};

const CartOverview = ({overviewHeading, editLink, isReimbursement, informationMessage, informationMessageHeading, cartDetails,
	cartDetails: {prices, selected_shipping_method: shippingMethod}, productHeading, isRedirectToShoppingCart}) => {
	
	const renderCheckRedirect = () => {
		if (cartDetails?.id != null) {
			if (isRedirectToShoppingCart && cartDetails?.items?.length === 0 && editLink != null) {
				window.location = editLink;
		 	}
		}
	}
	return (
		<Card title={overviewHeading}
				  editLink={isReimbursement ? null : (editLink || '#')}>
			<CardContent>
				<div onLoad={() => renderCheckRedirect()} className="adc-cartoverview">
					<if condition={isReimbursement}>
						<CartOverviewRx informationMessage={informationMessage} informationMessageHeading={informationMessageHeading}/>
					</if>
					<else>
						<div className="adc-cartoverview__cart-item">
							<CartItemsDisplay productHeading={productHeading}/>
						</div>
						<div className="adc-cartoverview__item adc-cart-summary py-4 mt-2">
							<CartOverviewPricing
								total={prices?.grand_total?.value || 0}
								subTolInTax={prices?.subtotal_including_tax?.value || 0}
								shippingType={shippingMethod?.carrier_code}
								shippingPrice={shippingMethod?.amount?.value || 0}
								includedTax={prices?.applied_taxes?.[0]?.amount?.value || 0}
								couponCode={cartDetails?.applied_coupon?.code}
								couponValue={prices?.discount?.value || 0}
								cartId={cartDetails?.id || ''}
							/>
						</div>
					</else>
				</div>
			</CardContent>
		</Card>
	);
};
CartOverview.propTypes = {
	cartDetails: PropTypes.shape({
		id: PropTypes.string,
		selected_shipping_method: PropTypes.object,
		applied_coupon: PropTypes.object,
		prices: PropTypes.shape({
			subtotal_including_tax: PropTypes.object,
			grand_total: PropTypes.object,
			applied_taxes: PropTypes.array,
			discount: PropTypes.object,
		}),
		discount: PropTypes.shape({
			applied_taxes: PropTypes.object
		}),

	}),
	overviewHeading: PropTypes.string,
	editLink: PropTypes.string,
	isReimbursement: PropTypes.bool,
	informationMessage: PropTypes.string,
	informationMessageHeading: PropTypes.string,
	productHeading: PropTypes.string,
	isRedirectToShoppingCart: PropTypes.bool
};
export default connect(mapStateToProps, null)(CartOverview);