var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;
var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
var xPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
var retrieveapi = '/quality/api/public/productcatalog/search';   
var i,j=0, marketId, imageDomain, folderCount;
var imageList = [];

if (window.location.href.indexOf("us/en/chromosome-main") > -1) {
    marketId = 1;
    imageDomain = "us";
    folderCount = 13;
} else if (window.location.href.indexOf("int/en/chromosome-main") > -1) {
    marketId = 2;
    imageDomain = "int";
    folderCount = 21;
}
for(i=1; i<=folderCount; i++) {
$.ajax({
    url: "/api/assets/add/molecular/chromosome-probe-images/"+imageDomain+"/probe-image-"+i+".json",
    type: 'GET',
    async: false,
    cache: false,
    success: function(imageslist) {
        imageList.push(imageslist);
    },
    error: function() {
    }
});
}

if ($('input[name="probeimagepath"]').length > 0) {
    var probeimage = $('input[name="probeimagepath"]').val();
}
$(document).ready(function() {
     $('.dynamicChromosome .order-request').hide();

    var probemodal, proberesult, orderresult, chromosomePath;
    if ($('input[name="chromosome_prodinfoid"]').length > 0) {
        var probeid = [];
        $('input[name="chromosome_prodinfoid"]').each(function(probeinfoIndex) {
            probeid.push($(this).val());  
            $(this).parents(".probeID").addClass("probeInfoContainer"+probeinfoIndex);          
        });
        proberesult = probeid;
    }

    if ($('input[name="chromosome_orderinfoid"]').length > 0) {
        var orderinfoId = [];
        $('input[name="chromosome_orderinfoid"]').each(function(orderindex) {
            orderinfoId.push($(this).val());
            $(this).parents(".orderID").addClass("probeOrderContainer"+orderindex);
        });
        orderresult = orderinfoId;
    }
    if(window.location.href.includes('int')){
        chromosomePath = '/int/en/chromosome-main/';
    }
    else{
        chromosomePath = '/us/en/chromosome-main/';
    }

    //Product Info
    $.each(proberesult, function(x, n) {
        var myArray = n.split("__");
        var product_id = myArray[0];
        var probe_id = myArray[1];
        
        $.ajax({
            url: searchUserurlOrigin + retrieveapi,
            type: "POST",
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                action: 'retrieveprobeinfoforproduct',
                productId: product_id,
                marketId: marketId,
                probeId: probe_id
            }),
            "headers": {
                "x-application-id": headerApplicationId,
                "x-country-code": headerCountryCode,
                "x-preferred-language": xPreferredLanguage
            },
            success: function(responseVal) {

                var tablecontainer = $('.probeInfoContainer'+x+' .probecontainer');
                tablecontainer.append($('<h5><b class="probe-product-name" style="text-transform:none;"></b></h5>'));
                var sortted = [];
                let sorrtedArray = [];
                var id = product_id+"-"+probe_id;
                $.each(responseVal, function(index, element) {
                    var chromosomeId;
                    var cytogenicLocation;
                    var chromosomeName;
                    if(index == "response") {
                        if(element.vials.length < 1) {
                            $("input[value="+n+"]").parents(".m-accordion__content-items").hide();
                        } else {
                            $("input[value="+n+"]").parents(".m-accordion__content-items").show();
        					$("input[value="+n+"]").parents(".m-accordion__content-items").attr('data-attr', 'svg' + j);
                			getProberesponse(responseVal);
                            j=j+1;
                        }
                    }
                    $.each(element.vials, function(arrayindexVial, arrayelementVial){
                        sortted.push(arrayelementVial);
                    });
                    if(sortted.length != 0 ){
                        sorrtedArray = sortted.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }));
                    }else{
                        return true;
                    }
                    $.each(sorrtedArray, function(indexVial, elementVial){
                        var table = $('<div class="probeList"><h5 class="vialName"></h5><table border="1"><tr class="th-heading"><td>CHROMOSOME</td><td>CYTOGENIC LOCATION/STS</td><td>PROBE NAME</td> <td>FLUOROPHORE</td><td>PROBE MAP</td></tr></table></div>');
                        var sortedVialArray = elementVial.probes.sort((a, b) => a.chromosome.localeCompare(b.chromosome, 'en', { numeric: true }));
                        $.each(sortedVialArray, function(indexProbe, elemenetProbe){
                            //check image is existing or not
                            if (elemenetProbe.orderInfo != undefined && elemenetProbe.orderInfo.name != undefined) {
                                var probename = elemenetProbe.orderInfo.name;
                                var viewimagePath, imageName, naming, subFolderNum;
                                if(probename.includes("/")){
                                    var name = probename.split("/");
                                    for(var p=1; p<=name.length-1; p++){
                                        naming= name[0].concat(name[p]); 
                                    }
                                    imageName = naming.concat(id)+'.jpg';
                                } else {
                                    imageName = elemenetProbe.orderInfo.name.concat(id)+'.jpg';
                                }
                            }
                            if ((chromosomeId == undefined && cytogenicLocation == undefined && chromosomeName == undefined) || !(chromosomeId === elemenetProbe.chromosome && cytogenicLocation === elemenetProbe.location && chromosomeName === elemenetProbe.orderInfo.name)) {
                                var probemap = false;
                                var tr = $('<tr/>');
                                if (elemenetProbe != undefined) {

                                    if (elemenetProbe.chromosome != undefined) {
                                        tr.append('<td><a href="'+chromosomePath + elemenetProbe.chromosome + '.html">' + elemenetProbe.chromosome + '</a></td>');
                                        chromosomeId = elemenetProbe.chromosome;
                                    }
                                    else {
                                        tr.append('<td></td>');
                                    }
                                    if (elemenetProbe.location != undefined) {
                                        tr.append('<td>' + elemenetProbe.location + '</td>');
                                        cytogenicLocation =  elemenetProbe.location;
                                    } else {
                                        tr.append('<td></td>');
                                    }
                                    if (elemenetProbe.orderInfo != undefined && elemenetProbe.orderInfo.name != undefined) {
                                        tr.append('<td>' + elemenetProbe.orderInfo.name + '</td>');
                                        chromosomeName = elemenetProbe.orderInfo.name;
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
                                    for(i = 0; i < folderCount; i++) {
                                        $.each(imageList[i].entities, function(imageIndex, imageElement){
                                            if(imageElement.properties.name == imageName) {
                                                probemap = true;
                                                subFolderNum = i+1;
                                                if(probename.includes("/")) {
                                                    viewimagePath = '/content/dam/add/molecular/chromosome-probe-images/'+imageDomain+'/probe-image-'+subFolderNum+'/'+naming.concat(id)+'.jpg';
                                                } else {
                                                    viewimagePath = '/content/dam/add/molecular/chromosome-probe-images/'+imageDomain+'/probe-image-'+subFolderNum+'/'+elemenetProbe.orderInfo.name.concat(id)+'.jpg';
                                                }
                                                probemodal = viewimagePath;
                                                tr.append('<td class="probemagnific"><a href="' + probemodal + '"class="carousel-link1"><em class="abt-icon abt-icon-expand"></em><span class="a-link__inner-text">VIEW IMAGE</span></a></td>');
                                            }
                                            if(probemap) {
                                                return false;
                                            }
                                        });
                                    }
                                    if (probemap != true) {
                                        tr.append('<td> n/a</td>');
                                    }
                                }
                            }

                            table.find('table').append(tr);
                            var vialLen = sorrtedArray.length;
                            if(vialLen > 1){
                                table.find('.vialName').text(elementVial.name);
                            }
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
    $.each(orderresult, function(y, n) {
       
        var myArray1 = n.split("__");
        var product_id1 = myArray1[0];
        var probe_id1 = myArray1[1];

        $.ajax({
            url: searchUserurlOrigin + retrieveapi,
            type: "POST",
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                action: 'retrieveallorderinginfoforproduct',
                productId: product_id1,
                marketId: marketId,
                probeId: probe_id1
            }),

            "headers": {
                "x-application-id": headerApplicationId,
                "x-country-code": headerCountryCode,
                "x-preferred-language": xPreferredLanguage

            },
            success: function(responseValorder) {

                var gtinId;
                var ordertablecontainer = $('.probeOrderContainer'+y+' .ordercontainer');
                var ordertable = $('<div class="orderList orderingInfo"><h5 class="ordering-title"></h5><table class="orderinfo-table"><tr><th>UNIT</th><th>ORDER #</th><th>GTIN</th></tr></table></div>');

                var productName = $("input[value="+n+"]").parents(".m-accordion__content-items").find('.m-accordion__title-wrapper h3').html();
                if(responseValorder.response.products.length > 0) {
                    $("input[value="+n+"]").parents(".m-accordion__content-items").show();
                } else {
                    $("input[value="+n+"]").siblings(".ordercontainer").append('<p class="ordering-title">'+productName+' is not available in your market.</p>')
                }

                $.each(responseValorder.response.products, function(orderinnerindex, orderinnerelement) {

                    var sortedArr = responseValorder.response.products[orderinnerindex].orderingInformation.sort((a, b) => a.unitQuantity.localeCompare(b.unitQuantity, 'en', { numeric: true }));

                    $.each(sortedArr, function(orderindex, orderelement) {

                        if ((gtinId == undefined) || (gtinId != orderelement.gtin)) {

                            var tr = $('<tr/>');

                            if (orderelement != undefined) {
                                if (orderelement.unitQuantity != undefined) {
                                   if (responseValorder.response.products.length > 1 || responseValorder.response.products[0].orderingInformation.length > 1) {

                                        tr.append('<td><input type="radio" name="orderRadiobtn" id="order' + orderindex + '" class="inputRadio hidden"/>' + orderelement.unitQuantity + '</td>');
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
                                    gtinId = orderelement.gtin
                                } else {
                                    tr.append('<td></td>');
                                }
                            }
                            ordertable.find('table').append(tr);
                        }

                    });


                    ordertable.find('h5').html(orderinnerelement?.productName);
                    var regulatory = orderinnerelement?.regulatoryStatus;
                    if(regulatory == "NON" || regulatory == undefined){
                        ordertable.find(".ordering-title").append("<span class='lastBrackselement'></span>");
                    }else{
                        ordertable.find(".ordering-title").append("<span class='lastBrackselement'>&nbsp;&nbsp;("+regulatory+")</span>");
                    }
                    ordertablecontainer.append(ordertable);
                    var clonebuttons = $('.order-request:eq(0)').clone();
                    if (ordertable.find('table tr').length > 2) {
					   ordertable.parents('.cmp-container').children('.a-button').addClass('disabled');
						ordertable.parents('.cmp-container').children('.button .m-popup').removeAttr('data-toggle');
                    }
                    clonebuttons.insertAfter(ordertable.find('table')).show();

                    var tableRows = $('input[value='+n+']').siblings(".ordercontainer").find(".orderinfo-table tr");

                    if (tableRows.length > 2) {
                        tableRows.find(".inputRadio").removeClass("hidden");
                    }

                });


            },
            error: function(error) {}
        });

    });

    $(document).on("click", "table input[type='radio']", function(e) {
        $(this).parents('.cmp-container').children('.a-button').removeClass('disabled');
        $(this).parents('.cmp-container').children('.button .m-popup').attr('data-toggle', 'modal');

    });
    $(".orderinfo-table").parent("div").attr("Id", "table-OrderInfo");
	$(document).on("click", ".m-accordion__content-items .button:last-child", function(e) {
		var getorderHeading, tableorderLength, getordernumberDet,chromregstatus,getorderProduct;

       tableorderLength = $(this).parents('.m-accordion__content-items').find(".orderinfo-table").find("tr").length;
	   chromregstatus = $(this).parents('.m-accordion__content-items').find('.orderingInfo .ordering-title').children("span").text(); 
	   getorderHeading = $(this).parents('.m-accordion__content-items').find('.orderingInfo .ordering-title').text();

		if(chromregstatus.length>=1){
			getorderProduct = getorderHeading.slice(0,-chromregstatus.length);
		}
		else{
			getorderProduct = getorderHeading;
		}

	   if(tableorderLength >2){               
			getordernumberDet =$(this).parents('.m-accordion__content-items').find('.orderinfo-table input:checked').parent('td').next().text();

	   }
		else{
			getordernumberDet =$(this).parents('.m-accordion__content-items').find('.orderinfo-table tr td:nth-child(2)').text();
			
		}
        $('.modal #request-form-modal').find('h5').text(getorderProduct);
        $('.modal #request-form-modal').find('h6').find("span").remove();
        $('.modal #request-form-modal').find('h6').append('<span> '+getordernumberDet+'</span>' );
    });

});
