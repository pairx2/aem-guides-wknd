let answer1 = 0;
let answer2 = 0;
let DOM_SELECTOR_RESULTS = document.getElementById('brand-products');
let DOM_SELECTOR_RESULTS_PRIMARY = document.getElementById('products-primary');
let DOM_SELECTOR_RESULTS_SECONDARY = document.getElementById('products-secondary');
let DOM_SELECTOR_RESULTS_TERTIARY = document.getElementById('products-tertiary');
let DOM_SELECTOR_RESULTS_QUATERNARY = document.getElementById('products-quaternary');

let DOM_SELECTOR_HEADER_PRIMARY = document.getElementById('header-primary');
let DOM_SELECTOR_HEADER_SECONDARY = document.getElementById('header-secondary');
let DOM_SELECTOR_HEADER_SECONDARY_MULTIPLE = document.getElementById('header-secondary-multiple');
let DOM_SELECTOR_HEADER_TERTIARY = document.getElementById('header-tertiary');
let DOM_SELECTOR_HEADER_QUATERNARY = document.getElementById('header-quaternary');
let DOM_Q1_ANSWERS_CONTAINER = document.getElementById("question1-answers");
let DOM_Q1_ANSWERS = DOM_Q1_ANSWERS_CONTAINER && DOM_Q1_ANSWERS_CONTAINER.querySelectorAll(".columncontrol__column");
let DOM_Q2_ANSWERS_CONTAINER = document.getElementById("question2-answers");
let DOM_Q2_ANSWERS = DOM_Q2_ANSWERS_CONTAINER && DOM_Q2_ANSWERS_CONTAINER.querySelectorAll(".columncontrol__column");
let CLASS_ENABLED = 'enabled';
let CLASS_SELECTED = 'selected';

let DOM_QUESTION1 = document.querySelector("#question1");
let DOM_QUESTION2 = document.querySelector("#question2");
let SELECTOR_PRODUCT_FINDER_CONTAINER = "container--brand-product-finder";
let SELECTOR_QA_OPTIONS_CONTAINER = 'brand-qa-options';

let DOM_SELECTOR_PRODUCT_FINDER = document.getElementById(SELECTOR_PRODUCT_FINDER_CONTAINER);
let DOM_QA_OPTIONS_CONTAINER = document.getElementById(SELECTOR_QA_OPTIONS_CONTAINER)?.closest('.container');
let DOM_QUESTIONS_CONTAINER = document.querySelector("#" + SELECTOR_QA_OPTIONS_CONTAINER + ' .a-tabs__nav');

let DOM_QUESTIONS_LINKS = document.querySelectorAll("#" + SELECTOR_QA_OPTIONS_CONTAINER + ' .cmp-tabs__tab');
let DOM_ANSWERS_VIEWS = document.querySelectorAll("#" + SELECTOR_QA_OPTIONS_CONTAINER + ' .cmp-tabs__tabpanel');

$(function() {
    findSelectedValue();
    
    let maxHeightTile = 0;

    $('#container--brand-product-finder .a-tile__link:visible').each(function(){
        let tileHeight = $(this).find('.a-tile__title').height();
        maxHeightTile = tileHeight > maxHeightTile ? tileHeight : maxHeightTile;
    });
    setTimeout(function(){
        $('#container--brand-product-finder .a-tile__link:visible').each(function(){
            let calculatedHeight = maxHeightTile + 100;
            $(this).css('height',calculatedHeight+'px')
        });
    },500)

    let results = [
        { answer1: 1, answer2: 1, primary: ["ensure-1-1-original"], secondary:["ensure-plus-1-1-secondary"], tertiary: [], quaternary: []},
        { answer1: 1, answer2: 2, primary: ["ensure-1-2-plus"], secondary: ["ensure-enlive-1-2-secondary"], tertiary: [], quaternary: []},
        { answer1: 2, answer2: 1, primary: ["ensure-2-1-original"], secondary: ["ensure-plus-2-1-secondary"], tertiary: [], quaternary: []},
        { answer1: 2, answer2: 2, primary: ["ensure-2-2-plus"], secondary: ["ensure-enlive-2-2-secondary"], tertiary: [], quaternary: [] },
        { answer1: 3, answer2: 1, primary: ["ensure-3-1-original"], secondary: ["ensure-plus-3-1-secondary"], tertiary: [], quaternary: []},
        { answer1: 3, answer2: 2, primary: ["ensure-3-2-plus"], secondary: ["ensure-enlive-3-2-secondary"], tertiary: [], quaternary: []},
        { answer1: 3, answer2: 3, primary: ["ensure-3-3-plus"], secondary: ["ensure-enlive-3-3-secondary"], tertiary: [], quaternary: []},
    ];

  

    DOM_QUESTION2 != null && DOM_QUESTION2.classList.add('d-none');
    DOM_QUESTION2 != null && DOM_QUESTION2.closest('.text').classList.add('d-none');
    document.querySelectorAll("#brand-products [id^='ensure-']").forEach(function(item){
		item.closest(".productsection").classList.add("d-none");
    });
        document.querySelectorAll("#brand-products [id^='products-']").forEach(function(item){
		item.classList.add("d-none");
    });

    document.querySelectorAll("#brand-products [id^='header-']").forEach(function (item) {
        item.closest(".title").classList.add("d-none");
    });

    if (DOM_SELECTOR_PRODUCT_FINDER != null && DOM_SELECTOR_PRODUCT_FINDER.classList.contains("view2")) {
        DOM_SELECTOR_PRODUCT_FINDER.classList.remove("view2")
    }

    findSelectedOptions();
    
    findSelectedPostion();
    
    function displayResult() {
        results.forEach(function(result){
            displayResultValue(result);
        })
    }
    
    findSelectedAnwser(maxHeightTile);

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
function findSelectedValue(){
    if($(window).width()<767){
        $('#container--brand-product-finder').closest('.container').css('padding','0px')
    }
    if($(window).width()>767){
        $('#container--brand-product-finder').closest('.container').addClass('pl-0');
        $('#container--brand-product-finder').closest('.container').addClass('pr-0');
    }
}
function findSelectedAnwser(maxHeightTile){
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
        findSelectedPostion();
        $('#container--brand-product-finder .a-tile__link:visible').each(function(){
            let tileHeight = $(this).find('.a-tile__title').height();
            maxHeightTile = tileHeight > maxHeightTile ? tileHeight : maxHeightTile;
        });
        $('#container--brand-product-finder .a-tile__link:visible').each(function(){
            let calculatedHeight = maxHeightTile + 100;
            $(this).css('height',calculatedHeight+'px')
        });

});
}
function findSelectedOptions() {
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
function findSelectedPostion() {
    DOM_Q1_ANSWERS.forEach(function(item, index){
        if(item.classList.contains(CLASS_SELECTED)) {
            const selectedPostion = index+1;
            if(selectedPostion == 1 || selectedPostion == 2) {
                DOM_Q2_ANSWERS[2].classList.add('d-none');
            }
        }
    });
}
function displayResultValue(result){
    if (result["answer1"] == answer1 && result["answer2"] == answer2) {
        DOM_SELECTOR_RESULTS.style.display = "block";
        for(let i in result.primary ){
            let primaryID = document.getElementById(result.primary[i]);
            if(primaryID) {
                DOM_SELECTOR_RESULTS_PRIMARY.classList.remove("d-none");
                DOM_SELECTOR_HEADER_PRIMARY.closest(".title").classList.remove("d-none");
                primaryID.closest(".productsection").classList.remove("d-none");
                
            }
        }
        
        multipleValue(result);
        TertiaryQuaternary(result);
    }
}

function TertiaryQuaternary(result){
    for(let i in result.tertiary ){
        let tertiaryID = document.getElementById(result.tertiary[i]);
       if(tertiaryID) {
           DOM_SELECTOR_RESULTS_TERTIARY.classList.remove("d-none");
           DOM_SELECTOR_HEADER_TERTIARY.closest(".title").classList.remove("d-none");
           tertiaryID.closest(".productsection").classList.remove("d-none");
       }
   }
   for(let i in result.quaternary ){
        let quaternaryID = document.getElementById(result.quaternary[i]);
        if(quaternaryID) {
           DOM_SELECTOR_RESULTS_QUATERNARY.classList.remove("d-none");
           DOM_SELECTOR_HEADER_QUATERNARY.closest(".title").classList.remove("d-none")
           quaternaryID.closest(".productsection").classList.remove("d-none");
       }
   }
}

function multipleValue(result){
    if(result.secondary.length != 1){
                
        for(let i in result.secondary ){
            let secondaryMultipleID = document.getElementById(result.secondary[i]);
            if(secondaryMultipleID) {
                DOM_SELECTOR_RESULTS_SECONDARY.classList.remove("d-none");
                DOM_SELECTOR_HEADER_SECONDARY_MULTIPLE.closest(".title").classList.remove("d-none");
                secondaryMultipleID.closest(".productsection").classList.remove("d-none");   
            }
        }
    }else{
        for(let i in result.secondary ){
            let secondaryID = document.getElementById(result.secondary[i]);
            if(secondaryID) {
                DOM_SELECTOR_RESULTS_SECONDARY.classList.remove("d-none");
                DOM_SELECTOR_HEADER_SECONDARY.closest(".title").classList.remove("d-none");
                secondaryID.closest(".productsection").classList.remove("d-none");   
            }
        }
    }
}


