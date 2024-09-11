var searchUserurl = searchUserurl;
var searchUserurlOrigin = searchUserurlOrigin;
var retrieveapi = '/quality/api/public/productcatalog/search';

$(document).ready(function(){
    $("#discontinue-search-btn").click(function(){
        var orderid = document.querySelector("#order-id-search").value;
        $("#order-id-search").parents(".form-group").removeClass("validation-require");
        $(".loader-parent").show();
        $(".search-result-table").find("tr").hide();
        $(".search-result-table").find("tr:first-child").show();
        $.ajax({
            url: searchUserurlOrigin + retrieveapi,
            type: "POST",
            dataType: "json",
             contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({ action: 'retrieveproductsforordernumber', orderNo:orderid}),
            "headers": {
                "x-application-id": xApplicationId,
                 "x-country-code": xCountryCode,
                 "x-preferred-language": xPrefLang   
            },
                success: function(responseVal) {
                    var table = $(".search-result-table");
                    $.each( responseVal.response, function( index, element ){
                        $(".loader-parent").hide();

                    var tr = $('<tr/>');
                    var productid = element.productId;
                    var marketid = element.availableMarketId;
                    var orderno = element.orderInfoId;
                        if(orderid <= 2){
                            $(this).parents(".form-group").addClass("validation-require");
                        }
                        if(orderid == 0){
                            $(".form-group").addClass("validation-require");
                            $("#Sorry-msg").hide();
                        }
                        else{
                            $("#clone-cancel-btn").show();
                            $(".search-result-table").show();
                            $(".form-group").removeClass("validation-require");
                            $("#Sorry-msg").hide();
                            $( "#discontinue-product, #justification-discontinue").hide();
                            $("#clone-cancel-btn").show();
                            $( ".search-result-table").show();
                            if(element.orderNumber != undefined){
                                tr.append('<td id="order_id" orderId="'+element.orderNumber+'">' + element.orderNumber + '</td>'); 
                            }
                            else{
                                 tr.append('<td></td>').hide();
                                $("#clone-cancel-btn").hide();
                                $( ".search-result-table").hide();
                            }
                            if( element.productName != undefined){
                                tr.append('<td>' +element.productName+ '</td>');
                            }
                            else{
                                 tr.append('<td></td>').hide();
                            } 
                            if( element.marketName != undefined){
                                tr.append('<td>' +element.marketName+ '</td>');
                            }
                            else{
                                 tr.append('<td></td>').hide();
                            }  
                            if (element.productId != undefined){
                                tr.append('<td><a id="product-discontinue" role="previousproductchangerequest" href="#discontinue-product" orderid="'+orderno+'" productid="'+productid+'" markrtid="'+marketid+'">Discontinue Product</a></td>');
                            }
                            else{
                                 tr.append('<td></td>').hide();
                            }
                            
                            table.append(tr); 
                            
                        }
                        if(responseVal.errorCode !== 0){
                            $("#Sorry-msg").show();
                            $("#clone-cancel-btn").hide();
                            $(".search-result-table").hide();
                        }
                }); 
            },
            error: function(error) {}
        });
    });
    $(document).on("click", "#product-discontinue", function(e){
        $( "#discontinue-product, #justification-discontinue").show();
        $("#clone-cancel-btn").hide();
        $(this).parents("tr").addClass("hide_color");
        var product_id = $(this).attr("productid");
        var order_id = $(this).attr("orderid");
        var market_id = $(this).attr("markrtid");
        var actionRole = $(this).attr("role");
        localStorage.setItem("product", product_id);
        localStorage.setItem("order", order_id);
        localStorage.setItem("market", market_id);
        localStorage.setItem("action", actionRole);
        productDiscontinue();
        afftectedProduct();
    });
    function afftectedProduct(){
        var productid = localStorage.getItem("product");
        var orderid = localStorage.getItem("order");
        var marketid = localStorage.getItem("market");
        var afftectedData = {
            "orderInfoId":orderid,
            "productId":productid,
            "marketId":marketid,
            "action" : "getAffectedPagesForProduct"
        }
         $('.loader-parent').show();
        $.ajax({
			url: searchUserurlOrigin + '/quality/api/private/productcatalog',
			type: "POST",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(afftectedData),
			"headers": {
				"x-application-id": xApplicationId,
                 "x-country-code": xCountryCode,
                 "x-preferred-language": xPrefLang,
				"x-id-token": jwtToken 
            },
			success: function(response) {

                if (response.errorCode == 0 ) {
                    $("#discontinue-product").find("ul a").hide();
                    $.each(response, function(indexURL, elementURL) {
                        var responseGet = elementURL;
                        for(var i=0; i < responseGet.length;i++){
                            $("#discontinue-product").find("ul").append("<a href="+responseGet[i]+">"+responseGet[i]+"</a><br>");
                        }
                    });
                    $('.loader-parent').hide();
                }
			},
			error: function(error) {}
		});

    }
    function productDiscontinue(){
        var action = localStorage.getItem("action");
        var productId = localStorage.getItem("product");
        var discontinueProductData = {
            "action" : action,
            "productId" : productId
        }
        $('.loader-parent').show();
        $.ajax({
			url: searchUserurlOrigin + '/quality/api/private/productcatalog',
			type: "POST",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(discontinueProductData),
			"headers": {
				"x-application-id": xApplicationId,
                 "x-country-code": xCountryCode,
                 "x-preferred-language": xPrefLang,
				"x-id-token": jwtToken
            },
			success: function(response) {
                if (response.errorCode == 0 ) {
                    $('.loader-parent').hide();
                    return response;              
                }
			},
			error: function(error) {}
		});
    }
    $(document).on("click", "#new-submit-btn", function(e){
        if($('input[name="justification"]:checked').length > 0){
            $('input[name="justification"]').parents(".checkbox").removeClass("validation-require");
        }else{
            $('input[name="justification"]').parents(".checkbox").addClass("validation-require");
        }
        var errorCount = 0;
        $("textarea").each(function(){		
            var elmTextRequired = $(this).parents(".a-input-field").attr("data-required");
            if(elmTextRequired == "true"){
                var inTextVal = $(this).val();
                if (inTextVal.length == 0) {
                    $(this).parents('.form-group').addClass('validation-require')
                    $(this).focus();
                    
                    errorCount = errorCount+1;
                }else {
                    $(this).parents('.form-group').removeClass('validation-require')
                    errorCount = errorCount-1;
                }
            } 	
        });
        $("input[type='text']").each(function(){		
            var elmTextRequired = $(this).parents(".a-input-field").attr("data-required");
            if(elmTextRequired == "true"){
                var inTextVal = $(this).val();
                if (inTextVal.length == 0) {
                    $(this).parents('.form-group').addClass('validation-require')
                    $(this).focus();
                    
                    errorCount = errorCount+1;
                }
            } 	
        });
        if(errorCount <= 0){
            disContinueProduct();
        }

    });
    $('input[name="justification"]').click(function(){
        if($('input[name="justification"]:checked').length > 0){
            $('input[name="justification"]').parents(".checkbox").removeClass("validation-require");
        }else{
            $('input[name="justification"]').parents(".checkbox").addClass("validation-require");
        }
    });
     $("textarea").on('blur', function(){
         if(($('textarea').val()).length > 0){
            $('textarea').parents(".form-group").removeClass("validation-require");
        }else{
            $('textarea').parents(".form-group").addClass("validation-require");
        }
     });

    function disContinueProduct(){
        var product_id = localStorage.getItem("product");
        var order_id = localStorage.getItem("order");
        var market_id = localStorage.getItem("market");
        var changeRequestFormData = {
            "confirmationForDiscontinue" : "yes",
            "justification" : $("#justification").val(),
            "goLiveDate" : $("#goLivedate").val(),
            "productId":product_id,
            "orderInfoId":order_id,
            "availableMarketId": market_id,
            "action":"Discontinue",
            "createdby":"1223456"
        }
        $('.loader-parent').show();
        $.ajax({
			url: searchUserurlOrigin + '/quality/api/private/productcatalog',
			type: "POST",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(changeRequestFormData),
			"headers": {
				"x-application-id": xApplicationId,
                 "x-country-code": xCountryCode,
                 "x-preferred-language": xPrefLang,
				"x-id-token": jwtToken
            },
			success: function(response) {
                if (response.errorCode == 0 ) {
                    $('.loader-parent').hide();
                    $('#error-msg').hide();
                    window.location.href = "/secure/product/request/home.html";
                }else{
                    $('.loader-parent').hide();
                    var errorMsg = response.response.statusReason;
                    $('#error-msg').text(errorMsg);
                }
			},
			error: function(error) {}
		});
    }
});
