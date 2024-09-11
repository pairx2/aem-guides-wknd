function MRISuccessmsgCallback(data){
	var colNumber = data.response.column_number;
    var redirectURL;
	var serialNumber = data.response.serial;
    if(colNumber==0){
        redirectURL = $('[name=mri-'+ colNumber +']').val();
    }
    else{
        if(colNumber > 0 && colNumber < 8){
	        redirectURL = $('[name=mri-verification').val() + '0' + colNumber;
        }
        else{
	        redirectURL = $('[name=mri-verification').val() + colNumber;
        }
    }

    if(colNumber>=0 && redirectURL){
		window.location.href = window.location.origin + redirectURL + '.html?id='+serialNumber;
    }
}
(function() {           
	setTimeout(function() { 
        if($('#mri_id').length > 0){
			var id  = urlParam('id');
            $('#mri_id').text(id);
        }
        function urlParam(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
            return (results !== null) ? results[1] || 0 : false;
        }

    }, 1000);

})();