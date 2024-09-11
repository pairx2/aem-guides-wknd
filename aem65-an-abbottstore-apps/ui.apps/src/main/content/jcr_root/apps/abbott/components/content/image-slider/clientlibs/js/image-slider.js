/* Self Invoked function for Abbott Store*/
(function(ABBOTT) {

    ABBOTT.pdpCarousel = (function() {

        jQuery(function () {
          var $slider = jQuery('#page-slider');

          function bindHoverZoom(fotorama) {
            var $fotoramaImg = fotorama.activeFrame.$stageFrame.not('.fotorama__stage__frame--video').find('.fotorama__img');
			console.log(fotorama.activeFrame.$stageFrame);

            // Destroy existing ezPlus instances
            jQuery('.fotorama__img').each(function() {
              var ezPlus = jQuery(this).data('ezPlus');
              if(ezPlus && ezPlus.destroy) {
                ezPlus.destroy();
              }
            });

            // Init ezPlus for these conditions
            if(!ABBOTT.utils.isMobile && !fotorama.fullScreen && ABBOTT.utils.isAbbottStore) {
              $fotoramaImg.ezPlus({
                borderSize: 1,
                zoomLevel: 0.8,
                easing: true,
                zoomWindowOffsetX: 30,
                zoomWindowWidth: fotorama.activeFrame.$stageFrame.not('.fotorama__stage__frame--video').width() - 2,
                zoomWindowHeight: fotorama.activeFrame.$stageFrame.not('.fotorama__stage__frame--video').height() - 2
              });
            }
          }

          /**
           * @function full screen trigger method based on conditions
           * @param {*} fotorama 
           */
            function bindFullscreen(fotorama) {

              if(ABBOTT.utils.isAbbottStore) {
                var moved = false;
                
                fotorama.activeFrame.$stageFrame.not('.fotorama__stage__frame--video')
                .off('click.fullscreen touchstart.fullscreen')
                .on('touchstart.fullscreen', function() {moved = false;})
                .on('touchmove.fullscreen', function() {moved = true;})
                .on('click.fullscreen touchend.fullscreen', function (e) {
                    if (!moved) {
                      fotorama.requestFullScreen();
                    }
                  });
                }

              bindHoverZoom(fotorama);
            }

            $slider
                .on('fotorama:ready', function (e, fotorama) {
                  fotorama.setOptions({
                    click: false
                  });
                  jQuery('.fotorama__img').attr('alt', 'product-image');
                  setTimeout(function() {
                    jQuery('.fotorama__img').attr('alt', 'product-image');
                  }, 3000);
                })
                .on('fotorama:load fotorama:showend', function (e, fotorama) {
                    bindFullscreen(fotorama);
                    jQuery('.fotorama__img').css('transform', 'none').attr('alt', 'product-image');
                    fotorama.imageScale = 1.0; // Reset image scale value after image-slide
                })
                .on('fotorama:fullscreenenter', function (e, fotorama) {
                  var $plusIcon = jQuery('<div class="fotorama-zoom-in">+</div>');
                  var $minusIcon = jQuery('<div class="fotorama-zoom-out">-</div>');
                  var zoomStep = 0.2;
                  var maxZoom = 1.6;
                  fotorama.imageScale = 1.0; // store current scale value to a global place so that it can be reset on other events

                  /**
                   * @function
                   * @desc Sets image size for zoom in/out
                   */
                  function setImageSize(){
                    fotorama.activeFrame.$stageFrame.not('.fotorama__stage__frame--video').find('.fotorama__img').css({
                      transform: 'scale('+fotorama.imageScale+')',
                      transition: 'all 0.5s'
                    });
                  }

                  // Add plus icon event
                  $plusIcon.on('click touchstart', function(){
                    if(fotorama.imageScale <= maxZoom){
                      fotorama.imageScale += zoomStep;
                      fotorama.imageScale = Math.min(maxZoom, fotorama.imageScale); // Make sure to zoom level not go beyond limit
                      setImageSize();
                    }
                  });

                  // Add plus icon event
                  $minusIcon.on('click touchstart', function(){
                    if(fotorama.imageScale >= 1){
                      fotorama.imageScale -= zoomStep;
                      fotorama.imageScale = Math.max(1, fotorama.imageScale); // Make sure to zoom level not go below 1
                      setImageSize();
                    }
                  });

                  jQuery('.fullscreen .fotorama__img').bind('mousewheel', function (wheelEvent) {
                    // if fullscreen, do nothing
                    if (!fotorama.fullScreen) {
                      return;
                    }

                    //
                    var delta = wheelEvent.originalEvent.wheelDelta;
                    
                    if (delta > 0 && fotorama.imageScale <= maxZoom) {
                      fotorama.imageScale += zoomStep;
                      fotorama.imageScale = Math.min(maxZoom, fotorama.imageScale); // Make sure to zoom level not go beyond limit
                      
                    } else if (fotorama.imageScale >= 1) {
                      fotorama.imageScale -= zoomStep;
                      fotorama.imageScale = Math.max(1, fotorama.imageScale); // Make sure to zoom level not go below 1
                    }

                    setImageSize();
                  });

                  fotorama.activeFrame.$stageFrame.parent().after($plusIcon).after($minusIcon);
                })
                .on('fotorama:fullscreenexit', function (e, fotorama) {
                  jQuery('.fotorama-zoom-in, .fotorama-zoom-out').remove();
                  jQuery('.fotorama__img').css({
                    transform: 'none',
                    transition: 'none'
                  });
                  bindHoverZoom(fotorama);
                });
        });

    })();

})(window.ABBOTT || (window.ABBOTT = {}));