function updateSearch(formData) {
	$('.loader-parent').show();
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;  
	formData.headers = {
		'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': 'en-US',
		'Content-Type': 'application/json'
	}
	 var searchBy;
    if($('#searchBy-lotNumber-options').find('.a-dropdown__placeholder').text() == 'LOT NUMBER'){
    	$('#searchBy-lotNumber-options').find('ul li:first-child()').addClass('selected');
        searchBy = $('#searchBy-lotNumber-options').find('ul li.selected span').text();
        sessionStorage.setItem("searchBy", searchBy);
    }else {
		searchBy = $('#searchBy-lotNumber-options').find('ul li.selected span').text();
        sessionStorage.setItem("searchBy", searchBy);
    }
	var lotNumber = $('#lot-number').val().trim();
    sessionStorage.setItem("lotNumber", lotNumber);
    var orderNumber = $('#order-number').val().trim();
    sessionStorage.setItem("orderNumber", orderNumber);
    var productGroup = $('#product-type-options').find('ul li.selected span').text();
	sessionStorage.setItem("productsGroup", productGroup);
		
	$('#document-lang-options').find('ul li').each(function() {
        if($(this).parent('ul').siblings('span.a-dropdown__placeholder').text() == 'ENGLISH') {
            var langcode = 'ENG';
            var mf = [];
            mf.push($(this).attr('data-optionvalue'));
            if (mf.includes(langcode)) {
                $(this).addClass('selected');
            }
        }
        else if($(this).parent('ul').siblings('span.a-dropdown-selected').text() == $(this).find('.selected span').text()){
			$(this).addClass('selected');
        }
	});

    var documentLangauge = $('#document-lang-options').find('ul li.selected').attr('data-optionvalue');
    sessionStorage.setItem("languageCode", documentLangauge);
    if($('#searchBy-lotNumber-options ul.a-dropdown__menu li.selected span').text() == ' LOT NUMBER'){
        if(documentLangauge == 'ENG' && lotNumber != '') {
            formData.body = {
                "filters": [
            {
                "amdlotnumber": lotNumber,
                "amdlanguage": documentLangauge
            }
            ],
            "firstresult": 1,
            "autocorrect": "true",
            "searchtype": "ifu_lot_english_search"
            }
        }else {
			formData.body = {
                "filters": [
            {
                "amdlotnumber": lotNumber,
                "amdlanguage": documentLangauge
            }
            ],
            "firstresult": 1,
            "autocorrect": "true",
            "searchtype": "ifu_search"
            }
        }
    } else if($('#searchBy-lotNumber-options ul.a-dropdown__menu li.selected span').text() == ' ORDER NUMBER'){
        formData.body = {
            "filters": [
        {
            "amdordernumber": orderNumber,
            "amdlanguage": documentLangauge
        }
        ],
        "firstresult": 1,
        "autocorrect": "true",
        "searchtype": "ifu_search"
        }
    } else if($('#searchBy-lotNumber-options ul.a-dropdown__menu li.selected span').text() == ' PRODUCT GROUP'){
        formData.body = {
            "filters": [
            {
                "amdproductgroup": productGroup,
                "amdlanguage": documentLangauge
            }
        ],
        "firstresult": 1,
        "autocorrect": "true",
        "searchtype": "ifu_search"
        }
    }
}

function onSuccessSearch(responseData) {
	$('.loader-parent').hide();
	if (responseData.errorCode == 0) {
		if (responseData.response.totalCount == 0) {
			$('#search-result h3, #search-result p').show();
			$('#search-result table').hide();
		} else {
			$('#search-result h3, #search-result table').show();
			if ($(window).width() < 767) {
				$('#search-result table').css('display', 'block');
			}
			$('#search-result p').hide();
			var recordData = '';
			$('#search-result table tbody').empty();
			$.each(responseData.response.results, function(key, value) {
				recordData += '<tr>';
				recordData += '<td><a class="downloadFile" href="" id="' + value.amdcontrolnumber + '">' + value.amdassayname + ' <em class="abt-icon abt-icon-download"></em></a></td>';
				recordData += '<td><div><b>Lot Number:</b></div><div>' + value.amdlotnumber + '</div><div><b>Lot Expiration Date:</b></div><div>' + value.amdexpirationdate + '</div></td>';
				recordData += '<td>' + value.amdproductgroup + '</td>';
				recordData += '<td>' + value.amdordernumber + '</td>';
				recordData += '<td>' + value.amdcontrolnumber + '</td>';
				recordData += '<td>' + value.amdrevisionnumber + '</td>';
				recordData += '</tr>';
			});
			$('#search-result table').append(recordData);
			
			//pop up according to date
			$.each(responseData.response.results, function(key, valueOfModal) {
                var curr_date  = new Date();
                var fut_date  = valueOfModal.amdexpirationdate;
                if(curr_date > new Date(fut_date)) {
                    $('#ifu-modal, .tooltip-modal').show();
                    return false;
                }
                else{
                    $('#ifu-modal, .tooltip-modal').hide();
                }
            });
		}
	}
}

function onCompleteSearch() {
    var lotNumber = sessionStorage.getItem('lotNumber');
	$('#lot-number').val(lotNumber);

    var orderNumber = sessionStorage.getItem('orderNumber');
	$('#order-number').val(orderNumber);
	if (sessionStorage.getItem('languageCode') != null) {
		var documentLanguageId = sessionStorage.getItem('languageCode');
		var langText;
		$('ul[name="documentlanguage"] li').each(function() {
			var langOption = $(this).attr('data-optionvalue');
			if (langOption == documentLanguageId) {
				$(this).addClass('selected');
				langText = $(this).find('span').text();
			}
		});
		$('#document-lang-options').find('.a-dropdown-selected').text(langText);
	}
	
	if (sessionStorage.getItem('productsGroup') != null) {	
		var productsGroupId = sessionStorage.getItem('productsGroup');	
		var productsText;	
		$('ul[name="ProductGroup"] li').each(function() {	
			var productsOption = $(this).find('span').text();	
			if (productsOption == productsGroupId) {	
				$(this).addClass('selected');	
				productsText = $(this).find('span').text();	
			}	
		});	
		$('#product-type-options').find('.a-dropdown-selected').text(productsText);	
	}

    if (sessionStorage.getItem('searchBy') != null) {
		var searchById = sessionStorage.getItem('searchBy');
		var searchByText;
		$('ul[name="searchby"] li').each(function() {
            if($(this).attr('aria-selected') == 'true'){
			var searchByOption = $(this).find('span').text();
			if (searchByOption == searchById) {
				$(this).addClass('selected');
				searchByText = $(this).find('span').text();
			}
            }
		});
		$('#searchBy-lotNumber-options').find('.a-dropdown-selected').text(searchByText);
	}
}


function UpdateTechincalContactRequest(formData) {
  var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
  var headerApplicationId = document.querySelector('input[name="x-application-id"]').value; 
  var country = $('ul[name="country"] li.selected span:nth-child(1)').html(); 
  var productcategory = $('ul[name="productCategory"] li.selected span:nth-child(1)').html();   
  var instrument = $('ul[name="instrument"] li.selected span:nth-child(1)').html();

formData.headers = {
      'x-country-code': headerCountryCode,
      'x-application-id': headerApplicationId,
      'Content-Type': 'text/plain'
 }
  formData.body = {
      "customerNumber": formData.body.customerNumber,
      "instituteOrLaboratory": formData.body.instituteOrLaboratory,
      "street": formData.body.street,
      "country": country,
      "city": formData.body.city,
      "zipcode": formData.body.zipcode,
      "contactName": formData.body.contactName,
      "phoneNumber": "+91"+formData.body.phoneNumber,
      "emailAddress": formData.body.emailAddress,
      "productCategory": productcategory,
      "productDescription": formData.body.productDescription,
      "lotNumber": formData.body.lotNumber,
      "instrument": instrument,
      "serialNumber": formData.body.serialNumber,
      "requestType": "amdmolecular_contacttechsupport",
  "g-recaptcha-response" : formData.body["g-recaptcha-response"]	
  }
return formData
}

function onSuccessTechnicalContactRequest(formData){
  $("#thankyou-msg").show();
  $("#technical-support-mainpage").hide();
  $(".loader-parent").show();
}
function onCompleteTechnicalContactRequest(fonmData){
  $(".loader-parent").hide();
}