/**
 * Likethis plugin positioning on the page
 */

const isTablet = window.matchMedia("only screen and (min-width: 768px) and (max-width: 899px)").matches;
let bannerTop = 0, bannerLeft = 0, bannerWidth = 0, likethisWidth = 35, likethisLeft = 0, footer = 0, containerBottomStart = 0, containerBottom = 0, bodyLeftPadding = 0, bodyPadding = 0;
if (!isMobile() && !isTablet) {
    var checkAddThis = setInterval(addPosition, 500);
}

function addPosition() {
    if ($('#at4-share').length) {
        if ($('.a-container-variation--responsiveImageVideo').length) {
            bannerTop = $('.a-container-variation--responsiveImageVideo .cmp-container').offset().top;
            bannerLeft = $('.a-container-variation--responsiveImageVideo .cmp-container').offset().left;
            bodyLeftPadding = 1 * $('body').css('margin-left').replace(/px$/, '');
            bodyPadding = bodyLeftPadding > 0 ? bodyLeftPadding : 0;
            if ($('html').attr('dir') === 'rtl')
                bannerWidth = $('.a-container-variation--responsiveImageVideo .cmp-container').width();
        }

        if ($('.at4-share').length) {
            likethisWidth = ($('html').attr('dir') === 'rtl') ? (bannerLeft + bannerWidth) : (bannerLeft - $('.at4-share').width());
            likethisLeft = likethisWidth > 0 ? (likethisWidth - 5) : 0;
        }
        $('#at4-share').attr('style', 'top: ' + bannerTop + 'px !important; left: ' + (likethisLeft - bodyPadding) + 'px !important').css('position', 'absolute');
        clearInterval(checkAddThis);
        getCompPosition();
    }
}

function getCompPosition() {
    setTimeout(function () {
        footer = $('.footer').offset().top;
        containerBottomStart = footer - 500;
        containerBottom = footer - 320;
    }, 3000);
}

$(document).on('scroll', function () {

    if (!isMobile() && !isTablet) {
        if ($(document).scrollTop() < bannerTop - 150) {
            $('#at4-share').attr('style', 'top: ' + bannerTop + 'px !important; left: ' + (likethisLeft - bodyPadding) + 'px !important').css('position', 'absolute');
        }
        else if ($(document).scrollTop() > containerBottomStart) {
            $('#at4-share').attr('style', 'top: ' + containerBottom + 'px !important; left: ' + (likethisLeft - bodyPadding) + 'px !important').css('position', 'absolute');
        }
        else {
            $('#at4-share').attr('style', 'top: 150px !important; left: ' + likethisLeft + 'px !important').css('position', 'fixed');
        }
    }

    if (window.innerHeight > 700) {
        if ($(document).scrollTop() < 50) {
            $('#at4-share').attr('style', 'top: ' + bannerTop + 'px !important; left: ' + (likethisLeft - bodyPadding) + 'px !important').css('position', 'absolute');
        }
        else if ($(document).scrollTop() > containerBottomStart - 20) {
            $('#at4-share').attr('style', 'top: ' + containerBottom + 'px !important; left: ' + (likethisLeft - bodyPadding) + 'px !important').css('position', 'absolute');
        }
        else {
            $('#at4-share').attr('style', 'top: 150px !important; left: ' + likethisLeft + 'px !important').css('position', 'fixed');
        }
    }
});

/**
* Fetch User Email ID if it is available in Session Storage and update it in text component
**/

$(document).ready(function () {
    if (isOnPublish() && $(document).find('#fetchUserEmailID').length) {
        const userEmailID = getItemSessionStorage('email');
        if (userEmailID !== null)
            $('.text #fetchUserEmailID').text(userEmailID);
        else
            $('.text #fetchUserEmailID').text('');
    }
});

/**
* Hide form field label when text is hidden (need to include this as required * is displayed even though label hidden checkbox is checked) 
**/

$(document).ready(function () {
    if (isOnPublish() && ($(document).find('.a-input-label').length || $(document).find('.a-checkbox-label').length)) {
        $(document).find('.a-input-label').each(function () {
            asteriskRemovalCheck($(this));
        });
        $(document).find('.a-checkbox-label').each(function () {
            asteriskRemovalCheck($(this));
        })
    }

    function asteriskRemovalCheck($this) {
        let labelText = $this.text().trim();
        if (labelText.length === 0 || (labelText.length === 1 && labelText.includes('*'))) {
            $this.addClass('d-none');
        }
    }
});

/**
* Code for Accessibility contrast
**/

$(document).ready(function () {
    $(".accessibilty-image").on('click', function () {
        $(".accessbility-contrast .menu").toggle();
    });
    $("#link-one").on('click', function () {
        $("body").toggleClass("contrasted");
        $(".accessbility-contrast .menu").toggle();
    });
});

/**
* Code for triggering stock information api call
**/

function triggerStockAPI(tileEle, stockApiUrl) {
    $.ajax({
        url: stockApiUrl,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('x-country-code', 'US');
            xhr.setRequestHeader('x-application-id', 'abbottcom');
            xhr.setRequestHeader('x-preferred-language', 'EN');
            xhr.setRequestHeader('Content-Type', 'application/json');
        },
        type: 'GET'
    }).done(function (data) {

        if (data.response && data.response.length) {
            if ($('.stock-Info').length == 0) {
                let tileParaEle = tileEle.find('.a-tile__para');
                let tileText = tileParaEle.text().trim();
                tileParaEle.empty().append(`<p>${tileText}</p>`);
                $('<p class="stock-Info"></p>').insertAfter(tileParaEle.children()).last();
            }
            $.map(data.response, function (_, value) {
                if (data.response[value].symbol == "ABT") {
                    let ExchangeValue = data.response[value].exchange;
                    let TickerValue = data.response[value].symbol;
                    let TradeValue = data.response[value].lastTrade;
                    let ChangeValue = data.response[value].changeNumber;
                    let changePercent = data.response[value].changePercent;
                    if (ChangeValue >= 0) {
                        $(".stock-Info").html("<p class='trade-val'><span>" + ExchangeValue + "</span><span> :</span><span> " + TickerValue + "</span> <span class='font-12'> (Updated every 15 minutes) </span></p><p class='trade-val'>" + TradeValue + "<sub> USD </sub><span class='up-arrow'></span><span> " + ChangeValue + " </span><span> (" + changePercent + "%) </span></p>");
                    } else if (ChangeValue < 0) {
                        $(".stock-Info").html("<p class='trade-val'><span>" + ExchangeValue + "</span><span> :</span><span> " + TickerValue + "</span> <span class='font-12'> (Updated every 15 minutes) </span></p><p class='trade-val'>" + TradeValue + "<sub> USD </sub><span class='down-arrow'></span><span> " + ChangeValue + " </span><span> (" + changePercent + "%) </span></p>");
                    }
                }
            });

            if ($(".stock-Info").children().length == 0) {
                $(".stock-Info").css('visibility', 'hidden');
            } else {
                $(".stock-Info").css('visibility', 'visible');
            }
        }

    }).fail(function () {
        console.error('Stock API Request Failed!');
    });
}

$(document).ready(function () {
    if ($('#stock-ticker-form').length && $('#stock-ticker-api').length && isOnPublish()) {
        let stockAPIForm = $('#stock-ticker-form'); // This ID has to be configured in form container dialog under ID field
        let tileElement = $('#stock-ticker-api'); // This ID has to be configured in tile dialog under ID field
        stockAPIForm.parent().hide();
        let stockAPIUrl = stockAPIForm.find('form').attr('action');
        triggerStockAPI(tileElement, stockAPIUrl);

        // Trigger the API call every 15mins
        setInterval(function () { triggerStockAPI(tileElement, stockAPIUrl) }, 900000);
    }
});