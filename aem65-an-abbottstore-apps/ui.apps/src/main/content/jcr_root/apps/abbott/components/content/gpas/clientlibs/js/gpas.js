jQuery(document).ready(function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParam = urlParams.get('c');

     if (window.location.href.includes('?c=') && queryParam.length > 0) {
		if(window.matchMedia("only screen and (max-width: 760px)").matches || window.matchMedia('(min-width: 768px) and (max-width: 979px)').matches){
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            error();
        }
	} else {
            error();
        }
    } else {
		error();
        }

    function success(position) {
		console.log("Position found");
        var query = 'mutation { processQrCode( input: { code: "' + queryParam + '" lat: "' + position.coords.latitude + '" long: "' + position.coords.longitude + '"  }) { code  , additional_information { hcp { name number } } } }';
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
			if (typeof $.cookie('hcpnumber') !== 'undefined') {
				$.cookie('hcpnumber', '', { expires: -1, path: '/', domain:'.abbottstore.com'});
			}
            if (e.data.processQrCode !== null) {
                jQuery.cookie("qrcode", e.data.processQrCode.code, {
                    path: "/",
                    domain: ".abbottstore.com",
                    secure: !0
                });
                if (e.data.processQrCode.additional_information.hcp !== null) {
				    jQuery.cookie("hcpnumber", e.data.processQrCode.additional_information.hcp.number, {
                    path: "/",
                    domain: ".abbottstore.com",
                    secure: !0
                });
             }
            }
            if (e.errors !== undefined && e.errors[0].message.length > 0) {
                errorMsgDisplay(e.errors[0].message);
                var landingPageUrl = jQuery('#landingUrl').val();
                if(landingPageUrl !== ""){
                    window.location.href = landingPageUrl;
                }else{
                    window.location.href = window.location.origin;
                }
            }
        });
    }

    function error() {
        console.log("No position found");
        var query;
        if(queryParam == null){
           query = 'mutation { processQrCode( input: { code: ""  }) { code  } }';
        } else { 
        query = 'mutation { processQrCode( input: { code: "' + queryParam + '"  }) { code, additional_information { hcp { name number } } } }';
        }

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
			if (typeof $.cookie('hcpnumber') !== 'undefined') {
				$.cookie('hcpnumber', '', { expires: -1, path: '/', domain:'.abbottstore.com'});
			}
            if (e.data.processQrCode !== null) {
                 jQuery.cookie("qrcode", e.data.processQrCode.code, {
                    path: "/",
                    domain: ".abbottstore.com",
                    secure: !0
                });
				if (e.data.processQrCode.additional_information.hcp !== null) {
				jQuery.cookie("hcpnumber", e.data.processQrCode.additional_information.hcp.number, {
                    path: "/",
                    domain: ".abbottstore.com",
                    secure: !0
                });
             }
			}
            if (e.errors !== undefined && e.errors[0].message.length > 0) {
                errorMsgDisplay(e.errors[0].message);
                var landingPageUrl = jQuery('#landingUrl').val();
                if(landingPageUrl !== ""){
                    window.location.href = landingPageUrl;
                }else{
                    window.location.href = window.location.origin;
                }
            }
        });
    }
    function errorMsgDisplay(errorMsg) {
        jQuery.cookie.json = true;
        var errMsg = {
            type: "error",
            message: errorMsg
        }
        jQuery.cookie('abt_msg', errMsg, {
            path: '/',
            domain: ABBOTT.utils.storeDomain
        });
}
});