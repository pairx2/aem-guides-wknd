/**
 * e-learning page
 **/

const COURSE = {
  status: {
    STARTED: "ML.BASE.DV.CoursewareStatus.Started",
    COMPLETED: "ML.BASE.DV.CoursewareStatus.Completed",
    INPROGRESS: "ML.BASE.DV.CoursewareStatus.Inprogress",
    ENROLL: "ML.BASE.DV.Enrollment.Status.Enroll",
    FAIL: "ML.BASE.DV.CoursewareStatus.Fail"
  },
  mode: {
    CURRICULUM: "Curriculum",
    ONLINE: "Online",
    OFFLINE: "Offline",
  },
};

$(document).ready(function () {

  // *****************************
  // Add course id's in url as paramater
  // *****************************
  $('[id*=eLearningCourseId__]').each(function(){
    let clicked_id = $(this).attr('id').replace('eLearningCourseId__', '');
    let clicked_href = $(this).attr('href');
    let clicked_href_child = $(this).find('a').attr('href');
    if(clicked_href){
      $(this).attr('href',clicked_href+'?courseId='+clicked_id);
    }
    else if(clicked_href_child){
      $(this).find('a').attr('href',clicked_href_child+'?courseId='+clicked_id);
    }
  })

  // *****************************
  // Get mJwt and Set CourseIframe
  // *****************************
  const mJwt = getItemLocalStorage('mJwt', true);

  // get mJwt if not available
  const meridianJwtTokenForm = $('#mfs-get-meridian-jwt button.btn[type="submit"]');
  const isMJwtInValid = !mJwt && meridianJwtTokenForm.length && isOnPublish();

  if (isMJwtInValid && mfsElearningCoursePlayerIFrame.length || isMJwtInValid && mfsELearningPage.length) {
    setTimeout(() => {
      meridianJwtTokenForm.trigger('click')
    }, 500);
  } else if (mfsElearningCoursePlayerIFrame.length && isOnPublish()) {
    setTimeout(() => {
      setIframeSource();
      exitFullScreenIframeCourse();
    }, 1000);
  }

  mfsElearningCoursePlayerIFrame.on('load', function () {
    $('#page-spinner').hide();
  });


  // *****************************
  // e-Learning Page
  // *****************************

  if (mfsELearningPage && mfsELearningPage.length > 0) {

    // replace id with class in achievements section
    replaceIdwithClass(mfsELearningPage);

    //replace id with class in ma-profile-template-container
    let maProfileTemplate = $('[id*="ma-profile-template-container"]');
    if (maProfileTemplate && maProfileTemplate.length > 0) {
      replaceIdwithClass(maProfileTemplate);
    }

    // hide default elements
    $('.ma-total-progress-text').hide();
    $('.ma-elearnings-skeleton').hide();
    $('.ma-noactive-elearnings').hide();
    $('.ma-active-elearnings').hide();


    //move all e-learnings into 1 conatainer
    let eContainer = $('[id*="elearning-main-container"] .columncontrol');
    let firstEContainer = eContainer.first().find('.row');
    $('[id*="elearning-main-container"] .columncontrol').each((i, elm) => {
      let courses = $(elm).find(`#elearning-container-${i + 1} .columncontrol__column`);
      $(courses).appendTo($(firstEContainer));
      $(eContainer[i + 1]).remove();
    });

    /** Meridian Get User Profile - ME API**/
    mrdGetProfile(mJwt);

    let totalCourses = $('[id*="elearning-main-container"] article').length;
    setItemLocalStorage("totaleLearn", totalCourses, true);    
  }

});

// *****************************
// eLearning Links Click event
// *****************************
$(document).on('click', 'body a', function () {
  let clicked_id = $(this).attr('id');
  const courseIdKey = 'eLearningCourseId__';
  (!clicked_id || (clicked_id.indexOf(courseIdKey) == -1)) && (clicked_id = $(this).parents('[id]').attr('id'));
  if (clicked_id && (clicked_id.indexOf(courseIdKey) > -1)) {
    setItemLocalStorage('launchURL', clicked_id.replace(courseIdKey, ''), true);
  } else {
    removeItemLocalStorage('launchURL', true);
  }
});

/**
 * @function
 * Summary: Meridian Get User Profile - ME API
 */
function mrdGetProfile(meridianToken){
  let meridianDetailsForm = $('#mfs-get-meridian-profile button.btn[type="submit"]');
    if (meridianToken && meridianDetailsForm.length > 0 && isOnPublish()) {
      setTimeout(function () {
        meridianDetailsForm.trigger("click");
      }, 500);
    }
}

/**
 * @function
 * Summary: Function to find the completed eLearning courses
 * Parameters:  
 */
function getCompletedELearning() {

  let userCourseInfo = mrdObj && decryptData(mrdObj, pk, "object");
  const completedCourses = userCourseInfo?.mrdCourse?.filter((x) => x.prgStatus == COURSE.status.COMPLETED) || [];
  const mrJwt = getItemLocalStorage("mJwt", true);
  let totalCourses = $('[id*="elearning-main-container"] article');

  let certificateTxt = $('.ma-certificate a span').text();
  $('[id*="elearning-finished-container"] .columncontrol .row').empty();

  for (const x in completedCourses) {
    let courseID = completedCourses[x]?.cntContentId;
    let courseElem = courseID ? totalCourses.find(`[id^="eLearningCourseId"][id$="${courseID}"]`) : '';
    let courseCertificateLink = $("#LMS-static-url").val()+
    encodeURIComponent(completedCourses[x]?.certificateUrl)+
    "&authtoken=" +mrJwt;

    if (courseElem.length > 0) {
      for (let i = 0; i <= courseElem.length; i++) {
        let courseItem = $(courseElem[i]).closest('.columncontrol__column');
        let modifiedCourseId = $(courseElem[i]).attr('id')?.replace('eLearningCourseId__','');
        let cardLink = $(courseElem[i]).find('.m-card-link').length;
        
        if($(courseElem[i]).hasClass('m-card__wrapper') && cardLink > 0){
          $(courseElem[i]).attr('id', modifiedCourseId).find('.m-card-link').attr({href: courseCertificateLink, target: "_blank"})
          .find('.nonClickableLink p').text(certificateTxt);
        }
        else{
          $(courseElem[i]).attr({href: courseCertificateLink, target: "_blank", id: modifiedCourseId})
          .find('span').text(certificateTxt);
        }
        $(courseItem).appendTo('#elearning-finished-container .row')
      }
    }
  }

  let isCompleted = $('[id*="elearning-finished-container"] .columncontrol .row').children().length;
  if (isCompleted > 0) {
    $('[id*="elearning-finished-container"]').show();
  } else {
    $('[id*="elearning-finished-container"]').hide();
  }

  // set equal height for Cards within .conatiner > .row
  setCardEqualHeight();

  getELearningProgress();
}

/**
 * @function
 * Summary: Function to calculate eLearning Progress
 * Parameters:  
 */
function getELearningProgress() {
  let totalCourse = parseInt(getItemLocalStorage("totaleLearn", true));

  let finishCoures = $('[id*="elearning-finished-container"] article').length;

  let calProgress = finishCoures > 0 ? (finishCoures / totalCourse) * 100 : 0;

  if (calProgress == 0) {
    $('.ma-total-progress-text').hide();
    $('.ma-no-progress-text').show();
  } else {
    $('.ma-no-progress-text').hide();
    $('.ma-courseTotalProgress').html(calProgress.toFixed(2));
    $('.ma-total-progress-text').show();
    $('.ma-total-progress .a-progressbar__status').css('width', calProgress.toFixed(2) + '%');
  }

  // Remove skeleton loader from Progress bar
  $('.ma-total-progress').removeClass('skeleton-loader');
}

/**
 * @function
 * Summary: Function to generate Active eLearning cards
 * Parameters:
 */
function renderELearningCards() {
  let userCourseInfo = mrdObj && decryptData(mrdObj, pk, "object");
  let activeCourses = userCourseInfo?.mrdCourse,
    activeLearningCardsArray = [];
  const maTemplate = $('.ma-profile-template-container .ma-template'),
    mrJwt = getItemLocalStorage("mJwt", true),
    maAciveLearningContainer = $('.ma-active-elearnings .a-container__row .cmp-container');

  if(Array.isArray(activeCourses) && activeCourses.length > 0) {
    // Sort courses where started comes first and completed comes next
    const startedCourses = activeCourses.filter((x) => x.prgStatus != COURSE.status.COMPLETED);
    const completedCourses = activeCourses.filter((x) => x.prgStatus == COURSE.status.COMPLETED);
    startedCourses.sort((prev, next) => sortArrValues(prev.prgStartDate, next.prgStartDate));
    completedCourses.sort((prev, next) => sortArrValues(prev.prgCompleteDate, next.prgCompleteDate));
    activeCourses = [...startedCourses, ...completedCourses];
  }

  if (maTemplate?.length && maAciveLearningContainer?.length && Array.isArray(activeCourses) && activeCourses.length > 0) {
    for (const course of activeCourses) {
      let maTemplateClone = maTemplate.clone(true, true);
      maTemplateClone.removeClass('ma-template');

      // Append course ID to template clone
      maTemplateClone.attr('data-course-id', `eLearningCourseId__${course.cntContentId}`);

      // Mapping response with key classes to fill in response data
      for (const key in course) {
        let ele = maTemplateClone.find(`.ma-${key}`);
        if (ele.length) {
          let eleTextChange = ele.html().replace(`{${key}}`, course[key]);
          ele.html(eleTextChange);
        }
      }

      // Image
      let lmsStaticURL = $("#LMS-static-url").val();
      let imgStaticUrl = lmsStaticURL.split("/").slice(0, 3).join("/");
      let maImageSrc = maTemplateClone
        .find(".ma-image .cmp-image")
        .removeAttr(
          "data-cmp-is data-cmp-lazy data-cmp-lazythreshold data-cmp-widths data-cmp-src"
        )
        .attr("data-asset");
      let maNewImageSrc = (course.imageUrl) ? imgStaticUrl + course.imageUrl : maImageSrc
      let imgHtml = `<img src="${maNewImageSrc}" class="cmp-image__image a-image__default" alt="${course.cntlclTitle}"/>`;
      maTemplateClone.find(".ma-image .cmp-image").removeClass('cmp-image--desktop').html(imgHtml);

      // Continue link
      let continueUrl = maTemplateClone.find('.button.ma-learning .btn').attr('href');
      maTemplateClone.find('.button.ma-learning .btn').attr({
        id:`eLearningCourseId__${course.prgEntityId}`,
        href:continueUrl + '?courseId=' + course.prgEntityId
      });

      // Certificate button
      maTemplateClone.find('.button.ma-certificate .btn').attr(
        "href",
        lmsStaticURL +
        encodeURIComponent(course.certificateUrl) +
        "&authtoken=" +
        mrJwt
      )

      // Complete vs inprogress
      if (course.prgStatus == COURSE.status.COMPLETED) {
        $(maTemplateClone).find('.progressbar').addClass('d-none');
        $(maTemplateClone).find('.button.ma-learning').addClass('d-none');
      } else {
        $(maTemplateClone).find('.button.ma-certificate').addClass('d-none');
      }

      // Push all tempaltes to array to pass it on to pagination
      activeLearningCardsArray.push(maTemplateClone[0].outerHTML);
    }

    $('.ma-elearnings-skeleton').hide();
    $('.ma-noactive-elearnings').hide();
    $('.ma-active-elearnings').show().children().show();

    // Pagination for acive elearning cards
    generatePagination($('.ma-active-elearnings .m-pagination-static'), activeLearningCardsArray);
  } else {
    $('.ma-elearnings-skeleton').hide();
    $('.ma-active-elearnings').hide().children().hide();
    $('.ma-noactive-elearnings').show();
  }

  getELearningProgress();
}

function renderELearningCardsSkeleton() {

  // Hide Active and Noactive elearning containers
  $('.ma-active-elearnings').hide().children().hide();
  $('.ma-noactive-elearnings').hide();

  // Add skeleton loader to Progress bar
  $('.ma-total-progress').addClass('skeleton-loader');

  // Create and Show Cards Skeleton
  const maTemplate = $('.ma-profile-template-container .ma-template'),
    maAciveLearningContainer = document.querySelector('.ma-elearnings-skeleton .a-container__row .cmp-container');

  let eLearningCardsArray = [];

  if (maAciveLearningContainer && maTemplate.length > 0) {
    for (let i = 1; i <= 2; i++) {
      let maTemplateClone = maTemplate.clone(true, true);

      maTemplateClone.addClass('skeleton-loader');
      // Append course ID to template clone
      maTemplateClone.attr('data-skeleton-id', `${i}`);

      // Image
      let maImageSrc = maTemplateClone
        .find(".ma-image .cmp-image")
        .removeAttr(
          "data-cmp-is data-cmp-lazy data-cmp-lazythreshold data-cmp-widths data-cmp-src"
        )
        .attr("data-asset");
      let imgHtml = `<img src="${maImageSrc}" class="cmp-image__image a-image__default" alt=""/>`;
      maTemplateClone.find(".ma-image .cmp-image").removeClass('cmp-image--desktop').html(imgHtml);

      // Continue link
      maTemplateClone.find('.button.ma-learning .btn').attr('href', '');

      // Certificate button
      maTemplateClone.find('.button.ma-certificate').remove();

      // Push all tempaltes to array to pass it on to pagination
      eLearningCardsArray.push(maTemplateClone[0].outerHTML);
    }

    eLearningCardsArray.forEach(function (item) {
      maAciveLearningContainer.insertAdjacentHTML("beforeend", item);
    });

    //show skeleton loader main container
    $('.ma-elearnings-skeleton').show();
  }
}

/**
 * @function
 * Summary: Function to sort the values
 */
 function sortArrValues(prevVal, nextVal) {
    if(nextVal > prevVal){
      return 1
    }
    else if(prevVal > nextVal){
      return -1
    }
    else { return 0 }
 }

/**
 * @function
 * Summary: Function to generate pagination
 * Parameters: paginationComp - jQuery<HTMLElement> - Pagination component element
 *             componentsArray - HTML Array - HTML elements array which needs to be fed to pagination plugin
 */
function generatePagination(paginationComp, componentsArray) {
  let paginationContent = paginationComp.find('.m-pagination-static__content'),
    paginationLinks = paginationComp.find('.m-pagination-static__links');
  const autoHideNext = (paginationComp.find('.m-pagination-static__wrapper').attr('auto-hide-next').toLowerCase() === 'true'),
    autoHidePrevious = (paginationComp.find('.m-pagination-static__wrapper').attr('auto-hide-previous').toLowerCase() === 'true'),
    pageSize = +(paginationComp.find('.m-pagination-static__wrapper').attr('page-size')),
    previousIcon = '<em class="abt-icon abt-icon-left-arrow"></em>',
    nextIcon = '<em class="abt-icon abt-icon-right-arrow"></em>';
  paginationLinks.empty();

  paginationLinks.pagination({
    dataSource: componentsArray,
    pageSize,
    autoHideNext,
    autoHidePrevious,
    callback: (components, _) => {
      paginationContent.empty();
      $.each(components, (__, component) => {
        $(component).appendTo(paginationContent);
      });
      paginationLinks.find('.paginationjs-prev a').html(previousIcon);
      paginationLinks.find('.paginationjs-next a').html(nextIcon);
    }
  });
  paginationComp.parent().show();
}


/**
 * @function
 * Summary: Function to exit e-Learning FullSceen Mode
 * Parameters: NA
 */
function exitFullScreenIframeCourse() {
  window.setInterval(function () {
    let fullScreen = document.getElementsByClassName('modal-open')
    let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) || (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);
    if (fullScreen.length > 0 && isInFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  }, 1000);
}