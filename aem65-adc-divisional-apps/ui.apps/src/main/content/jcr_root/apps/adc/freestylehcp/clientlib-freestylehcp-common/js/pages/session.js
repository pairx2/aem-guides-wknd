let jwtTkn = getCookie("cJwt", true);
let isUserLogIn = usObj && jwtTkn;
let counterId = $("#counter-val");
let modalDurationInMinutes = $("#counter-duration").length
  ? Number($("#counter-duration").val())
  : 3;
let logoutForm = $('#myfreestyle-userLogout-form button[name="logout-submit"]');
let sessionExtnBtn = $("#extend-session-btn");
let counterInitialVal = counterId.lenght
  ? `'0 $(modalDurationInMinutes) :00'`
  : "";
let minutesAgoVal = $("#minutes-ago-val").length
  ? Number($("#minutes-ago-val").val())
  : 13;

counterId.text(counterInitialVal);

const setTwoMinutesCounter = (twoMinutesCounter) => {
  counterId.text(twoMinutesCounter);
};

function startInsideModalCounter(logoutTimestamp) {
  let minutes1, seconds;
  const insideModalTimer = setInterval(() => {
    const now = new Date();
    const remainingSeconds = Math.floor((logoutTimestamp - now) / 1000);
    minutes1 = parseInt(remainingSeconds / 60, 10);
    seconds = parseInt(remainingSeconds % 60, 10);
    minutes1 = minutes1 < 10 ? "0" + minutes1 : minutes1;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    setTwoMinutesCounter(minutes1 + ":" + seconds); // Redirect user to log in page if user doesn't do anything on modal after two minutes
    sessionTimestamp();

    if (remainingSeconds <= 0) {
      clearInterval(insideModalTimer);
      logoutForm.length && logoutForm.trigger("click");
      $("#extend-session").hide();
    }
  }, 500);

  $("#extend-session-btn,#session-logout-btn").click(function () {
    clearInterval(insideModalTimer);
    $("#extend-session").hide();
  });
}

function sessionTimestamp() {
  localStorage.setItem("sessionTimestamp", Date.now());
}

document.addEventListener("mousemove", sessionTimestamp, false);
document.addEventListener("keypress", sessionTimestamp, false);
document.addEventListener('scroll', sessionTimestamp, false);


function lessThanMinutesAgo(date, minutes) {
  const minutesOnSeconds = 1000 * 60 * minutes;
  const minutesAgo = Date.now() - minutesOnSeconds;
  return date > minutesAgo;
}

const isSessionExpired = (minutesAgo = minutesAgoVal) => {
  const sessionTimestampVal = localStorage.getItem("sessionTimestamp");

  if (
    !lessThanMinutesAgo(JSON.parse(sessionTimestampVal), minutesAgo) &&
    sessionTimestamp &&
    isUserLogIn &&
    isOnPublish()
  ) {
    $("#extend-session").show();

    const minutesFromNow =
      new Date().getTime() + 60 * modalDurationInMinutes * 1000;

    startInsideModalCounter(minutesFromNow);
    sessionTimestamp();
  } else {
    return false;
  }
};

let idleInterval = setInterval(isSessionExpired, 1000);
