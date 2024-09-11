var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;
var retrieveapi = '/quality/api/public/productcatalog/search'; 
$(document).ready(function(){
    if($('input[name="orderinfoid"]').length > 0){
        var orderid = $('input[name="orderinfoid"]').val();
        var result = orderid.split(",");
        var n = 20;
        var results = new Array(Math.ceil(result.length / n)).fill().map(_ => result.splice(0, n));
        var marketid;
        if (window.location.href.indexOf("us/en") > -1) {
            marketid=1;
        }
        else  if (window.location.href.indexOf("int/en") > -1) {
            marketid=2;
        }
        $.each( results , function( e, f ){
            orderid = f;
            $.ajax({
                    url: searchUserurlOrigin + retrieveapi,
                    type: "POST",
                    dataType: "json",
                    async: false,
                    cache: false,
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify({action: 'retreiveorderinfolist',marketId: marketid ,orderNumberIdList: orderid}),
                    "headers": {
                    "x-application-id": "amdmolecularcatalog",
                    "x-country-code": "US",
                    "x-preferred-language": "en_US"
                },
                success: function(responseVal) {        
                    $.each( responseVal.response, function( indexRow, elementRow ){
                        var tr = $('<tr/>');
                        var productName;
                        if (elementRow.productDisplayName != undefined){
                            productName = elementRow.productDisplayName;
                        }
                        else {
                            productName = elementRow.productName;
                        }
                        if (productName){
                            if(elementRow.regulatoryStatus !=undefined && elementRow.regulatoryStatus != "NON")
                            {  
                                tr.append('<td>' + productName + "&nbsp;<strong>("+ elementRow.regulatoryStatus+")</strong></td>");
                            } 
                            else {
                                tr.append('<td>' + productName +'</td>');
                            }
                        }
                        else{
                            tr.append('<td></td>');
                        }
                        if(elementRow.unitQuantity !=undefined){
                            tr.append('<td>' + elementRow.unitQuantity +'</td>');
                        }
                        else{
                            tr.append('<td></td>');
                        }
                        if(elementRow.orderNumber !=undefined){
                            tr.append('<td>' + elementRow.orderNumber +'</td>');
                        }
                        else{
                            tr.append('<td></td>');
                        }
                        if(elementRow.gtin !=undefined){
                            tr.append('<td>' + elementRow.gtin +'</td>');
                        }
                        else{
                            tr.append('<td></td>');
                        }
                        $('.productinfo-table').append(tr);
                    });	
                },
                error: function(error) {}
            });
        });
    }
});