$(document).ready(function () {
  $("body").find(".a-rule").addClass("border-rule");
  $(".a-title-accordion").click(function () {
    if ($(this).find(".cmp-title__text").hasClass("active")) {
      $(this).siblings().slideToggle(500);
      $(this).toggleClass("active");
      $(this).find(".cmp-title__text").toggleClass("active");
      if ($(this).find(".cmp-title__text").hasClass("active")) {
        $(this).parent().parent("#accordion-container").addClass("background-color-light-blue");
      } else {
        $(this).parent().parent("#accordion-container").removeClass("background-color-light-blue");
      }
    } else {
      if ($(".cmp-title__text.active").length == 1) {
        $(".cmp-title__text").removeClass("active");
        $(".cmp-container").removeClass("background-color-light-blue");
        $(".a-text-accordion").css("display", "none");
      }
      $(this).siblings().slideToggle(500);
      $(this).toggleClass("active");
      $(this).find(".cmp-title__text").toggleClass("active");
      if ($(this).find(".cmp-title__text").hasClass("active")) {
        $(this).parent().parent("#accordion-container").addClass("background-color-light-blue");
      } else {
        $(this).parent().parent("#accordion-container").removeClass("background-color-light-blue");
      }
    }
  });

  $(".a-text-accordion").click(function () {
    $(this).parent().siblings().slideToggle(500);
    $(this).parent().toggleClass("active");
    $(this).parent().find(".cmp-title__text").toggleClass("active");
    if ($(this).parent().find(".cmp-title__text").hasClass("active")) {
      $(this).parent().parent("#accordion-container").addClass("background-color-light-blue");
    } else {
      $(this).parent().parent("#accordion-container").removeClass("background-color-light-blue");
    }
    $(this).css("display", "none");
  });
});

/* Declaration page accordion */
$(document).ready(function () {
  $(".a-accordion-declaration--container").find(".m-accordion__header").click(function () {
      const item = document.querySelectorAll(".background-color-light-blue");
      item.forEach((element) => {
        element.classList.remove("background-color-light-blue");
      });
      if (!$(this).siblings().hasClass("show")) {
        $(this).parent().addClass("background-color-light-blue");
      }
    });

  $(".a-accordion-declaration--container nav a:nth-child(2)").click(
    function () {
      $(".accordion, .a-text--lighter-gray").css("display", "none");
    }
  );
  $(".a-accordion-declaration--container nav a:nth-child(1)").click(
    function () {
      $(".accordion, .a-text--lighter-gray").css("display", "block");
    }
  );
});
