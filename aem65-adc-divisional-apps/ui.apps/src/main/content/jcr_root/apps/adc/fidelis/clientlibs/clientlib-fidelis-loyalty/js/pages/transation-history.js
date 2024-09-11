$(document).ready(function () {
    // **************************
    // MY POINTS AND BADGES PAGE
    // **************************
    const mfsTransationTable = $('#mfs-transaction-table');
    if(mfsMyPointsAndBadgesPage.length > 0 && mfsTransationTable.length > 0){
        const loader = '<div class="skeleton-loader-container">'+
            '<div class="skeleton-loader"></div><div class="skeleton-loader"></div>'+
            '<div class="skeleton-loader"></div><div class="skeleton-loader"></div>'+
            '<div class="skeleton-loader"></div><div class="skeleton-loader"></div>'+
        '</div>';
        if(mfsTransationTable.find('.skeleton-loader-container').length <= 0) {
        $(loader).insertAfter(mfsTransationTable.find('.m-custom-table__content'));
        }
    }
})  