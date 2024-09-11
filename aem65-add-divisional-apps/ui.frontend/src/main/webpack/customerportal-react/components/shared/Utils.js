import React, { useEffect, useRef } from 'react';
import {languagesConfig} from '../configs';

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    
    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const getLanguage = () => {
    // format expected: en_US
    const language = window.getLanguage();
    
    if (language) {
        // must have language and country
        const localeCodes = language.split("_");
        const langCode = localeCodes[0];
        let countryCode = "";
        
        if (localeCodes[1]) {
            countryCode = `_${(localeCodes[1]).toUpperCase()}`
        }
        return `${langCode}${countryCode}`;
    } else {
        // fallback
        return "en_US";
    }
    
}
export const getLocalizedNameFromLocaleCode = (locale, additionalFilter) => {
    // reformat language code to EN_US
    // we can pass additional filters to filter options for Assay or Product requirements
    const lang_code = locale.toUpperCase();
    
    let langConfig = languagesConfig["_value"].find(config => config.locale == lang_code && config[additionalFilter] == true );
    if (!langConfig) {
        // fallback to en_us
        langConfig = languagesConfig["_value"].find(config => config.locale == "EN_US" && config[additionalFilter] == true);
    }
    
    return langConfig?.displayValue;
}
export const getLocalizedNameFromLblFileLanguageCode = (langCode, additionalFilter) => {
    // we can pass additional filters to filter options for Assay or Product requirements
    const lang_code = langCode.toLowerCase();

    const language = window.getLanguage();
    let langConfig = "";
    if(lang_code == "pt" || lang_code == "pt_br") {
        if(language.toLowerCase() == "pt_br") {
            langConfig = languagesConfig["_value"].find(config => config.lblFileLocaleCode == "pt-BR" && config[additionalFilter] != false );
        } else {
            langConfig = languagesConfig["_value"].find(config => config.lblFileLocaleCode == "pt-PT" && config[additionalFilter] != false );
        }
    } else if(langCode == "no") {
        langConfig = languagesConfig["_value"].find(config => config.lblFileLanguageCode == "nb" && config[additionalFilter] != false );
    } else {
        langConfig = languagesConfig["_value"].find(config => config.lblFileLanguageCode == lang_code && config[additionalFilter] != false );
    }    
    if (!langConfig) {
        // fallback to en
        langConfig = languagesConfig["_value"].find(config => config.lblFileLanguageCode == "en" && config[additionalFilter] != false);
    }
    return langConfig?.displayValue;
}

export const getCountryCodeFromLanguageCode = (langCode, additionalFilter) => {
    // we can pass additional filters to filter options for Assay or Product requirements
    const lang_code = langCode.toLowerCase();

    const language = window.getLanguage();
    let langConfig = "";
    if(lang_code == "pt" || lang_code == "pt_br") {
        if(language.toLowerCase() == "pt_br") {
            langConfig = languagesConfig["_value"].find(config => config.lblFileLocaleCode == "pt-BR" && config[additionalFilter] != false );
        } else {
            langConfig = languagesConfig["_value"].find(config => config.lblFileLocaleCode == "pt-PT" && config[additionalFilter] != false );
        }
    } else {
         langConfig = languagesConfig["_value"].find(config => config.lblFileLanguageCode == lang_code && config[additionalFilter] != false );
    }
    
    if (!langConfig) {
        // fallback to en
        langConfig = languagesConfig["_value"].find(config => config.lblFileLanguageCode == "en" && config[additionalFilter] != false);
    }
    
    return langConfig?.countryCode;
}

export const getProductRequirementsEnglishDisplayKeyFromLanguageCode = (langCode) => {
    // we can pass additional filters to filter options for Assay or Product requirements
    const lang_code = langCode.toLowerCase();
    
    let langConfig = languagesConfig["_value"].find(config => config.lblFileLanguageCode == lang_code && config["productRequirementsEnglishDisplayKey"] );
    if (!langConfig) {
        // fallback to en
        langConfig = languagesConfig["_value"].find(config => config.lblFileLanguageCode == "en" && config["productRequirementsEnglishDisplayKey"]);
    }
    
    return langConfig?.productRequirementsEnglishDisplayKey;
}

// format list number for regex search
export const formatListNumber = (term) => {
    // remove leading zeroes
    let listNum = term;
    if (listNum[0] == "0") {
        listNum = listNum.slice(1, listNum.length);
    }
    
    // Add regex tokens
    const chars = listNum.split("")
    const search = `.*${chars.join("-?")}.*` // should look like '.*4-?R-?9-?9-?1-?A.*'
    return search;
}

