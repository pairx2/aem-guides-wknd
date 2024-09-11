

var searchUserurl = searchUserurl;
var searchUserurlOrigin = searchUserurlOrigin;
var retrieveapi = '/quality/api/public/productcatalog/search';


$(document).ready(function(){
    $("#clone-search-btn").click(function(){
        var orderid = document.querySelector("#order-id-search").value;
        $("#order-id-search").parents(".form-group").removeClass("validation-require");
        $(".loader-parent").show();
        $('.search-id-order').find('p').remove();
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
                    var productiD = element.productId;
                    var marketiD = element.availableMarketId;
                    var orderNo = element.orderInfoId;
                    var statusReason = responseVal.response.statusReason;
                        if(orderid <= 2){
                            $(this).parents(".form-group").addClass("validation-require");
                        }
                        if(orderid == 0){
                            $(".form-group").addClass("validation-require");
                            $("#Sorry-msg").hide();
                        }else{
                            $("#clone-cancel-btn").show();
                            $(".search-result-table").show();
                            $(".form-group").removeClass("validation-require");
                            $("#Sorry-msg").hide();
                            $("#clone-cancel-btn").attr("style", "display:inline-block;");
                            $(".search-result-table").show();
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
                                tr.append('<td><a id="clone-product" href="/secure/product/request/clone.html?productId='+productiD+'&orderId='+orderNo+'&marketId='+marketiD+'"productId="'+productiD+'" orderId="'+orderNo+'" marketId="'+marketiD+'">Clone Product</a></td>' );
                            }
                            else{
                                 tr.append('<td></td>').hide();
                            }
                            table.append(tr);

                            $(document).on("focus", "#clone-product", function(e){
                                var productid = $(this).attr("productId");
                                var orderno = $(this).attr("orderId");
                                var marketid = $(this).attr("marketId");
                                localStorage.setItem("productId", productid);
                                localStorage.setItem("orderId", orderno);
                                localStorage.setItem("marketId", marketid);
                                localStorage.setItem("previewType", "Clone");
                            }); 
                        }
                        if(statusReason == '/orderNo'){
                            $(".form-group").addClass("validation-require");
                            $("#Sorry-msg").hide();
                            $("#clone-cancel-btn").hide();
                            $(".search-result-table").hide();
                        }
                        else if(responseVal.errorCode !== 0){
                            $("#Sorry-msg").show();
                        }
                }); 
            },
            error: function(error) {}
        });
    });
});