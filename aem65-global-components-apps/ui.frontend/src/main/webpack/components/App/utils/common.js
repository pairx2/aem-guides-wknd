import { createElement } from 'react';
import i18next from 'i18next';
import ReactDOM from 'react-dom';
import ESL_EPT from '../data/eslEndpoints';
import { fetchESLservice, getPageDataAttributes } from '../services/eslService';
import commonConst from '../constants/commonConts';
import createConditionalEvent from './conditional';
import checkoutFormConst from '../constants/checkoutFormConst';
import LoadingIndicator from '../components/common/LoadingIndicator';
import './authServices';
import './account-navigation';
import './googleAutocompleteAddress';

const {
  PAYMENT_STEP,
} = checkoutFormConst;


const bodyDatasets = () => {
  return document.querySelector('#commerce-config')?.dataset || {};
};

window.storeDataSets = bodyDatasets;

const eslConfigDatasets = () => {
  return document.querySelector('#esl-config')?.dataset || {};
};

window.eslConfigDatasets = eslConfigDatasets;

window.getLocalAuthContextName = () => {
  const { storeView } = bodyDatasets();
  return `${commonConst.AUTH_LOCAL_STORAGE}-${storeView}`;
};

window.getLocalCommerceContextName = () => {
  const { storeView } = bodyDatasets();
  return `${commonConst.COMMERCE_LOCAL_STORAGE}-${storeView}`;
};

const getUrlParameter = (paramether) => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  return params.get(paramether);
};

const isAEMAuthor = () => !!getCookie('cq-authoring-mode');

// Pass it a selector to input[type="checkbox"] and it'll return 0 or 1 based on current checked state
// Have to do this because AEM's Form Options & Checkbox-Radio components do not properly update the 'checked' attribute
const getCheckboxState = (checkbox) => {
  let returnValue = 0; // Assume unchecked
  const siblings = $(checkbox).siblings('.a-checkbox__custom');
  const display = window
    .getComputedStyle(siblings[0], ':after')
    .getPropertyValue('display');
  if (display === 'block') {
    returnValue = 1;
  }
  return returnValue;
};

const removeEmpty = (obj) => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null || v === '')
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
  );
};

const addEventHandlers = (type, handlers = []) => {
  if (!type || !handlers.length) {
    // Missing required parameters
    return;
  }

  handlers.forEach((v) => {
    if (document.querySelectorAll(v.selector)?.length) {
      document.querySelectorAll(v.selector).forEach((el) => {
        el.addEventListener(type, v.handler);
      });
    }
  });
};

const removeEventHandlers = (type, handlers = []) => {
  if (!type || !handlers.length) {
    // Missing required parameters
    return;
  }

  handlers.forEach((v) => {
    if (document.querySelectorAll(v.selector)?.length) {
      document.querySelectorAll(v.selector).forEach((el) => {
        el.removeEventListener(type, v.handler);
      });
    }
  });
};

const i18nErrorLookup = (data) => {
  const res = data;
  const status = res?.status;
  const errorCode = res?.errorCode;
  const i18nMessageKey = res?.response?.i18nMessageKey;
  if (!status && errorCode && i18nMessageKey) {
    res.response.statusReason = i18next.t(
      `errorcode-${i18nMessageKey.toLowerCase()}`
    );
  }
  return res;
};

// Variable to be use on ADC
window.i18nErrorLookup = i18nErrorLookup;

const cloneElement = (
  el,
  numOfCopies = 1,
  position = 'after',
  classPrefix = 'clone'
) => {
  for (let i = numOfCopies; i > 0; i--) {
    const clone = el.cloneNode(true);
    clone.classList.add(`${classPrefix}-${i}`);

    if (position === 'before') {
      el.before(clone);
    } else {
      el.after(clone);
    }
  }
};

const isDuplicateEmail = async (email) => {
  try {
    const verifyEmailParams = {
      service: ESL_EPT.verifyEmailExists,
      data: {
        email,
      },
    };
    const { data, status } = await fetchESLservice(verifyEmailParams);

    if (data?.errorCode) {
      throw new Error(i18nErrorLookup(data)?.response?.statusReason);
    }

    if (data?.response && status === 200) {
      if (data.response?.userExists) {
        // A user with this email address already exists
        return true;
      }
      // A user with this email does not exist
      return false;
    }
    // Error getting response
    throw new Error('Something went wrong');
  } catch (err) {
    throw new Error(err);
  }
};

const validateAddress = async (address) => {
  let errorDetails = {};

  try {
    const checkAddressParams = {
      service: ESL_EPT.checkAddress,
      data: {
        ...address,
      },
    };
    const { data, status } = await fetchESLservice(checkAddressParams);

    if (data?.errorCode) {
      errorDetails.message = data.response?.statusReason;
      errorDetails.i18nMessageKey = data.response?.i18nMessageKey;
      throw new Error(data.response?.statusReason);
    }

    if (data?.response && status === 200) {
      return data.response;
    }

    // Error getting response
    throw new Error('Something went wrong');
  } catch (err) {
    const error = new Error(err);

    if (Object.keys(errorDetails).length) {
      Object.keys(errorDetails).forEach((key) => {
        error[key] = errorDetails[key];
      });
    }

    throw error;
  }
};

/* Address dropdown functions START */
let addressCity = '';
let addressDistrict = '';
let addressNeighborhood = '';
let addressPostcode = '';

//To check is Address Dropdown Fiels
const isAddressDropdownFields = (addressFormContainer) => {
  return $(`${addressFormContainer} #is-address-dropdown-options input`).is(
    ':checked'
  );
};

// To get the Cites Data
const getCities = async (container, countryCode) => {
  let cities_ESL_EPT = { ...ESL_EPT.cities };
  cities_ESL_EPT['url'] = cities_ESL_EPT['url'].replace(
    '${countryCode}',
    countryCode
  );
  const parms = {
    service: cities_ESL_EPT,
    addAuthHeaders: true,
    withRecaptcha: false,
  };
  const { data } = await fetchESLservice(parms);
  if (data?.response && data?.response.length > 0) {
    setAddressDropdownList(container, 'city', data, getDistricts);
  }
};

// To get the Districts Data
const getDistricts = async (city, container, parentKey) => {
  if (city && addressCity !== city) {
    addressCity = city;
    let districts_ESL_EPT = { ...ESL_EPT.districts };
    districts_ESL_EPT['url'] = districts_ESL_EPT['url'].replace(
      '${city}',
      parentKey
    );
    const parms = {
      service: districts_ESL_EPT,
      addAuthHeaders: true,
      withRecaptcha: false,
    };
    showTrDropdownLoader(container);
    const { data, errorCode } = await fetchESLservice(parms);
    if (!errorCode) {
      resetSelectedValue(['district', 'neighborhood', 'postcode'], container);
      addressDistrict = '';
      setAddressDropdownList(container, 'district', data, getNeighbourHoods);
      showTrDropdownLoader(container, true);
      return;
    }
    showTrDropdownLoader(container, true);
  }
};

// To get the NeighbourHoods Data
const getNeighbourHoods = async (district, container, parentKey) => {
  if (district && addressDistrict !== district) {
    addressDistrict = district;
    let neighbourhoods_ESL_EPT = { ...ESL_EPT.neighborhoods };
    neighbourhoods_ESL_EPT['url'] = neighbourhoods_ESL_EPT[
      'url'
    ].replace('${district}', parentKey);
    const parms = {
      service: neighbourhoods_ESL_EPT,
      addAuthHeaders: true,
      withRecaptcha: false,
    };
    showTrDropdownLoader(container);
    const { data, errorCode } = await fetchESLservice(parms);
    if (!errorCode) {
      resetSelectedValue(['neighborhood', 'postcode'], container);
      setAddressDropdownList(container, 'neighborhood', data, getPostCodes);
      showTrDropdownLoader(container, true);
      return;
    }
    showTrDropdownLoader(container, true);
  }
};

// To get the PostCodes Data
const getPostCodes = async (neighborhood, container, neighborhoodKey) => {

  if (neighborhood && addressNeighborhood !== neighborhood) {
    const data = {
      "response": [
          {
              "key": neighborhoodKey,
              "value": neighborhoodKey
          }
      ]
    }
    if (neighborhoodKey) {
      resetSelectedValue(['postcode'], container);
      setAddressDropdownList(
        container,
        'postcode',
        data,
        setpostcodes
      );
      return;
    }
  }
};

// To set Selected Postcode value
const setpostcodes = async (postcode) => (addressPostcode = postcode);

// To render Particular address Dropdown list
const setAddressDropdownList = (container, fieldCode, data, getListFun) => {
  let currentDropdownSelector = document.querySelector(
    `${container} ul.a-dropdown__menu[name="address.${fieldCode}"]`
  );
  if (
    currentDropdownSelector !== null &&
    data?.response &&
    data.response.length > 0
  ) {
    const optionList = data.response.map((item) => {
      let optionName = item?.key.trim();
      return (
        <li
          onClick={async () => await getListFun(item.value, container, item?.key)}
          data-optionvalue={`address.${fieldCode}.${fieldCode}_code`}
          role="option"
          key={item.key}
          value={item.value}
          data-value={item.value}
          parent-key= {item?.key}
          // class={(fieldCode === 'postcode') ? 'selected' : ''}
          // aria-selected={(fieldCode === 'postcode') ? 'true' : 'false'}
        >
          <span>{item.value}</span>
        </li>
      );
    });

    ReactDOM.render(optionList, currentDropdownSelector, () => {
      if (fieldCode === 'postcode') {
        selectPostcode(
          container,
          fieldCode,
          optionList.length === 1 ? data.response[0]?.value : ''
        );
      }
    });
  }
};

//To set auto populate postcode
const selectPostcode = (addressForm, field, postCodevalue) => {
  let postCodeDrodpwn = document.querySelector(
    `${addressForm} #field_label_postcode + .a-dropdown__field`
  );
  if (postCodevalue !== '') {
    postCodeDrodpwn.classList.add('disabled');
    let selectedPostcode = document.querySelector(
      `${addressForm} ul[name="address.${field}"]`
    ).previousElementSibling;
    if (selectedPostcode !== null) {
      selectedPostcode.classList.remove('a-dropdown__placeholder');
      selectedPostcode.classList.add('a-dropdown-selected');
      selectedPostcode.innerHTML = postCodevalue;
      let postcodeOption = document.querySelector(`${addressForm} li[data-optionvalue="address.${field}.${field}_code"][value="${postCodevalue}"]`);
      postcodeOption.classList.add('selected')
    }
  } else {
    postCodeDrodpwn.classList.remove('disabled');
  }
};

//To disable Postcode Dropdwon
const setPostcodeDisable = (currentAddressForm, field) => {
  let postCodeDrodpwn = document.querySelector(
    `${currentAddressForm} #field_label_${field} + .a-dropdown__field`
  );
  if (postCodeDrodpwn !== null && field === 'postcode') {
    postCodeDrodpwn.classList.add('disabled');
  }
};

// After changing address dropdown value reset other Dropdown fields
const resetSelectedValue = (fields = [], currentAddressForm) => {
  fields.forEach((field) => {
    let currentElement = document.querySelector(
      `${currentAddressForm} ul[name="address.${field}"]`
    ).previousElementSibling;
    if (
      currentElement !== null &&
      currentElement.classList.contains('a-dropdown-selected')
    ) {
      currentElement.classList.remove('a-dropdown-selected');
      currentElement.classList.add('a-dropdown__placeholder');
      currentElement.innerHTML = '';
    }
    setPostcodeDisable(currentAddressForm, field);

    if (
      document.querySelector(
        `${currentAddressForm} ul.a-dropdown__menu[name="address.${field}"]`
      ) !== null
    ) {
      let optionList = <></>;
      ReactDOM.render(
        optionList,
        document.querySelector(
          `${currentAddressForm} ul.a-dropdown__menu[name="address.${field}"]`
        )
      );
      switch (field) {
        case 'city':
          addressCity = '';
          break;
        case 'district':
          addressDistrict = '';
          break;
        case 'neighborhood':
          addressNeighborhood = '';
          break;
        default:
      }
    }
  });
};

//To show the loader while After selecting Address Dropdown fields
const showTrDropdownLoader = (container, hide) => {
  if (document.querySelector(`${container} #dropdwon-select-loader`) !== null) {
    if (hide) {
      ReactDOM.render(
        <></>,
        document.querySelector(`${container} #dropdwon-select-loader`)
      );
      return;
    }
    ReactDOM.render(
      <LoadingIndicator />,
      document.querySelector(`${container} #dropdwon-select-loader`)
    );
  }
};

//To set Dropdown into Default after closing the particular address form
const setAddressDropdownToDefault = (fields = [], container) => {
  addressCity = '';
  addressDistrict = '';
  addressNeighborhood = '';
  addressPostcode = '';
  let optionList = <></>;
  fields.forEach((fieldName) => {
    setPostcodeDisable(container, fieldName);

    if (
      document.querySelector(
        `${container} ul.a-dropdown__menu[name="address.${fieldName}"]`
      ) !== null
    ) {
      ReactDOM.render(
        optionList,
        document.querySelector(
          `${container} ul.a-dropdown__menu[name="address.${fieldName}"]`
        )
      );
    }
  });
  document
    .querySelectorAll(`${container} ul[name="address.city"] li.selected`)
    .forEach((list) => {
      list.classList.remove('selected');
    });
};

// To generate the key from particualar address value
const generateKeyFromValue = (value, addressForm, fieldCode) => {
  let parentKey = document.querySelector(`${addressForm} li[data-optionvalue="address.${fieldCode}.${fieldCode}_code"][value="${value}"]`);
  return parentKey?.getAttribute('parent-key');
}

//To Prefill Address Dropdown while editing the existing address
const prefillAddressDropdowns = async (
  addressData,
  addressForm,
  countryCode
) => {
  const { city, region, streetLine1 } = addressData;
  await getCities(addressForm, countryCode);
  await getDistricts(city, addressForm, generateKeyFromValue(city, addressForm, 'city'));
  await getNeighbourHoods(region, addressForm, generateKeyFromValue(region, addressForm, 'district'));
  await getPostCodes(streetLine1, addressForm, generateKeyFromValue(streetLine1, addressForm, 'neighborhood'));
}
/* Address dropdown functions END */

const getLocalContextStoreName = (
  localStorageName = commonConst.COMMERCE_LOCAL_STORAGE
) => {
  if (typeof getMultilingualLocalStorageKey === 'function')
    return getMultilingualLocalStorageKey(localStorageName);

  const { storeView } = bodyDatasets();
  return `${localStorageName}-${storeView}`;
};

const getSiteContextLocalStoreName = (
  localStorageName = commonConst.SITE_LOCAL_STORAGE
) => {
  if (typeof getMultilingualLocalStorageKey === 'function')
    return getMultilingualLocalStorageKey(localStorageName);

  const applicationId = document.getElementsByName('x-application-id')[0]
    ?.value;
  const language = document.getElementsByName('x-preferred-language')[0]?.value;
  return `${localStorageName}-${applicationId}-${language}`;
};

const isLoggedIn = (data) =>
  data?.accountInfo?.userInfo?.additionalProperties?.ecommToken &&
  data?.jwtToken?.id_token;

const getDataInfo = (commerceContext, dataSource) => {
  const bracketRegex = '\\[.*]';
  const splitSource = dataSource?.split('.');
  let dataObject = commerceContext;
  splitSource?.forEach((element) => {
    if (dataObject) {
      const bracketMatch = element.match(bracketRegex);

      if (bracketMatch?.length) {
        // element is referencing an array index
        const index = bracketMatch[0].substring(1, bracketMatch[0].length - 1);
        const arr = element.replace(new RegExp(bracketRegex), '');

        dataObject = dataObject[arr] ? dataObject[arr][index] : {};
      } else if (dataObject[element]) {
        dataObject = dataObject[element];
      } else {
        dataObject = {};
      }
    } else {
      dataObject = {};
    }
  });

  return dataObject;
};

// Formats address from API response to be in the format needed for FormData component
const formatAddresses = (arr, email) =>
  arr.map((address) => ({
    ...(address?.prefix && { prefix: address.prefix }),
    ...(address?.middlename && { middleName: address.middlename }),
    ...(address?.region?.region && { region: address.region.region }),
    ...(address?.name_of_address && { nameOfAddress: address.name_of_address }),
    id: address.id,
    default_shipping: address.default_shipping,
    default_billing: address.default_billing,
    firstName: address.firstname,
    lastName: address.lastname,
    streetLine1: address.street[0],
    streetLine2: address.street[1],
    city: address.city,
    country: address.country_code,
    zipCode: address.postcode,
    telephone: address.telephone,
    email,
  }));

// Replaces ${} in given string with replacement value:
const replacePlaceholder = (str, replacement) =>
  str.replace(/\$\{[^\}]*\}/g, replacement).replace(/^\s*[\r\n]/gm, '');

const cloneAddress = (el, numOfCopies = 1) => {
  const dataSource = el.querySelector('.checkout-form-data')?.dataset?.source;
  for (let i = numOfCopies; i > 0; i--) {
    const clone = el.cloneNode(true);
    clone.classList.add(`other-address-${i}`);

    if (document.querySelector('#myfreestyle-checkout') !== null) {
      clone.classList.add(`_unselected`);
    }

    clone.querySelector(
      '.checkout-form-data'
    ).dataset.source = replacePlaceholder(dataSource, i);
    el.after(clone);
  }
};

export const prefillDropdownValues = (nodeList, valueToPrefill, ulMenu) => {
  //remove selected class on the li if any
  //find the new li item to add the selected class to
  const listItems = [...nodeList];
  listItems.forEach((ele) => ele.classList.remove('selected'));
  let listItem = listItems.find(
    (ele) =>
      ele.textContent.trim().toLowerCase() === valueToPrefill.toLowerCase()
  );

  if(!listItem && ulMenu && listItems && listItems[0]?.dataset?.optionvalue == "address.region.region_code"){
    ulMenu?.querySelector('#county-google')?.remove();
    $(ulMenu)?.append(`<li data-optionvalue="address.region.region_code" id="county-google" role="option"><span class="a-dropdown__option-text">${valueToPrefill}</span></li>`);
    listItem = ulMenu?.querySelector('#county-google')
  }
  listItem?.classList.add('selected');

  //use the third parameter to empty the span node if valueToPrefill = ""
  if (!valueToPrefill.length) {
    ulMenu.previousSibling.textContent = '';
    return;
  }

  //remove placeholder and span nodes if any and re-populate span
  const parentElementUL = listItem?.parentElement;
  $(parentElementUL).prevAll('.a-dropdown-selected')?.remove();
  $(parentElementUL).prevAll('.a-dropdown__placeholder')?.remove();
  const spanNode = $('<span></span>')
    .text(valueToPrefill)
    .addClass('a-dropdown-selected');

  //add the span node only on the first click of Edit Address
  if (!$(parentElementUL?.parentElement).find('.a-dropdown-selected').length)
    $(parentElementUL).before(spanNode);

  return listItem;
};

const prefillEditForm = (address, modal) => {
  const addressFields = [
    {
      input: modal.querySelector('input[name="address.id"]'),
      value: address.id,
    },
    {
      input: modal.querySelector('input[name="address.firstName"]'),
      value: address.firstName,
    },
    {
      input:
        !!address.middleName &&
        modal.querySelector('input[name="address.middleName"]'),
      value: address.middleName,
    },
    {
      input: modal.querySelector('input[name="address.lastName"]'),
      value: address.lastName,
    },
    {
      input: modal.querySelector('input[name="address.streetLine1"]'),
      value: address.streetLine1,
    },
    {
      input: modal.querySelector('input[name="address.streetLine2"]'),
      value: address.streetLine2,
    },
    {
      input: modal.querySelector('input[name="address.zipCode"]'),
      value: address.zipCode,
    },
    {
      input: modal.querySelector('input[name="address.city"]'),
      value: address.city,
    },
    {
      input: modal.querySelector('input[name="address.countryId"]'),
      value: address.countryId || address.country,
    },
    {
      input: modal.querySelector('input[name="address.telephone"]'),
      value: address.telephone,
    },
    {
      input: modal.querySelector('input[name="address.default_shipping"]'),
      value: address.default_shipping,
    },
    {
      input:
        !!address.nameOfAddress &&
        modal.querySelector('input[name="address.nameOfAddress"]'),
      value: address.nameOfAddress,
    },
    {
      input: modal.querySelector('input[name="address.default_billing"]'),
      value: address.default_billing,
    },
    {
      input: modal.querySelector('input[name="address.openAddress"]'),
      value: address.streetLine2,
    },
    {
      input:
        !!address.subscriptionId &&
        modal.querySelector('input[name="address.subscriptionId"]'),
      value: address.subscriptionId,
    },
    {
      input:
        !!address.addressType &&
        modal.querySelector('input[name="address.addressType"]'),
      value: address.addressType,
    },
    {
      dropdownText:
        !!address.region &&
        prefillDropdownValues(
          modal.querySelectorAll(
            'li[data-optionvalue="address.region.region_code"]'
          ),
          address.region,
          modal.querySelector('ul[name="address.region"]')
        ),
      value: address.region,
    },
    {
      dropdownText:
        !!address.prefix &&
        prefillDropdownValues(
          modal.querySelectorAll('li[data-optionvalue="address.prefix"]'),
          address.prefix
        ),
      value: address.prefix,
    },
    {
      dropdownText:
        !!address.city &&
        prefillDropdownValues(
          modal.querySelectorAll(
            'li[data-optionvalue="address.city.city_code"]'
          ),
          address.city
        ),
      value: address.city,
    },
    {
      dropdownText:
        !!address.region &&
        prefillDropdownValues(
          modal.querySelectorAll(
            'li[data-optionvalue="address.district.district_code"]'
          ),
          address.region
        ),
      value: address.region,
    },
    {
      dropdownText:
        !!address.streetLine1 &&
        prefillDropdownValues(
          modal.querySelectorAll(
            'li[data-optionvalue="address.neighborhood.neighborhood_code"]'
          ),
          address.streetLine1
        ),
      value: address.streetLine1,
    },
    {
      dropdownText:
        !!address.zipCode &&
        prefillDropdownValues(
          modal.querySelectorAll(
            'li[data-optionvalue="address.postcode.postcode_code"]'
          ),
          address.zipCode
        ),
      value: address.zipCode,
    },
    {
      dropdownText:
        (address.countryId|| address.country) &&
        prefillDropdownValues(
          modal.querySelectorAll(
            'li[data-optionvalue="address.countryId.value"]'
          ),
          (address.countryId || address.country)
        ),
      value: address.countryId || address.country
    }
  ];

  addressFields.forEach(({ input, dropdownText, value }) => {
    if (input) {
      input.value = value || '';
    }
    if (dropdownText && dropdownText.getElementsByTagName('span')[1]) {
      const domElement = dropdownText.getElementsByTagName('span')[1];
      if(domElement) {
        domElement.textContent = value || '';
      }
    }
  });

  if (address.streetLine2?.length) {
    window.dispatchEvent(createConditionalEvent(true, 'modalAddLine2'));
  }
};

const defaultPrefillFields = (userInfo) => {
  return {
    prefix: userInfo?.title,
    firstName: userInfo?.firstName || '',
    middleName: userInfo?.middleName || '',
    lastName: userInfo?.lastName || '',
    telephone: userInfo?.phoneNumber || '',
  }
}

const prefillAddAddressForm = (address, modal) => {
  const addressFields = [
    {
      input: modal.querySelector('input[name="address.firstName"]'),
      value: address.firstName,
    },
    {
      input:
        !!address.middleName &&
        modal.querySelector('input[name="address.middleName"]'),
      value: address.middleName,
    },
    {
      input: modal.querySelector('input[name="address.lastName"]'),
      value: address.lastName,
    },
    {
      input: modal.querySelector('input[name="address.telephone"]'),
      value: address.telephone,
    },
    {
      dropdownText:
        !!address.prefix &&
        prefillDropdownValues(
          modal.querySelectorAll('li[data-optionvalue="address.prefix"]'),
          address.prefix
        ),
      value: address.prefix,
    },
  ];

  addressFields.forEach(({ input, dropdownText, value }) => {
    if (input) {
      input.value = value || '';
    }
    if (dropdownText) {
      const domElement = dropdownText.getElementsByTagName('span')[1];
      if(domElement) {
        domElement.textContent = value || '';
      }
    }
  });
}

const setAuthHeaderFields = (el) => {
  const authInfo =
    JSON.parse(
      localStorage.getItem(
        getLocalContextStoreName(commonConst.AUTH_LOCAL_STORAGE)
      ) || null
    ) || null;

  if (authInfo) {
    el.querySelector('input[name="x-id-token"]').value =
      authInfo.jwtToken?.id_token || null;
    el.querySelector('input[name="x-ecom-token"]').value =
      authInfo.accountInfo?.userInfo?.additionalProperties?.ecommToken || null;
  } else {
    // No authInfo exists, user is likely not logged in. Reset these fields to avoid making changes to incorrect address anyway
    el.querySelector('input[name="x-id-token"]').value = null;
    el.querySelector('input[name="x-ecom-token"]').value = null;
  }
};

// If 401 error, logout user and redirect to login
const redirectUsertoLogin = async () => {
  await OnNaveCommLogoutSuccess();
  const { loginPage } = document.querySelector('body')?.dataset;
  if (loginPage) {
    window.location.replace(shortLongUrl(loginPage));
  }
};

/*
 *  Check if is less than X minutes ago
 *  {minutes} by default is 13
 */
const lessThanMinutesAgo = (date, minutes = 13) => {
  const minutesOnSeconds = 1000 * 60 * minutes;
  const minutesAgo = Date.now() - minutesOnSeconds;

  return date > minutesAgo;
};

// Making function global to be access it on divisional code
window.lessThanMinutesAgo = lessThanMinutesAgo;

const getURLParams = (searchString) => {
  let queryString = searchString || window.location.search;

  if (!queryString) {
    return {};
  }

  if (queryString[0] === '?') {
    queryString = queryString.substring(1);
  }

  const pairs = queryString.split('&').reduce((acc, pair) => {
    if (pair.indexOf('=') === -1) {
      // Add this to the previous key/value pair
      let previousValue = acc.pop();

      if (pair === '') {
        previousValue += '&';
      } else {
        previousValue += `&${pair}`;
      }

      return [...acc, previousValue];
    }

    return [...acc, pair];
  }, []);

  if (pairs?.length) {
    return pairs.reduce((acc, pair) => {
      const indexOfAssignment = pair.indexOf('=');
      const key = pair.substring(0, indexOfAssignment);
      const value = pair.substring(indexOfAssignment + 1);

      return {
        ...acc,
        [key]: value,
      };
    }, {});
  }
};

const getCookie = (name) => {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
};

const onAEMauthor = () => {
  const hasAuthorClass = document
    .querySelector('html')
    .classList.contains('aem-AuthorLayer-Edit');
  return (
    hasAuthorClass ||
    window.top.location.href.indexOf('/editor.html') > -1 ||
    getCookie('wcmmode')
  );
};

// Variable to be use on ADC
window.getURLParams = getURLParams;

/**
 *
 * @param {string} dateStr Date in format "DD/MM/YYYY"
 * @param {function} t Translation hook
 * @returns {string} Date formatted as "DD Month" (e.g. "17 January")
 */
const getFormattedDate = (dateStr = '', t = (key) => key) => {
  const months = [
    t('january'),
    t('february'),
    t('march'),
    t('april'),
    t('may'),
    t('june'),
    t('july'),
    t('august'),
    t('september'),
    t('october'),
    t('november'),
    t('december'),
  ];

  if (dateStr.indexOf('/') === -1) {
    return dateStr;
  }

  const parts = dateStr.split('/');
  const date = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  );

  return `${date.getDate()} ${months[date.getMonth()]}`;
};

/**
 * Downloads a PDF or XML file from binary data
 * @param {string} data binary data
 * @param {string} fileName file name
 */
const downloadFile = ({ data, fileName }) => {
  if (!data || !fileName) {
    console.error('Missing data or file name');
    return;
  }

  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const arrayBuffer = base64ToArrayBuffer(data);
  const type = fileName.includes('.pdf')
    ? 'application/pdf'
    : fileName.includes('.xml')
    ? 'text/xml'
    : 'text/plain';
  const blob = new Blob([arrayBuffer], { type });
  const url = window.URL || window.webkitURL;

  const a = document.createElement('a');
  a.setAttribute('download', fileName);
  a.setAttribute('href', url.createObjectURL(blob));
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Scroll to top of page
const scrollToTop = () => {
  document.querySelector('body').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

// Check if two simple objects are equal
const objsHaveSameData = (obj1, obj2) => {
  if (obj1 && obj2) {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
      return Object.keys(obj1).every(
        (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
      );
    }
  }

  return false;
};

/**
 *
 * @param {string | number} str
 * @returns {number} formatted number to 2 decimal places
 */
const parsePriceString = (str) => {
  let price = str;

  if (typeof price === 'string') {
    price = Number(price.replace(',', ''));
  }

  return price?.toFixed(2);
};

const fetchSinglePurchaseProduct = (selectedOption, items) => {
  if(selectedOption.toLowerCase() === 'singlepurchase' && items?.length) {
    return items[0];
  }
  return items?.find(item => item?.sarp2?.has_plans === false);
}

const fetchSubscriptionPurchaseOptions = (items) => {
  return items?.filter(item => item?.sarp2?.has_plans === true);
}

const containsOnlySubscriptionPurchase = (items) => {
  const subscriptionItems = fetchSubscriptionPurchaseOptions(items);
  return (items?.length === subscriptionItems?.length);
}

const storeSubscriptionsByCategory = (subscriptionsList) => {
  const activeSubscriptions = subscriptionsList?.filter(subscription => 
    ['active', 'suspended'].includes(subscription?.status?.toLowerCase()));
  const otherSubscriptions = subscriptionsList?.filter(subscription => 
    !['active', 'suspended'].includes(subscription?.status?.toLowerCase()));
  localStorage.setItem('activeSubscriptions', JSON.stringify(activeSubscriptions));
  localStorage.setItem('otherSubscriptions', JSON.stringify(otherSubscriptions));
  return;
}

const fetchSuspendedSubscriptionsIds = (subscriptionsList) => {
  const suspendedList = subscriptionsList?.filter(item => item?.status?.toLowerCase() === 'suspended');
  let idString = '';
  suspendedList?.forEach(subscription => idString = idString + '#' + subscription?.increment_id + ',')
  return idString;
}

/**
 *
 * @param {HTMLElement} DOMElement
 *  Element where the eventListener is going to be applied
 * @param {requestCallback} callback
 *  callback is called after touch direction calculation
 *  returning direction {String}: 'right'|'left'|'down'|'up'
 */
const touchDirectionDetection = (DOMElement, callback) => {
  let xDown = null;
  let yDown = null;

  const getTouches = (evt) => {
    return evt.touches || evt.originalEvent.touches;
  };

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = (evt) => {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    let swipeDirection;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        swipeDirection = 'right';
      } else {
        swipeDirection = 'left';
      }
    } else {
      if (yDiff > 0) {
        swipeDirection = 'down';
      } else {
        swipeDirection = 'up';
      }
    }

    if (callback) {
      callback(swipeDirection);
    }

    xDown = null;
    yDown = null;
  };

  if (DOMElement) {
    DOMElement.addEventListener('touchstart', handleTouchStart, false);
    DOMElement.addEventListener('touchmove', handleTouchMove, false);
  }
};

/**
 * Parses an i18n string with variable placeholders and returns a set of span elements.
 * Variables must be designated with {0} syntax in the i18n string.
 * @param {string} i18nString
 * @param {string[]} replacements array of values to inject. Index 0 in this array will replace {0}, index 1 will replace {1}, and so on.
 * @param {string} variableClassName optional class name to assign to variable span elements.
 * @returns JSX containing variables inside span elements.
 */
const replaceI18nVariables = (i18nString, replacements, variableClassName) => {
  const elements = [];

  let chunk = '';
  let isVariable = false;

  i18nString.split('').forEach((char, index) => {
    if (char === '{') {
      if (chunk.length) {
        elements.push({
          text: chunk,
          isVariable,
        });
      }
      chunk = '';
      isVariable = true;
    } else if (char === '}') {
      if (chunk.length) {
        elements.push({
          text: chunk,
          isVariable,
        });
      }
      chunk = '';
      isVariable = false;
    } else {
      chunk += char;

      if (index === i18nString.length - 1) {
        elements.push({
          text: chunk,
          isVariable,
        });
      }
    }
  });

  if (elements) {
    return elements.map((el) => {
      if (el.isVariable) {
        return createElement('span', {
          class: variableClassName || 'dynamic-value',
          children:
            replacements && replacements[el.text] ? replacements[el.text] : '',
        });
      } else {
        return createElement('span', { children: el.text });
      }
    });
  }
};

/**
 * Returns true if one or more items in cart are a subscription
 * @param {*} commerceContext
 * @returns {boolean} true or false
 */
const cartContainsSubscription = (commerceContext) =>
  !!(commerceContext?.cart?.items?.some((item) => item?.sarp2?.identifier_of_subscription));

/**
 *  Checks if session has expired
 * @param {number} minutesAgo - session lifetime in elapsed minutes
 * @param timestamp - session timestamp to use instead of SESSION_EXPIRED_MODAL
 * @returns {boolean} True if session has expired
 */
const isSessionExpired = (minutesAgo = 13, timestamp = null) => {
  const sessionTimestamp = localStorage.getItem(
    timestamp || commonConst.SESSION_EXPIRED_MODAL
  );

  if (sessionTimestamp) {
    if (!lessThanMinutesAgo(JSON.parse(sessionTimestamp), minutesAgo)) {
      return true;
    } else {
      return false;
    }
  }
};

/**
 * If user is not logged in but has added a subscription to the cart:
 * - Begin guest subscription flow by saving guestSubscriptionFlow flag to localStorage
 * - Swap "Checkout" button with one linking to create account page using isGuestSubscription form conditional event
 */
const beginGuestSubscriptionFlow = () => {
  if (!window.localStorage.getItem('guestSubscriptionFlow')) {
    window.localStorage.setItem('guestSubscriptionFlow', Date.now());
  }

  window.dispatchEvent(createConditionalEvent(true, 'isGuestSubscription'));
};

/**
 * - End guest subscription flow by removing guestSubscriptionFlow flag from localStorage
 * - Swap "Checkout" button with one linking to checkout page using isGuestSubscription form conditional event
 */
const endGuestSubscriptionFlow = () => {
  if (window.localStorage.getItem('guestSubscriptionFlow')) {
    window.localStorage.removeItem('guestSubscriptionFlow');
  }

  window.dispatchEvent(createConditionalEvent(false, 'isGuestSubscription'));
};

/**
 *  Function to check if commerce is enabled
 * @returns {boolean} True in case commerce is enabled
 */
const isCommerceEnabled = () => {
  const commerceInfo = bodyDatasets();
  return !(commerceInfo && Object.keys(commerceInfo).length === 0);
};

/**
 *  Function to short url when it has the long path attached to it,
 *  for example `/content/adc/navecomm/countries/...`
 * @param {string} url - long url
 * @returns {string} Shortened url
 */
const shortLongUrl = (url) => {
  let shortenedUrl = url;
  if (!onAEMauthor() && url) {
    const applicationId =
      document.getElementsByName('x-application-id')[0]?.value || 'navecomm';
    const stringToRemove = `/content/adc/${applicationId}/countries`;
    shortenedUrl = url.replace(stringToRemove, '');
  }
  return shortenedUrl;
};

/**
 * Gets the english ordinal of a number
 * @param {number} number Number to get the ordinal for
 * @returns {string} Returns english ordinal (st|nd|rd|th)
 */
const getOrdinal = (number) => {
  if (number > 3 && number < 21) return 'th';
  switch (number % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

/**
 * Adds the english ordinal to the day of a formatted date
 * @param {string} date Date with a numeric day to add the ordinal to
 * @param {function} t Translation hook
 * @returns {string} Returns the date string with the english ordinal (st|nd|rd|th) added
 */
const addOrdinalToDate = (date, t = (key) => key) => {
  const dayRegex = /(^|\s)[0-9]{1,2}(\s|,|$)/;
  const matches = date.match(dayRegex);

  if (!matches) return date;

  const dayNumber = Number.parseInt(matches);
  const dayStringWithOrdinal =
    matches[1] + dayNumber + t(getOrdinal(dayNumber)) + matches[2];

  return date.replace(matches[0], dayStringWithOrdinal);
};

/**
 * Gets a formatted date in the locale of the prefered language
 * @param {string} date Date in a format recognized by Date.parse()
 * @param {object} options Corresponds to the options parameter of the Intl.DateTimeFormat() constructor
 * @param {string} defaultLanguageTag Default BCP 47 Language Tag to use if preferred language isn't set
 * @returns {string} Returns formatted date in preferred language
 */
const getDateInPreferredLanguage = (
  date,
  options = { day: 'numeric', month: 'long', year: 'numeric' },
  defaultLanguageTag = 'en-GB'
) => {
  const {
    'x-preferred-language': preferredLanguage = defaultLanguageTag,
  } = getPageDataAttributes();

  let convertedDate = convertDateString(date);
  return new Date(convertedDate).toLocaleDateString(
    preferredLanguage.replace('_', '-'),
    options
  );
};

//check if the passed date is today's date
const isToday = (date) => {
  const today = new Date();

  if (date && today?.toDateString() === date?.toDateString()) {
    return true;
  }

  return false;
}

//convert Date string to format supported by all browsers
const convertDateString = (date) => {
  const dateParts = date.split(' ')[0].split('-');
  const timePart = date.split(' ')[1];
  let formattedDateString =
    dateParts[0] + '-' + dateParts[1] + '-' + dateParts[2] + 'T' + timePart;
  return formattedDateString;
};

const removeHTMLTags = (input) => {
  return input.replace(/<[^>]*>/g, '');
};

const getItemMaxValue = (commerceContext, sku) => {
  const maxValue = commerceContext?.productQuantities?.find(
    (item) => item?.sku === sku
  )?.default_quantities?.max_sale_qty;
  return maxValue || 10;
};

const getItemMinValue = (commerceContext, sku) => {
  const minValue = commerceContext?.productQuantities?.find(
    (item) => item?.sku === sku
  )?.default_quantities?.min_sale_qty;
  return minValue || 1;
};

const downloadDocuments = async (
  documents,
  type = 'invoice',
  action = 'downloadDocument'
) => {
  try {
    if (!documents?.length) {
      throw new Error('No documents to open');
    }

    // Make requests for all documents:
    const documentData = await Promise.all(
      documents.map(async (document) => {
        const { data, errorCode } = await fetchESLservice({
          service: ESL_EPT.getDocument,
          data: {
            action,
            documentId: document.number,
            type,
          },
          addAuthHeaders: true,
          withRecaptcha: false,
        });

        if (data?.response) {
          return data.response;
        }
      })
    );

    // Download each PDF files:
    if (documentData?.length) {
      documentData.forEach((document) =>
        downloadFile({
          data: document.attachmentBytes,
          fileName: document.attachmentName,
        })
      );
    }
  } catch (e) {
    console.error(e);
  } finally {
    return false;
  }
};

const cleanDisplayString = (str) =>
  str.replace(
    /[&<>"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
      }[tag])
  );

  const findAddressById = (addressList, addressId) => {
    if(!!(addressList?.length))
      return addressList.find(address => address.id === addressId);
    return {};
  };

  const removeSpacingFromParent = (selectorID) => {
    document.getElementById(selectorID).parentElement.style.padding = '0px';
    document.getElementById(selectorID).parentElement.style.margin = '0px';
  };

/**
 *  This function is an alternative to `object optional chaining` and https://lodash.com/docs/4.17.15#get in order to get object nested
 *  properties without having javascript exceptions when property not present.
 *
 *  This is the gist with examples and test cases: https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf?permalink_comment_id=3515777#gistcomment-3515777
 *
 *  Examples:
 *  - With an object:
 *    - Before: `response?.response?.data?.customer?.orders?.items?.length;`
 *    - After:  `getNestedObject(response,"response.data.customer.orders.items.length");`
 *  - With DOM elements
 *    - Before: `document.querySelector("#userName")?.value;`
 *    - After: `getNestedObject(document.querySelector("#userName"),"value");`
 *
 * @param {object} object : The object where we are going to read the propertie from
 * @param {string} path : E.g. "child.child2.child3.child4"
 * @param {*} defaultValue : In case the nested property isn't found, a default value can be set, otherwise, `undefined` is going to be returned
 * @returns Return the object propery value or [defaultValue || undefined] if property not found
 */
const getNestedObject = (object, path, defaultValue) => {
  return String(path)
    .split('.')
    .reduce((acc, v) => {
      try {
        acc = acc[v] !== undefined && acc[v] !== null ? acc[v] : defaultValue;
      } catch (e) {
        return defaultValue;
      }
      return acc;
    }, object);
};

const formatPriceAA = (str) => {
  if (str == 0) {
    return 0.00
  }
  return (Math.round(str * 100) / 100)
}

const getCartProduct = (productno) => {
  
  let commerceContext = JSON.parse(
    localStorage.getItem(getLocalCommerceContextName())
  );
   
  productno.attribute_set=commerceContext?.cart?.items?.find(
    (item) => item?.product.sku === productno?.sku
  )?.product?.attribute_set;  

  productno.product_version=commerceContext?.cart?.items?.find(
    (item) => item?.product.sku === productno?.sku
  )?.product?.product_version;  

  return productno;  
};  

const validateRequiredFields = (commerceContext, userIsLoggedIn) => {
  if (!commerceContext?.cart?.id) {
    return;
  }

  // Input Validation
  const requiredInputs = $(`#section-simplified-checkout-consent #checkout-consents-options input[required]`).filter(
    ':visible'
  );
  let validInputs = 0;
  requiredInputs.each((i, el) => {
    const parent = el.closest('.form-group');
    const hasError =
      parent.classList.contains('validation-require') ||
      parent.classList.contains('validation-error') ||
      parent.classList.contains('validation-regex');

    if (el.value && !hasError) {
      validInputs++;
    }
  });

  // Checkbox Validation
  const requireCheckboxes = $(
    `#section-simplified-checkout-consent #checkout-consents-options input[type="checkbox"][data-required="true"]`
  );
  // Checkbox validations
  let validCheckboxes = 0;
  requireCheckboxes.each((i, el) => {
    validCheckboxes += getCheckboxState(el);
  });

  if (
    commerceContext?.checkout?.selectedShippingMethod &&
    validInputs === requiredInputs.length &&
    validCheckboxes === requireCheckboxes.length
  ) {
    //show payment type
    document
      .querySelector(PAYMENT_STEP) ?
      document
        .querySelector(PAYMENT_STEP)
        .setAttribute(
          'style',
          'display: block;'
        )
      : '';
    document
      .querySelector('#payment-terms-text') ?
      document
        .querySelector('#payment-terms-text')
        .setAttribute(
          'style',
          'display: none;'
        )
      : '';
    return true
  } else {
    //hide payment type
    document
      .querySelector(PAYMENT_STEP)
      ?
      document
        .querySelector(PAYMENT_STEP)
        .setAttribute(
          'style',
          'display: none;'
        )
      : '';
    document
      .querySelector('#payment-terms-text') ?
      document
        .querySelector('#payment-terms-text')
        .setAttribute(
          'style',
          'display: block;'
        )
      : '';
    return false
  }
};

const compareObject =  (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !compareObject(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
};

const isObject = (object) => {
  return object != null && typeof object === 'object';
};

const showTransparentLoader = () => {
  const shippingElem = document.querySelector('.shippingmethods');
  const shippingListElem = document.querySelector('.m-shipping-methods__list');
  const docStr = `<div class="a-spinner m-2 display-spinner">
                    <div class="spinner-border" role="status">
                  </div></div>`;
 
  if (shippingElem && shippingListElem) {
    shippingElem.insertAdjacentHTML('afterbegin', docStr);
    shippingListElem.classList.add('delivary-method-blur');
  }
};
const hideTransparentLoader = () => {
  const shippingElem = document.querySelector('.display-spinner');
  const shippingListElem = document.querySelector('.m-shipping-methods__list');
  if (shippingListElem && shippingElem) {
    shippingElem.remove('display-spinner');
   shippingListElem.classList.remove('delivary-method-blur');
  }
};

const checkConsentStatus = (commerceContext, userIsLoggedIn) => {
  if (!commerceContext?.cart?.id) {
    return;
  }

  // Input Validation
  const requiredInputs = $(`#section-simplified-checkout-consent #checkout-consents-options input[required]`).filter(
    ':visible'
  );
  let validInputs = 0;
  requiredInputs.each((i, el) => {
    const parent = el.closest('.form-group');
    const hasError =
      parent.classList.contains('validation-require') ||
      parent.classList.contains('validation-error') ||
      parent.classList.contains('validation-regex');

    if (el.value && !hasError) {
      validInputs++;
    }
  });

  // Checkbox Validation
  const requireCheckboxes = $(
    `#section-simplified-checkout-consent #checkout-consents-options input[type="checkbox"][data-required="true"]`
  );
  // Checkbox validations
  let validCheckboxes = 0;
  requireCheckboxes.each((i, el) => {
    validCheckboxes += getCheckboxState(el);
  });

  if (
    commerceContext?.checkout?.selectedShippingMethod &&
    validInputs === requiredInputs.length &&
    validCheckboxes === requireCheckboxes.length
  ) {
    //show payment type
    
    return true
  } else {
    //hide payment type
    
    return false
  }
};
export {
  bodyDatasets,
  eslConfigDatasets,
  getUrlParameter,
  isAEMAuthor,
  getCheckboxState,
  removeEmpty,
  addEventHandlers,
  removeEventHandlers,
  cloneElement,
  isDuplicateEmail,
  validateAddress,
  getLocalContextStoreName,
  getSiteContextLocalStoreName,
  isLoggedIn,
  getDataInfo,
  formatAddresses,
  replacePlaceholder,
  cloneAddress,
  prefillEditForm,
  setAuthHeaderFields,
  isAddressDropdownFields,
  setAddressDropdownList,
  getCities,
  getDistricts,
  getNeighbourHoods,
  getPostCodes,
  setAddressDropdownToDefault,
  prefillAddressDropdowns,
  redirectUsertoLogin,
  i18nErrorLookup,
  lessThanMinutesAgo,
  isSessionExpired,
  getURLParams,
  getFormattedDate,
  getCookie,
  onAEMauthor,
  downloadFile,
  scrollToTop,
  objsHaveSameData,
  parsePriceString,
  touchDirectionDetection,
  replaceI18nVariables,
  cartContainsSubscription,
  beginGuestSubscriptionFlow,
  endGuestSubscriptionFlow,
  isCommerceEnabled,
  shortLongUrl,
  addOrdinalToDate,
  getDateInPreferredLanguage,
  removeHTMLTags,
  downloadDocuments,
  getItemMaxValue,
  getItemMinValue,
  cleanDisplayString,
  findAddressById,
  removeSpacingFromParent,
  getNestedObject,
  formatPriceAA,
  getCartProduct,
  validateRequiredFields,
  showTransparentLoader,
  hideTransparentLoader,
  fetchSinglePurchaseProduct,
  fetchSubscriptionPurchaseOptions,
  containsOnlySubscriptionPurchase,
  storeSubscriptionsByCategory,
  fetchSuspendedSubscriptionsIds,
  isToday,
  defaultPrefillFields,
  prefillAddAddressForm,
  compareObject,
  checkConsentStatus,
};
