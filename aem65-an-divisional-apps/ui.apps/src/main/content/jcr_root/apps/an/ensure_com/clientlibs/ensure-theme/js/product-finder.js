let CLASS_ENABLED = 'enabled';
let CLASS_SELECTED = 'selected';
let SELECTOR_PRODUCT_FINDER_CONTAINER = "container--ensure-product-finder";
let SELECTOR_QA_OPTIONS_CONTAINER = 'ensure-qa-options';
let maxHeightTile = 0;
let DOM_SELECTOR_PRODUCT_FINDER = document.getElementById(SELECTOR_PRODUCT_FINDER_CONTAINER);
let DOM_SELECTOR_RESULTS = document.getElementById('ensure-products');
let DOM_SELECTOR_RESULTS_PRIMARY = document.getElementById('products-primary');
let DOM_SELECTOR_RESULTS_SECONDARY = document.getElementById('products-secondary');
let DOM_SELECTOR_RESULTS_TERTIARY = document.getElementById('products-tertiary');
let DOM_SELECTOR_RESULTS_QUATERNARY = document.getElementById('products-quaternary');
let DOM_SELECTOR_HEADER_PRIMARY = document.getElementById('header-primary');
let DOM_SELECTOR_HEADER_SECONDARY = document.getElementById('header-secondary');
let DOM_SELECTOR_HEADER_TERTIARY = document.getElementById('header-tertiary');
let DOM_SELECTOR_HEADER_QUATERNARY = document.getElementById('header-quaternary');
let DOM_QA_OPTIONS_CONTAINER = document.getElementById(SELECTOR_QA_OPTIONS_CONTAINER)?.closest('.container');
let DOM_QUESTIONS_CONTAINER = document.querySelector("#" + SELECTOR_QA_OPTIONS_CONTAINER + ' .a-tabs__nav');
let DOM_QUESTIONS_LINKS = document.querySelectorAll("#" + SELECTOR_QA_OPTIONS_CONTAINER + ' .cmp-tabs__tab');
let DOM_ANSWERS_VIEWS = document.querySelectorAll("#" + SELECTOR_QA_OPTIONS_CONTAINER + ' .cmp-tabs__tabpanel')
let DOM_Q1_ANSWERS_CONTAINER = document.getElementById("question1-answers");
let DOM_Q1_ANSWERS = DOM_Q1_ANSWERS_CONTAINER && DOM_Q1_ANSWERS_CONTAINER.querySelectorAll(".columncontrol__column");
let DOM_Q2_ANSWERS_CONTAINER = document.getElementById("question2-answers");
let DOM_Q2_ANSWERS = DOM_Q2_ANSWERS_CONTAINER && DOM_Q2_ANSWERS_CONTAINER.querySelectorAll(".columncontrol__column");
let DOM_QUESTION1 = document.querySelector("#question1");
let DOM_QUESTION2 = document.querySelector("#question2");
let answer1 = 0;
let answer2 = 0;
$(document).ready(function () {
    findSelectedValue();
    $('#container--ensure-product-finder .a-tile__link:visible').each(function(){
        let tileHeight = $(this).find('.a-tile__title').height();
        maxHeightTile = tileHeight > maxHeightTile ? tileHeight : maxHeightTile;
    });
    setTimeout(function(){
        $('#container--ensure-product-finder .a-tile__link:visible').each(function(){
            let calculatedHeight = maxHeightTile + 100;
            $(this).css('height',calculatedHeight+'px')
        });
    },500)
   
    let results = [
        { answer1: 1, answer2: 1, primary: "ensure-original", secondary: "ensure-plus-secondary", tertiary: "ensure-enlive-tertiary", quaternary: "ensure-original-powder-quaternary" },
        { answer1: 1, answer2: 2, primary: "ensure-plus", secondary: "ensure-enlive-secondary" },
        { answer1: 1, answer2: 3, primary: "ensure-max-protein", secondary: "ensure-high-protein-secondary", tertiary: "ensure-light-tertiary" },
        { answer1: 1, answer2: 4, primary: "ensure-max-protein", secondary: "ensure-high-protein-secondary", tertiary: "ensure-light-tertiary", quaternary: "ensure-clear-quaternary" },
        { answer1: 2, answer2: 1, primary: "ensure-original", secondary: "ensure-plus-secondary", tertiary: "ensure-enlive-tertiary", quaternary: "ensure-original-powder-quaternary" },
        { answer1: 2, answer2: 2, primary: "ensure-plus", secondary: "ensure-enlive-secondary" },
        { answer1: 2, answer2: 3, primary: "ensure-max-protein", secondary: "ensure-high-protein-secondary", tertiary: "ensure-light-tertiary" },
        { answer1: 2, answer2: 4, primary: "ensure-max-protein", secondary: "ensure-high-protein-secondary", tertiary: "ensure-light-tertiary", quaternary: "ensure-clear-quaternary" },
        { answer1: 3, answer2: 1, primary: "ensure-original", secondary: "ensure-plus-secondary", tertiary: "ensure-enlive-tertiary", quaternary: "ensure-original-powder-quaternary" },
        { answer1: 3, answer2: 2, primary: "ensure-plus", secondary: "ensure-enlive-secondary" },
        { answer1: 3, answer2: 3, primary: "ensure-max-protein", secondary: "ensure-high-protein-secondary", tertiary: "ensure-light-tertiary" },
        { answer1: 3, answer2: 4, primary: "ensure-max-protein", secondary: "ensure-high-protein-secondary", tertiary: "ensure-light-tertiary", quaternary: "ensure-clear-quaternary" }
    ];

    DOM_QUESTION2 != null && DOM_QUESTION2.classList.add('d-none');
    DOM_QUESTION2 != null && DOM_QUESTION2.closest('.text').classList.add('d-none');
    document.querySelectorAll("#ensure-products [id^='ensure-']").forEach(function(item){
		item.classList.add("d-none");
    });

    document.querySelectorAll("#ensure-products [id^='products-']").forEach(function(item){
		item.classList.add("d-none");
    });

    if (DOM_SELECTOR_PRODUCT_FINDER != null && DOM_SELECTOR_PRODUCT_FINDER.classList.contains("view2")) {
        DOM_SELECTOR_PRODUCT_FINDER.classList.remove("view2")
    }

    if(DOM_Q1_ANSWERS_CONTAINER){
        findSelectedOptions();
    }


    function displayResult() {
        results.forEach(function(result){
            displayResultValue(result);
        })
    }

    //Event Handler for Question1 Answers
    findSelectedAnwser(maxHeightTile);

    //Event Handler for Question2 Answers
    DOM_Q2_ANSWERS_CONTAINER != null && DOM_Q2_ANSWERS_CONTAINER.addEventListener('click', function(e){
        e.target.closest('.columncontrol__column').classList.add(CLASS_SELECTED);
        DOM_QUESTIONS_LINKS[0].classList.remove('cmp-tabs__tab--active', 'show', 'active');
        DOM_QUESTIONS_LINKS[1].classList.add('cmp-tabs__tab--active', 'show', 'active');

        DOM_ANSWERS_VIEWS[0].classList.remove('cmp-tabs__tabpanel--active', 'show', 'active');
        DOM_ANSWERS_VIEWS[1].classList.add('cmp-tabs__tabpanel--active', 'show', 'active');
        findSelectedOptions();
        DOM_QA_OPTIONS_CONTAINER.classList.add('d-none')
        displayResult();
    });

    //Event Handler for Questions Navigation Link 
    DOM_QUESTIONS_CONTAINER != null && DOM_QUESTIONS_CONTAINER.addEventListener('click', function(e){
        if(e.target.parentElement.classList.contains("a-tabs__nav-link")){

            if (e.target.parentElement.ariaLabel == '1') {
                DOM_QUESTIONS_CONTAINER.classList.remove(CLASS_ENABLED);
                DOM_QA_OPTIONS_CONTAINER.querySelectorAll(CLASS_SELECTED).forEach(function(item) {
                    item.classList.remove(CLASS_SELECTED);
                });

                DOM_QUESTIONS_LINKS[0].classList.remove('cmp-tabs__tab--active', 'show', 'active');
                DOM_QUESTIONS_LINKS[1].classList.add('cmp-tabs__tab--active', 'show', 'active');

                DOM_ANSWERS_VIEWS[0].classList.remove('cmp-tabs__tabpanel--active', 'show', 'active');
                DOM_ANSWERS_VIEWS[1].classList.add('cmp-tabs__tabpanel--active', 'show', 'active');

                DOM_QUESTION1.classList.remove('d-none');
                DOM_QUESTION2.classList.add('d-none');

                DOM_QUESTION1.closest('.text').classList.remove('d-none');
                DOM_QUESTION2.closest('.text').classList.add('d-none');
            }
        }
    });
})
function findSelectedValue() {
    if($(window).width()<767){
        $('#container--ensure-product-finder').closest('.container').css('padding','0px')
    }
    if($(window).width()>767){
        $('#container--ensure-product-finder').closest('.container').addClass('pl-0');
        $('#container--ensure-product-finder').closest('.container').addClass('pr-0');
    }
}
function findSelectedOptions () {
    DOM_Q1_ANSWERS.forEach(function(item, index){
        if(item.classList.contains(CLASS_SELECTED)) {
            answer1 = index+1;
        }
    });

    DOM_Q2_ANSWERS.forEach(function(item, index){
        if(item.classList.contains(CLASS_SELECTED)) {
            answer2 = index+1;
        }
    });
}
function displayResultValue(result){
    if (result["answer1"] == answer1 && result["answer2"] == answer2) {
        DOM_SELECTOR_RESULTS.style.display = "block";

        let primary = document.getElementById(result.primary);
        let secondary = document.getElementById(result.secondary);

        //Value would be undefined if not specified
        let tertiary = document.getElementById(result.tertiary);
        let quaternary = document.getElementById(result.quaternary);

        if(primary) {
            DOM_SELECTOR_RESULTS_PRIMARY.classList.remove("d-none");
            DOM_SELECTOR_HEADER_PRIMARY.classList.remove("d-none");
            primary.classList.remove("d-none");
        }

        if(secondary) {
            DOM_SELECTOR_RESULTS_SECONDARY.classList.remove("d-none");
            DOM_SELECTOR_HEADER_SECONDARY.classList.remove("d-none");
            secondary.classList.remove("d-none")
        }

        if(tertiary) {
            DOM_SELECTOR_RESULTS_TERTIARY.classList.remove("d-none");
            DOM_SELECTOR_HEADER_TERTIARY.classList.remove("d-none");
            tertiary.classList.remove("d-none")
        }

        if(quaternary) {
            DOM_SELECTOR_RESULTS_QUATERNARY.classList.remove("d-none");
            DOM_SELECTOR_HEADER_QUATERNARY.classList.remove("d-none")
            quaternary.classList.remove("d-none")
        }

    }
}
function  findSelectedAnwser(maxHeightTile) {
    DOM_Q1_ANSWERS_CONTAINER != null && DOM_Q1_ANSWERS_CONTAINER.addEventListener('click', function(e){
        e.target.closest('.columncontrol__column').classList.add(CLASS_SELECTED);

        DOM_QUESTIONS_LINKS[0].classList.remove('cmp-tabs__tab--active', 'show', 'active');
        DOM_QUESTIONS_LINKS[1].classList.add('cmp-tabs__tab--active', 'show', 'active');

        DOM_ANSWERS_VIEWS[0].classList.remove('cmp-tabs__tabpanel--active', 'show', 'active');
        DOM_ANSWERS_VIEWS[1].classList.add('cmp-tabs__tabpanel--active', 'show', 'active');

        DOM_QUESTIONS_CONTAINER.classList.add(CLASS_ENABLED);

        DOM_QUESTION2.classList.remove('d-none');
        DOM_QUESTION1.classList.add('d-none');
        DOM_QUESTION2.closest('.text').classList.remove('d-none');
        DOM_QUESTION1.closest('.text').classList.add('d-none');
        $('#container--ensure-product-finder .a-tile__link:visible').each(function(){
            let tileHeight = $(this).find('.a-tile__title').height();
            maxHeightTile = tileHeight > maxHeightTile ? tileHeight : maxHeightTile;
        });
        $('#container--ensure-product-finder .a-tile__link:visible').each(function(){
            let calculatedHeight = maxHeightTile + 100;
            $(this).css('height',calculatedHeight+'px')
        });

});
}