import { Common } from '../../common';
import { Loader, LoaderOptions } from 'google-maps';
import { Pagination } from '../../atoms/pagination/pagination.comp';

declare var window: any;

(function () {
  'use-strict';

  class POILocator {
    private loader: any;
    private map: any;
    private lat: number;
    private long: number;
    private mapPinImageUrl: string;
    private mapRadius: number;
    private mapZoom: number;
    private mapMarkerPinText: string;
    private mapMarkerImage: string;
    private resultItemTemplateEle: HTMLElement;
    private googleMapApiKey: string;
    private googleMapApiUrl: string;
    private pinTemplateEle: HTMLElement;
    private POILocatorForm: HTMLElement;
    private api: string;
    private container: HTMLElement;
    private $inputData: HTMLElement;
    private $useMyLocationCTA: HTMLElement;
    private $inputFieldErrorText: HTMLElement;
    private $noResultFoundText: HTMLElement;
    private resultRenderOnPageLoad: boolean;
    private resultListNumber: boolean;
    private mapOrigin: object;
    private onLoadCountryFieldValue: any;
    private pagination: Pagination;
    private currentPage: any = 1;
    private pageSize: number;
    private listWrapper: HTMLElement;
    private gridWrapper: HTMLElement;
    private paginationTitle: HTMLElement;
    private paginationRightSection: HTMLElement;
    private paginationShowHide: any;
    private callbackList: any = {};
    private poiId: string;
    private updateRequestFn: string;

    constructor(ele) {
      this.container = ele;
      this.updateRequestFn = ele.querySelector('input[name="updateRequest"]')?.value;
      this.resultItemTemplateEle = ele.querySelector('#result-items');
      this.pinTemplateEle = ele.querySelector('#result-temp');
      this.POILocatorForm = ele.querySelector('#POI-locator-form');
      this.googleMapApiKey = ele.dataset.mapKey;
      this.googleMapApiUrl = ele.dataset.mapUrl;
      this.api = ele.dataset.apiUrl;
      this.loader = new Loader(this.googleMapApiKey);
      this.mapRadius = ele.querySelector('[name="mapradius"]').value;
      this.mapZoom = ele.querySelector('[name="mapzoom"]').value;
      this.mapMarkerPinText = ele.querySelector('[name="mapmarkerpintext"]').value;
      this.mapMarkerImage = ele.querySelector('[name="mapmarkerimage"]').value;
      this.onLoadCountryFieldValue = ele.querySelector('[name="entercityorstateonpageload"]').value;
      this.mapPinImageUrl = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=';
      this.$inputData = ele.querySelector('.m-poi-locator-search-bar__input-field');
      this.$useMyLocationCTA = ele.querySelector('.use-my-location-button');
      this.$inputFieldErrorText = ele.querySelector('.m-poi-locator-search-bar__error');
      this.$noResultFoundText = ele.querySelector('.m-poi-locator-results__no-resultfound');
      this.map;
      this.resultRenderOnPageLoad = ele.querySelector('[name="showresultonpageload"]').value === 'true';
      this.resultListNumber = ele.querySelector('[name="showduplicateresultnumber"]').value === 'true';
      this.paginationTitle = ele.querySelector('.a-pagination-title');
      this.paginationRightSection = ele.querySelector('.a-pagination-right-section');
      this.listWrapper = ele.querySelector('.list-wrapper');
      this.listWrapper?.addEventListener('click', this.listViewHandler.bind(this));
      this.gridWrapper = ele.querySelector('.grid-wrapper');
      this.gridWrapper?.addEventListener('click', this.gridViewHandler.bind(this));

      this.mapOrigin = { lat: null, lang: null };
      this.pageSize = ele.querySelector('[name="poi-locator-result-number"]')?.value;

      this.paginationShowHide = ele.querySelector('[name="poi-locator-pagination-show-hide"]')?.value;

      if (this.paginationShowHide == 'true') {
        this.initPagination();
      }

      this.mapInitRender();
      this.POILocatorForm?.addEventListener('submit', this.SearchCTAHandler.bind(this));
      this.$useMyLocationCTA?.addEventListener('click', this.useMyLocationCTAHandler.bind(this));
      this.infoWindowOpenOnClick();
      this.onPageLoadResultRender();

      this.poiId = ele.id;
      this.setPOILocatorCallbacks();
      this.setCallbackBucket(this.poiId);

    }

    private onPaginationClick(data: any) {
      if (+data === this.currentPage) {
        return;
      }
      this.currentPage = +data;
      this.showPage(this.currentPage);
    }

    private initPagination() {
      const paginationEle = this.container.querySelector('.a-pagination');
      this.pagination = new Pagination(paginationEle as HTMLElement);
      this.pagination.onPageClick(this.onPaginationClick.bind(this));
      this.currentPage = this.pagination.getCurrentPage();
    }

    /**
    * @function
    * @desc Adds POILocatorCallbacks container to public namespace
    */
    private setPOILocatorCallbacks() {
      window.poiLocatorCallbacks = window.poiLocatorCallbacks || {};

      const poiId = this.poiId;
      if (!poiId) {
        return;
      }

      if (!window.poiLocatorCallbacks[poiId]) {
        window.poiLocatorCallbacks[poiId] = {};
      }

      const callbackList = window.poiLocatorCallbacks[poiId];

      if (this.updateRequestFn) { callbackList.updateRequest = this.updateRequestFn; }
    }

     /**
     * @function
     * @desc fetches callbacks for the current form instance from the callback-bucket
     * @param {String} formId form ID
     */
    public setCallbackBucket(poiId: string) {

        // if poiId not given, do nothing
        if(!poiId) {
            return;
        }

        const callbackBucket = window.poiLocatorCallbacks;
        this.callbackList = callbackBucket[poiId];
    }

     /**
     * @function
     * @desc checks if passed value is a function
     * @param fn
     * @return {Boolean} validation result if passed value is a function
     */
    private isFunction(fn: any): boolean {
        return fn && typeof fn === 'function';
    }

    private updateRequest(response: any) {
      const updateRequestFn: Function = window[this.callbackList.updateRequest]; 
      if (!this.isFunction(updateRequestFn)) {
          return response;
      }else{
          var newResponse = updateRequestFn(response);
          return newResponse;
      }
    }

    private SearchCTAHandler(e): any {
      e.preventDefault();
      if (this.$inputData.value == '') {
        this.$inputFieldErrorText.classList.remove('d-none');
        this.$noResultFoundText.classList.add('d-none');
        $('.m-poi-locator-results__wrap').css('display', 'none');
      } else {
        this.searchAPIhandle(this.$inputData.value);
        this.$inputFieldErrorText.classList.add('d-none');
      }
    }

    private infoWindowOpenOnClick(): any {
      $('body').on('click', '.m-poi-locator-results__list-item h3', function () {
        $('.m-poi-locator-results__list-item').removeClass('active');
        $(this).parents('.m-poi-locator-results__list-item').addClass('active');
        var _storeId = $(this).parents('.m-poi-locator-results__list-item').data('locator-id');
        $('.gm-ui-hover-effect').trigger('click');
        $('#map div[title="' + _storeId + '"]').click();
        $('html, body').animate({ scrollTop: $(".m-poi-locator-results__wrap").offset().top - 130 }, 800);
      });
    }

    private listViewHandler(): any {
      this.listWrapper.classList.add('active');
      if ($(this.gridWrapper).hasClass('active')) {
        this.gridWrapper.classList.remove('active');
      }
      $('.m-poi-locator-results__list').removeClass('m-poi-locator-results__view-grid');
      $('.m-poi-locator-results__list-item').removeClass('col-lg-4 col-md-6 col-sm-12');
    }

    private gridViewHandler(): any {
      this.gridWrapper.classList.add('active');
      $('.m-poi-locator-results__list').addClass('m-poi-locator-results__view-grid');
      $('.m-poi-locator-results__list-item').addClass('col-lg-4 col-md-6 col-sm-12');
      if ($(this.listWrapper).hasClass('active')) {
        this.listWrapper.classList.remove('active');
      }
    }

    private useMyLocationCTAHandler(): any {
      var _that = this;
      _that.$inputData.value = '';
      _that.$inputFieldErrorText.classList.add('d-none');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          _that.lat = position.coords.latitude;
          _that.long = position.coords.longitude;
          _that.useMyLocationHandle(_that.lat, _that.long);
        });
      }
    }

    private getRequestHeaders(): any {
      return Common.getPageParamsForHeader();
    }

    private onPageLoadResultRender() {
      var _that = this;
      if (this.resultRenderOnPageLoad === true && _that.onLoadCountryFieldValue !== "") {
        _that.searchAPIhandle(_that.onLoadCountryFieldValue);
      } else if (this.resultRenderOnPageLoad === true) {
        $.ajax({
          type: "get",
          url: _that.api,
          headers: _that.getRequestHeaders(),
          success: function (data) {
            if (data.status === true) {
              _that.searchAPIhandle(data.response.poiData[0].country);
            }
          }
        });
      }
    }

    private mapInitRender() {
      this.loader.load().then(function (google) {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      });
    }

    private resultListRender(listNumber, data, templateSelector) {
      var _that = this;
	  const cloneNodeParent: HTMLElement = templateSelector.content.cloneNode(true);
      const cloneNodeRoot: HTMLElement = cloneNodeParent.querySelector('.m-poi-locator-results__list-item');
      const cloneNode: HTMLElement = cloneNodeRoot ? cloneNodeRoot : cloneNodeParent.querySelector('.a-pin-icon-popup');
      let tempStr = cloneNode.outerHTML;
      const matches = tempStr.match(/\{(.*?)\}/gm);
      const uniqueMatches = Array.from(new Set(matches));

      uniqueMatches.forEach((match) => {
        const key = match.replace(/\{|\}/g, '');
        const reg = new RegExp(match, 'gm');
        if (key == 'distance') {
          tempStr = tempStr.replace(reg, Number(data.geometry.distance).toFixed(2) || '');
        } else if (key == 'latitude') {
          tempStr = tempStr.replace(reg, data.geometry.latitude || '');
        }
        else if (key == 'Origlatitude') {
          tempStr = tempStr.replace(reg, _that.mapOrigin.lat || '');
        }
        else if (key == 'Origlongitude') {
          tempStr = tempStr.replace(reg, _that.mapOrigin.lang || '');
        }
        else if (key == 'longitude') {
          tempStr = tempStr.replace(reg, data.geometry.longitude || '');
        } else if (key == 'listNumber') {
          tempStr = tempStr.replace(reg, listNumber || '');
        } else if (key == 'website') {
          tempStr = tempStr.replace(reg, data.website || '');
        } else {
          tempStr = tempStr.replace(reg, data[key] || '');
        }
      });

      return tempStr;
    }

    private renderPagination(results: Array<any>, count: any) {
      const pages = Math.ceil(count / this.pageSize);
      this.pagination.render(pages, this.currentPage);
      return pages;
    }

    private commonAJAXCall($lat, $lang, $kms) {
      var _that = this;
      $.ajax({
        type: "get",
        headers: _that.getRequestHeaders(),
        url: `${_that.api}?nearLocation=true&latitude=${$lat}&longitude=${$lang}&radius=${_that.mapRadius}${$kms != undefined ? '&unit=kilometer' : ''}`,
        beforeSend: function () {
          Common.showSpinner(this.container);
        },
        success: function (data) {
          var resultWrap = $('.m-poi-locator-results__wrap');
          if (data.status === true && data.response.poiData.length > 0) {
            _that.$noResultFoundText.classList.add('d-none');
            resultWrap.css('display', 'block');
            _that.paginationTitle?.classList.add('d-inline-block');
            _that.paginationRightSection?.classList.remove('d-none');
            if (_that.paginationShowHide == 'false') {
              $('.m-poi-locator-results__list').addClass('no-pagination')
            }

          } else {
            _that.$noResultFoundText.classList.remove('d-none');
            resultWrap.css('display', 'none');
            _that.paginationTitle?.classList.remove('d-inline-block');
            _that.paginationRightSection?.classList.add('d-none');
          }
          var output = "",
            resultLength = data.response.poiData.length,
            $resultCount = $('.m-poi-locator-results__count span'),
            $list = $('.m-poi-locator-results__list');
          var listItem = $('.m-poi-locator-results__list-item');
          var listItemNumber: number;          

          var responseData = _that.updateRequest(data.response.poiData);
          resultLength = responseData.length;
		  if (_that.paginationShowHide == 'true') {
            _that.renderPagination(responseData, resultLength);
          }

          listItemNumber = 0;

          if (_that.paginationShowHide == 'true') {
            _that.renderPagination(responseData, resultLength);
          }
          $.each(responseData, function (index: number, value) {
            if (_that.resultListNumber === true){
              if (index > 0 && value.geometry.latitude == responseData[index - 1].geometry.latitude) {
                listItemNumber - 1;
              } else {
                listItemNumber++;
              }
            } else{
              listItemNumber = index + 1;
            }
            
            output += _that.resultListRender(listItemNumber, value, _that.resultItemTemplateEle);
          });


          $list.empty().append(output);

          _that.addHrefAttrWebsite();

          if (_that.paginationShowHide == 'true') {
            _that.showPage(1);
          }

          $resultCount.empty().append(resultLength);

          var markerItem: any;
          var marker: any;
          var popupTmpItem: any;
          var markerCount = 0;
          var pinIconColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--a-pin-icon-popup-pin-icon-bg-color').substring(1);
          var pinIconTextColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--a-pin-icon-popup-pin-icon-text-color').substring(1);
          var getDirectionUrl = 'https://www.google.com/maps/dir/?api=1&origin=';
          
            $.each(responseData, function (index: number, markerItem) {
              if (_that.resultListNumber === true) {
                if (index > 0 && markerItem.geometry.latitude == responseData[index - 1].geometry.latitude) {
                  markerCount - 1;
                } else {
                  markerCount++;
                }
              } else {
                markerCount = index + 1;
              }
            popupTmpItem = _that.resultListRender(markerCount, markerItem, _that.pinTemplateEle);
            marker = new google.maps.Marker({
              map: _that.map,
              title: markerItem.id,
              position: new google.maps.LatLng(markerItem.geometry.latitude, markerItem.geometry.longitude),
              icon: `${_that.mapMarkerImage}` !== '' ? `${_that.mapMarkerImage}` : `${_that.mapPinImageUrl}${markerCount}|${pinIconColor}|${pinIconTextColor}`,
              label: `${_that.mapMarkerImage}` !== '' ? {
                text: `${markerCount}`,
                className: 'm-poi-locator-results__map__pintext',
                color: `${_that.mapMarkerPinText}`
              } : ``
            });
            _that.googleMapsInfoWindow(marker, popupTmpItem);
            _that.hideEmptyRowData();

          })
        },
        error: function () {

        },
        complete: function () {
          Common.hideSpinner();
        }
      });

    }

    private hideEmptyRowData() {
      var _selectorele = '.m-poi-locator-results__list-item-detail';
      $(_selectorele + '--store-contact a:empty').hide();
      $(_selectorele + '--store-contact a:empty').parents(_selectorele).find(_selectorele + '--store-contact-label').hide();
      $(_selectorele + '--store-contact a:empty').parents(_selectorele).find(_selectorele + '--store-contact-details').hide();
      $(_selectorele + '--store-address:empty').hide();
      $(_selectorele + '--store-address:empty').parents(_selectorele).find(_selectorele + '--store-address-label').hide();

      $(_selectorele + '--store-doctor-name:empty').hide();
      $(_selectorele + '--store-doctor-name:empty').parents(_selectorele).find(_selectorele + '--store-doctor-name-label').hide();
      $(_selectorele + '--store-doctor-name:empty').parents(_selectorele).find(_selectorele + '--store-doctor-name-details').hide();

      $(_selectorele + '--store-device-type:empty').hide();
      $(_selectorele + '--store-device-type:empty').parents(_selectorele).find(_selectorele + '--store-device-type-details').hide();

      $(_selectorele + "--visit-website a[data-href='']").parents(_selectorele).find(_selectorele + '--visit-website').hide();
    }

    private addHrefAttrWebsite() {
      $(".m-poi-locator-results__list-item-detail--visit-website a").each(function() {
        var dataHrefVal = $(this).attr('data-href');
        $(this).attr('href', dataHrefVal);
      });
    }    

    private showPage(page: Number) {
      var _that = this;
      $(".m-poi-locator-results__list-item").hide();
      $(".m-poi-locator-results__list-item").each(function (n) {
        if (n >= _that.pageSize * (page - 1) && n < _that.pageSize * page)
          $(this).show();
      });
    }

    private searchAPIhandle($inputData) {
      var _that = this;
      $.ajax({
        type: "get",
        url: `${_that.googleMapApiUrl}?address=${$inputData}&key=${_that.googleMapApiKey}`,
        success: function (data) {

          if (data.status == "OK") {
            _that.loader.load().then(function (google) {
              _that.map = new google.maps.Map(document.getElementById('map'), {
                center: {
                  lat: data.results[0].geometry.location.lat,
                  lng: data.results[0].geometry.location.lng
                },
                zoom: Number(_that.mapZoom),
              });

            });
            _that.mapOrigin.lat = data.results[0].geometry.location.lat;
            _that.mapOrigin.lang = data.results[0].geometry.location.lng;
            _that.commonAJAXCall(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
			 var $poiLocatorSearch = $('#result-items');
            var base = $poiLocatorSearch.prop('content');
            var $poiLocatorSearchKms = $(base).find('.poi-locater-kilometers');
            if ($poiLocatorSearchKms != 0) {
              if ($poiLocatorSearchKms.val() == 'kilometers') {
                _that.commonAJAXCall(
                  data.results[0].geometry.location.lat,
                  data.results[0].geometry.location.lng,
                  'kilometers'
                );
              } else {
                _that.commonAJAXCall(
                  data.results[0].geometry.location.lat,
                  data.results[0].geometry.location.lng,
                  undefined
                );
              }
            }
          } else if (data.status == "ZERO_RESULTS") {
            _that.$noResultFoundText.classList.remove('d-none');
            var resultWrap = $('.m-poi-locator-results__wrap');
            resultWrap.css('display', 'none');
          }
        }
      });
    }

    private useMyLocationHandle($lat, $long) {
      var _that = this;
      if ($lat && $long) {
        _that.loader.load().then(function (google) {
          _that.map = new google.maps.Map(document.getElementById('map'), {
            center: {
              lat: $lat,
              lng: $long
            },
            zoom: Number(_that.mapZoom),
          });
        });
        _that.mapOrigin.lat = $lat;
        _that.mapOrigin.lang = $long;
        _that.commonAJAXCall($lat, $long);
		var $poiLocatorSearch = $('#result-items');
        var base = $poiLocatorSearch.prop('content');
        var $poiLocatorSearchKms = $(base).find('.poi-locater-kilometers');
        if ($poiLocatorSearchKms != 0) {
          if ($poiLocatorSearchKms.val() == 'kilometers') {
            _that.commonAJAXCall($lat, $long, 'kilometers');
          } else {
            _that.commonAJAXCall($lat, $long, undefined);
          }
        }
      }
    }

    private googleMapsInfoWindow(marker, message) {
      var infoWindow = new google.maps.InfoWindow({
        content: message,
        maxWidth: 295
      });

      google.maps.event.addListener(marker, 'click', function () {
        $('.gm-ui-hover-effect').trigger('click');
        infoWindow.open(this.map, marker);
        setTimeout(() => {
          var _oPOILocator = $('.o-poi-locator');
          _oPOILocator.find('.a-pin-icon-popup .a-pin-icon-popup__name a:empty').parent().hide();
          _oPOILocator.find('.a-pin-icon-popup .a-pin-icon-popup__name a:empty').parents('.a-pin-icon-popup__item-box').hide();
          _oPOILocator.find('.a-pin-icon-popup .a-pin-icon-popup__name:empty').parent().hide();
          _oPOILocator.find('.a-pin-icon-popup .a-pin-icon-popup__name:empty').parents('.a-pin-icon-popup__item-box').hide()
        }, 100);
      });
    }

  }

  $(document).ready(function () {
    document.querySelectorAll('[data-js-component="poi-locator"]').forEach(function (ele) {
      new POILocator(ele);
    });
  })
})();