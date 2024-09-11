
/**
 * FORM CONTAINER FUNCTIONS FOR CYBERSECURITY ADMIN PORTAL
 */

/**
 * @function
 * Summary: Function to handle update request of form before ESL call
 * Parameters: data -> payload
 */
function updateRequestCommon(data) {
    if (data.body['action-type']) {
        data.body['action'] = data.body['action-type'];
    }
    delete data.body['action-type'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * Summary: Function to perform post API actions like calling required functions
 * Parameters: res -> response from ESL
 *             ele -> modal ID
 */
function postAPIActions(res, ele) {
    showStatus(res, ele);
    hideAllsiblings(ele);
    pageReload(`#${ele} .generic-modal--close`);
}

/* Code for Add User in Group Form - Starts here */

/**
 * @function
 * Summary: Function to capture the Group details before ESL call
 * Parameters: data -> payload
 */

function updateRequestAddUserInGroup(data) {
    data.body['action'] = 'addUser';
    delete data.body['Email'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * Summary: Function to handle success response from ESL call
 * Parameters: data -> payload
 */

function onSuccessAddUserInGroup(data) {
    if (data.errorCode == 0) {
        postAPIActions(data, 'add-user-to-group-modal');
        let updatedRowData = getItemParsedSessionStorage('groupRowData');
        updatedRowData.usersCount = (+updatedRowData.usersCount + 1).toString();
        setItemSessionStorage('rowData', JSON.stringify(updatedRowData));
        sessionStorage.removeItem('groupRowData');
    } else {
        onErrorAddUserInGroup(data);
    }
}

/**
 * @function
 * Summary: Function to handle error response from ESL call
 * Parameters: data -> payload
 */

function onErrorAddUserInGroup(error) {
    postAPIActions(error, 'add-user-to-group-modal');
    setItemSessionStorage('rowData', sessionStorage.getItem('groupRowData'));
    sessionStorage.removeItem('groupRowData');
}

/* Code for Add User in Group Form - Ends here */

/**
 * @function
 * Summary: Function to reload the page
 * Parameters: elePath -> element path on which the reload should happen
 */

function pageReload(elePath) {
    $(document).on('click', elePath, function () {
        setTimeout(function () {
            window.location.reload();
        }, 500);
    });
}

/* Code for Edit user Form - Starts here */

/**
 * @function
 * Summary: Function to capture and modify edit user details before ESL call
 * Parameters: data -> payload
 */

function updateRequestEditUser(data) {
    data.body['action'] = 'updateUserGroup';
    data.body['status'] = $('#edit-user-popup-modal .form-container #user-status span').attr('data-name');
    if (data.body && data.body['email'] == undefined) {
        data.body['email'] = $('#edit-user-popup-modal .form-container input[name="email"]').val();
    }
    let consentDataset = data.body['groups-to-add'];
    let consentArray = window.ABT.Utils.consentSetToArray(consentDataset).toString();
    data.body['groups-to-add'] = consentArray;
    if (!data.body.hasOwnProperty('notes')) {
        let notes = $('#edit-user-popup-modal .form-container .a-input-field .form-control[name="notes"]');
        if (notes.length) data.body['notes'] = notes.val();
    }
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['extend-access-success-message'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * Summary: Function to handle success response from ESL call for Edit user API
 * Parameters: data -> payload
 */

function onSuccessEditUser(data) {
    if (data.errorCode == 0) {
        postAPIActions(data, 'edit-user-popup-modal');
    } else {
        onErrorEditUser(data);
    }
}

/**
 * @function
 * Summary: Function to handle error response from ESL call for Edit user API
 * Parameters: data -> payload
 */

function onErrorEditUser(error) {
    postAPIActions(error, 'edit-user-popup-modal');
}

/* Code for Edit user Form - Ends here */


/* Code for Delete Deactivated user Form - Starts here */

/**
 * @function
 * Summary: Function to capture and modify deactivated user details before ESL call
 * Parameters: data -> payload
 */

function updateRequestDeleteDeactivatedUser(data) {
    data.body['action'] = 'userPermission-Delete';
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * Summary: Function to handle success response from ESL call for delete deactivated user API
 * Parameters: data -> payload
 */

function onSuccessDeleteDeactivatedUser(data) {
    if (data.errorCode == 0) {
        postAPIActions(data, 'delete-deactivated-user-modal');
    } else {
        onErrorDeleteDeactivatedUser(data);
    }
}

/**
 * @function
 * Summary: Function to handle error response from ESL call for delete deactivated user API
 * Parameters: data -> payload
 */

function onErrorDeleteDeactivatedUser(error) {
    postAPIActions(error, 'delete-deactivated-user-modal');
}

/* Code for Delete Deactivated user Form - Ends here */

/* Code for Create Group Form - Starts here */

/**
 * @function
 * Summary: Function to capture and modify Create Group form before ESL call
 * Parameters: data -> payload
 */

function updateRequestCreateGroup(data) {
    let productsConsent = data.body['productIds'];
    let docPermConsent = data.body['docPerm'];
    data.body['productIds'] = window.ABT.Utils.consentSetToArray(productsConsent).toString();
    data.body['docPerm'] = window.ABT.Utils.consentSetToArray(docPermConsent).toString();
    if (data.body['expDate'].length) {
        let expDate = new Date(data.body['expDate']);
        data.body['expDate'] = `${expDate.getFullYear()}-${("0" + (expDate.getMonth() + 1)).slice(-2)}-${("0" + expDate.getDate()).slice(-2)}`;
    } else {
        delete data.body['expDate'];
    }
    data.body['action'] = data.body['action-type'];
    delete data.body['action-type'];
    delete data.body['expDateRequire'];
    delete data.body['searchProduct'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * Summary: Function to handle success response from ESL call for Create Group API
 * Parameters: data -> payload
 */

function onSuccessCreateGroup(data) {
    if (data.errorCode == 0) {
        postAPIActions(data, 'add-group-modal');
    } else {
        onErrorCreateGroup(data);
    }
}

/**
 * @function
 * Summary: Function to handle error response from ESL call for Create Group API
 * Parameters: data -> payload
 */

function onErrorCreateGroup(error) {
    postAPIActions(error, 'add-group-modal');
}

/* Code for Create Group Form - Ends here */

/* Code for Edit Group Form - Starts here */

/**
 * @function
 * Summary: Function to capture and modify Edit Group form before ESL call
 * Parameters: data -> payload
 */

function updateRequestEditGroup(data) {
    let updatedPayload = updateRequestCreateGroup(data);
    let rowData = getItemParsedSessionStorage('groupRowData');
    rowData = rowData != undefined ? rowData : getItemParsedSessionStorage('rowData');
    rowData.groupName = updatedPayload.body['groupName'];
    rowData.groupStatus = updatedPayload.body['expDate'];
    rowData.documentType = updatedPayload.body['docPerm'];
    rowData.productsCount = updatedPayload.body['productIds'].split(',').length.toString();
    setItemSessionStorage('updatedRowData', JSON.stringify(rowData));
    return updatedPayload;
}

/**
 * @function
 * Summary: Function to handle success response from ESL call for Edit Group API
 * Parameters: data -> payload
 */

function onSuccessEditGroup(data) {
    if (data.errorCode == 0) {
        postAPIActions(data, 'edit-groupbutton-modal');
        let updatedRowData = sessionStorage.getItem('updatedRowData');
        setItemSessionStorage('rowData', updatedRowData);
        sessionStorage.removeItem('groupRowData');
        sessionStorage.removeItem('updatedRowData');
    } else {
        onErrorEditGroup(data);
    }
}

/**
 * @function
 * Summary: Function to handle error response from ESL call for Edit Group API
 * Parameters: data -> payload
 */

function onErrorEditGroup(error) {
    postAPIActions(error, 'edit-groupbutton-modal');
    setItemSessionStorage('rowData', sessionStorage.getItem('groupRowData'));
    sessionStorage.removeItem('groupRowData');
    sessionStorage.removeItem('updatedRowData');
}

/* Code for Edit Group Form - Ends here */

/* Code for Product update verify Form - Starts here */

/**
 * @function
 * Summary: Function to capture and modify Product update search form before ESL call
 * Parameters: data -> payload
 */

function updateRequestProductSearch(data) {
    setItemSessionStorage('productSearchId', data.body.productId);
    hideProductPageSection('false');
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * Summary: Function to handle success response from ESL call for Product update search API
 * Parameters: data -> payload
 */

function onSuccessProductSearch(data) {
    if (data.errorCode == 0) {
        window.location.reload();
    } else {
        onErrorProductSearch(data);
    }
}

/**
 * @function
 * Summary: Function to handle error response from ESL call for Product update search API
 * Parameters: data -> payload
 */

function onErrorProductSearch(error) {
    sessionStorage.removeItem('productSearchId');
    sessionStorage.removeItem('productCreateSearchId');
    showStatus(error, 'form-product-details-search');
}

/* Code for Product update search Form - Ends here */

/* Code for Product update Details Form - Starts here */

/**
 * @function
 * @summary: Function to capture and modify Product update Details form before ESL call
 * @param: data -> payload
 */

function updateRequestProductDetails(data) {
    data.body['action'] = data.body['action-type'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    delete data.body['action-type'];
    delete data.body['action-type-insert'];
    delete data.body['action-type-update'];
    data.body['additionalInfo'] == undefined && (data.body['additionalInfo'] = "");
    data.body['additionalInfoLabel'] == undefined && (data.body['additionalInfoLabel'] = "");
    data.body?.itemId && setItemSessionStorage('productSearchId', data.body.itemId);
    return data;
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for Product update Details API
 * @param: data -> payload
 */

function onSuccessProductDetails(data) {
    if (data.errorCode == 0) {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } else {
        onErrorProductDetails(data);
    }
}

/**
 * @function
 * @summary: Function to handle error response from ESL call for Product update Details API
 * @param: data -> payload
 */

function onErrorProductDetails(error) {
    showStatus(error, 'form-product-details-update');
    sessionStorage.removeItem('productSearchId');
}

/* Code for Product update Details Form - Ends here */

/* Code for Product Document Details update Form - Starts here */

/**
 * @function
 * @summary: Function to capture and modify Product Document Details update form before ESL call
 * @param: data -> payload
 */

function updateRequestDocumentDetails(data) {
    data.body['action'] = data.body['action-type'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    delete data.body['action-type'];
    delete data.body['action-type-insert'];
    delete data.body['action-type-update'];
    data.body['additionalInfo'] == undefined && (data.body['additionalInfo'] = "");
    data.body['additionalInfoLabel'] == undefined && (data.body['additionalInfoLabel'] = "");
    const productId = $('#form-product-details-update')?.find('input[name="itemId"]')?.val();
    productId?.length && setItemSessionStorage('productSearchId', productId);
    return data;
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for Product Document Details update API
 * @param: data -> payload
 */

function onSuccessDocumentDetails(data) {
    if (data.errorCode == 0) {
        const modalId = $('#form-document-details-update').parents('.modal').attr('id');
        postAPIActions(data, modalId);
    } else {
        onErrorDocumentDetails(data);
    }
}

/**
 * @function
 * @summary: Function to handle error response from ESL call for Product Document Details update API
 * @param: data -> payload
 */

function onErrorDocumentDetails(error) {
    const modalId = $('#form-document-details-update').parents('.modal').attr('id');
    postAPIActions(error, modalId);
    sessionStorage.removeItem('productSearchId');
}

/* Code for Product Document Details update Form - Ends here */

/* Code for Product Creation page product search - Starts here */

/**
 * @function
 * Summary: Function to capture and modify Product Creation page product search form before ESL call
 * Parameters: data -> payload
 */

function updateRequestProductCreateSearch(data) {
    setItemSessionStorage('productCreateSearchId', data.body.productId);
    $('#product-create-content')?.parent()?.addClass('bts-d-none');
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for Product Document Details update API
 * @param: data -> payload
 */

function onSuccessProductCreateSearch(data) {
    if (data.errorCode == 0) {
        let productCreateSearchForm = $('#form-product-details-search');
        const searchedProductId = getItemParsedSessionStorage('productCreateSearchId');
        const productName = data?.response?.productName;
        productCreateSearchForm?.find('.o-form-container__success-msg')?.addClass('d-none');
        let productIdField = productCreateSearchForm?.find('.a-input-control[name="productId"]');
        if (productIdField?.length) {
            setTimeout(() => {
                productIdField.val(searchedProductId);
                productIdField[0].dispatchEvent(new Event('change'));
            }, 500);
        }

        const productCreateLayout = $('#product-create-content');
        const productCreateForm = productCreateLayout?.find('.formcontainer .form-container');
        if (productCreateLayout?.length && productCreateForm?.length) {
            const productUrl = productName?.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const productNameField = productCreateForm.find('.a-input-control[name="productName"]');
            productCreateForm.find('.a-input-control[name="productPath"]')?.val(productUrl?.length ? productUrl: '')[0].dispatchEvent(new Event('change'));
            productCreateForm.find('.a-input-control[name="pageTitle"]')?.val(productName)[0].dispatchEvent(new Event('change'));
            productCreateForm.find('.a-input-control[name="navigationTitle"]')?.val(productName)[0].dispatchEvent(new Event('change'));
            productNameField?.val(productName)[0].dispatchEvent(new Event('change'));
            productCreateForm.find('[name="productId"]')?.val(searchedProductId);
            productCreateLayout.find('.formcontainer .o-form-container__success-msg')?.empty();
            productCreateLayout.find('.formcontainer .o-form-container__error-msg')?.empty();
            productCreateLayout?.parent().removeClass('bts-d-none');
        }
        sessionStorage.removeItem('productCreateSearchId');
    } else {
        onErrorProductSearch(data);
    }
}

/* Code for Product Creation page product search - Ends here */

/* Code for Product Creation page product create form - Starts here */

/**
 * @function
 * Summary: Function to capture and modify Product Creation page product create form before ESL call
 * Parameters: data -> payload
 */

function updateRequestProductPageCreate(data) {
    const formReadOnlyFields = $('.formcontainer input[value="updateRequestProductPageCreate"]')?.parents('.o-form-container')?.find('.a-input-control[readonly]');
    formReadOnlyFields?.each(function() {
        data.body[$(this)?.attr('name')] = $(this)?.val();
    });
    data.body['action'] = data.body['action-type'];
    data.body['productPath'] = data.body['url-path'] + data.body['productPath'];
    delete data.body['action-type'];
    delete data.body['url-path'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for Product create page form API
 * @param: data -> payload
 */

function onSuccessProductPageCreate(data) {
    if (data.errorCode !== 0) {
        onErrorProductPageCreate(data);
    }
}

/**
 * @function
 * @summary: Function to handle error response from ESL call for Product create page form API
 * @param: data -> payload
 */
function onErrorProductPageCreate(error) {
    showStatus(error, 'form-product-create-page');
}

/* Code for Product Creation page product create form - Ends here */

/* Code for Whitepaper Fetch form - Starts here */

/**
 * @function
 * @summary: Function to handle success response from ESL call for Whitepaper Fetch form API
 * @param: data -> payload
 */
function onSuccessWhitepaperFetch(data) {
    if (data.errorCode === 0) {
        if (data?.response?.length && data.response[0]?.attachmentName?.length) {
            $('#layout-whitepaper--download')?.parent()?.removeClass('bts-d-none');
            $('input[type="hidden"][name="documentId"]')?.val(data.response[0].attachmentName);
            const documentLink = $('.link__whitepaper-document--display .a-link__inner-text');
            documentLink?.text(documentLink.text().replace('{docuementId}', data.response[0].attachmentName));
        } else {
            $('#layout-whitepaper--upload')?.parent()?.removeClass('bts-d-none');
        }
        $('#layout-whitepaper--fetch')?.parent()?.addClass('bts-d-none');
    } else {
        onErrorWhitepaperFetch(data);
    }
}

/**
 * @function
 * @summary: Function to handle error response from ESL call for Whitepaper Fetch form API
 * @param: data -> payload
 */
function onErrorWhitepaperFetch(error) {
    showStatus(error, 'form-whitepaper--fetch');
    $('#layout-whitepaper--fetch').find('.spinner-component')?.addClass('d-none');
}

/* Code for Whitepaper Fetch form - Ends here */

/* Code for Whitepaper Download form - Starts here */

/**
 * @function
 * @summary: Function to handle success response from ESL call for Whitepaper Download form API
 * @param: data -> payload
 */
function onSuccessWhitepaperDownload(data) {
    if (data.errorCode === 0) {
        if (data?.response?.attachmentBytes?.length && data?.response?.attachmentName?.length) {
            const { attachmentBytes, attachmentName } = data.response;
            window.ABT.productCards.saveDocument(
                {
                    bytes: attachmentBytes,
                    name: attachmentName
                },
                'pdf'
            );
            setTimeout(() => {
                $('#form-whitepaper--download')?.find('.btn[type="submit"]')?.removeAttr('disabled');
            }, 200);
        }
    } else {
        onErrorWhitepaperDownload(data);
    }
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for Whitepaper Download form API
 * @param: data -> payload
 */
function onSuccessWhitepaperSignedDownload(data) {
    if (data.errorCode === 0 && data?.response?.signedUrl?.length) {
        const downloadLink = document.createElement("a");
        downloadLink.href = data.response.signedUrl;
        downloadLink.download = data?.response?.attachmentName || 'document.pdf';
        downloadLink.click();
        setTimeout(() => {
            $('#form-whitepaper--download')?.find('.btn[type="submit"]')?.removeAttr('disabled');
        }, 200);
    } else {
        onErrorWhitepaperDownload(data);
    }
}

/**
 * @function
 * @summary: Function to handle error response from ESL call for Whitepaper Download form API
 * @param: data -> payload
 */
function onErrorWhitepaperDownload(error) {
    showStatus(error, 'form-whitepaper--download');
}

/* Code for Whitepaper Download form - Ends here */

/* Code for Whitepaper Delete form - Starts here */

/**
 * @function
 * @summary: Function to handle success response from ESL call for Whitepaper Delete form API
 * @param: data -> payload
 */
function onSuccessWhitepaperDelete(data) {
    if (data.errorCode === 0) {
        postAPIActions(data, 'whitepaper--delete-alert-btn-modal');
    } else {
        onErrorWhitepaperDelete(data);
    }
}

/**
 * @function
 * @summary: Function to handle error response from ESL call for Whitepaper Delete form API
 * @param: data -> payload
 */
function onErrorWhitepaperDelete(error) {
    postAPIActions(error, 'whitepaper--delete-alert-btn-modal');
}

/* Code for Whitepaper Delete form - Ends here */


/* Code for Whitepaper Upload form - Starts here */

/**
 * @function
 * Summary: Function to capture and modify Whitepaper Upload form before ESL call
 * Parameters: data -> payload
 */

async function updateRequestWhitepaperUpload(data) {
    data.body['action'] = data.body['action-type'];
    delete data.body['action-type'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    data.body['encodedFile'] = data.body['uploaded-file'];
    delete data.body['uploaded-file'];
    const fileUploadedName = $('#form-whitepaper--upload')?.find('.m-file-uploader .m-file-uploader__filename .m-file-uploader__name')?.text();
    fileUploadedName?.length && (data.body['documentId'] = fileUploadedName);
    return data;
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for Whitepaper Upload form API
 * @param: data -> payload
 */
function onSuccessWhitepaperUpload(data) {
    if (data.errorCode === 0) {
        setTimeout(() => window.location.reload(), 2000);
    } else {
        onErrorWhitepaperUpload(data);
    }
}

/**
 * @function
 * @summary: Function to capture and modify Whitepaper signed Upload form before ESL call
 * @param: data -> payload
 */
function updateRequestWhitepaperSignedUpload(data) {
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    delete data.body['uploaded-file'];
    const fileUploadedName = $('#form-whitepaper--upload')?.find('.m-file-uploader .m-file-uploader__filename .m-file-uploader__name')?.text()?.trim();
    fileUploadedName?.length && (data.body['completeObjectKey'] = fileUploadedName);
    $('#form-whitepaper--upload .o-form-container__success-msg')?.addClass('d-none');
    return data;
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for Whitepaper signed Upload form API
 * @param: data -> payload
 */
async function onSuccessWhitepaperSignedUpload(data) {
    const docFileName = $('#form-whitepaper--upload .m-file-uploader input[name="uploaded-file"]')?.val();
    if (data.errorCode === 0 && data.response?.signedUrl?.length && docFileName?.length) {
        const formContainerEle = $('.formcontainer input[value="onSuccessWhitepaperSignedUpload"]')?.parents('.formcontainer');
        formContainerEle
            .find('.btn[type="submit"]')
            ?.parent()
            .addClass('a-button--spinner')
            .children()
            .attr('disabled', 'disabled');

        // Convert Blob Object URL to File
        const uplaodedFile = await fetch(docFileName)
            .then(b => b.blob())
            .then(
                file => new File(
                    [file],
                    $('#form-whitepaper--upload')?.find('.m-file-uploader .m-file-uploader__filename .m-file-uploader__name')?.text()?.trim()),
                    'application/pdf'
                )
            .catch(err => onErrorWhitepaperUpload(err));

        // API call to upload the file using signed url
        $.ajax({
            type: "put",
            url: data.response.signedUrl,
            data: uplaodedFile,
            contentType: 'application/pdf',
            processData: false,
            error: (xhr, status, error) => {
                onErrorWhitepaperUpload(error);
            }
        })
            .done(() => {
                formContainerEle.find('.o-form-container__success-msg')?.text(formContainerEle.find('[name="successMessage"]').val()).removeClass('d-none');
                formContainerEle.find('.btn[type="submit"]')?.parent().removeClass('a-button--spinner');
                setTimeout(() => window.location.reload(), 2000);
            })
            .fail(err => onErrorWhitepaperUpload(err));
    } else {
        onErrorWhitepaperUpload(data);
    }
}

/**
 * @function
 * @summary: Function to handle error response from ESL call for Whitepaper Upload form API
 * @param: data -> payload
 */
function onErrorWhitepaperUpload(error) {
    showStatus(error, 'form-whitepaper--upload');
}

/* Code for Whitepaper Upload form - Ends here */
