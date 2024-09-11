function saveXKSession(data) {
    const xKeyInput = document.querySelector('input[name="xKeyInput"]');
    let xKey = data.body["xKeyInput"];
    if(xKey && xKey !=="") {
        setCookie('xAccessKey', xKey, '', true);

        xKeyInput.value = xKey;
        xKeyInput.setAttribute('readOnly', true);
        setTimeout(() => {
            const isXKAvailableEvent = createConditionalEvent(xKey !== null && xKey !== undefined && xKey !=="", "isXKAvailable");
            window.dispatchEvent(isXKAvailableEvent);
        }, 500);
    }
}

function updateRequestAdminTable(data) {
    let xK = getCookie('xAccessKey', true);
    data.headers["x-application-access-key"] = (xK && xK !== "") ? xK : '';
    return data;
}

function updateRequestCreateUpdate(data) {
    
    let xK = getCookie('xAccessKey', true);
    data.headers["x-application-access-key"] = (xK && xK !== "") ? xK : '';

    let statusVal;
    if (Array.isArray(data.body['isValid'])) {
        statusVal = radioValue(data.body['isValid']);
    } else if (typeof data.body['isValid'] == "string") {
        statusVal = data.body['isValid'];
    }
    data.body.isValid = statusVal;

    delete data.body['node'];
    delete data.body['g-recaptcha-response'];
    return data;
}

function onSuccessRequestCreateUpdate(data) {
    if (data.errorCode == 0 && data.response) {
        sessionStorage.removeItem('rowData');
    }
}