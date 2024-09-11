var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;

var retrieveapi = '/quality/api/public/productcatalog/search';   

if ($('input[name="probeimagepath"]').length > 0) {
    var probeimage = $('input[name="probeimagepath"]').val();
}
$(document).ready(function() {
    $('.order-request').hide();

    var probemap, probemodal, orderid, proberesult, marketId, orderresult, chromosomePath,imageDomain;
    if ($('input[name="probeinfoid"]').length > 0) {
        var probeid = [];
        $("input[name='probeinfoid']").each(function(probeinfoIndex) {
            probeid.push($(this).val());  
            $(this).parents(".probeorderinfo").addClass("probeInfoContainer"+probeinfoIndex);          
        });
        proberesult = probeid;
        
    }

    if ($('input[name="orderinfoid"]').length > 0) {
        var orderinfoId = [];
        $("input[name='orderinfoid']").each(function(orderindex) {
            orderinfoId.push($(this).val());
            $(this).parents(".probeorderinfo").addClass("probeOrderContainer"+orderindex);
        });
        orderresult = orderinfoId;
    }
    if (window.location.href.indexOf("us/en") > -1) {
        marketId = 1;
        imageDomain = "us";
    } else if (window.location.href.indexOf("int/en") > -1) {
        marketId = 2;
        imageDomain = "int";
    }
    if(window.location.href.includes('int')){
        chromosomePath = '/int/en/chromosome-main/';
    }
    else{
        chromosomePath = '/us/en/chromosome-main/';
    }

    //Product Info
    $.each(proberesult, function(i, n) {

        orderid = n;
        //probe image
        
        $.ajax({
            url: searchUserurlOrigin + retrieveapi,
            type: "POST",
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                action: 'retrieveprobeinfoforproduct',
                productId: orderid,
                marketId: marketId,
                probeId: '0'
            }),
            "headers": {
                "x-application-id": "amdmolecular",
                "x-country-code": "US",
                "x-preferred-language": "en_US"
            },
            success: function(responseVal) {

                var tablecontainer = $('.probeInfoContainer'+i+' .probecontainer');
                tablecontainer.append($('<h5><b class="probe-product-name" style="text-transform:none;"></b></h5>'));
                var sortted = [];
                let sorrtedArray = [];
                $.each(responseVal, function(index, element) {
                    $.each(element.vials, function(arrayindexVial, arrayelementVial){
                        sortted.push(arrayelementVial);
                    });
                    if(sortted.length != 0 ){
                        sorrtedArray = sortted.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }));
                    }else{
                        return true;
                    }
                    $.each(sorrtedArray, function(indexVial, elementVial){
                        var table = $('<div class="probeList"><h5 class="vialName"></h5><table class="productinfo-table"><tr><th>CHROMOSOME</th><th>CYTOGENIC LOCATION/STS</th><th>PROBE NAME</th> <th>FLUOROPHORE</th><th>PROBE MAP</th></tr></table></div>');
                        $.each(elementVial.probes, function(indexProbe, elemenetProbe){
                       //check image is existing or not
                       if (elemenetProbe.orderInfo != undefined && elemenetProbe.orderInfo.name != undefined) {
                        var probename = elemenetProbe.orderInfo.name;
                        var viewimagePath; 
                        if(probename.includes("/")){
                            var name = probename.split("/");
                            for(var p=1; p<=name.length-1; p++){
                                var naming;
                                naming= name[0].concat(name[p]); 
                            }
                            viewimagePath = '/content/dam/add/molecular/probe-images/'+imageDomain+'/'+naming+'.jpg';
                        }else{
                            viewimagePath = '/content/dam/add/molecular/probe-images/'+imageDomain+'/'+elemenetProbe.orderInfo.name+'.jpg';
                        }
                            var image = new Image();
                            image.src = viewimagePath;                                
                            $.ajax({
                                url: image.src,
                                type: 'HEAD',
                                async: false,
                                cache: false,
                                success: function() {                                      
                                    probemap = true;
                                    probemodal = image.src;
                                },
                                error: function() {                                        
                                    probemap = false;
                                }
                            });

                            }                           
                            var tr = $('<tr/>');
                            if (elemenetProbe != undefined) {

                                if (elemenetProbe.chromosome != undefined) {                                    
                                        
                                    tr.append('<td><a href="'+chromosomePath + elemenetProbe.chromosome + '.html">' + elemenetProbe.chromosome + '</a></td>');
                                }   
                                else {
                                    tr.append('<td></td>');
                                }
                                if (elemenetProbe.location != undefined) {
                                    tr.append('<td>' + elemenetProbe.location + '</td>');
                                } else {
                                    tr.append('<td></td>');
                                }
                                if (elemenetProbe.orderInfo != undefined && elemenetProbe.orderInfo.name != undefined) {
                                    tr.append('<td>' + elemenetProbe.orderInfo.name + '</td>');
                                } else {
                                    tr.append('<td></td>');
                                }
                                if (elemenetProbe.orderInfo != undefined && elemenetProbe.orderInfo.flourophoreId != undefined) {
                                    if(elemenetProbe.orderInfo.fluorophoreIds != undefined){
                                        var td = $('<td/>');
                                        $.each(elemenetProbe.orderInfo.fluorophoreIds, function(flueroindex, flueroelement){
                                            td.append('<span class="color' + flueroelement + ' fluorophore-image"></span>');
                                        });
                                        tr.append(td);
                                    }else{
                                        tr.append('<td><span class="color' + elemenetProbe.orderInfo.flourophoreId + ' fluorophore-image"></span></td>');
                                    }                                    
                                } else {
                                    tr.append('<td></td>');
                                }
                                if (probemap) {
                                    tr.append('<td class="probemagnific"><a href="' + probemodal + '"class="carousel-link1"><em class="abt-icon abt-icon-expand"></em><span class="a-link__inner-text">VIEW IMAGE</span></a></td>');                                   
                                } else {
                                    tr.append('<td> n/a</td>');
                                }
                            }

                            table.find('table').append(tr);
                            var vialLen = sorrtedArray.length;
                            if(vialLen > 1){
                                table.find('.vialName').text(elementVial.name);
                            }
                            var probeProdName;
                            if (element.displayName != undefined || element.displayName != null || element.displayName != ''){
                                probeProdName = element.displayName;
                            }
                            else {
                                probeProdName = element.name;
                            }
                            tablecontainer.find('.probe-product-name').text(probeProdName);
                            tablecontainer.append(table);

                        });
                    });
                    return false;
                });

                $('.probemagnific').magnificPopup({
                    delegate: 'a', // child items selector, by clicking on it popup will open
                    type: 'image',
                    mainClass: 'chromosomePopup'
                    // other options
                });

            },
            error: function(error) {}
        });

    });

    //Order Info
    $.each(orderresult, function(i, n) {
        orderid = n;

        $.ajax({
            url: searchUserurlOrigin + retrieveapi,
            type: "POST",
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                action: 'retrieveallorderinginfoforproduct',
                productId: orderid,
                marketId: marketId,
                probeId: '0'
            }),

            "headers": {
                "x-application-id": "amdmolecular",
                "x-country-code": "US",
                "x-preferred-language": "en_US"

            },
            success: function(responseValorder) {

                var ordertablecontainer = $('.probeOrderContainer'+i+' .ordercontainer');

                $.each(responseValorder.response.products, function(orderinnerindex, orderinnerelement) {
                    var ordertable = $('<div class="orderList"><h5 class="order-product-name"></h5><table class="orderinfo-table"><tr><th>UNIT</th><th>ORDER #</th><th>GTIN</th></tr></table></div>');


                    $.each(responseValorder.response.products[orderinnerindex].orderingInformation, function(orderindex, orderelement) {

                        var tr = $('<tr/>');

                        if (orderelement != undefined) {
                            if (orderelement.unitQuantity != undefined) {
                                if (responseValorder.response.products[orderinnerindex].orderingInformation.length > 1) {

                                    tr.append('<td><input type="radio" name="orderRadiobtn" id="order' + orderindex + '"/>' + orderelement.unitQuantity + '</td>');
                                } else {
                                    tr.append('<td>' + orderelement.unitQuantity + '</td>');
                                }
                            } else {
                                tr.append('<td></td>');
                            }
                            if (orderelement.orderNumber != undefined) {
                                tr.append('<td>' + orderelement.orderNumber + '</td>');
                            } else {
                                tr.append('<td></td>');
                            }
                            if (orderelement.gtin != undefined) {
                                tr.append('<td>' + orderelement.gtin + '</td>');
                            } else {
                                tr.append('<td></td>');
                            }
                        }
                        ordertable.find('table').append(tr);

                    });


                    ordertable.find('h5').html(orderinnerelement?.productName);
                    var regulatory = orderinnerelement?.regulatoryStatus;
                    if(regulatory == "NON" || regulatory == undefined){
                        ordertable.find(".order-product-name").append("<span></span>");
                    }else{
                        ordertable.find(".order-product-name").append("<span>("+regulatory+")</span>");
                    }
                    ordertablecontainer.append(ordertable);
                    var clonebuttons = $('.order-request:eq(0)').clone();
                    if (ordertable.find('table tr').length > 2) {
                        clonebuttons.find('.button').addClass('disabled');
                        clonebuttons.find('.button .m-popup').removeAttr('data-toggle');
                    }
                    clonebuttons.insertAfter(ordertable.find('table')).show();


                });


            },
            error: function(error) {}
        });

    });

    $(document).on("click", "table input[type='radio']", function(e) {
        $(this).parents('table').next('.order-request').find('.button').removeClass('disabled');
        $(this).parents('table').next('.order-request').find('.button .m-popup').attr('data-toggle', 'modal');

    });
    $(".orderinfo-table").parent("div").attr("Id", "table-OrderInfo");
    $(document).on("click", "#table-OrderInfo .button", function(e) {
        var tableLength = $(this).parent().prev(".orderinfo-table").find("tr").length;
        var getproductName, getOrderid, regulatoryStatus, getProduct;
        if(tableLength >=2){            
            e.preventDefault();
            var probeName = $("#table-OrderInfo").find(".order-product-name");
            if(probeName.length >= 1){
                getproductName = $(this).parents('.orderList').find('.order-product-name').text();                
                regulatoryStatus = $(this).parents('#table-OrderInfo').find('.order-product-name').children("span").text();                
            }
            else{
                getproductName = $(this).parents('#table-OrderInfo').find('h5:nth-child(2)').text();                
                regulatoryStatus = $(this).parents('#table-OrderInfo').find('h5:nth-child(2)').children("span").text();
            }            
            getOrderid = $(this).parents('#table-OrderInfo').find('.orderinfo-table input:checked').parent('td').next().text();
            if (getOrderid.length < 1) {
                getOrderid = $(this).parents('#table-OrderInfo').find('.orderinfo-table tr td:nth-child(2)').text();
            }            

        }else{
            getproductName = $(this).siblings('.orderingInfo').find('.ordering-title').text();
            regulatoryStatus = $(this).siblings('.orderingInfo').find('.ordering-title').children("span").text();            
            getOrderid = $(this).parents('#table-OrderInfo').find('.orderingInfo input:checked').parent('td').next().text();
            if (getOrderid.length < 1) {
                getOrderid = $(this).parents('#table-OrderInfo').find('.orderingInfo tr td:nth-child(2)').text();
            }            
        }
        if(regulatoryStatus.length>=1){
            getProduct = getproductName.slice(0,-regulatoryStatus.length);
        }
        else{
            getProduct = getproductName;
        }
        $('.modal #request-form-modal').find('h5').text(getProduct);
        $('.modal #request-form-modal').find('h6').find("span").remove();
        $('.modal #request-form-modal').find('h6').append('<span> '+getOrderid+'</span>' );
    });

});