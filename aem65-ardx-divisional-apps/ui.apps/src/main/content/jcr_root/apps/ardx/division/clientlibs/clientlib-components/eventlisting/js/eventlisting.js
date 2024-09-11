$(document).ready(function () {
  let eventListingCheck = document.getElementById('event-listing-filter');
  let regExMatchValue = /\{(.*?)\}/gm;
  if (eventListingCheck) {
      let eventsOption = {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "Asia/Kolkata"
      };
      setTimeout(function() {
          $("#event-listing-filter").find(".columncontrol__column").removeClass("col-md-7 col-lg-7");
          $("#event-listing-filter").find(".o-search-res__container .col-md-3").removeClass("col-md-3");
          $("#event-listing-filter").find(".o-search-res__container .col-md-9").removeClass("col-md-9").addClass("col-md-7 event-results-list");
          $("#event-listing-filter").find(".o-search-res__container").append("<div class='col-md-5 litepicker-calendar'></div>");
          $("#event-listing-filter").find(".litepicker-calendar").append($(".o-search-results-filter .columncontrol__column"));
          $("#event-listing-filter").find(".litepicker-calendar .columncontrol__column").prepend($(".litepicker"));
          $("#event-listing-filter").find(".event-results-list").append(`<div class='pagination-main'><ul class="pagination"></ul></div>`);
          $("#event-listing-filter").find(".litepicker-calendar .columncontrol__column").removeClass("col-md-5 col-lg-5");
          $("#event-listing-filter").find(".o-search-res__container .p-0").remove();
          $("#event-listing-filter").find(".event-results-list .filter.col-md-10.col-lg-10.col-sm-12.pt-1").remove();
          $("#event-listing-filter").find(".o-search-res__container .o-search-res__no-results").remove();
          $("#event-listing-filter").find(".event-results-list .o-search-res__results--view").removeClass('pt-3');

          let jsonData = JSON.parse(window.sessionStorage.getItem("searchResult"))?.response?.results?.sort((a,b)=>a.eventdate - b.eventdate);
          setDataTime();

          let listVariation = document.querySelector('#event-listing-filter').querySelector('#result-temp').content.querySelector('.result-items').classList.contains('a-list-result');

          let cardVariation = document.querySelector('#event-listing-filter').querySelector('#result-temp').content.querySelector('.result-items').classList.contains('a-card-result');

          function eventsDynamicContent(i, cardVariation, regExMatchValue, jsonData) {
              let tempStrTitle, tempStrDescrip;
              if (cardVariation) {
                  tempStrTitle = document.querySelector('#event-listing-filter').querySelector('#result-temp').content.querySelector('.result-items .a-card-result__title').outerHTML;
                  tempStrDescrip = document.querySelector('#event-listing-filter').querySelector('#result-temp').content.querySelector('.result-items .a-card-result__description').outerHTML;
                  let tempStrImages = document.querySelector('#event-listing-filter').querySelector('#result-temp').content.querySelector('.result-items .a-card-result__image').outerHTML;
                  window.conferenceButton = document.querySelector('#event-listing-filter').querySelector('#result-temp').content.querySelector('.result-items .a-card-result__link').outerHTML;

                  window.templateStrImage = [];
                  let imageMatches = tempStrImages.match(regExMatchValue);
                  tempStrImages = callImageMatches(imageMatches, tempStrImages, jsonData, i);
                  templateStrImage.push(tempStrImages);
              } else {
                  tempStrTitle = document.querySelector('#event-listing-filter').querySelector('#result-temp').content.querySelector('.result-items .a-list-result__title').outerHTML;
                  tempStrDescrip = document.querySelector('#event-listing-filter').querySelector('#result-temp').content.querySelector('.result-items .a-list-result__description').outerHTML;
                  window.conferenceButton = document.querySelector('#event-listing-filter').querySelector('#result-temp').content.querySelector('.result-items .a-list-result__link').outerHTML;
              }

              window.templateStrTitle = [];
              let titleMatches = tempStrTitle.match(regExMatchValue);
              tempStrTitle = callTemstrTitle(titleMatches, tempStrTitle, jsonData, i);
              templateStrTitle.push(tempStrTitle);

              window.templateStrDesc = [];
              let DescMatches = tempStrDescrip.match(regExMatchValue);
              tempStrDescrip = calltempStrDescrip(DescMatches, tempStrDescrip, jsonData, i);
              templateStrDesc.push(tempStrDescrip);

              window.templateStrConfButton = [];
              let ConfMatches = conferenceButton.match(regExMatchValue);
              callConMatches(ConfMatches, jsonData, i);
              templateStrConfButton.push(conferenceButton);

          }

          function articleDiv(i) {
              let eventStartDateNew = new Date(jsonData[i].eventdate)
              eventStartDateNew = eventStartDateNew.toLocaleDateString("en", eventsOption);
              let indexedDate = new Date(eventStartDateNew);
              let eventDuration = parseInt(jsonData[i].duration - 1);
              $("#event-listing-filter").find($(".result-items")).remove();
              eventsDynamicContent(i, cardVariation, regExMatchValue, jsonData);
              let eventDateString = callTostingEventDateString(eventDuration, indexedDate);
              
              callCardResult(cardVariation, eventDateString, jsonData, i);

          }

          window.selectedDateCal = function() {
              let selectedDate = new Date(+$(".is-start-date").attr("data-time"));
              // Get year, month, and day part from the date
              let year = selectedDate.toLocaleString("default", {
                  year: "numeric"
              });
              let month = selectedDate.toLocaleString("default", {
                  month: "2-digit",
              });
              let day = selectedDate.toLocaleString("default", {
                  day: "2-digit"
              });
              // Generate yyyy-mm-dd date string
              window.selectedDateUpdated = day + "-" + month + "-" + year;
          }
         

          function eventLoad() {
              CallEventLoadFuntion(jsonData, eventsOption, articleDiv);
              defaultMsg();
          }
          eventLoad();

          $(document).on("click", "#view-all", function() {
              setDataTime();
              $("#event-listing-filter").find(".o-search-res__results--view").empty();
              callViewAllfunction(jsonData, articleDiv, eventsOption);
              paginationEventList();
              confLinkAddType();
          });

          function regionLoad() {
              window.regionData = function() {
                  $("#event-listing-filter").find(".o-search-res__results--view").empty();
                  callEventListingFilterFunction(jsonData, articleDiv, eventsOption);
                  defaultMsg();
              }

              $(document).on("click", ".a-link__text", function() {
                  setDataTime();
                  $('.day-item').removeClass('highlighted-date').removeAttr("style");
                  window.regionHref = $(this).attr("href").split("#")[1];
                  window.parent.regionData();
                  paginationEventList();
                  confLinkAddType();
              });
          }
          regionLoad();

          function calenderEventsLoad() {
              window.calendarEvent = function() {
                  $("#event-listing-filter").find(".o-search-res__results--view").empty();
                  window.parent.selectedDateCal();
                  calenderEventLisitingFilter(jsonData, eventsOption, articleDiv);
              };

              $(document).on("click", ".day-item", function() {
                  setDataTime();
                  window.parent.calendarEvent();
                  paginationEventList();
                  callDayItemFunction(jsonData, eventsOption);
                  defaultMsg();
                  confLinkAddType();
              });
          }

          calenderEventsLoad();

          function monthchange() {
              setDataTime();
              $("#event-listing-filter").find(".o-search-res__results--view").empty();
              callMonthChangeFuntion(jsonData, eventsOption, articleDiv);
              defaultMsg();
          }

          $(document).on("click", ".button-previous-month", function() {
              setDataTime();
              monthchange();
              paginationEventList();
              confLinkAddType();
              defaultMsg();
          });

          $(document).on("click", ".button-next-month", function() {
              setDataTime();
              monthchange();
              paginationEventList();
              confLinkAddType();
              defaultMsg();
          });

          // Pagination Code starts here
          function paginationEventList() {
              let limitPerPage = $('#event-listing-filter').find('.o-search-results-filter .container').attr('data-page-size');
              callEventListing(cardVariation, listVariation, limitPerPage);
                          
              // Below is an example use of the above function.
              $(function() {
                  // Number of items and limits the number of items per page
                  let numberOfItems = callEventListingFilter(cardVariation);
                  // Total pages rounded upwards
                  let totalPages = Math.ceil(numberOfItems / limitPerPage);
                  let paginationSize = 6;
                  let currentPage;

                  function showPage(whichPage) {
                    if (whichPage < 1 || whichPage > totalPages)
                    return false;
                    currentPage = whichPage;
                    CallshowPage(currentPage, cardVariation, limitPerPage)
                    
                     // Replace the navigation items (not prev/next):
                    $(".pagination li").slice(1, -1).remove();
                    getPageList(totalPages, currentPage, paginationSize).forEach((item)=>{
                        callNextPageList(item, currentPage);
                    }
                    );
                    // Disable prev/next when at first/last page:
                    $("#previous-page").toggleClass("disabled", currentPage === 1);
                    $("#next-page").toggleClass("disabled", currentPage === totalPages);
                    return true;
                  }
                  // Include the prev/next buttons:
                  $("#event-listing-filter .pagination").append($("<li>").addClass("page-item").attr({
                      id: "previous-page"
                  }).append($("<a>").addClass("page-link").attr({
                      href: "javascript:void(0)",
                  }).append(`<em class="abt-icon abt-icon-left-arrow u-ltr"></em>`)), $("<li>").addClass("page-item").attr({
                      id: "next-page"
                  }).append($("<a>").addClass("page-link").attr({
                      href: "javascript:void(0)",
                  }).append(`<em class="abt-icon abt-icon-right-arrow u-ltr"></em>`)));
                  // Show the page links
                  $(".o-search-res__results--view").show();
                  showPage(1);
                  // Use event delegation, as these items are recreated later
                  $(document).on("click", "#event-listing-filter .pagination li.current-page:not(.active)", function() {
                      return showPage(+$(this).text());
                  });
                  $("#next-page").on("click", function() {
                      return showPage(currentPage + 1);
                  });
                  $("#previous-page").on("click", function() {
                      return showPage(currentPage - 1);
                  });
              });
          }
          paginationEventList();
          confLinkAddType();
      }, 1000);
  }
  });

function callCardResult(cardVariation, eventDateString, jsonData, i) {
    if (cardVariation) {
        $("#event-listing-filter").find(".o-search-res__results--view").append(`<div class="a-card-result a-card-result__cardrow" style="display:none">
                    ${window.parent.templateStrTitle}
                    ${window.parent.templateStrDesc}
                    <div class="row">
                    <div class="col-md-6">
                    ${window.parent.templateStrImage}
                    </div>
                    <div class="col-md-6">
                    <h6>EVENT DURATION: ${eventDateString}</h6>
                    <h6>LOCATION: ${jsonData[i].eventlocation}</h6>
                    ${window.parent.templateStrConfButton}        
                    </div>
                    </div>
                    </div>`);
        document.querySelector('#event-listing-filter').querySelector('.a-card-result__link').setAttribute('type', 'button');
    } else {
        callEventLocation(jsonData, i, eventDateString);
    }
}

function callDayItemFunction(jsonData, eventsOption) {
    for (let i in jsonData) {
        durationHighlight(jsonData, i, eventsOption);
    }
}

function callNextPageList(item, currentPage) {
    $("<li>").addClass("page-item").addClass(item ? "current-page" : "disabled").toggleClass("active", item === currentPage).append($("<a>").addClass("page-link").attr({
        href: "javascript:void(0)",
    }).text(item || "...")).insertBefore("#next-page");
}

function callEventLocation(jsonData, i, eventDateString) {
    $("#event-listing-filter").find(".o-search-res__results--view").append(`<article class="a-list-result a-list-result__listview" style="display:none">
                  <a class="a-list-result__title" href=${jsonData[i].relatedsiteurl || ''} target="_blank">${jsonData[i][window.parent.titleKey] || ''}</a>
        <h6 class="a-list-result__description">${window.parent.templateStrDesc}</h6>
        <h6>EVENT DURATION: ${eventDateString}</h6>
        <h6>LOCATION: ${jsonData[i].eventlocation}</h6>
        ${window.parent.templateStrConfButton}
        </article>`);
}

function CallEventLoadFuntion(jsonData, eventsOption, articleDiv) {
    for (let i in jsonData) {
        durationArray(jsonData, i, eventsOption);
        for (let u in window.parent.dateArray) {
            let todaysDate = new Date().toLocaleDateString("en", eventsOption);
            let unformatedDate = window.parent.dateArray[u].toLocaleDateString("en", eventsOption);
            if (new Date(todaysDate) <= new Date(unformatedDate)) {
                articleDiv(i);
                break;
            }
        }
        durationHighlight(jsonData, i, eventsOption);
    }
}

function callMonthChangeFuntion(jsonData, eventsOption, articleDiv) {
    for (let i in jsonData) {
        window.JsonMonth = new Date(jsonData[i].eventdate).toString().split(" ")[1];
        durationArray(jsonData, i, eventsOption);
        let unformatedDate;
        for (let u in window.parent.dateArray) {
            unformatedDate = window.parent.dateArray[u];
        }
        let jsonMonthsUpdated = unformatedDate?.toString().split(' ')[1];
        let jsonYearUpdated = unformatedDate?.toString().split(' ')[3];
        let selectedYear = document.querySelector(".month-item-year").innerHTML;
        let selectedMonth = document.querySelector(".month-item-name").innerHTML.substring(0, 3);
        durationHighlight(jsonData, i, eventsOption);
        if (jsonMonthsUpdated == selectedMonth && jsonYearUpdated == selectedYear) {
            articleDiv(i);
        }
    }
}

function calenderEventLisitingFilter(jsonData, eventsOption, articleDiv) {
    for (let i in jsonData) {
        durationArray(jsonData, i, eventsOption);
        for (let u in window.parent.dateArray) {
            // Get year, month, and day part from the date
            let year = window.parent.dateArray[u].toLocaleString("default", {
                year: "numeric"
            });
            let month = window.parent.dateArray[u].toLocaleString("default", {
                month: "2-digit",
            });
            let day = window.parent.dateArray[u].toLocaleString("default", {
                day: "2-digit"
            });
            // Generate yyyy-mm-dd date string
            let dateArrayUpdated = day + "-" + month + "-" + year;
            window.unformatedDate = window.parent.dateArray[u];
            if (dateArrayUpdated == window.parent.selectedDateUpdated) {
                articleDiv(i);
            }
        }
    }
}

function callEventListingFilterFunction(jsonData, articleDiv, eventsOption) {
    for (let i in jsonData) {
        if (jsonData[i].eventregion == window.parent.regionHref) {
            articleDiv(i);
            durationHighlight(jsonData, i, eventsOption);
        }
    }
}

function callViewAllfunction(jsonData, articleDiv, eventsOption) {
    for (let i in jsonData) {
        articleDiv(i);
        durationHighlight(jsonData, i, eventsOption);
    }
}

function callConMatches(ConfMatches, jsonData, i) {
    if (ConfMatches != null) {
        ConfMatches.forEach(function (match) {
            let key = match.replace("{", "").replace("}", "");
            let reg = new RegExp(match, "gm");
            window.conferenceButton = conferenceButton.replace(reg, jsonData[i][key] || "");
        });
    }
}

function calltempStrDescrip(DescMatches, tempStrDescrip, jsonData, i) {
    if (DescMatches != null) {
        DescMatches.forEach(function (match) {
            let key = match.replace("{", "").replace("}", "");
            let reg = new RegExp(match, "gm");
            tempStrDescrip = tempStrDescrip.replace(reg, jsonData[i][key] || "");
        });
    }
    return tempStrDescrip;
}

function callTemstrTitle(titleMatches, tempStrTitle, jsonData, i) {
    if (titleMatches != null) {
        titleMatches.forEach(function (match) {
            window.titleKey = match.replace("{", "").replace("}", "");
            let reg = new RegExp(match, "gm");
            tempStrTitle = tempStrTitle.replace(reg, jsonData[i][titleKey] || "");
        });
    }
    return tempStrTitle;
}

function callImageMatches(imageMatches, tempStrImages, jsonData, i) {
    if (imageMatches != null) {
        imageMatches.forEach(function (match) {
            let key = match.replace("{", "").replace("}", "");
            let reg = new RegExp(match, "gm");
            tempStrImages = tempStrImages.replace(reg, jsonData[i][key] || "");
        });
    }
    return tempStrImages;
}

function setDataTime() {
    let allDays = document.querySelectorAll('.day-item');
   
    for (let allDaysj of allDays) {
        
        let z = new Date(+(allDaysj.getAttribute('data-Time')));
        let year = z.toLocaleString("default", {
            year: "numeric"
        });
        let month = z.toLocaleString("default", {
            month: "2-digit",
        });
        let day = z.toLocaleString("default", {
            day: "2-digit"
        });
        let zUpdated = day + "-" + month + "-" + year;
        allDaysj.classList.add(zUpdated);
    }
}
function defaultMsg() {
    if ($("#event-listing-filter").find(".o-search-res__results--view").contents().length == 0) {
        $("#event-listing-filter").find(".o-search-res__results--view").append(`<div class="no-events">No forthcoming events currently scheduled.</div>`);
    }
}
function durationArray(jsonData, i, eventsOption) {
    let eventDuration = parseInt(jsonData[i].duration - 1);
    Date.prototype.addDays = function(days) {
        let dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }
    function getDates(startDate, stopDate) {
        let dateArray = new Array();
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }
    let eventStartDate = new Date(jsonData[i].eventdate)
    eventStartDate = eventStartDate.toLocaleDateString("en", eventsOption);
    window.dateArray = getDates(new Date(eventStartDate), (new Date(eventStartDate)).addDays(eventDuration));
}
function durationHighlight(jsonData, i, eventsOption) {
    durationArray(jsonData, i, eventsOption);
   for (let u in window.parent.dateArray) {
       let year = window.parent.dateArray[u].toLocaleString("default", {
           year: "numeric"
       });
       let month = window.parent.dateArray[u].toLocaleString("default", {
           month: "2-digit",
       });
       let day = window.parent.dateArray[u].toLocaleString("default", {
           day: "2-digit"
       });
       let dateArrayUpdated = day + "-" + month + "-" + year;
       let durationDate = window.parent.dateArray[u].toLocaleDateString("en", eventsOption);
       let todaysDate = new Date().toLocaleDateString("en", eventsOption);
       if (new Date(todaysDate) <= new Date(durationDate)) {
           $('#event-listing-filter .container__days').find(`.${dateArrayUpdated}`).addClass('highlighted-date').css({
               "background": "#009cde",
               "color": "#fff"
           });
       } else {
           $('#event-listing-filter .container__days').find(`.${dateArrayUpdated}`).addClass('highlighted-date').css({
               "background": "#000",
               "color": "#fff"
           });
       }
   }
}
function confLinkAddType() {
    let confLinkLength = document.querySelector('#event-listing-filter').querySelectorAll('.a-result__link');
    for (let confLinkLengthk of confLinkLength) {
        let k = 0;
        confLinkLengthk.setAttribute('target', '_blank');
        let hrefAttr;
        if (confLinkLengthk.hasAttribute('data-href')) {
            hrefAttr = confLinkLengthk.getAttribute('data-href');
            confLinkLengthk.removeAttribute('data-href');
        } else if (confLinkLengthk.hasAttribute('data-default-search-btn-link')) {
            hrefAttr = confLinkLengthk.getAttribute('data-default-search-btn-link');
        }
        confLinkLength[k].setAttribute('type', 'button');
        confLinkLength[k].setAttribute('href', hrefAttr || '');
    }
}
function CallshowPage(currentPage, cardVariation, limitPerPage){
    if (cardVariation) {
        $("#event-listing-filter .o-search-res__results--view .a-card-result__cardrow").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
    } else {
        $("#event-listing-filter .o-search-res__results--view .a-list-result__listview").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
    }
}
function callEventListing(cardVariation, listVariation, limitPerPage){
    if (cardVariation) {
        if ($("#event-listing-filter .o-search-res__results--view .a-card-result__cardrow").length <= limitPerPage) {
            $("#event-listing-filter").find(".event-results-list .pagination-main").css("display", "none");
        } else {
            $("#event-listing-filter").find(".event-results-list .pagination-main").css("display", "block");
        }
    } else if (listVariation) {
        if ($("#event-listing-filter .o-search-res__results--view .a-list-result__listview").length <= limitPerPage) {
            $("#event-listing-filter").find(".event-results-list .pagination-main").css("display", "none");
        } else {
            $("#event-listing-filter").find(".event-results-list .pagination-main").css("display", "block");
        }
    }
}

function callEventListingFilter(cardVariation){
  if (cardVariation) {
       return ($("#event-listing-filter .o-search-res__results--view .a-card-result__cardrow").length);
  } else {
      return ($("#event-listing-filter .o-search-res__results--view .a-list-result__listview").length);
  }
}
function callTostingEventDateString(eventDuration, indexedDate){
    if (eventDuration === 0) {
        return (`${indexedDate.toString().split(' ').slice(1, 4).toString().replace(',', ' ').replace(',', ', ')}`);
    } else {
        return (`${indexedDate.toString().split(' ').slice(1, 4).toString().replace(',', ' ').replace(',', ', ')} - ${new Date(+indexedDate.setDate(indexedDate.getDate() + eventDuration)).toString().split(' ').slice(1, 4).toString().replace(',', ' ').replace(',', ', ')}`);
    }
}

function getPageList(totalPages, page, maxLength) {
    if (maxLength < 5)
        throw new Error("maxLength must be at least 5");
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_,i)=>i + start);
    }
    let sideWidth = maxLength < 9 ? 1 : 2;
    let leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    let rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
    if (totalPages <= maxLength) {
        // no breaks in list
        return range(1, totalPages);
    }
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        // no break on left of page
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        // no break on right of page
        return range(1, sideWidth).concat(range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }
    // Breaks on both sides
    return range(1, sideWidth).concat(range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}