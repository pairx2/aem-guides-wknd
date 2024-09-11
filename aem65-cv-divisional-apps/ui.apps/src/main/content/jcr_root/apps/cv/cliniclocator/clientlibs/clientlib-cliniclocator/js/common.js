function getGoogleLatLng() {
    setTimeout(() => {
    var addressOne = document.querySelector('input[name="addressOne"]').value.trim();
    var addressTwo = document.querySelector('input[name="addressTwo"]').value !== '' ? " " + document.querySelector('input[name="addressTwo"]').value.trim() : '';
    var city = document.querySelector('input[name="city"]').value !== '' ? " " + document.querySelector('input[name="city"]').value.trim() : '';
    var state = $("ul[name='zone'] li").closest('.selected').attr('data-optionvalue') !== undefined ? " " + $("ul[name='zone'] li").closest('.selected').attr('data-optionvalue') : '';
    var fullAddress = addressOne + addressTwo + city + state ;
    var googleApiKey = document.querySelector('input[name="googleApiKey"]').value;
    var googleApiUrl = document.querySelector('input[name="googleApiUrl"]').value;
    fetch(googleApiUrl + '?address=' + fullAddress.trim() + '&key=' + googleApiKey) 
        .then(response => response.json())
        .then(data => {
            $('input[name="geometry.latitude"]').val(data.results[0].geometry.location.lat);
            $('input[name="geometry.longitude"]').val(data.results[0].geometry.location.lng);
        })
        .catch(error => console.error(error));
    }, 500);
}

function setFieldData() {
    var userData = JSON.parse(sessionStorage.getItem('rowData'));
    var userName = userData.name.replace(",", "").split(" ");

    const $clinicNumber = document.querySelector('input[name="id"]');
    const $Hospital = document.querySelector('input[name="hospital"]');

    if($('input[name="name"]').val() !== 'hospital') {
        var oldDataFirstName, oldDataLastName;
        const $lastName = document.querySelector('input[name="lastName"]');
        const $firstName = document.querySelector('input[name="firstName"]');
        if ($('input[name="name"]').val() == 'last, first') {
            oldDataLastName = userName[0] !== undefined ? userName[0] : '';
            oldDataFirstName = userName[1] !== undefined ? userName[1] : '';
            $lastName.value = userData.lastName && userData.lastName !== null ? userData.lastName : oldDataLastName;
     	    $firstName.value = userData.firstName && userData.firstName !== null ? userData.firstName : oldDataFirstName;
        }
        else{
            oldDataLastName = userName[1] !== undefined ? userName[1] : '';
            oldDataFirstName = userName[0] !== undefined ? userName[0] : '';
            $lastName.value = userData.lastName && userData.lastName !== null ? userData.lastName : oldDataLastName;
     	    $firstName.value = userData.firstName && userData.firstName !== null ? userData.firstName : oldDataFirstName;
        }
    }else if($('input[name="avier"]').val() == 'AVIER'){
        const $lastName = document.querySelector('input[name="lastName"]');
        const $firstName = document.querySelector('input[name="firstName"]');
        $lastName.value = userData.lastName && userData.lastName !== null ? userData.lastName :''; 
        $firstName.value = userData.firstName && userData.firstName !== null ? userData.firstName: '';
    }
    const $AddressOne = document.querySelector('input[name="addressOne"]');
    const $AddressTwo = document.querySelector('input[name="addressTwo"]');
    const $city = document.querySelector('input[name="city"]');
    const $zipCode = document.querySelector('input[name="zipCode"]');
    const $phone = document.querySelector('input[name="phone"]');
    const $website = document.querySelector('input[name="website"]');
    const $credentials = document.querySelector('input[name="credentials"]');
    const $lat = document.querySelector('input[name="geometry.latitude"]');
    const $long = document.querySelector('input[name="geometry.longitude"]');
    const $type = document.querySelector('input[name="type"]');
    const $notes = document.querySelector('textarea[name="notes"]');
    const $lang = document.querySelector('input[name="language"]');
    const $salesrepname = document.querySelector('input[name="salesRepName"]');
    const $salesregion = document.querySelector('input[name="salesRegion"]');
    const $salesarea = document.querySelector('input[name="salesArea"]');
    const $physicianprefix = document.querySelector('input[name="physicianPrefix"]');

    $clinicNumber.value = userData.id;
    $Hospital.value = userData.hospital && userData.hospital !== null ? userData.hospital : '';
    $AddressOne.value = userData.addressOne && userData.addressOne !== null ? userData.addressOne : '';
    $AddressTwo.value = userData.addressTwo && userData.addressTwo !== null ? userData.addressTwo : '';
    $city.value = userData.city && userData.city !== null ? userData.city : '';
    $type.value = userData.type && userData.type !== null ? userData.type : '';
    $zipCode.value = userData.zipCode && userData.zipCode !== null ? userData.zipCode : ''; 
    $phone.value = userData.phone && userData.phone !== null ? userData.phone : '';
    $lat.value = userData.geometry.latitude && userData.geometry.latitude !== null ? userData.geometry.latitude : '';
    $long.value = userData.geometry.longitude && userData.geometry.longitude !== null ? userData.geometry.longitude : '';
    $website.value = userData.website && userData.website !== null ? userData.website : '';
    $credentials.value = userData.credentials && userData.credentials !== null ? userData.credentials : '';
    $notes.value = userData.notes && userData.notes !== null ? userData.notes : '';
    $lang.value = userData.language && userData.language !== null ? userData.language : '';
    $salesrepname.value = userData.salesRepName && userData.salesRepName !== null ? userData.salesRepName : '';
    $salesregion.value = userData.salesRegion && userData.salesRegion !== null ? userData.salesRegion : ''; 
    $salesarea.value = userData.salesArea && userData.salesArea !== null ? userData.salesArea : '';
    $physicianprefix.value = userData.physicianPrefix && userData.physicianPrefix !== null ? userData.physicianPrefix : '';


    document.querySelector('input[name="geometry.latitude"]').disabled = true;
    document.querySelector('input[name="geometry.longitude"]').disabled = true;

    $("#adminEditLat").click(function() {
        document.querySelector('input[name="geometry.latitude"]').disabled = false;
    })
    $("#adminEditLong").click(function() {
        document.querySelector('input[name="geometry.longitude"]').disabled = false;
    })

    var selected_value_spec, selected_value_country, selected_value_region, selected_value_zone, selected_value_device, selected_value_status;
    var speciality = userData.speciality && userData.speciality !== null && userData.speciality[0] !== null ?  userData.speciality[0] : '';
    var speciality_li = $("ul[name='speciality'] li");
    $(speciality_li).each(function() {
        selected_value_spec = $(this).attr('data-optionvalue');
        if (selected_value_spec == speciality) {
            $("ul[name='speciality'] li").removeClass("selected");
            $(this).addClass("selected");
            $(this).parent().parent().find('.a-dropdown-selected').text(speciality);
        }
    })

   var deviceType = userData.deviceType && userData.deviceType !== null && userData.deviceType[0] !== null ? userData.deviceType[0] : '';
    var device_li = $("ul[name='deviceType'] li");
    $(device_li).each(function() {
        selected_value_device = $(this).attr('data-optionvalue');
        if (selected_value_device == deviceType) {
            $("ul[name='deviceType'] li").removeClass("selected");
            $(this).addClass("selected");
            $(this).parent().parent().find('.a-dropdown-selected').text(deviceType);
        }
    })

    var status = userData.status && userData.status !== null ? userData.status : '';
    var status_li = $("ul[name='status'] li");
    $(status_li).each(function() {
        selected_value_status = $(this).attr('data-optionvalue');
        if (selected_value_status == status) {
            $("ul[name='status'] li").removeClass("selected");
            $(this).addClass("selected");
            $(this).parent().parent().find('.a-dropdown-selected').text(status);
        }
    })
    
    var countryCode = userData.country && userData.country !== null ? userData.country : '';
    var countryCode_li = $("ul[name='country'] li");
    $(countryCode_li).each(function() {
        selected_value_country = $(this).attr('data-optionvalue');
        if (selected_value_country == countryCode) {
            $("ul[name='country'] li").removeClass("selected");
            $(this).addClass("selected");
            $(this).parent().parent().find('.a-dropdown-selected').text(countryCode);
        }
    })

    var region = userData.region && userData.region !== null ? userData.region : '';
    var region_li = $("ul[name='region'] li");
    $(region_li).each(function() {
        selected_value_region = $(this).attr('data-optionvalue');
        if (selected_value_region == region) {
            $("ul[name='region'] li").removeClass("selected");
            $(this).addClass("selected");
            $(this).parent().parent().find('.a-dropdown-selected').text(region);
        }
    })

    var zone = userData.zone && userData.zone !== null ? userData.zone : '';
    var zone_li = $("ul[name='zone'] li");
    $(zone_li).each(function() {
        selected_value_zone = $(this).attr('data-optionvalue');
        if (selected_value_zone == zone) {
            $("ul[name='zone'] li").removeClass("selected");
            $(this).addClass("selected");
            $(this).parent().parent().find('.a-dropdown-selected').text(zone);
        }
    })
}

function dropdownClickEvent() {
    setTimeout(() => {
        var language_li = $("ul[name='poiType'] li");
        var selected_value_language_li, selected_value_poitype, textContent;

        $(language_li).each(function() {
            selected_value_language_li = $(this).attr('data-optionvalue');
            $("#" + selected_value_language_li).hide();
        })

        selected_value_poitype = $("ul[name='poiType'] li.selected").attr('data-optionvalue');
        textContent = $("#" + selected_value_poitype).attr('data-count') !== undefined ? $("#" + selected_value_poitype).attr('data-count') : '';
        $("#countTitle").find(".cmp-title__text").text($("#countTitle").find(".cmp-title__text").text().split(" (")[0] + " (" + textContent + ")");
        $("#" + selected_value_poitype).show();
    }, 500);
}

dropdownClickEvent();

$("ul[name='poiType'] li").on("click", function() {
    dropdownClickEvent();
});

if ($("#admin-edit-user").length > 0) {
    setFieldData();
}

$(".o-form-container__buttons").prependTo("#clinic_number .button");

if ($(".o-form-container").length > 0) {
    $(".o-form-container__success-msg").addClass("alert alert-success alert-dismissible").attr("data-dismiss", "alert");
    $(".o-form-container__error-msg").addClass("alert alert-danger alert-dismissible").attr("data-dismiss", "alert");
}

$('input[name="addressOne"], input[name="addressTwo"], input[name="city"]').on("focusout", function() {
    getGoogleLatLng();
});

$("ul[name='zone'] li").on("click", function() {
    getGoogleLatLng();
});

$("input[name='id']").prop('disabled', true);
$("input[name='type']").prop('disabled', true);
$("input[name='language']").prop('disabled', true);

if ($("#admin_search").length > 0) {
    if($(window).width() <= 768){
        $("#admin_search .row>.col-12.col-md-8").removeClass("col-md-8").addClass("col-md-6");
        $("#admin_search .row>.col-12.col-md-4").removeClass("col-md-4").addClass("col-md-6");
        $("#admin_search .row>.col-12.col-md-6 .row").css("align-items", "baseline");
    }
}

$(window).on('load', function() {

    $(".a-dropdown").click(function() {
        if (!$(this).find(".a-dropdown__field").hasClass('active')) {
            $(".a-dropdown__container .a-dropdown__field .a-dropdown__menu").css("display", "none");
            $(".a-dropdown__container .a-dropdown__field").removeClass('active');
            $(this).find(".a-dropdown__field .a-dropdown__menu").css("display", "block");

        } else {
            $(this).find(".a-dropdown__field .a-dropdown__menu").css("display", "none");
        }
    });

    $(document).click(function(e) {
        var dropdown_menu_container = $(".a-dropdown__container .a-dropdown__field .a-dropdown__menu");
        if (!dropdown_menu_container.is(e.target) && !dropdown_menu_container.has(e.target).length) {
            dropdown_menu_container.hide();
        }
    })

});