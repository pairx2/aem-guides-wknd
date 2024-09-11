/***
 * SAMPLE LAB PROFILE IN LOCAL STORAGE:
 * {
 *   "date": 1666115706124,
 *   "labProfiles": [
 *     {
 *       "labName": "LABORATORIOS BIOMEDICOS SA DE",
 *       "labAddress": "EJERCITO NACIONAL NO. 516 ESQ. | CON TEMISTOCLES COL. POLANCO MEXICO N/A, Mexico",
 *       "billingStreet": "EJERCITO NACIONAL NO. 516 ESQ. | CON TEMISTOCLES COL. POLANCO MEXICO",
 *       "billingCountry": "Mexico",
 *       "billingState": "09",
 *       "billingCity": "N/A",
 *       "labProfileId": "29490",
 *       "primary": "false"
 *     }
 *   ]
 * }
 */
const CUSTPORTAL_PROFILES = "labProfiles";
const expirTime = 86400000; // milliseconds in a day

const JWT_TOKEN_KEY = "jwtToken";
const getHeaders = () => {
  const headers = window.getPageDataAttributes();
  const token = getCookie(JWT_TOKEN_KEY);
  headers["x-id-token"] = token;
  return headers;
}

const saveProfiles = (profiles) => {
  localStorage?.setItem(CUSTPORTAL_PROFILES, profiles);
  const profile = window.getLocalStorage('profile');
  const role = localStorage.getItem('role');
  
  triggerLabProfilesEvent(JSON.parse(profiles), profile, role);
}

const loadProfiles = () => {
  const profiles = JSON.parse(localStorage?.getItem(CUSTPORTAL_PROFILES));
  return profiles;
}

window.loadProfiles = loadProfiles;

const eslEndpoint = eslConfigDatasets()?.eslEndpoint;

const getLabProfiles = () => {
  const service = eslEndpoint + ESL_EPT?.LAB_PROFILE;
  
  fetch(service, {
    method: 'GET', // or 'PUT'
    headers: getHeaders()
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        triggerLabProfilesError("labprofiles_get_failure", response?.message ?? null );
      }
    })
    .then((data) => {
      if (data?.errorCode == 0) {
        saveProfiles(JSON.stringify({
          date : new Date().getTime(),
          labProfiles: data?.response
        }) );
      } else {
        triggerLabProfilesError("labprofiles_get_failure", data?.response);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      triggerLabProfilesError("labprofiles_get_failure", error);
    });
}
const CUSTPORTAL_SELECTED_PROFILE = "custportalSelectedLabProfile";

/***
 *  example:
 *  {
 *     "labName": "LABORATORIOS BIOMEDICOS SA DE",
 *     "labAddress": "EJERCITO NACIONAL NO. 516 ESQ. | CON TEMISTOCLES COL. POLANCO MEXICO N/A, Mexico",
 *     "billingStreet": "EJERCITO NACIONAL NO. 516 ESQ. | CON TEMISTOCLES COL. POLANCO MEXICO",
 *     "billingCountry": "Mexico",
 *     "billingState": "09",
 *     "billingCity": "N/A",
 *     "labProfileId": "29490",
 *     "primary": "true"
 * }
 * @returns {string|null|*}
 */
const loadSelectedLabProfiles = () => {
  try {
    const profile = localStorage?.getItem(CUSTPORTAL_SELECTED_PROFILE);
    const labProfiles = loadProfiles();
    if (!profile) return null;
    
    const parsedProfile = JSON.parse(profile);
    // test if this profile exists
    const selectedLabProfile = labProfiles?.labProfiles?.find(profile => profile.labProfileId == parsedProfile.labProfileId) ?? null;
    return selectedLabProfile;
  } catch (e) {
    console.error(`error loading selected lab profile from localstorage:`);
    console.error(e);
    return "";
  }
}

window.loadSelectedLabProfiles = loadSelectedLabProfiles;

const handleResponse = (data, errorId) => {
  if (data?.errorCode == 0) {
    getLabProfiles();
  } else {
    triggerLabProfilesError(errorId, data?.response);
  }
}

const initLabProfiles = (profile, role) => {
  
  let profiles = loadProfiles();
  let currentTime = new Date().getTime();
  
  if (!profiles || (currentTime - profiles.date > expirTime) ) {
    // profile doesn't exist, or is expired
    getLabProfiles();
  } else {
    triggerLabProfilesEvent(profiles, profile, role);
  }
};

const triggerLabProfilesEvent = (profiles, profile, role) => {
  window.custPortalLabProfiles = profiles;
  window.custPortalUserProfile = profile;
  window.custPortalUserRole = role;
  
  const event = new CustomEvent('add-customerportal:lab-profiles', {detail: {profiles:profiles, profile:profile, role:role}});
  document.dispatchEvent(event);
}

const triggerLabProfilesError = (type, errorResponse) => {
  const event = new CustomEvent('add-customerportal:lab-profiles-error', {detail: {type: type, errorResponse: errorResponse}});
  document.dispatchEvent(event);
}

window.initLabProfiles = initLabProfiles;

const addLabProfile = (customerNumber, instrumentSerialNumber, isPrimary) => {
  const service = eslEndpoint + ESL_EPT?.UPDATE_PROFILE;
  const body = {
    action: "addLab",
    userInfo: {
      additionalProperties: {
        customerNumber: customerNumber,
        instrumentSerialNumber: instrumentSerialNumber,
        primary: isPrimary
      }
    }
  }
  
  fetch(service, {
    method: 'POST', // or 'PUT'
    headers: getHeaders(),
    body: JSON.stringify(body)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        triggerLabProfilesError("labprofiles_add_failure", response?.message ?? null );
      }
    })
    .then((data) => {
      handleResponse(data, "labprofiles_add_failure");
    })
    .catch((error) => {
      console.error('Error:', error);
      triggerLabProfilesError("labprofiles_add_failure");
    });
}

window.addLabProfile = addLabProfile;

const removeLabProfile = (labProfileId) => {
  const service = eslEndpoint + ESL_EPT?.UPDATE_PROFILE;
  const body = {
    action: "removeLab",
    userInfo: {
      additionalProperties: {
        labProfileId: labProfileId
      }
    }
  }
  
  fetch(service, {
    method: 'POST', // or 'PUT'
    headers: getHeaders(),
    body: JSON.stringify(body)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        triggerLabProfilesError("labprofiles_remove_failure", response?.message ?? null );
      }
    })
    .then((data) => {
      handleResponse(data, "labprofiles_remove_failure");
    })
    .catch((error) => {
      console.error('Error:', error);
      triggerLabProfilesError("labprofiles_remove_failure");
    });
}

window.removeLabProfile = removeLabProfile;

const changePrimaryLabProfile = (labProfileId) => {
  const service = eslEndpoint + ESL_EPT?.UPDATE_PROFILE;
  const body = {
    action: "changePrimaryLab",
    userInfo: {
      additionalProperties: {
        labProfileId: labProfileId
      }
    }
  }
  
  fetch(service, {
    method: 'POST', // or 'PUT'
    headers: getHeaders(),
    body: JSON.stringify(body)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        triggerLabProfilesError("labprofiles_change-primary_failure", response?.message ?? null );
      }
    })
    .then((data) => {
      handleResponse(data, "labprofiles_change-primary_failure");
    })
    .catch((error) => {
      console.error('Error:', error);
      triggerLabProfilesError("labprofiles_change-primary_failure", error);
    });
}

window.changePrimaryLabProfile = changePrimaryLabProfile;

const staleLabProfiles = () => {
  const profiles = loadProfiles();
  profiles.date = 0;
  localStorage?.setItem(CUSTPORTAL_PROFILES, JSON.stringify(profiles));
}

window.staleLabProfiles = staleLabProfiles;
