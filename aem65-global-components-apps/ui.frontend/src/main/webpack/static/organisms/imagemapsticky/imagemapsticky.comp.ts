(function () {

    class ImageMap {

        private elem: any;

        constructor(elem: any, stickyPos: any) {
            let _this = this;
            this.elem = elem;
            this.init(_this, stickyPos);
        }

        public imagePopup(dataValue: any) {
            this.elem.querySelectorAll('.o-imagemap-popup').forEach(function (imgShow) {
                imgShow.classList.add('hide');
                if (dataValue == imgShow.getAttribute('data-map-image')) {
                    imgShow.classList.remove('hide');
                }
            });
        }

        public imageMapContent(dataValue: any): void {
            this.elem.querySelector('#mapDropdown').value = dataValue;
            this.elem.querySelectorAll('.sticky-menu-content-desc').forEach(function (imgContent) {
                imgContent.classList.add('hide');
                if (dataValue == imgContent.getAttribute('data-map-image')) {
                    imgContent.classList.remove('hide');
                }
            });
        }

        public viewStory(dataValue: any) {
            this.elem.querySelector('#mapDropdown').value = dataValue;
            this.elem.querySelectorAll('.sticky-menu-content-desc').forEach(function (imgContent) {
                imgContent.classList.add('hide');
                if (dataValue == imgContent.getAttribute('data-map-image')) {
                    imgContent.classList.remove('hide');
                }
            });
        };

        public smoothScrollPos = function (pos, time) {
            var currentPos = window.pageYOffset;
            var start = null;
            if (time == null) time = 500;
            pos = +pos, time = +time;
            window.requestAnimationFrame(function step(currentTime) {
                start = !start ? currentTime : start;
                var progress = currentTime - start;
                if (currentPos < pos) {
                    window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
                } else {
                    window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
                }
                if (progress < time) {
                    window.requestAnimationFrame(step);
                } else {
                    window.scrollTo(0, pos);
                }
            });
        };

        public init(_this: any, stickyPos: any) {
            var __this = _this;
                var elemReq = this.elem;
                var initialContent = elemReq.querySelectorAll(".sticky-menu-content-desc")[0];
                initialContent.classList.remove('hide');
                var iconColor = elemReq.querySelector(".o-imagemap-image").getAttribute('data-map-icon-color');
                var imageMapTag = elemReq.closest(".o-imagemap");
                imageMapTag.style.setProperty("--icon-color", iconColor);

                elemReq.querySelector('#mapDropdown').addEventListener('change', function () {
                    _this.imageMapContent(this.value);
                    __this.smoothScrollPos(stickyPos, 500);
                    elemReq.querySelector(".sticky-menu-content")?.classList.add('mt-100');
                });
                elemReq.querySelectorAll('area').forEach(function (a) {
                    var areaCoor = a.getAttribute('coords').split(',');
                    var topPosition = areaCoor[1] - areaCoor[2];
                    var leftPosition = areaCoor[0] - areaCoor[2];
                    var style = "position: absolute; top: " + topPosition + "px; left: " + leftPosition + "px; background-color: var(--icon-color)";
                    var className = "image-map-click inactive";
                    var aTag = document.createElement('a');
                    var linkArea = a.getAttribute('href');
                    aTag.setAttribute('href', linkArea);
                    aTag.setAttribute('style', style);
                    aTag.setAttribute('class', className);
                    a.closest('.cmp-image').appendChild(aTag);
                });
                elemReq.querySelectorAll('.o-imagemap-popup--content').forEach(function (popupImg) { 
                    var popupImgVar = "background-image: url('" + popupImg.getAttribute("data-map-popup-bgimage") + "');"
                    popupImg.setAttribute("style", popupImgVar);
                });
                setTimeout(function () {
                    elemReq.querySelectorAll('.image-map-click').forEach(function (link) {
                        link.addEventListener('click', function (event) {
                            event.preventDefault();
    
                            var dataValue = this.getAttribute('href').replace("#", "par-");
                            if (this.classList.contains('active')) {
                                this.classList.remove('active');
                                this.classList.add('inactive');
                                elemReq.querySelectorAll('.o-imagemap-popup').forEach(function (imgShow) {
                                    if ( dataValue == imgShow.getAttribute('data-map-image')) {
                                        imgShow.classList.add('hide');
                                    }
                                });
                            } else {
                                elemReq.querySelectorAll('.image-map-click').forEach(function (clickIcon) {
                                    clickIcon.classList.remove("active");
                                    clickIcon.classList.add('inactive');
                                });
                                this.classList.remove('inactive');
                                this.classList.add('active');
                                _this.imagePopup(dataValue);
                            }
                        });
                    });
                    elemReq.querySelectorAll('.o-imagemap-popup--content__button').forEach(function (link) {
                        link.addEventListener('click', function (event) {
                            event.preventDefault();
                            this.closest(".o-imagemap-popup").classList.add('hide');
                            elemReq.querySelectorAll('.image-map-click').forEach(function (imgclose) {
                                imgclose.classList.add('inactive');
                            });
                        });
                    });
                    elemReq.querySelectorAll('.back-to-map').forEach(function (link) {
                        link.addEventListener('click', function (event) {
                            event.preventDefault();
                            var offset = elemReq.closest('.imagemapwithstickymenu').offsetTop;
                            __this.smoothScrollPos(offset, 500);
                        });
                    });
                    elemReq.querySelectorAll('.o-imagemap-popup--content__viewstory').forEach(function (link) {
                        link.addEventListener('click', function (event) {
                            event.preventDefault();
                            elemReq.querySelectorAll('.image-map-click').forEach(function (imgclose) {
                                imgclose.classList.add('inactive');
                            });
                            var dataValue = this.closest('.o-imagemap-popup').getAttribute('data-map-image');
                            this.closest('.o-imagemap-popup').classList.add('hide');
                            __this.smoothScrollPos(stickyPos, 500);
                            elemReq.querySelector(".sticky-menu-content").classList.add('mt-100');
                            _this.viewStory(dataValue);
                        });
                    });
                }, 500);
        }
    }

    class ImageMapCompact {

        private elem: any;

        constructor(elem: any) {
            let _this = this;
            this.elem = elem;
            this.init(_this);
        }


        public init(_this: any) {
            var elemReq = this.elem;
            var iconColor = elemReq.querySelector(".o-imagemap-image").getAttribute('data-map-icon-color');
            var imageMapTag = elemReq.closest(".o-imagemap");
            imageMapTag.style.setProperty("--icon-color", iconColor);
            elemReq.querySelectorAll('area').forEach(function (a) {
                elemReq.querySelectorAll('.o-imagemap-popup').forEach(function (imageCompact) {
                    var areaRef = a.getAttribute('href').replace("#", "par-");
                    var imageMapContent = imageCompact.getAttribute('data-map-image');
                    if (areaRef == imageMapContent) {
                        var areaCoor = a.getAttribute('coords').split(',');
                        var topPosition = areaCoor[1] - areaCoor[2];
                        var leftPosition = areaCoor[0] - areaCoor[2];
                        var style = "position: absolute; top: " + topPosition + "px; left: " + leftPosition + "px; background-color: var(--icon-color)";
                        var className = "image-map-click inactive";
                        var hideClassName = "image-map-mousehover hide ";
                        hideClassName += imageCompact.getAttribute('data-map-popup-position') == "right" ? "image-map-mousehover--right" : "image-map-mousehover--left";
                        var aTag = document.createElement('a');
                        var linkArea = a.getAttribute('href');
                        aTag.setAttribute('href', linkArea);
                        aTag.setAttribute('style', style);
                        aTag.setAttribute('class', className);
                        var dTag = document.createElement('div');
                        dTag.setAttribute('class', hideClassName);
                        var pTag = document.createElement('p');
                        pTag.innerHTML = imageCompact.querySelector('p').innerHTML;
                        var spanTag = document.createElement('span');
                        dTag.appendChild(spanTag);
                        dTag.appendChild(pTag);
                        aTag.appendChild(dTag);
                        a.closest('.cmp-image').appendChild(aTag);
                    }
                });
            });
            setTimeout(function () {
                elemReq.querySelectorAll('.image-map-click').forEach(function (link) {
                    link.addEventListener('mouseover', function (event) {
                        event.preventDefault();
						if (!this.classList.contains('active')) {
							elemReq.querySelectorAll('.image-map-click').forEach(function (mouselinkHover) {
								mouselinkHover.querySelector('.image-map-mousehover').classList.add('hide');
								mouselinkHover.classList.add('inactive');
							});
							this.querySelector('.image-map-mousehover').classList.remove('hide');
						}
                    });
                    link.addEventListener('click', function (event) {
                        event.preventDefault();
                        if (this.classList.contains('active')) {
                            this.classList.remove('active');
                            this.classList.add('inactive');
                            this.querySelector('.image-map-mousehover').classList.add('hide');
                        }
                        else {
                            elemReq.querySelectorAll('.image-map-click').forEach(function (mouselinkHover) {
                                mouselinkHover.querySelector('.image-map-mousehover').classList.add('hide');
                                mouselinkHover.classList.remove("active");
                                mouselinkHover.classList.add('inactive');
                            });
                            this.classList.remove('inactive');
                            this.classList.add('active');
                            this.querySelector('.image-map-mousehover').classList.remove('hide');
                        }
                    });
                    var initialContent = elemReq.querySelectorAll(".image-map-mousehover")[0];
                    initialContent.classList.remove('hide');
                });
            }, 500);
        }
    }

    (function () {

        document.onreadystatechange = function () {
            if (document.readyState == "complete") {

                var imageClass = "";
                if($(window).width() <= 1200 && $(window).width() >= 1024) {
                    imageClass = ".a-image__default";
                } else if($(window).width() < 1024) {
                    imageClass = ".cmp-image__image--tablet";
                } 

                var mapImage = $(".o-imagemap-image").find(".cmp-image");
                $(mapImage).each(function() {
                    var d = $(this).find(imageClass).height(),
                    h = $(this).find(imageClass).width();
                    $(this).find("area").each(function() {
                        if (h && d) {
                            var b = $(this).data("cmp-relcoords");
                            if (b) {
                                b = b.split(",");
                                for (var a = Array(b.length), c = 0; c < a.length; c++)
                                    a[c] = 0 === c % 2 ? parseInt(b[c] * h) : parseInt(b[c] * d);
                                $(this).attr("coords", a)
                            }
                        }
                    })
                });


                var offsetVal = $('.o-imagemap-sticky-menu').offset();
                var sticky = offsetVal?.top;
                var imageMapMenu = document.querySelector('.o-imagemap-sticky-menu')?.clientHeight;
                var stickyPos = sticky - imageMapMenu - 15;

                document.querySelectorAll('[data-js-component="image-map-default"]').forEach(function (elem) {
                    new ImageMap(elem, stickyPos);
                });

                window.onscroll = function () { imageMapStickyMenu(); };

                function imageMapStickyMenu() {
                    var menuTop = 0;
                    if (document.querySelector('.o-header__sticky-section') && getComputedStyle(document.querySelector('.o-header__sticky-section')).position == 'fixed') {
                        menuTop = document.querySelector('.o-header__sticky-section').clientHeight;
                        menuTop = menuTop - 1;
                    }
                    if (document.querySelector('.o-header-v2-global__sticky-section') && getComputedStyle(document.querySelector('.o-header-v2-global__sticky-section')).position == 'fixed') {
                        menuTop = document.querySelector('.o-header-v2-global__sticky-section')?.clientHeight;
                        menuTop = menuTop - 1;
                    }

                    if (window.pageYOffset >= stickyPos) {
                        document.querySelector(".o-imagemap-sticky-menu")?.classList.add("sticky-image-menu");
                        document.querySelector(".o-imagemap-sticky-menu")?.setAttribute('style', 'top:' + menuTop + 'px');
                        document.querySelector(".sticky-menu-content")?.classList.add('mt-100');
                    }
                    else {
                        document.querySelector(".o-imagemap-sticky-menu")?.classList.remove("sticky-image-menu");
                        document.querySelector(".o-imagemap-sticky-menu")?.setAttribute('style', 'top:' + 0);
                        document.querySelector(".sticky-menu-content")?.classList.remove('mt-100');
                    }
                }

                document.querySelectorAll('[data-js-component="image-map-compact"]').forEach(function (elem) {
                    new ImageMapCompact(elem as any);
                });


            }
        }
    })();
})();