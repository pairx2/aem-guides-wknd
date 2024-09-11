function customRadio(radioName) {
	var radioButton = $('input[name="' + radioName + '"]');
	$(radioButton).each(function() {
		if ($(this).is(':checked')) {
			$(this).addClass("selected");
		}
	});
	$(radioButton).click(function() {
		if ($(this).is(':checked')) {
			$(this).addClass("selected");
		}
		$(radioButton).not(this).each(function() {
			$(this).removeClass("selected");
		});
	});
}

$(document).ready(function () {

    customRadio("availableMarket");
    customRadio("fishProbe-category");
    customRadio("addToeCommerce");

    var action;
    var prevOrderInfoId;
    var prevProductId;
    var prevMarketId; 
    var addPageurl = window.location.pathname;
    var adddUrl = addPageurl.substring(addPageurl.lastIndexOf('/')+1);	
    if(adddUrl == 'create.html' ){
        action = "Add";
        prevOrderInfoId = null;
        prevProductId = null;
        prevMarketId = null;
    }
    else{
        action = localStorage.getItem("previewType");
        prevOrderInfoId = localStorage.getItem("orderId");
        prevProductId = localStorage.getItem("productId");
        prevMarketId = localStorage.getItem("marketId");
    }

    $(document).on("click", "#product-create-btn", function(e) {		
        continueNewProduct();
	});


    function continueNewProduct()
    {
        var errorCount = 0; 
        var probInfoVal = $('input[name="fishProbe-category"].selected').val();
        if (probInfoVal == "true"){
            probInfoVal = true;                
        }
        else{
            probInfoVal = false;
        }       
        $('input[type=text]').each(function(){                    
            var elmRequired = $(this).parents(".a-input-field").attr("data-required");
            if(elmRequired == "true"){
                var inVal = $(this).val();
                if (inVal.length == 0) {
                    $(this).parents('.form-group').addClass('validation-require')
                    $(this).focus();
                    
                    errorCount = errorCount+1;
                }
                var elmId = $(this).attr("id");
                if(elmId == "create-new-probe"){
                    if(probInfoVal == true){
                        if($("#"+elmId+":visible").length == 0){
                            $(this).parents('.form-group').removeClass('validation-require')                                                
                            errorCount = errorCount-1;
                        }
                        else{
                            if($(this).val().length == 0){
                                $(this).parents('.form-group').addClass('validation-require')
                                $(this).focus();                        
                                errorCount = errorCount+1;
                            }
                        }
                        
                    } 
                    else{
                        $(this).parents('.form-group').removeClass('validation-require')
                                                
                        errorCount = errorCount-1;
                    }                   
                    
                }  
            }            
        }); 
        $("textarea").each(function(){		
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
        
        var availMarketSelect = $('input[name="availableMarket"]').hasClass("selected");
        if(!availMarketSelect){
           
            $('input[name="availableMarket"]').parents('fieldset').addClass('validation-require')
            $('input[name="availableMarket"]').focus();
            errorCount = errorCount+1;
        }
        var addToecomSelect = $('input[name="addToeCommerce"]').hasClass("selected")
        if(!addToecomSelect){
           
            $('input[name="addToeCommerce"]').parents('fieldset').addClass('validation-require')
            $('input[name="addToeCommerce"]').focus();
            errorCount = errorCount+1;
        }
        $(".a-dropdown__field").each(function(){		
            if($(this).find(".a-dropdown-selected").length<=0){
                $(this).parents('.a-dropdown').addClass('validation-require');
                $(this).focus();
                errorCount =errorCount+1;
            }	
        });
        if (probInfoVal == true){
            $(".addViral-category .a-dropdown__field").each(function(){	                
                if($(this).find(".a-dropdown-selected").length<=0){
                    $(this).parents('.a-dropdown').addClass('validation-require');
                    $(this).focus();
                    errorCount = errorCount+1;
                }	
            });               
        }
        else{
            $(".addViral-category .a-dropdown__field").each(function(){	                
                if($(this).find(".a-dropdown-selected").length<=0){
                    $(this).parents('.a-dropdown').removeClass('validation-require');                    
                    errorCount = errorCount-1;
                }	
            });          
            
        }

        if(errorCount <= 0){            
            var probInfo = {};
            var probItems = [];
            var probVialData = [];
            var mutipleProb = false;        
            var applicationId = [];
            $(".selectApplication-category").each(function (index) {
                var catogoryId = $(this).attr("id");
                
                applicationId.push($("#" + catogoryId + " #teritary-application-options ul").find("li.selected").attr("data-teritaryapp"));
            });
            
            if (probInfoVal == true) {
                
                $(".addViral-category").each(function (index) {
                    var sectionId = $(this).attr("id");
                    probInfo.vialNumber = $("#" + sectionId + " .product_count").text();
                    
                    var chromosomeVal = $("#" + sectionId + " #chromosome-number-options ul").find("li.selected").attr("data-optionvalue");
                    var fluorophoreId = $("#" + sectionId + " #fluorophore-options ul").find("li.selected").attr("data-optionvalue");
                    var locusName = $("#" + sectionId + " #locus-name-options ul").find("li.selected").attr("data-locusname");
                    var lociStart = $("#" + sectionId + " #loci-start").val();
                    var lociEnd = $("#" + sectionId + " #loci-end").val();
                    var productName = $("#" + sectionId + " #probeName-options ul").find("li.selected span").text();
                    var productId = $("#" + sectionId + " #probeName-options ul").find("li.selected").attr("data-probename");
                    if (productId == "new") {
                        productName = $("#" + sectionId + " #create-new-probe").text();
                    }               

                    probInfo.probes = {"chromosome":chromosomeVal,"fluorophoreId": fluorophoreId,"locusName": locusName,"lociStart": lociStart,"lociEnd": lociEnd,"productName": productName,"productId": productId} ;
                
                    probItems.push({
                        ...probInfo
                    });
                });    
                if (probItems.length > 1) {
                    mutipleProb = true;
                }                
                probVialData = probItems.reduce(function(newarr, cur) {                
                    // Get the index of the key-value pair.
                    var occurs = newarr.reduce(function(n, item, i) {
                    return (item.vialNumber === cur.vialNumber) ? i : n;
                    }, -1);
                
                    // If the name is found,
                    if (occurs >= 0) {              
                    // append the current value to its list of values.
                    newarr[occurs].probes = newarr[occurs].probes.concat(cur.probes);              
                    // Otherwise,
                    } else {              
                    // add the current item to o (but make sure the value is an array).
                    var obj = {
                        vialNumber: cur.vialNumber,
                        probes: [cur.probes]
                    };
                    newarr = newarr.concat([obj]);
                    }
                
                    return newarr;
                }, []);
                
            }
            var changeRequestFormData = {
                "productChangeRequestForm": {
                    "product": {
                        "productName": $("#product-name").val(),
                        "productDisplayName": $("#product-display-name").val(),
                        "productTypeId": $('#product-type-options ul').find("li.selected").attr("data-optionvalue")
                    },
                    "applicationIds": applicationId,
                    "availableMarketId": $('input[name="availableMarket"].selected').val(),
                    "regulatoryStatusId": $('#regulatory-status-options ul').find("li.selected").attr("data-optionvalue"),
                    "probeInformation":probVialData,
                    "productOrderInfo": {
                    "orderNumber": $("#orderNumber").val(),
                    "gtin": $("#gtin").val(),
                    "ecommerceAvailabilityInd": $('input[name="addToeCommerce"].selected').val(),
                    "unitQuantity": $('#quantity').val()
                    },
                    "containsProbeInformation": probInfoVal,
                    "containsMultipleProbes": mutipleProb                 
                },
                "justification": $("#justification").val(),
                "goLiveDate": $("#goLive").val(),
                "previousProductId": prevProductId,
                "previousOrderId": prevOrderInfoId,
                "previousMarketId": prevMarketId,
                "action": action
            }    
            $(".loader-parent").show();
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
                success: function (response) {
                    $(".loader-parent").hide();
                    if (response.errorCode == 0 ) {
                        window.location.href = "/secure/product/request/home.html";

                    }
                    else{
                        $("#Sorry-msg").show();
                        $("#Sorry-msg p").hide();
                        $('#Sorry-msg').find('span').remove();
                        $("#Sorry-msg").append("<span style='color: red !important;margin-bottom: 0;font-family: inherit;font-size: 1rem !important;text-align:right;'>"+response.response.statusReason+"</span>");	
                
            
                    }                                                   
                },
                error: function(error) {}
            });

        }     
    }
});