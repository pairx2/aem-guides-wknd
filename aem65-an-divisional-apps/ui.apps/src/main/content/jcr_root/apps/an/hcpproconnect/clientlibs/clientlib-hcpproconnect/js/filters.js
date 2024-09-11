$(document).ready(function() {

    // check if title class added
    if($("#product-resource").length && $('#product-resource-title').length == 0){
        if($('.abbott-breadcrumb').find('.container').length) {
            $("#product-resource").parents('.aem-Grid').find('> .container:first-child').addClass('py-0');
        } else {
            $("#product-resource").parents('.aem-Grid').find('> .container:first-child').addClass('pb-0');
        }
    } 

// Mobile filter
    $("#product-resource .col-md-3").attr("id","sideFilter");
    $("#product-resource .col-md-9").attr("id","rightPanel");
    let closeHTML = `

						<button id="sidebarClose" class="btn abt-icon slick-prev slick-arrow abt-icon-left-arrow rounded-0 d-block d-sm-none px-0 mb-4" aria-label="Close">
                         <span>Back</span>
                        </button>

    `;
    let applyHTML = `

						<button id="sidebarClose" class="btn rounded-pill d-block d-sm-none px-0 my-4 applyButton" aria-label="Close">
                         <span>APPLY FILTER</span>
                        </button>

    `;
	$("#product-resource .col-md-3").prepend(closeHTML);
    $("#sideFilter").append(applyHTML);

    $("#sidebarCollapse,#sidebarClose").on('click', function() {
		$("#sideFilter").toggleClass('active');
        $("#rightPanel").toggleClass('hideRight');
        $("#product-resource-title").toggleClass('d-none');

    });
});

function expandFilter(){

    let downIcon = '<em class="abt-icon abt-icon-down-arrow p-1 downIcon"></em>';
    let upIcon = '<em class="abt-icon abt-icon-up-arrow p-1 upIcon"></em>';

    let beforeDiet = '<div class="collapse" id="collapseDiet"></div>';
    let beforeProducts = '<div class="collapse" id="collapseProducts"></div>';
    let beforeBrands = '<div class="collapse" id="collapseBrands"></div>';
    let beforeClinical = '<div class="collapse" id="collapseClinical"></div>';
    let beforeFormat = '<div class="collapse" id="collapseFormat"></div>';

    let beforeAge = '<div class="collapse" id="collapseAge"></div>';
    let beforeContent = '<div class="collapse" id="collapseContent"></div>';

    let beforeFor = '<div class="collapse" id="collapseFor"></div>';
    let beforeSolutions = '<div class="collapse" id="collapseSolutions"></div>';

    $("#dietary-options .a-checkbox").slice(2).wrapAll(beforeDiet);
    $("#productbreakdown-options .a-checkbox").slice(2).wrapAll(beforeProducts);
    $("#brands-options .a-checkbox").slice(2).wrapAll(beforeBrands);
    $("#clinical-options .a-checkbox").slice(2).wrapAll(beforeClinical);
    $("#format-options .a-checkbox").slice(2).wrapAll(beforeFormat);

    $("#age-range-options .a-checkbox").slice(2).wrapAll(beforeAge);
    $("#content-type-options .a-checkbox").slice(2).wrapAll(beforeContent);
    $("#clinical-areas-options .a-checkbox").slice(2).wrapAll(beforeClinical);
    $("#for-options .a-checkbox").slice(2).wrapAll(beforeFor);
    $("#clinical-solutions-options .a-checkbox").slice(2).wrapAll(beforeSolutions);

    $(".button #view-all-filters-diet").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseDiet"}).append(downIcon).append(upIcon);
	$(".button #view-all-filters-products").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseProducts"}).append(downIcon).append(upIcon);
    $(".button #view-all-filters-brands").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseBrands"}).append(downIcon).append(upIcon);
    $(".button #view-all-filters-clinical").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseClinical","role":"button","aria-controls":"collapseClinical"}).append(downIcon).append(upIcon);
	$(".button #view-all-filters-format").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseFormat"}).append(downIcon).append(upIcon);

	$(".button #view-all-filters-age").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseAge"}).append(downIcon).append(upIcon);
	$(".button #view-all-filters-content").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseContent"}).append(downIcon).append(upIcon);
    $(".button #view-all-filters-clinical-areas").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseClinical"}).append(downIcon).append(upIcon);
    $(".button #view-all-filters-for").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseFor"}).append(downIcon).append(upIcon);
    $(".button #view-all-filters-solutions").attr({"data-toggle":"collapse","aria-expanded":"false","data-target":"#collapseSolutions"}).append(downIcon).append(upIcon);

    $(".button #view-all-filters-diet").toggle($("#dietary-options .a-checkbox").length>2);
	$(".button #view-all-filters-products").toggle($("#productbreakdown-options .a-checkbox").length>2);
    $(".button #view-all-filters-brands").toggle($("#brands-options .a-checkbox").length>2);
    $(".button #view-all-filters-clinical").toggle($("#clinical-options .a-checkbox").length>2);
    $(".button #view-all-filters-format").toggle($("#format-options .a-checkbox").length>2);

	$(".button #view-all-filters-age").toggle($("#age-range-options .a-checkbox").length>2);
    $(".button #view-all-filters-content").toggle($("#content-type-options .a-checkbox").length>2);
    $(".button #view-all-filters-clinical-areas").toggle($("#clinical-areas-options .a-checkbox").length>2);
    $(".button #view-all-filters-for").toggle($("#for-options .a-checkbox").length>2);
    $(".button #view-all-filters-solutions").toggle($("#clinical-solutions-options .a-checkbox").length>2);

    if($('.ph-enhanced-filters').length) {
        initEnhancedFilters();
    }

    /** START SB HCP-490 collapsing view all button ***/

    initViewAllFilters();

    /**** END ******/

}

function initEnhancedFilters() {
    initEnhancedFilter("collapseDiet", "view-all-filters-diet");
    initEnhancedFilter("collapseProducts", "view-all-filters-products");
    initEnhancedFilter("collapseBrands", "view-all-filters-brands");
    initEnhancedFilter("collapseClinical", "view-all-filters-clinical");
    initEnhancedFilter("collapseFormat", "view-all-filters-format");

    initEnhancedFilter("collapseAge", "view-all-filters-age");
    initEnhancedFilter("collapseContent", "view-all-filters-content");
    initEnhancedFilter("collapseClinical", "view-all-filters-clinical-areas");
    initEnhancedFilter("collapseFor", "view-all-filters-for");
    initEnhancedFilter("collapseSolutions", "view-all-filters-solutions");
}

function initEnhancedFilter(collapseId, viewAllfiltersId) {
    $(`.button #${viewAllfiltersId}`).click();
    $(`#${collapseId}`).addClass('show');
    $(`#${viewAllfiltersId} .downIcon`).toggleClass('d-none');
    $(`#${viewAllfiltersId} .upIcon`).toggleClass('d-inline');
}

function initViewAllFilters() {
    onClickViewAllFilter("collapseDiet", "view-all-filters-diet");
    onClickViewAllFilter("collapseProducts", "view-all-filters-products");
    onClickViewAllFilter("collapseBrands", "view-all-filters-brands");
    onClickViewAllFilter("collapseClinical", "view-all-filters-clinical");
    onClickViewAllFilter("collapseFormat", "view-all-filters-format");
    onClickViewAllFilter("collapseAge", "view-all-filters-age");
    onClickViewAllFilter("collapseContent", "view-all-filters-content");
    onClickViewAllFilter("collapseClinical", "view-all-filters-clinical-areas");
    onClickViewAllFilter("collapseFor", "view-all-filters-for");
    onClickViewAllFilter("collapseSolutions", "view-all-filters-solutions");
}

function onClickViewAllFilter(collapseId, viewAllfiltersId) {
    $(`.button #${viewAllfiltersId}`).on("click", function() {
        if($(`#${collapseId}`).hasClass('show')) {
            $(`#${collapseId}`).toggleClass('d-none');
        }

        $(`#${viewAllfiltersId} .downIcon`).toggleClass('d-none');
        $(`#${viewAllfiltersId} .upIcon`).toggleClass('d-inline');
    });
}