let cache, cacheMode, placeRequest, placeService, autoService, sessionToken;
let componentForm = {
    street_number: 'short_name',
    locality: 'long_name',
    state: 'short_name',
    postal_code: 'short_name'
};
let placesOptions = {
    types: ['geocode'],
    componentRestrictions: {
        country: 'us'
    }
};

function initAutocomplete() {
    
    $("#street_number").closest(".input-group").append('<div id="suggestions"></div>')

    cache = {};
    cacheMode = 0;
    if(!sessionToken){
        sessionToken = new google.maps.places.AutocompleteSessionToken();
    }
    autoService = new google.maps.places.AutocompleteService();
    placeService = new google.maps.places.PlacesService(document.getElementById('suggestions')); 
    placeRequest = {
        delay: 500,
        minLength: 5,
        source: function (request, response) {
            if ($("#street_number").hasClass("check-select")) {
                $("#street_number").removeClass("check-select");
            }
            pleaceOptionsValue(request, response);            
        },
        focus: function (event, ui) {
            // prevent autocomplete from updating the textbox
            event.preventDefault();
        },
        select: function (event, ui) {
            // prevent autocomplete from updating the textbox
            event.preventDefault();
            $("#street_number").addClass("check-select");
            placesDetailsFill.call(null, ui.item.ref);
        },
        close: function (event, ui) {
            componentFormValue();
        }

    };

    //This binds the jQuery UI autocomplete to the autocomplete field
    $("#street_number").autocomplete(placeRequest);
}

function componentFormValue() {
    if (!$("#street_number").hasClass("check-select")) {
        for (let component in componentForm) {
            if (component != "street_number" && document.getElementById(component)) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
                if ($("#" + component).hasClass("focus")) {
                    $("#" + component).removeClass("focus");
                }
            }
        }
        $('#locality').closest('.fields').show();
        $('#zip').show();
    }
}

function pleaceOptionsValue(request, response) {
    let term = request.term;
    placesOptions.input = $("#street_number").val();
    placesOptions.sessionToken = sessionToken;  // adding session to group API calls in discrete call
    if (placesOptions.input.length > 0) {
        if ((cache) && (term in cache) && (cacheMode === 1)) {
            response(cache[term]);
            return;
        } //utilize cache, if this is a repeat lookup, otherwise do lookup...
        if(term.length == 5 || (term.length-5) % 3 ==0) {
            autoService.getPlacePredictions(placesOptions,
                function (predictions, status) {
                    // predictions is an array of objects and must be transformed for autocomplete to use
                    let array = (status != google.maps.places.PlacesServiceStatus.OK) ? [] : $.map(predictions,
                        function (p) {
                            return {
                                label: p.description,
                                ref: p.place_id,
                                url: "javascript:placesDetailsFill('" + p.place_id + "');" 
                            };
                        }
                    ); //array
                    if (cacheMode === 1) {
                        cache[term] = array;
                    }
                    response(array);
                    showLocality(array);
            }); //autoservice
        }
    } 
}

function showLocality(array) {
    if (array.length <= 0) {
        $('#locality').closest('.fields').show();
        $('#zip').show();
        for (let component in componentForm) {
            if (component != "street_number" && document.getElementById(component)) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
                if ($("#" + component).hasClass("focus")) {
                    $("#" + component).removeClass("focus");
                }
            }
        }
    }
    else {
        $('#locality').closest('.fields').hide();
        $('#zip').hide();
    }
}

function placesDetailsFill(ref) {
    placeService.getDetails({
        placeId: ref
    }, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            fillInAddress(place);
        } 
    });
}

function fillInAddress(place) {
    //clear values in form
    clearFormField();    
    //fill values in form
    for (let i in place.address_components) {
        let addressComp = place.address_components[i];
        if (addressComp) {
            let addressType = addressComp.types[0];
            if (componentForm[addressType]) {
                let val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
                prefillLocality(addressType, val);                    
            } else if (addressType == 'route') {
                let routeVal = place.address_components[i]['long_name'];
                prefillStreetNumber(routeVal);
            }
            if (addressType == 'postal_code') {
                blurPinCode();
            }
            if (addressType == 'administrative_area_level_1') {
                let optVal = place.address_components[i]['short_name'];
                prefillStateOption(optVal);
            }
        }
    } 
    checkStateOption();
}

function blurPinCode() {
    if ($("#valZipCode input#postal_code").val() != "") {
        $("#valZipCode input#postal_code").trigger('blur');
    }
}

function clearFormField() {
    for (let component in componentForm) {
        if(document.getElementById(component)){
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }
    }
}

function checkStateOption() {
    for (let componentid in componentForm) {
        if(document.getElementById(componentid)){
            if (document.getElementById(componentid).value == '') {
                $('#locality').closest('.fields').show();
                $('#zip').show();
            }
        }else{
            let selectComponent = componentid+'-options';
            if(document.getElementById(selectComponent)){
                if(!document.getElementById(selectComponent).querySelector('.a-dropdown__menu li.selected')){
                    $('#locality').closest('.fields').show();
                    $('#zip').show();
                }
            }
        }
    }
}

function prefillStateOption(optVal) {
    if (document.getElementById('street_number').value.trim())
    document.getElementById('street_number').value = (document.getElementById('street_number').value + ', ' + optVal).trim();
    else
        document.getElementById('street_number').value = optVal.trim();
    if($("#state-options").find('.a-dropdown__menu li[data-optionvalue='+optVal+']')){
        $("#state-options").find('.a-dropdown__menu li[data-optionvalue='+optVal+']').addClass('selected').click();
        $("#state-options").find('.a-dropdown__menu').click();
    }
}

function prefillStreetNumber(routeVal) {
    if (document.getElementById('street_number').value.trim())
        document.getElementById('street_number').value = (document.getElementById('street_number').value + ' ' + routeVal).trim();
    else
        document.getElementById('street_number').value = routeVal.trim();
}

function prefillLocality(addressType, val) {
    if (addressType == 'locality' || addressType == 'postal_code') {
        if ($("#" + addressType).val() != "") {
            $("#" + addressType).addClass("focus");
        }
    }
    if (addressType != 'street_number') {
        if (document.getElementById('street_number').value.trim())
            document.getElementById('street_number').value = (document.getElementById('street_number').value + ', ' + val).trim();
        else
            document.getElementById('street_number').value = val.trim();
    }
}

// Could bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
let geolocationshown = false;
function geolocate() {
    try {
        if (geolocationshown)
            return;
        geolocationshown = true;
        navigatorValue();
    }
    catch (err) {
       	$('#locality').closest('.fields').show();
        $('#zip').show();
        for (let component in componentForm) {
            if (component != "street_number" && document.getElementById(component)) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
                if (document.getElementById(component).classList.contains('focus')) {
                    document.getElementById(component).classList.remove('focus');
                }
            }
        }
    }
}

function navigatorValue() {
    if ((navigator.geolocation)) { //disable, for now...
        navigator.geolocation.getCurrentPosition(function (position) {
            if (typeof (google) != "undefined") {
                let geolocation = new google.maps.LatLng(
                    position.coords.latitude, position.coords.longitude);
                let circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                let autocomplete;
                if (autocomplete) {
                    autocomplete?.setBounds(circle?.getBounds());
                }                    
            }
            else {
                $('#locality').closest('.fields').show();
                $('#zip').show();
                for (let comp in componentForm) {
                    componentValue(comp);                   
                }
            }
            });
        
    } //if
}

function componentValue(comp) {
    if (component != "street_number" && document.getElementById(component)) {
        document.getElementById(comp).value = '';
        document.getElementById(comp).disabled = false;
        if (document.getElementById(comp).classList.contains('focus')) {
            document.getElementById(comp).classList.remove('focus');
        }
    }
}

$(function () {
    if($('#street_number').length > 0) { 
        $('#locality').closest('.fields').hide();
        $('#zip').hide();
        $('#signup-form button[name="next"]').removeAttr('disabled');
        $('#signup-form button[type="submit"]').removeAttr('disabled');
        let mapAPI = $('[name="map-api"]').val();
        $('head').append('<script src='+mapAPI+' async defer></script>');
        $("#street_number").on('focus', function(){
            geolocate();
        });
    }
    $('#street_number').on('blur', function() {
        if($('#locality').val() == '' || $('#postal_code').val() == '' || (!$('#state-options [name="state"]').find('.selected').length > 0)) {
            $('#locality').closest('.fields').show();
            $('#zip').show();
        }
    });
});