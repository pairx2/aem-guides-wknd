$(document).ready(function() {      
    $('.productcomparison').each(function(index) {
        let $tableTd = $(this).find('.o-products-compare__table tfoot tr td');
        let $tableHead = $(this).find('.o-products-compare__table thead tr th');         
        let $txtcolumn = $('.product-comparison-txt-' + (index + 1) + ' .columncontrol__column');
        $txtcolumn.each(function(index) {
            if($(this).find('.text')) {
                $tableHead.eq(index + 1).find('.productsCompare-badge-top-end .o-products-compare__title').append($(this).find('.text').html());
            }
        });
        setTimeout(function() {
            $tableTd.each(function(index) {
                let linkEle = $(this).find('.link .a-link').html();
                $tableHead.eq(index + 1).find('.productsCompare-badge-top-end .o-products-compare__title').append(linkEle);
            });
        }, 50);
    });

    $('.read-more').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).closest('.link').next('.text').css('display', 'block');
            $(this).find('.a-link__inner-text').text('READ LESS');
        }
        else {
            $(this).removeClass('active');
            $(this).closest('.link').next('.text').css('display', 'none');
            $(this).find('.a-link__inner-text').text('READ MORE');
        }
    })

    if ($('.printer-title').length > 0) {
        $('.printer-title .cmp-title__text').append('<img class="printer-icon" alt="printer-icon" src="/content/dam/an/pediasure-com/Healthy-Eating-Kids/healthy-recipes-kids/Print.png" />');
     }
     $('.printer-title .cmp-title__text .printer-icon').on('click', function() {
        window.print();
     });
});