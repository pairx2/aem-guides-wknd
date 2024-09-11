$(document).ready(function(){
	let productName = $("#google-data-layer").find(".page-title").attr("data-value");
	if (productName) {
		//remove whitespace with '+' for the pre-population of product in iframe form drop-down.
	   productName = productName.replaceAll("+","tempReplaceChar").replaceAll(" ","+");       
       productName = encodeURI(productName);     
       productName = productName.replaceAll("&","%26").replaceAll("tempReplaceChar", "%2B");
	   //replace'(' and ')' with encoded values for the pre-population of product in iframe form drop-down.
	   productName = productName.replaceAll("(","%28").replaceAll(")","%29");		
	}	 
	let gbuTags = $("#google-data-layer").find(".gbu-tags").attr("data-value")?.replaceAll(" ","+");	
	let apocProduct = $("#google-data-layer").find(".apoc-tags")?.attr("data-value");
	let isApocProduct = apocProduct ? apocProduct === "apoc" : false;
	
	let productUrlData = "?"+"product="+productName+"&gbu="+gbuTags;
	productSalesbutton(productUrlData, isApocProduct);
	productTechnicalbutton(productUrlData, isApocProduct);

})
function productSalesbutton(productUrlData, isApocProduct){
	$('.product-sales-button').each(function() {
        $(this).on('click', function() {
			let contactSalesModalTarget = isApocProduct ? "#apoc-product-contact-sales-modal" : "#product-contact-sales-modal";
			let contactSalesIframeTarget = $(contactSalesModalTarget).find('iframe');
			let csSrcAttrVal = $(contactSalesIframeTarget)?.attr("src");
			let contactSalesPopupDataUrl = csSrcAttrVal ? csSrcAttrVal + productUrlData : productUrlData;
			if(screen.width>767.98){
				$(this).find('.contact-sales-btn').attr('data-target', contactSalesModalTarget);
				$(contactSalesIframeTarget).attr("src", contactSalesPopupDataUrl);
            } else{
				let mobileSalesSupportBtnId = "#product-contact-sales-mobile";
				let mobileApocSalesSupportBtnId = "#apoc-product-contact-sales-mobile";								
				//default is always gpoc url, override for apoc only when the mobile url is available.
				let mobileSalesSupportHref = $(mobileSalesSupportBtnId)?.attr('value');	
				let apocSalesSupportBtnHref = $(mobileApocSalesSupportBtnId)?.attr('value');				
				if (isApocProduct && apocSalesSupportBtnHref) {
					mobileSalesSupportHref = apocSalesSupportBtnHref;	
				}
				$(this).find("a.mobile-contact-sales-btn").attr("href", mobileSalesSupportHref + productUrlData);
            }
        });
    });
}
function productTechnicalbutton(productUrlData, isApocProduct){
	$('.product-technical-button').each(function( index ) {
	    $(this).on('click', function() {
			let techSupportModalTarget = isApocProduct ? "#apoc-product-technical-support-modal" : "#product-technical-support-modal";
			let iframePopupTarget = $(techSupportModalTarget).find('iframe');
			let tsSrcAttrVal = $(iframePopupTarget)?.attr("src");
			let techSupportPopupDataUrl = tsSrcAttrVal ? tsSrcAttrVal + productUrlData : productUrlData;
			if(screen.width>767.98){
				$(this).find('.tech-support-btn').attr('data-target', techSupportModalTarget);
				$(iframePopupTarget).attr("src", techSupportPopupDataUrl);
            } else{
				let mobileTechSupportBtnId = "#product-technical-support-mobile";
				let mobileApocTechSupportBtnId = "#apoc-product-technical-support-mobile";								
				//default is always gpoc url, override for apoc only when the mobile url is available.
				let mobileTechSupportHref = $(mobileTechSupportBtnId)?.attr('value');	
				let mobileApocTechSupportHref = $(mobileApocTechSupportBtnId)?.attr('value');
				if (isApocProduct && mobileApocTechSupportHref) {
					mobileTechSupportHref = mobileApocTechSupportHref;	
				}			
				$(this).find("a.mobile-tech-support-btn").attr("href", mobileTechSupportHref + productUrlData);
            }
        });
    });	
}