/**
 * Session Extention -  Flow
 **/

let checkActiveSession;
window.isExtSessCallProgress = false;
window.isLogoutCallProgress = false;

$(() => {

  const isLoggedIn = isUserInLogedInState();
  const counterId = $("#extend-session-counter");
  const modalCounterDurationInMinutes = $("#extend-session-counter-duration").length ? Number($("#extend-session-counter-duration").val()) : 3;
  const counterInitialVal = counterId.length ? `0${modalCounterDurationInMinutes}:00` : "";
  const idleTimer = $("#extend-session-idleTimer").length ? Number($("#extend-session-idleTimer").val()) : 13;

  //setting up seessiontimestamp in localstorage on login and removing on logout
  if (isLoggedIn && isOnPublish()) {
    sessionTimestamp();
    counterId.children().text(counterInitialVal);
    addEvntLstnr();
  } else {
    removeItemLocalStorage('aSesExpTime', true);
    removeItemLocalStorage('aSessTimeNow', true);
    removeEvntLstnr();
  }

  const isSessionExpired = () => {
    const aSessExpTimeVal = getItemLocalStorage('aSesExpTime', true);
    const aSessTimeNowVal = getItemLocalStorage('aSessTimeNow', true);
    const modalDsplyVal = $('#btnModalExtendSession-modal').css('display') == 'block';

    const checkConditions = !modalDsplyVal && isLoggedIn && isOnPublish() && !window.isExtSessCallProgress && !window.isLogoutCallProgress;
    const isSessionExpiring = aSessExpTimeVal == null && checkConditions;
    const isSessionIdle = !lessThanMinutesAgo(JSON.parse(aSessTimeNowVal), idleTimer) && checkConditions;
    
    if (isSessionExpiring || isSessionIdle) {
      //hiding cancel icon of modal
      $('#btnModalExtendSession-modal .generic-modal--close').hide();

      //show modal
      showhideModal('btnModalExtendSession', 1, true);

      const minutesFromNow = new Date().getTime() + 60 * modalCounterDurationInMinutes * 1000;
      startInsideModalCounter(minutesFromNow);
      sessionTimestamp();
    } else {
      return false;
    }
  };

  if (isLoggedIn && isOnPublish()) {
    checkActiveSession = setInterval(isSessionExpired, 1000);
  }
});

function startInsideModalCounter(logoutTimestamp) {
  let minutes1, seconds;
  const logoutForm = $('#myfreestyle-userLogout-form button[type="submit"]');

  const insideModalTimer = setInterval(() => {
    const now = new Date();
    const remainingSeconds = Math.floor((logoutTimestamp - now) / 1000);
    minutes1 = parseInt(remainingSeconds / 60, 10);
    seconds = parseInt(remainingSeconds % 60, 10);
    minutes1 = minutes1 < 10 ? "0" + minutes1 : minutes1;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // two minutes counter
    $('#extend-session-counter').children().text(minutes1 + ":" + seconds);

    // logout when remaining seconds <= 0
    if (remainingSeconds <= 0) {
      clearInterval(insideModalTimer);
      clearInterval(checkActiveSession);

      logoutForm.length && logoutForm.trigger("click");
      window.isLogoutCallProgress = true;
      //hide modal
      showhideModal('btnModalExtendSession', 0);
    }
  }, 500);

  document.getElementById('extend-session-continue-btn').addEventListener('click', function () {
    if (isOnPublish()) {
      clearInterval(insideModalTimer);
      window.isExtSessCallProgress = true;
      //hide modal
      showhideModal('btnModalExtendSession', 0);
    }
  }, true)

  document.getElementById('extend-session-logout-btn').addEventListener('click', function () {
    if (isOnPublish()) {
      clearInterval(insideModalTimer);
      clearInterval(checkActiveSession);

      logoutForm.length && logoutForm.trigger("click");
      window.isLogoutCallProgress = true;
      //hide modal
      showhideModal('btnModalExtendSession', 0);
    }
  }, true)
}

/**
 * @function
 * Summary: Function to set the session timestamp in localStorage
 * Parameters: expiry {boolean} = true to set aSesExpTime with expiry
 *             expiry {boolean} = false to set aSessTimeNow current time
 */
function sessionTimestamp(expiry = false) {
  if (expiry === true) {
    const sessionDuration = $('[name*="session-duration-minutes"]').length ? Number($('[name*="session-duration-minutes"]').val()) : 50;
    const sessionExpTimeInMilliSec = new Date().getTime() + 60 * Number(sessionDuration) * 1000;
    setItemLocalStorage('aSesExpTime', sessionExpTimeInMilliSec, true, 60 * Number(sessionDuration) * 1000);
  }
  setItemLocalStorage('aSessTimeNow', Date.now(), true);
}

function lessThanMinutesAgo(date, idleTimer) {
  const idleTimerSeconds = 1000 * 60 * idleTimer;
  const minutesAgo = Date.now() - idleTimerSeconds;
  return date > minutesAgo;
}

function addEvntLstnr() {
  document.addEventListener("mousemove", sessionTimestamp);
  document.addEventListener("keypress", sessionTimestamp);
  document.addEventListener('scroll', sessionTimestamp);
}

function removeEvntLstnr() {
  document.removeEventListener("mousemove", sessionTimestamp);
  document.removeEventListener("keypress", sessionTimestamp);
  document.removeEventListener('scroll', sessionTimestamp);
}