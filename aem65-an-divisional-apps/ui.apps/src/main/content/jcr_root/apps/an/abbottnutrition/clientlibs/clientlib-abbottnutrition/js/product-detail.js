function hideFlavorForm() {
  let productDataJSON = $(".productData").val();
  let IngredientsFlavorName = productDataJSON && JSON.parse(productDataJSON).Ingredients ? JSON.parse(productDataJSON).Ingredients : "";
  if (IngredientsFlavorName.length > 0) {
    IngredientsFlavorName.forEach(function (IngredientsFlavorNameVal) {
      if (IngredientsFlavorNameVal.FlavorName == "NA") {
        $(".cmp-product-detail__formulation-dropdowns").addClass('d-none');
      }
      else {
        $(".cmp-product-detail__formulation-dropdowns").addClass('d-block');
      }
    })
  }
}

hideFlavorForm();

function hideInsuranceLink() {
  let productDataJSON = $(".productData").val();
  let AvailArray = JSON.parse(productDataJSON).Availability;
  AvailArray.forEach(function (Avail) {
    if ($("#" + Avail.aCode).hasClass('selected')) {
      if (Avail.MarketSegment.toLocaleLowerCase() === 'retail') {
        $('.insuranceLink').hide();
      }
      else {
        $('.insuranceLink').show();
      }
    }
  })
}
if ($('.productDetailPageRun').hasClass('pageRun')) {
  hideInsuranceLink();
  let imgSlideCount = $('.mySlides').length;
  if (imgSlideCount == 1) {
    $(".slideshow-container .prev").addClass("d-none");
    $(".slideshow-container .next").addClass("d-none");
  }
  let formulationIndex, servingIndex = 0;
  let tempId;
  formulationIndex = $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown li.selected").index();

  $(".dynamic-product-detail .cmp-product-detail__serving-dropdown ul .o-content-section__list-item").removeClass("selected");
  $(".dynamic-product-detail .cmp-product-detail__serving-dropdown ul .o-content-section__list-item").eq(0).addClass("selected");
  $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .a-dropdown-selected").text($(".dynamic-product-detail .cmp-product-detail__serving-dropdown ul .o-content-section__list-item").eq(0).find("a").text());
  tempId = $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown .o-content-section__list-item.selected").attr("id");

  //Availability tab
  $(".dynamic-product-detail #tabs-availability-content .cmp-product-detail__nutrition-tables tbody tr").hide();
  $(".dynamic-product-detail #tabs-availability-content .cmp-product-detail__nutrition-tables tbody tr[data-val='" + tempId + "']").show().addClass("trShow");

  //Ingredient tab
  $(".dynamic-product-detail #tabs-ingredients-content .text h6, .dynamic-product-detail #tabs-ingredients-content .text li, .dynamic-product-detail #tabs-ingredients-content .text p").hide();
  $(".dynamic-product-detail #tabs-ingredients-content .text li[data-val='" + tempId + "']").show();
  $(".dynamic-product-detail #tabs-ingredients-content .text h6[data-val='" + tempId + "']").show();
  $(".dynamic-product-detail #tabs-ingredients-content .text p[data-val='" + tempId + "']").show();

  //Nutrition tab
  $(".dynamic-product-detail #tabs-nutrition-content .text").hide().removeClass('active-nutrition');
  $(".dynamic-product-detail #tabs-nutrition-content [data-val^='" + tempId + "-']").eq(0).show().addClass('active-nutrition');

  //Institutional Footnote
  let defaultselectedID = $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown li.selected").attr("id");
  $("#tabs-availability-content .note").siblings("p").hide();
  $("#tabs-availability-content tr[data-val='" + defaultselectedID + "'] td").each(function (e) {
    if ($(this).html().toLowerCase() == "institutional") {
      $("#tabs-availability-content .note").siblings("p").show();
      return false;
    }
  });

  //where to buy
  let marketdata = "";
  let tempskuiddefault = $(".dynamic-product-detail .wheretobuy").attr("href").split("=")[0];

  if ($("#tabs-availability-content tbody").html() != null)
    marketdata = $("#tabs-availability-content tbody").html().includes("Retail");

  if (marketdata != "") {
    let retailProduct_id = $("#tabs-availability-content tbody tr.trShow:contains('Retail') td:first-child").html();
    $('.dynamic-product-detail .cmp-product-detail__buttons .wheretobuy').removeClass("d-none");
    $('.dynamic-product-detail .cmp-product-detail__buttons .wheretobuy').attr("href", tempskuiddefault + '=' + retailProduct_id);
  }
  else {
    $('.wheretobuy').parents('.cmp-product-detail__buttons').addClass("d-none");
  }

  if ($("#tabs-availability-content tbody tr").length == 0) {
    $("#tabs-availability-content table").hide();
  }
  if ($(".nutritionSection tbody tr").length <= 1) {
    $(".nutritionSection").hide();
  }
  if ($(".vitaminSection tbody tr").length <= 1) {
    $(".vitaminSection").hide();
  }
  if ($(".mineralSection tbody tr").length <= 1) {
    $(".mineralSection").hide();
  }

  function addServingSize(actualData, selectedID) {
    for (const element of actualData.ServingSize) {
      if (element.aCode == selectedID) {
        $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .a-dropdown__menu").append("<li role='presentation' class='o-content-section__list-item'><a href='#' class='o-content-section__list-item-link'>" + element.ServingSizeName + "</a></li>");
      }
    }
  }

  $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown").on("change", function (event) {

    if ($(this).find(".a-dropdown-selected").text() == $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .dropdownlabel").text()) { return false; }

    let selectedID = $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown li.selected").attr("id");
    let productData = $(".productData").val();
    let actualData = JSON.parse(productData);

    $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .a-dropdown__menu .o-content-section__list-item").remove();

    addServingSize(actualData, selectedID);

    formulationIndex = $(event.target).find("li.selected").index();
    if (formulationIndex === -1) {
      formulationIndex = 0;
    }
    $(".dynamic-product-detail .cmp-product-detail .slideshow-container .mySlides").hide();
    $(".dynamic-product-detail .cmp-product-detail .slideshow-container .mySlides").eq(formulationIndex).show();
    $(".dynamic-product-detail .cmp-product-detail__serving-dropdown ul .o-content-section__list-item").removeClass("selected");
    $(".dynamic-product-detail .cmp-product-detail__serving-dropdown ul .o-content-section__list-item").eq(0).addClass("selected");
    $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .a-dropdown-selected").text($(".dynamic-product-detail .cmp-product-detail__serving-dropdown ul .o-content-section__list-item").eq(0).find("a").text());
    tempId = $(this).find(".o-content-section__list-item.selected").attr("id");

    //Availability tab
    $(".dynamic-product-detail #tabs-availability-content .cmp-product-detail__nutrition-tables tbody tr").removeClass("trShow");
    $(".dynamic-product-detail #tabs-availability-content .cmp-product-detail__nutrition-tables tbody tr").hide();
    $(".dynamic-product-detail #tabs-availability-content .cmp-product-detail__nutrition-tables tbody tr[data-val='" + tempId + "']").show().addClass("trShow");

    //Ingredient tab
    $(".dynamic-product-detail #tabs-ingredients-content .text h6, .dynamic-product-detail #tabs-ingredients-content .text li, .dynamic-product-detail #tabs-ingredients-content .text p").hide();
    $(".dynamic-product-detail #tabs-ingredients-content .text li[data-val='" + tempId + "']").show();
    $(".dynamic-product-detail #tabs-ingredients-content .text h6[data-val='" + tempId + "']").show();
    $(".dynamic-product-detail #tabs-ingredients-content .text p[data-val='" + tempId + "']").show();

    //Nutrition tab
    $(".dynamic-product-detail #tabs-nutrition-content .text").hide().removeClass('active-nutrition');
    $(".dynamic-product-detail #tabs-nutrition-content [data-val^='" + tempId + "-']").eq(0).show().addClass('active-nutrition');

    //Institutional Footnote
    $("#tabs-availability-content .note").siblings("p").hide();
    $("#tabs-availability-content tr[data-val='" + selectedID + "'] td").each(function (e) {
      if ($(this).html().toLowerCase() == "institutional") {
        $("#tabs-availability-content .note").siblings("p").show();
        return false;
      }
    });
    //where to buy
    let tempskuid = $(".dynamic-product-detail .wheretobuy").attr("href").split("=")[0];
    let skuid = $("#tabs-availability-content tbody tr.trShow:contains('Retail') td:first-child").html();
    let newskuid = tempskuid + "=" + skuid;
    $("#tabs-availability-content tbody tr.trShow").each(function (e) {
      let marketdataRetail = $(this).html().includes("Retail");
      console.log(marketdataRetail);
      if (!marketdataRetail) {
        $('.wheretobuy').parents('.cmp-product-detail__buttons').removeClass("d-none");
        $(".dynamic-product-detail .wheretobuy").attr("href", newskuid);
      } else {
        $('.wheretobuy').parents('.cmp-product-detail__buttons').addClass("d-none");
      }
    });
    hideInsuranceLink();
  });

  $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .a-dropdown").on("change", function (event) {

    if ($(this).find(".a-dropdown-selected").text() == $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .dropdownlabel").text()) { return false; }

    servingIndex = $(event.target).find("li.selected").index();
    $(".dynamic-product-detail #tabs-nutrition-content .text").hide().removeClass('active-nutrition');
    $(".dynamic-product-detail #tabs-nutrition-content [data-val^='" + tempId + "-']").eq(servingIndex).show().addClass('active-nutrition');

    // hiding the vitaminSection table if no data
    let vtmntrlength = $(".active-nutrition .vitaminSection table tr").length;
    if (vtmntrlength < 2) {
      $(".active-nutrition .vitaminSection").css("display", "none")
    }

    // hiding the mineralsection table if no data
    let mnrstrLength = $(".active-nutrition .mineralSection table tr").length;
    if (mnrstrLength < 2) {
      $(".active-nutrition .mineralSection").css("display", "none")
    }
  }
  );

  $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown").on('click', function () {
    $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .a-dropdown .a-dropdown__field").removeClass("active");
  });

  $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .a-dropdown").on('click', function () {
    $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown .a-dropdown__field").removeClass("active");
  });


  $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown").on('keydown', function () {
    $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown .a-dropdown__field").toggleClass("active");

  });
  $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .a-dropdown").on('keydown', function () {
    $(".dynamic-product-detail .cmp-product-detail__serving-dropdown .a-dropdown .a-dropdown__field").toggleClass("active");
  });

  let slideIndex = 1;
  showSlides(slideIndex);

  function showSlides(n) {
    let i;
    let slides = $(".dynamic-product-detail .mySlides");

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      $(slides[i]).hide();
    }

    $(slides[slideIndex - 1]).show();
  }
  $(".dynamic-product-detail .cmp-product-detail .slideshow-container .mySlides").hide();
  $(".dynamic-product-detail .cmp-product-detail .slideshow-container .mySlides").eq(formulationIndex).show();

}
// hiding the vitaminSection table if no data
let vtmntrcount = $(".active-nutrition .vitaminSection table tr").length;
if (vtmntrcount < 2) {
  $(".active-nutrition .vitaminSection").css("display", "none")
}

// hiding the mineralsection table if no data
let mnrstrcount = $(".active-nutrition .mineralSection table tr").length;
if (mnrstrcount < 2) {
  $(".active-nutrition .mineralSection").css("display", "none")
}

//Updating product info on image change:
$(".dynamic-product-detail .cmp-product-detail__mediacarousel .slideshow-container a.prev, .dynamic-product-detail .cmp-product-detail__mediacarousel .slideshow-container a.next").on('click', function () {
  //getting selected img index
  let simgindex = $(".dynamic-product-detail .cmp-product-detail .slideshow-container .mySlides[style='display: block;']").index();
  $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown li").removeClass("selected");
  $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown li").eq(simgindex).addClass("selected");

  //assigning the seleccted img index to dropdown
  let dropdownflavspan = $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown").find('.a-dropdown__field').children('span');
  let ddelement = $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown").find('.a-dropdown__menu');
  let ddval = ddelement.find(".selected").text();
  dropdownflavspan.text(ddval);

  const e = new Event("change");
  const element = document.querySelector('.dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown')
  element.dispatchEvent(e);

});

