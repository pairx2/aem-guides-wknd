let getImagePath = $('.imgRemoveIcon').val();
let cardidarray = [];
const minItems = parseInt($('.minItems').val());
const maxItems = parseInt($('.maxItems').val());
$('body').on('click touchstart', '.m-product-compare__checkbox', function () {
    if (cardidarray.length == maxItems && $(this).is(':checked')) {
        $('.compare-popup-alert').removeClass('d-none');
        $(this).prop('checked', false);
        return;
    }

    let getName = $(this).closest('.a-card-result');
    let getProductName = $(this).closest('.a-card-result .m-product-compare__checkbox')[0].dataset.cardsid;
    if ($(this).is(':checked')) {

        $(".compare-tray").removeClass('d-none');
        $('.customAccordionHeader').addClass('open');
        $('.accordionBody').removeClass('d-none');
        if ($(".compare-tray .card-body .product-wrapper .product-img[data-val='" + getProductName + "']").length == 0) {
            $('.compare-tray .card-body .product-wrapper').append('<div class="product-img" data-val="' + getProductName + '"><img src="' + getName.find('.product-card_image').attr('src') + '" alt="image2" /><i class="removeicon ' + getImagePath + '"  data-productid="' + getProductName + '"></i></div>');
            let cardid = $(this).data('cardsid');
            cardidarray.push({
                id: cardid
            });
            localStorage.setItem("abbottnutrition-product-comparison", JSON.stringify(cardidarray));
            ctaDisabled();

        }
    } else {
        if ($('.compare-tray .card-body .product-wrapper .product-img').length <= maxItems) {
            $('.m-product-compare__checkbox').prop('disabled', false);
        }
        $(".compare-tray .card-body .product-wrapper .product-img[data-val='" + getProductName + "']").remove();
        let cardid = $(this).data('cardsid');
        const itemIndex = cardidarray.findIndex((card) => card.id == cardid);
        cardidarray.splice(itemIndex, 1);
        localStorage.setItem("abbottnutrition-product-comparison", JSON.stringify(cardidarray));
        ctaDisabled();
        if ($(".compare-tray .card-body .product-wrapper .product-img").length == 0) {
            $(".compare-tray").addClass('d-none');
        }
    }
});

$('body').on('click', '.compare-tray .closeicon', function () {
    setTimeout(function () {
        $('.compare-tray .collapse').removeClass('show');
    }, 100);
});

$('body').on('click touchstart', '.compare-tray .removeicon', function () {
    let productid = $(this).data('productid');
    $(".compare-tray .card-body .product-wrapper .product-img[data-val=" + productid + "]").remove();
    $(".m-product-compare__checkbox[data-cardsid=" + productid + "]").prop('checked', false);
    $('.m-product-compare__checkbox').prop('disabled', false);
    const itemIndex = cardidarray.findIndex((card) => card.id == productid);
    cardidarray.splice(itemIndex, 1);
    localStorage.setItem("abbottnutrition-product-comparison", JSON.stringify(cardidarray));
    ctaDisabled();
    if ($(".compare-tray .card-body .product-wrapper .product-img").length == 0) {
        $(".compare-tray").addClass('d-none');
    }
});

$('body').on('click touchstart', '.compare-tray .removeAll', function () {
    $(".compare-tray .card-body .product-wrapper .product-img").remove();
    $(".m-product-compare__checkbox").prop('checked', false);
    $('.compareCTA').prop('disabled', true);
    $('.m-product-compare__checkbox').prop('disabled', false);
    cardidarray.length = 0;
    localStorage.setItem("abbottnutrition-product-comparison", JSON.stringify(cardidarray));
    $('.customAccordionHeader').removeClass('open');
    $('.accordionBody').addClass('d-none');
    $(".compare-tray").addClass('d-none');
});

$(document).on("click touchstart", '.customAccordionHeader .title', function () {
    if (!$('.customAccordionHeader').hasClass('open')) {
        $('.customAccordionHeader').addClass('open');
        $('.accordionBody').removeClass('d-none');
    } else {
        $('.customAccordionHeader').removeClass('open');
        $('.accordionBody').addClass('d-none');
    }
});

$(document).on("click touchstart", '.compareCTA', function () {
    let localStorageIDs = JSON.parse(localStorage.getItem("abbottnutrition-product-comparison"));
    let text = {};
    for (let member in localStorageIDs) {
        text[member] = localStorageIDs[member].id;
    }
    let genrateURL = $(this).attr('data-path') + '.html?productids=' + Object.values(text);
    window.location.assign(genrateURL);
});

function ctaDisabled() {
    if (cardidarray.length >= minItems) {
        $('.compareCTA').prop('disabled', false);
    } else {
        $('.compareCTA').prop('disabled', true);
    }
}
$(document).on("click touchstart", '.a-pagination__link.no-click', function (event) {
    event.stopImmediatePropagation();
});
$(document).on("click touchstart", '.a-pagination__link', function () {
    $("html, body").scrollTop(300);
    if ($('.o-search-res__results--view .a-card-result').children().length > 0) {
        let getList = localStorage.getItem("abbottnutrition-product-comparison");
        if (getList.length > 0) {
            cardidarray = JSON.parse(getList);
            ctaDisabled();
            let localStorageID;

            for (const element of cardidarray) {
                localStorageID = element.id;
                $(".m-product-compare__checkbox[data-cardsid=" + localStorageID + "]").prop('checked', true);
            }
        }
    }
});

$(document).on("click touchstart", '#compare-alert-btn', function () {
    $(".compare-popup-alert").addClass('d-none');
});

$(document).on("click touchstart", '.removealert', function () {
    $(".compare-popup-alert").addClass('d-none');
});


function getImageID(cardidarray) {
    let localStorageID;
    let imgID;
    let searchresults = JSON.parse(sessionStorage.getItem('searchResult'));
    for (const element of cardidarray) {
        localStorageID = element.id;
        searchresults.response.results.forEach(function (current) {
            if (localStorageID == current.productid) {
                imgID = current.productimage;
                if ($(".compare-tray .card-body .product-wrapper .product-img[data-val='" + localStorageID + "']").length == 0) {
                    $('.compare-tray .card-body .product-wrapper').append('<div class="product-img" data-val="' + localStorageID + '"><img src="' + imgID + '" alt="image2" /><i class="removeicon ' + getImagePath + '"  data-productid="' + localStorageID + '"></i></div>');
                    $(".m-product-compare__checkbox[data-cardsid=" + localStorageID + "]").prop('checked', true);
                }
            }
        });
    }
}

//compare tray on load
$(window).bind('load', function () {
    let ourProductBanner = $("#section_an-our-products");
    if (ourProductBanner.length > 0) {
        const anProductInterval = setInterval(anProductTimer, 1000);

        function anProductTimer() {
            if ($('.a-spinner').hasClass('d-none')) {
                $('.search-results-container .filter-text, .search-results-container .o-search-results-filter').addClass('d-block');
                if (document.querySelector(".o-search-res__results--view")?.children[0]?.classList.contains("a-card-result")) {
                    const getList = localStorage.getItem("abbottnutrition-product-comparison");
                    if (getList != null && getList != undefined && getList != "[]" && getList.length > 0) {
                        $(".compare-tray").removeClass('d-none');
                        $('.customAccordionHeader').addClass('open');
                        $('.accordionBody').removeClass('d-none');
                        clearInterval(anProductInterval);
                        cardidarray = JSON.parse(getList);
                        ctaDisabled();

                        getImageID(cardidarray);

                    }
                    clearInterval(anProductInterval);
                }
            }
        }
    }
});