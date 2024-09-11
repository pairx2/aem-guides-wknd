(function(){

    $(document).on("click", ".m-poi-locator-results__list-item-detail--visit-website", function(e) {
        let donationCenterName= $(this).closest(".m-poi-locator-results__list-item-detail").find('.m-poi-locator-results__list-item-detail--store-name').text();        
        let donationCenterAddress= $(this).closest(".m-poi-locator-results__list-item-detail").find('.m-poi-locator-results__list-item-detail--store-address').text();
        let donationCenterLink= $(this).closest(".m-poi-locator-results__list-item-detail").find('.m-poi-locator-results__list-item-detail--visit-website').find('a').attr('href');
        let poiData = JSON.parse(localStorage.getItem("poiLocator"));
        let donateData = poiData.filter(x => x.website === donationCenterLink);
        
        let checkBox = [];
        $("input:checkbox[name=donate]:checked").each(function(){
            checkBox.push($(this).val());
        });
        
        let data = {
            "event": "donate link",
            "donationcenter_name": donationCenterName, 
            "donationcenter_address": donationCenterAddress, 
            "donationcenter_link": donationCenterLink,
            "donationcenter_country": donateData[0].country,
            "donationcenter_city": donateData[0].city,
            "donationcenter_SearchLocation": $(".m-poi-locator-search-bar__input-field").val(),
            "donationcenter_donate": checkBox
        }
        
        window.addAnalytics.fireAnalyticsEvent("donate_link", data);
	});

    $(document).on("click", ".a-pin-icon-popup__name > a", function(e) {
        let donationCenterName= $(this).closest(".a-pin-icon-popup").find('.store-name').text();     
        let donationCenter= $(this).closest(".a-pin-icon-popup").find('.a-pin-icon-popup__name');
        let donationCenterAddress = $(donationCenter[1]).text();
        let donationCenterLink= $(donationCenter[3]).find('a').attr('href');
        
        let data = {
            "event": "donate link",
            "donationcenter_name": donationCenterName, 
            "donationcenter_address": donationCenterAddress,
            "donationcenter_link": donationCenterLink
        }

        window.addAnalytics.fireAnalyticsEvent("donate_link", data);
    });

    

})();