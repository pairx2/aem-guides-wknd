jQuery(document).ready(function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParam = urlParams.get('c');

    if (!(jQuery.cookie('wcmmode') == "edit" || jQuery.cookie('wcmmode') == "preview")) {
        if (window.location.href.includes('?c=') && queryParam.length > 0) {
            success();
        } else {
            window.location.href = window.location.origin;
        }
    }

    function success() {
        var query = 'mutation { generateSmartCart(input: {code: "' + queryParam + '"}) { cart_mask_id  } }';
        ABBOTT.http.makeAjaxCall({
            method: "POST",
            url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
            data: JSON.stringify({
                query: ABBOTT.utils.formatGraphQLQuery(query)
            }),
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + ABBOTT.utils.getSessionToken()
            }
        }).done(function(e) {
            if (e.data.generateSmartCart !== null) {
				if (typeof jQuery.cookie('abt_usr') === 'undefined'){
					jQuery.cookie("abt_cartKey", e.data.generateSmartCart.cart_mask_id, {
						path: '/',
						domain: ABBOTT.utils.storeDomain
					});
				}
                var redirectPage = ABBOTT.config.getEndpointUrl('BASE') + '/checkout/cart';
                window.location.href = redirectPage;
            } else {                
                jQuery.cookie.json = true;
                var errMsg = {
                    type: "error",
                    message: e.errors[0].message
                }
                jQuery.cookie('abt_msg', errMsg, {
                    path: '/',
                    domain: ABBOTT.utils.storeDomain
                });
                window.location.href = window.location.origin;
            }
        });
    }
});