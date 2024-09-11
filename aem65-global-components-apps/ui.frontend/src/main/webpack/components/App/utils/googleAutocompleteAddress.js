window.onAddessSuggestion = (addressElement, addressObj, minChars, regionMappingConfig) => {

  let autocomplete;
  let address1Field = document.querySelector(addressElement);

  function updateDropVal(addressObj, long_name){
    const countyUlEle = document.querySelector(`${addressObj['county']}`);
    const selectedOption = countyUlEle.getElementsByClassName('selected');
    countyUlEle.querySelector('#county-google')?.remove();
    selectedOption[0]?.classList.remove("selected");

    let displayElem = countyUlEle.closest('div[tabindex="0"]').getElementsByTagName('span')
 
    displayElem[0].innerHTML = long_name;
       displayElem[0].classList.add("a-dropdown-selected")

    $(countyUlEle)
      .append(`<li data-optionvalue=${addressObj['enableDropDownVal']} id="county-google" class="selected" role="option"><span class="a-dropdown__option-text">${long_name}</span></li>`)
    
  }

  function initAutocomplete() {
    const countryCode = $('[name="x-country-code"]').val()

    autocomplete = new google.maps.places.Autocomplete(address1Field, {

      componentRestrictions: { country: [countryCode] },
      fields: ["address_components"],
      types: ["address"],
    });
    if (address1Field) {
      address1Field.focus();
      autocomplete.addListener("place_changed", fillInAddress);
    }
  }

  function fillInAddress() {
    const place = autocomplete.getPlace();
    let address1 = "";
    let address2 = "";
    let postcode = "";

    // clear the all address field before new one

    for (const key in addressObj) {
      if (addressObj.hasOwnProperty(key) && addressObj[key] && !(key).includes('enable')) {
        document.querySelector(`${addressObj[key]}`).value = '';
        document.querySelector(`${addressObj[key]}`).removeAttribute('disabled');
      }
    }
    let routeIndex = 0;
    let checkLocality = place.address_components.find(
      (component) => component.types[0] === 'locality'
    );

    let checkRegionMapping = place.address_components.find(
      (component) => component.types[0] === regionMappingConfig
    );
    
    for (const component of place.address_components) {
      //for UK,Sweden city = postal_town
      
      if(component.types[0] == "postal_town" && !checkLocality){
        component.types[0] = 'locality'
      }

        //for region mapping configuration      
        if(checkRegionMapping && component.types[0] == regionMappingConfig){
          component.types[0] = 'administrative_area_level_1';
        } else if(regionMappingConfig && component.types[0].includes("administrative_area_level")) {
          continue;
        }
      const componentType = component.types[0];
      if(component.types[0] == "route"){
        routeIndex+=1;
      }

      switch (componentType) {
        case "street_number": {
          address1 = `${component.long_name}`;
          break;
        }
        case "route": {
          if(routeIndex>1 && address2?.length <=35){
            address2 = `${address2} ${component.long_name} `;
            address2 = address2?.trim();
          } else {
            address1 = `${address1} ${component.long_name} `;
            address1 = address1?.trim();
            address2 = address2?.trim();
          }
          break;
        }
        case "postal_code": {
          if (document.querySelector(`${addressObj['postal_code']}`) && component.long_name) {
            let regexPattern = document.querySelector(`${addressObj['postal_code']}`).getAttribute('data-regex')
            regexPattern = regexPattern.replace(/\//g, "")
            regexPattern = new RegExp(regexPattern)
            if (regexPattern.test(component.long_name)) {
              document.querySelector(`${addressObj['postal_code']}`).value = component.long_name;
              
              if(`${addressObj['enableGoogleAddressCheck']}` && (`${addressObj['enableManualAddressEntry']}` != "true")) {
                document.querySelector(`${addressObj['postal_code']}`).setAttribute ('disabled', true);
                let removeValMsg = document.querySelector(`${addressObj['postal_code']}`)?.closest(".validation-require")
                removeValMsg?.classList.remove("validation-require")
              }
            }
           
          }
          break;
        }
        case "locality":
          if (document.querySelector(`${addressObj['locality']}`) && component.long_name) {
            document.querySelector(`${addressObj['locality']}`).value = component.long_name;
            if(`${addressObj['enableGoogleAddressCheck']}` && (`${addressObj['enableManualAddressEntry']}` != "true")) {
              document.querySelector(`${addressObj['locality']}`).setAttribute ('disabled', true);
              let removeValMsg = document.querySelector(`${addressObj['locality']}`)?.closest(".validation-require")
              removeValMsg?.classList.remove("validation-require")
            }
          }
          break;
        case "administrative_area_level_1": {
          if (document.querySelector(`${addressObj['county']}`) && component.long_name) {
            if (`${addressObj['enableGoogleAddressCheck']}` && (`${addressObj['enableManualAddressEntry']}` != "true")) {
              updateDropVal(addressObj, component.long_name);
              let countyUlEle = document.querySelector(`${addressObj['county']}`);
              countyUlEle.closest('div[tabindex="0"]').style.pointerEvents = "none";
              countyUlEle.closest('div[tabindex="0"]').style.background = '#d9d9d67a';
              countyUlEle.closest('div[tabindex="0"]').style.border = '#d9d9d67a';

              let removeValMsg = countyUlEle?.closest(".validation-require")
              removeValMsg?.classList.remove("validation-require")
            } 
            else if (`${addressObj['enableGoogleAddressCheck']}`) {
              updateDropVal(addressObj, component.long_name);
            }
           
          }
          break;
        }
        case "country":
          if (document.querySelector(`${addressObj['country']}`)) {
            document.querySelector(`${addressObj['country']}`).value = component.long_name;
          }
          break;
      }
    }

    address1Field.value = address1;
    if (document.querySelector(`${addressObj['administrative_area_level_2']}`)) {
      document.querySelector(`${addressObj['administrative_area_level_2']}`).value = address2;
    }

  }

  //To restrict address suggestions after x number of characters
  if (typeof google!== 'undefined' && minChars) {
    if (address1Field.value.length < minChars) {
      google.maps.event.clearInstanceListeners(address1Field);
      document.querySelectorAll('.pac-container').forEach(function (element) {
        element.remove();
      });
      if (address1Field.value.length == minChars - 1) {
        initAutocomplete();
      }
    }
  } else if (minChars && address1Field.value.length < minChars - 1) {
    return;
  }


  const googleMapKey = document.querySelector('[data-googlemap-api-key]') ? document
    .querySelector('[data-googlemap-api-key]')
    .getAttribute('data-googlemap-api-key') : null;

  const googleMapUrl = document
    .querySelector('[data-googlemap-api-url]') ? document
    .querySelector('[data-googlemap-api-url]')
    .getAttribute('data-googlemap-api-url'): null;


  let scriptSrcElem = document.getElementById(`${addressElement}`);

  if (!scriptSrcElem && googleMapKey && googleMapUrl) {
    window.initAutocomplete = initAutocomplete;
    let scriptTag = document.createElement('script');

    scriptTag.setAttribute('src', `${googleMapUrl}?key=${googleMapKey}&callback=initAutocomplete&libraries=places&v=weekly`);
    scriptTag.setAttribute('id', `${addressElement}`)
    scriptTag.async = true;

    scriptTag.defer = true;
    document.head.appendChild(scriptTag);
  }

}
