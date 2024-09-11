$(document).ready(function () {
	/* Focus to particular section if url have # id start */
	setTimeout(function() {
		if(window.location.hash != "") {
			window.CQ.CoreComponents.container.utils.scrollToAnchor();
		}
	}, 750);
	/* Focus to particular section if url have # id end */
	function hideFields() {
		if($("[name='receiveDiscountCard']").length > 0) {
			$("[name='receiveDiscountCard']").closest(".aem-GridColumn").hide();
			if($("[name='receiveDiscountCard']").closest(".a-dropdown").attr("data-required") != undefined) {
				$("[name='receiveDiscountCard']").closest(".a-dropdown").removeAttr("data-required");
			}
			if($("[name='receiveDiscountCard']").closest(".a-dropdown").find(".a-input-field--text-require").length > 0) {
				$("[name='receiveDiscountCard']").closest(".a-dropdown").find(".a-input-field--text-require").remove();
			}
		}
		if($("[name='preferredContactTime']").length > 0) {
			$("[name='preferredContactTime']").closest(".aem-GridColumn").hide();
			if($("[name='preferredContactTime']").closest(".a-dropdown").attr("data-required") != undefined) {
				$("[name='preferredContactTime']").closest(".a-dropdown").removeAttr("data-required");
			}
			if($("[name='preferredContactTime']").closest(".a-dropdown").find(".a-input-field--text-require").length > 0) {
				$("[name='preferredContactTime']").closest(".a-dropdown").find(".a-input-field--text-require").remove();
			}
		}
	}
	function showFields() {
		if($("[name='receiveDiscountCard']").length > 0) {
			$("[name='receiveDiscountCard']").closest(".aem-GridColumn").show();
			if($("[name='receiveDiscountCard']").closest(".a-dropdown").attr("data-required") == undefined) {
				$("[name='receiveDiscountCard']").closest(".a-dropdown").attr("data-required",true);
			}
			if($("[name='receiveDiscountCard']").closest(".a-dropdown").find(".a-input-field--text-require").length == 0) {
				$("[name='receiveDiscountCard']").closest(".a-dropdown").append('<span class="form-text a-input-field--text-require">Please select an option.</span>');
			}
		}
		if($("[name='preferredContactTime']").length > 0) {
			$("[name='preferredContactTime']").closest(".aem-GridColumn").show();
			if($("[name='preferredContactTime']").closest(".a-dropdown").attr("data-required") == undefined) {
				$("[name='preferredContactTime']").closest(".a-dropdown").attr("data-required",true);
			}
			if($("[name='preferredContactTime']").closest(".a-dropdown").find(".a-input-field--text-require").length == 0) {
				$("[name='preferredContactTime']").closest(".a-dropdown").append('<span class="form-text a-input-field--text-require">Please select an option.</span>');
			}
		}
	}
	hideFields();
	$("[name='isThreeAndAbove'] li").on("click", function() {
		if($(this).attr("data-optionvalue").toLowerCase() == "true") {
			showFields();
		}
		else {
			hideFields();
		}
	});
	$(".copy-text").on("click", function() {
		if($(this).attr("aria-label") != undefined) {
			if($(".playtime-text-copy").length) {
				let TextToCopy = document.querySelector(".playtime-text-copy a").href;
				if(document.querySelector(".playtime-text-copy a").href === undefined) {
					TextToCopy = document.querySelector(".playtime-text-copy a").innerText;
				}
				let TempText = document.createElement("input");
				TempText.value = TextToCopy;
				document.body.appendChild(TempText);
				TempText.select();
				document.execCommand("copy");
				TempText.setAttribute("class", "playtime-copy-input d-none");
				TempText.remove();
			}
			let originalText = $(this).find("span").text();
			$(this).find("span").text($(this).attr("aria-label"));
			setTimeout(function() {
				$(".copy-text").find("span").text(originalText);
			}, 1000);
		}
	});
});

function upperToCapitalized(inputString) {
    if (!inputString) {return;}
    let words = inputString.toLowerCase().split(' ');

    for (let i = 0; i < words.length; i++) {
		words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}

function productDetailsPopulate(result, trueCheck) {
	if(result.status == trueCheck && result.errorCode == 0) {
		let res_attr = result.response.attributes;
		for(let x in res_attr) {
			if(res_attr[x].name.toLowerCase() === "batch number") {
				$(".batch_number span").text(res_attr[x].value);
			}
			else if(res_attr[x].name.toLowerCase() === "origin") {
				$(".manufacture_location span").text(res_attr[x].value);
			}
			else if(res_attr[x].name.toLowerCase() === "manufacture date") {
				$(".manufacture_date span").text(res_attr[x].value);
			}
			else if(res_attr[x].name.toLowerCase() === "expiry date") {
				$(".expiry_date span").text(res_attr[x].value);
			}
		}
		$("#product_information").removeClass("d-none");
		jQuery("#page-spinner .a-spinner").toggleClass("d-none");
		overlayLoader.hide();
	}
	else if($('.product_error_redirect').length){
		$('.product_error_redirect')[0].click();
	}
}

function campaignNameUrlUpdate() {
	/* add campaign name to url*/	
	let queryString = window.location.search;		
	let queryUrl = new URL(window.location.href);	
	if(queryUrl.searchParams.has('utm_source') && queryUrl.searchParams.has('utm_medium') && queryUrl.searchParams.has('utm_campaign') && !queryUrl.searchParams.has('campaign_name')) {
		if($("input[name='campaignName_json']").length>0){
			let jsonUrl = $("input[name='campaignName_json']").val();
			let urlParams = new URLSearchParams(queryString);
			let source = urlParams.get('utm_source');
			source= source.replaceAll(" ","+");
			let medium = urlParams.get('utm_medium');
			medium= medium.replaceAll(" ","+");
			let campaign = urlParams.get('utm_campaign');
			campaign= campaign.replaceAll(" ","+");
			let campaignName;
			jsonUrl = window.location.origin+jsonUrl;
			$.ajax({
				type: "Get",
				url: jsonUrl,
				dataType: "json",
				success: function(data) {
					for(let i in data.quary_params){
						let data_utm_source = data.quary_params[i].utm_source;
						let data_utm_medium = data.quary_params[i].utm_medium;						
						let data_utm_campaign = data.quary_params[i].utm_campaign;
						let data_campaign_name = data.quary_params[i].campaign_name;						
						if(source === data_utm_source && medium === data_utm_medium && campaign === data_utm_campaign){
							campaignName = data_campaign_name;
							window.location.href = window.location.href + "&campaign_name=" +campaignName;
						}
					}
				},
				error: function(){
					return false;							
				}
			});			
		}
	}
}

$(document).ready(function(){
	let productCode = new URLSearchParams(window.location.search).get("c");
	let overlayLoader = jQuery("#page-spinner");
	let country = jQuery("input[name=x-country-code]").val();
	let language = jQuery("input[name=x-preferred-language]").val();
	let application = jQuery("input[name=x-application-id]").val();
	let apiURL = jQuery("#product-lookup").val();
	let isValue = true;
	if($("#product_information").length) {
		if(productCode != null && $(window).width() < 768) {
			if($('[name="wcmMode"]').val() == isValue) {
				$("#product_information").removeClass("d-none");
			}
			let request_body = {
				code: productCode
			};
			jQuery.ajax({
				url: apiURL,
				method: "POST",
				headers: {
				  "content-type": "application/json",
				  "x-application-id": application,
				  "x-country-code": country,
				  "x-preferred-language": language
				},
				async: true,
				data: JSON.stringify(request_body),
				beforeSend: function() {
					overlayLoader.show();
					jQuery("#page-spinner .a-spinner").toggleClass("d-none");
				},
				success: function(results) {
					productDetailsPopulate(results,isValue);
				},
				error: function() {
					if($('.product_error_redirect').length){
						$('.product_error_redirect')[0].click();
					}
					else {
						jQuery("#page-spinner .a-spinner").toggleClass("d-none");
						overlayLoader.hide();
					}
				}
			});
		}
		else if($('.product_error_redirect').length && $("#wcmMode").val() == "false"){
			$('.product_error_redirect')[0].click();
		}
	}
	
	campaignNameUrlUpdate();
});