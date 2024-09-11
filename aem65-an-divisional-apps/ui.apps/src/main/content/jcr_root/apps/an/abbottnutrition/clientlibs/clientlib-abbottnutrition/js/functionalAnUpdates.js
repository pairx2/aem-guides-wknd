
/**
 * @event
 * @desc used for adding closing alerts store
 */

jQuery(".m-alert .m-alert__close-icon").click(function() {
    let myAlertIds = sessionStorage.getItem("myalerts")
      ? JSON.parse(sessionStorage.getItem("myalerts"))
      : [];
    myAlertIds.push(
      jQuery(this)
        .parents(".m-alert")
        .attr("id")
    );
    sessionStorage.setItem("myalerts", JSON.stringify(myAlertIds));
  });
  /** Set local storage for on click of new tab internal link */
  jQuery('a').on('click', function(){
    if($(this).attr('target') === "_blank" && this.hostname === window.location.hostname ){
      if(sessionStorage.getItem("myalerts")){
      localStorage.setItem("myalerts", sessionStorage.getItem("myalerts"));
      }
    }
  })
  
  jQuery(document).ready(function() {
    /** Move local to session storage in new tab internal link */
    if(localStorage.getItem("myalerts") && !sessionStorage.getItem("myalerts")){
      sessionStorage.setItem("myalerts", localStorage.getItem("myalerts"));
      localStorage.removeItem("myalerts");
    }
    const myalerts = sessionStorage.getItem("myalerts")?JSON.parse(sessionStorage.getItem("myalerts")):"";
    let len = myalerts.length;
    if (myalerts && myalerts.length > 0) {
      $(".abbott-alert").hide();
      let siVideo = setInterval(function() {
  
        /**Loop through the closed banners and hide them on page */
        myalerts.forEach(function(alert, index) {
          if (jQuery("#" + alert).length > 0) {
            jQuery("#" + alert).removeClass("m-alert--show");
            len--;
          }
        });
        if (len === 0) {
          clearInterval(siVideo);
          $(".abbott-alert").show();
        }
      }, 100);
    }
    
  });
  
