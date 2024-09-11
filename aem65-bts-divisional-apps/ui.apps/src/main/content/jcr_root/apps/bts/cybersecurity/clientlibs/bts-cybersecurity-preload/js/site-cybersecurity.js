
/**
 * CYBERSECURITY PORTAL GENERIC CODE
 */

document.addEventListener('DOMContentLoaded', function () {

    if (ABT.Utils.isOnPublish()) {

        /* Hide layout loading and layout data contaienrs on page load */
        document.querySelector('#layout-none') && document.querySelector('#layout-none').parentElement.classList.add('d-none');
        document.querySelector('#layout-error') && document.querySelector('#layout-error').parentElement.classList.add('d-none');
        if (document.querySelectorAll('div[id*=layout-data]').length) {
            document.querySelectorAll('div[id*=layout-data]').forEach(function (dataNode) {
                dataNode.parentElement.classList.add('table__hidden');
                dataNode.parentElement.classList.remove('bts-d-none');
            });
        }

        /* Hide Vulnerabilities navigation link on page load */
        document.querySelector('.m-mega-menu__mobile-item-wrapper:has(#vsi-nav-link)')?.classList.add('d-none');

        /* Update productId value in hidden field to make API with productID as parameter */
        updateProductIdField();

        /* Fetch lastLogin value from Localstorage and fill it in hidden field */
        fetchLastLoginToField();

        /* Update last column th label from hidden field formed from Js (to handle buttons/links) in customtable component */
        let thLastColText = document.querySelectorAll('[type="hidden"][name="thLastColText"]');
        if (thLastColText.length) {
            thLastColText.forEach(function(ele) {
                ele.closest('.layoutcontainer').querySelector('.m-custom-table th:last-child').innerText = ele.value;
            });
        }

        /* Hide error modal link from page */
        let downloadErrorLink = document.querySelector('#document-error');
        downloadErrorLink && downloadErrorLink.closest('.button').classList.add('d-none');
    }
});

/**
 * @function
 * @summary: Update productId value in hidden field to make API with productID as parameter
 */
function updateProductIdField() {
    let productId = document.querySelector('[name="productId"]');
    let productID = document.querySelector('[name="PRODUCT-ID"]');
    if (productId && productID) {
        productId.value = (productID.value) ? productID.value : '';
    }
}

/**
 * @function
 * @summary: Fetch lastLogin value from Localstorage and fill it in hidden field
 */
function fetchLastLoginToField() {
    let lastLoginField = document.querySelector('[name="lastLogin"]');
    let lastLoginLocalStorage = localStorage.getItem('lastLogin');
    if (lastLoginField) {
        lastLoginField.value = lastLoginLocalStorage ? lastLoginLocalStorage : '';
    }
}
