import React from 'react';
import PropTypes from 'prop-types';
import DeleteCartItem from './DeleteCartItem';
import CartRowImage from '../CartRowImage/CartRowImage';
import MiniCartRowInfo from './MiniCartRowInfo';
import MiniCartProductPrice from './MiniCartProductPrice';

const CartListItem = ({id, name, quantity, price, uom, image, pdpLink, isSubscription, deliveryDate, bundle}) => {
	return (
		<div className="cart-header-dropdown-cart-item borderOnMobile">
			<div className="row align-items-center">
				<div className="col-3">
					<CartRowImage
						image={image}
						url={pdpLink}
						name={name}
					/>
				</div>
				<div className="col-4 pl-0 pl-md-3">
					<MiniCartRowInfo
						name={name}
						isSubscription={isSubscription}
						uom={uom}
						quantity={quantity}
						deliveryDate={deliveryDate}
						bundle={bundle}
					/>
				</div>
				<div className="col-4 pl-0 pl-md-3">
					<MiniCartProductPrice
						price={price}
					/>
				</div>
				<div className="col-1 p-0 adc-cartList-left ">
					<span className="c-pointer">
						<DeleteCartItem
							immediateAction='miniCartAction'
							productID={id}
						/>
					</span>
				</div>
			</div>
		</div>
	);
};
CartListItem.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	quantity: PropTypes.number,
	price: PropTypes.number,
	uom: PropTypes.number,
	image: PropTypes.string,
	pdpLink: PropTypes.string,
	isSubscription: PropTypes.bool,
	deliveryDate: PropTypes.string,
	bundle: PropTypes.object
};
export default CartListItem;