import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProductPriceRequest} from '../../Product/redux/actions/get_product_price.action';
import {Title} from '../../Generic/components/Title/Title.jsx';
import ProductPrice from '../../Product/components/ProductPrice/ProductPrice.jsx';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
	const {productPrices} = state.productModuleReducer.getProductPricesReducer;
	return {productPrices};
};

const mapDispatchToProps = {
	getProductPrice: getProductPriceRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(class BannerProduct extends Component {

	static propTypes = {
		getProductPrice: PropTypes.func,
		productSku: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		productPrices: PropTypes.object,
		headingType: PropTypes.string,
		headingTextColor: PropTypes.string,
		subHeading: PropTypes.string,
		subHeadingType: PropTypes.string,
		subHeadingTextColor: PropTypes.string,
		productFrequency: PropTypes.string,
		productImage: PropTypes.string,
	};

	componentDidMount() {
		const {getProductPrice, productSku} = this.props;
		productSku && getProductPrice(productSku);
	}

	getProductPrice = () => parseFloat(this.props.productPrices?.[this.props.productSku]?.price || 0);

	render() {
		const {title, children, description, headingType, headingTextColor, subHeading, subHeadingType, productFrequency, subHeadingTextColor, productImage} = this.props;
		const productPrice = this.getProductPrice();
		return (
			<div className={'adc-banner-product' + (` ${this.props.className || ''}`)}>
				<img className="adc-banner-halfBleedImage--img lazyload d-block d-md-none" data-src={productImage} />
				<Title text={title} size={headingType} color={headingTextColor} />
				{subHeading && <Title text={subHeading} size={subHeadingType} color={subHeadingTextColor} />}
				<div className="adc-banner-product__desc" dangerouslySetInnerHTML={{__html: description}}/>
				<div className="adc-banner-product__price adc-price-detail d-flex">
					<if condition= {productPrice}>
						<ProductPrice price={productPrice} hasReference/>
					</if>
					<span className='pl-2' dangerouslySetInnerHTML={{__html: productFrequency}}/>
				</div>
				{children}
			</div>
		);
	}
});
