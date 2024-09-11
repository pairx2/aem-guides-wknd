let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
function populateUserdata() {    
    const token = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');  
    $.ajax({		
		url: searchUserurlOrigin+'/api/private/profile/profile-info',        
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": headerApplicationId,
            "x-country-code": 'US',
            "x-preferred-language": 'en',            
            "x-id-token" : token
        },        
        success: function (data) {             
            if (data.errorCode == 0) {
                $('.loader-parent').hide(); 
                $('[name="firstName"]').val(data.response.userInfo.firstName);
                $('[name="lastName"]').val(data.response.userInfo.lastName);	
                $('[name="email"]').val(data.response.userInfo.emailAddress);	
                $('[name="email"]').attr('disabled', true);	
                $('[name="password"]').val(data.response.userInfo.password);
                $('[name="jobTitle"]').val(data.response.userInfo.jobTitle);
                $('[name="department"]').val(data.response.userInfo.department);
                $('[name="employer"]').val(data.response.userInfo.employer);
                $('[name="address"]').val(data.response.userInfo.address);
                $('[name="address2"]').val(data.response.userInfo.address2);
                $('[name="city"]').val(data.response.userInfo.city);
                $('[name="state"]').val(data.response.userInfo.state);
                $('[name="zipCode"]').val(data.response.userInfo.zipCode);
                $('[name="phoneNumber"]').val(data.response.userInfo.phoneNumber);
                $('[name="istatProduct"]').val(data.response.userInfo.istatProduct);
                $('[name="serialNumber"]').val(data.response.userInfo.serialNumber);
                $('[name="topics"]').val(data.response.userInfo.topics);
                $('[name="contactOptIn"]').prop('checked', data.response.userInfo.contactOpt);
                $('[name="contactOptIn"]').attr('data-optin', data.response.userInfo.contactOpt)
                let retriveCountry = data.response.userInfo.country;

                UserRetriveCountry(retriveCountry);
                
                let retriveCustomerType = data.response.userInfo.segmentation;
                let retriveCustomerCategory = data.response.userInfo.subSegmentation;
                let retriveCustomerRole = data.response.userInfo.tertiarySegmentation
                let customerTypeText;

                $('ul[name="customerType"] li').each(function(){  
                    $(this).removeClass('selected');
                    $(this).removeAttr('aria-selected');            
                    let customerTypeOption = $(this).attr('data-optionvalue');              
                    if(customerTypeOption == retriveCustomerType) {
                        $(this).addClass('selected');
                        $(this).attr('aria-selected',true); 
                        customerTypeText = $(this).find('span').text();                  
                    }
                });
               
                $('ul[name="customerType"]').closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected');
                $('ul[name="customerType"]').closest('.a-dropdown__field')?.find('.a-dropdown-selected')?.addClass('selectedValue').text(customerTypeText);
                $('ul[name="customerType"]').closest('.a-dropdown__field').addClass('disabled');
               
                 $('.conditional__case[data-conditional-case="'+retriveCustomerType+'"]').addClass('activeCategory').show();
                 callActiveAndConditional(retriveCustomerCategory, retriveCustomerRole);
                
                let retriveLang = data.response.userInfo.language;
                retriveLangText(retriveLang);
                
                let istatProduct = (data.response.userInfo.istatProduct)?.split(',');
                $('[name="istatProduct"]').val(istatProduct);

                let topics = (data.response.userInfo.topics)?.split(',');
                $('[name="topics"]').val(topics);

                istatProductForUser(data);
                callRetriveCustome(retriveCustomerType);
            }
        },
        
        error: function() {
            setTimeout(() => {
                $('.custom-spinner').addClass('d-none');
            }, 100);
        }
    });

}
function istatProductForUser(data){
    $('[name="istatProduct"] option').each(function(){    
        if(data.response.userInfo.istatProduct?.indexOf($(this).attr('value')) >= 0){
            $(this).attr('selected',true);
            $(this).addClass('selected');
        }
    });

    $('[name="topics"] option').each(function(){    
        if(data.response.userInfo.topics?.indexOf($(this).attr('value')) >= 0){
            $(this).attr('selected',true);
            $(this).addClass('selected');
        }
    });
}
function UserRetriveCountry(retriveCountry){
    let countryText;
    if(retriveCountry != undefined && retriveCountry != null && retriveCountry != ''){
        $('ul[name="country"] li').each(function(){         
            $(this).removeClass('selected');
            $(this).removeAttr('aria-selected');     
            let countryOption = $(this).attr('data-optionvalue');              
            if(countryOption == retriveCountry.toUpperCase()) {
                $(this).addClass('selected');
                countryText = $(this).find('span').text();                  
            }
        });
        
        $('ul[name="country"]').closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(countryText);
    }
}
function retriveLangText(retriveLang){
    let langText;
    if(retriveLang) {
        $('ul[name="language"] li').each(function(){              
            let langOption = $(this).attr('data-optionvalue');              
            if(langOption == retriveLang) {
                $(this).addClass('selected');
                langText = $(this).find('span').text();                  
            }
        });
        $('ul[name="language"]').closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected')
        $('ul[name="language"]').closest('.a-dropdown__field')?.find('.a-dropdown-selected')?.text(langText);
    }
}
function callActiveAndConditional(retriveCustomerCategory, retriveCustomerRole){
    $('.activeCategory ul[name="customerCategory"]').find('li').each(function(){
        let customerCategoryOpt = $(this).attr('data-optionvalue');              
        if(customerCategoryOpt == retriveCustomerCategory) {
            $(this).addClass('selected');
            $(this).attr('aria-selected', true);
            let customerCategoryText = $(this).find('span').text();
            $(this).closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected');
            $(this).closest('.a-dropdown__field')?.find('.a-dropdown-selected')?.addClass('selectedValue').text(customerCategoryText);
            return false;
        }
    })
    $('.conditional__case[data-conditional-case="'+retriveCustomerCategory+'"]').addClass('activeRole').show();
     $('.activeRole ul[name="customerRole"]').find('li').each(function(){
        let customerRoleOpt = $(this).attr('data-optionvalue');              
        if(customerRoleOpt == retriveCustomerRole) {
            $(this).addClass('selected');
            $(this).attr('aria-selected', true);
            let customerRoleText = $(this).find('span').text();
            $(this).closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected');
            $(this).closest('.a-dropdown__field')?.find('.a-dropdown-selected')?.addClass('selectedValue').text(customerRoleText);
            return false;
        }
    })
}
function callRetriveCustome(retriveCustomerType){
    if ((retriveCustomerType == 'hospitalPublic' || retriveCustomerType == 'HOSPITAL_PUBLIC') || (retriveCustomerType == 'hospitalPrivate' || retriveCustomerType == 'HOSPITAL_PRIVATE') || (retriveCustomerType == 'nonHospital' || retriveCustomerType == 'NON_HOSPITAL')) {
        $('[name="istatProduct"]').closest('.a-dropdown').attr('data-required',true);
        $('[name="serialNumber"]').closest('.a-input-field').attr('data-required',true);
        $('[name="serialNumber"]').attr('required',true);
        $('[name="topics"]').closest('.a-dropdown').attr('data-required',true);
        $('[name="language"]').closest('.a-input-field').attr('data-required',true);
        $('[name="istatProduct"]').closest('.options').show();
        $('[name="serialNumber"]').closest('.fields').show();
        $('[name="topics"]').closest('.options').show();
        $('[name="language"]').closest('.options').show();
    }
    else{
        $('[name="istatProduct"]').closest('.options').hide();
        $('[name="serialNumber"]').closest('.fields').hide();
        $('[name="topics"]').closest('.options').hide();
        $('[name="language"]').closest('.options').hide();
        $('[name="istatProduct"]').closest('.a-dropdown').removeAttr('data-required');
        $('[name="topics"]').closest('.a-dropdown').removeAttr('data-required');
        $('[name="language"]').closest('.a-dropdown').removeAttr('data-required');
        $('[name="serialNumber"]').closest('.a-input-field').removeAttr('data-required');
        $('[name="serialNumber"]').removeAttr('required');
    }
    $('ul[name="customerCategory"]').closest('.a-dropdown__field').addClass('disabled');
    $('ul[name="customerRole"]').closest('.a-dropdown__field').addClass('disabled');
    $('.custom-spinner').addClass('d-none');
}

function populate511Userdata() {
    let currUserFirstName = getCookie('currUserFirstName')?getCookie('currUserFirstName'):'';
    let currUserLastName = getCookie('currUserLastName')?getCookie('currUserLastName'):'';
    let currUserAddress = getCookie('currUserAddress')?getCookie('currUserAddress'):'';
    let currUserState = getCookie('currUserState')?getCookie('currUserState'):'';
    let currUserCity = getCookie('currUserCity')?getCookie('currUserCity'):'';
    let currUserPinCode = getCookie('currUserPinCode')?getCookie('currUserPinCode'):'';

    $('[name="firstName"]').val(currUserFirstName);
    $('[name="lastName"]').val(currUserLastName);
    $('[name="address"]').val(currUserAddress);
    $('[name="state"]').val(currUserState);
    $('[name="city"]').val(currUserCity);
    $('[name="zipCode"]').val(currUserPinCode);
    setTimeout(() => {
        $('.custom-spinner').addClass('d-none');
    }, 100);
}

$(document).ready(function () {   
    setTimeout(function(){
        if (window.location.href.indexOf('/secure/account/edit-account.html') >= 0 || window.location.href.indexOf('/secure/account/complete-profile.html') >= 0 ) {
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            populateUserdata();
        }   
        if(window.location.href.indexOf('/secure/account/edit-abbott-account.html') >= 0){
            if(getCookie('cognitoUsername')){
                setTimeout(() => {
                    $('.custom-spinners').removeClass('d-none');
                }, 100);
                populate511Userdata();
            }
        }
    },500)
    
});
