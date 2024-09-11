const $pdfViewer = (function () {
    const pdfSrc = '/content/dam/av/eifu/pdfjs/pdfjs22228/web/viewer.html';

    //check if pdf container available
    const checkIfPdfViewerPage = function () {
        const isPdfPage = $('#pdfContainer').length ? true : false;
        return isPdfPage;
    }

    //set data for pdf opened
    const setLastPdfOpened = function (pdfData) {
        if (!pdfData) {
            return false;
        }
        let pdf = {
            title: pdfData.title,
            language: pdfData.language,
            country: pdfData.country,
            isHcp: pdfData.isHcp,
            role: pdfData.role,
            category: pdfData.category,
            subcategory: pdfData.subcategory,
            permanentid: pdfData.permanentid,
            clickableuri: pdfData.clickableuri,
            documentpartnumber: pdfData.documentpartnumber,
            ontime: pdfData.ontime,
            productname: pdfData.productname,
            productrevnumber: pdfData.productrevnumber,
            versionid: pdfData.versionid,
            previousVersions: pdfData.previousVersions ? pdfData.previousVersions : null,
            relatedresource: pdfData.relatedresource ? pdfData.relatedresource : null,
        }
        if (window.location.href.indexOf("manuals") != -1) {
            pdf = {
                'productname': pdfData.productname,
                'title': pdfData.title,
                'clickableuri': pdfData.clickableuri,
                'category': pdfData.category,
                'ontime': pdfData.ontime,
                'subcategory': pdfData.subcategory,
                'documentpartnumber': pdfData.prtnbr,
                'permanentid': pdfData.permanentid,
                'productrevnumber': pdfData.productrevnumber,
                'country': $search.getLocalStorage('selectedCountry'),
                'language': $search.getLocalStorage('curr-lang'),
                'isHcp': $search.getLocalStorage('isHCP'),
                'role': pdfData.role,
                'relatedresource': pdfData.relatedresource,
                'versionid': pdfData.versionid,
                'previousVersions': pdfData.previousVersions,
                'effectivebegindate': pdfData.effectivebegindate,
                'sapproductdescriptionlist': pdfData.sapproductdescriptionlist,
                'sapproductmodelnumberlist': pdfData.sapproductmodelnumberlist,
                'url': pdfData.url,
                'revisiontype': pdfData.revisiontype

            }
        }
        $search.setLocalStorage('lastPdfOpened', pdf);
        return pdf;
    }
    //download pdf start
    function downloadPdfFile(url) {
        let pdfUrl = url;
        fetch(url).then(resp => {
            return resp.blob();
        }).then(blob => {
            const newUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = newUrl;
            pdfUrl = pdfUrl.split('/');
            pdfUrl = pdfUrl[pdfUrl.length - 1];
            const fileName = pdfUrl;
            a.download = decodeURIComponent(fileName);
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(newUrl);
            a.remove();
        })
    }
    //download pdf end
    //call for downloadable link and save in local
    const openPdfOnLoad = function (pdf) {
        const pdfPrintId = $('#pdfContainer').find('iframe');
        pdf = pdf ? pdf : $search.getLocalStorage('lastPdfOpened');
        const pdfUrl = pdf && pdf.clickableuri ? decodeURIComponent(pdf.clickableuri) : null;
        if (pdfUrl) {
            $search.toggleLoader(true);
            initCurrentVersionLink();
            // ajax call to download directly
            fetch(pdfUrl)
                .then(resp => resp.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    pdf.pdfUrl = url;
                    $search.setLocalStorage('lastPdfOpened', pdf);
                    const iframeparent = pdfPrintId.parent();//added for firefox backbutton
                    pdfPrintId.remove();//added for firefox backbutton
                    pdfPrintId.attr('src', pdfSrc);
                    iframeparent.append(pdfPrintId);//added for firefox backbutton
                    setTimeout(function () {
                        $search.toggleLoader();
                        setContactModals();
                        console.log('file has opened successfully!');
                        $("iframe").ready(function () {
                            const download_btn = $("iframe").contents().find("#download");
                            download_btn[0].replaceWith(download_btn[0].cloneNode(true));
                            $($("iframe").contents().find("#download")[0]).click(function () {
                                downloadPdfFile(pdfUrl);
                            });
                            const s_download_btn = $("iframe").contents().find("#secondaryDownload");
                            s_download_btn[0].replaceWith(s_download_btn[0].cloneNode(true));
                            $($("iframe").contents().find("#secondaryDownload")[0]).click(function () {
                                downloadPdfFile(pdfUrl);
                            });
                        });
                    }, 1500);
                })
                .catch(() => {
                    console.log('opening file failed!! No file found.');
                    $search.toggleLoader();
                })
        }
    }
    //initiate navigation header for pdf viewer
    const initCurrentVersionLink = function () {
        const pdfOpenParams = $search.getLocalStorage('lastPdfOpened');
        if (pdfOpenParams && pdfOpenParams.clickableuri) {
            $('#currentVersionPdf').attr('href', 'javascript:;');
            $('#currentVersionPdf').attr('curr-url', pdfOpenParams.clickableuri);
        }
        setPreviousVersionDropDowns();
        setFavoritesInPdf();
        setShareDetails();
    }

    //set favorites in pdf details page
    const setFavoritesInPdf = function () {
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        const favorite = $favorites.getFavorites();
        let obj = favorite.find(o => o.permanentid === $search.getName(pdfDet.permanentid).id &&
            o.versionid === pdfDet.versionid);
        if (obj && obj.permanentid) {
            $('#addedFavoriteIconDesktop').closest('.button.link').removeClass('d-none');
            $('#favoriteIconDesktop').closest('.button.link').addClass('d-none');
        }
        else {
            $('#addedFavoriteIconDesktop').closest('.button.link').addClass('d-none');
            $('#favoriteIconDesktop').closest('.button.link').removeClass('d-none');
        }
    }

    //set share in pdf details page
    const setShareDetails = function () {
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        if (pdfDet && pdfDet.documentpartnumber) {
            $('#shareIconDesktop, #shareTextMobile').closest('.button.link').removeClass('d-none');
            $('#shareIconDesktop, #shareTextMobile').attr('data-prtnbr', pdfDet.documentpartnumber);
            $('#shareIconDesktop, #shareTextMobile').attr('data-subject', pdfDet.title);
        }
        else {
            $('#shareIconDesktop, #shareTextMobile').closest('.button.link').addClass('d-none');
        }
    }

    //Initiate previous versions
    const setPreviousVersionDropDowns = function () {
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        if (!pdfDet || !(pdfDet && pdfDet.previousVersions && pdfDet.previousVersions.length)) {
            $('fieldset#previousVersionsPdf-options').addClass('d-none');
            $('fieldset#previousVersionsPdf-options').css({ 'display': 'none' });
            return false;
        }
        let listCon = $templates.fieldsetOptionsContainer();

        if (listCon.length) {
            $('fieldset#previousVersionsPdf-options').removeClass('d-none');
            $('fieldset#previousVersionsPdf-options').css({ 'display': 'block !important' });
            listCon = $.parseHTML(listCon);
            const optionsVersions = $(listCon).clone();
            const parent = $('label[for="previousVersionsPdf"]').closest('.a-dropdown__container');

            if (pdfDet && pdfDet.previousVersions.length) {
                let isPrevVersion = false;
                pdfDet.previousVersions.map((op) => {
                    const onTime = op.ontime ? new Date(op.ontime) : op.ontime;
                    const revNum = op.productrevnumber ? '|[' + op.productrevnumber + ']' : '';
                    const revTime = $search.dateToYMD(onTime);

                    let newOntimepdf;
                    if (op.effectivebegindate) {
                        const effectivebegindatepdf = op.effectivebegindate;
                        const displaydatepdf = new Date(effectivebegindatepdf);
                        newOntimepdf = $search.dateToYMD(displaydatepdf);
                    }
                    else {
                        newOntimepdf = revTime + revNum;
                    }

                    let option;
                    if (pdfDet.ontime !== op.ontime) {
                        isPrevVersion = true;
                        option = `<option class="prev-version-option-link"
                                    value="${$search.getName(op.clickableuri).id}">${newOntimepdf}
                                    </option>`;
                    }

                    option = $.parseHTML(option);
                    if (parent.find('.fieldset_option_container').length) {
                        $(option).appendTo($(parent).find('.fieldset_option_container'));
                    }
                    else {
                        $(option).appendTo(optionsVersions);
                    }
                    return true;
                });
                if (!isPrevVersion) {
                    $('fieldset#previousVersionsPdf-options').addClass('d-none');
                    $('fieldset#previousVersionsPdf-options').css({ 'display': 'none' });
                }
            }

            if (parent) {
                let title = parent.find('.a-dropdown__title').text();
                parent.find('.a-dropdown__field').addClass('d-none');
                if (!parent.find('.fieldset_option_container').length) {
                    parent.append(optionsVersions);
                }
                title = title.split('*')[0];
                parent.find('.fieldset_option_list_default').text(title ? title : $globals.detailsPagePreviousVersionText);
                parent.find('.fieldset_option_list_default').css({ "text-transform": "uppercase" });

            }
        }
    }

    //set contact modals
    const setContactModals = function (parent) {
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        if (!pdfDet || !(pdfDet && pdfDet.relatedresource)) {
            $('#contactTextMobile').addClass('d-none');
            $('#contactIconDesktop, #OrderPhysicalCopy, #contactTextMobile').css({ 'display': 'none !important' });
            return false;
        }
        const iframe = `<iframe src="${pdfDet.relatedresource}"></iframe>`;
        if (!parent) {
            const contactModalDesktop = $('#contactIconDesktop-modal').find('.modal-body');
            const contactModalMobile = $('#contactTextMobile-modal').find('.modal-body');
            const orderCopyModal = $('#OrderPhysicalCopy-modal').find('.modal-body');

            if (contactModalDesktop.length) {
                contactModalDesktop.find('.xfpage').remove();
                contactModalDesktop.append(iframe);
            }
            if (contactModalMobile.length) {
                contactModalMobile.find('.xfpage').remove();
                contactModalMobile.append(iframe);
            }
            if (orderCopyModal.length) {
                orderCopyModal.find('.xfpage').remove();
                orderCopyModal.append(iframe);
            }
        }
        else {
            if (!parent.find('iframe').length) {
                parent.find('.modal-body').find('.xfpage').remove();
                parent.find('.modal-body').append(iframe);
            }
        }
    }

    return {
        pdfSrc: pdfSrc,
        checkIfPdfViewerPage: checkIfPdfViewerPage,
        openPdfOnLoad: openPdfOnLoad,
        setLastPdfOpened: setLastPdfOpened,
        setContactModals: setContactModals
    }
})();

//on load of pdfViewer
$(document).ready(function () {
    if ($pdfViewer.checkIfPdfViewerPage()) {
        const pdfUrl = $search.getLocalStorage('lastPdfOpened');
        $pdfViewer.openPdfOnLoad(pdfUrl);
    }
});

//on click - favorite options
$(document).on('click', '#addedFavoriteIconDesktop, #favoriteIconDesktop, #favoriteTextMobile', function (e) {
    e.preventDefault();
    const data = $search.getLocalStorage('lastPdfOpened');
    if ($(this).attr('id') === 'favoriteTextMobile') {
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        const favorite = $favorites.getFavorites();
        // commented for mobile view favourate prod was not added const favorite = $search.getLocalStorage('favoriteProducts');
        let obj = favorite.find(o => o.permanentid === $search.getName(pdfDet.permanentid).id);
        if (obj && obj.permanentid) {
            $favorites.removeFavourite(data);
        }
        else {
            $favorites.setFavorites(data);
        }
    }
    else if ($(this).attr('id') === 'addedFavoriteIconDesktop') {
        $('#addedFavoriteIconDesktop').closest('.button.link').addClass('d-none');
        $('#favoriteIconDesktop').closest('.button.link').removeClass('d-none');
        $favorites.removeFavourite(data);
    }
    else {
        $('#addedFavoriteIconDesktop').closest('.button.link').removeClass('d-none');
        $('#favoriteIconDesktop').closest('.button.link').addClass('d-none');
        $favorites.setFavorites(data);
    }
})

//on click of share icon
$(document).on('click', '#shareIconDesktop, #shareTextMobile', function (e) {
    e.preventDefault();

    const prtnbr = $(this).attr('data-prtnbr');
    if (prtnbr) {
        const subject = $(this).attr('data-subject');
        const langCode = $globals.languagesList[$search.getLocalStorage('curr-lang')] ?
            $globals.languagesList[$search.getLocalStorage('curr-lang')] : $globals.defaultLanguage;
        const body = location.origin + "/" + langCode + "/index.html?product\x3d" + prtnbr;
        window.open(`mailto:?subject=${subject ? subject : prtnbr}&body=${encodeURIComponent(body)}`);
    }
});

//on click - more options //Changes for toggle on click
/* $(document).on('click','#moreOptionsIcon', function(e){
    e.preventDefault();
    if($('#section-detailsMoreOptions').is(':visible')){
        $('#section-detailsMoreOptions').css({'display':'none'});
        $('#section-detailsMoreOptions').slideDown('slow');
    }
    else{
        $('#section-detailsMoreOptions').css({'display':'block'});
    }
}); */
$(document).on('click', '#moreOptionsIcon', function (e) {
    e.preventDefault();
    $('#section-detailsMoreOptions').css({ 'display': 'none' });
    $('#section-detailsMoreOptions').slideDown('slow');

});
$(document).mouseup(function (e) {
    var container = $("#section-detailsMoreOptions");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});
//download pdf start
function downloadPdfFile(url) {
    let pdfUrl = url;
    fetch(url).then(resp => {
        return resp.blob();
    }).then(blob => {
        const newUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = newUrl;
        pdfUrl = pdfUrl.split('/');
        pdfUrl = pdfUrl[pdfUrl.length - 1];
        const fileName = pdfUrl;
        a.download = decodeURIComponent(fileName);
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(newUrl);
        a.remove();
    })
}
//download pdf end
//change of versions
$(document).on('change', 'label[for="previousVersionsPdf"] ~ select', function (e) {
    e.preventDefault();
    const url = $(this).find('option:selected').val() ? decodeURIComponent($(this).find('option:selected').val()) : null;
    const pdfPrintId = $('#pdfContainer').find('iframe');
    const pdf = $search.getLocalStorage('lastPdfOpened');
    // ajax call to download directly
    if (url) {
        $search.toggleLoader(true);
        fetch(url)
            .then(resp => resp.blob())
            .then(blob => {
                const newUrl = window.URL.createObjectURL(blob);
                pdf.pdfUrl = newUrl;
                $search.setLocalStorage('lastPdfOpened', pdf);
                pdfPrintId.attr('src', $pdfViewer.pdfSrc);
                $search.toggleLoader();
                console.log('file has opened successfully!');
                setTimeout(function () {
                    $("iframe").ready(function () {
                        const download_btn = $("iframe").contents().find("#download");
                        download_btn[0].replaceWith(download_btn[0].cloneNode(true));
                        $($("iframe").contents().find("#download")[0]).click(function () {
                            downloadPdfFile(url);
                        });
                        const s_download_btn = $("iframe").contents().find("#secondaryDownload");
                        s_download_btn[0].replaceWith(s_download_btn[0].cloneNode(true));
                        $($("iframe").contents().find("#secondaryDownload")[0]).click(function () {
                            downloadPdfFile(url);
                        });
                    });
                }, 1500);
            })
            .catch(() => {
                console.log('opening file failed!! No file found.');
                $search.toggleLoader();
            })
    }
});

//on click -- current version
$(document).on('click', '#currentVersionPdf', function (e) {
    e.preventDefault();
    const url = $(this).attr('curr-url') ? decodeURIComponent($(this).attr('curr-url')) : null;
    const pdfPrintId = $('#pdfContainer').find('iframe');
    const pdf = $search.getLocalStorage('lastPdfOpened');
    // ajax call to download directly
    if (url) {
        $search.toggleLoader(true);
        fetch(url)
            .then(resp => resp.blob())
            .then(blob => {
                const newUrl = window.URL.createObjectURL(blob);
                pdf.pdfUrl = newUrl;
                $search.setLocalStorage('lastPdfOpened', pdf);
                pdfPrintId.attr('src', $pdfViewer.pdfSrc);
                $('#previousVersionsPdf-options').find('.fieldset_option_container').prop("selectedIndex", 0).val();
                $search.toggleLoader();
                console.log('file has opened successfully!');
                setTimeout(function () {
                    $("iframe").ready(function () {
                        const download_btn = $("iframe").contents().find("#download");
                        download_btn[0].replaceWith(download_btn[0].cloneNode(true));
                        $($("iframe").contents().find("#download")[0]).click(function () {
                            downloadPdfFile(url);
                        });
                        const s_download_btn = $("iframe").contents().find("#secondaryDownload");
                        s_download_btn[0].replaceWith(s_download_btn[0].cloneNode(true));
                        $($("iframe").contents().find("#secondaryDownload")[0]).click(function () {
                            downloadPdfFile(url);
                        });
                    });
                }, 1500);
            })
            .catch(() => {
                console.log('opening file failed!! No file found.');
                $search.toggleLoader();
            })
    }
});


//show dynamic contact modals
$(document).on('click', '#contactIconDesktop, #contactTextMobile, #OrderPhysicalCopy', function () {
    //alert('clicked on modal button');
    setTimeout(function () {
        const id = $(this).attr('id') + '-modal';
        $pdfViewer.setContactModals($(id));
    }, 500);
});

$("#OrderPhysicalCopy").on("click", function () {
    let iframe = $('#OrderPhysicalCopy-modal').find('iframe');
    $(iframe).attr('id', 'iframecustomId');
    let iFramehead = $("#iframecustomId").contents().find("head");
    let Iframecss01 = '<style> p{ color: #62666a; }</style>';
    let Iframecss02 = '<style> p{ font-size: 16px; }</style>';
    let Iframecss03 = '<style> p{ font-family: Calibri; }</style>';
    let Iframecss04 = '<style> p{ line-height: 20px; }</style>';
    let Iframecss06 = '<style> .root.parsys{ display: inline-flex; }</style>';
    let Iframecss07 = '<style> .root.parsys{ justify-content: space-between; }</style>';
    let Iframecss08 = '<style> .root.parsys{ width: 100%; }</style>';
    let Iframecss09 = '<style> .contact-us-mailto{ color: #004f71; }</style>';
    let Iframecss10 = '<style> .contact-us-mailto{ font-weight: 700 !important; }</style>';
    let Iframecss11 = '<style> .contact-us-mailto{ cursor: pointer; }</style>';
    let Iframecss15 = '<style> .text p:first-of-type{ color: #222731; }</style>';
    let Iframecss16 = '<style> p { margin-bottom: 0px; }</style>';
    let Iframecss24 = '<style> .root.parsys p a{ color: #004f71 !important; }</style>';
    $(iFramehead).append(Iframecss01);
    $(iFramehead).append(Iframecss02);
    $(iFramehead).append(Iframecss03);
    $(iFramehead).append(Iframecss04);
    $(iFramehead).append(Iframecss06);
    $(iFramehead).append(Iframecss07);
    $(iFramehead).append(Iframecss08);
    $(iFramehead).append(Iframecss09);
    $(iFramehead).append(Iframecss10);
    $(iFramehead).append(Iframecss11);
    $(iFramehead).append(Iframecss15);
    $(iFramehead).append(Iframecss16);
    $(iFramehead).append(Iframecss24);
    if ($(window).width() < 712) {
        let Iframecss19 = '<style> p{ text-align: center; }</style>';
        let Iframecss20 = '<style> .root.parsys{ display: block ; }</style>';
        let Iframecss21 = '<style>  body{ margin-right: 0 !important; }</style>';
        let Iframecss23 = '<style> .text p:first-of-type{ margin-top: 10px; }</style>';
        $(iFramehead).append(Iframecss19);
        $(iFramehead).append(Iframecss20);
        $(iFramehead).append(Iframecss21);
        $(iFramehead).append(Iframecss23);
    }
    $(window).resize(function () {
        if ($(window).width() > 768) {
            let Iframecss13 = '<style> body{ margin-right: 120px; }</style>';
            let Iframecss17 = '<style> .root.parsys{ display: inline-flex; }</style>';
            let Iframecss18 = '<style> .root.parsys{ justify-content: space-between; }</style>';
            let Iframecss22 = '<style> p{ text-align: left; }</style>';
            $(iFramehead).append(Iframecss13);
            $(iFramehead).append(Iframecss17);
            $(iFramehead).append(Iframecss18);
            $(iFramehead).append(Iframecss22);
        }
        if ($(window).width() < 712) {
            let Iframecss05 = '<style> p{ text-align: center; }</style>';
            let Iframecss12 = '<style> .root.parsys{ display: block ; }</style>';
            let Iframecss14 = '<style>  body{ margin-right: 0 !important; }</style>';
            $(iFramehead).append(Iframecss05);
            $(iFramehead).append(Iframecss12);
            $(iFramehead).append(Iframecss14);
        }

    });
});

$("#contactIconDesktop").on("click", function () {
    let contactIconIframe = $('#contactIconDesktop-modal').find('iframe');
    $(contactIconIframe).attr('id', 'contactIconCustomId');
    let contactIconHead = $("#contactIconCustomId").contents().find("head");
    let Iframecss01 = '<style> p{ color: #62666a; }</style>';
    let Iframecss02 = '<style> p{ font-size: 16px; }</style>';
    let Iframecss03 = '<style> p{ font-family: Calibri; }</style>';
    let Iframecss04 = '<style> p{ line-height: 20px; }</style>';
    let Iframecss06 = '<style> .root.parsys{ display: inline-flex; }</style>';
    let Iframecss07 = '<style> .root.parsys{ justify-content: space-between; }</style>';
    let Iframecss08 = '<style> .root.parsys{ width: 100%; }</style>';
    let Iframecss09 = '<style> .contact-us-mailto{ color: #004f71; }</style>';
    let Iframecss10 = '<style> .contact-us-mailto{ font-weight: 700; }</style>';
    let Iframecss11 = '<style> .contact-us-mailto{ cursor: pointer; }</style>';
    let Iframecss14 = '<style> .text p:first-of-type{ color: #222731; }</style>';
    let Iframecss15 = '<style> p{ margin-bottom: 0px; }</style>';
    let Iframecss16 = '<style> .root.parsys p a{ color: #004f71 !important; }</style>';

    $(contactIconHead).append(Iframecss01);
    $(contactIconHead).append(Iframecss02);
    $(contactIconHead).append(Iframecss03);
    $(contactIconHead).append(Iframecss04);
    $(contactIconHead).append(Iframecss06);
    $(contactIconHead).append(Iframecss07);
    $(contactIconHead).append(Iframecss08);
    $(contactIconHead).append(Iframecss09);
    $(contactIconHead).append(Iframecss10);
    $(contactIconHead).append(Iframecss11);
    $(contactIconHead).append(Iframecss14);
    $(contactIconHead).append(Iframecss15);
    $(contactIconHead).append(Iframecss16);

    if ($(window).width() < 712) {
        let Iframecss12 = '<style> .root.parsys{ display: block !important; }</style>';
        $(contactIconHead).append(Iframecss12);
    }
    if ($(window).width() > 768) {
        let Iframecss13 = '<style> body{ margin-right: 120px; }</style>';
        $(contactIconHead).append(Iframecss13);
    }

});

$("#contactTextMobile").on("click", function () {

    let iframeContactTextMobile = $('#contactTextMobile-modal').find('iframe');
    $(iframeContactTextMobile).attr('id', 'contactTextMobileIframe');
    let contactIconText = $("#contactTextMobileIframe").contents().find("head");
    let Iframecss01 = '<style> p{ color: #62666a; }</style>';
    let Iframecss02 = '<style> p{ font-size: 16px; }</style>';
    let Iframecss03 = '<style> p{ font-family: Calibri; }</style>';
    let Iframecss04 = '<style> p{ line-height: 20px; }</style>';
    let Iframecss06 = '<style> .root.parsys{ display: inline-flex; }</style>';
    let Iframecss07 = '<style> .root.parsys{ justify-content: space-between; }</style>';
    let Iframecss08 = '<style> .root.parsys{ width: 100%; }</style>';
    let Iframecss09 = '<style> .contact-us-mailto{ color: #004f71; }</style>';
    let Iframecss10 = '<style> .contact-us-mailto{ font-weight: 700; }</style>';
    let Iframecss11 = '<style> .contact-us-mailto{ cursor: pointer; }</style>';
    let Iframecss16 = '<style> .text p:first-of-type{ color: #222731; }</style>';
    let Iframecss18 = '<style> p{ margin-bottom: 0px; }</style>';
    let Iframecss23 = '<style> .root.parsys p a{ color: #004f71 !important; }</style>';
    $(contactIconText).append(Iframecss01);
    $(contactIconText).append(Iframecss02);
    $(contactIconText).append(Iframecss03);
    $(contactIconText).append(Iframecss04);
    $(contactIconText).append(Iframecss06);
    $(contactIconText).append(Iframecss07);
    $(contactIconText).append(Iframecss08);
    $(contactIconText).append(Iframecss09);
    $(contactIconText).append(Iframecss10);
    $(contactIconText).append(Iframecss11);
    $(contactIconText).append(Iframecss16);
    $(contactIconText).append(Iframecss18);
    $(contactIconText).append(Iframecss23);
    if ($(window).width() < 712) {
        let Iframecss19 = '<style> .root.parsys{ display: block; }</style>';
        let Iframecss20 = '<style> p{ text-align: center; }</style>';
        let Iframecss21 = '<style> body{ margin-right: 20px !important; }</style>';
        let Iframecss22 = '<style> .text p:first-of-type{ margin-top: 10px; }</style>';
        $(contactIconText).append(Iframecss19);
        $(contactIconText).append(Iframecss20);
        $(contactIconText).append(Iframecss21);
        $(contactIconText).append(Iframecss22);
    }
    $(window).resize(function () {
        if ($(window).width() < 712) {
            let Iframecss12 = '<style> .root.parsys{ display: block; }</style>';
            let Iframecss13 = '<style> p{ text-align: center; }</style>';
            let Iframecss15 = '<style> body{ margin-right: 20px !important; }</style>';
            $(contactIconText).append(Iframecss12);
            $(contactIconText).append(Iframecss13);
            $(contactIconText).append(Iframecss15);
        }

        if ($(window).width() > 768) {
            let Iframecss14 = '<style> body{ margin-right: 120px !important; }</style>';
            let Iframecss17 = '<style> .root.parsys{ display: inline-flex; }</style>';
            let Iframecss22 = '<style> p{ text-align: left; }</style>';
            $(contactIconText).append(Iframecss14);
            $(contactIconText).append(Iframecss17);
            $(contactIconText).append(Iframecss22);
        }


    });

});
$("#currentVersionPdf").on("click", function () {
    $(".a-link--icon").css({ "border-bottom": "3px solid #004f71" })
    $(".drop-down").css({ "border-bottom": "none" })
});

$(document).on("change", "#previousVersionsPdf-options .fieldset_option_container", function () {
    $(".drop-down").css({ "border-bottom": "3px solid #004f71" })
    $(".a-link--icon").css({ "border-bottom": "none" })
});