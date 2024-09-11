let dropdownFilter = `<input type="text" placeholder="Search" id="dropdown-filter" tabindex="-1" class="form-control a-input-control" readonly>`;
$('#registrationInstitutionName-options').find('.a-dropdown__field span').after(dropdownFilter);

let dropdownMenu = `<ul class="a-dropdown__menu" name="orgName"></ul>`;
$('#registrationInstitutionName-options').find('.a-dropdown__field').append(dropdownMenu);

let sitesearchAPI = $('#headerSearchSuggestApi').attr('data-api');
let domainName = sitesearchAPI.split('api')[0];
let addressPopulationAPI = "api/public/lookup/checkaddress";
let fetchAddress = domainName.concat(addressPopulationAPI);

let addHeaders = new Headers();
addHeaders.append("x-application-id", $("input[name=x-application-id]").val());
addHeaders.append("x-country-code", $("input[name=x-country-code]").val());
addHeaders.append("x-preferred-language", $("input[name=x-preferred-language]").val());
addHeaders.append("Content-Type", "application/json");

let workplacePlaceholder = $("#registrationInstitutionName-options .a-dropdown__field").find(".a-dropdown__placeholder");
let workplacePlaceholderText = workplacePlaceholder.text();
let addressList1 = $('#registrationInstitutionName-options').find('.a-dropdown__menu').children();

$("#dropdown-filter").on("keyup", function() {
    let value = this.value.toLowerCase().trim();
    $('#registrationInstitutionName-options').find('.a-dropdown__menu li span').show().filter(function() {
      return $(this).text().toLowerCase().trim().indexOf(value) == -1;
    }).hide();
});

$(document).on("click", function(e) {
    let filterFocus = false,
        dropdownFilterId = $('#dropdown-filter'),
        registrationOption = $('#registrationInstitutionName-options');

    if (dropdownFilterId.length > 0) {
        filterFocus = dropdownFilterId.is(":focus");
    }

    if (!filterFocus) {
        dropdownFilterId.val('');
        registrationOption.find('.a-dropdown__menu li span').show()
        registrationOption.find('.a-dropdown__field').removeClass('filter-active');
    } else {
        registrationOption.find('.a-dropdown__field').addClass('filter-active');

        setTimeout(function() { 
            registrationOption.find('.a-dropdown__field').addClass('active');
        }, 100);
    }

    setTimeout(function() { 
        if (registrationOption.find('.a-dropdown__field').hasClass('active')) {
            dropdownFilterId.prop('readonly', false);
        } else {
            dropdownFilterId.prop('readonly', true);
        }
    }, 100);
});

$("#postalcode").focusin(function() {
	$('#registrationInstitutionName-options').find('.a-dropdown__menu').children().remove();

        $("#registrationInstitutionName-options").find('.a-dropdown__field span').removeClass("a-dropdown-selected");
        $("#registrationInstitutionName-options").find('.a-dropdown__field span').addClass("a-dropdown__placeholder");
        $('#registrationInstitutionName-options').find('.a-dropdown__field span').text(workplacePlaceholderText);
        $("#registrationStreet").val($(addressList1).attr('billingStreet'));
        $("#registrationState").val($(addressList1).attr('billingState'));
        $("#registrationCity").val($(addressList1).attr('billingCity'));
});

$("#postalcode").focusout(function() {
		if($("#postalcode").val() == "00000" && $("input[name=x-country-code]").val() === "TH")
        {        
            const dummyValue = `<li data-optionvalue="" billingStreet="" billingState="" billingCity="" ><span>N/A</span></li>`;
            $('#registrationInstitutionName-options').find('.a-dropdown__menu').append(dummyValue);
        }
        else{
            let postcodefield = $("#postalcode").val();
            getAddressByPostalCode(postcodefield);
        }		
});

function sortResults(prop, asc,addressJson) {
    addressJson.sort(function(a, b) {
        if (asc) {
            let a_SortAddress = ((a[prop] < b[prop]) ? -1 : 0)
             return (a[prop] > b[prop]) ? 1 : a_SortAddress;
         } else {
            let b_sortAddress = ((b[prop] < a[prop]) ? -1 : 0)
             return (b[prop] > a[prop]) ? 1 : b_sortAddress;
         }
    });
    return addressJson;
}

function getAddressByPostalCode(postcodefield) {
    let raw = JSON.stringify({
        "postCode": postcodefield
    });

	let requestOptions = {
  	  method: 'POST',
  	  headers: addHeaders,
  	  body: raw,
      redirect: 'follow'
	};

	fetch(fetchAddress, requestOptions)
      .then(response => response.text())
      .then(function (result) {
      	if(result){
        	let jsonResult = JSON.parse(result);
        	let addressResult = jsonResult.response;
        	localStorage.setItem("addressDetails", JSON.stringify(addressResult));
            let addressJson = JSON.parse(localStorage.getItem("addressDetails"));

            addressJson = sortResults('orgName', true,addressJson);
            if($('#registrationInstitutionName-options').find('.a-dropdown__menu').children().length > 0){
				$('#registrationInstitutionName-options').find('.a-dropdown__menu').children().remove();
			}
            addressJson.forEach(function(item) {
			const orgData = `<li data-optionvalue="${item.accountId}" billingStreet="${item.billingStreet}" billingState="${item.billingState}" billingCity="${item.billingCity}" ><span>${item.orgName}</span></li>`;
                $('#registrationInstitutionName-options').find('.a-dropdown__menu').append(orgData);

			});
            let addressList = $('#registrationInstitutionName-options').find('.a-dropdown__menu').children();
            $(addressList).click(function(){
            	$(this).each(function(){
                    $("#registrationStreet").val($(this).attr('billingStreet'));
                    $("#registrationState").val($(this).attr('billingState'));
                    $("#registrationCity").val($(this).attr('billingCity'));
            	});
            });
		}
})
      .catch(error => console.log('error', error));
}
