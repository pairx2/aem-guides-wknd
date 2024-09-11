import Prism from 'prismjs';
import { ComponentVariant } from '../../framework/AEMPUnkTree/punk-tree';

let formatHTML: any;
let currentCodeInDisplay: string = 'Error';
formatHTML = (html) => {
    var tab = '\t';
    var result = '';
    var indent = '';

    html.split(/>\s*</).forEach(function (element) {
        if (element.match(/^\/\w/)) {
            indent = indent.substring(tab.length);
        }

        result += indent + '<' + element + '>\r\n';

        if (element.match(/^<?\w[^>]*[^\/]$/)) {
            indent += tab;
        }
    });
    return result.substring(1, result.length - 3);
}

let copyTextToClipBoard: any;
copyTextToClipBoard = (textToCopy: string) => {
    var $temp = $('<input>');
    $('body').append($temp);
    // replacing hex code with angular brace
    textToCopy = textToCopy.replace(/&lt;/g,'<' );  
    let formattedHTML = formatHTML(textToCopy);
    $temp.val(formattedHTML).select();
    document.execCommand('copy');
    $temp.remove();
}

let restClipBoardButton: any;
restClipBoardButton = () => {
    $('#stg-util-btn-copy').toggleClass('btn-outline-primary btn-outline-success');
    $('#stg-util-btn-copy').html('Copy');
}

let updateUserAfterClipBoardCopy: any;
updateUserAfterClipBoardCopy = () => {
    $('#stg-util-btn-copy').toggleClass('btn-outline-primary btn-outline-success');
    $('#stg-util-btn-copy').html('Copied');
    setTimeout(restClipBoardButton, 2000);
}

let extractRequiredHTML;
extractRequiredHTML = (htmlIn: string) => {
    let finalHTML = '';
    let variantHTMLStr = '<div>' + htmlIn + '</div>';
    let variantDom = $(variantHTMLStr);
    if (variantDom.has('.stg-code').length) {
        variantDom.find('.stg-code').each(function (i, e) {
            let eleHtml = $(e).html();
            finalHTML = finalHTML + formatHTML(eleHtml);
        });
    }
    else {
        finalHTML = formatHTML(htmlIn);
    }
    return finalHTML;
};

let updateHTMLUtilityByHTMLString: any;
updateHTMLUtilityByHTMLString = (htmlStr: string) => {
    var htmlSource = extractRequiredHTML(htmlStr);
    var htmlReplacedLessthan = htmlSource.replace(/\</g, '&lt;').trim();
    currentCodeInDisplay = htmlReplacedLessthan;
    $('#stg-util-b-html > pre').html('<code class="language-markup">' + htmlReplacedLessthan + '</code>');
    Prism.highlightAll();
}

let updateHTMLUtilityUsingVariant: any;
updateHTMLUtilityUsingVariant = (variantIn: ComponentVariant) => {

    // Checking variantIn.html is HTML dom or url
    let hasHTMLUrl = variantIn.getHTML();
    if (hasHTMLUrl.trim().endsWith('.html')) {
        fetch(hasHTMLUrl)
            .then(response => { return response.text() })
            .then(data => {
                updateHTMLUtilityByHTMLString(data);
            });
    } else {
        updateHTMLUtilityByHTMLString(variantIn.getHTML());
    }
}


$('#stg-util-btn-copy').click(() => {
    updateUserAfterClipBoardCopy();
    copyTextToClipBoard(currentCodeInDisplay);
});

export {
    updateHTMLUtilityUsingVariant,
    updateHTMLUtilityByHTMLString,
    copyTextToClipBoard, formatHTML,
    extractRequiredHTML
}