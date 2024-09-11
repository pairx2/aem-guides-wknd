/**
 * My Freestyle page - Home page
 **/

let userData = usObj && decryptData(usObj, pk, "object");
let userCourseInfo = mrdObj && decryptData(mrdObj, pk, "object");
const startedCourses = userCourseInfo && userCourseInfo.mrdCourse && userCourseInfo.mrdCourse.filter((x) => x.courseStatus == COURSE.status.STARTED) || [];
let mfDynRem = getItemSessionStorage('mfDynRem') == 'true' ? true : false;
let mfNewImageSrc = startedCourses.length ? (startedCourses[0].imagePath || "") : '';


$(document).ready(function () {

  // **************************
  // MF Dynamic Reminder
  // **************************
  let myFSHomePage = $('#mf-dynamic-reminder');
  if (myFSHomePage.length > 0 && isOnPublish() && !mfDynRem) {

    // show/hide section
    let mfDynRemClass = 'mf-dynamic-reminder';
    myFSHomePage.closest('.container.a-container').addClass(mfDynRemClass).hide();

    let mfDynRemSection = $(`#section-${mfDynRemClass}, .${mfDynRemClass}`);

    //showcasing first name on Frestyle Home Page
    renderUserDetails(userData, myFSHomePage);

    //mf-course
    $(`#${mfDynRemClass}-course`).removeAttr('id').closest('.m-card').attr('id', `${mfDynRemClass}-course`);

    let mfDynRemCourse = $(`#${mfDynRemClass}-course`);

    if (Array.isArray(startedCourses) && startedCourses.length > 0) {
      //mf-course update all values
      for (const property in startedCourses[0]) {
        mfDynRemCourse.find(`.mf-${property}`).text(startedCourses[0][property] || "");
      }

      //image
      setTimeout(function () {
        if (mfNewImageSrc !== '') {
          mfDynRemCourse.find('.cmp-image .cmp-image__image').removeClass('cmp-image__image--is-loading').attr({
            'src': mfNewImageSrc
          });
        }
        mfDynRemCourse.find('.cmp-image .cmp-image__image').attr({
          'alt': startedCourses[0].courseTitle
        });
      }, 500);

      //mf-course link
      mfDynRemCourse.find(".a-link__text").attr("href", startedCourses[0].courseLink);

      // add "meridian-link" class to merdian link & assign click event
      meridianLinkAssignEvent();

      mfDynRemSection.show();
    } else {
      mfDynRemSection.hide();
    }


    // Hide Section on click of "Later"
    $(`#${mfDynRemClass}-hide`).on('click', function () {
      mfDynRemSection.hide();
      setItemSessionStorage('mfDynRem', true);
    });

  }

});
