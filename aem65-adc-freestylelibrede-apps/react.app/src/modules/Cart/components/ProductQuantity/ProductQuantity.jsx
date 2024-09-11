import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateProductRequest} from '../../redux/actions/cart.action';
import Icon from '../../../Generic/components/Icon/Icon';

const mapDispatchToProps = {
	updateCartItem: updateProductRequest
};
export default connect(null, mapDispatchToProps)(class ProductQuantity extends Component {
	static defaultProps = {
		isManual: false,
		quantity: false
	};
	static propTypes = {
		quantity: PropTypes.number,
		productId: PropTypes.number,
		updateCartItem: PropTypes.func,
		isManual: PropTypes.bool,
		onDecrement: PropTypes.func,
		onIncrement: PropTypes.func,
		min_sale_qty: PropTypes.number,
		max_sale_qty: PropTypes.number,
		productTemplateType: PropTypes.string
	};
	increment = () => {
		const {productId, quantity, updateCartItem, isManual, onIncrement} = this.props;
		localStorage.setItem('productAdded', true);
		if (isManual) {
			onIncrement();
		} else {
			updateCartItem({id: productId, qty: quantity + 1});
		}
	};

	decrement = () => {
		const {productId, quantity, updateCartItem, isManual, onDecrement} = this.props;
		localStorage.setItem('productDeleted', true);
		if (isManual) {
			onDecrement();
		} else {
			updateCartItem({id: productId, qty: quantity - 1});
		}
	};


	render() {
		const {quantity, min_sale_qty, max_sale_qty, productTemplateType} = this.props;
		const minMaxQty = {
			min: min_sale_qty,
			max: max_sale_qty
		};
		return (
			<>
			<if condition={productTemplateType === "multiproductv2"}>
				<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon1" >
							<Icon image={'minus'} 
								size={Icon.SIZE.SMALLER} 
								className={(quantity <= minMaxQty.min) ? 'svg-image-style disable-svg' : 'svg-image-style'}
								onClick={this.decrement}/>
						</span>
				</div>
				<input type="text" class="form-control" aria-label="Anzahl" placeholder="1" value={quantity}></input>
				<div className="input-group-append">
							<span className="input-group-text" >
								<Icon image={'plus'} 
									size={Icon.SIZE.SMALLER} 
									className={(quantity >= minMaxQty.max) ? 'svg-image-style disable-svg' : 'svg-image-style'}
									onClick={this.increment}/>
							</span>
				</div>
				
			</if>
			<else>
				<div className="adc-cart-input">
					<span>
						<button type="button" disabled={quantity <= minMaxQty.min}
							className="adc-cart-input__cart-button btn btn-number adc-cart-input__cart-button--minus"
							data-type="minus" onClick={this.decrement}>
							<span>{'-'}</span>
						</button>
					</span>
					<input type="text" id="cart-quantity" name="cart-quantity"
						className="adc-cart-input__cart-control text-center align-top" disabled value={quantity} min="1" max="100"/>
					<span className="input-group-btn">
						<button type="button" disabled={quantity >= minMaxQty.max}
							className="adc-cart-input__cart-button btn btn-number adc-cart-input__cart-button--plus"
							data-type="plus" onClick={this.increment}>
							<span>{'+'}</span>
						</button>
					</span>
				</div>
			</else>
			</>
		);
	}
});


