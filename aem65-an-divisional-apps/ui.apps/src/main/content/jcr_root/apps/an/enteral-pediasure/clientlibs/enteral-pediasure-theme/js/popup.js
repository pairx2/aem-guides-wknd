$(document).ready(function () {
    $(".siteLeave-alert").click(function(){
        if(confirm("Links that take you out of Abbott Laboratories worldwide web site are not under the control of Abbott Laboratories, and Abbott Laboratories is not responsible for the contents of any such site or any further links from such site. Abbott Laboratories is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement of the linked site by Abbott Laboratories. Do you wish to leave this site?")){
            let redirectUrl = $(this).attr("href");
            window.open(redirectUrl,"_blank");
        }else{
              return false;
        }
    });
});