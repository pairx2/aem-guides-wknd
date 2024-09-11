// Get product Sku id in the product card
function GetproductSku(skuIds) {
    jQuery(".card .card-body").each(function() {
        var data = jQuery(this).data();
        if (data.productSku !== "" && data.productSku !== undefined) {
            skuIds = (skuIds ? skuIds + "," : "") + data.productSku;
        }
    });
    return skuIds;
}
function redirectPdpPage() {
    jQuery(".card.product-card .img-wrapper, .card.product-card  .card-title").click(function(e){
        var url = jQuery(this).attr("href");
        var data = jQuery(this).parents(".card.product-card ").find(".card-body").data();
        if (data.productSku !== "" && data.productSku !== undefined) {
            var selectedProduct = ABBOTT.cardProduct.products.filter(function(product) {
                return product.product_sku === data.productSku;
            });
            if(selectedProduct.length > 0){
                selectedProduct[0].aem_url = url;
                ABBOTT.gtm.buildAndPush.clickURL(selectedProduct[0], 0);
                e.preventDefault();
            }
        }
    }); 
}

function productSKU(product) {
    jQuery(".card .card-body").each(function() {
		var D_NONE = "d-none";
        var _data = jQuery(this).data();
		var productSku = _data.productSku.toString();
        if (product.product_sku === productSku) {
            if (product.special_price) {
                jQuery(this).find(".price-value").html(product.special_price);
                jQuery(this).find(".old-price-value").html(product.price);
            } else {
                jQuery(this).find(".price-value").html(product.price);
                jQuery(this).find(".old-price").hide();
            }
			//hide Add-to-Cart for out-of-stock products.
            if (!product.is_in_stock) {
				var inStockDiv = ".people-also-viewed-in-stock-" + productSku;
				var outOfStockDiv = ".people-also-viewed-out-of-stock-" + productSku;
				jQuery(inStockDiv).addClass(D_NONE);
                jQuery(outOfStockDiv).removeClass(D_NONE);
                jQuery(this).find('.price').addClass(D_NONE);
                jQuery(this).find('.old-price').addClass(D_NONE);			
            }			
        }
    });
}

function specialPriceUpdate(data) {
    // Bind the price and special price for each product card
    jQuery.each(data, function(index, value) {
        var product = value;
        productSKU(product)
    });
}

function storNameAjaxFN(ABBOTT, req) {
    ABBOTT.http.makeAjaxCall({
        url: ABBOTT.config.getEndpointUrl("GRAPH_QL"),
        contentType: "application/json",
        data: {
            query: req,
        },
        headers: {
            Store: ABBOTT.config.storeName,
        },
    }).done(function(res) {
        if (res.errors) {
            return;
        }
        // Handle response
        const data = res.data.inventory.products;
        ABBOTT.cardProduct.products = data;      
        ABBOTT.gtm.buildAndPush.listing(ABBOTT.cardProduct.products, 'People Also viewed', 'view_products_list');
        specialPriceUpdate(data);		
    });

}

function cardProductMajorFN(ABBOTT, skuIds) {
    if (jQuery(".card.product-card").length > 0) {
        skuIds = GetproductSku(skuIds);
            // Make graph ql api call with the sku id
        if (skuIds !== "" && skuIds !== undefined) {
            var req = '{' +
                ' inventory(sku: "' + skuIds + '") {' +
                ' products {' +
                ' qty' +
                ' item_id' +
                ' product_sku' +
                ' product_id' +
                ' is_in_stock' +
                ' backorders' +
                ' price' +
                ' group_price' +
                ' special_price' +
                ' product_name' +
                ' product_brand' +
                ' categories' +
                ' forms' +
                ' flavors' +
                ' cases' +
                ' }' +
                ' }' +
                ' }';
            // Make ajax call
            storNameAjaxFN(ABBOTT, req)
        }
    }
}

(function(win) {
    if (!win.ABBOTT) {
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    ABBOTT.cardProduct = (function() {
        var skuIds;
        var products =[];
        cardProductMajorFN(ABBOTT, skuIds);
        redirectPdpPage();
        return {
            products: products
        };
    })();
})(window);


