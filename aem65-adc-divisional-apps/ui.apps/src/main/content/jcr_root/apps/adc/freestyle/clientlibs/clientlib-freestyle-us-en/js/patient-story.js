let isCta_31a,
  isCta_31b,
  isCta_32b = false;

const offset = "0";
const limit = "8";
const ageRange = "0";
const product = "0";
const storyType = "0";
const storyTopic = "0";

let offset1 = "0";
let limit1 = limit;
let filterJson;

let stories = [];
let storyId;
let allStories;
let maxLength = 1500;
const screenWidth = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
let gridElements,
  grid_11,
  grid_12,
  grid_13,
  grid_14a,
  grid_21,
  grid_22,
  grid_23,
  cta1_14b,
  cta_31a,
  cta_31b,
  cta_31c,
  cta_32a,
  cta_32b,
  cta_31a_quote,
  cta_31b_quote,
  cta_31c_quote,
  cta_32a_quote,
  cta_32b_quote,
  cta_31a_text,
  cta_31b_text,
  cta_31c_text,
  cta_32a_text,
  cta_32b_text,
  cta1_14b_link,
  cta_31a_link,
  cta_31b_link,
  cta_31c_link,
  cta_32a_link,
  cta_32b_link;
let headerObject = {};
$(function () {
  const wcmEdit = $("#wcmMode").val();
  $("body").addClass("wcmEnabled");
  if (wcmEdit == "true") {
    return;
  }

  headerObject = {
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "x-application-id": getHiddenVarValue("x-application-id"),
    "x-country-code": getHiddenVarValue("x-country-code"),
    "x-preferred-language": getHiddenVarValue("x-preferred-language")?.split(
      "_"
    )[0],
  };

  grid_11 = $("#grid_11").val();
  grid_12 = $("#grid_12").val();
  grid_13 = $("#grid_13").val();
  grid_14a = $("#grid_14a").val();
  grid_21 = $("#grid_21").val();
  grid_22 = $("#grid_22").val();
  grid_23 = $("#grid_23").val();

  cta1_14b = $("#cta1_14b").val();
  cta_31a = $("#cta_31a").val();
  cta_31b = $("#cta_31b").val();
  cta_31c = $("#cta_31c").val();
  cta_32a = $("#cta_32a").val();
  cta_32b = $("#cta_32b").val();

  cta_31a_quote = $("#cta_31a_quote").val();
  cta_31b_quote = $("#cta_31b_quote").val();
  cta_31c_quote = $("#cta_31c_quote").val();
  cta_32a_quote = $("#cta_32a_quote").val();
  cta_32b_quote = $("#cta_32b_quote").val();

  cta_31a_text = $("#cta_31a_text").val();
  cta_31b_text = $("#cta_31b_text").val();
  cta_31c_text = $("#cta_31c_text").val();
  cta_32a_text = $("#cta_32a_text").val();
  cta_32b_text = $("#cta_32b_text").val();

  cta1_14b_link = $("#cta1_14b_link").val();
  cta_31a_link = $("#cta_31a_link").val();
  cta_31b_link = $("#cta_31b_link").val();
  cta_31c_link = $("#cta_31c_link").val();
  cta_32a_link = $("#cta_32a_link").val();
  cta_32b_link = $("#cta_32b_link").val();
  // Patient stories video component
  psYTVideoResize();

  gridElements = document.querySelectorAll(".grid");

  filterStoryGride();

  showMoreClick();
  // check if story grid component
  // Ajax call to get the grid filter data from gridAPI
  const stGrid = document.querySelector(".storygrid");
  if (document.querySelector(".sharestoryform") || stGrid) {
    filterStory();
  }

  if (stGrid) {
    /**
     * Check if we have grid elements.
     */
    if (0 === gridElements.length) {
      return;
    }

    window.addEventListener("resize", function () {
      masonryGrid();
    });
    getGridLayout(offset, limit, ageRange, product, storyType, storyTopic);
  }

  $(document).on("click", ".stories-grid .story-container", function () {
    $("#fullStory").addClass("loading");
    storyId = $(this).attr("data-story-id");
    checkNextButton(storyId);
    checkPrevButton(storyId);
    getStoryData(storyId);
  });

  $("#fullStory .story-nav.prev-btn").on("click", function () {
    $("#fullStory").addClass("loading");
    const storyIndex = stories.indexOf(parseInt(storyId));
    storyId = stories[storyIndex - 1];
    checkNextButton(storyId);
    checkPrevButton(storyId);
    getStoryData(storyId);
  });

  $("#fullStory .story-nav.next-btn").on("click", function () {
    $("#fullStory").addClass("loading");
    const storyIndex = stories.indexOf(parseInt(storyId));
    storyId = stories[storyIndex + 1];
    checkNextButton(storyId);
    checkPrevButton(storyId);
    getStoryData(storyId);
  });
  patientText();
  $("#share_story_btn, #share_story_banner_btn")
    .closest(".a-button")
    .click(function () {
      $("#share_your_story_container").show();
    });
  $("#patienttext")
    .closest(".a-form-grp")
    .find(".a-input-field--text-error")
    .removeClass("a-input-field--text-error")
    .addClass("a-input-field--text-require");
  window.onload = function () {
    document
      .querySelectorAll("[data-type='tooltip-popup']")
      .forEach(function (ele) {
        const modalDialog = ele.closest(".modal-dialog");
        modalDialog.classList.add("tooltip-popup");
        modalDialog
          .querySelector(".generic-modal__text")
          .classList.add("bgYellow");
        const modalDialogSize = ele.getAttribute("data-type-size");
        modalDialog.classList.add(modalDialogSize);
      });
  };
});
function showMoreClick() {
  $(".show-more-stories a").on("click", function () {
    offset1 = parseInt(offset1) + 8;
    const ageRange1 = getEmlVal("#grid_age", "#grid_age");
    const product1 = getEmlVal("#grid_product", "#grid_product");
    const storyType1 = getEmlVal("#grid_story_type", "#grid_story_type");
    const storyTopic1 = getEmlVal("#grid_story_topic", "#grid_story_topic");

    getGridLayout(
      offset1,
      limit1,
      ageRange1,
      product1,
      storyType1,
      storyTopic1
    );
    $(this).addClass("loading");
  });
}
function getEmlVal(emlID, sendID, defaultValue) {
  let result = $(emlID).val() ? $(sendID).val() : defaultValue || "0";
  return result;
}

function filterStoryGride() {
  $("#grid_story_type, #grid_story_topic, #grid_product ,#grid_age").on(
    "change",
    function (e) {
      const updatedDropdownID = $(this).attr("id");
      const selectedDropdownValue = $(this).val();
      let resultFilter = [];

      $("#story_grid").empty();
      stories = []; //reset stories array to empty
      offset1 = 0;

      const ageRange1 = getEmlVal("#grid_age", "#grid_age");
      const product1 = getEmlVal("#grid_product", "#grid_product");
      const storyType1 = getEmlVal("#grid_story_type", "#grid_story_type");
      const storyTopic1 = getEmlVal("#grid_story_topic", "#grid_story_topic");

      if (filterJson) {
        resultFilter = filterJson?.reduce((acc, item, i) => {
          acc.push({
            type: item.referenceType,
            value: item.codeValueList.map((key) => key.key),
          });
          return acc;
        }, []);
        const filterId = selectedType(updatedDropdownID);
        let resultsID = false;
        if (filterId) {
          resultsID = resultFilter.findIndex((item) => item.type === filterId);
        }
        if (resultsID || resultsID != -1) {
          const resultValue = resultFilter[resultsID].value.includes(
            selectedDropdownValue
          );
          if (resultValue) {
            getGridLayout(
              offset1,
              limit1,
              ageRange1,
              product1,
              storyType1,
              storyTopic1
            );
          }
        }
      }
    }
  );
}

function patientText() {
  let patienttext = document.getElementById("patienttext");
  if (patienttext) {
    patienttext.maxLength = maxLength;
    patienttext.onkeyup = function () {
      return countChars(patienttext);
    };
  }
  if (window.location.pathname.includes("patient-stories.html")) {
    $("body").addClass("patient_stories_page");
    makePhotoMandatory();
  }
}
const splitArrayIntoChunks = (array, chunkSizes) => {
  const chunks = [];
  let currentIndex = 0;
  if (array.length == 0) {
    return chunks;
  }
  for (const value of chunkSizes) {
    const chunkSize = value;
    const chunk = array.slice(currentIndex, currentIndex + chunkSize);
    chunks.push(chunk);
    currentIndex += chunkSize;
  }

  return chunks;
};

function filterStory() {
  const dropdownApi = $("#dropdownapi").val();
  let options = {
    method: "GET",
    mode: "cors",
    headers: headerObject,
  };
  fetch(dropdownApi, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      filterJson = data.response;
      let gridResponse = data.response;
      gridResponse.map(function (grid) {
        switch (grid.referenceType) {
          case "testimonial_states":
            generateDropdown("state", grid.codeValueList);
            break;
          case "testimonial_story_types":
            generateDropdown("story_type", grid.codeValueList);
            break;
          case "testimonial_story_topics":
            generateDropdown("story_topic", grid.codeValueList);
            break;
          case "testimonial_products":
            generateDropdown("product", grid.codeValueList);
            break;
          case "testimonial_age_ranges":
            generateDropdown("age", grid.codeValueList);
            break;
          default:
            break;
        }
      });
    });
}

function alineGrid(stories) {
  let left = 0,
    top = 0;
  stories.forEach((story, index) => {
    $(story).css({ position: "absolute", left: 0, top: 0 });
    if ((index + 1) % 2 === 0) {
      $(story).css({ left: $(".grid-01").width() + "px" });
    }
    if (index > 1) {
      if (index % 2 === 0) {
        top += $(stories[index - 2]).height();
      } else {
        left += $(stories[index - 2]).height();
      }
      $(story).css({ top: left + "px" });
    }
  });
}

function masonryGrid() {
  if (screenWidth >= 1920) {
    gridElements.forEach((grid) => {
      const stories = grid.querySelectorAll(".stories-grid");
      alineGrid(stories);
      const lastStory = $(".stories-grid:last-child");
      const lastStoryPosition = lastStory.position().top + lastStory.height();
      $("#story_grid").css({
        position: "relative",
        height: lastStoryPosition + "px",
      });
    });
  } else if (screenWidth < 1920) {
    gridElements.forEach((grid, index) => {
      const stories = grid.querySelectorAll(".stories-grid");
      stories.forEach((story) => $(story).removeAttr("style"));
      if (index == gridElements.length - 1) {
        matchGridHeight();
      }
    });
  }
}

function matchGridHeight() {
  const storyGridSizeXWidth = $(".stories-grid-container .grid-size-x").width();
  const storyGridSize2XHeight = 2 * storyGridSizeXWidth + 6;

  $(".stories-grid-container .grid-size-x").each(function () {
    $(this).height(storyGridSizeXWidth);
  });

  $(".stories-grid-container .grid-size-2x").each(function () {
    $(this).height(storyGridSize2XHeight);
  });

  if (screenWidth < 576) {
    $(".stories-grid-container .grid-size-xy").each(function () {
      $(this).height(storyGridSize2XHeight);
    });
  }
}

function generateDropdown(option, data) {
  $("#select_" + option + "-options .a-dropdown__field").append(
    '	<ul class="a-dropdown__menu" id=\'form_' + option + "'>"
  );
  $.each(data, function (index, val) {
    $("#form_" + option).append(
      "<li data-optionvalue=" +
        val.key +
        '> <span><em class="a-dropdown__icon "></em></span><span>' +
        val.value +
        "</span></li>"
    );
    if (option != "state") {
      $("#grid_" + option).append(
        "<option value=" + val.key + ">" + val.value + "</option>"
      );
    }
  });
  $("#select_" + option + "-options .a-dropdown__field").append("</ul>");
}

function getImage(dataImage, authorImage) {
  return dataImage ? dataImage : authorImage;
}

function getCTAImage(isUsed, variant1, variant2) {
  return isUsed ? variant1 : variant2;
}

function getCTAData(isUsed, variant1, variant2) {
  return isUsed ? variant1 : variant2;
}
function selectedType(updatedDropdownID) {
  let isSelected = false;
  switch (updatedDropdownID) {
    case "grid_story_type":
      isSelected = "testimonial_story_types";
      break;
    case "grid_story_topic":
      isSelected = "testimonial_story_topics";
      break;
    case "grid_product":
      isSelected = "testimonial_products";
      break;
    case "grid_age":
      isSelected = "testimonial_age_ranges";
      break;

    default:
      break;
  }
  return isSelected;
}

function getGridLayout(
  offsetVal,
  limitVal,
  ageRangeVal,
  productVal,
  storyTypeVal,
  storyTopicVal
) {
  //fetch getStories API
  const storyGridAPI = $("#eforms-api").val();
  const data =
    storyGridAPI +
    "?" +
    "offset=" +
    offsetVal +
    "&limit=" +
    limitVal +
    "&ageRangeId=" +
    ageRangeVal +
    "&productId=" +
    productVal +
    "&storyTypeId=" +
    storyTypeVal +
    "&storyTopicId=" +
    storyTopicVal;

  const options = {
    method: "GET",
    mode: "cors",
    headers: headerObject,
  };
  fetch(data, options)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const json = result;
      let html;
      if (json.status && json.errorCode === 0) {
        const responseData = json.response.data;
        allStories = responseData;
        if ($.isEmptyObject(responseData)) {
          $(".show-more-stories").hide();
        } else {
          let meta = json.response.meta;
          if (meta.total > 0) {
            html = loopGridSection(responseData);
            $(".show-more-stories").toggle(meta.total > 8);
          }
          $("#story_grid").append(html);
          masonryGrid();
        }
        $(".show-more-stories a").removeClass("loading");
      }
    });
}
function loopGridSection(responseData) {
  let html = '';
  const splitIn = [4, 3, 1];
  const splitArrayObject = splitArrayIntoChunks(responseData, splitIn);
  for (const [index, value] of splitArrayObject.entries()) {
    switch (index) {
      case 0:
        // 4 child
        html += `<div class='stories-grid grid-0${index + 1} row'>`;
        html += gridOne(value, [grid_11, grid_12, grid_13, grid_14a]);
        html += `<a href='${cta1_14b_link}' class='col-md-8 col-xs-12 block-4b cta grid-size-x' style='background-image:url(${cta1_14b});'></a>`;
        html += `</div>`;
        break;
      case 1:
        // 3 child
        html += `<div class="stories-grid grid-0${index + 1} row">`;
        html += gridTwo(value);
        html += `</div>`;
        break;
      case 2:
        // 1 child
        html += `<div class="stories-grid grid-0${index + 1} row">`;
        html += gridThree(value);
        html += `</div>`;
        break;

      default:
        break;
    }
  }

  return html;
}
function gridOne(arrayOne, imageLinks) {
  let html = '';
  for (let [index, val] of arrayOne.entries()) {
    html += `<div class='col-md-4 col-xs-6 block-${index} story-container slide-up overlay-black grid-size-x' data-story-id='${
      val.id
    }' data-toggle='modal' data-target='#fullStory' style='background-image:url(${getImage(
      val.image_url,
      imageLinks[index]
    )}); height: 319.984px;'>
                <div class='story-block'>
                    <div class='story-title'>${val.pull_quote}</div>
                    <div class='story-author'>${val.first_name} ${
      val.last_initial
    }</div>
                </div>
            </div>`;
    stories.push(val.id);
  }
  return html;
}
function gridTwo(arrayOne) {
  let html = '';
  const splitIn = [2, 1];
  const splitArrayObject = splitArrayIntoChunks(arrayOne, splitIn);
  for (let [index, val] of splitArrayObject.entries()) {
    switch (index) {
      case 0:
        html += `<div class="col-md-4 block-1 p-0">`;
        html += `<div class="row m-0">`;
        html += gtOne(val);
        html += `</div></div>`;
        break;
      case 1:
        for (const valChild of val) {
          html += `<div class='col-md-8 block-2 story-container slide-up overlay-black grid-size-2x' data-story-id='${
            valChild.id
          }' data-toggle='modal' data-target='#fullStory' style='background-image:url(${getImage(
            valChild.image_url,
            grid_23
          )}); height: 319.984px;'>`;
          html += `<div class='story-block'> 
                    <div class='story-title'>${valChild.pull_quote} </div>
                    <div class='story-author'>${
                      valChild.first_name + " " + valChild.last_initial
                    }</div>
                    </div>`;
          html += `</div>`;
          stories.push(valChild.id);
        }
        break;

      default:
        break;
    }
  }
  return html;
}
function gridThree(arrayOne) {
  let html = '';
  let ctaImg_31;
  let ctaQuote31;
  let ctaText31;
  let ctaLink31;
  if (!isCta_31a) {
    ctaImg_31 = cta_31a;
    ctaQuote31 = cta_31a_quote;
    ctaText31 = cta_31a_text;
    ctaLink31 = cta_31a_link;
    isCta_31a = true;
  } else if (isCta_31a && !isCta_31b) {
    ctaImg_31 = cta_31b;
    ctaQuote31 = cta_31b_quote;
    ctaText31 = cta_31b_text;
    ctaLink31 = cta_31b_link;
    isCta_31b = true;
  } else {
    ctaImg_31 = cta_31c;
    ctaQuote31 = cta_31c_quote;
    ctaText31 = cta_31c_text;
    ctaLink31 = cta_31c_link;
    isCta_31b = false;
    isCta_31a = false;
  }
  if (!isCta_32b) {
    isCta_32b = true;
  } else {
    isCta_32b = false;
  }
  let grid_block2;
  for (const value of arrayOne) {
    grid_block2 =
    "<div class='col-md-4 col-xs-6 block-1a cta overlay-black grid-size-x' style='background-image:url(" +
    ctaImg_31 +
    "); height: 319.984px;'> " +
    "<a href='" +
    ctaLink31 +
    "'>" +
    "<div class='story-block'> " +
    "<div class='story-title'>" +
    ctaQuote31 +
    "</div>" +
    "<div class='story-author'>" +
    ctaText31 +
    "</div> " +
    "</div>" +
    "</a>" +
    "</div>" +
    "<div class='col-md-4 col-xs-6 block-1b cta-orange grid-size-x'>" +
    "<a href='" +
    getCTAData(isCta_32b, cta_32a_link, cta_32b_link) +
    "'>" +
    "<div class='story-block'> " +
    "<img src='" +
    getCTAImage(isCta_32b, cta_32a, cta_32b) +
    "' alt='' title='' /> " +
    "<div class='story-title'>" +
    getCTAData(isCta_32b, cta_32a_quote, cta_32b_quote) +
    "</div>" +
    "<div class='story-author'>" +
    getCTAData(isCta_32b, cta_32a_text, cta_32b_text) +
    "</div> " +
    "</div>" +
    "</a>" +
    "</div> " +
    "<div class='col-md-4 col-xs-12 block-2 story-container slide-up overlay-blue grid-size-x grid-size-xy' data-story-id='" +
    value.id +
    "' data-toggle='modal' data-target='#fullStory' style='background-image:url(" +
    getImage(value.image_url, grid_23) +
    ");'> " +
    "<div class='story-block'> " +
    "<div class='story-title'>" +
    value.pull_quote +
    "</div> " +
    "<div class='story-author'>" +
    value.first_name +
    " " +
    value.last_initial +
    "</div> " +
    "</div> " +
    "</div> ";
    stories.push(value.id);
  }

  html += grid_block2;

  return html;
}

function gtOne(splitArrayObject) {
  let html = '';
  for (let [index, val] of splitArrayObject.entries()) {
    switch (index) {
      case 0:
        html += `<div class="col-md-12 col-xs-6 block-1a overlay-black story-container slide-up grid-size-x" data-story-id="${
          val.id
        }" data-toggle="modal" data-target="#fullStory" style="background-image:url(${getImage(
          val.image_url,
          grid_21
        )}); height: 319.984px;">
                    <div class="story-block">
                      <div class="story-title">${val.pull_quote}</div>
                      <div class="story-author">${
                        val.first_name + " " + val.last_initial
                      }</div>
                    </div>
                  </div>`;
        stories.push(val.id);
        break;
      case 1:
        html += `<div class='col-md-12 col-xs-6 block-1b overlay-orange story-container slide-up grid-size-x' data-story-id='${
          val.id
        }' data-toggle='modal' data-target='#fullStory' style='background-image:url(${getImage(
          val.image_url,
          grid_21
        )}); height: 319.984px;'>
                  <div class="story-block">
                    <div class="story-title">${val.pull_quote}</div>
                    <div class="story-author">${
                      val.first_name + " " + val.last_initial
                    }</div>
                  </div>
                 </div>`;
        stories.push(val.id);
        break;

      default:
        break;
    }
  }
  return html;
}
function checkNextButton(storyId_nb) {
  const storyIndex = stories.indexOf(parseInt(storyId_nb));
  if (storyIndex == stories.length - 1) {
    $(".user-full-story .story-nav.next-btn").addClass("next-btn-hide");
  } else {
    $(".user-full-story .story-nav.next-btn").removeClass("next-btn-hide");
  }
}

function checkPrevButton(storyId_pb) {
  const storyIndex = stories.indexOf(parseInt(storyId_pb));
  if (storyIndex == 0) {
    $(".user-full-story .story-nav.prev-btn").addClass("prev-btn-hide");
  } else {
    $(".user-full-story .story-nav.prev-btn").removeClass("prev-btn-hide");
  }
}

function getUserImage(storyId_ui) {
  let userImage = $(".story-container[data-story-id='" + storyId_ui + "']").css(
    "background-image"
  );
  userImage = userImage
    .replace("url(", "")
    .replace(")", "")
    .replace(/\"/gi, "");
  return userImage;
}

function getProductUrl(product_id) {
  let productUrl = "";
  if (product_id == 1) {
    productUrl = $('[name="freestyle-14-day"]').attr("value");
  } else if (product_id == 2) {
    productUrl = $('[name="freestyle-libre-2"]').attr("value");
  }
  return productUrl;
}

function getStoryData(storyId_sd) {
  let data;
  $.each(allStories, function (idx, story) {
    if (story.id == storyId_sd) {
      data = story;
      const userImage = getUserImage(storyId_sd);
      $("#fullStory")
        .find("#fullStory")
        .text(data.first_name + "'s story");

      $("#fullStory").find("#story_popup_header i").text(data.pull_quote);
      $("#fullStory").find("#story_popup_content").text(data.content);
      $("#fullStory").find(".user-img").attr("src", userImage);

      const storyTypeText = getPopupValue(
        filterJson,
        "testimonial_story_types",
        data.story_type_id
      );
      const storyTopicText = getPopupValue(
        filterJson,
        "testimonial_story_topics",
        data.story_topic_id
      );
      const productText = getPopupValue(
        filterJson,
        "testimonial_products",
        data.product_id
      );
      const ageRangeText = getPopupValue(
        filterJson,
        "testimonial_age_ranges",
        data.age_range_id
      );
      const dynamicProductUrl = getProductUrl(data.product_id);

      const category = $("#fullStory").find("ul.category li");
      $(category).eq(0).children("p").last().text(storyTypeText);
      $(category).eq(1).children("p").last().text(storyTopicText);
      $(category).eq(2).children("p").last().text(productText);
      $(category).eq(3).children("p").last().text(ageRangeText);
      dynamicProductUrl &&
        $("#fullStory")
          .find(".mt-3 > .button.link.a-button.a-button--primary > .btn")
          .attr("href", dynamicProductUrl);

      setTimeout(function () {
        $("#fullStory").removeClass("loading");
      }, 300);
      return false;
    }
  });
}

function getPopupValue(response, selectedReferencetype, dropdownKey) {
  dropdownKey = dropdownKey.toString();
  let selectedValue;
  $.each(response, function (index, val) {
    if (response[index].referenceType == selectedReferencetype) {
      const codeValueListArr = response[index].codeValueList;
      $.each(codeValueListArr, function (idx, value) {
        const selectedKey = codeValueListArr[idx].key;
        if (selectedKey == dropdownKey) {
          selectedValue = codeValueListArr[idx].value;
        }
      });
    }
  });
  return selectedValue;
}
function countChars(obj) {
  const strLength = obj.value.length;
  const charRemain = maxLength - strLength;

  if (charRemain === 0) {
    document.getElementById("charNum").innerHTML =
      '<strong style="color: rgb(143, 0, 1);"> ' +
      maxLength +
      " / " +
      maxLength +
      " characters</strong>";
  } else {
    document.getElementById("charNum").innerHTML =
      strLength + " / " + maxLength + " characters";
  }
}

const makePhotoMandatory = () => {
  const formName = "#addpatient_form";
  $(`${formName} [name='filepond']`).attr("data-required", true);
  $(`${formName} [data-js-component='file-upload']`).attr(
    "data-required",
    true
  );
  const btnSubmit = document.querySelector(
    `#addpatient_form button[type="submit"]`
  );
  let timer = "";
  $(`${formName}  .m-file-uploader__removefile `).click(function () {
    if (!btnSubmit?.disabled) {
      btnSubmit.disabled = true;
    }
  });
  $(`${formName}  .m-file-uploader__cropconfirm`).click(function () {
    const onlyPhotoCheck = Boolean($(btnSubmit).attr("isPhotoOnly") ?? false);
    if (btnSubmit?.disabled && onlyPhotoCheck) {
      btnSubmit.disabled = false;
    }
  });
  $(`${formName} :input`).on("change keyup", function (e) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      enableSubmitBtn(btnSubmit);
    }, 700);
  });

  $(document).on("keypress", function (e) {
    if (e.which == 13 && $(".a-search.a-search--expand").length == 0) {
      enableSubmitBtn(btnSubmit, true);
      return false;
    }
  });
};

const enableSubmitBtn = (btnSubmit, submitNow) => {
  $(btnSubmit).attr("isPhotoOnly", false);
  if (!btnSubmit?.disabled) {
    $(btnSubmit).attr("isPhotoOnly", true);
    const image = $(".m-file-uploader__croppedimg img").attr("src");
    if (image) {
      if (submitNow) {
        $(btnSubmit).click();
      }
    } else {
      btnSubmit.disabled = true;
    }
  }
};

function psYTVideoResize() {
  const videoCmp = document.querySelector("#patient-video-cmp");
  const playBtnPath =
    "/content/dam/adc/freestyle/countries/us-en/images/icons/play-icon.png";
  if (!videoCmp || videoCmp.childElementCount <= 0) {
    return;
  }

  const thumbCount = videoCmp.childElementCount - 1;
  let numberOfRows = Math.round(thumbCount / 2);
  videoCmp.children[0].style.gridRowEnd = "span " + numberOfRows;
  const videoIframes = videoCmp.getElementsByTagName("iframe");
  for (let i = 0; i < videoIframes.length; i++) {
    let videoSrc = videoIframes[i].getAttribute("src");
    let youtube_video_id = videoSrc?.split("?")[0]?.split("/embed/")[1] ?? "";
    if (youtube_video_id.length == 11) {
      let video_thumbnail_src =
        "//i.ytimg.com/vi_webp/" + youtube_video_id + "/sddefault.webp";
      let videoElementDom = videoCmp.children[i].querySelector(".a-video");
      if (!videoElementDom) {
        return;
      }
      let thumbElement = document.createElement("div");
      thumbElement.className = "thumbnail";
      thumbElement.style.backgroundImage = "url(" + video_thumbnail_src + ")";
      let playBtn = document.createElement("img");
      playBtn.src = playBtnPath;
      thumbElement.appendChild(playBtn);
      videoElementDom.appendChild(thumbElement);
      playBtn.addEventListener("click", function () {
        videoCmp.children[0].querySelector(".a-video").classList.add("playing");
        videoCmp.children[0].querySelector("iframe").src =
          videoSrc + "?autoplay=1";
      });
    }
  }
}
