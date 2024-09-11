/**
 * @module
 * @desc User permission list 
 */

//Add Loader
function addLoader(btnClass, btnId) {
    if (btnId && btnClass) {
        $(btnClass).append("<span class='spinner-border custom-spinner'></span>");
        document.querySelector(btnId).classList.add("btn-disabled");
    }
}
// Remove Loader
function removeLoader(btnId) {
    const elem = $('.spinner-border.custom-spinner');
    const className = document.querySelector(btnId).classList;
    elem.remove();
    className.remove("btn-disabled");
}

//Success or Failure status
function showStatus(res, elem) {
    document.querySelector('#' + elem + ' .o-form-container__success-msg').innerText = "";
    document.querySelector('#' + elem + ' .o-form-container__error-msg').innerText = "";
    let text = '';
    if (res.errorCode == 0) {
        text = document.querySelector('#' + elem + ' input[name="successMessage"]').value;
        document.querySelector('#' + elem + ' .o-form-container__success-msg').innerText = text;
    } else if (res.response && res.response.i18nMessageKey) {
        text = res.response.statusReason;
        document.querySelector('#' + elem + ' .o-form-container__error-msg').innerText = text;
    } else {
        text = document.querySelector('#' + elem + ' input[name="failureMessage"]').value;
        document.querySelector('#' + elem + ' .o-form-container__error-msg').innerText = text;
    }
}
//Added functionality for disable btn and hide all the content accept error and success msg
function hideAllsiblings(id) {
    if (document.querySelector('#' + id + ' .o-form-container__success-msg').innerText != "") {
        $(".o-form-container__success-msg").siblings().hide();
        $('.o-form-container__success-msg').css({ "display": "block", "text-align": "center" });
    }
    if (document.querySelector('#' + id + ' .o-form-container__error-msg').innerText != "") {
        $(".o-form-container__error-msg").siblings().hide();
        $('.o-form-container__error-msg').css({ "display": "block", "text-align": "center" });
    }
    if ($("o-form-container__buttons")) {
        $('.o-form-container__buttons').css("cssText", "display:none !important");
    }
    $('#' + id).find('.formcontainer').siblings().hide();
}

function disableBtn(id) {
    if(id){
		document.querySelector('button[id="'+ id +'"]').disabled = true;
    }
    $(".o-form-container__buttons a.btn").addClass("disabled");
}

/**
 * @function
 * @desc Function to check if Modal structure is created on DOM or not, upon cration, passed argument function will be executed
 * @param {Function} funToRun Function that needs to be executed upon modal creation
*/
function isModalAvailable(funToRun) {
    let reCheckModal = setInterval(function() {
        if (document.readyState == 'complete' && $(document).find('.modal.generic-modal').length) {
            funToRun();
            clearInterval(reCheckModal);
        }
    }, 500);
}

/**
 * @function
 * @desc Function to retrieve session strorage value in JSON parsed format
 * @param {String} key key name in session storage
*/
function getItemParsedSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

/**
 * @function
 * @desc Function to setItem in sessionStorage
 * @param {String} key key name in session storage
 * @param {String} value value against the respective key name in session storage
*/
function setItemSessionStorage(key, value) {
    sessionStorage.setItem(key, value);
}

(function (ABT) {

    document.addEventListener('DOMContentLoaded', function () {

        const $downloadBtn = document.querySelector('#user-group-report');


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

                .catch(() => console.log('error occured in downloading user-group-report.csv'));
        }


        function downloadCSVfile(data, fileNm) {
            let decodedString = atob(data);
            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(decodedString);
            hiddenElement.target = '_blank';

            //provide the name for the CSV file to be downloaded
            hiddenElement.download = fileNm;
            hiddenElement.click();
        }

        function init() {
            if ($downloadBtn) {
                $downloadBtn.addEventListener('click', function () {
                    downloadTableData("exportData", "user-group-report.csv", ABT.Config.endpoints.USER_GROUPS);
                });

            }

        }

        init();


        // Edit icon click for passing url parameters
        $(document).on('click', '.m-custom-table .a-link__text', function () {
            if ($(this).attr('id') === 'activate-user') {
                reactivateUser();
            }

            if ($(this).attr('id') === 'delete-deactivated-user') {
                let userAid = getItemParsedSessionStorage('rowData').aid;
                $('#delete-deactivated-user-modal .form-container .hidden input[name="AID"]').attr('value', userAid);
            }
        });
        //Added click function for search button 
        $('#search-products.btn[type="submit"]').click(function () {
            $('form[action="/secure/search.html"]').submit();
        });
        function reactivateUser() {
            let userData = getItemParsedSessionStorage('rowData');
            ABT.Http({
                url: ABT.Config.endpoints.REACTIVATE_USER,
                method: 'POST',
                headers: ABT.Config.getRequestHeader(),
                params: {
                    "action": "reactivateUser",
                    "userInfo": {
                        "email": userData.email
                    }
                }
            })
                .then(function (res) {
                    showStatus(res, 'activate-user-modal');
                    hideAllsiblings('activate-user-modal');
                })

                .catch(() => console.log('error occured'));
        }
        $(document).on('click', '#activate-user-modal .generic-modal--close', function () {
            if (document.getElementById('activate-user')) {
                window.location.reload();
            }
        });
    });

})(window.ABT || (window.ABT = {}));
