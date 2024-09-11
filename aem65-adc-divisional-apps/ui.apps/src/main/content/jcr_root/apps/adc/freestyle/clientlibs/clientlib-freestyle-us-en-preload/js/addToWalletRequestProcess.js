
let hiddenValuesObject = {};
let hiddenValueVoucherDesign = [];
let hiddenValueVoucherData = [];
function UpdateAddToWalletRequest(formData) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let preferredLangugage = document.querySelector('input[name="x-preferred-language"]').value;
    let countryCode = document.querySelector('input[name="x-country-code"]').value;
	let notificationDays = document.querySelector('input[name="notififcation-days"]').value;
    formData.headers = {
		'Content-Type': 'application/json',
        'x-preferred-language': preferredLangugage,
		'x-country-code': countryCode,
        'x-application-id': headerApplicationId
	}
    //Voucher Details
    let vbin = sessionStorage.getItem('binNumber');
    let vgroup = sessionStorage.getItem('groupId');
    let vmember = sessionStorage.getItem('memberId');
	let vexpiration =  sessionStorage.getItem('expirationDate');
	const vndc = $('.card-num').text();
	let notificationDate = calculateNotificationDate(vexpiration, notificationDays) || '';

    //Program Details
	hiddenValuesObject = {};
	hiddenValueVoucherDesign = [];
	hiddenValueVoucherData = [];
	$('.'+((formData.body.type).toLowerCase())+'-wallet-container').each(function(e){
		 getVoucherDesignData($(this).find('.cmp-container:first'), true);
		 getVoucherDesignData($(this).find('.cmp-container:first'), false);
	});
	const vexpirationDateFormate = vExpirationFormate(vexpiration);
	const hiddenObjectData = [
		{header:'BIN',body:vbin, id:'binId'}, 
		{header:'GROUP', body:vgroup, id:'groupId'},
		{header:'MEMBER',body:vmember, id:'memberId'},
		{header:'EXPIRATION',body:vexpirationDateFormate, id:'expirationId'},
		{header:'NRC',body:vndc, id:'nrcId'}
	].filter(item => item.body);

	hiddenValueVoucherData = [...hiddenValueVoucherData, ...hiddenObjectData];
	if(hiddenValueVoucherData.length > 0){
		hiddenValuesObject['voucherData'] = hiddenValueVoucherData;
	}
    hiddenValuesObject['notificationDate'] = notificationDate;
    hiddenValuesObject['id'] = vmember;
    formData.body = hiddenValuesObject;
    return formData
}
function vExpirationFormate(date) {
	let vtoday = new Date(date);
	let vyyyy = vtoday.getFullYear();
	let vmm = vtoday.getMonth() + 1; // month is zero-based
	let vdd = vtoday.getDate();
	if (vdd < 10) {vdd = '0' + vdd;}
	if (vmm < 10){ vmm = '0' + vmm;}
	return vmm + '/' + vdd + '/' + vyyyy;
}

function onSuccessAddToAppleWallet(data){
	$(".add-to-apple-wallet-form .o-form-container__success-msg")?.hide();
    let binary  = atob(data.response);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
   	  array.push(binary.charCodeAt(i));
    }
    let file = new Blob([new Uint8Array(array)], {type: 'application/vnd.apple.pkpass'});
    const blobUrl = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = 'samplePkPass.pkpass';
    anchor.target = '_blank';
    anchor.click();
}

const calculateNotificationDate = (date, notificationDays) =>{
	let notificationDate,vtoday,vyyyy,vmm,vdd,vexpiration;
	vexpiration = date;
	vtoday = new Date(date);
	vyyyy = vtoday.getFullYear();
	vmm = vtoday.getMonth() + 1; // month is zero-based
	vdd = vtoday.getDate();
	if (vdd < 10) vdd = '0' + vdd;
	if (vmm < 10) vmm = '0' + vmm;
	vexpiration = vmm + '/' + vdd + '/' + vyyyy;
    if(vexpiration){
        //notification date function 
        notificationDate =  new Date(vexpiration);
		notificationDate.setDate(notificationDate.getDate() - parseInt(notificationDays));
		let convertdate = notificationDate.toLocaleDateString("en-US");
		const today = new Date(convertdate);
		const yyyy = today.getFullYear();
		let mm = today.getMonth() + 1; // month is zero-based
		let dd = today.getDate();
		if (dd < 10) {dd = '0' + dd;}
		if (mm < 10) {mm = '0' + mm;}
	    notificationDate = mm + '/' + dd + '/' + yyyy;
    }
	return notificationDate;
}

function getVoucherDesignData(eml, isForDesign)  {
	    if (isForDesign) {
	        eml.find('> .hidden').find('input[type="hidden"]').each((i, element) => {
	            const name = $(element).attr('name');
	            const value = $(element).val();
	            hiddenValuesObject[name] = value;
	        });
	        eml.find('.voucherDesign').find('input[type="hidden"]').each((i, element) => {
	            const id = $(element).attr('name');
	            const value = $(element).val();
	            hiddenValueVoucherDesign.push({ id, value });
	        });
			if(hiddenValueVoucherDesign.length > 0){
				hiddenValuesObject['voucherDesign'] = hiddenValueVoucherDesign;
			}

	    } else {
	        eml.find('.voucherData .cmp-container').each(function() {
	            $(this).find('.container .cmp-container').each(function() {
				    const curObj = {};
					 $(this).find('input[type="hidden"], .text').each(function() {
						const currentThis = $(this);
						const thisParentone = currentThis.closest('.cmp-container').find('.text');
						const isText = currentThis.hasClass('text');
						const richEditorTextName = textNameValue(currentThis,isText);
						const name = getFieldName(isText,currentThis,richEditorTextName);
						let value = isBodyString(thisParentone,name) ? thisParentone.find('p').html() : currentThis.val();
						const keyText = !isText ? name : richEditorTextName;
						curObj[keyText] = value;
						return curObj;
			     	});
					hiddenValueVoucherData.push(curObj);
	            });
	        });
	    }
}
function textNameValue(currentThis, isText) {
	return isText ? currentThis.closest('.cmp-container').find('input[type="hidden"][name="body"]').val() : '';
}
function getFieldName(isText, currentThis, richEditorTextName) {
	return !isText ? currentThis.attr('name') : richEditorTextName;
}
function isBodyString(thisParentone, name) {
	return thisParentone.length > 0 && name == 'body';
}
function onSuccessAddToGoogleWallet(data){
	$(".add-to-google-wallet-form .o-form-container__success-msg")?.hide();
    const anchor = document.createElement('a');
    anchor.href = data.response;
    anchor.target = '_blank';
    anchor.click();
}

function onFailureAddToAppleWallet(data){
    setTimeout(() => {
        $('.custom-spinner').addClass('d-none');
    }, 100);
    $(".add-to-apple-wallet-form .o-form-container__error-msg").text(data.response?.statusReason);
}

function onFailureAddToGoogleWallet(data){
    setTimeout(() => {
        $('.custom-spinner').addClass('d-none');
    }, 100);
    $(".add-to-google-wallet-form .o-form-container__error-msg").text(data.response?.statusReason);
}
