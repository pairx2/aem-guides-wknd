import { Common } from '../common';

class SiteEnteringPopup {
	private container: any;
	private static contentmodalId: string = '#site-entering-popup-content';
	private static modalId: string = 'siteEnteringPopupFragmentPath';
	private static siteEnteringModalId: string = '#' + SiteEnteringPopup.modalId;
	private static popupContentWrapper: Element = document.querySelector(SiteEnteringPopup.contentmodalId);
	private static popupFooterContent: string = '';
	private static template;

	private siteCountry: string;
	private alreadyVisited: Array<String>;
	private api: string;

	constructor(ele) {
		this.container = ele;
		this.api = $("#site-entering-popup-content").attr("data-api-url");
		this.siteCountry = $("input[name='x-country-code']").val().toString().toUpperCase();
		if (null != localStorage.getItem('alreadyVisited')) {
			this.alreadyVisited = localStorage.getItem('alreadyVisited').split(',');
        }
		this.findMyLocation();
    }
    
	private static generateTemplate() {
		let popupContent,
			templateModalStr = [];

		// Remove container from xf-page and add to modal-footer.
		SiteEnteringPopup.popupContentWrapper.querySelector('.m-popup-content')?.querySelector('section.a-container')?.querySelectorAll('div.a-container__column')?.forEach(function (ele: HTMLElement) {
			ele.remove();
			SiteEnteringPopup.popupFooterContent += ele.innerHTML;
		});

		popupContent = SiteEnteringPopup.popupContentWrapper.querySelector('.m-popup-content').innerHTML;

		templateModalStr.push('<div class="modal generic-modal" tabindex="-1" role="dialog" id="' + SiteEnteringPopup.modalId + '" data-js-component="pop-up">');
		templateModalStr.push('<div class="modal-dialog modal-dialog-centered" role="document">');
		templateModalStr.push('<div class="modal-content generic-modal__content">');
		templateModalStr.push('<div class="modal-header generic-modal__header">');
		templateModalStr.push('<span class="generic-modal--close" data-dismiss="modal" aria-label="Close">');
		templateModalStr.push('<i aria-hidden="true" class="abt-icon abt-icon-cancel"></i>');
		templateModalStr.push('</span>');
		templateModalStr.push('</div>');
		templateModalStr.push('<div class="modal-body generic-modal__content-body">');
		templateModalStr.push(popupContent);
		templateModalStr.push('</div>');
		templateModalStr.push('<div class="modal-footer generic-modal__content-footer">' + SiteEnteringPopup.popupFooterContent + '</div>');
		templateModalStr.push('</div>');
		templateModalStr.push('</div>');
		templateModalStr.push('</div>');

		SiteEnteringPopup.template = templateModalStr.join('');
	}

	private static updateModalContent() {

		//  If the siteEnteringPopupFragmentPathModal modal is not present only then create the template
		if (!document.querySelector(SiteEnteringPopup.siteEnteringModalId)) {
			SiteEnteringPopup.generateTemplate();

			let parser = new DOMParser(),
				html = parser.parseFromString(SiteEnteringPopup.template, 'text/html').querySelector('body').childNodes[0] as any;

			if (SiteEnteringPopup.popupContentWrapper.querySelector('img')) {
				html.classList.add('generic-modal--image');
				html.querySelector('img').classList.add('generic-modal__image-link');
				html.querySelector('img').closest('div').classList.add('generic-modal__image');
			}

			let bodyElem = document.querySelector('body');
			bodyElem.appendChild(html);
			bodyElem.querySelector(SiteEnteringPopup.contentmodalId).remove();
		}
	}

	private getRequestHeaders(): any {
		return Common.getPageParamsForHeader();
	}

	//function executing network call to the enterprise geolocation service
	private findMyLocation() {
		if (null == this.alreadyVisited || !this.alreadyVisited.includes(this.siteCountry)) {
			fetch(this.api, {
				headers: this.getRequestHeaders()
			}).then((resp) => resp.json())
			  .then(function (data: any) {
				this.showSiteEnterPopup(data);
			  }.bind(this))
		}
	}

	//Function to show site entering popup
	public showSiteEnterPopup(data) {
		let country = data.response.countryCode.toUpperCase();
		let cvIntDiscLSName = "alreadyVisited";
		let cvIntDisc = this.getDisclaimerStorage('alreadyVisited');
		if (null == this.alreadyVisited) {
			this.alreadyVisited = [];
		}
		this.alreadyVisited.push(this.siteCountry);
			let createResponse = (document.querySelector("[name='data-create-cookie-response']") as HTMLInputElement).value;
			let expiryPeriod = (document.querySelector("[name='data-cookie-expire-period']") as HTMLInputElement).value;
			if(createResponse == 'true' || createResponse == '' || createResponse == null || createResponse == undefined){
				this.setDisclaimerStorage(cvIntDiscLSName, this.alreadyVisited.toString(), expiryPeriod);
				setTimeout(()=>{
		     document.querySelector("#site_disclaimer_confirm_btn")?.addEventListener('click', function(event){
				 $(SiteEnteringPopup.siteEnteringModalId).modal('hide');
		     });
		 }, 500);
			}
			else if(createResponse == "false"){
				let _this = this;
				setTimeout(()=>{
					document.querySelector("#site_disclaimer_confirm_btn")?.addEventListener('click', function(event){
						_this.setDisclaimerStorage(cvIntDiscLSName, _this.alreadyVisited, expiryPeriod);
							$(SiteEnteringPopup.siteEnteringModalId).modal('hide');
					});
				}, 500);
		}
		if (country != this.siteCountry) {
            SiteEnteringPopup.updateModalContent();
            $(SiteEnteringPopup.siteEnteringModalId).modal('show');
		}

	}

	public getDisclaimerStorage(key) {

		let now = Date.now();  //epoch time, lets deal only with integer
		// set expiration for storage
		let expiresIn:any = localStorage.getItem(key+'_expiresIn');
		if (expiresIn===undefined || expiresIn===null) { expiresIn = 0; }
	
		if (expiresIn < now) {// Expired
			this.removeDisclaimerStorage(key);
			return null;
		} else {
			try {
				let value = localStorage.getItem(key);
				return value;
			} catch(e) {
				return null;
			}
		}
	}
	
	public removeDisclaimerStorage(name) {
		try {
			localStorage.removeItem(name);
			localStorage.removeItem(name + '_expiresIn');
		} catch(e) {
			return false;
		}
		return true;
	}

	public setDisclaimerStorage = function(key, value, expires) {
	
		if (expires===undefined || expires===null) {
			expires = '';  // default: seconds for 1 day
		} else {
			expires = Math.abs(expires); //make sure it's positive
		}
		let now = Date.now();  //millisecs since epoch time, lets deal only with integer
		let schedule:any = now + (expires * 1000 * 60 * 60 * 24) ; 
		try {
			localStorage.setItem(key, value);
            if(expires > 0 && expires != ''){
				localStorage.setItem(key + '_expiresIn', schedule);
            }
		} catch(e) {
			return false;
		}
		return true;
	}


}
$(function () {
	var wcmmode = $("#site-entering-popup-content").attr("data-wcm-edit-mode");
	var siteEnterPopupRequired = $("#site-entering-popup-content").attr("data-site-entering-popup-required");
	if ('false' == wcmmode && 'true' == siteEnterPopupRequired) {
		new SiteEnteringPopup(HTMLElement);
	}
});