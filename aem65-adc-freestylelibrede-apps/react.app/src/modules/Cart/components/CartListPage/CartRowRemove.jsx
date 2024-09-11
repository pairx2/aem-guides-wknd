import React from 'react';
import Proptypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import {i18nLabels} from '../../../../utils/translationUtils';
import Link from '../../../Generic/components/Link/Link';

const CartRowRemove = (props) => {
	const {sku, productRemoveWarningHandler} = props;
	//TODO change to i18n
	return (
		<div className="col-lg-6 col-md-2 px-md-0 pt-2 text-right adc-cartlist__delete-text">
			<p className="d-md-none">
				<Link href='#' className="pr-3 pr-md-0" label={i18nLabels.DELETE_PRODUCT} />
			</p>
			<Icon
				image={'trash_blue'}
				onClick={() => productRemoveWarningHandler(sku)}
				className={'adc-cartlist__delete-icon'}
			/>
		</div>
	);
};
CartRowRemove.propTypes = {
	sku: Proptypes.any,
	productRemoveWarningHandler: Proptypes.func
};
export default CartRowRemove;