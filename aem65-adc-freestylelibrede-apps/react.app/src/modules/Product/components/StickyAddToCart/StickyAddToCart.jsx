import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductQuantity from "../../../Cart/components/ProductQuantity/ProductQuantity";
import { addProductRequest } from "../../../Cart/redux/actions/cart.action";
import ProductPrice from "../ProductPrice/ProductPrice";
import RadioButtonField from "../../../Form/components/GenericFields/RadioButtonField";
import { i18nLabels } from "../../../../utils/translationUtils";
import I18n from "../../../Translation/components/I18n";
import Button, {
	BUTTON_OPTIONS,
} from "../../../Generic/components/Button/Button";
import { empty } from "../../../../utils/default";
import Col from "../../../Generic/components/Container/Col";
import Row from "../../../Generic/components/Container/Row";
import {
	GENERIC_ERROR_CODES,
	PRODUCT_ATTRIBUTES,
} from "../../../../utils/enums";

const isNull = (v) => v === null;

const mapStateToProps = (state) => {
	const { productPrices } = state.productModuleReducer.getProductPricesReducer;
	const { loggedIn: isLoggedIn } = state.authenticationModuleReducer;
	const { error, errorCodes } = state.cartModuleReducer.GetCustomerCartReducer;
	return { productPrices, isLoggedIn, error, errorCodes };
};

const mapDispatchToProps = {
	addProductToCart: addProductRequest
};

export const PRODUCT_TYPE = {
	SENSOR: "sensor",
	READER: "reader",
	SUBSCRIPTION: "subscription"
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class StickyAddToCart extends Component {
		static propTypes = {
			addProductToCart: PropTypes.func,
			addToCart: PropTypes.string,
			subsOrder: PropTypes.string,
			prescriptionOrderPageUrl: PropTypes.string,
			loginPageUrl: PropTypes.string,
			productType: PropTypes.oneOf([...Object.values(PRODUCT_TYPE)]),
			isLoggedIn: PropTypes.bool,
			productPageModel: PropTypes.object,
			productPrices: PropTypes.object,
			error: PropTypes.string,
			errorCodes: PropTypes.array
		};
		static defaultProps = {
			productType: PRODUCT_TYPE.SENSOR
		};
		state = {
			quantity: 1,
			selectedProduct: null,
			addedFromSticky: false,
			hasUndefinedUom: true,
			undeterminedUomError: undefined
		};

		getSku = () => this.getSelectedProductData().sku;

		getProductPage = () => this.props.productPageModel || empty.object;

		getProductPrice = () => parseFloat(this.getSelectedProductData().price * this.state.quantity || 0);

		incrementQuantity = () => {
			this.setState({ quantity: this.state.quantity + 1 });
		};

		decrementQuantity = () => {
			if (this.state.quantity > 1) {
				this.setState({ quantity: this.state.quantity - 1 });
			}
		};

		prescriptionHandler = () => {
			const { isLoggedIn, prescriptionOrderPageUrl, loginPageUrl } = this.props;
			window.location = isLoggedIn ? prescriptionOrderPageUrl : loginPageUrl;
		};

		isReader = () => this.getSelectedProductData()?.product_type?.toLowerCase() === PRODUCT_TYPE.READER;

		isSubscription = () => this.getSelectedProductData().is_subscription;

		getSelectedProductData = () => {
			if (isNull(this.state.selectedProduct)) {
				const products = this.getSkusOrLabels(PRODUCT_ATTRIBUTES.SKU);
				if (!isNull(products)) {
					this.setState({
						selectedProduct: products[0],
					});
				}
			}
			return this.props.productPrices[this.state.selectedProduct] || {};
		};

		getSkusOrLabels = (field) => {
			let productList = this.getProductPage().productList;
			if (field === PRODUCT_ATTRIBUTES.SKU) {
				return productList?.map((item) => item.sku) || [];
			}
			return productList?.map((item) => item.label) || [];
		};

		setSelectedValue = (selectedValue) => {
			this.setState({
				selectedProduct: selectedValue,
				quantity: 1,
				hasUndefinedUom: false,
				undeterminedUomError: undefined
			});
		};

		getReaderOptions = () => {
			let options = [];
			this.props.productPageModel.productList.forEach((val, index) => {
				let uom =
					this.props.productPrices[
						this.props.productPageModel.productList[index].sku
						]?.uom;
				options.push({
					value: this.props.productPageModel.productList[index].sku,
					label: "measurement_".concat(uom).concat("_short")
				});
			});
			return options;
		};

		addProductToCart = () => {
			this.setState({ addedFromSticky: true });
			const { addProductToCart } = this.props;
			const { quantity, hasUndefinedUom } = this.state;
			if (this.isReader() && hasUndefinedUom) {
				this.setState({
					undeterminedUomError: i18nLabels.UNDETERMINED_UOM_ERROR,
				});
			} else {
				addProductToCart({
					sku: this.getSku(),
					qty: quantity,
				});
			}
		};

		render() {
			const { addToCart, subsOrder, error, errorCodes } = this.props;
			const {
				quantity,
				addedFromSticky,
				hasUndefinedUom,
				undeterminedUomError,
			} = this.state;
			const { min_sale_qty, max_sale_qty, name, tax_value } = this.getSelectedProductData();
			const IsErrorCodeGeneric = GENERIC_ERROR_CODES.indexOf(errorCodes?.[0]) !== -1;
			return (
				<div
					className={
						this.isReader()
							? "adc-sticky-addtocart py-2 adc-reader"
							: "adc-sticky-addtocart py-2 adc-sensor"
					}
					id="stickyAddToCart"
				>
					<div className="container">
						<Row>
							<Col>
								<Row>
									<Col
										xl={this.isReader() ? 8 : 7}
										className={"d-flex align-items-center pr-lg-0"}
									>
										<if condition={this.isReader()}>
											<div className="adc-reader__measurement order-2 order-md-4 order-xl-1 d-block d-md-flex align-items-center pt-1">
												<label className="adc-sticky-addtocart__label pr-0 pr-md-1">
													<I18n text={"unit_of_measurement_label"} />
												</label>
												<RadioButtonField
													name={"sticky-measurement"}
													options={this.getReaderOptions()}
													selectedValue={this.state.selectedProduct}
													setSelectedValue={this.setSelectedValue}
													isUndetermined={hasUndefinedUom}
													undeterminedUomError={undeterminedUomError}
												/>
											</div>
										</if>
										<div
											className={
												this.isReader()
													? "adc-reader__cart order-3 order-md-2 order-xl-2 text-xl-center"
													: "adc-sensor__cart order-3 order-md-2 order-xl-2"
											}
										>
											<ProductQuantity
												quantity={quantity}
												isManual
												onIncrement={this.incrementQuantity}
												onDecrement={this.decrementQuantity}
												max_sale_qty={parseInt(max_sale_qty)}
												min_sale_qty={parseInt(min_sale_qty)}
											/>
										</div>
										<div
											className={`adc-reader__title order-1 order-xl-3 pl-xl-1
												${this.isReader() ? "pl-xl-1" : ""}`
											}
										>
											<h4 className="adc-title adc-title--white">{name}</h4>
										</div>
										<div
											className={
												this.isReader()
													? "adc-reader__price order-4 order-md-3 order-lg-4  text-right d-block d-md-flex align-items-center"
													: "adc-sensor__price order-4 order-md-3 order-lg-4  text-right d-block d-md-flex align-items-center pl-lg-1 pb-lg-1 ml-lg-5"
											}
										>
											<div className="adc-sticky-addtocart__price">
												<ProductPrice
													price={this.getProductPrice()}
													hasReference={false}
												/>
											</div>
											<div className="adc-sticky-addtocart__tax-text pl-lg-2 pt-0 pt-md-1">
												<I18n
													text={i18nLabels.INCLUDING_VAT}
													params={[tax_value || "0"]}
												/>
												&nbsp;
												<I18n text={"plus_shipping_cost"} />
											</div>
										</div>
									</Col>
									<Col
										className={
											this.isReader()
												? "px-2 px-md-0 pt-xl-1 col-md-8 col-xl-4 d-flex justify-content-between align-items-center order-5 adc-reader-col"
												: "px-2 px-md-0 pt-xl-1 col-xl-5 d-flex justify-content-between align-items-center order-5"
										}
									>
										<if condition={!this.isSubscription()}>
											<Button
												className={"text-center px-0 pl-1 pl-xl-4 py-1 mr-lg-2"}
												label={i18nLabels.ORDER_WITH_SUBSCRIPTION}
												id={"sticky_add_to_cart_webRx"}
												ctaStyle={subsOrder && subsOrder.toLowerCase()}
												size={BUTTON_OPTIONS.SIZE.SMALL}
												action={this.prescriptionHandler}
												icon={
													subsOrder === BUTTON_OPTIONS.STYLE.PRIMARY
														? "recipe-white"
														: "recipe-blue"
												}
											/>
										</if>
										<Button
											className={"text-center  px-0 pl-1 pl-xl-4 py-1"}
											label={i18nLabels.ADD_TO_CART}
											id="sticky_add_to_cart_button"
											ctaStyle={addToCart && addToCart.toLowerCase()}
											size={BUTTON_OPTIONS.SIZE.SMALL}
											action={this.addProductToCart}
											icon={
												addToCart === BUTTON_OPTIONS.STYLE.PRIMARY
													? "shopping-cart-white"
													: "shopping-cart"
											}
										/>
									</Col>
								</Row>
								{addedFromSticky && (
									<div
										className={
											this.isReader()
												? "order-sm-9 order-9 p-0 offset-md-4 offset-xl-8"
												: "order-sm-9 order-9 p-0 offset-xl-7"
										}
									>
										<if condition={undeterminedUomError}>
											<p
												className={
													this.isReader()
														? "adc-product-details__error-message order-sm-7 order-7 p-0 mb-1 ml-1 ml-md-3 ml-xl-2"
														: "adc-product-details__error-message order-sm-7 order-7 p-0 mb-1 ml-1 ml-xl-2"
												}
											>
												<I18n text={undeterminedUomError} />
											</p>
										</if>
										<if condition={errorCodes && !IsErrorCodeGeneric}>
											<p
												className={
													this.isReader()
														? "adc-product-details__error-message order-sm-7 order-7 p-0 mb-1 ml-1 ml-md-3 ml-xl-2"
														: "adc-product-details__error-message order-sm-7 order-7 p-0 mb-1 ml-1 ml-xl-2"
												}
											>
												<I18n text={"magento_error_code_" + errorCodes?.[0]} />
											</p>
										</if>
										<else>
											<p
												className={
													this.isReader()
														? "adc-product-details__error-message order-sm-7 order-7 p-0 mb-1 ml-1 ml-md-3 ml-xl-2"
														: "adc-product-details__error-message order-sm-7 order-7 p-0 mb-1 ml-1 ml-xl-2"
												}
											>
												{error}
											</p>
										</else>
									</div>
								)}
							</Col>
						</Row>
					</div>
				</div>
			);
		}
	}
);
