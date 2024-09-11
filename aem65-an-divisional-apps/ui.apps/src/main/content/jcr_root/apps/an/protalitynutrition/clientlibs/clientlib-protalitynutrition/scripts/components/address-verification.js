let cache, cacheMode, placeRequest, placeService, autoService;
// Initializing form fields
let componentForm = {
    street_number: 'short_name',
    locality: 'long_name',
    state: 'short_name',
    postal_code: 'short_name',
    country: 'long_name'
};
let placesOptions = {
    types: ['geocode'],
    componentRestrictions: {
        country: 'us'
    }
};

let strStreet = 'street_number';
let streetNumber = $("#street_number");
let localityAdd = $('#locality');
let zipCodeAdd = $('#postal_code');
let stateAdd = $('#state-options');
let statePlaceholder = stateAdd.find('.a-dropdown__placeholder').text().trim();

//Binding autocomplete function
function initAutocomplete() {

    streetNumber.closest(".input-group").append('<div id="suggestions"></div>')

    cache = {};
    cacheMode = 0;
    autoService = new google.maps.places.AutocompleteService();
    placeService = new google.maps.places.PlacesService(document.getElementById('suggestions')); //html "div" required!!
    placeRequest = {
        delay: 0,
        minLength: 5,
        source: function (request, response) {
            if (streetNumber.hasClass("check-select")) {
                streetNumber.removeClass("check-select");
            }
            let term = request.term;
            placesOptions.input = streetNumber.val();
            if (placesOptions.input.length > 0) {
                if ((cache) && (term in cache) && (cacheMode === 1)) {
                    response(cache[term]);
                    return;
                } //utilize cache, if this is a repeat lookup, otherwise do lookup...
                autoService.getPlacePredictions(placesOptions,
                    function (predictions, status) {
                        // predictions is an array of objects and must be transformed for autocomplete to use
                        let array = (status != google.maps.places.PlacesServiceStatus.OK) ? [] : $.map(predictions,
                            function (p) {
                                return {
                                    label: p.description,
                                    ref: p.place_id,
                                    url: "javascript:placesDetailsFill('" + p.place_id + "');" //not necessary, <a href=""> is better
                                };
                            }
                        ); //array
                        if (cacheMode === 1) {
                            cache[term] = array;
                        }
                        response(array);
                        toggleAddressFields(array);
                    }
                ); //autoservice
            }
        },
        focus: function (event) {
            // prevent autocomplete from updating the textbox
            event.preventDefault();
        },
        select: function (event, ui) {
            // prevent autocomplete from updating the textbox
            event.preventDefault();
            streetNumber.addClass("check-select");
            placesDetailsFill.call(null, ui.item.ref);
        },
        close: function () {
            if (!streetNumber.hasClass("check-select")) {
                iterateThroughFields();
                showAddressFields();
            }
        }

    };

    //This binds the jQuery UI autocomplete to the autocomplete field
    streetNumber.autocomplete(placeRequest);
}

//function to call fill up address
function placesDetailsFill(ref) {
    placeService.getDetails({
        placeId: ref
    }, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            fillInAddress(place);
        }
    });
}

//function call to fill the address fields
function fillInAddress(place) {
    //clear values in form
    for (let component in componentForm) {
        setDefaultAddress(component);
    }
    //fill values in form
    for (let i in place.address_components) {
        let addressComp = place.address_components[i];
        if (addressComp) {
            let addressType = addressComp.types[0];
            if (addressType) {
                if (componentForm[addressType]) {
                    let val = place.address_components[i][componentForm[addressType]];
                    assignAddressValue(addressType,val);
                    localityOrZipAddress(addressType);
                    notStreetAddress(addressType,val);
                } else if (addressType == 'route') {
                    routeAddress(' '+place.address_components[i]['long_name']);
                }
                zipCodeAddress(addressType);
                administrativeAddress(addressType, place, i);
            }
        }
    }
    callToShowAddressFields();
}

//assign the values according to address type
function assignAddressValue(addressType, val) {
    if (document.getElementById(addressType) != null) {
        document.getElementById(addressType).value = val;
    }
}

//if address type is not street
function notStreetAddress(addressType, val) {
    if ((addressType != strStreet) && (addressType != 'country')) {
        routeAddress(', '+val);
    }
}
$('#street_number').on('change', function() {

    let isAutoFill = ($('#street_number').css('background-color') !== 'rgb(255, 255, 255)');
    let streetVal = document.getElementById(strStreet).value.split(',').filter(word => word.trim().length > 0).join().trim();
    document.getElementById(strStreet).value = streetVal;

    if(isAutoFill) {

        let isFullAddress = streetVal.split(',');
        if(isFullAddress.length === 4) {
            document.getElementById('locality').value = isFullAddress[1].trim();
            document.getElementById('postal_code').value = isFullAddress[3].trim();
            populateState(isFullAddress[2]);
        } else {
            showAddressFields();
            $('#stateHidden').closest('.fields').show();
            $('#state-options .a-dropdown__field').css('backgroundColor','rgb(232, 240, 254)');
            setTimeout(function() {
                let stateFromAutoFill = $('#stateHidden').val();
                if(stateFromAutoFill.length > 0) {
                    populateState(stateFromAutoFill);
                }
                $('#stateHidden').closest('.fields').hide();
            },500);
        }
    }
});

//if address type is administrative
function administrativeAddress(addressType, place, i) {
    if (addressType == 'administrative_area_level_1') {
        let optVal = place.address_components[i]['short_name'];
        routeAddress(', '+optVal);
        populateState(optVal);
    }
}

function populateState(value) {
    if (stateAdd.find('.a-dropdown__menu li[data-optionvalue=' + value.trim() + ']').length > 0) {
        stateAdd.find('.a-dropdown__menu li[data-optionvalue=' + value.trim() + ']').addClass('selected').click();
        stateAdd.find('.a-dropdown__menu').click();
    } else {
        $('#state-options .a-dropdown__menu li span').map(function() { 
            if($(this).text().trim() === value) {
                let optionValue = $(this)[0].parentElement.dataset.optionvalue;
                stateAdd.find('.a-dropdown__menu li[data-optionvalue=' + optionValue.trim() + ']').addClass('selected').click();
                stateAdd.find('.a-dropdown__menu').click();
            }
        });
    }
}

//if address type is zip code
function zipCodeAddress(addressType) {
    if (addressType == 'postal_code') {
        if (zipCodeAdd.val() != "") {
            zipCodeAdd.trigger('blur');
        }
    }
}

//if address type is either locality or zipcode
function localityOrZipAddress(addressType) {
    if (addressType == 'locality' || addressType == 'postal_code') {
        if ($("#" + addressType).val() != "") {
            $("#" + addressType).addClass("focus");
        }
    }
}

//if address type is route
function routeAddress(val) {
    if (document.getElementById(strStreet).value.trim())
        document.getElementById(strStreet).value = (document.getElementById(strStreet).value + val).trim();
    else
        document.getElementById(strStreet).value = val.trim();
}

function callToShowAddressFields() {
    for (let componentid in componentForm) {
        if (document.getElementById(componentid)) {
            if (document.getElementById(componentid).value == '') {
                showAddressFields();
            }
        } else {
            let selectComponent = componentid + '-options';
            if (document.getElementById(selectComponent)) {
                if (!document.getElementById(selectComponent).querySelector('.a-dropdown__menu li.selected')) {
                    showAddressFields();
                }
            }
        }
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
                    showAddressFields();
                    iterateThroughFields();
                }
            });

        }
    }
    catch (err) {
        showAddressFields();
        iterateThroughFields();
    }
}

//function to iterate through the address fields
function iterateThroughFields() {
    for (let component in componentForm) {
        if (component != strStreet) {
            setDefaultAddress(component);
        }
    }
}

streetNumber.on('keyup change input', function () {
    if (streetNumber.val() === "") {
        for (let component in componentForm) {
            setDefaultAddress(component);
        }
    }
})

//function to reset address
function setDefaultAddress(component) {
    if (document.getElementById(component)) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
        if ($("#" + component).hasClass("focus")) {
            $("#" + component).removeClass("focus");
        }
    } else if (component == "state") {
        stateAdd.find('.a-dropdown-selected').text(statePlaceholder);
        stateAdd.find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder');
    }
}

//function to show address fields
function showAddressFields() {
    localityAdd.closest('.fields').show();
    zipCodeAdd.closest('.fields').show();
    stateAdd.closest('.options').show();
}

//function to show or hide address fields
function toggleAddressFields(array) {
    if (array.length <= 0) {
        showAddressFields();
        iterateThroughFields();
    }
    else {
        localityAdd.closest('.fields').hide();
        zipCodeAdd.closest('.fields').hide();
        stateAdd.closest('.options').hide();
        localityAdd.parents('.form-group').removeClass('validation-require');
        zipCodeAdd.parents('.form-group').removeClass('validation-require');
    }
}

$(function () {
    if (streetNumber.length > 0) {
        let mapAPI = $('[name="map-api"]').val();
        $('head').append('<script src=' + mapAPI + ' async defer></script>');
        streetNumber.on('focus', function () {
            geolocate();
        });
    }
});