$(document).ready(function() {        
    $('.o-products-compare').scroll(function(e) {     
        if($(window).width() < 768) {
            let lastLeftLocation = e.currentTarget.scrollLeft; 
            $(this).find('.o-products-compare__table tbody tr .o-products-compare__fixed-side').css('left', lastLeftLocation);
        }        
    });
    $('.productcomparison').each(function() {
        let $tableTd = $(this).find('.o-products-compare__table tfoot tr td');
        let $tableHead = $(this).find('.o-products-compare__table thead tr th');
        $tableTd.each(function(index) {
            let linkEle = $(this).find('.link .a-link').html();
            $tableHead.eq(index + 1).find('.productsCompare-badge-top-end').append(linkEle);
        });        
    });
    $('#nutrition-left .productcomparison').each(function(index) {
        let $tableRow = $(this).find('.o-products-compare__table tfoot');
        let $btncolumn = $('#product-comparison-btn-' + (index + 1) + ' .columncontrol__column');
        $tableRow.append('<tr><th class="o-products-compare__fixed-side o-products-compare__blank-col"></th></tr>');
        $btncolumn.each(function() {
            if($(this).find('.button')) {
                $tableRow.find('tr:nth-child(2)').append('<td>' + $(this).html() + '</td>');
            }
        });        
    });
});