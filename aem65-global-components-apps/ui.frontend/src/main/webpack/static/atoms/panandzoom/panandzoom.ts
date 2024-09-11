(function(){
	'use-strict';
	class PanAndZoom{
		constructor(elem: HTMLElement) {
			var _this = this;
			this.init(_this);
		}
		
		public getImageSize () {
			document.querySelectorAll(".imageFile").forEach((image:any) => {
				let realwidth:any, currWidth:any, perc:any;
				realwidth = image.naturalWidth;
				currWidth = realwidth;
				perc = (currWidth / 2) + "px";
				let popupId:any = "#" + image.getAttribute("data-id") + " .imagePopup";
				if(popupId){
					document.querySelector(popupId).style.width = perc;
				}
			});
		}

		public zoomin(elemTarget:any) {
			let modalContent = elemTarget.closest('.modal-content');
			let imageContentPopup = modalContent.querySelector('.imagePopup');
			let deskContent = elemTarget.closest('.modal').getAttribute('id');
			let deskImageContent:any = document.querySelector(`[data-id=${deskContent}]`);
			let actualWidth = deskImageContent?.naturalWidth;
			let popupimgsize = (imageContentPopup.clientWidth);
			let result = (popupimgsize + 100);
			let imageZoomIn = result + "px";
			imageContentPopup.style.width = imageZoomIn;
			if (result >= actualWidth) {
				elemTarget.parentElement.querySelector('.pan-zoom-in').style.opacity=0.5;
				elemTarget.parentElement.querySelector('.pan-zoom-in').style.pointerEvents='none';
			}
			elemTarget.parentElement.querySelector('.pan-zoom-out').style.opacity=1;
			elemTarget.parentElement.querySelector('.pan-zoom-out').style.pointerEvents='all';
		}

		public zoomout(elemTarget:any) {
			let modalContent = elemTarget.closest('.modal-content');
			let imageContentPopup = modalContent.querySelector('.imagePopup');
			let deskcontent = elemTarget.closest('.modal').getAttribute('id');
			let deskImageContent:any = document.querySelector(`[data-id=${deskcontent}]`);
			let actualWidth = deskImageContent.naturalWidth;
			let perc = (actualWidth / 2);
			let popupimgsize = (imageContentPopup.clientWidth);
			let result = (popupimgsize - 100);
			let imageZoomOut = result + "px";
			imageContentPopup.style.width = imageZoomOut;
			if (result <= perc) {
				elemTarget.parentElement.querySelector('.pan-zoom-out').style.opacity=0.5;
				elemTarget.parentElement.querySelector('.pan-zoom-out').style.pointerEvents='none';
			}
			elemTarget.parentElement.querySelector('.pan-zoom-in').style.pointerEvents='all';
			elemTarget.parentElement.querySelector('.pan-zoom-in').style.opacity=1;
		}
		private init(_this) {
			setTimeout(function() {
				_this.getImageSize();
			}, 2000);
		
			document.querySelectorAll('.pan-zoom-in').forEach(function(ele){
				ele?.addEventListener('click', function(event) {
					_this.zoomin(event.target);
				});
			})
			document.querySelectorAll('.pan-zoom-out').forEach(function(ele){
				ele?.addEventListener('click', function(event) {
					_this.zoomout(event.target);
				});
			})			
			document.querySelectorAll('.abt-icon-cancel').forEach(function(ele){
				ele?.addEventListener('click', function(event) {
					_this.getImageSize();
                    var target:any=event.target;
                    target.closest('.modal-content').querySelector('.pan-zoom-in').style.opacity=1;
                    target.closest('.modal-content').querySelector('.pan-zoom-in').style.pointerEvents='all';
			   		target.closest('.modal-content').querySelector('.pan-zoom-out').style.opacity=1;
                    target.closest('.modal-content').querySelector('.pan-zoom-out').style.pointerEvents='all';
				});
			});
		}
	}

	(function(){
		document.querySelectorAll('[data-js-component="panandzoom"]').forEach(function (elem) {
			
			  new PanAndZoom(elem as HTMLElement);
			
		  });
	})();

})();
