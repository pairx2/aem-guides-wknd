let currPageTable = 1;
let selectedList = [];
let dataTableSet = false;
let pendingUserCount = 0;
let globalOffset = '0';
let dashboardLink = $('#dashboard-page a').attr('href');
let dashboardLinkArray = dashboardLink?.split('/');
let adminFolderName;
let loginLink = localStorage.getItem('loginURL');
let approveUsersURL;
if(dashboardLinkArray?.length > 0){
    for(let i = 0; i < dashboardLinkArray.length; i++){
        if(dashboardLinkArray[i] == 'secure'){
            adminFolderName = dashboardLinkArray[i+1];
        }
    }
    if(adminFolderName.indexOf('.html') >= 0){
        adminFolderName = adminFolderName.replace('.html','');
    }
}
let searchUsersLink;
$(document).ready(function () {
    let token = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');
    function addScript(scriptURL){
        let s = document.createElement("script");
        s.type = "text/javascript";
        s.src = scriptURL;
        $("head").append(s);
    } 
    setTimeout(function(){
        $('.navigation #dashboard-page').show();
    },100)
    statusPendingCount();
    $('#search-users-datatable')?.hide();
    $('#audit-informations-datatable')?.hide();
    $('#approve-reject-form form input, #approve-reject-form form select, #approve-reject-form form .a-dropdown').attr('disabled', true);
    $('#approve-reject-form form input, #approve-reject-form form select, #approve-reject-form form .a-dropdown').addClass('disabled');
    setTimeout(function() {
        if (window.location.href.indexOf(adminFolderName) >= 0) {
            addScript('https://cdn.datatables.net/buttons/2.3.6/js/dataTables.buttons.min.js');
            addScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js');
            addScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js')
            addScript('https://cdn.datatables.net/buttons/2.3.6/js/buttons.html5.min.js');
            $('#search-users-table')?.before('<table style="border:1px solid #000;position:fixed;z-index:-100;opacity:0;" id="export-all-datatable"><thead><tr><th>First Name</th><th>Last Name</th><th>Job Title</th><th>Department</th><th>Employer</th><th>Address</th><th>City</th><th>State</th><th>Zip</th><th>Country</th><th>Phone</th><th>Customer Type</th><th>Customer Category</th><th>Role</th><th>Email</th><th>Contact Opt-in</th><th>ISLM Opt-in</th><th>Date Registration</th><th>Date Modified</th><th>Status</th><th>I-STAT PRODUCT USED IN FACILITY</th><th>SERIAL NUMBER FOR I-STAT DEVICE</th><th>TOPICS OF INTEREST</th><th>LANGUAGE PREFERENCE FOR COMMUNICATIONS</th></tr></thead><tbody></tbody></table>');
        }
    }, 1500);
    viewEditUserInformation();
    setTimeout(function () {
        if (window.location.href.indexOf('/'+adminFolderName+'/approve-users.html') >= 0 && token) {
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            listAllPendingUers('0');
        }
        if (window.location.href.indexOf('/'+adminFolderName+'/approve-user.html') >= 0 || window.location.href.indexOf('/'+adminFolderName+'/view-user.html') >= 0) {
            let email = getParameterByName('email');
            if(email){
                setTimeout(() => {
                    $('.custom-spinner').removeClass('d-none');
                }, 10);
                userByEmail(email);
            }
        }
        $("#approve").on('click', function (e) {
            e.preventDefault();
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            $('[name="form-action-value"]').val('APPROVED');
            let emailArray = [];
            emailArray.push($('[name="email"]').val())
            let action = $('[name="form-action-value"]').val();
            updateApproveRejectRequest(emailArray, action);

        })
        $("#reject").on('click', function (e) {
            e.preventDefault();
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            $('[name="form-action-value"]').val('REJECTED');
            let emailArray = [];
            emailArray.push($('[name="email"]').val())
            let action = $('[name="form-action-value"]').val();
            updateApproveRejectRequest(emailArray, action);
        })

        $("#approveSelected").on('click', function (e) {
            e.preventDefault();
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            $('[name="form-action-value"]').val('APPROVED');
            let emailArray = [];
            emailArray = $('#approve-users-datatable').attr('data-list').split(',');
            let action = "APPROVED";
            updateApproveRejectRequest(emailArray, action);

        })
        $("#rejectSelected").on('click', function (e) {
            e.preventDefault();
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            $('[name="form-action-value"]').val('REJECTED');
            let emailArray = [];
            emailArray = $('#approve-users-datatable').attr('data-list').split(',');
            let action = "REJECTED";
            updateApproveRejectRequest(emailArray, action);
        })

        $('#submit-search').on('click', function (e) {
            e.preventDefault();
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            searchUserWithFilter('0');
        });
        $('#show-audit-btn').attr('disabled',true);
        $('#show-audit-btn').on('click', function (e) {
            e.preventDefault();
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            listAuditInformations('0');
        });
        $("body").delegate(".generate-token", "click", function() {
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            let emailID = $(this).closest('tr')?.find('td:nth-child(3)')?.text()?.trim();
            if(emailID){
                resetPassordTokenGen(emailID);
            }
        });


        $('body').delegate('#search-users-datatable_paginate .previous', 'click', function(e){
            e.preventDefault();
            e.stopPropagation();
            let updatedOffset = (parseInt(globalOffset) - 100).toString();
            searchUserWithFilter(updatedOffset)
        })       
        $('body').delegate('#search-users-datatable_paginate .next','click', function(e){
            e.preventDefault();
            e.stopPropagation();
            let updatedOffset = (parseInt(globalOffset) + 100).toString();
            searchUserWithFilter(updatedOffset)
        })

        $('body').delegate('#approve-users-datatable_paginate .previous', 'click', function(e){
            e.preventDefault();
            e.stopPropagation();
            let updatedOffset = (parseInt(globalOffset) - 100).toString();
            listAllPendingUers(updatedOffset)
        })       
        $('body').delegate('#approve-users-datatable_paginate .next','click', function(e){
            e.preventDefault();
            e.stopPropagation();
            let updatedOffset = (parseInt(globalOffset) + 100).toString();
            listAllPendingUers(updatedOffset)
        })

        $('body').delegate('#audit-informations-datatable_paginate .previous', 'click', function(e){
            e.preventDefault();
            e.stopPropagation();
            let updatedOffset = (parseInt(globalOffset) - 100).toString();
            listAuditInformations(updatedOffset)
        })       
        $('body').delegate('#audit-informations-datatable_paginate .next','click', function(e){
            e.preventDefault();
            e.stopPropagation();
            let updatedOffset = (parseInt(globalOffset) + 100).toString();
            listAuditInformations(updatedOffset)
        })
        showAditStartEnd();
        
        megaMenuItemAppUser();
        
        localStoSetItemEmail();
    }, 1000)
    searchUserRedirect();
    updateDelUserEmail();
});

function updateDelUserEmail() {
    $("#delete-user").on('click', function (e) {
        e.preventDefault();
        let email = getParameterByName('email');
        if (email) {
            setTimeout(() => {
                $('.custom-spinner').removeClass('d-none');
            }, 10);
            UpdateDeleteUser(email);
        }
    });
}

function localStoSetItemEmail() {
    if (window.location.href.indexOf('/' + adminFolderName + '/approve-user.html') >= 0) {
        $('#reject-user').on('click', function () {
            localStorage.removeItem('RejectEmail');
            localStorage.setItem('RejectEmail', $('[name="email"]').val());
        });
    }
}

function megaMenuItemAppUser() {
    $('.m-mega-menu__item a').each(function () {
        let href = $(this)?.attr('href');
        if (href?.indexOf('approve-users.html') >= 0) {
            approveUsersURL = href;
        }
    });
}

function showAditStartEnd() {
    if ($('#show-audit-btn').length > 0) {
        $('body').delegate('[name="startDate"]', 'change', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($(this).val().length > 0 && $(this).closest('form').find('[name="endDate"]').val().length > 0) {
                $('#show-audit-btn').attr('disabled', false);
            }
            else {
                $('#show-audit-btn').attr('disabled', true);
            }
        });
        $('body').delegate('[name="endDate"]', 'change', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($(this).val().length > 0 && $(this).closest('form').find('[name="startDate"]').val().length > 0) {
                $('#show-audit-btn').attr('disabled', false);
            }
            else {
                $('#show-audit-btn').attr('disabled', true);
            }
        });

    }
}

function searchUserRedirect() {
    $('.nav-item').each(function () {
        if ($(this).attr('href').indexOf('/search-users.html') >= 0) {
            searchUsersLink = $(this).attr('href');
        }
    });
}

function viewEditUserInformation() {
    if ($('#view-user-form')?.length > 0) {
        $('#view-user-form form input, #view-user-form form select, #view-user-form form .a-dropdown').attr('disabled', true);
        $('#view-user-form form input, #view-user-form form select, #view-user-form form .a-dropdown').addClass('disabled');
        $('#view-user-form').find('.o-form-container__buttons').removeClass('d-flex').addClass('d-none');
        $('#edit-user-information').on('click', function () {
            $('#view-user-form form input, #view-user-form form select, #view-user-form form .a-dropdown').attr('disabled', false);
            $('#view-user-form form input, #view-user-form form select, #view-user-form form .a-dropdown').removeClass('disabled');
            $('ul[name="customerType"]').closest('.a-dropdown__field').removeClass('disabled');
            $('ul[name="customerCategory"]').closest('.a-dropdown__field').removeClass('disabled');
            $('ul[name="customerRole"]').closest('.a-dropdown__field').removeClass('disabled');
            $('#view-user-form').find('.o-form-container__buttons').addClass('d-flex').removeClass('d-none');
        });
    }
}

function statusPendingCount() {
    if ($('#status-pending-count')?.length > 0) {
        setTimeout(() => {
            $('.custom-spinner').removeClass('d-none');
        }, 100);
        listPendingUers('0');
    }
}

function updateApproveRejectRequest(emailArray, action) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let tokenID = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');

    let payloadData = {
        "emails": emailArray,
        "action": action
    }

    $.ajax({
        url: searchUserurlOrigin + '/api/private/profile/admin/update-user',
        method: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(payloadData),
        "headers": {
            'x-preferred-language': 'en',
            'x-country-code': 'US',
            'x-application-id': headerApplicationId,
            "x-id-token": tokenID
        },
        success: function (res) {
            selectedList = [];    
            $('#approve-users-datatable').attr('data-list', '');
            
            $('.m-mega-menu__item a').each(function(){
                let href = $(this)?.attr('href');
                if(href?.indexOf('approve-users.html') >= 0){
                    approveUsersURL = href;
                }
            })
           if(res?.response?.statusReason?.toLowerCase()?.indexOf('success') >= 0 && action == 'APPROVED'){
                dataSuccessfully(emailArray);
           }
           else if(res?.response?.statusReason?.toLowerCase()?.indexOf('success') >= 0 && action == 'REJECTED'){
                dataRejectSussessfully(emailArray);
           }
           else{
                alert('Unable to process the request. Please try again later.')
           }
            listAllPendingUers('0');
            setTimeout(() => {
                $('.custom-spinner').addClass('d-none');
            }, 10);
            let currURL = window.location.href;
            if (window.location.href.indexOf('/'+adminFolderName+'/view-user.html') >= 0) {
                window.location.href = currURL;
            }
            return response;
        },
        error: function (error) {
            alert('Something wrong with the server. Please try again')
        }
    });
}

function dataRejectSussessfully(emailArray) {
    if (emailArray.length > 1) {
        alert(`Selected ${emailArray.length} users have ben rejected successfully`);
    }
    if (emailArray.length == 1) {
        alert(`The User have been rejected successfully`);
        if (window.location.href.indexOf('/' + adminFolderName + '/approve-user.html') >= 0) {
            window.location.href = approveUsersURL;
        }
    }
}

function dataSuccessfully(emailArray) {
    if (emailArray.length > 1) {
        alert(`Selected ${emailArray.length} users have ben approved successfully`);
    }
    if (emailArray.length == 1) {
        alert(`The User have been approved successfully`);
        if (window.location.href.indexOf('/' + adminFolderName + '/approve-user.html') >= 0) {
            window.location.href = approveUsersURL;
        }
    }
}

function listPendingUers(offset) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let payloadData = {
        "action": "search",
        "status": "PENDING",
        "offset": offset,
        "limit": "100"
    }
    let tokenID = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');

    $.ajax({
        url: searchUserurlOrigin + '/api/private/profile/search-users',
        method: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(payloadData),
        "headers": {
            'x-id-token': tokenID,
            'x-application-id': headerApplicationId,
            'x-country-code': 'US',
            'x-preferred-language': 'en'
        },
        success: function (response) {
            let currDataLength = response.response.userInfo.length;
            pendingUserCount += response.response.userInfo.length;
            $('#status-pending-count').val(pendingUserCount)
            let textContent = $('#count-text p').text().split('#');
            textContent[0] = `#${pendingUserCount}`;
            textContent = textContent.join(' ');
            if(currDataLength == 100 ){
                let offsetNew = parseInt(offset) + 100;
                listPendingUers(offsetNew);
            }
            else{
                $('#count-text p').text(textContent)
            }
            setTimeout(() => {
                $('.custom-spinner').addClass('d-none');
            }, 10);
            return response;
        },
        error: function (error) {
            setTimeout(() => {
                $('.custom-spinner').addClass('d-none');
            }, 10);
            window.location.href = loginLink;
        }
    });
}

function listAllPendingUers(offset) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

    let payloadData = {
        "action": "search",
        "status": "PENDING",
        "offset": offset,
        "limit": "100"
    }
    globalOffset = offset;
    let tokenID = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/profile/search-users',
        method: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(payloadData),
        "headers": {
            'x-id-token': tokenID,
            'x-application-id': headerApplicationId,
            'x-country-code': 'US',
            'x-preferred-language': 'en'
        },
        success: function (response) {
            let userInfo = response.response.userInfo;
            let resLength = userInfo.length
            let approveerUserlink;
            if (dataTableSet === true) {
                $("#approve-users-datatable")?.dataTable()?.fnClearTable();
                $("#approve-users-datatable")?.dataTable()?.fnDestroy();
            }
            for (let i in userInfo) {
                let table = $('#approve-users-datatable').find("tbody");
                if (window.location.href.includes('/content/')) {
                    approveerUserlink = '/content/ardx/globalpointofcare/useradmin/approve-user.html?email=' + userInfo[i].emailAddress + '';
                } else {
                    approveerUserlink = 'approve-user.html?email=' + userInfo[i].emailAddress + '';
                }
                let { segmentationItem, countryItem } = countryItemSegment(userInfo, i);
                $(table).append(
                    `<tr> <td><input type="checkbox" class="approve-user-checkbox" name="pending-user-${i + 1}"></td> <td>${userInfo[i].firstName}</td> <td class="email">${userInfo[i].emailAddress}</td> <td>${userInfo[i].employer}</td> <td>${segmentationItem}</td> <td> ${countryItem} </td><td> ${(new Date(userInfo[i].createdDate.split(' ')[0])).toLocaleDateString('en-US')} </td><td> ${(new Date(userInfo[i].modifiedDate.split(' ')[0])).toLocaleDateString('en-US')} </td><td> <a href="${approveerUserlink}" class="review-information">Review Information</a> </td> </tr>`
                );
            }

            let approveTable = $("#approve-users-datatable").DataTable({
                "pageLength": 100,
                "ordering": false,
                columnDefs: [
                    {
                        orderable: false,
                        className: "select-checkbox",
                        targets: 0,
                    },
                ],
                select: {
                    style: "os",
                    selector: "td:first-child",
                },
                order: [[1, "asc"]],
            }).on('draw.dt', function () {

                selectApproveDataTable();
            });
            approveTable.on("click", "th.select-checkbox", function () {
                selectApproveCheckbox();
            }).on("select deselect", function () {
                if (approveTable.rows({
                    selected: true
                }).count() !== approveTable.rows().count()) {
                    $("th.select-checkbox").removeClass("selected");
                } else {
                    $("th.select-checkbox").addClass("selected");
                }
            });
            
            approveUserCheckboxCheck();
            approveUserDataTablePagination(offset, resLength);
            selectedList = [];
        },
        error: function (error) {
            window.location.href = loginLink;
        }
    });
}

function countryItemSegment(userInfo, i) {
    let countryItem = userInfo[i].country;
    let segmentationItem = userInfo[i].segmentation;
    if (countryItem === undefined || countryItem === 'undefined' || countryItem === 'null' || countryItem === null) {
        countryItem = '';
    }
    if (segmentationItem === undefined || segmentationItem === 'undefined' || segmentationItem === 'null' || segmentationItem === null) {
        segmentationItem = '';
    }
    return { segmentationItem, countryItem };
}

function approveUserDataTablePagination(offset, resLength) {
    setTimeout(function () {
        $('#approve-users-datatable_paginate .paginate_button.current').hide();
        if (parseInt(offset) == 0) {
            $('#approve-users-datatable_paginate .next').removeClass('disabled');
        }
        if (parseInt(offset) >= 100) {
            $('#approve-users-datatable_paginate .previous').removeClass('disabled');
            $('#approve-users-datatable_paginate .next').removeClass('disabled');
        }
        if (resLength < 100 && offset !== 0) {
            $('#approve-users-datatable_paginate .previous').hide();
            $('#approve-users-datatable_paginate .next').hide();
        }
        $('#approve-users-datatable').closest('.container').addClass('full-width-container');
        $("#approve-users-datatable").show();
        dataTableSet = true;
        setTimeout(() => {
            $('.custom-spinner').addClass('d-none');
        }, 10);
    }, 1100);
}

function approveUserCheckboxCheck() {
    $('#approve-users-datatable tbody .approve-user-checkbox').on('change', function () {
        let currentRowEmail;
        let selectedFinalList;
        if ($(this).is(':checked')) {
            currentRowEmail = $(this).closest('tr').find('td:nth-child(3)')?.text();
            selectedList.push(currentRowEmail);
            selectedFinalList = selectedList.toString();
            $('#approve-users-datatable').attr('data-list', selectedFinalList);
        }
        else {
            currentRowEmail = $(this).closest('tr').find('td:nth-child(3)')?.text();
            selectedList.pop(currentRowEmail);
            selectedFinalList = selectedList.toString();
            $('#approve-users-datatable').attr('data-list', selectedFinalList);
        }
    });
}

function selectApproveDataTable() {
    if ($('#approve-users-datatable tbody .approve-user-checkbox').length != $('#approve-users-datatable tbody .approve-user-checkbox:checked').length) {
        $('#approve-users-datatable [name="pending-user-all"]').prop('checked', false);
        $('#approve-users-datatable [name="pending-user-all"]').trigger('change');
    }
    else if ($('#approve-users-datatable tbody .approve-user-checkbox').length == $('#approve-users-datatable tbody .approve-user-checkbox:checked').length) {
        $('#approve-users-datatable [name="pending-user-all"]').prop('checked', true);
        $('#approve-users-datatable [name="pending-user-all"]').trigger('change');
    }
}

function selectApproveCheckbox() {
    if ($("th.select-checkbox").hasClass("selected")) {
        $("th.select-checkbox").removeClass("selected");
        $('#approve-users-datatable tbody .approve-user-checkbox').prop('checked', false);
        $('#approve-users-datatable tbody .approve-user-checkbox').trigger('change');
    } else {
        $("th.select-checkbox").addClass("selected");
        $('#approve-users-datatable tbody .approve-user-checkbox').prop('checked', true);
        $('#approve-users-datatable tbody .approve-user-checkbox').trigger('change');
    }
}

function userByEmail(email) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let payloadData = {
        "action": "search",
        "email": email,
        "offset": "0",
        "limit": "1"
    }
    let tokenID = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/profile/search-users',
        method: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(payloadData),
        "headers": {
            'x-id-token': tokenID,
            'x-application-id': headerApplicationId,
            'x-country-code': 'US',
            'x-preferred-language': 'en'
        },
        success: function (data) {
            viewAppSucRej(data);
            $('[name="firstName"]').val(data.response.userInfo[0].firstName);
            $('[name="lastName"]').val(data.response.userInfo[0].lastName);
            $('[name="email"]').val(data.response.userInfo[0].emailAddress);
            $('[name="password"]').val(data.response.userInfo[0].password);
            $('[name="jobTitle"]').val(data.response.userInfo[0].jobTitle);
            $('[name="department"]').val(data.response.userInfo[0].department);
            $('[name="employer"]').val(data.response.userInfo[0].employer);
            $('[name="address"]').val(data.response.userInfo[0].address);
            $('[name="address2"]').val(data.response.userInfo[0].address2);
            $('[name="city"]').val(data.response.userInfo[0].city);
            $('[name="state"]').val(data.response.userInfo[0].state);
            $('[name="zipCode"]').val(data.response.userInfo[0].zipCode);
            $('[name="phoneNumber"]').val(data.response.userInfo[0].phoneNumber);
            $('[name="istatProduct"]').val(data.response.userInfo[0].istatProduct);
            $('[name="serialNumber"]').val(data.response.userInfo[0].serialNumber);
            $('[name="topics"]').val(data.response.userInfo[0].topics);
            
            let optInToStatus='';
            let optInFromStatus='';
            if(data.response.userInfo[0].contactOpt === false){
                optInToStatus = 'OptOut'
            }
             if(data.response.userInfo[0].contactOpt === true){
                optInToStatus = 'OptIn'
            }
            $('[name="contactOptIn"]').val(optInToStatus);
            let options = {
              year: "numeric",
              month: "short",
              day: "numeric" ,
               weekday: 'short'
            };
            let contactOptModifiedDate  = new Date(data.response.userInfo[0].contactOptModifiedDate).toLocaleDateString("en-US", options); 
            $('[name="date"]').val(contactOptModifiedDate);
            let contactOptInModifiedDate = new Date(data.response.userInfo[0].contactOptModifiedDate);
            let creationDate = new Date(data.response.userInfo[0].createdDate);
            if(contactOptInModifiedDate > creationDate){
                if(optInToStatus == 'OptIn'){
                    optInFromStatus = 'OptOut'
                }
                if(optInToStatus == 'OptOut'){
                    optInFromStatus = 'OptIn'
                }
                $('[name="contactOpt"]').val(optInFromStatus);
            }
            $('[name="contactOptIn"]').prop('checked', data.response.userInfo[0].contactOpt);
            $('[name="contactOptIn"]').attr('disabled', true);
            $('[name="contactOpt"]').attr('disabled', true);
            $('[name="date"]').attr('disabled', true);
            
            $('#section-view-optin-optout-modal')?.closest('.container').css('height','100%');
            $('#section-view-optin-optout-modal')?.closest('.container').css('margin-bottom','20px');
            let istatProduct = (data.response.userInfo[0].istatProduct)?.split(',');
            $('[name="istatProduct"]').val(istatProduct);

            let topics = (data.response.userInfo[0].topics)?.split(',');
            $('[name="topics"]').val(topics);

            istatProductTopic(data);

            retrieveCountryDataOptValue(data);
       
            let retriveCustomerType = data.response.userInfo[0].segmentation;
            let retriveCustomerCategory = data.response.userInfo[0].subSegmentation;
            let retriveCustomerRole = data.response.userInfo[0].tertiarySegmentation;
            let customerTypeText;

            customerTypeText = customerTupeDataOption(retriveCustomerType, customerTypeText);
           
            $('ul[name="customerType"]').closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected');
            $('ul[name="customerType"]').closest('.a-dropdown__field')?.find('.a-dropdown-selected')?.addClass('selectedValue').text(customerTypeText);
            $('ul[name="customerType"]').closest('.a-dropdown__field').addClass('disabled');

            $('.conditional__case[data-conditional-case="'+retriveCustomerType+'"]').addClass('activeCategory').show();
            actCustomerCatDataOption(retriveCustomerCategory);
            $('.conditional__case[data-conditional-case="'+retriveCustomerCategory+'"]').addClass('activeRole').show();
            activeCusRoleDataOption(retriveCustomerRole);
            retrieveLangDet(data);
            retrieveCustomerTypeDet(retriveCustomerType);
            $('ul[name="customerCategory"]').closest('.a-dropdown__field').addClass('disabled');
            $('ul[name="customerRole"]').closest('.a-dropdown__field').addClass('disabled');
            $('.custom-spinner').addClass('d-none');

        },
        error: function (error) {
            setTimeout(() => {
                $('.custom-spinner').addClass('d-none');
            }, 10);
            window.location.href = loginLink;
        }
    });
}

function retrieveCountryDataOptValue(data) {
    let retriveCountry = data.response.userInfo[0].country;
    let countryText;
    $('ul[name="country"] li').removeClass('selected');
    $('ul[name="country"] li').removeAttr('aria-selected');
    if (retriveCountry != undefined && retriveCountry != null && retriveCountry != '') {
        $('ul[name="country"] li').each(function () {
            let countryOption = $(this).attr('data-optionvalue');
            if (countryOption == retriveCountry.toUpperCase()) {
                $(this).addClass('selected');
                $(this).attr('aria-selected', 'true');
                countryText = $(this).find('span').text();
            }
        });
        $('ul[name="country"]').closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(countryText);
    }
}

function retrieveLangDet(data) {
    let retriveLang = data.response.userInfo[0].language;
    let langText;
    if (retriveLang) {
        langText = retLangDataOption(retriveLang, langText);
        $('ul[name="language"]').closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected');

        $('ul[name="language"]').closest('.a-dropdown__field')?.find('.a-dropdown-selected')?.text(langText);
    }
}

function istatProductTopic(data) {
    $('[name="istatProduct"] option').each(function () {
        if (data.response.userInfo[0].istatProduct?.indexOf($(this).attr('value')) >= 0) {
            $(this).attr('selected', true);
            $(this).addClass('selected');
        }
    });

    $('[name="topics"] option').each(function () {
        if (data.response.userInfo[0].topics?.indexOf($(this).attr('value')) >= 0) {
            $(this).attr('selected', true);
            $(this).addClass('selected');
        }
    });
}

function retrieveCustomerTypeDet(retriveCustomerType) {
    if ((retriveCustomerType == 'hospitalPublic' || retriveCustomerType == 'HOSPITAL_PUBLIC') || (retriveCustomerType == 'hospitalPrivate' || retriveCustomerType == 'HOSPITAL_PRIVATE') || (retriveCustomerType == 'nonHospital' || retriveCustomerType == 'NON_HOSPITAL')) {
        $('[name="istatProduct"]').closest('.a-dropdown').attr('data-required', true);
        $('[name="serialNumber"]').closest('.a-input-field').attr('data-required', true);
        $('[name="serialNumber"]').attr('required', true);
        $('[name="topics"]').closest('.a-dropdown').attr('data-required', true);
        $('[name="language"]').closest('.a-input-field').attr('data-required', true);
        $('[name="istatProduct"]').closest('.options').show();
        $('[name="serialNumber"]').closest('.fields').show();
        $('[name="topics"]').closest('.options').show();
        $('[name="language"]').closest('.options').show();
    }
    else {
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
}

function activeCusRoleDataOption(retriveCustomerRole) {
    $('.activeRole ul[name="customerRole"]').find('li').each(function () {
        let customerRoleOpt = $(this).attr('data-optionvalue');
        if (customerRoleOpt == retriveCustomerRole) {
            $(this).addClass('selected');
            $(this).attr('aria-selected', true);
            let customerRoleText = $(this).find('span').text();
            $(this).closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected');
            $(this).closest('.a-dropdown__field')?.find('.a-dropdown-selected')?.addClass('selectedValue').text(customerRoleText);
            return false;
        }
    });
}

function retLangDataOption(retriveLang, langText) {
    $('ul[name="language"] li').each(function () {
        let langOption = $(this).attr('data-optionvalue');
        if (langOption == retriveLang) {
            $(this).closest('ul').find('li').removeClass('selected');
            $(this).addClass('selected');
            langText = $(this).find('span').text();
        }
    });
    return langText;
}

function actCustomerCatDataOption(retriveCustomerCategory) {
    $('.activeCategory ul[name="customerCategory"]').find('li').each(function () {
        let customerCategoryOpt = $(this).attr('data-optionvalue');
        if (customerCategoryOpt == retriveCustomerCategory) {
            $(this).addClass('selected');
            $(this).attr('aria-selected', true);
            let customerCategoryText = $(this).find('span').text();
            $(this).closest('.a-dropdown__field').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected');
            $(this).closest('.a-dropdown__field')?.find('.a-dropdown-selected')?.addClass('selectedValue').text(customerCategoryText);
            return false;
        }
    });
}

function customerTupeDataOption(retriveCustomerType, customerTypeText) {
    $('ul[name="customerType"] li').each(function () {
        let customerTypeOption = $(this).attr('data-optionvalue');
        if (customerTypeOption == retriveCustomerType) {
            $(this).addClass('selected');
            customerTypeText = $(this).find('span').text();
        }
    });
    return customerTypeText;
}

function viewAppSucRej(data) {
    if ($('#view-user-form').length > 0) {
        if (data.response.userInfo[0].status == "APPROVED") {
            $('#approve').closest('.button').hide();
        }
        if (data.response.userInfo[0].status == "REJECTED") {
            $('#reject').closest('.button').hide();
        }
    }
}

function searchUserWithFilter(offset) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let token = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');

    let userStatus = $('[name="status"]').find('li.selected span')?.text()?.trim() ? $('[name="status"]').find('li.selected span')?.text()?.trim() : undefined;
    let userType = $('[name="userType"]').find('li.selected').attr('data-optionvalue') ? $('[name="userType"]').find('li.selected').attr('data-optionvalue') : undefined;
    let userName = $('[name="name"]').val() ? $('[name="name"]').val() : undefined;
    let userEmail = $('[name="email"]').val() ? $('[name="email"]').val() : undefined;
    let startDate = $('[name="startDate"]').val() ? $('[name="startDate"]').val() + ' 00:00:00' : undefined;
    let endDate = $('[name="endDate"]').val() ? $('[name="endDate"]').val() + ' 23:59:59' : undefined;
    if (userEmail) {
        userStatus = undefined;
    }
    globalOffset = offset
    let payloadData = {
        "action": "search",
        "name": userName,
        "status": userStatus,
        "startDate": startDate,
        "endDate": endDate,
        "userTypes": userType,
        "email": userEmail,
        "offset": offset,
        "limit": "100"
    }
    $.ajax({
        url: searchUserurlOrigin + '/api/private/profile/search-users',
        method: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(payloadData),
        "headers": {
            'x-id-token': token,
            'x-application-id': headerApplicationId,
            'x-country-code': 'US',
            'x-preferred-language': 'en'
        },
        success: function (response) {
            let userInfo = response.response.userInfo;
            let resLength = userInfo.length;
            let approveerUserlink;
            dataTableSetDet();
          
            for (let i in userInfo) {
                let table = $('#search-users-datatable').find("tbody");
                approveerUserlink = approvrUserLinkRedirect(approveerUserlink, userInfo, i);
                let sNo = parseInt(i) + 1;
                let createdDate = (userInfo[i].createdDate)?.split(' ')[0].replaceAll('-','/');
                createdDate = createdDate.split('/')[1]+'/'+createdDate.split('/')[2]+'/'+createdDate.split('/')[0];
                let modifiedDate = (userInfo[i].modifiedDate)?.split(' ')[0].replaceAll('-','/');
                modifiedDate = modifiedDate.split('/')[1]+'/'+modifiedDate.split('/')[2]+'/'+modifiedDate.split('/')[0];
                $(table).append(
                    `<tr> <td>${sNo}</td> <td>${userInfo[i].firstName}</td> <td class="email">${userInfo[i].emailAddress}</td> <td> ${createdDate} </td><td> ${modifiedDate} </td><td> <a href="${approveerUserlink}" class="review-information">Review Information</a> </td><td> <a href="javascript:;" class="generate-token">Generate Token</a> </td> </tr>`
                );
                let fullDatable = $('#export-all-datatable').find("tbody"); 
                let countryItem = userInfo[i].country;
                if(countryItem == undefined || countryItem == 'undefined' || countryItem == 'null' || countryItem == null){
                    countryItem = '';
                }
                $(fullDatable).append(
                    `<tr><td>${userInfo[i].firstName}</td><td>${userInfo[i].lastName}</td><td>${userInfo[i].jobTitle}</td><td>${userInfo[i].department}</td><td>${userInfo[i].department}</td><td>${userInfo[i].employer}</td><td>${userInfo[i].city}</td><td>${userInfo[i].state}</td><td>${userInfo[i].zipCode}</td><td>${countryItem}</td><td>${userInfo[i].phoneNumber}</td><td>${userInfo[i].segmentation}</td><td>${userInfo[i].subSegmentation}</td><td>${userInfo[i].tertiarySegmentation}</td><td>${userInfo[i].emailAddress}</td><td>${userInfo[i].contactOpt}</td><td>N/A</td><td>${userInfo[i].createdDate}</td><td>${userInfo[i].modifiedDate}</td><td>${userInfo[i].status}</td><td>${userInfo[i].istatProduct}</td><td>${userInfo[i].serialNumber}</td><td>${userInfo[i].topics}</td><td>${userInfo[i].language}</td></tr>`
                );
            }
           
            setTimeout(function () {
            
                $("#search-users-datatable").DataTable({
                    "pageLength": 100,
                    "ordering": false,
                    columnDefs: [
                        {
                            orderable: false,
                            className: "select-checkbox",
                            targets: 0,
                        },
                    ],
                    order: [[1, "asc"]],
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Export Current View',
                            exportOptions: {
                                columns: ':visible',
                                rows: ':visible'
                            }
                        },
                        'colvis'
                    ]
                });
                $('#export-all-datatable').DataTable({
                    "pageLength": 100,
                    "ordering": false,
                    "bPaginate": false,
                    searching: false,
                    paging: false, 
                    info: false,
                    order: [[1, "asc"]],
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Export All',
                            exportOptions: {
                                columns: ':visible',
                                rows: ':visible'
                            }
                        },
                        'colvis'
                    ]
                });
                $('.buttons-excel').addClass('btn');
                $('.buttons-excel').closest('.dt-buttons').addClass('a-button-bg--colorPalette_PrimaryBlue a-button-bghover--colorPalette_Black a-button-text--colorPalette_Black a-button-texthover--colorPalette_PrimaryBlue button link a-button a-button--primary a-button--md');
                
            }, 1000);
           
            setTimeout(function(){
                $('#search-users-datatable_paginate .paginate_button.current').hide();
                parseIntPaginate(offset, resLength);
                $("#search-users-datatable").show();
                dataTableSet = true;
                setTimeout(() => {
                    $('.custom-spinner').addClass('d-none');
                }, 10);
            },1100)

        },
        error: function (error) {
            setTimeout(() => {
                $('.custom-spinner').addClass('d-none');
            }, 10);
            window.location.href = loginLink;
        }
        
    });
}

function approvrUserLinkRedirect(approveerUserlink, userInfo, i) {
    if (window.location.href.includes('/content/')) {
        approveerUserlink = '/content/ardx/globalpointofcare/useradmin/view-user.html?wcmmode=disabled&email=' + userInfo[i].emailAddress + '';
    } else {
        approveerUserlink = 'view-user.html?email=' + userInfo[i].emailAddress + '';
    }
    return approveerUserlink;
}

function parseIntPaginate(offset, resLength) {
    if (parseInt(offset) == 0) {
        $('#search-users-datatable_paginate .next').removeClass('disabled');
    }
    if (parseInt(offset) >= 100) {
        $('#search-users-datatable_paginate .previous').removeClass('disabled');
        $('#search-users-datatable_paginate .next').removeClass('disabled');
    }
    if (resLength < 100 && offset !== 0) {
        $('#search-users-datatable_paginate .next').hide();
        $('#search-users-datatable_paginate .previous').hide();
    }
}

function dataTableSetDet() {
    if (dataTableSet === true) {
        $("#search-users-datatable")?.dataTable()?.fnClearTable();
        $("#search-users-datatable")?.dataTable()?.fnDestroy();
        $("#export-all-datatable")?.dataTable()?.fnClearTable();
        $("#export-all-datatable")?.dataTable()?.fnDestroy();
    }
}

function resetPassordTokenGen(email){
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

    let payloadData = {
        "email": email
    }

    $.ajax({
        url: searchUserurlOrigin + '/api/public/profile/forgot-password',
        method: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(payloadData),
        "headers": {
            'x-application-id': headerApplicationId,
            'x-country-code': 'US',
            'x-preferred-language': 'en'
        },
        success: function (response) {
            alert('Password reset is initiated user will receive an email to reset thier password')
            setTimeout(() => {
                $('.custom-spinner').addClass('d-none');
            }, 10);
            return response;
        },
        error: function (error) {
            
        }
    });
}


function listAuditInformations(offset) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let startDate = $('[name="startDate"]').val() ? $('[name="startDate"]').val() + ' 00:00:00' : undefined;
    let endDate = $('[name="endDate"]').val() ? $('[name="endDate"]').val() + ' 23:59:59' : undefined;
    let payloadData = {
        "action": "retrieveAuditLogs",
        "startDate": startDate,
        "endDate": endDate,
        "offset": offset,
        "limit": "100"
    }
    globalOffset = offset;
    let tokenID = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');
    if(new Date(startDate) > new Date(endDate)){
        $('.o-form-container__error-msg').text('Start date is greater than End date');
        setTimeout(() => {
            $('.custom-spinner').addClass('d-none');
        }, 10);
    }
    else{
        $('.o-form-container__error-msg').text('');
        $.ajax({
            url: searchUserurlOrigin + '/api/private/profile/search-users',
            method: "POST",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(payloadData),
            "headers": {
                'x-id-token': tokenID,
                'x-application-id': headerApplicationId,
                'x-country-code': 'US',
                'x-preferred-language': 'en'
            },
            success: function (response) {
                let auditInfo = response.response;
                let resLength = auditInfo.length;
                if (dataTableSet === true) {
                    $("#audit-informations-datatable")?.dataTable()?.fnClearTable();
                    $("#audit-informations-datatable")?.dataTable()?.fnDestroy();
                }
                for (let i in auditInfo) {
                    let table = $('#audit-informations-datatable').find("tbody");
                    $(table).append(
                        `<tr data-action='${auditInfo[i].action}' data-audit-details='${auditInfo[i].auditDetails}'> <td>${parseInt(i)+1}</td> <td>${auditInfo[i].action}</td> <td class="date">${auditInfo[i].date.split(' ')[0]}</td> <td>${auditInfo[i].message}</td><td class="email">${auditInfo[i].adminEmail} </td><td class="audit-details"> <a href="javascript:;" data-toggle="modal" data-target="#audit-modal" class="show-audit-details">Show Audit Details</a> </td></tr>`
                    );
                }
              
                setTimeout(function () {
                
                    $("#audit-informations-datatable").DataTable({
                        "pageLength": 100,
                        "ordering": false,
                        columnDefs: [
                            {
                                orderable: false,
                                className: "select-checkbox",
                                targets: 0,
                            },
                        ],
                        order: [[1, "asc"]],
                        dom: 'Bfrtip'
                    });
                    $('.buttons-excel')?.addClass('btn');
                    $('.buttons-excel')?.closest('.dt-buttons')?.addClass('a-button-bg--colorPalette_PrimaryBlue a-button-bghover--colorPalette_Black a-button-text--colorPalette_Black a-button-texthover--colorPalette_PrimaryBlue button link a-button a-button--primary a-button--md');
                    let modalClone = $('.modal.generic-modal:first').clone();
                    $('.a-spinner:first').after(modalClone);
                    $('.a-spinner:first + .generic-modal').attr('id','audit-modal').addClass('modal-popup--fixedwidth'); 
                    $('#audit-modal').find('.modal-body').empty();
                    $('#audit-modal').find('.modal-body').append('<table style="border:1px solid #000;"><thead><tr><th>#</th><th>Colum Name</th><th>Old Value</th><th>New Value</th></tr></thead><tbody></tbody></table>');


                }, 1000);

                setTimeout(function(){
                    callAuditInformationsDatatable(offset, resLength);
                    dataTableSet = true;
                    $('body').delegate('.show-audit-details', 'click', function(){
                        let dataAction = $(this).closest('tr').attr('data-action');
                        let changeDataJSON = $.parseJSON($(this).closest('tr').attr('data-audit-details')); 
                        let tableAdditionalInfo = changeDataJSON?.profileInfo?.userInfo?.additionalProperties;
                        let tableUserInfo = changeDataJSON?.profileInfo?.userInfo;
                        let tbody = $('#audit-modal').find("tbody");
                        callChangedDataInfo(dataAction, tbody, changeDataJSON, tableAdditionalInfo, tableUserInfo);
                    });
                    setTimeout(() => {
                        $('.custom-spinner').addClass('d-none');
                    }, 10);
                },1100)

            },
            error: function (error) {
                window.location.href = loginLink;
            }
        }); 
    }
}
function callAuditInformationsDatatable(offset, resLength) {
    $('#audit-informations-datatable_paginate .paginate_button.current').hide();
    if (parseInt(offset) == 0) {
        $('#audit-informations-datatable_paginate .next').removeClass('disabled');
    }
    if (parseInt(offset) >= 100) {
        $('#audit-informations-datatable_paginate .previous').removeClass('disabled');
        $('#audit-informations-datatable_paginate .next').removeClass('disabled');
    }
    if (resLength < 100 && offset !== 0) {
        $('#audit-informations-datatable_paginate .previous').hide();
        $('#audit-informations-datatable_paginate .next').hide();
    }
    $("#audit-informations-datatable").show();
}

function callChangedDataInfo(dataAction, tbody, changeDataJSON, tableAdditionalInfo, tableUserInfo) {
    if (dataAction == 'USER_REGISTER') {
        let indexTable = 0;
        $(tbody).empty();
        if (changeDataJSON.changes?.length > 0) {
            let changedDataInfo = changeDataJSON?.changes;
            for (let i in changedDataInfo) {
                indexTable++;
                if (changedDataInfo[i].columnName != 'phoneExtension' && changedDataInfo[i].columnName != 'address2' && changedDataInfo[i].columnName != 'fax' && changedDataInfo[i].columnName != 'password') {
                    $(tbody).append(
                        `<tr> <td>${indexTable}</td><td>${changedDataInfo[i].columnName}</td><td>${changedDataInfo[i].oldValue}</td><td>${changedDataInfo[i].newValue}</td></tr>`
                    );
                }
            }
        } else {
            indexTable = callTableAdditionalInfo(tableAdditionalInfo, indexTable, tbody);
            for (let i in tableUserInfo) {
                indexTable = callAdditionalProperties(i, indexTable, tbody, tableUserInfo);
            }
        }
    }
    callChangeStatusUpdate(dataAction, tbody, changeDataJSON);
}

function callChangeStatusUpdate(dataAction, tbody, changeDataJSON) {
    if (dataAction == 'STATUS_UPDATE') {
        $(tbody).empty();
        if (changeDataJSON.changes?.length > 0) {
            $(tbody).append(
                `<tr> <td>1</td><td>Status</td><td>${changeDataJSON.changes[0].oldValue}</td><td>${changeDataJSON.changes[0].newValue}</td></tr>`
            );
        } else {
            $(tbody).append(
                `<tr> <td>1</td><td>Status</td><td></td><td>${changeDataJSON.status}</td></tr>`
            );
        }

    }
}

function callAdditionalProperties(i, indexTable, tbody, tableUserInfo) {
    let columnName;
    if (i != 'additionalProperties' && i != 'password') {
        indexTable++;
        if (i == 'firstName') {
            columnName = 'First Name';
        }
        if (i == 'lastName') {
            columnName = 'Last Name';
        }
        if (i == 'email') {
            columnName = 'Email';
        }
        $(tbody).append(
            `<tr> <td>${indexTable}</td><td>${columnName}</td><td></td><td>${tableUserInfo[i]}</td></tr>`
        );
    }
    return indexTable;
}

function callTableAdditionalInfo(tableAdditionalInfo, indexTable, tbody) {
    for (let i in tableAdditionalInfo) {
        let columnName;
        indexTable++;
        columnName = callTableAdditionalInfoUser(i, columnName);
        columnName = callTableAdditionalInfoUserData(i, columnName);
        if (i != 'phoneExtension' && i != 'address2' && i != 'fax') {
            $(tbody).append(
                `<tr> <td>${indexTable}</td><td>${columnName}</td><td></td><td>${tableAdditionalInfo[i]}</td></tr>`
            );
        }
    }
    return indexTable;
}

function callTableAdditionalInfoUserData(i, columnName) {
    if (i == 'istatProduct') {
        columnName = 'iStat Product';
    }
    if (i == 'customerType') {
        columnName = 'Customer Type';
    }
    if (i == 'phoneNumber') {
        columnName = 'Phone Number';
    }
    if (i == 'customerType') {
        columnName = 'Segmentation';
    }
    if (i == 'customerCategory') {
        columnName = 'Sub Segmentation';
    }
    if (i == 'customerRole') {
        columnName = 'Tertiary Segmentation';
    }
    if (i == 'department') {
        columnName = 'Department';
    }
    if (i == 'employer') {
        columnName = 'Employer';
    }
    if (i == 'status') {
        columnName = 'Status';
    }
    return columnName;
}

function callTableAdditionalInfoUser(i, columnName) {
    if (i == 'country') {
        columnName = 'Country';
    }
    if (i == 'state') {
        columnName = 'State';
    }
    if (i == 'street') {
        columnName = 'Street';
    }
    if (i == 'zipCode') {
        columnName = 'Pin Code';
    }
    if (i == 'address') {
        columnName = 'Address';
    }
    if (i == 'city') {
        columnName = 'City';
    }
    if (i == 'contactOpt') {
        columnName = 'Contact opt';
    }
    if (i == 'serialNumber') {
        columnName = 'Serial Number';
    }
    if (i == 'topics') {
        columnName = 'Topics';
    }
    if (i == 'jobTitle') {
        columnName = 'Job Tile';
    }
    if (i == 'language') {
        columnName = 'Language';
    }
    return columnName;
}

function UpdateDeleteUser(email) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let payloadData = {
        "emails": [
            email
        ],
        "action": "DELETED",
        "requestType": "delete_user"
    }
    let tokenID = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/profile/admin/update-user',
        method: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(payloadData),
        "headers": {
            'x-id-token': tokenID,
            'x-application-id': headerApplicationId,
            'x-country-code': 'US',
            'x-preferred-language': 'en'
        },
        success: function (data) {
            alert('User has been successfully deleted')
            $('.custom-spinner').addClass('d-none');
            window.location.href = searchUsersLink;
            },
            error: function (error) {
                setTimeout(() => {
                    $('.custom-spinner').addClass('d-none');
            }, 10);
                
        }
    });
}

