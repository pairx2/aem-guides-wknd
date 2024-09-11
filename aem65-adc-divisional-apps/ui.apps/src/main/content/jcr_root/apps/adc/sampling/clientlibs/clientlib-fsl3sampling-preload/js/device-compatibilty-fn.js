/** Device Compatibility Check -- starts**/
function updateRequestDeviceCompatibility(data) {

    //device cookie
    let deviceCookie = data.body.deviceInformation;
    if (deviceCookie.length) {
        deviceCookie = deviceCookie.trim();
        deviceCookie = stripEndQuotes(deviceCookie);
    }

    data.body.deviceInformation = deviceCookie;
    delete data.body['g-recaptcha-response'];
    delete data.body['requestType'];
    delete data.body['node'];

    return data;
}

function onSuccessDeviceCompatibility(data) {

    if(data.errorCode == 0) {
        let isCompatible = data.response.compatibleDevice;
        let isMobile = data.response.mobile;
        let deviceName = data.response.deviceName;
    
        setCookie('isCompatible', isCompatible, '');
        setCookie('isMobile', isMobile, '');
        
        //hide all errors
        $('#apierror, #apierror_400').hide();
        
        $('#fsl3DeviceCompatibilityText').hide();
        $('#page-spinner').hide();
        if(deviceName) {
            $('#device-compatibility-success').find('#deviceNameSuccess .cmp-title__text').text(deviceName);
            $('#device-compatibility-failure').find('#deviceNameFailure .cmp-title__text').text(deviceName);
        }
        if(isCompatible) {
            $('#device-compatibility-failure').hide();
            $('#device-compatibility-success').css('display', 'block');
        } else {
            $('#device-compatibility-success').hide();
            $('#device-compatibility-failure').css('display', 'block');
        }
    } else {
        onErrorDeviceCompatibility(data);
    }
}

function onErrorDeviceCompatibility(error) {

    $('#device-compatibility-success').hide();
    $('#device-compatibility-failure').hide();
    $('#fsl3DeviceCompatibilityText').hide();
    $('#page-spinner').hide();

    showHideApiError(error);

    deleteCookie('isCompatible');
    deleteCookie('isMobile');
}
/** Device Compatibility Check -- end**/