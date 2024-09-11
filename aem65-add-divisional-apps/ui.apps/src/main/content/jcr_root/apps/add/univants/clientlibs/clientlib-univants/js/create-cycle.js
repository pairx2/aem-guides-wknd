function populateAffiliatedApplicationCycle(){
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplicationCycle&category=present,future',
        type : "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-application-access-key": "admin1#Admin",
        'x-id-token': jwtToken
    },
           success: function(response) {

        $.each(response.response.data, function(affiliatedIndex, affiliatedIndexVal){
            $('ul[name="affiliated-application-cycles"]').append('<li data-id='+ affiliatedIndexVal.id +'><span>'+affiliatedIndexVal.name+'</span></li>');
        });
    },
        error: function(error) {
        }
});
}

$(document).ready(function() {
    
        // Affiliated ApplicationCycle dropdown population
        $("#form-create-assessment-cycle").find("#AffiliatedApplicationCycle-options").find(".a-dropdown__field ul").remove();
        $("#form-create-assessment-cycle").find("#AffiliatedApplicationCycle-options").find(".a-dropdown__field")
        .append('<ul class="a-dropdown__menu" name="affiliated-application-cycles"></ul>');

        $(document).on('click', '.createCycleAction', function(){
			populateAffiliatedApplicationCycle();
        });


    
    });