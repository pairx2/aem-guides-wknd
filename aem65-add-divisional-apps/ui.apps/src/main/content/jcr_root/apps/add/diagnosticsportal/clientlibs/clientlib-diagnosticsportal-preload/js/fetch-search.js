function updateSearch(formData) {
	$('#btn-mobile-searchOption-modal, #btn-mobile-intructionforuse-modal, #btn-mobile-calibration-modal, #operations-mobile-searchOption-modal, #btn-mobile-controlFiles-modal, #certification-mobile-searchOption-modal, #btn-mobile-customerSupport-modal').hide();
	$('.modal-backdrop').remove();
	$('body').removeClass('modal-open');
	$('<div class="tableloader"><em class="abt-icon abt-icon-spinner"></em></div>').insertAfter('.loader');
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

	var productName = '';
	if ($(window).width() > 767) {
		productName = $('#product-name').val();

	} else if ($(window).width() <= 767) {
		productName = $('#product-name-mob').val();
	}
    sessionStorage.setItem("productName", productName);

	var listNumberId = '';
	if ($(window).width() > 767) {
		listNumberId = $('#list-name').val();

	} else if ($(window).width() <= 767) {
		listNumberId = $('#list-name-mob').val();
	}
    sessionStorage.setItem("listNumberId", listNumberId);

	var documentLanguage = '';
	if ($(window).width() > 767) {
		documentLanguage = $('#document-lang-options').find('ul li.selected').attr('data-optionvalue');

	} else if ($(window).width() <= 767) {
		documentLanguage = $('#document-lang-mob-options').find('ul li.selected').attr('data-optionvalue');
	}
    sessionStorage.setItem("languageCode", documentLanguage);

	var insertTypeId = '';
	if ($(window).width() > 767) {
		insertTypeId = $('#insert-type-options').find('ul li.selected').attr('data-optionvalue');

	} else if ($(window).width() <= 767) {
		insertTypeId = $('#insert-type-mob-options').find('ul li.selected').attr('data-optionvalue');
	}
    sessionStorage.setItem("insertTypeCode", insertTypeId);

	var assertDescrip = '';
	if ($(window).width() > 767) {
		assertDescrip = $('#assert-description-options').find('ul li.selected').attr('data-optionvalue');

	} else if ($(window).width() <= 767) {
		assertDescrip = $('#assert-description-mob-options').find('ul li.selected').attr('data-optionvalue');
	}
    sessionStorage.setItem("assertDescCode", assertDescrip);

	var productDrop = '';
	if ($(window).width() > 767) {
		productDrop = $('#product-dropdown-options').find('ul li.selected').attr('data-optionvalue');

	} else if ($(window).width() <= 767) {
		productDrop = $('#product-dropdown-mob-options').find('ul li.selected').attr('data-optionvalue');
	}
    sessionStorage.setItem("productDropCode", productDrop);

	var countryOPtionId = '';
	if ($(window).width() > 767) {
		countryOPtionId = $('#country-options').find('ul li.selected').attr('data-optionvalue');

	} else if ($(window).width() <= 767) {
		countryOPtionId = $('#country-mob-options').find('ul li.selected').attr('data-optionvalue');
	}
    sessionStorage.setItem("countrycode", countryOPtionId);

	var lotNumber = '';
	if ($(window).width() > 767) {
		lotNumber = $('#lot-number').val();

	} else if ($(window).width() <= 767) {
		lotNumber = $('#lot-number-mob').val();
	}
    sessionStorage.setItem("lotNumber", lotNumber);

	var listNumber = '';
	if ($(window).width() > 767) {
		listNumber = $('#list-number').val();

	} else if ($(window).width() <= 767) {
		listNumber = $('#list-number-mob').val();
	}
    sessionStorage.setItem("listNumber", listNumber);

	var sortby = '';
	const token = getCookie('id.token');

	if ($('#form-radio-option').find('.radio-custome-after').attr('aria-labelledby') == 'LotNumber') {
		sortby = 'LotNumber';
	} else if ($('#form-radio-option1').find('.radio-custome-after').attr('aria-labelledby') == 'ListNumber') {
		sortby = 'ListNumber';
	}
    sessionStorage.setItem("sortby", sortby);

	formData.headers = {
		'x-preferred-language': 'en_US',
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		"x-id-token": token,
		'Content-Type': 'application/json'
	}

	if ($('#applicationPackage-card0').attr('id') == 'applicationPackage-card0') {
		formData.body = {
			"country": countryOPtionId,
			"languagecode": documentLanguage,
			"listnumber": listNumberId,
			"productname": productName,
			"pagenumber": 1,
			"searchtype": "appinsertsearch"
		}
	} else if ($('#calibrationFiles-card0').attr('id') == 'calibrationFiles-card0') {
		formData.body = {
			"lotnumber": lotNumber,
			"listnumber": listNumber,
			"productname": productName,
			"sortby": sortby,
			"pagenumber": 1,
			"searchtype": "calibratorsearch"
		}
	} else if ($('#intructionforuse-card0').attr('id') == 'intructionforuse-card0') {
		formData.body = {
			"country": countryOPtionId,
			"languagecode": documentLanguage,
			"lotnumber": lotNumber,
			"listnumber": listNumber,
			"productname": productName,
			"inserttypeid": insertTypeId,
			"sortby": sortby,
			"pagenumber": 1,
			"searchtype": "ifuinsertsearch"
		}
	} else if ($('#controlFiles-card0').attr('id') == 'controlFiles-card0') {
		formData.body = {
			"lotnumber": lotNumber,
			"listnumber": listNumber,
			"productname": productName,
			"sortby": sortby,
			"pagenumber": 1,
			"searchtype": "controlsearch"
		}
	} else if ($('#operations-manuals-card0').attr('id') == 'operations-manuals-card0') {
		formData.body = {
            "searchtype": "opsmanual",
			"language": documentLanguage,
			"listNumber": listNumberId

		}
	} else if ($('#cutomer-support-card0').attr('id') == 'cutomer-support-card0') {
		formData.body = {
			"language": documentLanguage,
			"assetDesc": assertDescrip,
			"products": productDrop,
			"searchtype": "customersupportmaterials"
		}
	} else if ($('#certificationOA-card0').attr('id') == 'certificationOA-card0') {
		formData.body = {
			"lotnumber": lotNumber,
			"searchtype": "lotnumbersearch"
		}
	}


}

function onErrorCOASearch(data){
    if (data.response.statusReason == 'No records found') {
        $('#error-no-result').show();
       	$('#certificationOA-card0, #no-result, .tableloader, .o-form-container__error-msg, #error-COA-lotNumber').hide();
    }else {
		$('#certificationOA-card0, #no-result, .tableloader, .o-form-container__error-msg, #error-no-result').hide();
    	$('#error-COA-lotNumber').show();
    }
}

function onSuccessCOASearch(data) {
	$('.selectList-application:eq(0)').find('#search-COAtitle-text p strong').text(' ');
	$('.selectList-application:eq(0)').find('#lot-COAnumber-text p span').text(' ');
    $('.selectList-application:eq(0)').find('#techLib-download b').text(' ');

	if (data.response.approvalDate != undefined) {

		$(".tableloader, .o-form-container__success-msg, #error-no-result, #error-COA-lotNumber").hide();
		$('.selectList-application:eq(0), #sortedList').show();
		$('#no-result').css('display', 'none');

		 $('.selectList-application:eq(0)').find('#search-COAtitle-text').attr('name', 'search-title-text1');
	$('.selectList-application:eq(0)').find('#search-COAtitle-text').each(function() {
		$(this).find('p strong').text(data.response.fileSize);
	});

	$('.selectList-application:eq(0)').find('#lot-COAnumber-text').attr('name', 'lot-number-text');
        $('.selectList-application:eq(0)').find('#lot-COAnumber-text p span').remove();
	$('.selectList-application:eq(0)').find('#lot-COAnumber-text').each(function() {
		$(this).find('p').append('<span>' + data.response.lotNo + '</span>');
	});

      /*file name*/
	$('.selectList-application:eq(0)').find('#techLib-download').attr('name', 'techLib-download' );
        $('.selectList-application:eq(0)').find('#techLib-download b').remove();
	$('.selectList-application:eq(0)').find('#techLib-download').each(function() {
		$(this).append('<b style="display:none;">' + data.response.fileId + '</b>');
	});

	}

}


function onSuccessFilesSearch(data) {
	$('.selectList-application').not(':first').remove();
	$('.selectList-application:eq(0)').find('#part-number-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#list-number-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#search-language1-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#search-language-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#lot-number-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#document-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#techLib-download b').text(' ');
	$('.selectList-application:eq(0)').hide();
	if (data.errorCode == 0) {
		if (data.response.data.labelingDocumentCollection != undefined) {
			if (data.response.data.labelingDocumentCollection.total == 0) {

				$('#operations-manuals-card0, .a-button--lg').hide();
				$(".tableloader, .o-form-container__success-msg, #no-result, #sortedList").hide();
				$('#error-no-result').show();
			} else {
				if (data.response.SortBy == 'LotNumber') {
					$('#form-radio-option').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-lotnumber').show();
					$('#form-radio-option1').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-listnumber').hide();
				} else if (data.response.SortBy == 'ListNumber') {
					$('#form-radio-option').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-lotnumber').hide();
					$('#form-radio-option1').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-listnumber').show();
				}
				$(".tableloader, .o-form-container__success-msg, #error-no-result").hide();
				$('.selectList-application:eq(0), #sortedList').show();
				$('#no-result').css('display', 'none');

				/*iterate of search results*/
				if ($('.selectList-application').length <= 1) {

					var newresult = '';
					if ($('#operations-manuals-card0').attr('id') == 'operations-manuals-card0') {
						newresult = data.response.data.labelingDocumentCollection.nodes;
					}

					$.each(newresult, function(index, valueCard) {
						cloneSearchFilesCard(index, valueCard, newresult.length);
					});
				} else {
					if ($('.selectList-application').length >= 20) {
						var newresult1 = '';
						if ($('#operations-manuals-card0').attr('id') == 'operations-manuals-card0') {
							newresult1 = data.response.data.labelingDocumentCollection.nodes;
						}
						$.each(newresult1, function(index, valueCard) {
							cloneSearchFilesCard(index, valueCard, newresult1.length);
						});
					}

				}

			}
		} else if (data.response.data.customerSupportingMaterialCollection != undefined) {
			if (data.response.data.customerSupportingMaterialCollection.total == 0) {

				$('#cutomer-support-card0, .a-button--lg').hide();
				$(".tableloader, .o-form-container__success-msg, #no-result, #sortedList").hide();
				$('#error-no-result').show();
			} else {
				if (data.response.SortBy == 'LotNumber') {
					$('#form-radio-option').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-lotnumber').show();
					$('#form-radio-option1').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-listnumber').hide();
				} else if (data.response.SortBy == 'ListNumber') {
					$('#form-radio-option').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-lotnumber').hide();
					$('#form-radio-option1').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-listnumber').show();
				}
				$(".tableloader, .o-form-container__success-msg, #error-no-result").hide();
				$('.selectList-application:eq(0), #sortedList').show();
				$('#no-result').css('display', 'none');

				/*iterate of search results*/
				if ($('.selectList-application').length <= 1) {

					var newresult2 = '';
					if ($('#cutomer-support-card0').attr('id') == 'cutomer-support-card0') {
						newresult2 = data.response.data.customerSupportingMaterialCollection.nodes;
					}

					$.each(newresult2, function(index, valueCard) {
						cloneSearchFilesCard(index, valueCard, newresult2.length);
					});
				} else {
					if ($('.selectList-application').length >= 20) {
						var newresult3 = '';
						if ($('#cutomer-support-card0').attr('id') == 'cutomer-support-card0') {
							newresult3 = data.response.data.customerSupportingMaterialCollection.nodes;
						}
						$.each(newresult3, function(index, valueCard) {
							cloneSearchFilesCard(index, valueCard, newresult3.length);
						});
					}

				}

			}
		}
	}
}

function cloneSearchFilesCard(index, valueCard, resultLength) {
	if (resultLength == 20) {
		$('#show-more-results').show();
	} else {
		$('#show-more-results').hide();
	}
	/*represent of card depend on card*/
	if (index > 0) {
		var clone = $('.selectList-application:eq(0)').clone();
		$('.selectList-application:eq(0)').closest('.columncontrolTechLibrary').find('.columncontrol.column-align--center').append(clone);

		/*iteration of id*/
		var newIDattr = $('.selectList-application:eq(0)').attr('id');
		var Idreplaced = newIDattr.slice(0, -1) + index;
		$('.selectList-application:eq(' + index + ')').attr('id', Idreplaced);

		/*file Name Text*/
		var str = $('.selectList-application:eq(' + index + ')').find('#techLib-download b').text();
		var lastIndex = str.lastIndexOf(" ");
		str = str.substring(0, lastIndex);
		$('.selectList-application:eq(' + index + ')').find('#techLib-download b').text(str);

		/*part Number Text*/
		var str1 = $('.selectList-application:eq(' + index + ')').find('#part-number-text p span').text();
		var lastIndex1 = str1.lastIndexOf(" ");
		str1 = str1.substring(0, lastIndex1);
		$('.selectList-application:eq(' + index + ')').find('#part-number-text p span').text(str1);

		/*lot Number Text*/
		var str2 = $('.selectList-application:eq(' + index + ')').find('#lot-number-text p span').text();
		var lastIndex2 = str2.lastIndexOf(" ");
		str2 = str2.substring(0, lastIndex2);
		$('.selectList-application:eq(' + index + ')').find('#lot-number-text p span').text(str2);

		/*list Number Text*/
		var str3 = $('.selectList-application:eq(' + index + ')').find('#list-number-text p span').text();
		var lastIndex3 = str3.lastIndexOf(" ");
		str3 = str3.substring(0, lastIndex3);
		$('.selectList-application:eq(' + index + ')').find('#list-number-text p span').text(str3);

		/*language Text*/
		var str4 = $('.selectList-application:eq(' + index + ')').find('#search-language-text p span').text();
		var lastIndex4 = str4.lastIndexOf(" ");
		str4 = str4.substring(0, lastIndex4);
		$('.selectList-application:eq(' + index + ')').find('#search-language-text p span').text(str4);

		/*language1 Text*/
		var str5 = $('.selectList-application:eq(' + index + ')').find('#search-language1-text p span').text();
		var lastIndex5 = str5.lastIndexOf(" ");
		str5 = str5.substring(0, lastIndex5);
		$('.selectList-application:eq(' + index + ')').find('#search-language1-text p span').text(str5);

		/*document id Text*/
		var str6 = $('.selectList-application:eq(' + index + ')').find('#document-text p span').text();
		var lastIndex6 = str.lastIndexOf(" ");
		str6 = str6.substring(0, lastIndex6);
		$('.selectList-application:eq(' + index + ')').find('#document-text p span').text(str6);

	}

	/*file name*/
	$('.selectList-application:eq(' + index + ')').find('#techLib-download').attr('name', 'techLib-download' + index);
    $('.selectList-application:eq(' + index + ')').find('#techLib-download b').remove();
	$('.selectList-application:eq(' + index + ')').find('#techLib-download').each(function() {
		$(this).append('<b style="display:none;">' + valueCard.sys.id + '</b>');
	});

	/*product Name*/
	$('.selectList-application:eq(' + index + ')').find('#search-title-text').attr('name', 'search-title-text' + index);
	$('.selectList-application:eq(' + index + ')').find('#search-title-text').each(function() {
		$(this).find('p strong').text(valueCard.data.products[0].display);
	});


	/*List number*/
	$('.selectList-application:eq(' + index + ')').find('#list-number-text').attr('name', 'list-number-text' + index);
    $('.selectList-application:eq(' + index + ')').find('#list-number-text p span').remove();
	$('.selectList-application:eq(' + index + ')').find('#list-number-text').each(function() {
        $(this).find('p').append('<span>' + valueCard.data.listNumber + '</span>');
	});

	/*Language*/
	$('.selectList-application:eq(' + index + ')').find('#search-language-text').attr('name', 'search-language-text' + index);
    $('.selectList-application:eq(' + index + ')').find('#search-language-text p span').remove();
	$('.selectList-application:eq(' + index + ')').find('#search-language-text').each(function() {
		$(this).find('p').append('<span>' + valueCard.data.writtenLanguage.display + '</span>');
	});

	/*Language text*/
	$('.selectList-application:eq(' + index + ')').find('#search-language1-text').attr('name', 'search-language1-text' + index);
$('.selectList-application:eq(' + index + ')').find('#search-language1-text p span').remove();
    $('.selectList-application:eq(' + index + ')').find('#search-language1-text').each(function() {
		$(this).find('p').append('<span>' + valueCard.data.documentLanguage.display + '</span>');
	});

	/*documentId*/
	$('.selectList-application:eq(' + index + ')').find('#document-text').attr('name', 'document-text' + index);
    $('.selectList-application:eq(' + index + ')').find('#document-text p span').remove();
	$('.selectList-application:eq(' + index + ')').find('#document-text').each(function() {
		$(this).find('p').append('<span>' + valueCard.sys.documentId + '</span>');
	});
}




function onSuccessSearch(data) {

	$('.selectList-application').not(':first').remove();
	$('.selectList-application:eq(0)').find('#part-number-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#list-number-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#search-language-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#lot-number-text p span').text(' ');
	$('.selectList-application:eq(0)').find('#document-text p span').text(' ');
	$('.selectList-application:eq(0)').hide();


	if (data.errorCode == 0) {
		if (data.response.PageNumber == '0') {
			$('#applicationPackage-card0, .a-button--lg').hide();
			$(".tableloader, .o-form-container__success-msg, #no-result, #sortedList, #sortedby-lotnumber, #sortedby-listnumber").hide();
			$('#error-no-result').show();
		} else {
			if (data.response.SortBy == 'LotNumber') {
				$('#form-radio-option').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-lotnumber').show();
				$('#form-radio-option1').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-listnumber').hide();
			} else if (data.response.SortBy == 'ListNumber') {
				$('#form-radio-option').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-lotnumber').hide();
				$('#form-radio-option1').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-listnumber').show();
			}

			$(".tableloader, .o-form-container__success-msg, #error-no-result").hide();
			$('.selectList-application:eq(0), #sortedList').show();
			$('#no-result').css('display', 'none');
			sessionStorage.setItem('PageNumber', data.response.PageNumber);

			/*iterate of search results*/
			if ($('.selectList-application').length <= 1) {
				$.each(data.response.Result, function(index, valueCard) {
					cloneSearchCard(index, valueCard, data.response.Result.length);
				});
			} else {
				if ($('.selectList-application').length >= 20) {
					$.each(data.response.Result, function(index, valueCard) {
						cloneSearchCard(index, valueCard, data.response.Result.length);
					});
				}

			}

		}
	}
}

function cloneSearchCard(index, valueCard, resultLength) {
	if (resultLength == 20) {
		$('#show-more-results').show();
	} else {
		$('#show-more-results').hide();
	}
	/*represent of card depend on card*/
	if (index > 0) {
		var clone1 = $('.selectList-application:eq(0)').clone();
		$('.selectList-application:eq(0)').closest('.columncontrolTechLibrary').find('.columncontrol.column-align--center').append(clone1);

		/*iteration of id*/
		var newIDattr = $('.selectList-application:eq(0)').attr('id');
		var Idreplaced = newIDattr.slice(0, -1) + index;
		$('.selectList-application:eq(' + index + ')').attr('id', Idreplaced);

		/*file Name Text*/
		var str7 = $('.selectList-application:eq(' + index + ')').find('#techLib-download b').text();
		var lastIndex7 = str7.lastIndexOf(" ");
		str7 = str7.substring(0, lastIndex7);
		$('.selectList-application:eq(' + index + ')').find('#techLib-download b').text(str7);

		/*part Number Text*/
		var str8 = $('.selectList-application:eq(' + index + ')').find('#part-number-text p span').text();
		var lastIndex8 = str8.lastIndexOf(" ");
		str8 = str8.substring(0, lastIndex8);
		$('.selectList-application:eq(' + index + ')').find('#part-number-text p span').text(str8);

		/*lot Number Text*/
		var str9 = $('.selectList-application:eq(' + index + ')').find('#lot-number-text p span').text();
		var lastIndex9 = str9.lastIndexOf(" ");
		str9 = str9.substring(0, lastIndex9);
		$('.selectList-application:eq(' + index + ')').find('#lot-number-text p span').text(str9);

		/*list Number Text*/
		var str10 = $('.selectList-application:eq(' + index + ')').find('#list-number-text p span').text();
		var lastIndex10 = str10.lastIndexOf(" ");
		str10 = str10.substring(0, lastIndex10);
		$('.selectList-application:eq(' + index + ')').find('#list-number-text p span').text(str10);

		/*language Text*/
		var str11 = $('.selectList-application:eq(' + index + ')').find('#search-language-text p span').text();
		var lastIndex11 = str11.lastIndexOf(" ");
		str11 = str11.substring(0, lastIndex11);
		$('.selectList-application:eq(' + index + ')').find('#search-language-text p span').text(str11);


	}



	/*file name*/
	$('.selectList-application:eq(' + index + ')').find('#techLib-download').attr('name', 'techLib-download' + index);
    $('.selectList-application:eq(' + index + ')').find('#techLib-download b').remove();
	$('.selectList-application:eq(' + index + ')').find('#techLib-download').each(function() {
		$(this).append('<b style="display:none;">' + valueCard.FileName + '</b>');
	});

	/*product Name*/
	$('.selectList-application:eq(' + index + ')').find('#search-title-text').attr('name', 'search-title-text' + index);
	$('.selectList-application:eq(' + index + ')').find('#search-title-text').each(function() {
		$(this).find('p strong').text(valueCard.ProductName)
	});

	/*Part Number*/
	$('.selectList-application:eq(' + index + ')').find('#part-number-text').attr('name', 'part-number-text' + index);
    $('.selectList-application:eq(' + index + ')').find('#part-number-text p span').remove();
	$('.selectList-application:eq(' + index + ')').find('#part-number-text').each(function() {
		$(this).find('p').append('<span>' + valueCard.PartNumber + '</span>');
	});

	/*Lot number*/
	$('.selectList-application:eq(' + index + ')').find('#lot-number-text').attr('name', 'lot-number-text' + index);
    $('.selectList-application:eq(' + index + ')').find('#lot-number-text p span').remove();
	$('.selectList-application:eq(' + index + ')').find('#lot-number-text').each(function() {
		$(this).find('p').append('<span>' + valueCard.LotNumber + '</span>');
	});

	/*List number*/
	$('.selectList-application:eq(' + index + ')').find('#list-number-text').attr('name', 'list-number-text' + index);
    $('.selectList-application:eq(' + index + ')').find('#list-number-text p span').remove();
	$('.selectList-application:eq(' + index + ')').find('#list-number-text').each(function() {
		$(this).find('p').append('<span>' + valueCard.ListNumber + '</span>');
	});

	var langcode = valueCard.LanguageCode;
	var lang = '';
	$("#document-lang-options ul li").each(function() {
		var mf = [];
		mf.push($(this).attr('data-optionvalue'));
		if (mf.includes(langcode)) {
			lang = $(this).find('span').text();
		}
	});


	/*Language*/
	$('.selectList-application:eq(' + index + ')').find('#search-language-text').attr('name', 'search-language-text' + index);
    $('.selectList-application:eq(' + index + ')').find('#search-language-text p span').remove();
	$('.selectList-application:eq(' + index + ')').find('#search-language-text').each(function() {
		$(this).find('p').append('<span>' + lang + '</span>');
	});

}

/*******dropdown_options*****/

function onCompleteSearch(data) {
    var productName = sessionStorage.getItem('productName');
	$('#product-name, #product-name-mob').val(productName);

    var listNumberId = sessionStorage.getItem('listNumberId');
	$('#list-name, #list-name-mob').val(listNumberId);

    var lotNumber = sessionStorage.getItem('lotNumber');
	$('#lot-number, #lot-number-mob').val(lotNumber);

    var listNumber = sessionStorage.getItem('listNumber');
	$('#list-number, #list-number-mob').val(listNumber);

	if (sessionStorage.getItem('languageCode') != null) {
		var documentLanguageId = sessionStorage.getItem('languageCode');
		var langText;
		$('ul[name="document-lang"] li').each(function() {
			var langOption = $(this).attr('data-optionvalue');
			if (langOption == documentLanguageId) {
				$(this).addClass('selected');
				langText = $(this).find('span').text();
			}
		});
		$('#document-lang-options, #document-lang-mob-options').find('.a-dropdown-selected').text(langText);
	}


	if (sessionStorage.getItem('countrycode') != null) {
		var countryOPtionId = sessionStorage.getItem('countrycode');
		var countryText;
		$('ul[name="country"] li').each(function() {
			var countryOption = $(this).attr('data-optionvalue');
			if (countryOption == countryOPtionId) {
				$(this).addClass('selected');
				countryText = $(this).find('span').text();
			}
		});
		$('#country-options, #country-mob-options').find('.a-dropdown-selected').text(countryText);
	}

	if (sessionStorage.getItem('insertTypeCode') != null) {

		var insertTypeId = sessionStorage.getItem('insertTypeCode');
		var insertTypeText;
		$('ul[name="insert-type"] li').each(function() {
			var insertType = $(this).attr('data-optionvalue');
			if (insertType == insertTypeId) {
				$(this).addClass('selected');
				insertTypeText = $(this).find('span').text();
			}
		});
		$('#insert-type-options, #insert-type-mob-options').find('.a-dropdown-selected').text(insertTypeText);
	}

	if (sessionStorage.getItem('assertDescCode') != null) {

		var assertDescId = sessionStorage.getItem('assertDescCode');
		var assertDescText;
		$('ul[name="assert-description"] li').each(function() {
			var assertDesc = $(this).attr('data-optionvalue');
			if (assertDesc == assertDescId) {
				$(this).addClass('selected');
				assertDescText = $(this).find('span').text();
			}
		});
		$('#assert-description-options, #assert-description-mob-options').find('.a-dropdown-selected').text(assertDescText);
	}

	if (sessionStorage.getItem('productDropCode') != null) {

		var productDropId = sessionStorage.getItem('productDropCode');
		var productDropText;
		$('ul[name="Product"] li').each(function() {
			var productDrop = $(this).attr('data-optionvalue');
			if (productDrop == productDropId) {
				$(this).addClass('selected');
				productDropText = $(this).find('span').text();
			}
		});
		$('#product-dropdown-options, #product-dropdown-mob-options').find('.a-dropdown-selected').text(productDropText);
	}
}