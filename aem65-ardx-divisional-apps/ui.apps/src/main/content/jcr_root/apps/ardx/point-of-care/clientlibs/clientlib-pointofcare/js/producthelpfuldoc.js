
let xApplicationId, xCountryCode, xPreferredLanguage;
$(document).ready(function () {
    if ($('#form-product-documents').length > 0) {
        let action = $('#form-product-documents form').attr('action');
        xApplicationId = $('input[name="x-application-id"]').val();
		/*
		 Country-code for 'products' service for helpful documents api  has to be 'US' irrespective of country site,
		 These documents come from a master xml sheet which gets ingested into ESL and the sheet is same for all countries.		 
		*/
        xCountryCode = "US";
        xPreferredLanguage = $('input[name="x-preferred-language"]').val();
		let inputAction = $('#form-product-documents form')?.find('[name="action"]')?.val();
		if (!inputAction) {
			$('#form-product-documents form')?.find('[name="action"]')?.val($('#form-product-documents input[name="requestType"]').val());
		}        
        let dataQuery = $('#google-data-layer')?.find('.product-name')?.attr('data-value');
        let dataAction = $('#form-product-documents form').find('[name="action"]').val();
        let dataCountry = isWWSite ? 'WW' : $('input[name="x-country-code"]').val()        
        let formData = {
            "action": dataAction,
            "country": dataCountry,
            "query": dataQuery
        }
        $.ajax({
            "url": action,
            "method": "POST",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            "headers": {
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPreferredLanguage
            },
            data: JSON.stringify(formData)
        }).then(function (data) {
            let htmlContent = '<div class="helpful-document__product-document-search"><ul>';

            let products = data.response;
            $('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list').html('');
            if(products.length > 0){
                products.forEach(function (product) {
                    htmlContent += `<li><a class="document-link lazy loaded" target="_blank" data-src="${product.hyperLink}" href="${product.hyperLink}">${product.gpocFileName}</a></li>`
                    let appendItem = '<div class="m-search-bar__autocomplete-item d-none" aria-label="' + product.productName + '" aria-selected="false" role="option" data-hyperLink="' + product.hyperLink + '" data-gpocFileName="' + product.gpocFileName + '" data-category="' + product.materialType + '">' + product.productName + '</div>'
                    $('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list').append(appendItem);
                });
    
                htmlContent += '</ul></div>'
    
                $('#product-documents .cmp-accordion__panel').append(htmlContent);

                $('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list').append('<div class="no-result d-none">No results</div>');
                        let appendText = '<div class="missing-search-terms d-none"><p>Missing search terms</p></div><div class="no-match-result d-none"><p>No results found</p></div>';
                        $('#product-searchbar-container .search__heading').append(appendText);

            }
            else{
                document.querySelectorAll('#product-documents').forEach(function(pd){
                    pd.remove();
                })
            }
            
        }).fail(function () {
        });
        $("#product-searchbar-container .m-search-bar__input-field").on("keyup", function(e){
                e.stopPropagation();
                e.preventDefault();

            });
        	$("#product-searchbar-container .m-search-bar__close").on('click', function() {
        		$("#product-searchbar-container .m-search-bar__input-field").trigger('change');
        	});
    }
});