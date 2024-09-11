let contentHtml_column = '<div class="container"> <div class="row"> <div class="col-12 col-md-1 col-lg-1 columncontrol__column "> <div class="link button a-link a-link--icon"> <div class="a-link"> <a id="link-fe9f930daf" class="a-link__text a-link__text--has-icon" target="_blank"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="32" viewBox="0 0 24 32" fill="#888b8d"><g transform="scale(0.02525 0.03125)"><path d="M842.012 589.48c-13.648-13.446-43.914-20.566-89.972-21.172-31.178-0.344-68.702 2.402-108.17 7.928-17.674-10.198-35.892-21.294-50.188-34.658-38.462-35.916-70.568-85.772-90.576-140.594 1.304-5.12 2.414-9.62 3.448-14.212 0 0 21.666-123.060 15.932-164.666-0.792-5.706-1.276-7.362-2.808-11.796l-1.882-4.834c-5.894-13.592-17.448-27.994-35.564-27.208l-10.916-0.344c-20.202 0-36.664 10.332-40.986 25.774-13.138 48.434 0.418 120.892 24.98 214.738l-6.288 15.286c-17.588 42.876-39.63 86.060-59.078 124.158l-2.528 4.954c-20.46 40.040-39.026 74.028-55.856 102.822l-17.376 9.188c-1.264 0.668-31.044 16.418-38.028 20.644-59.256 35.38-98.524 75.542-105.038 107.416-2.072 10.17-0.53 23.186 10.014 29.212l16.806 8.458c7.292 3.652 14.978 5.502 22.854 5.502 42.206 0 91.202-52.572 158.698-170.366 77.93-25.37 166.652-46.458 244.412-58.090 59.258 33.368 132.142 56.544 178.142 56.544 8.168 0 15.212-0.78 20.932-2.294 8.822-2.336 16.258-7.368 20.792-14.194 8.926-13.432 10.734-31.932 8.312-50.876-0.72-5.622-5.21-12.574-10.068-17.32zM211.646 814.048c7.698-21.042 38.16-62.644 83.206-99.556 2.832-2.296 9.808-8.832 16.194-14.902-47.104 75.124-78.648 105.066-99.4 114.458zM478.434 199.686c13.566 0 21.284 34.194 21.924 66.254s-6.858 54.56-16.158 71.208c-7.702-24.648-11.426-63.5-11.426-88.904 0 0-0.566-48.558 5.66-48.558v0zM398.852 637.494c9.45-16.916 19.282-34.756 29.33-53.678 24.492-46.316 39.958-82.556 51.478-112.346 22.91 41.684 51.444 77.12 84.984 105.512 4.186 3.542 8.62 7.102 13.276 10.65-68.21 13.496-127.164 29.91-179.068 49.862v0zM828.902 633.652c-4.152 2.598-16.052 4.1-23.708 4.1-24.708 0-55.272-11.294-98.126-29.666 16.468-1.218 31.562-1.838 45.102-1.838 24.782 0 32.12-0.108 56.35 6.072 24.228 6.18 24.538 18.734 20.382 21.332v0z"/><path d="M917.806 229.076c-22.21-30.292-53.174-65.7-87.178-99.704s-69.412-64.964-99.704-87.178c-51.574-37.82-76.592-42.194-90.924-42.194h-496c-44.112 0-80 35.888-80 80v864c0 44.112 35.886 80 80 80h736c44.112 0 80-35.888 80-80v-624c0-14.332-4.372-39.35-42.194-90.924v0zM785.374 174.626c30.7 30.7 54.8 58.398 72.58 81.374h-153.954v-153.946c22.982 17.78 50.678 41.878 81.374 72.572v0zM896 944c0 8.672-7.328 16-16 16h-736c-8.672 0-16-7.328-16-16v-864c0-8.672 7.328-16 16-16 0 0 495.956-0.002 496 0v224c0 17.672 14.324 32 32 32h224v624z"/></g></svg> <span class="a-link__inner-text"></span> </a> </div> </div> </div> <div class="col-12 col-md-10 col-lg-10 columncontrol__column "> <div class="link button a-link a-link--icon"> <div class="a-link"> <a id="link-10724d80a0" class="a-link__text" target="_blank"> <span class="a-link__inner-text">Acceava Strep A Product Sheet (English)</span> </a> </div> </div> </div> <div class="col-12 col-md-1 col-lg-1 columncontrol__column "> <div class="button link a-button a-button--primary a-button--md"> <a id="button-2a55390c7c" class="btn right-icon" target="_blank"> <em class="abt-icon abt-icon-download abt-icon-only"></em> </a> </div> </div> </div> </div>';
let prodSrcxApplicationId, prodSrcxCountryCode, prodSrcxPreferredLanguage;
if($('#form-product-documents-search form').length > 0){
    $('.stickymenu').addClass('productSearchSticky');
    setTimeout(() => {
        $('.a-spinner:first').addClass('spinner-active').removeClass('d-none');
    }, 100);
}
$(".productSearchSticky .sticky-menu").hide();
$(document).ready(function() {
    if($('#section-product-searchbar-container').length > 0){
        $('#section-product-searchbar-container').closest('.container').css('z-index','11111')
    }
	let dataResponse;
	$('.cmp-container[role]').each(function() {
		$(this).closest('section').attr('id', $(this).attr('role'))
	})
	let action = $('#form-product-documents-search form').attr('action');
	prodSrcxApplicationId = $('input[name="x-application-id"]').val();
	prodSrcxCountryCode = $('input[name="x-country-code"]').val();
	prodSrcxPreferredLanguage = $('input[name="x-preferred-language"]').val();
	$('#form-product-documents-search form')?.find('[name="action"]')?.val($('input[name="requestType"]').val());
	$('#form-product-documents-search form')?.find('[name="country"]')?.val($('input[name="x-country-code"]').val());
	let dataQuery = $('#google-data-layer')?.find('.page-title')?.attr('data-value');
	let dataAction = $('#form-product-documents-search form').find('[name="action"]').val();
	/**
	*world-wide site re-uses the 'US' country-code for ESL integrations as 'WW' is not a valid code for aws-services.
	*For product-document search, pass the accurate country-code as not to get the 'US' documents for 'WW' site.
	*/
	let dataCountry = isWWSite ? 'WW' : $('input[name="x-country-code"]').val();	
	let formData = {
		"action": dataAction,
		"country": dataCountry,
		"query": ""
	}
    if($('#form-product-documents-search form').length > 0){
        $('.stickymenu').addClass('productSearchSticky');
        setTimeout(() => {
            $('.a-spinner:first').addClass('spinner-active').removeClass('d-none');
        }, 100);
    }
	$(".productSearchSticky .sticky-menu").hide();
	document.querySelectorAll('.productSearchSticky .m-link-stack__list a[href^="#"]').forEach(function (link) {
		$(link)?.off().on('click', function (event) {
			event.preventDefault();
       		setTimeout(function(){
				let href = link.getAttribute('href');
               callproductSearchSticky(href);
    		},1001);
		});
	})
	$.ajax({
		"url": action,
		"method": "POST",
		dataType: 'json',
		contentType: "application/json;charset=UTF-8",
		"headers": {
			"x-application-id": prodSrcxApplicationId,
			"x-country-code": prodSrcxCountryCode,
			"x-preferred-language": prodSrcxPreferredLanguage
		},
		data: JSON.stringify(formData)
	}).then(function(data) {
		$('.a-spinner:first').addClass('d-none').removeClass('spinner-active');
        $('.productSearchSticky').show();
		dataResponse = data.response;
		$('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list').html('');
		dataResponse.forEach(function(item) {
			let stickyId = getIndexOfLinkStack(item.materialType)
			let appendItem = '<div class="m-search-bar__autocomplete-item d-none" aria-label="' + item.productName + '" aria-selected="false" role="option" data-sticky-id="' + stickyId?.id + '" data-category="' + item.materialType + '">' + item.productName + '</div>'
			$('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list').append(appendItem);
		});
		$('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list').append('<div class="no-result d-none">No results</div>');
        let appendText = '<div class="missing-search-terms d-none"><p>Missing search terms</p></div><div class="no-match-result d-none"><p>No results found</p></div>';
        $('#product-searchbar-container .search__heading').append(appendText);
		$('#product-searchbar-container .m-search-bar__input-field').on('focus input', function(e) {
			e.preventDefault();
			let curVal = $(this).val().toLowerCase().trim();
			$('.no-result').addClass('d-none');
			callSearchBarAutocomplete(curVal);
			$('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list .m-search-bar__autocomplete-item').hide();
			$('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list .m-search-bar__autocomplete-item').each(function(index) {
				let _this = this;
				productSearchbarContainer(_this, curVal);
			})
		})
		$(".productSearchSticky .stickyMenu").find(".m-link-stack__list-item").hide();
		$(".productSearchSticky .sticky-menu").find('section').closest('.container').hide();
		let duplicateArrayEleRemove = [];
		let elemAutocomplteDropdown = document.querySelectorAll('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list .m-search-bar__autocomplete-item');
		elemAutocomplteDropdown.forEach(function(elem){
			callDuplicateArrayEleRemove(duplicateArrayEleRemove, elem);
		})
	}).fail(function() {});
	$("#product-searchbar-container .m-search-bar__input-field").on("keyup", function(e){
        e.stopPropagation();
        e.preventDefault();  
       
    });
	$("#product-searchbar-container .m-search-bar__close").on('click', function() {
		$(".sticky-menu").hide();
		$("#product-searchbar-container .m-search-bar__input-field").trigger('change');
	});
	$("#product-searchbar-container [name='product-search']").on('click', function() {
		setTimeout(() => {
            $('.a-spinner:first').addClass('spinner-active').removeClass('d-none');
        }, 100);
		setTimeout(function() {
            callMissingSearchItem(dataResponse);
		}, 501)
	});
	$("#product-searchbar-container .m-search-bar__input-field").on("change", function() {
		$('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list .m-search-bar__autocomplete-item').each(function() {
			$(this).html().replaceAll('<mark>', '').replaceAll('</mark>', '');
		});
		setTimeout(() => {
			$('#form-product-documents-search form').find('[name="query"]').val($(this).val());
			dataQuery = $('#form-product-documents-search form').find('[name="query"]').val();
			formData = {
				"action": dataAction,
				"country": dataCountry,
				"query": dataQuery
			}
			$(".productSearchSticky .sticky-menu").hide();
			if (dataQuery.length > 0 && $(this)?.val()?.trim().length >= 3) {
				callProductSearchBar(dataResponse, dataQuery);
			}
			$(this).trigger('input');
		}, 500)
	});
});

function callproductSearchSticky(href) {
	if (href) {
		let offsetTop;
		let headerHeight = $('.o-header-v2-global__sticky-section').height() ? $('.o-header-v2-global__sticky-section').height() : 0;
		let stickyMenuHeight = $('.productSearchSticky .stickyMenu').height() ? $('.productSearchSticky .stickyMenu').height() : 0;
		if (document.querySelector(href)) {
			offsetTop = (document.querySelector(href)?.closest('.container').offsetTop) - (headerHeight + stickyMenuHeight);
		}
		$('html, body').animate({
			scrollTop: (offsetTop)
		}, 400);
	}
}

function callSearchBarAutocomplete(curVal) {
	if (curVal.length >= 3) {
		$('#product-searchbar-container .m-search-bar__autocomplete').removeClass('d-none');
		$('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list .m-search-bar__autocomplete-item').removeClass('d-none');
	} else {
		$('#product-searchbar-container .m-search-bar__autocomplete').addClass('d-none');
		$('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list .m-search-bar__autocomplete-item').addClass('d-none');
	}
}

function callDuplicateArrayEleRemove(duplicateArrayEleRemove, elem) {
	if (duplicateArrayEleRemove.indexOf($(elem).text()) === -1) {
		duplicateArrayEleRemove.push($(elem).text());
	} else {
		$(elem).remove();
	}
}

function callMissingSearchItem(dataResponse) {
	let curVal = $("#product-searchbar-container .m-search-bar__input-field").val();
	if (curVal.length >= 3 && $('.productSearchSticky .sticky-menu:visible').length == 0) {
		$('.no-match-result').removeClass('d-none');
		$('.missing-search-terms').addClass('d-none');
		$('.a-spinner:first').addClass('spinner-active').addClass('d-none');
	} else if (curVal.length < 3 && $('.productSearchSticky .sticky-menu:visible').length == 0) {
		$('.missing-search-terms').removeClass('d-none');
		$('.no-match-result').addClass('d-none');
		$('.a-spinner:first').addClass('spinner-active').addClass('d-none');
	}
	if (curVal.length >= 3) {
		$('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list .m-search-bar__autocomplete-item[style="display: block;"]').each(function () {
			let stickyID = $(this).attr('data-sticky-id');
			let prodName = $(this).attr('aria-label');
			$(stickyID).show();
			let StickyMenuLink = $(".stickyMenu").find(".m-link-stack__list-item");
			callProductSearchSticky(dataResponse, prodName, StickyMenuLink);
		});
	}
}

function productSearchbarContainer(_this, curVal) {
	$(_this).html().replaceAll('<mark>', '').replaceAll('</mark>', '')?.trim();
	if ($(_this).text().trim().toLowerCase().indexOf(curVal) >= 0) {
		highlighter(curVal, $(_this));
		$(_this).show();
	} else if ($(_this).text().trim().toLowerCase().indexOf(curVal) < 0) {
		if (curVal.length >= 3 && $('#product-searchbar-container .m-search-bar__autocomplete .m-search-bar__autocomplete-list .m-search-bar__autocomplete-item[style="display: block;"]').length == 0) {
			$('.no-result').removeClass('d-none');
		} else {
			$('.no-result').addClass('d-none');
		}
	}
}

function callProductSearchSticky(dataResponse, prodName, StickyMenuLink) {
	for (const element of dataResponse) {
		if (prodName == element.productName) {
			let getMenuDetails = getIndexOfLinkStack(element.materialType);
			createRowElem(element, getMenuDetails.id);
			if (getMenuDetails.id) {
				$(".productSearchSticky .sticky-menu").show();
				$(StickyMenuLink[getMenuDetails.ind]).show();
				$('[role=' + (getMenuDetails.id.replace('#', '')) + ']').closest('.container').show();
				$('.no-match-result').addClass('d-none');
				$('.missing-search-terms').addClass('d-none');
				setTimeout(() => {
					$('#product-searchbar-container .m-search-bar__autocomplete').addClass('d-none');
				}, 100);
				setTimeout(() => {
					window.dispatchEvent(new Event('resize'));
					$('.a-spinner:first').addClass('d-none').removeClass('spinner-active');
				}, 150);
			}
		}
	}
	
}

function callProductSearchBar(dataResponse, dataQuery) {
	$(".productSearchSticky .stickyMenu").find(".m-link-stack__list-item").hide();
	let StickyMenuLink = $(".stickyMenu").find(".m-link-stack__list-item");
	$(".productSearchSticky .sticky-menu").find('section').closest('.container').hide();
	for (const element of dataResponse) {
		if (dataQuery == element.productName) {
			let getMenuDetails = getIndexOfLinkStack(element.materialType);
			createRowElem(element, getMenuDetails.id);
			if (getMenuDetails.id) {
				$(".productSearchSticky .sticky-menu").show();
				$(StickyMenuLink[getMenuDetails.ind]).show();
				$('[role=' + (getMenuDetails.id.replace('#', '')) + ']').closest('.container').show();
				setTimeout(() => {
					$('#product-searchbar-container .m-search-bar__autocomplete').addClass('d-none');
				}, 100);
				setTimeout(() => {
					window.dispatchEvent(new Event('resize'));
				}, 150);
			}
		}
	}
	
}

function createRowElem(productDocument, targetId) {
	let rulerDom = '<div class="a-rule"><div class="a-horizontal-rule"></div></div>'
	let productDoc_dom = "";
	let newDiv = document.createElement("div");
	$(newDiv).addClass("columncontrol column-align--center")
	$(newDiv).attr("class", "productDocument_data");
	$(newDiv).addClass("columncontrol column-align--center").append(contentHtml_column);
	let productDocumet_Data = $(newDiv).find(".row").children();
	let iconType = "doc-icon-pdf";
	let docDescription = productDocument.gpocFileName;
	let docLink = productDocument.hyperLink;
	$(productDocumet_Data[0]).find("a").attr('href', docLink).find('em').addClass(iconType);
	$(productDocumet_Data[1]).find("a").attr('href', docLink).find('span').text(docDescription);
	$(productDocumet_Data[2]).find("a").attr('href', docLink)
	if (productDocument?.materialType === "Multimedia Gallery") {
		$(productDocumet_Data[2]).find(".button > a > em").removeClass("abt-icon-download").addClass("abt-icon-play2");
		let mediaSVG = '<svg class="play-media" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M608 0H160a32 32 0 0 0-32 32v96h160V64h192v320h128a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zM232 103a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm352 208a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm-168 57H32a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM96 224a32 32 0 1 1-32 32 32 32 0 0 1 32-32zm288 224H64v-32l64-64 32 32 128-128 96 96z"/></svg>';
		$(productDocumet_Data[0]).find(".a-link__text").html('').append(mediaSVG);
	}
	if($('[role=' + (targetId?.replace('#', '')) + ']').find('[href="'+docLink+'"]').length === 0 && $('[role=' + (targetId?.replace('#', '')) + ']').find('a > .a-link__inner-text').text().indexOf(docDescription) < 0){
		$(newDiv)?.appendTo($('[role=' + (targetId?.replace('#', '')) + ']'));
		$(rulerDom)?.appendTo($('[role=' + (targetId?.replace('#', '')) + ']'))
	}
	return productDoc_dom;
}

function getIndexOfLinkStack(category) {
	let stickyMenuItem = $(".productSearchSticky .stickyMenu").find(".m-link-stack__list-item");
	let menuDetails = {};
	for (let i = 0; i < stickyMenuItem.length; i++) {
		let prodCategoryName = $(stickyMenuItem[i]).find('a').attr('href').replace('#','').replaceAll('-',' ').toLowerCase();
		if (prodCategoryName === category.toLowerCase()) {
			menuDetails.ind = i;
			menuDetails.id = $(stickyMenuItem[i]).find('a').attr('href');
			break;
		}
	}
	return menuDetails;
}

function highlighter(str, element) {
	if (str.trim().length > 0) {
		let regex = new RegExp(str, "gi");
		let text = element.html().replaceAll('<mark>', '').replaceAll('</mark>', '')?.trim();
		element.html(text)
		element.html(element?.html()?.replaceAll(regex, function(matched) {
			return "<mark>" + matched + "</mark>";
		}));
	}
}