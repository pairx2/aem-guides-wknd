import { useSharedTeamData } from '../shared/TeamData'
import { useSharedLabProfiles } from '../shared/LabProfiles'
import axios from 'axios';
export const SearchTeamService = () => {
  const { selectedLabProfile } = useSharedLabProfiles()
  const { setMyteams, setIsLoading } = useSharedTeamData()
  const searchUsers = () => {
    setIsLoading(true);

    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const url = eslEndpoint + ESL_EPT?.SEARCH_USERS;
    const headers = getPageDataAttributes();
    headers["Content-Type"] = "application/json";

    const token = window.getCookie("jwtToken");
    headers["x-id-token"] = token;

    const config = {
      url: url,
      headers: headers,
    };

    const data = {
      "action": "getUserDetails",
      "userInfo": {
        "additionalProperties": {
          "labProfileId": selectedLabProfile.labProfileId
        }
      }
    }
    axios
      .post(url, data, config)
      .then(function (response) {
        const searchResults = response?.data?.response
        setIsLoading(false);
        setMyteams((searchResults) ?? []);

      })
      .catch(function (error) {
        console.error(`error from within data axios: ${error}`);
      });
  }

  return {
    searchUsers
  }
}