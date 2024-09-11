$(function () {
    if ($('#like-this-form form').length && isOnPublish()) {
        $('#like-this-form').parent().addClass('d-none');
    }
    //js code to match the same funtionality as in 6.3
    if ($("div.a-button").hasClass("a-button-corp--likebutton") && isOnPublish()) {
        const pagePath = window.location.pathname;
        const $likeButton = $('.a-button-corp--likebutton');
        const $btnButton = $('.a-button-corp--likebutton .btn');
        var html = '<div class="like-count">' +
            '<span class="count-number">1</span>' +
            '<span class="count-help-text"> likes</span>' +
            '</div>';
        $(".a-button-corp--likebutton").after(html);
        const $counterDiv = $likeButton.next('.like-count');
        const $countEl = $counterDiv.find('.count-number');

        const checkSessionOnLoad = checkIfLiked();

        if (checkSessionOnLoad == "true") {
            $likeButton.addClass('liked');
            $counterDiv.addClass('visible');
            $countEl.text(sessionStorage.getItem(pagePath + ":likeCount"));
        }

        $btnButton.on('click', function () {
            const check = checkIfLiked();
            if (check != "true") {
                addLikeCount(check);
            }
        });

        /**
        * @function
        * Summary: Function to check whether the article is already liked
        */
        function checkIfLiked() {
            if (typeof (Storage) !== "undefined") {
                var likeArticle = sessionStorage.getItem(pagePath);
            }
            return likeArticle;
        }

        /**
        * @function
        * Summary: Function to add a like to the article
        * Parameters: check - {boolean} - check to compare with boolean true/false
        */
        function addLikeCount(check) {
            if (check != "true") {
                $likeButton.addClass('liked');
                postLikeCount();
            }
        }

        /**
        * @function
        * Summary: Function to invoke the form component submit button which internally makes ESL call
        */
        function postLikeCount() {
            const likeThisForm = $('#like-this-form')
            if (likeThisForm.length) {
                let formSubmitButton = likeThisForm.find('.o-form-container__buttons button[type="submit"]');
                formSubmitButton.removeAttr('disabled');
                formSubmitButton[0].click();
            }
        }
    }

    // Scroll up button functionality
    if ($('.button-variation--scroll-up').length && isOnPublish()) {

        let scrollUpButton = document.getElementById('page-scroll-top').parentNode;
        let footerHeight, documentHeight, pageHeight, buttonStopPos;

        window.onscroll = scrollTrack;
        scrollUpButton.onclick = scrollToTop;

        // When the user scrolls down 20px from the top of the document, show the button
        function scrollTrack() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollUpButton.style.display = "block";
            } else {
                scrollUpButton.style.display = "none";
            }
        }

        // Function to scroll the page to the top
        function scrollToTop() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        }

        setTimeout(function () {
            // footer = $('.footer').offset().top;
            footerHeight = +$('.footer').height();
            documentHeight = document.body.scrollHeight;
            pageHeight = window.innerHeight;
            buttonStopPos = documentHeight - footerHeight;
        }, 3000);

        // Scroll event to check the screen position and stick the button at the bottom or above the footer
        $(document).on('scroll', function () {

            if (($(document).scrollTop() + pageHeight) > buttonStopPos) {
                $('#page-scroll-top').parent().attr('style', 'top: ' + (buttonStopPos - 100) + 'px').css('position', 'absolute');
            } else {
                $('#page-scroll-top').parent().attr('style', 'bottom: 20px').css('position', 'fixed');
            }
        });
    }
    // Implemented back button functionality for icon component
    const backButton = $('.btn-back--to-previous a');
    if (backButton.length && isOnPublish()) {
        backButton.on('click', function (e) {
            e.preventDefault();
            window.history.back();
        });
    }
});