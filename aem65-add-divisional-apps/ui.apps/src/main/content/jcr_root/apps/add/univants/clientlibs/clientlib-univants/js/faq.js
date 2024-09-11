$('#faqParent .accordion .m-accordion__header').click(function() {
    var findClass = $(this).next('.m-accordion__body').hasClass('show');
    if (findClass == false) {
        $(this).parents('.m-accordion__content-items').addClass('addAccordianColor');
    } else if (findClass == true) {
        $(this).parents('.m-accordion__content-items').removeClass('addAccordianColor');
    }

});


$('input[type="checkbox"]').change(function() {
    var inputValue = $(this).parent().parent().next('.checkbox--text-require').hide();
    if ($(this).prop("checked")) {
        $(inputValue).hide();
    } else {
        $(inputValue).show();
    }
});


$('.m-accordion__content-items').each(function(index, value) {
    var data1 = $(this).find('.cmp-container').attr('id').replace(/\|/g, ' ');
    $(this).addClass(data1);
});

var dropdownn = $('#fieldsetForm-options').find('.a-dropdown__menu li');
$(dropdownn).click(function() {
    var filterVal = $(this).attr('data-optionvalue');

    var filterClassName,filterClass;
    $('.m-accordion__content-items').each(function(index, value) {
        filterClass = $(this).hasClass(filterVal);
        if (filterClass == true) {
            filterClassName = filterVal;
        }
    });

    $('.m-accordion__content-items').hide();
    if (filterVal == 'all') {
        $('.m-accordion__content-items').show();
    } else if (filterVal == filterClassName) {
        console.log('test');
        var findFX = $(this).parents('#fieldsetForm-options').parent().siblings('.accordion').children('#faq-accordian').find('.m-accordion__content-items').hasClass(filterClassName);
        if (findFX == true) {
            $('.' + filterClassName).show();
        }
    }

});
