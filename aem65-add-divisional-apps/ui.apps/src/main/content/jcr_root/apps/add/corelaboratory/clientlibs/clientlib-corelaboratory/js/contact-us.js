function globalCssFunction (){
    var urlLink = window.location.pathname;
    var stuff = urlLink.split('/');
    var substring = 'contact.html';
    var substring2 =  'contact-us.html';
    $('#section-contact-us-title-container').parent('.container').addClass('add-max-with');

    var substringSearch = 'search-results.html';

    var searchbar  = document.getElementsByClassName("searchbar");

    var pageContent = document.getElementById("pageContent");
 	const responsivegrid = pageContent.querySelector('.responsivegrid');
 	const container = responsivegrid.querySelector('.container');

    for(var i=0; i<stuff.length; i++){
        if(stuff[i].includes(substring) || stuff[i].includes(substring2)){
            container.style.margin = '0px';
          	container.style.backgroundColor = '#009cde';

        }
        else if(stuff[i].includes(substringSearch)){
			const serachContainer = container.querySelector('#section-search-result-container');
            $("#section-search-result-container").parent(".container").addClass("add-max-with");

            searchbar[0].style.display="none";
			serachContainer.style.padding = '0px';
            container.style.padding = '0px';
			serachContainer.style.background = '#009cde';
        }
    }
}

window.onload = function() {
  globalCssFunction();
};


var btn = $('#back-to-top p');
btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '100');
});



(function($) {
    $(document).ready(function() {

        $('#contact-us-submit-btn').parent('.button').addClass('explore-btn-blue');
        $('#contact-us-cancel-btn').parent('.button').addClass('explore-btn-grey');

        const mediaQuery = window.matchMedia('(min-width: 480px) and (max-width: 767px)')
		const mediaQuery1 = window.matchMedia('(min-width: 300px) and (max-width: 1024px)')
        if (mediaQuery.matches) { 
           $('#section-contact-us-info-container').parent('.container').addClass('add-max-with');
        }
        if (mediaQuery1.matches) { 
           $('#section-contact-us-title-container').parent('.container').addClass('remove-padding');
        }

    });
})(jQuery);
//------------------------------ contact us ----------------------------------------------//

var applicationid = "corelaboratory";

var base_url = document.querySelector('#session-api-url').value;
var temp=document.createElement("a"); 
temp.href = base_url; 
base_url = temp.origin; 

var contactUsInfo = `${base_url}/api/public/lookup/referencedata?referenceType=businessLocation`;

var resp = '';





(function($) {
$(document).ready(function(){

    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    
	 $.ajax({
            url: contactUsInfo,
            type: "GET",
            cache: 'no-cache',
            "headers": {
            	"x-application-id": headerApplicationId,
            	"x-country-code": headerCountryCode,
                "x-preferred-language": headerLanguage

        	},
			success: function(responseVal) {
                if(responseVal){
                    resp = responseVal.response
                  }

		},
		error: function(error) {}
	});
})
})(jQuery);

$("#form-option-country-options li").click(function () {
	var selected = $(this).text()
    selected = $.trim(selected)
    if(resp){
		var selectValues = resp.find(o => o.value === selected);
		$(".remove-on-second").remove()

        $("<li class='selected remove-on-second'><span></span></li>")
  			.attr("data-optionvalue", selectValues['key'])
        	.attr("aria-selected", "true")
  			.find("span")
  			.html(selectValues['value'])
  			.end()
  			.appendTo('#hidden-email-form-field-options ul'); 
        $('#hidden-email-form-field-options .a-dropdown-selected').text(selectValues['value']);
    }

});