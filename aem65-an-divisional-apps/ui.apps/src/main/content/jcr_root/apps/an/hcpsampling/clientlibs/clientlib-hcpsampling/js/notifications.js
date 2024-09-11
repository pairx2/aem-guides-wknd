let deletedBookmarks = [];
let deletedBookmarksUnRead;
const notification = $(".notification");
const notificationContainer = $("#my-resource-notification");
const notificationPopup = $("#my-resource-notification-popup");
const sectionNotificationPopup = $("#section-my-resource-notification-popup");

$(document).ready(function () {
  if (localStorage.getItem('userLoggedout') === 'false') {
    //Api call to fetch deleted bookmark list on page load
    bookmarkHeaders["x-id-token"] = (getSessionStorage('jwtToken') === null) ? JSON.parse(localStorage.getItem('localIdToken')) : getSessionStorage('jwtToken');
    let notificationRes = $.ajax({
      "url": urlOrigin + '/api/private/favourites?action=list_deleted',
      "method": "GET",
      "headers": bookmarkHeaders,
      "async": false
    });

    $(".desktop-notification").find("em").removeClass("abt-icon-down-arrow").addClass("abt-icon-bell");
    $($(".mobile-notification").find(".abt-icon-down-arrow")[0].parentElement).prepend("<em class='abt-icon abt-icon-bell' aria-hidden='true'></em>")
    notification.find("em.abt-icon-bell").append("<span class='badgeNotification'></span>");

    let notificationResponse = notificationRes?.responseJSON?.response;
    if (notificationResponse?.length) {
      deletedBookmarks = notificationResponse.sort((a,b) => a.read-b.read);
    }
    deletedBookmarksUnRead = deletedBookmarks.filter(bookmark => bookmark.read === false);
    if (deletedBookmarks.length > 0) {
      notification.removeClass("d-none");
      showNotificationBadge(deletedBookmarksUnRead.length);
      populateDropDownData(deletedBookmarks);
    } else {
      notification.addClass("d-none");
    }
    if ((deletedBookmarksUnRead.length > 0) && (window.location.href.includes("my-resources"))) {
      fetchBookmarkList();
      showNotificationPopup(deletedBookmarksUnRead);
    }

    notificationContainer.find("#btnSubmitRequest").on("click", acknowledgeNotifications);
    notificationContainer.find(".abt-icon-cancel").on("click", acknowledgeNotifications);
  }
});
//Api call to acknowledge read notifications
function acknowledgeNotifications() {
  closeNotificationPopup();
  showLoading();
  let data = {
    "action": "update_read_status",
    "ids": deletedBookmarksUnRead.map(bookmark => bookmark.id),
  }
  bookmarkHeaders["x-id-token"] = getSessionStorage('jwtToken');
  $.ajax({
    "url": urlOrigin + '/api/private/favourites',
    "method": "POST",
    "headers": bookmarkHeaders,
    "data": JSON.stringify(data),
  }).then(function (res) {

    if (res.response.statusReason === "Data has been committed successfully.") {
      showNotificationBadge(0);
      $(".unread-bookmark").addClass("read-bookmark").removeClass("unread-bookmark");
    } else {
      showError();
    }
    hideLoading();
  }).fail(function () {
    showError();
    hideLoading();
  });
}

//fucntion to close notification popup
function closeNotificationPopup() {
  sectionNotificationPopup.hide();
  sectionNotificationPopup.parents("body").find(".abbott-wrapper").removeClass("setZindex");
  sectionNotificationPopup.parents("body").find(".columncontrol__column").removeClass("setZindex");
  notificationPopup.hide();
}

//fucntion to show notification popup and populate dynamic data
function showNotificationPopup(unreadData) {
  let htmlStructure = unreadData.map(bookmark => `<li>${bookmark.title}</li>`).join('');
  $("#section-my-resources-popup-id").append('<ul>' + htmlStructure + '</ul>');
  sectionNotificationPopup.show();
  sectionNotificationPopup.parents("body").find(".abbott-wrapper").addClass("setZindex");
  sectionNotificationPopup.parents("body").find(".columncontrol__column").addClass("setZindex");
  notificationPopup.show();

  if (unreadData.length === 1) {
    notificationContainer.height("280px");
    notificationContainer.find(".a-button").css('margin-top', '15px')
  } else {
    notificationContainer.height("300px");
    notificationContainer.find(".a-button").css('margin-top', '30px')
  }
}

//Populate dynamic data in notification dropdown
function populateDropDownData(deletedData) {
  let htmlStructure = deletedData.map(bookmark =>
    `<li class= "notification-item m-link-stack__list-item ${bookmark.read === true ? 'read-bookmark' : 'unread-bookmark'}">
          <div class="a-link">
            <a href='/secure/my-resources.html' class="a-link__text" aria-label="Bell" role="link" target="_self">
              "${bookmark.title}" has been removed
            </a>
          </div>
         </li>`
  ).join('');
  notification.find(".m-link-stack__container").append('<ul class="m-link-stack__list">' + htmlStructure + '</ul>');
}

//fucntion to show badge count
function showNotificationBadge(count) {
  if (count > 0) {
    $(".badgeNotification").append('<span class="badge-count">' + count + '</span>');
  }
  else if (count === 0) {
    $(".badgeNotification .badge-count").remove();
  }
}