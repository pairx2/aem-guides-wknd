import React, { useState, useCallback, useMemo } from 'react';
import { useBetween } from 'use-between';
import { useSharedLabProfiles } from "./LabProfiles";

const outsideUs = () => {
    const [isOutsideUs, setIsOutsideUsState] = useState(null);
    const setIsOutsideUs = useCallback((s) => setIsOutsideUsState(s), []);
    const [preferredLanguage, setPreferredLanguageState] = useState("en");
    const setPreferredLanguage = useCallback((s) => setPreferredLanguageState(s), []);
    const { profileCountry, userRole } = useSharedLabProfiles();
    const isEmployee = useMemo(() => { return userRole == "employee" }, [userRole]);

    const regionNames = useMemo(() => {
        if (preferredLanguage) {
            const langLocale = preferredLanguage.replace("_", "-");
            return new Intl.DisplayNames(
                [langLocale], { type: 'region' });
        }
    }, [preferredLanguage]);

    const countryDisplayName = useCallback((regionCode) => {
        return regionNames.of(regionCode);
    }, [regionNames])

    const initOUS = useCallback((_profileCountry) => {
        // get country
        const language = window.getLanguage();
        if (_profileCountry == null || isEmployee) {
            // initialize OUS State for Employees
            if (location.pathname.indexOf("/us/en") != -1) {
                setIsOutsideUs(false);
            } else {
                setIsOutsideUs(true);
            }
            
        } else if (_profileCountry.toLowerCase() != "us") {
            setIsOutsideUs(true);
            // redirect to int page if on us page
            if (location.pathname.indexOf("/us/en") != -1) {
                location.href = "/int/en/secure/dashboard.html"
            }
        } else {
            // we are inside the US
            setIsOutsideUs(false);
            // redirect to us page if on int page
            if (location.pathname.indexOf("/us/en") == -1) {
                location.href = "/us/en/secure/dashboard.html"
            }
        }

        setPreferredLanguage(language ?? "en");

    }, [isEmployee, userRole]);

    const distributorOus = (_profileCountry) => {
        // get country
            
        if (_profileCountry.toLowerCase() != "us") {
            setIsOutsideUs(true);
            // redirect to int page if on us page
            if (location.pathname.indexOf("/us/en") != -1) {
                location.href = "/int/en/secure/technical-library.html"
            }
        } else {
            // we are inside the US
            setIsOutsideUs(false);
            // redirect to us page if on int page
            if (location.pathname.indexOf("/us/en") == -1) {
                location.href = "/us/en/secure/technical-library.html"
            }
        }


    };

    

    return {
        isOutsideUs,
        setIsOutsideUs,
        preferredLanguage,
        setPreferredLanguage,
        initOUS,
        regionNames,
        countryDisplayName,
        distributorOus
    };
}

export const useSharedOUS = () => useBetween(outsideUs);