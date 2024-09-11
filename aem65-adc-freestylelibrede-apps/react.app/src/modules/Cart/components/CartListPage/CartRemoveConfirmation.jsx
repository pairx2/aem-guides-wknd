import React from 'react';
import Icon from '../../../Generic/components/Icon/Icon';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';

const CartRemoveConfirmation = (props) => {
	const {productID, warningText, removeCartItem, cancelDeleteCartItem} = props;
	const remove = () => {
		removeCartItem({itemId: productID});
		cancelDeleteCartItem();
	};
	return (
		<div className="adc-cartlist__remove-list col-md-6 col-sm-12 m-0">
			<div className="row">
				<div className="col-md-8 d-flex align-items-center">
					<span><Icon image={'large-danger'} className="mr-3 mb-2" size={Icon.SIZE.LARGE}/></span>
					<p className="adc-cartlist__remove-list-text mt-1 p-sm-0">
						<I18n text={warningText}/>
					</p>
				</div>
				<div className="adc-cartlist__confirm col-md-4 p-0">
					<Button
						action={remove}
						ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
						size={BUTTON_OPTIONS.SIZE.LARGE}
						label={'ja'}
					/>
					<Button
						action={() => cancelDeleteCartItem()}
						ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
						size={BUTTON_OPTIONS.SIZE.LARGE}
						label={'nein'}
					/>
				</div>
			</div>
		</div>
	);
};
CartRemoveConfirmation.propTypes = {
	productID: PropTypes.number.isRequired,
	removeCartItem: PropTypes.func,
	cancelDeleteCartItem: PropTypes.func,
	warningText: PropTypes.string
};
export default CartRemoveConfirmation;