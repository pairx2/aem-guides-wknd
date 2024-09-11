$(function () {
  initializeHeroPanel();

  

  function initializeHeroPanel() {
        let heroPanelAutoPlay = $(document).find('#imageRotate').val(),
        heroPanelAutoPlaySpeed = $(document).find('#transitionTime').val() * 1000;

    $('.heroPanel-container').each(function () {

       if (heroPanelAutoPlay == "true") {
        $(this).find('.heroPanelSlider').slick({
          accessibility: true,
          autoplay: heroPanelAutoPlay,
          autoplaySpeed: heroPanelAutoPlaySpeed,
          dots: true,
          arrows: true
        });        
      } else {
		 
        $(this).find('.heroPanelSlider').slick({
          accessibility: true,
          dots: true,
          arrows: true
        });
      }
      $(this).find('.heroPanelSlider').css("visibility", "visible");

    });


  }

  

  

 



});