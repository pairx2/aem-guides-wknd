function updateUserRequest(data) {

    var reqObj = data.body;
    delete reqObj['node'];
    delete reqObj['requestType'];
    delete reqObj['updateRequest'];
    delete reqObj['g-recaptcha-response'];


    if ($('input[name="name"]').val() == 'last, first' && data.body.lastName !== null && data.body.lastName !== undefined && data.body.lastName !== "") {
        data.body.name = data.body.lastName + ", " + data.body.firstName;
    }
    if ($('input[name="name"]').val() == 'first last' && data.body.lastName !== null && data.body.lastName !== undefined && data.body.lastName !== "") {
        data.body.name = data.body.firstName + " " + data.body.lastName;
    }

    if($('ul[name="type"] li.selected').attr('data-optionvalue') == 'AVEIR'){
        data.body.name = data.body.firstName + " " + data.body.lastName;
	}else if($('input[name="type"]').val() == 'AVEIR'){
        data.body.name = data.body.firstName + " " + data.body.lastName;
    }else if($('input[name="name"]').val() == 'hospital'){
        data.body.name = data.body.hospital;
    }    

    if ($('input[name="physicianPrefix"]').val() == '' && data.body.physicianPrefix == undefined && data.body.physicianPrefix == null) {
        data.body.physicianPrefix = '';
    }
    if ($('input[name="firstName"]').val() == '' && data.body.firstName == undefined && data.body.firstName == null) {
        data.body.firstName = '';
    }
    if ($('input[name="lastName"]').val() == '' && data.body.lastName == undefined && data.body.lastName == null) {
        data.body.lastName = '';
    }
    if ($('input[name="addressTwo"]').val() == '' && data.body.addressTwo == undefined && data.body.addressTwo == null) {
        data.body.addressTwo = '';
    }
    if ($('input[name="website"]').val() == '' && data.body.website == undefined && data.body.website == null) {
        data.body.website = '';
    }
    if ($("ul[name='deviceType'] li").closest('.selected').attr('data-optionvalue') == undefined) {
        data.body.deviceType = '';
    }
    if ($("ul[name='speciality'] li").closest('.selected').attr('data-optionvalue') == undefined) {
        data.body.speciality = '';
    }
    if ($('input[name="salesRepName"]').val() == '' && data.body.salesRepName == undefined && data.body.salesRepName == null) {
        data.body.salesRepName = '';
    }
    if ($('input[name="salesRegion"]').val() == '' && data.body.salesRegion == undefined && data.body.salesRegion == null) {
        data.body.salesRegion = '';
    }
    if ($('input[name="salesArea"]').val() == '' && data.body.salesArea == undefined && data.body.salesArea == null) {
        data.body.salesArea = '';
    }


    if ($('input[name="credentials"]').val() == '' && data.body.credentials == undefined && data.body.credentials == null) {
        data.body.credentials = '';
    }
    if ($('input[name="language"]').val()  == '' && data.body.language == undefined && data.body.language == null) {
        data.body.language = '';
    }
    if ($('input[name="notes"]').val() == '' && data.body.notes == undefined && data.body.notes == null) {
        data.body.notes = '';
    }


}

function getCount(data) {
    var count = data.resData.poiData.length;
    if (data.index == count - 1) {
        var type = data.data.type.toLowerCase();
        $("#" + type).attr("data-count", count);
        dropdownClickEvent();
    }
}


