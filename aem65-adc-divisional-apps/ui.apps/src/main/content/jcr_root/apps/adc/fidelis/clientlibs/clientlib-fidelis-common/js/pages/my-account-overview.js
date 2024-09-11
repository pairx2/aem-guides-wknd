/**
 * My Account page - Account Overview
 **/

const COURSE = {
  status: {
    STARTED: "ML.BASE.DV.CoursewareStatus.Started",
    COMPLETED: "ML.BASE.DV.CoursewareStatus.Completed",
    INPROGRESS: "ML.BASE.DV.CoursewareStatus.Inprogress",
    ENROLL: "ML.BASE.DV.Enrollment.Status.Enroll",
    FAIL:"ML.BASE.DV.CoursewareStatus.Fail"
  },
  mode: {
    CURRICULUM: "Curriculum",
    ONLINE: "Online",
    OFFLINE: "Offline",
  },
};

$(document).ready(function () {
  $("#myfreestyle-meridian-data").hide();
  $("#ma-no-meridian").hide();

  let myAccountPage = $(document).find("#myaccount-details");

  /** check page targeted from meridian **/
  const fromMeridian = getUrlParameter("source");
  let mrdSourceURLParam = $('[name="meridian-source-param"]')
    ? $('[name="meridian-source-param"]').val()
    : "";

  let isGetProfileRequired =
    (fromMeridian !== "" &&
      mrdSourceURLParam !== "" &&
      fromMeridian == mrdSourceURLParam) ||
    fromMeridian == "LMS";

  /** My Freestyle Get User Profile**/
  const myFreestyleGetProfile = $("#myfreestyle-get-profile"); //check if page has id element
  if (
    myFreestyleGetProfile.length > 0 &&
    myAccountPage.length > 0 &&
    isGetProfileRequired
  ) {
    $("#page-spinner").css("display", "block");
    setTimeout(function () {
      $("#myfreestyle-get-profile")
        .find('button.btn[type="submit"]')
        .trigger("click");
    }, 500);
  }

  // **************************
  // My Account Welcome Section
  // **************************
  let myFSaccountWelcome = $(document).find("#myaccount-welcome");
  renderMyAccountWelcome(myFSaccountWelcome);
});

/**
 * @function
 * Summary: Function to render my welcome
 * Parameters: my welcome page selector
 */
function renderMyAccountWelcome(myFSaccountWelcome) {
  if (myFSaccountWelcome.length > 0) {
    let userData = usObj && decryptData(usObj, pk, "object");
    //showcasing full name on welcome section of account page
    renderUserDetails(userData, myFSaccountWelcome);
  }
}

/**
 * @function
 * Summary: Function to render my badge
 * Parameters: my account page selector
 */
function renderMyBadge(myAccountPage) {
  const myBadge = myAccountPage.find("#my-badges");
  let userCourseInfo = JSON.parse(mrdObj);
  const courses = (userCourseInfo && userCourseInfo.mrdCourse) || [];

  const incompleteCourses = parseInt(
    courses.filter((x) => x.prgStatus != COURSE.status.COMPLETED).length
  );
  const completedCoursesList =
    courses.filter((x) => x.prgStatus == COURSE.status.COMPLETED) || [];
  const pointsEarned =
    (completedCoursesList &&
      completedCoursesList.reduce(
        (prev, curr) => prev + parseInt(curr.gamePoints),
        0
      )) ||
    0;

  if (myBadge.length > 0 && pointsEarned !== undefined) {
    $("#my-badges #mb-earnedpoint-title span.earned-points").text(pointsEarned);
    //condition to check all points earned
    if (incompleteCourses == 0 && courses.length > 0) {
      $("#my-badges #mb-more-badge").hide();
    }
  }
}

/**
 * @function
 * Summary: Function to render my rewards
 * Parameters: my account page selector
 */
function renderMyRewards(myAccountPage) {
  const myRewards = myAccountPage.find("#my-rewards");
  if (myRewards.length > 0) {
    let userCourseInfo = JSON.parse(mrdObj);
    const courses = (userCourseInfo && userCourseInfo.mrdCourse) || [];
    const completedCourses =
      parseInt(
        courses.filter((x) => x.prgStatus == COURSE.status.COMPLETED).length
      ) || 0;

    const myRewardsTilesList = myRewards.find(".m-tile-list");
    const tilesCount = myRewardsTilesList.find(".a-tile").length;
    for (let count = 0; count < tilesCount; count++) {
      let linkTile = myRewardsTilesList.find(".a-tile a").eq(count);
      //condition to disable tile for no of incomplete courses
      if (count >= completedCourses) {
        linkTile
          .prop("disabled", true)
          .addClass("reward-tile-disabled")
          .removeAttr("href");
      }
    }
  }
}

/**
 * @function
 * Summary: Function to render my achievements
 * Parameters: my account page selector
 */
function renderMyAchievements(myAccountPage) {
  const myAchievements = myAccountPage.find("#my-achievements");
  const mrdJwt = getItemLocalStorage("mJwt", true);

  if (myAchievements.length > 0) {
    let userCourseInfo = JSON.parse(mrdObj);
    const courses = (userCourseInfo && userCourseInfo.mrdCourse) || [];

    myAchievements
      .find("#ma-template > .columncontrol")
      .addClass("ma-template");
    myAchievements
      .find("#ma-template > .columncontrol .columncontrol")
      .parent()
      .addClass("ma-download");

    // replace id with class
    myAchievements.find('[id^="ma-"]:not("#ma-template")').each(function () {
      let getId = $(this).attr("id");
      if ($(this).parent().hasClass("a-link")) {
        $(this).removeAttr("id").parent().parent().addClass(getId);
      } else {
        $(this).removeAttr("id").parent().addClass(getId);
      }
    });

    if (Array.isArray(courses) && courses.length > 0) {
      //show achievements
      myAchievements.find(".ma-no-achievements").remove();
      myAchievements.find("#ma-no-meridian").remove();
      myAchievementsInit(courses);
    } else if (mrdJwt && courses.length == 0) {
      //show no-achievements section
      myAchievements.find("#ma-no-meridian").remove();
      myAchievements.find(".ma-template").remove();
    } else {
      //show no-meridian section
      $("#myaccount-details").remove();
      $("#ma-no-meridian").show();
    }
  }
}

/**
 * @function
 * Summary: Function to Create dynamic Learning Section
 * Parameters: mrdData {Array} courses array
 */
function myAchievementsInit(mrdData) {
  let newCourses = [];
  let mrJwt = getItemLocalStorage("mJwt", true);

  for (let i = 0, len = mrdData.length; i < len; i++) {
    let maTemplate = $(".ma-template").clone();
    let lmsStaticURL = $("#LMS-static-url").val();
    //update all values
    for (const property in mrdData[i]) {
      maTemplate.find(`.ma-${property}`).text(mrdData[i][property] || "");
    }
    //status
    let prgmStatus = mrdData[i].crswprgstatlclName;
      let authrStatus =(document.getElementById('mrd-course-status')) ? JSON.parse(document.getElementById('mrd-course-status').textContent) : {}
    if(Object.keys(authrStatus).length>1){
      for (let status in authrStatus) {
        if(status==mrdData[i].prgStatus){
           maTemplate.find(".ma-courseStatus").text(authrStatus[status]);
        }
    }
    }else {
      maTemplate.find(".ma-courseStatus").text(prgmStatus)
    }

    //image
    let imgStaticUrl = lmsStaticURL.split("/").slice(0, 3).join("/");
    let maImageSrc = maTemplate
      .find(".ma-image .cmp-image")
      .removeAttr(
        "data-cmp-is data-cmp-lazy data-cmp-lazythreshold data-cmp-widths data-cmp-src"
      )
      .attr("data-asset");
    let maNewImageSrc = (mrdData[i].imageUrl) ? imgStaticUrl + mrdData[i].imageUrl : maImageSrc

    let imgHtml = `<img src="${maNewImageSrc}" class="cmp-image__image a-image__default" alt="${mrdData[i].cntlclTitle}"/>`;
    maTemplate.find(".ma-image .cmp-image").html(imgHtml);

    //date
    let startDate =
      mrdData[i].prgStartDate &&
      mrdData[i].prgStartDate !== "" &&
      mrdData[i].prgStartDate !== "null"
        ? getDate(mrdData[i].prgStartDate)
        : "";
    let completeDate =
      mrdData[i].prgCompleteDate &&
      mrdData[i].prgCompleteDate !== "" &&
      mrdData[i].prgCompleteDate !== "null"
        ? getDate(mrdData[i].prgCompleteDate)
        : "";
    startDate !== ""
      ? maTemplate.find(".ma-courseStartDate").text(startDate)
      : maTemplate.find(".ma-course-start").hide();
    completeDate !== ""
      ? maTemplate.find(".ma-courseCompletionDate").text(completeDate)
      : maTemplate.find(".ma-course-complete").hide();

    //points & link
    let gamePoints =
      mrdData[i].gamePoints &&
      mrdData[i].gamePoints !== "" &&
      mrdData[i].gamePoints !== "null"
        ? mrdData[i].gamePoints
        : 0;
    maTemplate.find(".points").text(gamePoints);
    maTemplate
      .find("#e-lear-redirect .a-link__text")
      .attr("id", mrdData[i].prgEntityId);
    maTemplate
      .find(".ma-certificate .a-link__text")
      .attr(
        "href",
        lmsStaticURL +
          encodeURIComponent(mrdData[i].certificateUrl) +
          "&authtoken=" +
          mrJwt
      );

    //title & mode
    let authrTitle = $("#course-title").val();
    maTemplate
      .find(".ma-courseMode")
      .text(authrTitle ? authrTitle : mrdData[i].ctyplclName);
    maTemplate.find(".ma-courseTitle").text(mrdData[i].cntlclTitle);

    //progress bar, badge and show/hide inprogress/completed text
    if (mrdData[i].prgStatus == COURSE.status.ENROLL) {
      maTemplate.find(".ma-points-inprogress").addClass("d-block");
      maTemplate.find(".ma-points-complete").addClass("d-none");

      maTemplate.find(".ma-learning").removeClass("d-none").addClass("d-flex");
      maTemplate
        .find(".ma-certificate")
        .removeClass("d-flex")
        .addClass("d-none");

      maTemplate
        .find(".ma-badge")
        .removeClass("ma-badge-complete")
        .addClass("ma-badge-inprogress");
    } else if (
      mrdData[i].prgStatus == COURSE.status.STARTED ||
      mrdData[i].prgStatus == COURSE.status.INPROGRESS || mrdData[i].prgStatus == COURSE.status.FAIL
    ) {
      maTemplate
        .find(".ma-progress .a-progressbar__status")
        .addClass("ma-progress-50");

      maTemplate.find(".ma-points-inprogress").addClass("d-block");
      maTemplate.find(".ma-points-complete").addClass("d-none");

      maTemplate.find(".ma-learning").removeClass("d-none").addClass("d-flex");
      maTemplate
        .find(".ma-certificate")
        .removeClass("d-flex")
        .addClass("d-none");

      maTemplate
        .find(".ma-badge")
        .removeClass("ma-badge-complete")
        .addClass("ma-badge-inprogress");
    } else if (mrdData[i].prgStatus == COURSE.status.COMPLETED) {
      maTemplate
        .find(".ma-progress .a-progressbar__status")
        .addClass("ma-progress-100");

      maTemplate.find(".ma-points-inprogress").addClass("d-none");
      maTemplate.find(".ma-points-complete").addClass("d-block");

      maTemplate.find(".ma-learning").removeClass("d-flex").addClass("d-none");
      maTemplate
        .find(".ma-certificate")
        .removeClass("d-none")
        .addClass("d-flex");

      maTemplate
        .find(".ma-badge")
        .removeClass("ma-badge-inprogress")
        .addClass("ma-badge-complete");
    }

    maTemplate.removeClass("ma-template").addClass(`ma-course-${i}`);
    let maTemplateString = maTemplate
      .prop("outerHTML")
      .replace(/[\r\n\t]+/g, "");

    newCourses.push(maTemplateString);
  }

  //append html into dom
  const myAchievements = document.querySelector("#my-achievements");
  for (let i = 0, len = newCourses.length; i < len; i++) {
    myAchievements.insertAdjacentHTML("beforeend", newCourses[i]);

    if (i !== len - 1) {
      myAchievements.insertAdjacentHTML(
        "beforeend",
        '<div class="text ma-seperator"><hr></div>'
      );
    }
  }

  //remove template
  $(".ma-template").remove();
}

/**
 * @function
 * Summary: Function to convert date.
 * Parameters: dateString {String}
 */
function getDate(dateString) {
  let date = new Date(dateString);
  let fullDate =
  ('0' + date.getDate()).slice(-2) + "/" + ('0'+ (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
  return fullDate;
}

/**
 * @function
 * Summary: Trigger meridian details API
 */

  (function meridianDetailsTrigger() {
    setTimeout(function () {
      let mJwt = getItemLocalStorage("mJwt", true);
      let meridianDetails = $(
        '#myfreestyle-meridian-data button[name="Meridian-Details"]'
      );
      let meridianJwtToken = $("#Meridian-Jwt-Token");
      $("#overlay-text p").show();
      if (meridianDetails.length && mJwt && isOnPublish()) {
        meridianDetails.trigger("click");
      } else if (meridianDetails.length && isOnPublish()) {
        meridianJwtToken.length && meridianJwtToken.trigger("click");
      }
    }, 500);
  })();

