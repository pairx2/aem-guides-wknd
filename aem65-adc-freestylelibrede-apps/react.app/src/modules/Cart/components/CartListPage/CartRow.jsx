import React from 'react';
import {connect} from 'react-redux';
import CartRowImage from '../CartRowImage/CartRowImage';
import CartRowInfo from './CartRowInfo';
import ProductQuantity from '../ProductQuantity/ProductQuantity';
import CartRowPrice from './CartRowPrice';
import CartRowRemove from './CartRowRemove';
import CartRemoveConfirmation from './CartRemoveConfirmation';
import {deleteProductRequest} from '../../redux/actions/cart.action';
import PropTypes from 'prop-types';
import {productQuantityOrders} from '../../../../utils/endpointUrl';


const mapDispatchToProps = {
	removeCartItem: deleteProductRequest
};

const CartRow = ({
					 id,
					 name,
					 price,
					 quantity,
					 pdpLink,
					 sku,
					 uom,
					 image,
					 min_sale_qty,
					 max_sale_qty,
					 qtyOrderMsg,
					 productRemoveWarningHandler,
					 removeMessage,
					 currentProductSku,
					 cancelDeleteCartItem,
					 isSubscription,
					 priceColHeading,
					 removeCartItem,
					 deliveryDate,
					 bundle,
					 qtyColHeading,
					 taxValue
				 }) => {
	const productQuantityMessage = productQuantityOrders()?.products[sku].quantityOrder  ;
	return (
		<div className="row border-bottom-grey py-4">
			<div className="col-md-6 p-0">
				<div className="adc-cartlist__product row">
					<div className="col-4">
						<div className="col-lg-9 p-0 pl-4">
							<CartRowImage
								image={image}
								name={name}
								url={pdpLink}
							/>
						</div>
					</div>
					<CartRowInfo
						name={name}
						uom={uom}
						pdpLink={pdpLink}
						isSubscription={isSubscription}
						deliveryDate={deliveryDate}
						bundle={bundle}
					/>
				</div>
			</div>
			{currentProductSku !== sku ? (<>
				<div className="col-md-3 col-7 offset-5 offset-md-0 mt-2 mt-md-0 px-md-0">
					{!isSubscription && <ProductQuantity
						productId={id}
						quantity={Number(quantity)}
						min_sale_qty={Number(min_sale_qty)}
						max_sale_qty={Number(max_sale_qty)}
						qtyOrderMsg={qtyOrderMsg}
					/>
					}
					<span className="adc-cartlist__product-quantity d-md-block d-none" dangerouslySetInnerHTML={{__html: productQuantityMessage}}/>
				</div>
				<div className="d-md-none">
					<div className="col-5 adc-cartlist__quantity-message">
				       <p className="d-md-none mb-0 adc-cartlist__qty-heading">{qtyColHeading}</p>
					   <span className="adc-cartlist__product-quantity d-block d-md-none" dangerouslySetInnerHTML={{__html: productQuantityMessage}}/>
					</div>
				</div>
				<div className="col-md-3">
					<div className="row">
						<CartRowPrice
							price={price}
							priceColHeading={priceColHeading}
							taxValue={taxValue}
						/>
						<CartRowRemove
							sku={sku}
							productRemoveWarningHandler={productRemoveWarningHandler}
						/>
					</div>
				</div>
			</>
			) : <CartRemoveConfirmation
				productID={id}
				warningText={removeMessage}
				removeCartItem={removeCartItem}
				cancelDeleteCartItem={cancelDeleteCartItem}
			/>
			}
		</div>
	);
};

CartRow.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	price: PropTypes.number,
	quantity: PropTypes.number,
	pdpLink: PropTypes.string,
	sku: PropTypes.string,
	uom: PropTypes.number,
	image: PropTypes.string,
	min_sale_qty: PropTypes.string,
	max_sale_qty: PropTypes.string,
	qtyOrderMsg: PropTypes.string,
	productRemoveWarningHandler: PropTypes.func,
	removeMessage: PropTypes.string,
	currentProductSku: PropTypes.string,
	cancelDeleteCartItem: PropTypes.func,
	isSubscription: PropTypes.bool,
	priceColHeading: PropTypes.string,
	removeCartItem: PropTypes.func,
	deliveryDate: PropTypes.string,
	bundle: PropTypes.object,
	qtyColHeading: PropTypes.string,
	taxValue: PropTypes.string
};
export default connect(null, mapDispatchToProps)(CartRow);
