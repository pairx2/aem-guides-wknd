$(document).ready(function () {
  var foodCateUrl = $("#food-category-url").attr("href");
  if (foodCateUrl != undefined) {
    $.ajax({
      url: foodCateUrl,
      success: function (result) {
        for (let i in result) {
        var pathUrl = "";
        if(result[i].category_title == "Bread") {
            pathUrl =
            "/content/ardx/acelis/us/en/patients/inr-patient-care/food-categories/bread-cereal-rice-pasta-items.html";
        } else {
            pathUrl =
            "/content/ardx/acelis/us/en/patients/inr-patient-care/food-categories/" +
            result[i].category_title.replaceAll(" ", "-").toLowerCase() +
            "-items.html";
        }
          var innerDiv = `<a class="col-md-3" href="${pathUrl}"><div class="food-categroy-wrapper"><div class="food-categroy-image"><img src="${result[i].image_path}" class="img-size"/></div><div class="food-categroy-title"><h5><span class="text-uppercase">${result[i].category_title}</span></h5></div></div></a>`;
          $("#food-categroy-section").append(innerDiv);
        }
      },
    });
  }

  var foodItemUrl = $("#food-item-url").attr("href");
  if (foodItemUrl != undefined) {
    $.ajax({
      url: foodItemUrl,
      success: function (result) {
        var foodItems = [];
        var windowPath = window.location.pathname
          .split("/")
          .pop()
          .replaceAll(".html", "");
        for (let i in result) {
          var catTitle =
            result[i].food_category.replaceAll(" ", "-").toLowerCase() +
            "-items";
          if (catTitle == windowPath) {
            foodItems.push(result[i]);
          }
        }
        foodItemsCallBack(foodItems);
      },
    });
  }

  function foodItemsCallBack(foodItems) {
    for (let i in foodItems) {
      var popUpTarget = foodItems[i].item_title
        .toLowerCase()
        .replaceAll(" ", "-");
      var innerDiv = `<div class="col-md-3"><div data-popup-target="${popUpTarget}" class="food-categroy-wrapper"><div class="food-categroy-image"><img src="${foodItems[i].image_path_for_item}" class="img-size"/></div><div class="food-categroy-title"><h5><span class="text-uppercase">${foodItems[i].item_title}</span></h5></div></div></div>`;
      $("#food-categroy-section").append(innerDiv);
    }
  }

  var popupDiv = `<div id="food-serving-popup" class="wrapper-popup hide">
    <div class="vitamin-popup">
        <div class="wrapper-content">
            <div class="popup--bg">
            </div>
        </div>
    </div>
  </div>`;

  $(popupDiv).insertAfter("#site-leaving-popup-content");

  $(document).on("click", ".food-categroy-wrapper", function () {
    var foodItemsServeUrl = $("#food-item-serving-json-url").attr("href");
    var checkServItem = $(this).attr("data-popup-target");
    var foodItemVal = window.location.pathname
          .split("/")
          .pop()
          .replaceAll("-items.html", "");
    var filteredData = [];
    var _this = $(this);
    if (foodItemsServeUrl != undefined) {
      $.ajax({
        url: foodItemsServeUrl,
        success: function (result) {
          for (let i in result) {
            var servingItem = result[i].food_item
              .toLowerCase()
              .replaceAll(" ", "-");
            var servingFoodType = result[i].food_category
              .toLowerCase()
              .replaceAll(" ", "-");
            if (servingItem == checkServItem && foodItemVal == servingFoodType) {
              filteredData.push(result[i]);
            }
          }
          foodItemsServingCallBack(filteredData, _this);
        },
      });
    }
  });

  function foodItemsServingCallBack(filteredData, _this) {
    $("#food-serving-popup").removeClass("hide");
    $("#food-serving-popup").find(".popup--bg").empty();

    var imagePath = $(_this).find(".img-size").attr("src");
    var titleText = $(_this).find(".food-categroy-title").children().text();
      var popupHeadHtml = `<span class="close-popup" data-dismiss="modal" aria-hidden="true">
                  <span class="close-txt">X</span>
                </span>
                <div class="popup-head">
                  <img src="${imagePath}" class="img-size" />
                  <h1>${titleText}</h1>
                </div>`;
    $("#food-serving-popup").find(".popup--bg").append(popupHeadHtml);

    if(filteredData.length != 0) {
      for (let i in filteredData) {
        var renderText = `<div class="popup-content">
                      <h3>${filteredData[i].title_of_serving}</h3>
                      <div class="content-inner">
                          <p>Measure : ${filteredData[i].serving_measure}</p>
                          <p>Micrograms : ${filteredData[i].serving_micrograms}</p>
                          <p>Vitamin K : ${filteredData[i].vitamin_k}</p>
                      </div>
                  </div>`;
        $("#food-serving-popup").find(".popup--bg").append(renderText);
      }
    } else {
      var noServingText = `<div class="popup-content">
                      <h3 class="no-data-vitamin-k" >no serving details are available</h3>
                  </div>`;
      $("#food-serving-popup").find(".popup--bg").append(noServingText);
    }

    
  }

  $(document).on("click", ".close-popup", function () {
    $('body').css('overflow', 'auto');
    $(this).closest("#food-serving-popup").addClass("hide");
  });


  var vitaminTopUrl = $("#vitamink-top-json-url").attr("href");
  if(vitaminTopUrl != undefined) {
    $.ajax({
      url: vitaminTopUrl,
      success: function (result) {
        var uniqArr = getUniqueListBy(result, "food_item");
        for (let i in uniqArr) {
          var popUpTarget = uniqArr[i].food_item
        .toLowerCase()
        .replaceAll(" ", "-");
        var innerDiv = `<div class="col-md-3"><div data-popup-target="${popUpTarget}" class="vitamin-wrapper"><div class="food-categroy-image"><img src="${uniqArr[i].image_path_for_item}" class="img-size"/></div><div class="food-categroy-title"><h5><span class="text-uppercase">${uniqArr[i].food_item}</span></h5></div></div></div>`;
        $("#food-vitamin-top").append(innerDiv);
        }
      },
    });

    $(document).on("click", ".vitamin-wrapper", function () {
      $('body').css('overflow', 'hidden');
      var checkServItem = $(this).attr("data-popup-target");
      var filteredData = [];
      var _this = $(this);
      if (vitaminTopUrl != undefined) {
        $.ajax({
          url: vitaminTopUrl,
          success: function (result) {
            for (let i in result) {
              var servingItem = result[i].food_item
                .toLowerCase()
                .replaceAll(" ", "-");
              if (servingItem == checkServItem) {
                filteredData.push(result[i]);
              }
            }
            foodItemsServingCallBack(filteredData, _this);
          },
        });
      }
    });

  }

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}
});