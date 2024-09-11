$(document).ready(function () {
    let jwtToken =  getSessionStorage('jwtToken');
    let userInfo = getLocalStorage("userInfo");
    $("label[for='delegateDropdownlist']").removeClass("sr-only");
    $("#myDelegate").click(function () {
        setTimeout(delegateText, 0);
    });

    $("#sampleEligibility").click(function () {
        setTimeout(delegateText, 0);
    });   

    if (!userInfo?.additionalProperties?.gratisEligible || !userInfo?.additionalProperties?.npiNumber) {
        $("[href*='delegate-sample-access']").closest("li").hide();
    }


    if (userInfo?.additionalProperties?.gratisEligible) {
        if (userInfo.additionalProperties.gratisApprovalStatusC == "Gratis Approved Notification" || userInfo.additionalProperties.gratisApprovalStatusC == "Pending Gratis Revoke Approval" || userInfo.additionalProperties.gratisApprovalStatusC == "Gratis Approved" || userInfo.additionalProperties.gratisApprovalStatusC == "Gratis Revoke Rejected") {
            mySampleEligibilityBlock(userInfo);
        }
        else {
            $("#myDelegate").show().closest("li").show();
            $(".an-header-top").find(".my-account").find("ul li:nth-child(3)").show();
            $(".an-header-menu").find(".my-account").find("ul li:nth-child(3)").show();
        

            $(".an-header-top").find(".my-account").find("ul li:nth-child(4)").hide();
            $(".an-header-menu").find(".my-account").find("ul li:nth-child(4)").hide();
            $("#sampleEligibility").closest("li").hide();
            gratisDisplayNotification();
            pendingApprovalRequest();
            pendingRevokeRequest();
            // check to see if user is logged in, if so pre-fill My Account form fields// check to see if user is logged in, if so pre-fill My Account form fields
            delegateUserSearch();
        }
    } else {
        mySampleEligibilityBlock(userInfo);
    }    

    $("#delegateSubmit").click(function () {
        const action = $('#gratis-delegation').val();
        let sfdcId = $("[name=gratisApprovedFor]").find('.selected').attr("data-optionvalue")
        showLoading();
        let apiData = {
            "userInfo": {
                "gratisApprovedFor": sfdcId,
                "action": "grantGratis"
            }
        }
        let headers = {
            "Content-Type": "application/json",
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken
        };
        $.ajax({
            url: action,
            headers: headers,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData)
        }).then(function (response) {
            if (response.errorCode == 0) {
                //Show Gratis Approval Status -Data has been committed successfully.
                $(".welcomeText").addClass("d-none");
                $(".showWhenHaveDelegate").removeClass("d-none");
                $("#selectDelegate").hide();
                $("#delegateDropdownCont").hide();
                $("#section-modal-dailog-wrapper").hide();
                $("#txtWhenRevokeAccess").show();
                $(".showWhenNoDelegate").addClass("d-none");
                $(".lnkApproveGratis").attr("disabled", "disabled").fadeTo("fast", 0.5).removeAttr("onclick");
                $("#" + sfdcId).remove();
                updateProfileInfo();
                pendingApprovalRequest();
                let userInf = getLocalStorage("userInfo");
                let text = $("#txtCurrentDelegate");
                const approvalStatusdate = new Date(userInf.additionalProperties.gratisApprovalStatusDateC).toLocaleString().split(',')[0];
                let name = userInf.additionalProperties.gratisApprovedForName + "<br/>" + userInf.additionalProperties.gratisApprovedForInstitution + "<br/>" + "Approved: " + approvalStatusdate;

                text.find("p.showWhenHaveDelegate").text("{delegate}");
                text.html(text.html().replaceAll("{delegate}", name));
                text.show();
                document.getElementById("gratisRevokeAccessForDelegate").addEventListener("click", function () {
                    revokeAccessOfDeligate(sfdcId);
                });
                hideLoading();

            } else if (response.errorCode == 400) {
                showApiError(response?.response?.i18nMessageKey);
                hideLoading();
            }
        }).fail(function () {
            hideLoading();
            hideApiError();
        });
    });

    // Search User (AnHcpSample) -Retrieving Gratis Eligible Users
    $("#searchDelegate").click(function () {
        searchDelegateclick(jwtToken);        
    }); 

    

    $("#gratisRevokeAccessForDelegate").click(function () {

        $("#nonGratisSubmitRequest,#approve-request,#delegateRevokeAccess,#delegateAccessRevoked,#nonGratisRevokeRequest,#rejectRevokeAccess,#declineDelegateRequest,#declineAcknowledgement").hide();

        $("#delegateRevokeAccess").show();
        $("#section-modal-dailog-wrapper").show();
        $(".o-header").addClass("position-static");
        $("#txtDelegate").text(userInfo.additionalProperties.gratisApprovedForName);
        document.getElementById("btnRevokeAccessForDelegate").addEventListener("click", function () {
            approveRevokeAccessRequestByDeligate(userInfo.additionalProperties.gratisApprovedForC);
        });
    });
});

function delegateText() {
    let textNew = $("#interiorNav .a-dropdown-selected").text();
    textNew = textNew.replace(/\d+/g, '');
    $("#interiorNav .a-dropdown-selected").text(textNew);
}
//sample eligibility block
function mySampleEligibilityBlock(userInfo) {
    $("#myDelegate").closest("li").hide();
    $(".an-header-top").find(".my-account").find("ul li:nth-child(3)").hide();
    $(".an-header-menu").find(".my-account").find("ul li:nth-child(3)").hide();
    

    $(".an-header-top").find(".my-account").find("ul li:nth-child(4)").show();
    $(".an-header-menu").find(".my-account").find("ul li:nth-child(4)").show();
    $("#sampleEligibility").closest("li").show();
    //User Info display information based on gartis approval status
    if (userInfo?.additionalProperties?.gratisApprovalStatusC) {
        $(".hcpName").text(userInfo.additionalProperties.gratisApprovedByName);
        userInfodispayInfo(userInfo);        
        
    }
    else if (userInfo.additionalProperties.gratisApprovalStatusC == undefined || userInfo.additionalProperties.gratisApprovedByC == undefined) {
        $("#searchResult").show();
        $("#searchResult .embed").hide();
        $(".showBeforeSubmitRequest").removeClass("d-none");
    }
}

function displayStatus(gratisStatus,userInfo) {
    let text1 = $("#divCurrentEligiblehealthcare");
    updateProfileInfo();
    const approvalStatusdate = new Date(userInfo.additionalProperties.gratisApprovalStatusDateC).toLocaleString().split(',')[0];
    let name = userInfo.additionalProperties.gratisApprovedByName + "<br/>" + userInfo.additionalProperties.gratisApprovedByInstitution + "<br/>" + "Request Submitted: " + approvalStatusdate + "<br>" + "Request Status: " + gratisStatus;
    text1.html(text1.html().replaceAll("{delegate}", name));
    text1.show();
}
//Request Gratis - Gratis Ineligible User submits gratis request to Gratis Eligible User
//Pass eligible gratis first name , last name ,sfdc Id  and organization name as parameters
function gratisSubmitRequest(firstName, lastName, sfdcId, organizationName) {

    $("#nonGratisSubmitRequest,#approve-request,#delegateRevokeAccess,#delegateAccessRevoked,#nonGratisRevokeRequest,#rejectRevokeAccess,#declineDelegateRequest,#declineAcknowledgement").hide();

    $("#nonGratisSubmitRequest").show();

    $("#section-modal-dailog-wrapper").show();
    $(".o-header").addClass("position-static");

    document.getElementById("nameOfEligibleHcp").textContent = firstName + " " + lastName;
    document.getElementById("btnSubmitRequest").addEventListener("click", function () {
        submitGratisRequest(firstName, lastName, sfdcId, organizationName);
    });
}
 // Search User (AnHcpSample) -Retrieving Gratis Eligible Users-clich function
function searchDelegateclick(jwtToken){
    const action = $('#gratis-search').val();
    const searchField = $("#gratisWrapper [type=search]");
    const search = searchField.val();
    $("#errorname").remove();
    if (search !== "") {
        showLoading();
        searchField.next("span").remove();
        searchField.css("border", "1px solid #222731");
        let headers = {
            "Content-Type": "application/json",
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken
        };

        let apiData = {
            "action": "searchGratisApprovers",
            "searchKey": search
        };

        $.ajax({
            url: action,
            headers: headers,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData)

        }).then(function (response) {
            if (response.errorCode == 0) {
                //Show Search results table              
                if (response.response.length > 0) {
                    createSearchTable(response.response);
                }
                else if (response.response.length == 0) {
                    $("#searchResult").hide();
                    $("#searchResult .embed").hide();
                    $("#divCurrentEligiblehealthcareTxt").addClass("d-none");
                    $(".showValidationMessage").removeClass("d-none");
                }
                hideLoading();
                hideApiError();
            } else if (response.errorCode == 400) {
                $("#searchResult").hide();
                $("#searchResult .embed").hide();
                $("#divCurrentEligiblehealthcareTxt").addClass("d-none");
                $(".showValidationMessage").removeClass("d-none");
                showApiError(response?.response?.i18nMessageKey);
                hideLoading();
            } else if (response.errorCode == 500) {
                // On Error - Internal Server Error
                hideLoading();
                hideApiError();
            }

        }).fail(function () {
            hideLoading();
            hideApiError();
        });
    }
    else {

        $('<span id="errorname">Please enter the search key</span>').insertAfter(searchField);
        searchField.css("border", "1px solid #e4002b");
    }

}
//Create Serach table to get the list of eligible gratis 
function createSearchTable(response) {
    $("#searchResult").show();
    $("#searchResult .embed").show();
    $("#table tbody").remove();
    $("#table thead").remove();
    $("#table #pages").remove();

    const table = document.getElementById('table');
    const thead = document.createElement('thead');
    const thr = document.createElement('tr');

    const tdh1 = document.createElement('td');
    const tdh2 = document.createElement('td');
    const tdh3 = document.createElement('td');
    tdh1.append("Name");
    tdh2.append("Organization");
    tdh3.append("");
    thr.appendChild(tdh1);
    thr.appendChild(tdh2);
    thr.appendChild(tdh3);
    thead.appendChild(thr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    for (let j of response) {
        const tr1 = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const name = document.createTextNode(j.firstName + " " + j.lastName);
        const organization = document.createTextNode(j.institutionName);
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('data-toggle', 'modal');
        a.innerHTML = "Submit Request";
        a.setAttribute('onclick', 'gratisSubmitRequest("' + j.firstName + '" ,"' + j.lastName + '","' + j.sfdcId + '","' + j.institutionName + '")');
        td1.appendChild(name);
        td2.appendChild(organization);
        td3.appendChild(a);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tbody.appendChild(tr1);
    }
    table.appendChild(tbody);

    let totalRows = $('#table').find('tbody tr:has(td)').length;
    let recordPerPage = $("#paginationCount").val();
    let totalPages = Math.ceil(totalRows / recordPerPage);
    let $pages = $('<ul id="pages"></ul>');

    $('<li class="page-prev disabled"><a><em class="abt-icon abt-icon-left-arrow"></em></a></li>').appendTo($pages);
    for (let k = 0; k < totalPages; k++) {
        $('<li class="pageNumber">' + (k + 1) + '</li>').appendTo($pages);
    }
    $('<li class="page-next"><a><em class="abt-icon abt-icon-right-arrow"></em></a></li>').appendTo($pages);
    $pages.appendTo('#table');

    $('.pageNumber:eq(0)').addClass('focus');

    if (totalPages == "1") {
        $(".page-next").addClass("disabled");
    }
    else {
        $(".page-next").removeClass("disabled");
    }

    $('table').find('tbody tr:has(td)').hide();
    let tr = $('table tbody tr:has(td)');
    for (let m = 0; m <= recordPerPage - 1; m++) {
        $(tr[m]).show();
    }
    
}
/* Show hide pagination arrow when click on arrows
    * @param {currPage, totalPg}
    */
let pageNumber;
$('.pageNumber').click(function (event) {
    $(this).addClass('focus').siblings().removeClass('focus');
    $('#table').find('tbody tr:has(td)').hide();
    pageNumber = $(this).text();
    if (pageNumber > 1) {
        $(".page-prev").removeClass("disabled");
    }
    else {
        $(".page-prev").addClass("disabled");
    }
    if (pageNumber == totalPages) {
        $(".page-next").addClass("disabled");
    }
    else {
        $(".page-next").removeClass("disabled");
    }
    let nBegin = ($(this).text() - 1) * recordPerPage;
    let nEnd = $(this).text() * recordPerPage - 1;
    for (let n = nBegin; n <= nEnd; n++) {
        $(tr[n]).show();
    }
});

$(".page-prev").click(function (event) {
    if(!$(this).hasClass('disabled')){  
        $('#table').find('tbody tr:has(td)').hide();
        const currentPage = $('.focus').text() - 1;
        $('.pageNumber:eq("' + (currentPage - 1) + '")').addClass('focus').siblings().removeClass('focus');
        let nBegin = (currentPage - 1) * recordPerPage;
        let nEnd = currentPage * recordPerPage - 1;
        for (let s = nBegin; s <= nEnd; s++) {
            $(tr[s]).show();
        }
        pageArrowsVisibility(currentPage, totalPages);
    }
});

$(".page-next").click(function (event) {
    if(!$(this).hasClass('disabled')){   
    $('#table').find('tbody tr:has(td)').hide();
    const currentPage = parseInt($('.focus').text()) + 1;
    $('.pageNumber:eq("' + (currentPage -1) + '")').addClass('focus').siblings().removeClass('focus');
    let nBegin = (currentPage - 1) * recordPerPage;
    let nEnd = currentPage * recordPerPage - 1;
    for (let i = nBegin; i <= nEnd; i++) {
        $(tr[i]).show();
    }
    pageArrowsVisibility(currentPage, totalPages);
}
});
function pageArrowsVisibility(currPg, totalPg){
    // For the prev arrows
    if(currPg == 1){
        $(".page-prev").addClass("disabled");
    } else{
        $(".page-prev").removeClass("disabled");
    }

    // For the next arrow
    if(currPg == totalPg){
        $(".page-next").addClass("disabled");
    } else{
        $(".page-next").removeClass("disabled");
    }
}

// to close the gratis submit request pop up

$("#btnCancelSubmitRequest,#nonGratisSubmitRequest em").click(function () {
    $("#section-modal-dailog-wrapper").hide();
});

$("#btnCancelApproveRequest,#approve-request em").click(function () {
    $("#section-modal-dailog-wrapper").hide();
});
$("#btnCancelRevokeAccess,#nonGratisRevokeRequest em").click(function () {
    $("#section-modal-dailog-wrapper").hide();
});

$("#btnCancelRevokeAccessForDelegate,#delegateRevokeAccess em").click(function () {
    $("#section-modal-dailog-wrapper").hide();
});


$("#delegateAccessRevoked em").click(function () {
    $("#section-modal-dailog-wrapper").hide();
});

$("#declineAcknowledgement em").click(function () {
    $("#section-modal-dailog-wrapper").hide();
});

$("#btnCancelDeclineDelegateRequest,#declineDelegateRequest em").click(function () {
    $("#section-modal-dailog-wrapper").hide();
});

//User Info display information based on gartis approval status
function userInfodispayInfo(userInfo){
    if (userInfo.additionalProperties.gratisApprovalStatusC == "Gratis Approved Notification" || userInfo.additionalProperties.gratisApprovalStatusC == "Gratis Approved") {
        showAfterApproval(userInfo);
        if (userInfo.additionalProperties.gratisApprovalStatusC == "Gratis Approved Notification") {
            changeGratisNotificationStatus(userInfo.additionalProperties.gratisApprovedByC);
        }
    }
    if (userInfo.additionalProperties.gratisApprovalStatusC == "Gratis Revoke Rejected") {
        showAfterApproval(userInfo);

    }
    else if (userInfo.additionalProperties.gratisApprovalStatusC == "Gratis Declined") {
        $("#searchResult").show();
        $("#searchResult .embed").hide();
        $(".showBeforeSubmitRequest").removeClass("d-none");
        if ($("#sampleEligibility").closest("li").hasClass('active')) {
            $("#nonGratisSubmitRequest,#approve-request,#delegateRevokeAccess,#delegateAccessRevoked,#nonGratisRevokeRequest,#rejectRevokeAccess,#declineDelegateRequest,#declineAcknowledgement").hide();

            $("#declineAcknowledgement").show();
            const element = document.getElementById('declineAcknowledgement');
            if (typeof (element) != 'undefined' && element != null) {
                $("#section-modal-dailog-wrapper").show();
            }

            $(".o-header").addClass("position-static");  
            document.getElementById("btnDelegateDeclineAcknowledge").addEventListener("click", function () {
                acknowledgeGratisDecline();
            });          
        }
    }
    else if (userInfo.additionalProperties.gratisApprovalStatusC == "Pending Gratis Approval") {
        displayStatus("Approval Pending",userInfo);
        $("#searchResult .embed").hide();
        $(".showAfterSubmitRequest").removeClass("d-none");
        $(".showRequestDetails").removeClass("d-none");
    } else if (userInfo.additionalProperties.gratisApprovalStatusC == "Pending Gratis Revoke Approval") {
        displayStatus("Revoke Access Request - Approval Pending",userInfo);
        $("#searchResult .embed").hide();
        $(".showRequestDetails").removeClass("d-none");
        $(".showAfterRevokeAccessRequest").removeClass("d-none");
        $("#divRevokeAccessRequest .showAfterApproval").addClass("d-none");
    } else if (userInfo.additionalProperties.gratisApprovalStatusC == "Gratis Approval Revoked") {
        gratisApprovalRevoked(userInfo);      
        
    }

}
function gratisApprovalRevoked(userInfo){
    $("#searchResult").show();
    $("#searchResult .embed").hide();
    $(".showBeforeSubmitRequest").removeClass("d-none");
    $(".showAfterRevokeAccessRequest").addClass("d-none");
    if ($("#sampleEligibility").closest("li").hasClass('active')) {
        $("#nonGratisSubmitRequest,#approve-request,#delegateRevokeAccess,#delegateAccessRevoked,#nonGratisRevokeRequest,#rejectRevokeAccess,#declineDelegateRequest,#declineAcknowledgement").hide();

        $("#delegateAccessRevoked").show();
        const element = document.getElementById('delegateAccessRevoked');
        if (typeof (element) != 'undefined' && element != null) {
            $("#section-modal-dailog-wrapper").show();
        }
        changeGratisNotificationStatus(userInfo.additionalProperties.gratisApprovedByC);
        $(".o-header").addClass("position-static");
        document.getElementById("btnDelegateAccessRevoked").addEventListener("click", function () {
            acknoledgeTheRevokeAccess();
        });
        
    }

}


//User Info display information based on gartis approval status
function showAfterApproval(userInfo){
    displayStatus("Approved",userInfo);
    $("#searchResult .embed").hide();
    $(".showAfterApproval").removeClass("d-none");
    $(".showRequestDetails").removeClass("d-none");
}
//Delegate revoke access link

$("#revokeAccessForNonGratis").click(function () {

    $("#nonGratisSubmitRequest,#approve-request,#delegateRevokeAccess,#delegateAccessRevoked,#nonGratisRevokeRequest,#rejectRevokeAccess,#declineDelegateRequest,#declineAcknowledgement").hide();

    $("#nonGratisRevokeRequest").show();
    $("#section-modal-dailog-wrapper").show();
    $(".o-header").addClass("position-static");
    document.getElementById("btnRevokeAccessRequest").addEventListener("click", function () {
        nonGratisRevokeRequest();
    });
});

function delegateUserSearch() {
    updateProfileInfo();
    let jwtToken =  getSessionStorage('jwtToken');
    let userInfo = getLocalStorage("userInfo");
    let action = $('#gratis-search').val();
    let headers = {
        "Content-Type": "application/json",
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-id-token": jwtToken
    }
    $.ajax({
        "url": action,
        "method": "POST",
        "headers": headers
    }).then(function (response) {
        if (response.errorCode === 0) {
            let gratisDelegate = userInfo?.additionalProperties?.gratisApprovedForC;
            if (gratisDelegate) {
                showAlreadyDelegated(response.response, gratisDelegate);
            } else {
                $(".showWhenHaveDelegate").addClass("d-none");
                $(".welcomeText").removeClass("d-none");
                $("#txtWhenRevokeAccess").hide();
                $("#selectDelegate").show();
                $("#delegateDropdownCont").show();
                showDelegateForm(response.response);
            }
        } else {
            showApiError("search-users-error");
        }
        hideLoading();
    }).fail(function () {
        showApiError("search-users-error");
        hideLoading();
    });
}

function showAlreadyDelegated(response, gratisDelegate) {
    let user = response.find(obj => obj?.sfdcId === gratisDelegate);
    let text = $("#txtCurrentDelegate");
    if (user) {
        $(".showWhenHaveDelegate").removeClass("d-none");
        $("#selectDelegate").hide();
        $("#delegateDropdownCont").hide();
        $("#section-modal-dailog-wrapper").hide();
        $("#txtWhenRevokeAccess").show();
        $(".showWhenNoDelegate").addClass("d-none");
        $("#delegate-revoke-request").parent().parent().removeClass("d-none");
        $("#txtDelegate").text(user.firstName + " " + user.lastName);
        const approvalStatusdate = new Date(user.gratisApprovalStatusDateC).toLocaleString().split(',')[0];

        let name = user.firstName + " " + user.lastName + "<br/>" + user.institutionName + "<br/>" + "Approved: " + approvalStatusdate;
        text.html(text.html().replaceAll("{delegate}", name));
        text.show();
        document.getElementById("gratisRevokeAccessForDelegate").addEventListener("click", function () {
            revokeAccessOfDeligate(gratisDelegate);
        });
    } else {
        $("#txtWhenRevokeAccess").hide();
        showApiError("search-users-error");
    }
}

function showDelegateForm(response) {
    let form = $("#delegateDropdownlist-options");
    let dropdown = $("[name=gratisApprovedFor]");
    dropdown.html("");

    response.forEach((user) => {
        if (!user.gratisApprovedByC || user?.gratisApprovalStatusC == "Gratis Declined" || user?.gratisApprovalStatusC == "Gratis Approval Revoked") {
            let item = $("<li data-optionvalue='" + user.sfdcId + "'><span>" + user.firstName + " " + user.lastName + "</span></li>");
            dropdown.append(item);
        }
    });
    dropdown.find("li:eq(0)").click().click();
    form.show();
}


function nonGratisRevokeRequest() {
    const action = $('#gratis-delegation').val();
    let jwtToken =  getSessionStorage('jwtToken');
    let userInformation = getLocalStorage("userInfo");
    let sfdcId = userInformation?.additionalProperties?.gratisApprovedByC;

    showLoading();
    if (sfdcId !== "") {
        let apiData = {
            "userInfo": {
                "gratisRequestedFor": sfdcId,
                "action": "gratisRevokeRequest"
            }
        }

        let headers = {
            "Content-Type": "application/json",
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken
        };
        $.ajax({
            url: action,
            headers: headers,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData)
        }).then(function (response) {
            if (response.errorCode == 0) {
                // update profile info
                updateProfileInfo();

                let userInfo = getLocalStorage("userInfo");
                let approvalStatusRevoke 
                //Show Gratis Approval Status -Data has been committed successfully.
                $("#searchResult .embed").hide();
                $(".showAfterApproval").addClass("d-none");
                $(".showRequestDetails").removeClass("d-none");
                $(".showAfterRevokeAccessRequest").removeClass("d-none");
                $("#divRevokeAccessRequest .showAfterApproval").addClass("d-none");
                $("#section-modal-dailog-wrapper").hide();
                let text2 = $("#divCurrentEligiblehealthcare");

                if (userInfo.additionalProperties.gratisApprovalStatusC == "Pending Gratis Revoke Approval") {
                     approvalStatusRevoke = "Revoke Access Request - Approval Pending";
                }
                const approvalStatusdate = new Date(userInfo.additionalProperties.gratisApprovalStatusDateC).toLocaleString().split(',')[0];
                const details = userInfo.additionalProperties.gratisApprovedByName + "<br/>" + userInfo.additionalProperties.gratisApprovedByInstitution + "<br/>" + "Request Submitted: " + approvalStatusdate + "<br>" + "Request Status: " + approvalStatusRevoke;
                text2.find("p").text("{delegate}");
                text2.html(text2.html().replaceAll("{delegate}", details));
                text2.show();
                hideLoading();
            } else if (response.errorCode == 400) {
                showApiError(response?.response?.i18nMessageKey);
                hideLoading();
            }
        }).fail(function () {
            hideLoading();
            hideApiError();
        });
    }
}


function submitGratisRequest(firstName, lastName, sfdcId, organizationName) {
    const action = $('#gratis-delegation').val();
    let jwtToken =  getSessionStorage('jwtToken');
    showLoading();

    if (sfdcId !== "") {
        let apiData = {
            "userInfo": {
                "action": "gratisRequest",
                "gratisRequestedFor": sfdcId
            }
        }

        let headers = {
            "Content-Type": "application/json",
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken
        };
        $.ajax({
            url: action,
            headers: headers,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData)
        }).then(function (response) {
            if (response.errorCode == 0) {
                // update profile info
                updateProfileInfo();
                let userInfo = getLocalStorage("userInfo");

                //Show Gratis Approval Status -Data has been committed successfully.
                $("#searchResult").hide();
                $("#searchResult .embed").hide();
                $(".showBeforeSubmitRequest").addClass("d-none");
                $(".showAfterSubmitRequest").removeClass("d-none");
                $(".showRequestDetails").removeClass("d-none");
                $("#section-modal-dailog-wrapper").hide();
                $(".hcpName").text(firstName + " " + lastName);
                let text = $("#divCurrentEligiblehealthcare");
                const approvalStatusdate = new Date(userInfo.additionalProperties.gratisApprovalStatusDateC).toLocaleString().split(',')[0];

                const gratisStatus = userInfo.additionalProperties.gratisApprovalStatusC == "Pending Gratis Approval" ? "Approval Pending" : "";
                let name = firstName + " " + lastName + "<br/>" + organizationName + "<br/>" + "Request Submitted: " + approvalStatusdate + "<br>" + "Request Status: " + gratisStatus;
                text.html(text.html().replaceAll("{delegate}", name));
                text.show();
                hideLoading();
            } else if (response.errorCode == 400) {
                showApiError(response?.response?.i18nMessageKey);
                hideLoading();
            }
        }).fail(function () {
            hideLoading();
            hideApiError();
        });
    }
}

function updateProfileInfo() {
    const idToken =  getSessionStorage('jwtToken');
    const action = $("#profile-info").val();
    let headers = {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-id-token": idToken
    };

    let response = $.ajax({
        "url": action,
        "method": "GET",
        "headers": headers,
        "async": false
    });

    if (response.responseJSON?.response?.userInfo) {
        setLocalStorage("userInfo", response.responseJSON.response.userInfo);
    }
}

function gratisApproveRequest(firstName, lastName, sfdcId, organizationName) {

    $("#nonGratisSubmitRequest,#approve-request,#delegateRevokeAccess,#delegateAccessRevoked,#nonGratisRevokeRequest,#rejectRevokeAccess,#declineDelegateRequest,#declineAcknowledgement").hide();


    $("#approve-request").show();
    $("#section-modal-dailog-wrapper").show();
    $(".o-header").addClass("position-static");

    document.getElementById("userName").textContent = firstName + " " + lastName;
    document.getElementById("btnApproveRequest").addEventListener("click", function () {
        approveGratisRequest(firstName, lastName, sfdcId, organizationName);
    });
}

function gratisDeclineRequest(firstName, lastName, sfdcId, organizationName) {

    $("#nonGratisSubmitRequest,#approve-request,#delegateRevokeAccess,#delegateAccessRevoked,#nonGratisRevokeRequest,#rejectRevokeAccess,#declineDelegateRequest,#declineAcknowledgement").hide();

    $("#declineDelegateRequest").show();
    $("#section-modal-dailog-wrapper").show();
    $(".o-header").addClass("position-static");
    document.getElementById("delegateName").textContent = firstName + " " + lastName;
    document.getElementById("btnDeclineDelegateRequest").addEventListener("click", function () {
        gratisDeclineRequestByHcp(sfdcId);
    });
}

//Gratis Pending approval request table

function pendingApprovalRequest() {
    const action = $('#gratis-search').val();
    let jwtToken =  getSessionStorage('jwtToken');
    updateProfileInfo();
    let userInfo = getLocalStorage("userInfo");
    let apiData = {
        "userInfo": {
            "action": "getPendingGratisRequests"
        }
    }

    let headers = {
        "Content-Type": "application/json",
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-id-token": jwtToken
    };
    $.ajax({
        url: action,
        headers: headers,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiData)
    }).then(function (response) {
        if (response.errorCode == 0) {
            const user = response.response.filter(obj => {
                return obj?.gratisApprovalStatusC === "Pending Gratis Approval" && obj?.gratisApprovedByC == userInfo.additionalProperties.sfdcId && obj?.institutionName == userInfo.additionalProperties.institutionName;
            });
            let gratisDelegate = userInfo?.additionalProperties?.gratisApprovedForC;

            const gratisNotif = response.response.filter(gratis => {
                return gratis?.gratisApprovalStatusC === "Pending Gratis Revoke Approval" && gratis?.institutionName == userInfo.additionalProperties.institutionName;
            });

            if (user.length > 0) {
                createDelegateReqTable(user);               
                
                if (gratisDelegate) {
                    $(".showWhenApproveDelegate").removeClass("d-none");
                    $(".showWhenHaveDelegateRequest").addClass("d-none");
                    $(".lnkApproveGratis").attr("disabled", "disabled").addClass("disabled").removeAttr("onclick");
                    $(".lnkApproveGratis").addClass("disabled");
                }
                else {
                    $(".showWhenApproveDelegate").addClass("d-none");
                    $(".hideWhenApproveDelegate").addClass("d-none");
                    $(".showWhenHaveDelegateRequest").removeClass("d-none");
                }

            }
            else if (user.length == 0) {
                $("#delegate-request").parent().parent().addClass("d-none");
                $(".hideWhenApproveDelegate").removeClass("d-none");
                $(".showWhenHaveDelegateRequest").addClass("d-none");
                $(".showWhenApproveDelegate").addClass("d-none");
                if (gratisNotif.length > 0) {
                    $(".hideWhenApproveDelegate").addClass("d-none");
                }
                else if (gratisNotif.length == 0) {
                    $(".hideWhenApproveDelegate").removeClass("d-none");
                }

            }

            hideLoading();
        } else if (response.errorCode == 400) {
            showApiError(response?.response?.i18nMessageKey);
            hideLoading();
        }
    }).fail(function () {
        hideLoading();
        hideApiError();
    });
}

function createDelegateReqTable(user){
    $("#delegate-request tbody").remove();
    $("#delegate-request thead").remove();
    const table = document.getElementById('delegate-request');
    const thead = document.createElement('thead');
    const thr = document.createElement('tr');

    const tdh1 = document.createElement('td');
    const tdh2 = document.createElement('td');
    const tdh3 = document.createElement('td');
    const tdh4 = document.createElement('td');
    tdh1.append("Name");
    tdh2.append("Organization");
    tdh3.append("");
    tdh4.append("");
    thr.appendChild(tdh1);
    thr.appendChild(tdh2);
    thr.appendChild(tdh3);
    thr.appendChild(tdh4);
    thead.appendChild(thr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    for (let j of user) {

        const tr1 = document.createElement('tr');
        tr1.setAttribute('id', j.sfdcId);
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const name = document.createTextNode(j.firstName + " " + j.lastName);
        const organization = document.createTextNode(j.institutionName);
        const approve = document.createElement('a');
        approve.setAttribute('href', '#');
        approve.setAttribute('data-toggle', 'modal');
        approve.setAttribute('class', 'lnkApproveGratis');
        if (gratisDelegate) {
            // Disable Link

            approve.setAttribute('disabled', 'disabled');
            approve.removeAttribute('onclick');
        }
        else {
            approve.setAttribute('onclick', 'gratisApproveRequest("' + j.firstName + '" ,"' + j.lastName + '","' + j.sfdcId + '","' + j.institutionName + '")');
        }
        approve.innerHTML = "Approve";

        const decline = document.createElement('a');
        decline.setAttribute('href', '#');
        decline.setAttribute('data-toggle', 'modal');
        decline.innerHTML = "Decline";
        decline.setAttribute('onclick', 'gratisDeclineRequest("' + j.firstName + '" ,"' + j.lastName + '","' + j.sfdcId + '","' + j.institutionName + '")');
        td1.appendChild(name);
        td2.appendChild(organization);
        td3.appendChild(approve);
        td4.appendChild(decline);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tbody.appendChild(tr1);

    }
    table.appendChild(tbody);
}

function approveGratisRequest(firstName, lastName, sfdcId, organizationName) {
    const action = $('#gratis-delegation').val();
    let jwtToken =  getSessionStorage('jwtToken');
    showLoading();

    if (sfdcId !== "") {
        let apiData = {
            "userInfo": {
                "action": "approveGratis",
                "gratisApprovedFor": sfdcId
            }
        }

        let headers = {
            "Content-Type": "application/json",
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken
        };
        $.ajax({
            url: action,
            headers: headers,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData)
        }).then(function (response) {
            if (response.errorCode == 0) {
                gratisDisplayNotification();
                //Show Gratis Approval Status -Data has been committed successfully.
                $(".welcomeText").addClass("d-none");
                $(".showWhenHaveDelegate").removeClass("d-none");
                $("#selectDelegate").hide();
                $("#delegateDropdownCont").hide();
                $("#approve-request").hide();
                $("#section-modal-dailog-wrapper").hide();
                $("#txtWhenRevokeAccess").show();
                $(".showWhenNoDelegate").addClass("d-none");
                $(".lnkApproveGratis").attr("disabled", "disabled").fadeTo("fast", 0.5).removeAttr("onclick").addClass("disabled");
                $("#" + sfdcId).remove();
                updateProfileInfo();
                let userInfo = getLocalStorage("userInfo");
                let text = $("#txtCurrentDelegate");
                const approvalStatusdate = new Date(userInfo.additionalProperties.gratisApprovalStatusDateC).toLocaleString().split(',')[0];
                let name = userInfo.additionalProperties.gratisApprovedForName + "<br/>" + userInfo.additionalProperties.gratisApprovedForInstitution + "<br/>" + "Approved: " + approvalStatusdate;
                text.html(text.html().replaceAll("{delegate}", name));
                text.show();
                document.getElementById("gratisRevokeAccessForDelegate").addEventListener("click", function () {
                    revokeAccessOfDeligate(sfdcId);
                });
                hideLoading();
                pendingApprovalRequest();
                delegateUserSearch();
            } else if (response.errorCode == 400) {
                showApiError(response?.response?.i18nMessageKey);
                hideLoading();
            }
        }).fail(function () {
            hideLoading();
            hideApiError();
        });
    }
}

function nonGratisDisplayNotification(sfdcId) {
    $(".my-account .badgeAccount").removeClass("d-none").text("1");
    $("#sampleEligibility .badgeCounter").removeClass("d-none").text("1");
    $("a[aria-label='My Account']").parent().removeClass("badgeAccount")
    $("a[aria-label='My Account']").parent().append('<a class="badgeAccount" href="#" onClick="changeGratisNotificationStatus(\'' + sfdcId + '\')">1</a>');
}

function changeGratisNotificationStatus(sfdcId) {
    const action = $('#gratis-delegation').val();
    let jwtToken =  getSessionStorage('jwtToken');
    let apiData = {
        "userInfo": {
            "gratisRequestedFor": sfdcId,
            "action": "acknowledgeGratisApprove"
        }
    }

    let headers = {
        "Content-Type": "application/json",
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-id-token": jwtToken
    };
    $.ajax({
        url: action,
        headers: headers,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiData)
    }).then(function (response) {
        if (response.errorCode == 0) {

            //Show Gratis Approval Status -Data has been committed successfully.
            updateProfileInfo();
            $(".my-account .badgeAccount").addClass("d-none")
            $('a.badgeAccount').remove();
            $("#sampleEligibility .badgeCounter").addClass("d-none");
            hideLoading();
        } else if (response.errorCode == 400) {
            showApiError(response?.response?.i18nMessageKey);
            hideLoading();
        }
    }).fail(function () {
        hideLoading();
        hideApiError();
    });
}


function acknowledgeGratisDecline() {
    const action = $('#gratis-delegation').val();
    let jwtToken =  getSessionStorage('jwtToken');
    let apiData = {
        "userInfo": {
            "action": "acknowledgeGratisReject"
        }
    }

    let headers = {
        "Content-Type": "application/json",
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-id-token": jwtToken
    };
    $.ajax({
        url: action,
        headers: headers,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiData)
    }).then(function (response) {
        if (response.errorCode == 0) {

            //Show Gratis Approval Status -Data has been committed successfully.
            updateProfileInfo();
            $(".my-account .badgeAccount").addClass("d-none")
            $('a.badgeAccount').remove();
            $("#sampleEligibility .badgeCounter").addClass("d-none");
            $("#section-modal-dailog-wrapper").hide();
            $("#declineAcknowledgement").hide();
            hideLoading();
        } else if (response.errorCode == 400) {
            showApiError(response?.response?.i18nMessageKey);
            hideLoading();
        }
    }).fail(function () {
        hideLoading();
        hideApiError();
    });
}


function gratisDisplayNotification() {
    const action = $('#gratis-search').val();
    let jwtToken =  getSessionStorage('jwtToken');
    let userInfo = getLocalStorage("userInfo");
    let apiData = {
        "userInfo": {
            "action": "getPendingGratisRequests"
        }
    }

    let headers = {
        "Content-Type": "application/json",
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-id-token": jwtToken
    };
    $.ajax({
        url: action,
        headers: headers,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiData)
    }).then(function (response) {
        if (response.errorCode == 0) {
            const gratisNotif = response.response.filter(user => {
                return (user?.gratisApprovalStatusC === "Pending Gratis Approval" && user?.gratisApprovedByC == userInfo.additionalProperties.sfdcId) || (user?.gratisApprovalStatusC === "Pending Gratis Revoke Approval" && user?.gratisApprovedByC == userInfo.additionalProperties.sfdcId);
            });
            if (gratisNotif.length > 0) {
                $(".my-account .badgeAccount").removeClass("d-none").text(gratisNotif.length);
                $('a.badgeAccount').remove();
                $("a[aria-label='My Account']").parent().append('<a class="badgeAccount" href="/secure/my-delegate.html" onClick="">' + gratisNotif.length + '</a>');
                $("#myDelegate .badgeCounter").removeClass("d-none").text(gratisNotif.length);
            }
            else if (gratisNotif.length == 0) {

                $(".my-account .badgeAccount").addClass("d-none")
                $('a.badgeAccount').remove();
                $("#myDelegate .badgeCounter").addClass("d-none");
            }

        } else if (response.errorCode == 400) {
            showApiError(response?.response?.i18nMessageKey);
            hideLoading();
        }
    }).fail(function () {
        hideLoading();
        hideApiError();
    });
}

function gratisDeclineRequestByHcp(sfdcId) {
    const action = $('#gratis-delegation').val();
    let jwtToken =  getSessionStorage('jwtToken');
    showLoading();

    if (sfdcId !== "") {
        let apiData = {
            "userInfo": {
                "gratisApprovedFor": sfdcId,
                "action": "rejectGratis"
            }
        }

        let headers = {
            "Content-Type": "application/json",
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken
        };
        $.ajax({
            url: action,
            headers: headers,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData)
        }).then(function (response) {
            if (response.errorCode == 0) {
                $("#" + sfdcId).remove();
                $("#section-modal-dailog-wrapper").hide();
                updateProfileInfo();
                gratisDisplayNotification();
                pendingApprovalRequest();
                delegateUserSearch();
            } else if (response.errorCode == 400) {
                showApiError(response?.response?.i18nMessageKey);
                hideLoading();
            }
        }).fail(function () {
            hideLoading();
            hideApiError();
        });
    }
}

//Gratis Revoke Access request table

function pendingRevokeRequest() {
    const action = $('#gratis-search').val();
    let jwtToken =  getSessionStorage('jwtToken');
    updateProfileInfo();
    let userInfo = getLocalStorage("userInfo");
    let apiData = {
        "userInfo": {
            "action": "getPendingGratisRequests"
        }
    }

    let headers = {
        "Content-Type": "application/json",
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-id-token": jwtToken
    };
    $.ajax({
        url: action,
        headers: headers,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiData)
    }).then(function (response) {
        if (response.errorCode == 0) {
            const user = response.response.filter(obj => {
                return obj?.gratisApprovalStatusC === "Pending Gratis Revoke Approval" && obj?.institutionName == userInfo.additionalProperties.institutionName;
            });
            let gratisDelegate = userInfo?.additionalProperties?.gratisApprovedForC;

            const gratisNotif = response.response.filter(gratis => {
                return gratis?.gratisApprovalStatusC === "Pending Gratis Approval" && gratis?.gratisApprovedByC == userInfo.additionalProperties.sfdcId;
            });


            if (user.length > 0) {
                $(".revokeRequestAppend").removeClass("d-none"); // show the action required text
                $(".showWhenRevokeRequest").removeClass("d-none");

                if (gratisDelegate) {
                    $(".showWhenHaveDelegateRequest").addClass("d-none");
                    $(".lnkApproveGratis").attr("disabled", "disabled").fadeTo("fast", 0.5).removeAttr("onclick");
                }
                else {
                    $(".showWhenHaveDelegateRequest").removeClass("d-none");
                }
                createPendingRevokeRequestTable(user);    
                

                if (gratisNotif.length == 0) {
                    $(".showWhenApproveDelegate").addClass("d-none");
                    $(".hideWhenApproveDelegate").addClass("d-none");
                }
            }
            else if (user.length == 0) {
                $("#delegate-revoke-request").remove();
                $(".revokeRequestAppend").addClass("d-none"); // hide the action required text.
            }

            hideLoading();
        } else if (response.errorCode == 400) {
            showApiError(response?.response?.i18nMessageKey);
            hideLoading();
        }
    }).fail(function () {
        hideLoading();
        hideApiError();
    });
}

//create createPendingRevokeRequestTable
function createPendingRevokeRequestTable(user){
    $("#delegate-revoke-request tbody").remove();
    $("#delegate-revoke-request thead").remove();

    const table = document.getElementById('delegate-revoke-request');
    const thead = document.createElement('thead');
    const thr = document.createElement('tr');

    const tdh1 = document.createElement('td');
    const tdh2 = document.createElement('td');
    tdh1.append("Name");
    thr.appendChild(tdh1);
    thr.appendChild(tdh2);
    thead.appendChild(thr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    for (let j of user) {

        const tr1 = document.createElement('tr');
        tr1.setAttribute('id', j.sfdcId);
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');


        const name = document.createTextNode(j.firstName + " " + j.lastName);

        const approve = document.createElement('a');
        approve.setAttribute('href', '#');
        approve.setAttribute('data-toggle', 'modal');
        approve.setAttribute('class', 'lnkApproveGratis');

        approve.setAttribute('onclick', 'approveRevokeAccessRequest("' + j.sfdcId + '")');
        approve.innerHTML = "Approve Revoke Access Request";

        td1.appendChild(name);
        td2.appendChild(approve);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tbody.appendChild(tr1);
    }
    table.appendChild(tbody);
}


// revoke access table link
function approveRevokeAccessRequest(sfdcId) {

    $("#nonGratisSubmitRequest,#approve-request,#delegateRevokeAccess,#delegateAccessRevoked,#nonGratisRevokeRequest,#rejectRevokeAccess,#declineDelegateRequest,#declineAcknowledgement").hide();

    $("#delegateRevokeAccess").show();
    $("#section-modal-dailog-wrapper").show();
    let userInfo = getLocalStorage("userInfo");
    $("#txtDelegate").text(userInfo.additionalProperties.gratisApprovedForName);
    $(".o-header").addClass("position-static");
    document.getElementById("btnRevokeAccessForDelegate").addEventListener("click", function () {
        approveRevokeAccessRequestByDeligate(sfdcId);
    });
}


function revokeAccessOfDeligate(sfdcId) {

    $("#nonGratisSubmitRequest,#approve-request,#delegateRevokeAccess,#delegateAccessRevoked,#nonGratisRevokeRequest,#rejectRevokeAccess,#declineDelegateRequest,#declineAcknowledgement").hide();

    $("#delegateRevokeAccess").show();
    $("#section-modal-dailog-wrapper").show();
    $(".o-header").addClass("position-static");
    let userInfo = getLocalStorage("userInfo");
    $("#txtDelegate").text(userInfo.additionalProperties.gratisApprovedForName);
    document.getElementById("btnRevokeAccessForDelegate").addEventListener("click", function () {
        approveRevokeAccessRequestByDeligate(sfdcId);
    });
}

function approveRevokeAccessRequestByDeligate(sfdcId) {
    const action = $('#gratis-delegation').val();
    let jwtToken =  getSessionStorage('jwtToken');
    showLoading();

    if (sfdcId !== "") {
        let apiData = {
            "userInfo": {
                "gratisApprovedFor": sfdcId,
                "action": "approveGratisRevoke"
            }
        }

        let headers = {
            "Content-Type": "application/json",
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken
        };
        $.ajax({
            url: action,
            headers: headers,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData)
        }).then(function (response) {
            if (response.errorCode == 0) {
                //Show Gratis Approval Status -Data has been committed successfully.
                $("#section-modal-dailog-wrapper").hide();
                $(".welcomeText").removeClass("d-none");
                $("#txtCurrentDelegate").removeClass("d-none");
                $(".showWhenNoDelegate").removeClass("d-none");
                $(".showWhenHaveDelegate").addClass("d-none");
                $(".showWhenApproveDelegate").addClass("d-none");
                $("#txtWhenRevokeAccess").hide();
                $("#selectDelegate").show();
                $("#delegateDropdownCont").show();

                $(".showWhenRevokeRequest").addClass("d-none");
                $(".revokeRequestAppend").addClass("d-none"); // hide the action required text.
                $("#delegate-revoke-request").parent().parent().addClass("d-none");
                updateProfileInfo();
                gratisDisplayNotification();
                pendingApprovalRequest();
                delegateUserSearch();
                hideLoading();
            } else if (response.errorCode == 400) {
                showApiError(response?.response?.i18nMessageKey);
                hideLoading();
            }
        }).fail(function () {
            hideLoading();
            hideApiError();
        });
    }
}

function acknoledgeTheRevokeAccess() {
    const action = $('#gratis-delegation').val();
    let jwtToken =  getSessionStorage('jwtToken');
    showLoading();
    let apiData = {
        "userInfo": {
            "action": "acknowledgeGratisRevoke"
        }
    }

    let headers = {
        "Content-Type": "application/json",
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-id-token": jwtToken
    };
    $.ajax({
        url: action,
        headers: headers,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiData)
    }).then(function (response) {
        if (response.errorCode == 0) {
            //Show Gratis Approval Status -Data has been committed successfully.
            $("#delegateAccessRevoked").hide();
            $("#section-modal-dailog-wrapper").hide();
            updateProfileInfo();
            $(".my-account .badgeAccount").addClass("d-none")
            $('a.badgeAccount').remove();
            $("#sampleEligibility .badgeCounter").addClass("d-none");
            hideLoading();
        } else if (response.errorCode == 400) {
            showApiError(response?.response?.i18nMessageKey);
            hideLoading();
        }
    }).fail(function () {
        hideLoading();
        hideApiError();
    });
}