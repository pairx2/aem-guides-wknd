$(window).on('load', function() {
    let tabArrayId = [];
    let tabArrayContent = [];
    let selectboxOption = "";
    let tabTitle = $('.a-tabs--green-background nav').attr('aria-label');
    console.log(tabTitle);

    let bgImg = $('#image-background-link img').attr('src');
    $('.a-tabs--green-background').prepend(`<h2 class="tabs-heading">${tabTitle}</h2>`);


    $('#image-background-link img').hide();
    $('.a-tabs--green-background').css('background-image', 'url("' + bgImg + '")');

    $('.a-tabs--green-background .a-tabs__content .cmp-tabs__tabpanel').each(function() {
        let id = $(this).attr('id');
        tabArrayId.push(id);
    });

    $('.a-tabs--green-background .nav-tabs .cmp-tabs__tab').each(function() {
        let text = $(this).text().trim(" ");
        tabArrayContent.push(text);
    });

    for (const element of tabArrayId) {
        selectboxOption += `<option value="${element}"></option>`
    }

    $('.a-tabs--green-background .cmp-tabs__tablist').append(`<select class="tab-select">${selectboxOption}</select>`);
    $('.a-tabs--green-background .tab-select option').each(function(index, value) {
        $(this).text(tabArrayContent[index]);
    });

    $('.a-tabs--green-background .tab-select').change(function() {
        $('.a-tabs--green-background .cmp-tabs__tabpanel').removeClass('active');
        let option = $(this).find('option:selected').val();
        $("#" + option).addClass('active');
    });

});