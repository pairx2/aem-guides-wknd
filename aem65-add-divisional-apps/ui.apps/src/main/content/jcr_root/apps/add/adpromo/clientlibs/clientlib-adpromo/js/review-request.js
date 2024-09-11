$(document).ready(function(){
    $(document).on("click", "#review-req-change", function(e){
        var type_change = localStorage.getItem("changetype");
        productAddCloneRequest();
        if (type_change != 'Discontinue') {
            setTimeout(function() { 
                pendingProbeInfo()
            }, 1500);
            $("#affected-discontinue").hide();
        }
        else {
            $("#web-change-req").hide();
            $("#product-table").hide();
        }
    });
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    if(filename == 'review.html'){
        var typechange = localStorage.getItem("changetype");
        productAddCloneRequest();
        if (typechange != 'Discontinue') {
            setTimeout(function() { 
                pendingProbeInfo()
            }, 1500);
            $("#affected-discontinue").hide();
        }
        else {
            $("#web-change-req").hide();
            $("#product-table").hide();
        }
    }

    function productAddCloneRequest(){
        var change_id = localStorage.getItem("changeid");
        var productRequest = {
            "action" : "reviewProduct",
            "changeRequestId" : change_id,
        }
         $('.loader-parent').show();
        $.ajax({
            url: searchUserurlOrigin + '/quality/api/private/productcatalog',
            type: "POST",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(productRequest),
            "headers": {
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang,
                "x-id-token": jwtToken 
            },
            success: function(responseVal) {
                var element = responseVal.response;
                var orderTable = $("#order-infotable");
                var tr = $('<tr/>');
                $("#order-info-table h4").append('<h5 style= "padding-top:20px; font-size:16px;"><b>'+element.changeRequest.productName+'</b></h5>');
                if(element.newOrderInfoId == null){
                    $("#order-info-table").hide();
                }else{
                    if(element.newOrderInfoId.unitQuantity != undefined){
                        tr.append('<td>' +element.newOrderInfoId.unitQuantity+ '</td>');
                    }
                    else{
                            tr.append('<td></td>').hide();
                    }
                    if(element.newOrderInfoId.orderNumber != undefined){
                        tr.append('<td>' +element.newOrderInfoId.orderNumber+ '</td>');
                    }
                    else{
                            tr.append('<td></td>').hide();
                    }
                    if(element.newOrderInfoId.gtin != undefined){
                        tr.append('<td>' +element.newOrderInfoId.gtin+ '</td>');
                    }
                    else{
                            tr.append('<td></td>').hide();
                    }
                    orderTable.append(tr);
                }
                var marketid = element.marketId;
                var newProductId = element.changeRequest.new_productFamilyId;
                if(element.changeRequest.new_productFamilyId != undefined){
                    localStorage.setItem("newProductId", newProductId);
                }else{
                    localStorage.setItem("newProductId", '');
                }
                localStorage.setItem("marketid", marketid);
                $.each( element.productListTable, function( indexList, elementListTable ){
                    $.each( elementListTable.products, function( indexListProducts, elementListProducts ){
                        var product = elementListProducts.orderInfoId;
                        localStorage.setItem("orderInfoId", product);
                    });
                });
                $("#productName").val(element.changeRequest.productName);
                $("input[name='submitterName']").val(element.changeRequest.changeInitiatorId);
                $("input[name='changeType']").val(element.changeRequest.changeType);
                $("input[name='dateLastModified']").val(element.changeRequest.submittedDate);
                $("input[name='changeId']").val(element.changeRequest.id);
                $("input[name='justification']").val(element.changeRequest.submissionReason);
                var listTable = element.productListTable;
                var table_Product = $("#product-table");
                $.each( listTable, function( indexList, elementList ){
                    var producttable = $('<div class="product-table"><p class="yellowHighlight">Updates (highlighted in yellow) to product list:</p><h6 class="primary"></h6><h6 class="secondary"></h6><h6 class="disease"></h6><table class="orderinfo-table" id="productinfo-table"><tr><td>PRODUCT</td><td>UNIT</td><td>ORDER NUMBER</td><td>GTIN</td></tr></table></div>');
                    $.each(elementList.products, function( indexProduct, elementProduct ){
                        var row = $('<tr/>');
                        if(elementProduct == null){
                            $(producttable).hide();
                        }else{
                            if(elementProduct.productDisplayName != undefined){
                                row.append('<td>' +elementProduct.productDisplayName+ '</td>');
                            }
                            else{
                                row.append('<td></td>').hide();
                            }
                            if(elementProduct.quantity != undefined){
                                row.append('<td>' +elementProduct.quantity+ '</td>');
                            }
                            else{
                                row.append('<td></td>').hide();
                            }
                            if(elementProduct.orderNumber != undefined){
                                row.append('<td>' +elementProduct.orderNumber+ '</td>');
                            }
                            else{
                                row.append('<td></td>').hide();
                            }
                            if(elementProduct.gtin != undefined){
                                row.append('<td>' +elementProduct.gtin+ '</td>');
                            }
                            else{
                                row.append('<td></td>').hide();
                            }
                            producttable.find("table").append(row);
                        }
                        if(elementList.primaryApplication.name != undefined){
                            producttable.find(".primary").text("Primary Application : " + elementList.primaryApplication.name);
                        }else{
                            producttable.find(".primary").text("Primary Application :" + '');
                        }
                        if(elementList.secondaryApplication.name != undefined){
                            producttable.find(".secondary").text("Secondary Application : " + elementList.secondaryApplication.name);
                        }else{
                            producttable.find(".secondary").text("Secondary Application : " + '');
                        }
                        if(elementList.diseaseStateName != undefined){
                            producttable.find(".disease").text("Disease States : " + elementList.diseaseStateName);
                        }else{
                            producttable.find(".disease").text("Disease States :" + '');
                        }
                        table_Product.find("p").hide();
                        table_Product.append(producttable);
                    });
                });
                $("#affected-discontinue").find("ul a").hide();
                $.each(responseVal, function(indexURL, elementURL) {
                    $.each(elementURL.affectedPages, function(indexPage, elementPage) {
                        $("#affected-discontinue").find("ul").append("<a href="+elementPage+">"+elementPage+"</a><br>");
                    });
                });
                $('.loader-parent').hide();
            },
            error: function(error) {}
        });
    }
    function pendingProbeInfo(){
        var marketiD = localStorage.getItem("marketid");
        var newProductId = localStorage.getItem("newProductId");
        var probeInfoReg = {
            "action": "reviewpendingandliveprobeinfo",
            "productId":newProductId,
            "marketId": marketiD
        }
        $.ajax({
            url: searchUserurlOrigin + '/quality/api/private/productcatalog',
            type: "POST",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(probeInfoReg),
            "headers": {
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang,
                "x-id-token": jwtToken 
            },
            success: function(Data) {
               $.each( Data.response, function( index, element ){
                    var textInfo = $("#probe-order-info");
                    $("#probe-order-info").append('<h6 class="yellowHighlight">The preview is for illustrative purposes only. The layout may differ slightly upon publishing. Please review content for accuracy.</h6>');
                    if(element.regulatoryStatuses == undefined && element.vials == undefined){
                        $("#probe-order-info").hide();
                    }else{
                        textInfo.append("<h6>"+element.regulatoryStatuses+"</h6>","<h5>"+element.familyName+"</h5>");
                        $("#probe-order-info").find("p").hide();
                    }
                    $.each( element.vials, function( indexVial, elementVial ){
                        if(element.vials != undefined){
                            var table = $('<div class="orderList"><h5 class="order-product-name"></h5><table class="orderinfo-table" id="productinfo-table"><tr><td>CHROMOSOME</td><td>CYTOGENIC LOCATION/STS</td><td>PROBE NAME</td><td>FLUOROPHORE</td><td>PROBE MAP</td></tr></table></div>');
                            $.each( elementVial.probe, function( indexProbe, elementProbe ){
                                var tr = $('<tr/>');
                                if(elementProbe.chromosome != undefined){
                                    tr.append('<td>' +elementProbe.chromosome+ '</td>');
                                }
                                else{
                                        tr.append('<td></td>').hide();
                                }
                                if(elementProbe.location != undefined){
                                    tr.append('<td>' +elementProbe.location+ '</td>');
                                }
                                else{
                                        tr.append('<td></td>').hide();
                                }
                                if(elementProbe.name != undefined){
                                    tr.append('<td>' +elementProbe.name+ '</td>');
                                }
                                else{
                                        tr.append('<td></td>').hide();
                                }
                                if(elementProbe.fluorophoreToIndex != undefined){
                                    tr.append('<td><span class="color' +elementProbe.fluorophoreToIndex+ ' fluorophore-image"></span></td>');
                                }
                                else{
                                        tr.append('<td></td>').hide();
                                }
                                tr.append('<td> N/A </td>');
                                table.find("table").append(tr);
                            });
                            table.find('h5').text(elementVial.name);
                            textInfo.append(table);
                            textInfo.find("p").hide();
                        }
                        else{
                            $("#probe-order-info").attr("style", "display:none;");
                        }
                    });
                });
            },
            error: function(error) {}
        });
    } 
});