import React from "react";

const Product = props => {
  const defaultImageUrl =  jQuery('#aem-default-image-url').val();
  let buttonText = "Add to cart";

  function addToCart(e, sku) {
    let data = {
      sku: sku,
      qty: 1
    };

    e.persist();
    ABBOTT.utils.changeCartButtonState(jQuery(e.target));
    jQuery("#abbott-cart-action").attr("data-product", JSON.stringify(data));
	//Trigger BK Tag Event For Abbottstore
    if(ABBOTT.utils.isAbbottStore) {
        bk_addPageCtx('add_to_cart', true);
        bk_addPageCtx('product', sku);
        window.bk_async();
    }
    return;
  }

  /**
   * @function
   * @desc identifies which type of button has to be displayed for this product 
   * @param {Object} product product data
   * @return {String} button type to be displayed for this product
   */
  function getButtonType(product) {
    let buttonType;
    if(product.stockdata.status === 'OUT_OF_STOCK') {
      buttonType = 'out-of-stock';
    } else if(product.stockdata.custom_order_on_call) {
      buttonType = 'order-on-call';
    } else if(product.options && product.options.length && product.options[0].required) {
      buttonType = 'metabolic';
      if(product.stockdata.status === 'BACK ORDER')
        buttonText = "BACK ORDER";
    } else if(product.stockdata.status === 'BACK ORDER') {
      buttonType = 'backorder';
    } else if(product.stockdata.status === 'IN_STOCK') {
      buttonType = 'in-stock';
    }

    return buttonType;
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

  return (
    <div className="row">
      {props.items.map((item, index) => (
        <div className="col-md-4 search-modal-product-cols" key={item.id}>
          <ul className="product-details">
            <li>
              <a href={getUrl(item.aem_url)} onClick={() => { ABBOTT.gtm.buildAndPush.clickURL(item, index, 'Search Modal') }} className="product-details__wrapper">
                <span className="product-details__wrapper--image">
                  <img src={getUrl(item.dam_images ? item.dam_images + '/jcr:content/renditions/thumbnail-80x80.png' : defaultImageUrl)} />
                </span>
                <span className="product-details__wrapper--title">
                  {item.name}
                </span>
                <span className="product-details__wrapper--price">
                  ${ABBOTT.utils.getProductPrice(item)}
                </span>
              </a>

              {getButtonType(item) === 'metabolic' && <a href={getUrl(item.aem_url)} className="btn btn-primary product-details__wrapper--button" onClick={() => { ABBOTT.gtm.buildAndPush.clickURL(item, index, 'Search Modal') }}>{buttonText}</a>}
              {getButtonType(item) === 'order-on-call' && <a href={getUrl(item.aem_url)} className="btn btn-primary product-details__wrapper--button"onClick={() => { ABBOTT.gtm.buildAndPush.clickURL(item, index, 'Search Modal') }}>Call to Order</a>}
              {getButtonType(item) === 'backorder' && <button type="button" className="btn btn-primary product-details__wrapper--button" onClick={(e) => { addToCart(e, item.sku); ABBOTT.gtm.buildAndPush.addToCart(item); }}>BACK ORDER</button>}
              {getButtonType(item) === 'out-of-stock' && <span className="mb-2 pb-1 product-outofstock">OUT OF STOCK</span>}
              {getButtonType(item) === 'in-stock' && <button type="button" className="btn btn-primary product-details__wrapper--button" onClick={(e) => { addToCart(e, item.sku); ABBOTT.gtm.buildAndPush.addToCart(item); }}>Add To Cart</button>}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};
export default Product;
