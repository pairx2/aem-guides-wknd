/**
 * @module
 * @desc User permission list 
 */

(function (ABT) {

    document.addEventListener('DOMContentLoaded', function () {

        let userData;
        let checkBoxVal = [];
        const $downloadBtn = document.querySelector('#user-permission-report');
        let checkExtendUserClicked = false;
        let checkAddUserClicked = false;
        let checkremoveUserClicked = false;

        $(document).ready(function () {
            if (document.getElementById('activeEditUserGroupDropdown-options')) {
                userGroupDetails('activeEditUserGroupDropdown', 'groups-to-add');
            }
            if (document.getElementById('activeAddUserGroupDropdown-options')) {
                userGroupDetails('activeAddUserGroupDropdown', 'groupId');
            }
            const ele = document.getElementById('download_url');
            const items = document.querySelectorAll("th");
            const lastchild = items[items.length - 1];
            if (ele) {
                document.querySelector("table").classList.add('reduce-gap');
                document.querySelector(".m-custom-table__header").classList.add('filter-bar');
                lastchild.innerText = 'Download';
            }
            //call for button enable/disable untill all fields are filled
            $("#create-new-user").prop("disabled", true);
            validate();
            setTimeout(function () {
                $('#add-new-user-popup-modal input').on('keyup', validate);
                $(document).on('change', "#add-new-user-popup-modal input[name='groupId']", validate);
                $(document).on('change', "#edit-user-popup-modal input[name='groups-to-add']", function(){
					editPopupCheckboxValidation()
                });
            }, 1000);
        });

        $(document).on('click', '.m-custom-table__table .a-link__text', function (event) {
            if ($('#edit-user-popup-modal').length) {
                setTimeout(function () {
                    if (document.querySelector('#edit-user-popup-modal .o-form-container__success-msg') && document.querySelector('#edit-user-popup-modal .o-form-container__error-msg')) {
                        document.querySelector('#edit-user-popup-modal .o-form-container__success-msg').innerText = "";
                        document.querySelector('#edit-user-popup-modal .o-form-container__error-msg').innerText = "";
                    }
                    checkBoxVal = [];
                    setFieldData();
                    const $closeBtn = document.querySelector('#edit-user-popup-modal .generic-modal--close');
                    const $cancelBtn = document.querySelector('#edit-user-popup-modal a[role="button"].btn');
                    $closeBtn?.addEventListener('click', reloadPageCon);
                    $cancelBtn?.addEventListener('click', reloadPageCon);
                    const element = document.getElementById('download_url');
                    const data = JSON.parse(sessionStorage.getItem('rowData'));
                    if (element && data && data.url) {
                        const url = data.url;
                        const urlSplit = url.split('/');
                        const productId = data.productId
                        const getLastItemName = urlSplit[urlSplit.length - 1];
                        const fileName = getLastItemName.replace(/\%20/g, " ")
                        const getFileName = fileName.split('.').slice(0, -1).join('.')
                        downloadDocument(getFileName, productId);
                    }
                    const notes = $('#edit-user-popup-modal .form-container .a-input-field .form-control[name="notes"]');
                    if (notes.length) {
                        notes.prop('maxlength', '200');
                    }
                    if ($('#edit-user-popup-modal')) {
                        editPopupCheckboxValidation();
                    }
                }, 1000);
            }
        });


        $(document).on('click', '#add-new-user-popup', function (e) {
            setTimeout(function () {
                checkBoxVal = [];
                const successMsgEl = document.querySelector('#add-new-user-popup-modal .o-form-container__success-msg');
                const errorMsgEl = document.querySelector('#add-new-user-popup-modal .o-form-container__error-msg');
                if (successMsgEl) {
                    successMsgEl.innerText = "";
                }
                if (errorMsgEl) {
                    errorMsgEl.innerText = "";
                }

                const $createNewUserBtn = document.querySelector('#create-new-user');
                $createNewUserBtn?.addEventListener('click', addNewUser);

                const $closeBtn = document.querySelector('#add-new-user-popup-modal .generic-modal--close');
                $closeBtn?.addEventListener('click', reloadPageCon);
                checkUserGroupItems(document.querySelectorAll('input[name="groupId"]'));

            }, 1000);
        });


        function reloadPageCon() {
            if (checkExtendUserClicked || checkAddUserClicked || checkremoveUserClicked) {
                loadCurrentPage();
            }
            else {
                sessionStorage.removeItem('rowData')
                checkBoxVal = [];
            }
        }

        function loadCurrentPage() {
            setTimeout(function () {
                window.location.reload();
            }, 500);
        }

        /**
         * @method
         * @desc Add new User
         */

        function addNewUser() {
            const $firstName = document.querySelector('input[name="first-name"]').value;
            const $lastName = document.querySelector('input[name="last-name"]').value;
            const $email = document.querySelector('input[name="loginID"]').value;
            addLoader('#add-new-user-popup-modal .button.link', '#create-new-user');
            ABT.Http({
                url: ABT.Config.endpoints.ADD_NEW_USER,
                method: 'POST',
                headers: ABT.Config.getRequestHeader(),
                params: {
                    "userInfo": {
                        "email": $email,
                        "groupId": checkBoxVal,
                        "userType": "Portal User"
                    },
                    "additionalProfileProperties": {
                        "firstName": $firstName,
                        "lastName": $lastName
                    }
                }
            })
                .then(function (res) {
                    checkAddUserClicked = true;
                    showStatus(res, 'add-new-user-popup-modal');
                    hideAllsiblings('add-new-user-popup-modal');
                    $("#create-new-user").prop("disabled", true);
                })
                .catch(() => console.log('error occured'));
        }


        /**
         * @method
         * @desc set the popup data
         */

        function setFieldData() {
            userData = JSON.parse(sessionStorage.getItem('rowData'));
            const $extendAccessBtn = document.querySelector('#extend-access');
            const $accessCodeField = document.querySelector('input[name="code"]');
            const $emailAddressField = document.querySelector('input[name="email"]');
            const $userStatus = document.querySelector('#user-status');
            const $editUser = document.querySelector('#edit-user');
            const $firstName = document.querySelector('input[name="firstName"]');
            const $lastName = document.querySelector('input[name="lastName"]');
            const $deleteUser = document.querySelector('#delete-user');
            const $note = document.querySelector('.a-input-field .form-control[name="notes"]');
            if ($accessCodeField) {
                $accessCodeField.value = "";
            }
            if ($emailAddressField) {
                $emailAddressField.value = "";
            }
            if ($editUser) {
                let editUserAuthoredData = $($editUser).attr('data-author');
                if (!editUserAuthoredData) {
                    $($editUser).attr('data-author', $($editUser).text().trim());
                    editUserAuthoredData = $($editUser).attr('data-author');
                }
                $editUser.querySelector('h3').innerText = editUserAuthoredData + " " + userData.firstName + " " + userData.lastName;
            }
            if ($firstName && userData && userData.firstName) {
                $firstName.value = userData.firstName;
                $($firstName).parents('.form-group.a-form-grp').removeClass('validation-error validation-require validation-regex');
            } else {
                $firstName.value = '';
                $($firstName).parents('.form-group.a-form-grp').addClass('validation-require');
            }
            if ($lastName && userData && userData.lastName) {
                $lastName.value = userData.lastName;
                $($lastName).parents('.form-group.a-form-grp').removeClass('validation-error validation-require validation-regex');
            } else {
                $lastName.value = '';
                $($lastName).parents('.form-group.a-form-grp').addClass('validation-require');
            }
            let $statusEl = $userStatus?.querySelector('span');
            if ($statusEl) {
                $statusEl.innerHTML = "";
            } else {
                $statusEl = document.createElement('span');

            }
            $statusEl.setAttribute('data-name', userData.status);

            if (userData.status == "Active") {
                $extendAccessBtn.style.display = "none";
                let textNode = document.createTextNode("ACTIVE");
                $statusEl.appendChild(textNode);
                $userStatus.appendChild($statusEl);
            } else if (userData.status == "Pending") {
                $extendAccessBtn.style.display = "none";
                let remainingHrs = 'PENDING <span>' + userData.hrsRemainingToExpr + " HOURS REMAINING" + '</span>';
                $statusEl.innerHTML = remainingHrs;
                $userStatus.appendChild($statusEl);
                if (userData.hrsRemainingToExpr <= 24) {
                    $extendAccessBtn.removeAttribute('style');
                }
            } else {
                if ($extendAccessBtn?.getAttribute("style")) {
                    $extendAccessBtn?.removeAttribute('style');
                }
                let textNode = document.createTextNode("EXPIRED");
                $statusEl.appendChild(textNode);
                $userStatus?.appendChild($statusEl);
            }
            if (userData.verificationList) {
                for (let el of userData.verificationList) {
                    if (el.type == "ACCESS_CODE") {
                        $accessCodeField.value = el.code;
                    }
                }
            }

            checkUserGroupItems(document.querySelectorAll('input[name="groups-to-add"]'));
            defaultCheckUserGroupItems(document.querySelectorAll('input[name="groups-to-add"]'));
            if ($emailAddressField) {
                $emailAddressField.value = userData.email;
            }
            if ($note && userData['internal']) {
                $note.value = userData.internal.notes[0].note;
            } else {
                if ($note) {
                    $note.value = "";
                }
            }
            const $aid = $('#edit-user-popup-modal .form-container input[name="aid"]');
            if ($aid) {
                $aid.attr('value', (userData && userData.aid) ? userData.aid : '');
            }
            $extendAccessBtn?.addEventListener('click', extendUserAccess);
            $deleteUser?.addEventListener('click', deleteuserPermission);
        }


        /**
         * @method
         * @desc extend user access
         */

        function extendUserAccess() {

            ABT.Http({
                url: ABT.Config.endpoints.UPDATE_USER,
                method: 'POST',
                headers: ABT.Config.getRequestHeader(),
                params: {
                    "userInfo": {
                        "userName": userData.email
                    }
                }
            })
                .then(function (res) {
                    checkExtendUserClicked = true;
                    document.querySelector('#edit-user-popup-modal .o-form-container__success-msg').innerText = "";
                    document.querySelector('#edit-user-popup-modal .o-form-container__error-msg').innerText = "";
                    let successText = '', errText = '';
                    if (res.errorCode == 0) {
                        document.querySelector('#extend-access').style.display = 'none';
                        successText = (res.status && res.response) ? res.response : document.querySelector('input[name="extend-access-success-message"]').value;
                        document.querySelector('#edit-user-popup-modal .o-form-container__success-msg').innerText = successText;
                    } else if (res.response && res.response.i18nMessageKey) {
                        errText = res.response.statusReason;
                        document.querySelector('#edit-user-popup-modal .o-form-container__error-msg').innerText = errText;
                    } else {
                        errText = document.querySelector('#edit-user-popup-modal input[name="failureMessage"]').value;
                        document.querySelector('#edit-user-popup-modal .o-form-container__error-msg').innerText = errText;
                    }

                })

                .catch(() => console.log('error occured in extending user access'));

        }

        /**
         * @method
         * @desc default check checkboxes
         */

        function checkUserGroupItems($elements) {
            let checkBoxes = $elements;

            checkBoxes.forEach(function (el, i) {
                el.checked = false;
                el.addEventListener('change', function () {
                    if (el.checked) {
                        if (!checkBoxVal.includes(el.value)) {
                            checkBoxVal.push(el.value);
                        }
                    } else {
                        let index = checkBoxVal.indexOf(el.value);
                        checkBoxVal.splice(index, 1);
                    }

                });
            });
        }


        function defaultCheckUserGroupItems($elements) {
            let checkBoxes = $elements;
            if (userData.userGroups && userData.userGroups.length > 0) {
                checkBoxes.forEach(function (el, i) {
                    for (let user of userData.userGroups) {
                        if (user.groupId == el.value) {
                            el.checked = true;
                            checkBoxVal.push(el.value);
                        }
                    }

                });
            }
        }

        /**
         * @method
         * @desc Download user permission data
         */

        function downloadTableData(action, fileName, endPoint) {
            ABT.Http({
                url: endPoint,
                method: 'POST',
                headers: ABT.Config.getRequestHeader(),
                params: {
                    "action": action
                }
            })
                .then(function (data) {

                    if (data.errorCode == 0 && data.status) {

                        downloadCSVfile(data.response.EncodedCSVData, fileName);

                    }
                })

                .catch(() => console.log('error occured in downloading user-permission-list.csv'));
        }


        function downloadCSVfile(data, fileNm) {
            var decodedString = atob(data);
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(decodedString);
            hiddenElement.target = '_blank';

            //provide the name for the CSV file to be downloaded
            hiddenElement.download = fileNm;
            hiddenElement.click();
        }

        /**
         * @method
         * @desc Delete user
        */

        function deleteuserPermission() {
            disableBtn('delete-user');
            var deleteuserData = JSON.parse(sessionStorage.getItem('rowData'));

            ABT.Http({
                url: ABT.Config.endpoints.USER_GROUPS,
                method: 'POST',
                headers: ABT.Config.getRequestHeader(),
                params: {
                    "action": "userPermission-Delete",
                    "AID": deleteuserData.aid,
                    "status": deleteuserData.status
                }
            })
                .then(function (res) {
                    checkremoveUserClicked = true;
                    showStatus(res, 'delete-user-permission-modal');
                    hideAllsiblings('delete-user-permission-modal');
                })

                .catch(() => console.log('error occured'));
        }

        // Download file

        function downloadDocument(id, productId) {
            getDocument(id, productId);
        }
        function getDocument(id, productId) {
            ABT.Http({
                url: ABT.Config.endpoints.DOWNLOAD_DOCUMENT,
                method: 'POST',
                headers: ABT.Config.getRequestHeader(),
                params: {
                    'action': 'downloadDocument',
                    'documentId': id,
                    'type': 'others',
                    'productId': productId
                }
            }).then(function (res) {
                const fileName = res.response?.attachmentName;
                const bytes = res.response?.attachmentBytes;
                saveDocument(bytes, fileName);
            });
        }
        function saveDocument(bytes, name) {
            const linkSource = `data:application/pdf;base64,${bytes}`;
            const element = document.createElement("a");
            const fileName = name;
            element.href = linkSource;
            element.download = fileName;
            element.click();
        }

        //Validation for form field
        function validate() {
            var inputsWithValues = 0;
            // get all input fields
            var myInputs = $("#add-new-user-popup-modal .input-group input");
            var checkbox = $('[name="groupId"]');
            myInputs.each(function (e) {
                // if it has a value, increment the counter
                if ($(this).val()) {
                    inputsWithValues += 1;
                }
            });
            if (checkbox.is(':checked') && (inputsWithValues == myInputs.length)) {
                $("#create-new-user").prop("disabled", false);
            } else {
                $("#create-new-user").prop("disabled", true);
            }
        }
        function editPopupCheckboxValidation(){
            if ($('input[name="groups-to-add"]').is(':checked')) {
                $('#apply-edit-user').prop("disabled", false);
            } else {
                $('#apply-edit-user').prop("disabled", true);
            }
        }
        function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
        function createmodalList(labelId, name) {
            // Append group checkbox lists in edit/create User details popup starts here
            var modalGroup = document.createElement('div');
            modalGroup.setAttribute("id", "modal-groupList");
            var modalLabel = document.querySelectorAll("#" + labelId + "-options label[for=" + labelId + "]")[0];

            // Create active groups checkbox list for modal
            var groupList = JSON.parse(sessionStorage.getItem('userGroupList'));
            groupList.response.forEach(function callback(k, v) {
                var isChecked = '';

                modalGroup.innerHTML +=
                    '<div class="a-checkbox a-checkbox--vertical a-checkbox--default">' +
                    '<label class="a-checkbox__label">' +
                    '<span class="a-checkbox__text" id="' + groupList.response[v].groupId + '">' + '<strong>' + groupList.response[v].groupName + '</strong></span>' +
                    '<input type="checkbox" class="a-checkbox__input" value="' + groupList.response[v].groupId + '" name="' + name + '" id="options_' + groupList.response[v].groupId + '" data-required="true" data-group="false" data-group-name="groupA" ' + isChecked + '/>' +
                    '<span class="a-checkbox__custom" aria-labelledby=" ' + groupList.response[v].groupId + ' "tabindex="0" role="checkbox"></span></label></div>';
            })
            insertAfter(modalLabel, modalGroup);
        }
        function userGroupDetails(id, name) {
            ABT.Http({
                url: ABT.Config.endpoints.USER_GROUPS,
                method: 'POST',
                params: {
                    action: 'getGroups',
                }
            })
                .then(function (resp) {
                    sessionStorage.setItem('userGroupList', JSON.stringify(resp));
                })
                .then(() => {
                    createmodalList(id, name);
                })
        }

        // close delete user modal
        $(document).on('click', '#delete-user-permission-modal .generic-modal--close', function () {
            reloadPageCon();
        })

        function init() {

            if ($downloadBtn) {
                $downloadBtn.addEventListener('click', function () {
                    downloadTableData("exportUserPermission", "user-permission-list.csv", ABT.Config.endpoints.EXPORT_USER_REPORT);
                });
            }

        }

        init();

    });

})(window.ABT || (window.ABT = {}));
