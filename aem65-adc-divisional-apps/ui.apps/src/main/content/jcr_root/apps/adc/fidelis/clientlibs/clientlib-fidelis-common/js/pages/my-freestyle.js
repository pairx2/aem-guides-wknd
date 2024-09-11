/**
 * My Freestyle page - Home page
 **/

$(document).ready(function () {
  let userData = usObj && decryptData(usObj, pk, "object");
  let userCourseInfo = JSON.parse(mrdObj)

  const startedCourses = userCourseInfo && userCourseInfo.mrdCourse && userCourseInfo.mrdCourse.filter((x) => x.prgStatus == COURSE.status.STARTED) || [];

  // **************************
  // My Freestyle Welcome Section
  // **************************
  let myFSWelcome = $(document).find("#my-freestyle-welcome");
  if (myFSWelcome.length > 0 && isOnPublish()) {
    //showcasing first name on Freestyle Home Page
    renderUserDetails(userData, myFSWelcome); 
  }
  // **************************
  // MF Dynamic Reminder
  // **************************
  let myFSHomePage = $('#mf-dynamic-reminder');
  let mfDynRem = getCookie('mfDynRem', true) == 'true' ? true : false;

     if (myFSHomePage.length > 0 && isOnPublish() && !mfDynRem) {

    // show/hide section
    let mfDynRemClass = 'mf-dynamic-reminder';
    myFSHomePage.closest('.container.a-container').addClass(mfDynRemClass).hide();

    let mfDynRemSection = $(`#section-${mfDynRemClass}, .${mfDynRemClass}`);

    //mf-course
    $(`#${mfDynRemClass}-course`).removeAttr('id').closest('.m-card').attr('id', `${mfDynRemClass}-course`);

    let mfDynRemCourse = $(`#${mfDynRemClass}-course`);

    if (Array.isArray(startedCourses) && startedCourses.length > 0) {

      //select random course from inprogress courses
      let courseIndex = Math.floor((Math.random() * startedCourses.length));

      //mf-course update all values
      for (const property in startedCourses[courseIndex]) {
        mfDynRemCourse.find(`.mf-${property}`).text(startedCourses[courseIndex][property] || "");

        if (property == 'cntContentId') {
          let courseID = startedCourses[courseIndex][property];
          let mfDynRemCourseDesc = $(`.${mfDynRemClass}`).find(`[name="mf-courseDesc-${courseID}"]`);
          if (mfDynRemCourseDesc.length > 0) {
            mfDynRemCourse.find('.mf-courseDesc').text(mfDynRemCourseDesc.val());
          } else {
            mfDynRemCourse.find('.mf-courseDesc').hide();
          }
        }
        
      }

      //image
      let meridianDomain=$('#meridian-domain').val()
      let mfNewImageSrc = startedCourses[courseIndex].imageUrl || '';
      setTimeout(function () {
        if (mfNewImageSrc !== '') {
          mfDynRemCourse.find('.cmp-image .cmp-image__image').removeClass('cmp-image__image--is-loading').attr({
            'src': meridianDomain + mfNewImageSrc
          });
        }
        mfDynRemCourse.find('.cmp-image .cmp-image__image').attr({
          'alt': startedCourses[courseIndex].courseTitle,
          'title': startedCourses[courseIndex].courseTitle
        });
      }, 500);

      //mf-course link
      mfDynRemCourse.find(".a-link__text").attr("id", startedCourses[courseIndex].prgEntityId);

     
      mfDynRemSection.show();
    } else {
      mfDynRemSection.hide();
    }


    // Hide Section on click of "Later"
    $(`#${mfDynRemClass}-hide`).on('click', function () {
      mfDynRemSection.hide();
      setCookie('mfDynRem', true, 1, true);
    });

  }

  // **************************
  // MF Login Fragment - Hide
  // **************************
  let myFSLoginForm = $('#myfreestyle-user-login');
  if (myFSLoginForm.length > 0 && isOnPublish() && isUserInLogedInState()) {
    myFSLoginForm.closest('#section-myfreestyle-user-login').parent().hide();
  }

});
