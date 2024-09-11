function addbookmark(pageURL){
    if (pageURL.indexOf("/adult") > -1 || pageURL.indexOf("/paediatric") > -1 || pageURL.indexOf("/infant") > -1) {
        if (pageURL.indexOf("/resources") > -1 || pageURL.indexOf("/products") > -1) {
            let urlLastPart = pageURL.split("/");
            urlLastPart = urlLastPart[(urlLastPart.length) - 1];
            if (urlLastPart.indexOf("resources.html") == -1 && urlLastPart.indexOf("products.html") == -1) {
                $("#pageContent .a-breadcrumb").addClass('bookmark-adjusted-breadcrumb');
                $(".bookmark-container").css('display','flex').show();
            }
        }
    }
}
function showbookmark(hcpID,bookmarkAPI,idToken,profileData){
    let bookmarkTable = "";
    if (window.location.href.indexOf("/profile-bookmark.html") > -1 && hcpID) {
        for (let sidePanelLength = 0; sidePanelLength < $("#sidePanel ul li").length; sidePanelLength++) {
            $("#sidePanel ul li").eq(sidePanelLength).css("border-left", "0");
            $("#sidePanel ul li").eq(sidePanelLength).find("a.a-link__text").css("color", "#002a3a");
            if ($("#sidePanel ul li").eq(sidePanelLength).find("a.a-link__text").attr("href").indexOf(window.location.pathname) > -1) {
                $("#sidePanel ul li").eq(sidePanelLength).css("border-left", "8px solid #009cde")
                $("#sidePanel ul li").eq(sidePanelLength).find("a.a-link__text").css("color", "#009cde");
            }
        }

        $.ajax({
            url: bookmarkAPI,
            crossDomain: true,
            method: 'post',
            headers: {
                'x-application-id': 'anhcpproconnect',
                'x-country-code': 'UK',
                'x-preferred-language': 'en',
                'x-id-token': idToken
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'userInfo': {
                    'actionType': 'favouritelist',
                    'hcpId': hcpID
                }
            })
        }).done(function (response) {
            profileData = response;
            if (profileData.response.length) {
                for (let i in profileData.response) {
                    bookmarkTable += "<tr><td><a href=" + encodeURI(profileData.response[i].portalUrl) + ">" + profileData.response[i].pageTitle + "</a></td><td><a href='#' id=" + profileData.response[i].bookmarkId + " class='delete-bookmark'> <img src=" + encodeURI("/content/dam/an/hcpproconnect/uk/en/images/delete-bookmark.png") + " ></a ></td ></tr > ";
                }
                $(".bookmark-table-wrapper table").append(bookmarkTable);
            }
        });
    }
}
function showbookmarkedHightlight(hcpID,bookmarkAPI,idToken,articlePageTitle){
    if (isUserLoggedIn() && hcpID) {
        $.ajax({
            url: bookmarkAPI,
            crossDomain: true,
            method: 'post',
            headers: {
                'x-application-id': 'anhcpproconnect',
                'x-country-code': 'UK',
                'x-preferred-language': 'en',
                'x-id-token': idToken
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'userInfo': {
                    'actionType': 'favouritelist',
                    'hcpId': hcpID
                }
            })
        }).done(function (response) {
            articlePageTitle = $("title").text();
            let retrieveData = response;
            if (retrieveData.response.length) {
                for (let j in retrieveData.response) {
                    if (articlePageTitle == retrieveData.response[j].pageTitle) {
                        $(".bookmark-container").addClass("bookmarked").removeClass("bookmark");
                    }
                }
            }
        });
    }
}

$(document).ready(function () {
    let bookmarkAPI = $(".api-bookmark").attr("data-attribute-api-bookmark");
    let pageURL = window.location.href;
    let articlePageTitle;
    let hcpID;
    let idToken = getCookie('jwtToken');
    let profileData;
    let bookmarkSuccessMessageContainer = "";
    let siteSearchAPI = $('#headerSearchSuggestApi').attr('data-api');
    let domainName = siteSearchAPI.split('api')[0];
    bookmarkAPI = domainName.concat(bookmarkAPI.substring(1));

    //To show the bookmark - article pages under => resources/products under => adult/paediatric/infant pages
    addbookmark(pageURL);
   
    if (isUserLoggedIn()) {
        hcpID = JSON.parse(localStorage.getItem("userInfo"));
        hcpID = hcpID.sfdcId;
    }

    //Creating a bookmark by clicking bookmark link
    $(".bookmark-link").click(function (e) {
        articlePageTitle = $("title").text();
        $(".bookmark-container a").addClass("disable-multiple-clicks");
        e.preventDefault();
        if (hcpID) {
            $.ajax({
                url: bookmarkAPI,
                crossDomain: true,
                method: 'post',
                headers: {
                    'x-application-id': 'anhcpproconnect',
                    'x-country-code': 'UK',
                    'x-preferred-language': 'en',
                    'x-id-token': idToken
                },
                contentType: 'application/json',
                data: JSON.stringify({
                    'userInfo': {
                        'actionType': 'favourite',
                        'isFavourited': '1',
                        'hcpId': hcpID,
                        'pageTitle': articlePageTitle,
                        'country': 'United Kingdom',
                        'portalUrl': pageURL
                    }
                })
            }).done(function (response) {
                if (response.status) {
                    $(".bookmark-container").addClass("bookmarked").removeClass("bookmark");
                    bookmarkSuccessMessageContainer = $(".bookmark-success-message");
                    $("#pageContent").prepend(bookmarkSuccessMessageContainer);
                    $(".bookmark-success-message").css("display", "flex");
                    $(".bookmark-container a").removeClass("disable-multiple-clicks");
                }
            });
        }
        else {
            window.location = "/content/an/hcpproconnect/uk/en/login.html";
        }
    });

    $(document).on("click", ".bookmark-success-message .abt-icon-cancel", function () {
        $(".bookmark-success-message").hide();
    });

    //highlight bookmark tab and showing all the bookmarks for the loggedin user
    showbookmark(hcpID,bookmarkAPI,idToken,profileData);

    //Showing the bookmarked hgihglight for the logged in user
    showbookmarkedHightlight(hcpID,bookmarkAPI,idToken,articlePageTitle);
   

    $(document).on("click", ".delete-bookmark", function (e) {
        e.preventDefault();
        //Deleting bookmark   
        let bookmarkIdToBeDeleted;
        bookmarkIdToBeDeleted = $(this).attr("id");
        $.ajax({
            url: bookmarkAPI,
            crossDomain: true,
            method: 'post',
            headers: {
                'x-application-id': 'anhcpproconnect',
                'x-country-code': 'UK',
                'x-preferred-language': 'en',
                'x-id-token': idToken
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'userInfo': {
                    'actionType': 'favourite',
                    'isFavourited': '0',
                    'bookmarkId': bookmarkIdToBeDeleted
                }
            })
        }).done(function (response) {
            $("#" + bookmarkIdToBeDeleted).parent().parent("tr").remove();
        });
    });
});