
$(document).ready(function() {
    $('#resultCount input[name="FLAVORS"').prev().addClass('flavour-list');
    $('.o-search-res__results--view').parent('.col-md-9').prepend('<h2>OUR FAVORITE RECIPES</h2>');
    $('.filter-title h4').text('Find a yummy recipe.');
    $('.search-filter').append('<div class="filter-recipes">Filter Recipes</div>'); 
    $('#search-filter').attr('placeholder', 'Search Recipes');
    $(document).on('click', '.filter-recipes', function() {
        if (!$('#SPECIAL').length > 0) {
            $('input[name="SPECIAL OCCASIONS"]').attr('id', 'SPECIAL');
        }        
        $('.m-link-stack--header, .m-search-category__form').slideToggle();
        $(this).toggleClass('active');
    });
});