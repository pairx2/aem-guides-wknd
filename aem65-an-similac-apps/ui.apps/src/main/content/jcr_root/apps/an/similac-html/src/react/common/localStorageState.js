const LOCAL_SESSION_KEY = "LOCAL_TEMP";

const getLocalStorage = (objKey="") => {
    const data = localStorage.getItem(LOCAL_SESSION_KEY);
    let parsedData = {};
    if(data){
        try{
            parsedData = JSON.parse(data);
        }
        catch(e){}
    }
    if(objKey){
        return parsedData? parsedData[objKey]:null;
    }
    return parsedData;
}

const setLocalStorage = (objKey="",value="") => {
    const localData = getLocalStorage() || {};
    if(objKey)
    {
        localData[objKey] = value;
        const data = JSON.stringify(localData);
        localStorage.setItem(LOCAL_SESSION_KEY,data);
        return true;
    }
    return false;
}

const clearLocalStorage = () => {
    localStorage.setItem(LOCAL_SESSION_KEY,"{}");
}

export {setLocalStorage,getLocalStorage,clearLocalStorage};