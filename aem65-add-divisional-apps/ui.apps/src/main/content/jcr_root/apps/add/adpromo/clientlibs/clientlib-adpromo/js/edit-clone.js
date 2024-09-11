$(document).ready(function () {

    var orderInfoId, productId, marketId, previewType;
    var action = "previewExistingProduct";
    var editClonePage;
    previewType = localStorage.getItem("previewType");
    orderInfoId = localStorage.getItem("orderId");
    productId = localStorage.getItem("productId");
    marketId = localStorage.getItem("marketId");

    if (previewType == "Edit"){
        editClonePage = $("#product-page-content-edit").length;
    }
    else{
        editClonePage = $("#product-page-content-clone").length;
    }
    if ( editClonePage > 0) {
        editCloneProduct();
    }
    

    function editCloneProduct(){ 
        
        if (previewType == "Edit") {
            $("#product-name").parents().closest(".fields").addClass("disabled");
            $("#product-name").attr("readonly", "readonly");

            $('#product-type-options').addClass("disabled");
            $('#product-type-options .a-dropdown__field').addClass("disabled");

            
            $('#regulatory-status-options').addClass("disabled");
            $('#regulatory-status-options .a-dropdown__field').addClass("disabled");

            $("#availableMarket-options").addClass("disabled");
            $("#fishProbe-category-options").addClass("disabled");

            $("#availableMarket-options input").attr("disabled","disabled");
            $("#fishProbe-category-options input").attr("disabled","disabled");

            $(".addViral-category .drop-down").addClass("disabled");
            $(".addViral-category .a-dropdown__field").addClass("disabled");

            $("#orderNumber").parents().closest(".fields").addClass("disabled");
            $("#orderNumber").attr("readonly", "readonly");
            $("#gtin").parents().closest(".fields").addClass("disabled");
            $("#gtin").attr("readonly", "readonly");
            
            $(".remove-probe-link").hide();
            $(".remove-vial-link").hide();
            $(".add-probe-btn-container").hide();
            $(".add-viral-btn-container").hide();
        }
          
        $.ajax({
            url: searchUserurlOrigin + '/quality/api/private/productcatalog',
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({ orderInfoId: orderInfoId, productId:productId,marketId:marketId,previewType:previewType,action:action}),
            "headers": {
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang,           
                "x-id-token": jwtToken
            },                    
            success: function(responseVal) {
                var dataResponse = responseVal.response.productChangeRequestForm;
                localStorage.setItem("editVal", dataResponse);
                if (responseVal.errorCode == 0) {
                    $("#product-name").val(dataResponse.product.productName);
                    $("#product-display-name").val(dataResponse.product.productDisplayName);

                    var prodtypeidVal = dataResponse.product.productTypeId;
                    var prodIdText;

                    $('#product-type-options ul li').each(function(){                
                        var prodTypeIdOption = $(this).attr('data-optionvalue');                
                        if(prodTypeIdOption == prodtypeidVal) {
                            $(this).addClass('selected');
                            prodIdText = $(this).find('span').text();                   
                        }
                    });
                    $('#product-type-options').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(prodIdText);

                    // get Application details starts
                    $.each(dataResponse.applicationIds, function(applicationindex, element) {
                        cloneApplication(applicationindex, element);
                    });
                    // get Application details ends

                    var getAvailableMarketId = dataResponse.availableMarketId;
                    var availableMaketVal = $('#availableMarket-options .a-radio__input');
                    commonRadioButton(getAvailableMarketId, availableMaketVal);

                    var regStatusVal = dataResponse.regulatoryStatusId;
                    var regStatusText;

                    $('#regulatory-status-options ul li').each(function(){                
                        var regStatusOption = $(this).attr('data-optionvalue');                
                        if(regStatusOption == regStatusVal) {
                            $(this).addClass('selected');
                            regStatusText = $(this).find('span').text();                   
                        }
                    });
                    $('#regulatory-status-options').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(regStatusText);

                    var getContainProbInfo = dataResponse.containsProbeInformation;
                    if (getContainProbInfo == true) {
                        getContainProbInfo = "true";
                        $("#section-addViral-0").parent().addClass('addVial').show().prev('.a-rule').show();
                        $('#add-viral-btn').show(); 
                        $('.addVial').find('#add-probe-btn').show();
                    }
                    else {
                        getContainProbInfo = "false"
                        $("#section-addViral-0").parent().addClass('addVial').hide().prev('.a-rule').hide();
                        $('.add-product-btn').hide();
                    }
                    var getContainProbInfoVal = $('#fishProbe-category-options .a-radio__input');
                    commonRadioButton(getContainProbInfo, getContainProbInfoVal);

                    //prob value details starts here
                    $.each(dataResponse.probeInformation, function(probindex, element) {                                             
                        cloneProbe(probindex, element);
                    });

                    //prob value details ends here

                    //Product info details.

                    $("#orderNumber").val(dataResponse.productOrderInfo.orderNumber);
                    $("#gtin").val(dataResponse.productOrderInfo.gtin);
                    $("#quantity").val(dataResponse.productOrderInfo.unitQuantity);

                    
                    var getaddToeCommerceInfo = dataResponse.productOrderInfo.ecommerceAvailabilityInd;
                    var getaddToeCommerceInfoVal = $('#addToeCommerce-options .a-radio__input');
                    commonRadioButton(getaddToeCommerceInfo, getaddToeCommerceInfoVal);
                }
                else{                    
                    const str = responseVal.response.statusReason
                    const position = str.search(/product/i);
                    const after_ = str.substring(position);                    
                    localStorage.setItem("errorMsg", "The "+after_);
                    if (previewType == "Clone") {
                        window.location.href = "/secure/product/request/clone/search.html";
                    }
                    else {
                        window.location.href = "/secure/product/request/edit/search.html";
                    }
                    
                }

            }

        });

    }

    function cloneApplication(index,applicationElement){       
        var eventAppCateClone;
        var countAppCategory;        
        countAppCategory = $('.selectApplication-category:visible').length + 1;
        if (index > 0) {
            eventAppCateClone = $('.selectApplication-category:eq(0)').clone().addClass('selectApplication-category');
            eventAppCateClone.find('#remove-appilcationGroup-btn').show();
            eventAppCateClone.find('#application-group-btn').show();
            var newIDattr = $('.selectApplication-category:eq(0)').attr('id');
            var Idreplaced = newIDattr.slice(0, -1) + (countAppCategory - 1);
            eventAppCateClone.attr('id', Idreplaced);
            eventAppCateClone.find(".a-dropdown").removeClass("validation-require");
            eventAppCateClone.find("li").removeClass("itemSelected");
            eventAppCateClone.insertAfter('.selectApplication-category:last');
            $("#application-category"+(index-1)+" #application-group-btn").hide();

        }
        populateSelectedTertiary(index,applicationElement);


    }
    function populateSelectedTertiary(index,applicationElement){  
        var selectedTertiary,selectedSecondary,selectedPrimary,selectedsecondParentKey,selectedprimaryParentKey;      
        $.ajax({
            url: searchUserurlOrigin + '/api/public/lookup/referencedata?language=en&referenceType=diseases',
            type: "GET",
            dataType: "json",
            "headers": {
                "cache-control": 'no-cache',
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang
            },
            contentType: "application/json",
            success: function(data) {
                $("#application-category" + (index) + " ul[name='teritary-application']").empty();                
                $.each(data.response, function(tertiaryindex,valueCard) {                    
                    if (valueCard.key == applicationElement) {
                        selectedTertiary = valueCard.value;
                        selectedsecondParentKey = valueCard.parentKey;                         
                    }                    
                });
                $.each(data.response, function(secondaryindex,valueCard) {
                    if(valueCard.key == selectedsecondParentKey){
                        selectedSecondary = valueCard.value;
                        selectedprimaryParentKey = valueCard.parentKey;
                    }
                    
                });
                $.each(data.response, function(primaryindex,valueCard) {
                    if(valueCard.key == selectedprimaryParentKey){                        
                        selectedPrimary = valueCard.value;                        
                    }
                    
                });
                
                    
                populateTeritary(selectedsecondParentKey,"application-category" + (index));
                populateSecondary(selectedprimaryParentKey,"application-category" + (index));
                populatePrimary();
                $('#application-category'+(index)+' #teritary-application-options').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(selectedTertiary);
                $('#application-category'+(index)+' #teritary-application-options').removeClass('disabled').find('.a-dropdown__menu li').show();

                $('#application-category'+(index)+' #secondary-application-options').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(selectedSecondary);
                $('#application-category'+(index)+' #secondary-application-options').removeClass('disabled').find('.a-dropdown__menu li').show();
                
                $('#application-category'+(index)+' #primary-application-options').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(selectedPrimary);
                $('#application-category'+(index)+' #primary-application-options').removeClass('disabled').find('.a-dropdown__menu li').show();
            },
            error: function(error) {}
        });
        setTimeout(function() {             
            var tertiaryApptext;
            $(".selectApplication-category").each(function (appindex) {
                var catogoryId = $(this).attr("id");
                $('#' + catogoryId + ' #teritary-application-options ul li').each(function(){               
                     
                    var tretiaryAppOption = $(this).find('span').text();               
                    if(tretiaryAppOption == selectedTertiary) {
                        $(this).addClass('selected');
                        tertiaryApptext = tretiaryAppOption;                  
                    }
                }); 
                $('#' + catogoryId + ' #teritary-application-options').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(tertiaryApptext);
                $('#' + catogoryId + ' #teritary-application-options').removeClass('disabled').find('.a-dropdown__menu li').show();               
                
            });
            
            
        }, 4000);

    }
    function cloneProbe(index, probElement){        
        
        var countAddViralCategory, eventAddViralCateClone;
        var probeCount = 0;       
        var probInfo = probElement.probes;
        var probinfoLength = probInfo.length;
        var vialNumber = probElement.vialNumber;
        if (index == 0){

            if (probinfoLength > 1) {
                for ( var i = 0;  i < (probinfoLength-1); i++ ){
                    probeCount = probeCount+1;
                    countAddViralCategory = $('.addViral-category:visible').length + 1;
                    eventAddViralCateClone = $('.addViral-category:eq(0)').clone().addClass('addViral-category');                    
                    eventAddViralCateClone.find('.addViral-category button .add-product-btn').show();
                    eventAddViralCateClone.find('#remove-probe').show();
                    eventAddViralCateClone.find('#add-viral-btn').show();
                    var newProbIDattr = $('.addViral-category:eq(0)').attr('id');
                    var probIdreplaced = newProbIDattr.slice(0, -1) + (countAddViralCategory - 1);
                    eventAddViralCateClone.attr('id', probIdreplaced);
                    eventAddViralCateClone.removeClass("probeData-"+(probeCount-1));
                    eventAddViralCateClone.removeClass("newVial");
                    eventAddViralCateClone.addClass("probeData-"+probeCount);
                    eventAddViralCateClone.addClass("vialCount-"+vialNumber);
                    eventAddViralCateClone.find(".a-dropdown").removeClass("validation-require");
                    eventAddViralCateClone.find("li").removeClass("itemSelected");
                    eventAddViralCateClone.insertAfter('.addViral-category:last');
                }
            }
            $('#addViral-0').find('.add-product-btn').hide();
            for ( var j = 0;  j < probinfoLength; j++ ) {
                
                var chromosomeVal = probInfo[j].chromosome; 
                var selectedChromosome;                
                var probNameId = probInfo[j].productId;                

                $("#addViral-"+j+" .product_count").text(vialNumber);
                $("#addViral-"+j+ " #chromosome-number-options ul li").each(function(){ 
                                       
                    var cromosomeOption = $(this).attr('data-optionvalue');                        
                    if(chromosomeVal == cromosomeOption) {
                        $(this).addClass('selected');
                        selectedChromosome = $(this).find('span').text();                   
                    }
                });
                
                $("#addViral-"+j+ " #chromosome-number-options").find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(selectedChromosome);
                var probContentId = "addViral-"+j; 
                populateProbeOtherVal(probNameId,chromosomeVal,probContentId);
                populateEditProbeNameKey(chromosomeVal,j,probNameId);                           
                   
                
            }

        }
        else{
            
            for ( var m = 0;  m < (probinfoLength); m++ ){
                probeCount = probeCount+1;
                countAddViralCategory = $('.addViral-category:visible').length + 1;
                eventAddViralCateClone = $('.addViral-category:eq(0)').clone().addClass('addViral-category');
                eventAddViralCateClone.find('#remove-vial').show();
                eventAddViralCateClone.find('.addViral-category button .add-product-btn').show();
                eventAddViralCateClone.find('#add-viral-btn').show();
                var newProbVialIDattr = $('.addViral-category:eq(0)').attr('id');
                var probVialIdreplaced = newProbVialIDattr.slice(0, -1) + (countAddViralCategory - 1);
                eventAddViralCateClone.attr('id', probVialIdreplaced);
                eventAddViralCateClone.removeClass("probeData-"+(probeCount-1));
                eventAddViralCateClone.removeClass("newVial");
                eventAddViralCateClone.removeClass("vialCount-1");
                eventAddViralCateClone.addClass("vialCount-"+vialNumber);
                eventAddViralCateClone.addClass("probeData-"+probeCount);
                

                eventAddViralCateClone.find(".a-dropdown").removeClass("validation-require");
                eventAddViralCateClone.find("li").removeClass("itemSelected");
                eventAddViralCateClone.insertAfter('.addViral-category:last');

                $('.addViral-category:last').find('#chromosome-number-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Chromosome');
                $('.addViral-category:last').find('#probeName-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Probe Name');
                $('.addViral-category:last').find('#fluorophore-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select fluorophore');
                $('.addViral-category:last').find('#locus-name-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Locus Name');
                $('.addViral-category:last').find('#probeName-options, #fluorophore-options, #locus-name-options, .probe-loci').addClass('disabled').find('.a-dropdown__menu li').hide();
                $('.addViral-category:last').find('#loci-start').val('');
                $('.addViral-category:last').find('#loci-end').val('');

                var vialProbCount = $('.addViral-category:visible').length-1;
                var chromosomeVAL = probInfo[m].chromosome; 
                var selectedChromosomeprob;                
                var indexProbNameId = probInfo[m].productId;                

                $("#addViral-"+vialProbCount+" .product_count").text(vialNumber);
                $("#addViral-"+vialProbCount+ " #chromosome-number-options ul li").each(function(){ 
                                       
                    var selectCromosomeOption = $(this).attr('data-optionvalue');                        
                    if(chromosomeVAL == selectCromosomeOption) {
                        $(this).addClass('selected');
                        selectedChromosomeprob = $(this).find('span').text();                   
                    }
                });
                
                $("#addViral-"+vialProbCount+ " #chromosome-number-options").find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(selectedChromosomeprob);
                populateProbeNameKey(chromosomeVAL);

                var probvialContentId = "addViral-"+vialProbCount;
                populateProbeOtherVal(indexProbNameId, chromosomeVAL, probvialContentId);
                populateEditProbeNameKey(chromosomeVAL, vialProbCount, indexProbNameId);   
                
            }
            
        }   
        if ($(".addViral-category:visible").length > 1) {
            $('.addViral-category:eq(0) #add-probe-btn' ).hide();
            $('.addViral-category:eq(0) #remove-probe' ).hide();
            $('.addViral-category:last #add-probe-btn' ).show();
            $(".addViral-category").css("border-bottom","1px solid #d9d9d6");
            $(".addViral-category:last").css("border-bottom","none");
        }
        else{
            $('.addViral-category:eq(0) #add-probe-btn').show();
            $(".addViral-category").css("border-bottom","1px solid #d9d9d6");
            $(".addViral-category:last").css("border-bottom","none");
        }     
        
    }
    function populateEditProbeNameKey(selectProbeNameKey,j,probNameId) {      
        
        var selectedProb;
        var probeData = {
            "action": "currentproductsforchromosome",
            "chromosome": selectProbeNameKey
        };
       $(".loader-parent").show();
        $.ajax({
            url: searchUserurlOrigin + '/quality/api/private/productcatalog/search',
            type: "POST",
            data: JSON.stringify(probeData),
            "headers": {
                "cache-control": 'no-cache',
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang,
                "x-id-token": jwtToken
            },
            contentType: "application/json",
            success: function(data) { 
                            
                $("#addViral-"+j+" ul[name='probeName']").empty(); 
                var probeNameLi = '<li data-probeName="new"><span>Create New Probe</span></li>'               
                $.each(data.response, function(index, valueCard) {
                    if (valueCard.chromosome == selectProbeNameKey) {
                        probeNameLi = probeNameLi+'<li data-probeName="' + valueCard.productId + '"><span>' + valueCard.productName + '</span></li>';
                        
                    }
                });
                $("#addViral-"+j+" ul[name='probeName']").append(probeNameLi);
                $("#addViral-"+j+" #probeName-options").removeClass('disabled').find('.a-dropdown__menu li').show();
                
            },            
            error: function(error) {}
        });
        setTimeout(function() { 
            $("#addViral-"+j+ " #probeName-options ul li").each(function(){ 
                            
                var probeNameOptions = $(this).attr('data-probename');                                 
                if(probNameId == probeNameOptions) {
                    $(this).addClass('selected');
                    selectedProb = $(this).find('span').text();                   
                }
            });              
            $("#addViral-"+j+ " #probeName-options").find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(selectedProb);
            $("#addViral-"+j+ " #probeName-options").find('.a-dropdown-selected').text(selectedProb);
            $(".loader-parent").hide();
        }, 15000);
    }

});