/**
 * @module
 * @desc Manage Group details
 */

 (function(ABT){

    document.addEventListener('DOMContentLoaded', function() {    
        if(document.getElementById('edit-groupdetail') != null || document.getElementById('manage-user-groups') != null){
            
            // check for edit group detail page to run specific functionalities
            var isEditpage =  document.getElementById('edit-groupdetail') != null,
            specificProds = [],
            prodUl = document.createElement('ul');
            prodUl.setAttribute("id", "prod-list");
            
            if(isEditpage){
                let groupRowData = getItemParsedSessionStorage('rowData');
                groupRowData && setItemSessionStorage('groupRowData', JSON.stringify(groupRowData));
                groupRowData?.groupName && (document.getElementById('group-name').value = groupRowData.groupName);
                groupRowData?.groupUid && (document.getElementById('group-id').value = groupRowData.groupUid);
                groupRowData?.usersCount && (document.getElementById('group-users').value = groupRowData.usersCount);
                let groupStatus = groupRowData?.groupStatus;
                let documentTypeString = groupRowData?.documentType;
                if (groupStatus) {
                    let groupExpDate = new Date(groupStatus);
                    if (groupExpDate == "Invalid Date") {
                        document.getElementsByName('group-status')[0].value = groupStatus;
                        document.getElementsByName('group-exp-date')[0].closest('.fields').classList.add('d-none');
                    } else {
                        document.getElementsByName('group-exp-date')[0].value = groupRowData.groupStatus;
                    }
                }
                if (documentTypeString && documentTypeString.length) {
                    let documentPerms = documentTypeString.split(',');
                    documentPerms.forEach(function(doc) {
                        $('#edit-groupdetail')
                            .parents('.container')
                            .find(`.options .a-checkbox input[name="group-docPerm"][value="${doc}"]`)
                            .removeAttr('disabled')
                            .click()
                            .attr('disabled', 'disabled')
                            .parents('.a-checkbox--disabled')
                            .removeClass('a-checkbox--disabled')
                            .addClass('a-checkbox--checked-disabled');
                    });
                }
                var groupID = groupRowData?.groupId;

                // set additional parameter value
                document.getElementById('additional-body-param').value = groupRowData.groupId;

                isModalAvailable(function () {
                    $('.modal#delete-user-from-group-modal').on('click', function() {
                        setTimeout(function () {
                            if ($(this).hasClass('show') == false && 'groupRowData' in sessionStorage) {
                                setItemSessionStorage('rowData', sessionStorage.getItem('groupRowData'));
                            }
                        }, 150);
                    });

                    $('.modal#delete-user-from-group-modal .generic-modal--close').on('click', function() {
                        if ('groupRowData' in sessionStorage) {
                            setItemSessionStorage('rowData', sessionStorage.getItem('groupRowData'));
                        }
                    });
                });
            }
            
            /**
             * @method
             * @desc Get active product list using Ajax and store in sessionStorage
             */
             
            function insertAfter(referenceNode, newNode) {
                 referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
            }

            function getprodList(){
                ABT.Http({
                    url: ABT.Config.endpoints.GET_ACTIVE_PROD_LIST,
                    method: 'GET',
                    params: {
                        action: 'listAllProducts'
                    }
                })
                .then(function(resp){
                    sessionStorage.setItem('groupList', JSON.stringify(resp));
                })
                .then(() =>{
                    if(isEditpage){
                    
                        // fetch products for the specific group
                        ABT.Http({
                            url: ABT.Config.endpoints.USER_GROUPS,
                            method: 'POST',
                            params:{
                                'action': 'loadProductsFromGroup',
                                'groupId': groupID
                            }
                        })
                        .then(function(resp) {
                            resp.response.forEach(function callback(k, v) {
                                specificProds.push(parseInt(resp.response[v].productId));    
                            })
                            if(specificProds.length <= 5){
                                document.getElementById('view-more').style.display = 'none';
                            }
                        })
                        .then(()=>{
                            productList()
                            createmodalList();
                        })
                    }
                    else{
                        createmodalList();
                    }
                })
                .catch(() => console.log('file not found'));
            }
            
            /**
             * @method
             * @desc To add first 5 items in product access section
             */

            function productList(){
                var productAccess = document.getElementById("product-access");
                insertAfter(productAccess, prodUl);
                CreateProdList();
            }

            /**
             * @method
             * @desc create active product list of 5 items
             */

            var prodIndex = 0;
            var productNameList = [];
            function CreateProdList(){
                var finalIndex = 4;
                if(prodIndex > 0){
                    finalIndex = specificProds.length;
                }
                for(var j=0; j<=specificProds.length; j++){
                    getList.response.forEach(function callback(k, v) {
                        if(getList.response[v].productId == specificProds[j]){
                           productNameList.push(getList.response[v].productName);
                            productNameList.sort(function (a, b) {
                                   return a.toLowerCase().localeCompare(b.toLowerCase());
                               });
                        }
                    });
               }
               for(var i=(0+prodIndex);i<=finalIndex;i++){
                   var prodList = productNameList[i];
                   getList.response.forEach(function callback(k, v) {
                       if(getList.response[v].productId == specificProds[i]){
                           var nextList = document.createElement('li');
                           nextList.textContent = prodList;
                           prodUl.appendChild(nextList);
                       }
                   });
               }
                prodIndex=prodIndex+5;
            }

            /**
             * @method
             * @desc create checkbox list for products
             */

            function createmodalList(){
                // Append product checkbox lists in edit/create group details popup starts here
                var modalProducts = document.createElement('div');
                modalProducts.setAttribute("id", "modal-productlist");
                var modalLabel = document.querySelectorAll('#active-products-dropdown-options label[for=active-products-dropdown]')[0];
                let checkboxGroupEle = $('#active-products-dropdown-options.checkbox');

                // Create active products checkbox list for modal
                var pullbackProds = JSON.parse(sessionStorage.getItem('groupList'));
                pullbackProds.response.forEach(function callback(k, v) {
                    var isChecked = '';
                    if(specificProds.includes(parseInt(pullbackProds.response[v].productId))){
                        isChecked = 'checked';
                    }
                    
                    modalProducts.innerHTML+= 
                    '<div class="a-checkbox a-checkbox--vertical a-checkbox--default">'+
                        '<label class="a-checkbox__label" for="options_'+pullbackProds.response[v].productId+'">'+
                        '<span class="a-checkbox__text">'+pullbackProds.response[v].productName+'</span>'+
                        '<input type="checkbox" class="a-checkbox__input" data-required="true" value="' + pullbackProds.response[v].productId + '" name="productIds" id="options_'+pullbackProds.response[v].productId+'" '+isChecked+'/>'+
                    '<span class="a-checkbox__custom" aria-labelledby=" ' + pullbackProds.response[v].productId + ' "tabindex="0" role="checkbox"></span></label></div>';
                })

                insertAfter(modalLabel, modalProducts);
                checkboxFormValidation(checkboxGroupEle, false);
                checkboxGroupEle.on('click', '.a-checkbox__input', () => checkboxFormValidation(checkboxGroupEle, true));
            }

            getprodList();
            
            // View more click event to add next 5 active product items
            if(isEditpage){    
                var getList = JSON.parse(sessionStorage.getItem('groupList'));
                document.getElementById('view-more').addEventListener('click', function(e){
                    if(document.getElementById('prod-list') != null){
                        for(var i=5;i<=specificProds.length;i++){
                            var list = productNameList[i];
                            getList.response.forEach(function callback(k, v) {
                                if(getList.response[v].productId == specificProds[i]){
                                    var nextList = document.createElement('li');
                                    nextList.textContent = list;
                                    prodUl.appendChild(nextList);
                                }
                            });
                        }
                        document.getElementById('view-more').style.display = 'none';
                    }
                });
            }
        }

        /**
         * @function
         * Summary: Function to apply checkbox validation for a checkbox group
         * Parameters: checboxEle -> JQuery<HTMLElement> of checkbox group component
         *             isClickEvent -> Boolean -> identify if it is clickevent or not
         */
        function checkboxFormValidation(checkboxEle, isClickEvent) {
            let checked = false,
                formContainerElem = checkboxEle.parents('.o-form-container__element');
            setTimeout(function () {
                checkboxEle.find('.a-checkbox__input').each(function () {
                    $(this).removeAttr('data-required');
                    if ($(this).is(':checked')) {
                        checked = true;
                        if (isClickEvent && checked) return false;
                    }
                });
                if (!checked) {
                    checkboxEle.addClass('validation-require');
                    disableFormSubmitButton(formContainerElem, true);
                    if (checkboxEle.attr('id') == 'active-products-dropdown-options') {
                        formContainerElem.find('input[name="searchProduct"]')?.parents('.a-form-grp')?.addClass('validation-require');
                    }
                } else {
                    checkboxEle.removeClass('validation-require');
                    if (checkboxEle.attr('id') == 'active-products-dropdown-options') {
                        formContainerElem.find('input[name="searchProduct"]')?.parents('.a-form-grp')?.removeClass('validation-require');
                    }
                    shouldEnableSubmitButton(formContainerElem);
                }
            }, 100);
        }

        /**
         * @function
         * Summary: Function to decide whether the form submit buton should be enabled on not based on form inputs validation and emptines of required fields
         * Parameters: formcontainerEl -> JQuery<HTMLElement>
         */
        function shouldEnableSubmitButton(formContainerEl) {
            let enable = true;
            setTimeout(function () {
                if (formContainerEl.find('.validation-error,.validation-require,.validation-regex').length) {
                    disableFormSubmitButton(formContainerEl, true);
                    enable = false;
                    return false;
                }

                formContainerEl.find('[data-required="true"]')?.each(function() {
                    if ($(this).find('input').val()?.length == 0) {
                        disableFormSubmitButton(formContainerEl, true);
                        enable = false;
                        return false;
                    }
                });

                enable && disableFormSubmitButton(formContainerEl, false);
            }, 100);
        }

        /**
         * @function
         * Summary: Function to enable or disable form submit button based on payload
         * Parameters: formcontainerEle -> JQuery<HTMLElement>
         *             isDisable -> true/false
         */
        function disableFormSubmitButton(formcontainerEle, isDisable) {
            if (isDisable) {
                formcontainerEle.find('.o-form-container__buttons button[type="submit"]').attr('disabled', 'disabled');
            } else {
                formcontainerEle.find('.o-form-container__buttons button[type="submit"]').removeAttr('disabled');
            }
        }

        isModalAvailable(function() {
            /* Post modal availability, apply search fiter logic for products checkbox list to "Create Group" and "Edit Group" modal */
            if ($(document).find('#add-group-modal').length || $(document).find('#edit-groupbutton-modal').length) {
                /* Apply search filter functionality for product checkboxes */
                let groupForm = $(`${$(document).find('#add-group-modal').length ? '#add-group-modal' : '#edit-groupbutton-modal'}.modal.generic-modal .form-container`);
                let groupName = groupForm.find('input[name="groupName"]');
                let searchInputEle = groupForm.find('.fields input[name="searchProduct"]');
                let optionsEle = groupForm.find('.options #active-products-dropdown-options');
                window.ABT.Utils.searchFilterToCheckbox(searchInputEle, optionsEle);
                /* expiry date to be shown based on checkbox selection */
                let expCheckbox = groupForm.find('.options input[name="expDateRequire"]');
                let expDateEle = groupForm.find('.datepicker:has(input[name="expDate"])');
                let expDateField = expDateEle.find('input[name="expDate"]');
                let expDateVal = '';
                let editGroupDocPerm = groupForm.find('input[name="docPerm"]');

                groupName.on('change keyup focusout', () => shouldEnableSubmitButton(groupForm.parents('.o-form-container__element')));

                expCheckbox.on('click', function() {
                    if (expCheckbox.is(':checked')) {
                        expDateEle.removeClass('d-none');
                        expDateField.val(expDateVal);
                        expDateEle.find('.a-input-field').attr('data-required', 'true').find('.form-group').removeClass('validation-error-msg validation-require validation-error validation-regex');
                    } else {
                        expDateEle.addClass('d-none');
                        expDateVal = expDateField.val();
                        expDateField.val('');
                        expDateEle.find('.a-input-field').removeAttr('data-required').find('.form-group').removeClass('validation-error-msg validation-require validation-error validation-regex');
                        shouldEnableSubmitButton(groupForm.parents('.o-form-container__element'));
                    }
                });

                /* Document permission checkbox Group - applying validation */
                if (editGroupDocPerm.length) {
                    let isRequired = editGroupDocPerm.attr('data-required') == 'true' ? true : false;
                    if (isRequired) {
                        let docPermOptionsEle = editGroupDocPerm.parents('.checkbox');
                        checkboxFormValidation(docPermOptionsEle, false);
                        docPermOptionsEle.on('click focusout', '.a-checkbox__input', e => {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            checkboxFormValidation(docPermOptionsEle, true);
                        });
                    }
                }
            }

            /* Prefil data from session storage in "Edit Group" modal */
            if ($(document).find('#edit-groupbutton-modal').length) {
                let groupDetails = getItemParsedSessionStorage('groupRowData');
                let editGroupForm = $('#edit-groupbutton-modal .form-container');
                let editGroupButton = $(document).find('#edit-groupbutton');

                if (groupDetails) {
                    /* Group Name prefilling */
                    let editGroupName = editGroupForm.find('input[name="groupName"]');
                    if (editGroupName.length && groupDetails.groupName) {
                        editGroupName.val(groupDetails.groupName);
                    }

                    /* Group ID prefilling */
                    let editGroupID = editGroupForm.find('input[name="groupId"]');
                    if (editGroupID.length && groupDetails.groupId) {
                        editGroupID.val(groupDetails.groupId);
                    }

                    /* Group Status */
                    let editGroupStatus = editGroupForm.find('.title #group-status');
                    if (editGroupStatus.length) {
                        if (groupDetails.groupStatus) {
                            if (isFinite(new Date(groupDetails.groupStatus).getTime())) {
                                editGroupStatus.append(`<span data-status="active">ACTIVE</span>`)
                            } else {
                                editGroupStatus.append(`<span data-status="${groupDetails.groupStatus.toLowerCase()}">${groupDetails.groupStatus}</span>`)
                            }
                        } else {
                            editGroupStatus.parents('.title').hide();
                        }
                    }

                    /* Expiry date prefilling/Expiry date required checkbox check/uncheck */
                    let editGroupExpDate = editGroupForm.find('input[name="expDate"]');
                    if (editGroupExpDate.length) {
                        if (groupDetails.groupStatus) {
                            let groupStatusDate = new Date(groupDetails.groupStatus);
                            if (!isFinite(groupStatusDate.getTime())) {
                                editGroupForm.find('input[name="expDateRequire"]').click();
                            } else {
                                editGroupForm.find('input[name="expDate"]').val(groupDetails.groupStatus).parents('.input-group').addClass('selected');
                                if (editGroupButton.length) {
                                    editGroupButton.on('click', function() {
                                        setTimeout(function() {
                                            if ($('#edit-groupbutton-modal').hasClass('show')) {
                                                editGroupForm.find('input[name="expDate"]').focus().blur(); // To apply expDate value in date litpicker modal as well
                                            }
                                        }, 200);
                                    });
                                }
                            }
                        } else {
                            editGroupForm.find('input[name="expDateRequire"]').click();
                        }
                    }

                    /* Document type checkboxes prefilling */
                    let editGroupDocPerm = editGroupForm.find('input[name="docPerm"]');
                    if (editGroupDocPerm.length) {
                        if (groupDetails.documentType && groupDetails.documentType.length) {
                            groupDetails.documentType.split(',').forEach(function(doc) {
                                editGroupDocPerm
                                    .parents('.options')
                                    .find(`.a-checkbox input[name="docPerm"][value="${doc}"]`)
                                    .click()
                                    .parents('.a-checkbox')
                                    .addClass('a-checkbox--selected');
                            });
                        } else {
                            editGroupDocPerm.parents('.checkbox').addClass('validation-require');
                        }
                    }
                } else {
                    editGroupForm.find('input[name="docPerm"]').parents('.checkbox').addClass('validation-require');
                }

                editGroupButton?.on('click', () => {
                    setTimeout(() => {
                        if ($('#edit-groupbutton-modal').hasClass('show')) {
                            if (editGroupForm.find('.validation-error-msg, .validation-require, .validation-error, .validation-regex').length)
                                editGroupForm.parents('.o-form-container__element').find('.o-form-container__buttons button[type="submit"]').attr('disabled', 'disabled');
                        }
                    }, 200);
                });
            }
        });
		
	   /********************* Delete group functionality starts here ***********************/

		var deletebtnClicked = false;
		$(document).on('click', '#delete-group', function() {
            disableBtn();
			ABT.Http({
					url: ABT.Config.endpoints.USER_GROUPS,
					method: 'POST',
					params: {
						action: 'deleteGroup',
						groupId: groupID
					}
				})
				.then(function(res) {
					deletebtnClicked = true;
                    document.querySelector('#delete-group').disabled = true;
					showStatus(res,'delete-group-modal');
                    hideAllsiblings('delete-group-modal');
					if ("newGroupName" in sessionStorage) {
						sessionStorage.removeItem("newGroupName");
					}

					
				})
				.catch(() => console.log('Exception in Deleting group'));
		})

        /********************* Add new user to group functionality starts here ***********************/

        // Fetch user lists to add group
        var getUsers = true;
        $(document).on('click','#add-user-to-group', function(){
            var emailList = '';

            /* Clear the previous value as the popup opens/reopens */
            $('#add-user-to-group-modal .form-container input:not([type="hidden"])').each(function () {
                $(this).val('');
                $(this).parents('.form-group.a-form-grp').removeClass('validation-require validation-error');
            });
            $('#add-user-to-group-modal .o-form-container__element .o-form-container__buttons .button .btn[type="submit"]').attr('disabled', true);

            let groupData = getItemParsedSessionStorage('groupRowData');
            document.getElementById('groups-to-add').value = groupData.groupName;
            if(getUsers){
                document.querySelector('#add-to-group-emails-autocomplete').value = '';
                let inputHelpTextEle = $('#add-user-to-group-modal .form-container .input-group:has(#add-to-group-emails-autocomplete) ~ .a-input-field--text-help');
                if (!inputHelpTextEle.attr('data-author')) {
                    inputHelpTextEle.attr('data-author', inputHelpTextEle.text());
                }
                inputHelpTextEle.text('Loading Email list, please wait...');

                /* Code to throw error even if
                    1. Proper email format email is enetered even before suggestions are shown (Suggestion API is in progress)
                    2. Proper email format email is enetered that is not selected from the suggestion Email list
                 */
                $('#add-to-group-emails-autocomplete').on('keyup', function() {
                    let suggestionsEle = $('#add-to-group-emails-autocomplete ~ .autocomplete--dropdown-menu');
                    if (suggestionsEle.length == 0 || suggestionsEle.find('.selectedColor').length == 0) {
                        setTimeout(() => {
                            $(this).parents('.form-group.a-form-grp').addClass('validation-error');
                            $(this).parents('.o-form-container__element').find('.o-form-container__buttons .button .btn[type="submit"]').attr('disabled', true);
                        }, 200);
                    }
                });

                ABT.Http({
                    url: ABT.Config.endpoints.EXPORT_USER_REPORT,
                    method: 'POST',
                    params: {
                        action: 'listUserPermission',
                    }
                })
                .then(function(res) {
                    if(res.status){
                        getUsers = false;
                    }
                    inputHelpTextEle.text(inputHelpTextEle.attr('data-author'));
                    res.response.forEach(function callback(k, v) {
                        emailList = emailList + '<li value="'+res.response[v].aid+'" data-fname="'+res.response[v].firstName+'" data-lname="'+res.response[v].lastName+'">'+
                        '<span> <strong>'+res.response[v].email+'</strong></span></li>';
                    })
                    $('<ul class="autocomplete--dropdown-menu a-dropdown"></ul>').insertAfter($('#add-to-group-emails-autocomplete'));
                    let emaillistUl = document.querySelector('#add-to-group-emails-autocomplete').nextElementSibling;
                    emaillistUl.innerHTML = emailList;
                    sortuserList(emaillistUl);
                    autoCompleteSearch(true);
                    setValues();
                    $('#add-user-to-group-modal .form-container .hidden input[name="group-to-add"]').attr('value', groupID);
                })
                .catch(() => inputHelpTextEle.text('Service down, please try again later...'));
            }
        })

        // Set values of specific users
        var groupaid = '';
        function setValues(){
            document.querySelectorAll('#add-to-group-emails-autocomplete ~ ul li').forEach(item => {
                item.addEventListener('mousedown', function() {
                    $(this).addClass('selectedColor');
                    $('#add-to-group-emails-autocomplete ~ .autocomplete--dropdown-menu').removeClass('active');
                    $('#add-to-group-emails-autocomplete').val($(this).text());
                    document.getElementById('firstName').value = item.getAttribute('data-fname');
                    document.getElementById('lastName').value = item.getAttribute('data-lname');
                    groupaid = item.getAttribute('value');
                    $('#add-user-to-group-modal .form-container .hidden input[name="AID"]').attr('value', groupaid);
                    setTimeout(() => {
                        $(this).parents('.form-group.a-form-grp').removeClass('validation-require validation-error');
                        $(this).parents('.o-form-container__element').find('.o-form-container__buttons .button .btn[type="submit"]').removeAttr('disabled');
                    }, 200);
                })
            })
        }

        /**
        * @function
        * Summary: Function to populate autocomplete email ID results
        * Parameters: enable - {boolean} - To enable or disable the auto complete functionality
        */
        function autoCompleteSearch(enable) {
            if (enable) {

                let emailInputField = $('#add-to-group-emails-autocomplete');
                emailInputField.on('keyup focusin', function () {
                    let searchText = $(this).val().trim().toLowerCase();
                    let autoSearchUL = $(this).next();
                    if ($(this).parent().find('.selectedColor').length)
                        $(this).parent().find('.selectedColor').removeClass('selectedColor');
                    autoSearchUL.addClass('active');
                    groupaid = '';
                    $('#add-user-to-group-modal .form-container .hidden input[name="AID"]').attr('value', groupaid);
                    autoSearchUL.find('li').filter(function () {
                        $(this).toggle($(this).text().trim().toLowerCase().indexOf(searchText) > -1);
                    });
                });

                emailInputField.parent().on('focusout', function () {
                    $(this).find('.active').removeClass('active');
                    let emailSelected = $(this).find('.selectedColor');
                    let emailFieldEnteredValue = $(this).children('#add-to-group-emails-autocomplete').val().trim().toLowerCase();
                    if (emailSelected && emailSelected.length == 0 && emailFieldEnteredValue.length) {
                        setTimeout(() => {
                            $(this).parents('.form-group.a-form-grp').addClass('validation-error');
                            emailInputField.parents('.o-form-container__element').find('.o-form-container__buttons .button .btn[type="submit"]').attr('disabled', true);
                        }, 200);
                    }
                });

                // If Mail ID field is clicked/in focus before API response, suggestions would be visible once events are binded
                emailInputField.is(':focus') && emailInputField.trigger('focusin');
            }
        }
		
		//logic to re-direct on close delete popup
		 $(document).on('click','#delete-group-button-modal .generic-modal--close',function(){
            if (deletebtnClicked) {
                setTimeout(function () {
                    let successPath = document.querySelector('input[name="delete-group-success-redirect-path"]').value;
                    window.location.href=successPath;
                }, 500);
            } 
        })

        /********************* Remove user from group functionality starts here ***********************/

        var removeuserClicked = false;
        $(document).on('click','#remove-user-from-group', function(){
            disableBtn('delete-group');
            var getuserInfo = JSON.parse(sessionStorage.getItem('rowData'));
            ABT.Http({
                url: ABT.Config.endpoints.USER_GROUPS,
                method: 'POST',
                params: {
                    action: 'deleteUser',
                    "AID":getuserInfo.aid,
                    "group-to-delete":groupID
                }
            })
            .then(function(res) {
                removeuserClicked = true;
                showStatus(res,'delete-user-from-group-modal');
                hideAllsiblings('delete-user-from-group-modal');
                let groupData = getItemParsedSessionStorage('groupRowData');
                if (groupData && groupData.usersCount) {
                    groupData.usersCount = (+groupData.usersCount - 1).toString();
                    setItemSessionStorage('rowData', JSON.stringify(groupData));
                    sessionStorage.removeItem('groupRowData');
                }
            })
            .catch(function(err) {
                showStatus(err, 'delete-user-from-group-modal');
                hideAllsiblings('delete-user-from-group-modal');
                setItemSessionStorage('rowData', sessionStorage.getItem('groupRowData'));
                sessionStorage.removeItem('groupRowData');
            });
        })

        // close remove user popup
        $(document).on('click','#delete-user-from-group-modal .generic-modal--close',function(){
            if (removeuserClicked) {
                loadPage();
            }
        })

        function loadPage() {
            setTimeout(function () {
                window.location.reload();
            }, 500);
        }

        // Common function to sort li's alphabatically into ul

        function sortuserList(element){
            Array.from(element.getElementsByTagName("LI"))
            .sort((a, b) => a.textContent.localeCompare(b.textContent))
            .forEach(li => element.appendChild(li));
        }

    })
 })(window.ABT || (window.ABT = {}));
