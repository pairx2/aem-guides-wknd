// container component
$(function () {

    //to display 2 different images in receipe page
    blogImage();
    //ensure filter
    if ($('.container--ensure-filter').length > 0) {
        let dropdownSelectionsObject = {
            'ensure': -1,
        }

        //to add bg color on click
        $('.a-dropdown__field ').on('click', function () {
            $('.a-dropdown__menu li').each(function () {
                if ($(this).hasClass("selected")) {
                    $(this).addClass("filter-bg");
                }
            });
        });


        $(".a-dropdown__field .a-dropdown__menu li.selected").mouseenter(function () {
            $(".a-dropdown__menu li.selected").removeClass("filter-bg keyclass");
        });

        // On dropdown change.
        $('.a-dropdown__field .a-dropdown__menu li').on('click', function () {
            dropdownSelectionsObject['ensure'] = $(this).attr('data-optionvalue');

            $(".cmp-contentfragment").each(function () {
                $(this).addClass('d-none');
                let str = $(this).find('.cmp-contentfragment__element--tagsType').find(".cmp-contentfragment__element-value");
                let strText = str.text().trim();

                if ((strText.indexOf(dropdownSelectionsObject['ensure']) > -1)) {
                    $(this).removeClass('d-none');
                }
                if (dropdownSelectionsObject['ensure'] == 'all') {
                    $(this).removeClass('d-none');
                }
            });
        });
    }
})
function blogImage() {
    if (($("#blogimage1").length) && ($("#blogimage2").length)) {
        let count = Math.random() * 10;
        let total = Math.ceil(count);
        if (total % 2 == 0) {
            $("#blogimage1").closest(".experiencefragment").addClass("d-none");
        }
        else {
            $("#blogimage2").closest(".experiencefragment").addClass("d-none");
        }
    }
}