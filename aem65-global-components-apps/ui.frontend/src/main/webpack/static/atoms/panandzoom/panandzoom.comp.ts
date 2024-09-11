(function(){
	'use-strict';
	class PanAndZoom{
		constructor(elem: HTMLElement) {
			var _this = this;
			this.panInit(_this);
		}
		
		public getImageSize () {
			document.querySelectorAll(".a-pan-zoom__image").forEach((image:any) => {
				let realwidth:any, currWidth:any, perc:any;
				realwidth = image.naturalWidth;
				currWidth = realwidth;
				if (currWidth < 1920) {
                    perc = 960 + "px";
                    let popupId:any = "#" + image.getAttribute("data-id") + " .a-pan-zoom__image-popup";
                    document.querySelector(popupId).style.width = perc;
                    document.querySelector(popupId).closest('.modal').querySelector('.pan-zoom-out').style.opacity = 0.5;
                    document.querySelector(popupId).closest('.modal').querySelector('.pan-zoom-out').style.pointerEvents = 'none';
                }
                else {
                    perc = (currWidth / 2) + "px";
                    let popupId:any = "#" + image.getAttribute("data-id") + " .a-pan-zoom__image-popup";
                    if (popupId) {
                        document.querySelector(popupId).style.width = perc;
                        document.querySelector(popupId).closest('.modal').querySelector('.pan-zoom-out').style.opacity = 0.5;
                        document.querySelector(popupId).closest('.modal').querySelector('.pan-zoom-out').style.pointerEvents = 'none';
                    }
                }
			});
		}

		public panZoomIn(elemTarget:any) {
			let modalContent = elemTarget.closest('.modal-content');
            let imageContentPopup = modalContent.querySelector('.a-pan-zoom__image-popup');
            let deskContent = elemTarget.closest('.modal').getAttribute('id');
            let deskImageContent:any = document.querySelector("[data-id=".concat(deskContent, "]"));
            let actualWidth = deskImageContent?.naturalWidth;
            let popupimgsize = (imageContentPopup.clientWidth);
            if(actualWidth < 960){
				var result = (popupimgsize + 100);
                var imageZoomIn = result + "px";
                imageContentPopup.style.width = imageZoomIn;

				modalContent.querySelector('.dragscroll').scrollLeft+=100;
				modalContent.querySelector('.dragscroll').scrollTop+=100;
                modalContent.querySelector('.dragscroll').scrollRightt+=100;
				modalContent.querySelector('.dragscroll').scrollBottom+=100;
                if (result >= 1920) {
                    elemTarget.parentElement.querySelector('.pan-zoom-in').style.opacity = 0.5;
                    elemTarget.parentElement.querySelector('.pan-zoom-in').style.pointerEvents = 'none';
                }
                elemTarget.parentElement.querySelector('.pan-zoom-out').style.opacity = 1;
                elemTarget.parentElement.querySelector('.pan-zoom-out').style.pointerEvents = 'all';
            }
            if (popupimgsize <= actualWidth) {
                var result = (popupimgsize + 100);
                var imageZoomIn = result + "px";
                imageContentPopup.style.width = imageZoomIn;

				modalContent.querySelector('.dragscroll').scrollLeft+=100;
				modalContent.querySelector('.dragscroll').scrollTop+=100;
                modalContent.querySelector('.dragscroll').scrollRightt+=100;
				modalContent.querySelector('.dragscroll').scrollBottom+=100;
                if (result >= actualWidth) {
                    elemTarget.parentElement.querySelector('.pan-zoom-in').style.opacity = 0.5;
                    elemTarget.parentElement.querySelector('.pan-zoom-in').style.pointerEvents = 'none';
                }
                elemTarget.parentElement.querySelector('.pan-zoom-out').style.opacity = 1;
                elemTarget.parentElement.querySelector('.pan-zoom-out').style.pointerEvents = 'all';
            }
           
		}

		public panZoomOut(elemTarget:any) {
			let modalContent = elemTarget.closest('.modal-content');
			let imageContentPopup = modalContent.querySelector('.a-pan-zoom__image-popup');
			let deskcontent = elemTarget.closest('.modal').getAttribute('id');
			let deskImageContent:any = document.querySelector(`[data-id=${deskcontent}]`);
			let actualWidth = deskImageContent.naturalWidth;
			let perc = (actualWidth / 2);
			let popupimgsize = (imageContentPopup.clientWidth);
			let result = (popupimgsize - 100);
			let imageZoomOut = result + "px";
			imageContentPopup.style.width = imageZoomOut;
            modalContent.querySelector('.dragscroll').scrollLeft+=-100;
			modalContent.querySelector('.dragscroll').scrollTop+=-100;
            modalContent.querySelector('.dragscroll').scrollRightt+=-100;
			modalContent.querySelector('.dragscroll').scrollBottom+=-100;
			if (actualWidth < 1920) {
                if (result <= 960) {
                    elemTarget.parentElement.querySelector('.pan-zoom-out').style.opacity = 0.5;
                    elemTarget.parentElement.querySelector('.pan-zoom-out').style.pointerEvents = 'none';
                    elemTarget.parentElement.querySelector('.pan-zoom-in').style.pointerEvents = 'all';
                    elemTarget.parentElement.querySelector('.pan-zoom-in').style.opacity = 1;
                }
            }
            else {
                if (result <= perc) {
                    elemTarget.parentElement.querySelector('.pan-zoom-out').style.opacity = 0.5;
                    elemTarget.parentElement.querySelector('.pan-zoom-out').style.pointerEvents = 'none';
                }
                elemTarget.parentElement.querySelector('.pan-zoom-in').style.pointerEvents = 'all';
                elemTarget.parentElement.querySelector('.pan-zoom-in').style.opacity = 1;
            }
		}
		private panInit(_this) {
			setTimeout(function() {
				_this.getImageSize();
				if(document.querySelectorAll('[data-js-component="panandzoom"]').length > 0){
					document.querySelector('body')?.classList.add('pan-zoom-popup')
                }
			}, 2000);
		
			document.querySelectorAll('.pan-zoom-in').forEach(function(ele){
				ele?.addEventListener('click', function (event) {
                    let _this_1 = this;
                    if (!this.classList.contains('clicked')) {
                        _this.panZoomIn(event.target);
                    }
                    this.classList.add('clicked');
                    setTimeout(function () {
                        _this_1.classList.remove('clicked');
                    }, 100);
                });
			})
			document.querySelectorAll('.pan-zoom-out').forEach(function(ele:any){
				ele.style.opacity = 0.5;
                ele.style.pointerEvents = 'none';
                ele?.addEventListener('click', function (event) {
                    let _this_1 = this;
                    if (!this.classList.contains('clicked')) {
                        event.preventDefault();
                        _this.panZoomOut(event.target);
                    }
                    this.classList.add('clicked');
                    setTimeout(function () {
                        _this_1.classList.remove('clicked');
                    }, 100);
                });
			})
			document.addEventListener("click", function(ele) {
                if ((ele.target as HTMLElement)?.classList.contains('modal') || (ele.target as HTMLElement)?.classList.contains('abt-icon-cancel')) {
                    _this.getImageSize();
                    var target:any = ele.target;
                    target.closest('.modal').querySelector('.pan-zoom-in').style.opacity = 1;
                    target.closest('.modal').querySelector('.pan-zoom-in').style.pointerEvents = 'all';
                    target.closest('.modal').querySelector('.pan-zoom-out').style.opacity = 0.5;
                    target.closest('.modal').querySelector('.pan-zoom-out').style.pointerEvents = 'none';
                }
            });  
		}
	}

	(function(){
		document.querySelectorAll('[data-js-component="panandzoom"]').forEach(function (elem) {
			new PanAndZoom(elem as HTMLElement);
		});
	})();

})();