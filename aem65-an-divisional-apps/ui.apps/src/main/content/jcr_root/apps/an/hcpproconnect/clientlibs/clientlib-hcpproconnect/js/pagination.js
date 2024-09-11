function getPageList (totalPages, page, maxLength) {
  function range (start, end) {
  return Array.from(Array(end-start+1),(_,i) => i+start);
  }
  let sideWidth = maxLength <9 ? 1:2;
  let leftWidth = (maxLength - sideWidth * 2 - 3)>> 1;
let rightWidth = (maxLength - sideWidth * 2 - 3)>> 1;
  if (totalPages <= maxLength) {
  return range(1, totalPages);
  }

  if(page <= maxLength - sideWidth - 1 - rightWidth) {
  return range(1, maxLength-sideWidth-1).concat(0, range(totalPages-sideWidth+1, totalPages));
  }
  if(page >= totalPages-sideWidth-1-rightWidth) {
  return range(1, sideWidth).concat(0, range(totalPages-sideWidth-1-rightWidth-leftWidth, totalPages));
  }

  return range(1,sideWidth).concat(0, range(page-leftWidth, page+rightWidth), 0, range(totalPages-sideWidth+1, totalPages));
}

function showPagination(){
let numberOfItems = $(".matched").length;
  let limitPerPage = noOfCardsPerPage;
  let totalPages = Math.ceil(numberOfItems/limitPerPage);
  let paginationSize = 6;
  let currentPage;

  function showPage(thisPage){
  if(thisPage < 1 || thisPage > totalPages){
          return false;
  }
      currentPage = thisPage;

      $(".matched").hide().slice((currentPage-1)*limitPerPage, currentPage*limitPerPage).show();
      $("nav .pagination li").slice(1, -1).remove();

      getPageList(totalPages, currentPage, paginationSize).forEach(item => {
          $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots").toggleClass("active", item === currentPage).append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page");
      });

  //showing result counts per page
    let startIndex = 1;
      let endIndex = 0;
  endIndex = currentPage*limitPerPage;
  startIndex = endIndex - limitPerPage +1;
      if(endIndex > numberOfItems) {
            endIndex = numberOfItems;
       }

  $("#startIndex").text(startIndex);
      $("#endIndex").text(endIndex);
      $("#totalCount").text(numberOfItems);
  //showing result counts per page							 
    $(".previous-page").toggleClass("disable", currentPage === 1);
    $(".next-page").toggleClass("disable", currentPage === totalPages);
    return true;
  }

  $("nav .pagination").append(
    $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link abt-icon slick-prev slick-arrow abt-icon-left-arrow").attr({href: "javascript:void(0)"})),
  $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link abt-icon slick-next slick-arrow abt-icon-right-arrow").attr({href: "javascript:void(0)"})),
);

$(".contentfragmentlist section").show();
if(numberOfItems == 0){
      $('.pagination').hide();
      $('#sort-by-options').hide();
      $('#showResultCount').hide();
      $('#showZeroResults').show();
      $("#nosearchresultsfoundtext").show();
      $("#page-sort").css("padding-bottom", "0.5rem");		// HCP-478 to align horizontal line below show results
  }
  else if(numberOfItems <= limitPerPage){
      $('.pagination').hide();
      $('#showResultCount').show();
      $('#showZeroResults').hide();
      $('#sort-by-options').show();
      $("#startIndex").text(1);
      $("#endIndex").text(numberOfItems);
      $("#totalCount").text(numberOfItems)
  	  $("#nosearchresultsfoundtext").hide();
      $("#page-sort").css("padding-bottom", "0");		// HCP-478 to align horizontal line below show results
  }
  else{
      $("#nosearchresultsfoundtext").hide();
      $('.pagination').show();
      $('#showZeroResults').hide();
      $('#showResultCount').show();
      $('#sort-by-options').show();
      showPage(1);									// SB HCP- bugfix 419 1st page will be selected on load
      $("#page-sort").css("padding-bottom", "0");		// HCP-478 to align horizontal line below show results
  }

$(document).on("click", ".pagination li.current-page:not(.active)", function(){
  $('html, body').animate({ scrollTop: 0 }, 'fast');
      return showPage(+$(this).text());

});
  $(".next-page").on("click", function(){
  $('html, body').animate({ scrollTop: 0 }, 'fast');	// SB HCP - bugfix 400 scroll to top
      return showPage(currentPage + 1);

  });
$(".previous-page").on("click", function(){
  $('html, body').animate({ scrollTop: 0 }, 'fast');
      return showPage(currentPage - 1);
  });

}