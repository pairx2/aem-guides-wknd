
$(document).ready(function(){
    $("#expiry-tool-table #expiry-tool-datatable").hide();
    $("#expiry-tool-table-popup #expiry-tool-datatable").hide();
    if($('.cq-Editable-dom').length == 0){
        $('[name="product-type"]').each(function(){
            $(this).closest('.fields').hide();
        })
    }
    setTimeout(function(){
        $("[name='lotNumber']").on('keydown', function(e){
             if (e.which === 32){
                return false;
        	}
        });
        $("[name='lotNumber']").on('keyup', function(){
            let _this = this;
            let currentTable = callExpiryToolTable(_this);
            let curField = $(this);
            callExpiryToolTable(_this);
            
            let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
            let headerPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
            let headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
            let productName;
            if($(this).closest('.modal').length > 0){
                productName =  document.querySelector('#expiry-tool-table-popup').closest('.modal').querySelector('input[name="product-type"]').value;
            }else{
                productName =  document.querySelector('#expiry-tool-table').closest('.container').querySelector('input[name="product-type"]').value;
            }
            let payloadData = {
                action:"retrieveProductExpiry",
                lotNumber: $(this).val(),
                brand: productName
            }
            let table =  currentTable.find("tbody");
            if($(this).val().length > 5 && $(this).closest('.validation-regex')?.length == 0){
                $.ajax({		
                    url: document.querySelector('#expiry-tool-form form').getAttribute('action'),        
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(payloadData),
                    "headers": {
                        'x-preferred-language': headerPreferredLanguage,
                        'x-country-code': headerCountryCode,
                        'x-application-id': headerApplicationId
                    },        
                    success: function (data) {  
                        callfromContainerErrorMsg(curField, currentTable, data, table); 
                        
                    },
                    error: function (data) {
                        $(table).html('').append(
                            `<p class="no-result-data">${data.response?.statusReason}</p>`
                        );
                        curField.closest("#expiry-tool-form").find(".o-form-container__error-msg").text('');
                        currentTable.show().removeClass('hideTable');
                    }
                });
            }
            else{
                callelseFromContainerErrorMsg(currentTable, curField, _this);
            }
        })
        $('#expiry-tool-button-modal .generic-modal--close').on('click',function(){
            $("#expiry-tool-button-modal .validation-regex")?.removeClass('validation-regex');
            $("#expiry-tool-button-modal .validation-error")?.removeClass('validation-error');
            $("#expiry-tool-table-popup #expiry-tool-datatable")?.hide();
            $(this).closest('.modal').find("[name='lotNumber']").val('');
        })
    },1000);
});

function callExpiryToolTable(_this){
    if($(_this).closest('.modal').length > 0){
        return ($("#expiry-tool-table-popup #expiry-tool-datatable")); 
    }else{
    return ($("#expiry-tool-table #expiry-tool-datatable"));
    }
}

function callfromContainerErrorMsg(curField, currentTable, data, table){
    if(data.errorCode == 200 || data.errorCode == 0){
        let expiryInfo = data.response;
        let expiryDate = (expiryInfo.expiryDate)?.split(' ')[0].replaceAll('-','/');
        expiryDate = expiryDate.split('/')[1]+'/'+expiryDate.split('/')[2]+'/'+expiryDate.split('/')[0];
        let extExpiryDate = (expiryInfo.extExpiryDate)?.split(' ')[0].replaceAll('-','/');
        extExpiryDate = extExpiryDate.split('/')[1]+'/'+extExpiryDate.split('/')[2]+'/'+extExpiryDate.split('/')[0];
        $(table).html('').append(
            `<tr><td>${expiryInfo.lotNumber}</td><td>  ${expiryDate} </td><td> ${extExpiryDate} </td> </tr>`
        );

        setTimeout(function(){
            curField.closest("#expiry-tool-form").find(".o-form-container__error-msg").text('');
            curField.closest("#expiry-tool-form").find(".o-form-container__success-msg").hide();
            currentTable.show().removeClass('hideTable');
            if($(this).val().length <= 5){
                currentTable?.hide().addClass('hideTable');
                curField.closest("#expiry-tool-form").find(".o-form-container__error-msg").text('');
            }
        },200)
    }
    else{
        setTimeout(() => {
            $(table).html('').append(
                `<p class="no-result-data">${data.response?.statusReason}</p>`
            );
            curField.closest("#expiry-tool-form").find(".o-form-container__error-msg").text('');
            currentTable.show().removeClass('hideTable');
            if($(this).val().length <= 5){
                currentTable?.hide().addClass('hideTable');
                curField.closest("#expiry-tool-form").find(".o-form-container__error-msg").text('');
            }
        }, 100);
    }
}

 function callelseFromContainerErrorMsg(currentTable, curField, _this){
    currentTable.hide().addClass('hideTable');
    curField.closest("#expiry-tool-form").find(".o-form-container__error-msg").text('');
    let clearMessage = setInterval(() => {
        currentTable?.hide().addClass('hideTable');
        curField.closest("#expiry-tool-form").find(".o-form-container__error-msg").text('');
        if((currentTable.hasClass('hideTable') && curField.closest("#expiry-tool-form").find(".o-form-container__error-msg").text().length == 0) || $(_this).val().length > 5){
            clearInterval(clearMessage);
        }
    }, 500)
 }