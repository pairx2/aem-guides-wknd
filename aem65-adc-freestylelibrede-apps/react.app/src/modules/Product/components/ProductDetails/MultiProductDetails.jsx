import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductImageCarousel from '../ProductImageCarousel/ProductImageCarousel';
import {getProductPriceRequest} from '../../redux/actions/get_product_price.action';
import {
	addProductRequest,
	setShippingAddressOnCart,
	addSubscriptionRequest
} from '../../../Cart/redux/actions/cart.action';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import {reduxForm} from 'redux-form';
import {GENERIC_ERROR_CODES, PRODUCT_ATTRIBUTES, VIDEO_PLAY_OPTION} from '../../../../utils/enums';
import {withBreakpoints} from 'react-breakpoints';
import MultiProductItem from "./MultiProductItem";
import {PRODUCT_TYPE} from "./ProductUtils";
import {isNull} from "./ProductDetails";
import ProductErrors from "./ProductErrors";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductQuantity from "../../../Cart/components/ProductQuantity/ProductQuantity";
import DatePickerField from "../../../Form/components/GenericFields/DatePickerField";
import { required } from "../../../Form/utils/validationRules";

const mapStateToProps = state => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {productPrices} = state.productModuleReducer.getProductPricesReducer;
	const {cartId} = state.cartModuleReducer.GetCustomerCartIdReducer;
	const {cartDetails, error, errorCodes} = state.cartModuleReducer.GetCustomerCartReducer;
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const {subscriptionOption} = state.form.productDetailForm.values;
	return {
		customer,
		cartDetails,
		productPrices,
		cartId,
		errorCodes,
		error,
		dictionary,
		subscriptionOption
	};
};

const mapDispatchToProps = {
	getProductPrice: getProductPriceRequest,
	addProductToCart: addProductRequest,
	setShippingAddress: setShippingAddressOnCart,
	addSubscriptionToCart: addSubscriptionRequest
};


export default reduxForm({
	form: 'productDetailForm',
	initialValues: {
		subscriptionOption: '0'
	}
})(connect(mapStateToProps, mapDispatchToProps)(withBreakpoints(class MultiProductDetails extends Component {

	static propTypes = {
		productType: PropTypes.oneOf([...Object.values(PRODUCT_TYPE)]),
		cartDetails: PropTypes.object,
		productPrices: PropTypes.object,
		error: PropTypes.string,
		getProductPrice: PropTypes.func,
		setShippingAddress: PropTypes.func,
		addProductToCart: PropTypes.func,
		productPageModel: PropTypes.object,
		wizardSelectorUrl: PropTypes.string,
		quantityOrder: PropTypes.string,
		customer: PropTypes.object,
		dictionary: PropTypes.object,
		subscriptionOption: PropTypes.string,
		addSubscriptionToCart: PropTypes.func,
		errorCodes: PropTypes.array,
		productImageArray: PropTypes.object,
		productVideoArray: PropTypes.object
	};

	static defaultProps = {
		productType: PRODUCT_TYPE.SENSOR
	};

	state = {
		hasUndefinedUom: true,
		errors: {
			undeterminedUomError: undefined
		},
		quantity: 1,
		deliveryDate: null,
		selectedDate: null,
		selectedProduct: null,
		isCalendarOpen: false,
		addedFromPDP: false,
		changeRadioValue: "_0",
		changeRadioValueButton: false
	};
	handleConfirm = (e) => {
		e.stopPropagation();
		const {selectedDate} = this.state;
		const {change} = this.props;
		change('deliveryDate', selectedDate);
		this.setState({
			deliveryDate: selectedDate,
			isCalendarOpen: false
		});
	};
	getSkusOrLabels = (field) => {
		let productList = this.getProductPage().productList;
		if (field === PRODUCT_ATTRIBUTES.SKU) {
			return productList?.map((item) => item.sku) || [];
		}
		return productList?.map((item) => item.label) || [];
	}

	getSelectedProductData = () => {
		if (isNull(this.state.selectedProduct)) {
			this.setState({
				selectedProduct: this.getSkusOrLabels(PRODUCT_ATTRIBUTES.SKU)[0]
			});
		}
		return this.props.productPrices[this.state.selectedProduct] || {};
	};
	incrementQuantity = () => {
		this.setState({quantity: this.state.quantity + 1});
	};

	decrementQuantity = () => {
		if (this.state.quantity > 1) {
			this.setState({quantity: this.state.quantity - 1});
		}
	};

	getProductPrice = () => {
		const {quantity} = this.state;
		const productData = this.getSelectedProductData();
		if (!this.isSubscription()) {
			return parseFloat(productData.price * quantity || 0);
		}
		return productData?.bundle_options[this.props.subscriptionOption]?.values[0]?.price || 0;
	};
	
	handleSecondRadioButton = (id,name) => {
			this.setState({
				changeRadioValue: "_"+ id,
				selectedProduct :  name
			})

	}

	componentDidMount() {
		this.getSkusOrLabels(PRODUCT_ATTRIBUTES.SKU).map(sku => this.props.getProductPrice(sku));
		localStorage.setItem('shouldPushViewProduct', true);
	}

	getFirstDeliveryDate = () => {
		if (!this.getSelectedProductData().first_delivery_date_after) {
			return new Date().setDate(new Date().getDate() + parseInt("0.0") + 1);
		}
		return new Date()
			.setDate(new Date().getDate() +
				parseInt(this.getSelectedProductData()?.first_delivery_date_after) + 1);
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		let product;
		const {cartDetails, customer, setShippingAddress} = this.props;
		if (!this.isReader() && prevState.selectedDate === null && this.getFirstDeliveryDate() !== null) {
			this.setState({
				deliveryDate: new Date(this.getFirstDeliveryDate()),
				selectedDate: new Date(this.getFirstDeliveryDate())
			});
		}

		if (!this.isReader() && prevState.product !== this.state.product
			&& this.getFirstDeliveryDate() !== undefined) {
			this.setState({
				selectedDate: new Date(this.getFirstDeliveryDate()),
				deliveryDate: new Date(this.getFirstDeliveryDate())
			});
		}
		if (cartDetails.id && cartDetails.id !== prevProps.cartDetails.id) {
			const defaultShippingAddress = customer?.addresses?.find(address => address.default_shipping);
			!cartDetails.shipping_address?.country_id && defaultShippingAddress && setShippingAddress({
				fetchCart: true,
				address: defaultShippingAddress
			});
		}
		if (this.props.productPageModel.productList.length > 0) {
			for (product in this.props.productPageModel.productList) {
				if (!this.state.changeRadioValueButton && Object.keys(this.props.productPrices).length > 0 && this.props.productPrices[this.props.productPageModel.productList[product].sku]) {
						this.state.changeRadioValue = "_" + product;
						this.state.changeRadioValueButton =true;
						break;
				}
			}
		}
	}

	handleChange = (date, e) => {
		e.stopPropagation();
		this.setState({
			selectedDate: date
		});
	};


	toggleCalendar = () => {
		this.setState({
			isCalendarOpen: !this.state.isCalendarOpen
		});
	};
	getProductImages = () => (this.props.productImageArray || []).map(url => ({
		url: url
	}));
	getProduct = () => {
		let product;
		this.props.productPageModel.productList?.forEach((value, index) => {
			if (value.sku === this.state.selectedProduct) {
				product = value;
			}
		});
		return product;
	}


	getProductVideos = () => (this.props.productVideoArray || []).map(video => ({
		url: video?.thumbnailImage,
		videoId: video?.videoId,
		thumbnailImage: video?.thumbnailImage,
		videoPlayOption: VIDEO_PLAY_OPTION.DISPLAY_ON_MODAL
	}));


	setSelectedValue = (selectedValue) => {
		this.setState({
			selectedProduct: selectedValue,
			quantity: 1,
			hasUndefinedUom: false,
			errors: {
				...this.state.errors,
				undeterminedUomError: undefined
			}
		});
	};


	getSubscriptionSelectedOptionLabel = () => {
		return this.getSelectedProductData()?.bundle_options
			[this.props.subscriptionOption]?.label || 'Monthly';
	};

	getSubscriptionSelectedOption = () => {
		return this.getSelectedProductData()?.bundle_options
			[this.props.subscriptionOption] || {};
	};

	isReader = () => this.getSelectedProductData()?.product_type === PRODUCT_TYPE.READER;

	isSubscription = () => this.getSelectedProductData().is_subscription;

	handleAddProductToCart = () => {
		const {hasUndefinedUom} = this.state;
		this.setState({addedFromPDP: true});
		if (this.isReader() && hasUndefinedUom) {
			this.setState({
				errors: {
					...this.state.errors,
					undeterminedUomError: i18nLabels.UNDETERMINED_UOM_ERROR
				}
			});
			return;
		}

		if (!this.isSubscription()) {
			const {addProductToCart} = this.props;
			addProductToCart({
				sku: this.getSku(),
				qty: this.state.quantity,
				startDate: this.state.deliveryDate
			});
		} else {
			const {addSubscriptionToCart} = this.props;
			const bundle = this.getSubscriptionSelectedOption();
			addSubscriptionToCart({
				sku: this.getSku(),
				qty: 1,
				startDate: this.state.deliveryDate,
				bundleId: bundle?.id,
				optionId: bundle.values[0]?.id
			});
		}
	};
	getSku = () => {
		return this.getSelectedProductData().sku;
	};
	initiateWebRx = () => {
		const {wizardSelectorUrl} = this.props;
		window.location = wizardSelectorUrl;
	};
	getProductPage = () => this.props.productPageModel || {};

	renderMultiProductItem = () => {
		return (this.props.productPageModel?.productList.map((productItem, index) =>
			<div key={productItem.sku}>
				<if condition={this.state.changeRadioValueButton}>	
					<MultiProductItem
											index={index}
											radioSelectionCheck={this.state.changeRadioValue === "_" + index}
											sku={this.props.productPrices[productItem.sku]?.sku}
											product={this.props.productPrices[productItem.sku]}
											description={productItem["variantDescription"]}
											heading={productItem["variantHeading"]}
											breakpoints={this.props.breakpoints}
											currentBreakpoint={this.props.currentBreakpoint}
											subscriptionOption={this.props.subscriptionOption}
											selectedProduct={this.state.selectedProduct}
											handleSecondRadioButton={this.handleSecondRadioButton}
											handleConfirm={this.handleConfirm}
											selectedDate={this.state.selectedDate}
											deliveryDate={this.state.deliveryDate}
											isCalendarOpen={this.state.isCalendarOpen}
											handleChange={this.handleChange}
											toggleCalendar={this.toggleCalendar}
											getProductPrice={this.getProductPrice}
											listLength={Object.keys(this.props.productPrices).length > 1}
											quantity={this.state.quantity}
											incrementQuantity={this.incrementQuantity}
											decrementQuantity={this.decrementQuantity}
											changeRadioValueButton={this.state.changeRadioValueButton}
											productPrices={this.props.productPrices}
										/>
				</if>
			</div>
		));
	}

	getClassName = (index, type) => {
		if(index !== 0){
			if(type === "button") return "btn btn-link btn-block text-left collapsed"
			else return "collapse"
		}
		else {
			if(type === "button") return "btn btn-link btn-block text-left"
			else return "collapse show"
		}
	} 

	render() {
		const {quantityOrder, error, errorCodes, productPageModel, productPrices} = this.props;
		const {
			errors: {undeterminedUomError},
			addedFromPDP
		} = this.state;
		const {productDescription} = this.getProductPage();
		const {label} = this.getProductPage();
		const IsErrorCodeGeneric = GENERIC_ERROR_CODES.indexOf(errorCodes?.[0]) !== -1;
		return (
			<>
				<if condition={productPageModel.templateType !== "multiproductv2"}>
					<div className="container bg-white adc-product-details">
					<Row>
						<Col lg={5} md={6} className={'adc-product-details__image-section px-xl-5'}>
							<h2 className="adc-title adc-title--blue  d-md-none d-block  text-center text-md-left">
								{label}</h2>
							<ProductImageCarousel
								images={this.getProductImages()} productName={label} videos={this.getProductVideos()}/>
						</Col>
						<Col lg={7} md={6} className="adc-product-details__description-section pb-xl-4">
							<Row className="m-0 py-3">
								<h1 className={'adc-title adc-title--blue d-none d-md-block text-center ' +
								'text-md-left'}>{label}</h1>
								<Col className=" p-0 mt-2">
									<p className={'adc-product-details__description mt-1 ml-1'}
									dangerouslySetInnerHTML={{__html: productDescription}}/>
								</Col>
								<div>
									{this.renderMultiProductItem()}
								</div>
								<Col className="order-6 mt-3 order-md-8 p-0">
									{addedFromPDP && <ProductErrors error={error} errorCodes={errorCodes} undeterminedUomError={undeterminedUomError} IsErrorCodeGeneric={IsErrorCodeGeneric}/>}
									<Row>
										<Col sm={12} xl={6} className="d-flex justify-content-between align-items-center mt-3">
											<Button
												label={i18nLabels.ADD_TO_CART}
												id={'product_page_add_to_cart'}
												ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
												size={BUTTON_OPTIONS.SIZE.SMALL}
												isFullWidth
												hasNoMargin
												className={!this.state.changeRadioValueButton ? 'disable-button ' : ''}
												action={this.handleAddProductToCart}
											/>
										</Col>
										<Col sm={12} xl={6}
											className="d-flex justify-content-between align-items-center my-3 mb-md-0">
											<Button
												label={i18nLabels.ORDER_WITH_SUBSCRIPTION}
												ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
												id={'product_page_webRx'}
												size={BUTTON_OPTIONS.SIZE.SMALL}
												className={!this.state.changeRadioValueButton ? 'disable-button ' : ''}
												isFullWidth
												hasNoMargin
												action={this.initiateWebRx}
											/>
										</Col>
									</Row>
								</Col>
								<p className={'adc-product-details__note-title  col-12 order-sm-9 order-7 p-0 pt-md-3'}
									dangerouslySetInnerHTML={{__html: quantityOrder}}/>
							</Row>
						</Col>
					</Row>
					</div>
				</if>
				<else>
					<div id="adcde-nextGen-productPage">
						<section className="adcde-nextGen-productPage-main-section py-4 py-md-5">
							<div className="container py-4 py-md-5">
								<div className="row pt-4 pt-md-5">
								{/* <!-- left side --> */}
									<div className="col-12 col-md-5 col-lg-4">
										<div className='adcde-nextGen-productPage-image-section'>
											<ProductImageCarousel images={this.getProductImages()} productName={label} videos={this.getProductVideos()}/>
										</div>
									</div>
								{/* <!-- right side --> */}
									<div className="col-12 offset-md-1 col-md-6 col-lg-7">
										{productPageModel.productBadgev2 !== null && <p className="adcde-productpage-badge">{productPageModel.productBadgev2}</p>}
										<h1 className="adcde-productpage-title">{productPageModel.productHeadlinev2}</h1>
										<p className="adcde-productpage-description" dangerouslySetInnerHTML={{__html: productPageModel.productDescriptionv2}}/>
										<p className="adcde-productpage-selection-subline" dangerouslySetInnerHTML={{__html: productPageModel.selectionSublinev2}} />
										{/* <!-- product variant accordion --> */}
										<div className="accordion" id="productVariantAccordion">
											{this.props.productPageModel?.productList?.map((productItem, index) => {
												const checkProductType = this.props.productPrices[productItem.sku]?.["is_subscription"]
											return	(
												<>
												{/* variant with no sku */}
											<if condition={checkProductType == undefined}>
											<div key={productItem?.sku} className="card adcde-productpage-variant-type-nosku">
												<span className="adcde-productpage-variant-badge">{productItem.variantBadgev2}</span>
												<div className="card-header" id="headingOne">
													<div>
													<button className={this.getClassName(index, "button")} type="button" data-toggle="collapse" data-target={`#collapseOne${index}`} aria-expanded="true" aria-controls={`collapseOne${index}`}>
														<p className="adcde-productpage-variant-headline">{productItem.variantHeadlinev2}</p>
														<p className="adcde-productpage-variant-description" dangerouslySetInnerHTML={{__html: productItem.variantDescriptionv2}} />
													</button>
													</div>
												</div>
												<div id={`collapseOne${index}`} className={this.getClassName(index, "div")} aria-labelledby="headingOne" data-parent="#productVariantAccordion">
													<div className="card-body">
													<form>
														<div className="form-row align-items-end">
															<div className="col-12 col-sm-auto col-md-12 col-lg-auto">
																<Button type={BUTTON_OPTIONS.TYPE.BUTTON} 
																	label={productItem.variantButtonLabelv2}
                                            						href={productItem.variantButtonUrlv2}
                                            						isFullWidth
                                            						className={'adcde-productpage-variant-button'} />
															</div>
														</div>
													</form>
													</div>
												</div>
											</div>
											</if>
											{/* plus service subscription */}
											<elseif condition={checkProductType}>
											<div key={productItem?.sku} className="card adcde-productpage-variant-type-subscription">
												<span className="adcde-productpage-variant-badge">{productItem.variantBadgev2}</span>
												<div className="card-header" id="headingTwo">
													<div onClick={() => this.handleSecondRadioButton(index, productPrices[productItem.sku]?.sku)}>
													<button className={this.getClassName(index, "button")} type="button" data-toggle="collapse" data-target={`#collapseTwo${index}`} aria-expanded="true" aria-controls={`collapseTwo${index}`}>
														<p className="adcde-productpage-variant-headline">{productItem.variantHeadlinev2}</p>
														<p className="adcde-productpage-variant-description" dangerouslySetInnerHTML={{__html: productItem.variantDescriptionv2}} />
													</button>
													</div>
												</div>
												<div id={`collapseTwo${index}`} className={this.getClassName(index, "div")} aria-labelledby="headingTwo" data-parent="#productVariantAccordion">
													<div className={this.state.isCalendarOpen ? "card-body is-calender-open" : "card-body"}>
													<div className="row align-items-center no-gutters">
														<div className="col-md-auto col-12">
															<span className="adcde-productpage-variant-price">
															<ProductPrice price={this.getProductPrice()} withReference={false} />
															</span>
														</div>
														<div className="col-lg col-12">
															<p className="adcde-productpage-variant-price-subline">{productItem.variantPriceSublinev2}</p>
															<p className="adcde-productpage-variant-price-description" dangerouslySetInnerHTML={{__html: productItem.variantPriceDescriptionv2}} />
														</div>
													</div>
													<form>
														<div className="form-row align-items-end">
															<div className="col-12 col-sm-auto col-md-12 col-lg-auto">
																<div className="input-group date-picker-field">
																<DatePickerField
																	minDate={this.getFirstDeliveryDate()}
																	name='deliveryDate'
																	selectedDate={this.state.selectedDate}
																	confirmedDate={this.state.deliveryDate}
																	onChange={this.handleChange}
																	handleConfirm={this.handleConfirm}
																	toggleCalendar={this.toggleCalendar}
																	isCalendarOpen={this.state.isCalendarOpen}
																	label={i18nLabels.START_DATE}
																	validationRules={[required]}
																	icon='v2_product_calender'
																/>
													
																</div>
															</div>
															<div className="col-12 col-sm-auto col-md-12 col-lg-auto">
											
																<Button
																	label={productItem.variantButtonLabelv2}
																	id={'product_page_add_to_cart'}
																	isFullWidth
																	className={"adcde-productpage-variant-button adcde-productpage-variant-button-cart"}
																	action={this.handleAddProductToCart}
																/>
															</div>
														</div>
													</form>
													<p className="adcde-productpage-variant-errormessage text-danger">
													{addedFromPDP && <ProductErrors error={error} errorCodes={errorCodes} undeterminedUomError={this.state.errors.undeterminedUomError} IsErrorCodeGeneric={IsErrorCodeGeneric}/>}
													</p>
													</div>
												</div>
											</div>
											</elseif>
											{/* single purchase */}
											<elseif condition={!checkProductType }>
											<div key={productItem?.sku} className="card adcde-productpage-variant-type-singleproduct">
												<span className="adcde-productpage-variant-badge">{productItem.variantBadgev2}</span>
												<div className="card-header" id="headingThree">
												
													<div onClick={() => this.handleSecondRadioButton(index, productPrices[productItem.sku]?.sku)}>
													<button className={this.getClassName(index, "button")} type="button" data-toggle="collapse" data-target={`#collapseThree${index}`} aria-expanded="true" aria-controls={`collapseThree${index}`}>
														<p className="adcde-productpage-variant-headline">{productItem.variantHeadlinev2}</p>
														<p className="adcde-productpage-variant-description" dangerouslySetInnerHTML={{__html: productItem.variantDescriptionv2}}/>
													</button>
													</div>
												</div>
												<div id={`collapseThree${index}`} className={this.getClassName(index, "div")} aria-labelledby="headingThree" data-parent="#productVariantAccordion">
													<div className="card-body">
													<div className="row align-items-center no-gutters">
														<div className="col-md-auto col-12">
															<span className="adcde-productpage-variant-price">
															<ProductPrice price={this.getProductPrice()} withReference={false} />
															</span>
														</div>
														<div className="col-lg col-12">
															<p className="adcde-productpage-variant-price-subline">{productItem.variantPriceSublinev2}</p>
															<p className="adcde-productpage-variant-price-description" dangerouslySetInnerHTML={{__html: productItem.variantPriceDescriptionv2}} />
														</div>
													</div>
													<form>
														<div className="form-row align-items-end">
															<div className="col-12 col-sm-auto col-md-12 col-lg-auto">
																<label for="number-label"><I18n text={i18nLabels.PRODUCT_QUANTITY_LABEL} /></label>
																<div className="input-group">
																	<ProductQuantity
																		quantity={this.state.quantity}
																		isManual
																		onIncrement={this.incrementQuantity}
																		onDecrement={this.decrementQuantity}
																		max_sale_qty={parseInt(productPrices[productItem.sku]["max_sale_qty"])}
																		min_sale_qty={parseInt(productPrices[productItem.sku]["min_sale_qty"])}
																		productTemplateType={productPageModel.templateType}
																	/>
																</div>
															</div>
															<div className="col-12 col-sm-auto col-md-12 col-lg-auto">
																
																<Button
																	label={productItem.variantButtonLabelv2}
																	id={'product_page_add_to_cart'}
																	isFullWidth
																	className={"adcde-productpage-variant-button adcde-productpage-variant-button-cart"}
																	action={this.handleAddProductToCart}
																/>
															</div>
														</div>
													</form>
													<p className="adcde-productpage-variant-errormessage text-danger">
													{addedFromPDP && <ProductErrors error={error} errorCodes={errorCodes} undeterminedUomError={this.state.errors.undeterminedUomError} IsErrorCodeGeneric={IsErrorCodeGeneric}/>}
													</p>
													</div>
												</div>
											</div>
											</elseif>
											</>
											)
											})
											}
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</else>
			</>
		)
	}
})));
