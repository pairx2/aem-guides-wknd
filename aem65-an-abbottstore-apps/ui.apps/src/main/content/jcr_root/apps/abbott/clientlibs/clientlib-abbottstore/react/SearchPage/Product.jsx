import React from "react";

const Product = props => {
  const { product } = props;
  const defaultImageUrl = jQuery('#aem-default-image-url').val();
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
    if (ABBOTT.utils.isAbbottStore) {
      bk_addPageCtx('add_to_cart', true);
      bk_addPageCtx('product', sku);
      window.bk_async();
    }
    return;
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

  /**
   * @function
   * @desc identifies which type of button has to be displayed for this product 
   * @param {Object} productData product data
   * @return {String} button type to be displayed for this product
   */
  function getButtonType(productData) {
    let buttonType;

    if (productData.stockdata.status === 'OUT_OF_STOCK') {
      buttonType = 'out-of-stock';
    } else if (productData.stockdata.custom_order_on_call) {
      buttonType = 'order-on-call';
    } else if (productData.options && productData.options.length && productData.options[0].required) {
      buttonType = 'metabolic';
      if (productData.stockdata.status === 'BACK ORDER')
        buttonText = "BACK ORDER";
    } else if (productData.stockdata.status === 'BACK ORDER') {
      buttonType = 'backorder';
    } else if (productData.stockdata.status === 'IN_STOCK') {
      buttonType = 'in-stock';
    }

    return buttonType;
  }

  return (
    <div className="col-md-4 col-sm-4 col-6 search-page-product__card">
      
        <a href={getUrl(product.aem_url)} className="search-page-product__card--figure" onClick={() => { ABBOTT.gtm.buildAndPush.clickURL(product, props.index + 1, 'Search Page') }}>
          <figure className="text-center figure d-block">
            <img
              src={getUrl(product.dam_images ? product.dam_images + '/jcr:content/renditions/thumbnail-240x300.png' : defaultImageUrl)}
              alt={product.image.label}
              className="figure-img img-fluid"
            />
            <figcaption className="figure-caption">
              {product.name}
            </figcaption>
          </figure>
        </a>

        <div className="search-page-product__card--details text-center">
          {product.product_flavor === "null" ? "" : <p className="product-flavor">{product.product_flavor}</p>}
          {product.case_of_product === "null" ? "" : <p className="product-size-case">{product.case_of_product}</p>}
          <p className="product-price">${ABBOTT.utils.getProductPrice(product)}</p>

          {((ABBOTT.utils.getProductPrice(product) - 0) < product.price) &&
            <p className="product-reg-price"><em>(<small>Regular price</small> <s>${product.price.toFixed(2)}</s>)</em></p>
          }

          {getButtonType(product) === 'metabolic' && <a href={getUrl(product.aem_url)} className="btn btn-primary add-to-cart" onClick={() => { ABBOTT.gtm.buildAndPush.clickURL(product, index, 'Search Page') }}>{buttonText}</a>}
          {getButtonType(product) === 'order-on-call' && <a href={getUrl(product.aem_url)} className="btn btn-primary add-to-cart" onClick={() => { ABBOTT.gtm.buildAndPush.clickURL(product, index, 'Search Page') }}>Call to Order</a>}
          {getButtonType(product) === 'backorder' && <button type="button" className="btn btn-primary add-to-cart" onClick={(e) => { addToCart(e, product.sku); ABBOTT.gtm.buildAndPush.addToCart(product); }}>BACK ORDER</button>}
          {getButtonType(product) === 'out-of-stock' && <button type="button" className="btn btn-primary add-to-cart __disabled">OUT OF STOCK</button>}
          {getButtonType(product) === 'in-stock' && <button type="button" className="btn btn-primary add-to-cart" onClick={(e) => { addToCart(e, product.sku); ABBOTT.gtm.buildAndPush.addToCart(product); }}>{props.labels.labelAddtocart}</button>}

        </div>
     
    </div>
  );
};

export default Product;
