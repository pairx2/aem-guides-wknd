    $(function () {

        function calci() {
            let age = "";
            $("#ageoptions-options li").each(function () {
                if ($(this).hasClass("selected")) {
                    age = $(this).attr("data-optionvalue");
                }
                if (age == "(select-one)") {
                    age = "";
                }
            });

            if ($("input#calc-weight").val() && age) {
                let t, output;
                t = $("input#calc-weight").val() / 2.2;
                if( age === '18'){
                    t *= 0.8 ;               
                }else if( age === '65'){
                    t *= 1.1 ;
                }
                output = t.toFixed(2);
                $(".proteinCalculator_output").html(output);
            }
        }

        $('#calc-weight').on("keypress", function (e) {
            (46 != e.which || 46 == e.which && "" == $(this).val() || -1 != $(this).val().indexOf(".")) && (e.which < 48 || e.which > 57) && e.preventDefault();
            (3 == $(this).val().length && 46 != e.which) && e.preventDefault();
        }).on("paste", function(e) {
            e.preventDefault()
        }).on("keyup", function(e) {
            (-1 != $(this).val().indexOf(".")) && $(this).val().split(".")[1].length > 2 && (this.value = parseFloat(this.value).toFixed(2));
            calci();
        });
        $('#ageoptions-options .a-dropdown__menu li').on('click', function () {
            setTimeout(function () {
                calci();
            }, 200);
        });
    });


