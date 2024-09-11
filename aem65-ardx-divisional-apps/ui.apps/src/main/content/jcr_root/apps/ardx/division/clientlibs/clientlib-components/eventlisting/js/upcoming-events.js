$(document).ready(function () {
  let upComingEventsCheck = document.getElementById('upcoming-events');
  let regExMatchValue = /\{(.*?)\}/gm;
if(upComingEventsCheck){
  let upcoming_ent_incr = 0;
  let upcomingEventOption = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata" 
  };
  let upcomingEvent_load = setInterval(function () { 
      upcoming_ent_incr = upcoming_ent_incr+1000;
      if(upcoming_ent_incr===5000 || window.sessionStorage.getItem("searchResult") !==null)
      {
          clearInterval(upcomingEvent_load);  
          allEventsShow(regExMatchValue, upcomingEventOption);
          callUpcomingEventsId();
      }
    }, 1000);  
}
  $("#section-upcoming-events").parent().addClass("color-darkgrey");
});
function callUpcomingEventsId(){
  let confLinkLength = document.querySelector('#upcoming-events')
    .querySelectorAll('.a-result__link');
    let hrefAttr;
    for(const element of confLinkLength){
      if(element.hasAttribute('data-href')){
        hrefAttr = element.getAttribute('data-href');
        element.removeAttribute('data-href');
      }
      else if(element.hasAttribute('data-default-search-btn-link'))
      {
        hrefAttr = element.getAttribute('data-default-search-btn-link');
      }        
      element.setAttribute('type','button');
      element.setAttribute('target','_blank');
      element.setAttribute('href', hrefAttr || '');
    }  
  let imageSrc = document.querySelector('#upcoming-events')
  .querySelectorAll('.a-card-result__cardrow');
  for(const element of imageSrc){
    if(element.querySelector('.a-card-result__image').getAttribute('src')==null){
      element.querySelector('.a-card-result__image').style.display='none';
    }
  }
}
function allEventsShow(regExMatchValue, upcomingEventOption) {
            
  $("#upcoming-events")
  .find(".d-flex.search-results-container")
  .remove();
  $("#upcoming-events")
  .find(".o-search-res__container .col-md-3.p-0")
  .remove();
  $("#upcoming-events")
  .find(".o-search-res__container .col-md-9")
  .removeClass("col-md-9").addClass("col-md-12");  
$("#upcoming-events").find($(".result-items")).remove();
sectionUpcomingEvents();

let jsonData = JSON.parse(window.sessionStorage.getItem("searchResult"))?.response?.results?.sort((a,b)=>a.eventdate - b.eventdate);
  function durationArray(element){
    let eventDuration = parseInt(element.duration-1);          
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
     
      let upcomingEventStartDate = new Date(element.eventdate)
      upcomingEventStartDate = upcomingEventStartDate.toLocaleDateString("en",upcomingEventOption);

      window.dateArray = getDates(new Date(upcomingEventStartDate), (new Date(upcomingEventStartDate)).addDays(eventDuration));
}
  let todaysDate = new Date().toLocaleDateString("en",upcomingEventOption);
  let sum = 0;
  if(jsonData){
      for (const element of jsonData) {
        let upcomingEventStartDateNew = new Date(element.eventdate)
        upcomingEventStartDateNew = upcomingEventStartDateNew.toLocaleDateString("en",upcomingEventOption);
        let indexedDate = new Date(upcomingEventStartDateNew);
        let eventDurations = parseInt(element.duration-1);
        let tempStrTitleUpEvents = document.querySelector('#upcoming-events')
        .querySelector('#result-temp').content.
        querySelector('.result-items .a-card-result__title')
        .outerHTML;
        let tempStrDescripUpEvents = document.querySelector('#upcoming-events')
        .querySelector('#result-temp').content.
        querySelector('.result-items .a-card-result__description').
        outerHTML;
        let tempStrImagesUpEvents = document.querySelector('#upcoming-events')
        .querySelector('#result-temp').content.
        querySelector('.result-items .a-card-result__image').
        outerHTML;
        let buttonUPEvents = document.querySelector('#upcoming-events')
        .querySelector('#result-temp').content.
        querySelector('.result-items .a-card-result__link')
        .outerHTML;
        let templateStrTitleUpEvents = [];
        let titleMatches = tempStrTitleUpEvents.match(regExMatchValue); 
        callTitleMatch(titleMatches, tempStrTitleUpEvents, templateStrTitleUpEvents, element);                 
        let templateStrDescUpEvents = [];
        let DescMatches = tempStrDescripUpEvents.match(regExMatchValue);
        callDescMatches(DescMatches, tempStrDescripUpEvents, templateStrDescUpEvents, element);
        let templateStrImageUpEvents = [];
        let imageMatch = tempStrImagesUpEvents.match(regExMatchValue);
        callImageMatch(imageMatch, tempStrImagesUpEvents, templateStrImageUpEvents, element);
        let templateButtonUpEvents = [];
        let imageMatches = buttonUPEvents.match(regExMatchValue);
        callImageMatches(imageMatches, buttonUPEvents, templateButtonUpEvents, element);  
        durationArray(element);
        for(const elem of window.parent.dateArray){
          let unformatedDate = elem.toLocaleDateString("en",upcomingEventOption);
          
          if(new Date(todaysDate) <= new Date(unformatedDate)){

            let upcomingEventDateString = calleventDuration(eventDurations, indexedDate);
            
            $("#upcoming-events").find(".o-search-res__results--view")
            .append(`<div class="a-card-result a-card-result__cardrow col-md-6 col-lg-4 col-sm-12" style='display:none'>
            <div class="inner-div">
            ${templateStrImageUpEvents}
            ${templateStrTitleUpEvents}                
            <span class="events-span">
            ${upcomingEventDateString}
            </span><br>
            <span class="events-span">
            ${element.eventlocation}
            </span></br>
            <span class="events-span">
            ${templateStrDescUpEvents}
            </span></br>             
            <div class='conf-button'>
            ${templateButtonUpEvents}
            </div>`);                        
            sum = sum+window.parent.dateArray.length; 
            break;
          }
        }          
    }
  }
  callUpcomingEventsSum(sum);      
// Pagination for all future events....
   searchResultFilter();
  
}
function callTitleMatch(titleMatches, tempStrTitleUpEvents, templateStrTitleUpEvents, element){
  if(titleMatches!=null){
    titleMatches.forEach(function(match) {
      window.titleKeyUpEvents =  match.replace("{", "").replace("}", "");
      let reg = new RegExp(match,"gm");
      tempStrTitleUpEvents = tempStrTitleUpEvents.replace(reg, element[titleKeyUpEvents] || "");    
      tempStrTitleUpEvents = `<a href="${element.relatedsiteurl || ''}" target="_blank">${tempStrTitleUpEvents}</a>`;      
    });
  }  
  templateStrTitleUpEvents.push(tempStrTitleUpEvents);
}
function callDescMatches(DescMatches, tempStrDescripUpEvents, templateStrDescUpEvents, element){
  if(DescMatches!=null){
    DescMatches.forEach(function(match) {
      let key =  match.replace("{", "").replace("}", "");
      let reg = new RegExp(match,"gm");
      tempStrDescripUpEvents = tempStrDescripUpEvents.replace(reg, element[key] || "");        
    });
  } 
  templateStrDescUpEvents.push(tempStrDescripUpEvents);
}
function callImageMatch(imageMatch, tempStrImagesUpEvents, templateStrImageUpEvents, element){
  if(imageMatch!=null){
    imageMatch.forEach(function(match) {
      let key =  match.replace("{", "").replace("}", "");
      let reg = new RegExp(match,"gm");
      tempStrImagesUpEvents = tempStrImagesUpEvents.replace(reg, element[key] || "");        
    });
  }          
  templateStrImageUpEvents.push(tempStrImagesUpEvents);
}
function callImageMatches(imageMatches, buttonUPEvents, templateButtonUpEvents, element){
  if(imageMatches!=null){
    imageMatches.forEach(function(match) {
      let key =  match.replace("{", "").replace("}", "");
      let reg = new RegExp(match,"gm");
      buttonUPEvents = buttonUPEvents.replace(reg, element[key] || "");        
    });
  }          
  templateButtonUpEvents.push(buttonUPEvents);
}
function searchResultFilter(){
  $(function () {
    let numberOfItems = $(
      "#upcoming-events .o-search-res__results--view .a-card-result__cardrow"
    ).length;
    let limitPerPage = $('#upcoming-events').find('.o-search-results-filter .container').attr('data-page-size');
    let totalPages = Math.ceil(numberOfItems / limitPerPage);
    let currentPage;
    function showPage(whichPage) {
      if (whichPage < 1 || whichPage > totalPages) return false;
      currentPage = whichPage;
      $("#upcoming-events .o-search-res__results--view .a-card-result__cardrow")
        .hide()
        .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
        .show();
      return true;
    } 
    $('#upcoming-events').find(".o-search-res__results--view").show();
    showPage(1);       
  });
}
function calleventDuration(eventDurations, indexedDate){
  
  if(eventDurations === 0 ){
    return `${indexedDate.toString().split(' ').slice(1,4).toString().replace(',',' ').replace(',',', ')}`
  }
  else {
    return  `${indexedDate.toString().split(' ').slice(1,4).toString().replace(',',' ').replace(',',', ')} - ${new Date(+indexedDate.setDate(indexedDate.getDate() + eventDurations)).toString().split(' ').slice(1,4).toString().replace(',',' ').replace(',',', ')}`
  }
}
function callUpcomingEventsSum(sum){
   if(sum==0){
    if($('.cq-Editable-dom').length > 0){
      $("#section-upcoming-events").find('.o-search-res__results--view').css("display","none");
    }else{
      $("#section-upcoming-events").css("display","none");
    }
  } 
}
function sectionUpcomingEvents(){
  if($('.cq-Editable-dom').length > 0){
    if(window.sessionStorage.getItem("searchResult")==null){
      $("#section-upcoming-events").find(".o-search-res__results--view").css("display","none");
    }else{
      $("#section-upcoming-events").find(".o-search-res__results--view").css("display","block");
    }
  }else{
    if(window.sessionStorage.getItem("searchResult")==null){
      $("#section-upcoming-events").css("display","none");
    }else{
      $("#section-upcoming-events").css("display","block");
    }
  }
}
