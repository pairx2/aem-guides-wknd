$(document).ready(function () {

  pageFilterDate();

  function pageFilterDate() {
      if($(".sticky-menu__filter").find(".o-search-res__results--view").find(".a-card-result__description").length != 0 ) {
          dateChangeForFilter();
      }else {
          setTimeout(function() {
              pageFilterDate();
          }, 500);
      }
  }

    function dateChangeForFilter() {
        setTimeout(function() {
            let dateFilter = $(".sticky-menu__filter").find(".a-card-result");
            $(dateFilter).each(function() {
                let textDate = $(this).find(".a-card-result__description").text();
                let labelDate = textDate.match(/\D+|\d+/g);
                if(labelDate.length == 2) {
                    let stickyPageFilterTile = $(this).find(".a-card-result__title").html();
                    let stickyPageFilterTile_lowercase = stickyPageFilterTile.replaceAll("i-STAT","<span class='nonCapitalised'>i-STAT</span>");
                    $(this).find(".a-card-result__title").html(stickyPageFilterTile_lowercase);
                    let dateStr = parseInt(textDate.match(/\d+/g)[0]);
                    let option = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "Asia/Kolkata" 
                    };
                    let dateVal  = new Date(dateStr);
                    let dateValue = dataValCallPreferredLanguage(dateVal, option);
                
                    let printDate = labelDate[0].trim() + ' ' + wordCaptitalize(dateValue);
                    $(this).find(".a-card-result__description").text(printDate);
                }
 
            });
           pageFilterDate();
        }, 500);
    }

    function wordCaptitalize(text){
        let word = text;
        let firstLetter = word.charAt(0)
        let firstLetterCap = firstLetter.toUpperCase()
        let remainingLetters = word.slice(1)
        let capitalizedWord = firstLetterCap + remainingLetters;
        return capitalizedWord;
      }

    let stickFilterClick = $(".sticky-menu__filter").find(".m-link-stack__list-item");
    $(stickFilterClick).each(function() {
        $(this).on("click", function() {
            pageFilterDate();
        });
    });    

  let categoryFilterClick = $(".sticky-menu__filter").find(".m-search-category__item");
  $(categoryFilterClick).each(function() {
      $(this).on("click", function() {
          pageFilterDate();
      });
  });

/**
* Filter sticky page filter results, 
* when coming to the page by clicking on article tag or article topic selector.
*/
let stickyMenu = $(".sticky-menu__filter");
let urlHash = $(location).attr("hash");
let stickyTagFilterVal = callSticyTagFilterVal(stickyMenu, urlHash, filterResultsForHashVal);

function filterResultsForHashVal() {
   callSearchFacet(stickyMenu, stickyTagFilterVal, filterResultsForHashVal);
	}
    let maxHeightCard = setInterval(function(){ 
        let maxHeight = 0;
        let cardLength = $(".sticky-menu__filter .a-card-result.a-card-result__cardrow .a-card-result__title").length;
        $(".sticky-menu__filter .a-card-result.a-card-result__cardrow .a-card-result__title").each(function(index){
           let _this = this;
            maxHeight = callResultTitle(_this, maxHeight, index, cardLength, maxHeightCard);
        });  
    },500);
    
});

function callSticyTagFilterVal(stickyMenu, urlHash, filterResultsForHashVal) {
  let stickyTagFilterVal;
  if (stickyMenu.length > 0 && urlHash) {
    stickyTagFilterVal = sessionStorage.getItem("sticky-tag-title-filter");
    if (stickyTagFilterVal) {
      //remove from session storage to ensure the filtering happens once only.
      sessionStorage.removeItem("sticky-tag-title-filter");
      filterResultsForHashVal();
    }
  }
  return stickyTagFilterVal;
}

function dataValCallPreferredLanguage(dateVal, option) {
  let preferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
  if (preferredLanguage === "nn") {
    preferredLanguage = "no-NN";
  }
  let dateValue = dateVal.toLocaleDateString(preferredLanguage, option);
  let dayString = dateValue.split(' ')[0]?.replace('.', '');
  if (dayString.length == 1) {
    dayString = '0' + dayString;
  }
  if (preferredLanguage.toLowerCase() == 'es' || preferredLanguage.toLowerCase() == 'pt') {
    dateValue = (dateValue.split(' ')[2] + ' ' + dayString + ', ' + dateValue.split(' ')[4]);
  }
  if (preferredLanguage.toLowerCase() == 'sv' || preferredLanguage.toLowerCase() == 'it' || preferredLanguage.toLowerCase() == 'fr' || preferredLanguage.toLowerCase() == 'nl') {
    dateValue = (dateValue.split(' ')[1] + ' ' + dayString + ', ' + dateValue.split(' ')[2]);
  }
  if (preferredLanguage.toLowerCase() == 'de' || preferredLanguage.toLowerCase() == 'da' || preferredLanguage.toLowerCase() == 'cs' || preferredLanguage.toLowerCase() == 'fi' || preferredLanguage.toLowerCase() == 'no-nn') {
    dateValue = (dateValue.split(' ')[1] + ' ' + dayString + ', ' + dateValue.split(' ')[2]);
  }
  return dateValue;
}

function callResultTitle(_this, maxHeight, index, cardLength, maxHeightCard) {
  if ($(_this).height() > maxHeight) {
    maxHeight = $(_this).height();
  }
  if (index === cardLength - 1) {
    $(".a-card-result__title").height(maxHeight);
    clearInterval(maxHeightCard);
  }
  return maxHeight;
}

function callSearchFacet(stickyMenu, stickyTagFilterVal, filterResultsForHashVal) {
  let cateELementList = $(stickyMenu).find('.m-search-category__content .faq-link .a-link__text');
  if (cateELementList.length > 0) {
    let tagFilterToApply = ".searchfacet [aria-label='" + stickyTagFilterVal + "']";
    if ($(tagFilterToApply)) {
      $(tagFilterToApply)[0]?.click();
    }
  } else {
    let isSearchCompleted = $(".o-search-res__results--view .result-items").length > 0 || $(".o-search-res__no-results").is(":visible");
    if (!isSearchCompleted) {
      setTimeout(function () {
        filterResultsForHashVal();
      }, 500);
    }
  }
}
