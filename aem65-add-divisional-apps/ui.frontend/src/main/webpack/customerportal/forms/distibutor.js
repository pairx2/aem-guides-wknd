$(document).ready(function () {
    $("#distributor-name").closest(".fields").hide();
    $("#distributor-checkbox-options").closest(".options").hide();
    $("#distibutor-companyname").closest(".fields").hide();
    $("#distibutor-companyname").closest(".a-input-field").attr("data-required", "false");
    $("#distibutor-companyname").removeAttr("required");
    $("#distributor-name").closest(".a-input-field").attr("data-required", "false");
    $("#distributor-name").removeAttr("required");
    if($("#dropdown_label_distibutor-create-account"))
    $("#distibutor-create-account-options .a-dropdown__field").on("keyup", function(e) {
        let ele= e.target.querySelector('li.selected');
        showHideDistributorField(ele);
    });
    $("#distibutor-create-account-options .a-dropdown__menu").on("click", function(e) {
        let element= e.target.closest('li');
        showHideDistributorField(element);
    });
    $("#distibutor-create-account-options .a-dropdown__menu").on("keyup", function(e) {
        showHideDistributorField(e.target);
    });
    
        $('#distributor-checkbox-options').on("click",function() {
        if($('input[name="isCustomer"]').prop( "checked" )) {
            $("#distibutor-companyname").closest(".fields").show();
            $("#distibutor-companyname").closest(".a-input-field").attr("data-required", "true");
            $("#distibutor-companyname").attr("required","true");
        } else {
            $("#distibutor-companyname").closest(".fields").hide();
            $("#distibutor-companyname").closest(".a-input-field").attr("data-required", "false");
            $("#distibutor-companyname").removeAttr("required");
        }
    });
});
function showHideDistributorField(ele)
        {
            if(ele!=null)
            {
                if(ele.getAttribute("data-optionvalue") == "distributor") {
                    $("#distributor-name").closest(".fields").show();  
                    $("#distributor-checkbox-options").closest(".options").show();   
                    $('input[name="customerNumber"]').closest(".a-input-field").attr("data-required", "false");
                    $('input[name="customerNumber"]').removeAttr("requried");
                    $('input[name="instrumentSerialNumber"]').closest(".a-input-field").attr("data-required", "false");
                    $('input[name="instrumentSerialNumber"]').removeAttr("requried");
                    $("#distributor-name").closest(".a-input-field").attr("data-required", "true");
                    $("#distributor-name").attr("required","true");
                } else {
                    $("#distributor-name").closest(".fields").hide();
                    $("#distributor-name").val("");
                    $("#distributor-checkbox-options").closest(".options").hide();
                    $('input[name="isCustomer"]').prop( "checked", false )
                    $("#distibutor-companyname").closest(".fields").hide();
                    $('input[name="customerNumber"]').closest(".a-input-field").attr("data-required", "true");
                    $('input[name="customerNumber"]').attr("requried","true");
                    $('input[name="instrumentSerialNumber"]').closest(".a-input-field").attr("data-required", "true");
                    $('input[name="instrumentSerialNumber"]').attr("requried","true");
                    $("#distibutor-companyname").val("");
                    $("#distributor-name").closest(".a-input-field").attr("data-required", "false");
                    $("#distributor-name").removeAttr("required");
                }
            }
           
        }