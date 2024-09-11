import React from "react";
var cartObj = {};
const Product = (props) => {
    const { skuFindRetailer, product, labels, subscription } = props;

    const defaultImageUrl = jQuery('#aem-default-image-url').val();

    function addToCart(e, sku) {
        var addEvent = new CustomEvent("addToCart", {
            detail: {
                sku: sku,
                qty: 1
            }
        });
        window.dispatchEvent(addEvent);
        return;
    }

    const srcImg = ABBOTT.utils.getUrl(product.dam_images ? product.dam_images + labels.imgRendition_319 : defaultImageUrl);
    const lazyImg = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    // Change class if product has special price 
    const specialPriceBox = product.special_price ? "special-price-box" : "";
    const regularPriceBox = product.special_price ? "regular-price-box" : "";

    return (
        <div className="card product-card products col-lg-4 col-md-6 col-6">
            <a className="products__card--figure" href={ABBOTT.utils.getUrl(product.aem_url)}
             onClick={() => { props.setLocalStorageFilters(); ABBOTT.gtm.buildAndPush.clickURL(product, props.index + 1) } }>
                <figure className="text-center figure d-block">
                {props.index <=2 && <img
                        src={srcImg}
                        alt={product.image.label}
                        className="figure-img img-fluid"
                    />
                }
                {props.index >=3 &&
                    <img
                        data-src={srcImg}
                        src={lazyImg}
                        alt={product.image.label}
                        className="figure-img img-fluid"
                    />
                }
                    <figcaption className="figure-caption card-title"
                     dangerouslySetInnerHTML={{ __html: product.meta_title || product.name }}>
                    </figcaption>
                </figure>
            </a>

            { !product.amazon_purchase && 
            <div className={`d-flex justify-content-center align-items-center mb-2 ${product.stockdata.status === 'OUT_OF_STOCK' ? "add-btm-margin-card":""}`}
                data-bv-show="inline_rating"
                data-bv-product-id={product.bazaar_voice}
                data-bv-redirect-url={ABBOTT.utils.getUrl(product.aem_url)}>
            </div> }

            {!product.amazon_purchase && product.stockdata.status !== 'OUT_OF_STOCK' &&
            <div className={"d-flex flex-row justify-content-center align-items-center mb-3"}>
                {!product.special_price &&
                    <div className="price text-center"><span>${product.price.toFixed(2)}</span></div>
                }
                {product.special_price &&
                    <> 
                    <div className={`price text-center ${specialPriceBox}`}><span>${product.special_price.toFixed(2)}</span></div>
                        <div className={`text-center ${regularPriceBox}`}>
                        <p>
                            (<span class="regular-price">{labels.regularPriceLabel} </span>
                                <span className="old-price">${product.price.toFixed(2)} </span>)
                        </p>
                        </div>
                        </>
                }
            </div>
            }

            <div className="d-flex flex-column justify-content-center align-items-center  mb-4 ">

                {!subscription && <>
                    {
                        product.amazon_purchase === 1 &&
                        <a className="btn btn-primary mb-2_938" href={ABBOTT.utils.getUrl(product.aem_url)}>{labels.learnMoreLabel}</a>

                    }
                     {product.order_on_call === 1 &&
                        <a className="btn btn-primary" href={ABBOTT.utils.getUrl(product.aem_url)}>{labels.callToOrderLabel}</a>
                    }
                    {!product.amazon_purchase && !product.order_on_call && <>
                    {product.stockdata.status === 'BACK ORDER' && 
                        <a className="btn btn-primary" onClick={(e) => { addToCart(e, product.sku); }}>{labels.backOrderLabel}</a>
                    }
                    {product.stockdata.status === 'IN_STOCK' && 
                        <a className="btn btn-primary" onClick={(e) => { addToCart(e, product.sku); }}>{labels.addToCartLabel}</a>
                    }
                    {product.stockdata.status === 'OUT_OF_STOCK' && !skuFindRetailer.includes(product.sku) && 
                       <>
                       <a href={ABBOTT.utils.getUrl(labels.retailerURL) + "#sku-" + product.sku} className="btn btn-secondary custom-padding"
                                  data-gtm={`find-retailer|click|${ABBOTT.utils.hyphenWords(product.name)}_find-retailer`}>
                                  {labels.findRetailerLabel}</a>
                    </>
                    }
                    {product.stockdata.status === 'OUT_OF_STOCK' && 
                       <>
                        <div className="text-only text-danger swap-text invisible">{labels.outOfStockLabel}</div>
                    </>
                    }
                     {product.stockdata.status !== 'OUT_OF_STOCK' && !skuFindRetailer.includes(product.sku) &&
                    <a href={ABBOTT.utils.getUrl(labels.retailerURL) + "#sku-" + product.sku} className="text-only "
                    data-gtm={`find-retailer|click|${ABBOTT.utils.hyphenWords(product.name)}_find-retailer`}>
                    {labels.findRetailerLabel}</a>
                     }
                    </>
                    }
                   
                </>
                }
                  {subscription && <>
                    <a className="btn btn-primary" onClick={(e) => { props.onBtnClick(e, product) }}>{labels.selectLabel}</a>
                  </>
                  }
            </div>


        </div>
    )
}

export default Product;
