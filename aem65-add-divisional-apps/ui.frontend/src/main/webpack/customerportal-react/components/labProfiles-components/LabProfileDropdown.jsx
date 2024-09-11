import React, { useRef, useState} from 'react'
import {useTranslation} from "react-i18next";
import {DropDown} from "@abbott/add-platform";

import { useSharedLabProfiles } from "../shared/LabProfiles"
import {labProfilesService} from "../services/LabProfilesService";
import {useSharedOUS} from "../shared/OutsideUS";
import {useAnalyticsUtils} from "../shared/AnalyticsUtils";

export const LabProfileDropdown = (props) => {

  const { t, i18n } = useTranslation();
  const { selectedLabProfile,
    labProfiles,
    setSharedLabProfiles,
    labProfileError,
    setLabProfileError,
    labProfileErrorMsg,
    setLabProfileErrorMsg,
    userProfile,
    setUserProfile,
    userRole,
    setProfileCountry,
    profileCountry} = useSharedLabProfiles();
  const {saveSelectedLabProfile, initSelectedLabProfiles} = labProfilesService();
  const {initOUS, distributorOus} = useSharedOUS();
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const {analyticsUserAndLabObject,fireAnalyticsEvent} = useAnalyticsUtils();
  
  const initProfileCountry = () => {
    if (userProfile) {
      let country = userProfile['country'];
      if (country) {
        // regex expression to match all
        // non-alphanumeric characters in string
        const regex = /[^A-Za-z0-9]/g;
        
        // use replace() method to
        // match and remove all the
        // non-alphanumeric characters
        country = country.replace(regex, "").toLowerCase();
        if (country) {
          setProfileCountry(country);
        }
      }
    }
  }
  
  const handleLabProfile = (ev) => {
    // we init here because we have all the logged-in user's info at this point
    const {profiles, profile, role} = ev.detail
    setSharedLabProfiles(profiles);
    setUserProfile(profile);
  }
  
  const handleLabProfileError = (ev) => {
    const errorType = ev.detail.type;
    const errorResponse = ev.detail.errorResponse;
    let errorMessage = "";
    if (errorResponse) {
      if(typeof errorResponse != "string") {
        errorMessage = (errorResponse?.statusReason ?? null);
          if(errorResponse?.i18nMessageKey =="ES-0012"){
               errorMessage = errorResponse?.i18nMessageKey;
          }
      } else {
        errorMessage = errorResponse;
      }
    }
    
    switch(errorType) {
      case "labprofiles_get_failure":
        if (!errorMessage) {
          errorMessage = t('lab-profile-get-failure');
        }
        break;
      case "labprofiles_add_failure":
        if (!errorMessage) {
          errorMessage = t('labprofiles-add-failure')
        }
        break;
      case "labprofiles_remove_failure":
        if (!errorMessage) {
          errorMessage = t('labprofiles-remove-failure')
        }
        break;
      case "labprofiles_change-primary_failure":
        if (!errorMessage) {
          errorMessage = t('labprofiles-change-primary-failure');
        }
        break;
    }
    setLabProfileError(true);
    setLabProfileErrorMsg(errorMessage);
  }

  const getLabProfileFromID = (id) => {
    return labProfiles?.labProfiles?.find(profile => profile.labProfileId == id);
  }
  
  const changeLabProfileEvent = (item)=> {
    const labProfile = getLabProfileFromID(item.value);
    saveSelectedLabProfile(labProfile);
    location.href = "/int/en/secure/dashboard.html";
  }

  React.useEffect(() => {
    // component init. This is one of few react components present on every page in the customer portal
    // if the items are already initialized before this component is initialized
    if (window.custPortalLabProfiles) {
      setSharedLabProfiles(window.custPortalLabProfiles);
    }
    if (window.custPortalUserProfile) {
      setUserProfile(window.custPortalUserProfile);
    }

    // Handle #labProfile
    document.addEventListener('add-customerportal:lab-profiles', handleLabProfile, false);
    document.addEventListener('add-customerportal:lab-profiles-error', handleLabProfileError, false);
  
  }, []);

  React.useEffect(() => {
    if (labProfiles?.labProfiles?.length > 0) {
      // when labProfiles are loaded into shared state object, try to initialize the selected lab profile
      initSelectedLabProfiles();
      const _options = [];
      //init dropdown options
      labProfiles?.labProfiles.map(profile => {
        const option = {
          label : profile.labName,
          value: profile.labProfileId
        };
        _options.push(option);
      });
      setOptions(_options);
    }
  }, [labProfiles]);
  
  React.useEffect(() => {
    const selectedOption = {
      label: selectedLabProfile.labName,
      value: selectedLabProfile.labProfileId
    };
    setSelectedOption(selectedOption);
  }, [selectedLabProfile]);
  
  React.useEffect( () => {
    if (userProfile?.country) {
      initProfileCountry();
    }
  }, [userProfile]);
  
  React.useEffect( () => {
    initOUS(profileCountry);
  }, [profileCountry])

  React.useEffect( () => {
    setTimeout(() => {
      const profileInfo = JSON.parse(localStorage.getItem('profile'));
      const distAvailable = document.querySelector('body');
      if (profileInfo?.userType != undefined && profileInfo?.userType != null) {
        if (profileInfo?.userType === "distributor") {
          if(distAvailable.classList.contains("distributor")) {
            distributorOus(profileInfo?.country)
          }         
        } 
      } 
    }, 1000);
  });
  
  React.useEffect( () => {
    if (selectedLabProfile?.labProfileId && userProfile?.email && !pageLoaded) {
      fireAnalyticsEvent("page_loaded", analyticsUserAndLabObject);
      setPageLoaded(true);
    }
    
  }, [userRole, userProfile, selectedLabProfile])

  return (
    <>
      <DropDown
        className={`dropdown_LabProfile`}
        options={options}
        label={t('lab-profile')}
        placeholder={t('select-a-lab-profile')}
        isLoading={false}
        isDisabled={false}
        onChange={changeLabProfileEvent}
        selectedOverride={selectedOption} />
    </>
  );
};