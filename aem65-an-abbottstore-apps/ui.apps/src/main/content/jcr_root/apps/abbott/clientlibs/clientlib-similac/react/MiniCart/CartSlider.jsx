import React from "react";
import CartItem from "./CartItem.jsx";
import MessageBox from "./MessageBox.jsx";

const CartSlider = props => {
    const [toggleData, settoggleData] = React.useState('');
    const baseUrl = ABBOTT.config.getEndpointUrl('BASE');
    const cartUrl = baseUrl + '/checkout/cart';

    React.useEffect(() => {
        if(props.toggleData === '') {
            props.setCartToggle();
        }
    }, [toggleData]);
    
    function toggleCart(e) {
        e.stopPropagation();
        if(toggleData === '') {
            if(props.toggleData === 'open') {
                props.setCartToggle();
            }
            else {
                settoggleData('open');
            }
        }
        else if(toggleData === 'open'){
            settoggleData('');
        }
    }

    function deleteItem(id) {
        props.deleteItem(id);
    }

    return (
        <div className={(toggleData === 'open' || props.toggleData === 'open') ? 'similac-minicart__wrapper open' : 'similac-minicart__wrapper' }>
            <div className="similac-minicart-trigger" onClick={(e) => toggleCart(e)}>
                <span className="similac-minicart-desc">{props.cartData && props.cartData.items && props.cartData.items.length ? props.cartData.items[0].quantity : 0} item(s) in your cart</span>
                <i className="ai-caret-top"></i>
                <i className="ai-cart-1"></i>
                <i className="ai-delete"></i>
            </div>
            {(props.cartData  && props.cartData.success && props.cartData.success != '') ? <MessageBox cartStatus={props.cartStatus} cartMessage={props.cartData.success}/> : ''}
            <div className="similac-minicart-main">
                <div className="similac-minicart-products list-unstyled">
                    {(props.cartData && props.cartData.items && props.cartData.items.length > 0) ?
                    ( props.cartData.items.map( (item, idx) =>  
                    <CartItem deleteItem={deleteItem} item={item} key={idx} />
                    )) : ''}
                </div>
                <div className="similac-minicart-subtotal">
                    {(props.cartData && props.cartData.items && props.cartData.items.length > 0) ? (
                        <>
                            <span className="minicart-subtotal-total">Total Item</span>
                            <span className="minicart-subtotal-items">{props.cartData.items[0].quantity}</span>
                        </>
                    ) : ''}
                    <span className="minicart-subtotal-label">subtotal</span>
                    <span className="minicart-subtotal-price">${(props.cartData && props.cartData.prices) ? props.cartData.prices.subtotal_excluding_tax.value.toFixed(2) : '0.00'}</span>
                </div>
                <div className="similac-minicart-checkout">
                    <a href={cartUrl} alt="Goto cart" className="goto-cart">
                        <i className="ai-check"></i>VIEW CART
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CartSlider;