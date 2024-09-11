$(document).ready(function() {

 let orderPageHTML = `<nav aria-label="Order navigation" class="paginationNav">
                        <ul class="orderpagination"></ul>
            			</nav>`;
 $( orderPageHTML ).insertAfter( "#profileOrder .text" );
});


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

function orderPagination(){
	let numberOfItems = $('#profileOrder table tr').length;
    let limitPerPage = 10;
    let totalPages = Math.ceil(numberOfItems/limitPerPage);
    let paginationSize = 6;
    let currentPage;

    if(numberOfItems < limitPerPage){
    		$(".paginationNav").hide();
        }

    function showPage(thisPage){
		if(thisPage < 1 || thisPage > totalPages){
            return false;
		}
        currentPage = thisPage;
        if (currentPage == 1){
			limitPerPage = limitPerPage+1;
            $("#profileOrder table tr").hide().slice((currentPage-1)*limitPerPage, currentPage*limitPerPage).show();
        }
        else{
            limitPerPage = 10;
             $("#profileOrder table tr").hide().slice(((currentPage-1)*limitPerPage)+1, (currentPage*limitPerPage)+1).show();
        }

		 $("#profileOrder table tr:first-child").css("display","table-row");
        $("nav .orderpagination li").slice(1, -1).remove();

        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
       	 	$("<li>").addClass("page-item").addClass(item ? "current-page" : "dots").toggleClass("active", item === currentPage).append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page");
        });

    	$(".previous-page").toggleClass("disable", currentPage === 1);
    	$(".next-page").toggleClass("disable", currentPage === totalPages);
    	return true;
    }

  	$("nav .orderpagination").append(
    	$("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link abt-icon slick-prev slick-arrow abt-icon-left-arrow").attr({href: "javascript:void(0)"})),
		$("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link abt-icon slick-next slick-arrow abt-icon-right-arrow").attr({href: "javascript:void(0)"})),
	);

	$("#profileOrder .text").show();
	showPage(1);

	$(document).on("click", ".orderpagination li.current-page:not(.active)", function(){
		return showPage(+$(this).text());
	});
    $(".next-page").on("click", function(){
        return showPage(currentPage + 1);
    });
	$(".previous-page").on("click", function(){
        return showPage(currentPage - 1);
    });

}