$(window).on('load', function () {
    $.getJSON(loadInitialData, function (json) {
        RniResult(json);
    });
});

let product1Selected, product2Selected, product3Selected, product1Quantity, product2Quantity, product3Quantity, ageGroupSelected, loadInitialData = $("#api-url .hidden").attr("data-attribute-load");
$(".rni-main-wrapper").parent(".columncontrol").css("background", "#f2f2f2");

function rni_detail(product,val1,a,list){
    let ProductName = val1['ProductName'];
    if (ProductName === product) {
        let vitamins1 = val1[list];
        if (vitamins1 instanceof Object) {
            $.each(vitamins1, function (key2, val2) {
                if (val2 instanceof Object) {
                    $.each(val2, function (l, val3) {
                        if (val3 instanceof Object) {
                            $.each(val3, function (key3, val4) {
                               let b = {
                                    "name": l,
                                    "value": val4['value'],
                                    "unit": val4['unit']
                                };
                                a.push(b)
                            });
                        }
                    });
                }
            });
        }
    }
    return a;
}
function RniResult(response) {
    let rniObj = response;
    let productName = '';
    let ageGroup = '';
    $.each(rniObj, function (key, val) {
        let rni = val['RNI'];
        if (rni == "false") {
            productName += '<li value="' + val['ProductName'] + '">' + val['ProductName'] + '</li>';

        } else {
            ageGroup += '<li value="' + val['ProductName'] + '">' + val['ProductName'] + '</li>';
        }
    }); //on-load set-up
    $('#rni-calculator-form ul[name="product1"].a-dropdown__menu').append(productName);
    $('#rni-calculator-form ul[name="age-group"].a-dropdown__menu').append(ageGroup);
    $('#rni-calculator-form input.form-control[type="number"]').prop('disabled', true);
    $('#rni-calculator-form input.form-control[type="number"]').addClass('disabled');
    $(".btn[name='calculate-rni']").prop('disabled', false);

    $(document).on("click", "#rni-calculator-form ul.a-dropdown__menu", function () {
        $("#rni-calculator-form ul.a-dropdown__menu").parents().find(".parent-field").children().find(".fields.text").find('.form-control').prop('disabled', false).removeClass('disabled');
    });

    let product1 = $("fieldset ul[name='product1']");
    let product2 = $("fieldset ul[name='product2']");
    let product3 = $("fieldset ul[name='product3']");

    $(document).on("click", "fieldset ul[name='product1'] li", function () {
        product2.empty().append(product1.find('li').clone());
        let selectedItem = $(this).text();
        product1Selected = selectedItem;
        if (selectedItem) {
            product2.find('li[value="' + selectedItem + '"]').remove();
        }
    });
    $(document).on("click", "fieldset ul[name='product2'] li", function () {
        product3.empty().append(product2.find('li').clone());
        let selectedItem = $(this).text();
        product2Selected = selectedItem;
        if (selectedItem) {
            product3.find('li[value="' + selectedItem + '"]').remove();
        }
    });

    $(document).on("click", "fieldset ul[name='product3'] li", function () {
        let selectedItem = $(this).text();
        product3Selected = selectedItem;

    });

    $(document).on("click", "fieldset ul[name='age-group'] li", function () {
        let selectedItem = $(this).text();
        ageGroupSelected = selectedItem;

    });

    function vitamins(product, list) {
        let a = [];
        
        $.each(rniObj, function (key1, val1) {
           a = rni_detail(product,val1,a,list);
        });
        return a;
    }

    function final(p1, p2, p3, pquant1, pquant2, pquant3, product) {
        let h;
        let finalObj = [], vit1, vit2;
        if (p1 != null) {
            vit1 = vitamins(p1, product);
        }
        if (p2 != null) {
            vit2 = vitamins(p2, product);
            $.each(vit1, function (k, l) {
                h = pquant1 * parseFloat(l['value']) + pquant2 * parseFloat(vit2[k].value);
                h = h.toFixed(2);
                finalObj.push(h)
            });
        }
        if (p3 != null) {
            finalObj = [];
            let vit3 = vitamins(p3, product);
            $.each(vit1, function (k, l) {
                h = pquant1 * parseFloat(l['value']) + pquant2 * parseFloat(vit2[k].value) + pquant3 * parseFloat(vit3[k].value);
                h = h.toFixed(2);
                finalObj.push(h)
            });
        }
        if (p1 != null && finalObj == "") {
            $.each(vit1, function (k, l) {
                h = pquant1 * parseFloat(l['value']);
                h = h.toFixed(2);
                finalObj.push(h)
            });
        }
        return finalObj;
    }

    function ageGroupCalc(product, vitamin, mineral) {
        let ageVitamin = vitamins(product, "vitamins");
        let ageMineral = vitamins(product, "minerals");
        let CalcJson = [];
        let final1 = {};

        $.each(vitamin, function (a, b) {
            final1 = {
                vname: ageVitamin[a].name,
                vunit: ageVitamin[a].unit,
                vcalc: b,
                vconst: ageVitamin[a].value,
                mname: ageMineral[a].name,
                munit: ageMineral[a].unit,
                mcalc: mineral[a],
                mconst: ageMineral[a].value
            }
            CalcJson.push(final1);
        });


        return CalcJson;
    }
    //on form submit
    function rni_list(p1,age){
        if (p1 == null) {
            $('.requiredproduct').show();
        } else {
            $('.requiredproduct').hide();
        }
        let quantityerror = 0;
        $('.form-control[type="number"]').each(function () {
            let quant = $(this).val();
            if (quant < 100 || quant > 1500) {
                quantityerror++;
            }
        });

        if (quantityerror > 0) {
            $('.requiredquant').show()
        } else {
            $('.requiredquant').hide()
        }
        if (age == null) {
            $('.requiredage').show();
        } else {
            $('.requiredage').hide();
        }
        return quantityerror;
    }
    $('#calculate-rni-results span').click(function () {
        let p1 = product1Selected,
            p2 = product2Selected,
            p3 = product3Selected,
            age = ageGroupSelected,
            pquant1 = $('#pquant1').val() / 100,
            pquant2 = $('#pquant2').val() / 100,
            pquant3 = $('#pquant3').val() / 100;
        let quantityerror = rni_list(p1, age);

      
        if (p1 != null && quantityerror == 0 && age != null) {

            let quantity = '';
            if (p1) {
                quantity += $('#pquant1').val() + 'ml of ' + p1;
            }
            if (p2) {
                quantity += ' & ' + $('#pquant2').val() + 'ml of ' + p2;
            }
            if (p3) {
                quantity += ' & ' + $('#pquant3').val() + 'ml of ' + p3;
            }
            let vitamintab = '<div class="rniTableHeaderRow"><h4 class="rniTableHeaderCell" style="color:#f2f2f2;">Vitamins</h4><h4 class="rniTableHeaderCell">Unit</h4><h4 class="rniTableHeaderCell">' + quantity + '</h4><h4 class="rniTableHeaderCell">' + age + '</h4></div>';
            let calcVit = final(p1, p2, p3, pquant1, pquant2, pquant3, "vitamins");

            let mineraltab = '<div class="rniTableHeaderRow"><h4 class="rniTableHeaderCell" style="color:#f2f2f2;">Minerals</h4><h4 class="rniTableHeaderCell">Unit</h4><h4 class="rniTableHeaderCell">' + quantity + '</h4><h4 class="rniTableHeaderCell">' + age + '</h4></div>';
            let calcMin = final(p1, p2, p3, pquant1, pquant2, pquant3, "minerals");

            let agegroupval = ageGroupCalc(age, calcVit, calcMin);
            let vitaminTabRow = "", mineralTabRow = "";
            $.each(agegroupval, function (i, j) {
                vitaminTabRow += '<div class="rniTableBodyRow"><p class="rniTableCell table-name">' + j['vname'] + '</p><p class="rniTableCell">' + j['vunit'] + '</p><p class="rniTableCell">' + j['vcalc'] + '</p><p class="rniTableCell">' + j['vconst'] + '</p></div>';
                mineralTabRow += '<div class="rniTableBodyRow"><p class="rniTableCell table-name">' + j['mname'] + '</p><p class="rniTableCell">' + j['munit'] + '</p><p class="rniTableCell">' + j['mcalc'] + '</p><p class="rniTableCell">' + j['mconst'] + '</p></div>';
            });

            let vitamintableBody = '<div class="rniVitaminTableBody">' + vitaminTabRow + '</div>';
            let mineraltableBody = '<div class="rniMineralTableBody">' + mineralTabRow + '</div>';

            let vitaminTableDetail = vitamintab + vitamintableBody;
            let mineralTableDetail = mineraltab + mineraltableBody;
            $('.rni-calcForm-output div.vitamin-table').html(vitaminTableDetail);
            $('.rni-calcForm-output div.minerals-table').html(mineralTableDetail);

            $('#result-rni-table').show();
            let offsetRniTable = $("#result-rni-table").offset();
            $('html, body').animate({
                scrollTop: offsetRniTable.top - 120
            }, 500);
        } else {
            $('#result-rni-table').hide();
        }
        return false;

    });

    // Download PDF
    $("#pdfbtn").click(function (e) {
        e.preventDefault();
        const element = $(".table-cover")[0];
        const options = {
            filename: 'RNI-Calculator.pdf',
            pagebreak: { avoid: "tr", mode: "css", before: ".mineral-heading" },
            margin: [1, 2, 1, 2], //top, left, bottom, right,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: {
                unit: 'in', format: 'a3', orientation: 'portrait'
            }
        };
        html2pdf().set(options).from(element).save();
    });
}