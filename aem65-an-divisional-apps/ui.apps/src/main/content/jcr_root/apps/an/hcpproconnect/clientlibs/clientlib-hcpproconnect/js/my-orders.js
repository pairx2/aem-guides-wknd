let orderDetailsPopupTableBody = "";
let orderDetails = "";
let orderQuantity = 0;
$(document).ready(function () {
    let userInfo;
    let hcpID;
    let organizationName;
    let orderPageName = window.location.href;
    let orderApiUrl = $("#orders-api-url").val();
    let siteSearchAPI = $('#headerSearchSuggestApi').attr('data-api');
    let domainName = siteSearchAPI.split('api')[0];
    let ordersAPI = domainName.concat(orderApiUrl.substring(1));


    // Author to edit the order duration
    let checkEditorPublisherMode = $("#site-entering-popup-content").attr("data-wcm-edit-mode");
    if (checkEditorPublisherMode) {
        $("#Order-duration-field-options").hide();
    }
    else {
        $("#Order-duration-field-options").show();
    }

    if (isUserLoggedIn() && orderPageName.indexOf("/profile-orders") > -1) {
        userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if(localStorage.hasOwnProperty("userProfile")) {
            let userProfile = localStorage.getItem("userProfile");
            let userProfileJSON = JSON.parse(userProfile);
            hcpID = userInfo.sfdcId;
            organizationName = userProfileJSON.userInfo.additionalProperties.orgNameText;
            callMyOrders(ordersAPI,hcpID, organizationName, 0);
        } else {
            getProfileDetails();
        }

    }


});


/**
** Parse Date dd/mm/yyyy
**/
function parseDate(date) {
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth()+1).toString();
    mm = mm < 10 ? "0"+ mm : mm;
    let dd  = date.getDate().toString();
    dd = dd < 10 ? "0"+ dd : dd;
    return dd + "/" + mm + "/" + yyyy;
}

function callMyOrders(ordersAPI,hcpID,organizationName,orderCount) {
    showLoading();
    let idToken = getCookie('jwtToken');
    let orderedDate = getDateMonthYear(new Date(), 0);
    let orderedHistoryDate = getDateMonthYear(new Date(), 6);
    let orderDetailsProfileTableBody;
    orderDetailsPopupTableBody = "";
    $.ajax({
        url: ordersAPI,
        crossDomain: true,
        headers: {
            'x-preferred-language': $("input[name=x-preferred-language]").val(),
            'x-country-code': $("input[name=x-country-code]").val(),
            'x-application-id': $("input[name=x-application-id]").val(),
            'x-secret-header': $("input[name=x-secret-header]").val(),
            'x-id-token': idToken
        },
        contentType: 'application/json',
       data: {
           'id': hcpID,
           'orgNameText': organizationName,
           'startDate': orderedHistoryDate,
           'endDate': orderedDate,
           'orderCount': orderCount
       }
    }).done(function (response) {
        hideLoading();
        if (response.status) {
            orderDetails = response;
            if (orderDetails.response.length) {

                for (let i in orderDetails.response) {
                    orderQuantity = 0;
                    let convertedOrderDate = parseDate(new Date(orderDetails.response[i].orderDate));
                    let deliveryDateText = $("#working-days-delivery").val() ? $("#working-days").val() : "3 working days";
                    for (let j in orderDetails.response[i].cartItems) {
                        orderQuantity += orderDetails.response[i].cartItems[j].quantity;
                    }
                    orderDetailsProfileTableBody += "<tr><td class='order-popup-link' data-order-value='" +
                        orderDetails.response[i].orderId + "' data-order-date='" + convertedOrderDate +
                        "'></td><td>" + orderDetails.response[i].orderId + "</td><td>" + convertedOrderDate +
                        "</td><td>" + orderQuantity + "</td><td>" + orderDetails.response[i].patientFirstName +
                        " " + orderDetails.response[i].patientLastName + "</br>" +
                        orderDetails.response[i].address1 + "</br>" + orderDetails.response[i].address2 +
                        "</br>" + orderDetails.response[i].town + "</br>" + orderDetails.response[i].postCode +
                        "</td><td>" + deliveryDateText + "</td></tr>";
                }
                $(".my-order-overview-table-container table tbody").append(orderDetailsProfileTableBody);
                productPopupOnClick();
            }
        }
    });
    hideLoading();

}

function productPopupOnClick() {
    $(".order-details-container table tbody").empty();
    $(document).on("click", ".order-popup-link", function () {
        orderDetailsPopupTableBody = "";
        let orderID = $(this).attr("data-order-value"), orderDate = $(this).attr("data-order-date");

        for (let i in orderDetails.response) {
            if (orderID == orderDetails.response[i].orderId) {
                for (let j in orderDetails.response[i].cartItems) {
                    orderDetailsPopupTableBody += "<tr><td>" + orderDetails.response[i].cartItems[j].product + "</td><td>" + orderDetails.response[i].cartItems[j].flavour + "</td><td>" + orderDetails.response[i].cartItems[j].quantity + "</td></tr>";
                }
            }
        }
        if (orderDetailsPopupTableBody) {
            $(".order-details-container table tbody").append(orderDetailsPopupTableBody);
        }

        $(".order-details-wrapper").show();
        $(".order-details-wrapper h5.order-id span").text(orderID);
        $(".order-details-wrapper h5.order-date span").text(orderDate);
        });

        $(document).on("click", ".order-details-container button.close", function () {
        $(".order-details-wrapper").hide();
        $(".order-details-container table tbody").html("")
    });
}

function getProfileDetails() {
    let sitesearchAPI = $('#headerSearchSuggestApi').attr('data-api');
    let domainName = sitesearchAPI.split('api')[0];
    let profileApi = "api/private/profile/profile-info";
    let fetchProfile = domainName.concat(profileApi);

    const idToken = getCookie('jwtToken');

    let proHeaders = new Headers();
    proHeaders.append("x-application-id", $("input[name=x-application-id]").val());
    proHeaders.append("x-country-code", $("input[name=x-country-code]").val());
    proHeaders.append("x-preferred-language", $("input[name=x-preferred-language]").val());
    proHeaders.append("x-id-token", idToken);

    let requestOptions = {
        method: 'GET',
        headers: proHeaders,
        redirect: 'follow'
    };

    $("#preferredtimedata").hide();

    showLoading();

    fetch(fetchProfile, requestOptions)
        .then(response => response.text())
        .then(function (result) {
            if(result){
                let jsonResult = JSON.parse(result);
				let profileResult = jsonResult.response;
				localStorage.setItem("userProfile", JSON.stringify(profileResult));
                let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                let hcpID = userInfo.sfdcId;
                let organizationName = profileResult.userInfo.additionalProperties.orgNameText;
                let orderApiUrl = $("#orders-api-url").val();
                let siteSearchAPI = $('#headerSearchSuggestApi').attr('data-api');
                let domainName = siteSearchAPI.split('api')[0];
                let ordersAPI = domainName.concat(orderApiUrl.substring(1));
                callMyOrders(ordersAPI,hcpID,organizationName,0)
                hideLoading();
            }
        });
    	hideLoading();
}

function getDateMonthYear(currentDateTimeYear, value) {
    currentDateTimeYear.setMonth(currentDateTimeYear.getMonth() - value);
    let currentDate = currentDateTimeYear.getDate();
    let currentMonth = currentDateTimeYear.getMonth() + 1;
    currentMonth = (currentMonth.toFixed().length < 2) ? "0" + currentMonth : currentMonth;
    currentDate = (currentDate.toFixed().length < 2) ? "0" + currentDate : currentDate;
    currentDateTimeYear = currentDateTimeYear.getFullYear() + "-" + currentMonth + "-" + currentDate;
    return currentDateTimeYear;
}