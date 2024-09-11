/**
 * Site Common Js
**/

$(document).ready(function () {

    //input selector for All wizard fields
    const inputselector = 'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([readonly]), textarea, [data-js-component="form-dropdown"]';
    
    //input change event to conditionally show/hide next input text field on selection of Radio option
    $(inputselector).on('change', function (e) {
        
        //show/hide others input field for radio option others
        if ($(this).attr('type') == "radio") {
            if (($(this).val().trim()).indexOf('others') > -1) {
                showHideOthersField($(this), true);
            } else {
                showHideOthersField($(this), false);
            }
        }

    });

    //wizard scroll to top.
    $('.o-wizard fieldset.o-wizard__content .o-wizard__btn .button-div .btn:not([type="submit"])').on('click', function () {
        const wizID = $(this).closest('[data-js-component="wizard"]').attr('id');
        setTimeout(function () {
            focusAnimateToId(wizID);
        }, 500);
    });

    //form hide all errors on click of submit button
    $('.formcontainer button[type="submit"]').on('click', function () {
      // Check if the specific form is visible
      if($(this).is(':visible')){
        //hide all errors
        $('#apierror, #apierror_400, #apierror_500, #invalidpass_apierror_400').hide();
      }
    });

});


//function to show/hide input field for radio option selected as "others"
function showHideOthersField(rfield, show) {
    //get the id of radio field and split by hyphen(-) to get the key
    const rfieldId = rfield.closest('fieldset.radio').attr('id');
    const rfieldIdArr = rfieldId.split('-');
    const rfieldKey = '#' + rfieldIdArr[0] + '-others'; //id of next input field

    const nextField = $(rfieldKey).closest('.a-input-field'); //next input field
    if (show) {
        nextField.css('display', 'block');
    } else {
        nextField.hide();
    }
}

/**
 * @function
 * Summary: function to show/hide popup
 * Parameters: modalId {String}, action {Number} 0=> hide & 1=> show, backdrop {Boolean} true=> static backdrop
 */
function showhideModal(modalId, action = 1, backdrop = false) {
  let modelDiv = $(`#${modalId}-modal`);
  if (action == 0 && modelDiv.length > 0 && (modelDiv.is(':visible') || modelDiv.hasClass('show'))) {
      modelDiv.hide();
      modelDiv.find('.generic-modal--close').click();
  } else if (action == 1) {
    if (backdrop && modelDiv.length > 0) { modelDiv.attr('data-backdrop', 'static'); }
    let modelElem = $(`#${modalId}`).parent('.m-popup');
    if (modelElem.length > 0) { modelElem.trigger('click'); }
  }
}

//showHide Api Errors
function showHideApiError(error) {

  const errorCode = error.errorCode;
  let i18nKey, i18KeyEle, i18KeyEle_400, apiErrorBlocks, apiErrorBlocks_400, apiErrorBlockElements;

  if(error.response) {
      i18nKey = error.response.i18nMessageKey ? error.response.i18nMessageKey : ""
  } else {
      i18nKey = "";
  }

  apiErrorBlocks = $('#apierror, #apierror_400, #apierror_500, #invalidpass_apierror_400');
  apiErrorBlocks_400 = $('#apierror, #apierror_400, #invalidpass_apierror_400');
  apiErrorBlockElements = apiErrorBlocks.find('> *');

  // Hide all errors initially
  apiErrorBlocks.hide();
  apiErrorBlockElements.hide();
  $('#page-spinner').hide();

  // fnd the specific error id message
  if(i18nKey !== ""){
    i18KeyEle = apiErrorBlocks.find(`#${i18nKey}`);
    apiErrorBlockElements.has(i18KeyEle).show();
    i18KeyEle.show();
  }
  i18KeyEle_400 = (i18nKey !== "" && apiErrorBlocks_400.find(`#${i18nKey}`).length > 0)? true : false;


  if(errorCode == 400 && i18nKey !== "" && i18KeyEle_400) {
    //hide error500 modal
    showhideModal('btnModalError500', 0);
    $('#apierror, #apierror_400, #invalidpass_apierror_400').css('display', 'block');
  }
  else{
    //show error500 modal
    showhideModal('btnModalError500', 1, true);
    $('#apierror_500').css('display', 'block');
  }
}


//focus animate to id
function focusAnimateToId(id) {
    const headerClass =  $(".abbott-wrapper .o-header-v2-global").length > 0 ? `o-header-v2-global` : `o-header`;
    const headerWrapper = $(".abbott-wrapper .o-header-v2-global").length > 0 ? $('.o-header-v2-global') : $('.o-header__wrapper');
    let stickySection = $('.abbott-wrapper .'+headerClass+'__sticky-section').height();
    
    if(!$('.abbott-wrapper .'+headerClass+'__sticky-section').hasClass('sticky')){
        stickySection = headerWrapper.height() + stickySection;
    }
    
    const targetElement = $('#'+id);
    if (targetElement != undefined) {
        $('html, body').animate({
            'scrollTop': targetElement.offset().top - stickySection - 30 //30 is the extra margin-top
        }, 300);
    }
}

//scroll to top
function scrollToTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 300);
}

//sort dropdown
function sortDropdown(id) {
	const eleUl = $(id).find('.a-dropdown__menu');
	const eleLi = eleUl.children("li");

	if(eleLi && eleLi.length > 1) {
		eleLi.sort(function(a, b) {
			const A = $(a).text().trim().toUpperCase();
			const B = $(b).text().trim().toUpperCase();
			if(A > B){return 1}
      else if(A < B){return -1}
      else{return 0}
		}).appendTo(eleUl);
	}
}

/** @function* Summary: Remove unwanted data from payload
 * Parameters: exceptionList {JQuery} Object, body {Object} user data
**/
function removeDataPayload(exceptionList, body) {
  if (exceptionList !== undefined && exceptionList !== 'undefined' && exceptionList !== 'null' && exceptionList !== null && exceptionList !== "") {
      let exceptionListArray = exceptionList.split(",");
      for (let i in exceptionListArray) {
          let excItem = exceptionListArray[i].trim();
          delete body[excItem];
      }
  }
  return body;
}


/**
 * @function
 * @desc funtion to set equal height for components withing same row
 * @param {Boolean} isContainer TRUE if the items needs to be searched within .conatiner>.row
 * @param {String} target component class of element whose height need to be calculated
 * @param {String} targetParent (optional) parent class of the target
 * @param {String} mainParent (optional) main parent class which needs to be used as selector instead of .conatiner>.row
 */
function setEqualHeight(isContainer, target, targetParent, mainParent) {

    let targetItem;
    const checkMobile = window.matchMedia("(max-width: 767px)").matches;
  
    /**
     * @function
     * @desc funtion to get height of hidden element
     */
    function getHiddenEleHeight(ele) {
      let $wrap = $("<div />").appendTo($("body"));
      $wrap.css({
        position: "absolute !important",
        visibility: "hidden !important",
        display: "block !important",
      });
  
      let $clone;
      if (targetParent) {
        $clone = $(ele).closest(targetParent).clone().appendTo($wrap);
      } else {
        $clone = $(ele).clone().appendTo($wrap);
      }
  
      let $cloneHeight = $clone.height();
      $wrap.remove();
  
      return $cloneHeight;
    }
  
    /**
     * @function
     * @desc funtion to calculate and set height of the element
     */
    function setHeight(targetElem) {
      let maxHeight = 0;
  
      targetElem.forEach((elem) => {
        elem.style.height = "auto";
        if (elem.clientHeight <= 0) {
          let tempHeight = getHiddenEleHeight(elem);
          if (tempHeight > maxHeight) {
            maxHeight = tempHeight;
          }
        } else if (elem.clientHeight > maxHeight) {
          maxHeight = elem.clientHeight;
        }
      });
  
      targetElem.forEach((elem) => {
        elem.style.height = maxHeight > 0 ? `${maxHeight}px` : "auto";
      });
    }
  
    /**
     * @function
     * @desc function to init setHeight
     */
    function initSetHeight(elm) {
      targetItem = elm.querySelectorAll(target);
      if (!targetItem.length) {
        return;
      }
      if (!checkMobile) {
        setHeight(targetItem);
      }
    }
  
  
    /**
     * @desc get elements from DOM
     */
    let serchParam = isContainer && mainParent ? `.container .row ${mainParent}` : '.container .row';
    if (isContainer) {
      document.querySelectorAll(serchParam).forEach((elm) => {
        initSetHeight(elm);
      });
    } else if (!isContainer && mainParent) {
      document.querySelectorAll(mainParent).forEach((elm) => {
        initSetHeight(elm);
      });
    } else {
      initSetHeight(document);
    }
  }