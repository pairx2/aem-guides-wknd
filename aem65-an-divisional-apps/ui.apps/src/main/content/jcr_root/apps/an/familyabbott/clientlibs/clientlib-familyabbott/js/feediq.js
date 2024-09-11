let id;
let lastClickedElement, currElement;
let flag = '';
const getVideoElement = (ele) => ($('.section2 .video').find(ele));
const getCurrElement_1 = (ele) => (ele?.split('-')[0]);
let currVideoElement;

$(document).ready(function () {
    let allImages = document.querySelectorAll('[loading="lazy"]');
    allImages.forEach((img) => {
        img.removeAttribute('loading');
    });
});

function setVal(id) {
    lastClickedElement = id;
}

function getVal() {
    return lastClickedElement;
}

function getId() {
    id = $(this).attr('id');
    return id;
}
function resetVideo() {
    $('.m-video:not(.d-none) video').get(0).currentTime = '0';
    $('.m-video:not(.d-none) video').get(0).pause();
    $("#icon-play").removeClass("d-none");
    let dom = $('.m-video:not(.d-none) .a-video')[0]?.children[0]?.firstElementChild;
    dom.removeAttribute('controls');
    }
function pauseVideo() {
    $('.m-video:not(.d-none) video').get(0).pause();
    $("#icon-play").removeClass("d-none");
    let dom = $('.m-video:not(.d-none) .a-video')[0]?.children[0]?.firstElementChild;
    dom.removeAttribute('controls');
}
function showIcons() {
    $("#icon-home").show();
    $("#icon-hamburger").show();
}
function hideIcons() {
    $("#icon-home").hide();
    $("#icon-hamburger").hide();
}

function hideScreen3(currElement) {
    $(currElement).hide();
    $(currElement.replace('hotspot', 'heading')).hide();
}

$('.dropup-lang-content a').on('click', function (e) {
    console.log(currElement, e.currentTarget.id);
    try {
        $('.m-video:not(.d-none)').addClass('d-none');
        let element_Name = e.currentTarget.id.replace('opt', getCurrElement_1(currElement)) + '-video';
        currVideoElement = getVideoElement(element_Name);
        $(currVideoElement).closest('.m-video').removeClass('d-none');
        pauseVideo();
        screenFocus();
    } catch (e) {
        console.error(e);
    }

})

function screenFocus() {
    $('html, body').animate({ scrollTop: 150 }, 'fast');
}

function updateScreen4(currElement) {
    if (currElement.length > 0 && currElement.includes('-') && flag.length < 1) {
        let val = currElement.split('-');
        $(val[0] + "-" + val[1] + "-image").hide();
        $(val[0] + "-" + val[1] + "-description").hide();
        $("#" + val[1] + "-heading").hide();
        $("#icon-" + val[1]).show();
        $("#icon-" + val[1] + "-hover").hide();
    }
    else if (currElement.length > 0 && currElement.includes('-') && flag.length > 1) {
        let val = currElement.split('-');
        $(flag + "-" + val[1] + "-image").hide();
        $(flag + "-" + val[1] + "-description").hide();
        $("#" + val[1] + "-heading").hide();
        $(flag + "-heading").hide();
        $("#icon-" + val[1]).show();
        $("#icon-" + val[1] + "-hover").hide();
    }
}

$('.section1 #col-cntl .cmp-image').on('click', function(e) {
    setVal(e.currentTarget.id);
    $(".section1").hide();
    $(".section3").hide();
    $(".section4").hide();
    $(".section2").show();
    $("#icon-language").show();
    currElement= "#" + e.currentTarget.id.replace('img', 'video');
    $(currElement).closest('.m-video').removeClass('d-none');
    $("#hamburger-menu").show();
    showIcons();
    pauseVideo();
    screenFocus();
})

/*------------------------------------------------------------------------------------------------------------*/
$('.dropup-content a').on('click', function (e) {
    try {
        resetVideo();
        pauseVideo();
        if (currElement.includes('hotspot')) { hideScreen3(currElement); }
        if (!currElement.includes('hotspot') && !currElement.includes('img') && !currElement.includes('opt')) {
            updateScreen4(currElement);
        }
        id = $(this).attr('id');
        setVal(id);
        $(".section3").hide();
        $(".section4").hide();
        $(".section2").show();
        $("#icon-language").show();
        showIcons();
        $('.m-video:not(.d-none)').addClass('d-none');
        currElement = '#' + id.replace('opt', 'video');
        $(currElement).closest('.m-video').removeClass('d-none');
        pauseVideo();
        flag = '';
        screenFocus();

    } catch (e) {
        console.error(e);
    }

})
/*------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '#icon-hand-hs', function () {
    $(".section3").hide();
    hideScreen3(currElement);
    $(".section4").show();
    if (currElement.includes('hotspot')) {
        $(currElement.replace('hotspot', 'hand-image')).show();
        $('#hand-heading').show();
        $(currElement.replace('hotspot', 'hand-description')).show();
        $(currElement.replace('hotspot', 'heading')).show();
        $("#icon-hand").hide();
        $("#icon-hand-hover").show();
    }
    lastClickedElement = currElement;
    currElement = currElement.replace('hotspot', 'hand');
    flag = currElement.split('-');
    flag = flag[0];
});

$(document).on('click', '#icon-head-hs', function () {
    $(".section3").hide();
    hideScreen3(currElement);
    $(".section4").show();
    if (currElement.includes('hotspot')) {
        $(currElement.replace('hotspot', 'head-image')).show();
        $('#head-heading').show();
        $(currElement.replace('hotspot', 'head-description')).show();
        $(currElement.replace('hotspot', 'heading')).show();
        $("#icon-head").hide();
        $("#icon-head-hover").show();
    }
    lastClickedElement = currElement;
    currElement = currElement.replace('hotspot', 'head');
    flag = currElement.split('-');
    flag = flag[0];
});

$(document).on('click', '#icon-contact-hs', function () {
    $(".section3").hide();
    hideScreen3(currElement);
    $(".section4").show();
    if (currElement.includes('hotspot')) {
        $(currElement.replace('hotspot', 'contact-image')).show();
        $('#contact-heading').show();
        $(currElement.replace('hotspot', 'contact-description')).show();
        $(currElement.replace('hotspot', 'heading')).show();
        $("#icon-contact").hide();
        $("#icon-contact-hover").show();
    }
    lastClickedElement = currElement;
    currElement = currElement.replace('hotspot', 'contact');
    flag = currElement.split('-');
    flag = flag[0];
});

$(document).on('click', '#icon-posture-hs', function () {
    $(".section3").hide();
    hideScreen3(currElement);
    $(".section4").show();
    if (currElement.includes('hotspot')) {
        $(currElement.replace('hotspot', 'posture-image')).show();
        $('#posture-heading').show();
        $(currElement.replace('hotspot', 'posture-description')).show();
        $(currElement.replace('hotspot', 'heading')).show();
        $("#icon-posture").hide();
        $("#icon-posture-hover").show();
    }
    lastClickedElement = currElement;
    currElement = currElement.replace('hotspot', 'posture');
    flag = currElement.split('-');
    flag = flag[0];
});
/*------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '#icon-hand', function () {
    lastClickedElement = currElement;

    if (!currElement.includes('hotspot') && !currElement.includes('img') && !currElement.includes('opt')) {
        updateScreen4(currElement);
    }
    currElement = $(this).attr('id');

    $(flag + "-hand-image").show();
    $(flag + "-hand-description").show();
    $("#hand-heading").show();
    $(flag + "-heading").show();
    $("#icon-hand").hide();
    $("#icon-hand-hover").show();
});

$(document).on('click', '#icon-head', function () {
    lastClickedElement = currElement;
    if (!currElement.includes('hotspot') && !currElement.includes('img') && !currElement.includes('opt')) {
        updateScreen4(currElement);
    }
    currElement = $(this).attr('id');

    $(flag + "-head-image").show();
    $(flag + "-head-description").show();
    $("#head-heading").show();
    $(flag + "-heading").show();
    $("#icon-head").hide();
    $("#icon-head-hover").show();
});

$(document).on('click', '#icon-contact', function () {
    lastClickedElement = currElement;
    if (!currElement.includes('hotspot') && !currElement.includes('img') && !currElement.includes('opt')) {
        updateScreen4(currElement);
    }
    currElement = $(this).attr('id');

    $(flag + "-contact-image").show();
    $(flag + "-contact-description").show();
    $("#contact-heading").show();
    $(flag + "-heading").show();
    $("#icon-contact").hide();
    $("#icon-contact-hover").show();
});

$(document).on('click', '#icon-posture', function () {
    lastClickedElement = currElement;
    if (!currElement.includes('hotspot') && !currElement.includes('img') && !currElement.includes('opt')) {
        updateScreen4(currElement);
    }
    currElement = $(this).attr('id');

    $(flag + "-posture-image").show();
    $(flag + "-posture-description").show();
    $("#posture-heading").show();
    $(flag + "-heading").show();
    $("#icon-posture").hide();
    $("#icon-posture-hover").show();
});
/*------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '#icon-more-option', function () {
    $(".section2").hide();
    $(".section3").show();
    $("#icon-language").hide();
    resetVideo();
    pauseVideo();

    lastClickedElement = currElement;
    if (currElement.includes('video')) {
        $(currElement.replace('video', 'hotspot')).show();
        $(currElement.replace('video', 'heading')).show();
    }
    showIcons();
    currElement = currElement.replace('video', 'hotspot');
    screenFocus();
})
$(document).on('click', '#icon-home', function () {
    resetVideo();
    pauseVideo();
    $('.m-video:not(.d-none)').addClass('d-none');
    
    if (currElement.includes('hotspot')) {
        $(currElement.replace('hotspot', 'heading')).hide();
        $(currElement).hide();
    }
    if (!currElement.includes('hotspot') && !currElement.includes('img') && !currElement.includes('opt')) {
        updateScreen4(currElement);
    }
    id = $(this).attr('id');

    $(".section2").hide();
    $(".section3").hide();
    $(".section4").hide();
    $(".section1").show();
    hideIcons();
    flag = '';
    $("#hamburger-menu").hide();
    $("#icon-language").hide();
    $('html, body').animate({ scrollTop: 80 }, 'fast');
    
});
$(document).on('click', '#icon-back', function () {
    $(".section3").hide();
    hideScreen3(currElement);
    $(".section2").show();
    currElement = currElement.replace('hotspot', 'video');
    $(currElement).show();
    $("#icon-language").show();
    showIcons();
    $("#icon-play").removeClass("d-none");
    let dom = $('.m-video:not(.d-none) .a-video')[0]?.children[0]?.firstElementChild;
    dom.hasAttribute('controls') === true ? dom.removeAttribute('controls') : dom.setAttribute('controls', '');

    screenFocus();
});

$(document).on('click', '#icon-replay', function () {
    resetVideo();
});

$(document).on('click', '#icon-play', function () {
     $("#icon-play").addClass("d-none");
    let dom = $('.m-video:not(.d-none) .a-video')[0]?.children[0]?.firstElementChild;
    dom.play();
    dom.setAttribute('controls', '');
});
