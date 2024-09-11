(function(document, $) {
    jQuery(document).on('foundation-contentloaded', toggleTabs)
               .on('change', 'coral-select[name="./bannerType"]', toggleTabs);

    function toggleTabs() {
        var $bannerTypeEl = jQuery("coral-select[name='./bannerType']");
        var bannerType = $bannerTypeEl.find('coral-select-item[selected]').val();
        var $closestDialog = $bannerTypeEl.closest('.cq-dialog-content');

        $closestDialog.find('coral-Tab').each(function(i){
            if(i === 0){
                jQuery(this).show();
            } else{
                jQuery(this).hide();
                if((bannerType === 'as-banner-img') && (i === 1 || i === 2 || i === 3)){
	                jQuery(this).show();
                }
                if(bannerType === 'gs-banner-img' && i === 4){
	                jQuery(this).show();
                }
            }
        });

    }

})(document,Granite.$);