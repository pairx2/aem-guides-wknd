import { treeConfig, PunkViewPort } from '../../framework/AEMPUnkTree/punk-tree';
import { getURLParamsObj, updateURLFromParsObj } from '../../components/navigation/navigation';
const viewports = treeConfig.viewports;

$('.stg-top-nav').ready(() => {
    let viewportOptions = '<a class="dropdown-item defautl" href="#" data-x="100%" data-y="100%" data-id="default">None</a>';
    for (let i in viewports) {
        let currentViewport = viewports[i];
        viewportOptions += ' <a class="dropdown-item" href="#" data-x="' + currentViewport.x + 'px" data-y="' + currentViewport.y + 'px" data-id="' + currentViewport.id + '">' + currentViewport.label + ' <small><strong>(' + currentViewport.x + 'X' + currentViewport.y + ')</strong></small> </a>';
    }
    $('#viewport-dropdown .dropdown-menu').html(viewportOptions);

    let updateURLParam;
    updateURLParam = (viewportid) => {
        let hash = window.location.hash.substr(1);
        if (hash !== '') {
            let result = getURLParamsObj();
            result["viewport"] = viewportid;
            if (viewportid === 'default') {
                delete result.viewport;
                delete result.rotate;
            }
            updateURLFromParsObj(result);
        }
    }

    let updateRotateUrlParam;
    updateRotateUrlParam = () => {
        let hash = window.location.hash.substr(1);
        if (hash !== '') {
            let result = getURLParamsObj();
            if (result["rotate"] === 'landscape') {
                delete result.rotate;
            } else {
                result["rotate"] = 'landscape';
            }
            updateURLFromParsObj(result);
        }
    };


    $('#viewport-dropdown .dropdown-item').click((event) => {
        event.preventDefault();
        const x = $(event.target).attr('data-x');
        const y = $(event.target).attr('data-y');
        const viewportid = $(event.target).attr('data-id');
        let paramsObj = getURLParamsObj();
        viewportid === 'default' ? $('#viewport-rotate').fadeOut() : $('#viewport-rotate').fadeIn();
        if (paramsObj.hasOwnProperty('rotate')) {
            $('#stg-demo-iframe').css('width', y);
            $('#stg-demo-iframe').css('height', x);
        } else {
            $('#stg-demo-iframe').css('width', x);
            $('#stg-demo-iframe').css('height', y);
        }
        if (x !== '100%') {
            if (!$('#stg-demo-iframe').hasClass('responsive-on'))
                $('#stg-demo-iframe').addClass('responsive-on');
        } else {
            $('#stg-demo-iframe').removeClass('responsive-on');
        }
        updateURLParam(viewportid);
    });

    $('#viewport-rotate').click(() => {
        let hash = window.location.hash.substr(1);
        if (hash !== '') {
            let currentX = $('#stg-demo-iframe').width();
            let currentY = $('#stg-demo-iframe').height();
            $('#stg-demo-iframe').width(currentY);
            $('#stg-demo-iframe').height(currentX);
            updateRotateUrlParam();
        }
    });


    let updateViewportFromURLParam;
    updateViewportFromURLParam = () => {
        let paramsObj = getURLParamsObj();
        if (paramsObj.hasOwnProperty('viewport')) {
            let viewportId = paramsObj['viewport'];
            $('#viewport-dropdown .dropdown-item[data-id ="' + viewportId + '"]').click();
        }
    };

    updateViewportFromURLParam();

    // full screen functionlity
    $('#full-screen').on('click', () => {
        let $stgDemoBoxEle = $('#stg-demo-box');
        let $stgUtilityBoxEle = $('#stg-utility-box');
        let $fullScreenEle = $('#full-screen');
        if ($fullScreenEle.hasClass('active')) {
            $fullScreenEle.removeClass('active').find('.mdi').addClass('mdi-fullscreen').removeClass('mdi-fullscreen-exit');
            $('#sticky-sidebar').show(300);
            $stgUtilityBoxEle.show(300);
            $('nav.navbar-dark').removeClass('col-12');
        } else {
            $fullScreenEle.addClass('active').find('.mdi').removeClass('mdi-fullscreen').addClass('mdi-fullscreen-exit');
            $('#sticky-sidebar').hide(300);
            $stgUtilityBoxEle.hide(300);
            $('nav.navbar-dark').addClass('col-12');
        }
        $stgDemoBoxEle.toggleClass('fullscreen-active');
    });

});
