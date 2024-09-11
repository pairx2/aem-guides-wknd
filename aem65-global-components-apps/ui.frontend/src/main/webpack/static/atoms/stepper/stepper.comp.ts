class Stepper {
    constructor(options) {

        $(options).on('click', this.onClickStepperBtn);

        $('.input-number').focusin(function () {
            $(this).data('oldValue', $(this).val());
        });

        $('.input-number').change(function () {
            let minValue = parseInt($(this).attr('min'));
            let maxValue = parseInt($(this).attr('max'));
            let valueCurrent = Number($(this).val());

            let name = $(this).attr('name');
            if (valueCurrent >= minValue) {
                $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
            } else {
                alert('Sorry, the minimum value was reached');
                $(this).val($(this).data('oldValue'));
            }
            if (valueCurrent <= maxValue) {
                $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
            } else {
                alert('Sorry, the maximum value was reached');
                $(this).val($(this).data('oldValue'));
            }
        });

        $(".input-number").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }

    onClickStepperBtn(e = event) {
        e.preventDefault();

        let fieldName = $(this).children('.js-a-stepper--btn').attr('data-field');//quant[2]
        let type = $(this).children('.js-a-stepper--btn').attr('data-type');//plus minus
        let input = $(this).closest('.js-a-stepper').children("input[name='" + fieldName + "']");
        let minVal = Number(input.attr('min'));
        let maxVal = Number(input.attr('max'));
        var currentVal = Number(input.val());       
        if (!isNaN(currentVal)) {
            if (type == 'minus') {
                $(".a-stepper__max-error").hide();
                if (currentVal > minVal) {
                    input.val(currentVal - 1).change();
                }
                if (currentVal == minVal) {
                    $(this).attr('disabled', 'disabled');
                    $(".a-stepper__min-error").show();
                }
            }
            else if (type == 'plus') {
            $(".a-stepper__min-error").hide();
                if (currentVal < maxVal) {
                    input.val(currentVal + 1).change();
                }
                if (currentVal == maxVal) {
                    $(this).attr('disabled', 'disabled');
                    $(".a-stepper__max-error").show();
                }
            }
        }
        else {
            input.val(0);
        }
    }

}

document.querySelectorAll('[data-component="stepper"]').forEach(function (ele) {
    new Stepper(ele);
});
//Stepper Component Code end here