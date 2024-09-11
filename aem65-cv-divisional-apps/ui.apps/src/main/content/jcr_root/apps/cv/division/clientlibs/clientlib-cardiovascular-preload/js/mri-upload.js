(function(){
    setTimeout(function () {
      $("#mri-upload-submit")?.attr('disabled', true);
	  $('.cmp-embed input').on('click', function(){
       $('.o-form-container__success-msg').text('');
      $('.o-form-container__error-msg').text('');
    	});
      $('.cmp-embed input').on('change', function(){
       $('.o-form-container__success-msg').text('');
      $('.o-form-container__error-msg').text('');
        if($(this)[0].files[0].name.indexOf('.csv') < 0){
      		$(this).closest('.fields').addClass('validation-require');
          $('.allowcsv').addClass('active');
          $("#mri-upload-submit").attr('disabled', true);
        }
        else{
          $('.allowcsv').removeClass('active');
      		$(this).closest('.fields').removeClass('validation-require');
          var sizeInBytes = $(this)[0].files[0].size;
          var sizeInMB = (sizeInBytes / (1024*1024)).toFixed(2);
          if(sizeInMB > 10) {
            $('.allowsize').addClass('active');
            $("#mri-upload-submit").attr('disabled', true);
     		 $(this).closest('.fields').addClass('validation-require');
          }
          else{
            $('.allowsize').removeClass('active');
            $("#mri-upload-submit").attr('disabled', false);
      		$(this).closest('.fields').removeClass('validation-require');
          }
        }
        
      });
$("#mri-upload-submit").on('click', function (event) {
        event.preventDefault();
      loadercallback();
	  var response;
      var formData = new FormData();
        formData.append("file",$('.cmp-embed input')[0].files[0]);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", document.querySelector('input[name="mriUploadRequest"]').value);
    	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
        var headerApplicationId = "cardiovascularaem";
        var headerAccessKey = document.querySelector('input[name="accesskey"]').value;
    	xhr.setRequestHeader("x-country-code", headerCountryCode);
    	xhr.setRequestHeader("x-application-id", headerApplicationId);
		xhr.setRequestHeader("x-application-access-key", headerAccessKey);
        xhr.send(formData);
        xhr.onreadystatechange = function (oEvent) {
           if (xhr.readyState === 4) {
             if (xhr.status === 200) {
      			response = JSON.parse(xhr.responseText).response.statusReason;
				$('.o-form-container__success-msg').text(response);
				$('.o-form-container__success-msg')[0].style.textAlign = "center";
      			contactusSuccessmsgCallback();
             } else {               
				response = xhr.statusText;
				$('.o-form-container__error-msg').text(response);
				$('.o-form-container__error-msg')[0].style.textAlign = "center";
      			contactusFailuremsgCallback();
             }
           }
         }
    });
   },1000);

})();