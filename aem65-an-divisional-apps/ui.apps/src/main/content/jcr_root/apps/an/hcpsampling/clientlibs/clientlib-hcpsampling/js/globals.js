let wcmmodeOff;
let xApplicationId = document.querySelector('input[name="x-application-id"]').value;
let xCountryCode = document.querySelector('input[name="x-country-code"]').value;
let xPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;

$(document).ready(function () {   

    wcmmodeOff = $('#wcmMode')?.val() == 'true' ? false : true;   
   
    // Hide sampling for Abbott user
    if(localStorage.getItem('isAbtUsr')){
        $('#requestSampleButton').hide();
        
    }

    
    let siteLeavingModal = $('#site-entering-popup-content');
    if (siteLeavingModal.length && wcmmodeOff) {
        $(document).on('click', "#siteLeavingPopupFragmentPathModal div[data-btn-type='continue'] .btn", function () {
            $("#siteLeavingPopupFragmentPathModal div[data-dismiss='modal']")[0].click();
        });
    }
    $('#read-less').hide();
    $("#read-more").click(function() {      
        $(this).hide()
		$("#further-education-news .m-hero__body").addClass("read-more");        
    });
    $("#read-less").click(function() {       
        $(this).hide()
        $('#read-more').show();
		$("#further-education-news .m-hero__body").removeClass("read-more");        
    });
	
	$("#further-education-news .m-hero__body").scroll(function(e) {
		e.preventDefault();
		let y = $(this).scrollTop();		
		if (y > 100) {
		$('#read-less').show();		
		} else {
		 $('#read-less').hide();
		}
	});
	
});