import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import CartListItem from './CartListItem';
import AppPromotion from './AppPromotion';
import MiniCartPricingOverview from './MiniCartPricingOverview';
import EmptyCart from '../EmptyCart/EmptyCart';
import {getProductsRequest} from '../../../Product/redux/actions/get_products.action';
import {getCustomerCartRequest, hideMiniCartPopup,updateProductRequest} from '../../redux/actions/cart.action';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {For} from '../../../Generic/components/Logic/LogicalComponents';
import {withBreakpoints} from 'react-breakpoints';

const mapStateToProps = state => {
	const {cartDetails, loading: isLoading, showMiniCart: canShowMiniCart} = state.cartModuleReducer.GetCustomerCartReducer;
	const {cartId} = state.cartModuleReducer.GetCustomerCartIdReducer;
	const {products} = state.productModuleReducer.GetProductsReducer;
	return {cartDetails, isLoading, products, cartId, canShowMiniCart};
};

const mapDispatchToProps = {
	getProductsRequest,
	getCustomerCartRequest,
	hideMiniCartPopup,
	updateCartItem: updateProductRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withBreakpoints(class MinicartPopup extends Component {

	static propTypes = {
		cartHeading: PropTypes.string,
		downloadAppImage: PropTypes.string,
		downloadAppText: PropTypes.string,
		learnMoreLinkText: PropTypes.string,
		learnMoreLinkDestination: PropTypes.string,
		openTab: PropTypes.string,
		emptyCartMessage: PropTypes.string,
		shoppingcartPage: PropTypes.string,
		getProductsRequest: PropTypes.func,
		getCustomerCartRequest: PropTypes.func,
		canShowMiniCart: PropTypes.bool,
		hideMiniCartPopup: PropTypes.func,
		cartDetails: PropTypes.shape({
			items: PropTypes.array
		}),
		products: PropTypes.object,
		updateCartItem: PropTypes.func,
		hideShowAppDetails: PropTypes.bool
	};

	componentDidMount() {
		const {getProductsRequest, getCustomerCartRequest} = this.props;
		getProductsRequest();
		getCustomerCartRequest({forceCustomerCart: true});
	}

	componentDidUpdate(prevProps) {
		const {breakpoints, currentBreakpoint, updateCartItem, cartDetails, canShowMiniCart, hideMiniCartPopup} = this.props;
		if(cartDetails !== prevProps.cartDetails) {
			cartDetails?.items.map(item => {
				if(item.qty > item.product.max_sale_qty){
					updateCartItem({id: item.id, qty: item.product.max_sale_qty});
				}
			});
		}
		if (this.propsDidChange(prevProps)) {
			if (canShowMiniCart) {
				window.scroll({
					top: 0,
					left: 0,
					behavior: 'smooth'
				});
				if (breakpoints[currentBreakpoint] === breakpoints.mobile) {
					document.querySelector('.mobile-cart-icon')?.click();
				} else {
					document.querySelector('.nav-cart')?.click();
				}
				setTimeout(() => {
					hideMiniCartPopup();
				}, 3000);
			} else {
				document.querySelector('body').click();
			}
		}
	}

	propsDidChange(prevProps) {
		return this.props.canShowMiniCart !== prevProps.canShowMiniCart;
	}


	getCartItems = () => this.props.cartDetails.items.map(item => ({
		...item,
		qty: item.qty > item.product.max_sale_qty ? item.product.max_sale_qty : item.qty,
		details: this.props.products?.[item.product.sku]
	}));

	isCartEmpty = () => this.props.cartDetails.items.length === 0;
	getCartTotalPrice = () => this.props.cartDetails?.prices?.grand_total?.value || 0;
	getTaxValue = () => this.props.cartDetails?.prices?.applied_taxes?.[0]?.tax_value || '0';

	render() {
		const {
			cartHeading,
			downloadAppImage,
			downloadAppText,
			learnMoreLinkText,
			learnMoreLinkDestination,
			openTab,
			emptyCartMessage,
			shoppingcartPage,
			hideShowAppDetails
		} = this.props;

		const nrOfProducts = this.props.cartDetails.items.length;

		return <div className="cart-header-dropdown header-dropdown">
			<div className="cart-header-dropdown-inner">
				<div className="cart-header-dropdown-top">
					<h5>{cartHeading}<span>{nrOfProducts} <I18n
						text={nrOfProducts === 0 || nrOfProducts > 1 ? i18nLabels.PRODUCTS : i18nLabels.PRODUCT}/></span>
					</h5>
					<div className="cart-header-icon-cross">
						<Icon image={'close-icon'}/>
					</div>
				</div>
				<if condition={!this.isCartEmpty()}>
					<div className="cart-header-dropdown-btns">
						<div className="mb-2">
							<Button
								href={shoppingcartPage}
								id={'minicart_view_shopping_cart'}
								ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
								isFullWidth
								hasNoMargin
								label={i18nLabels.VIEW_CART}
							/>
						</div>
					</div>
					<For array={this.getCartItems()}>
						{cartItem =>
							<CartListItem
								key={cartItem.id}
								id={cartItem.id}
								quantity={cartItem.qty?.isNaN ? parseInt(cartItem.qty) : cartItem.qty}
								name={cartItem.product?.cs_product_short_name || cartItem.product?.name}
								sku={cartItem.product?.sku}
								uom={cartItem.product?.uom}
								isSubscription={cartItem.product?.is_subscription}
								price={cartItem.item_price?.value || 0}
								image={cartItem.details?.productImage?.[0]}
								pdpLink={cartItem.details?.productUrl}
								deliveryDate={cartItem.delivery_date}
								bundle={cartItem?.bundle_options?.[0]}
							/>}
					</For>
					<MiniCartPricingOverview
						cartPrice={this.getCartTotalPrice()} taxValue={this.getTaxValue()}
					/>
				</if>
				<if condition={this.isCartEmpty()}>
					<EmptyCart
						cartType={EmptyCart.TYPE.MINICART}
						message={emptyCartMessage}
					/>
				</if>
				<if condition={!hideShowAppDetails && downloadAppImage}>
					<AppPromotion
						downloadAppImage={downloadAppImage}
						downloadAppText={downloadAppText}
						learnMoreLinkText={learnMoreLinkText}
						learnMoreLinkDestination={learnMoreLinkDestination}
						openTab={openTab}
					/>
				</if>
			</div>
		</div>;
	}
}));