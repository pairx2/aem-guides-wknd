$(document).on('ready',function () {
  let anchorHref = [];
  /*approach 1*/
  $('section.cmp-contentfragmentlist article.cmp-contentfragment').each(function(index) {
    anchorHref.push($(this).find('.cmp-contentfragment__element--contentdetailsreference .cmp-contentfragment__element-value').text().trim());
  });
  if (anchorHref) {
    $(".a-contentfragmentlist--base article.cmp-contentfragment").each(
      function (index, value) {
        $(this).wrap(
          `<a class="article-anchor" href=${anchorHref[index]}></a>`
        );
      }
    );
  }
});
function displayMaxItems(items, maxItems) {
  $(".article-anchor").removeClass("d-none");
  window.remainingItems = items.length;
  window.remainingItemsToShow = window.totalItems;
  [].forEach.call(items, function (item, idx) {
    if (idx > maxItems - 1) {
      item.classList.add("d-none");
    }
  });
}

function displayPaginationText(articleTotal, maxItems) {
  $(".article-totalcount").text(articleTotal);
  $(".article-maxlimit").text(maxItems);

  if (articleTotal == maxItems) {
    $(".article-maxlimit").text(articleTotal);
  }
  if (articleTotal < maxItems) {
    $(".article-maxlimit").text(articleTotal);
  }
}

function displayCheckboxSelectedItems(loadMoreClicked) {
  let counter = 0;
  $(".article-anchor").each(function (index, element) {
    let filterValue = $(this)
      .find(".cmp-contentfragment__element--tagsType")
      .find(".cmp-contentfragment__element-value");
    let filterValueString = filterValue[0].innerHTML
      .replace(/\s/g, "")
      .split("<br>");
    if (filterValueString.some((item) => window.category_list.includes(item))) {
      if (loadMoreClicked) {
        if ($(element).hasClass("d-none")) {
          counter = counter + 1;
        }
      } else {
        counter = counter + 1;
      }
      if (counter > window.maximumItems) {
        $(element).addClass("d-none");
      } else {
        $(element).removeClass("d-none");
      }
    } else {
      $(element).addClass("d-none");
    }
  });
}

function displayLoadMoreButton(totalElements) {
  let loadMoreBtn = document.querySelector(".a-title--blog-load-more");
  if (loadMoreBtn) {
    if (totalElements > window.maximumItems) {
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }
}
function onClickCheckBox(checkedBox){
  let category_list = [];
  let totalItems = 0;
  let displayTotal;
  let checkBoxNumber = false;
    for (let box of checkedBox) { 
      let match = box.labels[0].innerText.match(/(\d+)/);
      if (match) {
        totalItems +=
        parseInt(match[0]);
        checkBoxNumber = true;
      }
    }
    if(checkBoxNumber) {
      window.totalItems = totalItems;
      window.remainingItemsToShow = window.totalItems;
      window.checkedBox = checkedBox.length;
      if (totalItems === 0 && checkedBox.length === 0) {
        displayTotal = articleTotal;
      } else {
        displayTotal = totalItems;
      }
      displayPaginationText(displayTotal, window.maximumItems);
      $(".a-checkbox .a-checkbox__input").each(function () {
        if ($(this).prop("checked")) {
          category_list.push($(this).val());
        }
      });
      window.category_list = category_list;
      displayLoadMoreButton(displayTotal);
      if (category_list.length == 0) {
        displayMaxItems(items, maxItems);
      } else {
        displayCheckboxSelectedItems(false);
      }
    }
}
function noCheckbox(window){
  let remainderItems;
    let total;
  if (window.checkedBox === 0) {
    window.remainingItems = window.remainingItems - maxItems;
    remainderItems = window.remainingItems;
    total = articleTotal;
  } else {
    window.remainingItemsToShow = window.remainingItemsToShow - maxItems;
    remainderItems = window.remainingItemsToShow;
    total = window.totalItems;
  }

  if (remainderItems > maxItems) {
    $(".article-maxlimit").text(total - remainderItems + 10);
  } else {
    $(".article-maxlimit").text(total);
    loadMoreBtn.style.display = "none";
  }
}
/**ARTICLE pagination **/
$(window).on('load',function () {
  $(".nav-link").on('click',function () {
    $(this).parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
  });
  window.maximumItems = 4;
  window.totalItems = 0;
  window.remainingItemsToShow = 0;
  window.checkedBox = 0;
  window.category_list = [];

  let parent = document.querySelector(".cmp-contentfragmentlist");
  let items = parent == null ? [] : parent.querySelectorAll(".article-anchor"),
    loadMoreBtn = document.querySelector(".a-title--blog-load-more"),
    maxItems = 4,
    articleTotal = items.length;
  window.remainingItems = articleTotal;
  displayPaginationText(articleTotal, maxItems);
  displayMaxItems(items, maxItems);

  /*remove all filter*/
  $("#removealfilter").on('click',function () {
    $(".a-checkbox__input").prop("checked", false);
    displayMaxItems(items, maxItems);
    displayPaginationText(articleTotal, maxItems);
    displayLoadMoreButton(articleTotal);
    window.checkedBox = 0;
  });

  /* loadmore button visibility logic */
  displayLoadMoreButton(articleTotal);

  /*on click of load more button logic */
  $(".a-title--blog-load-more").on('click',function () {
    /* if no checkbox is selected */
    noCheckbox(window);
    if (window.checkedBox === 0) {
      [].forEach.call(
        document.querySelectorAll(".article-anchor.d-none"),
        function (item, idx) {
          if (idx < maxItems) {
            item.classList.remove("d-none");
          }
          if (
            document.querySelectorAll(".article-anchor.d-none").length === 0
          ) {
            loadMoreBtn.style.display = "none";
          }
        }
      );
    } else {
      displayCheckboxSelectedItems(true);
    }
  });

  //On click checkbox logic
  $(".o-form-option--base .checkbox").on("change", function () {
    let checkedBox = $(
      '.o-form-option--base .checkbox input[type="checkbox"]:checked'
    );
   onClickCheckBox(checkedBox);
  });

  $(".back-to-top").on('click',function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
  /** SIte search with Content fragments **/
  function removeFromResults() {
    setTimeout(function () {
      $(
        '.a-result__title a:not(.a-result__title--link):not([aria-label*="href"])'
      ).each(function () {
        $(this).parents(".a-result__title").html($(this)[0]);
      });
    }, 2000);
  }
  /*Case1: On page load check url and call removeFromResults*/
  $(window).on('load',function () {
    let url = new URL(window.location.href);
    if (
      url.searchParams.has("search.html") ||
      url.searchParams.has("searchresult.html") ||
      url.searchParams.has("searchresult/")
    ) {
      removeFromResults();
    }
  });

  /*Case2: On Search Button Click*/
  $(".m-search-bar__button .search-button .btn").on("click", removeFromResults);

  /*Case3: On Focus Out*/
  $(".a-searchbar--base input.m-search-bar__input-field").on(
    "focusout",
    removeFromResults
  );
  $(
    '.a-result__title a:not(.a-result__title--link):not([aria-label*="href"])'
  ).each(function () {
    $(this).parents(".a-result__title").html($(this)[0]);
  });
});
/* ----- ARTICLE  TAG FILTER STARTS ----- */
$(document).on('ready',function () {
  let tagFilterItems = [];
  let uniqueTagFilterItems = [];

  let str1 = $(this)
    .find(".cmp-contentfragment__element--tagsType")
    .find(".cmp-contentfragment__element-value");
  for (let item of str1) {
    tagFilterItems.push(item.innerHTML.replace(/\s/g, "").split("<br>"));
  }
  tagFilterItems = tagFilterItems.concat.apply([], tagFilterItems);
  uniqueTagFilterItems = [...new Set(tagFilterItems)];

  initShowCount();
  function initShowCount() {
    for (let uniqueItem of uniqueTagFilterItems) {
      countInArray(tagFilterItems, uniqueItem);
    }

    function countInArray(array, element) {
      let count = 0;
      for (let arrayItem of array) {
        if (arrayItem === element) {
          count++;
        }
      }
      let regExp = /\([^()]*\)/;
      let matches = regExp.exec(
        $("input[type=checkbox][value='" + element + "']")
          .prev("span")
          .text()
      );
      if (matches && matches.length > 1) {
        let text = $("input[type=checkbox][value='" + element + "']")
          .prev("span")
          .text();
        $("input[type=checkbox][value='" + element + "']")
          .prev("span")
          .text(text.replace(matches[1], count));
      }
      return count;
    }
  }
});
/* ----- Article TAG FILTER Ends----- */

// **** BLOGS FILTER STARTS HERE 20/06**** //
let buttonValue;
let buttonStr;
$(document).on('ready',function () {
  let isClassAvailable = $("*").hasClass("a-contentfragmentlist--view1");
  let filterbtn = $(".a-container--product-tags .button .btn");

  filterbtn.on("click", function () {
    window.buttonStr = $(this).attr("href");
    if (window.buttonStr.length > 1) {
      window.buttonValue = window.buttonStr.split("~")[1];
      window.localStorage.setItem("filteredBlog", window.buttonValue);
    }
  });

  let strTagsType = $(this)
    .find(".a-column-control--paddingLR")
    .find(".a-contentfragmentlist--view1")
    .find(".cmp-contentfragment__element--tagsType")
    .find(".cmp-contentfragment__element-value");
  let tagFilterItems = [];
  let countFilterItems = 0;

  if (isClassAvailable && window.localStorage.getItem("filteredBlog")) {
    $(".a-contentfragmentlist--view1 .article-anchor").addClass("dis-none");
    for (let i = 0; i < strTagsType.length; i++) {
      tagFilterItems.push(
        strTagsType[i].innerHTML.replace(/\s/g, "").split("<br>")
      );

      for (let tagItem of tagFilterItems[i]){
        if (
          tagItem.split("/")[1] ==
          window.localStorage.getItem("filteredBlog")
        ) {
          countFilterItems++;
          $(".a-contentfragmentlist--view1 .article-anchor")
            .eq(i)
            .removeClass("d-none dis-none");
          }  
      }
    }
  }
  $(".a-contentfragmentlist--view1").find(".dis-none").remove();
});

// **** BLOGS FILTER ENDS HERE **** //
/*form line view js updated*/
$(".a-text--base.a-text--o-on-center .cmp-text").append("<span>o</span>");
$(".a-text--base.a-text--ou-on-center .cmp-text").append("<span>Ou</span>");
/* ---  using for reto-registration component only starts from here @Mahehs Ninawe--- */
/* ---  showing error on select/unselect ---*/
/* commented on 15 june - it is not required now. as backend team worked on this and no need of 
 these line */

/* ---  using for reto-registration component only ends from here --- */
