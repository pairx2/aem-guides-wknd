
/**
 * CUSTOMTABLE FUNCTIONS FOR CYBERSECURITY PORTAL
 */

let rowExecFlag = false;
let tableController;
let vsiController;
let customTableElement;

/**
 * @function
 * Summary: Function to update createdRow data for notifications page
 * Parameters: rowData -> Object with row, ESL resposne w.r.t row and row index
 */

function updateCreatedRowNotifications(rowData) {
    if (rowData.areRowSelected) {
        let notificationIds = [];
        rowData.selectedRows.each(row => {
            if (!row.markedAsRead && row.notificationId) {
                notificationIds.push(row.notificationId)
            }
        })
        notificationIds.length && updateBulkRowNotifications(notificationIds);
        return;
    }

    if (rowData && rowData.data) {
        handleRowLinkEvents(rowData);
    }

    if (rowData.resData.length == (rowData.index + 1)) {

        $('section.m-custom-table').each(function () {
            if ($(this).find('input[type="hidden"][name="updateCreatedRow"]').val() == 'updateCreatedRowNotifications')
                customTableElement = $(this);
        });
        setTimeout(function () {
            let datePublishedCol = customTableElement.find('thead th[data-name="notificationPublishedDate"]');
            ABT.Utils.selectTableColSorting(datePublishedCol, false);
            generateTableTotalCount(customTableElement, rowData.resData.length);
        }, 500);
    }
    return false;
}

/**
 * @function
 * Summary: function to update the all the selected rows in table
 * @param rowId - Array with unque id of each selected Row
 * @param rowEle - DOM element of each selected Row
 */
function updateBulkRowNotifications(notificationIds) {
    ABT.Http({
        url: ABT.Config.endpoints.USER_NOTIFICATIONS,
        method: 'POST',
        headers: {
            'x-id-token': ABT.Utils.getUser('token')
        },
        params: {
            action: "updateNotificationStatus",
            notificationId: notificationIds
        }
    }).then(function () {
        window.location.reload();
    });
}

/**
 * @function
 * @summary: Function to hande notification each row events
 * @param rowData - data against each row item
 */
function handleRowLinkEvents(rowData) {
    let rowLink = $(rowData.row).find('.m-customtable__table-col-data .a-link .a-link__text');
    let hashText = rowData.data.notificationCategory.toLowerCase() == 'vsi' ? '#vsi' : '';
    const anchorUrl = rowData.data.productUrl ? ABT.Config.aemConfig['PRODUCT_PAGE_URL'].replace('.html', '') + '/' + rowData.data.productUrl + '.html' + hashText : ABT.Config.aemConfig['PRODUCT_PAGE_URL'];
    rowLink.attr('href', anchorUrl);
    rowData.data.markedAsRead === false && $(rowData.row).addClass('selected-row');
    if (rowData.data.notificationId && rowData.data.notificationId.length) {
        $(rowData.row).attr('data-notification-id', rowData.data.notificationId);
        rowLink.attr('data-gtm-eventlabel', `${rowData.data?.notificationType}|${rowData.data?.notificationCategory}|${rowData.data?.productName}`);
    }

    rowLink.on('click', () => {

        // Code to execute only for NEW notifications
        if ($(rowData.row).hasClass('selected-row')) {
            let notificationID = $(rowData.row).attr('data-notification-id');
            updateNotificationStatus([notificationID], $(rowData.row));
        }
    });
}

/**
 * @method
 * @desc API call to update notification status and upon success from ESL, update row to read styling and notification count in header
 */
function updateNotificationStatus(notificationId, rowEle) {

    ABT.Http({
        url: ABT.Config.endpoints.USER_NOTIFICATIONS,
        method: 'POST',
        headers: {
            'x-id-token': ABT.Utils.getUser('token')
        },
        params: {
            action: "updateNotificationStatus",
            notificationId: notificationId
        }
    }).then(function (data) {
        if (data.errorCode == 0 && data.response && data.response[0].markedAsRead) {
            let headerCounter = sessionStorage.getItem('notifications-count');
            rowEle.removeClass('selected-row');

            if (headerCounter && headerCounter.length) {
                --headerCounter;

                ABT.Utils.displayNotificationCounter(headerCounter, $(document).find('.header #notifications-counter').parent());
                sessionStorage.setItem('notifications-count', headerCounter);
            }
        }
    });
}

function updateCreatedRowProduct(rowData) {
    if (!rowExecFlag) {
        rowExecFlag = true;
        let layoutDataContainers = $(document).find('[id*="layout-data"]:not([id*="table"])');

        // Mapping response keys with keynames on page
        layoutDataContainers.each(function () {
            let htmlClone = $(this)[0].outerHTML;
            const matches = htmlClone.match(/\{(.*?)\}/gm);
            const uniqueMatches = Array.from(new Set(matches));

            uniqueMatches.forEach(match => {
                const key = match.replace(/[{}]/g, '');
                const resKeyValue = (rowData && rowData.resData && rowData.resData[key]) ? rowData.resData[key] : '';
                htmlClone = htmlClone.replaceAll(match, resKeyValue);
            });
            $(this).parent().html(htmlClone);
        });

        // Update image src with prodict image and include fallback image
        let productImageHTML = $(document).find('#layout-data-product_details .image .cmp-image');
        let fallbackImgPath = productImageHTML.attr('data-asset');
        let imagePath = fallbackImgPath.slice(0, fallbackImgPath.lastIndexOf('/') + 1);
        let imgHTML = productImageHTML.find('img');
        imagePath = imagePath + $(document).find('input[name="PRODUCT-ID"]').attr('value') + '.jpeg';
        imgHTML.attr('src', imagePath);
        imgHTML.attr('onerror', `this.onerror=null;this.src='${fallbackImgPath}';`);
        let $contactPortalLink = document.querySelector('#errLink_contact_portal');
        $contactPortalLink && $contactPortalLink.setAttribute('href', 'javascript:void(0)');
        $contactPortalLink && ABT.productCards.getContactPortalModal($contactPortalLink);
    }

    if (rowData && rowData.data) {
        // Add new badge and hide unwanted xml/pdf buttons
        productRenderDocButtons(rowData);

        if (rowData.resData.documents.length == (rowData.index + 1)) {
            productPostTableCreation(rowData);
        }
    }
    return false;
}

/**
 * @function
 * @summary: Function to Add new badge and hide unwanted xml/pdf buttons and add events to it
 * @param rowData - data against each row item
 */
function productRenderDocButtons(rowData) {
    (rowData.data.isNew == 'true') && $(rowData.row).addClass('latest-row');
    let xmlLink = $(rowData.row).find('#download_xml');
    let pdfLink = $(rowData.row).find('#download_pdf');
    xmlLink.attr('id', `download_xml-${rowData.index}`);
    pdfLink.attr('id', `download_pdf-${rowData.index}`);
    (rowData.data.xmlAttachmentId == undefined || rowData.data.xmlAttachmentId == 'null') ? xmlLink.parents('.link').addClass('d-none') : downloadLinkattachAttr(xmlLink, 'xml', rowData);
    (rowData.data.pdfAttachmentId == undefined || rowData.data.pdfAttachmentId == 'null') ? pdfLink.parents('.link').addClass('d-none') : downloadLinkattachAttr(pdfLink, 'pdf', rowData);
}

/**
 * @function
 * Summary: Function to attach attributes to pdf/xml download link used for download api and gtm
 * @param ele - download link element
 * @param type - pdf/xml
 * @param elsRes - esl response for getproductmetadata API
 */
function downloadLinkattachAttr(ele, type, elsRes) {
    ele.attr('data-url', (type == 'xml') ? elsRes.data.xmlAttachmentId : elsRes.data.pdfAttachmentId);
    ele.attr('data-type', type);
    ele.attr('data-gtm-eventLabel', `${elsRes.data.documentType}|${type}|${elsRes.data.documentName}`);
    ele.attr('data-gtm-eventAction', elsRes.resData.productName);
    ele.attr('href', 'javascript:void(0)');
    ele.on('click', appendDownloadEvent);
}

/**
 * @function
 * Summary: Function to handle download api
 * @param event - event
 */
function appendDownloadEvent(event) {
    const $downloadLinkEle = event.currentTarget;
    const dataset = $downloadLinkEle.dataset;
    const id = dataset.url;
    const type = dataset.type;

    if (!id) {
        return;
    }

    $downloadLinkEle.classList.add("btn-spinner__custom");

    $($downloadLinkEle).parents('tbody').find('.link .a-link .a-link__text').addClass('disabled');

    tableController = new AbortController();
    setTimeout(() => tableController.abort(), 120000);

    ABT.productCards.getDocument(id, tableController)
        .then(doc => ABT.productCards.saveDocument(doc, type, $downloadLinkEle))
        .then(() => ABT.productCards.triggerGtmEvent($downloadLinkEle))
        .catch((err) => handleDownloadError(err, $downloadLinkEle));
}

/**
 * @function
 * Summary: Function to handle download error scenario
 * @param err - error response
 * @param $downloadLinkEle - ele which is clicked
 */
function handleDownloadError(err, $downloadLinkEle) {

    const downloadErrorLink = $('#document-error').parent();
    const downloadErrorModal = $('#document-error-modal');
    const docNotAvailable = downloadErrorModal.find('#document-not-available');
    const userAbortApi = downloadErrorModal.find('#user-abort');
    const noDocResponse = downloadErrorModal.find('#no-doc-response');
    const eslDocErrorRes = downloadErrorModal.find('#esl-document-res').parent();
    let eslDocResTemplate = downloadErrorModal.find('.esl-doc-res--template');

    if (eslDocResTemplate.length == 0) {
        eslDocErrorRes.children().clone().appendTo(eslDocErrorRes.parent()).removeAttr('id').addClass('d-none esl-doc-res--template');
        eslDocResTemplate = downloadErrorModal.find('.esl-doc-res--template');
    }

    if (err.message === 'Document does not exist') {
        setTimeout(() => {
            $downloadLinkEle.classList.remove("btn-spinner__custom");
        }, 1000);
        docNotAvailable.removeClass('d-none');
        userAbortApi.addClass('d-none');
        noDocResponse.addClass('d-none');
        eslDocErrorRes.addClass('d-none');
    } else if (err.message === 'No doc response') {
        $downloadLinkEle.classList.remove("btn-spinner__custom");
        noDocResponse.removeClass('d-none');
        docNotAvailable.addClass('d-none');
        userAbortApi.addClass('d-none');
        eslDocErrorRes.addClass('d-none');
    } else if (err.message === 'DOMException: The user aborted a request.') {
        setTimeout(() => {
            $downloadLinkEle.disabled = false;
            $downloadLinkEle.classList.remove("btn-spinner__custom");
            docNotAvailable.addClass('d-none');
            userAbortApi.removeClass('d-none');
            noDocResponse.addClass('d-none');
            eslDocErrorRes.addClass('d-none');
        }, 120000);
    } else {
        eslDocErrorRes.children().html(eslDocResTemplate.html().replace('{document_res_error}', err.message));
        docNotAvailable.addClass('d-none');
        userAbortApi.addClass('d-none');
        noDocResponse.addClass('d-none');
        eslDocErrorRes.removeClass('d-none');
        $downloadLinkEle.classList.remove("btn-spinner__custom");
    }

    $($downloadLinkEle).parents('tbody').find('.link .a-link .a-link__text').removeClass('disabled');
    !downloadErrorModal.hasClass('show') && downloadErrorLink.trigger('click');
}

/**
 * @function
 * @summary: Function that is executed after all the row data is loaded in the product documents table
 * @param rowData - data against each row item
 */
function productPostTableCreation(rowData) {
    let customTableElement;
    $('section.m-custom-table').each(function () {
        if ($(this).find('input[type="hidden"][name="updateCreatedRow"]').val() == 'updateCreatedRowProduct')
            customTableElement = $(this);
    });
    setTimeout(function () {
        if (rowData.resData.documents.length == 1 && rowData.data.documentName == undefined) {
            let tableEmptyText = customTableElement.find('input[name="noResultsFoundText"]').attr('value');
            $(rowData.row).empty().append(`<td valign="top" colspan="4" class="dataTables_empty">${tableEmptyText}</td>`);
        }
        let datePublishedColumn = customTableElement.find('thead th[data-name="dateUploaded"]');
        ABT.Utils.selectTableColSorting(datePublishedColumn, false);
    }, 500);
}

/**
 * @function
 * Summary: Function to update createdRow data for VSI tab in products description page
 * Parameters: rowData -> Object with row, ESL resposne w.r.t row and row index
 */
function updateCreatedRowVsi(rowData) {
    updateCreatedRowVsiSection(rowData);

    if (rowData.resData?.vulnerabilityList?.length == (rowData.index + 1)) {
        let vsiTableElement;
        $('section.m-custom-table').each(function () {
            if ($(this).find('input[type="hidden"][name="updateCreatedRow"]').val() == 'updateCreatedRowVsi')
                vsiTableElement = $(this);
        });
        setTimeout(function () {
            if (rowData.resData.totalCount == 0 && rowData.data.trackingId == undefined && vsiTableElement.length) {
                let tabID = vsiTableElement.parents('.a-tabs__tab-pane').attr('aria-labelledby');
                let tabToHide = $(`#${tabID}-tab`);
                tabToHide.hasClass('cmp-tabs__tab--active') && tabToHide.siblings()[0].click();
                tabToHide.addClass('d-none');
            }
        }, 500);
    }
    return false;
}

/**
 * @function
 * Summary: Function to update createdRow data for vulnerabilities page
 * Parameters: rowData -> Object with row, ESL resposne w.r.t row and row index
 */
function updateCreatedRowVulnerabilities(rowData) {
    updateCreatedRowVsiSection(rowData);

    if (rowData.resData?.vulnerabilityList?.length == (rowData.index + 1)) {
        let vsiTableElement;
        $('section.m-custom-table').each(function () {
            if ($(this).find('input[type="hidden"][name="updateCreatedRow"]').val() == 'updateCreatedRowVulnerabilities')
                vsiTableElement = $(this);
        });
        localStorage.removeItem('vsiFilters');

        setTimeout(function () {
            if (rowData.data.trackingId == undefined && vsiTableElement.length) {
                let tableEmptyText = vsiTableElement?.find('input[name="noResultsFoundText"]')?.attr('value');
                $(rowData.row).empty().append(`<td valign="top" colspan="4" class="dataTables_empty">${tableEmptyText}</td>`);
                vsiTableElement.parents('.layoutcontainer').find('#table-count')?.addClass('d-none');
            }
        }, 500);
    }
    return false;
}

/**
 * @function
 * Summary: Function to update createdRow data for VSI in any page
 * Parameters: rowData -> Object with row, ESL resposne w.r.t row and row index
 */
function updateCreatedRowVsiSection(rowData) {
    if (rowData && rowData.data) {
        (rowData.data.new == 'true' || rowData.data.new === true || rowData.data.isNew == 'true' || rowData.data.isNew === true) && $(rowData.row).addClass('latest-row');
        rowData.data.trackingId?.length && $(rowData.row).attr('data-tracking_id', rowData.data.trackingId);
        rowData.data.ticketNumber?.length && $(rowData.row).attr('data-ticket_num', rowData.data.ticketNumber);
        typeof rowData.data == 'object' && Object.keys(rowData.data).length && $(rowData.row).attr('tabindex', '0');

        $(rowData.row).on('click keypress', function (e) {
            vsiHandleRowClick(e, $(this));
        });

        if (rowData.resData?.vulnerabilityList?.length == (rowData.index + 1)) {
            let thisTable = $(document).find('input[type="hidden"][name="updateCreatedRow"]');
            thisTable.each(function () {
                setTimeout(() => {
                    let dateUpdateCol = $(this).parents('section.m-custom-table').find('table thead th[data-name="dateModified"]');
                    if (['updateCreatedRowVsi', 'updateCreatedRowVulnerabilities'].includes($(this).val()) && dateUpdateCol.length) {
                        ABT.Utils.selectTableColSorting(dateUpdateCol, false, false);
                        generateTableTotalCount($(this), rowData.resData.totalCount, rowData.resData.vulnerabilityList.length);
                    }
                }, 500);
            });
        }
    }
}

/**
 * @function
 * @summary: Function to handle click event on a row from vsi table
 * @param: e -> event
 * @param: $this -> jQuery this event
 */
function vsiHandleRowClick(e, $this) {
    if (e.which == 13 || e.which == 32 || (e.type == 'click' && e.which == 1)) {

        let rowTrackingId = $this.attr('data-tracking_id');
        let rowTicketNum = $this.attr('data-ticket_num');
        let vsiSideBar = $('#vsiSidebar');
        let vsiSideBarSpinner = vsiSideBar.find('.a-spinner');
        let vsiErrorSection = vsiSideBar.find('.vsi-sidebar-error');
        vsiSideBar.find('.vsi-sidebar-body:not(.vsi-sidebar-body-template)')?.remove();
        vsiSideBarSpinner.removeClass('d-none');
        vsiErrorSection.addClass('d-none');
        vsiSideBar.addClass('active');
        vsiController && vsiController.abort();

        vsiController = new AbortController();
        setTimeout(() => vsiController.abort(), 120000);

        ABT.Http({
            url: ABT.Config.endpoints.VSI_METADATA,
            method: 'POST',
            signal: vsiController.signal,
            params: {
                action: "getVsiDetails",
                trackingId: rowTrackingId,
                ticketNumber: rowTicketNum
            }
        })
            .then(function (res) {
                if (res.errorCode == 200 || res.errorCode == 0) {
                    vsiRenderSidebar(res, vsiSideBar, vsiErrorSection);
                } else {
                    vsiErrorSection.removeClass('d-none');
                }
            })
            .catch(() => {
                vsiErrorSection.removeClass('d-none');
            })
            .finally(() => {
                vsiSideBarSpinner.addClass('d-none');
            });
    }
}

/**
 * @function
 * @summary: Function to render sidebar content on click of each row from vsi table
 * @param: res -> API response
 * @param: vsiSideBar -> jQueryElement
 * @param: vsiErrorSection -> jQueryElement
 */
function vsiRenderSidebar(res, vsiSideBar, vsiErrorSection) {
    let vsiBodyTemplate = vsiSideBar.find('.vsi-sidebar-body-template').clone(true, true).removeClass('vsi-sidebar-body-template');
    let htmlClone = vsiBodyTemplate.html();
    const matches = htmlClone.match(/\{(.*?)\}/gm);
    const uniqueMatches = Array.from(new Set(matches));

    uniqueMatches.forEach(match => {
        const key = match.replace(/[{}]/g, '');
        const resKeyValue = (res?.response[key]) ? res.response[key] : '';
        htmlClone = htmlClone.replaceAll(match, resKeyValue);
    });
    vsiBodyTemplate.html(htmlClone);
    vsiBodyTemplate.appendTo(vsiSideBar);
    vsiSideBar.find('.sidebar-data').each(function () {
        let currentData = $(this).not('d-none');

        if (currentData.find('p:nth-child(2)').length) {
            if (currentData.find('p:nth-child(2)')?.text().length == 0) {
                currentData.addClass('d-none');
                let siblingData = currentData.siblings('.sidebar-data:not(.d-none)');

                if (siblingData.find('p:nth-child(2)')?.text().length == 0) {
                    siblingData.addClass('d-none');
                    siblingData.parents('section.sidebar-tc')?.addClass('d-none');
                }
            }
        } else {
            (currentData.text().length == 0) && currentData.addClass('d-none');
        }
    });
    vsiBodyTemplate.removeClass('d-none');
    vsiErrorSection.addClass('d-none');
}

/**
 * @function
 * @summary: Function to append total count and showing count to the text component associated within the same layoutcontainer as the table
 * @param: rowData -> any element to identify the table
 * @param: rowData -> Total count to be shown on the page, default value is empty string
 * @param: rowData -> Showing count to be shown on the page, defaut value is empty string
 */
function generateTableTotalCount(tableEle, totalCount = '', showingCount = '') {
    const recordsThreshold = $(document).find('input[type="hidden"][name="records-count-in-table"]').val();
    const minTextEle = tableEle.parents('.layoutcontainer').find('#table-count-min');
    const maxTextEle = tableEle.parents('.layoutcontainer').find('#table-count-max');
    let updatedCountText;

    // If both totalCount and showingCount are not present, hide both texts
    if (totalCount == 0) {
        minTextEle.parent().addClass('d-none');
        maxTextEle.parent().addClass('d-none');
        return;
    }
    if (+totalCount > +recordsThreshold) {
        updatedCountText = maxTextEle.html().replace('{total_count}', totalCount).replace('{showing_count}', showingCount);
        maxTextEle.html(updatedCountText);
        minTextEle.parent().addClass('d-none');
    } else {
        updatedCountText = minTextEle.html().replace('{total_count}', totalCount).replace('{showing_count}', showingCount);
        minTextEle.html(updatedCountText);
        maxTextEle.parent().addClass('d-none');
    }
}

/**
 * @function
 * Summary: Function to show layoutLoad at page load and while API call process and then show Layout data sections post API success and has data or layoutNone if no data is received
 */
function layoutShiftOnApi() {
    let $layoutLoad = $(document).find('#layout-loading').parents('.layoutcontainer');
    let $layoutData = $(document).find('[id*="layout-data"]').parents('.layoutcontainer');
    let $layoutNone = $(document).find('#layout-none').parents('.layoutcontainer');
    let $layoutError = $(document).find('#layout-error').parents('.layoutcontainer');
    let customTable = $layoutData.find('section.m-custom-table');

    $layoutLoad.length && $layoutLoad.removeClass('d-none bts-d-none');
    $layoutData.length && $layoutData.addClass('table__hidden').removeClass('bts-d-none');
    $layoutNone.length && $layoutNone.addClass('d-none').removeClass('bts-d-none');
    $layoutError.length && $layoutError.addClass('d-none').removeClass('bts-d-none');

    let reCheckTable = setInterval(async function () {
        if (customTable.length == 1) {
            let tableData = customTable.find('table.dataTable');
            if (customTable.hasClass('m-custom-table__content--complete') || customTable.hasClass('m-custom-table__content--error')) {
                clearInterval(reCheckTable);
                readyStateCustomerTableOne(customTable, $layoutLoad, $layoutError, $layoutNone, $layoutData, tableData);
            }
        } else {
            let tableStateVariables = {
                successCount: 0,
                whichLayoutToShow: {
                    data: 0,
                    error: 0,
                    none: 0,
                    load: 0
                }
            };
            tableStateVariables = await readyStateCustomerTableMulti(tableStateVariables, customTable, $layoutError, $layoutNone);

            if (tableStateVariables.successCount == customTable.length) {
                clearInterval(reCheckTable);
                decideWhichLayoutToShow(tableStateVariables.whichLayoutToShow, {
                    $layoutLoad,
                    $layoutData,
                    $layoutNone,
                    $layoutError
                });
            }
        }
    }, 500);
}

/**
 * @function
 * @summary: Function to handle the layout shift when there is one custom table component in the page
 */
function readyStateCustomerTableOne(customTable, $layoutLoad, $layoutError, $layoutNone, $layoutData, tableData) {
    $layoutLoad.addClass('d-none');
    if (customTable.hasClass('m-custom-table__content--error')) {
        $layoutError.length ? $layoutError.removeClass('d-none') : $layoutNone.removeClass('d-none');
    } else if (customTable.hasClass('m-custom-table__content--complete') && tableData.find('.dataTables_empty').length) {
        $layoutNone.length ? $layoutNone.removeClass('d-none') : $layoutData.removeClass('table__hidden');
    } else {
        $layoutData.removeClass('table__hidden');
    }
}

/**
 * @function
 * @summary: Function to handle the layout shift when there are more than one custom table components in the page
 */
async function readyStateCustomerTableMulti(tableStateVariables, customTable, $layoutError, $layoutNone) {
    customTable.each(async (_, table) => {
        if ($(table).hasClass('m-custom-table__content--complete') || $(table).hasClass('m-custom-table__content--error')) {
            tableStateVariables.successCount++;
            if ($(table).hasClass('m-custom-table__content--error')) {
                $layoutError.length ? tableStateVariables.whichLayoutToShow.error++ : tableStateVariables.whichLayoutToShow.none++;
            } else if ($(table).hasClass('m-custom-table__content--complete') && $(table).find('table.dataTable .dataTables_empty').length) {
                $layoutNone.length ? tableStateVariables.whichLayoutToShow.none++ : tableStateVariables.whichLayoutToShow.data++;
            } else {
                tableStateVariables.whichLayoutToShow.data++;
            }
        } else {
            tableStateVariables.successCount = 0;
        }
    });

    return tableStateVariables;
}

/**
 * @function
 * @summary: Function that decides which layout show under multi custom table per page scenario
 */
function decideWhichLayoutToShow(whichLayoutToShow, layoutElements) {
    const { $layoutLoad, $layoutData, $layoutNone, $layoutError } = layoutElements;
    if (whichLayoutToShow.data) {
        $layoutLoad.length && $layoutLoad.addClass('d-none');
        $layoutData.length && $layoutData.removeClass('table__hidden');
        $layoutNone.length && $layoutNone.addClass('d-none');
        $layoutError.length && $layoutError.addClass('d-none');
    } else if (whichLayoutToShow.error) {
        $layoutLoad.length && $layoutLoad.addClass('d-none');
        $layoutData.length && $layoutData.addClass('table__hidden');
        $layoutNone.length && $layoutNone.addClass('d-none');
        $layoutError.length && $layoutError.removeClass('d-none');
    } else if (whichLayoutToShow.none) {
        $layoutLoad.length && $layoutLoad.addClass('d-none');
        $layoutData.length && $layoutData.addClass('table__hidden');
        $layoutNone.length && $layoutNone.removeClass('d-none');
        $layoutError.length && $layoutError.addClass('d-none');
    }
}


/**
 * @function
 * @summary: Function to update the payload of custom table used for product update page to load documents of an entered productId
 */
function updateRequestProductUpdate(data) {
    const productSearchId = getItemParsedSessionStorage('productSearchId');
    if (productSearchId == null) {
        return false;
    }
    data.body['productId'] = productSearchId;
    hideProductPageSection();
    return data;
}

/**
 * @function
 * @summary: Function to hide product update content layout container and show spinner, if needed
 * @param showSpinner - Default true - Decide whether to show spinner or not
 */
function hideProductPageSection(showSpinner = 'true') {
    const productUpdateSection = $('#product-update-content')?.parent();
    if (productUpdateSection?.length) {
        productUpdateSection.addClass('bts-d-none');
        (showSpinner == 'true') && productUpdateSection.before(`
        <div class="a-spinner spinner-component">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        `);
    }
}

/**
 * @function
 * @summary: Function to show product update content layout container and hide spinner, if any
 */
function showProductUpdateSection() {
    const productUpdateSection = $('#product-update-content')?.parent();
    productUpdateSection?.removeClass('bts-d-none')?.parent()?.find('.a-spinner')?.remove();
}

/**
 * @function
 * @summary: Function to handle row level updates for cutom table component used in product update page to load documents of a searched productId
 * @param rowData - Object with row, ESL resposne w.r.t row and row index
 */
function updateCreatedRowProductUpdate(rowData) {
    if (rowData && rowData.data) {
        if (rowData?.data?.pdfAttachmentId || rowData?.data?.xmlAttachmentId) {
            $(rowData.row).attr('data-item-id', rowData.data.pdfAttachmentId ? rowData.data.pdfAttachmentId : rowData.data.xmlAttachmentId);
        }
        $(rowData.row).data(rowData.data);
    }

    if (rowData.resData?.documents?.length == (rowData.index + 1)) {
        let customTableElement;
        const productUpdateContent = $('#product-update-content');
        const productDetailsForm = productUpdateContent?.find('.formcontainer');
        const productDetailsPlaceholdersText = productDetailsForm?.find('.replace-keys-with-values');
        if (productDetailsPlaceholdersText?.length) {
            productDetailsPlaceholdersText.each(async function () {
                const replacedHTML = await ABT.Utils.generateTemplate($(this).html(), rowData.resData);
                $(this).html(replacedHTML);
            });
        }
        productUpdateFormUpdateValues(productUpdateContent, rowData);
        $('section.m-custom-table').each(function () {
            if ($(this).find('input[type="hidden"][name="updateCreatedRow"]').val() == 'updateCreatedRowProductUpdate')
                customTableElement = $(this);
        });
        setTimeout(function () {
            let datePublishedCol = customTableElement.find('thead th[data-name="dateUploaded"]');
            ABT.Utils.selectTableColSorting(datePublishedCol, false, false);
        }, 500);

        sessionStorage.removeItem('productSearchId');
        showProductUpdateSection();
        customTableElement.find('.m-custom-table__table tbody').on('click', '.edit-doc-additional-details a', e => renderDocUpdateModal(e));
    }
    return false;
}

/**
 * @function
 * @summary: Function to prefill response details to the input fields present in the form
 * @param productUpdateContent - Layout container where product attribute update form is rpesent
 * @param rowData - Object with row, ESL resposne w.r.t row and row index
 */
function productUpdateFormUpdateValues(productUpdateContent, rowData) {
    const productDetailsForm = productUpdateContent?.find('.formcontainer');
    const productId = getItemParsedSessionStorage('productSearchId');
    if (productDetailsForm?.length) {
        productDetailsForm.find('.a-input-control, input[type="hidden"]').each(function () {
            const fieldCurrentVal = $(this).val();
            const fieldRespVal = rowData.resData[$(this).attr('name')];
            let fieldNewVal = '';
            if (fieldRespVal?.length) {
                fieldNewVal = fieldRespVal;
            } else if (fieldCurrentVal?.length) {
                fieldNewVal = fieldCurrentVal;
            }
            $(this).val(fieldNewVal);
        });
        productDetailsForm.on('change keyup blur', '.a-input-control', e => validateProductUpdateForm(e));
        productDetailsForm.find('input[type="hidden"][name="itemId"]')?.val(productId);
        if (rowData?.resData?.additionalInfo !== undefined) {
            productDetailsForm.find('input[type="hidden"][name="action-type-insert"]')?.parent()?.remove();
            productDetailsForm.find('input[type="hidden"][name="action-type-update"]')?.attr('name', 'action-type');
        } else {
            productDetailsForm.find('input[type="hidden"][name="action-type-update"]')?.parent()?.remove();
            productDetailsForm.find('input[type="hidden"][name="action-type-insert"]')?.attr('name', 'action-type');
        }
    }

    const productUpdateSearchForm = $('#form-product-details-search');
    const productIdField = productUpdateSearchForm?.find('input[name="productId"]');
    if (productIdField?.length) {
        productIdField.val(productId);
        productIdField[0].dispatchEvent(new Event('change'));
    }
}

/**
 * @function
 * @summary: Function to validate the Product Update form and enable submit button based on data in it
 * @param e Event
 */
function validateProductUpdateForm(e) {
    let formEle = $(e?.delegateTarget);
    let disableSubmit = false;
    formEle.find('.a-input-control').each(function () {
        setTimeout(() => {
            if ($(this)?.val()?.length == 0) {
                $(this).parents('.form-group')?.addClass('validation-error');
                disableSubmit = !disableSubmit;
            } else {
                $(this).parents('.form-group')?.removeClass('validation-error');
            }
        }, 10);
    });
    setTimeout(() => {
        disableSubmit === false && formEle.find('.validation-error')?.removeClass('validation-error');
        const validationFailedFields = formEle.find('.validation-error,.validation-regex,.validation-require');
        if (disableSubmit) {
            formEle.find('.o-form-container__buttons .btn[type="submit"]').attr('disabled', 'disabled');
        } else {
            validationFailedFields?.length == 0 && formEle.find('.o-form-container__buttons .btn[type="submit"]')?.removeAttr('disabled');
        }
    }, 20);
}

/**
 * @function
 * @summary: Function to handle edit link click event on documents table of product update page
 * @param e Event
 */
async function renderDocUpdateModal(e) {
    let rowData = $(e.currentTarget)?.parents('tr');
    const rowDatasets = rowData?.length ? rowData.data() : {};
    let docUpdateModalEle = $($(e.currentTarget)?.parents('.m-popup')?.attr('data-target'));
    let documentUpdateFormEle = docUpdateModalEle.find('#form-document-details-update');
    let placeholderText = documentUpdateFormEle.find('.replace_placeholders_with_tablecontent');

    // Replace template values in text component
    if (placeholderText?.length) {
        if (placeholderText.attr('data-template-html')?.length) {
            placeholderText.html(placeholderText.attr('data-template-html'));
        } else {
            placeholderText.attr('data-template-html', placeholderText.html().trim());
        }
        placeholderText.html(await ABT.Utils.generateTemplate(placeholderText.html(), rowDatasets));
    }

    // Replace input fields, text reas and hidden field values with table content
    documentUpdateFormEle.find('.a-input-control,input[type="hidden"]').each(function () {
        const fieldNewVal = rowDatasets[$(this).attr('name')];
        ![null, undefined].includes(fieldNewVal) && $(this)?.val(fieldNewVal);
    });
    if (rowDatasets?.additionalInfo !== undefined) {
        documentUpdateFormEle.find('input[type="hidden"][name="action-type-insert"]')?.parent()?.remove();
        documentUpdateFormEle.find('input[type="hidden"][name="action-type-update"]')?.attr('name', 'action-type');
    } else {
        documentUpdateFormEle.find('input[type="hidden"][name="action-type-update"]')?.parent()?.remove();
        documentUpdateFormEle.find('input[type="hidden"][name="action-type-insert"]')?.attr('name', 'action-type');
        documentUpdateFormEle.find('[name="additionalInfo"]')?.val('');
    }
    documentUpdateFormEle.parent().removeClass('bts-d-none');
}

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (ABT.Utils.isOnPublish()) {
            /* Call laoutshiftOnApi function on product description page load */
            layoutShiftOnApi();

            /* VSI Side bar modal mappping */
            $('#vsiSidebar')?.removeClass('bts-d-none');
            $('#vsiSidebar')?.parents('.responsivegrid')?.find('.text')?.removeClass('bts-d-none');
            const vsiVulIDs = $(document).find('input[name="vsiVulnerabilityIDs"]').val()?.split(',');
            vsiVulIDs?.forEach(id => {
                let vsiVulSection = $(`#${id}`);
                vsiVulSection.addClass('sidebar-modal');
                vsiVulSection.children().wrapAll('<div class="modal-content"></div>');
                vsiVulSection.find('h1,h2,h3,h4,h5,h6')?.addClass('modal-title');
                $(`#vsiSidebar`).on('click', `.${id}`, () => {
                    vsiVulSection.addClass('active');
                });
            });
            $(document).find('.vsi-sidebar-body').clone(true, true).appendTo('#vsiSidebar').addClass('d-none vsi-sidebar-body-template');

            /* Open VSI Tab in product description page based on URL hash value */
            const urlHash = window.location.hash;
            let tabsSection = $(document).find('.tabs .cmp-tabs__tablist');

            if (urlHash == '#vsi' && tabsSection.length) {
                setTimeout(() => {
                    tabsSection.find('.cmp-tabs__tab:last-child')[0].click();
                }, 200);
            }

            // Apply click event for "Vulnerabilities" navigation link to track productID
            const vsiLink = $(document).find('a.vsi-link'),
                productId = $(document).find('input[type="hidden"][name="PRODUCT-ID"]')?.attr('value');
            if (vsiLink.length && productId?.length) {
                vsiLink.parents('.text').on('click', vsiLink, function () {
                    localStorage.setItem('vsiFilters', `{"productId":"${productId}"}`);
                    localStorage.setItem('noVsiTable', 'true');
                });
            }

            // Remove stored values if page is not Vulnerabilities
            if ($(document).find('input[name="ACTION"][value="vulnerabilities-search"]').length == 0) {
                localStorage.removeItem('vsiFilters');
                localStorage.removeItem('noVsiTable');
            }

            /**
             * change text for Mark all read button
            */
            $('#selectAllRowCheckbox').on('change', function () {
                if (this.checked) {
                    $("#selectedRowCallbackBtn").text("Mark All as Read");
                }
                else {
                    $("#selectedRowCallbackBtn").text("Mark as Read");
                }
            });
        }
    });
})();