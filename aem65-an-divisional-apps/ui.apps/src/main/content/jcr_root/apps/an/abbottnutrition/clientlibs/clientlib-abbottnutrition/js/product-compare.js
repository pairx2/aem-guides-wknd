let fNote = [];
let dvArr = [];
window.localStorage.removeItem("DailyValue");
if ($(".productComparePageRun").hasClass("pageRun")) {
  document
    .querySelector('meta[name="viewport"]')
    .setAttribute(
      "content",
      "width=device-width initial-scale=1 shrink-to-fit=no"
    );
  let localStorageVariable = $(".localStorageVar").val();
  let topSectionDiv = $(".row.bottomSection .col-9");
  let bottomSectionDiv = $(".productComparePageRun .col-9");

  topSectionDiv.scroll(function() {
    bottomSectionDiv.scrollLeft($(this).scrollLeft());
  });

  bottomSectionDiv.scroll(function() {
    topSectionDiv.scrollLeft($(this).scrollLeft());
  });

  if ($(window).width() < 767) {
    $(".dynamicTitle .subtitle").each(function(index) {
      let divheight = $(this).innerHeight();
      let divtext = $(this).text();
      $('.subtitle[data-title="' + divtext + '"]').css("height", divheight);
    });
    $(".leftTitleSection .productdata p").css(
      "height",
      $(".topTitle").innerHeight()
    );
    $(".topTitle").css("height", $(".topTitle").innerHeight());
  }

  let cardidarrayCompare = [];
  $(".removeProduct").on("click", function(event) {
    let removeProd = $(this)
      .parent()
      .find(".product")
      .attr("data-top");

    let cardid = $("#" + removeProd)
      .find(".productDataJson")
      .attr("id");
    let pv_dv = JSON.parse(window.localStorage.getItem("DailyValue"));
    let filteredDailyValue = pv_dv.filter(function(value) {
      return value !== cardid;
    });
    window.localStorage.setItem(
      "DailyValue",
      JSON.stringify(filteredDailyValue)
    );

    const itemIndex = cardidarrayCompare.findIndex(index => index.id == cardid);
    cardidarrayCompare.splice(itemIndex, 1);
    localStorage.setItem(
      localStorageVariable,
      JSON.stringify(cardidarrayCompare)
    );

    let link = window.location.href;
    let data = link.split("=");

    let removeValURL = data[1].replace(cardid + ",", "");
    if (
      (cardidarrayCompare.length == 2 && itemIndex == 2) ||
      (cardidarrayCompare.length == 3 && itemIndex == 3)
    ) {
      removeValURL = data[1].replace(cardid + "", "");
      removeValURL = removeValURL.slice(0, -1);
    }

    const state = data[1];
    const title = "";
    const url = data[0] + "=" + removeValURL;
    history.pushState(state, title, url);
    $("#" + removeProd).remove();
    $(this)
      .parent(".col-3")
      .remove();
    ctaDisabledLink();
  });
  ctaDisabledLink();
  function ctaDisabledLink() {
    let minVal = $(".minProduct").attr("dataselect");
    let lengthClass = $(".removeProduct").length;
    if (lengthClass == minVal) {
      $(".removeProduct").addClass("d-none");
    } else {
      $(".removeProduct").removeClass("d-none");
    }
  }
  $(
    ".dynamic-product-compare .product .cmp-product-detail__formulation-dropdown.dropDownCommon"
  ).each(function(i, obj) {
    $(this)
      .find(".a-dropdown__menu li:first-child")
      .addClass("selected");
  });

  $(".dynamic-product-compare .product").each(function(i) {
    let idVal = $(this)
      .find(".defaultselect")
      .attr("dataSelect")
      .replace(/[^\w\s]/gi, "");
    let idValDrop;
    $(
      ".cmp-product-detail__formulation-dropdowns.dropDownCommon ul li",
      this
    ).each(function(index) {
      idValDrop = $(this)
        .attr("id")
        .replace(/[^\w\s]/gi, "");
      if (idVal == idValDrop) {
        $(this).addClass("selected");
      }
    });
    let selectedIDCom = $(this)
      .find(".defaultselect")
      .attr("dataselect");
    let productDataattr = $(this).attr("data-top");
    let productDataCom = $("#" + productDataattr + " .productDataJson").val();
    let actualDataCom = JSON.parse(productDataCom);
    let checkData = actualDataCom[0].UsageReferences;
    //Add reference call to add reference under learnmore button
    addReferences(checkData, productDataattr);
    $(this)
      .find(".cmp-product-detail__formulation-dropdown")
      .find(".a-dropdown__menu")
      .empty();
    let liLength = actualDataCom[0].ServingSize.length;
    if (liLength > 0) {
      for (let k = 0; k < liLength; k++) {
        if (actualDataCom[0].ServingSize[k].aCode == selectedIDCom) {
          $(this)
            .find(".cmp-product-detail__formulation-dropdown .a-dropdown__menu")
            .append(
              "<li role='presentation' class='o-content-section__list-item' data-id='" +
                actualDataCom[0].ServingSize[k].id +
                "'><a href='#' class='o-content-section__list-item-link'>" +
                actualDataCom[0].ServingSize[k].ServingSizeName +
                "</a></li>"
            );
        }
      }
    } else {
      $(this)
        .find(".cmp-product-detail__formulation-dropdown .a-dropdown__menu")
        .append(
          "<li role='presentation' class='o-content-section__list-item' >NA Not Applicable</li>"
        );
    }
    $(this)
      .find(
        ".cmp-product-detail__formulation-dropdown .a-dropdown__menu .o-content-section__list-item"
      )
      .removeClass("selected");
    $(this)
      .find(
        ".cmp-product-detail__formulation-dropdown .a-dropdown__menu .o-content-section__list-item"
      )
      .eq(0)
      .addClass("selected");
    $(this)
      .find(".cmp-product-detail__formulation-dropdown .a-dropdown-selected")
      .text(
        $(this)
          .find(
            ".cmp-product-detail__formulation-dropdown .a-dropdown__menu .o-content-section__list-item"
          )
          .eq(0)
          .find("a")
          .text()
      );
  });
  $(".dynamic-product-compare .product").each(function(i) {
    let formulationIndexCompare = $(this)
      .find(".cmp-product-detail__serving-dropdown li.selected")
      .index();
    if (formulationIndexCompare === -1) {
      formulationIndexCompare = 0;
    }
    $(this)
      .find(".productImg img")
      .addClass("d-none");
    $(this)
      .find(".productImg img")
      .eq(formulationIndexCompare)
      .removeClass("d-none");
  });

  $(".cmp-product-detail__servingSize-dropdown .a-dropdown").on(
    "click",
    function(event) {
      let dynamicHeight = $(this)
        .find("ul.a-dropdown__menu")
        .height();
      if ($(window).width() <= 1024) {
        if (
          $(this)
            .find(".a-dropdown__field")
            .hasClass("active")
        ) {
          $(this)
            .parents(".topSection")
            .find(".col-9")
            .removeClass("dynamicHeight");
          $(this)
            .parents(".topSection")
            .find(".col-9")
            .css("padding-bottom", "0");
        } else {
          $(this)
            .parents(".topSection")
            .find(".col-9")
            .addClass("dynamicHeight");
          $(this)
            .parents(".topSection")
            .find(".col-9")
            .css("padding-bottom", dynamicHeight);
        }
      }
    }
  );
  $(".cmp-product-detail__serving-dropdown .a-dropdown").on("click", function(
    event
  ) {
    let dynamicHeight = $(this)
      .find("ul.a-dropdown__menu")
      .height();

    if ($(window).width() <= 1024) {
      if (
        $(this)
          .find(".a-dropdown__field")
          .hasClass("active")
      ) {
        $(this)
          .parents(".topSection")
          .find(".col-9")
          .removeClass("dynamicHeight");
        $(this)
          .parents(".topSection")
          .find(".col-9")
          .css("padding-bottom", "0");
      } else {
        $(this)
          .parents(".topSection")
          .find(".col-9")
          .addClass("dynamicHeight");
        $(this)
          .parents(".topSection")
          .find(".col-9")
          .css("padding-bottom", dynamicHeight - 50);
      }
    }
  });

  let appendServingSize = function(liLength,actualDataCom,selectedIDCom){
    if (liLength > 0) {
      for (let row = 0; row < liLength; row++) {
        if (actualDataCom[0].ServingSize[row].aCode == selectedIDCom) {
          $(this)
            .parents(".cmp-product-detail__formulation-dropdowns")
            .siblings(".cmp-product-detail__formulation-dropdown")
            .find(".a-dropdown__menu")
            .append(
              "<li role='presentation' class='o-content-section__list-item' data-id='" +
                actualDataCom[0].ServingSize[row].id +
                "'><a href='#' class='o-content-section__list-item-link'>" +
                actualDataCom[0].ServingSize[row].ServingSizeName +
                "</a></li>"
            );
        }
      }
    } else {
      $(this)
        .find(".cmp-product-detail__formulation-dropdown .a-dropdown__menu")
        .append(
          "<li role='presentation' class='o-content-section__list-item' >NA Not Applicable</li>"
        );
    }
  }
  $(
    ".dynamic-product-compare .cmp-product-detail__serving-dropdown .a-dropdown"
  ).on("change", function(event) {
    let selectedIDCom = $(this)
      .find("li.selected")
      .attr("id");
    let productDataattr = $(this)
      .parents(".product")
      .attr("data-top");
    let productDataCom = $("#" + productDataattr + " .productDataJson").val();
    let actualDataCom = JSON.parse(productDataCom);
    $(this)
      .parents(".cmp-product-detail__formulation-dropdowns")
      .siblings(".cmp-product-detail__formulation-dropdown")
      .find(".a-dropdown__menu")
      .empty();
    let liLength = actualDataCom[0].ServingSize.length;

    appendServingSize.call(this,liLength,actualDataCom,selectedIDCom);

    $(this)
      .parents(".cmp-product-detail__formulation-dropdowns")
      .siblings(".cmp-product-detail__formulation-dropdown")
      .find(".a-dropdown__menu .o-content-section__list-item")
      .removeClass("selected");
    $(this)
      .parents(".cmp-product-detail__formulation-dropdowns")
      .siblings(".cmp-product-detail__formulation-dropdown")
      .find(".a-dropdown__menu .o-content-section__list-item")
      .eq(0)
      .addClass("selected");
    if (liLength > 0) {
      $(this)
        .parents(".cmp-product-detail__formulation-dropdowns")
        .siblings(".cmp-product-detail__formulation-dropdown")
        .find(".a-dropdown-selected")
        .text(
          $(this)
            .parents(".cmp-product-detail__formulation-dropdowns")
            .siblings(".cmp-product-detail__formulation-dropdown")
            .find(".a-dropdown__menu .o-content-section__list-item")
            .eq(0)
            .find("a")
            .text()
        );
    } else {
      $(this)
        .find(".cmp-product-detail__formulation-dropdown .a-dropdown__menu")
        .append(
          "<li role='presentation' class='o-content-section__list-item' >NA Not Applicable</li>"
        );
    }

    let formulationIndexCompare = $(this)
      .find("li.selected")
      .index();
    if (formulationIndexCompare === -1) {
      formulationIndexCompare = 0;
    }
    $(this)
      .parents(".product")
      .find(".productImg img")
      .addClass("d-none");
    $(this)
      .parents(".product")
      .find(".productImg img")
      .eq(formulationIndexCompare)
      .removeClass("d-none");

    let selectedsecondDropOnChange = $(this)
      .parents(".cmp-product-detail__formulation-dropdowns")
      .siblings(".cmp-product-detail__formulation-dropdown")
      .find(".a-dropdown__menu li.selected")
      .attr("data-id");
    let selectedfirstDropOnChange = $(this)
      .find("li.selected")
      .attr("id");

    let checkData = actualDataCom[0].ServingSize;
    $(checkData).each(function(index) {
      if (
        selectedsecondDropOnChange == checkData[index].id &&
        selectedfirstDropOnChange == checkData[index].aCode
      ) {
        $(checkData[index].NutritionalInfoData).each(function(item) {
          $("#" + productDataattr + " .nutrientValues .serving .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoData[item].NutritionName +
                '"] .nutritionValue'
            )
            .html(checkData[index].NutritionalInfoData[item].NutritionValue);
          $("#" + productDataattr + " .nutrientValues .perDiv .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoData[item].NutritionName +
                '"] .percentDV'
            )
            .html(checkData[index].NutritionalInfoData[item].PercentDV);
        });

        $(checkData[index].NutritionalInfoMinerals).each(function(item) {
          $("#" + productDataattr + " .mineralValues .serving .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoMinerals[item].NutritionName +
                '"] .nutritionValue'
            )
            .html(
              checkData[index].NutritionalInfoMinerals[item].NutritionValue
            );
          $("#" + productDataattr + " .mineralValues .perDiv .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoMinerals[item].NutritionName +
                '"] .percentDV'
            )
            .html(checkData[index].NutritionalInfoMinerals[item].PercentDV);
        });

        $(checkData[index].NutritionalInfoVitamins).each(function(item) {
          $("#" + productDataattr + " .vitaminValues .serving .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoVitamins[item].NutritionName +
                '"] .nutritionValue'
            )
            .html(
              checkData[index].NutritionalInfoVitamins[item].NutritionValue
            );
          $("#" + productDataattr + " .vitaminValues .perDiv .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoVitamins[item].NutritionName +
                '"] .percentDV'
            )
            .html(checkData[index].NutritionalInfoVitamins[item].PercentDV);
        });
      }
    });
    addDisclaimer(checkData, productDataattr);
    addFootnotesToPage(productDataattr);
  });
  $(
    ".dynamic-product-compare .cmp-product-detail__servingSize-dropdown .a-dropdown"
  ).on("change", function(event) {
    let productDataattr = $(this)
      .parents(".product")
      .attr("data-top");
    let productDataCom = $("#" + productDataattr + " .productDataJson").val();
    let actualDataCom = JSON.parse(productDataCom);

    let selectedfirstDropOnChange = $(this)
      .parents(".cmp-product-detail__formulation-dropdown")
      .siblings(".cmp-product-detail__formulation-dropdowns")
      .find(".a-dropdown__menu li.selected")
      .attr("id");
    let selectedsecondDropOnChange = $(this)
      .find("li.selected")
      .attr("data-id");

    let checkData = actualDataCom[0].ServingSize;
    $(checkData).each(function(index) {
      if (
        selectedsecondDropOnChange == checkData[index].id &&
        selectedfirstDropOnChange == checkData[index].aCode
      ) {
        $(checkData[index].NutritionalInfoData).each(function(item) {
          $("#" + productDataattr + " .nutrientValues .serving .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoData[item].NutritionName +
                '"] .nutritionValue'
            )
            .html(checkData[index].NutritionalInfoData[item].NutritionValue);
          $("#" + productDataattr + " .nutrientValues .perDiv .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoData[item].NutritionName +
                '"] .percentDV'
            )
            .html(checkData[index].NutritionalInfoData[item].PercentDV);
        });

        $(checkData[index].NutritionalInfoMinerals).each(function(item) {
          $("#" + productDataattr + " .mineralValues .serving .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoMinerals[item].NutritionName +
                '"] .nutritionValue'
            )
            .html(
              checkData[index].NutritionalInfoMinerals[item].NutritionValue
            );
          $("#" + productDataattr + " .mineralValues .perDiv .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoMinerals[item].NutritionName +
                '"] .percentDV'
            )
            .html(checkData[index].NutritionalInfoMinerals[item].PercentDV);
        });

        $(checkData[index].NutritionalInfoVitamins).each(function(item) {
          $("#" + productDataattr + " .vitaminValues .serving .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoVitamins[item].NutritionName +
                '"] .nutritionValue'
            )
            .html(
              checkData[index].NutritionalInfoVitamins[item].NutritionValue
            );
          $("#" + productDataattr + " .vitaminValues .perDiv .dynamicData")
            .find(
              '.subtitle[data-title="' +
                checkData[index].NutritionalInfoVitamins[item].NutritionName +
                '"] .percentDV'
            )
            .html(checkData[index].NutritionalInfoVitamins[item].PercentDV);
        });
      }
    });
    addDisclaimer(checkData, productDataattr);
    addFootnotesToPage(productDataattr);
  });

  let selectedfirstDrop = [];
  let selectedsecondDrop = [];
  $(".dynamic-product-compare .topSection .col-3").each(function(i) {
    selectedfirstDrop.unshift(
      $(this)
        .find(".cmp-product-detail__serving-dropdown li.selected")
        .attr("id")
    );
    selectedsecondDrop.unshift(
      $(this)
        .find(".cmp-product-detail__servingSize-dropdown li.selected")
        .attr("data-id")
    );
  });

  masterTitle();

  function addPercentDV(value,pv){
    if (
      value !== ""
    ) {
      pv.push(value);
    }
  }

  function addData(checkData,index,productCompareID,pv){
    let arrayLengthFirst = selectedfirstDrop.length;
    for (let row = 0; row < arrayLengthFirst; row++) {
      let arrayLengthSecond = selectedsecondDrop.length;
      for (let j = 0; j < arrayLengthSecond; j++) {
        if (
          selectedsecondDrop[row] == checkData[index].id &&
          selectedfirstDrop[j] == checkData[index].aCode
        ) {
          $(checkData[index].NutritionalInfoData).each(function(item) {
            $(
              "#" +
                productCompareID +
                " .nutrientValues .serving .dynamicData"
            )
              .find(
                '.subtitle[data-title="' +
                  checkData[index].NutritionalInfoData[item].NutritionName +
                  '"] .nutritionValue'
              )
              .html(
                checkData[index].NutritionalInfoData[item].NutritionValue
              );
            $(
              "#" +
                productCompareID +
                " .nutrientValues .perDiv .dynamicData"
            )
              .find(
                '.subtitle[data-title="' +
                  checkData[index].NutritionalInfoData[item].NutritionName +
                  '"] .percentDV'
              )
              .html(checkData[index].NutritionalInfoData[item].PercentDV);
              let value = checkData[index].NutritionalInfoData[item].PercentDV;
              addPercentDV(value,pv);
            
          });

          $(checkData[index].NutritionalInfoMinerals).each(function(item) {
            $(
              "#" +
                productCompareID +
                " .mineralValues .serving .dynamicData"
            )
              .find(
                '.subtitle[data-title="' +
                  checkData[index].NutritionalInfoMinerals[item]
                    .NutritionName +
                  '"] .nutritionValue'
              )
              .html(
                checkData[index].NutritionalInfoMinerals[item]
                  .NutritionValue
              );
            $(
              "#" +
                productCompareID +
                " .mineralValues .perDiv .dynamicData"
            )
              .find(
                '.subtitle[data-title="' +
                  checkData[index].NutritionalInfoMinerals[item]
                    .NutritionName +
                  '"] .percentDV'
              )
              .html(
                checkData[index].NutritionalInfoMinerals[item].PercentDV
              );
              let value = checkData[index].NutritionalInfoMinerals[item].PercentDV;
              addPercentDV(value,pv);
          });

          $(checkData[index].NutritionalInfoVitamins).each(function(item) {
            $(
              "#" +
                productCompareID +
                " .vitaminValues .serving .dynamicData"
            )
              .find(
                '.subtitle[data-title="' +
                  checkData[index].NutritionalInfoVitamins[item]
                    .NutritionName +
                  '"] .nutritionValue'
              )
              .html(
                checkData[index].NutritionalInfoVitamins[item]
                  .NutritionValue
              );
            $(
              "#" +
                productCompareID +
                " .vitaminValues .perDiv .dynamicData"
            )
              .find(
                '.subtitle[data-title="' +
                  checkData[index].NutritionalInfoVitamins[item]
                    .NutritionName +
                  '"] .percentDV'
              )
              .html(
                checkData[index].NutritionalInfoVitamins[item].PercentDV
              );
              let value = checkData[index].NutritionalInfoVitamins[item].PercentDV;
              addPercentDV(value,pv);
          });
        }
      }
    }
  }
  function masterTitle() {
    let productCompareData = $(".rightSection")
      .find(".productDataJson")
      .val();
    let productCompareID = $(this).attr("id");
    let newdata = $.parseJSON(productCompareData);

    let NewDataNutri = newdata[0].MasterNutrientData;
    for (let key in NewDataNutri) {
      $(".nutritionTitle .dynamicTitle").append(
        '<p class="subtitle">' + key + "</p>"
      );
      $(".nutrientValues .serving .dynamicData").append(
        '<p class="subtitle" data-title="' +
          key +
          '"><span class="nutritionValue"></span></p>'
      );
      $(".nutrientValues .perDiv .dynamicData").append(
        '<p class="subtitle" data-title="' +
          key +
          '"><span class="percentDV"></span></p>'
      );
    }
    let newDataVit = newdata[0].MasterVitamins;
    for (let key in newDataVit) {
      $(".vitaminTitle .dynamicTitle").append(
        '<p class="subtitle">' + key + "</p>"
      );
      $(".vitaminValues .serving .dynamicData").append(
        '<p class="subtitle" data-title="' +
          key +
          '"><span class="nutritionValue"></span></p>'
      );
      $(".vitaminValues .perDiv .dynamicData").append(
        '<p class="subtitle" data-title="' +
          key +
          '"><span class="percentDV"></span></p>'
      );
    }
    let newDataMin = newdata[0].MasterMinerals;
    for (let key in newDataMin) {
      $(".mineralTitle .dynamicTitle").append(
        '<p class="subtitle">' + key + "</p>"
      );
      $(".mineralValues .serving .dynamicData").append(
        '<p class="subtitle" data-title="' +
          key +
          '"><span class="nutritionValue"></span></p>'
      );
      $(".mineralValues .perDiv .dynamicData").append(
        '<p class="subtitle" data-title="' +
          key +
          '"><span class="percentDV"></span></p>'
      );
    }

    $(".dynamic-product-compare .mainData .col-3").each(function(i) {
      let pv = [];
      let cardid = $(this)
        .find(".productDataJson")
        .attr("id");
      cardidarrayCompare.push({ id: cardid });
      localStorage.setItem(
        localStorageVariable,
        JSON.stringify(cardidarrayCompare)
      );

      productCompareData = $(this)
        .find(".productDataJson")
        .val();
      productCompareID = $(this).attr("id");
      newdata = $.parseJSON(productCompareData);
      let checkData = newdata[0].ServingSize;
      checkData.reverse();
      $(checkData).each(function(index) {
        addData(checkData,index,productCompareID,pv);
      });
      if (pv.length > 0) {
        dvArr.push(cardid);
        $("#product_" + cardid + " .topTitle span.dv_asterisk").show();
      }
      addDisclaimer(checkData, productCompareID);
      addFootnotesToPage(productCompareID);
    });
    window.localStorage.setItem("DailyValue", JSON.stringify(dvArr));
  }

  if ($(window).width() <= 1024) {
    $(".dynamicTitle .subtitle").each(function(index) {
      let divheight = $(this).outerHeight();
      let divtext = $(this).text();
      $('.subtitle[data-title="' + divtext + '"]').css("height", divheight);
    });
    $(".leftTitleSection .productdata p").css(
      "height",
      $(".topTitle").outerHeight()
    );
    $(".topTitle").css("height", $(".topTitle").outerHeight());
  }
}
let productcount = $(".topSection").find(".removeProduct").length;
if (productcount <= 2) {
  $(".topSection")
    .find(".removeProduct")
    .addClass("d-none");
}

/**
 * @method
 * @desc add reference for product under learnmore button
 * @param referncearray and product section table id
 */
function addReferences(usageArray, prodSecId) {
  if (usageArray.length > 0) {
    usageArray.forEach(function(usage) {
      const dText = document.createElement("p");
      const node = document.createTextNode(usage.ReferenceText);
      const dTextSup = document.createElement("sup");
      let nodeSup = retriveSymbol(usage.ReferenceSymbol);
      dTextSup.appendChild(nodeSup);
      dText.appendChild(dTextSup);
      dText.appendChild(node);
      dText.classList.add("referenceText");
      $("#" + prodSecId).append(dText);
    });
  }
}

/**
 * @method
 * @desc Push value to the footnotes array which has DV value and * present in footnotes
 */
function addDisclaimer(servArray, productCompareIDN) {
  let footnote = [];
  let dId = $("div").find("[data-top='" + productCompareIDN + "']");
  let aCode_selected = $(dId)
    .find(".cmp-product-detail__serving-dropdown")
    .find("li.selected")
    .attr("id");
  let serving_selected = $(dId)
    .find(".cmp-product-detail__servingSize-dropdown")
    .find("li.selected")
    .attr("data-id");
  servArray.forEach(function(serv) {
    if (
      serv.aCode === aCode_selected &&
      serv.Footnotes.length > 0 &&
      serv.id === serving_selected
    ) {
      for (const element of serv.Footnotes) {
        let textSmbl = element.FootnoteSymbol.replace(
          /<\/?[^>]+(>|$)/g,
          ""
        );
        let textSmblTxt = $("<textarea />")
          .html(textSmbl)
          .text();
        if (textSmblTxt.length > 0) {
          footnote.push(textSmblTxt + element.FootnoteValue);
        }
      }
    }
  });

  if (footnote.length > 0) {
    footnote.forEach(function(footNt) {
      fNote.push(footNt);
    });
  }
}

/**
 * @method
 * @desc add * footnotes of products that has DV value
 * @param serving array
 */
function addFootnotesToPage(productCompareIDstr) {
  $("#" + productCompareIDstr + " .footnoteDiv").remove();
  const dTextDiv = document.createElement("div");
  dTextDiv.classList.add("footnoteDiv");
  let foNote = fNote.filter((c, index) => {
    return fNote.indexOf(c) === index;
  });
  foNote.forEach(function(uniq) {
    const dTextFoot = document.createElement("p");
    const nodeFoot = document.createTextNode(uniq);
    dTextFoot.appendChild(nodeFoot);
    dTextFoot.classList.add("footnoteText");
    dTextDiv.appendChild(dTextFoot);
  });
  $("#" + productCompareIDstr).append(dTextDiv);
  fNote = [];
  $(".footnoteText")
    .eq(0)
    .addClass("mt-4");
}

/**
 * @method
 * @desc Apply superscript symbol to footnotes
 */
function retriveSymbol(sParam) {
  let temporalDivElement = document.createElement("div");
  temporalDivElement.innerHTML = sParam;
  let symbol =
    temporalDivElement.textContent || temporalDivElement.innerText || "";
  const nodeSup = document.createTextNode(symbol);
  return nodeSup;
}
$(window).bind('scroll', function() {
  if ($(window).width() > 767 && $('.productdata').length > 0){
      let hT = $('.productdata').offset().top - 200,
      hH = $('.productdata').outerHeight(),
      wS = $(this).scrollTop();
  if (wS > (hT+hH)){
           $('.topSection').addClass('sticky-top pro-com');
           $('.topSection .description, .cmp-product-detail__formulation-dropdowns, .cmp-product-detail__formulation-dropdown').addClass('d-none');
 }else{
            $('.topSection').removeClass('sticky-top pro-com');
            $('.topSection .description, .cmp-product-detail__formulation-dropdowns, .cmp-product-detail__formulation-dropdown').removeClass('d-none');
                        }
  }
});
//for share product comparison chart link on mail
$("#share-chart").on('click',function(){
  let mailsub = $("#mailsub").val();
  let mailbody = $("#mailbody").val();
  window.location.href = "mailto:?subject="+mailsub+"&body="+mailbody+"%0D%0A"+window.location.href+"";
});