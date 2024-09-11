let nonSelectedCards = 0;
let selectedCards = 0;
let parentElement;
let totalCards;
let dropdownSelectionsObject = {
    'dishtype': -1,
    'form': -1,
    'preptime': -1
}

// Dynamically adding hrefs to cards.
$('.a-container-card-with-filter article').on('click', function () {
    let contentfragmentElement = $(this).find('.cmp-contentfragment__elements');
    let contentdetailsreferenceElement = contentfragmentElement.find('.cmp-contentfragment__element--contentdetailsreference');
    let valueElement = contentdetailsreferenceElement.find('.cmp-contentfragment__element-value');
    window.location.href = valueElement.text();
});

function showCardWithFilter(strText,dropdownSelectionsObject,thisElement) {    
    if (((strText.indexOf(dropdownSelectionsObject['dishtype']) > -1) && (strText.indexOf(dropdownSelectionsObject['form']) > -1) && (dropdownSelectionsObject['preptime'] == -1)) || ((strText.indexOf(dropdownSelectionsObject['form']) > -1) && (strText.indexOf(dropdownSelectionsObject['preptime']) > -1) && (dropdownSelectionsObject['dishtype'] == -1)) || ((strText.indexOf(dropdownSelectionsObject['dishtype']) > -1) && (strText.indexOf(dropdownSelectionsObject['preptime']) > -1) && (dropdownSelectionsObject['form'] == -1)) || ((strText.indexOf(dropdownSelectionsObject['dishtype']) > -1) && (dropdownSelectionsObject['form'] == -1) && (dropdownSelectionsObject['preptime'] == -1)) || ((strText.indexOf(dropdownSelectionsObject['form']) > -1) && (dropdownSelectionsObject['dishtype'] == -1) && (dropdownSelectionsObject['preptime'] == -1)) || ((strText.indexOf(dropdownSelectionsObject['preptime']) > -1) && (dropdownSelectionsObject['form'] == -1) && (dropdownSelectionsObject['dishtype'] == -1))){
        thisElement.removeClass('d-none');
    } 
}

// On dropdown change.
$('.a-dropdown__field .a-dropdown__menu li').on('click', function () {
    parentElement = $(this).closest('.a-dropdown__field');

    // For background and text change of dropdownds.
    if ($(this).text().trim().toLowerCase() === 'all') {
        parentElement.addClass('all-selected');
        parentElement.removeClass('single-selected');
    } else {
        parentElement.removeClass('all-selected');
        parentElement.addClass('single-selected');
    }

    if ($(this).attr('data-optionvalue').indexOf('dishtype') > -1) {
        dropdownSelectionsObject['dishtype'] = $(this).attr('data-optionvalue');
    }
    if ($(this).attr('data-optionvalue').indexOf('form') > -1) {
        dropdownSelectionsObject['form'] = $(this).attr('data-optionvalue');
    }
    if ($(this).attr('data-optionvalue').indexOf('preptime') > -1) {
        dropdownSelectionsObject['preptime'] = $(this).attr('data-optionvalue');
    }

    $(".a-container-card-with-filter article").each(function () {
        let thisElement = $(this);
        thisElement.addClass('d-none');
        let str = thisElement.find('.cmp-contentfragment__element--tagsType').find(".cmp-contentfragment__element-value");
        let strText = str.text().trim();

        if ((strText.indexOf(dropdownSelectionsObject['dishtype']) > -1) && (strText.indexOf(dropdownSelectionsObject['form']) > -1) && (strText.indexOf(dropdownSelectionsObject['preptime']) > -1)) {
            thisElement.removeClass('d-none');
        } else {
            showCardWithFilter(strText,dropdownSelectionsObject,thisElement);
        }
    });
    calculateTotalCards(totalCards);
});

function showCards (dropdownSelectionsObject) {    
    if (dropdownSelectionsObject['dishtype'] === -1) {
        dropdownSelectionsObject = {
            'dishtype': -1,
            'form': -1,
            'preptime': -1
        }
        let element = $('ul[name="DISH TYPE"] li')[0];
        element.classList.add("selected");
    } else {
        $(".a-container-card-with-filter article").each(function () {
            $(this).addClass('d-none');
            let str = $(this).find('.cmp-contentfragment__element--tagsType').find(".cmp-contentfragment__element-value");
            let strText = str.text().trim();

            if (((strText.indexOf(dropdownSelectionsObject['dishtype']) > -1) && (dropdownSelectionsObject['form'] == -1) && (dropdownSelectionsObject['preptime'] == -1)) || ((strText.indexOf(dropdownSelectionsObject['form']) > -1) && (dropdownSelectionsObject['dishtype'] == -1) && (dropdownSelectionsObject['preptime'] == -1)) || ((strText.indexOf(dropdownSelectionsObject['preptime']) > -1) && (dropdownSelectionsObject['form'] == -1) && (dropdownSelectionsObject['dishtype'] == -1))) {
                $(this).removeClass('d-none');
            } 
        });
    }
}

function calculateTotalCards(totalCards) {
    nonSelectedCards = $('.a-container-card-with-filter article.d-none').length;
    selectedCards = totalCards - nonSelectedCards;

    // Diplaying results dynamically.
    $(".a-text--dynamic-results .cmp-text p:first-child").html('Showing ' + selectedCards + ' of ' + totalCards + ' results');

    // Diplaying error dynamically.
    if (selectedCards === 0) {
        $('.a-container.container-full-width.a-container-card-with-filter .cmp-container .a-text--dynamic-results .cmp-text p:last-child').css('display', 'block');
    } else {
        $('.a-container.container-full-width.a-container-card-with-filter .cmp-container .a-text--dynamic-results .cmp-text p:last-child').css('display', 'none');
    }
}

$(window).on('load', function () {

    totalCards = $('.a-container-card-with-filter article').length;

    // Replace default text with totalCards.
    $(".a-text--dynamic-results .cmp-text p:first-child").text($(".a-text--dynamic-results .cmp-text p:first-child").text().replace("{X}", totalCards));
    $(".a-text--dynamic-results .cmp-text p:first-child").text($(".a-text--dynamic-results .cmp-text p:first-child").text().replace("{Y}", totalCards));

    if (window.location.href.split('?category=')[1] != undefined) {
        let searchParamValue = window.location.href.split('?category=')[1].split('#');

        // iterate over each desert type and match the url parameter
        $('ul[name="DISH TYPE"] li').each(function () {
            parentElement = $(this).closest('.a-dropdown__field');

            if ($(this).attr('data-optionvalue').indexOf(searchParamValue[0]) > -1) {
                dropdownSelectionsObject = {
                    'dishtype': $(this).attr('data-optionvalue'),
                    'form': -1,
                    'preptime': -1
                }

                $(this).closest('.a-dropdown__field').find('.a-dropdown-selected').text($(this).text().trim());
                $(this).addClass('selected');
                parentElement.addClass('single-selected');
            } else {
                $(this).removeClass('selected');
            }
        });

        // if no match is found with url parameter show all cards.
        showCards(dropdownSelectionsObject);
        calculateTotalCards(totalCards);

        // if no match is found with url parameter show error.
        if(dropdownSelectionsObject['dishtype'] === -1) {
            $('.a-container.container-full-width.a-container-card-with-filter .cmp-container .a-text--dynamic-results .cmp-text p:last-child').css('display', 'block');
        }
    }
});
