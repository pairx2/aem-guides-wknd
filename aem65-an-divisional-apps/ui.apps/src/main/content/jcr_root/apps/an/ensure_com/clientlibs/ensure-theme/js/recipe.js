$(function () {
    setTimeout(function(){
    $('[name="filter-recipes"] li:not(.selected)').each(function () {
        let optionvalue = $(this).attr('data-optionvalue')?.trim();	
        $('#'+optionvalue).closest('.container').hide();
    });

    $('[name="filter-recipes"]').closest('.a-dropdown__field').find('span').on('DOMSubtreeModified', function () {
        let selectValue = $(this)?.text()?.trim();
        let selectedValue;
        $(this).next()?.find('li').each(function () {
            if ($(this).find('span')?.text()?.trim() == selectValue) {
                selectedValue = $(this).attr('data-optionvalue')?.trim();
                $('#'+selectedValue).closest('.container').show();
            }
            else{
                selectedValue = $(this).attr('data-optionvalue')?.trim();
                $('#'+selectedValue).closest('.container').hide();
            }
        });
    });
    },1000);
});