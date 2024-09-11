import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductImageCarousel from '../ProductImageCarousel/ProductImageCarousel';
import {getProductPriceRequest} from '../../redux/actions/get_product_price.action';
import ProductQuantity from '../../../Cart/components/ProductQuantity/ProductQuantity';
import {
	addProductRequest,
	setShippingAddressOnCart,
	addSubscriptionRequest
} from '../../../Cart/redux/actions/cart.action';
import ProductPrice from '../ProductPrice/ProductPrice';
import RadioButtonField from '../../../Form/components/GenericFields/RadioButtonField';
import SelectField from '../../../Form/components/GenericFields/SelectField';
import Icon from '../../../Generic/components/Icon/Icon';
import translate, {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';

import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import DatePickerField from '../../../Form/components/GenericFields/DatePickerField';
import {reduxForm} from 'redux-form';
import {required} from '../../../Form/utils/validationRules';
import {GENERIC_ERROR_CODES, PRODUCT_ATTRIBUTES, VIDEO_PLAY_OPTION} from '../../../../utils/enums';
import {withBreakpoints} from 'react-breakpoints';
import {PRODUCT_TYPE} from "./ProductUtils";
import ProductErrors from './ProductErrors';


export const isNull = (v) => {
	return (v === null);
};

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
		subscriptionOption};
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
})(connect(mapStateToProps, mapDispatchToProps)(withBreakpoints(class ProductDetails extends Component {

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
		errorCodes:PropTypes.array
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
		addedFromPDP: false
	};

	getSelectedProductData = () => {
		if(isNull(this.state.selectedProduct)) {
			this.setState({
				selectedProduct: this.getSkusOrLabels(PRODUCT_ATTRIBUTES.SKU)[0]
			});
		}
		return this.props.productPrices[this.state.selectedProduct] || {};
	};

	getSkusOrLabels = (field) => {
		let productList = this.getProductPage().productList;
		if(field === PRODUCT_ATTRIBUTES.SKU) {
			return productList?.map((item) => item.sku) || [];
		}
		return productList?.map((item) => item.label) || [];
	}

	getSku = () => {
		return this.getSelectedProductData().sku;
	};

	getProductPrice = () => {
		const {quantity} = this.state;
		const productData = this.getSelectedProductData();
		if(!this.isSubscription()) {
			return parseFloat(productData.price * quantity || 0);
		}
		return productData?.bundle_options[this.props.subscriptionOption]?.values[0]?.price || 0;
	};

	getFrequencyOptions = () => {
		return this.getSelectedProductData()
			.bundle_options
			.map((option,index) => ({
				value: index,
				label: `${translate(this.props.dictionary ,i18nLabels.SUBSCRIPTION_FREQUENCY(option.label))} /
				${option.values[0].quantity} ${translate(this.props.dictionary ,i18nLabels.SENSORS)}`
			}));
	};

	plusServiceOptions = () => {
		let options = [];
		Object
			.entries(Object.keys(this.props.productPrices)
				.filter(sku => this.getSkusOrLabels(PRODUCT_ATTRIBUTES.SKU).includes(sku))
				.reduce((obj, key) => {
					obj[key] = this.props.productPrices[key];
					return obj;
				}, {}))
			.forEach((val, i) => {
				options.push({
					value: this.getSkusOrLabels(PRODUCT_ATTRIBUTES.SKU)[i],
					label: this.getSkusOrLabels(PRODUCT_ATTRIBUTES.LABEL)[i]
				})
			});
		return options || [];
	}

	getReaderOptions = () => {
		let options = [];
		this.props.productPageModel.productList
			.forEach((val, index) => {
				let uom = this.props.productPrices[this.props.productPageModel.productList[index].sku]?.uom;
				options.push({
					value: this.props.productPageModel.productList[index].sku,
					label: 'measurement_'.concat(uom)
				})
			});
		return options || [];
	}

	componentDidMount() {
		this.getSkusOrLabels(PRODUCT_ATTRIBUTES.SKU).map(sku => this.props.getProductPrice(sku));
		localStorage.setItem('shouldPushViewProduct',true);
	}

	componentDidUpdate(prevProps,prevState,snapshot) {
		const {cartDetails, customer, setShippingAddress} = this.props;

		if (!this.isReader() && prevState.selectedDate === null && this.getFirstDeliveryDate() !== null ) {
			this.setState({
				deliveryDate: new Date(this.getFirstDeliveryDate()),
				selectedDate: new Date(this.getFirstDeliveryDate())
			});
		}

		if(!this.isReader() && prevState.selectedProduct !== this.state.selectedProduct
			&& this.getFirstDeliveryDate() !==undefined) {
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
	}

	isReader = () => this.getSelectedProductData()?.product_type === PRODUCT_TYPE.READER;

	isSubscription = () => this.getSelectedProductData().is_subscription;

	incrementQuantity = () => {
		this.setState({quantity: this.state.quantity + 1});
	};

	decrementQuantity = () => {
		if (this.state.quantity > 1) {
			this.setState({quantity: this.state.quantity - 1});
		}
	};

	getProductPage = () => this.props.productPageModel || {};

	getProduct = () => {
		let product;
		this.props.productPageModel.productList?.forEach((value, index) => {
			if(value.sku===this.state.selectedProduct){
				product = value;
			}
		});
		return product;
	}

	getProductImages = () => (this.getProduct()?.productImage || []).map(url => ({
			url: url
	}));

	getProductVideos = () => (this.getProduct()?.videoList || []).map(video => ({
		url: video?.thumbnailImage,
		videoId: video?.videoId,
		thumbnailImage: video?.thumbnailImage,
		videoPlayOption: VIDEO_PLAY_OPTION.DISPLAY_ON_MODAL
	}));

	getFirstDeliveryDate = () => {
		if (!this.getSelectedProductData().first_delivery_date_after) {
			return new Date().setDate(new Date().getDate() + parseInt("0.0") + 1);
		}
		return new Date()
			.setDate(new Date().getDate() +
				parseInt(this.getSelectedProductData()?.first_delivery_date_after) + 1);
	};

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

	handleChange = (date, e) => {
		e.stopPropagation();
		this.setState({
			selectedDate: date
		});
	};

	changePlusService = (e) => {
		this.setState({
			selectedProduct:e.target.value
		});
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

	toggleCalendar = () => {
		this.setState({
			isCalendarOpen: !this.state.isCalendarOpen
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

	addProductToCart = () => {
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
		if(!this.isSubscription()) {
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

	initiateWebRx = () => {
		const {wizardSelectorUrl} = this.props;
		window.location = wizardSelectorUrl;
	};

	render() {
		const {quantityOrder, error,errorCodes, breakpoints, currentBreakpoint} = this.props;
		const {
			hasUndefinedUom,
			selectedProduct,
			quantity,
			errors: {undeterminedUomError},
			deliveryDate,
			selectedDate,
			isCalendarOpen,
			addedFromPDP} = this.state;
		const {productDescription} = this.getProductPage();
		const {min_sale_qty, max_sale_qty, name: productName, tax_value} = this.getSelectedProductData();
		const IsErrorCodeGeneric = GENERIC_ERROR_CODES.indexOf(errorCodes?.[0]) !==-1 ;
		const isSubscription = this.isSubscription();

		return <div className="container bg-white adc-product-details">
			<Row>
				<Col lg={5} md={6} className={'adc-product-details__image-section px-xl-5'}>
					<h2 className="adc-title adc-title--blue  d-md-none d-block  text-center text-md-left">
						{productName}</h2>
					<ProductImageCarousel
						images={this.getProductImages()} productName={productName} videos={this.getProductVideos()}/>
				</Col>
				<Col lg={7} md={6} className="adc-product-details__description-section pb-xl-4">
					<Row className="m-0 py-3">
						<h1 className={'adc-title adc-title--blue d-none d-md-block text-center ' +
						'text-md-left'}>{productName}</h1>
						<Col className="p-0 mt-2">
							<p className={'adc-product-details__description mt-1 ml-1'}
							   dangerouslySetInnerHTML={{__html: productDescription}}/>
						</Col>
						<if condition={this.isReader()}>
							<Col className="order-1 order-md-2 p-0 mt-md-1">
								<Row>
									<Col>
										<label className="adc-product-details__measure-text ml-3">
											<I18n text={'unit_of_measurement_label'}/>
										</label>
									</Col>
								</Row>
								<Row>
									<Col>
										<RadioButtonField
											name={'measurement'}
											options={this.getReaderOptions()}
											selectedValue={selectedProduct}
											setSelectedValue={this.setSelectedValue}
											isUndetermined={hasUndefinedUom}
											undeterminedUomError={undeterminedUomError}
										/>
									</Col>
								</Row>
							</Col>
						</if>
						<div className={`${breakpoints[currentBreakpoint] === breakpoints.mobile
						&& isSubscription ? 'col-6 col-md-4' :'col-12'} order-3 order-md-4 mt-3 p-0`}>
							<Row className="no-gutters">
								<if condition={!isSubscription}>
									<Col width={7} md={7} lg={5} xl={4}>
										<ProductQuantity
											quantity={quantity}
											isManual
											onIncrement={this.incrementQuantity}
											onDecrement={this.decrementQuantity}
											max_sale_qty={parseInt(max_sale_qty)}
											min_sale_qty={parseInt(min_sale_qty)}
										/>
									</Col>
								</if>
								<Col width={3}
									 className="adc-product-detail__pricing adc-price-detail
									 d-flex pb-0 align-items-center">
									<ProductPrice price={this.getProductPrice()} withReference={false}/>
								</Col>
							</Row>
						</div>

						<div className={`${breakpoints[currentBreakpoint] === breakpoints.mobile
						&& isSubscription ? 'col-6 col-md-8 order-4' :'col-12 order-7'} order-md-5 p-0`}>
							<Row className="no-gutters">
								<if condition={isSubscription}>
									<Col md={12} lg={8} xl={6} className={'pl-xl-2 adc-product-details__quaterly'}>
										<I18n text={this.getSubscriptionSelectedOptionLabel()}/>
									</Col>
								</if>
								<if condition={!isSubscription}>
									<Col md={6} lg={4} xl={4} className="d-none d-lg-block"/>
								</if>
								<Col md={12} lg={8} xl={6} className={`${breakpoints[currentBreakpoint] === breakpoints.mobile
								&& isSubscription ? 'adc-product-details__quaterly--info-cps' :'adc-product-details__quaterly--info'}
									 pl-xl-1 ml-lg-1 ml-md-0 justify-content-center justify-content-md-start `}>
									<span className="adc-product-details__tooltipbottom-title mr-1">
										<I18n text={i18nLabels.INCLUDING_VAT} params={[tax_value || '0']}/></span>
									<div className="d-flex align-items-center">
										<span className="adc-product-details__tooltipbottom-title"><I18n
											text={i18nLabels.PLUS_SHIPPING_COST}/></span>
										<Icon image={'info-box'}>
											<div className="adc-tooltipbottom__content shipping-options">
												<Row>
													<Col className="font-weight-bold text-left px-4">
														<I18n text={isSubscription ? i18nLabels.CPS_SHIPPING_METHOD_TEXT
															: i18nLabels.CPO_SHIPPING_METHOD_TEXT}/>
													</Col>
												</Row>
											</div>
										</Icon>
									</div>
								</Col>
							</Row>
						</div>
						<if condition={isSubscription}>
							<Col lg={8} className="order-4 order-md-6 p-0">
								<Row className="justify-content-left">
									<div className="col-sm-12 col-md-12 ">
										<SelectField
											onChange={this.changePlusService}
											options={this.plusServiceOptions()}
											renderOptionLabelsWithoutTranslation={true}
											label={i18nLabels.SENSOR_TYPE_LABEL}
											name='sensorTypeOptions'/>
									</div>
								</Row>
							</Col>
							<Col lg={8} className="order-5 order-md-7 p-0">
								<Row className="justify-content-left">
									<div className="col-sm-12 col-md-12 ">
										<SelectField
											options={this.getFrequencyOptions()}
											label={i18nLabels.FREQUENCY}
											name='subscriptionOption'/>
									</div>
								</Row>
							</Col>

							<Col lg={8} className="order-6 order-md-8 p-0">
								<if condition={this.getFirstDeliveryDate()}>
									<Row>
										<Col md={12}>
											<div className="adc-form-group w-100 adc-product-details__date-picker">
												<DatePickerField
													minDate={this.getFirstDeliveryDate()}
													name='deliveryDate'
													selectedDate={selectedDate}
													confirmedDate={deliveryDate}
													onChange={this.handleChange}
													handleConfirm={this.handleConfirm}
													toggleCalendar={this.toggleCalendar}
													isCalendarOpen={isCalendarOpen}
													label={i18nLabels.START_DATE}
													validationRules={[required]}
													icon='clock-calendar-blue'
												/>
											</div>
										</Col>
									</Row>
								</if>
							</Col>
						</if>
						<Col className="order-6 mt-3 order-md-8 p-0">
							<Row>
								<Col sm={12} xl={6} className="d-flex justify-content-between align-items-center mt-3">
									<Button
										label={i18nLabels.ADD_TO_CART}
										id={'product_page_add_to_cart'}
										ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
										size={BUTTON_OPTIONS.SIZE.SMALL}
										isFullWidth
										hasNoMargin
										action={this.addProductToCart}
									/>
								</Col>
								<if condition={!isSubscription}>
									<Col sm={12} xl={6}
										 className="d-flex justify-content-between align-items-center my-3 mb-md-0">
										<Button
											label={i18nLabels.ORDER_WITH_SUBSCRIPTION}
											ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
											id={'product_page_webRx'}
											size={BUTTON_OPTIONS.SIZE.SMALL}
											isFullWidth
											hasNoMargin
											action={this.initiateWebRx}
										/>
									</Col>
								</if>
							</Row>
						</Col>
						{addedFromPDP && <ProductErrors error={error} errorCodes={errorCodes} undeterminedUomError={undeterminedUomError} IsErrorCodeGeneric={IsErrorCodeGeneric}/>}
						<p className={'adc-product-details__note-title  col-12 order-sm-9 order-7 p-0 pt-md-3'}
						   dangerouslySetInnerHTML={{__html: quantityOrder}}/>
					</Row>
				</Col>
			</Row>
		</div>;
	}
})));