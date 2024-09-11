/**********************************
customtextlist component
**********************************/
//js code to add background color to the list to match with 6.3 look and feel
$(document).ready(function () {

  const currentPagePath = window.location.pathname;
  if ($('.categoryfilterlist').length > 0) {
    $('.m-custom-list__wrapper .m-custom-list__content a').removeAttr('target');
    $('.m-custom-list__wrapper .m-custom-list__content a').each(function () {
      // Adding below code to dynamically add color classnames to category filter links
      const categoryFilterFullText = $(this).text();
      const categoryFilterMainText = categoryFilterFullText.split('{{')[0];
      const categoryFilterBGClass = categoryFilterFullText.split('{{').length > 1 ? categoryFilterFullText.split('{{').pop().split('}}')[0] : '';
      $(this).text(categoryFilterMainText);
      $(this).parent().addClass(categoryFilterBGClass);
      if ($(this).attr('href') == currentPagePath) {
        //class added to give background color and text color to active link 
        $(this).parent().addClass('customtextlist-category--active-link-grey')
      }
    });
  }

  if (($('.content-fragment-medialibrary').length && $('.medialibrary-custom-text-list').length) && isOnPublish()) {
    // add background color to the active category
    $('.customtextlist .m-custom-list__title a').on('click', function () {
      $('.customtextlist .m-custom-list__title a').parent().removeClass('customtextlist-category--active-link');
      $(this).parent().addClass('customtextlist-category--active-link');
    });
    // display respective cards on click of each category
    $('.customtextlist .m-custom-list__title a').each(function () {
      let customListTitleLink = $(this);
      let customId = customListTitleLink.parents('.m-custom-list__content').find('.m-custom-list__para p').text();
      let trimmedCustomId = customId.replaceAll('{{', '').replaceAll('--link}}', '--container');
      $(this).parent().append(`<span class="media-library--article-length"></span>`);
      customListTitleLink.on('click', function (e) {
        e.preventDefault();
        toggleMediaLibraryContainers(trimmedCustomId);
      });
      // display number of cards for each category
      $('div[id*="media-library"]').each(function () {
        let countLength = $(this).find('.cmp-contentfragment').length;
        let parentId = $(this).attr('id');
        if (trimmedCustomId == parentId) {
          customListTitleLink.parent().find('.media-library--article-length').text(countLength);
        }
      });
    });
    // on page load display the 1st container and highlight the active category
    $(window).on("load", function () {
      $('.m-custom-list__content:first-child').find('.m-custom-list__title').addClass('customtextlist-category--active-link');
      var firstId = $('.m-custom-list__content:first-child').find('.m-custom-list__para p').text();
      let trimmedfirstId = firstId.replaceAll('{{', '').replaceAll('--link}}', '--container');
      toggleMediaLibraryContainers(trimmedfirstId);
    });

    function toggleMediaLibraryContainers(customListId) {
      $('div[id*="media-library"]').each(function () {
        if ($(this).attr('id') == customListId) {
          $(this).removeClass('d-none');
        } else {
          $(this).addClass('d-none');
        }
      });
    }
  }

  //class added to give background color and text color to active link for redesign button component
  if ($('.customtextlist-redesign-button').length > 0 && isOnPublish()) {
    $('.m-custom-list__wrapper .m-custom-list__content a').removeAttr('target');
    $('.m-custom-list__wrapper .m-custom-list__content a').each(function () {
      if ($(this).attr('href') == currentPagePath) {
        $(this).parent().addClass('customtextlist-redesign-button--active-link')
      }
    });
  }
});