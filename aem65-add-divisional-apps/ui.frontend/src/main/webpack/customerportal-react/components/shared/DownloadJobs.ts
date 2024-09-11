import React, {useState, useCallback } from 'react';
import {useBetween} from 'use-between';

const downloadJobs = () => {
    const [downloadJob, setDownloadJob] = useState(null);
    const [downloadJobId, setDownloadJobId] = useState(null);
    const [isSharedDownloadError, setIsError] = useState(false);

    const setSharedDownloadJob = useCallback( (f) =>{
        setDownloadJob(f);
    },  []);
    const setSharedDownloadJobID = useCallback( (f) =>{
        setDownloadJobId(f);
    },  []);

    const setSharedDownloadJobsIsError = useCallback((f)=> {
        setIsError(f);
    }, []);

    return {
        downloadJob,
        setSharedDownloadJob,
        isSharedDownloadError,
        setSharedDownloadJobsIsError,
        downloadJobId,
        setSharedDownloadJobID
    };
}

export const useSharedDownloadJobs = () => useBetween(downloadJobs);