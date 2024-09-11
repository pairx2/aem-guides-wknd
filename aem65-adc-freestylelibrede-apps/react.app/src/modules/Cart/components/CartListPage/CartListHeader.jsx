import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';

const CartListHeader = (props) => {
	const {
		productColHeading,
		qtyColHeading,
		priceColHeading,
		taxValue
	} = props;
	return (
		<div className="row font-weight-bold border-bottom-grey pb-3 pt-3 d-none d-md-flex">
			<div className="col-md-6 p-0">
				<div className="row">
					<div className="col-md-4"/>
					<div className="col-md-8">{productColHeading}</div>
				</div>
			</div>
			<div className="col-md-3 p-0">{qtyColHeading}</div>
			<div className="col-md-3 pl-md-4 pr-md-0">{priceColHeading}
				<span className="adc-cartlist__price ml-2">
					<I18n text={i18nLabels.INCLUDING_VAT} params={[taxValue]}/>
				</span>
			</div>
		</div>
	);
};
CartListHeader.propTypes = {
	productColHeading: PropTypes.string,
	qtyColHeading: PropTypes.string,
	priceColHeading: PropTypes.string,
	taxValue: PropTypes.string
};
export default CartListHeader;