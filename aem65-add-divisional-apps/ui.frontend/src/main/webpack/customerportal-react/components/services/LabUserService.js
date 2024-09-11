import {useSharedLabProfiles} from "../shared/LabProfiles";
import {useTranslation} from "react-i18next";

const JWT_TOKEN_KEY = "jwtToken";
export const labUserService = () => {
    const { t, i18n } = useTranslation();
    const {setSharedLabProfileUsers, setUserManagementError, setUserManagementErrorMsg, userManagementError} = useSharedLabProfiles();
    
    const getHeaders = () => {
        const headers = window.getPageDataAttributes();
        const token = getCookie(JWT_TOKEN_KEY);
        headers["x-id-token"] = token;
        return headers;
    }
    const emptyResponse = [
        {
            emptyResponse:"0"
        }
    ]
    
    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    
    const triggerLabProfileUserErrors = (errorId, errorResponse) => {
        let errorMessage = "";
        if (errorResponse) {
            if(typeof errorResponse != "string") {
                errorMessage = (errorResponse?.statusReason ?? null);
            } else {
                errorMessage = errorResponse;
            }
        }
    
        switch(errorId) {
            case "labprofileusers_get_failure":
                if (!errorMessage) {
                    errorMessage = t('user-manageement-error-unknown-get');
                }
                break;
            case "labprofileusers_remove_failure":
                if (!errorMessage) {
                    errorMessage = t('user-manageement-error-unknown-remove');
                }
                break;
        }
        setUserManagementError(true);
        setUserManagementErrorMsg(errorMessage);
    }
    
    const handleResponse = (labProfileId, data, errorId) => {
        if (data?.errorCode == 0) {
            getLabProfileUsers(labProfileId);
        } else {
            triggerLabProfileUserErrors(errorId, data?.response);
        }
    }
    
    const getLabProfileUsers = (labProfileId) => {
        if (userManagementError) {
            return;
        }
        const service = eslEndpoint + ESL_EPT?.RESOURCE_USERS;
        const body = {
            action: "getListedUserDetails",
            userInfo: {
                additionalProperties: {
                    labProfileId: labProfileId
                }
            }
        };
        fetch(service, {
            method: 'POST', // or 'PUT'
            headers: getHeaders(),
            body: JSON.stringify(body)
        })
          .then((response) => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  triggerLabProfileUserErrors("labprofileusers_get_failure", response?.message ?? null );
              }
          })
          .then((data) => {
              if (data?.errorCode == 0 && data?.response.length !== 0) {
                  setSharedLabProfileUsers(data?.response ?? []);
              }else if(data?.errorCode == 0 && data?.response.length == 0){
                setSharedLabProfileUsers(emptyResponse)
              } else {
                  triggerLabProfileUserErrors("labprofileusers_get_failure", data?.response);
              }
          })
          .catch((error) => {
              console.error('Error:', error);
              triggerLabProfileUserErrors("labprofileusers_get_failure", error);
          });
    };
    
    const removeLabProfileUsers = (labProfileId, aid) => {
        const service = eslEndpoint + ESL_EPT?.RESOURCE_USERS;
        const body = {
            action: "userResource-Delete",
            userInfo: {
                additionalProperties: {
                    labProfileId: labProfileId,
                    aid: aid
                }
            }
        };
        fetch(service, {
            method: 'POST', // or 'PUT'
            headers: getHeaders(),
            body: JSON.stringify(body)
        })
          .then((response) => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  triggerLabProfileUserErrors("labprofileusers_remove_failure", response?.message ?? null );
              }
      
          })
          .then((data) => {
              handleResponse(labProfileId, data, "labprofileusers_remove_failure");
          })
          .catch((error) => {
              console.error('Error:', error);
              triggerLabProfileUserErrors("labprofileusers_remove_failure", error);
          });
    }
    
    return {
        getLabProfileUsers,
        removeLabProfileUsers
    }
}

