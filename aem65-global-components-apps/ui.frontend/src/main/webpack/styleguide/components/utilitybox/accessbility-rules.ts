// Rules referecne : http://w3schools-fa.ir/html/html5_syntax.html
// https://www.w3.org/People/Raggett/tidy/

let hasDocumentType: any, hasDocumentTitle: any, hasDocumentMetaCharset: any, hasDocumentLanguage: any, 
hasHeadingOnce: any, hasEmptyElement: any, hasImagesAlt: any, hasEmptyAttr: any, hasTabRole: any, 
hasLinksText: any, hasLinksHref: any, hasIframeTitle: any, hasForLabel: any, hasButtonsText: any, 
hasLinksRole: any, hasLinksAriaLabel: any, hasDuplicateIds: any, hasSVGRole: any, hasInlineElementSpan: any,
hasModalRole: any, hasAlertRole: any;

hasDocumentType = (): string => {
  let hasDocTypeMissing: string = '';
  if (!document.doctype) hasDocTypeMissing = '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: Doctype is missing. Fix: Add &lt;!DOCTYPE html&gt;</p>';
  return hasDocTypeMissing
};

hasDocumentTitle = (): string => {
  let hasDocTitleMissing: string = '';
  if (document.title == '') hasDocTitleMissing = '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: Title is missing. Fix: &lt;title&gt;WELL DESCRIBED TITLE&lt;/title&gt;</p>';
  return hasDocTitleMissing
};

hasDocumentMetaCharset = (): string => {
  let hasMetaCharset: string = '';
  $('head *').each(function () {
    if ($(this).is('meta') && $(this)[0].hasAttribute('charset') && $(this)[0].getAttribute('charset') !== 'UTF-8') {
      hasMetaCharset = '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: Document encoding is missing. Fix: Add &lt;meta charset="utf-8"/&gt;</p>';
    }
  });
  return hasMetaCharset;
};

hasDocumentLanguage = (): string => {
  let hasDocLanguage: string = '';
  const HTML = document.querySelector('html');
  const hasLanguageAttr = HTML.hasAttribute('lang');

  if (hasLanguageAttr) {
    const getLanguageValue = HTML.getAttribute('lang');
    const isLanguageValueNotExist = getLanguageValue.trim() === '';

    if (isLanguageValueNotExist) hasDocLanguage = '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: Language value is missing in HTML element. Fix: Add lang="LANGUAGE VALUE" to &lt;html&gt;</p>';
  } else {
    hasDocLanguage = '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: Language is missing in HTML element. Fix: Add lang="LANGUAGE VALUE" to &lt;html&gt;</p>';
  }
  return hasDocLanguage
};

hasHeadingOnce = (): string => {
  let hasMultiHeading: number = 0;
  $('#stg-demo-iframe').contents().find('body *').each(function () {
    if ($(this).prop('tagName') == 'H1') {
      hasMultiHeading ++;
    }
  });
  if (hasMultiHeading > 1 ) {
    return '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: Page has Multi &lt;h1&gt; tag. Fix: use only one &lt;h1&gt; in the page.</p>'
  }
};

hasEmptyElement = (): string => {
  let hasEmptyTag:string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function() {
    if ($(this).text() == '' && $(this).prop('tagName') !== 'IMG' && $(this).prop('tagName') !== 'BR' && $(this).prop('tagName') !== 'HR' && $(this).prop('tagName') !== 'INPUT' && $(this).prop('tagName') !== 'SCRIPT' && $(this).prop('tagName') !== 'I' && $(this).prop('tagName') !== 'SPAN') {
      let emptyOuterHTML = ($(this)[0].outerHTML).replace(/\</g,'&lt;');
      emptyOuterHTML = emptyOuterHTML.replace(/\>/g,'&gt;');
      hasEmptyTag +='<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: Empty tags <span>' + emptyOuterHTML + '</span> Fix: remove empty tags.</p>';
    }
  });
  return hasEmptyTag
}

hasImagesAlt = () => {
  let hasMissingAlt: string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function() {
    if($(this).is('img') && $(this).attr('alt') == undefined) {
        let imgOuterHTML = ($(this)[0].outerHTML).replace(/\</g,'&lt;');
        imgOuterHTML = imgOuterHTML.replace(/\>/g,'&gt;');
      hasMissingAlt += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: Image Alt is missing. Fix: Add alt="IMAGE WELL DESCRIBED" to <span>' + imgOuterHTML + '</span> tag</p>';
    }
  });
  
  if (hasMissingAlt !== 'undefined') {
    return hasMissingAlt
  }
};

hasEmptyAttr = (): string => {
  let hasEmptyAttrs:string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function() {
    if ($(this).prop('tagName') !== 'SCRIPT') {
      $(this).each(function () {
        $.each(this.attributes, function () {
          if (this.specified) {
            if (this.value == '') {
              let outerHTMLStr = (this.ownerElement.outerHTML).replace(/\</g, '&lt;');
              outerHTMLStr = outerHTMLStr.replace(/\>/g, '&gt;');
              hasEmptyAttrs += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: <span>' + outerHTMLStr + '</span> tag has empty attribute <span>"' + this.name + '"</span> </p>'
            }
          }
        });
      });
    }
  });
  return hasEmptyAttrs
}

hasLinksText = (): string => {
  let hasMissingText : string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function() {
    if($(this).is('a') && $(this).html() == '') {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      hasMissingText += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: '+ 'Link text is missing. Fix: "DESCRIBE PURPOSE OF LINK" to <span>' + linkOuterHTML +'</span> tag</p>';
    }
  });
  return hasMissingText
};

hasLinksHref = (): string => {
  let hasMissingHref : string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function() {
    if($(this).is('a') && $(this).attr('href') == undefined) {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      hasMissingHref += '<p class="alert alert-danger"><i class="mdi mdi-information aria-hidden="true"></i> Error: '+ 'Link href attribute is missing. Fix: Add href="LINK URL" to <span>' + linkOuterHTML +'</span></p>';
    }
  });
  return hasMissingHref
};

hasLinksRole = (): string => {
  let hasMissingRole : string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function() {
    if($(this).is('a') && $(this).attr('role') == undefined) {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g,'&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      hasMissingRole += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: '+ 'Link role attribute is missing. Fix: Add role="button/link" to <span>' + linkOuterHTML +'</span></p>';
    }
  });
  return hasMissingRole
};

hasLinksAriaLabel = (): string => {
  let missingTargetHint : string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function() {
    if ($(this).is('a') && $(this).is('a') && $(this).attr('aria-label') == undefined) {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g,'&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      missingTargetHint += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: ' + 'Hint message is missing. Should add aria-label attribute. Fix: Add aria-label="Significant text" to <span>' + linkOuterHTML +'</span></p>';
    }
  });
  return missingTargetHint
};

hasIframeTitle = (): string => {
  let iframeWithoutTitle : string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function() {
    if($(this).is('iframe') && $(this).attr('title') == undefined) {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g,'&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      iframeWithoutTitle += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: '+ 'Title attribute is missing in iframe. Fix: Add title="DESCRIBE CONTENT OF FRAME" to <span>' + linkOuterHTML +'</span></p>';
    }
  });
  return iframeWithoutTitle
};

hasDuplicateIds = (): string => {
  let hasDuplicate : string = '';
  let tempId : string = '';
  let emptyOuterFirstHTML : string = '';
  let emptyOuterLastHTML : string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function() {
    if($(this).prop('id') !== '') {
      if($(this).prop('id') == tempId) {
        emptyOuterLastHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
        emptyOuterLastHTML = emptyOuterLastHTML.replace(/\>/g, '&gt;');
        hasDuplicate +='<p class="alert alert-danger"><i class="mdi mdi-information aria-hidden="true"></i> Error: Avoid duplicate ids, ID must be unique. Fix: Remove/Replace duplicate id from <span>' + emptyOuterFirstHTML + ' or ' + emptyOuterLastHTML+'</span></p>';
      } else {
        tempId = $(this).prop('id');
        emptyOuterFirstHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
        emptyOuterFirstHTML = emptyOuterFirstHTML.replace(/\>/g, '&gt;');
      }  
    }
  });
  return hasDuplicate
};

hasForLabel = (): string => {
  let missingForLabel: string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function () {
    if ($(this).is('label') && $(this).attr('for') == undefined) {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      missingForLabel += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: ' + 'For is missing in label. Fix: Add for="INPUT ID" to <span>' + linkOuterHTML + '</span></p>';
    }
  });
  return missingForLabel;
};

hasSVGRole = (): string => {
  let hasMissingRole: string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function () {
    if ($(this).is('svg') && $(this).attr('aria-hidden') == undefined && $(this).attr('aria-hidden') == 'false' && $(this).attr('role') == undefined) {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      hasMissingRole += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: ' + 'SVG Role is missing. Fix: Add role="img" or (aria-hidden="true" if you need to hide element from SR). to <span>' + linkOuterHTML + '</span></p>';
    }
  });
  return hasMissingRole
};

hasTabRole = (): string => {
  let hasMissingRole: string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function () {
    if ($(this).is('ul') && $(this).hasClass('nav-tabs') && $(this).attr('role') == undefined && $(this).attr('role') !== 'tablist') {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      hasMissingRole += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: ' + 'Tablist Role is missing. Fix: Add role="tablist" to <span>' + linkOuterHTML + '</span></p>';
    }
  });
  return hasMissingRole
};

hasButtonsText = (): string => {
  let withoutTextWarning: string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function () {
    if ($(this).is('button') && $(this).text() == '') {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      withoutTextWarning += '<p class="alert alert-danger"><i class="mdi mdi-information aria-hidden="true"></i> Error: ' + 'Button text or aria-label is missing. Fix: Add aria-label="VALUE" or &lt;button>VALUE&lt;/button> to <span>' + linkOuterHTML + '</span></p>';
    }
  });
  return withoutTextWarning;
};

hasInlineElementSpan = (): string => {
  let hasBlockTag: boolean= false;
  let hasInlineElement: string = '';
  let inlineElements = ['BR', 'IMG', 'STRONG', 'I', 'EM', 'B', 'SUP', 'A', 'SUB', 'BIG', 'SMALL', 'CITE', 'CODE', 'HR'];
  $('#stg-demo-iframe').contents().find('body *').each(function () {
    if ($(this).is('span')) {
      var linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      if($(this).find('*')) {
        $(this).find('*').each(function () {
          inlineElements.forEach(function (item) {
            if ($(this).prop('tagName') !== item) {
              hasBlockTag = true;
            }
          });
          if (hasBlockTag) hasInlineElement += '<p class="alert alert-danger"><i class="mdi mdi-information aria-hidden="true"></i> Error: ' + 'Only inline elements may be contained within inline elements. Fix: remove block level elements to <span>' + linkOuterHTML + '</span></p>';
        });
      }
    }
  });
  return hasInlineElement;
};

hasModalRole = (): string => {
  let hasModalMissingRole: string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function () {
    if ($(this).hasClass('modal') && $(this).attr('role') == undefined) {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      hasModalMissingRole += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: ' + 'Modal role attribute is missing. Fix: Add role="dialog" to <span>' + linkOuterHTML + '</span></p>';
    }
  });
  return hasModalMissingRole
};

hasAlertRole = (): string => {
  let hasAlertMissingRole: string = '';
  $('#stg-demo-iframe').contents().find('body *').each(function () {
    if ($(this).hasClass('alert') && $(this).attr('role') == undefined) {
      let linkOuterHTML = ($(this)[0].outerHTML).replace(/\</g, '&lt;');
      linkOuterHTML = linkOuterHTML.replace(/\>/g, '&gt;');
      hasAlertMissingRole += '<p class="alert alert-warning"><i class="mdi mdi-information aria-hidden="true"></i> Warning: ' + 'Alert role attribute is missing. Fix: Add role="alert" to <span>' + linkOuterHTML + '</span></p>';
    }
  });
  return hasAlertMissingRole
};

const accessbilityRules = {
  hasDocumentType,
  hasDocumentTitle,
  hasDocumentMetaCharset,
  hasDocumentLanguage,
  hasHeadingOnce,
  hasEmptyElement,
  hasImagesAlt,
  hasEmptyAttr,
  hasLinksText,
  hasLinksHref,
  hasLinksRole,
  hasLinksAriaLabel,
  hasIframeTitle,
  hasDuplicateIds,
  hasForLabel,
  hasSVGRole,
  hasTabRole,
  hasButtonsText,
  hasInlineElementSpan,
  hasModalRole,
  hasAlertRole
};

export default accessbilityRules;