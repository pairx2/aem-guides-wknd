import React, { useState, useCallback } from 'react';
import { useBetween } from 'use-between';

const labIncFlags = () => {

    const [gotLabIncidents, setGotTheLabIncidents] = useState(false)
    const [labIncidentsError, setIsLabIncidentsError] = useState(false)
    const [noLabIncidentsResults, setAreNoLabIncidentsResults] = useState(false)
    const [labIncidentsIsLoading, setTheLabIncidentsIsLoading] = useState(false)
    const [labIncidentsErrorCode, setTheLabIncidentsErrorCode] = useState(null)
    const [downloadError, setTheDownloadError] = useState(false)
    
    // Flag to indicate that the results were acquired for the get lab incidents call
    const setGotLabIncidents = useCallback((f) => {
        setGotTheLabIncidents(f)
    }, []);

    // Flag to indicate there was an error retrieving the lab incidents
    const setLabIncidentsError = useCallback((f) => {
        setIsLabIncidentsError(f)
    }, [])

    // Flag to indicate that no lab incidents were returned in the search
    const setNoLabIncidentsResults = useCallback((f) => {
        setAreNoLabIncidentsResults(f)
    }, [])

    // Flag to indicate that no lab incidents were returned in the search
    const setLabIncidentsIsLoading = useCallback((f) => {
        setTheLabIncidentsIsLoading(f)
    }, [])

    // Flag to store the error code received from the lab incidents service
    const setLabIncidentsErrorCode = useCallback((f) => {
        setTheLabIncidentsErrorCode(f)
    }, [])

    // Flag to mark if there was an error downloading an FSR 
    const setDownloadError = useCallback((f) => {
        setTheDownloadError(f)
    }, [])

    return {
        gotLabIncidents,
        setGotLabIncidents,
        labIncidentsError,
        setLabIncidentsError,
        noLabIncidentsResults,
        setNoLabIncidentsResults,
        labIncidentsIsLoading,
        setLabIncidentsIsLoading,
        labIncidentsErrorCode,
        setLabIncidentsErrorCode,
        downloadError,
        setDownloadError
    };
}

export const useSharedLabIncidentsFlags = () => useBetween(labIncFlags);