$(document).ready(function () {
    //debugger
    let intId = setTimeout(function () {
        $(".a-container--nutritional-drink .a-dropdown-selected").css({
            "background-color": "unset",
            "color": "#58ae8b"
        })
    }, 10)
    let nutritionalLi = $(".a-container--nutritional-drink").find(".a-dropdown__menu li")

    nutritionalLi.on('mouseover', function () {
        //debugger
        $(this).addClass('noafter')
        $(this).next().addClass('noafter')
    });

    nutritionalLi.on('mouseout', function () {

        $(this).removeClass('noafter')
        $(this).next().removeClass('noafter')

    });

    nutritionalLi.on('click', function () {

        let selectedTab = $(this).attr('data-optionvalue');
        $(".a-dropdown-selected").css({
            "background-color": "#58ae8b",
            "color": "white"
        })
        $("#nutritional-drinks-main-container").find(".a-container").hide();

        if (selectedTab == 'gaining-weight') {

            $("#nutritional-drinks-main-container").find("#section-gaining-weight-container").parent().show()
        } else if (selectedTab == 'maintaining-weight') {
            $("#nutritional-drinks-main-container").find("#section-weight_maintenance").parent().show()
        } else if (selectedTab == 'managing-a-wound') {
            $("#nutritional-drinks-main-container").find("#section-wound-management").parent().show()
        } else if (selectedTab == 'managing-blood-sugar') {
            $("#nutritional-drinks-main-container").find("#section-blood-sugar").parent().show()
        }else if (selectedTab == 'select-one') {
            $("#nutritional-drinks-main-container").find(".a-container").show();
        } else {
            $("#nutritional-drinks-main-container").find("#section-hydration").parent().show()
        }
        clearInterval(intId)

    });


});