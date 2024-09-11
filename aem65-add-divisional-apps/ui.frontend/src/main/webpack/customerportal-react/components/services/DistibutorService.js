import { useSharedDistibutor } from "../shared/Distibutor";
import { getCookie } from "../shared/Utils";

const JWT_TOKEN_KEY = "jwtToken";
export const distibutorService = () => {
  const {
    setSharedDistibutor,
    setSharedIsLoading,
    setSharedIsLoaded,
    setSharedDistibutorApproveData,
    setSharedIsLoadingApproveData,
    setSharedIsLoadedApproveData,
    setDistibutorApproveOption,
  } = useSharedDistibutor();

  const getHeaders = () => {
    const headers = window.getPageDataAttributes();
    const token = getCookie(JWT_TOKEN_KEY);
    headers["x-id-token"] = token;
    return headers;
  };

  const eslEndpoint = eslConfigDatasets()?.eslEndpoint;

  const getdistibutor = () => {
    var data = {
      action: "pendingapproval",
    };
    const service = eslEndpoint + "/api/private/profile/admin/user-info";
    setSharedIsLoading(true);
    fetch(service, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        let distibutor = data?.response?.results;
        var distibutorData = [];

        for (let i in distibutor) {
          var obj = {
            uid: distibutor[i].uid,
            date: distibutor[i].created,
            companyName: distibutor[i].data.business,
            distributorName: distibutor[i].data?.distributorName == undefined ? "" : distibutor[i].data?.distributorName,
            userName:
              distibutor[i].profile.lastName +
              "," +
              distibutor[i].profile.firstName,
            userEmail: distibutor[i].profile.email,
            country: distibutor[i].profile.country,
            languages: distibutor[i].profile.languages,
          };

          distibutorData.push(obj);
        }
        setSharedIsLoading(false);
        setSharedIsLoaded(true);
        setSharedDistibutor(distibutorData ?? []);
      })
      .catch((error) => {
        setSharedIsLoading(false);
        setSharedIsLoaded(true);
      });
  };

  const getdistibutorApproved = (successCallBackOption) => {
    var data = {
      action: "approved",
    };
    const service = eslEndpoint + "/api/private/profile/admin/user-info";
    setSharedIsLoadingApproveData(true);
    fetch(service, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        let distibutor = data?.response?.results;
        var distibutorData = [];

        for (let i in distibutor) {
          var obj = {
            uid: distibutor[i].uid,
            companyName: distibutor[i].data.business,
            distributorName: distibutor[i].data?.distributorName == undefined ? "" : distibutor[i].data?.distributorName,
            userName:
              distibutor[i].profile.lastName +
              "," +
              distibutor[i].profile.firstName,
            userEmail: distibutor[i].profile.email,
            country: distibutor[i].profile.country,
            languages: distibutor[i].profile.languages,
          };

          distibutorData.push(obj);
        }

        setSharedIsLoadingApproveData(false);
        setSharedIsLoadedApproveData(true);
        setSharedDistibutorApproveData(distibutorData ?? []);
        successCallBackOption(distibutorData ?? [])
      })
      .catch((error) => {
        setSharedIsLoadingApproveData(false);
        setSharedIsLoadedApproveData(true);
      });
  };

  const approveOrRejectUser = (userData, successCallBack) => {
    const service = eslEndpoint + "/api/private/profile/admin/update-user";
    const body = userData;
    let userDataValue = getHeaders();
    if(userData.languages != undefined) {
      userDataValue['x-preferred-language'] = userData.languages;      
    }
    fetch(service, {
      method: "POST",
      headers: userDataValue,
      body: JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((data) => {
      successCallBack(data);
    });
  };

  return {
    getdistibutor,
    getdistibutorApproved,
    approveOrRejectUser,
  };
};
