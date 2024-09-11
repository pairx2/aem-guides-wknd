$(() => {
	if($('#arvato-shipment-tracker').length > 0){
        let trackerPageUrl, decodedshipDetails, shipDetailsArr,countryLanguage, countryCode;
        
        trackerPageUrl = window.location.href;
        decodedshipDetails = atob(trackerPageUrl.substring(trackerPageUrl.lastIndexOf('/')+1));
        shipDetailsArr = decodedshipDetails.split('/');
    	countryLanguage = $('[name="x-preferred-language"]').val().slice(0, 2).toLowerCase();
  		countryCode = $('[name="x-country-code"]').val().toLowerCase();
        
          if(decodedshipDetails && shipDetailsArr.length) {
            $("arvato-track-and-trace-widget").attr("orderid", shipDetailsArr[1]);
            $("arvato-track-and-trace-widget").attr("zipcode", shipDetailsArr[3]);
            $("arvato-track-and-trace-widget").attr("lang", countryLanguage);
            $("arvato-track-and-trace-widget").attr("country", countryCode);
        }        
    }
});