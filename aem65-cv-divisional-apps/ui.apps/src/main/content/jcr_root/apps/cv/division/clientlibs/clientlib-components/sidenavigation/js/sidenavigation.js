var $faClick = $('.sideNavigationComp .side-nav-panel .abt-icon, .mac-chrome .side-nav-panel .abt-icon').click(function () {
    $faClick.not(this).removeClass("down");
    $faClick.not(this).next().removeClass("display");
    $(this).next('ul.tree.display').toggle('2000');
    $(this).toggleClass("down blueColor");
    $(this).next('ul.tree').toggleClass("display");
    $(".sideNavigationComp .side-nav-panel .parent-li, .mac-chrome .side-nav-panel .parent-li").each(function () {
        if ($(this).hasClass("active")) {
            $(this).children().addClass("activeColor");
        }
    });

});

$('.sideNavigationComp ul.child li a, .mac-chrome ul.child li a').on('click', function () {
    $(".parent-li").removeClass("active");
    $('.sideNavigationComp ul.nav li.active').removeClass("active");
    $(this).parent("li").addClass('active');
    $(this).parent().parent("li").addClass("active");
});

$('.sideNavigationComp .grand-parent-li, .mac-chrome .grand-parent-li').on('click', function () {
    $(this).addClass("active");
});

$(".parent-li, .mac-chrome .parent-li").each(function () {
    var childItems = $(this).find("ul.child li");
    if (childItems.length == "0") {
        $(this).children().removeClass("abt-icon abt-icon-left-arrow");
    }
});

var nvpgurlGrand = window.location.href.substr(window.location.href.lastIndexOf("/") + 1).split("?")[0];
var nvpgurl = window.location.href.split('?')[0];
nvpgurl = nvpgurl.split('/');
nvpgurl = nvpgurl[nvpgurl.length - 2] + "/" + nvpgurl[nvpgurl.length - 1];
$(".sideNavigationComp .parent-li a, .mac-chrome .parent-li a").each(function () {
    var nvpgurl1 = $(this).attr('href').split('/');
    nvpgurl1 = nvpgurl1[nvpgurl1.length - 2] + "/" + nvpgurl1[nvpgurl1.length - 1];
    if (nvpgurl1 == nvpgurl) {
        $(this).parent().parent().addClass("active");
        $(this).parent().siblings(".abt-icon").addClass("down");
        $(this).parent().parent().children("ul.tree").addClass("display");

    }
});

$(".sideNavigationComp ul.child li a, .mac-chrome ul.child li a").each(function () {
    var nvpgurl2 = $(this).attr('href').split('/');
    nvpgurl2 = nvpgurl2[nvpgurl2.length - 2] + "/" + nvpgurl2[nvpgurl2.length - 1];
    if (nvpgurl2 == nvpgurl) {
        $(this).parent().addClass("active");
        $(this).parent().parent().addClass("display");
        $(this).parent().parent().siblings(".abt-icon").addClass("down").addClass("blueColor");
    }
});

$(".sideNavigationComp .grand-parent-li, .mac-chrome .grand-parent-li").each(function () {
    if (($(this).attr("href").substr($(this).attr("href").lastIndexOf("/") + 1)) == nvpgurlGrand) {
        $(this).addClass("active");
    }
});


if (window.innerWidth < 767) {
    if ($.trim($(".side-nav-panel, .mac-chrome .side-nav-panel").html()) == '') {
        $(".side-nav-mob, .mac-chrome .side-nav-mob").css("display", "none");
    }
}

if (window.innerWidth > 767) {
    $(".sideNavigationComp .parent-li .parent, .mac-chrome .parent-li .parent").each(function () {
        var navHgt = $(this).height();
        if (navHgt > "20") {
            $(this).next(".abt-icon").css("margin-top", "9px");
        }
    });
}


$(".side-nav-mob .abt-icon-left-arrow, .mac-chrome .side-nav-mob .abt-icon-left-arrow").click(function () {
    $(this).addClass("display-none");
    $(this).siblings(".abt-icon-right-arrow").removeClass("display-none");
});

$(".openNavMenu, .mac-chrome .openNavMenu").click(function () {
    $(this).next(".abt-icon-left-arrow").addClass("display-none");
    $(this).prev(".abt-icon-right-arrow").removeClass("display-none");
});

$(".side-nav-mob .abt-icon-right-arrow, .mac-chrome .side-nav-mob .abt-icon-right-arrow").click(function () {
    $(this).addClass("display-none");
    $(this).siblings(".abt-icon-left-arrow").removeClass("display-none");
});


/** Side Navigation JS Function Begins **/
function openNav() {
    document.getElementById("mySidenav").style.width = "calc(100% - 5px)";
    document.getElementById("mySidenav").style.paddingLeft = "15px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("mySidenav").style.paddingLeft = "0px";
}

/** Side Navigation JS Function Ends **/