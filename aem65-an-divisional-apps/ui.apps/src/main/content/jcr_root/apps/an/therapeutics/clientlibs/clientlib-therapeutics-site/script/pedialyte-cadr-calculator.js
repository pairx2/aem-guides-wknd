$(document).ready(function(){
    dropDownStyle();
    liquidCalculation();
    liquidIntake();
});

function dropDownStyle() {
    $(document).on('click', '.a-container--pedialyte-cadr-calculator .dropdown .btn-toggle', function (event) {
        event.stopPropagation();
        if ($(this).parent().hasClass('dropdown-active')) {
            $(this).parent().removeClass('dropdown-active').addClass('dropdown-inactive');
        } else {
            $(this).parent().removeClass('dropdown-inactive');
            $(this).parent().addClass('dropdown-active');
        }
    });

    $(document).on('click', '.a-container--pedialyte-cadr-calculator .dropdown .dropdown-menu li', function (event) {
        $(this).parent().removeClass('dropdown-active');
        let selectedValue = $(this).html();
        $(this).closest('.fields').find('button').html(selectedValue);

        let inputSelected = $(this).attr('data-value');
        $(this).closest('.dropdown').find('input[type="hidden"]').val(inputSelected);
    });

    let toggleBtn = $(".a-container--pedialyte-cadr-calculator .dropdown .btn-toggle");
    $(document).on('click', function (event) {
        if (toggleBtn !== event.target && !toggleBtn.has(event.target).length) {
            if (toggleBtn.parent().hasClass('dropdown-active')) {
                toggleBtn.parent().removeClass('dropdown-active').addClass('dropdown-inactive');
            }
        }
    });
}

function liquidCalculation() {
    let weightMeasure = $(".a-container--pedialyte-cadr-calculator .weight-unit select").val();
    let weightInput, liquidResult, ageInput;

    $(".a-container--pedialyte-cadr-calculator .weight-unit select").on('change', function (event) {
        weightMeasure = $(this).val();
    });

    $(".a-container--pedialyte-cadr-calculator .calci-btn").on('click', function (event) {
        ageInput = $("#liquid-calci .calci-fields input[name='age']").val();
        weightInput = $(".a-container--pedialyte-cadr-calculator .weight-unit input").val();

        if (weightMeasure == 'kg') {
            liquidResult = weightInput * 35;
        }
        else {
            liquidResult = (weightInput * 35 / 2.2046).toFixed(2);
        }

        if (ageInput.length > 0 && weightInput.length > 0) {
            $(".a-container--pedialyte-cadr-calculator .calci-footnote").show();
            $(".a-container--pedialyte-cadr-calculator .calci-output .calci-val").text(liquidResult);
        }
        else if (ageInput.length <= 0 && weightInput.length <= 0) {
            alert("Please enter age and weight");
        }
        else if (weightInput.length <= 0) {
            alert("Please enter weight");
        }
        else if (ageInput.length <= 0) {
            alert("Please enter age");
        }

    });
}

function liquidIntake() {
    $(".a-container--pedialyte-cadr-calculator .liquid-intake-section #pedialyte_60").hide();
    let selectedRadio = $(".intake-select input[type=radio]:checked").val();
    $("#" + selectedRadio).show();

    $('.a-container--pedialyte-cadr-calculator .intake-select input[type=radio]').on('change', function (e) {
        let radioSelect = $(e.target).attr('value');
        $(".a-container--pedialyte-cadr-calculator .intake-result").hide();
        $("#" + radioSelect).show();

        if ($(".a-container--pedialyte-cadr-calculator .intake-select input[type=radio]:checked").val() == 'gastroenteritis') {
            $(".a-container--pedialyte-cadr-calculator .liquid-intake-section #pedialyte_60").show();
            $(".a-container--pedialyte-cadr-calculator .liquid-intake-section #pedialyte_30").hide();
        }
        else {
            $(".a-container--pedialyte-cadr-calculator .liquid-intake-section #pedialyte_30").show();
            $(".a-container--pedialyte-cadr-calculator .liquid-intake-section #pedialyte_60").hide();
        }
    });
} 