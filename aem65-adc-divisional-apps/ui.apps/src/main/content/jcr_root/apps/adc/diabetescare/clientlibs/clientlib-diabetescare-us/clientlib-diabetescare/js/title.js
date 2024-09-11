function moveRuler(){
    $('.dtc-text-ruler').appendTo('.dtc-section-title-holder');
}

function addPdfIcon(){
	$('.a-container-dc-table-section').find('table td a').empty().append('<em class="abt-icon abt-icon-pdf" aria-hidden="true"></em>');
}

moveRuler();
addPdfIcon();
$('.abt-icon-search').on('click', function (e) {
    let searchURL = $(this).closest('form').attr('action');
    return onSearchEnter(searchURL);
});

function onSearchEnter(searchURL) {
    let searchtext = $('.a-search__input').val();
    let searchInputName = $('.a-search__input').attr('name');
    window.location.href = searchURL + "?" + searchInputName + "=" + searchtext;
}
