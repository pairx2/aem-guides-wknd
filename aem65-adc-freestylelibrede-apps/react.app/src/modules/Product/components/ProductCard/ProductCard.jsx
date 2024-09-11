import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withBreakpoints} from 'react-breakpoints';
import {getProductPriceRequest} from '../../redux/actions/get_product_price.action';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import Icon from '../../../Generic/components/Icon/Icon';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import ProductPrice from '../ProductPrice/ProductPrice';
import {defaultUom, measurementOptions} from '../../../../utils/measureOptions';
import RadioButtonField from '../../../Form/components/GenericFields/RadioButtonField';
import {addProductRequest} from '../../../Cart/redux/actions/cart.action';
import {empty} from '../../../../utils/default';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';

const mapStateToProps = state => {
	const {productPrices} = state.productModuleReducer.getProductPricesReducer;
	const {errorCodes, cardError} = state.cartModuleReducer.GetCustomerCartReducer;
	return {productPrices, errorCodes, cardError};
};

const mapDispatchToProps = {
	getProductPrice: getProductPriceRequest,
	addProductToCart: addProductRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withBreakpoints(class ProductCard extends Component {
	state = {
		selectedUom: defaultUom,
		hasUndefinedUom: true,
		undeterminedUomError: undefined
	};

	static propTypes = {
		getProductPrice: PropTypes.func,
		productSkus: PropTypes.array,
		heading: PropTypes.string,
		description: PropTypes.string,
		productImage: PropTypes.string,
		importantMessageIcon: PropTypes.string,
		cta1: PropTypes.object,
		cta2: PropTypes.object,
		disclaimerText: PropTypes.string,
		productPrices: PropTypes.object,
		hasNewProduct: PropTypes.bool,
		addProductToCart: PropTypes.func,
		deepLinkTarget: PropTypes.string,
		errorCodes: PropTypes.string,
		cardError: PropTypes.string
	};

	componentDidMount() {
		const {productSkus, errorCodes, productPrices, getProductPrice} = this.props;
		productSkus?.map(sku => getProductPrice(sku.sku));
		localStorage.setItem('productsList', JSON.stringify(productPrices));
		if(!errorCodes) {
			window.scroll({top: 0, left: 0, behavior: 'smooth'});
		}
	}

	isReader = () => this.props.productSkus?.length > 1;

	getDefaultSku = () => this.props.productSkus?.[0]?.sku;

	getSelectedProductData = () => {
		const {productPrices} = this.props;
		const {selectedUom} = this.state;
		if (this.isReader()) {
			return Object.values(productPrices).find(p => p.uom == selectedUom) || empty.object;
		} else {
			return productPrices[this.getDefaultSku()] || empty.object;
		}
	};

	getSku = () => {
		return this.getSelectedProductData().sku;
	};

	setSelectedValue = (selectedValue) => {
		this.setState({
			selectedUom: selectedValue,
			hasUndefinedUom: false,
			undeterminedUomError: undefined
		});
	};

	addProductToCart = () => {
		const {addProductToCart} = this.props;
		const {hasUndefinedUom} = this.state;
		if(this.isReader() && hasUndefinedUom) {
			this.setState({
				undeterminedUomError: i18nLabels.UNDETERMINED_UOM_ERROR
			});
			return;
		} else {
			addProductToCart({
				sku: this.getSku(),
				qty: 1
			});
		}
	};

	getProductPrice = () => parseFloat(this.getSelectedProductData().price || 0);

	render() {
		const {heading, description, productImage, importantMessageIcon, errorCodes, cardError, cta1, cta2, disclaimerText, productSkus, hasNewProduct, deepLinkTarget} = this.props;
		const {selectedUom, hasUndefinedUom, undeterminedUomError} = this.state;
		const {name} = this.getSelectedProductData();
		return <Card title={name || heading} hasTitleBorder={false} hasTitleCentered className={productSkus ? 'showPrice' : ''}>
			<CardContent >
				<div className='adc-product-card' id={deepLinkTarget}>
					<Row>
						<Col>
							<div dangerouslySetInnerHTML={{__html: description}} className='adc-product-card__description' />
						</Col>
					</Row>
					<Row className="justify-content-center align-items-center">
						<Col md={12} lg={8} className="productImage">
							<img data-src={productImage} className="img-fluid lazyload" alt={name || heading} />
							<if condition={hasNewProduct} >
								<div className='adc-product-card__icon--top-right'>
									<span>{'Neu'}</span>
								</div>
								<Col className={'adc-product-card__icon'}>
									<div className="alarm-content">
										<Icon image={importantMessageIcon} size={Icon.SIZE.SMALL} />
										<span dangerouslySetInnerHTML={{__html: disclaimerText}} className="ml-3" />
									</div>
								</Col>

							</if>
						</Col>
					</Row>
					<if condition={productSkus} >
						<Row>
							<Col lg={2} md={2} sm={3} className='adc-price-detail adc-product-card__price d-flex pb-2'>
								<ProductPrice price={this.getProductPrice()} hasReference={!!{disclaimerText}} />
							</Col>
						</Row>
					</if>
					<if condition={this.isReader()}>
						<Row className={'text-center'}>
							<Col>
								<p><I18n text={'unit_of_measurement_label'}/></p>
								<RadioButtonField
									name={`measurement_${this.getSku()}`}
									options={measurementOptions}
									selectedValue={selectedUom}
									setSelectedValue={this.setSelectedValue}
									isUndetermined={hasUndefinedUom}
									undeterminedUomError={undeterminedUomError}
								/>
							</Col>
						</Row>
					</if>
					<Row className="d-flex justify-content-center align-items-center mx-0 button-wrapper">
						<Col className='adc-product-card__button col-sm-12 col-lg-6'>
							<Button
								type={BUTTON_OPTIONS.TYPE.BUTTON}
								href={cta1.link}
								label={cta1.text}
								ctaStyle={cta1.type}
								target={cta1.action}
								isFullWidth
								isMoreInfoButton
								hasNoMargin
								productData={this.getSelectedProductData()}
							/>
							<div className="adc-product-card__disclaimer" dangerouslySetInnerHTML={{__html: cta1.disclaimer}} />
						</Col>
						<if condition={productSkus} >
							<Col className='adc-product-card__button col-sm-12 col-lg-6'>
								<Button
									action={this.addProductToCart}
									label={i18nLabels.ADD_TO_CART}
									ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
									isFullWidth
									hasNoMargin
								/>
							</Col>
						</if>
						<if condition={cta2.text && !productSkus} >
							<Col className='adc-product-card__button col-sm-12 col-lg-6'>
								<Button
									href={cta2.link}
									label={cta2.text}
									ctaStyle={cta2.type}
									target={cta2.action}
									isFullWidth
									hasNoMargin
								/>
								<div className="adc-product-card__disclaimer" dangerouslySetInnerHTML={{__html: cta2.disclaimer}} />
							</Col>
						</if>
						<if condition={undeterminedUomError}>
							<Row>
								<p className={'adc-form-group--error'}><I18n text={undeterminedUomError}/></p>
							</Row>
						</if>
						<div className={`row ${cardError?.[this.getSku()] ? 'd-block ': 'd-none'}`}>
							<p className={'adc-form-group--error'}>
								<I18n text={'magento_error_code_' + errorCodes}/>
							</p>
						</div>
					</Row>
				</div>
			</CardContent>
		</Card>;
	}
}));