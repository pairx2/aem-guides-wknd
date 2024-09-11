/**
 * User Logout
 **/
$(document).ready(function () {
  let logoutForm = $(
    '#myfreestyle-userLogout-form button[name="logout-submit"]'
  );

  $("#myFreestyle-logout,#session-logout-btn").click(function () {
    if (isOnPublish()) {
      logoutForm.trigger("click");
    }
  });
});
