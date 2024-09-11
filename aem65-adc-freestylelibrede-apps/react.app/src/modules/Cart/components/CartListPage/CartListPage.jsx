import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import VoucherInfo from './VoucherInfo';
import EmptyCart from '../EmptyCart/EmptyCart';
import Icon from '../../../Generic/components/Icon/Icon';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import CartList from './CartList';
import Button from '../../../Generic/components/Button/Button';
import ProgressBar from '../../../Generic/components/ProgressBar/ProgressBar';
import Container from '../../../Generic/components/Container/Container';
import {setBillingAddressOnCart, setShippingAddressOnCart} from '../../redux/actions/cart.action';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';


const mapStateToProps = state => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {loggedIn: isLoggedIn} = state.authenticationModuleReducer;
	const {cartDetails, loading: isLoading} = state.cartModuleReducer.GetCustomerCartReducer;
	const {cartId} = state.cartModuleReducer.GetCustomerCartIdReducer;
	const {products} = state.productModuleReducer.GetProductsReducer;
	return {isLoggedIn, cartDetails, isLoading, products, cartId, customer};
};
const mapDispatchToProps = {
	setShippingAddressOnCart,
	setBillingAddressOnCart
};
export default connect(mapStateToProps, mapDispatchToProps)(class CartListPage extends Component {
	static propTypes = {
		cartHeading: PropTypes.string,
		checkoutPage: PropTypes.string,
		loginPage: PropTypes.string,
		emptyCartMsg: PropTypes.string,
		emptyCartImg: PropTypes.string,
		emptyCartCtaDest: PropTypes.string,
		emptyCartCtaTarget: PropTypes.string,
		emptyCartCtaStyle: PropTypes.string,
		cartDetails: PropTypes.shape({
			items: PropTypes.array
		}),
		customer: PropTypes.shape({}),
		setShippingAddressOnCart: PropTypes.func,
		setBillingAddressOnCart: PropTypes.func,
		isLoggedIn: PropTypes.bool,
		isLoading: PropTypes.bool
	};
	state = {
		currentStep: 1,
		steps: [
			{title: i18nLabels.CHECKOUT_PROCESS.SHOPPING_CART},
			{title: i18nLabels.CHECKOUT_PROCESS.LOGIN},
			{title: i18nLabels.CHECKOUT_PROCESS.CASHBOX},
		],
		AuthSteps: [
			{title: i18nLabels.CHECKOUT_PROCESS.SHOPPING_CART},
			{title: i18nLabels.CHECKOUT_PROCESS.CASHBOX},
		]
	};
	componentDidUpdate(prevProps) {
		if (this.propsDidChange(prevProps)) {
			const {customer, setShippingAddressOnCart, setBillingAddressOnCart} = this.props;
			const defaultBillingAddress = customer?.addresses?.find(address => address.default_billing);
			const defaultShippingAddress = customer?.addresses?.find(address => address.default_shipping);
			defaultShippingAddress && setShippingAddressOnCart({address: defaultShippingAddress});
			defaultBillingAddress && setBillingAddressOnCart({address: defaultBillingAddress});
		}
	}
	propsDidChange(prevProps) {
		//check if the necessary props have actually updated
		return this.props.customer !== prevProps.customer;
	}
	render() {
		const {
			cartHeading,
			emptyCartMsg,
			emptyCartImg,
			emptyCartCtaDest,
			emptyCartCtaTarget,
			emptyCartCtaStyle,
			isLoggedIn,
			cartDetails,
			checkoutPage,
			isLoading
		} = this.props;
		const {steps, currentStep, AuthSteps} = this.state;
		let {
			loginPage
		} = this.props;

		if (loginPage) loginPage = `${loginPage}?redirectTo=${checkoutPage}?isCheckout=true`;
		const nrOfProducts = cartDetails?.items?.length;

		return <div className="container mt-4">
			<if condition={nrOfProducts && nrOfProducts > 0}>
				<Container className={'mt-4'}>
					<ProgressBar steps={isLoggedIn ? AuthSteps : steps} currentStep={currentStep}/>
				</Container>
			</if>
			<div className="adc-cartlist">
				<div className="text-center px-3 px-md-0">
					<div className="adc-cartlist__heading">
						<h1 className="adc-cartlist__heading--title adc-title adc-title--blue d-flex text-center  bold">
							{cartHeading}
							<div className={'adc-icon-container'}>
								<Icon image={'lock'} size={Icon.SIZE.MEDIUM} style={Icon.STYLE.COVER} className={'ml-md-2'}/>
							</div>
						</h1>
						<if condition={nrOfProducts}>
							<h4 className="adc-cartlist__subheading adc-title adc-title--blue text-center">
								<span className="adc-cartlist__subheading__number">{nrOfProducts}</span>&nbsp;
								<I18n text={nrOfProducts === 0 || nrOfProducts > 1 ? i18nLabels.IN_CART_PLURAL : i18nLabels.IN_CART}/>
							</h4>
						</if>
					</div>
				</div>
				<if condition={isLoading}>
					<div className="text-center">
						<LoadingIndicator/>
					</div>
				</if>
				<else>
					<if condition={nrOfProducts && nrOfProducts > 0}>
						<CartList {...this.props}/>
						<div className="mt-3">
							<div className="row no-gutters mr-t-25 justify-content-center offset-md-7">
								<div className="col-10 col-md-8 ml-md-5">
									<Button
										label={i18nLabels.GO_TO_CHECKOUT}
										id={'cart_list_page_go_to_checkout'}
										ctaStyle={'primary'}
										href={isLoggedIn ? checkoutPage : loginPage}
									/>
									<VoucherInfo
										voucherMsg={'voucher_messaging'}
									/>
								</div>
							</div>
						</div>
					</if>
					<else>
						<EmptyCart
							cartType='cartlist'
							message={emptyCartMsg}
							imgPath={emptyCartImg}
							buttonCTA={'empty_cart_cta'}
							emptyCartCtaStyle={emptyCartCtaStyle}
							emptyCartCtaDestination={emptyCartCtaDest}
							emptyCartCtaTarget={emptyCartCtaTarget}
						/>
					</else>
				</else>
			</div>
		</div>;
	}
});