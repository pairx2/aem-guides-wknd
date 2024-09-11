import {eslConfigDatasets} from "../../../customerportal/forms/common";
import {ESL_EPT} from "../../../customerportal/forms/commonContants";
import {useSharedDownloadJobs} from "../shared/DownloadJobs";
import {useSharedResults} from "../shared/Results";

export const DOWNLOAD_JOB_STATUS = {
    INITIATED : "INITIATED",
    COMPLETED : "COMPLETED",
    FAILED : "FAILED"
}

const JWT_TOKEN_KEY = "jwtToken";
const eslEndpoint = eslConfigDatasets()?.eslEndpoint;

export const downloadService = () => {
    const {setSharedDownloadJob,setSharedDownloadJobsIsError, setSharedDownloadJobID} = useSharedDownloadJobs();
    const {resultDocumentLanguage} = useSharedResults();
    const getHeaders = () => {
        const headers = window.getPageDataAttributes();
        if (resultDocumentLanguage) {
          headers["x-preferred-language"]  = resultDocumentLanguage.value;
        }
        const token = window.getCookie(JWT_TOKEN_KEY);
        headers["x-id-token"] = token;
        return headers;
    }

    const triggerDownloadErrors = (errorId, errorResponse, errorCode) => {
        setSharedDownloadJobsIsError(true);
        const event = new CustomEvent('add-customerportal:download-error', {detail: {type: errorId, errorResponse: errorResponse, errorCode: errorCode}});
        
        document.dispatchEvent(event);
    }

    const requestDownloads = (items) => {
        setSharedDownloadJobsIsError(false);
        const service = eslEndpoint + ESL_EPT?.DOWNLOADS_JOB;
        const body = {
            documentRequest: {
                document: items
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
                  triggerDownloadErrors("downloads_initiate_error", response?.message ?? null, response.status);
              }
          })
            .then((data) => {
                // TODO : Start long polling/job
                /***
                 * sample response
                 * {
                 *     "status": true,
                 *     "requestId": "943cf9c2-fe84-4d84-944f-88f41948e5ec",
                 *     "response": {
                 *         "jobId": "6a933d80-61f1-40d8-beb4-1174818d10ee"
                 *     },
                 *     "errorCode": 0
                 * }
                 */
                if (data?.errorCode === 0) {
                    setSharedDownloadJobID(data?.response?.jobId);
                    requestStatus(data?.response?.jobId);
                } else {
                    const errorResponse = data?.response ?? data?.message;
                    triggerDownloadErrors("downloads_initiate_error", errorResponse, data?.errorCode ?? 500);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                triggerDownloadErrors("downloads_initiate_error", error, 500);
            });
    }

    const requestStatus = (jobId) => {
        /***
         * examples of a job in progress, and a completed job
         * Completed jobs contain a download link for the requested download
        {
            "jobId": "400400e8-5454-49b4-9d1d-882832a8e4f1",
            "appName": "customerportal",
            "countryCode": "US",
            "created_at": "2022-10-03T03:21:20.216797Z",
            "aid": "92fe887ba4a30ebe7be20bc127c43e1751df9c96044bab614fdc971e1349a19e",
            "status": "INITIATED"
        },
        {
            "jobId": "589b382e-2d1b-4fc5-b9a1-7bf61204f511",
            "downloadLink": "https://enterpriseservices-dev2-quality-customerportaldownload.s3.amazonaws.com/cpdownloads/ab393ec5-1e27-42e4-983f-ee0bb5e280ac_201837106.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIQCZJBh1tammTxTlKCLwscbp450vj2FU595AdYAqcD0wRwIfLkbb1wLRIZf%2BH%2BlVi%2FkYtptr8c5XCfi6BPGDZzdivCq6AwiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY3ODY3NDYwNjA3NiIMLPG1j%2F%2BnPsVji6ezKo4DU%2F0%2FQxB7tN1jhDgr6aqdN8UEeHL9irvH6r5LfuCcymk8BJ5ImwP00ZQqE%2Fy67IJeqQnD9hR6ZqOjICYfZ9OS0NEdwAk85aOtldTMvVrMiZRvUmCSYaFhaFwSjUypAxdi7et1my8CwWVPVkRXMokBe4ayvbaUNgi1K9xfzGpM6xdNOKIXXYquKXDpwe7XuHpnB2mx43NJoh3iV%2FEb89ZRW002%2BLP9vRhgNpk4QTc3WFfVRaIE8ICX6zE14Rhcew57Pys%2FZwXuCPv10WJLKM23YMxe%2FQHcS8rsQREsyFvXfSqI44WINCyWNkt%2BGd%2FI3ICMTUDbLZZ2s8Y2DXdGix3hkH98Alf8R112QSEG%2FHQQFhjNK7TToRxrNpTDOI03Q6Fcya5PBz%2FX6RJFmMV16ixu2IRSD2TQwq7LAQyGvCxnyoD0AFLC1iHr0SFnhPQV18OqaPQps14ciuA9bOh3grVoPfvvD1xgmB%2BVypcinbdmJJTuW7rQQFFOZSCJ9Ljn%2FDv97xQVFW29jeW%2Fx0oePMEwsLznmQY6ngFWefUWjrIf3LS%2BHA9a3dKEDiPTJ5vU5sCCfu7PMDQ6%2B5ooxfscJiane2Wgpk3xZWOEEbudZya47%2BY8PwZABcWHhFgUVh5frNa2KKI9Ve3P8V8YGCwUbMHKkSd2H10Yk7lpp1mlfbwgcv77mYSVj0qNaCBswaxgbk%2F7kgWY3Ir57yK%2BPipMEIunPwlondf6PeycN7%2FI6soejaifkJKtSw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221002T185353Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=ASIAZ4BBIU76AMPTXAC5%2F20221002%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=67e255b6751df9a54015cdd7e4e53904ccf70815ebb7a6a0656bacddd710a930",
            "appName": "customerportal",
            "countryCode": "US",
            "created_at": "2022-10-02T18:21:51.184673Z",
            "aid": "92fe887ba4a30ebe7be20bc127c43e1751df9c96044bab614fdc971e1349a19e",
            "status": "COMPLETED"
        },
         */
        const service = `${eslEndpoint}${ESL_EPT?.DOWNLOADS_JOB}?jobId=${jobId}`;
        fetch(service, {
            method: 'GET', // or 'PUT'
            headers: getHeaders(),

        })
          .then((response) => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  triggerDownloadErrors("downloads_check_status_error", data?.response, response.status );
              }
          })
            .then((data) => {
                if (data.errorCode === 0) {
                    // add a new job
                    setSharedDownloadJob(data.response[0]);
                } else {
                    triggerDownloadErrors("downloads_check_status_error", data?.response, data?.errorCode ?? 500);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                triggerDownloadErrors("downloads_check_status_error", error, 500);
            });
    }

    return {
        requestDownloads,
        requestStatus
    }
}