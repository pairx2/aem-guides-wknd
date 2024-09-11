import { treeConfig, PunkBranch, UIComponent, ComponentVariant } from '../../framework/AEMPUnkTree/punk-tree';
import { updateHTMLUtilityByHTMLString, updateHTMLUtilityUsingVariant } from '../utilitybox/html';
import { updateKnobs } from '../utilitybox/knobs';
import { a11yValidator } from '../utilitybox/accessibility';
import {themes} from '../../../../../../themes.config';

import 'whatwg-fetch'
declare global {
    interface Window { Granite: any; }
}

window.Granite = window.Granite || {
    I18n: {
        setLocale: function() {
            // set locale method declaration
            console.log('ok');
        },
        get: function() {
            // get method declaration
            console.log('ok');
        }
    }
};

let categoryInUse: PunkBranch;
let componentInUse: UIComponent;
let variantInUse: ComponentVariant;

let getLiForVariants: any;
getLiForVariants = (component: UIComponent): string => {
    let level3Variants = '';

    let fragment = document.createDocumentFragment();
    for (let variant of component.variants) {
        let li = document.createElement('li');
        li.className = 'nav-item';

        let linkHref = document.createElement('a');
        linkHref.className = 'nav-link text-capitalize';
        linkHref.id = `stg-v-${component.id}-${variant.id}`;
        linkHref.href = '#';
        linkHref.textContent = `- ` + variant.name;

        li.appendChild(linkHref);
        fragment.appendChild(li);
    }

    let cloneDiv = document.createElement('div');
    cloneDiv.appendChild(fragment.cloneNode(true));
    level3Variants = cloneDiv.innerHTML;

    return level3Variants;
}

let getL1NavHTMLString: any;
getL1NavHTMLString = (category: PunkBranch): string => {
    let id = `stg-brch-${category.id}-collapse`;
    let level2Components = '';
    let compComparator;

    compComparator = (a: UIComponent, b: UIComponent): number => {
        if (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) {
            return -1;
        }
        if (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase()) {
            return 1;
        }
        return 0;
    };

    for (let component of category.components) {
        let componetLiId = `stg-nav-comp-li-${component.id}-collapse`;
        let componetId = `stg-nav-comp-${component.id}-collapse`;
        level2Components += `
        <li class="nav-item" id="`+ componetLiId + `">
             <a class="nav-link  text-capitalize stg-nav-comp-a" href="#" data-toggle="collapse" data-target="#`+ componetId + `" aria-expanded="true" aria-controls="` + componetId + `">`
            + '<i class="mdi mdi-subdirectory-arrow-right pr-1" aria-hidden="true"></i>'
            + component.name + `</a>
             <div class="collapse pl-8" id="`+ componetId + `" aria-labelledby="headingOne" data-parent="#` + id + `">
                <ul class="nav flex-column stg-nav-level3-ul">
                    `+ getLiForVariants(component) + `
                </ul>
            </div>
        </li>`;
    }


    return `
    <li class="nav-item">
        <a class="nav-link text-uppercase" href="#" data-toggle="collapse" data-target="#`+ id + `" aria-expanded="true" aria-controls="` + id + `">`
        + '<i class="mdi mdi-format-align-left pr-1" aria-hidden="true"></i>'
        + category.name
        + `</a>
        <div class="collapse pl-4" id="`+ id + `" aria-labelledby="headingOne" data-parent="#sticky-sidebar">
            <ul class="nav flex-column stg-nav-level2-ul">
                `+ level2Components + `
            </ul>
        </div>
    </li>`;
}

let buildLeftNavigation: any;
buildLeftNavigation = () => {
    var finalLeftNavDom = '';
    for (let category of treeConfig.branches) {
        finalLeftNavDom += getL1NavHTMLString(category);
    }
    $('#stg-levelone-ul').html(finalLeftNavDom);
}

let getURLParamsObj;
getURLParamsObj = () => {
    let result = {};
    let hash = window.location.hash.substr(1);
    result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        if(parts[0] !== ''){
            result[parts[0]] = parts[1];
        }
        return result;
    }, {});

    return result;
}

let updateURLFromParsObj;
updateURLFromParsObj = (result) => {
    let finalParameters = '';
    for (let key in result) {
        let value = result[key];
        if (finalParameters !== '')
            finalParameters += '&'

        finalParameters += key + '=' + value;
    }
    window.location.hash = finalParameters;
}

let setURLHashParameter: any;
setURLHashParameter = (currentBranchId: any) => {
    let currentURLParms = getURLParamsObj();
    currentURLParms['b'] = currentBranchId;
    currentURLParms['c'] = componentInUse.id;
    currentURLParms['v'] = variantInUse.id;
    updateURLFromParsObj(currentURLParms);
}

let updateUtilitiesAndDemoBox: any;
updateUtilitiesAndDemoBox = (category: PunkBranch, getCurrnetNavText: string, getParentNavText: string): string => {
    let rootElementDOM: any;
    categoryInUse = category;
    for (let component of category.components) {
        if (component.name == getParentNavText) {
            componentInUse = component;
            for (let variant of component.variants) {
                if (variant.name == getCurrnetNavText) {
                    rootElementDOM = variant.html;
                    variantInUse = variant;
                    let variantDefaultHTML = variant.getDefaultHTML();
                    $('#stg-demo-iframe').contents().find('body').html(variantDefaultHTML);
                    updateKnobs(variant);
                    updateHTMLUtilityByHTMLString(variantDefaultHTML);
                }
            }
        }
    }
    return rootElementDOM;
}

let updateDemoBoxFromURLParms: any;
updateDemoBoxFromURLParms = () => {
    let hash = window.location.hash.substr(1);

    if (hash !== '') {
        let result = hash.split('&').reduce(function (result, item) {
            var parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        var variantAtagId = '#stg-v-' + result['c'] + '-' + result['v'];
        var branchClosestCollapseId = '#stg-brch-' + result['b'] + '-collapse';
        var compClosestCollapseId = '#stg-nav-comp-' + result['c'] + '-collapse';

        $(variantAtagId).trigger('click');
        try{
          $(branchClosestCollapseId).collapse('show');
          $(compClosestCollapseId).collapse('show');
        } catch(e) {

        }
    } else {
        fetch('./src/main/webpack/static/welcome.html')
            .then(response => { return response.text() })
            .then(data => {
                $('#stg-demo-iframe').contents().find('body').html(data);
            });
    }
}

// Inject scripts in the iframe
let injectScriptIframe: any;
injectScriptIframe = (src: object): any => {
    return new Promise((resolve, reject) => {
        $('#stg-demo-iframe').contents().find('body').find('script').remove();
        if (!Object.entries) {
          Object.entries = function( src ){
            var ownProps = Object.keys( src ),
                i = ownProps.length,
                resArray = new Array(i); // preallocate the Array
            while (i--)
              resArray[i] = [ownProps[i], src[ownProps[i]]];

            return resArray;
          };
        }
        for (let [key, value] of Object.entries(src)) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = value;
            script.async = false;
            script.addEventListener('load',resolve);
            script.addEventListener('error', e => reject(e.error));

            var rawframe = document.getElementById('stg-demo-iframe') as HTMLIFrameElement;
            var framedoc = rawframe.contentDocument;
            if (!framedoc && rawframe.contentWindow) {
                framedoc = rawframe.contentWindow.document;
            }
            framedoc.body.appendChild(script);
        }
    });
}

// Inject styles in the iframe
let injectStyleIframe: any;
injectStyleIframe = (src: object): any => {
    return new Promise((resolve, reject) => {

        $('#stg-demo-iframe').contents().find('head').find('link').remove();
        $('#stg-demo-iframe').contents().find('head').find('base').remove();

        let getUrlHref = window.location.href;
        getUrlHref = getUrlHref.substring(0, getUrlHref.indexOf('#'));
        let baseTag = document.createElement('base');
        baseTag.href = getUrlHref || window.location.href;
        $('#stg-demo-iframe').contents().find('head').append(baseTag);
        if (!Object.entries) {
          Object.entries = function( src ){
            var ownProps = Object.keys( src ),
                i = ownProps.length,
                resArray = new Array(i); // preallocate the Array
            while (i--)
              resArray[i] = [ownProps[i], src[ownProps[i]]];

            return resArray;
          };
        }
        for (let [key, value] of Object.entries(src)) {
            const link = document.createElement('link');
            link.type = 'text/css';
            link.href = value;
            link.rel = 'stylesheet';
            link.addEventListener('load', resolve);
            link.addEventListener('error', e => reject(e.error));
            $('#stg-demo-iframe').contents().find('head').append(link);
        }
    });
};

function loadStyleAfterIframeLoad() {
    const frameInjectedCss = ['clientlib-styleguide/styleguide.css', 'clientlib-site/site.css'];
    const activeTheme = localStorage.getItem('theme') || 'theme1';
    const activeThemePath = `/clientlib-${activeTheme}/${activeTheme}.css`;

    frameInjectedCss.push(activeThemePath);

    injectStyleIframe(frameInjectedCss)
        .then(() => {
            console.log('Styles loaded in the Iframe!');
            const iframeBody = $("#stg-demo-iframe").contents().find("html");
            iframeBody.attr('dir', activeTheme.indexOf('-rtl') > -1 ? 'rtl' : 'ltr');
        }).catch(error => {
            console.error(error);
        });
      injectScriptIframe([
        'commons.js',
        'clientlib-site/site.js',
        'clientlib-components/components.js'
      ])
        .then(() => {
            console.log('Script loaded in the Iframe!');
        }).catch(error => {
            throw new Error(error);
        });
};

function loadTheme() {
    const activeTheme = localStorage.getItem('theme') || 'theme1';
    const iframeBody = $("#stg-demo-iframe").contents().find("html");

    const activeThemePath = `/clientlib-${activeTheme}/${activeTheme}.css`;

    $('#change-theme').val(activeTheme);

    iframeBody.attr('dir', activeTheme.indexOf('-rtl') > -1 ? 'rtl' : 'ltr');

    const link = document.createElement('link');
    link.title = "abbott-theme";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = activeThemePath;
    document.head.append(link);
}

function buildThemesDropdown() {
  const html = [];
  themes.forEach(theme => {
    html.push(`<option value="${theme.themeName}">${theme['jcr:title'].join('')} (${theme.themeName})</option>`);
  });
  $('#change-theme').html(html.join(''))
    .on('change', function(ele) {
      localStorage.setItem('theme',ele.target.value);
      loadStyleAfterIframeLoad();
    }.bind(this));
}


$(window).on("load", function (e) {

    buildThemesDropdown();
    loadTheme();

    buildLeftNavigation();

    $('.stg-nav-level3-ul .nav-link').on('click', (e) => {
        let setParentNavText: string;
        let setCurrnetNavText = (e.target.innerHTML).split('- ').join('').trim();;
        let attr = $(e.target).closest('li.nav-item').attr('id');
        $('.stg-nav-level3-ul .nav-link').removeClass('active');
        $(e.target).addClass('active');
        if (typeof attr !== typeof undefined) {
            setParentNavText = $(e.target).closest('li.nav-item').find('a:first').text();
        } else {
            let targetElem = $(e.target).closest('div');
            setParentNavText = $(targetElem).closest('li.nav-item').find('a:first').text();
        }
        let currentBranch = $(e.target).closest('.collapse').attr('data-parent');
        let currentBranchLength = (currentBranch.length) - 9;
        let currentBranchId = currentBranch.substring(10, currentBranchLength);
        if (setCurrnetNavText !== '' && setParentNavText !== '') {
            for (let category of treeConfig.branches) {
                updateUtilitiesAndDemoBox(category, setCurrnetNavText, setParentNavText);
            }
            setURLHashParameter(currentBranchId);
            loadStyleAfterIframeLoad();
        }
        a11yValidator();
        e.preventDefault();
    });
    loadStyleAfterIframeLoad();
    updateDemoBoxFromURLParms();
    a11yValidator();
});

export { loadStyleAfterIframeLoad , getURLParamsObj,  updateURLFromParsObj}
