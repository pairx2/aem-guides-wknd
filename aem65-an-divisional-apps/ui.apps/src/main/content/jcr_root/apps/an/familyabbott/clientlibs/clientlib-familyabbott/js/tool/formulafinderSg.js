const wizarditem_2_id = {
    item_1 : "similac-total-comfort",
    item_2 : "isomil",
    item_3 : "extensive-hydrolyzed-protein-formula",
    item_4 : "thickening-formula-with-rice-starch"
}

function formulaFinderSG() {
    let el = $("#ph-formula-finder-sg");
    let product_1 = el.find(".o-wizard__container input[name='product-1']").val();
    let product_2 = el.find(".o-wizard__container input[name='product-2']").val();
    let product_3 = el.find(".o-wizard__container input[name='product-3']").val();
    let product_4 = el.find(".o-wizard__container input[name='product-4']").val();
    let resultsPage = el.find(".o-wizard__container input[name='redirect']").val();
    let previousQuestion = [];

    function gotoRedirect(detailsPage) {
        if (detailsPage) {
            let redirectPath = detailsPage + ".html";
            window.location.href = redirectPath;
        }
    }

    function gotoResults(productId) {
        sessionStorage.setItem('productId', productId);
        let redirectPath = resultsPage + ".html";
        window.location.href = redirectPath;
    }

    function showHideQuestion(show, hide) {
        previousQuestion.push(hide);
        el.find("fieldset[data-wizarditem]").hide();
        el.find("fieldset[data-wizarditem='" + show + "']").show();
        el.find("fieldset[data-wizarditem='" + show + "']").css("opacity", "1");
        el.find("fieldset[data-wizarditem='" + show + "']").css("position", "relative");
        el.find("fieldset[data-wizarditem='" + show + "']").css("left", "0%");
    }

    function goBack(previous) {
        el.find("fieldset[data-wizarditem]").hide();
        el.find("fieldset[data-wizarditem='" + previous + "']").show();
        el.find("fieldset[data-wizarditem='" + previous + "']").css("opacity", "1");
        el.find("fieldset[data-wizarditem='" + previous + "']").css("position", "relative");
    }

    el.each(function () {
        $(this).find('.options').each(function () {
            $(this).on('change', '.a-radio__input', function (e) {
                $(this).parents('.o-wizard__content').find('.btn[name=next], .btn[name=NEXT]').css('pointer-events', 'auto');
            })
        });
    });

    el.find(".o-wizard__container").on("click", "button[name='back'],button[name='BACK']", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        let previousWizard = previousQuestion.pop();
        goBack(previousWizard);
    });

    el.find(".o-wizard__container").on("click", "button[name='next'],button[name='NEXT']", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        let currentQuestion = parseInt($(this).parents("fieldset[data-wizarditem]").attr("data-wizarditem"));

        switch (currentQuestion) {
            case 0:
                let wizarditem_0 = el.find("fieldset[data-wizarditem='0'] input[name='answers']:checked").val();

                if (wizarditem_0 == 'no') {
                    showHideQuestion(1,0);
                } else {
                    showHideQuestion(2,0);
                }
                break;
            case 1:
                let wizarditem_1 = el.find("fieldset[data-wizarditem='1'] input[name='answers']:checked").val();

                if (wizarditem_1 == 'no') {
                    gotoRedirect(product_2);
                } else {
                    gotoRedirect(product_1);
                }
                break;
            case 2:
                let wizarditem_2 = el.find("fieldset[data-wizarditem='2'] input[name='answers']:checked").val();
                if (wizarditem_2 == wizarditem_2_id.item_1) {
                    gotoRedirect(product_3);
                } else if (wizarditem_2 == wizarditem_2_id.item_2) {
                   	gotoRedirect(product_4);
                } else if (wizarditem_2 == wizarditem_2_id.item_3) {
                   	gotoResults(wizarditem_2_id.item_3);
                } else {
                 	gotoResults(wizarditem_2_id.item_4);
                }
          		break;
        }

    });
}

$(document).ready(function () {
    formulaFinderSG();
});