$(function () {
  let wcmEdit = $("#wcmMode").val();
  if (wcmEdit == "false") {
    if ($("#canada-warranty-registration").length > 0) {
      hideFieldsCanadaWarranty();
      showHidePharmacyOptions();
      validateAge();
      disableMonthsforCurrentYear();
    }
  }
  //hide other languages except canada
  if (window.screen.width <= 768) {
    $('.o-header-v2-global .languagenavigation').length >0 && $(".m-link-stack__list li:not(:has(a[lang='en-CA']), :has(a[lang='fr-CA']))").hide();
  }

  // Adding language attr to the langugage navigation anchor
  let langLink = $(".o-header__secondary-top-nav .m-link-stack__list .a-link__text");
  langLink.each(function () {
    let href = $(this).attr("href");
    let langAttribute = setLangAttribute(href);
    $(this).attr("lang", langAttribute);

  });

  //warranty form month field change as per year value change code
  $(document).on('blur', '#warrenty-reg-year-options .a-dropdown .a-dropdown__field', function () {
    if ($(this).hasClass('active') !== true) {
      let listItem = $('#warrenty-reg-year-options .a-dropdown__field ul li');
      if (listItem.hasClass('selected')) {
        $('#warrenty-reg-month-options .a-dropdown__field').attr('tabindex', 0);
      }
    }
  });
  $(document).ready(function () {
    //superscript and subscript for sub-menu items
    $('.m-mega-menu__item a, .m-mega-menu__nested-menu a').contents().filter(function () {
      if (null != this.nodeValue && (this.nodeValue.search("<sup>") != -1 || this.nodeValue.search("<sub>") != -1))
        return this.nodeType === 3;
    }).replaceWith(function () {
      return this.nodeValue;
    });
  });

});

function disableMonthsforCurrentYear() {
  $("#canada-warranty-registration ul[name='purchase_year']>li").on("click", function () {
    $("#canada-warranty-registration ul[name='purchase_month']").parent().removeClass("disabled");
    $("#canada-warranty-registration ul[name='purchase_month']>li").removeClass("disabled");
    let yearofPurchase = $(this).attr("data-optionvalue");
    let currentYear = (new Date).getFullYear().toString();
    if (yearofPurchase === currentYear) {
      let currentMonth = (new Date).getMonth() + 1;
      let monthList = $("#canada-warranty-registration ul[name='purchase_month']>li");
      monthList.each(function () {
        if (currentMonth < parseInt($(this).attr("data-optionvalue")))
          $(this).addClass("disabled");
      });
    }
  })
}

function showHidePharmacyOptions() {
  $("#canada-warranty-registration ul[name='placeOfPurchase']>li").on("click", function () {
    let placeOfPurchase = $(this).attr("data-optionvalue");
    let pharmacyOptions = $("input[name='retailStoreOfPurchase']");
    if (null != pharmacyOptions) {
      if (placeOfPurchase === "2") {
        pharmacyOptions.parent().parent().parent().parent().show();
      } else {
        pharmacyOptions.parent().parent().parent().parent().hide();
      }
    }
  });
}

function validateAge() {
  let birthYear = $("#canada-warranty-registration input[name='birthYear']");
  birthYear.on("change", function () {
    setTimeout((function () {
      birthYear.parent().parent().removeClass("validation-error");
      let age = (new Date).getFullYear() - $(this).val();
      if (age < 18 || ($(this).val() < 1900))
        birthYear.parent().parent().addClass("validation-error");
    }).bind(this), 20);
  });
}

const setLangAttribute = (href) =>{
let isFr = href.indexOf("/fr/") > -1 || href.indexOf("/ca-fr/") > -1;
let isEn = href.indexOf("/en/") > -1 || href.indexOf("/ca-en/") > -1;
let isZh = href.indexOf("/zh/") > -1 || href.indexOf("/ca-zh/") > -1;
if(isFr) { return "fr"; }
if(isEn) { return "en"; }
if(isZh) { return "zh"; }
}
