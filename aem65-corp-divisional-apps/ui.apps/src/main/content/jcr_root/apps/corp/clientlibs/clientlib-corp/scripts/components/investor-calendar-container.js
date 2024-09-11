$(document).ready(function () {
    if ($('.investor-calendar-container').length && isOnPublish()) {
        $('.investor-calendar-container .investor-calendar-container__content .investor-release--content-wrapper .investor-release--content-item').each(function () {
            const completeDate = $(this).find('.investor-release--content-item__complete-date p').text();
            if (!completeDate) {
                $(this).find('.investor-release--content-item__date').addClass('investor-release--content-item__date--empty');
            }
            $(this).find('.investor-release--content-item__complete-date').css('display', 'none');
            let monthPlaceholder = $(this).find('.investor-release--content-item__month p');
            let yearPlaceholder = $(this).find('.investor-release--content-item__year p');
            const date = completeDate ? new Date(completeDate) : '';
            const year = date ? date.getFullYear() : '';
            const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = date ? monthArray[date.getMonth()] : '';
            const day = date ? date.getDate() : '';
            const monthAndDayString = month.concat(" ").concat(day);
            monthPlaceholder.text(monthAndDayString);
            yearPlaceholder.text(year);
        })
    }
});