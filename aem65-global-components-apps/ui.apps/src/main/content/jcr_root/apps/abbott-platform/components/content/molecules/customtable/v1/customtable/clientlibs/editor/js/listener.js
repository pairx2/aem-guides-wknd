(function(document, $) {
    "use strict";

    $(document).on("click", ".cq-dialog-submit", function(e) {

       $(".coral-Form-field[name*='./enableColFilter']").each(function () {

            if($(this).prop('checked')){
                $(this).parent().parent().find('[name$="filterLabelText"]').prop('required', true);
            } else {
                $(this).parent().parent().find('[name$="filterLabelText"]').prop('required', false);
            }
		});

        $(".coral-Form-field[name*='./enableRangeFilter']").each(function () {
            if ($(this).prop('checked')) {
                $(this).parent().parent().find('[name$="rangeFilterLabelText"]').prop('required', true);
            } else {
                $(this).parent().parent().find('[name$="rangeFilterLabelText"]').prop('required', false);
            }
        });

        $(".coral-Form-field[name*='./enableBulkSelect']").each(function () {
            if ($(this).prop('checked')) {
                $(this).parent().parent().find('[name$="bulkSelectLabelText"]').prop('required', true);
            } else {
                $(this).parent().parent().find('[name$="bulkSelectLabelText"]').prop('required', false);
            }
        });

    });

    $(document).on("click", ".coral-Form-field[name*='./enableColFilter']", function (e) {

        let enableColFilter = $(e.target);
        if (enableColFilter.prop('checked')) {
            enableColFilter.parents('coral-multifield-item-content').find(".coral-Form-field[name*='./enableRangeFilter']").css('display', 'none');
            enableColFilter.parents('coral-multifield-item-content').find(".show-hide-col-range-filter-checkbox").css('display', 'none');
        } else {
            enableColFilter.parents('coral-multifield-item-content').find(".coral-Form-field[name*='./enableRangeFilter']").css('display', 'flex');
            enableColFilter.parents('coral-multifield-item-content').find(".show-hide-col-range-filter-checkbox").css('display', 'block');
        }
    });

    $(document).on("click", ".coral-Form-field[name*='./enableRangeFilter']", function (e) {

        let enableColFilter = $(e.target);
        if (enableColFilter.prop('checked')) {
            enableColFilter.parents('coral-multifield-item-content').find(".coral-Form-field[name*='./enableColFilter']").css('display', 'none');
            enableColFilter.parents('coral-multifield-item-content').find(".show-hide-col-filter-checkbox").css('display', 'none');
        } else {
            enableColFilter.parents('coral-multifield-item-content').find(".coral-Form-field[name*='./enableColFilter']").css('display', 'flex');
            enableColFilter.parents('coral-multifield-item-content').find(".show-hide-col-filter-checkbox").css('display', 'block');
        }
    });

    $(document).on('foundation-contentloaded', function () {

        $(".coral-Form-field[name*='./enableColFilter']").each(function () {

            if ($(this).prop('checked')) {
                $(this).parents('coral-multifield-item-content').find(".coral-Form-field[name*='./enableRangeFilter']").css('display', 'none');
            } else {
                $(this).parents('coral-multifield-item-content').find(".coral-Form-field[name*='./enableRangeFilter']").css('display', 'flex');
            }
        });

        $(".coral-Form-field[name*='./enableRangeFilter']").each(function () {

            if ($(this).prop('checked')) {
                $(this).parents('coral-multifield-item-content').find(".coral-Form-field[name*='./enableColFilter']").css('display', 'none');
            } else {
                $(this).parents('coral-multifield-item-content').find(".coral-Form-field[name*='./enableColFilter']").css('display', 'flex');
            }
        });

    });

})(document, Granite.$);