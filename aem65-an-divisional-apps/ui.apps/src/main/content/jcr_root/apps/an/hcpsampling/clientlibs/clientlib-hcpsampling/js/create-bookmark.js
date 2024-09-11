let url = searchUserurl;
let urlOrigin = searchUserurlOrigin;
let currentPageIds = [];
let bookmarkedItems = [];
let popupItem;
let saveBookmarkId;
let deleteBookmarkId;
let cancelBtn = ".abt-icon-cancel";
let savedText = $(".saved-page");
let saveThisPageText = $(".save-this-page");
let heartEnabled = $('#heart-icon-filled');
let heartDisabled = $('#heart-icon-unfilled');
let saveBookmarkConfirm = $("#saveBookmarkConfirm");
let deleteBookmarkConfirm = $("#deleteBookmarkConfirm");
let bookmarkableItems = document.querySelectorAll('.bookmarkable');
let saveContainer = saveBookmarkConfirm.find(".a-container__column");
let deleteContainer = deleteBookmarkConfirm.find(".a-container__column");
let bookmarkList = getSessionStorage('bookmark_list');

if (bookmarkableItems.length > 0) {
  bookmarkableItems.forEach(node => {
    $(node.parentElement).find(savedText).addClass("d-none");
    $(node.parentElement).find(saveThisPageText).addClass("d-none");
  });
}

let idToken = getSessionStorage('jwtToken');
if(idToken !== null){
   localStorage.setItem('localIdToken', JSON.stringify(idToken));
}
let bookmarkHeaders = {
  "x-application-id": xApplicationId,
  "x-country-code": xCountryCode,
  "x-preferred-language": xPreferredLanguage,
  "Content-Type": "application/json",
};

//Fetch bookmark list On page load only if session storage value is null or empty 
function fetchBookmarkList() {
  let bookmarkList;
  bookmarkHeaders["x-id-token"] = (getSessionStorage('jwtToken') === null) ? JSON.parse(localStorage.getItem('localIdToken')) : getSessionStorage('jwtToken');
  let response = $.ajax({
    "url": urlOrigin + '/api/private/favourites',
    "method": "GET",
    "headers": bookmarkHeaders,
    "async": false
  });

  if (response?.responseJSON?.response?.length) {
    bookmarkList = response.responseJSON.response;
  } else {
    bookmarkList = [];
  }
  setSessionStorage('bookmark_list', bookmarkList);
}

//Api call to delete bookmark and change icon color
function deleteBookmark(arr, afterDeleteFunc) {
  showLoading();
  let data = {
    "action": "delete",
    "ids": arr,
  }
	bookmarkHeaders["x-id-token"] = getSessionStorage('jwtToken');
  $.ajax({
    "url": urlOrigin + '/api/private/favourites',
    "method": "POST",
    "headers": bookmarkHeaders,
    "data": JSON.stringify(data),
  }).then(function (res) {
    hideLoading();
    if (res.response.statusReason === "Data has been committed successfully.") {
      afterDeleteFunc();
    } else {
      showError();
    }
  }).fail(function () {
    showError();
    hideLoading();
  });
}

$(document).ready(function () {

  if (localStorage.getItem('userLoggedout') === 'false') {
    if (bookmarkList === null || bookmarkList.length === 0) {
      fetchBookmarkList();
    }

    alignPopups();

    bookmarkList = getSessionStorage('bookmark_list');
    //Fetch current page ids and append grey heart icon
    if (bookmarkableItems.length > 0) {
      bookmarkableItems.forEach(node => {
        currentPageIds.push(node.dataset.pageId);
        heartDisabled.clone().prependTo(node.parentElement);
        $(node.parentElement).find(saveThisPageText).removeClass("d-none");
      });
    }

    //Map page ids with response ids. Append blue heart icon if id is matched
    if (currentPageIds.length > 0 && bookmarkList.length > 0) {
      bookmarkedItems = currentPageIds.filter(item => bookmarkList.some(obj => obj.pageId === item));
      bookmarkableItems.forEach(node => {
        if (bookmarkedItems.includes(node.dataset.pageId)) {
          const sfdcId = bookmarkList.filter(list => list.pageId === node.dataset.pageId)[0]["id"];
          node.parentNode.firstChild.remove();
          node.setAttribute('data-sfdc-id', sfdcId);  //Adding sfdc-id in attribute
          heartEnabled.clone().prependTo(node.parentElement);
          $(node.parentElement).find(saveThisPageText).addClass("d-none");
          $(node.parentElement).find(savedText).removeClass("d-none");
        }
      }
      );
    }

    alignHeartIcon();

    //Bind click event on all grey heart icons
    document.querySelectorAll("#heart-icon-unfilled").forEach(node =>
      $(node).find('a').on("click", showSaveConfirmation)
    )

    //Bind click event on all blue heart icon
    document.querySelectorAll("#heart-icon-filled").forEach(node =>
      $(node).find('a').on("click", showDeleteConfirmation)
    )

    //Bind events for save confirmation popup
    saveBookmarkConfirm.find(cancelBtn).on("click", hideSaveConfirmation);
    saveBookmarkConfirm.find("#btnCancelSubmitRequest").on("click", hideSaveConfirmation);
    saveBookmarkConfirm.find("#btnSubmitRequest").on("click", saveBookmark);

    //Bind events for delete confirmation popup
    deleteBookmarkConfirm.find(cancelBtn).on("click", hideDeleteConfirmation);
    deleteBookmarkConfirm.find("#btnSubmitRequest").on("click", unBookmarkItem);

    //Bind event for error and removal confirmed popup
    $("#common-error-popup").find(cancelBtn).on("click", hideError);
    $("#removal-confirmed").find(cancelBtn).on("click", hidePopup);
  }
});

function alignPopups() {
  for (popupItem of saveContainer) {
    popupItem.classList.remove("col-md-6");
    popupItem.classList.add("col-md-4");
  }

  for (popupItem of deleteContainer) {
    popupItem.classList.remove("col-lg-4");
    popupItem.classList.add("col-lg-6");
  }
}

function alignHeartIcon() {
  document.querySelectorAll(".m-card__wrapper .m-card__body").forEach(node => {
    for (let i = 0; i < $(node).find(".bookmarkable").length; i++) {
      $($(node).find(".bookmark-container")[0]).prependTo($(node).find(`.cta${i + 1}`))
    }
  })

  document.querySelectorAll(".customtextlist .m-custom-list__title").forEach(node => {
    if (!$(node).find(".bookmarkable").length > 0) {
      node.children[0].style.paddingLeft = '3rem';
    }
  })
}

function showSaveConfirmation(e) {
  let showConfirmationPopup = getSessionStorage('show_save_bookmark_popup');
  saveBookmarkId = $(e.currentTarget.parentElement.parentElement).find('a.bookmarkable').attr('data-page-id');
  if (showConfirmationPopup === null || showConfirmationPopup === true) {
    showConfirmation(saveBookmarkConfirm);
  } else {
    saveBookmark();
  }
}

function showDeleteConfirmation(e) {
  deleteBookmarkId = $(e.currentTarget.parentElement.parentElement).find('a.bookmarkable').attr('data-sfdc-id');
  showConfirmation(deleteBookmarkConfirm);
}

function hideSaveConfirmation() {
  let checkedValue = saveBookmarkConfirm.find("input.a-checkbox__input").is(':checked');
  checkedValue ? setSessionStorage('show_save_bookmark_popup', false) : setSessionStorage('show_save_bookmark_popup', true);
  hideConfirmation(saveBookmarkConfirm);
}

function hideDeleteConfirmation() {
  hideConfirmation(deleteBookmarkConfirm);
}

function hidePopup() {
  hideConfirmation($("#section-bookmarkRemoved"));
}

//Call to show confirmation popup
function showConfirmation(section) {
  $("#section-custom-popup-hidden").show();
  section.show();
}

//Call to hide confirmation popup
function hideConfirmation(section) {
  $("#section-custom-popup-hidden").hide();
  section.hide();
}

//Api call to save bookmark and change icon color on success
function saveBookmark() {
  if (getSessionStorage('show_save_bookmark_popup') !== false) {
    hideSaveConfirmation();
  }
  showLoading();
  let data = {
    "action": "create",
    "pageId": `${saveBookmarkId}`,
  }
	bookmarkHeaders["x-id-token"] = getSessionStorage('jwtToken');
  $.ajax({
    "url": urlOrigin + '/api/private/favourites',
    "method": "POST",
    "headers": bookmarkHeaders,
    "data": JSON.stringify(data),
  }).then(function (resp) {
    if (resp.response.sfdcId !== undefined) {
      let node = document.querySelector(`[data-page-id='${saveBookmarkId}']`)
      node.parentNode.firstChild.remove();
      heartEnabled.clone().prependTo(node.parentElement);
      $(node.parentNode.firstChild).find('a').on("click", showDeleteConfirmation);

      //set sfdc attribute value for node once bookmark is created
      node.setAttribute('data-sfdc-id', resp.response.sfdcId);
      $(node.parentElement).find(saveThisPageText).addClass("d-none");
      $(node.parentElement).find(savedText).removeClass("d-none");
      fetchBookmarkList();
    } else {
      showError();
    }
    hideLoading();
  }).fail(function () {
    showError();
    hideLoading();
  });
}

// Perform operations after unbookmarking
function afterDelete() {
  let node = document.querySelector(`[data-sfdc-id='${deleteBookmarkId}']`)
  node.parentNode.firstChild.remove();
  heartDisabled.clone().prependTo(node.parentElement);
  $(node.parentNode.firstChild).find('a').on("click", showSaveConfirmation);
  node.removeAttribute('data-sfdc-id');
  $(node.parentElement).find(saveThisPageText).removeClass("d-none");
  $(node.parentElement).find(savedText).addClass("d-none");
  showConfirmation($("#section-bookmarkRemoved"));
  fetchBookmarkList();
}

function unBookmarkItem() {
  hideDeleteConfirmation();
  deleteBookmark([`${deleteBookmarkId}`], afterDelete);
}