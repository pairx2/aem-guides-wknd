const $pdfViewer = (function(){ 
    const pdfSrc = '/content/dam/ardx/eifu/pdfjs/pdfjs22228/web/viewer.html';

    //check if pdf container available
    const checkIfPdfViewerPage = function(){
        const isPdfPage = $('#pdfContainer').length ? true : false;
        return isPdfPage;
    }

    //set data for pdf opened
    const setLastPdfOpened = function(pdfData){
        if(!pdfData){
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
            brand: pdfData.brand ? pdfData.brand : "",
            legalmanufacturer: pdfData.legalmanufacturer ? pdfData.legalmanufacturer : "",
            productcode: pdfData.productcode ? pdfData.productcode : "",
            lot: pdfData.lot ? pdfData.lot : "",
            documenttype: pdfData.documenttype ? pdfData.documenttype : "",
        }
        $search.setLocalStorage('lastPdfOpened', pdf);
        return pdf;
    }

    //set data for pdf opened vial url or back button
    const setLastAndSeconLastPdfOpened = function(pdfData){
        if(!pdfData){
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
            brand: pdfData.brand ? pdfData.brand : "",
            legalmanufacturer: pdfData.legalmanufacturer ? pdfData.legalmanufacturer : "",
            productcode: pdfData.productcode ? pdfData.productcode : "",
            lot: pdfData.lot ? pdfData.lot : "",
            documenttype: pdfData.documenttype ? pdfData.documenttype : "",
        }
        $search.setLocalStorage('lasttolastPdfOpened', $search.getLocalStorage('lastPdfOpened'));
        $search.setLocalStorage('lastPdfOpened', pdf);
        return pdf;
    }

    //call for downloadable link and save in local
    const openPdfOnLoad = function(pdf){
        const pdfPrintId = $('#pdfContainer').find('iframe');
        pdf = pdf ? pdf : $search.getLocalStorage('lastPdfOpened');
        const pdfUrl = pdf && pdf.clickableuri ? decodeURIComponent(pdf.clickableuri) : null;
        if(pdfUrl){
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
                setTimeout(function(){
                    $search.toggleLoader();
                    setContactModals();
                    console.log('file has opened successfully!');
                }, 1500);
            })
            .catch(() => {
                console.log('opening file failed!! No file found.');
                $search.toggleLoader();
            })
        }
    }

    //initiate navigation header for pdf viewer
    const initCurrentVersionLink = function(){
        const pdfOpenParams = $search.getLocalStorage('lastPdfOpened');
        if(pdfOpenParams && pdfOpenParams.clickableuri){
            $('#currentVersionPdf').attr('href', 'javascript:;');
            $('#currentVersionPdf').attr('curr-url', pdfOpenParams.clickableuri);
        }
        setPreviousVersionDropDowns();
        setFavoritesInPdf();
        setShareDetails();
    }

    //set favorites in pdf details page
    const setFavoritesInPdf = function(){
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        const favorite = $favorites.getFavorites();
        let obj = favorite.find(o => o.permanentid === $search.getName(pdfDet.permanentid).id);
        if(obj && obj.permanentid){
            $('#addedFavoriteIconDesktop').closest('.button.link').removeClass('d-none');
            $('#favoriteIconDesktop').closest('.button.link').addClass('d-none');
        }
        else{
            $('#addedFavoriteIconDesktop').closest('.button.link').addClass('d-none');
            $('#favoriteIconDesktop').closest('.button.link').removeClass('d-none');
        }
    }

    //set share in pdf details page
    const setShareDetails = function(){
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        if(pdfDet && pdfDet.documentpartnumber){
            $('#shareIconDesktop, #shareTextMobile').closest('.button.link').removeClass('d-none');
            $('#shareIconDesktop, #shareTextMobile').attr('data-prtnbr', pdfDet.documentpartnumber);
            $('#shareIconDesktop, #shareTextMobile').attr('data-subject', pdfDet.title);
        }
        else{
            $('#shareIconDesktop, #shareTextMobile').closest('.button.link').addClass('d-none');
        }
    }

    //Initiate previous versions
    const setPreviousVersionDropDowns = function(){
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        if(!pdfDet || !(pdfDet && pdfDet.previousVersions && pdfDet.previousVersions.length)){
            $('fieldset#previousVersionsPdf-options').addClass('d-none');
            $('fieldset#previousVersionsPdf-options').css({'display': 'none'});
            return false;
        }
        let listCon = $templates.fieldsetOptionsContainer();
        
        if(listCon.length){
            $('fieldset#previousVersionsPdf-options').removeClass('d-none');
            $('fieldset#previousVersionsPdf-options').css({'display': 'block !important'});
            listCon = $.parseHTML(listCon);
            const optionsVersions = $(listCon).clone();
            const parent = $('label[for="previousVersionsPdf"]').closest('.a-dropdown__container');
        
            if(pdfDet && pdfDet.previousVersions.length){
                let isPrevVersion = false;
                pdfDet.previousVersions.map((op) => {
                    const onTime = op.ontime ? new Date(op.ontime) : op.ontime;
                    const revNum = op.productrevnumber ? '|['+op.productrevnumber+']' : '';
                    const revTime = $search.dateToYMD(onTime);
                    let option;
                    if(pdfDet.ontime !== op.ontime){
                        isPrevVersion = true;
                        option = `<option class="prev-version-option-link"
                                    value="${$search.getName(op.clickableuri).id}">${revTime+revNum}
                                </option>`;
                    }

                    option = $.parseHTML(option);
                    if(parent.find('.fieldset_option_container').length){
                        $(option).appendTo($(parent).find('.fieldset_option_container'));
                    }
                    else{
                        $(option).appendTo(optionsVersions);
                    }
                    return true;
                });
                if(!isPrevVersion){
                    $('fieldset#previousVersionsPdf-options').addClass('d-none');
                    $('fieldset#previousVersionsPdf-options').css({'display': 'none'});
                }
            }

            if(parent){
                let title = parent.find('.a-dropdown__title').text();
                parent.find('.a-dropdown__field').addClass('d-none');
                if(!parent.find('.fieldset_option_container').length){
                    parent.append(optionsVersions);
                }
                title = title.split('*')[0];
                parent.find('.fieldset_option_list_default').text(title ? title : $globals.detailsPagePreviousVersionText);
            }
        }
    }

    //set contact modals
    const setContactModals = function(parent){
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        if(!pdfDet || !(pdfDet && pdfDet.relatedresource)){
            $('#contactTextMobile').addClass('d-none');
            $('#contactIconDesktop, #OrderPhysicalCopy, #contactTextMobile').css({'display': 'none !important'});
            return false;
        }
        const iframe = `<iframe src="${pdfDet.relatedresource}"></iframe>`;
        if(!parent){
            const contactModalDesktop = $('#contactIconDesktop-modal').find('.modal-body');
            const contactModalMobile = $('#contactTextMobile-modal').find('.modal-body');
            const orderCopyModal = $('#OrderPhysicalCopy-modal').find('.modal-body');
            
            if(contactModalDesktop.length){
                contactModalDesktop.find('.xfpage').remove();
                contactModalDesktop.append(iframe);
            }
            if(contactModalMobile.length){
                contactModalMobile.find('.xfpage').remove();
                contactModalMobile.append(iframe);
            }
            if(orderCopyModal.length){
                orderCopyModal.find('.xfpage').remove();
                orderCopyModal.append(iframe);
            }
        }
        else{
            if(!parent.find('iframe').length){
                parent.find('.modal-body').find('.xfpage').remove();
                parent.find('.modal-body').append(iframe);
            }
        }
    }

    return {
        pdfSrc: pdfSrc,
        checkIfPdfViewerPage: checkIfPdfViewerPage,
        openPdfOnLoad: openPdfOnLoad,
        setLastAndSeconLastPdfOpened: setLastAndSeconLastPdfOpened,
        setLastPdfOpened: setLastPdfOpened,
        setContactModals: setContactModals
    }
})();

//on load of pdfViewer
$(document).ready(function(){
    if($pdfViewer.checkIfPdfViewerPage()){
        
        if(sessionStorage.getItem('product') && sessionStorage.getItem('country') && sessionStorage.getItem('language') && sessionStorage.getItem('role') ){
            let details_url = $globals.detailsPageDefault ? $globals.detailsPageDefault : decodeURIComponent('detail-screen.html');
            $productCategory.callForCategoryDetails(details_url, '_self', 'detailsscreen');
           
        }
        else{
            if($search.getLocalStorage('lasttolastPdfOpened') && $search.getLocalStorage('islasttolast')=='Yes' ){
                
                 const pdfUrl = $search.getLocalStorage('lasttolastPdfOpened');
                 $search.setLocalStorage('lastPdfOpened', $search.getLocalStorage('lasttolastPdfOpened'));
                localStorage.removeItem('lasttolastPdfOpened');
                localStorage.removeItem('islasttolast');
                $pdfViewer.openPdfOnLoad(pdfUrl);
            }
            else{

            const pdfUrl = $search.getLocalStorage('lastPdfOpened');
            if($search.getLocalStorage('lasttolastPdfOpened')){
                $search.setLocalStorage('islasttolast','Yes');
            }
            
            $pdfViewer.openPdfOnLoad(pdfUrl);
            }
        }
        
    }
});

//on click - favorite options
$(document).on('click','#addedFavoriteIconDesktop, #favoriteIconDesktop, #favoriteTextMobile', function(e){
    e.preventDefault();
    const data = $search.getLocalStorage('lastPdfOpened');
    if($(this).attr('id') === 'favoriteTextMobile'){
        const pdfDet = $search.getLocalStorage('lastPdfOpened');
        const favorite = $favorites.getFavorites();
        let obj = favorite.find(o => o.permanentid === $search.getName(pdfDet.permanentid).id);
        if(obj && obj.permanentid){
            $favorites.removeFavourite(data);
        }
        else{
            $favorites.setFavorites(data); 
        }
    }
    else if($(this).attr('id') === 'addedFavoriteIconDesktop'){
        $('#addedFavoriteIconDesktop').closest('.button.link').addClass('d-none');
        $('#favoriteIconDesktop').closest('.button.link').removeClass('d-none');
        $favorites.removeFavourite(data);
    }
    else{
        $('#addedFavoriteIconDesktop').closest('.button.link').removeClass('d-none');
        $('#favoriteIconDesktop').closest('.button.link').addClass('d-none');
        $favorites.setFavorites(data);
    }
})

//on click of share icon
$(document).on('click', '#shareIconDesktop, #shareTextMobile', function(e){
    e.preventDefault();
    
    const prtnbr = $(this).attr('data-prtnbr');
    if(prtnbr){
        const subject = $(this).attr('data-subject');
        const langCode = $globals.languagesList[$search.getLocalStorage('curr-lang')] ? 
                $globals.languagesList[$search.getLocalStorage('curr-lang')] : $globals.defaultLanguage;
        const body =  location.origin + "/" + langCode + "/index.html?product\x3d" + prtnbr;
        window.open(`mailto:?subject=${encodeURIComponent(subject ? subject : prtnbr)}&body=${encodeURIComponent(body)}`);
    }  
});

$(document).on('click','#moreOptionsIcon', function(e){
    e.preventDefault();
        $('#section-detailsMoreOptions').css({'display':'none'});
        $('#section-detailsMoreOptions').slideDown('slow');
    
});
$(document).mouseup(function(e) 
{
    let container = $("#section-detailsMoreOptions");
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
});

//change of versions
$(document).on('change', 'label[for="previousVersionsPdf"] ~ select', function(e){
    e.preventDefault();
    const url = $(this).find('option:selected').val() ? decodeURIComponent($(this).find('option:selected').val()) : null;
    const pdfPrintId = $('#pdfContainer').find('iframe');
    const pdf = $search.getLocalStorage('lastPdfOpened');
    // ajax call to download directly
    if(url){
        $search.toggleLoader(true);
        fetch(url)
        .then(resp => resp.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            pdf.pdfUrl = blobUrl;
            $search.setLocalStorage('lastPdfOpened', pdf);
            pdfPrintId.attr('src', $pdfViewer.pdfSrc);
            $search.toggleLoader();
            console.log('file has opened successfully!');
        })
        .catch(() => {
            console.log('opening file failed!! No file found.');
            $search.toggleLoader();
        })
    } 
});

//on click -- current version
$(document).on('click', '#currentVersionPdf', function(e){
    e.preventDefault();
    const url = $(this).attr('curr-url') ? decodeURIComponent($(this).attr('curr-url')) : null;
    const pdfPrintId = $('#pdfContainer').find('iframe');
    const pdf = $search.getLocalStorage('lastPdfOpened');
    // ajax call to download directly
    if(url){
        $search.toggleLoader(true);
        fetch(url)
        .then(resp => resp.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            pdf.pdfUrl = blobUrl;
            $search.setLocalStorage('lastPdfOpened', pdf);
            pdfPrintId.attr('src', $pdfViewer.pdfSrc);
            $('#previousVersionsPdf-options').find('.fieldset_option_container').prop("selectedIndex", 0).val();
            $search.toggleLoader();
            console.log('file has opened successfully!');
        })
        .catch(() => {
            console.log('opening file failed!! No file found.');
            $search.toggleLoader();
        })
    } 
});


//show dynamic contact modals
$(document).on('click', '#contactIconDesktop, #contactTextMobile, #OrderPhysicalCopy', function(){
    setTimeout(function(){
        const id = $(this).attr('id')+'-modal'; 
        $pdfViewer.setContactModals($(id)); 
    },500);
});


//Detail screen model popup

$("#OrderPhysicalCopy").on("click touchstart", function() {  
    let iframe =  $('#OrderPhysicalCopy-modal').find('iframe');
     $(iframe).attr('id','iframecustomId');
       let iFramehead = $("#iframecustomId").contents().find("head");
       $("#iframecustomId").contents().find("p:contains('||')").css("visibility", "hidden");
       let Iframecss01 = '<style> p{ color: #62666a; }</style>';
       let Iframecss02 = '<style> p{ font-size: 16px; }</style>';
       let Iframecss03 = '<style> p{ font-family: Calibri; }</style>';
       let Iframecss04 = '<style> p{ line-height: 20px; }</style>';
       let Iframecss05 = '<style> p{  -webkit-text-size-adjust: 100%; }</style>';
       let Iframecss06 = '<style>/* width */::-webkit-scrollbar { width: 5px;}/* Track *::-webkit-scrollbar-track {box-shadow: inset 0 0 2px gray; border-radius: 10px;}/* Handle */::-webkit-scrollbar-thumb {background: #888;border-radius: 20px;}/* Handle on hover */::-webkit-scrollbar-thumb:hover {background: #555; }</style>';
       $(iFramehead).append(Iframecss01);
       $(iFramehead).append(Iframecss02);
       $(iFramehead).append(Iframecss03);
       $(iFramehead).append(Iframecss04);
       $(iFramehead).append(Iframecss05);
       $(iFramehead).append(Iframecss06);
       if($(window).width()< 767){
          let Iframecss15 = '<style> p{ text-align: center; }</style>';
          let Iframecss12 = '<style> p{ font-size: 16px; }</style>';
          let Iframecss13 = '<style> p{ font-family: Calibri; }</style>';
          let Iframecss14 = '<style> p{ line-height: 20px; }</style>';
          $(iFramehead).append(Iframecss15);
          $(iFramehead).append(Iframecss12);
          $(iFramehead).append(Iframecss13);
          $(iFramehead).append(Iframecss14);
       }
       $( window ).resize(function() {

        if($(window).width()< 767){
            let Iframecss07 = '<style> p{ text-align: center; }</style>';
            let Iframecss08 = '<style> p{ color: #62666a !important; }</style>';
            let Iframecss09 = '<style> p{ font-family: Calibri; }</style>';
            let Iframecss10 = '<style> p{  -webkit-text-size-adjust: 100%; }</style>';
            $(iFramehead).append(Iframecss07);
            $(iFramehead).append(Iframecss08);
            $(iFramehead).append(Iframecss09);
            $(iFramehead).append(Iframecss10);
           
         }
         if($(window).width()> 768){
            let Iframecss11 = '<style> p{ text-align: left; }</style>';
            $(iFramehead).append(Iframecss11);
         }
       });
});

$("#contactIconDesktop").on("click touchstart", function() {  
    let contactIconIframe =  $('#contactIconDesktop-modal').find('iframe');
     $(contactIconIframe).attr('id','contactIconCustomId');
       let contactIconHead = $("#contactIconCustomId").contents().find("head");
       $("#contactIconCustomId").contents().find("p:contains('||')").css("visibility", "hidden");
       let contactIframe01 = '<style> p{ color: #62666a; }</style>';
       let contactIframe02 = '<style> p{ font-size: 16px; }</style>';
       let contactIframe03 = '<style> p{ font-family: Calibri; }</style>';
       let contactIframe04 = '<style> p{ line-height: 20px; }</style>';
       let contactIframe05 = '<style>/* width */::-webkit-scrollbar { width: 5px;}/* Track *::-webkit-scrollbar-track {box-shadow: inset 0 0 2px gray; border-radius: 10px;}/* Handle */::-webkit-scrollbar-thumb {background: #888;border-radius: 20px;}/* Handle on hover */::-webkit-scrollbar-thumb:hover {background: #555; }</style>';
       $(contactIconHead).append(contactIframe01);
       $(contactIconHead).append(contactIframe02);
       $(contactIconHead).append(contactIframe03);
       $(contactIconHead).append(contactIframe04);
       $(contactIconHead).append(contactIframe05);
    
});

$("#contactTextMobile").on("click touchstart", function() {  
    let iframeContactTextMobile =  $('#contactTextMobile-modal').find('iframe');
     $(iframeContactTextMobile).attr('id','contactTextMobileIframe');
       let contactIconText = $("#contactTextMobileIframe").contents().find("head");
       $("#contactTextMobileIframe").contents().find("p:contains('||')").css("visibility", "hidden");
       let contactIconText01 = '<style> p{ color: #62666a; }</style>';
       let contactIconText02 = '<style> p{ font-size: 16px; }</style>';
       let contactIconText03 = '<style> p{ font-family: Calibri; }</style>';
       let contactIconText04 = '<style> p{ line-height: 20px; }</style>';
       let contactIconText05 = '<style> p{ -webkit-text-size-adjust: 100%; }</style>';
       $(contactIconText).append(contactIconText01);
       $(contactIconText).append(contactIconText02);
       $(contactIconText).append(contactIconText03);
       $(contactIconText).append(contactIconText04);
       $(contactIconText).append(contactIconText05);
       if($(window).width() < 767){
        let contactIconText07 = '<style> p{ text-align: center; }</style>';
        $(contactIconText).append(contactIconText07);
       }
       $( window ).resize(function() {
        if($(window).width() < 767){
            let contactIconText08 = '<style> p{ text-align: center; }</style>';
            let contactIconText09 = '<style> p{ -webkit-text-size-adjust: 100%; }</style>';
            let contactIconText10 = '<style> p{ color: #62666a !important; }</style>';
            $(contactIconText).append(contactIconText08);
            $(contactIconText).append(contactIconText09);
            $(contactIconText).append(contactIconText10);
           }
           if($(window).width() > 768){
            let contactIconText11 = '<style> p{ text-align: left; }</style>';
            $(contactIconText).append(contactIconText11);
           }
       });
      
    
});

$("#currentVersionPdf").on("click", function() { 
    if($(window).width() > 992){
        $(".a-link--icon").css({"border-bottom":"3px solid #004f71"})
        $(".drop-down").css({"border-bottom":"none"})
    }
});

$(document).on("change","#previousVersionsPdf-options .fieldset_option_container",function() {
    if($(window).width() > 992){
        $(".drop-down").css({"border-bottom":"3px solid #004f71"})
        $(".a-link--icon").css({"border-bottom":"none"})
    }
});












       
        
