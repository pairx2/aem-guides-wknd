import React from "react";
import Subscription from './Subscription.jsx';

/**
 * @function
 * @desc Return cart Items to the Minicart
 * @param {object} props 
 */
const CartItem = props => {
  const defaultImageUrl =  jQuery('#aem-default-image-url').val();
  const [quantity, setQuantity] = React.useState(props.cartItem.quantity);

  React.useEffect(() => {
      setQuantity(props.cartItem.quantity);
  }, [props.cartItem.quantity]);

  function deleteItem(e, id) {
    if(!jQuery(e.target).hasClass('disabled')) {
      jQuery('.product-remove').addClass('disabled');
      e.stopPropagation();
      props.deleteItem(id);
    }
  }

  function decreaseCount(e, id, qty) {
    e.stopPropagation();
    showUpdation(e);
    if(qty == 0 ) {
      props.deleteItem(id);
    }
    else {
      props.decreaseCount(id, qty);
    }
  }

  function increaseCount(e, id, qty) {
    e.stopPropagation();
    showUpdation(e);
    props.increaseCount(id, qty);
  }

  function showUpdation(e) {
    jQuery(e.currentTarget.closest('.product-quantity')).addClass('updating');
  }

  /**
   * @function
   * @desc forms PDP and IMAGE url based on current environment set by 
   * @param {String} relativeUrl 
   * @param {Boolean} isPdp  
   * @return {String} formed absolute URL
   */
  function getUrl(relativeUrl) {
    let url = jQuery("#aem-base-url").val() + relativeUrl;
    
    return url;
  }
  function getBackOrder(backorder_status) {
	  console.log("Backorder status::{}",backorder_status)
	  let backorder = "Backorder";
    if(backorder_status === "1") {
		return backorder;
	}
    
    return "";
  }

  const handleUpdateCount = (e, id) => {
    const re = /^[0-9\b]+$/;
    let qty = e.target.value;

    // if value is not blank, then test the regex
    if (qty !== '' || re.test(qty)) {
       e.stopPropagation();
       showUpdation(e);
       if(qty == 0 ) {
        props.deleteItem(id);
       }else {
        props.updateCount(id, qty);
       }
    }else {
        setQuantity('');
    }
  }

  return (
    <li className="abbott-minicart-item">
    <a className="product-image" href={getUrl(props.cartItem.aem_url)} onClick={() => ABBOTT.gtm.buildAndPush.clickURL(props.cartItem.product, props.index + 1, 'Mini Cart Slider')}>
      <img
        src={getUrl((props.cartItem.dam_images ? props.cartItem.dam_images + '/jcr:content/renditions/thumbnail-80x80.png' : defaultImageUrl) )}
        alt={props.cartItem.product.image.label}
      />
    </a>
    <div className="product">
      <a className="product-title" href={getUrl(props.cartItem.aem_url)} onClick={() => ABBOTT.gtm.buildAndPush.clickURL(props.cartItem.product, props.index + 1, 'Mini Cart Slider')}>
      {props.cartItem.product.name}
      </a>
      <em className="product-remove abt-icon-freestyle-delete" onClick={(e) => {deleteItem(e, props.cartItem.id); ABBOTT.gtm.buildAndPush.removeFromCart(props.cartItem);}}></em>
      <span className="product-backorder-label">{getBackOrder(props.cartItem.backorder_status)}</span>
	  <div className={props.cartItem.flavors !== '' ? "product-flavor" : "hidden"}>
	    <span className="product-flavor-label">Flavor:  </span>
	    <span className="product-flavor-text">{props.cartItem.flavors}</span>
	  </div>
	  <div className={props.cartItem.size !== 'false' ? "product-size" : "hidden"}>
	    <span className="product-size-label">Size: </span>
	    <span className="product-size-text">{props.cartItem.size}</span>
	  </div>
      {(props.cartItem.subscription_details) ? <Subscription subscription_details={props.cartItem.subscription_details} key={props.cartItem.id}/> : '' }
      <div className="product-details">
        <span className="product-price">{props.cartItem.prices.price.value.toFixed(2)}</span>
        <div className="product-quantity">
          <em className="quantity-decrease ai-minus-small my-auto" onClick={(e) => decreaseCount(e ,props.cartItem.id, props.cartItem.quantity - 1)}></em>
          <input type="number" className="quantity text-center" value={quantity} name="quantity" onChange={ (e) => handleUpdateCount(e ,props.cartItem.id) } />
          <span className="spinner"></span>
          <em className="quantity-increase ai-plus-small my-auto" onClick={(e) => increaseCount(e, props.cartItem.id, props.cartItem.quantity + 1)}></em>
        </div>
      </div>
    </div>
  </li>
  );
}

export default CartItem;
