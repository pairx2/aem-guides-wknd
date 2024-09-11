import React, {useState, useCallback } from 'react';
import {useBetween} from 'use-between';

const distibutor = () => {
    const [distibutor, setDistibutor] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [distibutorApproveData, setDistibutorApproveData] = useState([]);
    const [isLoadingApproveData, setIsLoadingApproveData] = useState(false);
    const [isLoadedApproveData, setIsLoadedApproveData] = useState(false);

    const setSharedDistibutorApproveData = useCallback( (f) =>{
        setDistibutorApproveData(f);
    },  []);

    const setSharedIsLoadingApproveData = useCallback( (f) =>{
        setIsLoadingApproveData(f);
    },  []);

    const setSharedIsLoadedApproveData = useCallback( (f) =>{
        setIsLoadedApproveData(f);
    },  []);

    const setSharedDistibutor = useCallback( (f) =>{
        setDistibutor(f);
    },  []);

    const setSharedIsLoading = useCallback( (f) =>{
        setIsLoading(f);
    },  []);

    const setSharedIsLoaded = useCallback( (f) =>{
        setIsLoaded(f);
    },  []);

    return {
        distibutor,
        setSharedDistibutor,
        isLoading,
        setSharedIsLoading,
        isLoaded,
        setSharedIsLoaded,
        distibutorApproveData,
        setSharedDistibutorApproveData,
        isLoadingApproveData,
        setSharedIsLoadingApproveData, 
        isLoadedApproveData,
        setSharedIsLoadedApproveData,
    };
}

export const useSharedDistibutor = () => useBetween(distibutor);