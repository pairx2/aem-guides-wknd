import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProductPriceRequest} from '../../redux/actions/get_product_price.action';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../../utils/pricingUtils';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';

const mapStateToProps = state => {
	const {productPrices} = state.productModuleReducer.getProductPricesReducer;
	return {productPrices};
};

const mapDispatchToProps = {
	getProductPrice: getProductPriceRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class SimpleProductPrice extends Component {

	static propTypes = {
		productPrices: PropTypes.object,
		sku: PropTypes.string,
	};
	getSelectedProductData = () => {
		return this.props.productPrices[this.props.sku] || {};
	};

	getProductPrice = () => parseFloat(this.getSelectedProductData()?.price || 0);

	render() {
		return (
			<>
				{this.getSelectedProductData()?.bundle_options?.length?<I18n text={i18nLabels.Monthly}/>:''}{formatPrice(this.getProductPrice())}
			</>
		);
	}
});