import {getCookie} from "../shared/Utils";

const JWT_TOKEN_KEY = "jwtToken";
export const s3FileUploadService = () => {

    const getHeaders = () => {
        const headers = window.getPageDataAttributes();
        const token = getCookie(JWT_TOKEN_KEY);
        headers["x-id-token"] = token;
        return headers;
    };

    const getSignedUrlData = (id) => {
        return JSON.stringify({
            "completeObjectKey": id
        });
    };

    const urlToFile = (url, filename) => {
        const mimeType = url.substring(url.indexOf(":")+1, url.indexOf(";"))
        return (fetch(url)
                .then(function(res){ return res.arrayBuffer(); })
                .then(function(buf){ return new File([buf], filename, {type:mimeType}); })
        );
    };
    
    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;

    const processUpload = (url, file) => {
        try {

            const response = fetch(url, {
                method: 'PUT',
                body: file.file,
                "Content-Type": "binary/octet-stream"
            }).then((response) => {
                window.hideLoading();
            });
        } catch (err) {
            console.error(err);
        }
    }

    const getSignedUrl = (id, file) => {
        const service = eslEndpoint + ESL_EPT?.SIGNED_URL;
        const response = fetch(service, {
            method: 'POST', // or 'PUT'
            headers: getHeaders(),
            body: getSignedUrlData(id)
        })
            .then((response) => response.json())
            .then((data) => {
                processUpload(data.response?.signedUrl, file);
            });
    };

    const uploadFile = (id, file) => {
        return getSignedUrl(id, file);
    };

    return {
        uploadFile
    }
}

