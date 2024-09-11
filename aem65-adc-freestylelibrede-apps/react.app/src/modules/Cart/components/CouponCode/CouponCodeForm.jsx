import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropsTypes from 'prop-types';
import {addCouponToCartRequest, resetError} from '../../redux/actions/cart.action';
import CouponForm from './CouponForm';
import {openModalAction} from '../../../Modal/redux/actions/index';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import {getUrlParameter} from '../../../../utils/getParams';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';

const mapStateToProps = state => {
	const cartReducer = isRxCheckoutPageType() ? state.cartModuleReducer.GhostCartReducer : state.cartModuleReducer.GetCustomerCartReducer;
	const {cartDetails, loading, isCouponCodeSuccess, error, isCouponRemoved, isCouponCodeError} = cartReducer;
	return {cartDetails, loading, isCouponCodeSuccess, error, isCouponRemoved, isCouponCodeError};
};
const mapDispatchToProps = {
	addCouponToCartRequest,
	openModalAction,
	resetError
};

export default connect(mapStateToProps, mapDispatchToProps)(class CouponCodeForm extends Component {
	static propTypes = {
		componentHeading: PropsTypes.string,
		confirmCtaStyling: PropsTypes.string,
		redeemCtaStyling: PropsTypes.string,
		confirmationHeading: PropsTypes.string,
		error: PropsTypes.string,
		openModalAction: PropsTypes.func,
		addCouponToCartRequest: PropsTypes.func,
		resetError: PropsTypes.func,
		isCouponCodeSuccess: PropsTypes.bool,
		isCouponRemoved: PropsTypes.bool,
		isCouponCodeError: PropsTypes.bool,
		cartDetails: PropsTypes.shape({})
	};
	state = {
		isCouponInCart: false,
		isError: false,
		isEmptyField: false,
	};
	componentDidUpdate(prevProps) {
		const {cartDetails, isCouponCodeSuccess, openModalAction, confirmationHeading, confirmCtaStyling, isCouponRemoved, error, isCouponCodeError} = this.props;
		if(prevProps.cartDetails?.id === undefined && cartDetails?.id) {
			const couponCode = getUrlParameter('vc');
			if(couponCode) this.applyCouponCode(couponCode);
		}
		if (this.propsDidChange(prevProps)) {
			//put code that needs to execute when the props of the component have updated
			if (isCouponCodeSuccess) {
				const updateProps = {
					couponCode: cartDetails?.applied_coupon?.code || '',
					confirmCtaStyling: confirmCtaStyling,
					couponValue: cartDetails?.prices?.discount?.value || 0,
					couponCurrency: cartDetails?.prices?.discount?.currency || 'EUR'
				};
				openModalAction({
					heading: confirmationHeading,
					contentID: 'CouponCodeModal',
					props: updateProps
				});
			}
			this.couponCodeErrorOrRemoved(isCouponRemoved, error, isCouponCodeError);
		}
	}

	propsDidChange(prevProps) {
		const {isCouponCodeSuccess, error, isCouponRemoved} = this.props;
		//check if the necessary props have actually updated
		return isCouponCodeSuccess !== prevProps.isCouponCodeSuccess || error != prevProps.error || isCouponRemoved != prevProps.isCouponRemoved;
	}

	couponCodeErrorOrRemoved(isCouponRemoved, error, isCouponCodeError) {
		if (isCouponRemoved && !error) {
			this.onChangeHandler();
		}
		if (error && isCouponCodeError) {
			this.setErrorHandler(true);
		}
	}

	/*@Coupoun allready applied */
	setAppliedCouponHandler = (flag) => {
		this.setState({
			isCouponInCart: flag
		});
	};
	/*@Coupoun allready applied */
	setErrorHandler = (flag) => {
		this.setState({
			isError: flag
		});
	};
	/*@Onchange handler for redux-form*/
	onChangeHandler = () => {
		const {error, resetError} = this.props;
		this.setState({
			isCouponInCart: false,
			isError: false,
			isEmptyField: false
		});
		if (error) {
			resetError();
		}
	};
	/*@Set Empty field error*/
	setEmptyFieldError = (flag) => {
		this.setState({
			isEmptyField: flag
		});
	};
	/*@Coupon Submit Handler*/
	submit = (values) => {
		this.applyCouponCode(values.CouponCodeField);
	};

	applyCouponCode = (coupon) => {
		const {cartDetails, addCouponToCartRequest} = this.props;
		const cartObject = {
			cartId: cartDetails?.id,
			CouponCode: coupon
		};
		const appliedCouponChk = cartDetails?.applied_coupon?.code;
		if (!coupon) {
			this.setEmptyFieldError(true);
		} else if (appliedCouponChk) {
			this.setAppliedCouponHandler(true);
		}
		if (coupon && !appliedCouponChk) {
			addCouponToCartRequest(cartObject);
		}
	};

	render() {
		const {componentHeading, redeemCtaStyling} = this.props;
		const {isCouponInCart, isError, isEmptyField} = this.state;

		return (
			<Card title={componentHeading}>
				<CardContent>
					<div className="adc-coupon-code bg-white">
						<CouponForm
							isError={isError}
							redeemCtaStyling={redeemCtaStyling}
							onSubmit={this.submit}
							isCouponInCart={isCouponInCart}
							onChangeHandler={this.onChangeHandler}
							isEmptyField={isEmptyField}
						/>
					</div>
				</CardContent>
			</Card>
		);
	}
});
