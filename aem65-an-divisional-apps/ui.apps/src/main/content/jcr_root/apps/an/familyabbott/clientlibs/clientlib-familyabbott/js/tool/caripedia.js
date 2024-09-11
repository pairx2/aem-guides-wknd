function initialize() {
    let path = $('[name="location-dataset-ID"]').val();
    $.getJSON(path, {
        format: 'json'
    })
    .done (function(data) {
        if (data) {
            sessionStorage.setItem('locationDataSetID', JSON.stringify(data));
            initCaripedia.init()
        }
    })
}

let filterRadius = $('#ph-caripedia-filter-radius-options').length > 0 ? $('#ph-caripedia-filter-radius-options').find('input.a-radio__input:checked').val() : '';
let brandValue = $('#ph-caripedia-tab').length > 0 ?  $('#ph-caripedia-tab').find('.a-button--primary a').attr('href').replace('#', '') : '';

function isMatchCheck(filterKeyword,isSearchKeyword){
    return filterKeyword !== '' ? isSearchKeyword : true;
}

function isTypeCheck(filterType,isFilterType){
    return filterType.length > 0 ? isFilterType : true;
}

function isFilterOpenCheck(openNowStatus,filterIsOpen){
    return openNowStatus == filterIsOpen ? true : false;
}

function isOpenNowCheck(filterIsOpen,isFilterOpen){
    return filterIsOpen ? isFilterOpen : true;
}

function isFilterHoursCheck(hours24,filterHours24){
    return hours24 == filterHours24 ? true : false;
}

function isHours24Check(filterHours24,isFilterHours){
    return filterHours24 ? isFilterHours : true;
}

function isfilterProvinceCheck(province,filterProvince){
    return province == filterProvince ? true : false;
}

function isProvinceCheck(filterProvince,isfilterProvince){
    return  filterProvince !== '' ? isfilterProvince : true;
}

function isFilterCityCheck(city,filterCity){
    return city == filterCity ? true : false;
}

function isCityCheck(filterCity,isProvince,isFilterCity){
    return filterCity !== '' && isProvince ? isFilterCity : true;
}

function isFilterDistrictCheck(district,filterDistrict){
    return district == filterDistrict ? true : false;
}

function isDistrictCheck(filterDistrict,isCity,isFilterDistrict){
    return filterDistrict !== '' && isCity ? isFilterDistrict : true;
}

function isWithinRadiusCheck(mapRadius,isCircleRadius){
    return (mapRadius !== 0) ? isCircleRadius : true;
}

function getMapRadius(r){
    return r !== 0 ? r*1000 : 0;
}

function getFilterProvince(pVal){
    return pVal !== '' ? pVal.toLowerCase().replace(' ', '') : '';
}

function getFilterCity(cVal){
    return cVal !== '' ? cVal.toLowerCase().replace(' ', '') : '';
}

function getFilterDistrict(dVal){
    return dVal !== '' ? dVal.toLowerCase().replace(' ', '') : '';
}

function getSelectedVal(code,aCode){
    return code == aCode ? `selected selectedColor` : '';
}

function geoSearch(result,_fv,map){
    if(result.state == 'granted') {
        if(new URLSearchParams(window.location.search).get('province')){
            _fv.province = 0;
            _fv.city = 0;
            _fv.district = 0;
            initCaripedia.updateUrlParamJson(_fv);
            initCaripedia.activeFilterVal(map, _fv, false);
        }
        initCaripedia.getGeoLocation(map, false, true);
    }
    else {
        if(new URLSearchParams(window.location.search).get('province')){
            initCaripedia.activeFilterVal(map, _fv, result.state);
        } else {
            initCaripedia.showGeoLocationModal(map, result.state);
        }
    }
}

const initCaripedia = {
    el: {
        mapID: "ph-caripedia-map",
        mapCenter: {
            lat: $('input[name=caripediaDefaultLat]').val(),
            lng: $('input[name=caripediaDefaultLng]').val()
        },
        mainContainer: '#ph-caripedia',
        mapContainer: $('#ph-caripedia-map-container'),
        brandContainer: '#ph-caripedia-tab',
        filterModal: '#ph-caripedia-filter',
        filterShowBtn:'#ph-caripedia-filter-btn',
        filterTop: '#ph-caripedia-filter-top',
        filterBtn: $('#ph-caripedia-filter-search'),
        resetBtn: $('#ph-caripedia-filter-reset'),
        inputTypeShop: 'input[name=typeOfShop]',
        inputTypeRadius: 'input[name=radius]',
        inputRadiusCont: '#ph-caripedia-filter-radius-options',
        openHoursContainer: '#ph-caripedia-filter-openhour',
        openHourIsOpen: '#ph-caripedia-filter-openhour__isOpen',
        openHourFullDay: '#ph-caripedia-filter-openhour__hours24',
        popUpGPS: $("#ph-caripedia-gps"),
        popUpClose: "#ph-popup-close",
        activeGPS: $("#ph-caripedia-gps-active"),
        popupModal: '#ph-caripedia-popup-modal',
        markers: [],
        jsonDataURL: $('input[name=caripediaJson]').val(),
        jsonLoaded: false,
        outletModal: '#ph-caripedia-outlet',
        outletDetails: '#ph-caripedia-outlet-details',
        directionUrl: $('input[name=caripediaDirectionURL]').val(),
        openText: $('input[name=openText]').val(),
        closeText: $('input[name=closeText]').val(),
        locatorText: $('input[name=locatorText]').val(),
        routeText: $('input[name=routeText]').val(),
        telText: $('input[name=telText]').val(),
        shareText: $('input[name=shareText]').val(),
        searchResultModal: '#ph-caripedia-search-result',
        searchBtn: $('#ph-caripedia-search-btn'),
        searchResultText: $('#ph-caripedia-search-btn').attr('title'),
        searchNoResult: $('input[name=noResultText]').val(),
        searchResultTitle: $('#ph-caripedia-search-result__title'),
        searchBar: '#ph-caripedia-searchbar',
        searchList: '#ph-caripedia-search-list',
        currentMarker: '',
        curMarker: [],
		optionProvince: $('#ph-caripedia-filter-location-province-options'),
        optionCity: $('#ph-caripedia-filter-location-city-options'),
        optionDistrict: $('#ph-caripedia-filter-location-district-options'),
        cityPlaceholder: $('#ph-caripedia-filter-location-city-options').find('.a-dropdown__placeholder').html(),
        distPlaceholder: $('#ph-caripedia-filter-location-district-options').find('.a-dropdown__placeholder').html(),
        results: JSON.parse(sessionStorage.getItem('locationDataSetID'))
    },
    fVal: {        
        mapRadius: new URLSearchParams(window.location.search).get('distance') ? parseInt(new URLSearchParams(window.location.search).get('distance')) : filterRadius,
        brandActiveValue: new URLSearchParams(window.location.search).get('brand') ? new URLSearchParams(window.location.search).get('brand') : brandValue,
        flavour: new URLSearchParams(window.location.search).get('flavour') ? new URLSearchParams(window.location.search).get('flavour') : '',
        typeOfShop: new URLSearchParams(window.location.search).get('type') ? decodeURI(new URLSearchParams(window.location.search).get('type')).split(',') : [],
        hours24: new URLSearchParams(window.location.search).get('hours24') ? JSON.parse(new URLSearchParams(window.location.search).get('hours24')) : false,
        isOpen: new URLSearchParams(window.location.search).get('isopen') ? JSON.parse(new URLSearchParams(window.location.search).get('isopen')) : false,
        province: new URLSearchParams(window.location.search).get('province') ? parseInt(new URLSearchParams(window.location.search).get('province')) : 0,
        city: new URLSearchParams(window.location.search).get('city') ? parseInt(new URLSearchParams(window.location.search).get('city')) : 0,
        district: new URLSearchParams(window.location.search).get('district') ? parseInt(new URLSearchParams(window.location.search).get('district')) : 0,
        provinceVal: '',
        cityVal: '',
        districtVal: '',
        location: '',
        keyword: new URLSearchParams(window.location.search).get('keyword') ? new URLSearchParams(window.location.search).get('keyword') : $('#ph-caripedia-searchbar').val()
    },
    icon: {
        markerImg: $('input[name=caripediaMarkerImg').val(),
        currentMarkerImg: $('input[name=caripediaCurMarkerImg').val(),
        loadingIcon: $('input[name=caripediaLoadingIcon').val(),
        locateIcon: $('input[name=caripediaLocIcon').val(),
        locateIconSmall: $('input[name=caripediaLocIconSmall').val(),
        zoomPlusIcon: $('input[name=caripediaZoomPlusIcon').val(),
        zoomMinusIcon: $('input[name=caripediaZoomMinusIcon').val(),
        routeIcon: $('input[name=caripediaRouteIcon').val(),
        telIcon: $('input[name=caripediaTelIcon').val(),
        shareIcon: $('input[name=caripediaShareIcon').val()
    },
    init: function(){
        this.initMap();
    },
    initMap: function(){
        let map;
        let _this = this.el;
        let _fv = this.fVal;
        _this.mapCenter = new google.maps.LatLng(_this.mapCenter.lat, _this.mapCenter.lng)

        map = new google.maps.Map(document.getElementById(_this.mapID), {
            center: _this.mapCenter,
            zoom: 13,
            scrollwheel: !1,
            mapTypeId: "roadmap",
            mapTypeControl: !1,
            fullscreenControl: !1,
            gestureHandling: "cooperative",
            disableDefaultUI: !0
        });

        let is_explorer = typeof document !== 'undefined' && !!document.documentMode && !this.$is_Edge;
        let is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        $('#section-ph-caripedia-filter-top').parent().addClass('ph-caripedia-full-width');
        
        this.dropdownPopulation();

        if(navigator.geolocation) {
            if(is_safari || is_explorer) {
                this.showGeoLocationModal(map);
            } else {
                navigator.permissions.query({name:'geolocation'}).then((result) => {
                   geoSearch(result,_fv,map); 
                });
            }
        } 

        this.appendModal(_this.outletModal);
        this.appendModal(_this.searchResultModal);
        this.appendModal(_this.popupModal);
        this.changeMarkerPos(map);
        this.centerChange(map);
        this.mapControl(map);
        this.activeTab(map, _this.brandContainer, _fv.brandActiveValue);
        this.activeRadius(_fv.mapRadius);
        this.showFilterModal();
        this.filterInput(map);
        this.showSearchResult();
    },
    changeMarkerPos: function(map){
        let _this = this.el;

        map.addListener("click", (mapsMouseEvent) => {
            let pos = mapsMouseEvent.latLng;
            this.delMarkers(_this.curMarker);
            this.curLocateMarker(map, pos);
            this.zoomInMap(map, pos)
        });
    },
    curLocateMarker: function(map, pos){
         let _this = this.el;
         let _icon = this.icon;
         let _fv = this.fVal;

         _this.currentMarker = new google.maps.Marker({
            position: pos,
            icon: _icon.currentMarkerImg,
            map: map
         });
         
         _this.mapCenter = pos;
         _this.curMarker.push(_this.currentMarker);
         _this.currentMarker.setPosition(pos);
         _this.currentMarker.setMap(map);

         if(_this.jsonLoaded) {
            this.generateFeature(map, _this.mapCenter, _this.currentMarker, _fv);
         }
    },
    delMarkers: function(markers){
        let _this = this.el;

        for (let i in markers) {
            markers[i].setMap(null);
        }
        _this.markers = [];
    },
    loadJson: function(map, latLng, fVal){
        let _this = this.el;
        let jsonURL = _this.jsonDataURL;
        let myLatlng = latLng;
        
        map.data.loadGeoJson(jsonURL, {}, () => {
            this.generateFeature(map, myLatlng, _this.currentMarker, fVal)
            _this.jsonLoaded = true;
        })

        map.data.addListener('click', (e) => {
            this.closeAllModal();
            _this.searchBtn.removeClass('active')
            this.showOutletModal(e.feature, myLatlng);
        })
    },
    generateFeature: function(map, latLng, aCurMarker, fVal){
        let _this = this.el;
        let _icon = this.icon;
        let myLatlng = latLng;
        let mapRadius = getMapRadius(fVal.mapRadius); 
        let curMarker = aCurMarker;
        let filterBrand = fVal.brandActiveValue;
        let filterType = fVal.typeOfShop;
        let filterHours24 = fVal.hours24;
        let filterIsOpen = fVal.isOpen;
        let filterKeyword = fVal.keyword;
        let filterProvince = getFilterProvince(fVal.provinceVal); 
        let filterCity = getFilterCity(fVal.cityVal); 
    let filterDistrict = getFilterDistrict(fVal.districtVal); 
        let searchList = $(_this.searchList);
        let searchBtn =  _this.searchBtn;

        if(mapRadius !== 0) {
            let circle = new google.maps.Circle({
                map: map,
                radius: mapRadius,
                fillOpacity: 0,
                strokeWeight: 0,
                position: myLatlng,
                clickable: false
            });

            circle.bindTo('center', curMarker, 'position');
        }

        searchList.empty();
        if(!_this.popUpGPS.hasClass('active')){
            searchBtn.addClass('active')
        }

        searchBtn.find('span').addClass('loading').empty()
        searchBtn.find('span').append('<img src="' + _icon.loadingIcon + '" alt="loading" />');

        map.data.revertStyle();
        let allFeature = [];

        map.data.forEach(feature => {
            let name = feature.getProperty('outlet_name');
            let brand = feature.getProperty('brand');
            let type = feature.getProperty('type');
            let province = feature.getProperty('province').toLowerCase().replace(' ', '');
            let city = feature.getProperty('city').toLowerCase().replace(' ', '');
            let district = feature.getProperty('district').toLowerCase().replace(' ', '');

            let openHour = feature.getProperty('hour_open');
            let closeHour = feature.getProperty('hour_close');
            let openNowStatus = this.checkOpenNow(openHour, closeHour);
            let openHowManyHour = parseInt(closeHour.split(':')[0], 10) - parseInt(openHour.split(':')[0], 10);
            let hours24 = openHowManyHour >=23 ? true : false;

            let coordinates = feature.getGeometry().get();
            let locLat = coordinates.lat();
            let locLng = coordinates.lng();
            let origin = myLatlng;
            let featureDistance = this.getDistance(origin, coordinates);
            let distanceVal = (featureDistance / 1000).toFixed(1)
            let distance = distanceVal + 'km';
            let originParam = 'origin=' + origin.lat() + ',' + origin.lng();
            let destParam = '&destination=' + locLat + ',' + locLng;
            let outletRoute = _this.directionUrl + originParam + destParam;

            feature.setProperty('open_now', openNowStatus)
            feature.setProperty('distanceVal', distanceVal)
            feature.setProperty('distance', distance)
            feature.setProperty('route', outletRoute)
            feature.setProperty('is_24hours', hours24)

            let isBrand = this.filterItem(brand, filterBrand);
            let isSearchKeyword = this.searchKeyword(name, filterKeyword) ? true : false;
            let isMatch = isMatchCheck(filterKeyword,isSearchKeyword);
            let isFilterType = this.filterItem(filterType, type) ? true : false;
            let isType = isTypeCheck(filterType,isFilterType);
            let isFilterOpen = isFilterOpenCheck(openNowStatus,filterIsOpen);
            let isOpenNow = isOpenNowCheck(filterIsOpen,isFilterOpen); 
            let isFilterHours = isFilterHoursCheck(hours24,filterHours24); 
            let isHours24 = isHours24Check(filterHours24,isFilterHours); 
            let isfilterProvince = isfilterProvinceCheck(province,filterProvince);
            let isProvince = isProvinceCheck(filterProvince,isfilterProvince);
            let isFilterCity = isFilterCityCheck(city,filterCity); 
            let isCity = isCityCheck(filterCity,isProvince,isFilterCity); 
            let isFilterDistrict = isFilterDistrictCheck(district,filterDistrict); 
            let isDistrict = isDistrictCheck(filterDistrict,isCity,isFilterDistrict); 
            let isCircleRadius = this.generateMarkerInCircleRadius(locLat, locLng, myLatlng, circle) ? true : false;
            let isWithinRadius = isWithinRadiusCheck(mapRadius,isCircleRadius); 

            let showFeature = isBrand && isProvince && isCity && isDistrict && isMatch && isOpenNow && isHours24 && isWithinRadius && isType ? true : false;

            if(showFeature) {
                allFeature.push(feature);
            }

            map.data.overrideStyle(feature, {
                icon: _icon.markerImg,
                visible: showFeature
            })
        })

        this.getSearchResult(allFeature)
    },
    generateMarkerInCircleRadius: function(lati, lngi, myLatlng, circle) {
        let showFeature;

        if (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lati, lngi), myLatlng) <= circle.getRadius()) {
            showFeature = true
        } else {
            showFeature = false
        }

        return showFeature;
    },
    filterItem: function(item, filterVal){
        let found = jQuery.inArray(filterVal, item) != -1 ? true : false

        return found;
    },
    searchKeyword: function(name, key) {
        let re, searchTerms = key.match(/\w+/gi);
        if (searchTerms) {
            searchTerms = searchTerms.map(function(term) {
                return '(?=.*' + term + ')';
            });
            
            re = new RegExp(searchTerms.join('|'), 'i');
        } else {
            re = /./;
        }
        let isMatch = re.test(name) ? true : false;

        return isMatch
    },
    getSearchResult: function(allFeature){
        let _this = this.el;
        let data = allFeature;
        let totalData = data.length; 
        let searchList = $(_this.searchList);
        let searchBtn =  _this.searchBtn;

        data.sort((a, b) => {
            return (a.getProperty('distanceVal') - b.getProperty('distanceVal')) || (a.getProperty('outlet_name').localeCompare(b.getProperty('outlet_name')))
        })

        data.forEach(feature => {
            this.showOutletDetails(feature, searchList, true);
        });

        if(totalData !== 0) {
            searchBtn.removeClass('no-result')
            searchBtn.find('span').text(totalData + ' ' + _this.searchResultText).removeClass('loading');
            _this.searchResultTitle.find('.cmp-title__text').text(totalData + ' ' + _this.searchResultText);
        } else {
            searchBtn.addClass('no-result')
            searchBtn.find('span').removeClass('loading').text(_this.searchNoResult);
        }
    },
    showSearchResult: function(){
        let _this = this.el;
        let mapContainer = _this.mapContainer;
        let searchBtn = _this.searchBtn;
        let searchResultModal = $(_this.searchResultModal);

        searchBtn.on('click', (e) => {
            e.preventDefault();
            this.closeAllModal();

            if(!$(this).hasClass('no-result')) {
                searchBtn.removeClass('active');
                mapContainer.addClass('popup-overlay');
                searchResultModal.addClass('active');
            }
        })
    },
    showOutletModal: function(marker){
          let _this = this.el;
          let mapContainer = _this.mapContainer;
          let outletModal = $(_this.outletModal);
          let outletDetails = $(_this.outletDetails);

          mapContainer.addClass('popup-overlay');
          outletDetails.empty();

          if(!outletModal.hasClass('active')) {
            outletModal.addClass('active')
          }

          this.showOutletDetails(marker, outletDetails, false);
    },
    showOutletDetails: function(feature, container, isSearch){

          let _this = this.el;
          let _icon = this.icon;
          let item = feature;
          let outletName = item.getProperty('outlet_name');
          let outletTypeValue = item.getProperty('type');
          let outletAddress = item.getProperty('address');
          let outletTime = item.getProperty('hour_open') + ' - ' + item.getProperty('hour_close');
          let outletTel = item.getProperty('tel') !== '' ? item.getProperty('tel') : false;
          let outletTelLink = 'tel:'+outletTel;
          let isItem = true;
          let outletOpenNow = item.getProperty('open_now') == isItem ? _this.openText : _this.closeText;
          let outletMapLink = item.getProperty('google_map');
          let outletDistance = item.getProperty('distance');
          let outletRoute = item.getProperty('route');
          let outletType = $(_this.filterTop)
                                .find('input[value="' + outletTypeValue + '"]:checkbox')
                                .parent()
                                .find('span')
                                .text()
          let titleText = isSearch ? 'h4' : 'h3';
          let isShare = false;
          let outletDistanceDiv = '<div class="ph-caripedia-item__distance">' + outletDistance + '</div>';
          let showOutletDistanceDiv = isSearch ? outletDistanceDiv : '';
          let outletAddrDiv = '<div class="ph-caripedia-item__addr cmp-text">'
                            + '<img src="' + _icon.routeIcon + '" class="ph-caripedia-icon-route ph-caripedia-icon" alt="icon">'
                            + '<span>' + outletAddress + '</span></div>'
         let showOutletAddrDiv = isSearch ? '' : outletAddrDiv; 
         let outletTelDiv = '<div class="button link a-button a-button--secondary">'
                            + '<a href="' + outletTelLink + '" class="ph-caripedia-item__tel btn" target="_blank">'
                                + '<img src="' + _icon.telIcon + '" class="ph-caripedia-icon-tel ph-caripedia-icon" alt="icon">'
                                + '<span>' + _this.telText + '</span>'
                            + '</a></div>'
         let showOutletTelDiv = outletTel ? outletTelDiv : '';
         let outletShareDiv = '<div class="col-12 col-md-4 col-lg-4 columncontrol__column ph-caripedia-item__button-right">'
                                + '<div class="button link a-button a-button--secondary">'
                                    + '<a href="' + outletMapLink + '" class="ph-caripedia-item__share btn" target="_blank">'
                                        + '<img src="' + _icon.shareIcon + '" class="ph-caripedia-icon-route ph-caripedia-icon" alt="icon">'
                                        + '<span>' + _this.shareText + '</span></a></div></div>'      
         let showOutletShareDiv = isShare ? outletShareDiv : '';   
         let columnInfo = isSearch ? 'col-md-9 col-lg-9' : 'col-md-12 col-lg-12';
         let columnBtn = isSearch ? 'col-md-3 col-lg-3' : 'col-md-12 col-lg-12';        
         let columnSubBtn = 'col-md-12 col-lg-12';

          let outletItem = $('<div class="ph-caripedia-item container">'
                              + '<div class="row">'
                                  + '<div class="col-12 ' + columnInfo + ' columncontrol__column ph-caripedia-item__main">'
                                      + '<div class="title ph-caripedia-item__title">'
                                          + '<div class="cmp-title">'
                                              + '<'+ titleText + ' class="cmp-title__text">' + outletName + '</'+ titleText + '></div></div>'
                                      + '<div class="text ph-caripedia-item__details">'
                                          + '<div class="ph-caripedia-item__info cmp-text">'
                                              + '<div class="ph-caripedia-item__type">' + outletType + '</div>'
                                              + showOutletDistanceDiv
                                          + '</div><div class="ph-caripedia-item__time cmp-text">'
                                              + '<div class="ph-caripedia-item__time-status ph-caripedia-item__time-status-' + outletOpenNow + '">' + outletOpenNow + '</div>'
                                              + '<div class="ph-caripedia-item__time-details">'+ outletTime + '</div></div>'
                                          + showOutletAddrDiv + '</div></div>'
                                  + '<div class="col-12 '+ columnBtn + ' columncontrol__column ph-caripedia-item__button">'
                                      + '<div class="columncontrol column-align--center">'
                                          + '<div class="container">'
                                              + '<div class="row">'
                                                  + '<div class="col-12 '+ columnSubBtn + ' columncontrol__column ph-caripedia-item__button-left">'
                                                      + '<div class="button link a-button a-button--secondary">'
                                                          + '<a href="' + outletRoute + '" class="ph-caripedia-item__route btn" target="_blank">'
                                                              + '<img src="' + _icon.routeIcon + '" class="ph-caripedia-icon-route ph-caripedia-icon" alt="icon">'
                                                              + '<span>' + _this.routeText + '</span>'
                                                          + '</a></div>'
                                                      + showOutletTelDiv
                                                      + '</div>'
                                                  + showOutletShareDiv +'</div></div></div></div></div></div>');
          container.append(outletItem);
    },
    calRad: function(x) {
      return x * Math.PI / 180;
    },
    getDistance: function(p1, p2) {
       let R = 6378137; // Earth’s mean radius in meter
       let dLat = this.calRad(p2.lat() - p1.lat());
       let dLong = this.calRad(p2.lng() - p1.lng());
       let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(this.calRad(p1.lat())) * Math.cos(this.calRad(p2.lat())) *
         Math.sin(dLong / 2) * Math.sin(dLong / 2);
       let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
       let d = R * c;
       return d; // returns the distance in meter
    },
    checkOpenNow: function(openHour, closeHour) {
        let startTime = openHour;
        let endTime = closeHour;

        let currentDate = new Date()

        let startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);

        let endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        
        let valid = startDate < currentDate && endDate > currentDate;

        return valid
    },
    appendModal: function(modal){
        let mod = $(modal)
        if(mod.length > 0) {
            this.el.mapContainer.append(mod);
        }

        let closeModal = mod.find(this.el.popUpClose);

        closeModal.on('click', function(){
            this.closePopUp(mod);
        }.bind(this));
    },
    closeAllModal: function(){
        let _this = this.el;
        $(_this.searchResultModal).removeClass('active');
        $(_this.filterModal).removeClass('active');
        $(_this.outletModal).removeClass('active');
        $(_this.searchResultModal).removeClass('active');
        $(_this.popupModal).removeClass('active');
    },
    closePopUp: function(thisID){
        thisID.removeClass('active');
        this.el.mapContainer.removeClass('popup-overlay');
        this.el.searchBtn.addClass('active');
    },
    centerChange: function(map){
        map.addListener('center_changed', () => {
            if($('.ph-caripedia-btn-locator').length == 0){
                this.mapControlLoc(map);
            }
        });
    },
    mapControlLoc: function(map){
      const locationButton = document.createElement("button");
      locationButton.innerHTML = '<img src="'+this.icon.locateIcon+'" alt="locator"/>'+this.el.locatorText;
      locationButton.classList.add("custom-map-control-button", "ph-caripedia-btn-locator");
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

      locationButton.addEventListener("click", () => {
        this.getGeoLocation(map, true);
      });
    },
    mapControl: function(map){
        let controlWrapper = document.createElement('div');
        controlWrapper.classList.add("map-control-wrapper");
        this.mapControlLocSmall(map, controlWrapper);
        this.mapControlZoomPlus(map, controlWrapper);
        this.mapControlZoomMinus(map, controlWrapper);

        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlWrapper)
    },
    mapControlLocSmall: function(map, d){
        const locBtnSmall = document.createElement("button");
        locBtnSmall.innerHTML = '<img src="'+this.icon.locateIconSmall+'" alt="locator"/>';
        locBtnSmall.classList.add("custom-map-control-button", "ph-caripedia-btn-locator-sm");
        d.appendChild(locBtnSmall);

        locBtnSmall.addEventListener("click", () => {
          this.getGeoLocation(map, true);
        });
    },
    mapControlZoomPlus: function(map, d){
        const zoomPlus = document.createElement("button");
        zoomPlus.innerHTML = '<img src="'+this.icon.zoomPlusIcon+'" alt="zoom in"/>';
        zoomPlus.classList.add("zoom-control-in", "ph-caripedia-btn-zoom-plus");
        d.appendChild(zoomPlus);

        this.onZoomIn(map, zoomPlus);
    },
    onZoomIn: function(map, btn){
        btn.addEventListener("click", () => {
          map.setZoom(map.getZoom() + 1);
        });
    },
    mapControlZoomMinus: function(map, d){
        const zoomMinus = document.createElement("button");
        zoomMinus.innerHTML = '<img src="'+this.icon.zoomMinusIcon+'" alt="zoom in"/>';
        zoomMinus.classList.add("zoom-control-out", "ph-caripedia-btn-zoom-minus");
        d.appendChild(zoomMinus);

        this.onZoomOut(map, zoomMinus);
    },
    onZoomOut: function(map, btn){
        btn.addEventListener("click", () => {
          map.setZoom(map.getZoom() - 1);
        });
    },
    zoomInMap: function(map, pos) {
        let zoomLevel = map.getZoom();

        if(zoomLevel !== 14) {
            map.panTo(pos);
            map.setZoom(14)
        }
    },
    showGeoLocationModal: function(map, resultState){
        let _fv = this.fVal;
        let _this = this.el;
        let gpsModal = _this.popUpGPS;
        let activeGPS = _this.activeGPS;
        let gpsAlert = $(_this.popupModal);
        let closeModal = gpsModal.find("#ph-caripedia-gps-later");

        if (gpsModal.length > 0) {
            _this.mapContainer.append(gpsModal);
            gpsModal.addClass('active');
            _this.mapContainer.addClass('popup-overlay');
        }

        activeGPS.addClass("custom-map-control-button");
        activeGPS.on("click", function(){
            this.closePopUp(gpsModal);

            if(resultState == 'denied' || resultState == 'error') {
                gpsAlert.addClass('active');
                _this.mapContainer.addClass('popup-overlay');
            } else {
                this.getGeoLocation(map);
            }
        }.bind(this));
        
        this.curLocateMarker(map, _this.mapCenter);
        map.setCenter(_this.mapCenter);
        this.loadJson(map, _this.mapCenter, _fv);

        closeModal.on('click', function(){
            this.closePopUp(gpsModal);
        }.bind(this));
    },
    getGeoLocation: function(map, a, load){
        let islocation = true;
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let curPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    this.delMarkers(this.el.curMarker);
                    this.curLocateMarker(map, curPosition);
                    map.setCenter(curPosition);
                    
                    if(load) {
                        this.loadJson(map, curPosition, this.fVal);
                    }
                },
                () => {
                    if(a == islocation) {
                        let gpsAlert = $(this.el.popupModal);
                        gpsAlert.addClass('active');
                        this.el.mapContainer.addClass('popup-overlay');
                    }
                },
            );
       }
    },
    activeTab: function(map, t, a){
        $(t).find('.a-button--primary')
            .addClass('a-button--secondary')
            .removeClass('a-button--primary');
        $(t).find('#ph-caripedia-tab-'+a)
            .parent()
            .addClass('active a-button--primary')
            .removeClass('a-button--secondary');
        $('#ph-caripedia-products-' + a).addClass('selected-product')
        this.activeProduct(a);
        this.onClickTab(map, t);
    },
    activeProduct: function(aVal){
        let _fv =  this.fVal;
        let _self = this;
        let activeProd = aVal;
        let selectedProd = 'ph-caripedia-products-'+activeProd;
        let selectedProdID = $('#' + selectedProd);

        let imgCont = '#ph-caripedia-products-img';
        let flavoursCont = '#ph-caripedia-products-flavours';
        let variantCont = '#ph-caripedia-products-variations';
        let buyNowCont = '#ph-caripedia-products-buynow';

        let img = selectedProd+'__img-'
        let flavour = selectedProd+'__flavour-';
        let variant = selectedProd+'__variant-';
        let buyNow = selectedProd+'__buynow-';

        let defFlavour, defFlavourID, getDefFlavour;
        selectedProdID.find(flavoursCont + ' .selected').removeClass('selected');
        selectedProdID.find(imgCont + ' .show').removeClass('show')
        selectedProdID.find(variantCont + ' .show').each(function(){
            $(this).removeClass('show')
        })
        selectedProdID.find(buyNowCont + ' .show').each(function(){
            $(this).removeClass('show')
        })

        if(_fv.flavour !== ''){
            getDefFlavour = _fv.flavour;
            defFlavourID = flavour + getDefFlavour;
            defFlavour = $('#' + defFlavourID);
        } else {
            defFlavour = selectedProdID.find(flavoursCont + ' .columncontrol__column:first-child a');
            defFlavourID = defFlavour.closest("section").attr('id'); // id fetch
            getDefFlavour = defFlavourID.replace(flavour, '');
            _fv.flavour = getDefFlavour;
        }
        $('#' + defFlavourID).parent().parent().addClass('selected')

        let getVariant = defFlavour.attr('href');
            getVariant = getVariant.replace(/%20/g, '');
            getVariant = getVariant.replace('#', '');
            getVariant = decodeURI(getVariant);
            getVariant = getVariant.split(',');

        getVariant.forEach(v => {
            let id = '#' + variant + v;
            $(id).parent().addClass('show')
        });

        let defVariant = selectedProdID.find(variantCont + ' .show').first().find('a');
        let defVariantID = defVariant.attr('id');
        
        let getDefVariant = defVariantID.replace(variant, '');

        let getFlavour = defVariant.attr('aria-label');
            getFlavour = getFlavour.split(',')

        let defBuyNow = $('#' + buyNow + getDefFlavour);
        defBuyNow.parent().addClass('show');

        let defImage = $('#' + img + getDefFlavour + '-' + getDefVariant);
        defImage.parent().addClass('show')

        let defImageHeight = defImage.height();
        defImage.parent().parent().css('min-height', defImageHeight);

        $(window).on('resize', function(){
            let resizeImageHeight = defImage.height();
            defImage.parent().parent().css('min-height', resizeImageHeight);
        });

        getFlavour.forEach(v => {
            let id = '#' + flavour + v;
            $(id).parent().parent().addClass('show')
        }); 
        
        selectedProdID.find(flavoursCont + ' a').each(function(){
            $(this).on('click', (e) => {
                e.preventDefault()
                
                $(this).parents(flavoursCont).find('.selected').removeClass('selected');
                $(this).parent().parent().addClass('selected');

                $(this).parents(flavoursCont).find('a').each(function(){
                    let thisParent = $(this).parent().parent();
                    thisParent.addClass('show');
                })

                let curFlavour = $(this).attr('id')
                    curFlavour = curFlavour.replace(flavour, '');
                
                _fv.flavour = curFlavour;
                _self.updateUrlParamJson(_fv);

                let variantVal = $(this).attr('href');
                    variantVal = variantVal.replace(/%20/g, '')
                    variantVal = variantVal.replace('#', '')
                    variantVal = decodeURI(variantVal)
                    variantVal = variantVal.split(',');
                
                let selectedParentProd = $(this).parents('#' + selectedProd);

                selectedParentProd.find(variantCont + ' a').each(function(){
                    $(this).parent().removeClass('show');
                    $(this).parent().removeClass('selected');
                });

                variantVal.forEach(v => {
                    let id = '#' + variant + v;
                    $(id).parent().addClass('show')
                });

                let firstVariant = selectedParentProd.find(variantCont + ' .show').first();
                
                let curVariant = firstVariant.find('a').attr('id');
                    curVariant = curVariant.replace(variant, '');

                let curImage = $('#' + img + curFlavour + '-' + curVariant);
                selectedParentProd.find(imgCont + ' .show').removeClass('show');
                selectedParentProd.find(buyNowCont + ' .show').removeClass('show');

                if(curImage.length > 0) {
                    curImage.parent().addClass('show')
                } else {
                    defImage.parent().addClass('show')
                }

                let curBuyNow = $('#' + buyNow + curFlavour);
                curBuyNow.parent().addClass('show')
            })
        })

        selectedProdID.find(variantCont + ' a').each(function(){
            $(this).on('click', (e) => {
                e.preventDefault()
                
                $(this).parents(variantCont).find('.selected').removeClass('selected');
                $(this).parent().addClass('selected');

                let curVariant = $(this).attr('id')
                    curVariant = curVariant.replace(variant, '');

                let flavourVal = $(this).attr('aria-label');
                    flavourVal = flavourVal.split(',');
                
                let selectedParentProd = $(this).parents('#' + selectedProd);

                selectedParentProd.find(flavoursCont + ' a').each(function(){
                    $(this).parent().parent().removeClass('show');
                });

                flavourVal.forEach(v => {
                    let id = '#' + flavour + v;
                    $(id).parent().parent().addClass('show')
                });

                let selectedFlavour;
                if(selectedParentProd.find(flavoursCont + ' .show').hasClass('selected')) {
                    selectedFlavour = selectedParentProd.find(flavoursCont + ' .selected')
                } else {
                    selectedParentProd.find(flavoursCont + ' .selected').removeClass('selected')
                    selectedFlavour = selectedParentProd.find(flavoursCont + ' .show').first();
                    selectedFlavour.addClass('selected');
                }
                
                let curFlavour = selectedFlavour.find('a').attr('id');
                    curFlavour = curFlavour.replace(flavour, '');

                let curImage = $('#' + img + curFlavour + '-' + curVariant);
                selectedParentProd.find(imgCont + ' .show').removeClass('show');
                selectedParentProd.find(buyNowCont + ' .show').removeClass('show');

                if(curImage.length > 0) {
                    curImage.parent().addClass('show')
                } else {
                    defImage.parent().addClass('show')
                }

                let curBuyNow = $('#' + buyNow + curFlavour);
                curBuyNow.parent().addClass('show')
            })
        })

    },
    onClickTab: function(map, t){
        let _fv = this.fVal;
        let _this = this.el;
        let loadThis = this;

        $(t).find('.btn').each(function(){
            $(this).on('click', function(e){
                e.preventDefault();
                $(this)
                    .parents(t)
                    .find('.button.active')
                    .addClass('a-button--secondary')
                    .removeClass('active a-button--primary');
                $(this)
                    .parent()
                    .removeClass('a-button--secondary');
                $(this)
                    .parent()
                    .addClass('active a-button--primary');

                $('#ph-caripedia-products').find('.selected-product').removeClass('selected-product');
                
                let activeVal = $(this).find('span').text().toLowerCase();
                _fv.brandActiveValue = activeVal;
                _fv.flavour = '';
                $('#ph-caripedia-products-' + activeVal).addClass('selected-product')

                loadThis.generateFeature(map, _this.mapCenter, _this.currentMarker, _fv);
                loadThis.activeProduct(activeVal);
                loadThis.updateUrlParamJson(_fv);
            })
        })
    },
    showFilterModal: function(){
        let _this = this.el;
        let filterModal = $(_this.filterModal);
        let closeModal = filterModal.find(_this.popUpClose);

        if (filterModal.length > 0) {
            this.el.mapContainer.append(filterModal);
        }

        this.onClickShowFilter();

        closeModal.on('click', function(){
            this.closePopUp(filterModal);
        }.bind(this));
    },
    onClickShowFilter: function(t, f){
        let showFilterBtn = $(this.el.filterShowBtn);
        let filterModal = this.el.filterModal;

        showFilterBtn.on('click', () => {
            this.closeAllModal();
            let gpsModal = this.el.popUpGPS;
            let mapContainer = this.el.mapContainer;
            let searchBtn = this.el.searchBtn;

            if(gpsModal.hasClass('active')) {
                gpsModal.removeClass('active');
            }

            mapContainer.addClass('popup-overlay');
            searchBtn.removeClass('active')
            $(filterModal).addClass('active');
        })
    },
    activeFilterVal: function(map, fv, resultState){
        let _fv = fv;
        let _this = this.el;	  
        let filterTop = _this.filterTop;
        let filterModal = _this.filterModal;

        $(_this.searchBar).val(_fv.keyword);

        if(_fv.hours24) {
            $('#ph-caripedia-filter-openhour__hours24').addClass('selected')
        }

        if(_fv.isOpen) {
            $('#ph-caripedia-filter-openhour__isOpen').addClass('selected')
        }

        _fv.typeOfShop.forEach(function(val){
            let filterTopInput = $(filterTop).find('input[value="' + val + '"]:checkbox');
            let filterModalInput = $(filterModal).find('input[value="' + val + '"]:checkbox');
            filterTopInput.prop('checked', true);
            filterModalInput.prop('checked', true);
            filterTopInput.parents('.a-checkbox').addClass('selected');
            filterModalInput.parents('.a-checkbox').addClass('selected');
        })

        let results = JSON.parse(sessionStorage.getItem('locationDataSetID'));

        if(_fv.province !== 0){
            let resultsProvince = results.data.province;
            resultsProvince.forEach(function(val){
                if(_fv.province == val.Code) {
                    _fv.provinceVal = val.Name;
                    _this.mapCenter = new google.maps.LatLng(val.Latitude, val.Longitude);
                }
            })
            this.generateList(_this.optionProvince, resultsProvince, null, _fv.province);
        }

        if(_fv.city !== 0) {
            let resultsCity = results.data.city;
            resultsCity.forEach(function(val){
                if(_fv.city == val.Code) {
                    _fv.cityVal = val.Name;
                    _this.mapCenter = new google.maps.LatLng(val.Latitude, val.Longitude);
                }
            })
            _this.optionCity.find(".a-dropdown__container .a-dropdown__field").removeClass('disabled');
            this.generateList(_this.optionCity, resultsCity, _fv.province, _fv.city);
        }

        if(_fv.district !== 0) {
            let resultsDistrict = results.data.subdistrict;
            resultsDistrict.forEach(function(val){
                if(_fv.district == val.Code) {
                    _fv.districtVal = val.Name;
                    _this.mapCenter = new google.maps.LatLng(val.Latitude, val.Longitude);
                }
            })
            _this.optionDistrict.find(".a-dropdown__container .a-dropdown__field").removeClass('disabled');
            this.generateList(_this.optionDistrict, resultsDistrict, _fv.city, _fv.district);
        }
        if(resultState !== false) {
            this.showGeoLocationModal(map, resultState);
        }
    },
    filterInput: function(map){
        let _this = this.el;
        let _fv = this.fVal;					  
        let filterTop = _this.filterTop;
        let filterModal = _this.filterModal;
        let filterBtn = _this.filterBtn;
        let resetBtn = _this.resetBtn;
        let openHoursContainer = _this.openHoursContainer;
        let searchBar = _this.searchBar;

        let inputTypeShop = _this.inputTypeShop;
        let inputTypeRadius = _this.inputTypeRadius;
        let inputRadiusCont = _this.inputRadiusCont;

        this.onClickCheckbox(map, filterTop, filterModal, inputTypeShop);
        this.onClickCheckbox(map, filterModal, filterTop, inputTypeShop);
        this.onClickRadio(filterModal, inputTypeRadius, inputRadiusCont);
        this.onClickOpenHour(openHoursContainer, _fv);

        filterBtn.on('click', (e) => {
            e.preventDefault();
            this.closePopUp($(filterModal));
            if(_fv.location !== ''){
                _this.mapCenter = _fv.location;
            }
            _fv.keyword = $(filterModal).find(searchBar).val();
            this.zoomInMap(map, _this.mapCenter)
            this.delMarkers(this.el.curMarker);
            this.curLocateMarker(map, _this.mapCenter);
            this.updateUrlParamJson(_fv);
            map.setCenter(_this.mapCenter);
        })

        resetBtn.on('click', (e) => {
            this.resetInput(map);
        })
    },
    resetInput: function(map){
        let _this = this.el;
        let _fv = this.fVal;
        
        let searchBar = _this.searchBar;
        let inputRadiusCont = _this.inputRadiusCont;
        let inputTypeShop = _this.inputTypeShop;
        let openHoursContainer = _this.openHoursContainer;

        $(searchBar).val('')
        $(inputRadiusCont).find('.selected input:checked').prop('checked', false)
        $(inputRadiusCont).find('.selected').removeClass('selected');

        $(inputTypeShop).each(function(){
            $(this).prop('checked', false)
            $(this).parents('.a-checkbox').removeClass('selected')
        })

        $(openHoursContainer).find('a').each(function(){
            $(this).removeClass('selected');
        })

        $('#ph-caripedia-filter-location').find('.a-dropdown__menu').each(function(){
            let defaultIttem = $(this).find('li').first();
            let defaultItemName = defaultIttem.find('span').text();

            $(this).find('li.selected').removeClass('selected selectedColor')
            defaultIttem.addClass('selected selectedColor')

            $(this).parent().find('.a-dropdown-selected').text(defaultItemName);
        })
        
        _this.optionCity.find(".a-dropdown__container .a-dropdown__field").addClass('disabled');
        _this.optionDistrict.find(".a-dropdown__container .a-dropdown__field").addClass('disabled');
       
        _fv.mapRadius = 0;
        _fv.typeOfShop = [];
        _fv.hours24 = false;
        _fv.isOpen = false;
        _fv.province = 0;
        _fv.city = 0;
        _fv.district = 0;
        _fv.provinceVal = '';
        _fv.cityVal = '';
        _fv.districtVal = '';
        _fv.location = '';
        _fv.keyword = '';
    },
    onClickCheckbox: function(map, c1, c2, inputName){
        let dupCheckbox = c2;
        let _this = this.el;
        let _fv = this.fVal;
        let self = this;

        $(c1).find(inputName).on('click', function() {
            let checked = $(this).val();
            let dupCheck = $(dupCheckbox).find('input[value="' + this.value + '"]:checkbox');
            dupCheck.prop('checked', this.checked)

            if($(this).is(':checked')) {
                $(this).parents('.a-checkbox').addClass('selected');
                dupCheck.parents('.a-checkbox').addClass('selected');
                _fv.typeOfShop.push(checked);
            } else {
                $(this).parents('.a-checkbox').removeClass('selected');
                dupCheck.parents('.a-checkbox').removeClass('selected');
                _fv.typeOfShop.splice($.inArray(checked, _fv.typeOfShop), 1);
            }

			if($(this).parents('.checkbox').attr('id') == 'ph-caripedia-filter-options-options'){
                self.generateFeature(map, _this.mapCenter, _this.currentMarker, _fv);
                self.updateUrlParamJson(_fv);
            } 
        });

    },
    onClickOpenHour: function(c, fVal){
        $(c).find('a').each(function(){
            $(this).on('click', function(e){
                e.preventDefault();
                let thisVal = $(this).attr('href').replace('#', '');

                if(!$(this).hasClass('selected')){
                    $(this).addClass('selected');
                    fVal[thisVal] = true
                } else {
                    $(this).removeClass('selected');
                    fVal[thisVal] = false
                }
            })
        })
    },
    onClickRadio: function(c1, inputName, cInput){
        let _fv = this.fVal;

        $(c1).find(inputName).on('click', function() {
            let parentRadio = $(this).parents('.a-radio');
            let checked = 0;

            if(!parentRadio.hasClass('selected')) {
                $(this).parents(cInput)
                       .find('.selected')
                       .removeClass('selected');

                parentRadio.addClass('selected');
                $(this).prop('checked', true);
                checked = $(this).val()
            } else {
                parentRadio.removeClass('selected');
                $(this).prop('checked', false);
            }

            _fv.mapRadius = checked;
        });
    },
    activeRadius: function(d){
        let _this = this.el;
        let curRadius = d;
        let inputRadiusCont = _this.inputRadiusCont;
        let selectedInput = $(inputRadiusCont).find('input[value="' + curRadius + '"]:radio')

        selectedInput.prop('checked', true);
        selectedInput.parents('.a-radio').addClass('selected');
    },
    updateUrlParamJson: function(fv){
        let urlParams = {};
        let _fv = fv;
        urlParams.brand = _fv.brandActiveValue;
        urlParams.type = _fv.typeOfShop.length === 0 ? '' : _fv.typeOfShop.toString();
        urlParams.distance = _fv.mapRadius;
        urlParams.keyword = $('#ph-caripedia-searchbar').val();
        urlParams.province = _fv.province ;
        urlParams.city = _fv.city;
        urlParams.district = _fv.district;
        urlParams.hours24 = _fv.hours24;
        urlParams.isopen = _fv.isOpen;
        urlParams.flavour = _fv.flavour;

        let currUrl = window.location.href;
            currUrl = currUrl.indexOf('?') >= 0 ? currUrl.split('?')[0] : currUrl;
        let newParams = $.param(urlParams);
        let newUrl = currUrl + '?' + newParams;
        window.history.replaceState({} , '' , newUrl);
    },
    generateList: function(ele, list, parentId, activeCode){
        let items = [];
        let parentID = parentId;

        let dropdownFilter = $(ele).find(".a-dropdown__container .a-dropdown__field");

        if(dropdownFilter.find('ul').length == 0){
            let ul = "<ul class = 'a-dropdown__menu'></ul>";
            dropdownFilter.append(ul);
        }

        let dropdownMenu= $(dropdownFilter).find(".a-dropdown__menu");

        if  (dropdownMenu.find('li').length != 0) {
			items.push(dropdownFilter.find(' .a-dropdown__menu li:first'));
            dropdownMenu.find('li').remove();
        }
        
        list.sort((a, b) => {
            return (a.Name.localeCompare(b.Name))
        })
        
        if(parentID == null || parentID == undefined){
            $.each(list, function (i, el) {
                let selected = getSelectedVal(el.code,activeCode); 
                items.push(`<li data-optionvalue="${el.Code}" data-name="${el.Name}" data-lat="${el.Latitude}" data-long="${el.Longitude}" class="${selected}"><span>${el.Name}</span></li>`);
            });
        } else{
            $.each(list, function(i, el) {
                if(el.Parent == parentID){
                    let selected = "";
                    if(el.Code === activeCode) {
                        selected ='selected selectedColor' ;
                    }
                    items.push(`<li data-optionvalue="${el.Code}" data-name="${el.Name}" data-lat="${el.Latitude}" data-long="${el.Longitude}" class="${selected}"><span>${el.Name}</span></li>`);
                }
            });
        }
        
        dropdownMenu.append(items);

        if(activeCode !== 0) {
            let activeName = $(ele).find('.selected').data('name');
            $(ele).find('.a-dropdown__placeholder').addClass('a-dropdown-selected').removeClass('a-dropdown__placeholder')
            $(ele).find('.a-dropdown-selected').text(activeName);
        }

        this.onSelectDropdown(ele);
    },
    onSelectDropdown: function(ele) {
        let _this = this.el;
        let _fv = this.fVal;
        let list = $(ele).find('.a-dropdown__field li');
        let _self = this;
        
        list.on('click', function () {
            let value = $(this).data('optionvalue');
            let name = $(this).data('name');
            let lat = $(this).data('lat'),
                lng = $(this).data('long');
            let coordinate = new google.maps.LatLng(lat, lng);

            if (ele[0].id == "ph-caripedia-filter-location-province-options") {
                _fv.province = value;
                _self.dropdownCity(value);
                
                if(value !== 0) {
                    _fv.provinceVal = name;
                    _fv.location = coordinate;
                    _fv.city = 0;
                    _fv.cityVal = '';
                    _fv.district = 0;
                    _fv.districtVal = '';
                } else {
                    _fv.provinceVal = '';
                    _fv.location = '';
                    _fv.city = 0;
                    _fv.cityVal = '';
                    _fv.district = 0;
                    _fv.districtVal = '';
                    _this.optionDistrict.find(".a-dropdown__container .a-dropdown__field").addClass('disabled');
                }

            } else if (ele[0].id == 'ph-caripedia-filter-location-city-options') {
                let selectedProvince = $('#ph-caripedia-filter-location-province-options').find('.selected');
                let selectedProvinceCoor = new google.maps.LatLng(selectedProvince.data('lat'), selectedProvince.data('long'));
            
                _fv.city = value;
                _fv.cityVal = name;

                if(value !== 0) {
                    _fv.cityVal = name;
                    _fv.location = coordinate;
                    _fv.district = 0;
                    _fv.districtVal = '';
                } else {
                    _fv.cityVal = '';
                    _fv.location = selectedProvinceCoor;
                    _fv.district = 0;
                    _fv.districtVal = '';
                }

                _self.dropdownDistrict(value);
            } else {
                let selectedCity = $('#ph-caripedia-filter-location-city-options').find('.selected');
                let selectedCityCoor = new google.maps.LatLng(selectedCity.data('lat'), selectedCity.data('long'));
        
                _fv.district = value;
                
                if(value !== 0) {
                    _fv.districtVal = name;
                    _fv.location = coordinate;
                } else {
                    _fv.districtVal = '';
                    _fv.location = selectedCityCoor;
                }
            }
        });
    },
    onChangeElement: function(ele) {
        let _this = this.el;
        let placeHolder = ele[0].id == 'ph-caripedia-filter-location-city-options' ? _this.cityPlaceholder : _this.distPlaceholder;
        
        if (ele.length != 0) {
            ele.find('.a-dropdown__field').removeClass('disabled');
            ele.find('.a-dropdown__field .a-dropdown-selected').remove();

            if (ele.find('.a-dropdown__placeholder').length == 0) {
                ele.find(".a-dropdown__field").append("<span class='a-dropdown__placeholder'>"+ placeHolder +"</span");
            }
        }
        if (_this.optionDistrict.length != 0 && ele[0].id == 'ph-caripedia-filter-location-city-options') {
            _this.optionDistrict.find('.a-dropdown__field').addClass('disabled');
            _this.optionDistrict.find('.a-dropdown__field .a-dropdown-selected').remove();

            if (_this.optionDistrict.find('.a-dropdown__placeholder').length == 0) {
                _this.optionDistrict.find(".a-dropdown__field").append("<span class='a-dropdown__placeholder'>"+ _this.distPlaceholder +"</span");
            }
        }
    },
    dropdownPopulation: function() {
        let _this = this.el;
        let results = JSON.parse(sessionStorage.getItem('locationDataSetID'));
        _this.optionCity.find(".a-dropdown__container .a-dropdown__field").addClass('disabled');
        _this.optionDistrict.find(".a-dropdown__container .a-dropdown__field").addClass('disabled');
        this.generateList( _this.optionProvince, results.data.province);
    },
    dropdownCity: function(value) {
        let _this = this.el;
        let results = JSON.parse(sessionStorage.getItem('locationDataSetID'));
        _this.optionCity.find(".a-dropdown__container .a-dropdown__field").removeClass('disabled');
        this.generateList( _this.optionCity, results.data.city, value);
        this.onChangeElement(_this.optionCity);
    },
    dropdownDistrict: function (value) {
        let _this = this.el;
        let results = JSON.parse(sessionStorage.getItem('locationDataSetID'));
        _this.optionDistrict.find(".a-dropdown__container .a-dropdown__field").addClass('disabled');
        this.generateList( _this.optionDistrict, results.data.subdistrict, value);
        this.onChangeElement(_this.optionDistrict);
    }
}

$(document).ready(function(){
    if($('#ph-caripedia').length > 0) {
        let apiKey = $('#ph-caripedia-apiKey').val();
        let s = document.createElement("script");
            s.src = "https://maps.googleapis.com/maps/api/js?key="+apiKey+"&libraries=geometry&callback=initialize&v=weekly";
            s.async = true;
        $('head').append(s);
    }
});