$(document).ready(function () {
  $(".a-column-control--filter-side-effect-text")
    .find(".a-dropdown__menu")
    .find("li")
    .find("span:first")
    .hide();

  let filterLi = $(".a-container--filter-parent").find(".a-dropdown__menu li");

  $(
    ".a-column-control--filter-side-effect-tab1 .m-card, .a-column-control--filter-side-effect-tab2 .m-card, .a-column-control--filter-side-effect-tab3 .m-card, .a-column-control--filter-side-effect-tab4 .m-card, .a-column-control--filter-side-effect-tab5 .m-card, .a-column-control--filter-side-effect-tab6 .m-card"
  ).on("click", function () {
    $(
      ".a-column-control--filter-side-effect-tab1, .a-column-control--filter-side-effect-tab2"
    ).hide();
    $(".a-container--filer-fatigue, .a-container--filer-nausea").hide();

    let thistab = $(this).find(".m-card__title.h4").text();
    $(".a-column-control--filter-side-effect-text .a-dropdown__placeholder")
      .addClass("a-dropdown-selected")
      .removeClass("a-dropdown__placeholder")
      .html(thistab);
    if (thistab == "FATIGUE") {
      $(".a-container--filer-fatigue").show();
    } else if (thistab == "TASTE CHANGES") {
      $(".a-container--filer-taste-changes").show();
    } else if (thistab == "APPETITE LOSS") {
      $(".a-container--filer-appetite-loss").show();
    } else if (thistab == "MOUTH SORENESS") {
      $(".a-container--filer-mouth-soreness").show();
    } else if (thistab == "DIARRHEA") {
      $(".a-container--filer-diarrhea").show();
    } else if (thistab == "NAUSEA") {
      $(".a-container--filer-nausea").show();
    }

    if ($(window).width() <= 1023) {
      $(".a-column-control--filter-side-effect-text")
        .find(".row")
        .find(".col-12.col-md-8.col-lg-8.columncontrol__column")
        .css({
          "flex": "0 0 100%",
          "max-width": "100%",
          "display": "flex",
          "justify-content": "center"
        });
      $(".a-column-control--filter-side-effect-text")
        .find(".row")
        .find(".col-12.col-md-4.col-lg-4.columncontrol__column")
        .css({ "display": "block", "max-width": "250px" });
    } else {
      $(".a-column-control--filter-side-effect-text")
        .find(".row")
        .find(".col-12.col-md-8.col-lg-8.columncontrol__column")
        .css({
          "flex": "0 0 75%",
          "max-width": "68%",
          "display": "flex",
          "justify-content": "end"
        });
      $(".a-column-control--filter-side-effect-text")
        .find(".row")
        .find(".col-12.col-md-4.col-lg-4.columncontrol__column")
        .css({ "display": "block", "max-width": "300px" });
    }

    // Dynamically adding hrefs to cards.
    $(
      ".a-container--filer-fatigue article.cmp-contentfragment, .a-container--filer-taste-changes article.cmp-contentfragment, .a-container--filer-appetite-loss article.cmp-contentfragment, .a-container--filer-mouth-soreness article.cmp-contentfragment, .a-container--filer-diarrhea article.cmp-contentfragment, .a-container--filer-nausea article.cmp-contentfragment"
    ).on("click", function () {
      let contentfragmentElement = $(this).find(
        ".cmp-contentfragment__elements"
      );
      let contentdetailsreferenceElement = contentfragmentElement.find(
        ".cmp-contentfragment__element--contentdetailsreference"
      );

      if (contentdetailsreferenceElement != undefined) {
        let valueElement = contentdetailsreferenceElement.find(
          ".cmp-contentfragment__element-value"
        );
        window.location.href = valueElement.text();
      }
    });
  });

  filterLi.on("click", function () {
    let selectedTab = $(this).attr("data-optionvalue");

    if ($(window).width() <= 1023) {
      $(".a-column-control--filter-side-effect-text")
        .find(".row")
        .find(".col-12.col-md-8.col-lg-8.columncontrol__column")
        .css({
          "flex": "0 0 100%",
          "max-width": "100%",
          "display": "flex",
          "justify-content": "center"
        });
    } else {
      $(".a-column-control--filter-side-effect-text")
        .find(".row")
        .find(".col-12.col-md-8.col-lg-8.columncontrol__column")
        .css({
          "flex": "0 0 75%",
          "max-width": "68%",
          "display": "flex",
          "justify-content": "end"
        });
    }

    $(
      ".a-container--filer-fatigue, .a-container--filer-taste-changes, .a-container--filer-appetite-loss, .a-container--filer-mouth-soreness, .a-container--filer-diarrhea, .a-container--filer-nausea"
    ).addClass("d-none");

    if (selectedTab == "FATIGUE") {
      setTimeout(function () {
        $(".a-container--filer-fatigue").removeClass("d-none").show();
        $(".a-container--filer-fatigue").find("article").removeClass("d-none");
        $(".m-card.m-card--tip-view").css("height", "100%");
      }, 1);
    } else if (selectedTab == "NAUSEA") {
      setTimeout(function () {
        $(".a-container--filer-nausea").removeClass("d-none").show();
        $(".a-container--filer-nausea").find(".m-card").removeClass("d-none");
        $(".m-card.m-card--tip-view").css("height", "100%");
      }, 1);
    } else if (selectedTab == "TASTE CHANGES") {
      setTimeout(function () {
        $(".a-container--filer-taste-changes").removeClass("d-none").show();
        $(".a-container--filer-taste-changes")
          .find(".m-card")
          .removeClass("d-none");
        $(".m-card.m-card--tip-view").css("height", "100%");
      }, 1);
    } else if (selectedTab == "APPETITE LOSS") {
      setTimeout(function () {
        $(".a-container--filer-appetite-loss").removeClass("d-none").show();
        $(".a-container--filer-appetite-loss")
          .find(".m-card")
          .removeClass("d-none");
        $(".m-card.m-card--tip-view").css("height", "100%");
      }, 1);
    } else if (selectedTab == "MOUTH SORENESS") {
      setTimeout(function () {
        $(".a-container--filer-mouth-soreness").removeClass("d-none").show();
        $(".a-container--filer-mouth-soreness")
          .find(".m-card")
          .removeClass("d-none");
        $(".m-card.m-card--tip-view").css("height", "100%");
      }, 1);
    } else if (selectedTab == "DIARRHEA") {
      setTimeout(function () {
        $(".a-container--filer-diarrhea").removeClass("d-none").show();
        $(".a-container--filer-diarrhea").find(".m-card").removeClass("d-none");
        $(".m-card.m-card--tip-view").css("height", "100%");
      }, 1);
    }
  });
});
