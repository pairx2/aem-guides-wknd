import "../../common/carousel";

(function () {
  "use-strict";
  class DynamicCardList {
    public $ele: JQuery<Element>;

    constructor(ele) {
      this.$ele = $(ele);
      this.getRelatedContent();
      this.getHistory();
    }
    public getRelatedContent(){
      document.querySelectorAll(".o-dynamic-card-list .similartags .m-card").forEach((element) => {
        const chips = element
          .querySelector(".a-chips--link")
          .getAttribute("data-page-tags");
        const t = chips.substring(chips.lastIndexOf("/") + 1, chips.length);
        element.querySelector(".a-chips--link").textContent = t;
        if (chips == null || chips == undefined) {
          element.querySelector(".a-chips--link").textContent = "Article";
        } else if (chips.indexOf("sampleAvailable") >= 0) {
          element.querySelector(".card-text").textContent = chips.substring(
            chips.lastIndexOf("/"),
            chips.length
          );
        }
      });
    }
    public getHistory() {
      var articleList = JSON.parse(localStorage.getItem("hisoryArrayUrls"));
      if (articleList == null || articleList == undefined) {
        document.querySelectorAll(".o-dynamic-card-list .pickUp").forEach(function (element) {
        					element.style.display="none";
         });
      }
      var currentURL = window.location.href;

      var articleList = JSON.parse(localStorage.getItem("hisoryArrayUrls"));
      var articleAttributes = JSON.parse(localStorage.getItem("json"));
      var i = 0;
      var filteredList = [];

      for (var j in articleAttributes) {
          if (!articleAttributes[j].title.toLowerCase().includes("error")) {
              filteredList.push(articleAttributes[j]);
          }
      }

      document.querySelectorAll(".o-dynamic-card-list .pickUp .m-card").forEach((element) => {
        if (i < Object.keys(filteredList).length) {
          var title = filteredList[i].title;
          var image = filteredList[i].image;
          var url = filteredList[i].url;
          element.querySelector(".m-card__title").textContent = title;
          element.setAttribute("data-path",url);
          element.addEventListener('click', function() {
          		window.location = url;
           });

          element.querySelector(".m-card__title").textContent = title;
          if (image == null) {
            var ingPath = element
              .querySelector(".m-card__media")
              .getAttribute("data-image-asset");
            element
              .querySelector(".cmp-image__image")
              .setAttribute("src", ingPath);
          } else {
            element
              .querySelector(".cmp-image__image")
              .setAttribute("src", image);
          }
          i++;
        }
        if (element.querySelector(".m-card__title").textContent === "") {
          element.style.display = "none";
        }
      });
    }
  }
  window.onload = () => {
    var currentURL = window.location.href;
    var historyJson = {};
    var jsonArry = [];
    if (document.querySelector(".cmp-image") != null) {
      var image = document
        .querySelector(".cmp-image")
        .getAttribute("data-asset");
    }
    var chipsElements = document.querySelectorAll(".m-chips-list__body");

    if (localStorage.getItem("json") != null) {
      var j = JSON.parse(localStorage.getItem("json"));
      if (j.hasOwnProperty(currentURL)) {
        jsonArry.push(currentURL);
        for (let k in j) {
          historyJson[k] = j[k];
          if (k != currentURL) {
            jsonArry.push(k);
          }
        }
        localStorage.setItem("json", JSON.stringify(historyJson));
        localStorage.setItem("hisoryArrayUrls", JSON.stringify(jsonArry));
      } else {
        var title = $("title").text();
        var i = 0;
        populatejson(currentURL);
        for (let k in j) {
          historyJson[k] = j[k];
          jsonArry.push(k);
        }

        localStorage.setItem("json", JSON.stringify(historyJson));
        localStorage.setItem("hisoryArrayUrls", JSON.stringify(jsonArry));
      }
    } else {
      var title = document.querySelector("title").textContent;

      var i = 0;
      populatejson(currentURL);
      localStorage.setItem("json", JSON.stringify(historyJson));
      localStorage.setItem("hisoryArrayUrls", JSON.stringify(jsonArry));
    }
    function populatejson(currentURL) {
      var jsonObject = {};
      jsonObject["url"] = currentURL;
      jsonObject["title"] = title;
      jsonObject["image"] = image;
      historyJson[currentURL] = JSON.parse(JSON.stringify(jsonObject));
      jsonArry.push(currentURL);
    }
  };

  document
    .querySelectorAll('.o-dynamic-card-list [data-js-component="carousel"]')
    .forEach(function (ele) {
      new DynamicCardList(ele);
    });
})();
