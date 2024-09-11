/**********************************
Formcontainer
**********************************/

$(document).ready(function () {
  if (isOnPublish()) {
    /* On click of Reset button, all the error messages has to be cleared */
    /* Applying the event on document so that this applies to form inside popup/xf as well */
    $(document).on("click", '.btn[type="reset"]', function () {
      $(this)
        .parents(".formcontainer")
        .find(".validation-error")
        .removeClass("validation-error");
      $(this)
        .parents(".formcontainer")
        .find(".validation-require")
        .removeClass("validation-require");
      $(this)
        .parents(".formcontainer")
        .find(".validation-regex")
        .removeClass("validation-regex");
      /* added for hiding/showing the checkbox - it is written for solving the reset problem - for formcontainer-with-upi container*/
      $(
        ".formcontainer.form-container-registration-with-upi .o-form-container__wrapper .container .o-form-container__element .form-container .options .a-dropdown .a-dropdown__field .a-dropdown-selected"
      ).text("NO");
      $(
        ".formcontainer.form-container-registration-with-upi .o-form-container__wrapper .container .o-form-container__element .form-container .columncontrol .container .columncontrol__column .options .checkbox"
      ).addClass("d-none");
    });
  }

  if ($(".showuserprofile-form").length && isOnPublish()) {
    showOrHideOptions();
    const infoDropdownMenu = $(
      '.showuserprofile-form  .options .a-dropdown .a-dropdown__menu[name="information"] li'
    );

    infoDropdownMenu.on("click", function () {
      setTimeout(() => {
        const value =
          $(this).hasClass("selected") && $(this).attr("data-optionvalue");
        if (value === "YES") {
          showCheckboxOptions();
        } else {
          hideCheckboxOptions();
        }
      }, 200);
    });

    function showOrHideOptions() {
      setTimeout(() => {
        const dropdownMenu = $(
          '.showuserprofile-form  .options .a-dropdown .a-dropdown__menu[name="information"]'
        );
        const infoDropdownValue = dropdownMenu
          .parent()
          .find(".a-dropdown-selected")
          .text()
          .trim();
        if (infoDropdownValue === "YES") {
          showCheckboxOptions();
        } else {
          hideCheckboxOptions();
        }
      }, 1000);
    }

    function showCheckboxOptions() {
      $(
        '.showuserprofile-form .options .checkbox .a-checkbox__input[name="retiree-options"]'
      )
        .parents(".options")
        .removeClass("d-none");
    }

    function hideCheckboxOptions() {
      $(
        '.showuserprofile-form .options .checkbox .a-checkbox__input[name="retiree-options"]'
      )
        .parents(".options")
        .addClass("d-none");
    }
  }

  /* ADDED FOR account-request-form */
  if (
    $(".container--account-request-form .formcontainer").length &&
    isOnPublish()
  ) {
    ARshowOrHideOptions();
    const ARinfoDropdownMenu = $(
      '.container--account-request-form .formcontainer .options .a-dropdown .a-dropdown__menu[name="onlineretireeOptin"] li'
    );

    ARinfoDropdownMenu.on("click", function () {
      setTimeout(() => {
        const value =
          $(this).hasClass("selected") && $(this).attr("data-optionvalue");
        if (value === "YES") {
          ARshowCheckboxOptions();
        } else {
          ARhideCheckboxOptions();
        }
      }, 200);
    });

    function ARshowOrHideOptions() {
      setTimeout(() => {
        const ARdropdownMenu = $(
          '.container--account-request-form .formcontainer .options .a-dropdown .a-dropdown__menu[name="onlineretireeOptin"]'
        );
        const ARinfoDropdownValue = ARdropdownMenu.parent()
          .find(".a-dropdown-selected")
          .text()
          .trim();
        if (ARinfoDropdownValue === "YES") {
          ARshowCheckboxOptions();
        } else {
          ARhideCheckboxOptions();
        }
      }, 500);
    }

    function ARshowCheckboxOptions() {
      $(
        ".container--account-request-form .formcontainer .options .checkbox .a-checkbox__input"
      )
        .parents(".options")
        .removeClass("d-none");
    }

    function ARhideCheckboxOptions() {
      $(
        ".container--account-request-form .formcontainer .options .checkbox .a-checkbox__input"
      )
        .parents(".options")
        .addClass("d-none");
    }
  }

  /* With UPI Registration Form - selection of Yes or No */

  if (
    $(".form-container-registration-with-upi .form-container").length &&
    isOnPublish()
  ) {
    WUPIshowOrHideOptions();
    const WUPIinfoDropdownMenu = $(
      '.form-container-registration-with-upi .form-container .options .a-dropdown .a-dropdown__menu[name="onlineretiree_optin"] li'
    );

    WUPIinfoDropdownMenu.on("click", function () {
      setTimeout(() => {
        const value =
          $(this).hasClass("selected") && $(this).attr("data-optionvalue");
        if (value === "YES") {
          WUPIshowCheckboxOptions();
        } else {
          WUPIhideCheckboxOptions();
        }
      }, 200);
    });

    function WUPIshowOrHideOptions() {
      setTimeout(() => {
        const WUPIdropdownMenu = $(
          '.form-container-registration-with-upi .form-container .options .a-dropdown .a-dropdown__menu[name="onlineretiree_optin"]'
        );
        const WUPIinfoDropdownValue = WUPIdropdownMenu.parent()
          .find(".a-dropdown-selected")
          .text()
          .trim();
        if (WUPIinfoDropdownValue === "YES") {
          WUPIshowCheckboxOptions();
        } else {
          WUPIhideCheckboxOptions();
        }
      }, 500);
    }

    function WUPIshowCheckboxOptions() {
      $(
        ".form-container-registration-with-upi .form-container .options .checkbox .a-checkbox__input"
      )
        .parents(".options")
        .removeClass("d-none");
      /* added for hiding/showing the checkbox - it is written for solving the reset problem - for formcontainer-with-upi container*/
      $(
        ".form-container-registration-with-upi .form-container .options .checkbox"
      ).removeClass("d-none");
    }

    function WUPIhideCheckboxOptions() {
      $(
        ".form-container-registration-with-upi .form-container .options .checkbox .a-checkbox__input"
      )
        .parents(".options")
        .addClass("d-none");
      /* added for hiding/showing the checkbox - it is written for solving the reset problem - for formcontainer-with-upi container*/
      $(
        ".form-container-registration-with-upi .form-container .options .checkbox"
      ).addClass("d-none");
    }
  }
  // With UPI Registration Form
  if ($(".form-container-registration-with-upi").length) {
    $(
      ".form-container-registration-with-upi input.a-input-control[name='firstName']"
    ).val(sessionStorage.getItem("firstName"));
    $(
      ".form-container-registration-with-upi input.a-input-control[name='lastName']"
    ).val(sessionStorage.getItem("lastName"));
    $(
      ".form-container-registration-with-upi input.a-input-control[name='middleName']"
    ).val(sessionStorage.getItem("middleName"));
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
    $(
      ".form-container-registration-with-upi input.a-input-control[name='retireYear']"
    ).val(formatDate(sessionStorage.getItem("retireeRetireDate")));
    $(
      ".form-container-registration-with-upi input.a-input-control[name='yearofservice']"
    ).val(sessionStorage.getItem("serviceInYears"));
  }

  if (
    window.location["href"].includes("activateRetiree/updateUser") &&
    isOnPublish()
  ) {
    if (getUrlParameter("id")) {
      $(".formcontainer input.a-input-control[name='name']").val(
        JSON.parse(sessionStorage.getItem("userUpdate")).name
      );
      $(".formcontainer input.a-input-control[name='email']").val(
        JSON.parse(sessionStorage.getItem("userUpdate")).email
      );
    } else {
      document.location.href = "/manage/activateRetiree.html";
    }
  }
  // Search HR disable button
  $(".form-container-search-retiree button.btn").addClass("disabled");
  $(".form-container-search-retiree .a-input-control").keyup(function () {
    if (
      $(
        ".form-container-search-retiree .a-input-control[name='firstName']"
      ).val() == "" &&
      $(
        ".form-container-search-retiree .a-input-control[name='lastName']"
      ).val() == ""
    ) {
      $(".form-container-search-retiree button.btn").addClass("disabled");
    } else {
      $(".form-container-search-retiree button.btn").removeClass("disabled");
    }
  });
  // Active Retiree Search disable button
  function enableARbutton() {
    if (
      $(
        ".form-container-activate-retiree .a-input-control[name='firstName']"
      ).val() == "" &&
      $(
        ".form-container-activate-retiree .a-input-control[name='lastName']"
      ).val() == "" &&
      $(
        ".form-container-activate-retiree .a-input-control[name='email']"
      ).val() == ""
    ) {
      $(".form-container-activate-retiree button.btn").addClass("disabled");
    } else {
      $(".form-container-activate-retiree button.btn").removeClass("disabled");
    }
  }
  $(".form-container-activate-retiree button.btn").addClass("disabled");
  $(".form-container-activate-retiree .a-input-control").keyup(function () {
    enableARbutton();
  });

  // change for OTP varification form
  if (
    window.location["href"].includes("userSignUpOTPVerificationForm") &&
    isOnPublish()
  ) {
    $("input[name='uid']").val(getUrlParameter("email"));
  }

  // in memory form submittion
  if ($("#in-memory-form").length && isOnPublish()) {
    $("#in-memory-form").parent().hide();
    setTimeout(function () {
      $("#in-memory-form .btn").click();
    }, 100);

    $(".a-dropdown__menu li").click(function () {
      setTimeout(function () {
        $("#in-memory-form .btn").click();
      }, 500);
    });
  }
  // get month in number from name
  function getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2023")).getMonth() + 1;
  }
  // Retirement form submittion
  if ($("#retirementForm").length && isOnPublish()) {
    const date = new Date();
    const current_month = String(date.getMonth() + 1).padStart(2, "0");
    const current_year = date.getFullYear();
    let month = "";
    let year = "";
    if (getUrlParameter("month")) {
      month = getUrlParameter("month");
    } else {
      month = String(date.getMonth() + 1).padStart(2, "0");
    }
    if (getUrlParameter("year")) {
      year = getUrlParameter("year");
    } else {
      year = date.getFullYear();
    }
    $(".month-links li a").each(function () {
      const old_href = $(this).attr("href");
      const new_href = old_href + "&year=" + year;
      $(this).attr("href", new_href);
      if (
        year == current_year &&
        getMonthFromString($(this).text()) > current_month
      ) {
        $(this).addClass("disabled");
        $(this).removeAttr("href");
      }
    });
    $(
      ".link-stack--year-format .m-link-stack__dropdown-wrapper ul li a.a-link__text"
    ).each(function () {
      const old_href = $(this).attr("href");
      const year_selected = $(this).text();
      const new_href = old_href + "?month=01&year=" + year_selected;
      $(this).attr("href", new_href);
    });
    if (getUrlParameter("year")) {
      $(".link-stack--year-format .m-link-stack__link a").html(
        "\n            <em class='abt-icon abt-icon-down-arrow' aria-hidden='true'>\n            </em>         " +
          year +
          "                   "
      );
    }
    $(".anniversary-container h2").text(year + " RETIREMENTS");
    $("#retirementForm").parent().hide();
    setTimeout(function () {
      $("#retirementForm ul.a-dropdown__menu[name='month'] li").removeClass(
        "selected"
      );
      $("#retirementForm ul.a-dropdown__menu[name='month'] li").filter(
        function () {
          if ($(this).data("optionvalue") == month) {
            $(this).addClass("selected");
          }
        }
      );
      $("#retirementForm ul.a-dropdown__menu[name='year'] li").removeClass(
        "selected"
      );
      $("#retirementForm ul.a-dropdown__menu[name='year'] li").filter(
        function () {
          if ($(this).data("optionvalue") == year) {
            $(this).addClass("selected");
          }
        }
      );
      $("#retirementForm .btn").click();
    }, 100);
  }
  // Anniversaries form submittion
  if ($("#anniversariesForm").length && isOnPublish()) {
    const date = new Date();
    const current_month = String(date.getMonth() + 1).padStart(2, "0");
    const current_year = date.getFullYear();
    let month = "";
    let year = "";
    if (getUrlParameter("month")) {
      month = getUrlParameter("month");
    } else {
      month = String(date.getMonth() + 1).padStart(2, "0");
    }
    if (getUrlParameter("year")) {
      year = getUrlParameter("year");
    } else {
      year = date.getFullYear();
    }
    $("#anniversariesForm").parent().hide();
    $(".month-links li a").each(function () {
      const old_href = $(this).attr("href");
      const new_href = old_href + "&year=" + year;
      $(this).attr("href", new_href);
      if (
        year == current_year &&
        getMonthFromString($(this).text()) > current_month
      ) {
        $(this).addClass("disabled");
        $(this).removeAttr("href");
      }
    });
    $(
      ".link-stack--year-format .m-link-stack__dropdown-wrapper ul li a.a-link__text"
    ).each(function () {
      const old_href = $(this).attr("href");
      const year_selected = $(this).text();
      const new_href = old_href + "?month=01&year=" + year_selected;
      $(this).attr("href", new_href);
    });
    if (getUrlParameter("year")) {
      $(".link-stack--year-format .m-link-stack__link a").html(
        "\n            <em class='abt-icon abt-icon-down-arrow' aria-hidden='true'>\n            </em>         " +
          year +
          "                   "
      );
    }
    setTimeout(function () {
      $("#anniversariesForm ul.a-dropdown__menu[name='month'] li").removeClass(
        "selected"
      );
      $("#anniversariesForm ul.a-dropdown__menu[name='month'] li").filter(
        function () {
          if ($(this).data("optionvalue") == month) {
            $(this).addClass("selected");
          }
        }
      );
      $("#anniversariesForm ul.a-dropdown__menu[name='year'] li").removeClass(
        "selected"
      );
      $("#anniversariesForm ul.a-dropdown__menu[name='year'] li").filter(
        function () {
          if ($(this).data("optionvalue") == year) {
            $(this).addClass("selected");
          }
        }
      );
      $("#anniversariesForm .btn").click();
    }, 100);
  }
});

$(window).on("load", function () {
  // Search Blaclist
  if (window.location["href"].includes("manage/blackList") && isOnPublish()) {
    setTimeout(function () {
      $(".blacklist-retiree-search button.btn").click();
    }, 10);
  }

  // Pending photo
  if (window.location["href"].includes("manage/pending-photo") && isOnPublish()) {
    setTimeout(function () {
     $(".pending-photo-search button.btn").click();
    }, 10);
	$('.pending-photo-search').parents('body').find('#example').addClass('pendingPhototable table-responsive');
  }

  //logout
  if (window.location["href"].includes("login/logout") && isOnPublish()) {
    setTimeout(function () {
      $(".blacklist-retiree-search button").click();
    }, 10);
  }
  if (
    window.location["href"].includes("login/showUserLoginForm") &&
    isOnPublish()
  ) {
    $("input").keypress(function (e) {
      if (e.which == 13) {
        $('.formcontainer button[type="submit"]').click();
        return false;
      }
    });
  }
  if (
    window.location["href"].includes("manage/searchRetiree") &&
    isOnPublish()
  ) {
    $("input").keypress(function (e) {
      if (e.which == 13) {
        $('.formcontainer button[type="submit"]').click();
        return false;
      }
    });
  }
  if (
    window.location["href"].includes("manage/activateRetiree") &&
    isOnPublish()
  ) {
    $("input").keypress(function (e) {
      if (e.which == 13) {
        $('.formcontainer button[type="submit"]').click();
        return false;
      }
    });
  }
});
