import React, { useState, useEffect } from "react";
import Subscription from '../Subscription';
import FieldLoader from "../../components/FieldLoader";
import { SvgIcon } from "../../common/common"

/**
 * @function
 * @desc Return cart Items to the Mini cart
 * @param {object} props 
 */
const CartItem = props => {
    const { loader = false } = props;
    const defaultImageUrl = jQuery('#aem-default-image-url').val();
    let gtmProduct = props.cartItem.product;
    gtmProduct.aem_url = props.cartItem.aem_url; 

const superScriptStr =  document.getElementById('super-script-indicators');     
if(props.cartItem.product.meta_title && superScriptStr) {
    const sc=new RegExp("["+superScriptStr.value+"]");
    let output ="";
    const d= props.cartItem.product.meta_title ;
    for(let i =0; i<d.length; i++){
        if(sc.test(d[i])){
            output+='<sup>' +d[i]+'</sup>'
        }else {
            output+=d[i]										
        }
    }
    props.cartItem.product.meta_title =output;    
}

    /**
     * Function to remove cart item
     * @param {event} e 
     * @param {number} id 
     */
    function deleteItem(e, id) {
        e.stopPropagation();
        props.deleteItem(id);
    }
    /**
     * Function to decrease the item quantity
     * @param {event} e 
     * @param {number} id 
     * @param {number} qty 
     */
    function decreaseCount(e, id, qty) {
        e.stopPropagation();
        if (qty == 0) {
            props.deleteItem(id);
        }
        else {
            props.changeCount(id, qty);
        }
    }
    /**
     * Function to increase the item quantity
     * @param {event} e 
     * @param {number} id 
     * @param {number} qty 
     */
    function increaseCount(e, id, qty) {
        e.stopPropagation();
        props.changeCount(id, qty);
    }

    return (
        <li className="minicart-item">
            <a className="product-image" href={ABBOTT.utils.getUrl(props.cartItem.aem_url)} onClick={() => ABBOTT.gtm.buildAndPush.clickURL(gtmProduct, props.index + 1, 'Mini Cart Slider')}>
                <img
                    src={ABBOTT.utils.getUrl((props.cartItem.dam_images ? props.cartItem.dam_images + props.label.imgRendition_80 : defaultImageUrl))}
                    alt={props.cartItem.product.image.label}
                />
            </a>
            <div className="product">
                <a className="product-title" href={ABBOTT.utils.getUrl(props.cartItem.aem_url)} onClick={() => ABBOTT.gtm.buildAndPush.clickURL(gtmProduct, props.index + 1, 'Mini Cart Slider')}
                dangerouslySetInnerHTML={{ __html: props.cartItem.product.meta_title || props.cartItem.product.name }}>
                </a>
                <div class="row">
                    <div class="col-auto mr-auto field-level-loader">{<FieldLoader name={props.cartItem.id} loader={loader} /> || null}</div>
                    <div class="col-auto"><SvgIcon icon="circle-fill-01" className="product-remove" onClick={(e) => { deleteItem(e, props.cartItem.id); ABBOTT.gtm.buildAndPush.removeFromCart(props.cartItem); }} /></div>
                </div>
                {(props.cartItem.subscription_details) ?
                    <Subscription subscription_details={props.cartItem.subscription_details}
                        key={props.cartItem.id} label={props.label} /> : ''}
                <div className="product-details">
                    <div className="product-quantity">
                        <span className="quantity-label">{props.label.quantityLabel} </span>
                        <div className="stepper-control">
                            <span className="sim-icons" data-icon="minus"
                                onClick={(e) => decreaseCount(e, props.cartItem.id, props.cartItem.quantity - 1)}>
                            </span>

                            <input type="number" className="form-control text-center"
                                value={props.cartItem.quantity} readOnly />
                            <span className="sim-icons" data-icon="add"
                                onClick={(e) => increaseCount(e, props.cartItem.id, props.cartItem.quantity + 1)}>
                            </span>
                        </div>
                    </div>
                    <span className="product-price">${props.cartItem.prices.price.value.toFixed(2)}</span>
                </div>
            </div>
        </li>
    );
}

export default React.memo(CartItem);
